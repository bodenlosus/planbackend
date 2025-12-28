import "../container.css"

import type React from "react"
import { Suspense } from "react"
import Tooltip from "@/components/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import PageLoader from "../../loaders/page_loader"

interface TabConfig {
	name: string
	icon: React.ReactNode
	key?: string
	content: React.ReactNode
}

interface ChartContainerProps extends React.ComponentPropsWithoutRef<"div"> {
	defaultTab?: string
	tabs: TabConfig[]
	toolbar?: React.ReactNode[]
}

export default function ChartContainer({
	defaultTab: defaultName,
	tabs,
	className,
	toolbar,
}: ChartContainerProps) {
	const tabsContent: React.ReactNode[] = tabs.map((tab) => (
		<TabsContent key={tab.key ?? tab.name} value={tab.name}>
			{tab.content}
		</TabsContent>
	))

	const tabsTrigger = tabs.map((tab) => (
		<TabsTrigger
			className="grow-0 h-max py-1 px-1 data-[state=active]:bg-secondary *:data-[state=active]:stroke-foreground *:hover:stroke-foreground hover:bg-secondary/50 transition-colors *:transition-colors"
			key={tab.key ?? tab.name}
			value={tab.name}
		>
			<Tooltip className="w-full h-full px-2 py-1 box-content" name={tab.name}>
				{tab.icon}
			</Tooltip>
		</TabsTrigger>
	))

	return (
		<Suspense fallback={<PageLoader />}>
			<Tabs defaultValue={defaultName} className={cn(className)}>
				{tabsContent}
				<div className="w-full h-15 p-2 md:px-1 md:py-0 bg-background border-t flex flex-row">
					<TabsList className="bg-transparent flex flex-row gap-2 h-15 items-center justify-around justify-items-stretch md:justify-start">
						{tabsTrigger}
					</TabsList>
					<div className="grow justify-end flex flex-row items-center gap-3 pr-1">
						{toolbar}
						{/* <IntervalControls className="grow justify-end p-2" intervals={Intervals} /> */}
					</div>
				</div>
			</Tabs>
		</Suspense>
	)
}
