import { createLazyFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { adminGetUsersFn, adminUpdateUserRoleFn } from "@/services/admin/users"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { IconChevronDown } from "@tabler/icons-react"
import { AdminPageHeader, AdminDataTable, StatusBadge } from "@/features/admin"

export const Route = createLazyFileRoute("/_admin/admin/users/")({
  component: AdminUsersPage,
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
      <AdminPageHeader
        title="Users"
        subtitle="View and manage registered educators."
        backTo="/admin"
      />

      <AdminDataTable headers={["Name", "Email", "Role", "Joined", "Actions"]}>
        {users?.map((u) => (
          <tr key={u.id} className="transition-colors hover:bg-muted/30">
            <td className="px-5 py-4 font-medium text-foreground">{u.name}</td>
            <td className="px-5 py-4 text-muted-foreground">{u.email}</td>
            <td className="px-5 py-4">
              <StatusBadge status={u.role} />
            </td>
            <td className="px-5 py-4 text-muted-foreground">
              {new Date(u.createdAt).toLocaleDateString()}
            </td>
            <td className="px-5 py-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <StatusBadge status={u.role} />
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
                      <StatusBadge status={role} />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
        ))}
      </AdminDataTable>
    </div>
  )
}
