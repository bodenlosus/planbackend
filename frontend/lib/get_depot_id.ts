"use server"
import type { SearchParams } from "@/database/custom_types"
import { createClient } from "@/utils/supabase/server"
import { getDepotDefaultId } from "./db"
import { getActiveDepotIdNumber } from "./store/server"

export async function getDepotId(params: SearchParams) {
	if (params.depot) {
		const parsedDepotId = parseInt(params.depot, 10)
		if (!Number.isNaN(parsedDepotId)) {
			return {
				depotId: parsedDepotId,
				error: null,
				noDepot: null,
			}
		}
	}

	const depotId = await getActiveDepotIdNumber()
	if (depotId) {
		return {
			depotId,
			error: null,
			noDepot: null,
		}
	}

	const client = await createClient()
	return await getDepotDefaultId(client)
}
