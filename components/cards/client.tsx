"use client";

import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, useMemo, useState } from "react";
import { IntervallPickerControlled } from "./pick_intervall";
import StockChartContainer from "@/components/charts/container";
import {
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  Card,
} from "@/components/ui/card";
import { PlainPrice } from "@/database/custom_types";
import {
  getCurrentDate,
  getDateCertainDaysAgo,
  getTimeBetweenDates,
} from "@/lib/date_utils";

type CardProps = ComponentPropsWithoutRef<"div">;

interface ChartCardProps extends CardProps {
  prices: Array<PlainPrice>;
}

export function ChartCard({ prices, className }: ChartCardProps) {
  "use client";
  const [selectedIntervall, setSelectedIntervall] = useState<number>(7);
  const timeFrame = useMemo(() => {
    const start = getDateCertainDaysAgo(selectedIntervall);
    const end = getCurrentDate();
    return { start, end };
  }, [selectedIntervall]);

  const timeDiff = getTimeBetweenDates(timeFrame.start, timeFrame.end);

  const filteredPrices = useMemo(() => {
    const p = [];
    for (let i = prices.length - 1; i >= 0; i--) {
      if (new Date(prices[i].tstamp) < timeFrame.start) {
        break;
      }
      p.unshift(prices[i]);
    }
    for (let i = 0; i < p.length; i++) {
      if (p[i].close) {
        break;
      }
      p.splice(i, 1);
    }
    return p;
  }, [prices, timeFrame]);

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex-col gap-2">
        <CardDescription>Chart</CardDescription>
        <CardTitle className="">
          {prices.at(0)?.tstamp} - {prices.at(-1)?.tstamp}
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-3">
        <IntervallPickerControlled
          onValueChange={setSelectedIntervall}
          value={selectedIntervall ?? 7}
        />
        <StockChartContainer
          flattenOpenClose={timeDiff ? timeDiff <= 100 : false}
          percision={(timeDiff ?? 0 > 100) ? 4 : 1}
          data={filteredPrices}
        />
      </CardContent>
    </Card>
  );
}
