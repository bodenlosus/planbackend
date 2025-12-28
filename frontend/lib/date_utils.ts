export const toISODateOnly = (date: Date) => date.toISOString().slice(0, 10)
export const msPerDay = 1000 * 3600 * 24
export const getCurrentDate = () => new Date()

export function parseDate(dateString?: string | null): Date | null {
	if (!dateString) return null
	try {
		return new Date(dateString)
	} catch {
		return null
	}
}

export const getDateCertainDaysAgo = (days: number) => {
	const date = new Date()
	date.setUTCHours(0, 0, 0, 0)
	date.setUTCDate(date.getUTCDate() - days)
	return date
}

export const getDateOneWeekAgo = () => getDateCertainDaysAgo(7)

export const getTimeBetweenDates = (
	startDate?: Date | null,
	endDate?: Date | null
) => {
	if (!startDate || !endDate) return null

	const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
	return Math.round(diffTime / msPerDay)
}

export function toAbsoluteTimeString(date: Date) {
	return date.toLocaleDateString("de")
}

export function relativeDateString(
	date: Date,
	absolute: "necessary" | "never" = "necessary"
): string {
	const diff = getTimeBetweenDates(new Date(), date) as number

	if (diff <= 1) {
		return "heute"
	}

	if (diff === 2) {
		return "gestern"
	}

	if (diff < 7) {
		const days = [
			"Sonntag",
			"Montag",
			"Dienstag",
			"Mittwoch",
			"Donnerstag",
			"Freitag",
			"Samstag",
		]
		return days[date.getDay()]
	}

	if (absolute === "necessary" && diff > 30) {
		return date.toLocaleDateString("de")
	}

	return `${diff} days ago`
}

export function relativeDateStringCompact(
	date: Date,
	absolute: "necessary" | "never" = "necessary"
): string {
	const diff = getTimeBetweenDates(new Date(), date) as number

	if (diff <= 1) {
		return "heu"
	}

	if (diff === 2) {
		return "ges"
	}

	if (diff < 7) {
		const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
		return days[date.getDay()]
	}

	if (absolute === "necessary" && diff > 30) {
		return date.toLocaleDateString("de")
	}

	return `${diff}d`
}
