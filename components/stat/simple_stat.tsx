import type { ComponentPropsWithoutRef } from "react";
import get_sign from "@/lib/data/get_sign";
import { cn } from "@/lib/utils";
import { WinLossIndicator } from "./indicator";

interface props extends ComponentPropsWithoutRef<"div"> {
	sign: number;
	signClassName?: string;
	mode?: "indicator" | "textcolor";
	indicatorClassName?: string;
}
export default function WinLossDisplay({
	children,
	className,
	sign,
	mode = "textcolor",
	signClassName,
	indicatorClassName,
}: props) {
	const signString = get_sign(sign);
	let colorClass = "";

	if (sign > 0) {
		colorClass = "text-win";
	} else if (sign < 0) {
		colorClass = "text-loss";
	}

	return (
		<span className={cn("flex flex-row gap-1", className)}>
			<span
				className={cn(signClassName, mode === "textcolor" ? colorClass : "")}
			>
				{signString}
			</span>
			{children}
			{mode === "indicator" ? (
				<WinLossIndicator sign={sign} className={indicatorClassName} />
			) : (
				""
			)}
		</span>
	);
}
