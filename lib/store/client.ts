"use client"
// lib/store.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface DepotStore {
	activeDepotId: number | null
	setActiveDepot: (id: number) => void
}

export const useDepotStore = create<DepotStore>()(
	persist(
		(set) => ({
			activeDepotId: null,
			setActiveDepot: (id) => {
				set({ activeDepotId: id })
				setDepotCookie(id).catch((e) => console.error(e))
			},
		}),
		{
			name: "depot-storage", // localStorage key
		}
	)
)

export async function setDepotCookie(depotId: number) {
	const day = 24 * 3600 * 1000
	await window.cookieStore.set({
		name: "activeDepotId",
		value: depotId.toString(),
		expires: Date.now() + day,
		sameSite: "lax",
		path: "/",
		partitioned: true,
	})
}

export async function getDepotCookie() {
	const cookie = await window.cookieStore.get("activeDepotId")
	return cookie?.value ? parseInt(cookie.value, 10) : null
}
