"use client"

import { SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "../ui/switch"

export function ModeToggle() {
	const { theme, setTheme } = useTheme()

	return (
		<span className="inline-flex flex-row gap-4">
			<span className="inline-flex items-center flex-row gap-4 text-sm">
				<SunIcon />
			</span>
			<Switch
				className="bg-red"
				checked={{ light: true, dark: false }[theme ? theme : "dark"]}
				onCheckedChange={(checked) => setTheme(checked ? "light" : "dark")}
			/>
		</span>
	)
}
