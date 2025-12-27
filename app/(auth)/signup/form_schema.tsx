import { z } from "zod"

export const formSchema = z
	.object({
		fullName: z
			.string({ message: "Please provide your full name" })
			.trim()
			.regex(/^[\w\s]*$/, { message: "Can only include letters and numbers." })
			.min(1)
			.max(100),
		email: z.string().trim().email({
			message: "Please provide a valid E-Mail",
		}),
		password: z
			.string()
			.trim()
			.min(8, { message: "Please provide a valid password" }),
		confirmPassword: z
			.string()
			.trim()
			.min(8, { message: "Please provide a valid password" }),
		termsAccepted: z.boolean({ message: "" }),
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password === confirmPassword) {
			return
		}
		ctx.addIssue({
			code: "custom",
			message: "Passwords do not match",
			path: ["confirmPassword"],
		})
	})
