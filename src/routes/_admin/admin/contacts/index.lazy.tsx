import { createLazyFileRoute } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { adminGetContactsFn } from "@/services/admin/contacts"
import { IconMail } from "@tabler/icons-react"
import { AdminPageHeader } from "@/features/admin"

export const Route = createLazyFileRoute("/_admin/admin/contacts/")({
  component: AdminContactsPage,
})

function AdminContactsPage() {
  const { data: contacts } = useSuspenseQuery({
    queryKey: ["admin-contacts"],
    queryFn: adminGetContactsFn,
  })

  return (
    <div>
      <AdminPageHeader
        title="Contact Submissions"
        subtitle="Messages from the contact form."
        backTo="/admin"
      />

      <div className="mt-8 space-y-4">
        {contacts && contacts.length > 0 ? (
          contacts.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-border/60 bg-card p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary">
                    <IconMail size={20} stroke={1.5} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{c.name}</p>
                    <p className="text-sm text-muted-foreground">{c.email}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>
              {c.subject && (
                <p className="mt-3 text-sm font-medium text-foreground">{c.subject}</p>
              )}
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.message}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No contact submissions yet.</p>
        )}
      </div>
    </div>
  )
}
