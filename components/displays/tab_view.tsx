"use client";
import type { StockPosition, StockType } from "@/database/custom_types";
import type { ReturnT } from "@/database/restructure_depot_position_data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PositionList from "./position_list";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import React, { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ArrowDownAZ, Euro, SortAsc, SortDesc } from "lucide-react";
import { Separator } from "../ui/separator";
import { GetPositionsQuery } from "@/gql/graphql";
import { processDepotPositions } from "@/app/(dashboard)/a";

export default function PositionTabView({
  positions_raw,
}: {
  positions_raw: NonNullable<
    GetPositionsQuery["depotPositionsCollection"]
  >["edges"];
}) {
  const intervals = {
    1: "1d",
    5: "1w",
    30: "1m",
  };

  const [interval, setInterval] = useState<keyof typeof interval>(1);
  const positions = useMemo(
    () => processDepotPositions(positions_raw, interval),
    [interval],
  );
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
      <TabsTrigger className="h-full" key={stockType} value={stockType}>
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
      <div className="flex flex-row gap-4 w-full border rounded-lg p-1 bg-muted/50">
        <TabsList className="p-0 bg-transparent">{triggers}</TabsList>
        <div className="grow"></div>
        <SortSelector />
        <Separator
          orientation="vertical"
          className="h-[1lh] self-center"
        ></Separator>
        <IntervalSelector
          intervals={intervals}
          value={interval}
          onValueChange={setInterval}
        />
      </div>
      {contents}
    </Tabs>
  );
}

function SortSelector() {
  const orders: { type: string; display: string; icon: React.ReactNode }[] = [
    {
      type: "profit",
      display: "Profit",
      icon: <Euro />,
    },
    {
      type: "alphabetical",
      display: "Name",
      icon: <ArrowDownAZ />,
    },
  ];

  const items: React.ReactNode[] = [];
  for (const order of orders) {
    items.push(
      <SelectItem value={order.type} key={order.type}>
        <div className="flex flex-row gap-3 items-center">
          <span className="size-[1.1lh] *:size-full stroke-muted-foreground">
            {order.icon}
          </span>
          <span>{order.display}</span>
        </div>
      </SelectItem>,
    );
  }
  return (
    <div className="flex flex-row gap-2">
      <Select defaultValue={orders.at(0)?.type ?? ""}>
        <SelectTrigger className="w-fit bg-background h-full">
          <SelectValue placeholder="Sortiermodus" />
        </SelectTrigger>
        <SelectContent sideOffset={10}>{items}</SelectContent>
      </Select>
      <ToggleGroup type="single" defaultValue="descending">
        <ToggleGroupItem value="descending">
          <SortDesc />
        </ToggleGroupItem>
        <ToggleGroupItem value="ascending">
          <SortAsc />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

function IntervalSelector<T extends Record<number, string>>(props: {
  intervals: T;
  default?: keyof T;
  value?: keyof T;
  onValueChange?: (days: keyof T, display: string) => void;
}) {
  let items: React.ReactNode[] = [];

  for (const [days, display] of Object.entries(props.intervals)) {
    items.push(
      <ToggleGroupItem
        className="h-full px-3"
        key={days}
        value={days.toString()}
      >
        {display}
      </ToggleGroupItem>,
    );
  }
  return (
    <ToggleGroup
      value={props.value?.toString()}
      type="single"
      defaultValue="1d"
      className=""
      onValueChange={(k) => {
        const key = parseInt(k);
        const value = props.intervals[key];
        if (props.onValueChange) {
          props.onValueChange(key, value);
        }
      }}
    >
      {items}
    </ToggleGroup>
  );
}
