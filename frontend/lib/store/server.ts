"use server";
import { cookies } from "next/headers";
export async function setActiveDepotId(id: string) {
  const cookieStore = await cookies();
  const day = 24 * 3600 * 1000;
  cookieStore.set({
    name: "activeDepotId",
    value: id,
    expires: Date.now() + day,
    path: "/",
    sameSite: "lax",
    httpOnly: false,
  });
}

export async function clearActiveDepotId() {
  const cookieStore = await cookies();
  cookieStore.delete("activeDepotId");
}

export async function getActiveDepotId() {
  const cookieStore = await cookies();
  const activeDepotId = cookieStore.get("activeDepotId");
  return activeDepotId?.value;
}
