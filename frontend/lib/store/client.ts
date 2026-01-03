"use client";

import { SearchParams } from "@/database/custom_types";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// lib/store.ts

export async function setDepotCookie(depotId: number) {
  const day = 24 * 3600 * 1000;
  await window.cookieStore.set({
    name: "activeDepotId",
    value: depotId.toString(),
    expires: Date.now() + day,
    sameSite: "lax",
    path: "/",
    partitioned: true,
  });
}

export async function getDepotCookie() {
  const cookie = await window.cookieStore.get("activeDepotId");
  return cookie?.value ? parseInt(cookie.value, 10) : null;
}

export async function getActiveDepotId(searchParam?: string | null) {
  const parsed = searchParam && parseInt(searchParam, 10);
  if (parsed) {
    return parsed;
  }

  const cookie = await getDepotCookie();
  if (cookie) {
    return cookie;
  }

  return null;
}

export function useActiveDepotId() {
  const searchParams = useSearchParams();
  const [depotId, setDepotId] = useState<number | null>();

  useEffect(() => {
    getActiveDepotId(searchParams.get("depot")).then(setDepotId);
  }, [searchParams]);

  return depotId;
}
