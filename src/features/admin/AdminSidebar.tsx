import { Link } from "@tanstack/react-router"
import {
  IconArticle,
  IconHelp,
  IconDownload,
  IconUsers,
  IconMessage,
  IconLayoutDashboard,
  IconChevronLeft,
  IconBook,
} from "@tabler/icons-react"

const navItems = [
  { label: "Overview", href: "/admin", icon: IconLayoutDashboard },
  { label: "Articles", href: "/admin/articles", icon: IconArticle },
  { label: "Courses", href: "/admin/courses", icon: IconBook },
  { label: "Quizzes", href: "/admin/quizzes", icon: IconHelp },
  { label: "Resources", href: "/admin/resources", icon: IconDownload },
  { label: "Users", href: "/admin/users", icon: IconUsers },
  { label: "Contacts", href: "/admin/contacts", icon: IconMessage },
] as const

export function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-dvh w-64 overflow-y-auto border-r border-border/60 bg-card lg:block">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <IconLayoutDashboard size={18} stroke={1.5} />
          </div>
          <span className="text-sm font-semibold text-foreground">Admin Panel</span>
        </div>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              activeOptions={{ exact: true }}
              activeProps={{ className: "bg-primary/5 text-primary" }}
              inactiveProps={{ className: "text-muted-foreground hover:bg-muted hover:text-foreground" }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
            >
              <item.icon size={18} stroke={1.5} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 border-t border-border/60 pt-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconChevronLeft size={16} />
            Back to site
          </Link>
        </div>
      </div>
    </aside>
  )
}
