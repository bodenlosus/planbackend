"use client"
import { ArrowDownAZ, Euro, SortAsc, SortDesc } from "lucide-react"
import type React from "react"
import { useMemo, useState } from "react"
import type { AssetType, PositionSummary } from "@/database/custom_types"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select"
import { Separator } from "../ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import PositionList from "./position_list"

interface returnT {
	interval: 1 | 5 | 30
	order: SortMode
	descending: boolean
}
function ToolBar(props: {
	value: returnT
	onValueChange?: (value: returnT) => void
}) {
	const intervals = {
		1: "1d",
		5: "1w",
		30: "1m",
	}
	const orders = [
		{
			type: "profit",
			display: "Profit",
			icon: <Euro />,
		},
		{
			type: "alphabetical",
			display: "Name",
			icon: <ArrowDownAZ />,
		},
	]

	let interval = props.value.interval
	let order: string = props.value.order
	let descending = props.value.descending

	return (
		<>
			<SortSelector
				orders={orders}
				onValueChange={(value, desc) => {
					order = value
					descending = desc
					if (props.onValueChange) {
						props.onValueChange({
							order: order as SortMode,
							descending,
							interval,
						})
					}
				}}
				value={props.value.order}
				descending={props.value.descending}
			/>
			<Separator orientation="vertical" className="h-[1lh] self-center" />
			<IntervalSelector
				intervals={intervals}
				value={props.value.interval}
				onValueChange={(value) => {
					interval = value

					if (props.onValueChange) {
						props.onValueChange({
							order: order as SortMode,
							descending,
							interval,
						})
					}
				}}
			/>
		</>
	)
}
type SortMode = "profit" | "alphabetical"

function sortProcessedPositions(
	positions: PositionSummary[],
	mode: SortMode,
	descending: boolean
) {
	const sort_funcs: Record<
		SortMode,
		(a: PositionSummary, b: PositionSummary) => number
	> = {
		profit: (a, b) => {
			const profitDiff = (a.total_profit ?? 0) - (b.total_profit ?? 0)
			return descending ? -profitDiff : profitDiff
		},
		alphabetical: (a, b) =>
			(descending ? -1 : 1) * (a.symbol ?? "").localeCompare(b.symbol ?? ""),
	}

	return positions.sort(sort_funcs[mode] ?? sort_funcs.profit)
}

export default function PositionTabView({
	positions_raw,
}: {
	positions_raw: PositionSummary[]
}) {
	const [modes, setModes] = useState<returnT>({
		descending: true,
		interval: 1,
		order: "profit",
	})

	const positions = useMemo(
		() => sortProcessedPositions(positions_raw, modes.order, modes.descending),
		[positions_raw, modes.order, modes.descending]
	)
	type AssetTypeWithOther = AssetType | "other"
	const displays: Map<AssetType | "other", string> = new Map([
		["stock", "Aktien"],
		["fund", "ETFs"],
		["crypto", "Krypto"],
		["commodity", "Kommoditäten"],
		["other", "Andere"],
	])

	const sortedStocks: Partial<Record<AssetTypeWithOther, PositionSummary[]>> =
		{}
	const counts: Map<AssetTypeWithOther, number> = new Map()

	for (const position of positions) {
		const asset_type = position.asset_type ?? "other"
		if (!sortedStocks[asset_type]) {
			sortedStocks[asset_type] = []
		}
		;(sortedStocks[asset_type] as PositionSummary[]).push(position)
		counts.set(asset_type, (counts.get(asset_type) ?? 0) + 1)
	}

	const types = Object.keys(sortedStocks)
	const triggers = types.map((asset_type) => {
		const count = counts.get(asset_type as AssetTypeWithOther) ?? 0
		const name = displays.get(asset_type as AssetTypeWithOther) ?? asset_type
		return (
			<TabsTrigger className="h-full" key={asset_type} value={asset_type}>
				{name} {count}
			</TabsTrigger>
		)
	})
	const contents = Object.entries(sortedStocks).map(
		([stockType, positions]) => {
			return (
				<TabsContent key={stockType} value={stockType}>
					<PositionList positions={positions} />
				</TabsContent>
			)
		}
	)

	return (
		<Tabs defaultValue={types[0]}>
			<div className="flex flex-row gap-4 w-full border rounded-lg p-1 bg-muted/50">
				<TabsList className="p-0 bg-transparent">{triggers}</TabsList>
				<div className="grow" />

				<ToolBar value={modes} onValueChange={setModes} />
			</div>
			{contents}
		</Tabs>
	)
}

function SortSelector(props: {
	orders: {
		type: string
		display: string
		icon: React.ReactNode
	}[]
	onValueChange?: (value: string, descending: boolean) => void
	value?: string
	descending?: boolean
}) {
	let descending = props.descending ?? false
	let order = props.value
	const items: React.ReactNode[] = []
	for (const order of props.orders) {
		items.push(
			<SelectItem value={order.type} key={order.type}>
				<div className="flex flex-row gap-3 items-center">
					<span className="size-[1.1lh] *:size-full stroke-muted-foreground">
						{order.icon}
					</span>
					<span>{order.display}</span>
				</div>
			</SelectItem>
		)
	}
	return (
		<div className="flex flex-row gap-2">
			<Select
				onValueChange={(value) => {
					if (props.onValueChange) {
						props.onValueChange(value, descending)
					}
					order = value
				}}
				value={props.value}
			>
				<SelectTrigger className="w-fit bg-background h-full">
					<SelectValue placeholder="Sortiermodus" />
				</SelectTrigger>
				<SelectContent sideOffset={10}>{items}</SelectContent>
			</Select>
			<ToggleGroup
				value={props.descending ? "descending" : "ascending"}
				type="single"
				defaultValue="descending"
				onValueChange={(value) => {
					if (props.onValueChange) {
						props.onValueChange(order ?? "", value === "descending")
					}
					descending = value === "descending"
				}}
			>
				<ToggleGroupItem value="descending">
					<SortDesc />
				</ToggleGroupItem>
				<ToggleGroupItem value="ascending">
					<SortAsc />
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
	)
}

function IntervalSelector<T extends Record<number, string>>(props: {
	intervals: T
	default?: keyof T
	value?: keyof T
	onValueChange?: (days: keyof T, display: string) => void
}) {
	const items: React.ReactNode[] = []

	for (const [days, display] of Object.entries(props.intervals)) {
		items.push(
			<ToggleGroupItem
				className="h-full px-3"
				key={days}
				value={days.toString()}
			>
				{display}
			</ToggleGroupItem>
		)
	}
	return (
		<ToggleGroup
			value={props.value?.toString()}
			type="single"
			defaultValue="1d"
			className=""
			onValueChange={(k) => {
				const key = Number.parseInt(k, 10)
				const value = props.intervals[key]
				if (props.onValueChange) {
					props.onValueChange(key, value)
				}
			}}
		>
			{items}
		</ToggleGroup>
	)
}
