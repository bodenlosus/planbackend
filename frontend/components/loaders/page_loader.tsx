export default function PageLoader() {
	const symbols = 3
	return (
		<div className="w-full h-full flex flex-col justify-center items-center text-muted-foreground text-xl gap-3">
			<span className="">Loading Page</span>
			<span className="*:animate-pulse text-3xl flex flex-row gap-1">
				{Array.from({ length: symbols }, (_, i) => (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: <wont be re-sorted>
						key={i}
						style={{ animationDelay: `${i / symbols}s` }}
						className="block size-2 rounded-full bg-muted-foreground"
					/>
				))}
			</span>
		</div>
	)
}
