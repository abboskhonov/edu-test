import { createFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getResourcesFn } from "@/services/resources"
import { IconArrowLeft } from "@tabler/icons-react"

export const Route = createFileRoute("/_admin/admin/resources/")({
  component: AdminResourcesPage,
  loader: async () => {
    const resources = await getResourcesFn()
    return { resources }
  },
})

function AdminResourcesPage() {
  const { data: resources } = useSuspenseQuery({
    queryKey: ["admin-resources"],
    queryFn: getResourcesFn,
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

      <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border/60 bg-muted/50">
            <tr>
              <th className="px-5 py-3 font-medium text-foreground">Title</th>
              <th className="px-5 py-3 font-medium text-foreground">Category</th>
              <th className="px-5 py-3 font-medium text-foreground">Type</th>
              <th className="px-5 py-3 font-medium text-foreground">Downloads</th>
              <th className="px-5 py-3 font-medium text-foreground">Date</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
