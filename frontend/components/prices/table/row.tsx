import type React from "react"
import { TableRow } from "@/components/ui/table"
import PriceCell from "./cell"
import type { PriceColumnOptions } from "./table"

interface PriceRowProps extends React.ComponentPropsWithoutRef<"div"> {
	price: Record<string, number | string>
	columns: Record<string, PriceColumnOptions>
}
export default function PriceRow({ price, columns }: PriceRowProps) {
	return (
		<TableRow className="border-r h-min">
			{Object.entries(columns).map((col, columnIndex) => (
				<PriceCell
					key={col[0]}
					columnIndex={columnIndex}
					value={price[col[0]]}
					options={col[1]}
				/>
			))}
		</TableRow>
	)
}
