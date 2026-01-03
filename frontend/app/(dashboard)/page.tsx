"use server";
import { LineChart as LinechartIcon, TableCellsMerge } from "lucide-react";
import { redirect } from "next/navigation";
import { ErrorCard } from "@/components/cards/cards";
import AreaChart from "@/components/charts/area";
import ChartContainer from "@/components/charts/primitive/container";
import TreeChart from "@/components/charts/tree";
import PositionTabView from "@/components/displays/tab_view";
import HeaderStat from "@/components/stat/header_stat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  DepotValue,
  NonNullableRow,
  PositionSummary,
} from "@/database/custom_types";
import { processDepotValues } from "@/database/depots";
import { getDateCertainDaysAgo, toISODateOnly } from "@/lib/date_utils";
import { getDepotId } from "@/lib/get_depot_id";
import { createClient } from "@/utils/supabase/server";
import type { SearchParams } from "@/database/custom_types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const { depotId, error: depotIdError } = await getDepotId(params);
  console.log("depotId", depotId, Date.now());

  if (depotIdError) {
    return <ErrorCard error={depotIdError} />;
  }

  const fres = await dataFetcher(depotId);
  if (fres.error) {
    return <ErrorCard error={fres.error} />;
  }

  if (fres.depot === null) {
    redirect("/new_depot");
  }

  const treeData = fres.positions;

  const d = fres.depotAggValues?.at(0);
  const areaData = processDepotValues(
    (fres.depotValues as NonNullableRow<DepotValue>[]) ?? [],
  );
  return (
    <div className="grid grid-cols-1 gap-3">
      <Card className="overflow-hidden border-none">
        <CardHeader>
          <CardTitle>
            <HeaderStat
              className="justify-start"
              displays={{
                Depotwert: d?.total ?? 0,
                "Heutiger Profit": d?.diff_1d ?? 0,
                "Monatlicher Profit": d?.diff_1m ?? 0,
                "Jährlicher Profit": d?.diff_1y ?? 0,
                "Liquides Geld": d?.cash ?? 0,
              }}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="m-0 px-0 pb-0">
          <ChartContainer
            className="rounded-xl border overflow-hidden"
            defaultTab="line"
            tabs={[
              {
                name: "line",
                icon: (
                  <LinechartIcon className="size-7 md:size-5 stroke-muted-foreground" />
                ),
                content: (
                  <AreaChart
                    className="aspect-[4/3] md:aspect-[20/9] lg:aspect-[6/2] xl:aspect-[8/2]"
                    startValue={areaData?.start ?? 50000}
                    offset={areaData?.offset ?? 0}
                    data={areaData?.data ?? []}
                    dataKey="total"
                    xKey="timestamp"
                    yKey="total"
                  />
                ),
              },
              {
                name: "tree",
                icon: (
                  <TableCellsMerge className="size-7 md:size-5 stroke-muted-foreground" />
                ),
                content: (
                  <TreeChart
                    className="max-h-[500px] w-full"
                    data={treeData as PositionSummary[]}
                    dataKey="market_value"
                  />
                ),
              },
            ]}
          />{" "}
        </CardContent>
      </Card>
      <PositionTabView positions_raw={fres.positions as PositionSummary[]} />
    </div>
  );
}

const dataFetcher = async (depotId: number) => {
  const client = await createClient();

  const { user } = (await client.auth.getUser()).data;

  if (!user) {
    redirect("/auth/login");
  }
  const { data: depot, error: depotError } = await client
    .schema("depots")
    .from("depots")
    .select()
    .eq("id", depotId)
    .contains("users", [user.id])
    .single();

  if (depotError) {
    return { error: depotError };
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
};
