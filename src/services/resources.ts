import { createServerFn } from "@tanstack/react-start"
import { db } from "@/lib/db"
import { resources, resourceDownloads } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getResourcesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return db.select().from(resources).orderBy(resources.title)
  }
)

export const trackDownloadFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const { userId, resourceId } = ctx.data as unknown as { userId: string; resourceId: string }
    await db.insert(resourceDownloads).values({
      id: crypto.randomUUID(),
      userId,
      resourceId,
    })

    const current = await db.select().from(resources).where(eq(resources.id, resourceId)).limit(1)
    if (current[0]) {
      await db.update(resources)
        .set({ downloadCount: (current[0].downloadCount || 0) + 1 })
        .where(eq(resources.id, resourceId))
    }

    return { success: true }
  })

export const getUserDownloadsFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { userId } = ctx.data as unknown as { userId: string }
    return db.select().from(resourceDownloads)
      .where(eq(resourceDownloads.userId, userId))
      .orderBy(resourceDownloads.downloadedAt)
  })
