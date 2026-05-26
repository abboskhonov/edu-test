import { createFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { adminGetUsersFn, adminUpdateUserRoleFn } from "@/services/admin/users"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { IconArrowLeft, IconChevronDown } from "@tabler/icons-react"
import { AdminTableSkeleton } from "@/components/skeletons"

export const Route = createFileRoute("/_admin/admin/users/")({
  component: AdminUsersPage,
  pendingComponent: AdminTableSkeleton,
  staleTime: 2 * 60 * 1000,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["admin-users"],
      queryFn: adminGetUsersFn,
    })
  },
})

function AdminUsersPage() {
  const queryClient = useQueryClient()
  const { data: users } = useSuspenseQuery({
    queryKey: ["admin-users"],
    queryFn: adminGetUsersFn,
  })

  const updateRoleMutation = useMutation({
    mutationFn: adminUpdateUserRoleFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] })
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
              <IconArrowLeft size={16} />
            </Link>
            <h1 className="text-2xl font-semibold text-foreground">Users</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">View and manage registered educators.</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border/60 bg-muted/50">
            <tr>
              <th className="px-5 py-3 font-medium text-foreground">Name</th>
              <th className="px-5 py-3 font-medium text-foreground">Email</th>
              <th className="px-5 py-3 font-medium text-foreground">Role</th>
              <th className="px-5 py-3 font-medium text-foreground">Joined</th>
              <th className="px-5 py-3 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {users?.map((u) => (
              <tr key={u.id} className="transition-colors hover:bg-muted/30">
                <td className="px-5 py-4 font-medium text-foreground">{u.name}</td>
                <td className="px-5 py-4 text-muted-foreground">{u.email}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    u.role === "admin"
                      ? "bg-rose-500/10 text-rose-700"
                      : "bg-blue-500/10 text-blue-700"
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-4 text-muted-foreground">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-5 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        u.role === "admin"
                          ? "bg-rose-500/10 text-rose-700"
                          : "bg-blue-500/10 text-blue-700"
                      }`}>
                        {u.role}
                      </span>
                      <IconChevronDown size={12} className="text-muted-foreground" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[var(--anchor-width)]">
                      {["teacher", "admin"].map((role) => (
                        <DropdownMenuItem
                          key={role}
                          onClick={() => {
                            updateRoleMutation.mutate({
                              data: { id: u.id, role },
                            } as any)
                          }}
                        >
                          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            role === "admin"
                              ? "bg-rose-500/10 text-rose-700"
                              : "bg-blue-500/10 text-blue-700"
                          }`}>
                            {role}
                          </span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
