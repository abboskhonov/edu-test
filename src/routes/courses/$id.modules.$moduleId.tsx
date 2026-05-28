import { createFileRoute, Link, useParams } from "@tanstack/react-router"
import { useSuspenseQuery, useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getCourseWithModulesFn,
  markModuleCompleteFn,
  getModuleProgressFn,
} from "@/services/courses"
import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import {
  IconArrowLeft,
  IconCheck,
  IconBook,
  IconPencil,
  IconChevronRight,
  IconChevronLeft,
} from "@tabler/icons-react"

export const Route = createFileRoute("/courses/$id/modules/$moduleId")({
  component: ModuleViewerPage,
  staleTime: 2 * 60 * 1000,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["course", params.id],
      queryFn: () => getCourseWithModulesFn({ data: { id: params.id } } as any),
    })
  },
})

function ModuleViewerPage() {
  const { id, moduleId } = useParams({ from: "/courses/$id/modules/$moduleId" })
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<"theory" | "practice">("theory")

  const { data: courseData } = useSuspenseQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseWithModulesFn({ data: { id } } as any),
  })

  const { data: progress } = useQuery({
    queryKey: ["module-progress", id, user?.id],
    queryFn: () => getModuleProgressFn({ data: { userId: user!.id, courseId: id } } as any),
    enabled: !!user,
  })

  const markCompleteMutation = useMutation({
    mutationFn: markModuleCompleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["module-progress", id, user?.id] })
      queryClient.invalidateQueries({ queryKey: ["user-courses"] })
    },
  })

  const course = courseData?.course
  const modules = courseData?.modules ?? []
  const module = modules.find((m) => m.id === moduleId)
  const currentIndex = modules.findIndex((m) => m.id === moduleId)
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null
  const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null

  const isCompleted = progress?.find((p: any) => p.moduleId === moduleId)?.completed ?? false

  if (!module || !course) {
    return (
      <div className="min-h-dvh bg-background px-4 py-24 text-center text-muted-foreground">
        Module not found.
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/courses" className="hover:text-foreground">Courses</Link>
          <span>/</span>
          <Link to="/courses/$id" params={{ id }} className="hover:text-foreground">{course.title}</Link>
          <span>/</span>
          <span className="text-foreground">Module {currentIndex + 1}</span>
        </div>

        {/* Header */}
        <div className="mt-6 flex items-center gap-3">
          <Link
            to="/courses/$id"
            params={{ id }}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
          >
            <IconArrowLeft size={16} stroke={1.5} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{module.title}</h1>
            <p className="text-sm text-muted-foreground">{module.description}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Module {currentIndex + 1} of {modules.length}</span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/[0.08] px-2 py-0.5 text-xs font-medium text-emerald-600">
                <IconCheck size={12} stroke={1.5} /> Completed
              </span>
            )}
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${((currentIndex + 1) / modules.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex border-b border-border/30">
          <button
            onClick={() => setActiveTab("theory")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "theory"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <IconBook size={16} stroke={1.5} /> Theory
          </button>
          <button
            onClick={() => setActiveTab("practice")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "practice"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <IconPencil size={16} stroke={1.5} /> Practice
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 rounded-[1.25rem] bg-black/[0.02] p-1.5 ring-1 ring-black/[0.04]">
          <div className="rounded-[calc(1.25rem-0.375rem)] bg-card px-6 py-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] sm:px-8 sm:py-8">
            {activeTab === "theory" && (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {module.theoryContent ? (
                  <div className="text-foreground">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {module.theoryContent}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No theory content yet.</p>
                )}
              </div>
            )}
            {activeTab === "practice" && (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {module.practiceContent ? (
                  <div className="text-foreground">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {module.practiceContent}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No practice content yet.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            {user && !isCompleted && (
              <button
                onClick={() => markCompleteMutation.mutate({ data: { userId: user.id, moduleId } } as any)}
                disabled={markCompleteMutation.isPending}
                className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)] active:scale-[0.98] disabled:opacity-50"
              >
                <span>Mark as Complete</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background/15 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-background/25">
                  <IconCheck size={12} stroke={1.5} className="text-background" />
                </span>
              </button>
            )}
            {user && isCompleted && (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/[0.08] px-5 py-3 text-sm font-medium text-emerald-600">
                <IconCheck size={16} stroke={1.5} /> Completed
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {prevModule && (
              <Link
                to="/courses/$id/modules/$moduleId"
                params={{ id, moduleId: prevModule.id }}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-border/60 px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted active:scale-[0.98]"
              >
                <IconChevronLeft size={16} /> Previous
              </Link>
            )}
            {nextModule && (
              <Link
                to="/courses/$id/modules/$moduleId"
                params={{ id, moduleId: nextModule.id }}
                className="group inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.98]"
              >
                Next
                <IconChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
