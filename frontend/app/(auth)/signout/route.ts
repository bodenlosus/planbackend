import type { EmailOtpType } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { clearActiveDepotId } from "@/lib/store/server";

export async function GET(request: NextRequest) {
  const client = await createClient();
  clearActiveDepotId();
  await client.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
