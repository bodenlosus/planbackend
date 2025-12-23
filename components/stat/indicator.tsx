import { Minus, Triangle } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils";

interface WinLossIndicatorProps extends React.ComponentPropsWithoutRef<"div"> {
	sign: number;
}
export function WinLossIndicator({ sign, className }: WinLossIndicatorProps) {
	const cls = cn("size-4 self-center", className);
	if (sign > 0) {
		return <Triangle className={cn("fill-win stroke-transparent", cls)} />;
	}
	if (sign < 0) {
		return (
			<Triangle
				className={cn("fill-loss stroke-transparent -scale-y-100", cls)}
			/>
		);
	}
	return <Minus className={cn("stroke-foreground", cls)} />;
}
