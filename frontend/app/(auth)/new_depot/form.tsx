"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createDepotAction } from "../actions";

export default function Inner() {
  const router = useRouter();
  async function onClick() {
    const { data: id, error } = await createDepotAction();
    console.log(error);
    if (error) {
      toast(`${error.message}`);
      return;
    }

    router.push(`/?depot_id=${id}`);
  }
  return <Button onClick={() => onClick()}>Eröffnen</Button>;
}

// a
