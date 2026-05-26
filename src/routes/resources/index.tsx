import { createFileRoute, Link } from "@tanstack/react-router"
import { IconBook, IconCertificate, IconLibrary, IconFileText, IconDownload } from "@tabler/icons-react"

export const Route = createFileRoute("/resources/")({ component: ResourcesPage })

function ResourcesPage() {
  return (
    <div className="px-4 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium text-muted-foreground">downloads</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Resource Library
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
          Lesson plans, worksheets, rubrics, and classroom tools ready to use.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resources.map((r) => (
          <div
            key={r.title}
            className="group flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-border hover:shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-primary/10">
              <r.icon size={22} stroke={1.5} />
            </div>
            <h3 className="font-medium text-foreground">{r.title}</h3>
            <p className="text-sm text-muted-foreground">{r.count} files</p>
            <Link
              to="#"
              className="mt-auto flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline"
            >
              <IconDownload size={14} /> Browse
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

const resources = [
  { title: "Lesson Plans", icon: IconBook, count: 42 },
  { title: "Rubrics", icon: IconCertificate, count: 28 },
  { title: "Worksheets", icon: IconLibrary, count: 56 },
  { title: "Writing Prompts", icon: IconFileText, count: 34 },
  { title: "Citation Guides", icon: IconBook, count: 12 },
  { title: "Assessment Templates", icon: IconCertificate, count: 18 },
  { title: "Classroom Activities", icon: IconLibrary, count: 24 },
  { title: "Grammar Guides", icon: IconFileText, count: 15 },
]
