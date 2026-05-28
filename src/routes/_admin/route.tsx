import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_admin")({
  beforeLoad: async ({ context }) => {
    if (!context.session?.user) {
      throw redirect({ to: "/login" })
    }
    if ((context.session.user as any).role !== "admin") {
      throw redirect({ to: "/dashboard" })
    }
  },
})
