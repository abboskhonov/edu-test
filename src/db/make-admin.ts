import { db } from "../lib/db"
import { user } from "./schema"
import { eq } from "drizzle-orm"

async function makeAdmin() {
  const email = process.argv[2]
  if (!email) {
    console.log("Usage: npx tsx src/db/make-admin.ts <user-email>")
    process.exit(1)
  }

  const result = await db.update(user).set({ role: "admin" }).where(eq(user.email, email)).returning()

  if (result.length > 0) {
    console.log(`✅ User ${email} is now an admin`)
  } else {
    console.log(`❌ User ${email} not found`)
  }
}

makeAdmin().catch(console.error)
