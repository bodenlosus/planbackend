"use server";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  getActiveDepotId,
  getActiveDepotIdNumber,
  setActiveDepotId,
} from "./store/server";
import { Database } from "@/database/types";
import { createClient } from "@/utils/supabase/server";
import { getDepotDefaultId, getUserId } from "./db";
import { SearchParams } from "@/database/custom_types";

export async function getDepotId(params: SearchParams) {
  if (params.depot) {
    const parsedDepotId = parseInt(params.depot, 10);
    if (!Number.isNaN(parsedDepotId)) {
      return {
        depotId: parsedDepotId,
        error: null,
      };
    }
  }

  const depotId = await getActiveDepotIdNumber();
  if (depotId) {
    return {
      depotId,
      error: null,
    };
  }

  const client = await createClient();
  return await getDepotDefaultId(client);
}
