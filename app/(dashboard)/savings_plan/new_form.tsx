"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AssetPickerDialog from "@/components/asset_picker_dialog";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { Frequency } from "@/database/custom_types";

type Props = {
	limit?: number;
};

function getFormSchema(limit?: number) {
	return z.object({
		asset_id: z
			.int({ error: "Bitte wähle ein gültiges Wertpapier aus" })
			.positive("Bitte wähle ein gültiges Wertpapier aus"),
		worth: z.coerce
			.number<number>({ error: "Bitte gib eine Zahl ein" })
			.min(0, { error: "Der Wert darf nicht negativ sein" })
			.max(limit || 1000000, {
				error: `Dir stehen nur ${limit || 1000000} zur Verfügung`,
			}),
		frequency: z.enum<Frequency[]>(["daily", "weekly", "monthly", "annually"], {
			error: "Bitte wähle eine gültige Frequenz aus",
		}),
	});
}

export default function NewEntryForm({ limit }: Props) {
	const formSchema = getFormSchema(limit);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			worth: 0,
			asset_id: undefined,
			frequency: "monthly",
		},
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		console.log(data);
	}

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-4"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="asset_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Wertpapier</FormLabel>
							<FormControl>
								<AssetPickerDialog
									value={field.value}
									onValueChange={field.onChange}
								/>
							</FormControl>
							<FormDescription>
								Wähle das Wertpapier aus, in das du investieren möchtest.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>{" "}
				<FormField
					control={form.control}
					name="worth"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Wert</FormLabel>
							<FormControl>
								<Input placeholder={`${0}-${limit || 1000000}`} {...field} />
							</FormControl>
							<FormDescription>
								So viel Geld wird regelmäßig in das Wertpapier investiert.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="frequency"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Frequenz</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder="Wähle eine Frequenz aus" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="daily">Täglich</SelectItem>
										<SelectItem value="weekly">Wöchentlich</SelectItem>
										<SelectItem value="monthly">Monatlich</SelectItem>
										<SelectItem value="annually">Jährlich</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormDescription>
								In dieser Frequenz wird das Wertpapier regelmäßig investiert.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Speichern</Button>
			</form>
		</Form>
	);
}
