"use client"

import type { ComponentPropsWithoutRef } from "react"
import StockChartContainer from "@/components/charts/container"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card"
import type { PlainPrice } from "@/database/custom_types"
import { cn } from "@/lib/utils"

type CardProps = ComponentPropsWithoutRef<"div">

interface ChartCardProps extends CardProps {
	prices: PlainPrice[]
	pricesWeekly: PlainPrice[]
}

export function ChartCard({ prices, pricesWeekly, className }: ChartCardProps) {
	"use client"

	return (
		<Card className={cn(className)}>
			<CardHeader className="flex-col gap-2">
				<CardDescription>Chart</CardDescription>
			</CardHeader>

			<CardContent className="grid grid-cols-1 gap-3">
				<StockChartContainer prices={prices} pricesWeekly={pricesWeekly} />
			</CardContent>
		</Card>
	)
}
