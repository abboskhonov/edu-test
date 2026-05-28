import { createLazyFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { adminGetResourcesFn, adminDeleteResourceFn } from "@/services/admin/resources"
import { IconPlus } from "@tabler/icons-react"
import { useI18n } from "@/lib/i18n"
import { AdminPageHeader, AdminDataTable, AdminActions } from "@/features/admin"

export const Route = createLazyFileRoute("/_admin/admin/resources/")({
  component: AdminResourcesPage,
})

function AdminResourcesPage() {
  const { t } = useI18n()
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
      <AdminPageHeader
        title={t("admin.resources")}
        subtitle={t("admin.manageResources")}
        backTo="/admin"
      />

      <div className="mt-6 flex items-center justify-end">
        <Link
          to="/admin/resources/create"
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96]"
        >
          <IconPlus size={14} /> {t("admin.newResource")}
        </Link>
      </div>

      <AdminDataTable headers={[t("admin.title"), t("admin.category"), t("admin.type"), t("admin.downloads"), t("admin.date"), t("admin.actions")]}>
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
              <AdminActions
                editTo="/admin/resources/$id"
                editParams={{ id: r.id }}
                onDelete={() => deleteMutation.mutate({ data: { id: r.id } } as any)}
                deleteConfirmMessage={t("admin.deleteResource")}
                isPending={deleteMutation.isPending}
              />
            </td>
          </tr>
        ))}
      </AdminDataTable>
    </div>
  )
}
