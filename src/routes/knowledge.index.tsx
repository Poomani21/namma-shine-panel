import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";

import { CtaSection } from "@/components/site/CtaBar";
import { PageHeader } from "@/components/site/PageHeader";
import { articles } from "@/data/knowledge";

export const Route = createFileRoute("/knowledge/")({
  head: () => ({
    meta: [
      { title: "Fabric Care Knowledge Centre | Namma Laundry" },
      {
        name: "description",
        content:
          "Practical guides on blanket, curtain, carpet and upholstery care, monsoon fabric care, allergen control and when to dry clean.",
      },
      { property: "og:title", content: "Knowledge Centre | Namma Laundry" },
      { property: "og:description", content: "Fabric care advice from ten years of hands-on cleaning." },
      { property: "og:url", content: "/knowledge" },
    ],
    links: [{ rel: "canonical", href: "/knowledge" }],
  }),
  component: KnowledgePage,
});

function KnowledgePage() {
  const topics = [...new Set(articles.map((a) => a.topic))];

  return (
    <>
      <PageHeader
        eyebrow="Knowledge centre"
        title="Fabric care advice you can actually use"
        subtitle="How often to clean what, what home washing can and cannot do, and how to keep fabrics healthy in Bengaluru's dust and monsoon."
      />

      <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
        {topics.map((topic) => (
          <section key={topic} className="mb-14 last:mb-0">
            <h2 className="font-display text-2xl">{topic}</h2>
            <div className="rule-gold mt-3" />
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles
                .filter((a) => a.topic === topic)
                .map((a) => (
                  <Link
                    key={a.slug}
                    to="/knowledge/$slug"
                    params={{ slug: a.slug }}
                    className="card-elegant flex flex-col p-6 transition-shadow hover:shadow-lg"
                  >
                    <h3 className="font-display text-lg text-primary">{a.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{a.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3.5" /> {a.readMinutes} min read
                    </span>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>

      <CtaSection
        title="Still not sure how to care for something?"
        subtitle="Send us a photo on WhatsApp and we will tell you honestly whether it needs professional cleaning."
        whatsappMessage="Hi Namma Laundry, I have a fabric care question."
      />
    </>
  );
}