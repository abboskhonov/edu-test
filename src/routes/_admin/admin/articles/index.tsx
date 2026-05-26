import { createFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { adminGetArticlesFn, adminDeleteArticleFn } from "@/services/admin/articles"
import { IconPlus, IconPencil, IconTrash, IconArrowLeft } from "@tabler/icons-react"
import { AdminTableSkeleton } from "@/components/skeletons"

export const Route = createFileRoute("/_admin/admin/articles/")({
  component: AdminArticlesPage,
  pendingComponent: AdminTableSkeleton,
  staleTime: 2 * 60 * 1000,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["admin-articles"],
      queryFn: adminGetArticlesFn,
    })
  },
})

function AdminArticlesPage() {
  const queryClient = useQueryClient()
  const { data: articles } = useSuspenseQuery({
    queryKey: ["admin-articles"],
    queryFn: adminGetArticlesFn,
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteArticleFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] })
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
            <h1 className="text-2xl font-semibold text-foreground">Articles</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Manage all articles and news content.</p>
        </div>
        <Link
          to="/admin/articles/create"
          className="inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96]"
        >
          <IconPlus size={16} /> New Article
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border/60 bg-muted/50">
            <tr>
              <th className="px-5 py-3 font-medium text-foreground">Title</th>
              <th className="px-5 py-3 font-medium text-foreground">Category</th>
              <th className="px-5 py-3 font-medium text-foreground">Status</th>
              <th className="px-5 py-3 font-medium text-foreground">Featured</th>
              <th className="px-5 py-3 font-medium text-foreground">Date</th>
              <th className="px-5 py-3 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {articles?.map((article) => (
              <tr key={article.id} className="transition-colors hover:bg-muted/30">
                <td className="px-5 py-4 font-medium text-foreground">{article.title}</td>
                <td className="px-5 py-4 text-muted-foreground">{article.category || "—"}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    article.status === "published"
                      ? "bg-emerald-500/10 text-emerald-700"
                      : "bg-amber-500/10 text-amber-700"
                  }`}>
                    {article.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  {article.featured ? (
                    <span className="text-emerald-600">Yes</span>
                  ) : (
                    <span className="text-muted-foreground">No</span>
                  )}
                </td>
                <td className="px-5 py-4 text-muted-foreground">
                  {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "—"}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      to="/admin/articles/$id"
                      params={{ id: article.id }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      <IconPencil size={14} />
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm("Delete this article?")) {
                          deleteMutation.mutate({ data: { id: article.id } } as any)
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
