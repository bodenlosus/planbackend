import { IBM_Plex_Mono as FontMono, Inter as FontSans } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import type React from "react";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontMono = FontMono({
	subsets: ["latin"],
	variable: "--font-mono",
	weight: "400",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={cn(fontSans.variable, fontMono.variable)}
			suppressHydrationWarning
		>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</head>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
