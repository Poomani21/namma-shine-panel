export type Article = {
  slug: string;
  title: string;
  summary: string;
  topic: "Frequency" | "Home Care" | "Fabric Care" | "Health & Hygiene" | "Seasonal";
  readMinutes: number;
  sections: { heading: string; body: string[]; list?: string[] }[];
  relatedService?: string;
};

export const articles: Article[] = [
  {
    slug: "how-often-should-blankets-be-cleaned",
    title: "How Often Should You Clean Your Blanket?",
    summary:
      "A simple frequency guide for blankets, quilts and comforters — and why home washing usually leaves them damp.",
    topic: "Frequency",
    readMinutes: 3,
    relatedService: "blankets",
    sections: [
      {
        heading: "The short answer",
        body: ["Clean a blanket in regular use every 3–4 months, plus once before storage and once before the season starts."],
        list: [
          "Daily-use blanket: every 3 months",
          "Guest / occasional blanket: before and after use",
          "Baby blanket: every 2–4 weeks",
          "Seasonal storage: always clean before packing away",
        ],
      },
      {
        heading: "Why home washing usually fails",
        body: [
          "A blanket absorbs several litres of water. Home machines can spin it, but drying it fully on a balcony in Bengaluru's humidity takes days.",
          "Filling that stays damp for even 24 hours starts to smell and can grow mildew inside, where you cannot see it.",
        ],
      },
      {
        heading: "Signs it needs cleaning now",
        body: [],
        list: [
          "A musty smell when you unfold it",
          "Sneezing or a blocked nose at night",
          "Visible flattening or matting of the filling",
          "Any spill, sweat mark or pet accident",
        ],
      },
    ],
  },
  {
    slug: "how-often-should-curtains-be-cleaned",
    title: "Curtain Cleaning Frequency: A Practical Guide",
    summary: "Curtains hold more dust than any other item in the house. Here is a realistic schedule by home type.",
    topic: "Frequency",
    readMinutes: 3,
    relatedService: "curtains",
    sections: [
      {
        heading: "Recommended schedule",
        body: [],
        list: [
          "Standard apartment: every 6 months",
          "Main-road or ground-floor home: every 3–4 months",
          "Home with pets: every 3 months",
          "Kitchen curtains: every 2–3 months (oil film builds up)",
          "Bedroom blackout curtains: every 6 months",
        ],
      },
      {
        heading: "Why dusting is not enough",
        body: [
          "Vacuuming removes surface dust only. Fine particles and cooking oil settle deep into the weave and slowly darken the fabric — most people only notice when the curtain is taken down next to a new one.",
        ],
      },
      {
        heading: "The shrinkage question",
        body: [
          "Cotton and linen curtains shrink if dried at high heat. We test the fabric first and dry flat at controlled temperature so the length stays the same and the curtain rehangs correctly.",
        ],
      },
    ],
  },
  {
    slug: "carpet-and-upholstery-cleaning",
    title: "Carpet and Upholstery: What Deep Cleaning Actually Removes",
    summary: "The difference between vacuuming and professional extraction, and how often each is needed.",
    topic: "Home Care",
    readMinutes: 4,
    relatedService: "carpets",
    sections: [
      {
        heading: "Vacuum weekly, deep clean yearly",
        body: [
          "Weekly vacuuming lifts loose dust from the top layer. Deep extraction pulls out embedded soil, dust mites, skin cells and oil from the base of the pile.",
        ],
        list: [
          "Living-room carpet: deep clean every 6–12 months",
          "Home with pets or toddlers: every 4–6 months",
          "Doormats and entry rugs: every 3 months",
          "Sofa upholstery: every 8–12 months",
        ],
      },
      {
        heading: "Drying matters more than washing",
        body: [
          "A carpet that is cleaned but not dried fully will smell within a week. We dry completely before delivery, which is why carpet jobs take 3–4 days rather than one.",
        ],
      },
    ],
  },
  {
    slug: "monsoon-fabric-care",
    title: "Monsoon Care: Keeping Clothes Dry-Smelling in Humid Months",
    summary: "Damp smell, mildew spots and slow drying — practical steps for the rainy season.",
    topic: "Seasonal",
    readMinutes: 3,
    sections: [
      {
        heading: "What causes the monsoon smell",
        body: [
          "Clothes that take more than 8–10 hours to dry develop bacteria that produce the familiar damp odour. Rewashing does not remove it — the fibres need proper hot drying.",
        ],
      },
      {
        heading: "Five things that help",
        body: [],
        list: [
          "Never leave washed clothes in the machine drum overnight",
          "Do not fold anything that feels even slightly cool to the touch",
          "Keep wardrobes 5 cm away from external walls",
          "Air heavy items — jeans, towels, blankets — once a fortnight",
          "Send bulky items for machine drying instead of balcony drying",
        ],
      },
      {
        heading: "For silks and woollens",
        body: [
          "Store with a cotton cloth layer, never in plastic. Plastic traps moisture and causes yellow mildew spots that are very hard to reverse.",
        ],
      },
    ],
  },
  {
    slug: "laundry-for-pet-households",
    title: "Laundry in a Pet Household",
    summary: "Hair, dander and odour need a different routine. Here is what works.",
    topic: "Health & Hygiene",
    readMinutes: 3,
    sections: [
      {
        heading: "Hair before water",
        body: [
          "Once hair is wet it binds to fabric. Always brush or vacuum bedding, throws and sofa covers before washing them.",
        ],
      },
      {
        heading: "Suggested frequency",
        body: [],
        list: [
          "Pet bedding: weekly",
          "Sofa covers and throws: every 2–3 weeks",
          "Curtains: every 3 months",
          "Carpets: every 4–6 months with enzyme odour treatment",
        ],
      },
      {
        heading: "Odour needs enzymes, not perfume",
        body: [
          "Pet odour comes from proteins in saliva and urine. Fragranced detergent masks it for a day. Enzyme treatment breaks it down — that is what we use on pet-household items.",
        ],
      },
    ],
  },
  {
    slug: "laundry-for-children-and-elderly",
    title: "Homes With Children or Elderly Members",
    summary: "Gentler detergents, higher hygiene, and the items most often missed.",
    topic: "Health & Hygiene",
    readMinutes: 3,
    sections: [
      {
        heading: "Skin comes first",
        body: [
          "Children and older adults have thinner, more reactive skin. Strong detergent residue is a common cause of itching that gets blamed on the fabric.",
        ],
        list: [
          "Ask for mild, fragrance-free detergent — we mark it on your account",
          "An extra rinse cycle removes residue",
          "Avoid heavy fabric softener on towels and bedding",
        ],
      },
      {
        heading: "Items people forget",
        body: [],
        list: [
          "Mattress protectors — every 2 months",
          "Pillows themselves, not just covers — every 4–6 months",
          "Wheelchair and walker cushion covers — monthly",
          "Blankets used during afternoon naps — every 2 months",
        ],
      },
    ],
  },
  {
    slug: "dust-and-allergy-prone-homes",
    title: "Dust and Allergy-Prone Homes: A Fabric Checklist",
    summary: "If someone at home sneezes every morning, textiles are usually the reason.",
    topic: "Health & Hygiene",
    readMinutes: 3,
    sections: [
      {
        heading: "Where allergens actually live",
        body: [
          "Dust mites need warmth and humidity — that means pillows, mattresses, blankets, curtains and carpets, in that order.",
        ],
      },
      {
        heading: "A workable routine",
        body: [],
        list: [
          "Bedsheets and pillow covers: weekly hot wash",
          "Blankets and quilts: every 3 months",
          "Curtains: every 3–4 months",
          "Carpets and rugs: every 4–6 months",
          "Soft toys: every 2 months",
        ],
      },
      {
        heading: "Hot wash where the fabric allows",
        body: [
          "Dust mites survive a cold wash. A 60°C wash or hot machine drying is what kills them — which home washing rarely achieves.",
        ],
      },
    ],
  },
  {
    slug: "washing-vs-dry-cleaning",
    title: "Washing vs Dry Cleaning vs Specialised Cleaning",
    summary: "A plain-language guide to choosing the right process for each item.",
    topic: "Fabric Care",
    readMinutes: 4,
    relatedService: "dry-cleaning",
    sections: [
      {
        heading: "Washing (water based)",
        body: ["Best for cotton, linen, everyday synthetics, towels and bedsheets. Removes sweat, water-soluble soil and body oils well."],
      },
      {
        heading: "Dry cleaning (solvent based)",
        body: [
          "Best for silk, wool, structured garments, suits, sarees, embroidery and anything labelled 'dry clean only'. No water means no shrinkage, no colour bleeding and no loss of shape.",
        ],
      },
      {
        heading: "Specialised cleaning",
        body: [
          "Carpets, shoes, bags and leather need methods of their own — extraction, hand cleaning, conditioning. Putting these through either normal route damages them.",
        ],
      },
      {
        heading: "Quick rule",
        body: [
          "If the item is structured, delicate, embroidered or expensive, dry clean it. If it touches skin daily and is cotton, wash it hot. If it is neither, ask us — we will tell you honestly which is cheaper.",
        ],
      },
    ],
  },
  {
    slug: "when-professional-cleaning-is-worth-it",
    title: "When Professional Cleaning Is Genuinely Worth It",
    summary: "Not everything needs a laundry. Here is where it actually saves money.",
    topic: "Fabric Care",
    readMinutes: 3,
    sections: [
      {
        heading: "Send it out when",
        body: [],
        list: [
          "The item is too large to dry properly at home — blankets, curtains, carpets",
          "The label says dry clean only",
          "The garment has structure — suits, blazers, sherwanis, gowns",
          "There is a stain you have already tried once",
          "The item is expensive enough that a mistake costs more than the service",
        ],
      },
      {
        heading: "Keep it at home when",
        body: [],
        list: [
          "It is everyday cotton with no marks",
          "You have time and space to dry it fully",
          "It is a quick freshen-up rather than a clean",
        ],
      },
      {
        heading: "The stain rule",
        body: [
          "Never apply hot water or rub hard on a fresh stain. Blot, keep it dry, and bring it in within 48 hours — that single habit saves more garments than any product.",
        ],
      },
    ],
  },
  {
    slug: "silk-saree-storage-guide",
    title: "How to Store Silk Sarees So They Last Decades",
    summary: "Folding, wrapping and airing — the three habits that prevent permanent damage.",
    topic: "Fabric Care",
    readMinutes: 3,
    relatedService: "sarees",
    sections: [
      {
        heading: "Refold every 6 months",
        body: [
          "Silk cracks along a permanent fold line. Change the fold position twice a year and the saree will never split at the pleats.",
        ],
      },
      {
        heading: "Wrap in cotton, never plastic",
        body: [
          "Plastic covers trap moisture and react with zari, turning it black. Use an old cotton dhoti or a muslin cover instead.",
        ],
      },
      {
        heading: "Clean before storing",
        body: [
          "Invisible sweat and food residue oxidise over months and become permanent yellow patches. Always store a saree clean, never 'worn once'.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
