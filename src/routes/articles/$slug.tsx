import { createFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery, useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getArticleBySlugFn, getSavedArticlesFn, toggleSaveArticleFn } from "@/services/articles"
import { IconArrowLeft, IconBook, IconShare, IconBookmark, IconBookmarkFilled } from "@tabler/icons-react"
import { ArticleDetailSkeleton } from "@/components/skeletons"
import { useAuth } from "@/hooks/use-auth"
import { useI18n } from "@/lib/i18n"
import { toast } from "sonner"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export const Route = createFileRoute("/articles/$slug")({
  component: ArticleDetailPage,
  pendingComponent: ArticleDetailSkeleton,
  staleTime: 5 * 60 * 1000,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["article", params.slug],
      queryFn: () => getArticleBySlugFn({ data: { slug: params.slug } } as any),
    })
  },
})

function ArticleDetailPage() {
  const { t } = useI18n()
  const { slug } = Route.useParams()
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const { data: article } = useSuspenseQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticleBySlugFn({ data: { slug } } as any),
  })

  const { data: savedArticles } = useQuery({
    queryKey: ["saved-articles", user?.id],
    queryFn: () => getSavedArticlesFn({ data: { userId: user!.id } } as any),
    enabled: !!user,
  })

  const isSaved = savedArticles?.some((s) => s.article.id === article?.id)

  const toggleSave = useMutation({
    mutationFn: () => toggleSaveArticleFn({ data: { userId: user!.id, articleId: article!.id } } as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-articles", user?.id] })
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats", user?.id] })
    },
  })

  if (!article) {
    return (
      <div className="px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">{t("articles.articleNotFound")}</h1>
        <Link to="/articles" className="mt-4 inline-flex items-center gap-1 text-primary hover:underline">
          <IconArrowLeft size={16} /> {t("articles.backToArticles")}
        </Link>
      </div>
    )
  }

  return (
    <div className="px-4 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/articles"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <IconArrowLeft size={16} /> {t("articles.allArticles")}
        </Link>

        <div className="mt-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <IconBook size={12} />
            {article.category}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {article.title}
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>

        <div className="mt-8 flex items-center gap-4 border-y border-border/40 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
            TWA
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Teacher Writing Academy</p>
            <p className="text-xs text-muted-foreground">
              {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""}
            </p>
          </div>
          {user && (
            <button
              onClick={() => toggleSave.mutate()}
              disabled={toggleSave.isPending}
              className={`ml-auto inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                isSaved
                  ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {isSaved ? <IconBookmarkFilled size={14} /> : <IconBookmark size={14} />}
              {isSaved ? t("articles.saved") : t("articles.save")}
            </button>
          )}
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              toast.success(t("articles.linkCopied"))
            }}
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <IconShare size={14} /> {t("articles.share")}
          </button>
        </div>

        {/* Proper markdown rendering */}
        <article className="prose prose-slate mt-10 max-w-none dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content || ""}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  )
}
