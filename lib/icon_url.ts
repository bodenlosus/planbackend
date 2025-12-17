import type { Asset } from "@/database/custom_types";

export function getIconURL(stock: Asset, iconSize: number): string | null {
  const pre = "https://assets.parqet.com/logos";
  const query = `?format=webp&size=${iconSize}`;
  switch (stock.type) {
    case "stock":
      return `${pre}/symbol/${stock.symbol}${query}`;

    case "crypto": {
      if (!stock.symbol.match(/\w+-USD/)) {
        return `${pre}/crypto/${stock.symbol}${query}`;
      }
      const symbol = stock.symbol.replace(/-USD$/, "");
      return `${pre}/crypto/${symbol}${query}`;
    }
    default:
      return null;
  }
}

export function getIconURLStock(symbol: string, iconSize: number): string {
  const pre = "https://assets.parqet.com/logos";
  const query = `?format=webp&size=${iconSize}`;
  return `${pre}/symbol/${symbol}${query}`;
}
