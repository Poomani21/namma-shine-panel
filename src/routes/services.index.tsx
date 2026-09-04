import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Package,
  RefreshCw,
  Search,
  ShieldCheck,
  Shirt,
  Sparkles,
  Truck,
  UserCheck,
  Zap,
} from "lucide-react";

import { CtaSection } from "@/components/site/CtaBar";
import { PageHeader } from "@/components/site/PageHeader";
import { ServiceCard } from "@/components/site/ServiceCard";
import { Button } from "@/components/ui/button";
import { serviceGroups } from "@/data/services";
import { useCatalog } from "@/lib/catalog";
import { site, waLink } from "@/lib/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Laundry & Dry Cleaning Services | Namma Laundry" },
      {
        name: "description",
        content:
          "Wash & Fold, Wash & Iron, Dry Cleaning, Saree Care, Curtains, and Blankets cleaning in Bengaluru with free pickup and delivery.",
      },
      { property: "og:title", content: "Our Services | Namma Laundry" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const processSteps = [
  { step: "1", title: "Pickup Scheduling", icon: Truck },
  { step: "2", title: "Cloth Collection", icon: Package },
  { step: "3", title: "Sorting & Inspection", icon: Search },
  { step: "4", title: "Washing / Dry Cleaning", icon: Shirt },
  { step: "5", title: "Drying / Ironing", icon: RefreshCw },
  { step: "6", title: "Quality Check", icon: ShieldCheck },
  { step: "7", title: "Packaging", icon: Sparkles },
  { step: "8", title: "Delivery", icon: Truck },
  { step: "9", title: "Follow-up & Feedback", icon: UserCheck },
];

const mainOfferings = [
  {
    title: "Wash & Fold",
    desc: "Everyday wear washed with eco-friendly detergents, tumble-dried, and neatly folded.",
    badge: "Core Service",
  },
  {
    title: "Wash & Iron",
    desc: "Washed, dried, steam-pressed, and neatly packaged on hangers or folded.",
    badge: "Most Popular",
  },
  {
    title: "Steam Ironing",
    desc: "Crisp, wrinkle-free finishing using commercial-grade steam presses.",
    badge: "Quick Care",
  },
  {
    title: "Premium Dry Cleaning",
    desc: "Gentle solvent care for silk sarees, suits, lehengas, and delicate fabrics.",
    badge: "Specialist",
  },
];

const expressOfferings = [
  { title: "Steam Iron", time: "Immediate" },
  { title: "Wash & Fold", time: "4 Hours" },
  { title: "Wash & Iron", time: "6 Hours" },
];

function ServicesPage() {
  const { services } = useCatalog();
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Complete Fabric Care, Under One Roof"
        subtitle={`From daily Wash & Fold to Kanjivaram silk sarees and living-room curtains — handled by our experienced team in ${site.city}.`}
      >
        <Button asChild size="lg" variant="gold">
          <Link to="/estimate">Get an Online Estimate</Link>
        </Button>
        <Button asChild size="lg" variant="outlineLight">
          <Link to="/pricing">View Price List</Link>
        </Button>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
        {/* Core Services Section */}
        <section className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Our Primary Offerings
            </span>
            <h2 className="font-display text-3xl font-bold mt-1">Everyday Laundry Solutions</h2>
            <div className="rule-gold mx-auto mt-2" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mainOfferings.map((item) => (
              <div key={item.title} className="card-elegant p-6 flex flex-col justify-between border-primary/20">
                <div>
                  <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full mb-3">
                    {item.badge}
                  </span>
                  <h3 className="font-display text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
                <Button asChild variant="outline" size="sm" className="mt-6 w-full">
                  <a href={waLink(`Hi Namma Laundry, I want to book ${item.title}.`)}>
                    Book {item.title}
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Express Service Banner */}
        <section className="card-elegant relative overflow-hidden border-primary/30 bg-gradient-to-r from-primary/10 via-background to-amber-500/10 p-6 lg:p-8 mb-14 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3.5 py-1 text-sm font-semibold text-primary mb-3">
                <Zap className="size-4 fill-primary" />
                <span>NEED IT FAST? CHOOSE EXPRESS</span>
              </div>
              <h2 className="font-display text-3xl font-bold">Priority Care On Demand</h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                When time is short, our Express Service prioritizes your garments for quick turnaround.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground bg-primary/10 px-3 py-1 rounded-md text-sm">
                  Pricing: Billed at 2X regular rate (e.g., ₹14 ironing → ₹28)
                </span>
              </div>

              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary shrink-0" /> Priority processing
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="size-4 text-amber-600 shrink-0" /> Limited daily capacity
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="size-4 text-amber-600 shrink-0" /> Not applicable for bulk orders
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="size-4 text-amber-600 shrink-0" /> Subject to power availability
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
              <div className="grid grid-cols-3 gap-3 bg-background/80 backdrop-blur border border-border p-4 rounded-xl">
                {expressOfferings.map((item) => (
                  <div key={item.title} className="text-center p-2.5 rounded-lg bg-muted/40">
                    <p className="text-sm font-semibold text-muted-foreground">{item.title}</p>
                    <p className="font-display text-base font-bold text-primary mt-1 flex items-center justify-center gap-1">
                      <Clock className="size-4" />
                      {item.time}
                    </p>
                  </div>
                ))}
              </div>

              <Button asChild variant="gold" size="lg" className="w-full text-base">
                <a href={waLink("Hi Namma Laundry, I need Express Service for my garments.")}>
                  <Zap className="size-4 mr-1.5" /> Book Express Pickup
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Detailed Service Category Groups */}
        {serviceGroups.map((group) => (
          <section key={group.category} className="mb-14 last:mb-0">
            <h2 className="font-display text-2xl sm:text-3xl">{group.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{group.note}</p>
            <div className="rule-gold mt-4" />
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services
                .filter((s) => s.category === group.category)
                .map((s) => (
                  <ServiceCard key={s.slug} service={s} />
                ))}
            </div>
          </section>
        ))}
      </div>

      {/* 9-Step Process Flow Section */}
      <section className="border-t border-border bg-secondary/30 py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Care at Every Step
            </span>
            <h2 className="font-display text-3xl sm:text-4xl mt-1">Our 9-Step Cleaning Process</h2>
            <div className="rule-gold mx-auto mt-3" />
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              We treat every garment with personalized care. Here is how we ensure consistent quality from pickup to final delivery.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {processSteps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="card-elegant p-5 flex items-center gap-4 hover:border-primary/50 transition-colors"
                >
                  <div className="size-10 rounded-full bg-primary/10 text-primary font-display font-bold flex items-center justify-center text-base shrink-0">
                    {item.step}
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <Icon className="size-4 text-primary" />
                    <p className="font-semibold text-sm text-foreground truncate">{item.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}