import { SupabaseClient } from "@supabase/supabase-js";
import type { Asset, StockPrice } from "./custom_types";
import { Database } from "@/database/types";
import { createClient } from "@/utils/supabase/server";

export interface TfetchStockData {
  info: Array<Asset>;
  prices: Array<StockPrice> | null;
  error?: Error;
}
export async function fetchStockData(
  id: number,
  restclient?: SupabaseClient<Database>,
): Promise<TfetchStockData> {
  // Handle responses and errors individually
  const client = restclient ?? (await createClient());
  const [
    { data: prices, error: priceError },
    { data: info, error: infoError },
  ] = await Promise.all([
    client
      .schema("api")
      .from("asset_prices")
      .select("*")
      .eq("asset_id", id)
      .order("tstamp", { ascending: true }),
    client.schema("api").from("assets").select("*").eq("id", id),
  ]);

  if (infoError) {
    return {
      info: [],
      prices: [],
      error: new Error(`Failed to fetch asset info for id ${id}`, {
        cause: infoError,
      }),
    };
  }

  if (priceError) {
    return {
      info,
      prices: [],
      error: new Error(`Failed to fetch asset prices for id ${id}`, {
        cause: priceError,
      }),
    };
  }

  if (!prices || prices.length === 0) {
    return {
      info,
      prices: [],
    };
  }

  return {
    info,
    prices,
  };
}
