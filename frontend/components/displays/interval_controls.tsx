"use client"

import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"

export default function IntervalControls(props: {
	className?: string
	intervals: Record<string, number>
	onChange?: (key: string, value: number) => void
}) {
	const keys = Object.keys(props.intervals)
	const items = keys.map(key => (
		<ToggleGroupItem
			className="min-w-7 min-h-7 p-0 h-fit text-xs"
			key={key}
			value={key}
		>
			{key}
		</ToggleGroupItem>
	))
	return (
		<ToggleGroup
			defaultValue={keys[0]}
			onValueChange={key => {
				const value = props.intervals[key]
				if (props.onChange) {
					props.onChange(key, value)
				}
			}}
			className={props.className}
			type="single"
		>
			{items}
		</ToggleGroup>
	)
}
