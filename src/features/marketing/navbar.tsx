import { Link } from "@tanstack/react-router"
import {
  IconBook,
} from "@tabler/icons-react"
import { useAuth } from "@/hooks/use-auth"

const navLinks = [
  { label: "Articles", href: "/articles" },
  { label: "Quizzes", href: "/quizzes" },
  { label: "Resources", href: "/resources" },
  { label: "Research", href: "/research" },
]

export function Navbar() {
  const { user, signOut } = useAuth()

  return (
    <div className="fixed inset-x-0 top-0 z-50 pt-[max(0.75rem,env(safe-area-inset-top))] md:left-1/2 md:w-auto md:-translate-x-1/2 md:pt-[max(1.25rem,env(safe-area-inset-top))]">
      <nav className="mx-4 flex items-center justify-between gap-2 rounded-2xl border border-border/60 bg-background/90 px-3 py-2 shadow-[0_2px_16px_rgba(0,0,0,0.06)] backdrop-blur-xl md:mx-0 md:gap-1 md:rounded-full md:px-2 md:py-2">
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 rounded-full px-2 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <IconBook size={16} stroke={2.5} />
          <span>TWA</span>
        </Link>

        {/* Links - scrollable on mobile, flex on desktop */}
        <div className="flex min-w-0 items-center gap-0.5 overflow-x-auto scrollbar-hide md:overflow-visible">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              activeProps={{ className: "text-foreground bg-muted" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground hover:bg-muted/60" }}
              className="shrink-0 rounded-full px-2 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none md:px-3 md:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mx-0.5 hidden h-4 w-px bg-border md:mx-1 md:block" />

        {/* Auth */}
        <div className="flex shrink-0 items-center gap-1">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none md:inline-flex"
              >
                {user.name || user.email}
              </Link>
              {(user as any).role === "admin" && (
                <Link
                  to="/admin"
                  className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none md:inline-flex"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => signOut.mutate({} as any)}
                className="h-8 shrink-0 rounded-full bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90 active:scale-[0.96] transition-transform focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none md:px-4"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none md:inline-flex"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="inline-flex h-8 shrink-0 items-center rounded-full bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90 active:scale-[0.96] transition-transform focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none md:px-4"
              >
                Join
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}
