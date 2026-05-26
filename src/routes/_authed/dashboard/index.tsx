import { createFileRoute, Link } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { getDashboardDataFn, getDashboardStatsFn } from "@/services/dashboard"
import { getQuizAttemptsFn } from "@/services/quizzes"
import { getSavedArticlesFn } from "@/services/articles"
import { useAuth } from "@/hooks/use-auth"
import { IconBook, IconCertificate, IconDownload, IconStar, IconArrowRight, IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"
import { DashboardSkeleton } from "@/components/skeletons"

export const Route = createFileRoute("/_authed/dashboard/")({
  component: DashboardPage,
  pendingComponent: DashboardSkeleton,
  staleTime: 60 * 1000,
  loader: async ({ context }) => {
    const userId = context.session?.user?.id
    if (!userId) return
    await Promise.all([
      context.queryClient.ensureQueryData({
        queryKey: ["dashboard-stats", userId],
        queryFn: () => getDashboardStatsFn({ data: { userId } } as any),
      }),
      context.queryClient.ensureQueryData({
        queryKey: ["dashboard", userId],
        queryFn: () => getDashboardDataFn({ data: { userId } } as any),
      }),
      context.queryClient.ensureQueryData({
        queryKey: ["quiz-attempts", userId],
        queryFn: () => getQuizAttemptsFn({ data: { userId } } as any),
      }),
      context.queryClient.ensureQueryData({
        queryKey: ["saved-articles", userId],
        queryFn: () => getSavedArticlesFn({ data: { userId } } as any),
      }),
    ])
  },
})

function DashboardPage() {
  const { user } = useAuth()
  const userId = user?.id

  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats", userId],
    queryFn: () => getDashboardStatsFn({ data: { userId: userId! } } as any),
    enabled: !!userId,
    staleTime: 60 * 1000,
  })

  const { data: dashboard } = useQuery({
    queryKey: ["dashboard", userId],
    queryFn: () => getDashboardDataFn({ data: { userId: userId! } } as any),
    enabled: !!userId,
    staleTime: 60 * 1000,
  })

  const { data: attempts } = useQuery({
    queryKey: ["quiz-attempts", userId],
    queryFn: () => getQuizAttemptsFn({ data: { userId: userId! } } as any),
    enabled: !!userId,
    staleTime: 60 * 1000,
  })

  const { data: saved } = useQuery({
    queryKey: ["saved-articles", userId],
    queryFn: () => getSavedArticlesFn({ data: { userId: userId! } } as any),
    enabled: !!userId,
    staleTime: 60 * 1000,
  })

  if (!userId) {
    return (
      <div className="px-4 py-24 text-center">
        <p className="text-muted-foreground">Please log in to view your dashboard.</p>
      </div>
    )
  }

  return (
    <div className="px-4 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div>
          <p className="text-sm font-medium text-muted-foreground">your space</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Your personal learning hub and progress overview.</p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={IconCertificate} label="Quizzes Taken" value={String(stats?.quizzesTaken ?? 0)} />
          <StatCard icon={IconStar} label="Avg. Score" value={`${stats?.avgScore ?? 0}%`} />
          <StatCard icon={IconBook} label="Saved Articles" value={String(stats?.savedArticles ?? 0)} />
          <StatCard icon={IconDownload} label="Downloads" value={String(stats?.downloads ?? 0)} />
        </div>

        {/* Recent quizzes */}
        <div className="mt-14">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Quiz Results</h2>
            <Link
              to="/quizzes"
              className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
            >
              Take a quiz <IconArrowRight size={14} />
            </Link>
          </div>

          {attempts && attempts.length > 0 ? (
            <div className="mt-4 space-y-3">
              {attempts.slice(0, 5).map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-card p-5"
                >
                  <div>
                    <p className="font-medium text-foreground">Quiz</p>
                    <p className="text-sm text-muted-foreground">{r.certificateTier}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-semibold ${
                      (r.percentage || 0) >= 80 ? "text-amber-600" :
                      (r.percentage || 0) >= 60 ? "text-emerald-600" :
                      (r.percentage || 0) >= 40 ? "text-blue-600" : "text-rose-600"
                    }`}>
                      {r.percentage}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {r.completedAt ? new Date(r.completedAt).toLocaleDateString() : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-border/60 bg-card p-8 text-center">
              <p className="text-muted-foreground">No quiz attempts yet.</p>
              <Link
                to="/quizzes"
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Take your first quiz <IconArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>

        {/* Saved Articles */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-foreground">Saved Articles</h2>
          {saved && saved.length > 0 ? (
            <div className="mt-4 space-y-3">
              {saved.slice(0, 5).map((s) => (
                <Link
                  key={s.article.id}
                  to="/articles/$slug"
                  params={{ slug: s.article.slug }}
                  className="group flex items-center justify-between rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-border"
                >
                  <div>
                    <p className="font-medium text-foreground transition-colors group-hover:text-primary">{s.article.title}</p>
                    <p className="text-sm text-muted-foreground">{s.article.category}</p>
                  </div>
                  <IconArrowRight size={16} className="text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-border/60 bg-card p-8 text-center">
              <p className="text-muted-foreground">No saved articles yet.</p>
              <Link
                to="/articles"
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Browse articles <IconArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>

        {/* Strength / Weakness hint */}
        {dashboard?.recentAttempts && dashboard.recentAttempts.length > 0 && (
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="flex items-center gap-2 text-emerald-600">
                <IconTrendingUp size={20} />
                <h3 className="font-semibold">Strongest Area</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Keep building on your quiz performance. Your highest scores show where your expertise shines.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="flex items-center gap-2 text-amber-600">
                <IconTrendingDown size={20} />
                <h3 className="font-semibold">Growth Area</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Lower quiz scores point to topics worth reviewing. Check recommended articles below.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value }: { icon: typeof IconBook; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
        <Icon size={20} stroke={1.5} />
      </div>
      <div>
        <p className="text-2xl font-semibold tabular-nums text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}
