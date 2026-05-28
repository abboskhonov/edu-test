import { createLazyFileRoute, useParams, Link } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  adminGetCourseWithModulesFn,
  adminUpdateCourseFn,
  adminCreateModuleFn,
  adminUpdateModuleFn,
  adminDeleteModuleFn,
} from "@/services/admin/courses"
import {
  IconArrowLeft,
  IconPlus,
  IconPencil,
  IconTrash,
  IconCheck,
  IconX,
  IconBook,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react"
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export const Route = createLazyFileRoute("/_admin/admin/courses/$id")({
  component: EditCoursePage,
})

function EditCoursePage() {
  const { id } = useParams({ from: "/_admin/admin/courses/$id" })
  const queryClient = useQueryClient()
  const { data } = useSuspenseQuery({
    queryKey: ["admin-course", id],
    queryFn: () => adminGetCourseWithModulesFn({ data: { id } } as any),
  })

  const course = data?.course
  const modules = data?.modules ?? []

  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(course?.title ?? "")
  const [slug, setSlug] = useState(course?.slug ?? "")
  const [description, setDescription] = useState(course?.description ?? "")
  const [imageUrl, setImageUrl] = useState(course?.imageUrl ?? "")
  const [category, setCategory] = useState(course?.category ?? "")
  const [status, setStatus] = useState<"draft" | "published">((course?.status as any) ?? "draft")
  const [featured, setFeatured] = useState(course?.featured ?? false)

  const updateCourseMutation = useMutation({
    mutationFn: adminUpdateCourseFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-course", id] })
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] })
      setEditing(false)
    },
  })

  const handleCourseUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    updateCourseMutation.mutate({
      data: { id, title, slug, description, imageUrl, category, status, featured },
    } as any)
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <Link to="/admin/courses" className="text-sm text-muted-foreground hover:text-foreground">
          <IconArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-semibold text-foreground">Edit Course</h1>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        {course?.title} &middot; {modules.length} modules
      </p>

      <div className="mt-8 rounded-[1.25rem] bg-black/[0.02] p-1.5 ring-1 ring-black/[0.04]">
        <div className="rounded-[calc(1.25rem-0.375rem)] bg-card p-6">
          {!editing ? (
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <IconBook size={18} stroke={1.5} className="text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">{course?.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground">{course?.description || "No description"}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>Slug: {course?.slug}</span>
                  <span>Category: {course?.category || "—"}</span>
                  <span className={`rounded-full px-2 py-0.5 font-semibold ${course?.status === "published" ? "bg-emerald-500/[0.08] text-emerald-600" : "bg-amber-500/[0.08] text-amber-600"}`}>
                    {course?.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setTitle(course?.title ?? "")
                  setSlug(course?.slug ?? "")
                  setDescription(course?.description ?? "")
                  setImageUrl(course?.imageUrl ?? "")
                  setCategory(course?.category ?? "")
                  setStatus((course?.status as any) ?? "draft")
                  setFeatured(course?.featured ?? false)
                  setEditing(true)
                }}
                className="inline-flex h-8 items-center gap-1 rounded-lg bg-muted px-3 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <IconPencil size={14} /> Edit
              </button>
            </div>
          ) : (
            <form onSubmit={handleCourseUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground">Title</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Slug</label>
                  <input value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="mt-1 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground">Image URL</label>
                  <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-1 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Category</label>
                  <input value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="mt-1 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="h-4 w-4" />
                  Featured
                </label>
                <div className="ml-auto flex items-center gap-2">
                  <button type="submit" disabled={updateCourseMutation.isPending} className="inline-flex h-8 items-center gap-1 rounded-lg bg-primary px-3 text-sm text-primary-foreground hover:bg-primary/90">
                    <IconCheck size={14} /> Save
                  </button>
                  <button type="button" onClick={() => setEditing(false)} className="inline-flex h-8 items-center gap-1 rounded-lg bg-muted px-3 text-sm text-muted-foreground hover:bg-rose-100 hover:text-rose-600">
                    <IconX size={14} /> Cancel
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">Modules</h2>
        <ModuleList courseId={id} modules={modules} />
      </div>
    </div>
  )
}

function ModuleList({ courseId, modules }: { courseId: string; modules: any[] }) {
  const queryClient = useQueryClient()
  const [adding, setAdding] = useState(false)
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null)

  const [newTitle, setNewTitle] = useState("")
  const [newDesc, setNewDesc] = useState("")
  const [newTheory, setNewTheory] = useState("")
  const [newPractice, setNewPractice] = useState("")
  const [newOrder, setNewOrder] = useState(0)

  const createModuleMutation = useMutation({
    mutationFn: adminCreateModuleFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-course", courseId] })
      setAdding(false)
      setNewTitle("")
      setNewDesc("")
      setNewTheory("")
      setNewPractice("")
      setNewOrder(0)
    },
  })

  const deleteModuleMutation = useMutation({
    mutationFn: adminDeleteModuleFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-course", courseId] })
    },
  })

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    createModuleMutation.mutate({
      data: {
        courseId,
        title: newTitle,
        description: newDesc,
        theoryContent: newTheory,
        practiceContent: newPractice,
        order: newOrder,
      },
    } as any)
  }

  return (
    <div className="mt-4 space-y-3">
      {modules.map((mod) => (
        <div key={mod.id}>
          {editingModuleId === mod.id ? (
            <ModuleEditor
              courseId={courseId}
              module={mod}
              onCancel={() => setEditingModuleId(null)}
              onSaved={() => setEditingModuleId(null)}
            />
          ) : (
            <div className="flex items-start justify-between rounded-[1rem] bg-black/[0.02] p-1.5 ring-1 ring-black/[0.04]">
              <div className="flex flex-1 items-center gap-3 rounded-[calc(1rem-0.375rem)] bg-card p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-primary/[0.06] text-sm font-bold text-primary">
                  {mod.order}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{mod.title}</p>
                  <p className="text-xs text-muted-foreground">{mod.description || "No description"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-4">
                <button
                  onClick={() => setEditingModuleId(mod.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                >
                  <IconPencil size={14} />
                </button>
                <button
                  onClick={() => {
                    if (confirm("Delete this module?")) {
                      deleteModuleMutation.mutate({ data: { id: mod.id } } as any)
                    }
                  }}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-rose-100 hover:text-rose-600"
                >
                  <IconTrash size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {!adding ? (
        <button
          onClick={() => {
            setAdding(true)
            setNewOrder(modules.length)
          }}
          className="flex w-full items-center justify-center gap-2 rounded-[1rem] border border-dashed border-border/60 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <IconPlus size={16} /> Add Module
        </button>
      ) : (
        <ModuleEditorForm
          onSubmit={handleCreate}
          onCancel={() => setAdding(false)}
          title={newTitle}
          setTitle={setNewTitle}
          description={newDesc}
          setDescription={setNewDesc}
          theoryContent={newTheory}
          setTheoryContent={setNewTheory}
          practiceContent={newPractice}
          setPracticeContent={setNewPractice}
          order={newOrder}
          setOrder={setNewOrder}
          isPending={createModuleMutation.isPending}
          submitLabel="Add Module"
        />
      )}
    </div>
  )
}

function ModuleEditor({ courseId, module, onCancel, onSaved }: {
  courseId: string
  module: any
  onCancel: () => void
  onSaved: () => void
}) {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState(module.title)
  const [description, setDescription] = useState(module.description ?? "")
  const [theoryContent, setTheoryContent] = useState(module.theoryContent ?? "")
  const [practiceContent, setPracticeContent] = useState(module.practiceContent ?? "")
  const [order, setOrder] = useState(module.order)

  const updateMutation = useMutation({
    mutationFn: adminUpdateModuleFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-course", courseId] })
      onSaved()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateMutation.mutate({
      data: {
        id: module.id,
        title,
        description,
        theoryContent,
        practiceContent,
        order,
      },
    } as any)
  }

  return (
    <ModuleEditorForm
      onSubmit={handleSubmit}
      onCancel={onCancel}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      theoryContent={theoryContent}
      setTheoryContent={setTheoryContent}
      practiceContent={practiceContent}
      setPracticeContent={setPracticeContent}
      order={order}
      setOrder={setOrder}
      isPending={updateMutation.isPending}
      submitLabel="Save"
    />
  )
}

function ModuleEditorForm({
  onSubmit,
  onCancel,
  title,
  setTitle,
  description,
  setDescription,
  theoryContent,
  setTheoryContent,
  practiceContent,
  setPracticeContent,
  order,
  setOrder,
  isPending,
  submitLabel,
}: {
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  title: string
  setTitle: (v: string) => void
  description: string
  setDescription: (v: string) => void
  theoryContent: string
  setTheoryContent: (v: string) => void
  practiceContent: string
  setPracticeContent: (v: string) => void
  order: number
  setOrder: (v: number) => void
  isPending: boolean
  submitLabel: string
}) {
  const [theoryPreview, setTheoryPreview] = useState(false)
  const [practicePreview, setPracticePreview] = useState(false)

  return (
    <form onSubmit={onSubmit} className="rounded-[1.25rem] bg-black/[0.02] p-1.5 ring-1 ring-black/[0.04]">
      <div className="rounded-[calc(1.25rem-0.375rem)] bg-card p-5 space-y-5">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-foreground">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Order</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            placeholder="Short description"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-foreground">Theory Content</label>
            <button
              type="button"
              onClick={() => setTheoryPreview(!theoryPreview)}
              className="inline-flex items-center gap-1 rounded-lg bg-muted px-2 py-1 text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary"
            >
              {theoryPreview ? <><IconEyeOff size={12} /> Edit</> : <><IconEye size={12} /> Preview</>}
            </button>
          </div>
          {theoryPreview ? (
            <div className="mt-1 rounded-xl border border-border/60 bg-background px-4 py-3">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {theoryContent ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{theoryContent}</ReactMarkdown>
                ) : (
                  <p className="text-muted-foreground">No content</p>
                )}
              </div>
            </div>
          ) : (
            <textarea
              value={theoryContent}
              onChange={(e) => setTheoryContent(e.target.value)}
              rows={10}
              className="mt-1 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm font-mono outline-none focus:border-primary"
              placeholder="# Theory content\n\nWrite in Markdown..."
            />
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-foreground">Practice Content</label>
            <button
              type="button"
              onClick={() => setPracticePreview(!practicePreview)}
              className="inline-flex items-center gap-1 rounded-lg bg-muted px-2 py-1 text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary"
            >
              {practicePreview ? <><IconEyeOff size={12} /> Edit</> : <><IconEye size={12} /> Preview</>}
            </button>
          </div>
          {practicePreview ? (
            <div className="mt-1 rounded-xl border border-border/60 bg-background px-4 py-3">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {practiceContent ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{practiceContent}</ReactMarkdown>
                ) : (
                  <p className="text-muted-foreground">No content</p>
                )}
              </div>
            </div>
          ) : (
            <textarea
              value={practiceContent}
              onChange={(e) => setPracticeContent(e.target.value)}
              rows={10}
              className="mt-1 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm font-mono outline-none focus:border-primary"
              placeholder="# Practice content\n\nWrite in Markdown..."
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-9 items-center gap-1 rounded-lg bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90"
          >
            <IconCheck size={14} /> {submitLabel}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-9 items-center rounded-lg bg-muted px-4 text-sm text-muted-foreground hover:bg-rose-100 hover:text-rose-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}
