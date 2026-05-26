import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { queryClient } from "@/lib/query-client"

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    context: {
      session: undefined!,
      queryClient,
    },
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 60 * 1000, // 1 min — preloaded data stays fresh
  })

  return router
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
