import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useSuspenseQuery, useMutation } from "@tanstack/react-query"
import { useState, useEffect, useRef } from "react"
import { getQuizByIdFn, submitQuizAttemptFn } from "@/services/quizzes"
import { useAuth } from "@/hooks/use-auth"
import { IconArrowLeft, IconArrowRight, IconClock, IconCheck, IconFlag } from "@tabler/icons-react"

export const Route = createFileRoute("/quizzes/$id")({
  component: QuizPage,
  staleTime: 5 * 60 * 1000,
  loader: async ({ params }) => {
    const data = await getQuizByIdFn({ data: { id: params.id } } as any)
    return { quizData: data }
  },
})

function QuizPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const { data: quizData } = useSuspenseQuery({
    queryKey: ["quiz", id],
    queryFn: () => getQuizByIdFn({ data: { id } } as any),
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [flagged, setFlagged] = useState<Set<number>>(new Set())
  const [timeLeft, setTimeLeft] = useState((quizData?.quiz?.timeLimitMinutes || 20) * 60)
  const [submitted, setSubmitted] = useState(false)

  // Use refs to avoid stale closures in timer
  const submittedRef = useRef(false)
  const quizDataRef = useRef(quizData)
  const selectedAnswersRef = useRef(selectedAnswers)
  const timeLeftRef = useRef(timeLeft)

  useEffect(() => { quizDataRef.current = quizData }, [quizData])
  useEffect(() => { selectedAnswersRef.current = selectedAnswers }, [selectedAnswers])
  useEffect(() => { timeLeftRef.current = timeLeft }, [timeLeft])
  useEffect(() => { submittedRef.current = submitted }, [submitted])

  const questions = quizData?.questions || []
  const currentQ = questions[currentIndex]

  const submitMutation = useMutation({
    mutationFn: submitQuizAttemptFn,
    onSuccess: (result) => {
      navigate({ to: "/quizzes/$id/results", params: { id }, search: { attemptId: result.attemptId } })
    },
  })

  // Submit function using refs to avoid stale closures
  const doSubmit = () => {
    if (submittedRef.current) return
    submittedRef.current = true
    setSubmitted(true)

    const quiz = quizDataRef.current?.quiz
    const qList = quizDataRef.current?.questions || []
    const timeSpent = ((quiz?.timeLimitMinutes || 20) * 60) - timeLeftRef.current
    const answers = qList.map((_, i) => selectedAnswersRef.current[i] ?? -1)

    // Require login — use user's real ID
    const userId = user?.id
    if (!userId) {
      navigate({ to: "/login" })
      return
    }

    submitMutation.mutate({
      data: {
        userId,
        quizId: id,
        answers,
        timeSpentSeconds: timeSpent,
      },
    } as any)
  }

  // Timer
  useEffect(() => {
    if (timeLeft <= 0 || submittedRef.current) return
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer)
          doSubmit()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft, submitted])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  if (!quizData || !currentQ) {
    return (
      <div className="px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Quiz not found</h1>
        <Link to="/quizzes" className="mt-4 inline-flex items-center gap-1 text-primary hover:underline">
          <IconArrowLeft size={16} /> Back to quizzes
        </Link>
      </div>
    )
  }

  return (
    <div className="px-4 py-12 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{quizData.quiz.category}</p>
            <h1 className="text-xl font-semibold text-foreground">{quizData.quiz.title}</h1>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <IconClock size={16} />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8 h-2 w-full rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <button
              onClick={() => {
                setFlagged((prev) => {
                  const next = new Set(prev)
                  if (next.has(currentIndex)) next.delete(currentIndex)
                  else next.add(currentIndex)
                  return next
                })
              }}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                flagged.has(currentIndex) ? "bg-amber-500/10 text-amber-700" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <IconFlag size={12} />
              {flagged.has(currentIndex) ? "Flagged" : "Flag"}
            </button>
          </div>

          <h2 className="text-lg font-medium text-foreground sm:text-xl">{currentQ.text}</h2>

          <div className="mt-6 space-y-3">
            {currentQ.options?.map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: i }))
                }}
                className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                  selectedAnswers[currentIndex] === i
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-border/60 bg-background text-muted-foreground hover:border-border hover:bg-muted/50"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    selectedAnswers[currentIndex] === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm sm:text-base">{opt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            className="inline-flex h-10 items-center gap-1 rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
          >
            <IconArrowLeft size={16} /> Previous
          </button>

          {/* Question dots */}
          <div className="hidden items-center gap-1.5 sm:flex">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  i === currentIndex
                    ? "bg-primary w-5"
                    : selectedAnswers[i] !== undefined
                    ? "bg-primary/40"
                    : flagged.has(i)
                    ? "bg-amber-400"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
              className="inline-flex h-10 items-center gap-1 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96]"
            >
              Next <IconArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={doSubmit}
              disabled={submitMutation.isPending}
              className="inline-flex h-10 items-center gap-1 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96] disabled:opacity-50"
            >
              {submitMutation.isPending ? "Submitting..." : (
                <><IconCheck size={16} /> Submit</>
              )}
            </button>
          )}
        </div>

        {/* Login warning for guests */}
        {!user && (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <p className="font-medium">You are not logged in.</p>
            <p className="mt-1">
              <Link to="/login" className="font-medium underline">Log in</Link> or{" "}
              <Link to="/register" className="font-medium underline">register</Link>{" "}
              to save your quiz results and earn certificates.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
