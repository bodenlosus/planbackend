import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface formProps {
	onSubmit?: (values: onSubmitValues) => void;
	limit: number;
	commission: number;
}

export interface onSubmitValues {
	worth: number;
}

export default function BuyStockForm({
	onSubmit,
	limit,
	commission,
}: formProps) {
	const formSchema = z.object({
		worth: z.coerce
			.number<number>({ message: "keine gültige Zahl" }) // Coerces the input to a number
			.positive({ message: "Zahl muss positiv sein" }) // Checks that it's positive
			.max(limit, {
				message: `Aktuelle Geldsumme des Deopts erlaubt nur ${limit} USD`,
			}), // Limits it to the available budget
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			worth: limit,
		},
	});

	// 2. Define a submit handler.

	function handleSubmit(values: z.infer<typeof formSchema>) {
		if (onSubmit) onSubmit(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="worth"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Wert</FormLabel>
							<FormControl>
								<Input placeholder="0" {...field} type="text" />
							</FormControl>
							<FormDescription>+{commission} USD Kommission</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Proceed</Button>
			</form>
		</Form>
	);
}
