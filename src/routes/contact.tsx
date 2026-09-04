import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { useCatalog } from "@/lib/catalog";
import { site, telLink, waLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Book a Free Pickup | ${site.name} ${site.city}` },
      {
        name: "description",
        content: `Book a free laundry pickup in ${site.city}. Call ${site.phoneDisplay} or send your details on WhatsApp — ${site.hours}.`,
      },
      { property: "og:title", content: "Book a Free Pickup | Namma Laundry" },
      { property: "og:description", content: "Free pickup and delivery across our service areas." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [area, setArea] = useState(site.areas[0] as string);
  const { services } = useCatalog();
  const [service, setService] = useState(services[0]!.name);
  const [details, setDetails] = useState("");

  const message = `Hi Namma Laundry, I'd like to book a pickup.\nName: ${name || "—"}\nArea: ${area}\nService: ${service}${details ? `\nDetails: ${details}` : ""}`;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Book a free pickup"
        subtitle={`Fill in a few details and send them straight to our WhatsApp, or simply call ${site.phoneDisplay}.`}
      />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:px-6">
        <form
          className="card-elegant p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            window.open(waLink(message), "_blank", "noopener");
          }}
        >
          <h2 className="font-display text-2xl">Pickup request</h2>
          <div className="rule-gold mt-3" />

          <div className="mt-6 grid gap-5">
            <label className="grid gap-2 text-sm">
              <span>Your name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Anitha R"
                className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span>Area</span>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              >
                {site.areas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
                <option value="Other">Other / nearby</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm">
              <span>Service needed</span>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              >
                {services.map((s) => (
                  <option key={s.slug} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm">
              <span>Details (optional)</span>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={4}
                placeholder="e.g. 2 blankets and 3 curtains, pickup tomorrow evening"
                className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>

            <Button type="submit" size="lg">
              <MessageCircle className="size-4" /> Send on WhatsApp
            </Button>
            <p className="text-xs text-muted-foreground">
              This opens WhatsApp with your details pre-filled. Nothing is stored on this site.
            </p>
          </div>
        </form>

        <aside className="grid content-start gap-5">
          <div className="card-elegant p-6">
            <h2 className="font-display text-xl">Reach us directly</h2>
            <div className="rule-gold mt-3" />
            <div className="mt-5 grid gap-4 text-sm">
              <p className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={telLink} className="hover:underline">
                  {site.phoneDisplay}
                </a>
              </p>
              <p className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                {site.hours}
              </p>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                Serving {site.city} — {site.areas.join(", ")} and nearby.
              </p>
            </div>
          </div>

          <div className="card-elegant p-6">
            <h2 className="font-display text-xl">How pickup works</h2>
            <div className="rule-gold mt-3" />
            <ol className="mt-5 grid gap-3 text-sm text-muted-foreground">
              <li>1. You send your details or call us.</li>
              <li>2. We confirm a pickup slot the same day where possible.</li>
              <li>3. Items are inspected and the price is confirmed before cleaning.</li>
              <li>4. Cleaned, finished items are delivered back to your door.</li>
            </ol>
          </div>
        </aside>
      </div>
    </>
  );
}