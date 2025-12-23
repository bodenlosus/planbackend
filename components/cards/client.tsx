"use client";

import { type ComponentPropsWithoutRef, useMemo, useState } from "react";
import StockChartContainer from "@/components/charts/container";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { PlainPrice } from "@/database/custom_types";
import {
	getCurrentDate,
	getDateCertainDaysAgo,
	getTimeBetweenDates,
	toISODateOnly,
} from "@/lib/date_utils";
import { cn } from "@/lib/utils";
import { IntervallPickerControlled } from "./pick_intervall";

type CardProps = ComponentPropsWithoutRef<"div">;

interface ChartCardProps extends CardProps {
	prices: PlainPrice[];
	pricesWeekly: PlainPrice[];
}

export function ChartCard({ prices, pricesWeekly, className }: ChartCardProps) {
	"use client";
	const [selectedIntervall, setSelectedIntervall] = useState<number>(7);
	const timeFrame = useMemo(() => {
		const start = getDateCertainDaysAgo(selectedIntervall);
		const end = getCurrentDate();
		return { start, end };
	}, [selectedIntervall]);

	const _timeDiff = getTimeBetweenDates(timeFrame.start, timeFrame.end);

	const data = useMemo(() => {
		const data = [];
		const src = selectedIntervall < 360 ? prices : pricesWeekly;
		const start = timeFrame.start ? toISODateOnly(timeFrame.start) : undefined;

		for (const price of src) {
			if (start && price.tstamp >= start) {
				data.push(price);
			}
		}
		return data;
	}, [prices, pricesWeekly, timeFrame, selectedIntervall]);

	return (
		<Card className={cn(className)}>
			<CardHeader className="flex-col gap-2">
				<CardDescription>Chart</CardDescription>
				<CardTitle className="">
					{prices.at(0)?.tstamp} - {prices.at(-1)?.tstamp}
				</CardTitle>
			</CardHeader>

			<CardContent className="grid grid-cols-1 gap-3">
				<IntervallPickerControlled
					onValueChange={setSelectedIntervall}
					value={selectedIntervall ?? 7}
				/>
				<StockChartContainer data={data} />
			</CardContent>
		</Card>
	);
}
