import { Link } from "@tanstack/react-router"
import { useAuth } from "@/hooks/use-auth"

const navLinks = [
  { label: "Articles", href: "/articles" },
  { label: "Courses", href: "/courses" },
  { label: "Quizzes", href: "/quizzes" },
  { label: "Resources", href: "/resources" },
  { label: "Research", href: "/research" },
]

export function Navbar() {
  const { user } = useAuth()

  return (
    <div className="fixed inset-x-0 top-0 z-50 pt-[max(0.75rem,env(safe-area-inset-top))] md:left-1/2 md:w-auto md:-translate-x-1/2 md:pt-[max(1.25rem,env(safe-area-inset-top))]">
      <nav className="mx-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-foreground/95 px-4 py-2 shadow-[0_2px_16px_rgba(0,0,0,0.2)] backdrop-blur-xl md:mx-0 md:gap-4 md:rounded-full md:px-5 md:py-2.5">
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center rounded-full px-2 py-1.5 text-sm font-semibold text-background transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          TWA
        </Link>

        {/* Links - scrollable on mobile, flex on desktop */}
        <div className="flex min-w-0 items-center gap-1 overflow-x-auto scrollbar-hide md:gap-2 md:overflow-visible">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              activeProps={{ className: "text-background bg-white/10" }}
              inactiveProps={{ className: "text-background/60 hover:text-background hover:bg-white/10" }}
              className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none md:px-4 md:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mx-1 hidden h-5 w-px bg-white/15 md:mx-2 md:block" />

        {/* Auth */}
        <div className="flex shrink-0 items-center gap-1">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="inline-flex rounded-full px-3 py-1.5 text-xs font-medium text-background/60 transition-colors hover:bg-white/10 hover:text-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none md:px-3 md:text-sm"
              >
                Dashboard
              </Link>
              {(user as any).role === "admin" && (
                <Link
                  to="/admin"
                  className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-amber-400 transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none md:inline-flex"
                >
                  Admin
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-background/60 transition-colors hover:bg-white/10 hover:text-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none md:inline-flex"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="inline-flex h-8 shrink-0 items-center rounded-full bg-background px-3 text-xs font-medium text-foreground hover:bg-background/90 active:scale-[0.96] transition-transform focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none md:px-4"
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
