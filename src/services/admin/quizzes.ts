import { createServerFn } from "@tanstack/react-start"
import { db } from "@/lib/db"
import { quizzes, questions } from "@/db/schema"
import { eq } from "drizzle-orm"

export const adminGetQuizzesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return db.select().from(quizzes).orderBy(quizzes.createdAt)
  }
)

export const adminGetQuizFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { id } = ctx.data as unknown as { id: string }
    const quizResult = await db.select().from(quizzes).where(eq(quizzes.id, id)).limit(1)
    if (!quizResult[0]) return null
    const questionList = await db.select().from(questions)
      .where(eq(questions.quizId, id))
      .orderBy(questions.order)
    return { quiz: quizResult[0], questions: questionList }
  })

export const adminCreateQuizFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const data = ctx.data as unknown as {
      title: string
      slug: string
      description: string
      category: string
      difficulty: string
      timeLimitMinutes: number
      passScore: number
      totalQuestions: number
      active: boolean
    }

    await db.insert(quizzes).values({
      id: crypto.randomUUID(),
      title: data.title,
      slug: data.slug,
      description: data.description || null,
      category: data.category || null,
      difficulty: data.difficulty || null,
      timeLimitMinutes: data.timeLimitMinutes || null,
      passScore: data.passScore || null,
      totalQuestions: data.totalQuestions || null,
      active: data.active ?? true,
      createdAt: new Date(),
    })

    return { success: true }
  })

export const adminUpdateQuizFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const data = ctx.data as unknown as {
      id: string
      title: string
      slug: string
      description: string
      category: string
      difficulty: string
      timeLimitMinutes: number
      passScore: number
      totalQuestions: number
      active: boolean
    }

    await db.update(quizzes)
      .set({
        title: data.title,
        slug: data.slug,
        description: data.description || null,
        category: data.category || null,
        difficulty: data.difficulty || null,
        timeLimitMinutes: data.timeLimitMinutes || null,
        passScore: data.passScore || null,
        totalQuestions: data.totalQuestions || null,
        active: data.active ?? true,
      })
      .where(eq(quizzes.id, data.id))

    return { success: true }
  })

export const adminDeleteQuizFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const { id } = ctx.data as unknown as { id: string }
    await db.delete(questions).where(eq(questions.quizId, id))
    await db.delete(quizzes).where(eq(quizzes.id, id))
    return { success: true }
  })

// Question management
export const adminCreateQuestionFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const data = ctx.data as unknown as {
      quizId: string
      text: string
      options: string[]
      correctAnswerIndex: number
      explanation: string
      order: number
      difficulty: string
    }

    await db.insert(questions).values({
      id: crypto.randomUUID(),
      quizId: data.quizId,
      text: data.text,
      options: data.options,
      correctAnswerIndex: data.correctAnswerIndex,
      explanation: data.explanation || null,
      order: data.order || 0,
      difficulty: data.difficulty || null,
    })

    return { success: true }
  })

export const adminUpdateQuestionFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const data = ctx.data as unknown as {
      id: string
      text: string
      options: string[]
      correctAnswerIndex: number
      explanation: string
      order: number
      difficulty: string
    }

    await db.update(questions)
      .set({
        text: data.text,
        options: data.options,
        correctAnswerIndex: data.correctAnswerIndex,
        explanation: data.explanation || null,
        order: data.order || 0,
        difficulty: data.difficulty || null,
      })
      .where(eq(questions.id, data.id))

    return { success: true }
  })

export const adminDeleteQuestionFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const { id } = ctx.data as unknown as { id: string }
    await db.delete(questions).where(eq(questions.id, id))
    return { success: true }
  })
