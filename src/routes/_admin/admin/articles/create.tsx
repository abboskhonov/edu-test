import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { adminCreateArticleFn } from "@/services/admin/articles"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { IconArrowLeft, IconCheck, IconChevronDown } from "@tabler/icons-react"
import { AdminFormSkeleton } from "@/components/skeletons"

export const Route = createFileRoute("/_admin/admin/articles/create")({
  component: CreateArticlePage,
  pendingComponent: AdminFormSkeleton,
})

function CreateArticlePage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    status: "draft" as "draft" | "published",
    featured: false,
  })

  const createMutation = useMutation({
    mutationFn: adminCreateArticleFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] })
      navigate({ to: "/admin/articles" })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.slug) return
    createMutation.mutate({ data: form } as any)
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <Link to="/admin/articles" className="text-sm text-muted-foreground hover:text-foreground">
          <IconArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-semibold text-foreground">New Article</h1>
      </div>

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
            placeholder="Article title"
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
            placeholder="article-url-slug"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label>Category</Label>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex h-11 w-full items-center justify-between rounded-xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span>{form.category || "Select category"}</span>
              <IconChevronDown size={14} className="text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[var(--anchor-width)]">
              {["ESL/EFL", "Assessment", "Research Writing", "Grammar", "Digital Literacy", "Methodology"].map((cat) => (
                <DropdownMenuItem key={cat} onClick={() => setForm({ ...form, category: cat })}>
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-1.5">
          <Label>Excerpt</Label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={3}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Short description for article cards..."
          />
        </div>

        <div className="space-y-1.5">
          <Label>Content (Markdown supported)</Label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={12}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            placeholder={`# Article Title

Write your article content here. Use ## for headings. Separate paragraphs with blank lines.

## Section Title

Your content here...`}
            required
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="space-y-1.5">
            <Label>Status</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-11 items-center justify-between rounded-xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span className="capitalize">{form.status}</span>
                <IconChevronDown size={14} className="text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["draft", "published"].map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setForm({ ...form, status: status as "draft" | "published" })}
                  >
                    <span className="capitalize">{status}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2 pt-6">
            <Checkbox
              checked={form.featured}
              onCheckedChange={(checked) => setForm({ ...form, featured: checked === true })}
            />
            <Label>Featured on homepage</Label>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96] disabled:opacity-50"
          >
            {createMutation.isPending ? "Creating..." : <><IconCheck size={16} /> Create Article</>}
          </button>
        </div>
      </form>
    </div>
  )
}
