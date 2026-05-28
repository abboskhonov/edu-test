import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import { adminUpdateArticleFn, adminDeleteArticleFn } from "@/services/admin/articles"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { IconArrowLeft, IconCheck, IconTrash, IconChevronDown } from "@tabler/icons-react"

export const Route = createLazyFileRoute("/_admin/admin/articles/$id")({
  component: EditArticlePage,
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
          <Label>Title</Label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
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
          />
        </div>

        <div className="space-y-1.5">
          <Label>Content (Markdown supported)</Label>
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
