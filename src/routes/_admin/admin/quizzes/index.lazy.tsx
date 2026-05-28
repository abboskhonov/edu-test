import { createLazyFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { adminGetQuizzesFn, adminDeleteQuizFn } from "@/services/admin/quizzes"
import { IconPlus } from "@tabler/icons-react"
import { AdminPageHeader, AdminDataTable, AdminActions, StatusBadge } from "@/features/admin"

export const Route = createLazyFileRoute("/_admin/admin/quizzes/")({
  component: AdminQuizzesPage,
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
      <AdminPageHeader
        title="Quizzes"
        subtitle="Manage quizzes and their questions."
        backTo="/admin"
        action={
          <Link
            to="/admin/quizzes/create"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96]"
          >
            <IconPlus size={14} /> New Quiz
          </Link>
        }
      />

      <AdminDataTable headers={["Title", "Category", "Difficulty", "Questions", "Active", "Actions"]}>
        {quizzes?.map((quiz) => (
          <tr key={quiz.id} className="transition-colors hover:bg-muted/30">
            <td className="px-5 py-4 font-medium text-foreground">{quiz.title}</td>
            <td className="px-5 py-4 text-muted-foreground">{quiz.category || "—"}</td>
            <td className="px-5 py-4">
              <StatusBadge status={quiz.difficulty || "—"} />
            </td>
            <td className="px-5 py-4 text-muted-foreground">{quiz.totalQuestions}</td>
            <td className="px-5 py-4 text-muted-foreground">{quiz.active ? "Yes" : "No"}</td>
            <td className="px-5 py-4">
              <AdminActions
                editTo="/admin/quizzes/$id"
                editParams={{ id: quiz.id }}
                onDelete={() => deleteMutation.mutate({ data: { id: quiz.id } } as any)}
                deleteConfirmMessage="Delete this quiz and all its questions?"
                isPending={deleteMutation.isPending}
              />
            </td>
          </tr>
        ))}
      </AdminDataTable>
    </div>
  )
}
