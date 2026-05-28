import { createFileRoute } from "@tanstack/react-router"
import { adminGetCoursesFn } from "@/services/admin/courses"
import { AdminTableSkeleton } from "@/components/skeletons"

export const Route = createFileRoute("/_admin/admin/courses/")({
  pendingComponent: AdminTableSkeleton,
  staleTime: 2 * 60 * 1000,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["admin-courses"],
      queryFn: adminGetCoursesFn,
    })
  },
})
