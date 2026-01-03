import { PiggyBank } from "lucide-react";
import { ErrorCard } from "@/components/cards/cards";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getDepotId } from "@/lib/get_depot_id";
import { createClient } from "@/utils/supabase/server";
import NewEntryDialog from "./new_dialog";
import { SavingsPlanTable } from "./table";
import type { SearchParams } from "@/database/custom_types";
export default async function Page(props: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;
  const { depotId, error: depotIdError } = await getDepotId(searchParams);
  if (depotIdError) {
    return <ErrorCard error={depotIdError}></ErrorCard>;
  }

  const { data, error } = await dataFetcher(depotId);

  if (error) {
    return <ErrorCard error={error}></ErrorCard>;
  }

  return (
    <main className="w-full flex flex-row justify-center h-full">
      <div className="grow flex flex-col gap-4">
        {data.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <PiggyBank />
              </EmptyMedia>
              <EmptyTitle>Dein Sparplan ist leer.</EmptyTitle>
              <EmptyDescription>
                Füge einen neuen Eintrag hinzu, um mit deinem Sparplan
                loszulegen.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <EmptyContent>
                <NewEntryDialog trigger={<Button>Eintrag hinzufügen</Button>} />
              </EmptyContent>
            </EmptyContent>
          </Empty>
        ) : (
          <SavingsPlanTable data={data} />
        )}
      </div>
    </main>
  );
}

const dataFetcher = async (depotId: number) => {
  const client = await createClient();
  // return { data: null, error: new Error("tEST") };
  const data = await client
    .schema("depots")
    .from("savings_plans_with_asset")
    .select("*")
    .eq("depot_id", depotId);
  return data;
};
