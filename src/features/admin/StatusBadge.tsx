import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: string | null | undefined
}

const statusMap: Record<string, { bg: string; text: string }> = {
  draft: { bg: "bg-amber-500/10", text: "text-amber-700" },
  published: { bg: "bg-emerald-500/10", text: "text-emerald-700" },
  teacher: { bg: "bg-blue-500/10", text: "text-blue-700" },
  admin: { bg: "bg-rose-500/10", text: "text-rose-700" },
  beginner: { bg: "bg-emerald-500/10", text: "text-emerald-700" },
  intermediate: { bg: "bg-amber-500/10", text: "text-amber-700" },
  advanced: { bg: "bg-rose-500/10", text: "text-rose-700" },
  mixed: { bg: "bg-muted", text: "text-muted-foreground" },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const key = (status ?? "").toLowerCase()
  const style = statusMap[key] ?? { bg: "bg-muted", text: "text-muted-foreground" }

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold",
        style.bg,
        style.text
      )}
    >
      {status}
    </span>
  )
}
