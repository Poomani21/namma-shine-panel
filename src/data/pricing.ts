/**
 * Pricing catalogue — the single source of truth for every price on the site.
 * Change a price here and it updates on the home page, service pages, the
 * price list and the estimator at the same time.
 * Shape is intentionally flat and id-based so it can later be served from an
 * admin-managed backend table (id, group, name, price, unit) without changing
 * any UI code.
 */

export type PriceItem = {
  id: string;
  name: string;
  price: number;
  unit: string;
  group: string;
};

export const priceGroups = [
  "Everyday Laundry — By Weight",
  "Everyday Laundry — Per Piece",
  "Steam Ironing",
  "Dry Cleaning — Men",
  "Dry Cleaning — Women",
  "Dry Cleaning — Kids",
  "Dry Cleaning — Home Linen",
  "Dry Cleaning — Blankets",
  "Dry Cleaning — Curtains",
  "Dry Cleaning — Carpets",
  "Specialist — Footwear",
  "Specialist — Bags & Suitcases",
  "Specialist — Soft Toys",
  "Specialist — Pet Bedding",
  "Add-On Services",
] as const;

export const priceList: PriceItem[] = [
  // Everyday Laundry — By Weight
  { id: "wash-fold", name: "Wash & Fold (Min. 5 KG)", price: 56, unit: "per kg", group: "Everyday Laundry — By Weight" },
  { id: "wash-iron", name: "Wash & Iron (Min. 5 KG)", price: 91, unit: "per kg", group: "Everyday Laundry — By Weight" },
  { id: "house-linen-kg", name: "House Linen / Heavy Items (Bedsheets, Curtains, Blankets, Covers)", price: 150, unit: "per kg", group: "Everyday Laundry — By Weight" },

  // Everyday Laundry — Per Piece
  { id: "hand-wash-single", name: "Hand Wash — Single Regular Clothes", price: 50, unit: "per piece", group: "Everyday Laundry — Per Piece" },
  { id: "hand-wash-iron-single", name: "Hand Wash & Iron — Regular Clothes", price: 60, unit: "per piece", group: "Everyday Laundry — Per Piece" },
  { id: "cotton-dhoti-wash", name: "Cotton Dhoti — Wash", price: 75, unit: "per piece", group: "Everyday Laundry — Per Piece" },
  { id: "cotton-dhoti-wash-iron", name: "Cotton Dhoti — Wash & Iron", price: 100, unit: "per piece", group: "Everyday Laundry — Per Piece" },
  { id: "towel-wash", name: "Towel", price: 100, unit: "per piece", group: "Everyday Laundry — Per Piece" },
  { id: "doormat-wash", name: "Doormat", price: 100, unit: "per piece", group: "Everyday Laundry — Per Piece" },
  { id: "pillow-foam-wash", name: "Pillow Foam", price: 200, unit: "per piece", group: "Everyday Laundry — Per Piece" },
  { id: "cushion-foam-wash", name: "Cushion Foam", price: 150, unit: "per piece", group: "Everyday Laundry — Per Piece" },
  { id: "pillow-cushion-cover-wash", name: "Pillow / Cushion Cover", price: 50, unit: "per piece", group: "Everyday Laundry — Per Piece" },

  // Steam Ironing
  { id: "iron-shirt", name: "Steam Iron — Men's / Women's Regular Garment", price: 14, unit: "per piece", group: "Steam Ironing" },
  { id: "iron-trouser", name: "Steam Iron — Trouser / Jeans / Regular", price: 14, unit: "per piece", group: "Steam Ironing" },
  { id: "iron-saree", name: "Steam Iron — Saree", price: 75, unit: "per saree", group: "Steam Ironing" },
  { id: "iron-men-kurta", name: "Steam Iron — Men's Kurta", price: 25, unit: "per piece", group: "Steam Ironing" },
  { id: "iron-men-dhoti-pant", name: "Steam Iron — Men's Dhoti Pant", price: 30, unit: "per piece", group: "Steam Ironing" },
  { id: "iron-men-dhoti", name: "Steam Iron — Men's Dhoti", price: 40, unit: "per piece", group: "Steam Ironing" },
  { id: "iron-men-jacket", name: "Steam Iron — Men's Jacket / Waistcoat", price: 50, unit: "per piece", group: "Steam Ironing" },
  { id: "iron-men-blazer", name: "Steam Iron — Men's Blazer", price: 100, unit: "per piece", group: "Steam Ironing" },
  { id: "iron-women-dupatta", name: "Steam Iron — Women's Dupatta", price: 20, unit: "per piece", group: "Steam Ironing" },
  { id: "iron-women-blouse", name: "Steam Iron — Women's Blouse", price: 25, unit: "per piece", group: "Steam Ironing" },
  { id: "iron-women-anarkali-gown", name: "Steam Iron — Anarkali / Gown / Long Dress", price: 30, unit: "per piece", group: "Steam Ironing" },
  { id: "iron-women-pleated-skirt", name: "Steam Iron — Pleated Dress / Skirt", price: 30, unit: "per piece", group: "Steam Ironing" },
  { id: "iron-women-lehenga", name: "Steam Iron — Lehenga", price: 50, unit: "per piece", group: "Steam Ironing" },
  { id: "iron-women-saree-heavy", name: "Steam Iron — Silk / Heavy Saree", price: 100, unit: "per saree", group: "Steam Ironing" },
  { id: "iron-kids-regular", name: "Steam Iron — Kids Regular Garment", price: 10, unit: "per piece", group: "Steam Ironing" },
  { id: "iron-kids-ethnic", name: "Steam Iron — Kids Fancy / Ethnic Wear", price: 40, unit: "per set", group: "Steam Ironing" },
  { id: "iron-bedsheet-single", name: "Steam Iron — Bedsheet (Single)", price: 40, unit: "per piece", group: "Steam Ironing" },
  { id: "iron-bedsheet-double", name: "Steam Iron — Bedsheet (Double)", price: 50, unit: "per piece", group: "Steam Ironing" },
  { id: "iron-pillow-cover", name: "Steam Iron — Pillow / Cushion Cover", price: 15, unit: "per piece", group: "Steam Ironing" },
  { id: "iron-curtain-window", name: "Steam Iron — Curtain Window (5x4 ft)", price: 50, unit: "per panel", group: "Steam Ironing" },
  { id: "iron-curtain-door", name: "Steam Iron — Curtain Door (7x4 ft)", price: 70, unit: "per panel", group: "Steam Ironing" },
  { id: "iron-curtain-long", name: "Steam Iron — Curtain Long Door (9x4 ft)", price: 100, unit: "per panel", group: "Steam Ironing" },

  // Dry Cleaning — Men
  { id: "m-shirt", name: "Shirt", price: 150, unit: "per piece", group: "Dry Cleaning — Men" },
  { id: "m-trouser", name: "Trouser / Jeans / Pant", price: 150, unit: "per piece", group: "Dry Cleaning — Men" },
  { id: "m-jeans", name: "Jeans", price: 150, unit: "per piece", group: "Dry Cleaning — Men" },
  { id: "m-suit2", name: "Suit (2 pc)", price: 375, unit: "per set", group: "Dry Cleaning — Men" },
  { id: "m-suit-3pc", name: "Suit (3 pc)", price: 550, unit: "per set", group: "Dry Cleaning — Men" },
  { id: "m-blazer", name: "Blazer", price: 240, unit: "per piece", group: "Dry Cleaning — Men" },
  { id: "m-waistcoat", name: "Waistcoat", price: 200, unit: "per piece", group: "Dry Cleaning — Men" },
  { id: "m-tie-bow", name: "Tie / Bow", price: 70, unit: "per piece", group: "Dry Cleaning — Men" },
  { id: "m-dhoti", name: "Cotton Dhoti", price: 180, unit: "per piece", group: "Dry Cleaning — Men" },
  { id: "m-dhoti-cotton-anga", name: "Cotton Dhoti + Angavastram", price: 220, unit: "per set", group: "Dry Cleaning — Men" },
  { id: "m-dhoti-silk", name: "Silk Dhoti", price: 200, unit: "per piece", group: "Dry Cleaning — Men" },
  { id: "m-dhoti-silk-anga", name: "Silk Dhoti + Angavastram", price: 250, unit: "per set", group: "Dry Cleaning — Men" },
  { id: "m-dhoti-pant", name: "Dhoti Pant", price: 250, unit: "per piece", group: "Dry Cleaning — Men" },
  { id: "m-kurta", name: "Cotton / Silk Kurta", price: 200, unit: "per piece", group: "Dry Cleaning — Men" },
  { id: "m-pyjama", name: "Cotton / Silk Pyjama", price: 125, unit: "per piece", group: "Dry Cleaning — Men" },
  { id: "m-sherwani", name: "Sherwani (Heavy)", price: 500, unit: "per piece", group: "Dry Cleaning — Men" },
  { id: "m-sherwani-light", name: "Sherwani (Light)", price: 300, unit: "per piece", group: "Dry Cleaning — Men" },
  { id: "m-tshirt-shorts", name: "T-Shirt / Shorts", price: 125, unit: "per piece", group: "Dry Cleaning — Men" },
  { id: "m-bermudas-capris", name: "Knee-Length Shorts / Bermudas / Capris", price: 200, unit: "per piece", group: "Dry Cleaning — Men" },
  { id: "m-sweater", name: "Sweater / Jacket", price: 240, unit: "per piece", group: "Dry Cleaning — Men" },
  { id: "m-jacket", name: "Jacket", price: 240, unit: "per piece", group: "Dry Cleaning — Men" },
  { id: "m-leatherite-jacket", name: "Leatherite Jacket", price: 399, unit: "per piece", group: "Dry Cleaning — Men" },
  { id: "m-cap", name: "Cap", price: 100, unit: "per piece", group: "Dry Cleaning — Men" },

  // Dry Cleaning — Women
  { id: "w-blouse", name: "Blouse (Plain)", price: 75, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-blouse-heavy", name: "Blouse (Embroidered / Heavy)", price: 100, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-saree-cotton", name: "Saree — Cotton (incl. Starch & Roll Polish)", price: 300, unit: "per saree", group: "Dry Cleaning — Women" },
  { id: "w-saree-silk", name: "Saree — Silk (incl. Roll Polish)", price: 350, unit: "per saree", group: "Dry Cleaning — Women" },
  { id: "w-saree-heavy", name: "Saree — Silk Heavy Work / Embroidered", price: 400, unit: "per saree", group: "Dry Cleaning — Women" },
  { id: "w-saree-silk-heavy", name: "Saree — Silk Heavy Work", price: 450, unit: "per saree", group: "Dry Cleaning — Women" },
  { id: "w-lehenga-plain", name: "Lehenga — Plain", price: 200, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-lehenga-2", name: "Lehenga Choli (Light)", price: 300, unit: "per set", group: "Dry Cleaning — Women" },
  { id: "w-lehenga-3", name: "Lehenga Choli Dupatta (3 pc) — Light", price: 550, unit: "per set", group: "Dry Cleaning — Women" },
  { id: "w-lehenga-3h", name: "Lehenga Choli Dupatta (3 pc) — Heavy", price: 1000, unit: "per set", group: "Dry Cleaning — Women" },
  { id: "w-choli-plain", name: "Choli — Plain", price: 125, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-choli-light", name: "Choli — Light Work", price: 200, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-choli-heavy", name: "Choli — Heavy Work", price: 250, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-dupatta", name: "Dupatta (Plain)", price: 100, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-dupatta-light", name: "Dupatta — Light Work", price: 150, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-dupatta-heavy", name: "Dupatta — Heavy Work", price: 250, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-kurta-light", name: "Kurta — Light", price: 150, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-kurta-heavy", name: "Kurta — Heavy", price: 250, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-anarkali-light", name: "Anarkali — Light", price: 250, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-anarkali-heavy", name: "Anarkali — Heavy", price: 375, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-salwar", name: "Salwar / Leggings / Pyjamas", price: 100, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-churidar", name: "Churidar Set", price: 250, unit: "per set", group: "Dry Cleaning — Women" },
  { id: "w-top", name: "Top / T-Shirt / Jeans", price: 150, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-skirt", name: "Skirt (Plain)", price: 200, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-dress-short", name: "Dress (Short)", price: 200, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-dress-long", name: "Dress (Long)", price: 300, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-gown-light", name: "Gown — Light", price: 250, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-gown-heavy", name: "Gown — Heavy", price: 450, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-wedding-dress", name: "Wedding Dress", price: 850, unit: "per piece", group: "Dry Cleaning — Women" },
  { id: "w-bharatnatyam-adult", name: "Bharatnatyam Set (Adult)", price: 750, unit: "per set", group: "Dry Cleaning — Women" },
  { id: "w-bharatnatyam-kids", name: "Bharatnatyam Set (Kids)", price: 600, unit: "per set", group: "Dry Cleaning — Women" },

  // Dry Cleaning — Kids
  { id: "k-regular-garments", name: "Regular Garment", price: 90, unit: "per piece", group: "Dry Cleaning — Kids" },
  { id: "k-ethnic-set", name: "Ethnic / Full Set Wear", price: 250, unit: "per set", group: "Dry Cleaning — Kids" },
  { id: "k-blazer-coat", name: "Blazer / Jacket / Coat Only", price: 150, unit: "per piece", group: "Dry Cleaning — Kids" },

  // Dry Cleaning — Home Linen
  { id: "h-bedsheet-single", name: "Bedsheet — Single", price: 220, unit: "per piece", group: "Dry Cleaning — Home Linen" },
  { id: "h-bedsheet-double", name: "Bedsheet — Double", price: 275, unit: "per piece", group: "Dry Cleaning — Home Linen" },
  { id: "h-pillow-cover", name: "Pillow Cover", price: 150, unit: "per piece", group: "Dry Cleaning — Home Linen" },
  { id: "h-table-cover", name: "Table Cover", price: 150, unit: "per piece", group: "Dry Cleaning — Home Linen" },
  { id: "h-dining-cover", name: "Dining Cover", price: 200, unit: "per piece", group: "Dry Cleaning — Home Linen" },
  { id: "h-towel", name: "Bath Towel", price: 100, unit: "per piece", group: "Dry Cleaning — Home Linen" },
  { id: "h-cushion-small", name: "Cushion Cover — Small", price: 100, unit: "per piece", group: "Dry Cleaning — Home Linen" },
  { id: "h-cushion-med", name: "Cushion Cover — Medium / Standard", price: 150, unit: "per piece", group: "Dry Cleaning — Home Linen" },
  { id: "h-cushion-large", name: "Cushion Cover — Large", price: 200, unit: "per piece", group: "Dry Cleaning — Home Linen" },
  { id: "h-sofa-cover", name: "Sofa Cover — 1 Seater", price: 200, unit: "per piece", group: "Dry Cleaning — Home Linen" },
  { id: "h-sofa-2seater", name: "Sofa Cover — 2 Seater", price: 300, unit: "per piece", group: "Dry Cleaning — Home Linen" },
  { id: "h-sofa-3seater", name: "Sofa Cover — 3 Seater", price: 400, unit: "per piece", group: "Dry Cleaning — Home Linen" },

  // Dry Cleaning — Blankets
  { id: "h-blanket-single", name: "Blanket — Single", price: 299, unit: "per piece", group: "Dry Cleaning — Blankets" },
  { id: "h-blanket-double", name: "Blanket — Double (Queen Size)", price: 499, unit: "per piece", group: "Dry Cleaning — Blankets" },
  { id: "h-quilt", name: "Blanket — Double (King Size) / Quilt", price: 599, unit: "per piece", group: "Dry Cleaning — Blankets" },

  // Dry Cleaning — Curtains
  { id: "h-curtain-light", name: "Curtain — Sheer / Cotton Window (5x4 ft)", price: 200, unit: "per panel", group: "Dry Cleaning — Curtains" },
  { id: "h-curtain-heavy", name: "Curtain — Sheer / Cotton Door (7x4 ft)", price: 300, unit: "per panel", group: "Dry Cleaning — Curtains" },
  { id: "h-curtain-sheer-long", name: "Curtain — Sheer / Cotton Long Door (9x4 ft)", price: 400, unit: "per panel", group: "Dry Cleaning — Curtains" },
  { id: "h-curtain-silk-window", name: "Curtain — Silk / Velvet Window (5x4 ft)", price: 250, unit: "per panel", group: "Dry Cleaning — Curtains" },
  { id: "h-curtain-silk-door", name: "Curtain — Silk / Velvet Door (7x4 ft)", price: 350, unit: "per panel", group: "Dry Cleaning — Curtains" },
  { id: "h-curtain-silk-long", name: "Curtain — Silk / Velvet Long Door (9x4 ft)", price: 450, unit: "per panel", group: "Dry Cleaning — Curtains" },

  // Dry Cleaning — Carpets
  { id: "h-carpet", name: "Carpet (Persian, Silk, Jute, Wool, Synthetic)", price: 45, unit: "per sq. ft", group: "Dry Cleaning — Carpets" },

  // Specialist Care — Footwear
  { id: "s-sneaker", name: "Sports Shoes / Sneakers", price: 350, unit: "per pair", group: "Specialist — Footwear" },
  { id: "s-leather-shoe", name: "Leather / Formal Shoes", price: 400, unit: "per pair", group: "Specialist — Footwear" },
  { id: "s-shoes-canvas", name: "Canvas Shoes", price: 300, unit: "per pair", group: "Specialist — Footwear" },
  { id: "s-shoes-suede", name: "Suede / Nubuck Shoes", price: 500, unit: "per pair", group: "Specialist — Footwear" },
  { id: "s-shoes-boots", name: "Boots", price: 700, unit: "per pair", group: "Specialist — Footwear" },

  // Specialist Care — Bags & Suitcases
  { id: "s-bag", name: "Fabric / Synthetic Handbag or Backpack", price: 350, unit: "per bag", group: "Specialist — Bags & Suitcases" },
  { id: "s-bag-fabric-suitcase", name: "Fabric Suitcase", price: 400, unit: "per bag", group: "Specialist — Bags & Suitcases" },
  { id: "s-bag-leather-handbag", name: "Leather Handbag / Office Bag", price: 500, unit: "per bag", group: "Specialist — Bags & Suitcases" },
  { id: "s-bag-leather-duffel", name: "Leather Duffel Bag", price: 600, unit: "per bag", group: "Specialist — Bags & Suitcases" },
  { id: "s-bag-designer", name: "Designer / Premium Leather Bag", price: 800, unit: "per bag", group: "Specialist — Bags & Suitcases" },

  // Specialist Care — Soft Toys
  { id: "s-toy-mini", name: "Soft Toy — Mini (<= 6\")", price: 100, unit: "per piece", group: "Specialist — Soft Toys" },
  { id: "s-toy-small", name: "Soft Toy — Small (7\" to 12\")", price: 150, unit: "per piece", group: "Specialist — Soft Toys" },
  { id: "s-toy-med", name: "Soft Toy — Medium (13\" to 18\")", price: 200, unit: "per piece", group: "Specialist — Soft Toys" },
  { id: "s-toy-large", name: "Soft Toy — Large (19\" to 24\")", price: 300, unit: "per piece", group: "Specialist — Soft Toys" },
  { id: "s-toy-xlarge", name: "Soft Toy — XL (25\" to 36\")", price: 400, unit: "per piece", group: "Specialist — Soft Toys" },
  { id: "s-toy-giant", name: "Soft Toy — Giant (> 36\")", price: 500, unit: "per piece", group: "Specialist — Soft Toys" },

  // Specialist Care — Pet Bedding
  { id: "s-pet-blanket-small", name: "Pet Blanket — Small", price: 150, unit: "per piece", group: "Specialist — Pet Bedding" },
  { id: "s-pet-blanket-med", name: "Pet Blanket — Medium", price: 200, unit: "per piece", group: "Specialist — Pet Bedding" },
  { id: "s-pet-blanket-large", name: "Pet Blanket — Large", price: 300, unit: "per piece", group: "Specialist — Pet Bedding" },
  { id: "s-pet-mattress-small", name: "Pet Mattress / Cushion — Small", price: 250, unit: "per piece", group: "Specialist — Pet Bedding" },
  { id: "s-pet-mattress-med", name: "Pet Mattress / Cushion — Medium", price: 350, unit: "per piece", group: "Specialist — Pet Bedding" },
  { id: "s-pet-mattress-large", name: "Pet Mattress / Cushion — Large", price: 450, unit: "per piece", group: "Specialist — Pet Bedding" },
  { id: "s-pet-bed-small", name: "Pet Bed — Small", price: 300, unit: "per piece", group: "Specialist — Pet Bedding" },
  { id: "s-pet-bed-med", name: "Pet Bed — Medium", price: 400, unit: "per piece", group: "Specialist — Pet Bedding" },
  { id: "s-pet-bed-large", name: "Pet Bed — Large", price: 550, unit: "per piece", group: "Specialist — Pet Bedding" },

  // Add-On Services
  { id: "s-stain", name: "Specialised Stain Removal", price: 100, unit: "add-on per stain", group: "Add-On Services" },
  { id: "addon-starch", name: "Starch Treatment", price: 20, unit: "per item", group: "Add-On Services" },
  { id: "addon-fragrance", name: "Fragrance Treatment", price: 50, unit: "per order / item", group: "Add-On Services" },
  { id: "addon-detergent", name: "Extra Detergent Treatment (Heavy Soils)", price: 50, unit: "per order / item", group: "Add-On Services" },
  { id: "addon-softener", name: "Fabric Softener Treatment", price: 50, unit: "per order / item", group: "Add-On Services" },
  { id: "addon-disinfection", name: "Disinfection Treatment", price: 70, unit: "per order / item", group: "Add-On Services" },
];

export function getPrice(id: string): PriceItem {
  const item = priceList.find((p) => p.id === id);
  if (!item) throw new Error(`Unknown price id: ${id}`);
  return item;
}

export const pricingNotes = [
  "All listed prices are starting prices and exclusive of applicable GST.",
  "Every saree dry cleaning order includes complimentary roll polishing.",
  "Free curtain removal & reinstallation on orders above ₹2000.",
  "2-ply / double-layered blankets & lined curtains are charged at 1.5x the base price.",
  "Minimum order for Per-KG laundry services is 5 KG.",
  "Final price is confirmed after fabric inspection at pickup.",
];