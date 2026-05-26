import { createServerFn } from "@tanstack/react-start"
import { db } from "@/lib/db"
import { quizzes, questions, quizAttempts } from "@/db/schema"
import { eq, and, desc } from "drizzle-orm"

export const getQuizzesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return db.select().from(quizzes).where(eq(quizzes.active, true)).orderBy(quizzes.title)
  }
)

export const getQuizByIdFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { id } = ctx.data as unknown as { id: string }
    const quizResult = await db.select().from(quizzes).where(eq(quizzes.id, id)).limit(1)
    if (!quizResult[0]) return null

    const questionList = await db.select().from(questions)
      .where(eq(questions.quizId, id))
      .orderBy(questions.order)

    return { quiz: quizResult[0], questions: questionList }
  })

export const getQuizBySlugFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { slug } = ctx.data as unknown as { slug: string }
    const quizResult = await db.select().from(quizzes).where(eq(quizzes.slug, slug)).limit(1)
    if (!quizResult[0]) return null

    const questionList = await db.select().from(questions)
      .where(eq(questions.quizId, quizResult[0].id))
      .orderBy(questions.order)

    return { quiz: quizResult[0], questions: questionList }
  })

export const submitQuizAttemptFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const { userId, quizId, answers, timeSpentSeconds } = ctx.data as unknown as {
      userId: string
      quizId: string
      answers: number[]
      timeSpentSeconds: number
    }

    const questionList = await db.select().from(questions).where(eq(questions.quizId, quizId)).orderBy(questions.order)
    let score = 0
    const maxScore = questionList.length

    const gradedAnswers = questionList.map((q, i) => {
      const selected = answers[i]
      const correct = selected === q.correctAnswerIndex
      if (correct) score++
      return {
        questionId: q.id,
        selectedAnswer: selected,
        correctAnswer: q.correctAnswerIndex,
        isCorrect: correct,
        explanation: q.explanation,
      }
    })

    const percentage = Math.round((score / maxScore) * 100)
    let certificateTier: string | null = null
    if (percentage >= 80) certificateTier = "Expert"
    else if (percentage >= 60) certificateTier = "Proficient"
    else if (percentage >= 40) certificateTier = "Developing"
    else certificateTier = "Beginner"

    const passed = percentage >= 60

    await db.insert(quizAttempts).values({
      id: crypto.randomUUID(),
      userId,
      quizId,
      score,
      maxScore,
      percentage,
      passed,
      certificateTier,
      answers: JSON.stringify(gradedAnswers),
      timeSpentSeconds,
      completedAt: new Date(),
    })

    return {
      score,
      maxScore,
      percentage,
      passed,
      certificateTier,
      answers: gradedAnswers,
    }
  })

export const getQuizAttemptsFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { userId } = ctx.data as unknown as { userId: string }
    return db.select().from(quizAttempts)
      .where(eq(quizAttempts.userId, userId))
      .orderBy(desc(quizAttempts.completedAt))
  })

export const getQuizAttemptsByQuizFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { userId, quizId } = ctx.data as unknown as { userId: string; quizId: string }
    return db.select().from(quizAttempts)
      .where(and(eq(quizAttempts.userId, userId), eq(quizAttempts.quizId, quizId)))
      .orderBy(desc(quizAttempts.completedAt))
  })
