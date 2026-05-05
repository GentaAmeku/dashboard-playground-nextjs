import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import AppHeader from "./components/AppHeader";
import AppSidebar from "./components/AppSidebar";
import PageContainer from "./components/PageContainer";

async function AuthGate({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");
  return <>{children}</>;
}

export default function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AppHeader />
        <PageContainer>
          <Suspense>
            <AuthGate>{children}</AuthGate>
          </Suspense>
        </PageContainer>
      </main>
    </SidebarProvider>
  );
}
