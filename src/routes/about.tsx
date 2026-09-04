import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, HeartHandshake, Leaf } from "lucide-react";

import { CtaSection } from "@/components/site/CtaBar";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import processImg from "@/assets/process.jpg";
import { reviewStats } from "@/data/reviews";
import { site } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About Namma Laundry — ${site.yearsExperience}+ Years in ${site.city}` },
      {
        name: "description",
        content: `Namma Laundry has cared for clothes, sarees and home fabrics across ${site.city} for over ${site.yearsExperience} years. Honest pricing, careful handling, on-time delivery.`,
      },
      { property: "og:title", content: "About Namma Laundry" },
      {
        property: "og:description",
        content: `A local, experienced laundry and dry cleaning team serving ${site.city}.`,
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const whyChooseUs = [
  "Experienced & Reliable – Years of hands-on expertise you can trust.",
  "Uncompromising Quality – Every garment gets the care it deserves.",
  "Ethical & Transparent – Honest service, no hidden surprises.",
  "Eco-Friendly Approach – Clean clothes, cleaner planet.",
  "On-Time, Every Time – Pickups and prompt deliveries.",
  "Personalized Attention – Tailored care for every fabric and need.",
  "Affordable Excellence – Premium service at fair prices.",
  "Community-Driven – Supporting people, not just profits.",
  "Hygiene Assured – Safe, sanitized handling at every step.",
  "Convenient & Friendly – Hassle-free service with a smile.",
];

const processSteps = [
  { num: "1", title: "Pickup Scheduling" },
  { num: "2", title: "Cloth Collection" },
  { num: "3", title: "Sorting & Inspection" },
  { num: "4", title: "Washing / Dry Cleaning" },
  { num: "5", title: "Drying / Ironing" },
  { num: "6", title: "Quality Check" },
  { num: "7", title: "Packaging" },
  { num: "8", title: "Delivery" },
  { num: "9", title: "Follow-up & Feedback" },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={`${site.yearsExperience}+ years of fabric care, right here in ${site.city}`}
        subtitle="Namma Laundry started as a small neighbourhood laundry and grew through word of mouth. The same people still inspect every order that leaves the shop."
      />

      {/* ==========================================
          VISION & MISSION SECTION
         ========================================== */}
      <section className="bg-muted/40 border-b border-border py-12">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card-elegant p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-primary mb-3">
                  <HeartHandshake className="size-6 shrink-0" />
                  <h3 className="font-display text-xl uppercase tracking-wider">Our Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed italic">
                  "To become the most preferred laundry service provider, recognized for our reliability, integrity, and commitment to excellence—earning the lasting trust of our customers through ethical practices and genuine care."
                </p>
              </div>
            </div>

            <div className="card-elegant p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-primary mb-3">
                  <Leaf className="size-6 shrink-0" />
                  <h3 className="font-display text-xl uppercase tracking-wider">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed italic">
                  "To deliver high-quality, eco-conscious, and ethically driven laundry solutions that uphold community welfare—ensuring every service reflects our dedication to both people and the planet."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          MAIN CONTENT & WHY CHOOSE US
         ========================================== */}
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:px-6">
        <div className="min-w-0">
          <h2 className="font-display text-2xl sm:text-3xl">Local, experienced, accountable</h2>
          <div className="rule-gold mt-3" />
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Over the last decade we have handled everything from daily office shirts to
            forty-year-old Kanjivaram sarees, winter blankets, blackout curtains and living-room
            carpets. That experience is the reason we can tell, on inspection, which process a
            fabric needs — and which one would damage it.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            We are not a franchise call centre. When you call {site.phoneDisplay}, you reach the
            people who will actually clean your clothes.
          </p>

          <h3 className="font-display text-xl mt-8 mb-4">Why Choose Us</h3>
          <ul className="space-y-3">
            {whyChooseUs.map((v) => (
              <li key={v} className="flex gap-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{v}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/services">Explore our services</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/reviews">Read customer reviews</Link>
            </Button>
          </div>
        </div>

        <div className="min-w-0">
          <img
            src={processImg}
            alt="Namma Laundry team pressing and finishing garments"
            loading="lazy"
            className="w-full rounded-2xl object-cover shadow-lg"
          />
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="card-elegant p-4">
              <p className="font-display text-2xl text-primary">{site.yearsExperience}+</p>
              <p className="text-xs text-muted-foreground">Years serving {site.city}</p>
            </div>
            <div className="card-elegant p-4">
              <p className="font-display text-2xl text-primary">{reviewStats.count}+</p>
              <p className="text-xs text-muted-foreground">Happy customers</p>
            </div>
            <div className="card-elegant p-4">
              <p className="font-display text-2xl text-primary">{reviewStats.average}★</p>
              <p className="text-xs text-muted-foreground">Average rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          OUR PROCESS SECTION
         ========================================== */}
      <section className="border-t border-border bg-muted/20 py-14">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-display text-2xl sm:text-3xl">Why Choose Us: Our Process</h2>
            <div className="rule-gold mx-auto mt-3" />
            <p className="mt-3 text-sm text-muted-foreground">
              A transparent 9-step workflow designed to protect your garments at every stage.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {processSteps.map((step) => (
              <div
                key={step.num}
                className="card-elegant p-4 flex items-center gap-4 hover:border-primary/50 transition-colors"
              >
                <div className="size-10 rounded-full bg-primary/10 text-primary font-display font-bold flex items-center justify-center text-lg shrink-0">
                  {step.num}
                </div>
                <p className="font-semibold text-sm text-foreground">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}