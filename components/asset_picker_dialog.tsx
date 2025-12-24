import { Search } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Asset } from "@/database/custom_types";
import { getIconURL } from "@/lib/icon_url";
import { cn } from "@/lib/utils";
import StockPicker from "./asset_picker";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

type AssetPickerDialogProps = {
	className?: string;
	value?: number;
	onValueChange?: (assetId: number) => void;
};

export default function AssetPickerDialog({
	className,
	value,
	onValueChange,
}: AssetPickerDialogProps) {
	const [open, setOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

	const handleSelect = (assetId: number, asset: Asset) => {
		setSelectedAsset(asset);
		onValueChange?.(assetId);
		setOpen(false);
		setSearchQuery("");
	};

	const handleOpenChange = (isOpen: boolean) => {
		setOpen(isOpen);
		if (isOpen) {
			setSearchQuery("");
		}
	};

	const iconUrl = useMemo(() => {
		if (!selectedAsset) return null;
		return getIconURL(selectedAsset.symbol, selectedAsset.asset_type, 32);
	}, [selectedAsset]);

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger className="w-full" asChild>
				<Button
					variant="outline"
					className={cn("w-full justify-start", className)}
					type="button"
				>
					{selectedAsset ? (
						<div className="flex items-center gap-2">
							{iconUrl ? (
								<Image
									src={iconUrl}
									alt={selectedAsset.symbol}
									width={32}
									height={32}
									className="rounded size-5"
								/>
							) : (
								""
							)}
							<span className="font-medium">{selectedAsset.symbol}</span>
							<span className="text-muted-foreground">-</span>
							<span>{selectedAsset.name}</span>
						</div>
					) : (
						<div className="flex items-center gap-2 text-muted-foreground">
							<Search className="h-4 w-4" />
							<span>Wähle ein Wertpapier aus</span>
						</div>
					)}
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[600px] p-2">
				<StockPicker
					value={value}
					onSelect={handleSelect}
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
				/>
			</DialogContent>
		</Dialog>
	);
}
