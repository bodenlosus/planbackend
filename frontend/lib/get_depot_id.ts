import { getActiveDepotId } from "./store/server"

export type SearchParams = {
	depotId?: string | null
}

export async function getDepotId(params: SearchParams) {
	const activeDepotId = await getActiveDepotId()
	const depotId = params.depotId || activeDepotId
	if (!depotId) {
		return {
			error: new Error("No depot ID provided"),
			depotId: null,
		}
	}

	const parsedDepotId = parseInt(depotId, 10)
	if (Number.isNaN(parsedDepotId)) {
		return {
			error: new Error("Invalid depot ID"),
			depotId: null,
		}
	}

	return {
		depotId: parsedDepotId,
		error: null,
	}
}
