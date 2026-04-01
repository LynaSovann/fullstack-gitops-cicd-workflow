import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";

export default async function HomePage() {
  const session = await getSession();

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold">MyApp</h1>
          <nav className="flex items-center gap-4">
            {session ? (
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Get started</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>
      <section className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to MyApp
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          A full-stack authentication system built with Next.js, Prisma, and
          PostgreSQL. Secure, modern, and ready for production.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          {session ? (
            <Button size="lg" asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button size="lg" asChild>
                <Link href="/register">Create account</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
