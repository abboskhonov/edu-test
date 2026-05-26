import { createFileRoute } from "@tanstack/react-router"
import { IconBook, IconUsers, IconTarget, IconBulb, IconAward } from "@tabler/icons-react"

export const Route = createFileRoute("/about")({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="px-4 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-muted-foreground">about us</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          About the Academy
        </h1>

        {/* Mission */}
        <section className="mt-16">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
              <IconTarget size={20} stroke={1.5} />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">Mission</h2>
          </div>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Teacher Writing Academy exists to elevate the quality of writing instruction worldwide. We believe every student deserves a teacher who understands the art and science of teaching writing. Our mission is to provide educators with research-backed knowledge, practical tools, and professional assessments that turn writing pedagogy from an uncertain craft into a confident discipline.
          </p>
        </section>

        {/* Vision */}
        <section className="mt-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
              <IconBulb size={20} stroke={1.5} />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">Vision</h2>
          </div>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We envision a global community of writing educators who are as skilled in teaching composition as they are passionate about it. A world where process writing, peer feedback, and scaffolded instruction are the norm, not the exception. Where every teacher has access to the research, resources, and recognition they need to grow professionally.
          </p>
        </section>

        {/* Goals */}
        <section className="mt-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
              <IconAward size={20} stroke={1.5} />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">Goals</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {goals.map((goal) => (
              <li key={goal} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{goal}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Focus Areas */}
        <section className="mt-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
              <IconBook size={20} stroke={1.5} />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">Professional Focus Areas</h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {focusAreas.map((area) => (
              <div key={area.title} className="rounded-2xl border border-border/60 bg-card p-5">
                <h3 className="font-medium text-foreground">{area.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{area.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mt-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
              <IconUsers size={20} stroke={1.5} />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">Leadership</h2>
          </div>
          <div className="mt-6 rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-lg font-semibold text-muted-foreground">
                TWA
              </div>
              <div>
                <p className="font-medium text-foreground">Teacher Writing Academy Team</p>
                <p className="text-sm text-muted-foreground">Founders & Directors</p>
              </div>
            </div>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Founded by educators and researchers with decades of combined experience in EFL/ESL writing instruction, academic literacy, and teacher professional development. The Academy team is dedicated to bridging the gap between research and classroom practice — one teacher at a time.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

const goals = [
  "Publish accessible, research-based articles on writing pedagogy every month.",
  "Build a comprehensive assessment system that helps teachers identify and close knowledge gaps.",
  "Curate and create practical classroom resources that teachers can use immediately.",
  "Foster a professional community where educators share insights and support each other's growth.",
  "Promote evidence-based writing instruction in under-resourced educational contexts.",
]

const focusAreas = [
  { title: "Writing Process Pedagogy", description: "Process writing, peer feedback, revision strategies, and workshop models." },
  { title: "ESL/EFL Writing Instruction", description: "Second language writing, academic register, scaffolding, and contrastive rhetoric." },
  { title: "Grammar & Language Teaching", description: "Inductive methods, focus on form, error correction, and consciousness-raising." },
  { title: "Research Writing Development", description: "Thesis construction, literature review, citation, and academic argumentation." },
  { title: "Assessment & Feedback", description: "Rubrics, formative assessment, portfolios, and effective feedback design." },
  { title: "Digital Literacy & AI", description: "Collaborative tools, AI ethics, corpus literacy, and digital portfolio assessment." },
]
