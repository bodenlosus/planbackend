"use client";
import {
	ArrowLeftRight,
	Home,
	type LucideIcon,
	SearchIcon,
} from "lucide-react";
import { SearchBarPopOut } from "@/components/search_bar";
import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
	interface ItemT {
		title: string;
		url: string;
		icon: LucideIcon;
	}
	const tree: Record<string, Array<ItemT>> = {
		Depot: [
			{ title: "Mein Depot", url: "/", icon: Home },
			{ title: "Transaktionen", url: "/transactions", icon: ArrowLeftRight },
		],
		// Aktien: [{ title: "Suche", url: "/search", icon: SearchIcon }],
		// Wettbewerb: [{ title: "Leaderboard", url: "/leaderboard", icon: Trophy }],
	};
	return (
		<Sidebar className="bg-sidebar px-3 pt-3">
			<SidebarHeader>
				<h1 className="font-bold text-3xl">Planspiel Boerse</h1>
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<SearchBarPopOut doRedirect>
								<Button variant={"outline"}>
									<SearchIcon className="size-5 shrink-0 stroke-muted-foreground" />
									<span className="text-muted-foreground shrink truncate hidden lg:inline">
										Search for a Stock...
									</span>
								</Button>
							</SearchBarPopOut>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				{Object.entries(tree).map(([label, items]) => (
					<SidebarGroup key={label}>
						<SidebarGroupLabel>{label}</SidebarGroupLabel>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>{/*<NavUser />*/}</SidebarFooter>
		</Sidebar>
	);
}
