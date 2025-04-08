"use client";
import type { StockPosition, StockType } from "@/database/custom_types";
import type { ReturnT } from "@/database/restructure_depot_position_data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PositionList from "./position_list";

export default function PositionTabView({
  positions,
}: {
  positions: Array<StockPosition>;
}) {
  const displays: Map<string, string> = new Map([
    ["stock", "Aktien"],
    ["etf", "ETFs"],
    ["crypto", "Krypto"],
    ["currency", "Währungen"],
  ]);

  const sortedStocks: Partial<Record<StockType, StockPosition[]>> = {};
  const counts: Map<Partial<StockType>, number> = new Map();

  for (const position of positions) {
    if (!sortedStocks[position.stock.type]) {
      sortedStocks[position.stock.type] = [];
    }
    (sortedStocks[position.stock.type] as StockPosition[]).push(position);
    counts.set(position.stock.type, (counts.get(position.stock.type) ?? 0) + 1);
  }

  const types = Object.keys(sortedStocks);
  const triggers = types.map((stockType) => {
    const count = counts.get(stockType as StockType) ?? 0;
    const name = displays.get(stockType) ?? stockType;
    return (
      <TabsTrigger key={stockType} value={stockType}>
        {name} {count}
      </TabsTrigger>
    );
  });
  const contents = Object.entries(sortedStocks).map(
    ([stockType, positions]) => {
      return (
        <TabsContent key={stockType} value={stockType}>
          <PositionList positions={positions} />
        </TabsContent>
      );
    },
  );

  return (
    <Tabs defaultValue={types[0]}>
      <div className="flex flex-row gap-2 w-full">
        <TabsList>{triggers}</TabsList>
      </div>
      {contents}
    </Tabs>
  );
}
