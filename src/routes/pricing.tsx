import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, Info, Search } from "lucide-react";

import { CtaSection } from "@/components/site/CtaBar";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { pricingNotes } from "@/data/pricing";
import { useCatalog } from "@/lib/catalog";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Laundry & Dry Cleaning Price List | Namma Laundry" },
      {
        name: "description",
        content:
          "Transparent starting prices for wash & fold, ironing, dry cleaning, sarees, blankets, curtains, carpets and specialist cleaning in Bengaluru.",
      },
      { property: "og:title", content: "Price List | Namma Laundry" },
      { property: "og:description", content: "Clear, itemised starting prices with no hidden charges." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  const { priceGroups, priceList } = useCatalog();
  const [selectedGroup, setSelectedGroup] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = priceList.filter((item) => {
    const matchesGroup = selectedGroup === "All" || item.group === selectedGroup;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.group.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  return (
    <>
      <PageHeader
        eyebrow="Price list"
        title="Clear prices, confirmed before we start"
        subtitle="Starting prices for every item we handle. Final price is confirmed after fabric inspection at pickup — never after delivery."
      >
        <Button asChild size="lg" variant="gold">
          <Link to="/estimate">
            <Calculator className="size-4 mr-2" /> Get an online estimate
          </Link>
        </Button>
      </PageHeader>

      <div className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
        {/* Search & Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search items (e.g. saree, suit, curtain)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setSelectedGroup("All")}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                selectedGroup === "All"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All Items
            </button>
            {priceGroups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  selectedGroup === group
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Price Item Sections */}
        {priceGroups.map((group) => {
          if (selectedGroup !== "All" && selectedGroup !== group) return null;

          const groupItems = filteredItems.filter((i) => i.group === group);
          if (groupItems.length === 0) return null;

          return (
            <section key={group} className="mb-10 last:mb-0">
              <h2 className="font-display text-xl font-semibold sm:text-2xl">{group}</h2>
              <div className="rule-gold mt-2 mb-4" />
              <ul className="card-elegant divide-y divide-border rounded-lg border bg-card text-card-foreground shadow-sm">
                {groupItems.map((item) => (
                  <li
                    key={item.id}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm sm:text-base font-medium">{item.name}</span>
                      <span className="block text-xs text-muted-foreground">{item.unit}</span>
                    </span>
                    <span className="shrink-0 font-display text-base font-bold text-primary sm:text-lg">
                      ₹{item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No items found matching "{searchQuery}".
          </div>
        )}

        {/* Good to Know Block */}
        <div className="card-elegant mt-12 rounded-lg border bg-muted/40 p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
            <Info className="size-5 text-primary" /> Good to know
          </h2>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {pricingNotes.map((note) => (
              <li key={note} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CtaSection
        title="Not sure what your order will cost?"
        subtitle="Build your basket in the online estimator and get an instant total before you book."
        whatsappMessage="Hi Namma Laundry, I would like a price for my order."
      />
    </>
  );
}