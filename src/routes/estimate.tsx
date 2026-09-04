import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, MessageCircle, Phone, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { pricingNotes } from "@/data/pricing";
import { useCatalog } from "@/lib/catalog";
import { site, telLink, waLink } from "@/lib/site";

export const Route = createFileRoute("/estimate")({
  head: () => ({
    meta: [
      { title: "Online Laundry Estimate | Namma Laundry" },
      {
        name: "description",
        content:
          "Build your laundry or dry cleaning basket and see an instant estimated total. Then book on WhatsApp or call us.",
      },
      { property: "og:title", content: "Get an Online Estimate | Namma Laundry" },
      { property: "og:description", content: "Instant estimated total for your order, before you book." },
      { property: "og:url", content: "/estimate" },
    ],
    links: [{ rel: "canonical", href: "/estimate" }],
  }),
  component: EstimatePage,
});

function EstimatePage() {
  const { priceGroups, priceList } = useCatalog();
  const [group, setGroup] = useState<string>(priceGroups[0]!);
  const [qty, setQty] = useState<Record<string, number>>({});

  const items = useMemo(() => priceList.filter((i) => i.group === group), [group, priceList]);
  const selected = useMemo(
    () =>
      priceList
        .filter((i) => (qty[i.id] ?? 0) > 0)
        .map((i) => ({ item: i, count: qty[i.id]!, line: i.price * qty[i.id]! })),
    [qty, priceList],
  );
  const total = selected.reduce((sum, s) => sum + s.line, 0);

  const change = (id: string, delta: number) =>
    setQty((prev) => {
      const next = Math.max(0, (prev[id] ?? 0) + delta);
      const copy = { ...prev };
      if (next === 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });

  const summaryText =
    selected.length > 0
      ? `Hi Namma Laundry, here is my estimate:\n${selected
          .map((s) => `• ${s.item.name} x${s.count} = ₹${s.line}`)
          .join("\n")}\nEstimated total: ₹${total}`
      : "Hi Namma Laundry, I would like an estimate for my order.";

  return (
    <>
      <PageHeader
        eyebrow="Online estimate"
        title="Estimate your order in under a minute"
        subtitle="Pick a category, add items and quantities, and see your estimated total instantly. No sign-up needed."
      />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:px-6">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            {priceGroups.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGroup(g)}
                className={`rounded-full border px-4 py-2 text-xs sm:text-sm ${
                  g === group
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <ul className="card-elegant mt-6 divide-y divide-border">
            {items.map((item) => {
              const count = qty[item.id] ?? 0;
              return (
                <li
                  key={item.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6"
                >
                  <div className="min-w-0">
                    <p className="text-sm sm:text-base">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ₹{item.price} · {item.unit}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      aria-label={`Remove one ${item.name}`}
                      onClick={() => change(item.id, -1)}
                      disabled={count === 0}
                    >
                      <Minus className="size-4" />
                    </Button>
                    <span className="w-6 text-center text-sm tabular-nums">{count}</span>
                    <Button
                      type="button"
                      size="icon"
                      aria-label={`Add one ${item.name}`}
                      onClick={() => change(item.id, 1)}
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <aside className="min-w-0">
          <div className="card-elegant p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-xl">Your estimate</h2>
            <div className="rule-gold mt-3" />

            {selected.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Add items on the left to build your estimate.
              </p>
            ) : (
              <ul className="mt-4 space-y-2 text-sm">
                {selected.map((s) => (
                  <li key={s.item.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                    <span className="min-w-0 truncate">
                      {s.item.name} <span className="text-muted-foreground">×{s.count}</span>
                    </span>
                    <span className="shrink-0 tabular-nums">₹{s.line}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Estimated total</span>
              <span className="font-display text-3xl text-primary tabular-nums">₹{total}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Excluding GST. Final price confirmed after fabric inspection.
            </p>

            <div className="mt-5 grid gap-2">
              <Button asChild>
                <a href={waLink(summaryText)}>
                  <MessageCircle className="size-4" /> Book on WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={telLink}>
                  <Phone className="size-4" /> Call {site.phoneDisplay}
                </a>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/contact">Book a pickup</Link>
              </Button>
              {selected.length > 0 && (
                <Button type="button" variant="ghost" onClick={() => setQty({})}>
                  <Trash2 className="size-4" /> Clear estimate
                </Button>
              )}
            </div>

            <ul className="mt-5 space-y-1 text-xs text-muted-foreground">
              {pricingNotes.slice(0, 3).map((n) => (
                <li key={n}>• {n}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}