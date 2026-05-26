import { createFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { adminGetQuizzesFn, adminDeleteQuizFn } from "@/services/admin/quizzes"
import { IconPencil, IconTrash, IconArrowLeft, IconPlus } from "@tabler/icons-react"
import { AdminTableSkeleton } from "@/components/skeletons"

export const Route = createFileRoute("/_admin/admin/quizzes/")({
  component: AdminQuizzesPage,
  pendingComponent: AdminTableSkeleton,
  staleTime: 2 * 60 * 1000,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["admin-quizzes"],
      queryFn: adminGetQuizzesFn,
    })
  },
})

function AdminQuizzesPage() {
  const queryClient = useQueryClient()
  const { data: quizzes } = useSuspenseQuery({
    queryKey: ["admin-quizzes"],
    queryFn: adminGetQuizzesFn,
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteQuizFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-quizzes"] })
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
              <IconArrowLeft size={16} />
            </Link>
            <h1 className="text-2xl font-semibold text-foreground">Quizzes</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Manage quizzes and their questions.</p>
        </div>
        <Link
          to="/admin/quizzes/create"
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96]"
        >
          <IconPlus size={14} /> New Quiz
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border/60 bg-muted/50">
            <tr>
              <th className="px-5 py-3 font-medium text-foreground">Title</th>
              <th className="px-5 py-3 font-medium text-foreground">Category</th>
              <th className="px-5 py-3 font-medium text-foreground">Difficulty</th>
              <th className="px-5 py-3 font-medium text-foreground">Questions</th>
              <th className="px-5 py-3 font-medium text-foreground">Active</th>
              <th className="px-5 py-3 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {quizzes?.map((quiz) => (
              <tr key={quiz.id} className="transition-colors hover:bg-muted/30">
                <td className="px-5 py-4 font-medium text-foreground">{quiz.title}</td>
                <td className="px-5 py-4 text-muted-foreground">{quiz.category || "—"}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    quiz.difficulty === "Beginner" ? "bg-emerald-500/10 text-emerald-700" :
                    quiz.difficulty === "Intermediate" ? "bg-amber-500/10 text-amber-700" :
                    quiz.difficulty === "Advanced" ? "bg-rose-500/10 text-rose-700" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {quiz.difficulty}
                  </span>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{quiz.totalQuestions}</td>
                <td className="px-5 py-4 text-muted-foreground">{quiz.active ? "Yes" : "No"}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      to="/admin/quizzes/$id"
                      params={{ id: quiz.id }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      <IconPencil size={14} />
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm("Delete this quiz and all its questions?")) {
                          deleteMutation.mutate({ data: { id: quiz.id } } as any)
                        }
                      }}
                      disabled={deleteMutation.isPending}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-rose-100 hover:text-rose-600 disabled:opacity-50"
                    >
                      <IconTrash size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
