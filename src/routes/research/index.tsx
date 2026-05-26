import { createFileRoute } from "@tanstack/react-router"
import { IconFileText } from "@tabler/icons-react"

export const Route = createFileRoute("/research/")({ component: ResearchPage })

function ResearchPage() {
  return (
    <div className="px-4 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium text-muted-foreground">publications</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Research & Publications
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
          Academic research, teacher publications, and conference announcements.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-4xl space-y-4">
        {publications.map((p) => (
          <div
            key={p.title}
            className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-border hover:shadow-[0_2px_16px_rgba(0,0,0,0.04)] sm:flex-row sm:items-start sm:gap-6 sm:p-8"
          >
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                <IconFileText size={12} />
                {p.type}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-foreground">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.author} &middot; {p.year}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.abstract}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const publications = [
  { title: "The Impact of Process Writing on EFL Student Outcomes", author: "Dr. A. Martinez", year: "2024", type: "Journal Article", abstract: "A longitudinal study examining the effectiveness of process writing approaches in EFL classrooms." },
  { title: "Scaffolding Strategies for Academic Writing Development", author: "Prof. K. Tanaka", year: "2024", type: "Research Paper", abstract: "Framework for graduated support structures in secondary-level academic writing instruction." },
  { title: "Digital Literacy Conference 2025 — Call for Papers", author: "International EdTech Association", year: "2025", type: "Conference", abstract: "Submit proposals on AI in writing education, digital assessment tools, and online pedagogy." },
]
