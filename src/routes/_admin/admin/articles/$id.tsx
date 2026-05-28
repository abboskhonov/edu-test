import { createFileRoute } from "@tanstack/react-router"
import { AdminFormSkeleton } from "@/components/skeletons"

export const Route = createFileRoute("/_admin/admin/articles/$id")({
  pendingComponent: AdminFormSkeleton,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["admin-articles"],
      queryFn: () => import("@/services/admin/articles").then((m) => m.adminGetArticlesFn()),
    })
  },
})
