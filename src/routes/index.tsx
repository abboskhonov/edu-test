import { createFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getFeaturedArticlesFn } from "@/services/articles"
import { getQuizzesFn } from "@/services/quizzes"
import { Hero } from "@/features/marketing/hero"
import {
  IconArrowRight,
  IconBook,
  IconCertificate,
  IconFileText,
  IconLibrary,
  IconChartBar,
} from "@tabler/icons-react"

export const Route = createFileRoute("/")({
  component: HomePage,
  staleTime: 5 * 60 * 1000,
  loader: async () => {
    const [articles, quizzes] = await Promise.all([
      getFeaturedArticlesFn(),
      getQuizzesFn(),
    ])
    return { articles, quizzes }
  },
})

function HomePage() {
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

      {/* Feature sections */}
      <section className="px-4 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            people who let TWA
            <br />
            shape their teaching
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            real ways educators are already using our platform to refine,
            assess, and elevate their writing instruction.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-3">
          {useCases.map((u) => (
            <div key={u.title} className="group">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-colors group-hover:bg-primary/10">
                <u.icon size={24} stroke={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{u.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{u.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Articles section */}
      <section className="border-y border-border/40 px-4 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Latest from the journal</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Featured Articles
              </h2>
            </div>
            <Link
              to="/articles"
              className="hidden items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-[0.96] sm:inline-flex"
            >
              View all <IconArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-6">
            {featuredArticles?.map((article) => (
              <Link
                key={article.slug}
                to="/articles/$slug"
                params={{ slug: article.slug }}
                className="group flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-border hover:shadow-[0_2px_16px_rgba(0,0,0,0.04)] sm:flex-row sm:items-start sm:gap-6 sm:p-8"
              >
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    <IconBook size={12} />
                    {article.category}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-foreground transition-colors group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1 self-start pt-1 text-xs text-muted-foreground">
                  Read <IconArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="px-4 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary">
            <IconCertificate size={28} stroke={1.5} />
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            test it once
            <br />
            you keep growing
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
            take professional assessments across six domains. get instant feedback,
            progress tracking, and personalized recommendations based on your results.
          </p>
          <div className="mt-8">
            <Link
              to="/quizzes"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-10 text-base font-medium text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:bg-primary/90 active:scale-[0.96]"
            >
              Take an Assessment
              <IconArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Quiz categories */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes?.filter(q => !q.isDiagnostic).map((q) => (
            <div
              key={q.id}
              className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-border hover:shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
                <IconBook size={18} stroke={1.5} />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">{q.title}</h4>
                <p className="mt-0.5 text-xs text-muted-foreground">{q.totalQuestions} questions &middot; {q.timeLimitMinutes} min</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resource library preview */}
      <section className="border-y border-border/40 px-4 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              always open, all yours
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              lesson plans, rubrics, worksheets, and classroom tools —
              everything you need, ready to download.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {resourceCategories.map((cat) => (
              <div
                key={cat.label}
                className="group flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-border hover:shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-primary/10">
                  <cat.icon size={20} stroke={1.5} />
                </div>
                <h3 className="font-medium text-foreground">{cat.label}</h3>
                <p className="text-sm text-muted-foreground">{cat.count} files</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            educators who trust TWA
          </h2>
        </div>
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-6 sm:p-8"
            >
              <p className="text-sm leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-auto flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border/40 px-4 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            ready to advance
            <br />
            your teaching?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
            join the Teacher Writing Academy today and access everything
            you need to become a more effective writing educator.
          </p>
          <div className="mt-10">
            <Link
              to="/register"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-10 text-base font-medium text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:bg-primary/90 active:scale-[0.96]"
            >
              Join Academy
              <IconArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const useCases = [
  {
    title: "Assess & Reflect",
    description: "Take diagnostic quizzes to identify your strengths and growth areas in writing pedagogy.",
    icon: IconChartBar,
  },
  {
    title: "Read & Apply",
    description: "Access research-backed articles and translate insights directly into classroom practice.",
    icon: IconFileText,
  },
  {
    title: "Build & Share",
    description: "Download lesson plans, rubrics, and tools designed by educators, for educators.",
    icon: IconLibrary,
  },
]

const resourceCategories = [
  { label: "Lesson Plans", icon: IconBook, count: 42 },
  { label: "Rubrics", icon: IconCertificate, count: 28 },
  { label: "Worksheets", icon: IconLibrary, count: 56 },
  { label: "Writing Prompts", icon: IconFileText, count: 34 },
]

const testimonials = [
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
