import { createFileRoute, Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { IconBook, IconCertificate, IconDownload, IconStar, IconArrowRight } from "@tabler/icons-react"

export const Route = createFileRoute("/_authed/dashboard/")({ component: DashboardPage })

function DashboardPage() {
  return (
    <div className="px-4 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div>
          <p className="text-sm font-medium text-muted-foreground">your space</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Your personal learning hub and progress overview.</p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={IconCertificate} label="Quizzes Taken" value="12" />
          <StatCard icon={IconStar} label="Avg. Score" value="78%" />
          <StatCard icon={IconBook} label="Saved Articles" value="8" />
          <StatCard icon={IconDownload} label="Downloads" value="15" />
        </div>

        {/* Recent quizzes */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-foreground">Recent Quiz Results</h2>
          <div className="mt-4 space-y-3">
            {[
              { quiz: "Writing Instruction Knowledge", score: "85%", tier: "Proficient" },
              { quiz: "Grammar Teaching Methods", score: "72%", tier: "Proficient" },
              { quiz: "ESL/EFL Writing Pedagogy", score: "91%", tier: "Expert" },
            ].map((r) => (
              <div
                key={r.quiz}
                className="flex items-center justify-between rounded-2xl border border-border/60 bg-card p-5"
              >
                <div>
                  <p className="font-medium text-foreground">{r.quiz}</p>
                  <p className="text-sm text-muted-foreground">{r.tier}</p>
                </div>
                <span className="font-semibold text-foreground">{r.score}</span>
              </div>
            ))}
          </div>
          <Link
            to="/quizzes"
            className="mt-3 inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-[0.96]"
          >
            View all quizzes <IconArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value }: { icon: typeof IconBook; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
        <Icon size={20} stroke={1.5} />
      </div>
      <div>
        <p className="text-2xl font-semibold tabular-nums text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}
