import { createServerFn } from "@tanstack/react-start"
import { db } from "@/lib/db"
import { courses, courseModules, courseEnrollments, moduleProgress } from "@/db/schema"
import { eq, and } from "drizzle-orm"

export const getCoursesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const courseList = await db.select().from(courses).where(eq(courses.status, "published")).orderBy(courses.createdAt)
    const results = []
    for (const c of courseList) {
      const modules = await db.select().from(courseModules).where(eq(courseModules.courseId, c.id))
      results.push({ ...c, moduleCount: modules.length })
    }
    return results
  }
)

export const getCourseByIdFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { id } = ctx.data as unknown as { id: string }
    const result = await db.select().from(courses).where(eq(courses.id, id)).limit(1)
    return result[0] ?? null
  })

export const getCourseModulesFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { courseId } = ctx.data as unknown as { courseId: string }
    return db.select().from(courseModules)
      .where(eq(courseModules.courseId, courseId))
      .orderBy(courseModules.order)
  })

export const getCourseWithModulesFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { id } = ctx.data as unknown as { id: string }
    const course = await db.select().from(courses).where(eq(courses.id, id)).limit(1)
    if (!course[0]) return null
    const modules = await db.select().from(courseModules)
      .where(eq(courseModules.courseId, id))
      .orderBy(courseModules.order)
    return { course: course[0], modules }
  })

export const getModuleByIdFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { id } = ctx.data as unknown as { id: string }
    const result = await db.select().from(courseModules).where(eq(courseModules.id, id)).limit(1)
    return result[0] ?? null
  })

export const enrollInCourseFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const { userId, courseId } = ctx.data as unknown as { userId: string; courseId: string }
    const existing = await db.select().from(courseEnrollments)
      .where(and(eq(courseEnrollments.userId, userId), eq(courseEnrollments.courseId, courseId)))
      .limit(1)
    if (existing.length > 0) {
      return { enrolled: true, enrollmentId: existing[0].id }
    }
    const id = crypto.randomUUID()
    await db.insert(courseEnrollments).values({
      id,
      userId,
      courseId,
    })
    return { enrolled: true, enrollmentId: id }
  })

export const isEnrolledFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { userId, courseId } = ctx.data as unknown as { userId: string; courseId: string }
    const existing = await db.select().from(courseEnrollments)
      .where(and(eq(courseEnrollments.userId, userId), eq(courseEnrollments.courseId, courseId)))
      .limit(1)
    return existing.length > 0
  })

export const markModuleCompleteFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const { userId, moduleId } = ctx.data as unknown as { userId: string; moduleId: string }
    const existing = await db.select().from(moduleProgress)
      .where(and(eq(moduleProgress.userId, userId), eq(moduleProgress.moduleId, moduleId)))
      .limit(1)
    if (existing.length > 0) {
      if (!existing[0].completed) {
        await db.update(moduleProgress)
          .set({ completed: true, completedAt: new Date() })
          .where(eq(moduleProgress.id, existing[0].id))
      }
      return { completed: true }
    }
    await db.insert(moduleProgress).values({
      id: crypto.randomUUID(),
      userId,
      moduleId,
      completed: true,
      completedAt: new Date(),
    })
    return { completed: true }
  })

export const getModuleProgressFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { userId, courseId } = ctx.data as unknown as { userId: string; courseId: string }
    const modules = await db.select().from(courseModules)
      .where(eq(courseModules.courseId, courseId))
      .orderBy(courseModules.order)
    const progress = await db.select().from(moduleProgress).where(eq(moduleProgress.userId, userId))
    const completedSet = new Set(progress.filter(p => p.completed).map(p => p.moduleId))
    return modules.map(m => ({
      moduleId: m.id,
      completed: completedSet.has(m.id),
    }))
  })

export const getUserCoursesFn = createServerFn({ method: "GET" })
  .handler(async (ctx) => {
    const { userId } = ctx.data as unknown as { userId: string }
    const enrollments = await db.select()
      .from(courseEnrollments)
      .where(eq(courseEnrollments.userId, userId))
      .orderBy(courseEnrollments.enrolledAt)

    const results = []
    for (const enrollment of enrollments) {
      const course = await db.select().from(courses).where(eq(courses.id, enrollment.courseId)).limit(1)
      const modules = await db.select().from(courseModules).where(eq(courseModules.courseId, enrollment.courseId))
      const progress = await db.select()
        .from(moduleProgress)
        .where(and(eq(moduleProgress.userId, userId), eq(moduleProgress.completed, true)))
      const completedModuleIds = new Set(progress.map(p => p.moduleId))
      const completedCount = modules.filter(m => completedModuleIds.has(m.id)).length
      const totalModules = modules.length
      results.push({
        enrollment,
        course: course[0],
        progress: {
          completed: completedCount,
          total: totalModules,
          percentage: totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0,
        },
      })
    }
    return results
  })
