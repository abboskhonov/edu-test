import { createFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getFeaturedArticlesFn } from "@/services/articles"
import { getQuizzesFn } from "@/services/quizzes"
import { Hero } from "@/features/marketing/hero"
import { useInView } from "@/hooks/use-in-view"
import {
  IconArrowRight,
  IconArrowUpRight,
  IconBook,
  IconCertificate,
  IconFileText,
  IconLibrary,
  IconChartBar,
  IconClock,
} from "@tabler/icons-react"
import { HomeSkeleton } from "@/components/skeletons"
import { useI18n } from "@/lib/i18n"

export const Route = createFileRoute("/")({
  component: HomePage,
  pendingComponent: HomeSkeleton,
  staleTime: 5 * 60 * 1000,
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData({
        queryKey: ["featured-articles"],
        queryFn: getFeaturedArticlesFn,
      }),
      context.queryClient.ensureQueryData({
        queryKey: ["quizzes"],
        queryFn: getQuizzesFn,
      }),
    ])
  },
})

function ScrollReveal({ children, className = "", delay = 0, scale = false }: {
  children: React.ReactNode
  className?: string
  delay?: number
  scale?: boolean
}) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const base = scale ? "animate-scroll-reveal-scale" : "animate-scroll-reveal"
  const stagger = delay > 0 ? ` stagger-${Math.min(Math.ceil(delay / 0.08), 8)}` : ""
  return (
    <div ref={ref} className={`${base}${stagger} ${inView ? "in-view" : ""} ${className}`}>
      {children}
    </div>
  )
}

function HomePage() {
  const { t } = useI18n()
  const { data: featuredArticles } = useSuspenseQuery({
    queryKey: ["featured-articles"],
    queryFn: getFeaturedArticlesFn,
  })

  const { data: quizzes } = useSuspenseQuery({
    queryKey: ["quizzes"],
    queryFn: getQuizzesFn,
  })

  return (
    <div>
      <Hero />

      {/* ─── Use Cases ─── Asymmetrical Bento Grid ─── */}
      <section className="px-4 py-32 md:py-40">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mb-20 md:mb-28">
            <div className="max-w-xl">
              <span className="mb-5 inline-block rounded-full bg-black/[0.03] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {t("home.whyTwa")}
              </span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
                {t("home.builtForEducators")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {getUseCases(t).map((u, i) => (
              <ScrollReveal
                key={u.title}
                delay={i * 0.12}
                scale
                className={`${i === 0 ? "lg:col-span-2" : ""}`}
              >
                {/* Double-bezel card */}
                <div className="group h-full rounded-[2rem] bg-black/[0.03] p-1.5 ring-1 ring-black/[0.05] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:ring-black/[0.08]">
                  <div className="flex h-full flex-col gap-5 rounded-[calc(2rem-0.375rem)] bg-card p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] md:p-8">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-primary/[0.06] text-primary transition-colors duration-500 group-hover:bg-primary/[0.1]">
                      <u.icon size={22} stroke={1.2} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{u.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                        {u.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Articles ─── Editorial Split ─── */}
      <section className="border-y border-border/30 px-4 py-32 md:py-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end">
            <ScrollReveal>
              <div className="max-w-lg">
                <span className="mb-4 inline-block rounded-full bg-black/[0.03] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {t("home.journal")}
                </span>
                <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
                  {t("home.featuredArticles")}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  {t("home.featuredArticlesDesc")}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Link
                to="/articles"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)] active:scale-[0.98]"
              >
                <span>{t("home.viewAllArticles")}</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background/15 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:bg-background/25">
                  <IconArrowRight size={12} stroke={1.5} className="text-background" />
                </span>
              </Link>
            </ScrollReveal>
          </div>

          <div className="space-y-4">
            {featuredArticles?.slice(0, 3).map((article, i) => (
              <ScrollReveal key={article.slug} delay={i * 0.1}>
                <Link
                  to="/articles/$slug"
                  params={{ slug: article.slug }}
                  className="group flex flex-col gap-5 rounded-[1.5rem] bg-black/[0.02] p-1.5 ring-1 ring-black/[0.04] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-black/[0.04] hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] hover:ring-black/[0.08] md:flex-row md:items-center md:gap-8"
                >
                  <div className="flex flex-1 flex-col gap-3 rounded-[calc(1.5rem-0.375rem)] bg-card px-6 py-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] md:flex-row md:items-center md:px-8 md:py-6">
                    <span className="shrink-0 self-start rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground">
                      {article.category}
                    </span>
                    <h3 className="flex-1 text-[15px] font-medium text-foreground transition-colors group-hover:text-primary md:text-base">
                      {article.title}
                    </h3>
                    <p className="hidden max-w-xs text-sm text-muted-foreground lg:block">
                      {article.excerpt}
                    </p>
                    <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-all group-hover:text-foreground">
                      {t("home.read")}
                      <IconArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quiz CTA ─── Asymmetrical Layout ─── */}
      <section className="px-4 py-32 md:py-40">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Left: editorial text */}
            <ScrollReveal>
              <div className="lg:sticky lg:top-32">
                <span className="mb-5 inline-block rounded-full bg-black/[0.03] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {t("home.assessments")}
                </span>
                <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
                  {t("home.testOnce")}
                  <br />
                  {t("home.keepGrowing")}
                </h2>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                  {t("home.assessmentsDesc")}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    to="/quizzes"
                    className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)] active:scale-[0.98]"
                  >
                    <span>{t("home.takeAssessment")}</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background/15 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:bg-background/25">
                      <IconArrowRight size={12} stroke={1.5} className="text-background" />
                    </span>
                  </Link>
                  <Link
                    to="/quizzes"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t("home.browseAll")}
                    <IconArrowUpRight size={14} stroke={1.5} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: bento quiz cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {quizzes?.filter(q => !q.isDiagnostic).slice(0, 4).map((q, i) => (
                <ScrollReveal key={q.id} delay={i * 0.12} scale>
                  <Link
                    to="/quizzes/$id"
                    params={{ id: q.id }}
                    className="group block h-full rounded-[1.5rem] bg-black/[0.03] p-1.5 ring-1 ring-black/[0.05] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)] hover:ring-black/[0.08]"
                  >
                    <div className="flex h-full flex-col gap-4 rounded-[calc(1.5rem-0.375rem)] bg-card p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] md:p-6">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/[0.06] px-2.5 py-0.5 text-[11px] font-medium text-primary">
                          <IconClock size={11} stroke={1.5} />
                          {q.timeLimitMinutes} {t("home.min")}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {q.totalQuestions} {t("home.questions")}
                        </span>
                      </div>
                      <h4 className="text-[15px] font-medium text-foreground">{q.title}</h4>
                      <p className="mt-auto text-[13px] leading-relaxed text-muted-foreground">
                        {q.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                        {t("home.startAssessment")}
                        <IconArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Resources ─── Bento Grid ─── */}
      <section className="border-y border-border/30 px-4 py-32 md:py-40">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mb-16 md:mb-20">
            <div className="max-w-xl">
              <span className="mb-4 inline-block rounded-full bg-black/[0.03] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {t("home.resourceLibrary")}
              </span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
                {t("home.alwaysOpen")}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                {t("home.resourceLibraryDesc")}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {getResourceCategories(t).map((cat, i) => (
              <ScrollReveal key={cat.label} delay={i * 0.1} scale>
                <Link
                  to="/resources"
                  className="group block h-full rounded-[1.5rem] bg-black/[0.03] p-1.5 ring-1 ring-black/[0.05] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)] hover:ring-black/[0.08]"
                >
                  <div className="flex h-full flex-col gap-4 rounded-[calc(1.5rem-0.375rem)] bg-card p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-primary/[0.06] text-primary transition-colors group-hover:bg-primary/[0.1]">
                      <cat.icon size={22} stroke={1.2} />
                    </div>
                    <h3 className="text-[15px] font-medium text-foreground">{cat.label}</h3>
                    <p className="mt-auto text-[13px] text-muted-foreground">
                      {cat.count} {t("home.files")}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── Z-Axis Cascade ─── */}
      <section className="px-4 py-32 md:py-40">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mb-16 md:mb-20">
            <div className="max-w-xl">
              <span className="mb-4 inline-block rounded-full bg-black/[0.03] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {t("home.testimonials")}
              </span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
                {t("home.educatorsTrust")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-3">
            {getTestimonials(t).map((item, i) => (
              <ScrollReveal
                key={item.name}
                delay={i * 0.15}
                scale
                className={`${i === 1 ? "sm:translate-y-6" : ""}`}
              >
                <div className="h-full rounded-[1.5rem] bg-black/[0.03] p-1.5 ring-1 ring-black/[0.05]">
                  <div className="flex h-full flex-col gap-6 rounded-[calc(1.5rem-0.375rem)] bg-card p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] md:p-8">
                    <p className="text-[15px] leading-[1.7] text-foreground">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div className="mt-auto flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-[11px] font-semibold text-background">
                        {item.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="text-[12px] text-muted-foreground">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── Editorial ─── */}
      <section className="border-t border-border/30 px-4 py-32 md:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
              {t("home.readyToAdvance")}
              <br className="hidden sm:block" /> {t("home.yourTeaching")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              {t("home.finalCtaDesc")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3} className="mt-10">
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="group inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)] active:scale-[0.98]"
              >
                <span>{t("home.joinAcademy")}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background/15 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:bg-background/25">
                  <IconArrowRight size={14} stroke={1.5} className="text-background" />
                </span>
              </Link>
              <Link
                to="/articles"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-8 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted active:scale-[0.98]"
              >
                {t("home.exploreArticles")}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

function getUseCases(t: (key: string) => string) {
  return [
    {
      title: t("home.useCases.assessReflect.title"),
      description: t("home.useCases.assessReflect.description"),
      icon: IconChartBar,
    },
    {
      title: t("home.useCases.readApply.title"),
      description: t("home.useCases.readApply.description"),
      icon: IconFileText,
    },
    {
      title: t("home.useCases.buildShare.title"),
      description: t("home.useCases.buildShare.description"),
      icon: IconLibrary,
    },
  ]
}

function getResourceCategories(t: (key: string) => string) {
  return [
    { label: t("home.lessonPlans"), icon: IconBook, count: 42 },
    { label: t("home.rubrics"), icon: IconCertificate, count: 28 },
    { label: t("home.worksheets"), icon: IconLibrary, count: 56 },
    { label: t("home.writingPrompts"), icon: IconFileText, count: 34 },
  ]
}

function getTestimonials(_t: (key: string) => string) {
  return [
    {
      quote: "The diagnostic quiz revealed gaps in my grammar teaching methods I hadn't even considered. The recommended articles were spot-on.",
      name: "Dr. Sarah Mitchell",
      role: "Senior Lecturer, University of Melbourne",
      initials: "SM",
    },
    {
      quote: "A well-designed resource hub. The lesson plans are practical and research-backed. I've shared this with my entire department.",
      name: "Prof. James Okafor",
      role: "Head of English, Lagos Academy",
      initials: "JO",
    },
    {
      quote: "Finally, a platform that treats writing pedagogy with the depth it deserves. The assessment gave me a clear learning path forward.",
      name: "Aisha Rahman",
      role: "EFL Coordinator, Dubai International",
      initials: "AR",
    },
  ]
}
