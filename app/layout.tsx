import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import AppHeader from "@/app/components/AppHeader";
import AppSidebar from "@/app/components/AppSidebar";
import PageContainer from "@/app/components/PageContainer";
import { SidebarProvider } from "@/components/ui/sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard | Next.js",
  description: "dashboard playground next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NuqsAdapter defaultOptions={{ shallow: false }}>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
              <AppHeader />
              <PageContainer>{children}</PageContainer>
            </main>
          </SidebarProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
