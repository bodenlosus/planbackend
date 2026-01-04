import { cn } from "@/lib/utils"
import styles from "./styles.module.css"

export default function PageLoader() {
	return (
		<div className="w-full h-[100dvh]">
			<div className="relative top-[40%] left-1/2 translate-x-[-50%] translate-y-[-50%] h-fit w-fit flex flex-col items-center justify-center gap-3">
				<span className="text-xl text-muted-foreground">
					Seite wird geladen ...
				</span>
				<Loader />
			</div>
		</div>
	)
}

export function Loader({ className }: { className?: string }) {
	return (
		<div className={cn("h-1 w-full overflow-hidden rounded-full", className)}>
			<div
				className={cn(
					styles.inner,
					"bg-muted-foreground h-full w-full rounded-full"
				)}
			/>
		</div>
	)
}
