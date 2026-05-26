import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/terms")({ component: TermsPage })

function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-muted-foreground">This page will contain the Teacher Writing Academy terms of service.</p>
      </div>
    </div>
  )
}
