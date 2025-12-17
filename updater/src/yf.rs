use rand::seq::{IndexedMutRandom, IndexedRandom, SliceRandom};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use time::Date;

// const QUERY1: &'static str = "https://query1.finance.yahoo.com";
const ROOT_URL: &'static str = "https://query2.finance.yahoo.com";
const USER_AGENTS: &[&str] = &[
    // Windows Chrome (most common and reliable for yfinance)
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    // // Windows Firefox
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0",
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0",
    // // Windows Edge
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0",
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0",
    // // macOS Chrome
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    // // macOS Safari
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15",
    // // macOS Firefox
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0",
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:132.0) Gecko/20100101 Firefox/132.0",
    // // Linux Chrome
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    // // Linux Firefox
    // "Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0",
    // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0",
];
pub fn client() -> Result<Client, reqwest::Error> {
    let user_agent = USER_AGENTS.choose(&mut rand::rng()).unwrap();
    reqwest::Client::builder().user_agent(*user_agent).build()
}

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("Error making the request: {0}")]
    ReqwestError(#[from] reqwest::Error),

    #[error("Recieved Response is empty")]
    EmptyResponse,

    #[error("Malformed Response")]
    ParseError(#[from] serde_json::Error),

    #[error("YFinance Error: {0}")]
    YFinanceError(Value),
    #[error("Error parsing date time: {0}")]
    DateError(#[from] time::error::Error),

    #[error("Malformed Response")]
    MalformedResponse,
}

#[derive(Debug, Deserialize)]
pub struct Quote {
    pub open: Vec<Option<f32>>,
    pub close: Vec<Option<f32>>,
    pub high: Vec<Option<f32>>,
    pub low: Vec<Option<f32>>,
    pub volume: Vec<Option<i64>>,
}

pub struct FetchResult(Value);

fn mk_url(
    symbol: &str,
    range: Option<&(time::UtcDateTime, time::UtcDateTime)>,
    interval: &str,
) -> String {
    match range {
        Some((start, end)) => format!(
            "{ROOT_URL}/v8/finance/chart/{symbol}?period1={}&period2={}&interval={interval}",
            start.unix_timestamp(),
            end.unix_timestamp()
        ),
        None => format!("{ROOT_URL}/v8/finance/chart/{symbol}?range=1y&interval={interval}"),
    }
}

pub async fn fetch_for_symbol(
    client: &Client,
    symbol: &str,
    range: Option<&(time::UtcDateTime, time::UtcDateTime)>,
    interval: &str,
) -> Result<FetchResult, Error> {
    let url = mk_url(symbol, range, interval);
    let res = client.get(url).build()?;
    let mut response: Value = client.execute(res).await?.json().await?;

    match response.pointer_mut("/chart/error") {
        None => {}
        Some(&mut Value::Null) => {}
        Some(e) => {
            return Err(Error::YFinanceError(e.take()));
        }
    }

    // println!("{:#?}", response);
    let result = response
        .pointer_mut("/chart/result/0")
        .ok_or(Error::EmptyResponse)?
        .take();

    Ok(FetchResult(result))
}

fn uts_to_date(u: &i64) -> time::Date {
    Date::from_calendar_date(1970, time::Month::January, 1)
        .unwrap()
        .saturating_add(time::Duration::seconds(*u))
}

impl FetchResult {
    fn extract_quote(&mut self) -> Option<Quote> {
        self.0
            .pointer_mut("/indicators/quote/0")
            .and_then(|v| serde_json::from_value(v.take()).ok())
    }

    fn extract_timestamps(&mut self) -> Option<Vec<i64>> {
        self.0
            .pointer_mut("/timestamp")
            .and_then(|v| serde_json::from_value(v.take()).ok())
    }
    fn retrieve_time_series(
        Quote {
            open,
            close,
            high,
            low,
            volume,
        }: Quote,
        timestamps: Vec<i64>,
        asset_id: i64,
    ) -> Result<PriceFrame, Error> {
        let len = open.len();
        let all_equal_len = [
            len,
            close.len(),
            high.len(),
            low.len(),
            volume.len(),
            timestamps.len(),
        ]
        .iter()
        .all(|x| *x == len);
        if !all_equal_len {
            return Err(Error::MalformedResponse);
        }

        let ids = vec![asset_id; len];

        let tstamp = timestamps.iter().map(uts_to_date).collect();
        Ok(PriceFrame {
            asset_id: ids,
            open,
            close,
            high,
            low,
            volume,
            tstamp,
            length: len,
        })
    }

    pub fn extract_time_series(&mut self, asset_id: i64) -> Result<PriceFrame, Error> {
        let quote = self.extract_quote().ok_or(Error::EmptyResponse)?;
        let timestamps = self.extract_timestamps().ok_or(Error::EmptyResponse)?;
        Self::retrieve_time_series(quote, timestamps, asset_id)
    }
}

#[derive(Debug, Serialize, Default)]
pub struct PriceFrame {
    pub asset_id: Vec<i64>,
    pub open: Vec<Option<f32>>,
    pub close: Vec<Option<f32>>,
    pub high: Vec<Option<f32>>,
    pub low: Vec<Option<f32>>,
    pub volume: Vec<Option<i64>>,
    pub tstamp: Vec<time::Date>,
    pub length: usize,
}

macro_rules! find_last {
    ($e:expr) => {
        $e.iter().rfind(|o| o.is_some())?.unwrap().clone()
    };
}

impl PriceFrame {
    pub fn empty() -> Self {
        Self::default()
    }
    pub fn extend(&mut self, v: &mut Self) {
        self.asset_id.append(&mut v.asset_id);
        self.open.append(&mut v.open);
        self.close.append(&mut v.close);
        self.high.append(&mut v.high);
        self.low.append(&mut v.low);
        self.volume.append(&mut v.volume);
        self.tstamp.append(&mut v.tstamp);

        self.length += v.length;
    }
    pub fn clear(&mut self) {
        self.asset_id.clear();
        self.open.clear();
        self.close.clear();
        self.high.clear();
        self.low.clear();
        self.volume.clear();
        self.tstamp.clear();

        self.length = 0;
    }

    pub fn last_full_row(&self) -> Option<(i64, Date, f32)> {
        if self.length == 0 {
            return None;
        };

        let (id, open) = self.open.iter().enumerate().rfind(|(_, o)| o.is_some())?;
        let open = open.unwrap();
        let asset_id = self.asset_id[id];
        let tstamp = self.tstamp[id];

        Some((asset_id, tstamp, open))
    }
}
