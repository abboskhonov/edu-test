import { createFileRoute } from "@tanstack/react-router"
import { adminGetResourcesFn } from "@/services/admin/resources"
import { AdminTableSkeleton } from "@/components/skeletons"

export const Route = createFileRoute("/_admin/admin/resources/")({
  pendingComponent: AdminTableSkeleton,
  staleTime: 2 * 60 * 1000,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["admin-resources"],
      queryFn: adminGetResourcesFn,
    })
  },
})
