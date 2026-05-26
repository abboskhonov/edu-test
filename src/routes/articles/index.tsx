import { createFileRoute, Link } from "@tanstack/react-router"
import { IconBook, IconArrowRight } from "@tabler/icons-react"

export const Route = createFileRoute("/articles/")({ component: ArticlesPage })

function ArticlesPage() {
  return (
    <div className="px-4 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium text-muted-foreground">the journal</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Articles & News
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
          Research-based writing pedagogy, teaching guides, and educational insights.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-5xl space-y-4">
        {articles.map((a) => (
          <Link
            key={a.slug}
            to={`/articles/${a.slug}`}
            className="group flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-border hover:shadow-[0_2px_16px_rgba(0,0,0,0.04)] sm:flex-row sm:items-start sm:gap-6 sm:p-8"
          >
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                <IconBook size={12} />
                {a.category}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-foreground transition-colors group-hover:text-primary">
                {a.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1 self-start pt-1 text-xs text-muted-foreground">
              Read <IconArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const articles = [
  { title: "Process Writing in the EFL Classroom", excerpt: "A guide to process-oriented instruction for English language learners.", category: "ESL/EFL", slug: "process-writing" },
  { title: "Designing Effective Rubrics", excerpt: "Build rubrics that improve feedback quality and reduce grading bias.", category: "Assessment", slug: "rubrics" },
  { title: "Scaffolding Academic Writing", excerpt: "Graduated support for complex writing competencies.", category: "Research", slug: "scaffolding" },
  { title: "Grammar Teaching Strategies", excerpt: "Inductive vs deductive approaches compared.", category: "Grammar", slug: "grammar" },
  { title: "AI Tools in the Classroom", excerpt: "Ethical and effective use of AI writing tools.", category: "Digital", slug: "ai-tools" },
  { title: "Peer Feedback Techniques", excerpt: "Structured peer review that drives improvement.", category: "Methodology", slug: "peer-feedback" },
]
