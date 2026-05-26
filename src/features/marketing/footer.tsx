import { Link } from "@tanstack/react-router"
import { IconBook } from "@tabler/icons-react"

const footerLinks = [
  { label: "Articles", href: "/articles" },
  { label: "Quizzes", href: "/quizzes" },
  { label: "Resources", href: "/resources" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 px-4 py-12 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <IconBook size={14} stroke={2.5} />
          </span>
          Teacher Writing Academy
        </Link>

        {/* Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="h-px w-16 bg-border" />

        {/* Bottom */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} Teacher Writing Academy
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-xs text-muted-foreground/60 hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground/60 hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
