"use client";

import { Button } from "@/components/ui/button";
import { createDepotAction } from "../actions";
import { toast } from "sonner";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

export default function Inner() {
  const router = useRouter();
  async function onClick() {
    const error = await createDepotAction();
    console.log(error);
    if (error) {
      toast(`${error}`);
      return;
    }

    router.push("/?depot_id=");
  }
  return <Button onClick={() => onClick()}>Eröffnen</Button>;
}

// a
