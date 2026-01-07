import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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

export function RewardForm({
	onSubmit,
}: {
	onSubmit?: (amount: number) => void
}) {
	const formSchema = z.object({
		amount: z.coerce
			.number<number>({ error: "Bitte gib eine gültige Zahl ein" })
			.min(1),
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: 1,
		},
	})

	return (
		<Form {...form}>
			<form
				className="flex flexflex flex-col gap-4"
				onSubmit={form.handleSubmit(data => onSubmit?.(data.amount))}
			>
				<FormField
					control={form.control}
					name="amount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Betrag</FormLabel>
							<FormControl>
								<Input type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Erteilen</Button>
			</form>
		</Form>
	)
}
