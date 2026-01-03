import { ErrorCard } from "@/components/cards/cards";
import type {
  AsyncResult,
  Client,
  UserOverview,
} from "@/database/custom_types";
import { hasSpecialRoles } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { AdminUsersTable } from "./table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, UserStar } from "lucide-react";

export default async function Page() {
  const client = await createClient();
  {
    const { error, hasPermission } = await hasSpecialRoles(["teacher"], client);

    if (error || !hasPermission) {
      return <ErrorCard error={error || new Error("Permission denied")} />;
    }
  }

  const { error, data } = await dataFetcher(client);

  if (error) {
    return <ErrorCard error={error} />;
  }

  const userCount = data.length;

  return (
    <main className="w-full h-full">
      <div className="grid grid-rows-2 grid-cols-3 w-fit gap-3">
        <div className="text bg-muted/70 row-span-2 col-span-2 font-semibold p-6 border rounded-lg flex flex-col gap-2 aspect-square">
          <div className="text-muted-foreground">Nutzerzahl</div>
          <div className="text-4xl flex flex-row items-center gap-2">
            <User className="size-[0.8lh]" />
            {userCount * 10}
          </div>
        </div>
        <div className="text row-span-1 col-span-1 font-semibold p-6 border rounded-lg flex flex-col gap-1">
          <div className="text-muted-foreground text-sm">Lehrer</div>
          <div className="text-xl flex flex-row items-center gap-2">
            <UserStar className="size-[0.8lh]" />
            {userCount}
          </div>
        </div>
      </div>
      <AdminUsersTable data={data} />
    </main>
  );
}

const dataFetcher = async (
  client: Client,
): AsyncResult<UserOverview[], Error> => {
  const { data, error } = await client
    .schema("users")
    .from("admin_overview")
    .select("*");

  if (error || !data) {
    return { error: error || new Error("No data found"), data: null };
  }

  return { error: null, data };
};
