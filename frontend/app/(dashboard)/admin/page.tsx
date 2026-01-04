import { ErrorCard } from "@/components/cards/cards"
import type { Client } from "@/database/custom_types"
import { hasSpecialRoles } from "@/lib/db"
import { numberFormat } from "@/lib/util"
import { createClient } from "@/utils/supabase/server"
import { AdminUsersTable } from "./table"

export default async function Page() {
	const client = await createClient()
	{
		const { error, hasPermission } = await hasSpecialRoles(["teacher"], client)

		if (error || !hasPermission) {
			return <ErrorCard error={error || new Error("Permission denied")} />
		}
	}

	const { error, stats, users } = await dataFetcher(client)

	if (error) {
		return <ErrorCard error={error} />
	}

	return (
		<main className="w-full h-full flex flex-col items-start gap-6">
			<div className="flex flex-row gap-3 *:px-6 *:py-5 *:rounded-lg *:bg-muted/50 *:shadow *:border">
				<div className="flex flex-col gap-1">
					<div>Nutzerzahl</div>
					<div className="text-3xl font-semibold number">
						{numberFormat.format(stats.user_count)}
					</div>
				</div>
				<div className="grid grid-rows-2 grid-cols-[auto,auto] gap-x-2 gap-y-1 *:grid *:col-span-2 *:grid-cols-subgrid *:items-center">
					<div>
						<span className="font-semibold text-2xl">
							{numberFormat.format(stats.student_count)}
						</span>
						<span>Schüler</span>
					</div>
					<div>
						<span className="font-semibold text-2xl">
							{numberFormat.format(stats.teacher_count)}
						</span>
						<span>Lehrer</span>
					</div>
				</div>
			</div>
			<div className="p-2 border rounded-xl bg-muted/25 w-full">
				<AdminUsersTable className="bg-background rounded-lg" data={users} />
			</div>
		</main>
	)
}

const dataFetcher = async (client: Client) => {
	const [
		{ data: users, error: userError },
		{ data: stats, error: statsError },
	] = await Promise.all([
		client.schema("users").from("admin_overview").select("*"),
		client.schema("users").rpc("stats").maybeSingle(),
	])

	if (userError || statsError || !users || !stats) {
		return {
			error: userError || statsError || new Error("No data found"),
			users: null,
			stats: null,
		}
	}

	return { error: null, users, stats }
}
