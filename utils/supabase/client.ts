import { createBrowserClient } from "@supabase/ssr"
import { Database } from "@/database/types"
export function createClient() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL
	const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	if (!url || !key) {
		throw new Error("Missing Supabase credentials")
	}
	return createBrowserClient<Database>(url, key)
}

export const supabase = createClient()
