import "@/app/globals.css";
import "./layout.css";

import type { Metadata } from "next";
import { IBM_Plex_Mono as FontMono, Inter as FontSans } from "next/font/google";
import type React from "react";
import { Suspense } from "react";
import PageLoader from "@/components/loaders/page_loader";
import { AppSidebar } from "@/components/navbar/desktop/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
export const metadata: Metadata = {
	title: "Planspiel Boerse",
	description: "Planspiel Boerse",
};

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontMono = FontMono({
	subsets: ["latin"],
	variable: "--font-mono",
	weight: "400",
});

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				{/* <SidebarTrigger /> */}
				<Suspense fallback={<PageLoader />}>
					<ScrollArea className="h-full pt-3 px-3 mx-2 mt-2 w-full">
						{children}
					</ScrollArea>
				</Suspense>
			</SidebarProvider>
			<Toaster />
		</>
	);
}
