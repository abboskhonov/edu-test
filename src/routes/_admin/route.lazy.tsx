import { createLazyFileRoute, Outlet } from "@tanstack/react-router"
import { AdminSidebar } from "@/features/admin"

export const Route = createLazyFileRoute("/_admin")({
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <div className="flex min-h-dvh">
      <AdminSidebar />
      <div className="hidden w-64 shrink-0 lg:block" />
      <main className="flex-1 p-4 sm:p-8">
        <Outlet />
      </main>
    </div>
  )
}
