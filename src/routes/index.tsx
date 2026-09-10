import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BadgeIndianRupee,
  CalendarCheck,
  Check,
  ChevronRight,
  Clock,
  Gift,
  Heart,
  HeartHandshake,
  Leaf,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  Shirt,
  Smartphone,
  Sparkles,
  Star,
  Truck,
  UserCheck,
} from "lucide-react";

import heroFamily from "@/assets/home-family-hero.jpg";
import homeCareImg from "@/assets/home-care.jpg";
import { CtaSection } from "@/components/site/CtaBar";
import { Button } from "@/components/ui/button";
import { articles } from "@/data/knowledge";
import { reviews, reviewStats } from "@/data/reviews";
import { useCatalog } from "@/lib/catalog";
import { site, telLink, waLink } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Dry Cleaning & Laundry in ${site.city} | ${site.name}` },
      {
        name: "description",
        content: `Free pickup and delivery laundry, wash & fold, wash & iron, saree care with roll polish, blanket and curtain cleaning in ${site.city}. ${site.yearsExperience}+ years, ${reviewStats.average}★ from ${reviewStats.count}+ customers.`,
      },
      { property: "og:title", content: `${site.name} — Dry Cleaning & Laundry in ${site.city}` },
      {
        property: "og:description",
        content: "Fabric-first cleaning with free pickup and delivery. Price confirmed before we start.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const trustBadges = [
  { icon: Award, title: `${site.yearsExperience}+ Years`, sub: "In Your Service" },
  { icon: ShieldCheck, title: "Professional", sub: "Care & Expertise" },
  { icon: BadgeIndianRupee, title: "Affordable", sub: "Premium Quality" },
  { icon: Heart, title: "People's Favourite", sub: `${reviewStats.average}★ from ${reviewStats.count}+ customers` },
];

const heroServiceSlugs = ["wash-and-fold", "wash-and-iron", "steam-ironing", "dry-cleaning"];

const processSteps = [
  { step: "1", title: "Pickup Scheduling", icon: Truck, desc: "Schedule convenient pickup times via call or WhatsApp." },
  { step: "2", title: "Cloth Collection", icon: Package, desc: "Our driver collects your clothes right from your doorstep." },
  { step: "3", title: "Sorting & Inspection", icon: Search, desc: "Detailed inspection for fabric type, stains, and repairs." },
  { step: "4", title: "Washing / Dry cleaning", icon: Shirt, desc: "Custom wash or solvent cleaning tailored to fabric requirements." },
  { step: "5", title: "Drying / Ironing", icon: RefreshCw, desc: "Controlled drying and crisp steam ironing finishing." },
  { step: "6", title: "Quality Check", icon: ShieldCheck, desc: "Strict quality check to ensure every stain and crease is addressed." },
  { step: "7", title: "Packaging", icon: Sparkles, desc: "Hygienic eco-packaging on hangers or folded neatly." },
  { step: "8", title: "Delivery", icon: Truck, desc: "Prompt doorstep delivery back to you on schedule." },
  { step: "9", title: "Follow-up & Feedback", icon: UserCheck, desc: "We confirm satisfaction to guarantee hassle-free service." },
];

const whyChooseUsHighlights = [
  { icon: ShieldCheck, title: "Experienced & Reliable", body: "Years of hands-on expertise and fabric knowledge you can trust." },
  { icon: Sparkles, title: "Uncompromising Quality", body: "Every garment gets individual care, inspection, and the treatment it deserves." },
  { icon: Leaf, title: "Eco-Friendly Approach", body: "Gentle cleaning processes engineered for clean clothes and a cleaner planet." },
  { icon: HeartHandshake, title: "Ethical & Transparent", body: "Honest pricing with zero hidden surprises—confirmed before we start." },
];

const directionsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.name} ${site.city}`,
)}`;

function Index() {
  const { services } = useCatalog();
  const bySlug = new Map(services.map((s) => [s.slug, s]));
  const heroServices = heroServiceSlugs
    .map((slug) => bySlug.get(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const featured = heroServices.length === 4 ? heroServices : services.slice(0, 4);
  const highlightServices = services.slice(0, 8);
  const topReviews = reviews.slice(0, 3);
  const guides = articles.slice(0, 3);

  return (
    <>
      {/* ============ REFERENCE HERO BAND (green) ============ */}
      <div className="surface-green overflow-hidden">
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-8 lg:px-6 lg:pt-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr]">
            <div className="min-w-0">
              <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Fresh Clothes
                <span className="block text-gradient-gold">Brighter Days</span>
              </h1>
              <p className="mt-4 max-w-md text-base opacity-90 sm:text-lg">
                Premium Laundry &amp; Dry Cleaning Services for a Cleaner, Happier You.
              </p>
              <p className="mt-4 font-display text-xl italic text-gold lg:hidden">
                More time for what you love ♡
              </p>
            </div>

            <div className="relative min-w-0">
              <img
                src={heroFamily}
                alt="A happy family with freshly cleaned and folded laundry from Namma Laundry"
                width={1280}
                height={960}
                className="aspect-[5/4] w-full rounded-2xl object-cover shadow-2xl"
              />
              <p className="absolute -left-2 top-4 hidden font-display text-2xl italic text-gold drop-shadow lg:block">
                More time for
                <span className="block">what you love ♡</span>
              </p>
            </div>
          </div>

          {/* trust badges */}
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {trustBadges.map((b) => (
              <div
                key={b.title}
                className="flex items-center gap-3 rounded-xl border border-gold/50 bg-white/5 px-3 py-3"
              >
                <b.icon className="size-5 shrink-0 text-gold" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{b.title}</span>
                  <span className="block truncate text-[11px] opacity-80">{b.sub}</span>
                </span>
              </div>
            ))}
          </div>

          {/* four white service cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group flex items-center gap-3 rounded-2xl bg-card p-3 text-foreground shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-lg text-primary">{s.name}</span>
                  <span className="mt-1 block truncate text-xs text-muted-foreground">{s.short}</span>
                  <span className="mt-1 block text-xs font-medium text-primary">
                    From ₹{s.fromPrice} {s.unit}
                  </span>
                </span>
                <img
                  src={s.image}
                  alt={s.imageAlt}
                  loading="lazy"
                  className="size-20 shrink-0 rounded-xl object-cover"
                />
              </Link>
            ))}
          </div>

          {/* popular services strip */}
          <div className="mt-6 rounded-2xl border border-gold/50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <Gift className="size-7 shrink-0 text-gold" />
                <div className="min-w-0">
                  <p className="font-display text-xl leading-tight">Most Booked Services</p>
                  <p className="truncate text-xs opacity-80">Great Care. Greater Savings.</p>
                </div>
              </div>
              <Button asChild size="sm" variant="gold" className="shrink-0">
                <Link to="/services">
                  View All <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="-mx-1 mt-4 flex snap-x gap-3 overflow-x-auto px-1 pb-1">
              {highlightServices.map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="w-40 shrink-0 snap-start overflow-hidden rounded-xl bg-card text-foreground"
                >
                  <img
                    src={s.image}
                    alt={s.imageAlt}
                    loading="lazy"
                    className="h-24 w-full object-cover"
                  />
                  <span className="block p-3">
                    <span className="block truncate text-sm font-semibold">{s.name}</span>
                    <span className="mt-1 block rounded-md bg-gold/20 px-2 py-1 text-center text-xs font-semibold text-primary">
                      From ₹{s.fromPrice}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* contact actions + estimate banner */}
          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="grid gap-3 sm:grid-cols-3">
              <Button asChild variant="gold" size="lg">
                <a href={telLink}>
                  <Phone className="size-4" /> Call Us
                </a>
              </Button>
              <Button asChild variant="gold" size="lg">
                <a href={waLink("Hi Namma Laundry, I would like to book a pickup.")}>
                  <MessageCircle className="size-4" /> WhatsApp Us
                </a>
              </Button>
              <Button asChild variant="gold" size="lg">
                <a href={directionsLink} target="_blank" rel="noreferrer">
                  <MapPin className="size-4" /> Get Directions
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-card p-4 text-foreground">
              <Smartphone className="hidden size-10 shrink-0 text-primary sm:block" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Fast | Easy | Convenient
                </p>
                <p className="font-display text-xl text-primary">Get an Instant Estimate</p>
                <p className="truncate text-xs text-muted-foreground">Know the cost before you book!</p>
              </div>
              <Button asChild className="shrink-0">
                <Link to="/estimate">
                  Get Estimate <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm opacity-85">
            <CalendarCheck className="size-4 text-gold" /> Free pickup &amp; delivery across{" "}
            {site.areas.slice(0, 4).join(", ")} and nearby.
            <span className="inline-flex items-center gap-1">
              <Clock className="size-4 text-gold" /> {site.hours}
            </span>
          </div>
        </section>
      </div>

      {/* ============ REVIEWS ============ */}
      <section className="surface-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl sm:text-4xl">What Our Customers Say</h2>
            <div className="rule-gold mx-auto mt-3" />
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {topReviews.map((r) => (
              <figure key={r.name} className="card-elegant p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-medium">
                  {r.name}
                  <span className="block text-xs font-normal text-muted-foreground">
                    {r.area} · {r.service}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/reviews">Read all reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Care at Every Step</span>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl">Our Process</h2>
            <div className="rule-gold mx-auto mt-3" />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              We treat every garment with personalized attention. From scheduling to doorstep delivery, here is our
              9-step quality assurance workflow.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {processSteps.map((item) => (
              <div key={item.step} className="card-elegant flex flex-col justify-between p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                    {item.step}
                  </div>
                  <item.icon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ MISSION & WHY CHOOSE US ============ */}
      <section className="border-y border-border bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Our Driven Purpose</span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl">Driven by Purpose, Dedicated to Care</h2>
              <div className="rule-gold mt-3" />
              <blockquote className="mt-6 rounded-2xl border border-primary/15 bg-primary/5 p-6 font-serif text-base italic leading-relaxed text-foreground/90">
                "To deliver high-quality, eco-conscious, and ethically driven laundry solutions that uphold community
                welfare—ensuring every service reflects our dedication to both people and the planet."
              </blockquote>
              <div className="mt-6">
                <Button asChild variant="outline" size="sm">
                  <Link to="/about">Learn more about our vision &amp; process</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h3 className="mb-2 font-display text-2xl">Why Choose Us</h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Built on trust, quality, and complete transparency.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {whyChooseUsHighlights.map((item) => (
                  <div key={item.title} className="card-elegant p-5">
                    <item.icon className="size-5 text-primary" />
                    <h4 className="mt-3 font-display text-base font-semibold">{item.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOME FABRICS ============ */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:px-6">
        <img
          src={homeCareImg}
          alt="Blankets, curtains and carpets cleaned by Namma Laundry"
          loading="lazy"
          className="w-full rounded-2xl object-cover shadow-lg"
        />
        <div className="min-w-0">
          <h2 className="font-display text-3xl">Home fabrics your washing machine can't handle</h2>
          <div className="rule-gold mt-3" />
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Blankets, curtains, carpets and sofa covers hold months of dust, pollen and pet dander. We clean them at
            the right temperature and, more importantly, dry them fully — so nothing comes back damp or smelling stale.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Deep dusting before any wash",
              "Fabric-matched process for velvet, linen and blackout curtains",
              "Controlled drying — no monsoon damp smell",
              "Curtains returned ready to re-hang",
            ].map((b) => (
              <li key={b} className="flex gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-8">
            <Link to="/pricing">See full price list</Link>
          </Button>
        </div>
      </section>

      {/* ============ GUIDES ============ */}
      <section className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
        <h2 className="font-display text-3xl">Fabric care guides</h2>
        <div className="rule-gold mt-3" />
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {guides.map((a) => (
            <Link
              key={a.slug}
              to="/knowledge/$slug"
              params={{ slug: a.slug }}
              className="card-elegant p-6 transition-shadow hover:shadow-lg"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{a.topic}</p>
              <h3 className="mt-2 font-display text-lg text-primary">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
