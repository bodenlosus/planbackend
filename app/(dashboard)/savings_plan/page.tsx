import NewEntryDialog from "./new_dialog";

export default async function Page() {
	return (
		<main className="w-full">
			<div className="w-full flex flex-row gap-4 h-fit">
				<NewEntryDialog />
			</div>
		</main>
	);
}
