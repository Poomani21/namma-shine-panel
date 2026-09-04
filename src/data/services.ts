import { getPrice } from "./pricing";

import bagImg from "@/assets/services/bag-cleaning.jpg";
import blanketImg from "@/assets/services/blankets.jpg";
import carpetImg from "@/assets/services/carpets.jpg";
import curtainImg from "@/assets/services/curtains.jpg";
import dryCleaningImg from "@/assets/services/dry-cleaning.jpg";
import linenImg from "@/assets/services/home-linen.jpg";
import sareeImg from "@/assets/services/sarees.jpg";
import shoeImg from "@/assets/services/shoe-cleaning.jpg";
import ironImg from "@/assets/services/steam-ironing.jpg";
import stainImg from "@/assets/services/stain-removal.jpg";
import washFoldImg from "@/assets/services/wash-and-fold.jpg";
import washIronImg from "@/assets/services/wash-and-iron.jpg";

/**
 * Service catalogue.
 * Prices are NOT stored here — each service points at an id in
 * src/data/pricing.ts, so a price is edited in exactly one place and stays
 * identical on the home page, services pages, price list and estimator.
 */
export type Service = ServiceDef & {
  fromPrice: number;
  unit: string;
  image: string;
  imageAlt: string;
};

export type ServiceDef = {
  slug: string;
  name: string;
  short: string;
  headline: string;
  intro: string;
  priceId: string;
  frequency: string;
  benefits: string[];
  process: string[];
  faqs: { q: string; a: string }[];
  category: "garment" | "home" | "everyday" | "specialist";
};

export const serviceDefs: ServiceDef[] = [
  {
    slug: "dry-cleaning",
    name: "Dry Cleaning",
    short: "Solvent cleaning for suits, silks, woollens and party wear.",
    headline: "Professional Dry Cleaning That Protects Fabric and Colour",
    intro:
      "Delicate and structured garments lose shape in water. We dry clean with fresh, filtered solvent, spot-treat by hand and finish on a steam press so your clothes come back sharp, not shiny.",
    priceId: "m-shirt",
    frequency: "After 2–3 wears, or immediately after a stain or heavy sweat",
    benefits: [
      "Fresh solvent for every batch — no recycled dirty solvent",
      "Hand spot-treatment before the machine cycle",
      "Steam-press finishing, no scorch marks",
      "Colour and embroidery stay intact",
    ],
    process: [
      "Inspection and stain tagging",
      "Hand pre-treatment of collars, cuffs and marks",
      "Solvent cleaning matched to the fabric",
      "Steam press, quality check and packing",
    ],
    faqs: [
      {
        q: "How long does dry cleaning take?",
        a: "Standard delivery is 48–72 hours. Express same-day service is available for most garments if given before 10 AM.",
      },
      {
        q: "Will dry cleaning shrink my clothes?",
        a: "No. Dry cleaning uses solvent instead of water, so natural fibres such as wool and silk keep their size and drape.",
      },
    ],
    category: "garment",
  },
  {
    slug: "sarees",
    name: "Saree Care",
    short: "Silk, Kanjivaram and designer saree cleaning with roll polish.",
    headline: "Saree Cleaning With Complimentary Roll Polish",
    intro:
      "A saree is an investment. We clean silk, Kanjivaram, Banarasi, georgette and designer sarees by hand-checked process, then finish with roll polish so the fall and shine return — included, not charged extra.",
    priceId: "w-saree-cotton",
    frequency: "After every 1–2 wears; before storing for the season",
    benefits: [
      "Dry cleaning + roll polish at one price",
      "Zari and embroidery protected with covered pressing",
      "No harsh chemicals on silk",
      "Folded and packed ready for storage",
    ],
    process: [
      "Fabric and zari inspection",
      "Gentle solvent or specialised silk cleaning",
      "Roll polish for finish and fall",
      "Neat fold, cover and delivery",
    ],
    faqs: [
      {
        q: "Is roll polish really free?",
        a: "Yes. Every saree given for dry cleaning gets roll polish included. Elsewhere the two together usually cost ₹450–₹500.",
      },
      {
        q: "Can you clean a saree with heavy zari work?",
        a: "Yes. Heavy work sarees are handled separately with covered pressing so the zari is never flattened or burnt.",
      },
    ],
    category: "garment",
  },
  {
    slug: "blankets",
    name: "Blanket Cleaning",
    short: "Deep cleaning for blankets, quilts, duvets and comforters.",
    headline: "Blanket and Quilt Cleaning, Fully Dried and Dust-Free",
    intro:
      "Home washing rarely dries a blanket fully, and damp filling smells within days. We use large-drum machines and controlled drying so blankets come back light, fluffy and completely dry.",
    priceId: "h-blanket-single",
    frequency: "Every 3–4 months, and before and after winter storage",
    benefits: [
      "Large-drum wash — filling is not compressed",
      "Complete controlled drying, no damp smell",
      "Dust mite and allergen reduction",
      "Packed in a cover for storage",
    ],
    process: [
      "Weigh, inspect and tag",
      "Pre-treat marks and stains",
      "Large-drum wash with fabric-safe detergent",
      "Full drying, fluffing and packing",
    ],
    faqs: [
      {
        q: "How often should blankets be cleaned?",
        a: "Every 3–4 months in regular use. Clean once before you store them for summer and once again before winter use.",
      },
      {
        q: "Do you clean woollen and mink blankets?",
        a: "Yes. Woollen, mink, dohar and quilted comforters are each handled with a different cycle and drying temperature.",
      },
    ],
    category: "home",
  },
  {
    slug: "curtains",
    name: "Curtain Cleaning",
    short: "Curtain and drape cleaning with shape and length retained.",
    headline: "Curtain Cleaning Without Shrinkage or Colour Loss",
    intro:
      "Curtains hold more dust than any other item at home. We clean by fabric type — cotton, linen, blackout, sheer or velvet — and press so pleats fall correctly when rehung.",
    priceId: "h-curtain-light",
    frequency: "Every 6 months; every 3–4 months on main roads or with pets",
    benefits: [
      "Length and pleats preserved",
      "Blackout and lined curtains handled separately",
      "Dust and allergen removal",
      "Hooks and rings removed and returned",
    ],
    process: [
      "Dust extraction before cleaning",
      "Fabric-specific wash or dry clean",
      "Controlled drying to avoid shrinkage",
      "Steam press and folded delivery",
    ],
    faqs: [
      {
        q: "Will my curtains shrink?",
        a: "No. We test the fabric and use controlled drying temperatures. Cotton and linen curtains are dried flat to hold length.",
      },
      {
        q: "Do you take down and rehang curtains?",
        a: "Pickup and delivery are free. Take-down and rehanging can be arranged on request for a small charge.",
      },
    ],
    category: "home",
  },
  {
    slug: "carpets",
    name: "Carpet & Rug Cleaning",
    short: "Deep shampoo and extraction for carpets, rugs and doormats.",
    headline: "Carpet and Rug Deep Cleaning",
    intro:
      "Carpets trap dust, hair and moisture. We vacuum, shampoo and extract, then dry fully so there is no residue and no smell left behind.",
    priceId: "h-carpet",
    frequency: "Every 6–12 months; every 4–6 months with pets or children",
    benefits: [
      "Deep extraction, not surface cleaning",
      "Pet odour and stain treatment",
      "Handmade and woollen rugs handled by hand",
      "Full drying before delivery",
    ],
    process: [
      "Dry vacuum and dust beating",
      "Stain and odour spot treatment",
      "Shampoo and hot water extraction",
      "Controlled drying and grooming",
    ],
    faqs: [
      {
        q: "How long does carpet cleaning take?",
        a: "Usually 3–4 days, because drying is done fully before delivery. Larger carpets may take a day longer.",
      },
      {
        q: "Can old stains be removed?",
        a: "Most can be lifted considerably. Very old dye or ink marks may lighten rather than disappear — we tell you honestly before starting.",
      },
    ],
    category: "home",
  },
  {
    slug: "home-linen",
    name: "Home Linen",
    short: "Bedsheets, pillow covers, towels, table linen and sofa covers.",
    headline: "Home Linen Cleaning, Crisply Pressed",
    intro:
      "Bedsheets, towels and sofa covers used daily need proper hot-wash hygiene. We wash by household, never mixed with other homes, and return everything pressed and folded.",
    priceId: "h-bedsheet-single",
    frequency: "Bedsheets weekly, towels twice a week, sofa covers monthly",
    benefits: [
      "Separate wash per household",
      "Hygienic hot wash where fabric allows",
      "Crisp press and neat folding",
      "Bulk-friendly pricing",
    ],
    process: [
      "Sorting by colour and fabric",
      "Stain treatment",
      "Hygienic wash and dry",
      "Press, fold and pack",
    ],
    faqs: [
      {
        q: "Is my linen washed with other customers' clothes?",
        a: "No. Every household's load is tagged and washed separately.",
      },
      {
        q: "Do you offer a monthly linen plan?",
        a: "Yes. Weekly pickup plans for bedsheets and towels are available — call or WhatsApp for a household quote.",
      },
    ],
    category: "home",
  },
  {
    slug: "wash-and-fold",
    name: "Wash & Fold",
    short: "Everyday clothes washed, dried and neatly folded, priced per kg.",
    headline: "Wash & Fold — Everyday Laundry, Done Properly",
    intro:
      "Your daily clothes washed with quality detergent, dried and folded. Priced per kilogram, picked up and delivered free.",
    priceId: "wash-fold",
    frequency: "Weekly or twice a week for most families",
    benefits: [
      "Free pickup and delivery",
      "Separate machine per household",
      "48-hour standard turnaround",
      "Colour-safe detergents",
    ],
    process: ["Pickup and weighing", "Sorting and stain check", "Wash and dry", "Fold, pack, deliver"],
    faqs: [
      {
        q: "What is the minimum order?",
        a: "3 kg for wash & fold. Below that we bill per piece.",
      },
      {
        q: "Are clothes ironed in this service?",
        a: "No, this service is fold-only. Choose Wash & Iron if you want them pressed.",
      },
    ],
    category: "everyday",
  },
  {
    slug: "wash-and-iron",
    name: "Wash & Iron",
    short: "Washed, dried and pressed clothes ready to wear or hang.",
    headline: "Wash & Iron — Ready-to-Wear Every Week",
    intro:
      "Everything in wash & fold, plus a proper press. Shirts and trousers come back on hangers, ready for the week.",
    priceId: "wash-iron",
    frequency: "Weekly for working households",
    benefits: [
      "Shirts pressed and hung",
      "Free pickup and delivery",
      "Crease-free collars and cuffs",
      "48–72 hour turnaround",
    ],
    process: ["Pickup and sorting", "Wash and dry", "Steam iron finishing", "Hang, pack, deliver"],
    faqs: [
      {
        q: "Can I mix wash & fold and wash & iron?",
        a: "Yes. Tell us which items need pressing at pickup and we bill each part separately.",
      },
      {
        q: "Do you starch shirts?",
        a: "Light, medium or no starch — your choice, mentioned once and saved on your account.",
      },
    ],
    category: "everyday",
  },
  {
    slug: "steam-ironing",
    name: "Steam Ironing",
    short: "Crisp steam pressing for already-washed clothes.",
    headline: "Steam Ironing, Priced Per Piece",
    intro:
      "Already washed at home? Send them for steam pressing. Professional steam irons give a flat, crisp finish that a home iron cannot match.",
    priceId: "iron-shirt",
    frequency: "As needed — most customers send weekly",
    benefits: [
      "Professional steam press",
      "No scorch or shine marks",
      "Same-day service available",
      "Delivered on hangers",
    ],
    process: ["Pickup and count", "Steam press by garment type", "Quality check", "Hang and deliver"],
    faqs: [
      {
        q: "Is same-day ironing available?",
        a: "Yes, for orders picked up before 11 AM in our regular service areas.",
      },
      {
        q: "Do you iron sarees and dupattas?",
        a: "Yes, with covered pressing for zari and embroidered borders.",
      },
    ],
    category: "everyday",
  },
  {
    slug: "shoe-cleaning",
    name: "Shoe Cleaning",
    short: "Sneaker, leather and formal shoe cleaning and conditioning.",
    headline: "Shoe Cleaning and Restoration",
    intro:
      "Sneakers, leather formals, suede and heels — cleaned by hand, deodorised, conditioned and finished. No machine tumbling.",
    priceId: "s-sneaker",
    frequency: "Every 2–3 months for regularly worn pairs",
    benefits: [
      "Hand cleaning, sole to laces",
      "Leather conditioning and polish",
      "Deodorising treatment",
      "Suede and nubuck handled dry",
    ],
    process: ["Inspection and material check", "Hand cleaning and stain lifting", "Deodorise and condition", "Finish and pack"],
    faqs: [
      { q: "Can yellowed sneaker soles be whitened?", a: "In most cases yes, with sole-whitening treatment. Deep oxidation may only lighten." },
      { q: "Do you clean suede?", a: "Yes, using dry suede methods and brushes — never water." },
    ],
    category: "specialist",
  },
  {
    slug: "bag-cleaning",
    name: "Bag Cleaning",
    short: "Handbags, backpacks and leather bags cleaned and conditioned.",
    headline: "Bag and Handbag Cleaning",
    intro:
      "Leather, fabric and designer bags cleaned by hand, with hardware protected and leather conditioned to prevent cracking.",
    priceId: "s-bag",
    frequency: "Every 4–6 months for daily-use bags",
    benefits: [
      "Interior and exterior cleaning",
      "Leather conditioning",
      "Hardware masked and protected",
      "Shape retained with stuffing",
    ],
    process: ["Material and hardware check", "Interior vacuum and clean", "Hand surface cleaning", "Condition, shape and pack"],
    faqs: [
      { q: "Do you clean designer bags?", a: "Yes. Premium bags are handled by hand only, with written condition notes before we start." },
      { q: "Can colour transfer marks be removed?", a: "Light dye transfer usually lifts; deep transfer on light leather may only reduce." },
    ],
    category: "specialist",
  },
  {
    slug: "stain-removal",
    name: "Stain Removal",
    short: "Targeted treatment for oil, turmeric, ink, wine and old marks.",
    headline: "Specialised Stain Removal",
    intro:
      "Oil, turmeric, ink, wine, blood, sweat marks and old yellowing — treated by stain type and fabric, by hand, before any wash cycle.",
    priceId: "s-stain",
    frequency: "As soon as possible — fresh stains lift far better",
    benefits: [
      "Treatment chosen by stain type",
      "Fabric-safe reagents only",
      "Honest assessment before we start",
      "No charge if the stain does not improve",
    ],
    process: ["Stain identification", "Fabric colour-fastness test", "Targeted treatment", "Wash, check and repeat if needed"],
    faqs: [
      { q: "Can old stains be removed?", a: "Often reduced substantially. Set stains older than a few months may lighten rather than vanish." },
      { q: "What should I do before bringing a stained garment?", a: "Do not rub or apply hot water. Blot only, and tell us what caused the stain." },
    ],
    category: "specialist",
  },
];

export const serviceMedia: Record<string, { image: string; alt: string }> = {
  "dry-cleaning": { image: dryCleaningImg, alt: "Crisp dry-cleaned white shirt on a hanger" },
  sarees: { image: sareeImg, alt: "Silk saree with a gold zari border after cleaning and roll polish" },
  blankets: { image: blanketImg, alt: "Freshly washed blankets folded in a neat stack" },
  curtains: { image: curtainImg, alt: "Cleaned pleated curtains hanging at a bright window" },
  carpets: { image: carpetImg, alt: "Patterned rug being deep cleaned" },
  "home-linen": { image: linenImg, alt: "Folded white bedsheets, pillow covers and towels" },
  "wash-and-fold": { image: washFoldImg, alt: "Everyday clothes washed and neatly folded in a basket" },
  "wash-and-iron": { image: washIronImg, alt: "Pressed shirts and trousers hanging on a rail" },
  "steam-ironing": { image: ironImg, alt: "Cotton shirt being finished on a professional steam press" },
  "shoe-cleaning": { image: shoeImg, alt: "Cleaned white sneakers beside a polished leather shoe" },
  "bag-cleaning": { image: bagImg, alt: "Cleaned leather handbag and canvas backpack" },
  "stain-removal": { image: stainImg, alt: "Stain being treated by hand on white fabric" },
};

export function getServiceMedia(slug: string, name: string) {
  return serviceMedia[slug] ?? { image: dryCleaningImg, alt: `${name} service at Namma Laundry` };
}

export const services: Service[] = serviceDefs.map((def) => {
  const price = getPrice(def.priceId);
  const media = getServiceMedia(def.slug, def.name);
  return {
    ...def,
    fromPrice: price.price,
    unit: price.unit,
    image: media.image,
    imageAlt: media.alt,
  };
});

export const serviceGroups: { title: string; category: Service["category"]; note: string }[] = [
  { title: "Everyday Laundry", category: "everyday", note: "Weekly clothes, priced per kg or per piece" },
  { title: "Garment Care", category: "garment", note: "Dry cleaning and traditional wear" },
  { title: "Home Care", category: "home", note: "Blankets, curtains, carpets and linen" },
  { title: "Specialist Care", category: "specialist", note: "Shoes, bags and difficult stains" },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
