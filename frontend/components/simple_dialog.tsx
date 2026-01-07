import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog"

export default function SimpleDialog({
	children,
	open,
	onOpenChange,
	title,
	description,
}: {
	children: React.ReactNode
	open: boolean
	onOpenChange: (open: boolean) => void
	title?: string | null
	description?: string | null
}) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	)
}
