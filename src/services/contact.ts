import { createServerFn } from "@tanstack/react-start"
import { db } from "@/lib/db"
import { contacts, newsletters } from "@/db/schema"

export const submitContactFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const { name, email, subject, message } = ctx.data as unknown as {
      name: string
      email: string
      subject?: string
      message: string
    }
    await db.insert(contacts).values({
      id: crypto.randomUUID(),
      name,
      email,
      subject: subject || null,
      message,
    })
    return { success: true }
  })

export const subscribeNewsletterFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const { email } = ctx.data as unknown as { email: string }
    try {
      await db.insert(newsletters).values({
        id: crypto.randomUUID(),
        email,
      })
      return { success: true }
    } catch {
      return { success: false, message: "Already subscribed" }
    }
  })
