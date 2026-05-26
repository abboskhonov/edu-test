import { createFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation } from "@tanstack/react-query"
import { getResourcesFn, trackDownloadFn } from "@/services/resources"
import { useAuth } from "@/hooks/use-auth"
import { IconBook, IconCertificate, IconLibrary, IconFileText, IconDownload } from "@tabler/icons-react"
import { PublicListSkeleton } from "@/components/skeletons"

export const Route = createFileRoute("/resources/")({
  component: ResourcesPage,
  pendingComponent: PublicListSkeleton,
  staleTime: 5 * 60 * 1000,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["resources"],
      queryFn: getResourcesFn,
    })
  },
})

const iconMap: Record<string, typeof IconBook> = {
  "Lesson Plans": IconBook,
  "Rubrics": IconCertificate,
  "Worksheets": IconLibrary,
  "Writing Prompts": IconFileText,
  "Citation Guides": IconBook,
  "Assessment Templates": IconCertificate,
  "Classroom Activities": IconLibrary,
  "Grammar Guides": IconFileText,
}

function ResourcesPage() {
  const { user } = useAuth()
  const { data: resources } = useSuspenseQuery({
    queryKey: ["resources"],
    queryFn: getResourcesFn,
  })

  const downloadMutation = useMutation({
    mutationFn: trackDownloadFn,
  })

  const handleDownload = (resource: NonNullable<typeof resources>[0]) => {
    if (resource.fileUrl) {
      if (user?.id) {
        downloadMutation.mutate({ data: { userId: user.id, resourceId: resource.id } } as any)
      }
      window.open(resource.fileUrl, "_blank")
    }
  }

  // Group by category
  const grouped = resources?.reduce((acc, r) => {
    const cat = r.category || "Other"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(r)
    return acc
  }, {} as Record<string, typeof resources>) || {}

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

      <div className="mx-auto mt-16 max-w-5xl space-y-10">
        {Object.entries(grouped).map(([category, items]) => {
          const Icon = iconMap[category] || IconFileText
          return (
            <div key={category}>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5 text-primary">
                  <Icon size={18} stroke={1.5} />
                </div>
                <h2 className="text-lg font-semibold text-foreground">{category}</h2>
                <span className="text-sm text-muted-foreground">({items.length} files)</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-border hover:shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
                  >
                    <div>
                      <h3 className="text-sm font-medium text-foreground">{r.title}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">{r.description}</p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="rounded bg-muted px-1.5 py-0.5">{r.fileType}</span>
                        <span>{r.downloadCount} downloads</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(r)}
                      className="ml-3 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary transition-colors hover:bg-primary/10"
                    >
                      <IconDownload size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
