import type { Database } from "./supabase_types";

export type StockPrice = {
  close: number;
  high: number;
  low: number;
  open: number;
  timestamp: string;
  volume: number;
};
export type Stock = Database["public"]["Tables"]["StockInfo"]["Row"];

export type NonNullableRow<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

export type NullableRow<T> = {
  [K in keyof T]: T[K] | null;
};
export type CleanedStockPrice = NonNullableRow<StockPrice>;
export type CleanedStock = NonNullableRow<Stock>;

export type StockPosition = {
  stock: Stock;
  value: number;
  price: number;
  name: string;
  absolute_profit: number;
  relative_profit: number;
  amount: number;
};
export type DepotValue = Database["depots"]["Tables"]["DepotValues"]["Row"];
export type Depot = Database["depots"]["Tables"]["Depots"]["Row"];
export type StockType = Database["public"]["Enums"]["StockType"];
