import { createServerFn } from "@tanstack/react-start"
import { db } from "@/lib/db"
import { articles, savedArticles } from "@/db/schema"
import { eq, and } from "drizzle-orm"

export const getArticlesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return db.select().from(articles).where(eq(articles.status, "published")).orderBy(articles.publishedAt)
  }
)

export const getFeaturedArticlesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return db.select().from(articles)
      .where(and(eq(articles.status, "published"), eq(articles.featured, true)))
      .orderBy(articles.publishedAt)
  }
)

export const getArticleBySlugFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { slug } = ctx.data as unknown as { slug: string }
    const result = await db.select().from(articles)
      .where(and(eq(articles.slug, slug), eq(articles.status, "published")))
      .limit(1)
    return result[0] ?? null
  })

export const toggleSaveArticleFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const { userId, articleId } = ctx.data as unknown as { userId: string; articleId: string }
    const existing = await db.select().from(savedArticles)
      .where(and(eq(savedArticles.userId, userId), eq(savedArticles.articleId, articleId)))
      .limit(1)

    if (existing.length > 0) {
      await db.delete(savedArticles).where(eq(savedArticles.id, existing[0].id))
      return { saved: false }
    } else {
      await db.insert(savedArticles).values({
        id: crypto.randomUUID(),
        userId,
        articleId,
      })
      return { saved: true }
    }
  })

export const getSavedArticlesFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { userId } = ctx.data as unknown as { userId: string }
    return db.select({ article: articles })
      .from(savedArticles)
      .innerJoin(articles, eq(savedArticles.articleId, articles.id))
      .where(eq(savedArticles.userId, userId))
      .orderBy(savedArticles.createdAt)
  })
