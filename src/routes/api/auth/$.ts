import { createFileRoute } from "@tanstack/react-router"
import { auth } from "@/lib/auth"

export const Route = createFileRoute("/api/auth/$")({
  // @ts-expect-error - server.handlers may not be in all versions
  server: {
    handlers: {
      GET: ({ request }: { request: Request }) => auth.handler(request),
      POST: ({ request }: { request: Request }) => auth.handler(request),
    },
  },
})
