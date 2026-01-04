"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { createDepotRedirect } from "../actions"

export default function Inner() {
	async function onClick() {
		const error = await createDepotRedirect()
		if (error) {
			toast(`${error.message}`)
			return
		}
	}
	return <Button onClick={() => onClick()}>Eröffnen</Button>
}

// a
