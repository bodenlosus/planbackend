import { ErrorCard } from "@/components/cards/cards";
import { hasSpecialRoles } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const client = await createClient();
  {
    const { error, hasPermission } = await hasSpecialRoles(["teacher"], client);

    if (error || !hasPermission) {
      return <ErrorCard error={error || new Error("Permission denied")} />;
    }
  }

  return <div>{/* Admin dashboard content */}</div>;
}
