import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

import SignUpForm from "./form"

export default function Page() {
	return (
		<main className="grow flex justify-center items-center">
			<Card className="min-w-[350px] w-fit max-w-[33%] shadow-2xl">
				<CardHeader>
					<CardTitle className="text-center">Create an Account</CardTitle>
					<CardDescription>Start by entering your E-Mail below</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-2">
					<SignUpForm />
				</CardContent>
			</Card>
		</main>
	)
}
