import { z } from "zod"

export const formSchema = z.object({
	email: z.string().trim().email({ message: "Please provide a valid E-Mail" }),
	password: z
		.string()
		.trim()
		.min(1, { message: "Please provide a valid password" }),
	rememberUser: z.boolean(),
})
