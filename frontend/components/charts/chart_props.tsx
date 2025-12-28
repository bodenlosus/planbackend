import type { ComponentPropsWithoutRef } from "react"
import type {
	CleanedStockPrice,
	NullableRow,
	StockPrice,
} from "@/database/custom_types"

export interface props extends ComponentPropsWithoutRef<"div"> {
	data: Array<CleanedStockPrice | NullableRow<StockPrice>>
}
