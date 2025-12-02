import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/database_types";

async function main() {
  const credentials = {
    email: "johannes.till.schmidt@outlook.de",
    password: "janni2()()7",
  }
  const client = createClient<Database>(
    // "http://192.168.178.192:8080/",
    "http://0.0.0.0:8080/",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiJ9.K6RNgpI6ACVILMU87WOxmfD2u2fIeDyz5Q9YxWSyJ4U",
  );

  {
    console.log("signin up")
    const { data, error } = await client.auth.signUp(credentials);

    console.log(data, error);
  }

  {
    console.log("logging out")
    const { error } = await client.auth.signOut({ scope: "local" });

    console.log(error)
  }

  {
    console.log("signin in")
    const { data, error } = await client.auth.signInWithPassword(credentials);
    console.log(data, error)
  }
  const user = await client.auth.getUser()
  console.log(user)
  console.log("id: ", user.data.user?.id!);


  {
    const params = { p_user_id: user.data.user?.id! }
    console.log(params)
    const { data, error } = await client.schema("depots").rpc("new_depot_for_user", params)
    console.log(data, error);
  };


  const { data, error } = await client.schema("depots").from("depots").select("*").contains("users", [user.data.user?.id!])
  console.log(data ?? error)
}

main();
