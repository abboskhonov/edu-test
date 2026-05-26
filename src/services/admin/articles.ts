import { createServerFn } from "@tanstack/react-start"
import { db } from "@/lib/db"
import { articles } from "@/db/schema"
import { eq } from "drizzle-orm"

export const adminGetArticlesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return db.select().from(articles).orderBy(articles.createdAt)
  }
)

export const adminCreateArticleFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const data = ctx.data as unknown as {
      title: string
      slug: string
      excerpt: string
      content: string
      category: string
      status: "draft" | "published"
      featured: boolean
    }

    await db.insert(articles).values({
      id: crypto.randomUUID(),
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || null,
      content: data.content || null,
      category: data.category || null,
      status: data.status || "draft",
      featured: data.featured ?? false,
      publishedAt: data.status === "published" ? new Date() : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return { success: true }
  })

export const adminUpdateArticleFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const data = ctx.data as unknown as {
      id: string
      title: string
      slug: string
      excerpt: string
      content: string
      category: string
      status: "draft" | "published"
      featured: boolean
    }

    await db.update(articles)
      .set({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        content: data.content || null,
        category: data.category || null,
        status: data.status,
        featured: data.featured ?? false,
        publishedAt: data.status === "published" ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(articles.id, data.id))

    return { success: true }
  })

export const adminDeleteArticleFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const { id } = ctx.data as unknown as { id: string }
    await db.delete(articles).where(eq(articles.id, id))
    return { success: true }
  })
