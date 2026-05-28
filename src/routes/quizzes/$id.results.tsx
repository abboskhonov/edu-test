import { createFileRoute, Link } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { getQuizAttemptByIdFn } from "@/services/quizzes"
import { IconArrowLeft, IconTrophy, IconCheck, IconX, IconBook, IconArrowRight, IconRotateClockwise } from "@tabler/icons-react"
import { QuizResultsSkeleton } from "@/components/skeletons"
import { useI18n } from "@/lib/i18n"

export const Route = createFileRoute("/quizzes/$id/results")({
  component: QuizResultsPage,
  pendingComponent: QuizResultsSkeleton,
  staleTime: 60 * 1000,
})

function QuizResultsPage() {
  const { t } = useI18n()
  const { id } = Route.useParams()
  const search = Route.useSearch() as { attemptId?: string }

  const { data: attempt } = useQuery({
    queryKey: ["quiz-attempt", search.attemptId],
    queryFn: () => search.attemptId ? getQuizAttemptByIdFn({ data: { id: search.attemptId } } as any) : null,
    enabled: !!search.attemptId,
  })

  if (!attempt) {
    return (
      <div className="px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">{t("quizzes.noResultsFound")}</h1>
        <Link to="/quizzes/$id" params={{ id }} className="mt-4 inline-flex items-center gap-1 text-primary hover:underline">
          <IconArrowLeft size={16} /> {t("quizzes.takeTheQuiz")}
        </Link>
      </div>
    )
  }

  const { score, maxScore, percentage, certificateTier, answers } = attempt

  const tierConfig: Record<string, { label: string; color: string; icon: typeof IconTrophy; message: string }> = {
    Expert: { label: t("quizzes.expert"), color: "text-amber-600 bg-amber-500/10 border-amber-200", icon: IconTrophy, message: t("quizzes.expertMessage") },
    Proficient: { label: t("quizzes.proficient"), color: "text-emerald-600 bg-emerald-500/10 border-emerald-200", icon: IconCheck, message: t("quizzes.proficientMessage") },
    Developing: { label: t("quizzes.developing"), color: "text-blue-600 bg-blue-500/10 border-blue-200", icon: IconBook, message: t("quizzes.developingMessage") },
    Beginner: { label: t("quizzes.beginner"), color: "text-rose-600 bg-rose-500/10 border-rose-200", icon: IconBook, message: t("quizzes.beginnerMessage") },
  }

  const tier = tierConfig[certificateTier || "Beginner"] || tierConfig.Beginner
  const TierIcon = tier.icon

  return (
    <div className="px-4 py-12 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/quizzes"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <IconArrowLeft size={16} /> {t("quizzes.allQuizzes")}
        </Link>

        {/* Score Card */}
        <div className={`mt-8 rounded-2xl border p-8 text-center ${tier.color}`}>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/60">
            <TierIcon size={32} stroke={1.5} />
          </div>
          <h2 className="mt-4 text-3xl font-bold">{percentage}%</h2>
          <p className="mt-1 text-sm font-medium uppercase tracking-wider">{tier.label}</p>
          <p className="mt-2 text-sm opacity-80">{tier.message}</p>
          <p className="mt-4 text-lg font-semibold">{score} / {maxScore} {t("quizzes.correct")}</p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to="/quizzes/$id"
            params={{ id }}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-5 text-sm font-medium text-foreground transition-all hover:bg-muted active:scale-[0.96]"
          >
            <IconRotateClockwise size={16} /> {t("quizzes.retakeQuiz")}
          </Link>
          <Link
            to="/articles"
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96]"
          >
            {t("quizzes.readArticles")} <IconArrowRight size={16} />
          </Link>
        </div>

        {/* Question Review */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-foreground">{t("quizzes.questionReview")}</h3>
          <div className="mt-4 space-y-4">
            {answers?.map((a: any, i: number) => (
              <div
                key={i}
                className={`rounded-xl border p-5 ${
                  a.isCorrect ? "border-emerald-200 bg-emerald-50/50" : "border-rose-200 bg-rose-50/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    a.isCorrect ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                  }`}>
                    {a.isCorrect ? <IconCheck size={14} /> : <IconX size={14} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{t("quizzes.question")} {i + 1}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("quizzes.yourAnswer")} <span className={a.isCorrect ? "text-emerald-700 font-medium" : "text-rose-700 font-medium"}>
                        {a.selectedAnswer >= 0 ? String.fromCharCode(65 + a.selectedAnswer) : t("quizzes.noAnswer")}
                      </span>
                      {!a.isCorrect && (
                        <span className="ml-3 text-emerald-700">
                          {t("quizzes.correctAnswer")} {String.fromCharCode(65 + a.correctAnswer)}
                        </span>
                      )}
                    </p>
                    {a.explanation && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        <span className="font-medium text-foreground">{t("quizzes.explanation")}</span> {a.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
