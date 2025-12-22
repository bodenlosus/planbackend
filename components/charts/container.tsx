"use client";
import "./container.css";
import {
  CandlestickChart as CandleStickIcon,
  LineChart as LinechartIcon,
} from "lucide-react";

import toRelativeValues, {
  calculateOffset,
  flattenOpenClose,
} from "@/lib/data/data_utils";

import type {
  CleanedStockPrice,
  NullableRow,
  PlainPrice,
  StockPrice,
} from "@/database/custom_types";
import { type ComponentPropsWithoutRef, useMemo } from "react";
import AreaChart from "./area";
import CandleStickChart from "./candle_stick";
import ChartContainer from "./primitive/container";
import { getTimeBetweenDates, parseDate } from "@/lib/date_utils";
import { time } from "node:console";

export interface props extends ComponentPropsWithoutRef<"div"> {
  data: Array<PlainPrice>;
}
export default function StockChartContainer({ data }: props) {
  const area = useMemo(() => calculateOffset(data, "close"), [data]);

  const candleData = toRelativeValues(data);
  return (
    <ChartContainer
      defaultTab="line"
      className="w-full border rounded-md bg-muted/25 shadow overflow-hidden"
      tabs={[
        {
          name: "candlestick",
          icon: (
            <CandleStickIcon className="size-7 md:size-5 stroke-muted-foreground" />
          ),
          content: (
            <CandleStickChart
              className="aspect-[4/3] md:aspect-[20/9] lg:aspect-[6/2] xl:aspect-[8/2]"
              data={candleData}
              xKey="date"
              barKey="open_close"
              errorKey="high_low"
              winKey="closeLargerOpen"
              lineKey="absClose"
            />
          ),
        },
        {
          name: "line",
          icon: (
            <LinechartIcon className="size-7 md:size-5 stroke-muted-foreground" />
          ),
          content: (
            <AreaChart
              className="aspect-[4/3] md:aspect-[20/9] lg:aspect-[6/2] xl:aspect-[8/2]"
              data={data}
              dataKey="close"
              xKey="tstamp"
              yKey="close"
              offset={area.offset}
              startValue={area.startValue}
            />
          ),
        },
      ]}
    />
  );
}
