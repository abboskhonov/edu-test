import { createFileRoute, Link } from "@tanstack/react-router"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getArticleBySlugFn } from "@/services/articles"
import { IconArrowLeft, IconBook, IconShare } from "@tabler/icons-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export const Route = createFileRoute("/articles/$slug")({
  component: ArticleDetailPage,
  staleTime: 5 * 60 * 1000,
  loader: async ({ params }) => {
    const article = await getArticleBySlugFn({ data: { slug: params.slug } } as any)
    return { article }
  },
})

function ArticleDetailPage() {
  const { slug } = Route.useParams()
  const { data: article } = useSuspenseQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticleBySlugFn({ data: { slug } } as any),
  })

  if (!article) {
    return (
      <div className="px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Article not found</h1>
        <Link to="/articles" className="mt-4 inline-flex items-center gap-1 text-primary hover:underline">
          <IconArrowLeft size={16} /> Back to articles
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
          <IconArrowLeft size={16} /> All articles
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
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert("Link copied to clipboard")
            }}
            className="ml-auto inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <IconShare size={14} /> Share
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
