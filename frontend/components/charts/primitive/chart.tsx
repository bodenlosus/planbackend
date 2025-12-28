import type React from "react"

interface ChartT extends React.ComponentPropsWithoutRef<"div"> {
	name: string
}
export default function Chart({ name: _, children }: ChartT) {
	return children
}
