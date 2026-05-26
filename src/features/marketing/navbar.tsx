import { Link } from "@tanstack/react-router"
import { useState } from "react"
import {
  IconMenu2,
  IconX,
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <>
      {/* Floating pill nav */}
      <div className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
        <nav className="flex items-center gap-1 rounded-full border border-border/60 bg-background/90 px-2 py-2 shadow-[0_2px_16px_rgba(0,0,0,0.06)] backdrop-blur-xl">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <IconBook size={16} stroke={2.5} />
            <span className="hidden sm:inline">TWA</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                activeProps={{ className: "text-foreground bg-muted" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground hover:bg-muted/60" }}
                className="rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mx-1 hidden h-4 w-px bg-border md:block" />

          {/* Desktop auth */}
          <div className="hidden items-center gap-1 md:flex">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {user.name || user.email}
                </Link>
                {(user as any).role === "admin" && (
                  <Link
                    to="/admin"
                    className="rounded-full px-3 py-1.5 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-50"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut.mutate({} as any)}
                  className="h-8 rounded-full bg-primary px-4 text-xs font-medium text-primary-foreground hover:bg-primary/90 active:scale-[0.96] transition-transform"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="inline-flex h-8 items-center rounded-full bg-primary px-4 text-xs font-medium text-primary-foreground hover:bg-primary/90 active:scale-[0.96] transition-transform"
                >
                  Join
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <IconX size={18} /> : <IconMenu2 size={18} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute left-1/2 top-20 w-[90%] max-w-sm -translate-x-1/2 rounded-2xl border border-border bg-card p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
                  >
                    Dashboard
                  </Link>
                  {(user as any).role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl px-4 py-3 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-50"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut.mutate({} as any)
                      setMobileOpen(false)
                    }}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-destructive transition-colors hover:bg-muted"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Join Academy
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
