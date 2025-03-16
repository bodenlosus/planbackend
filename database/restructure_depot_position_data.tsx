import type { CleanedStockPrice, Stock, StockPosition } from "./custom_types"
import type { Database } from "./supabase_types"

type dataT = Database["public"]["Functions"]["get_depot_positions"]["Returns"]
export type ReturnT = {
	stock: Stock
	currentPrice: Array<CleanedStockPrice>
	position: StockPosition
}
export function restructure(data: dataT): Array<ReturnT> {
	const restrucData: Map<number, ReturnT> = new Map()

	for (const row of data) {
		const restrucRow = {
			stock: {
				id: row.stockid,
				name: row.name,
				symbol: row.symbol,
				description: row.description,
				type: row.type,
			},
			currentPrice: [
				{
					close: row.close,
					high: row.high,
					low: row.low,
					open: row.open,
					timestamp: row.timestamp,
					volume: row.volume,
					price_id: row.price_id,
					stock_id: row.stockid,
				},
			],
			position: {
				amount: row.amount,
				date: row.date,
				depot_id: row.depot_id,
				id: row.id,
				expenses: row.expenses,
				profit: row.profit,
				stock_id: row.stockid,
			},
		}
		if (restrucData.has(row.id)) {
			restrucData.get(row.id)?.currentPrice.push(restrucRow.currentPrice[0])
			continue
		}
		restrucData.set(row.id, restrucRow)
	}

	return Array.from(restrucData.values())
}
