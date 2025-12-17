import type { Database } from "./types.ts";

export type StockPrice = Database["api"]["Tables"]["asset_prices"]["Row"];
export type Asset = Database["api"]["Tables"]["assets"]["Row"];

export type NonNullableRow<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

export type NullableRow<T> = {
  [K in keyof T]: T[K] | null;
};
export type CleanedStockPrice = NonNullableRow<StockPrice>;
export type CleanedStock = NonNullableRow<Asset>;

export type PlainPrice = Omit<StockPrice, "id" | "asset_id">;
export type CleanedPlainPrice = NonNullableRow<PlainPrice>;

export type StockPosition = {
  stock: Asset;
  value: number;
  price: number;
  name: string;
  absolute_profit: number;
  relative_profit: number;
  amount: number;
};
export type DepotValue = Database["depots"]["Views"]["values"]["Row"];
export type DepotPosition = Database["depots"]["Tables"]["positions"]["Row"];
export type Depot = Database["depots"]["Tables"]["depots"]["Row"];
export type AssetType =
  Database["api"]["Tables"]["assets"]["Row"]["asset_type"];
