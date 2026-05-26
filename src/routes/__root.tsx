import { HeadContent, Scripts, createRootRouteWithContext, useRouterState } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/query-client"

import { Navbar } from "@/features/marketing/navbar"
import { Footer } from "@/features/marketing/footer"
import { getSessionFn } from "@/services/auth"
import type { AuthSession } from "@/lib/auth"
import appCss from "../styles.css?url"



interface MyRouterContext {
  session: AuthSession | null
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Teacher Writing Academy" },
      { name: "description", content: "Professional writing pedagogy hub for educators. Articles, quizzes, and resources to advance your teaching expertise." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  beforeLoad: async () => {
    const session = await getSessionFn()
    return { session }
  },
  notFoundComponent: () => (
    <main className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <p className="mt-2 text-muted-foreground">The requested page could not be found.</p>
    </main>
  ),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isAdmin = pathname.startsWith("/admin")

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-svh flex-col bg-background text-foreground antialiased">
        <QueryClientProvider client={queryClient}>
          {!isAdmin && <Navbar />}
          <main className="flex-1">{children}</main>
          {!isAdmin && <Footer />}
          <TanStackDevtools
            config={{ position: "bottom-right" }}
            plugins={[{ name: "Tanstack Router", render: <TanStackRouterDevtoolsPanel /> }]}
          />
          <Scripts />
        </QueryClientProvider>
      </body>
    </html>
  )
}
