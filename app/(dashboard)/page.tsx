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
import { getUser } from "@/database/get_user_server";
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
import {
  getDepotValues,
  getDepots,
  getPositions,
  processDepotPositions,
  processDepotValues,
} from "./a";
import PositionTabView from "@/components/displays/tab_view";

// export const revalidate = 3600
export default async function Page() {
  const fres = await dataFetcher();

  if (fres.error) {
    return <ErrorCard error={fres.error} />;
  }

  const areaData = processDepotValues(fres.depotValues);

  const start = areaData.data.at(0);
  const yesterday = areaData.data.at(-2);
  const today = areaData.data.at(-1);

  const treeData = processDepotPositions(fres.positions, 30);

  return (
    <main className="grid grid-cols-1 gap-3">
      <Card className="overflow-hidden border-none">
        <CardHeader>
          <CardTitle>
            <HeaderStat
              className="justify-start"
              displays={{
                Depotwert: today?.total_assets ?? 0,
                "Heutiger Profit":
                  (today?.total_assets ?? 0) - (yesterday?.total_assets ?? 0),
                "Gesamter Profit":
                  (today?.total_assets ?? 0) - (start?.total_assets ?? 0),
                "Liquides Geld": today?.liquid_assets ?? 0,
              }}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="m-0 px-0 pb-0">
          <ChartContainer className="rounded-xl border" defaultName="line">
            <Chart name="line">
              <AreaChart
                className="aspect-[4/3] md:aspect-[20/9] lg:aspect-[6/2] xl:aspect-[8/2]"
                startValue={areaData.start}
                offset={areaData.offset}
                data={areaData.data}
                dataKey="total_assets"
                xKey="timestamp"
                yKey="total_assets"
              />
            </Chart>
            <Chart name="tree">
              <TreeChart
                className="max-h-[500px] w-full"
                data={treeData as Omit<StockPosition, "stock">[]}
                dataKey="value"
              />
            </Chart>
            <ChartIcon name="line">
              <LinechartIcon className="size-7 md:size-5 stroke-muted-foreground" />
            </ChartIcon>
            <ChartIcon name="tree">
              <TableCellsMerge className="size-7 md:size-5 stroke-muted-foreground" />
            </ChartIcon>
          </ChartContainer>
        </CardContent>
      </Card>
      <PositionTabView positions_raw={fres.positions} />
    </main>
  );
}

const dataFetcher = cache(async () => {
  const empty = (error: Error) => ({
    depot: null,
    error: error,
    positions: null,
    depotValues: null,
  });
  const clientResponse = apolloClient(await createClient());

  if (!clientResponse.client) {
    return empty(clientResponse.error);
  }

  const client = clientResponse.client;

  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const depotResponse = await getDepots(client, user);

  if (depotResponse.error) {
    return empty(depotResponse.error);
  }
  const depot = depotResponse.data?.edges.at(0)?.node.depots;
  if (!depot) {
    return empty(new Error(`no depots present for user ${user.id}`));
  }

  const [positionResponse, valueResponse] = await Promise.all([
    getPositions(client, depot.id),
    getDepotValues(client, depot.id, getDateCertainDaysAgo(30)),
  ]);

  if (positionResponse.error || !positionResponse.data) {
    return {
      depot: depot,
      error: positionResponse.error,
      positions: null,
      depotValues: null,
    };
  }

  if (valueResponse.error || !valueResponse.data) {
    return {
      depot: depot,
      error: valueResponse.error,
      positions: null,
      depotValues: null,
    };
  }

  return {
    depot: depot,
    error: null,
    positions: positionResponse.data,
    depotValues: valueResponse.data,
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
