import { SupabaseClient } from "@supabase/supabase-js";
import { getActiveDepotId } from "./store/server";
import { Database } from "@/database/types";
import { createClient } from "@/utils/supabase/server";
import { getUserId } from "./db";

export type SearchParams = {
  depotId?: string | null;
};

async function getDepotDefaultId(client: SupabaseClient<Database>) {
  const { error: userIdError, userId } = await getUserId(client);
  if (userIdError)
    return {
      error: userIdError,
      depotId: null,
    };
  const { data, error } = await client
    .schema("depots")
    .from("depots")
    .select("id")
    .contains("users", [userId])
    .limit(1)
    .single();
  if (error) {
    console.error(error);
    return {
      error,
      depotId: null,
    };
  }
  return {
    depotId: data.id,
    error: null,
  };
}

export async function getDepotId(params: SearchParams) {
  const activeDepotId = await getActiveDepotId();
  const depotId = params.depotId || activeDepotId;
  if (!depotId) {
    const client = await createClient();
    return await getDepotDefaultId(client);
  }

  const parsedDepotId = parseInt(depotId, 10);
  if (Number.isNaN(parsedDepotId)) {
    return {
      error: new Error("Invalid depot ID"),
      depotId: null,
    };
  }

  return {
    depotId: parsedDepotId,
    error: null,
  };
}
