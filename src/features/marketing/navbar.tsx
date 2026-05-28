import { Link } from "@tanstack/react-router"
import { useAuth } from "@/hooks/use-auth"
import { useI18n } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Logo } from "@/components/logo"

const getNavLinks = (t: (key: string) => string) => [
  { label: t("nav.articles"), href: "/articles" },
  { label: t("nav.courses"), href: "/courses" },
  { label: t("nav.quizzes"), href: "/quizzes" },
  { label: t("nav.resources"), href: "/resources" },
  { label: t("nav.research"), href: "/research" },
]

export function Navbar() {
  const { user } = useAuth()
  const { t } = useI18n()
  const navLinks = getNavLinks(t)

  return (
    <div className="fixed inset-x-0 top-0 z-50 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <nav className="mx-auto w-[80%] flex items-center justify-between gap-4 rounded-full border border-white/10 bg-foreground/95 px-5 py-2 shadow-[0_2px_16px_rgba(0,0,0,0.2)] backdrop-blur-xl md:w-[75%] lg:w-[70%] lg:px-6 2xl:max-w-4xl">
        <Logo />

        {/* Links */}
        <div className="flex min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto scrollbar-hide px-1 md:gap-2 lg:gap-3 md:overflow-visible">
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

        <div className="mx-1 hidden h-4 w-px bg-white/10 md:mx-2 lg:block" />

        {/* Language + Auth */}
        <div className="flex shrink-0 items-center gap-1">
          <LanguageSwitcher />
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="inline-flex rounded-full px-3 py-1.5 text-xs font-medium text-background/60 transition-colors hover:bg-white/10 hover:text-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none md:px-4 md:text-sm"
              >
                {t("nav.dashboard")}
              </Link>
              {(user as any).role === "admin" && (
                <Link
                  to="/admin"
                  className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-amber-400 transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none lg:inline-flex lg:px-4 lg:py-1.5"
                >
                  {t("nav.admin")}
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-background/60 transition-colors hover:bg-white/10 hover:text-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none lg:inline-flex lg:px-4 lg:py-1.5"
              >
                {t("nav.login")}
              </Link>
              <Link
                to="/register"
                className="inline-flex h-8 shrink-0 items-center rounded-full bg-white px-4 text-sm font-semibold text-foreground hover:bg-white/90 active:scale-[0.96] transition-transform focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none md:px-5 md:h-9"
              >
                {t("nav.join")}
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}
