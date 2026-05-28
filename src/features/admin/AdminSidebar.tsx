import { Link } from "@tanstack/react-router"
import { useI18n } from "@/lib/i18n"
import {
  IconArticle,
  IconHelp,
  IconDownload,
  IconUsers,
  IconMessage,
  IconLayoutDashboard,
  IconChevronLeft,
  IconBook,
  IconPencil,
} from "@tabler/icons-react"

function getNavItems(t: (key: string) => string) {
  return [
    { label: t("admin.overview"), href: "/admin", icon: IconLayoutDashboard },
    { label: t("admin.articles"), href: "/admin/articles", icon: IconArticle },
    { label: t("admin.courses"), href: "/admin/courses", icon: IconBook },
    { label: t("admin.quizzes"), href: "/admin/quizzes", icon: IconHelp },
    { label: t("admin.resources"), href: "/admin/resources", icon: IconDownload },
    { label: t("admin.users"), href: "/admin/users", icon: IconUsers },
    { label: t("admin.contacts"), href: "/admin/contacts", icon: IconMessage },
  ]
}

export function AdminSidebar() {
  const { t } = useI18n()
  const navItems = getNavItems(t)
  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-dvh w-[15rem] flex-col bg-card border-r border-border/20 lg:flex">
      {/* Header */}
      <div className="shrink-0 px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground text-background">
            <IconPencil size={15} stroke={2.5} />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold tracking-tight text-foreground">{t("admin.teacherWritingAcademy")}</p>
            <p className="text-[11px] font-medium text-muted-foreground/60 tracking-wide">{t("admin.admin")}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <div className="space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              activeOptions={item.href === "/admin" ? { exact: true } : undefined}
              activeProps={{
                className: "bg-primary/10 text-primary font-semibold",
              }}
              inactiveProps={{
                className: "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              }}
              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-200"
            >
              <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center transition-transform duration-200 group-hover:scale-[1.05]">
                <item.icon size={17} stroke={1.5} />
              </span>
              <span className="transition-colors duration-200">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="shrink-0 px-3 pb-4 pt-2">
        <Link
          to="/"
          className="group flex items-center gap-2 rounded-lg px-3 py-2.5 text-[12px] text-muted-foreground/60 transition-all duration-200 hover:text-muted-foreground hover:bg-muted/50"
        >
          <IconChevronLeft
            size={13}
            stroke={2.5}
            className="transition-transform duration-200 group-hover:-translate-x-[2px]"
          />
          <span className="font-medium">{t("admin.backToSite")}</span>
        </Link>
      </div>
    </aside>
  )
}
