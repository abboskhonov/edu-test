import { createFileRoute, Link } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { getDashboardDataFn, getDashboardStatsFn } from "@/services/dashboard"
import { getQuizAttemptsFn } from "@/services/quizzes"
import { getSavedArticlesFn } from "@/services/articles"
import { getUserCoursesFn } from "@/services/courses"
import { IconBook, IconCertificate, IconDownload, IconStar, IconArrowRight, IconTrendingUp, IconTrendingDown, IconPlayerPlay } from "@tabler/icons-react"
import { DashboardSkeleton } from "@/components/skeletons"
import { useI18n } from "@/lib/i18n"

export const Route = createFileRoute("/_authed/dashboard/")({
  component: DashboardPage,
  pendingComponent: DashboardSkeleton,
  staleTime: 60 * 1000,
  loader: async ({ context }) => {
    const userId = context.session?.user?.id
    if (!userId) return { userId: null }
    try {
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
        context.queryClient.ensureQueryData({
          queryKey: ["user-courses", userId],
          queryFn: () => getUserCoursesFn({ data: { userId } } as any),
        }),
      ])
    } catch {
      // If ensureQueryData fails, the component's useQuery will fetch instead
    }
    return { userId }
  },
})

function DashboardPage() {
  const { t } = useI18n()
  const { userId } = Route.useLoaderData()

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats", userId],
    queryFn: () => getDashboardStatsFn({ data: { userId: userId! } } as any),
    enabled: !!userId,
    staleTime: 60 * 1000,
  })

  const { data: dashboard, isLoading: dashboardLoading } = useQuery({
    queryKey: ["dashboard", userId],
    queryFn: () => getDashboardDataFn({ data: { userId: userId! } } as any),
    enabled: !!userId,
    staleTime: 60 * 1000,
  })

  const { data: attempts, isLoading: attemptsLoading } = useQuery({
    queryKey: ["quiz-attempts", userId],
    queryFn: () => getQuizAttemptsFn({ data: { userId: userId! } } as any),
    enabled: !!userId,
    staleTime: 60 * 1000,
  })

  const { data: saved, isLoading: savedLoading } = useQuery({
    queryKey: ["saved-articles", userId],
    queryFn: () => getSavedArticlesFn({ data: { userId: userId! } } as any),
    enabled: !!userId,
    staleTime: 60 * 1000,
  })

  const { data: userCourses, isLoading: coursesLoading } = useQuery({
    queryKey: ["user-courses", userId],
    queryFn: () => getUserCoursesFn({ data: { userId: userId! } } as any),
    enabled: !!userId,
    staleTime: 60 * 1000,
  })

  if (!userId) {
    return (
      <div className="px-4 py-24 text-center">
        <p className="text-muted-foreground">{t("dashboard.loginPrompt")}</p>
      </div>
    )
  }

  const isLoading = statsLoading || dashboardLoading || attemptsLoading || savedLoading || coursesLoading

  return (
    <div className="px-4 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{t("dashboard.yourSpace")}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{t("dashboard.title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("dashboard.subtitle")}</p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="mt-10">
            <DashboardSkeleton />
          </div>
        )}

        {/* Stats */}
        {!isLoading && (
          <>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={IconCertificate} label={t("dashboard.quizzesTaken")} value={String(stats?.quizzesTaken ?? 0)} />
              <StatCard icon={IconStar} label={t("dashboard.avgScore")} value={`${stats?.avgScore ?? 0}%`} />
              <StatCard icon={IconBook} label={t("dashboard.savedArticles")} value={String(stats?.savedArticles ?? 0)} />
              <StatCard icon={IconDownload} label={t("dashboard.downloads")} value={String(stats?.downloads ?? 0)} />
            </div>

            {/* Recent quizzes */}
            <div className="mt-14">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">{t("dashboard.recentQuizResults")}</h2>
                <Link
                  to="/quizzes"
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                >
                  {t("dashboard.takeQuiz")} <IconArrowRight size={14} />
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
                  <p className="text-muted-foreground">{t("dashboard.noQuizAttempts")}</p>
                  <Link
                    to="/quizzes"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    {t("dashboard.firstQuiz")} <IconArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>

            {/* Saved Articles */}
            <div className="mt-14">
              <h2 className="text-lg font-semibold text-foreground">{t("dashboard.savedArticlesTitle")}</h2>
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
                  <p className="text-muted-foreground">{t("dashboard.noSavedArticles")}</p>
                  <Link
                    to="/articles"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    {t("dashboard.browseArticles")} <IconArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>

            {/* Enrolled Courses */}
            <div className="mt-14">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">{t("dashboard.myCourses")}</h2>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                >
                  {t("dashboard.browseCourses")} <IconArrowRight size={14} />
                </Link>
              </div>
              {userCourses && userCourses.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {userCourses.map((uc: any) => (
                    <Link
                      key={uc.enrollment.id}
                      to="/courses/$id"
                      params={{ id: uc.course.id }}
                      className="group flex items-center justify-between rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <IconPlayerPlay size={20} stroke={1.5} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground transition-colors group-hover:text-primary">{uc.course.title}</p>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{uc.progress.completed} / {uc.progress.total} {t("dashboard.modules")}</span>
                            <span className="rounded-full bg-muted px-2 py-0.5 font-medium">{uc.progress.percentage}%</span>
                          </div>
                        </div>
                      </div>
                      <IconArrowRight size={16} className="text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-dashed border-border/60 bg-card p-8 text-center">
                  <p className="text-muted-foreground">{t("dashboard.noEnrolledCourses")}</p>
                  <Link
                    to="/courses"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    {t("dashboard.browseCourses")} <IconArrowRight size={14} />
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
                    <h3 className="font-semibold">{t("dashboard.strongestArea")}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("dashboard.strongestAreaDesc")}
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card p-6">
                  <div className="flex items-center gap-2 text-amber-600">
                    <IconTrendingDown size={20} />
                    <h3 className="font-semibold">{t("dashboard.growthArea")}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("dashboard.growthAreaDesc")}
                  </p>
                </div>
              </div>
            )}
          </>
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
