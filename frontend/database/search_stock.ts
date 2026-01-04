import type { PostgrestError } from "@supabase/supabase-js"
import { createClient } from "../utils/supabase/client"
import type { Asset } from "./custom_types"

export interface TgetStockFromSearchString {
	assets: Array<Asset>
	error: PostgrestError | Error | null
	success: boolean
}

export async function getStockFromSearchString(
	searchQuery: string,
	_limit: number
): Promise<TgetStockFromSearchString> {
	const client = createClient()
	const { data, error } = await client.schema("api").rpc("search_assets", {
		search_query: searchQuery,
	})

	if (error) {
		console.error("Error:", error)
		return { assets: [], error, success: false }
	}

	if (!Array.isArray(data)) {
		console.error("No data found in the database")
		return { assets: [], error: null, success: false }
	}
	if (data.length === 0) {
		console.error("No matching stocks found")
		return { assets: [], error: null, success: false }
	}

	return { assets: data as Array<Asset>, error: null, success: true }
}
