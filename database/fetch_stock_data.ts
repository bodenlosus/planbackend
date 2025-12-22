import { SupabaseClient } from "@supabase/supabase-js";
import type { Asset, StockPrice } from "./custom_types";
import { Database } from "@/database/types";
import { createClient } from "@/utils/supabase/server";
import { toISODateOnly } from "@/lib/date_utils";

export interface TfetchStockData {
  info: Asset[];
  prices: StockPrice[] | null;
  pricesWeekly: StockPrice[] | null;

  error?: Error;
}
export async function fetchStockData(
  id: number,
  restclient?: SupabaseClient<Database>,
  start?: Date,
  startWeekly?: Date,
): Promise<TfetchStockData> {
  // Handle responses and errors individually
  const client = restclient ?? (await createClient());
  const [
    { data: prices, error: priceError },
    { data: pricesWeekly, error: priceWeeklyError },
    { data: info, error: infoError },
  ] = await Promise.all([
    client
      .schema("api")
      .from("asset_prices")
      .select("*")
      .eq("asset_id", id)
      .gte("tstamp", start ? toISODateOnly(start) : undefined)
      .order("tstamp", { ascending: true }),
    client
      .schema("api")
      .from("asset_prices_weekly")
      .select("*")
      .eq("asset_id", id)
      .gte("tstamp", startWeekly ? toISODateOnly(startWeekly) : undefined)
      .order("tstamp", { ascending: true }),
    client.schema("api").from("assets").select("*").eq("id", id),
  ]);

  if (infoError) {
    return {
      info: [],
      prices: [],
      pricesWeekly: [],
      error: new Error(`Failed to fetch asset info for id ${id}`, {
        cause: infoError,
      }),
    };
  }

  if (priceWeeklyError) {
    return {
      info,
      prices,
      pricesWeekly: [],
      error: new Error(`Failed to fetch asset prices weekly for id ${id}`, {
        cause: priceWeeklyError,
      }),
    };
  }

  if (priceError) {
    return {
      info,
      prices: [],
      pricesWeekly: [],
      error: new Error(`Failed to fetch asset prices for id ${id}`, {
        cause: priceError,
      }),
    };
  }

  if (!prices || prices.length === 0) {
    return {
      info,
      prices: [],
      pricesWeekly: [],
    };
  }

  return {
    info,
    prices,
    pricesWeekly: pricesWeekly as StockPrice[],
  };
}
