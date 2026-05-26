import { createFileRoute, Outlet, redirect, Link } from "@tanstack/react-router"
import {
  IconArticle,
  IconHelp,
  IconDownload,
  IconUsers,
  IconMessage,
  IconLayoutDashboard,
  IconChevronLeft,
} from "@tabler/icons-react"

export const Route = createFileRoute("/_admin")({
  beforeLoad: async ({ context }) => {
    if (!context.session?.user) {
      throw redirect({ to: "/login" })
    }
    if ((context.session.user as any).role !== "admin") {
      throw redirect({ to: "/dashboard" })
    }
  },
  component: AdminLayout,
})

const navItems = [
  { label: "Overview", href: "/admin", icon: IconLayoutDashboard },
  { label: "Articles", href: "/admin/articles", icon: IconArticle },
  { label: "Quizzes", href: "/admin/quizzes", icon: IconHelp },
  { label: "Resources", href: "/admin/resources", icon: IconDownload },
  { label: "Users", href: "/admin/users", icon: IconUsers },
  { label: "Contacts", href: "/admin/contacts", icon: IconMessage },
]

function AdminLayout() {
  return (
    <div className="flex min-h-[calc(100dvh-64px)]">
      {/* Sidebar — fixed to viewport, full height, scrollable */}
      <aside className="fixed left-0 top-16 z-40 hidden h-[calc(100dvh-64px)] w-64 overflow-y-auto border-r border-border/60 bg-card lg:block">
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

      {/* Spacer — prevents main content from sliding under the fixed sidebar */}
      <div className="hidden w-64 shrink-0 lg:block" />

      {/* Main content — scrollable */}
      <main className="flex-1 p-4 sm:p-8">
        <Outlet />
      </main>
    </div>
  )
}
