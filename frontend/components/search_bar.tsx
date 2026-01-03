"use client";
import "@/app/globals.css";
import { useRouter } from "next/navigation";
import { type ComponentPropsWithoutRef, useState } from "react";
import AssetPicker from "@/components/asset_picker";
import AssetPickerDialog from "@/components/asset_picker_dialog"; // Import both
import { CommandDialog } from "@/components/ui/command";
import type { Asset } from "@/database/custom_types";
import { cn } from "@/lib/utils";
import { getStockPagePath } from "../lib/get_stock_path";
import React from "react";

interface Props {
  doRedirect: boolean;
  className?: string;
}

export default function SearchBar({ className, doRedirect }: Props) {
  const router = useRouter();

  const handleAssetSelect = (asset: Asset) => {
    if (doRedirect) {
      router.push(getStockPagePath(asset.id));
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <AssetPickerDialog onValueChange={handleAssetSelect} className="w-full" />
    </div>
  );
}

interface PopOutProps extends Props, ComponentPropsWithoutRef<"div"> {
  triggerRender?: ({ onClick }: { onClick: () => void }) => React.ReactNode;
}

export function SearchBarPopOut({
  doRedirect,
  className,
  children,
  triggerRender,
}: PopOutProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleAssetSelect = (assetId: number) => {
    if (doRedirect) {
      router.push(getStockPagePath(assetId));
    }
    setOpen(false);
    setSearchQuery("");
  };

  const trigger = triggerRender ? (
    triggerRender({ onClick: () => setOpen(true) })
  ) : (
    <button
      type="button"
      className={cn(
        "appearance-none !overflow-visible mt-[2px] -0 p-0 border-none !bg-transparent",
        className,
      )}
      onClick={() => setOpen(true)}
    >
      {children}
    </button>
  );

  return (
    <>
      {trigger}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <AssetPicker
          onSelect={handleAssetSelect}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </CommandDialog>
    </>
  );
}
