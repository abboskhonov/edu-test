import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { adminCreateArticleFn } from "@/services/admin/articles"
import { IconArrowLeft, IconCheck } from "@tabler/icons-react"

export const Route = createFileRoute("/_admin/admin/articles/create")({
  component: CreateArticlePage,
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
          <label className="text-sm font-medium">Title</label>
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
          <label className="text-sm font-medium">Slug</label>
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
          <label className="text-sm font-medium">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Select category</option>
            <option value="ESL/EFL">ESL/EFL</option>
            <option value="Assessment">Assessment</option>
            <option value="Research Writing">Research Writing</option>
            <option value="Grammar">Grammar</option>
            <option value="Digital Literacy">Digital Literacy</option>
            <option value="Methodology">Methodology</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={3}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Short description for article cards..."
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Content (Markdown supported)</label>
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
            <label className="text-sm font-medium">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}
              className="h-11 rounded-xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <label className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="h-4 w-4 rounded border-border"
            />
            <span className="text-sm font-medium">Featured on homepage</span>
          </label>
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
