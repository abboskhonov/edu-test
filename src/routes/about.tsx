import { createFileRoute } from "@tanstack/react-router"
import { useI18n } from "@/lib/i18n"
import { IconBook, IconUsers, IconTarget, IconBulb, IconAward } from "@tabler/icons-react"

export const Route = createFileRoute("/about")({
  component: AboutPage,
})

function AboutPage() {
  const { t } = useI18n()
  return (
    <div className="px-4 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-muted-foreground">{t("about.aboutUs")}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {t("about.aboutTheAcademy")}
        </h1>

        {/* Mission */}
        <section className="mt-16">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
              <IconTarget size={20} stroke={1.5} />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">{t("about.mission")}</h2>
          </div>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {t("about.missionText")}
          </p>
        </section>

        {/* Vision */}
        <section className="mt-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
              <IconBulb size={20} stroke={1.5} />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">{t("about.vision")}</h2>
          </div>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {t("about.visionText")}
          </p>
        </section>

        {/* Goals */}
        <section className="mt-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
              <IconAward size={20} stroke={1.5} />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">{t("about.goals")}</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {getGoals(t).map((goal) => (
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
            <h2 className="text-2xl font-semibold text-foreground">{t("about.professionalFocusAreas")}</h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {getFocusAreas(t).map((area) => (
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
            <h2 className="text-2xl font-semibold text-foreground">{t("about.leadership")}</h2>
          </div>
          <div className="mt-6 rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-lg font-semibold text-muted-foreground">
                TWA
              </div>
              <div>
                <p className="font-medium text-foreground">{t("about.teamName")}</p>
                <p className="text-sm text-muted-foreground">{t("about.foundersDirectors")}</p>
              </div>
            </div>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {t("about.teamText")}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

function getGoals(t: (key: string) => string) {
  return [
    t("about.goal1"),
    t("about.goal2"),
    t("about.goal3"),
    t("about.goal4"),
    t("about.goal5"),
  ]
}

function getFocusAreas(t: (key: string) => string) {
  return [
    { title: t("about.writingProcess"), description: t("about.writingProcessDesc") },
    { title: t("about.eslEfl"), description: t("about.eslEflDesc") },
    { title: t("about.grammarLanguage"), description: t("about.grammarLanguageDesc") },
    { title: t("about.researchWriting"), description: t("about.researchWritingDesc") },
    { title: t("about.assessmentFeedback"), description: t("about.assessmentFeedbackDesc") },
    { title: t("about.digitalLiteracy"), description: t("about.digitalLiteracyDesc") },
  ]
}
