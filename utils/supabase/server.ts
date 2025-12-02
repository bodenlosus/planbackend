import { createServerClient } from "@supabase/ssr"
import { GoTrueClient, type SignOut } from "@supabase/auth-js"
import { PostgrestClient } from "@supabase/postgrest-js"
import { cookies } from "next/headers"
import { Database } from "@/database/types"

export async function createClient() {
	const cookieStore = await cookies()

	const url = process.env.NEXT_PUBLIC_SUPABASE_URL
	const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

	if (!url || !key) {
		throw new Error("Missing Supabase credentials")
	}

	return createServerClient<Database>(url, key, {
		cookies: {
			getAll() {
				return cookieStore.getAll()
			},
			setAll(cookiesToSet) {
				try {
					for (const { name, value, options } of cookiesToSet) {
						cookieStore.set(name, value, options)
					}
				} catch {
					// The `setAll` method was called from a Server Component.
					// This can be ignored if you have middleware refreshing
					// user sessions.
				}
			},
		},
	})
}
