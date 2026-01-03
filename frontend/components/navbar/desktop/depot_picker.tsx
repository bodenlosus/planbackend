"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Depot } from "@/database/custom_types";
import { createClient } from "@/utils/supabase/client";
import { getUserId } from "@/lib/db";
import { getDepotDefaultId } from "@/lib/db";
import { toast } from "sonner";
import { getDepotCookie, setDepotCookie } from "@/lib/store/client";

async function fetchDepots() {
  const client = createClient();
  const { error, userId } = await getUserId(client);
  if (error) {
    return { error, data: null };
  }
  return await client
    .schema("depots")
    .from("depots")
    .select("*")
    .contains("users", [userId]);
}

export default function DepotPicker() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeDepotId, setActiveDepotId] = useState<number | null>(null);
  const [depots, setDepots] = useState<Depot[] | null>([]);

  function setDepot(id: number) {
    setDepotCookie(id);
    router.push(`?depot=${id}`);
    router.refresh();
  }

  useEffect(() => {
    fetchDepots().then((res) => {
      if (res.error) {
        console.error(res.error);
        setDepots(null);
        return;
      }
      setDepots(res.data);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const s = searchParams.get("depot");
      const id = s ? parseInt(s, 10) : undefined;

      if (id) {
        setActiveDepotId(id);
        setDepotCookie(id);
        return;
      }

      const cookie = await getDepotCookie();
      if (cookie) {
        setActiveDepotId(cookie);
      }
    })();
  }, [searchParams]);

  return (
    <Select
      value={activeDepotId?.toString()}
      onValueChange={(value) => {
        const id = parseInt(value, 10);
        if (id) {
          setActiveDepotId(id);
          setDepot(id);
        }
      }}
    >
      <SelectTrigger className="!rounded-t-none focus:!ring-transparent">
        <SelectValue placeholder="Select a depot" />
      </SelectTrigger>
      <SelectContent align="start" side="right" sideOffset={10}>
        {depots?.map((depot) => (
          <SelectItem key={depot.id} value={depot.id.toString()}>
            Depot {depot.id}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
