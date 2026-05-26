import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { adminCreateResourceFn } from "@/services/admin/resources"
import { IconArrowLeft, IconCheck, IconChevronDown } from "@tabler/icons-react"
import { AdminFormSkeleton } from "@/components/skeletons"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

export const Route = createFileRoute("/_admin/admin/resources/create")({
  component: CreateResourcePage,
  pendingComponent: AdminFormSkeleton,
})

function CreateResourcePage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [form, setForm] = useState({
    title: "",
    description: "",
    fileUrl: "",
    category: "",
    fileType: "PDF",
  })

  const createMutation = useMutation({
    mutationFn: adminCreateResourceFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] })
      navigate({ to: "/admin/resources" })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title) return
    createMutation.mutate({ data: form } as any)
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <Link to="/admin/resources" className="text-sm text-muted-foreground hover:text-foreground">
          <IconArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-semibold text-foreground">New Resource</h1>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-5">
        <div className="space-y-1.5">
          <Label>Title</Label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Resource title"
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
            placeholder="Short description..."
          />
        </div>

        <div className="space-y-1.5">
          <Label>File URL</Label>
          <input
            type="text"
            value={form.fileUrl}
            onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
            className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="/uploads/filename.pdf or external URL"
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
              placeholder="e.g. Lesson Plans"
            />
          </div>
          <div className="space-y-1.5">
            <Label>File Type</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-11 w-full items-center justify-between rounded-xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span>{form.fileType}</span>
                <IconChevronDown size={14} className="text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[var(--anchor-width)]">
                {["PDF", "DOCX", "PPTX", "XLSX", "ZIP", "Other"].map((ft) => (
                  <DropdownMenuItem key={ft} onClick={() => setForm({ ...form, fileType: ft })}>
                    {ft}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96] disabled:opacity-50"
          >
            {createMutation.isPending ? "Creating..." : <><IconCheck size={16} /> Create Resource</>}
          </button>
        </div>
      </form>
    </div>
  )
}
