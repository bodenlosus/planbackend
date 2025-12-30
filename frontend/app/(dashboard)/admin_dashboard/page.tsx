import { ErrorCard } from "@/components/cards/cards";
import type {
  AsyncResult,
  Client,
  UserOverview,
} from "@/database/custom_types";
import { hasSpecialRoles } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { AdminUsersTable } from "./table";

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

  return (
    <main>
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
