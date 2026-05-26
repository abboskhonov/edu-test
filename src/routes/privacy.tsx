import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/privacy")({ component: PrivacyPage })

function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">This page will contain the Teacher Writing Academy privacy policy.</p>
      </div>
    </div>
  )
}
