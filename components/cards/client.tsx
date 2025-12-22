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
  toISODateOnly,
} from "@/lib/date_utils";
import { flattenOpenClose } from "@/lib/data/data_utils";

type CardProps = ComponentPropsWithoutRef<"div">;

interface ChartCardProps extends CardProps {
  prices: PlainPrice[];
  pricesWeekly: PlainPrice[];
}

export function ChartCard({ prices, pricesWeekly, className }: ChartCardProps) {
  "use client";
  const [selectedIntervall, setSelectedIntervall] = useState<number>(7);
  const timeFrame = useMemo(() => {
    const start = getDateCertainDaysAgo(selectedIntervall);
    const end = getCurrentDate();
    return { start, end };
  }, [selectedIntervall]);

  const timeDiff = getTimeBetweenDates(timeFrame.start, timeFrame.end);

  const data = useMemo(() => {
    const data = [];
    let src = selectedIntervall < 360 ? prices : pricesWeekly;
    const start = timeFrame.start ? toISODateOnly(timeFrame.start) : undefined;

    for (const price of src) {
      if (start && price.tstamp >= start) {
        data.push(price);
      }
    }
    return data;
  }, [prices, pricesWeekly, timeFrame]);

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
        <StockChartContainer data={data} />
      </CardContent>
    </Card>
  );
}
