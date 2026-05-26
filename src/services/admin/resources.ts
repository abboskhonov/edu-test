import { createServerFn } from "@tanstack/react-start"
import { db } from "@/lib/db"
import { resources } from "@/db/schema"
import { eq } from "drizzle-orm"

export const adminGetResourcesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return db.select().from(resources).orderBy(resources.createdAt)
  }
)

export const adminGetResourceFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { id } = ctx.data as unknown as { id: string }
    const result = await db.select().from(resources).where(eq(resources.id, id)).limit(1)
    return result[0] || null
  })

export const adminCreateResourceFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const data = ctx.data as unknown as {
      title: string
      description: string
      fileUrl: string
      category: string
      fileType: string
    }

    await db.insert(resources).values({
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description || null,
      fileUrl: data.fileUrl || null,
      category: data.category || null,
      fileType: data.fileType || null,
      downloadCount: 0,
      createdAt: new Date(),
    })

    return { success: true }
  })

export const adminUpdateResourceFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const data = ctx.data as unknown as {
      id: string
      title: string
      description: string
      fileUrl: string
      category: string
      fileType: string
    }

    await db.update(resources)
      .set({
        title: data.title,
        description: data.description || null,
        fileUrl: data.fileUrl || null,
        category: data.category || null,
        fileType: data.fileType || null,
      })
      .where(eq(resources.id, data.id))

    return { success: true }
  })

export const adminDeleteResourceFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const { id } = ctx.data as unknown as { id: string }
    await db.delete(resources).where(eq(resources.id, id))
    return { success: true }
  })
