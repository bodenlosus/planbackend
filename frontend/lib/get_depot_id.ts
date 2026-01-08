"use server"
import type { SearchParams } from "@/database/custom_types"
import { createClient } from "@/utils/supabase/server"
import { getDepotDefaultId } from "./db"
import { getActiveDepotIdNumber } from "./store/server"

export async function getDepotIdWithInspect(params: SearchParams) {
	if (params.inspect_depot) {
		const parsedDepotId = parseInt(params.inspect_depot, 10)
		if (!Number.isNaN(parsedDepotId)) {
			return {
				depotId: parsedDepotId,
				error: null,
				noDepot: null,
				isInspect: true,
			}
		}
	}

	const depotId = await getActiveDepotIdNumber()
	if (depotId) {
		return {
			depotId,
			error: null,
			noDepot: null,
			isInspect: false,
		}
	}

	const client = await createClient()
	const defaultRes = await getDepotDefaultId(client)

	if (defaultRes.error) {
		return {
			depotId: null,
			error: defaultRes.error,
			noDepot: null,
			isInspect: false,
		}
	}

	return {
		depotId: defaultRes.depotId,
		error: null,
		noDepot: null,
		isInspect: false,
	}
}

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
