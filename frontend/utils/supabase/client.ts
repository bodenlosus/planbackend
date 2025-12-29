import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/database/types";
import { SupabaseClient } from "@supabase/supabase-js";
export function createClient(): SupabaseClient<Database> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Missing Supabase credentials");
  }
  return createBrowserClient<Database>(
    url,
    key,
  ) as unknown as SupabaseClient<Database>;
}

export const supabase = createClient();
