import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";
import { ClerkProvider } from '@clerk/nextjs'
import Provider from "./_utils/Provider";

const geistSans = Geist({
  variable: "--font-cascadiaCove",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Divrec",
  description: "Created with {*:*} --@wtfpulkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-secondary`}
        >
          <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger>
            </SidebarTrigger>
            <Provider>
                {children}
            </Provider>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
