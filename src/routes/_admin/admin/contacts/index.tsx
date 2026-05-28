import { createFileRoute } from "@tanstack/react-router"
import { adminGetContactsFn } from "@/services/admin/contacts"
import { AdminContactsSkeleton } from "@/components/skeletons"

export const Route = createFileRoute("/_admin/admin/contacts/")({
  pendingComponent: AdminContactsSkeleton,
  staleTime: 2 * 60 * 1000,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["admin-contacts"],
      queryFn: adminGetContactsFn,
    })
  },
})
