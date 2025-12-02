import { getStockPagePath } from "@/lib/get_stock_path";
import Link from "next/link";
import type React from "react";
import StockStats from "../stat/stats";
import { Card } from "../ui/card";
import "./style.css";
import { getIconURL } from "@/lib/icon_url";
import { cn } from "@/lib/utils";
import URLIcon from "../icon";
import type { StockPosition } from "@/database/custom_types";

export default function PositionList({
  positions,
}: {
  positions: Array<StockPosition>;
}) {
  // "grid  p-3 gap-3 rounded-xl"
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] pt-3 pb-6 gap-4">
      {positions.map((position) => (
        <PositionRow key={position.stock.id} position={position} />
      ))}
    </div>
  );
}

interface PositionRowProps extends React.ComponentPropsWithoutRef<"div"> {
  position: StockPosition;
}

export function PositionRow({
  position: { value, absolute_profit, stock, price },
}: PositionRowProps) {
  // "p-3 flex flex-row gap-3 border-b w-max"

  let indicatorClass =
    absolute_profit > 0
      ? "bg-gradient-to-r from-win/60 via-win/25 to-transparent to-[100px] bg-no-repeat"
      : "bg-gradient-to-r from-loss/35 to-transparent to-[100px] bg-no-repeat";
  if (absolute_profit === 0) {
    indicatorClass =
      "bg-gradient-to-r from-accent-foreground/60 via-accent-foreground/25 to-transparent to-[100px] bg-no-repeat";
  }
  const iconURL = getIconURL(stock, 40);

  return (
    <>
      <Card
        className={cn(
          "flex flex-row flex-wrap rounded-xl max-w-[800px]",
          indicatorClass,
        )}
      >
        <Link
          href={getStockPagePath(stock.id)}
          className="flex flex-col p-6 pb-3 gap-[0.125rem]"
        >
          <div className="flex flex-row gap-x-2 flex-wrap">
            <URLIcon
              className="h-[1.2lh] aspect-square w-auto self-center rounded"
              size={100}
              iconURL={iconURL}
            />
            <span className="text-2xl self-end font-bold hover:underline-offset-4 transition-all no-underline hover:underline">
              {stock.symbol}
            </span>
            <span className="self-end mb-[.1lh] text-foreground">
              {stock.name}
            </span>
          </div>
          <div className="text-muted-foreground text-sm hidden md:block">
            {stock.description}
          </div>
        </Link>
        <div className="border-t row-span-1 row-start-2 self-end px-3 py-3 *:rounded-none col-start-1 h-fit gap-3 justify-evenly w-full flex flex-row overflow-hidden shadow bg-card">
          <StockStats
            className=""
            structure={{
              value: "Wert",
              profit: "Profit",
              price: "Preis je Aktie",
            }}
            current={{
              value: value,
              profit: absolute_profit,
              price: price,
            }}
          />
        </div>
      </Card>
    </>
  );
}
