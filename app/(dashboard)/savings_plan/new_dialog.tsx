import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import NewEntryForm from "./new_form";

export default async function NewEntryDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<Plus className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Entry</DialogTitle>
				</DialogHeader>
				<NewEntryForm />
			</DialogContent>
		</Dialog>
	);
}
