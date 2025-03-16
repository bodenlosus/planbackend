import { to_display_string } from "@/lib/cash_display_string"
import { cn } from "@/lib/utils"
import type { ComponentPropsWithoutRef } from "react"
import WinLossDisplay from "./simple_stat"

interface props extends ComponentPropsWithoutRef<"div"> {
	displays: Record<string, number>
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
				className,
			)}
		>
			{Object.entries(displays).map(([name, value]) => (
				<div key={name} className="">
					<Template
						className={subClassName}
						headerClassName={headerClassName}
						signClassName={signClassName}
						name={name}
						value={value}
					/>
				</div>
			))}
		</div>
	)
}

interface TemplateProps extends ComponentPropsWithoutRef<"div"> {
	value: number
	name: string
	signClassName?: string
	headerClassName?: string
}

function Template({
	value,
	name,
	className,
	signClassName,
	headerClassName,
}: TemplateProps) {
	return (
		<>
			<div
				className={cn("text-lg font-normal text-muted-foreground", className)}
			>
				{name}
			</div>
			<WinLossDisplay
				indicatorClassName="size-5"
				className="items-baseline gap-2"
				signClassName={cn("text-3xl font-extrabold", signClassName)}
				sign={value}
			>
				<h1 className={cn("text-3xl font-extrabold", headerClassName)}>
					{to_display_string(value, true)}
				</h1>
			</WinLossDisplay>
		</>
	)
}
