import { createFileRoute, Link, useParams } from "@tanstack/react-router"
import { useSuspenseQuery, useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getCourseWithModulesFn, enrollInCourseFn, isEnrolledFn } from "@/services/courses"
import { useAuth } from "@/hooks/use-auth"
import { useInView } from "@/hooks/use-in-view"
import {
  IconArrowRight,
  IconCheck,
  IconLock,
  IconPlayerPlay,
  IconStack,
  IconArrowLeft,
} from "@tabler/icons-react"

export const Route = createFileRoute("/courses/$id")({
  component: CourseDetailPage,
  staleTime: 2 * 60 * 1000,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["course", params.id],
      queryFn: () => getCourseWithModulesFn({ data: { id: params.id } } as any),
    })
  },
})

function ScrollReveal({ children, className = "", delay = 0 }: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const stagger = delay > 0 ? ` stagger-${Math.min(Math.ceil(delay / 0.08), 8)}` : ""
  return (
    <div ref={ref} className={`animate-scroll-reveal${stagger} ${inView ? "in-view" : ""} ${className}`}>
      {children}
    </div>
  )
}

function CourseDetailPage() {
  const { id } = useParams({ from: "/courses/$id" })
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const { data } = useSuspenseQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseWithModulesFn({ data: { id } } as any),
  })

  const { data: enrolled } = useQuery({
    queryKey: ["enrolled", id, user?.id],
    queryFn: () => isEnrolledFn({ data: { userId: user!.id, courseId: id } } as any),
    enabled: !!user,
  })

  const enrollMutation = useMutation({
    mutationFn: enrollInCourseFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrolled", id, user?.id] })
      queryClient.invalidateQueries({ queryKey: ["user-courses"] })
    },
  })

  const course = data?.course
  const modules = data?.modules ?? []

  if (!course) {
    return (
      <div className="min-h-dvh bg-background px-4 py-24 text-center text-muted-foreground">
        Course not found.
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-4xl px-4 py-24 sm:py-32 lg:px-8">
        {/* Breadcrumb */}
        <ScrollReveal>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconArrowLeft size={14} stroke={1.5} />
            All courses
          </Link>
        </ScrollReveal>

        {/* Course header */}
        <ScrollReveal delay={0.1} className="mt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary/[0.06] px-3 py-1 text-[11px] font-medium text-primary">
                  {course.category || "General"}
                </span>
                {course.featured && (
                  <span className="rounded-full bg-amber-500/[0.08] px-2.5 py-1 text-[10px] font-medium text-amber-600">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
                {course.title}
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                {course.description || "No description available."}
              </p>
              <div className="mt-5 flex items-center gap-4 text-[13px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <IconStack size={14} stroke={1.5} />
                  {modules.length} modules
                </span>
              </div>
            </div>

            {/* Enrollment CTA */}
            <div className="shrink-0">
              {user && !enrolled && (
                <button
                  onClick={() => enrollMutation.mutate({ data: { userId: user.id, courseId: id } } as any)}
                  disabled={enrollMutation.isPending}
                  className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)] active:scale-[0.98] disabled:opacity-50"
                >
                  <span>Enroll Now</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background/15 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:bg-background/25">
                    <IconPlayerPlay size={12} stroke={1.5} className="text-background" />
                  </span>
                </button>
              )}
              {user && enrolled && (
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/[0.08] px-5 py-3 text-sm font-medium text-emerald-600">
                  <IconCheck size={16} stroke={1.5} />
                  Enrolled
                </span>
              )}
              {!user && (
                <Link
                  to="/login"
                  className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)] active:scale-[0.98]"
                >
                  <span>Log in to enroll</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background/15 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:bg-background/25">
                    <IconArrowRight size={12} stroke={1.5} className="text-background" />
                  </span>
                </Link>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Modules */}
        <ScrollReveal delay={0.2} className="mt-14">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">Modules</h2>
            <span className="text-sm text-muted-foreground">({modules.length})</span>
          </div>
        </ScrollReveal>

        <div className="mt-5 space-y-3">
          {modules.map((mod, i) => (
            <ScrollReveal key={mod.id} delay={0.25 + i * 0.08}>
              <Link
                to="/courses/$id/modules/$moduleId"
                params={{ id, moduleId: mod.id }}
                className="group flex items-center gap-4 rounded-[1.25rem] bg-black/[0.02] p-1.5 ring-1 ring-black/[0.04] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/[0.04] hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] hover:ring-black/[0.08]"
              >
                <div className="flex flex-1 items-center gap-4 rounded-[calc(1.25rem-0.375rem)] bg-card px-5 py-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-primary/[0.06] text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium text-foreground">{mod.title}</p>
                    <p className="text-[13px] text-muted-foreground line-clamp-1">
                      {mod.description || "No description"}
                    </p>
                  </div>
                  {enrolled ? (
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/5 transition-all duration-500 group-hover:bg-black/10">
                      <IconArrowRight size={14} stroke={1.5} className="text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </span>
                  ) : (
                    <IconLock size={16} stroke={1.5} className="shrink-0 text-muted-foreground" />
                  )}
                </div>
              </Link>
            </ScrollReveal>
          ))}
          {modules.length === 0 && (
            <p className="text-sm text-muted-foreground">No modules yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
