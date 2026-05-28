import { createLazyFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { adminGetCoursesFn, adminDeleteCourseFn } from "@/services/admin/courses"
import { IconPlus, IconBook } from "@tabler/icons-react"
import { useI18n } from "@/lib/i18n"
import { AdminPageHeader, AdminDataTable, AdminActions, StatusBadge } from "@/features/admin"

export const Route = createLazyFileRoute("/_admin/admin/courses/")({
  component: AdminCoursesPage,
})

function AdminCoursesPage() {
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const { data: courses } = useSuspenseQuery({
    queryKey: ["admin-courses"],
    queryFn: adminGetCoursesFn,
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteCourseFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] })
    },
  })

  return (
    <div>
      <AdminPageHeader
        title={t("admin.courses")}
        subtitle={t("admin.manageCourses")}
        backTo="/admin"
        action={
          <Link
            to="/admin/courses/create"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96]"
          >
            <IconPlus size={14} /> {t("admin.newCourse")}
          </Link>
        }
      />

      <AdminDataTable headers={[t("admin.title"), t("admin.category"), t("admin.status"), t("admin.featured"), t("admin.actions")]}>
        {courses?.map((course) => (
          <tr key={course.id} className="transition-colors hover:bg-muted/30">
            <td className="px-5 py-4 font-medium text-foreground">
              <div className="flex items-center gap-2">
                <IconBook size={16} className="text-muted-foreground" />
                {course.title}
              </div>
            </td>
            <td className="px-5 py-4 text-muted-foreground">{course.category || "—"}</td>
            <td className="px-5 py-4">
              <StatusBadge status={course.status} />
            </td>
            <td className="px-5 py-4 text-muted-foreground">
              {course.featured ? t("admin.yes") : t("admin.no")}
            </td>
            <td className="px-5 py-4">
              <AdminActions
                editTo="/admin/courses/$id"
                editParams={{ id: course.id }}
                onDelete={() => deleteMutation.mutate({ data: { id: course.id } } as any)}
                deleteConfirmMessage={t("admin.deleteCourse")}
                isPending={deleteMutation.isPending}
              />
            </td>
          </tr>
        ))}
      </AdminDataTable>
    </div>
  )
}
