import { createFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { adminGetUsersFn, adminUpdateUserRoleFn } from "@/services/admin/users"
import { IconArrowLeft } from "@tabler/icons-react"

export const Route = createFileRoute("/_admin/admin/users/")({
  component: AdminUsersPage,
  loader: async () => {
    const users = await adminGetUsersFn()
    return { users }
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
                  <select
                    value={u.role}
                    onChange={(e) => {
                      updateRoleMutation.mutate({
                        data: { id: u.id, role: e.target.value },
                      } as any)
                    }}
                    className="h-8 rounded-lg border border-border bg-background px-2 text-xs outline-none"
                  >
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
