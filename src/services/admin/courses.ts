import { createServerFn } from "@tanstack/react-start"
import { db } from "@/lib/db"
import { courses, courseModules } from "@/db/schema"
import { eq } from "drizzle-orm"

export const adminGetCoursesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return db.select().from(courses).orderBy(courses.createdAt)
  }
)

export const adminCreateCourseFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const data = ctx.data as unknown as {
      title: string
      slug: string
      description: string
      imageUrl: string
      category: string
      status: "draft" | "published"
      featured: boolean
    }
    const id = crypto.randomUUID()
    await db.insert(courses).values({
      id,
      title: data.title,
      slug: data.slug,
      description: data.description || null,
      imageUrl: data.imageUrl || null,
      category: data.category || null,
      status: data.status || "draft",
      featured: data.featured ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return { success: true, id }
  })

export const adminUpdateCourseFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const data = ctx.data as unknown as {
      id: string
      title: string
      slug: string
      description: string
      imageUrl: string
      category: string
      status: "draft" | "published"
      featured: boolean
    }
    await db.update(courses)
      .set({
        title: data.title,
        slug: data.slug,
        description: data.description || null,
        imageUrl: data.imageUrl || null,
        category: data.category || null,
        status: data.status,
        featured: data.featured ?? false,
        updatedAt: new Date(),
      })
      .where(eq(courses.id, data.id))
    return { success: true }
  })

export const adminDeleteCourseFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const { id } = ctx.data as unknown as { id: string }
    await db.delete(courseModules).where(eq(courseModules.courseId, id))
    await db.delete(courses).where(eq(courses.id, id))
    return { success: true }
  })

export const adminGetCourseModulesFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { courseId } = ctx.data as unknown as { courseId: string }
    return db.select().from(courseModules)
      .where(eq(courseModules.courseId, courseId))
      .orderBy(courseModules.order)
  })

export const adminCreateModuleFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const data = ctx.data as unknown as {
      courseId: string
      title: string
      description: string
      theoryContent: string
      practiceContent: string
      order: number
    }
    const id = crypto.randomUUID()
    await db.insert(courseModules).values({
      id,
      courseId: data.courseId,
      title: data.title,
      description: data.description || null,
      theoryContent: data.theoryContent || null,
      practiceContent: data.practiceContent || null,
      order: data.order ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return { success: true, id }
  })

export const adminUpdateModuleFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const data = ctx.data as unknown as {
      id: string
      title: string
      description: string
      theoryContent: string
      practiceContent: string
      order: number
    }
    await db.update(courseModules)
      .set({
        title: data.title,
        description: data.description || null,
        theoryContent: data.theoryContent || null,
        practiceContent: data.practiceContent || null,
        order: data.order ?? 0,
        updatedAt: new Date(),
      })
      .where(eq(courseModules.id, data.id))
    return { success: true }
  })

export const adminDeleteModuleFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const { id } = ctx.data as unknown as { id: string }
    await db.delete(courseModules).where(eq(courseModules.id, id))
    return { success: true }
  })

export const adminGetCourseWithModulesFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { id } = ctx.data as unknown as { id: string }
    const course = await db.select().from(courses).where(eq(courses.id, id)).limit(1)
    if (!course[0]) return null
    const modules = await db.select().from(courseModules)
      .where(eq(courseModules.courseId, id))
      .orderBy(courseModules.order)
    return { course: course[0], modules }
  })
