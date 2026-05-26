import { createFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getQuizzesFn } from "@/services/quizzes"
import { IconArrowRight, IconClock } from "@tabler/icons-react"
import { PublicGridSkeleton } from "@/components/skeletons"

export const Route = createFileRoute("/quizzes/")({
  component: QuizzesPage,
  pendingComponent: PublicGridSkeleton,
  staleTime: 5 * 60 * 1000,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["quizzes"],
      queryFn: getQuizzesFn,
    })
  },
})

function QuizzesPage() {
  const { data: quizzes } = useSuspenseQuery({
    queryKey: ["quizzes"],
    queryFn: getQuizzesFn,
  })

  const difficultyBadge: Record<string, string> = {
    Beginner: "bg-emerald-500/10 text-emerald-700",
    Intermediate: "bg-amber-500/10 text-amber-700",
    Advanced: "bg-rose-500/10 text-rose-700",
    Mixed: "bg-blue-500/10 text-blue-700",
  }

  return (
    <div className="px-4 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium text-muted-foreground">assessments</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Knowledge Assessments
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
          Evaluate your expertise across six professional domains.
          Get instant feedback and personalized recommendations.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes?.map((q) => (
          <div
            key={q.id}
            className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-border hover:shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${difficultyBadge[q.difficulty || ""] || "bg-muted text-muted-foreground"}`}>
                {q.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <IconClock size={12} /> {q.timeLimitMinutes} min
              </span>
            </div>
            <h3 className="font-medium text-foreground">{q.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{q.description}</p>
            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="text-xs text-muted-foreground">{q.totalQuestions} questions</span>
              <Link
                to="/quizzes/$id"
                params={{ id: q.id }}
                className="inline-flex h-8 items-center justify-center gap-1 rounded-full bg-primary px-4 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96]"
              >
                Start <IconArrowRight size={12} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
