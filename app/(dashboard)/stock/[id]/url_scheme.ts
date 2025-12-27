import { z } from "zod"

export function urlSchema(defaults: { start: string; end: string }) {
	return z.object({
		id: z.coerce
			.number()
			.int()
			.positive({ message: "ID must be a positive integer" }),

		start: z.preprocess(
			(val) => (val === undefined ? defaults.start : val),
			z.string().date("Start date must be a valid date string")
		),

		end: z.preprocess(
			(val) => (val === undefined ? defaults.end : val),
			z.string().date("End date must be a valid date string")
		),
	})
}
