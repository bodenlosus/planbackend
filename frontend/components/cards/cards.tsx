import { X } from "lucide-react"
import type { ComponentPropsWithoutRef } from "react"
import { Badge } from "@/components/ui/badge"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import type {
	Asset,
	Depot,
	DepotPosition,
	StockPrice,
} from "@/database/custom_types"
import { to_display_string } from "@/lib/cash_display_string"
import { toAbsoluteTimeString } from "@/lib/date_utils"
import { getIconURL } from "@/lib/icon_url"
import { cn } from "@/lib/utils"
import AdditionalContent from "../additional_display"
import URLIcon from "../icon"
import HeaderStat from "../stat/header_stat"
import BuyStockDialog from "../transaction_dialogs/buy_stock_dialog"
import type { TStock } from "../transaction_dialogs/primitive_dialog"
import SellStockDialog from "../transaction_dialogs/sell_stock_dialog"

type CardProps = ComponentPropsWithoutRef<"div">

interface StatCardProps extends CardProps {
	stock: Asset
	currentPrice?: StockPrice
	referencePrice?: StockPrice
	dateString?: string
}

function calculateChange(
	currentPrice?: StockPrice,
	referencePrice?: StockPrice
) {
	if (!currentPrice?.close || !currentPrice.open || !referencePrice?.close)
		return { change24h: null, absoluteChange: null, relativeChange: null }

	const change24h = currentPrice.close - (referencePrice?.close ?? 0)
	const absoluteChange = currentPrice.close - currentPrice.open
	const relativeChange = (absoluteChange / currentPrice.open) * 100
	return { change24h, absoluteChange, relativeChange }
}

export function StatCard({
	className,
	stock: asset,
	currentPrice,
	referencePrice,
	dateString,
}: StatCardProps) {
	const stats = calculateChange(currentPrice, referencePrice)
	const lastUpdated = dateString ?? currentPrice?.tstamp
	return (
		<Card className={cn(className)}>
			<CardHeader className="w-full flex flex-row h-fit">
				<CardTitle className="w-full flex flex-row gap-4 h-fit items-center">
					<URLIcon
						className="size-[4lh] rounded-lg shadow"
						size={100}
						iconURL={getIconURL(asset.symbol, asset.asset_type, 128)}
					/>
					<div className="">
						<span className="text-3xl font-extrabold mr-4">{asset.symbol}</span>
						<span>{asset.name}</span>
						<br />
						<span className="text-muted-foreground font-normal w-fit mt-2">
							{asset.description}
						</span>
					</div>
				</CardTitle>
			</CardHeader>

			<CardContent className="flex flex-col gap-3 pb-0 h-auto">
				<HeaderStat
					subClassName="text-sm"
					className="text-base gap-1 px- text-2xl3"
					headerClassName="text-2xl font-semibold"
					displays={{
						"Aktueller Wert": currentPrice?.close ?? null,
						"Änderung 24h": stats.change24h,
						"Änderung Heute": stats.absoluteChange,
						"Änderung in %": stats.relativeChange,
					}}
				/>
				<div className="grow" />
				<AdditionalContent
					className="bg-card"
					buttonTitle="mehr Information ..."
				>
					{/*<StockStats
            className="pt-3"
            structure={{
              close: "Close",
              open: "Open",
              high: "High",
              low: "Low",
              volume: "Volume",
            }}
            current={currentPrice}
            reference={referencePrice}
          />*/}
				</AdditionalContent>

				<CardFooter className="h-min pb-3 px-2">
					<span className="text-sm w-full text-muted-foreground">
						{lastUpdated ? toAbsoluteTimeString(new Date(lastUpdated)) : ""}
					</span>
				</CardFooter>
			</CardContent>
		</Card>
	)
}

interface ErrorCardProps extends CardProps {
	error: Error
}

export function ErrorCard({ error, className }: ErrorCardProps) {
	return (
		<Card className={cn(className)}>
			<CardHeader>
				<CardTitle className="flex flex-row gap-1">
					<X className="stroke-destructive" />
					Failed to fetch data
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p>{error.message}</p>
			</CardContent>
			<CardFooter>
				<Badge className="w-fit">{error.name}</Badge>
			</CardFooter>
		</Card>
	)
}

interface StockPositionCardProps extends CardProps {
	stock: { name: string; id: number; price: number | null }
	depot?: Depot | null
	position?: DepotPosition
	hidden?: boolean
	commission: number
}
export function StockPositionCard({
	className,
	hidden,
	stock,
	depot,
	position,
	commission,
}: StockPositionCardProps) {
	if (hidden || !depot) {
		return
	}
	const buyLimit = depot.cash - commission
	const sellLimit = position?.worth ?? 0

	return (
		<Card className={cn(className)}>
			<CardHeader className="flex-row flex-wrap justify-left gap-x-4 gap-y-1">
				<CardDescription className="">Deine Positionen</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-3 ">
				<div className="flex flex-row flex-wrap gap-3 w-full *:flex-grow mb-3 h-fit">
					<div className="px-4 py-2 flex flex-col flex-nowrap bg-background border border-border/20 rounded shadow-sm">
						<span className=" text-muted-foreground text-sm">Wert</span>

						<span className="text-sm flex flex-row items-baseline gap-1 text-muted-foreground">
							<span className="text-2xl font-mono font-normal text-foreground">
								{position?.worth ? to_display_string(position.worth) : 0}
							</span>
						</span>
					</div>
					<div className="px-4 py-2 flex flex-col flex-nowrap bg-background border border-border/20 rounded shadow-sm">
						<span className="text-sm text-muted-foreground">Anzahl</span>

						<span className="text-sm flex flex-row items-baseline gap-1 text-muted-foreground">
							<span className="text-2xl font-mono font-normal text-foreground">
								{position?.amount.toFixed(2) ?? 0}
							</span>
						</span>
					</div>
				</div>
				{stock.price && buyLimit ? (
					<div className="grid grid-cols-2 gap-3 grow">
						<BuyStockDialog
							stock={stock as TStock}
							commission={commission}
							depot={{ id: depot.id, monetaryAssets: depot.cash }}
							limit={buyLimit}
						/>
						<SellStockDialog
							stock={stock as TStock}
							commission={commission}
							depot={{ id: depot.id, monetaryAssets: depot.cash }}
							limit={sellLimit}
						/>
					</div>
				) : (
					""
				)}
			</CardContent>
		</Card>
	)
}
