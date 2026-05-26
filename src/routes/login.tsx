import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"

export const Route = createFileRoute("/login")({ component: LoginPage })

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    signIn.mutate({ email, password } as any)
  }

  return (
    <div className="flex min-h-[80dvh] items-center justify-center px-4 py-24">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Log in to your Teacher Writing Academy account.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="••••••••"
              required
              minLength={8}
            />
          </div>
          {signIn.isError && (
            <p className="text-sm text-destructive">
              {signIn.error instanceof Error ? signIn.error.message : "Invalid credentials"}
            </p>
          )}
          <button
            type="submit"
            disabled={signIn.isPending}
            className="h-11 w-full rounded-full bg-primary text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96] disabled:opacity-50"
          >
            {signIn.isPending ? "Logging in..." : "Log in"}
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-medium text-foreground hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}
