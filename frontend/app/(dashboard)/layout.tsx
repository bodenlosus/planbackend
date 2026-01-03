import "@/app/globals.css";
import "./layout.css";

import type { Metadata } from "next";
import type React from "react";
import { Suspense } from "react";
import PageLoader from "@/components/loaders/page_loader";
import { AppSidebar } from "@/components/navbar/desktop/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "FinanzQuest",
  description: "FinanzQuest",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <Suspense fallback={<PageLoader />}>
          {/*<SidebarTrigger />*/}
          <ScrollArea className="h-full pt-3 px-3 mx-2 mt-2 w-full">
            {children}
          </ScrollArea>
        </Suspense>
      </SidebarProvider>
      <Toaster />
    </>
  );
}
