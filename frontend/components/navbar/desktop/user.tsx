import { Database } from "@/database/types";
import { getUserId } from "@/lib/db";
import { createClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function User() {
  const client = createClient();
  const [userData, setUserData] = useState<
    Awaited<ReturnType<typeof dataFetcher>>["data"] | null
  >(null);

  useEffect(() => {
    dataFetcher(client).then((result) => {
      if (result.error) {
        console.error(result.error);
      } else {
        setUserData(result.data);
      }
    });
  }, [client]);

  return (
    <div>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export async function dataFetcher(client: SupabaseClient<Database>) {
  const {
    data: { user },
    error,
  } = await client.auth.getUser();

  if (error) {
    return { error, data: null };
  }

  if (!user) {
    return { error: new Error("User not found"), data: null };
  }

  return {
    data: {
      name: user.user_metadata.name,
      email: user.email,
    },
    error: null,
  };
}
