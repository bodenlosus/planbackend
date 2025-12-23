import "../container.css";

import type React from "react";
import { Suspense } from "react";
import Tooltip from "@/components/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import PageLoader from "../../loaders/page_loader";

interface TabConfig {
	name: string;
	icon: React.ReactNode;
	key?: string;
	content: React.ReactNode;
}

interface ChartContainerProps extends React.ComponentPropsWithoutRef<"div"> {
	defaultTab?: string;
	tabs: TabConfig[];
}

export default function ChartContainer({
	defaultTab: defaultName,
	tabs,
	className,
}: ChartContainerProps) {
	const tabsContent: React.ReactNode[] = tabs.map((tab) => (
		<TabsContent key={tab.key ?? tab.name} value={tab.name}>
			{tab.content}
		</TabsContent>
	));

	const tabsTrigger = tabs.map((tab) => (
		<TabsTrigger
			className="grow-0 p-0 data-[state=active]:bg-secondary *:data-[state=active]:stroke-foreground *:hover:stroke-foreground hover:bg-secondary/50 transition-colors *:transition-colors"
			key={tab.key ?? tab.name}
			value={tab.name}
		>
			<Tooltip className="w-full h-full px-2 py-1 box-content" name={tab.name}>
				{tab.icon}
			</Tooltip>
		</TabsTrigger>
	));

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
	);
}
