import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  adminGetQuizFn,
  adminUpdateQuizFn,
  adminDeleteQuizFn,
  adminCreateQuestionFn,
  adminUpdateQuestionFn,
  adminDeleteQuestionFn,
} from "@/services/admin/quizzes"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { IconArrowLeft, IconCheck, IconTrash, IconPlus, IconChevronDown, IconPencil } from "@tabler/icons-react"
import { AdminFormSkeleton } from "@/components/skeletons"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export const Route = createFileRoute("/_admin/admin/quizzes/$id")({
  component: EditQuizPage,
  pendingComponent: AdminFormSkeleton,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["admin-quiz", params.id],
      queryFn: () => adminGetQuizFn({ data: { id: params.id } } as any),
    })
  },
})

function EditQuizPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: quizData } = useSuspenseQuery({
    queryKey: ["admin-quiz", id],
    queryFn: () => adminGetQuizFn({ data: { id } } as any),
  })

  const quiz = quizData?.quiz
  const questions = quizData?.questions || []

  // Quiz form
  const [quizForm, setQuizForm] = useState({
    id: quiz?.id || "",
    title: quiz?.title || "",
    slug: quiz?.slug || "",
    description: quiz?.description || "",
    category: quiz?.category || "",
    difficulty: quiz?.difficulty || "Intermediate",
    timeLimitMinutes: quiz?.timeLimitMinutes || 20,
    passScore: quiz?.passScore || 60,
    totalQuestions: quiz?.totalQuestions || 0,
    active: quiz?.active ?? true,
  })

  useEffect(() => {
    if (quiz) {
      setQuizForm({
        id: quiz.id,
        title: quiz.title,
        slug: quiz.slug,
        description: quiz.description || "",
        category: quiz.category || "",
        difficulty: quiz.difficulty || "Intermediate",
        timeLimitMinutes: quiz.timeLimitMinutes || 20,
        passScore: quiz.passScore || 60,
        totalQuestions: quiz.totalQuestions || 0,
        active: quiz.active,
      })
    }
  }, [quiz])

  // Question form
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null)
  const [questionForm, setQuestionForm] = useState({
    id: "",
    text: "",
    options: ["", "", "", ""],
    correctAnswerIndex: 0,
    explanation: "",
    order: 1,
    difficulty: "Beginner",
  })

  const [showQuestionForm, setShowQuestionForm] = useState(false)

  const updateQuizMutation = useMutation({
    mutationFn: adminUpdateQuizFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-quizzes"] })
      queryClient.invalidateQueries({ queryKey: ["admin-quiz", id] })
    },
  })

  const deleteQuizMutation = useMutation({
    mutationFn: adminDeleteQuizFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-quizzes"] })
      navigate({ to: "/admin/quizzes" })
    },
  })

  const createQuestionMutation = useMutation({
    mutationFn: adminCreateQuestionFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-quiz", id] })
      resetQuestionForm()
      setShowQuestionForm(false)
    },
  })

  const updateQuestionMutation = useMutation({
    mutationFn: adminUpdateQuestionFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-quiz", id] })
      resetQuestionForm()
      setShowQuestionForm(false)
      setEditingQuestion(null)
    },
  })

  const deleteQuestionMutation = useMutation({
    mutationFn: adminDeleteQuestionFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-quiz", id] })
    },
  })

  const resetQuestionForm = () => {
    setQuestionForm({
      id: "",
      text: "",
      options: ["", "", "", ""],
      correctAnswerIndex: 0,
      explanation: "",
      order: questions.length + 1,
      difficulty: "Beginner",
    })
  }

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateQuizMutation.mutate({ data: quizForm } as any)
  }

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!questionForm.text || questionForm.options.some((o) => !o)) return

    if (editingQuestion) {
      updateQuestionMutation.mutate({ data: { ...questionForm } } as any)
    } else {
      createQuestionMutation.mutate({
        data: { ...questionForm, quizId: id },
      } as any)
    }
  }

  const startEditQuestion = (q: (typeof questions)[0]) => {
    setQuestionForm({
      id: q.id,
      text: q.text,
      options: q.options || ["", "", "", ""],
      correctAnswerIndex: q.correctAnswerIndex || 0,
      explanation: q.explanation || "",
      order: q.order || 1,
      difficulty: q.difficulty || "Beginner",
    })
    setEditingQuestion(q.id)
    setShowQuestionForm(true)
  }

  if (!quizData) {
    return (
      <div className="px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Quiz not found</h1>
        <Link to="/admin/quizzes" className="mt-4 inline-flex items-center gap-1 text-primary hover:underline">
          <IconArrowLeft size={16} /> Back to quizzes
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/admin/quizzes" className="text-sm text-muted-foreground hover:text-foreground">
            <IconArrowLeft size={16} />
          </Link>
          <h1 className="text-2xl font-semibold text-foreground">Edit Quiz</h1>
        </div>
        <button
          onClick={() => {
            if (confirm("Delete this quiz and all its questions?")) {
              deleteQuizMutation.mutate({ data: { id } } as any)
            }
          }}
          disabled={deleteQuizMutation.isPending}
          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-rose-200 px-4 text-sm font-medium text-rose-600 transition-all hover:bg-rose-50 active:scale-[0.96] disabled:opacity-50"
        >
          <IconTrash size={14} /> Delete Quiz
        </button>
      </div>

      {/* Quiz Meta Form */}
      <form onSubmit={handleQuizSubmit} className="mt-8 max-w-2xl space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Title</Label>
            <input
              type="text"
              value={quizForm.title}
              onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
              className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label>Slug</Label>
            <input
              type="text"
              value={quizForm.slug}
              onChange={(e) => setQuizForm({ ...quizForm, slug: e.target.value })}
              className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Description</Label>
          <input
            type="text"
            value={quizForm.description}
            onChange={(e) => setQuizForm({ ...quizForm, description: e.target.value })}
            className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label>Category</Label>
            <input
              type="text"
              value={quizForm.category}
              onChange={(e) => setQuizForm({ ...quizForm, category: e.target.value })}
              className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Difficulty</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-11 w-full items-center justify-between rounded-xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span>{quizForm.difficulty}</span>
                <IconChevronDown size={14} className="text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[var(--anchor-width)]">
                {["Beginner", "Intermediate", "Advanced", "Mixed"].map((level) => (
                  <DropdownMenuItem
                    key={level}
                    onClick={() => setQuizForm({ ...quizForm, difficulty: level })}
                  >
                    {level}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-y-1.5">
            <Label>Time Limit (min)</Label>
            <input
              type="number"
              value={quizForm.timeLimitMinutes}
              onChange={(e) => setQuizForm({ ...quizForm, timeLimitMinutes: parseInt(e.target.value) || 0 })}
              className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Checkbox
            checked={quizForm.active}
            onCheckedChange={(checked) => setQuizForm({ ...quizForm, active: checked === true })}
          />
          <Label>Active (visible to users)</Label>
        </div>

        <button
          type="submit"
          disabled={updateQuizMutation.isPending}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96] disabled:opacity-50"
        >
          {updateQuizMutation.isPending ? "Saving..." : <><IconCheck size={16} /> Save Quiz</>}
        </button>
      </form>

      {/* Questions Section */}
      <div className="mt-14">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Questions ({questions.length})
          </h2>
          <button
            onClick={() => {
              resetQuestionForm()
              setEditingQuestion(null)
              setShowQuestionForm(!showQuestionForm)
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96]"
          >
            {showQuestionForm ? <><IconChevronDown size={14} /> Cancel</> : <><IconPlus size={14} /> Add Question</>}
          </button>
        </div>

        {/* Question Form */}
        {showQuestionForm && (
          <form onSubmit={handleQuestionSubmit} className="mt-6 max-w-2xl rounded-2xl border border-border/60 bg-card p-6 space-y-4">
            <h3 className="font-medium text-foreground">
              {editingQuestion ? "Edit Question" : "New Question"}
            </h3>

            <div className="space-y-1.5">
              <Label>Question Text</Label>
              <textarea
                value={questionForm.text}
                onChange={(e) => setQuestionForm({ ...questionForm, text: e.target.value })}
                rows={2}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Answer Options</Label>
              {questionForm.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={questionForm.correctAnswerIndex === i}
                    onChange={() => setQuestionForm({ ...questionForm, correctAnswerIndex: i })}
                    className="h-4 w-4"
                  />
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const newOptions = [...questionForm.options]
                      newOptions[i] = e.target.value
                      setQuestionForm({ ...questionForm, options: newOptions })
                    }}
                    className="h-10 flex-1 rounded-xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <Label>Explanation (shown after answering)</Label>
              <textarea
                value={questionForm.explanation}
                onChange={(e) => setQuestionForm({ ...questionForm, explanation: e.target.value })}
                rows={2}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Why the correct answer is right..."
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Order</Label>
                <input
                  type="number"
                  value={questionForm.order}
                  onChange={(e) => setQuestionForm({ ...questionForm, order: parseInt(e.target.value) || 1 })}
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Difficulty</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex h-11 w-full items-center justify-between rounded-xl border border-border bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <span>{questionForm.difficulty}</span>
                    <IconChevronDown size={14} className="text-muted-foreground" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-[var(--anchor-width)]">
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <DropdownMenuItem
                        key={level}
                        onClick={() => setQuestionForm({ ...questionForm, difficulty: level })}
                      >
                        {level}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <button
              type="submit"
              disabled={createQuestionMutation.isPending || updateQuestionMutation.isPending}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96] disabled:opacity-50"
            >
              {editingQuestion ? "Update Question" : "Add Question"}
            </button>
          </form>
        )}

        {/* Questions List */}
        <div className="mt-6 space-y-3">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-border"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                      {idx + 1}
                    </span>
                    <p className="font-medium text-foreground">{q.text}</p>
                  </div>
                  <div className="mt-2 ml-8 space-y-1">
                    {q.options?.map((opt, i) => (
                      <p
                        key={i}
                        className={`text-sm ${
                          i === q.correctAnswerIndex
                            ? "font-medium text-emerald-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        {String.fromCharCode(65 + i)}. {opt}
                        {i === q.correctAnswerIndex && " ✓"}
                      </p>
                    ))}
                  </div>
                  {q.explanation && (
                    <p className="mt-2 ml-8 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Explanation:</span> {q.explanation}
                    </p>
                  )}
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <button
                    onClick={() => startEditQuestion(q)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    <IconPencil size={14} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Delete this question?")) {
                        deleteQuestionMutation.mutate({ data: { id: q.id } } as any)
                      }
                    }}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-rose-100 hover:text-rose-600"
                  >
                    <IconTrash size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
