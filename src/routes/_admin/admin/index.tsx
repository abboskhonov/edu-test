import { createFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { adminGetArticlesFn } from "@/services/admin/articles"
import { adminGetQuizzesFn } from "@/services/admin/quizzes"
import { adminGetUsersFn } from "@/services/admin/users"
import { adminGetContactsFn } from "@/services/admin/contacts"
import {
  IconArticle,
  IconHelp,
  IconUsers,
  IconMessage,
  IconArrowRight,
} from "@tabler/icons-react"

export const Route = createFileRoute("/_admin/admin/")({
  component: AdminOverviewPage,
  staleTime: 2 * 60 * 1000,
  loader: async () => {
    const [articles, quizzes, users, contacts] = await Promise.all([
      adminGetArticlesFn(),
      adminGetQuizzesFn(),
      adminGetUsersFn(),
      adminGetContactsFn(),
    ])
    return { articles, quizzes, users, contacts }
  },
})

function AdminOverviewPage() {
  const { data: articles } = useSuspenseQuery({
    queryKey: ["admin-articles"],
    queryFn: adminGetArticlesFn,
  })
  const { data: quizzes } = useSuspenseQuery({
    queryKey: ["admin-quizzes"],
    queryFn: adminGetQuizzesFn,
  })
  const { data: users } = useSuspenseQuery({
    queryKey: ["admin-users"],
    queryFn: adminGetUsersFn,
  })
  const { data: contacts } = useSuspenseQuery({
    queryKey: ["admin-contacts"],
    queryFn: adminGetContactsFn,
  })

  const stats = [
    { label: "Articles", value: articles?.length ?? 0, icon: IconArticle, href: "/admin/articles" },
    { label: "Quizzes", value: quizzes?.length ?? 0, icon: IconHelp, href: "/admin/quizzes" },
    { label: "Users", value: users?.length ?? 0, icon: IconUsers, href: "/admin/users" },
    { label: "Contacts", value: contacts?.length ?? 0, icon: IconMessage, href: "/admin/contacts" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Overview</h1>
      <p className="mt-1 text-sm text-muted-foreground">Quick stats and recent activity.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.href}
            className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-border hover:shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
              <stat.icon size={20} stroke={1.5} />
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
            <IconArrowRight size={16} className="ml-auto text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
          </Link>
        ))}
      </div>

      {/* Recent contacts */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-foreground">Recent Contact Messages</h2>
        <div className="mt-4 space-y-3">
          {contacts && contacts.length > 0 ? (
            contacts.slice(0, 5).map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-4"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.email} &middot; {c.subject || "No subject"}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No messages yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
