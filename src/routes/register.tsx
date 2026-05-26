import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"

export const Route = createFileRoute("/register")({ component: RegisterPage })

function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    signUp.mutate({ data: { email, password, name } } as any)
  }

  return (
    <div className="flex min-h-[80dvh] items-center justify-center px-4 py-24">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Join the Academy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Create your free account to access articles, quizzes, and resources.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Jane Doe"
              required
            />
          </div>
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
          {signUp.isError && (
            <p className="text-sm text-destructive">
              {signUp.error instanceof Error ? signUp.error.message : "Registration failed"}
            </p>
          )}
          <button
            type="submit"
            disabled={signUp.isPending}
            className="h-11 w-full rounded-full bg-primary text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96] disabled:opacity-50"
          >
            {signUp.isPending ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-foreground hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}
