import { createServerFn } from "@tanstack/react-start"
import { db } from "@/lib/db"
import { user } from "@/db/schema"
import { eq, desc } from "drizzle-orm"

export const adminGetUsersFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return db.select({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }).from(user).orderBy(desc(user.createdAt))
  }
)

export const adminUpdateUserRoleFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const { id, role } = ctx.data as unknown as { id: string; role: string }
    await db.update(user).set({ role }).where(eq(user.id, id))
    return { success: true }
  })
