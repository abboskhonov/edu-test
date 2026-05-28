import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { submitContactFn, subscribeNewsletterFn } from "@/services/contact"
import { useI18n } from "@/lib/i18n"
import { IconSend, IconMail, IconMapPin, IconBrandTwitter, IconBrandLinkedin, IconCheck } from "@tabler/icons-react"

export const Route = createFileRoute("/contact")({
  component: ContactPage,
})

function ContactPage() {
  const { t } = useI18n()
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const contactMutation = useMutation({
    mutationFn: submitContactFn,
    onSuccess: () => {
      setForm({ name: "", email: "", subject: "", message: "" })
      alert(t("contact.messageSent"))
    },
  })

  const newsletterMutation = useMutation({
    mutationFn: subscribeNewsletterFn,
    onSuccess: () => {
      setNewsletterEmail("")
      setSubscribed(true)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    contactMutation.mutate({ data: form } as any)
  }

  return (
    <div className="px-4 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-muted-foreground">{t("contact.getInTouch")}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {t("contact.contact")}
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
          {t("contact.contactDesc")}
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-10 lg:grid-cols-5">
        {/* Contact Info */}
        <div className="space-y-8 lg:col-span-2">
          <div>
            <h3 className="font-semibold text-foreground">{t("contact.contactInformation")}</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                  <IconMail size={18} stroke={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t("contact.email")}</p>
                  <p className="text-sm text-muted-foreground">hello@teacherwriting.academy</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                  <IconMapPin size={18} stroke={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t("contact.location")}</p>
                  <p className="text-sm text-muted-foreground">{t("contact.globalOnline")}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">{t("contact.followUs")}</h3>
            <div className="mt-3 flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors hover:bg-primary/10">
                <IconBrandTwitter size={20} stroke={1.5} />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors hover:bg-primary/10">
                <IconBrandLinkedin size={20} stroke={1.5} />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h3 className="font-semibold text-foreground">{t("contact.newsletter")}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t("contact.newsletterDesc")}</p>
            {subscribed ? (
              <div className="mt-3 flex items-center gap-2 text-emerald-600">
                <IconCheck size={18} />
                <span className="text-sm font-medium">{t("contact.subscribed")}</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  newsletterMutation.mutate({ data: { email: newsletterEmail } } as any)
                }}
                className="mt-3 flex gap-2"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="h-10 flex-1 rounded-xl border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                  type="submit"
                  disabled={newsletterMutation.isPending}
                  className="h-10 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  <IconSend size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t("contact.name")}</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t("contact.email")}</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t("contact.subject")}</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                placeholder={t("contact.whatIsThisAbout")}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">{t("contact.message")}</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                placeholder={t("contact.yourMessage")}
              />
            </div>
            <button
              type="submit"
              disabled={contactMutation.isPending}
              className="h-11 w-full rounded-full bg-primary text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.96] disabled:opacity-50"
            >
              {contactMutation.isPending ? t("contact.sending") : t("contact.sendMessage")}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
