import { createServerFn } from "@tanstack/react-start"
import { db } from "@/lib/db"
import { contacts } from "@/db/schema"
import { desc } from "drizzle-orm"

export const adminGetContactsFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return db.select().from(contacts).orderBy(desc(contacts.createdAt))
  }
)
