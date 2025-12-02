"use server";
import { ErrorCard } from "@/components/cards/cards";
import Chart from "@/components/charts/primitive/chart";
import ChartIcon from "@/components/charts/primitive/chart_icon";
import ChartContainer from "@/components/charts/primitive/container";

import AreaChart from "@/components/charts/area";
import TreeChart from "@/components/charts/tree";
import HeaderStat from "@/components/stat/header_stat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Depot, DepotValue, StockPosition } from "@/database/custom_types";
import { Database } from "@/database/types";
import {
  getCurrentDate,
  getDateCertainDaysAgo,
  toISODateOnly,
} from "@/lib/date_utils";
import { LineChart as LinechartIcon, TableCellsMerge } from "lucide-react";
import { redirect } from "next/navigation";
import { cache } from "react";

import { apolloClient } from "@/lib/apollo";
import { createClient } from "@/utils/supabase/server";
import { processDepotValues } from "@/database/depots";
import PositionTabView from "@/components/displays/tab_view";
import { access } from "fs";

// export const revalidate = 3600
export default async function Page() {
  const fres = await dataFetcher();

  if (fres.error) {
    return <ErrorCard error={fres.error} />;
  }

  if (fres.depot === null) {
    redirect("/new_depot");
  }

  if (!fres.depotValues || !fres.depotAggValues || !fres.positions) {
    return <ErrorCard error={new Error("Error fetching Data")} />;
  }

  const d = fres.depotAggValues.at(0);
  const areaData = processDepotValues(fres.depotValues);
  return (
    <main className="grid grid-cols-1 gap-3">
      <Card className="overflow-hidden border-none">
        <CardHeader>
          <CardTitle>
            <HeaderStat
              className="justify-start"
              displays={{
                Depotwert: d?.total ?? 0,
                "Heutiger Profit": d?.rel_diff_1d ?? 0,
                "Monatlicher Profit": d?.rel_diff_1m ?? 0,
                "Jährlicher Profit": d?.rel_diff_1y ?? 0,
                "Liquides Geld": d?.cash ?? 0,
              }}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="m-0 px-0 pb-0">
          <ChartContainer className="rounded-xl border" defaultName="line">
            <Chart name="line">
              <AreaChart
                className="aspect-[4/3] md:aspect-[20/9] lg:aspect-[6/2] xl:aspect-[8/2]"
                startValue={areaData?.start ?? 0}
                offset={areaData?.offset ?? 0}
                data={areaData?.data ?? []}
                dataKey="total"
                xKey="timestamp"
                yKey="total"
              />
            </Chart>
            {/* <Chart name="tree">
              <TreeChart
                className="max-h-[500px] w-full"
                data={treeData as Omit<StockPosition, "stock">[]}
                dataKey="value"
              />
            </Chart>
            */}
            <ChartIcon name="line">
              <LinechartIcon className="size-7 md:size-5 stroke-muted-foreground" />
            </ChartIcon>
            <ChartIcon name="tree">
              <TableCellsMerge className="size-7 md:size-5 stroke-muted-foreground" />
            </ChartIcon>
          </ChartContainer>
        </CardContent>
      </Card>
      {/* <PositionTabView positions_raw={fres.positions} /> */}
    </main>
  );
}

const dataFetcher = cache(async () => {
  const client = await createClient();

  const { user } = (await client.auth.getUser()).data;

  if (!user) {
    redirect("/auth/login");
  }

  console.log(user.id);
  const depotResponse = await client
    .schema("depots")
    .from("depots")
    .select()
    .contains("users", [user.id]);

  const depot = depotResponse.data?.at(0);
  if (depotResponse.error) {
    return { error: depotResponse.error };
  }

  if (!depot) {
    return { depot: null };
  }

  const tstamp = toISODateOnly(getDateCertainDaysAgo(30));
  const depots = client.schema("depots");
  const [positionResponse, valueResponse, valueAggResponse] = await Promise.all(
    [
      depots.from("position_profits").select().eq("depot_id", depot.id),
      depots
        .schema("depots")
        .from("values")
        .select()
        .eq("depot_id", depot.id)
        .gte("tstamp", tstamp),
      depots
        .schema("depots")
        .from("aggregated_values")
        .select()
        .eq("depot_id", depot.id),
    ],
  );

  return {
    depot: depot,
    error:
      positionResponse.error ?? valueResponse.error ?? valueAggResponse.error,
    positions: positionResponse.data,
    depotValues: valueResponse.data,
    depotAggValues: valueAggResponse.data,
  };
});

function calculateProfits(
  depotValues: Omit<DepotValue, "id" | "depot_id">[],
  depot: Omit<Depot, "user_id">,
) {
  const defaultValue = {
    liquid_assets: depot.liquid_assets,
    stock_assets: 0,
    timestamp: toISODateOnly(getCurrentDate()),
  };
  const today: (typeof depotValues)[0] =
    depotValues.at(-1) ?? depotValues[0] ?? defaultValue;
  const yesterday = depotValues.at(-2) ?? depotValues[0] ?? defaultValue;
  const start = depotValues[0] ?? defaultValue;

  const valueToday = today.stock_assets + today.liquid_assets;
  const valueYesterday = yesterday.stock_assets + yesterday.liquid_assets;
  const valueStart = start.stock_assets + start.liquid_assets;

  const profitToday = valueToday - valueYesterday;

  const profitAllTime = valueToday - valueStart;

  return {
    today: {
      value: valueToday,
      profit: profitToday,
      row: today,
    },
    start: {
      value: valueToday,
      profit: profitAllTime,
      row: start,
    },
    yesterday: {
      value: valueYesterday,
      row: yesterday,
    },
  };
}

function relativeDeviation(value1: number, value2: number): number {
  return (value1 - value2) / value2;
}
