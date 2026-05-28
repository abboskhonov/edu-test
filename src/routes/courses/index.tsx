import { createFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getCoursesFn } from "@/services/courses"
import { useInView } from "@/hooks/use-in-view"
import { IconArrowRight, IconStack } from "@tabler/icons-react"

export const Route = createFileRoute("/courses/")({
  component: CoursesPage,
  staleTime: 2 * 60 * 1000,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["courses"],
      queryFn: getCoursesFn,
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

function CoursesPage() {
  const { data: courses } = useSuspenseQuery({
    queryKey: ["courses"],
    queryFn: getCoursesFn,
  })

  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32 lg:px-8">
        {/* Header */}
        <ScrollReveal className="mb-16 md:mb-20">
          <div className="max-w-xl">
            <span className="mb-5 inline-block rounded-full bg-black/[0.03] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Professional Development
            </span>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
              Courses
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Structured learning paths to deepen your writing pedagogy expertise.
            </p>
          </div>
        </ScrollReveal>

        {/* Course grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {courses?.map((course, i) => (
            <ScrollReveal key={course.id} delay={i * 0.1}>
              <Link
                to="/courses/$id"
                params={{ id: course.id }}
                className="group block h-full"
              >
                {/* Double-bezel card */}
                <div className="h-full rounded-[1.5rem] bg-black/[0.03] p-1.5 ring-1 ring-black/[0.05] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:ring-black/[0.08]">
                  <div className="flex h-full flex-col gap-5 rounded-[calc(1.5rem-0.375rem)] bg-card p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] md:p-7">
                    {/* Category badge */}
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

                    <h3 className="text-[18px] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {course.title}
                    </h3>

                    <p className="text-[14px] leading-relaxed text-muted-foreground">
                      {course.description || "No description available."}
                    </p>

                    {/* Meta row */}
                    <div className="mt-auto flex items-center justify-between border-t border-border/30 pt-4">
                      <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <IconStack size={13} stroke={1.5} />
                          {(course as any).moduleCount ?? 0} modules
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-[13px] font-medium text-foreground transition-all group-hover:text-primary">
                        Start
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:bg-black/10">
                          <IconArrowRight size={11} stroke={1.5} />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {(!courses || courses.length === 0) && (
          <ScrollReveal className="mt-16 text-center">
            <p className="text-muted-foreground">No courses available yet.</p>
          </ScrollReveal>
        )}
      </div>
    </div>
  )
}
