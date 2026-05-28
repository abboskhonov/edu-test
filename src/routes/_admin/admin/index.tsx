import { createFileRoute } from "@tanstack/react-router"
import { adminGetArticlesFn } from "@/services/admin/articles"
import { adminGetQuizzesFn } from "@/services/admin/quizzes"
import { adminGetUsersFn } from "@/services/admin/users"
import { adminGetContactsFn } from "@/services/admin/contacts"
import { adminGetCoursesFn } from "@/services/admin/courses"
import { DashboardSkeleton } from "@/components/skeletons"

export const Route = createFileRoute("/_admin/admin/")({
  pendingComponent: DashboardSkeleton,
  staleTime: 2 * 60 * 1000,
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData({
        queryKey: ["admin-articles"],
        queryFn: adminGetArticlesFn,
      }),
      context.queryClient.ensureQueryData({
        queryKey: ["admin-courses"],
        queryFn: adminGetCoursesFn,
      }),
      context.queryClient.ensureQueryData({
        queryKey: ["admin-quizzes"],
        queryFn: adminGetQuizzesFn,
      }),
      context.queryClient.ensureQueryData({
        queryKey: ["admin-users"],
        queryFn: adminGetUsersFn,
      }),
      context.queryClient.ensureQueryData({
        queryKey: ["admin-contacts"],
        queryFn: adminGetContactsFn,
      }),
    ])
  },
})
