import { createFileRoute } from "@tanstack/react-router"
import { adminGetCourseWithModulesFn } from "@/services/admin/courses"

export const Route = createFileRoute("/_admin/admin/courses/$id")({
  staleTime: 2 * 60 * 1000,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["admin-course", params.id],
      queryFn: () => adminGetCourseWithModulesFn({ data: { id: params.id } } as any),
    })
  },
})
