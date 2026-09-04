import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Archive,
  BadgeCheck,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  Gem,
  HandCoins,
  MapPin,
  Palette,
  Phone,
  Ruler,
  ShieldAlert,
  Shirt,
  ShoppingBag,
  Sparkles,
  ThumbsUp,
  Timer,
  Truck,
  WashingMachine,
  type LucideIcon,
} from "lucide-react";

import { CtaSection } from "@/components/site/CtaBar";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { site, telLink } from "@/lib/site";

const title = "Terms & Conditions — Namma Laundry Service Policy";
const description =
  "Complete service policy and terms & conditions for Namma Laundry: order acceptance, timelines, claims, liability limits, pickup & delivery charges and garment care disclaimers.";

export const Route = createFileRoute("/terms-conditions")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://namma-laundry.lovable.app/terms-conditions" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://namma-laundry.lovable.app/terms-conditions" }],
  }),
  component: TermsPage,
});

type Section = {
  id: string;
  heading: string;
  icon: LucideIcon;
  intro?: string;
  bullets?: string[];
  ordered?: string[];
  subs?: { heading: string; intro?: string; bullets?: string[]; ordered?: string[] }[];
  table?: { head: [string, string]; rows: [string, string][] };
  outro?: string[];
};

// Exact original content order preserved
const sections: Section[] = [
  {
    id: "order-acceptance",
    heading: "ORDER ACCEPTANCE",
    icon: ClipboardList,
    bullets: [
      "Garments are accepted after visual inspection at the counter.",
      "Customers must verify and confirm: garment count, service requested, special instructions (if any).",
      "Any delicate fabrics, colour-sensitive garments, fragile embellishments, or high-value items must be declared at the time of submission.",
      "Failure to declare delicate conditions may limit the laundry's liability.",
    ],
  },
  {
    id: "processing-methods",
    heading: "PROCESSING METHODS",
    icon: WashingMachine,
    bullets: [
      "Garments are accepted after visual inspection at the counter.",
      "Customers must verify and confirm: garment count, service requested, special instructions (if any).",
      "Any delicate fabrics, colour-sensitive garments, fragile embellishments, or high-value items must be declared at the time of submission.",
      "Failure to declare delicate conditions may limit the laundry's liability.",
    ],
  },
  {
    id: "service-timelines",
    heading: "SERVICE TIMELINES",
    icon: Clock,
    table: {
      head: ["Service", "Estimated Timeline"],
      rows: [
        ["Wash & Fold", "24 hours"],
        ["Wash & Iron", "48 hours"],
        ["Ironing Only", "24–48 hours"],
        ["Dry Cleaning", "3–5 working days"],
        ["Saree Dry Cleaning + Roll Polish", "7–9 working days"],
      ],
    },
    outro: [
      "During festive seasons, peak periods, or when order volumes are unusually high, service timelines may extend beyond the standard time mentioned above.",
      "Garments requiring additional stain treatment, special handling, or vendor processing may also require extra time.",
    ],
  },
  {
    id: "claim-reporting",
    heading: "CLAIM REPORTING TIMELINE",
    icon: Timer,
    intro:
      "All complaints or claims must be reported within 48 hours of garment collection. Conditions for claim acceptance:",
    bullets: [
      "The garment must remain unused after pickup.",
      "The original invoice must be presented.",
    ],
    outro: ["Claims reported after the specified time may not be accepted."],
  },
  {
    id: "limitation-of-liability",
    heading: "LIMITATION OF LIABILITY",
    icon: HandCoins,
    intro:
      "In the unlikely event of loss, damage, discoloration, shrinkage, or other garment-related issues, the maximum liability of the laundry shall be limited to:",
    bullets: [
      "10 times the service charge collected for that garment, OR",
      "₹5,000, OR",
      "Depreciated value of the garment, whichever is lower.",
    ],
    outro: [
      "The laundry does not provide replacement based on market value, emotional value, or original purchase price.",
    ],
  },
  {
    id: "garment-loss",
    heading: "GARMENT LOSS POLICY",
    icon: ShoppingBag,
    subs: [
      {
        heading: "Complete Garment Loss",
        intro: "If a garment is reported missing:",
        ordered: [
          "An internal search will be conducted for up to 48 hours.",
          "If the garment cannot be located, compensation will be calculated according to the liability limits stated above.",
        ],
      },
      {
        heading: "Partial Garment Loss",
        intro:
          "If part of a garment set is missing (example: dupatta, blouse piece): Compensation will be calculated based on reasonable estimated value of the missing component, subject to the liability cap.",
      },
    ],
  },
  {
    id: "damage-discoloration",
    heading: "DAMAGE OR DISCOLORATION POLICY",
    icon: Shirt,
    intro: "If discoloration, shrinkage, or fabric damage occurs during processing:",
    ordered: [
      "One attempt will be made to restore or reprocess the garment.",
      "If the damage is irreversible, compensation will be calculated based on: service charge, garment depreciation, liability limits.",
    ],
  },
  {
    id: "colour-bleeding",
    heading: "COLOUR BLEEDING DISCLAIMER",
    icon: Palette,
    outro: [
      "Certain fabrics may release dye during cleaning due to unstable dyes, fabric composition, or manufacturing processes.",
      "Colour bleeding may occur even when garments are processed according to recommended methods, including dry cleaning solvents or water-based cleaning systems.",
      "The laundry shall not be responsible for colour bleeding caused by inherent fabric characteristics or manufacturing defects.",
    ],
  },
  {
    id: "shrinkage",
    heading: "SHRINKAGE DISCLAIMER",
    icon: Ruler,
    intro:
      "Natural fibers such as cotton, linen, silk, and wool may shrink during cleaning despite careful handling. The laundry shall not be liable for shrinkage resulting from:",
    bullets: ["fabric composition", "manufacturer treatment", "prior usage or ageing of the garment."],
  },
  {
    id: "unsatisfactory-service",
    heading: "UNSATISFACTORY SERVICE",
    icon: ThumbsUp,
    intro: "If a customer is not satisfied with the finishing quality of the service:",
    ordered: [
      "The laundry will provide one complimentary reprocessing (re-wash, re-iron, or finishing correction).",
      "Reprocessing will be provided only for reasonable service defects.",
      "Service charges remain applicable, as labour, equipment, and processing costs are already incurred.",
      "After the complimentary reprocessing has been completed, the order will be considered fully serviced and closed.",
    ],
    outro: [
      "Minor finishing variations, light creases due to fabric type, or differences in personal preference shall not be considered service defects.",
    ],
  },
  {
    id: "stain-removal",
    heading: "STAIN REMOVAL POLICY",
    icon: Sparkles,
    bullets: [
      "Stain removal is undertaken on a best-effort basis and is not guaranteed 100%, as results depend on factors such as fabric type, stain type, and stain age.",
      "Our team uses industry-appropriate methods to treat stains while ensuring no damage to the fabric due to over-processing.",
      "Stain treatment charges apply for the effort and processes involved, irrespective of the final outcome.",
      "In cases where stains are not fully removed, the applicable charges will still be levied.",
    ],
    outro: [
      "We appreciate your understanding that stain removal is a specialized process with variable outcomes.",
    ],
  },
  {
    id: "high-value-garments",
    heading: "HIGH VALUE GARMENT POLICY",
    icon: Gem,
    intro:
      "For garments valued above ₹10,000, customers must declare the value at the time of submission. A handling charge of 2% of declared value may be applied for special care and inspection. Maximum compensation for high-value garments shall be limited to:",
    bullets: ["20% of declared value, OR", "₹5,000, whichever is lower."],
    outro: [
      "If the value is not declared at the time of submission, the garment will be treated as a normal item and general liability rules will apply.",
    ],
  },
  {
    id: "depreciation",
    heading: "DEPRECIATION POLICY",
    icon: HandCoins,
    intro:
      "Garment value decreases with usage and age. For compensation calculation, the following depreciation guidelines may be considered:",
    table: {
      head: ["Garment Age", "Compensation Eligibility"],
      rows: [
        ["Up to 6 months", "Up to 70%"],
        ["6 months – 1 year", "Up to 50%"],
        ["1 – 2 years", "Up to 30%"],
        ["Above 2 years", "Goodwill only"],
      ],
    },
    outro: ["All compensation remains subject to the maximum liability limits."],
  },
  {
    id: "claim-documentation",
    heading: "DOCUMENTATION FOR CLAIMS",
    icon: FileText,
    intro: "For any compensation claim, customers may be required to provide:",
    bullets: [
      "approximate purchase value",
      "approximate purchase date",
      "proof of purchase (bill, invoice, or online purchase record)",
    ],
    outro: [
      "If proof is not available, compensation will be determined based on reasonable market estimation by management.",
    ],
  },
  {
    id: "pre-existing-conditions",
    heading: "PRE-EXISTING CONDITIONS",
    icon: ShieldAlert,
    intro: "The laundry is not responsible for issues arising from:",
    bullets: [
      "weak fabric",
      "prior damage",
      "fabric ageing",
      "colour instability",
      "manufacturer defects",
      "fragile accessories or embellishments.",
    ],
  },
  {
    id: "accessories",
    heading: "ACCESSORIES AND EMBELLISHMENTS",
    icon: Gem,
    intro: "The laundry is not responsible for damage to:",
    bullets: [
      "beads",
      "sequins",
      "buttons",
      "decorative prints",
      "glued decorations",
      "embroidery threads",
      "elastics or trims.",
    ],
    outro: [
      "These elements may weaken during cleaning due to fabric condition or manufacturer processes.",
    ],
  },
  {
    id: "uncollected-garments",
    heading: "UNCOLLECTED GARMENTS",
    icon: Archive,
    outro: [
      "Garments not collected within 30 days may be moved to storage.",
      "Garments unclaimed for 90 days may be disposed of or donated at the discretion of management.",
    ],
  },
  {
    id: "pickup-delivery",
    heading: "PICKUP & DELIVERY POLICY",
    icon: Truck,
    bullets: [
      "Minimum order for pickup & delivery: ₹300",
      "Free pickup & delivery above ₹500",
      "₹50 charge for orders below ₹500",
      "Ironing-only orders: Minimum 20 garments for pickup",
      "Less than 20 garments: Store drop-off required",
    ],
  },
  {
    id: "home-delivery",
    heading: "HOME PICKUP & DELIVERY POLICY",
    icon: Truck,
    intro:
      "To serve you better and manage routes efficiently, we follow the below delivery policy:",
    bullets: [
      "Order Value ₹500 & Above — FREE Home Delivery (if selected at the time of billing)",
      "Order Value Below ₹500 — ₹50 Delivery Charge (if selected at the time of billing)",
    ],
    outro: [
      "We request customers to kindly confirm delivery requirements at the time of billing to avoid additional charges. Thank you for your understanding and support.",
    ],
  },
  {
    id: "extended-service-area",
    heading: "EXTENDED SERVICE AREA PICKUP & DELIVERY REQUESTS",
    icon: MapPin,
    intro:
      "For customers located beyond 5 km and up to 10 km from our store, the following conditions apply:",
    subs: [
      {
        heading: "Extended Service Area (5–10 km)",
        bullets: [
          "Minimum Order Value: ₹1000",
          "Pickup Charge: ₹100",
          "Delivery Charge: ₹100",
          "Service Window: 12 PM – 4 PM (off-peak hours)",
        ],
      },
      {
        heading: "Please Note",
        bullets: [
          "Service is offered on a case-to-case basis, subject to route availability.",
          "This service may not be available during weekends, peak operational days, and festive seasons when order load is high.",
        ],
      },
    ],
    outro: ["Thank you for your understanding."],
  },
  {
    id: "acceptance-of-terms",
    heading: "ACCEPTANCE OF TERMS",
    icon: BadgeCheck,
    intro: "Submitting garments for service implies that the customer:",
    bullets: [
      "has read and understood the terms",
      "accepts the liability limits",
      "agrees to the service conditions stated above.",
    ],
  },
];

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((b) => (
        <li key={b} className="flex items-start gap-3 text-slate-800">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-800" />
          <span className="text-[15px] font-medium leading-relaxed">{b}</span>
        </li>
      ))}
    </ul>
  );
}

function Ordered({ items }: { items: string[] }) {
  return (
    <ol className="mt-4 space-y-3">
      {items.map((b, i) => (
        <li key={b} className="flex items-start gap-3.5 text-slate-800">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-white">
            {i + 1}
          </span>
          <span className="pt-0.5 text-[15px] font-medium leading-relaxed">{b}</span>
        </li>
      ))}
    </ol>
  );
}

function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="NAMMA LAUNDRY"
        title="Terms & Conditions"
        subtitle="Namma Laundry processes thousands of garments every year using professional garment care methods and quality control procedures. While every garment is handled with utmost care, certain risks may arise due to fabric sensitivity, dye instability, manufacturing defects, or operational factors. By submitting garments for service, customers acknowledge and agree to the following terms."
      >
        <Button asChild variant="secondary" className="shadow-sm">
          <a href={telLink}>
            <Phone className="size-4" /> {site.phoneDisplay}
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-amber-400/80 bg-transparent text-amber-500 hover:bg-amber-400/10"
        >
          <Link to="/contact">Contact & booking</Link>
        </Button>
      </PageHeader>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        {/* Sticky Table of Contents Navigation */}
        <nav aria-label="Terms sections" className="hidden lg:block">
          <div className="sticky top-28 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            {/* Logo Added Above Navigation */}
            <div className="mb-4 flex justify-center border-b border-slate-100 pb-3">
              <img
                src="/favicon.png"
                alt="Namma Laundry Logo"
                className="size-12 rounded-full object-cover shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <FileText className="size-4" /> On this page
            </div>
            <div className="my-3 h-[2px] bg-amber-400" />
            
            {/* Scroll removed by using full length (h-auto) */}
            <ul className="h-auto space-y-1.5 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block rounded-lg px-2.5 py-1.5 text-slate-600 transition-all hover:bg-emerald-50 hover:text-emerald-900 font-medium"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="min-w-0 space-y-10">
          {sections.map((s) => {
            const Icon = s.icon;

           {/* SPECIAL CUSTOM IMAGE REPLICA LAYOUT FOR SECTION 19: HOME DELIVERY */}
            if (s.id === "home-delivery") {
              return (
                <section
                  key={s.id}
                  id={s.id}
                  className="mt-10 rounded-xl border border-emerald-900/20 bg-[#fdfbf7] shadow-md"
                >
                  {/* Header Banner with Centered Full Logo */}
                  <div className="relative rounded-t-xl border-b-2 border-amber-400 bg-[#0c402b] px-6 pb-6 pt-14 text-center text-white">
                    {/* Centered Logo Displayed Fully */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                      <div className="flex size-20 items-center justify-center rounded-full border-2 border-amber-400 bg-[#0c402b] p-1 shadow-md">
                        <img
                          src="/favicon.png"
                          alt="Namma Laundry Logo"
                          className="size-full rounded-full object-contain"
                        />
                      </div>
                    </div>

                    <h2 className="font-display text-2xl font-black uppercase tracking-wide text-white sm:text-3xl">
                      HOME PICKUP & DELIVERY POLICY
                    </h2>
                  </div>

                  <div className="p-6 sm:p-8">
                    <p className="text-center font-serif text-base italic text-slate-700">
                      {s.intro}
                    </p>

                    <div className="my-6 space-y-6">
                      <div className="border-b border-slate-300 pb-5">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="size-6 shrink-0 text-emerald-800" />
                          <h3 className="text-xl font-bold text-slate-900">
                            Order Value <span className="underline decoration-slate-900 underline-offset-4">₹500 & Above</span>
                          </h3>
                        </div>
                        <ul className="mt-2.5 pl-8">
                          <li className="text-base text-slate-800">
                            • <strong className="font-extrabold text-slate-900">FREE Home Delivery</strong>{" "}
                            <span className="italic text-slate-600">(if selected at the time of billing)</span>
                          </li>
                        </ul>
                      </div>

                      <div className="border-b border-slate-300 pb-5">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="size-6 shrink-0 text-emerald-800" />
                          <h3 className="text-xl font-bold text-slate-900">
                            Order Value Below <span className="underline decoration-slate-900 underline-offset-4">₹500</span>
                          </h3>
                        </div>
                        <ul className="mt-2.5 pl-8">
                          <li className="text-base text-slate-800">
                            • <strong className="font-extrabold text-slate-900">₹50 Delivery Charge</strong>{" "}
                            <span className="italic text-slate-600">(if selected at the time of billing)</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Notice Box Replica */}
                    <div className="mt-8 overflow-hidden rounded-md border border-amber-400/60 bg-[#fdfbf7]">
                      <div className="relative bg-[#0c402b] px-4 py-3 text-center">
                        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 border-t border-amber-400/80" />
                        <div className="relative inline-flex items-center gap-2 bg-[#0c402b] px-4">
                          <AlertTriangle className="size-5 text-amber-400" />
                          <span className="font-serif text-lg font-bold uppercase tracking-wider text-amber-300">
                            IMPORTANT NOTICE
                          </span>
                        </div>
                      </div>

                      <div className="p-6 text-center">
                        <p className="font-serif text-lg font-medium text-slate-900 sm:text-xl">
                          If Home Delivery is requested later <span className="italic">(after billing)</span>,
                        </p>
                        <p className="mt-2 text-xl font-medium text-slate-900 sm:text-2xl">
                          a <span className="font-bold text-red-700 underline decoration-red-700 decoration-2 underline-offset-4">₹100 Convenience Charge</span> will be applicable.
                        </p>
                        <div className="mx-auto my-5 h-[1px] w-4/5 bg-slate-300" />
                        <p className="font-serif text-base italic text-slate-800 sm:text-lg">
                          This helps us manage last-minute route adjustments and delivery scheduling.
                        </p>
                      </div>

                      <div className="border-t-2 border-amber-400 bg-[#0c402b] px-4 py-5 text-center text-white">
                        <p className="font-serif text-base italic leading-relaxed sm:text-lg">
                          <span className="mr-1 inline-block">🙏</span> We request customers to kindly confirm delivery requirements
                          <br className="hidden sm:inline" /> at the time of billing to avoid additional charges.
                        </p>
                        <div className="mx-auto my-3 h-[1px] w-3/4 bg-amber-400/60" />
                        <p className="font-serif text-base italic text-amber-300 sm:text-lg">
                          Thank you for your understanding and support.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              );
            }

            {/* SPECIAL CUSTOM IMAGE REPLICA LAYOUT FOR SECTION 20: EXTENDED SERVICE AREA */}
            if (s.id === "extended-service-area") {
              return (
                <section
                  key={s.id}
                  id={s.id}
                  className="mt-10 rounded-xl border border-emerald-900/20 bg-[#fdfbf7] shadow-md"
                >
                  {/* Header Banner with Centered Full Logo */}
                  <div className="relative rounded-t-xl border-b-2 border-amber-400 bg-[#0c402b] px-6 pb-6 pt-14 text-center text-white">
                    {/* Centered Logo Displayed Fully */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                      <div className="flex size-20 items-center justify-center rounded-full border-2 border-amber-400 bg-[#0c402b] p-1 shadow-md">
                        <img
                          src="/favicon.png"
                          alt="Namma Laundry Logo"
                          className="size-full rounded-full object-contain"
                        />
                      </div>
                    </div>

                    <h2 className="font-display text-2xl font-black uppercase tracking-wide text-white sm:text-3xl">
                      EXTENDED SERVICE AREA
                    </h2>
                    <p className="font-display text-xl font-extrabold uppercase tracking-wide text-amber-300 sm:text-2xl">
                      PICKUP & DELIVERY REQUESTS
                    </p>
                  </div>

                  <div className="p-6 sm:p-8">
                    <p className="text-center font-serif text-base text-slate-700">
                      {s.intro}
                    </p>

                    {/* Main Subcard Frame */}
                    {s.subs?.[0] && (
                      <div className="mt-6 overflow-hidden rounded-lg border-2 border-emerald-900 bg-white">
                        <div className="bg-[#0c402b] py-3 text-center text-lg font-bold text-amber-300">
                          {s.subs[0].heading}
                        </div>

                        <div className="divide-y divide-slate-300 p-4 sm:p-6">
                          <div className="flex items-center gap-3 py-3">
                            <CheckCircle2 className="size-6 shrink-0 text-emerald-800" />
                            <p className="text-lg font-bold text-slate-900">
                              Minimum Order Value: <span className="font-extrabold text-emerald-950">₹1000</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-3 py-3">
                            <CheckCircle2 className="size-6 shrink-0 text-emerald-800" />
                            <p className="text-lg font-bold text-slate-900">
                              Pickup Charge: <span className="font-extrabold text-emerald-950">₹100</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-3 py-3">
                            <CheckCircle2 className="size-6 shrink-0 text-emerald-800" />
                            <p className="text-lg font-bold text-slate-900">
                              Delivery Charge: <span className="font-extrabold text-emerald-950">₹100</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-3 py-3">
                            <Clock className="size-6 shrink-0 text-slate-800" />
                            <p className="text-lg font-bold text-slate-900">
                              Service Window: <span className="font-extrabold text-emerald-950">12 PM – 4 PM</span>{" "}
                              <span className="font-serif text-sm font-normal italic text-slate-600">(off-peak hours)</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Please Note & Thank You Block */}
                    {s.subs?.[1] && (
                      <div className="mt-8 overflow-hidden rounded-md border border-amber-400/60 bg-[#fdfbf7]">
                        <div className="relative bg-[#0c402b] px-4 py-2.5 text-center">
                          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 border-t border-amber-400/80" />
                          <span className="relative inline-block bg-[#0c402b] px-4 font-serif text-lg font-bold text-amber-300">
                            {s.subs[1].heading}:
                          </span>
                        </div>

                        <div className="p-6">
                          <ul className="space-y-4">
                            {s.subs[1].bullets?.map((b) => (
                              <li key={b} className="flex items-start gap-3 text-slate-900">
                                <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-[#0c402b]" />
                                <span className="font-serif text-base font-medium leading-relaxed italic sm:text-lg">
                                  {b}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {s.outro?.[0] && (
                          <div className="border-t-2 border-amber-400 bg-[#0c402b] py-3 text-center">
                            <p className="font-serif text-base italic text-white sm:text-lg">
                              {s.outro[0]}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </section>
              );
            }

            // DEFAULT DESIGN FOR ALL OTHER SECTIONS IN ORIGINAL ORDER
            return (
              <section
                key={s.id}
                id={s.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-[#fdfbf7] shadow-sm transition-all hover:border-emerald-800/40"
              >
                {/* Header Banner */}
                <div className="flex items-center gap-3 border-b-2 border-amber-400 bg-[#0c402b] px-6 py-4 text-white">
                  <Icon className="size-6 text-amber-300" />
                  <h2 className="font-display text-xl font-bold tracking-wide text-white uppercase sm:text-2xl">
                    {s.heading}
                  </h2>
                </div>

                <div className="p-6 sm:p-8">
                  {s.intro ? (
                    <p className="text-[15px] font-medium leading-relaxed text-slate-800">{s.intro}</p>
                  ) : null}

                  {s.bullets ? <Bullets items={s.bullets} /> : null}
                  {s.ordered ? <Ordered items={s.ordered} /> : null}

                  {/* Table Block */}
                  {s.table ? (
                    <div className="mt-5 overflow-hidden rounded-lg border border-slate-300 bg-white">
                      <table className="w-full min-w-[380px] border-collapse text-left text-sm">
                        <thead>
                          <tr className="border-b border-slate-300 bg-[#0c402b] text-amber-300">
                            <th className="px-5 py-3 font-bold">{s.table.head[0]}</th>
                            <th className="px-5 py-3 font-bold">{s.table.head[1]}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {s.table.rows.map(([a, b]) => (
                            <tr key={a} className="hover:bg-emerald-50/50">
                              <td className="px-5 py-3 font-bold text-slate-900">{a}</td>
                              <td className="px-5 py-3 text-slate-700">{b}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}

                  {/* Subsections Block */}
                  {s.subs?.map((sub) => (
                    <div
                      key={sub.heading}
                      className="mt-6 rounded-lg border border-slate-300 bg-white p-5"
                    >
                      <h3 className="font-display text-lg font-bold text-emerald-950">{sub.heading}</h3>
                      {sub.intro ? (
                        <p className="mt-2 text-[15px] text-slate-700">{sub.intro}</p>
                      ) : null}
                      {sub.bullets ? <Bullets items={sub.bullets} /> : null}
                      {sub.ordered ? <Ordered items={sub.ordered} /> : null}
                    </div>
                  ))}

                  {/* Outro paragraphs */}
                  {s.outro?.map((p) => (
                    <p key={p} className="mt-4 font-serif text-[15px] italic text-slate-700">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Location Details Section */}
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-[#fdfbf7] p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3 text-emerald-950">
              <MapPin className="size-6 text-emerald-800" />
              <h2 className="font-display text-xl font-bold sm:text-2xl">Namma Laundry Location</h2>
            </div>
            <div className="my-3 h-[2px] bg-amber-400" />
            <address className="text-[15px] not-italic leading-relaxed text-slate-800">
              B-2, PNR Complex, 1415,
              <br />
              Shree Ananth Nagar Layout, Phase II,
              <br />
              Electronic City, Phase-2,
              <br />
              Bengaluru, Karnataka 560100
              <br />
              <span className="mt-4 block font-semibold text-slate-900">
                Contact No:{" "}
                <a href={telLink} className="text-emerald-800 hover:underline">
                  9148390404
                </a>
              </span>
            </address>
          </section>
        </div>
      </div>

      <CtaSection />
    </>
  );
}