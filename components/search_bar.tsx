"use client";

import "@/app/globals.css";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ComponentPropsWithoutRef, useEffect, useState } from "react";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import type { Asset } from "@/database/custom_types";
import { getStockFromSearchString } from "@/database/search_stock";
import { cn } from "@/lib/utils";
import { getStockPagePath } from "../lib/get_stock_path";
import { Button } from "./ui/button";

interface props {
	doRedirect: boolean;
	className?: string;
}

export default function SearchBar({ className }: props) {
	const router = useRouter();
	const [stocks, setStocks] = useState<Array<Asset>>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	useEffect(() => {
		// declare the data fetching function// for debugging purposes, remove
		const fetchStocks = async () => {
			if (searchQuery === "" || !searchQuery) {
				setStocks([]);
				return;
			}
			const { assets, error, success } = await getStockFromSearchString(
				searchQuery,
				5,
			); // for debugging purposes, remove

			if (error) {
				console.error("Failed to fetch data from database", error);
			}

			if (success) {
				setStocks(assets);
			}
		};

		fetchStocks().catch(console.error);
	}, [searchQuery]);
	return (
		<Command
			className={cn("border-none inner-shadow", className)}
			shouldFilter={false}
		>
			<CommandList className="border-none">
				<CommandInput
					value={searchQuery}
					placeholder="Search for a Stock by Symbol, Name, Description"
					onValueChange={setSearchQuery}
				/>
				<CommandEmpty className="h-min" />
				<CommandGroup>
					{stocks.map((stock) => (
						<CommandItem
							key={stock.id}
							value={stock.id.toString()}
							onSelect={(value) => {
								const id = Number.parseInt(value, 10);
								router.push(getStockPagePath(id));
							}}
						>
							<Link className="w-full h-full" href={getStockPagePath(stock.id)}>
								{stock.symbol} - {stock.name}
							</Link>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}

interface PopOutProps extends props, ComponentPropsWithoutRef<"div"> {}

export function SearchBarPopOut({
	doRedirect,
	className,
	children,
}: PopOutProps) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button
				asChild
				className={cn("p-0 m-0", className)}
				variant="ghost"
				onClick={() => setOpen(true)}
			>
				{children}
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<SearchBar doRedirect={doRedirect} className={cn("w-full border")} />
			</CommandDialog>
		</>
	);
}
