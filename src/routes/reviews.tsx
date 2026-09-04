import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";

import { CtaSection } from "@/components/site/CtaBar";
import { PageHeader } from "@/components/site/PageHeader";
import { reviews, reviewStats } from "@/data/reviews";
import { site } from "@/lib/site";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: `Customer Reviews — ${reviewStats.average}★ | Namma Laundry` },
      {
        name: "description",
        content: `Read what ${reviewStats.count}+ customers across ${site.city} say about Namma Laundry's dry cleaning, saree care, blanket and curtain cleaning.`,
      },
      { property: "og:title", content: "Customer Reviews | Namma Laundry" },
      {
        property: "og:description",
        content: `${reviewStats.average}★ average from ${reviewStats.count}+ customers.`,
      },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: site.name,
          telephone: site.phone,
          areaServed: site.city,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: reviewStats.average,
            reviewCount: reviewStats.count,
          },
        }),
      },
    ],
  }),
  component: ReviewsPage,
});

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < rating ? "fill-gold text-gold" : "text-muted-foreground/40"}`}
        />
      ))}
    </div>
  );
}

function ReviewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reviews"
        title={`${reviewStats.average}★ from ${reviewStats.count}+ customers`}
        subtitle={`Most of our work comes from neighbours recommending us. Here is a sample of what people across ${site.city} have said.`}
      />

      <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {reviews.map((r) => (
            <figure key={r.name + r.text.slice(0, 12)} className="card-elegant mb-5 break-inside-avoid p-6">
              <Stars rating={r.rating} />
              <blockquote className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-4 border-t border-border pt-3">
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-xs text-muted-foreground">
                  {r.area} · {r.service}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <CtaSection
        title="Try us with one order"
        subtitle="No contracts, no minimums. Send one item and judge the result yourself."
      />
    </>
  );
}