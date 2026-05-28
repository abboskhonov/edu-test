import { createLazyFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { adminGetArticlesFn, adminDeleteArticleFn } from "@/services/admin/articles"
import { IconPlus } from "@tabler/icons-react"
import { useI18n } from "@/lib/i18n"
import { AdminPageHeader, AdminDataTable, AdminActions, StatusBadge } from "@/features/admin"

export const Route = createLazyFileRoute("/_admin/admin/articles/")({
  component: AdminArticlesPage,
})

function AdminArticlesPage() {
  const { t } = useI18n()
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
      <AdminPageHeader
        title={t("admin.articles")}
        subtitle={t("admin.manageArticles")}
        backTo="/admin"
        action={
          <Link
            to="/admin/articles/create"
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96]"
          >
            <IconPlus size={16} /> {t("admin.newArticle")}
          </Link>
        }
      />

      <AdminDataTable headers={[t("admin.title"), t("admin.category"), t("admin.status"), t("admin.featured"), t("admin.date"), t("admin.actions")]}>
        {articles?.map((article) => (
          <tr key={article.id} className="transition-colors hover:bg-muted/30">
            <td className="px-5 py-4 font-medium text-foreground">{article.title}</td>
            <td className="px-5 py-4 text-muted-foreground">{article.category || "—"}</td>
            <td className="px-5 py-4">
              <StatusBadge status={article.status} />
            </td>
            <td className="px-5 py-4">
              {article.featured ? (
                <span className="text-emerald-600">{t("admin.yes")}</span>
              ) : (
                <span className="text-muted-foreground">{t("admin.no")}</span>
              )}
            </td>
            <td className="px-5 py-4 text-muted-foreground">
              {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "—"}
            </td>
            <td className="px-5 py-4">
              <AdminActions
                editTo="/admin/articles/$id"
                editParams={{ id: article.id }}
                onDelete={() => deleteMutation.mutate({ data: { id: article.id } } as any)}
                deleteConfirmMessage={t("admin.deleteArticle")}
                isPending={deleteMutation.isPending}
              />
            </td>
          </tr>
        ))}
      </AdminDataTable>
    </div>
  )
}
