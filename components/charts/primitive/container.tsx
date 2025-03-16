import "../container.css"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { cn } from "@/lib/utils"
import React, { Suspense } from "react"
import PageLoader from "../../loaders/page_loader"
import Chart from "./chart"
import ChartIcon from "./chart_icon"
import IntervalControls from "@/components/displays/interval_controls"
import { Intervals } from "@/lib/intervals"

interface ChartContainerT extends React.ComponentPropsWithoutRef<"div"> {
	defaultName?: string
}

export default function ChartContainer({
	defaultName,
	children,
	className,
}: ChartContainerT) {
	const tabsContent: React.ReactNode[] = []
	const tabsTrigger: React.ReactNode[] = []

	if (!children) return null

	React.Children.forEach(children, (child) => {
		if (!React.isValidElement(child)) {
			return
		}

		if (child.type === Chart) {
			tabsContent.push(
				<TabsContent key={child.key} value={child.props.name}>
					{React.cloneElement(child)}
				</TabsContent>,
			)
		} else if (child.type === ChartIcon) {
			tabsTrigger.push(
				<TabsTrigger
					className="grow-0 p-0 data-[state=active]:bg-secondary *:data-[state=active]:stroke-foreground *:hover:stroke-foreground hover:bg-secondary/50 transition-colors *:transition-colors"
					key={child.key}
					value={child.props.name}
				>
					{React.cloneElement(child)}
				</TabsTrigger>,
			)
		}
	})

	return (
		<Suspense fallback={<PageLoader />}>
			<Tabs defaultValue={defaultName} className={cn(className)}>
				{tabsContent}
				<div className="w-full h-fit p-2 bg-background border-t md:p-0 flex flex-row">
					<TabsList className="bg-transparent flex flex-row gap-2 justify-around justify-items-stretch md:justify-start">
						{tabsTrigger}
					</TabsList>
					{/* <IntervalControls className="grow justify-end p-2" intervals={Intervals} /> */}
				</div>
			</Tabs>
		</Suspense>
	)
}
