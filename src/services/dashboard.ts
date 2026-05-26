import { createServerFn } from "@tanstack/react-start"
import { db } from "@/lib/db"
import { quizAttempts, savedArticles, resourceDownloads } from "@/db/schema"
import { eq, sql, desc } from "drizzle-orm"

export const getDashboardDataFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { userId } = ctx.data as unknown as { userId: string }
    const attempts = await db.select().from(quizAttempts)
      .where(eq(quizAttempts.userId, userId))
      .orderBy(desc(quizAttempts.completedAt))

    const saved = await db.select({ count: sql<number>`count(*)` }).from(savedArticles)
      .where(eq(savedArticles.userId, userId))

    const downloads = await db.select({ count: sql<number>`count(*)` }).from(resourceDownloads)
      .where(eq(resourceDownloads.userId, userId))

    const avgScore = attempts.length > 0
      ? Math.round(attempts.reduce((sum, a) => sum + (a.percentage || 0), 0) / attempts.length)
      : 0

    return {
      totalQuizzes: attempts.length,
      avgScore,
      savedArticles: saved[0]?.count ?? 0,
      totalDownloads: downloads[0]?.count ?? 0,
      recentAttempts: attempts.slice(0, 5),
    }
  })

export const getDashboardStatsFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { userId } = ctx.data as unknown as { userId: string }
    const attempts = await db.select().from(quizAttempts)
      .where(eq(quizAttempts.userId, userId))

    const saved = await db.select({ count: sql<number>`count(*)` }).from(savedArticles)
      .where(eq(savedArticles.userId, userId))

    const downloads = await db.select({ count: sql<number>`count(*)` }).from(resourceDownloads)
      .where(eq(resourceDownloads.userId, userId))

    const avgScore = attempts.length > 0
      ? Math.round(attempts.reduce((sum, a) => sum + (a.percentage || 0), 0) / attempts.length)
      : 0

    return {
      quizzesTaken: attempts.length,
      avgScore,
      savedArticles: saved[0]?.count ?? 0,
      downloads: downloads[0]?.count ?? 0,
      certificates: attempts.length,
    }
  })
