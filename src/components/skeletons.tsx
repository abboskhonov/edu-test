import { Skeleton } from "@/components/ui/skeleton"

/* ─── Admin list pages (articles, quizzes, resources, users, contacts) ─── */
export function AdminTableSkeleton() {
  return (
    <div className="animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-7 w-40 rounded-lg" />
          </div>
          <Skeleton className="h-4 w-56 rounded-lg" />
        </div>
        <Skeleton className="h-9 w-28 rounded-full" />
      </div>

      {/* Table */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card">
        <div className="border-b border-border/60 bg-muted/50 px-5 py-3">
          <div className="flex gap-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="divide-y divide-border/40">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
              <div className="ml-auto flex gap-2">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Admin form pages (create / edit) ─── */
export function AdminFormSkeleton() {
  return (
    <div className="animate-in fade-in duration-200">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-7 w-32 rounded-lg" />
      </div>

      <div className="mt-8 max-w-2xl space-y-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <Skeleton className="h-4 w-24 rounded-lg" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        ))}
        <div className="flex gap-6 pt-2">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-20 rounded-lg" />
            <Skeleton className="h-11 w-40 rounded-xl" />
          </div>
          <div className="flex items-end gap-2 pb-1">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-4 w-40 rounded-lg" />
          </div>
        </div>
        <Skeleton className="h-11 w-36 rounded-full" />
      </div>
    </div>
  )
}

/* ─── Public list pages (articles, quizzes, resources) ─── */
export function PublicListSkeleton() {
  return (
    <div className="animate-in fade-in duration-200 px-4 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <Skeleton className="mx-auto h-4 w-24 rounded-lg" />
        <Skeleton className="mx-auto mt-3 h-12 w-72 rounded-lg sm:h-14 sm:w-96" />
        <Skeleton className="mx-auto mt-5 h-6 w-96 rounded-lg" />
      </div>
      <div className="mx-auto mt-16 max-w-5xl space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  )
}

/* ─── Public grid page (quizzes) ─── */
export function PublicGridSkeleton() {
  return (
    <div className="animate-in fade-in duration-200 px-4 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <Skeleton className="mx-auto h-4 w-24 rounded-lg" />
        <Skeleton className="mx-auto mt-3 h-12 w-72 rounded-lg sm:h-14 sm:w-96" />
        <Skeleton className="mx-auto mt-5 h-6 w-96 rounded-lg" />
      </div>
      <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-56 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  )
}

/* ─── Dashboard ─── */
export function DashboardSkeleton() {
  return (
    <div className="animate-in fade-in duration-200 px-4 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Skeleton className="h-4 w-20 rounded-lg" />
        <Skeleton className="mt-2 h-12 w-48 rounded-lg" />
        <Skeleton className="mt-2 h-5 w-64 rounded-lg" />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>

        <Skeleton className="mt-14 h-6 w-40 rounded-lg" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Article detail ─── */
export function ArticleDetailSkeleton() {
  return (
    <div className="animate-in fade-in duration-200 px-4 py-12 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24 rounded-lg" />
        </div>
        <Skeleton className="mt-6 h-10 w-3/4 rounded-lg" />
        <div className="mt-8 space-y-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Quiz page ─── */
export function QuizPageSkeleton() {
  return (
    <div className="animate-in fade-in duration-200 px-4 py-12 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 rounded-lg" />
            <Skeleton className="h-6 w-56 rounded-lg" />
          </div>
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
        <Skeleton className="mb-8 h-2 w-full rounded-full" />
        <Skeleton className="h-80 w-full rounded-2xl" />
        <div className="mt-6 flex items-center justify-between">
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>
      </div>
    </div>
  )
}

/* ─── Admin contacts ─── */
export function AdminContactsSkeleton() {
  return (
    <div className="animate-in fade-in duration-200">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-7 w-48 rounded-lg" />
        </div>
        <Skeleton className="h-4 w-56 rounded-lg" />
      </div>
      <div className="mt-8 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-36 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  )
}

/* ─── Homepage ─── */
export function HomeSkeleton() {
  return (
    <div className="animate-in fade-in duration-200">
      <Skeleton className="h-[60vh] w-full" />
      <div className="px-4 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-8 w-48 rounded-lg" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((__, j) => (
                  <Skeleton key={j} className="h-48 w-full rounded-2xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Quiz results ─── */
export function QuizResultsSkeleton() {
  return (
    <div className="animate-in fade-in duration-200 px-4 py-12 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Skeleton className="h-4 w-24 rounded-lg" />
        <Skeleton className="mt-8 h-48 w-full rounded-2xl" />
        <div className="mt-6 flex justify-center gap-3">
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-10 w-36 rounded-full" />
        </div>
        <Skeleton className="mt-12 h-6 w-40 rounded-lg" />
        <div className="mt-4 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
