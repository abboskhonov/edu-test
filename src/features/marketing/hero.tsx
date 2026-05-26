import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { IconArrowRight } from "@tabler/icons-react"
import {
  IconBook,
  IconPencil,
  IconBulb,
  IconSchool,
  IconScript,
  IconEdit,
} from "@tabler/icons-react"

const floatingIcons = [
  { Icon: IconBook, className: "top-[12%] left-[8%] animate-float-slow text-emerald-600/40", size: 40 },
  { Icon: IconPencil, className: "top-[18%] right-[10%] animate-float-medium text-amber-600/40", size: 32 },
  { Icon: IconBulb, className: "top-[55%] left-[5%] animate-float-fast text-sky-600/40", size: 36 },
  { Icon: IconSchool, className: "top-[60%] right-[6%] animate-float-slow text-rose-600/40", size: 38 },
  { Icon: IconScript, className: "bottom-[22%] left-[12%] animate-float-medium text-violet-600/40", size: 30 },
  { Icon: IconEdit, className: "bottom-[18%] right-[14%] animate-float-fast text-teal-600/40", size: 34 },
]

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16 sm:pt-28 sm:pb-20">
      {/* Floating decorative icons */}
      {floatingIcons.map(({ Icon, className, size }, i) => (
        <div
          key={i}
          className={`absolute hidden select-none lg:block ${className}`}
          style={{ animationDelay: `${i * 0.8}s` }}
        >
          <Icon size={size} stroke={1.2} />
        </div>
      ))}

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Subtle top text */}
        <p className="mb-5 text-sm tracking-wide text-muted-foreground/80">
          professional development for educators
        </p>

        {/* Announcement badge */}
        <Link
          to="/quizzes"
          className="group mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-foreground shadow-sm transition-all hover:shadow-md hover:border-border/80"
        >
          <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-white">
            New
          </span>
          <span>Writing Assessment Tools now live</span>
          <IconArrowRight
            size={12}
            className="text-muted-foreground transition-transform group-hover:translate-x-0.5"
          />
        </Link>

        {/* Massive headline */}
        <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[1.05]">
          your writing pedagogy
          <br className="hidden sm:block" />
          {" "}that lives in your classroom
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          research-based articles, professional assessments, and classroom resources 
          designed specifically for writing educators.
        </p>

        {/* Single centered CTA */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <Link
            to="/register"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-10 text-base font-medium text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:bg-primary/90 active:scale-[0.96]"
          >
            Join the Academy
            <IconArrowRight size={18} />
          </Link>
          <p className="text-sm text-muted-foreground/70">free to join. no commitment.</p>
        </div>

        {/* Live counter */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          <span className="tabular-nums font-medium text-foreground">2,847</span>
          <span>educators enrolled this month</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="h-10 w-6 rounded-full border-2 border-border p-1">
          <div className="h-2 w-full rounded-full bg-muted-foreground/30 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
