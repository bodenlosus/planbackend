import type { ComponentPropsWithoutRef } from "react"
import { currencyFormat } from "@/lib/cash_display_string"
import { cn } from "@/lib/utils"
import WinLossDisplay from "./simple_stat"

interface props extends ComponentPropsWithoutRef<"div"> {
	displays: Record<
		string,
		{ value: number | null; formatFunction?: (value: number | null) => string }
	>
	signClassName?: string
	headerClassName?: string
	subClassName?: string
}
export default function HeaderStat({
	displays,
	className,
	headerClassName,
	signClassName,
	subClassName,
}: props) {
	return (
		<div
			className={cn(
				"grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full",
				className
			)}
		>
			{Object.entries(displays).map(([name, { value, formatFunction }]) => (
				<div key={name} className="">
					<Template
						className={subClassName}
						headerClassName={headerClassName}
						signClassName={signClassName}
						name={name}
						value={value}
						formatFunction={formatFunction}
					/>
				</div>
			))}
		</div>
	)
}

interface TemplateProps extends ComponentPropsWithoutRef<"div"> {
	value: number | null
	name: string
	signClassName?: string
	headerClassName?: string
	formatFunction?: (value: number | null) => string
}

function Template({
	value,
	name,
	className,
	signClassName,
	headerClassName,
	formatFunction,
}: TemplateProps) {
	return (
		<>
			<div className={cn("font-normal text-muted-foreground", className)}>
				{name}
			</div>
			<WinLossDisplay
				indicatorClassName="size-4"
				className="items-baseline gap-2 number"
				signClassName={cn("text-2xl font-extrabold", signClassName)}
				sign={value ?? 0}
			>
				<h1 className={cn("text-2xl font-semibold", headerClassName)}>
					{formatFunction
						? formatFunction(value)
						: currencyFormat.format(Math.abs(value ?? 0))}
				</h1>
			</WinLossDisplay>
		</>
	)
}
