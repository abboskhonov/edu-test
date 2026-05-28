import { Link } from "@tanstack/react-router"
import { useI18n } from "@/lib/i18n"

export function Hero() {
  const { t } = useI18n()
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 py-32 md:py-40">
      {/* Subtle vertical line texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, transparent, transparent 120px, rgba(0,0,0,0.025) 120px, rgba(0,0,0,0.025) 121px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Announcement badge */}
        <div
          className="animate-hero-reveal mb-10"
          style={{ animationDelay: "0.1s" }}
        >
          <Link
            to="/quizzes"
            className="group inline-flex items-center gap-3 rounded-full border border-border/80 bg-card/80 px-4 py-2 text-sm shadow-sm backdrop-blur-sm transition-all hover:shadow-md"
          >
            <span className="rounded-full bg-foreground px-2.5 py-0.5 text-[10px] font-semibold text-background">
              {t("hero.new")}
            </span>
            <span className="font-medium text-foreground">{t("hero.badge")}</span>
            <span className="text-muted-foreground transition-colors group-hover:text-foreground">
              {t("hero.tryNow")}
            </span>
          </Link>
        </div>

        {/* Headline */}
        <h1
          className="animate-hero-reveal text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-foreground"
          style={{ animationDelay: "0.3s", fontFamily: "var(--font-serif)" }}
        >
          {t("hero.headline")}
          <br className="hidden sm:block" /> {t("hero.headlineBreak")}
        </h1>

        {/* Subheadline */}
        <p
          className="animate-hero-reveal mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          style={{ animationDelay: "0.5s" }}
        >
          {t("hero.subheadline")}
        </p>

        {/* Two CTAs side by side */}
        <div
          className="animate-hero-reveal mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "0.7s" }}
        >
          <Link
            to="/register"
            className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background shadow-lg transition-all hover:bg-foreground/90 active:scale-[0.98]"
          >
            {t("hero.ctaJoin")}
          </Link>
          <Link
            to="/articles"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-8 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted active:scale-[0.98]"
          >
            {t("hero.ctaExplore")}
          </Link>
        </div>

        {/* Live counter */}
        <div
          className="animate-hero-reveal mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          style={{ animationDelay: "0.9s" }}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-semibold tabular-nums text-foreground">2,847</span>
          <span>{t("hero.educatorsCount")}</span>
        </div>
      </div>
    </section>
  )
}
