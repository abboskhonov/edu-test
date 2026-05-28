import { createLazyFileRoute, useNavigate, Link } from "@tanstack/react-router"
import { useMutation } from "@tanstack/react-query"
import { adminCreateCourseFn } from "@/services/admin/courses"
import { IconBook } from "@tabler/icons-react"
import { useState } from "react"
import { AdminPageHeader } from "@/features/admin"

export const Route = createLazyFileRoute("/_admin/admin/courses/create")({
  component: CreateCoursePage,
})

function CreateCoursePage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [category, setCategory] = useState("")
  const [status, setStatus] = useState<"draft" | "published">("draft")
  const [featured, setFeatured] = useState(false)

  const createMutation = useMutation({
    mutationFn: adminCreateCourseFn,
    onSuccess: () => {
      navigate({ to: "/admin/courses" })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createMutation.mutate({
      data: { title, slug, description, imageUrl, category, status, featured },
    } as any)
  }

  return (
    <div>
      <AdminPageHeader title="New Course" subtitle="Create a new course." backTo="/admin/courses" />

      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border/60 bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            placeholder="Course title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border/60 bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            placeholder="course-slug"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border/60 bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            rows={3}
            placeholder="Short description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">Image URL</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border/60 bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground">Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border/60 bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            placeholder="e.g. Academic Writing"
          />
        </div>

        <div className="flex items-center gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "draft" | "published")}
              className="mt-1 w-40 rounded-xl border border-border/60 bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <label className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-border/60"
            />
            <span className="text-sm text-foreground">Featured</span>
          </label>
        </div>

        <div className="flex items-center gap-3 pt-4">
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96] disabled:opacity-50"
          >
            <IconBook size={16} />
            {createMutation.isPending ? "Creating..." : "Create Course"}
          </button>
          <Link
            to="/admin/courses"
            className="inline-flex h-10 items-center rounded-full border border-border/60 px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
