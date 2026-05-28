import { createFileRoute } from "@tanstack/react-router"
import { adminGetQuizFn } from "@/services/admin/quizzes"
import { AdminFormSkeleton } from "@/components/skeletons"

export const Route = createFileRoute("/_admin/admin/quizzes/$id")({
  pendingComponent: AdminFormSkeleton,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["admin-quiz", params.id],
      queryFn: () => adminGetQuizFn({ data: { id: params.id } } as any),
    })
  },
})
