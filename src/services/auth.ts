import { createServerFn } from "@tanstack/react-start"
import { getRequestHeaders } from "@tanstack/react-start/server"
import { auth } from "@/lib/auth"

export const getSessionFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const headers = getRequestHeaders()
    const session = await auth.api.getSession({ headers })
    return session
  },
)

export const signUpFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const { email, password, name } = ctx.data as unknown as { email: string; password: string; name: string }
    const headers = getRequestHeaders()
    const result = await auth.api.signUpEmail({
      body: { email, password, name },
      headers,
    })
    return result
  })

export const signInFn = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
    const { email, password } = ctx.data as unknown as { email: string; password: string }
    const headers = getRequestHeaders()
    const result = await auth.api.signInEmail({
      body: { email, password },
      headers,
    })
    return result
  })

export const signOutFn = createServerFn({ method: "POST" }).handler(
  async () => {
    const headers = getRequestHeaders()
    const result = await auth.api.signOut({ headers })
    return result
  },
)
