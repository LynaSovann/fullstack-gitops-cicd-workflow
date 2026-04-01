import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LogoutButton } from "@/components/auth/logout-button";
import { UserInfo } from "@/components/dashboard/user-info";
import type { SafeUser } from "@/types/user";

export const metadata = {
  title: "Dashboard",
  description: "Your account dashboard",
};

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const safeUser: SafeUser = {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <LogoutButton />
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            Welcome back, {user.email.split("@")[0]}!
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your account.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <UserInfo user={safeUser} />
        </div>
      </div>
    </main>
  );
}
