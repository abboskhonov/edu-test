import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import { adminUpdateArticleFn, adminDeleteArticleFn } from "@/services/admin/articles"
import { IconArrowLeft, IconCheck, IconTrash } from "@tabler/icons-react"

export const Route = createFileRoute("/_admin/admin/articles/$id")({
  component: EditArticlePage,
  loader: async ({ params }) => {
    // We need to look up by ID - using slug approach for now
    // Actually we need a getById function. Let me use the slug for now.
    // For simplicity, we'll fetch all articles and find the one matching ID
    return { articleId: params.id }
  },
})

function EditArticlePage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: allArticles } = useSuspenseQuery({
    queryKey: ["admin-articles"],
    queryFn: () => import("@/services/admin/articles").then((m) => m.adminGetArticlesFn()),
  })

  const article = allArticles?.find((a) => a.id === id)

  const [form, setForm] = useState(() => ({
    id: article?.id || "",
    title: article?.title || "",
    slug: article?.slug || "",
    excerpt: article?.excerpt || "",
    content: article?.content || "",
    category: article?.category || "",
    status: (article?.status as "draft" | "published") || "draft",
    featured: article?.featured ?? false,
  }))

  // Update form when article loads
  if (article && form.id !== article.id) {
    setForm({
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt || "",
      content: article.content || "",
      category: article.category || "",
      status: article.status as "draft" | "published",
      featured: article.featured,
    })
  }

  const updateMutation = useMutation({
    mutationFn: adminUpdateArticleFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] })
      navigate({ to: "/admin/articles" })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteArticleFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] })
      navigate({ to: "/admin/articles" })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.slug) return
    updateMutation.mutate({ data: form } as any)
  }

  if (!article) {
    return (
      <div className="px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Article not found</h1>
        <Link to="/admin/articles" className="mt-4 inline-flex items-center gap-1 text-primary hover:underline">
          <IconArrowLeft size={16} /> Back to articles
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/admin/articles" className="text-sm text-muted-foreground hover:text-foreground">
            <IconArrowLeft size={16} />
          </Link>
          <h1 className="text-2xl font-semibold text-foreground">Edit Article</h1>
        </div>
        <button
          onClick={() => {
            if (confirm("Delete this article?")) {
              deleteMutation.mutate({ data: { id } } as any)
            }
          }}
          disabled={deleteMutation.isPending}
          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-rose-200 px-4 text-sm font-medium text-rose-600 transition-all hover:bg-rose-50 active:scale-[0.96] disabled:opacity-50"
        >
          <IconTrash size={14} /> Delete
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
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
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Content (Markdown supported)</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={12}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
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
            disabled={updateMutation.isPending}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96] disabled:opacity-50"
          >
            {updateMutation.isPending ? "Saving..." : <><IconCheck size={16} /> Save Changes</>}
          </button>
        </div>
      </form>
    </div>
  )
}
