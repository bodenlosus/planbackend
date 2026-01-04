import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { email, name, password } from "@/app/(auth)/signup/form_schema"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function ChangePasswordForm({
	user_id,
	onSubmit,
}: {
	user_id: string
	onSubmit?: (user_id: string, password: string) => void
}) {
	const formSchema = z.object({
		password: z.string().min(8).trim(),
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: "",
		},
	})

	return (
		<Form {...form}>
			<form
				className="flex flexflex flex-col gap-4"
				onSubmit={form.handleSubmit(data => onSubmit?.(user_id, data.password))}
			>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Passwort Ändern</Button>
			</form>
		</Form>
	)
}
export function BanForm({
	user_id,
	onSubmit,
}: {
	user_id: string
	onSubmit?: (user_id: string, duration: number) => void
}) {
	const formSchema = z.object({
		duration: z.coerce
			.number<number>({ error: "Bitte gib eine gültige Zahl ein" })
			.min(1),
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			duration: 1,
		},
	})

	return (
		<Form {...form}>
			<form
				className="flex flexflex flex-col gap-4"
				onSubmit={form.handleSubmit(data => onSubmit?.(user_id, data.duration))}
			>
				<FormField
					control={form.control}
					name="duration"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sperrdauer (in Tagen)</FormLabel>
							<FormControl>
								<Input type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Nutzer sperren</Button>
			</form>
		</Form>
	)
}
export function NewUserForm({
	onSubmit,
}: {
	onSubmit?: (data: {
		user_name: string
		email: string
		password: string
	}) => void
}) {
	const formSchema = z.object({
		user_name: name, // Weird focus bug when using name
		email,
		password,
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			user_name: "",
			email: "",
			password: "",
		},
	})

	return (
		<Form {...form}>
			<form
				className="flex flexflex flex-col gap-4"
				onSubmit={form.handleSubmit(onSubmit ?? (() => {}))}
			>
				<FormField
					control={form.control}
					name="user_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input type="text" {...field} />
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
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" {...field} />
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
							<FormControl>
								<Input type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Nutzer erstellen</Button>
			</form>
		</Form>
	)
}
