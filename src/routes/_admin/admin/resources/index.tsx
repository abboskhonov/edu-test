import { createFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { adminGetResourcesFn, adminDeleteResourceFn } from "@/services/admin/resources"
import { IconArrowLeft, IconPlus, IconPencil, IconTrash } from "@tabler/icons-react"
import { AdminTableSkeleton } from "@/components/skeletons"

export const Route = createFileRoute("/_admin/admin/resources/")({
  component: AdminResourcesPage,
  pendingComponent: AdminTableSkeleton,
  staleTime: 2 * 60 * 1000,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["admin-resources"],
      queryFn: adminGetResourcesFn,
    })
  },
})

function AdminResourcesPage() {
  const queryClient = useQueryClient()
  const { data: resources } = useSuspenseQuery({
    queryKey: ["admin-resources"],
    queryFn: adminGetResourcesFn,
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteResourceFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] })
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
            <h1 className="text-2xl font-semibold text-foreground">Resources</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Manage downloadable files and materials.</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end">
        <Link
          to="/admin/resources/create"
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96]"
        >
          <IconPlus size={14} /> Add Resource
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border/60 bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border/60 bg-muted/50">
            <tr>
              <th className="px-5 py-3 font-medium text-foreground">Title</th>
              <th className="px-5 py-3 font-medium text-foreground">Category</th>
              <th className="px-5 py-3 font-medium text-foreground">Type</th>
              <th className="px-5 py-3 font-medium text-foreground">Downloads</th>
              <th className="px-5 py-3 font-medium text-foreground">Date</th>
              <th className="px-5 py-3 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {resources?.map((r) => (
              <tr key={r.id} className="transition-colors hover:bg-muted/30">
                <td className="px-5 py-4 font-medium text-foreground">{r.title}</td>
                <td className="px-5 py-4 text-muted-foreground">{r.category || "—"}</td>
                <td className="px-5 py-4">
                  <span className="rounded bg-muted px-2 py-0.5 text-xs">{r.fileType}</span>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{r.downloadCount}</td>
                <td className="px-5 py-4 text-muted-foreground">
                  {new Date(r.createdAt).toLocaleDateString()}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      to="/admin/resources/$id"
                      params={{ id: r.id }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      <IconPencil size={14} />
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm("Delete this resource?")) {
                          deleteMutation.mutate({ data: { id: r.id } } as any)
                        }
                      }}
                      disabled={deleteMutation.isPending}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-rose-100 hover:text-rose-600 disabled:opacity-50"
                    >
                      <IconTrash size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
