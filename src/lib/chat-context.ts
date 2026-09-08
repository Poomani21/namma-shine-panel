import { articles } from "@/data/knowledge";
import { priceList, pricingNotes } from "@/data/pricing";
import { reviewStats } from "@/data/reviews";
import { serviceDefs } from "@/data/services";
import { site } from "@/lib/site";
import { sections as termsSections } from "@/routes/terms-conditions";

/**
 * Builds a plain-text knowledge base for the site assistant, sourced ONLY from
 * the existing website data. Nothing here is invented.
 */
export function buildSiteKnowledge(): string {
  const business = [
    `Business: ${site.name} (${site.domain}) — laundry, dry cleaning and fabric care in ${site.city}.`,
    `Phone: ${site.phoneDisplay} (${site.phone}). WhatsApp: https://wa.me/${site.whatsapp}`,
    `Opening hours: ${site.hours}`,
    `Experience: ${site.yearsExperience}+ years.`,
    `Free pickup and delivery areas: ${site.areas.join(", ")}.`,
    `Customer rating: ${reviewStats.average} from ${reviewStats.count} reviews.`,
  ].join("\n");

  const prices = priceList
    .map((p) => `- ${p.group} | ${p.name}: ₹${p.price} ${p.unit}`)
    .join("\n");

  const notes = pricingNotes.map((n) => `- ${n}`).join("\n");

  const services = serviceDefs
    .map((s) => {
      const price = priceList.find((p) => p.id === s.priceId);
      const faqs = s.faqs.map((f) => `    Q: ${f.q} A: ${f.a}`).join("\n");
      return [
        `- ${s.name} (page: /services/${s.slug})`,
        `    ${s.short}`,
        price ? `    From ₹${price.price} ${price.unit}` : "",
        `    Recommended frequency: ${s.frequency}`,
        `    Includes: ${s.benefits.join("; ")}`,
        faqs,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const terms = termsSections
    .map((s) => {
      const parts: string[] = [s.heading];
      if (s.intro) parts.push(s.intro);
      if (s.bullets) parts.push(...s.bullets.map((b) => `  - ${b}`));
      if (s.ordered) parts.push(...s.ordered.map((b) => `  - ${b}`));
      if (s.table)
        parts.push(...s.table.rows.map(([a, b]) => `  - ${a}: ${b}`));
      if (s.subs)
        for (const sub of s.subs) {
          parts.push(`  ${sub.heading}`);
          if (sub.intro) parts.push(`  ${sub.intro}`);
          if (sub.bullets) parts.push(...sub.bullets.map((b) => `    - ${b}`));
          if (sub.ordered) parts.push(...sub.ordered.map((b) => `    - ${b}`));
        }
      if (s.outro) parts.push(...s.outro);
      return parts.join("\n");
    })
    .join("\n\n");

  const knowledge = articles
    .map((a) => `- ${a.title} (/knowledge/${a.slug}): ${a.summary}`)
    .join("\n");

  return `BUSINESS INFORMATION
${business}

PAGES: / (home), /services, /pricing, /estimate (online estimate tool), /knowledge, /about, /reviews, /contact, /terms-conditions

PRICE LIST (starting prices)
${prices}

PRICING NOTES
${notes}

SERVICES
${services}

TERMS & CONDITIONS / SERVICE POLICY
${terms}

KNOWLEDGE CENTRE ARTICLES
${knowledge}`;
}

export const SYSTEM_PROMPT = `You are the friendly assistant for Namma Laundry's website.

Rules:
- Answer ONLY using the website information given below. Never invent prices, services, offers, timelines or policies.
- If the answer is not in the information, reply exactly: "I don't have that information. Please contact Namma Laundry on WhatsApp."
- Keep answers short (1-3 sentences or a small list), friendly and easy for a customer to understand.
- Prices are starting prices in Indian Rupees (₹) and are confirmed after fabric inspection at pickup.
- For booking, pickup requests or anything needing a person, tell the customer to tap the WhatsApp or Call button in this chat.
- Never mention that you are reading a document or context.

WEBSITE INFORMATION
${"{{KNOWLEDGE}}"}`;
