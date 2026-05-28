import { Link } from "@tanstack/react-router"

const productLinks = [
  { label: "Articles", href: "/articles" },
  { label: "Courses", href: "/courses" },
  { label: "Quizzes", href: "/quizzes" },
  { label: "Resources", href: "/resources" },
  { label: "Research", href: "/research" },
]

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
]

export function Footer() {
  return (
    <footer className="w-full border-t border-border/30 px-4 py-20 md:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-muted-foreground"
            >
              TWA
            </Link>
            <p className="max-w-xs text-[14px] leading-relaxed text-muted-foreground">
              Research-based tools and professional development for writing educators worldwide.
            </p>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/60">
              Product
            </h4>
            <nav className="flex flex-col gap-2.5">
              {productLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/60">
              Company
            </h4>
            <nav className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/60">
              Legal
            </h4>
            <nav className="flex flex-col gap-2.5">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/20 pt-8 md:flex-row md:items-center">
          <p className="text-[12px] text-muted-foreground/50">
            &copy; {new Date().getFullYear()} Teacher Writing Academy. All rights reserved.
          </p>
          <p className="text-[12px] text-muted-foreground/50">
            Built for educators, by educators.
          </p>
        </div>
      </div>
    </footer>
  )
}
