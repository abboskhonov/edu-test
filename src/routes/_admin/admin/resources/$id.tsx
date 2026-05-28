import { createFileRoute } from "@tanstack/react-router"
import { adminGetResourceFn } from "@/services/admin/resources"
import { AdminFormSkeleton } from "@/components/skeletons"

export const Route = createFileRoute("/_admin/admin/resources/$id")({
  pendingComponent: AdminFormSkeleton,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["admin-resource", params.id],
      queryFn: () => adminGetResourceFn({ data: { id: params.id } } as any),
    })
  },
})
