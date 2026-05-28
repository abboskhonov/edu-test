import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  adminGetResourceFn,
  adminUpdateResourceFn,
  adminDeleteResourceFn,
} from "@/services/admin/resources"
import { IconArrowLeft, IconCheck, IconTrash, IconChevronDown } from "@tabler/icons-react"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

export const Route = createLazyFileRoute("/_admin/admin/resources/$id")({
  component: EditResourcePage,
})

function EditResourcePage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: resource } = useSuspenseQuery({
    queryKey: ["admin-resource", id],
    queryFn: () => adminGetResourceFn({ data: { id } } as any),
  })

  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    fileUrl: "",
    category: "",
    fileType: "PDF",
  })

  useEffect(() => {
    if (resource) {
      setForm({
        id: resource.id,
        title: resource.title,
        description: resource.description || "",
        fileUrl: resource.fileUrl || "",
        category: resource.category || "",
        fileType: resource.fileType || "PDF",
      })
    }
  }, [resource])

  const updateMutation = useMutation({
    mutationFn: adminUpdateResourceFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] })
      queryClient.invalidateQueries({ queryKey: ["admin-resource", id] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteResourceFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] })
      navigate({ to: "/admin/resources" })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title) return
    updateMutation.mutate({ data: form } as any)
  }

  if (!resource) {
    return (
      <div className="px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Resource not found</h1>
        <Link to="/admin/resources" className="mt-4 inline-flex items-center gap-1 text-primary hover:underline">
          <IconArrowLeft size={16} /> Back to resources
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/admin/resources" className="text-sm text-muted-foreground hover:text-foreground">
            <IconArrowLeft size={16} />
          </Link>
          <h1 className="text-2xl font-semibold text-foreground">Edit Resource</h1>
        </div>
        <button
          onClick={() => {
            if (confirm("Delete this resource?")) {
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
          <Label>Description</Label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
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
