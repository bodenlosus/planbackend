use sqlx::{
    Pool, Postgres,
    postgres::{PgPoolOptions, PgQueryResult},
};
use std::{collections::HashMap, env::var, error::Error, time::Duration};
use time::{Date, UtcDateTime, macros::time};
use tokio::{join, time::Sleep};

use crate::yf::PriceFrame;
mod yf;

const PRICE_MAX: usize = 10_000;

#[derive(Debug)]
struct Asset {
    id: i64,
    symbol: String,
    last_updated: Option<time::Date>,
}

#[derive(Debug, Default)]
struct Prices {
    pub id: Vec<i64>,
    pub date: Vec<Date>,
    pub close: Vec<f32>,
}

impl Prices {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn push(&mut self, id: i64, date: Date, close: f32) {
        self.id.push(id);
        self.date.push(date);
        self.close.push(close);
    }
}

struct Updater {
    timeout: Duration,
    conn: Pool<Postgres>,
    client: reqwest::Client,
    today: UtcDateTime,
    prices: PriceFrame,
    assets: Vec<Asset>,
    updated_ids: Vec<i64>,
}

impl Updater {
    pub async fn new(db_url: &str, timeout: Duration) -> Result<Self, Box<dyn Error>> {
        let conn = PgPoolOptions::new().connect(&db_url).await?;
        let client = yf::client()?;
        Ok(Self {
            conn,
            client,
            today: UtcDateTime::now(),
            prices: PriceFrame::empty(),
            assets: vec![],
            updated_ids: vec![],
            timeout,
        })
    }

    fn update_date(&mut self) {
        self.today = UtcDateTime::now();
    }

    async fn fetch_assets(&mut self) -> Result<(), sqlx::Error> {
        let assets = sqlx::query_as!(Asset, "select symbol, id, last_updated from api.assets")
            .fetch_all(&self.conn)
            .await?;

        self.assets = assets;
        Ok(())
    }

    fn mk_range(
        now: UtcDateTime,
        last_updated: Option<Date>,
    ) -> Option<(UtcDateTime, UtcDateTime)> {
        let last_updated = last_updated?;

        if last_updated == now.date() {
            return None;
        }

        let dt = UtcDateTime::new(last_updated, time::macros::time!(0:00));

        Some((dt, now))
    }
    async fn fetch_prices_for_asset(
        &mut self,
        Asset {
            id,
            symbol,
            last_updated,
        }: &Asset,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let today = self.today;

        let range = Self::mk_range(today, *last_updated);
        let fut = yf::fetch_for_symbol(&self.client, &symbol, range.as_ref(), "1d");
        let (result, _) = join!(fut, tokio::time::sleep(self.timeout));

        let mut result = result?;

        let mut frame = result.extract_time_series(*id)?;

        self.prices.extend(&mut frame);

        Ok(())
    }

    async fn insert_price_frame(&self) -> Result<PgQueryResult, sqlx::Error> {
        let prices = &self.prices;
        sqlx::query!(
            r#"
                INSERT INTO api.asset_prices (asset_id, open, close, high, low, volume, tstamp)
                SELECT * FROM UNNEST($1::bigint[], $2::real[], $3::real[], $4::real[], $5::real[], $6::bigint[], $7::date[])
                ON CONFLICT ON CONSTRAINT unique_asset_timestamp
                DO UPDATE SET
                    open = EXCLUDED.open,
                    close = EXCLUDED.close,
                    high = EXCLUDED.high,
                    low = EXCLUDED.low,
                    volume = EXCLUDED.volume,
                    tstamp = EXCLUDED.tstamp
            "#,
            &prices.asset_id[..],
            &prices.open as &[Option<f32>],
            &prices.close as &[Option<f32>],
            &prices.high as &[Option<f32>],
            &prices.low as &[Option<f32>],
            &prices.volume as &[Option<i64>],
            &prices.tstamp as &[time::Date],
        ).execute(&self.conn).await
    }

    async fn mark_updated(&self) -> Result<PgQueryResult, sqlx::Error> {
        sqlx::query!(
            "UPDATE api.assets SET last_updated = $1 WHERE id IN (SELECT * FROM UNNEST($2::bigint[]))",
            self.today.date(),
            &self.updated_ids as &[i64]
        )
        .execute(&self.conn)
        .await
    }

    async fn inserter(&mut self) -> Result<(), sqlx::Error> {
        println!("inserting..");

        let t0 = std::time::Instant::now();

        self.insert_price_frame().await?;

        let t1 = std::time::Instant::now();

        let dt = t1 - t0;

        println!("{}ms", dt.as_millis());

        self.prices.clear();
        self.mark_updated().await?;
        self.updated_ids.clear();
        Ok(())
    }

    pub async fn update(&mut self) {
        self.update_date();
        if let Err(e) = self.fetch_assets().await {
            eprintln!("Error fetching assets {e}");
            return;
        };

        while let Some(asset) = self.assets.pop() {
            print!("{}", asset.symbol);
            if let Err(e) = self.fetch_prices_for_asset(&asset).await {
                eprintln!("Error fetching prices for {}: {}", asset.symbol, e);
                continue;
            };

            print!("- [{}/{PRICE_MAX}]\n", self.prices.length);

            if self.prices.length >= PRICE_MAX {
                if let Err(e) = self.inserter().await {
                    eprintln!("Error inserting assets: {e}")
                }
            }

            self.updated_ids.push(asset.id);
        }

        println!("inserting remaining..");
        if let Err(e) = self.inserter().await {
            eprintln!("Error inserting assets: {e}")
        }

        println!("updating depots...");

        if let Err(e) = self.update_depots().await {
            eprintln!("Error updating depots: {e}")
        }
    }
    async fn update_depots(&self) -> Result<PgQueryResult, sqlx::Error> {
        sqlx::query!("CALL update_depot_positions()",)
            .execute(&self.conn)
            .await
    }
}

fn sleep_till_time(time: time::Time) -> Sleep {
    let now = time::UtcDateTime::now();
    let next_run = now.replace_time(time);

    let mut diff = next_run - now;

    if diff.is_negative() {
        diff += time::Duration::days(1);
    }

    let delay = std::time::Duration::from_millis(diff.whole_milliseconds() as u64);

    println!("Sleeping for {}s", delay.as_secs());

    tokio::time::sleep(delay)
}

#[tokio::main]
async fn main() {
    let db_url = var("DATABASE_URL").expect("DATABASE_URL not given");

    let timeout: f32 = var("YF_TIMEOUT").map_or(1.0, |s| s.parse().unwrap());
    let timeout = Duration::from_secs_f32(timeout);

    let mut updater = Updater::new(&db_url, timeout).await.unwrap();

    let immediate = var("UPDATE_IMMEDIATE")
        .map(|s| !s.is_empty())
        .unwrap_or(false);
    if immediate {
        updater.update().await;
    }

    loop {
        sleep_till_time(time!(1:00)).await;
        println!("Starting Update");
        updater.update().await;
    }
}
