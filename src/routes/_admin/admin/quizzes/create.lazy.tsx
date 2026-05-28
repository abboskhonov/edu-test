import { createLazyFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { adminCreateQuizFn } from "@/services/admin/quizzes"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { IconCheck, IconChevronDown } from "@tabler/icons-react"
import { AdminPageHeader } from "@/features/admin"

export const Route = createLazyFileRoute("/_admin/admin/quizzes/create")({
  component: CreateQuizPage,
})

function CreateQuizPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    difficulty: "Intermediate" as string,
    timeLimitMinutes: 20,
    passScore: 60,
    totalQuestions: 0,
    active: true,
  })

  const createMutation = useMutation({
    mutationFn: adminCreateQuizFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-quizzes"] })
      navigate({ to: "/admin/quizzes" })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.slug) return
    createMutation.mutate({ data: form } as any)
  }

  return (
    <div>
      <AdminPageHeader title="New Quiz" backTo="/admin/quizzes" />

      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-5">
        <div className="space-y-1.5">
          <Label>Title</Label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => {
              const title = e.target.value
              setForm((prev) => ({
                ...prev,
                title,
                slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
              }))
            }}
            className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Quiz title"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label>Slug</Label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="quiz-url-slug"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label>Description</Label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Short description shown on quiz cards..."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Category</Label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="e.g. Grammar"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Difficulty</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-11 w-full items-center justify-between rounded-xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span>{form.difficulty}</span>
                <IconChevronDown size={14} className="text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[var(--anchor-width)]">
                {["Beginner", "Intermediate", "Advanced", "Mixed"].map((level) => (
                  <DropdownMenuItem
                    key={level}
                    onClick={() => setForm({ ...form, difficulty: level })}
                  >
                    {level}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label>Time Limit (min)</Label>
            <input
              type="number"
              value={form.timeLimitMinutes}
              onChange={(e) => setForm({ ...form, timeLimitMinutes: parseInt(e.target.value) || 0 })}
              className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Pass Score (%)</Label>
            <input
              type="number"
              value={form.passScore}
              onChange={(e) => setForm({ ...form, passScore: parseInt(e.target.value) || 0 })}
              className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Total Questions</Label>
            <input
              type="number"
              value={form.totalQuestions}
              onChange={(e) => setForm({ ...form, totalQuestions: parseInt(e.target.value) || 0 })}
              className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            checked={form.active}
            onCheckedChange={(checked) => setForm({ ...form, active: checked === true })}
          />
          <Label>Active (visible to users)</Label>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96] disabled:opacity-50"
          >
            {createMutation.isPending ? "Creating..." : <><IconCheck size={16} /> Create Quiz</>}
          </button>
        </div>
      </form>
    </div>
  )
}
