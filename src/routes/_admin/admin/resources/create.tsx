import { createFileRoute } from "@tanstack/react-router"
import { AdminFormSkeleton } from "@/components/skeletons"

export const Route = createFileRoute("/_admin/admin/resources/create")({
  pendingComponent: AdminFormSkeleton,
})
