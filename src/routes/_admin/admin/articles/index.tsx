import { createFileRoute } from "@tanstack/react-router"
import { adminGetArticlesFn } from "@/services/admin/articles"
import { AdminTableSkeleton } from "@/components/skeletons"

export const Route = createFileRoute("/_admin/admin/articles/")({
  pendingComponent: AdminTableSkeleton,
  staleTime: 2 * 60 * 1000,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["admin-articles"],
      queryFn: adminGetArticlesFn,
    })
  },
})
