import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock } from "lucide-react";

import { CtaSection } from "@/components/site/CtaBar";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { articles, getArticle } from "@/data/knowledge";
import { getService } from "@/data/services";

export const Route = createFileRoute("/knowledge/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found | Namma Laundry" }, { name: "robots", content: "noindex" }],
      };
    }
    const a = loaderData.article;
    return {
      meta: [
        { title: `${a.title} | Namma Laundry` },
        { name: "description", content: a.summary },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/knowledge/${a.slug}` },
      ],
      links: [{ rel: "canonical", href: `/knowledge/${a.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.summary,
            author: { "@type": "Organization", name: "Namma Laundry" },
          }),
        },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: ArticleNotFound,
  errorComponent: ArticleNotFound,
});

function ArticleNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl">Article not found</h1>
      <Button asChild className="mt-6">
        <Link to="/knowledge">Back to Knowledge Centre</Link>
      </Button>
    </div>
  );
}

function ArticlePage() {
  const { article: a } = Route.useLoaderData();
  const related = a.relatedService ? getService(a.relatedService) : undefined;
  const more = articles.filter((x) => x.slug !== a.slug && x.topic === a.topic).slice(0, 3);

  return (
    <>
      <PageHeader eyebrow={a.topic} title={a.title} subtitle={a.summary} />

      <article className="mx-auto max-w-3xl px-4 py-12 lg:px-6">
        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" /> {a.readMinutes} min read
        </p>

        {a.sections.map((section) => (
          <section key={section.heading} className="mt-10 first:mt-8">
            <h2 className="font-display text-2xl">{section.heading}</h2>
            <div className="rule-gold mt-3" />
            {section.body.map((p) => (
              <p key={p} className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
            {section.list && (
              <ul className="mt-4 space-y-2 text-[15px]">
                {section.list.map((li) => (
                  <li key={li} className="flex gap-2">
                    <span className="text-gold">•</span>
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {related && (
          <div className="card-elegant mt-12 p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Related service
            </p>
            <h2 className="mt-2 font-display text-xl text-primary">{related.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{related.short}</p>
            <Button asChild className="mt-4">
              <Link to="/services/$slug" params={{ slug: related.slug }}>
                View {related.name}
              </Link>
            </Button>
          </div>
        )}

        {more.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-xl">More on {a.topic.toLowerCase()}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {more.map((m) => (
                <li key={m.slug}>
                  <Link
                    to="/knowledge/$slug"
                    params={{ slug: m.slug }}
                    className="text-primary hover:underline"
                  >
                    {m.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>

      <CtaSection whatsappMessage={`Hi Namma Laundry, I read your guide on ${a.title} and need help.`} />
    </>
  );
}