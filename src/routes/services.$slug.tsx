import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, MessageCircle, Phone } from "lucide-react";

import { CtaSection } from "@/components/site/CtaBar";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { getService } from "@/data/services";
import { useCatalog } from "@/lib/catalog";
import { site, telLink, waLink } from "@/lib/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found | Namma Laundry" }, { name: "robots", content: "noindex" }] };
    }
    const s = loaderData.service;
    return {
      meta: [
        { title: `${s.name} in ${site.city} | Namma Laundry` },
        { name: "description", content: s.short },
        { property: "og:title", content: s.headline },
        { property: "og:description", content: s.short },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/services/${s.slug}` },
      ],
      links: [{ rel: "canonical", href: `/services/${s.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.name,
            description: s.short,
            areaServed: site.areas,
            provider: { "@type": "LocalBusiness", name: "Namma Laundry", telephone: site.phone },
          }),
        },
      ],
    };
  },
  component: ServiceDetail,
  notFoundComponent: ServiceNotFound,
  errorComponent: ServiceNotFound,
});

function ServiceNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl">Service not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        That service page doesn't exist. Browse everything we clean instead.
      </p>
      <Button asChild className="mt-6">
        <Link to="/services">All services</Link>
      </Button>
    </div>
  );
}

function ServiceDetail() {
  const { service: fallback } = Route.useLoaderData();
  const { services } = useCatalog();
  const s = services.find((x) => x.slug === fallback.slug) ?? fallback;
  const related = services.filter((x) => x.category === s.category && x.slug !== s.slug).slice(0, 3);
  const message = `Hi Namma Laundry, I would like a quote for ${s.name}.`;

  return (
    <>
      <PageHeader eyebrow={s.name} title={s.headline} subtitle={s.intro}>
        <Button asChild size="lg" variant="gold">
          <a href={waLink(message)}>
            <MessageCircle className="size-4" /> WhatsApp us
          </a>
        </Button>
        <Button asChild size="lg" variant="outlineLight">
          <a href={telLink}>
            <Phone className="size-4" /> {site.phoneDisplay}
          </a>
        </Button>
        <Button asChild size="lg" variant="ghostLight">
          <Link to="/estimate">Get an estimate</Link>
        </Button>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4 pt-10 lg:px-6">
        <div className="media-frame">
          <img
            src={s.image}
            alt={s.imageAlt}
            width={1024}
            height={768}
            className="aspect-[16/7] w-full object-cover"
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:px-6">
        <div className="min-w-0">
          <section>
            <h2 className="font-display text-2xl">What you get</h2>
            <div className="rule-gold mt-3" />
            <ul className="mt-5 space-y-3">
              {s.benefits.map((b) => (
                <li key={b} className="flex gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl">How we do it</h2>
            <div className="rule-gold mt-3" />
            <ol className="mt-5 space-y-4">
              {s.process.map((p, i) => (
                <li key={p} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-sm font-medium text-primary">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-sm">{p}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl">Common questions</h2>
            <div className="rule-gold mt-3" />
            <div className="mt-5 space-y-4">
              {s.faqs.map((f) => (
                <div key={f.q} className="card-elegant p-5">
                  <h3 className="text-base font-medium text-primary">{f.q}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="min-w-0 space-y-6">
          <div className="card-elegant p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Starting at</p>
            <p className="mt-2 font-display text-4xl text-primary">₹{s.fromPrice}</p>
            <p className="text-sm text-muted-foreground">{s.unit} · exclusive of GST</p>
            <div className="mt-5 grid gap-2">
              <Button asChild>
                <Link to="/estimate">Get an online estimate</Link>
              </Button>
              <Button asChild variant="outline">
                <a href={waLink(message)}>Book on WhatsApp</a>
              </Button>
            </div>
          </div>

          <div className="card-elegant p-6">
            <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Recommended frequency
            </h3>
            <p className="mt-2 text-sm">{s.frequency}</p>
          </div>

          {related.length > 0 && (
            <div className="card-elegant p-6">
              <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Related services
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: r.slug }}
                      className="text-primary hover:underline"
                    >
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <CtaSection
        title={`Need ${s.name.toLowerCase()}?`}
        whatsappMessage={message}
      />
    </>
  );
}