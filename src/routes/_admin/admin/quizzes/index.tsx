import { createFileRoute } from "@tanstack/react-router"
import { adminGetQuizzesFn } from "@/services/admin/quizzes"
import { AdminTableSkeleton } from "@/components/skeletons"

export const Route = createFileRoute("/_admin/admin/quizzes/")({
  pendingComponent: AdminTableSkeleton,
  staleTime: 2 * 60 * 1000,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["admin-quizzes"],
      queryFn: adminGetQuizzesFn,
    })
  },
})
