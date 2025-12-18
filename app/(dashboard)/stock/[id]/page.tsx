import {
  ErrorCard,
  StatCard,
  StockPositionCard,
} from "@/components/cards/cards";
import { ChartCard } from "@/components/cards/client";
import { Card } from "@/components/ui/card";

import PriceTable from "@/components/prices/table/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchStockData } from "@/database/fetch_stock_data";
import { formatter as formatPrices } from "@/lib/data/formatter";
import { redirect } from "next/navigation";
import { cache } from "react";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 3600;
// export async function generateStaticParams() {
//   const ids = await fetchStockIds() // Fetch the array of IDs (1000+ IDs)
//   return ids.slice(0, 10).map(id => ({ id })) // Statically generate only the first 10
// }

export default async function Page(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ start: string }>;
}) {
  const id = Number.parseInt((await props.params).id);

  if (id < 0 || !Number.isInteger(id)) {
    return <ErrorCard error={new Error("Invalid ID")} />;
  }

  const { depots, error, positions, commission } = await dataFetcher(id);
  const depot = depots ? depots[0] : null;

  const { info, prices, error: fetchError } = await fetchStockData(id);

  if (error || fetchError) {
    return (
      <main className="flex flex-row w-full h-full grow shrink justify-center items-center">
        <ErrorCard
          className="w-fit"
          error={error ?? fetchError ?? new Error("Unknown error")}
        />
      </main>
    );
  }
  const { dataWithEmptyDays: pricesWithEmptyDays, data: pricesFiltered } =
    formatPrices(prices ?? []);

  return (
    <main className="w-full h-full overflow-hidden grid sm:grid-cols-2 md:grid-cols-[repeat(3,fit-content)] gap-5">
      <StatCard
        className="col-span-3 md:col-span-2"
        currentPrice={prices?.at(-1) ?? prices?.at(0)}
        referencePrice={prices?.at(-2) ?? prices?.at(0)}
        stock={info[0]}
      />

      <StockPositionCard
        commission={commission}
        hidden={!depot}
        depot={depot ?? null}
        position={positions.at(0)}
        className="md:col-span-1 row-span-1 col-span-3"
        stock={{
          name: info[0].name as string,
          id: info[0].id as number,
          price: pricesFiltered.at(0)?.close ?? null,
        }}
      />
      <ChartCard
        className="col-span-3 row-span-2 md:row-start-2"
        prices={pricesWithEmptyDays}
      />
      <Card className="col-span-3 row-span-2 h-min">
        <ScrollArea className="w-full h-[400px] rounded-md border pr-3">
          <PriceTable prices={pricesFiltered.reverse()} />
        </ScrollArea>
      </Card>
    </main>
  );
}

// const dataFetcherUncached = async (user: User, stockId: number) => {}

const dataFetcher = cache(async (stockId: number) => {
  const client = await createClient();

  const user = (await client.auth.getUser()).data.user;

  if (!user) {
    redirect("/auth/login");
  }
  const { data: depots, error: depotError } = await client
    .schema("depots")
    .from("depots")
    .select()
    .contains("users", [user.id]);

  if (depotError) {
    return {
      depots: null,
      error: depotError,
      positions: null,
      commission: null,
    };
  }
  if (depots.length === 0) {
    redirect("/new_depot");
  }

  const depot = depots[0];

  const { data: positions, error: positionError } = await client
    .schema("depots")
    .from("positions")
    .select("*")
    .eq("depot_id", depot.id)
    .eq("asset_id", stockId);

  if (positionError) {
    return {
      depots: depots,
      error: positionError,
      positions: null,
      commission: null,
    };
  }

  const { data: commission, error: commissionError } = await client
    .schema("depots")
    .rpc("get_commission", {});

  if (commissionError) {
    return {
      depots: depots,
      error: commissionError,
      positions: positions,
      commission: null,
    };
  }

  return {
    depots: depots,
    error: null,
    positions,
    commission,
  };
});
