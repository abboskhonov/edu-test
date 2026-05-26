import { hashPassword } from "better-auth/crypto"
import { db } from "../lib/db"
import { account } from "./schema"
import { eq } from "drizzle-orm"

async function resetPassword() {
  const email = process.argv[2]
  const newPassword = process.argv[3]

  if (!email || !newPassword) {
    console.log("Usage: npx tsx src/db/reset-password.ts <email> <new-password>")
    process.exit(1)
  }

  // Find user by email
  const userResult = await db.query.user.findFirst({
    where: (u, { eq }) => eq(u.email, email),
  })

  if (!userResult) {
    console.log(`❌ User ${email} not found`)
    process.exit(1)
  }

  // Hash the new password using Better Auth's hash function
  const newHash = await hashPassword(newPassword)

  // Update the account record
  await db.update(account)
    .set({ password: newHash, updatedAt: new Date() })
    .where(eq(account.userId, userResult.id))

  console.log(`✅ Password reset for ${email}`)
}

resetPassword().catch(console.error)
