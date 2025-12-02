"use client"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { signup, createDepot } from "../actions"
import { formSchema } from "./form_schema"

export default function SignUpForm() {
	const router = useRouter()
	const toast = useToast()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	})

	async function onSubmit(data: z.infer<typeof formSchema>) {
		const { error, success } = await signup(
			data.fullName,
			data.email,
			data.password,
		)

		if (error) {
			toast.toast({
				title: "Failed to log in",
				variant: "destructive",
				description: error,
			})
			return
		}
		if (!success) {
			return
		}
		
		toast.toast({
			// description: `A verification email has been sent to ${data.email}`,
			title: "Signed up successfully",
			variant: "default",
		})
		router.refresh()
		router.push("/")
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 flex flex-col gap-0"
			>
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input type="text" placeholder="John Doe" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-Mail</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="someone@example.com"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormMessage />
							<FormControl>
								<Input
									className="rounded-b-none border-b-0 focus-visible:ring-2 ring-inset"
									type="password"
									placeholder="Password"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem className="!mt-0">
							<FormControl>
								<Input
									className="rounded-t-none focus-visible:ring-2 ring-inset"
									type="password"
									placeholder="Confirm Password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="termsAccepted"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormLabel>
								I accept the{" "}
								<Link className="underline underline-offset-2" href={"/"}>
									Terms
								</Link>
							</FormLabel>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className="w-full mx-auto" type="submit">
					Create account
				</Button>
			</form>
		</Form>
	)
}
