"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import type { Depot } from "@/database/custom_types"
import { useDepotStore } from "@/lib/store/client"
import { createClient } from "@/utils/supabase/client"

async function fetchDepots() {
	const client = createClient()
	// const user = (await client.auth.getSession()).data.session?.user;
	return await client.schema("depots").from("depots").select("*")
	// .contains("user_id", [user?.id]);
}

export default function DepotPicker() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const { activeDepotId, setActiveDepot } = useDepotStore()

	const [depots, setDepots] = useState<Depot[] | null>([])

	useEffect(() => {
		fetchDepots().then((res) => {
			if (res.error) {
				console.error(res.error)
				setDepots(null)
				return
			}
			setDepots(res.data)
		})
	}, [])

	useEffect(() => {
		const s = searchParams.get("activeDepotId")
		const id = s ? parseInt(s, 10) : undefined

		if (id) {
			setActiveDepot(id)
		}
	}, [searchParams, setActiveDepot])

	return (
		<Select
			value={activeDepotId?.toString()}
			onValueChange={(value) => {
				const id = parseInt(value, 10)
				if (id) {
					setActiveDepot(id)
					router.push(`?depot=${id}`)
					router.refresh()
				}
			}}
		>
			<SelectTrigger>
				<SelectValue placeholder="Select a depot" />
			</SelectTrigger>
			<SelectContent>
				{depots?.map((depot) => (
					<SelectItem key={depot.id} value={depot.id.toString()}>
						Depot {depot.id}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
