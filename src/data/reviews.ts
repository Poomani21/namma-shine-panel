export type Review = {
  name: string;
  area: string;
  rating: 5 | 4;
  text: string;
  service: string;
};

export const reviews: Review[] = [
  {
    name: "Lakshmi Raghavan",
    area: "Whitefield",
    rating: 5,
    text: "Gave my mother's 20-year-old Kanjivaram with real hesitation. It came back with the shine back and the zari untouched. The roll polish is included, which nobody else does.",
    service: "Saree Care",
  },
  {
    name: "Arun Kumar",
    area: "Marathahalli",
    rating: 5,
    text: "Three winter blankets picked up and returned in two days, completely dry and smelling fresh. No damp smell at all, which was my main problem with home washing.",
    service: "Blanket Cleaning",
  },
  {
    name: "Priya Menon",
    area: "Brookefield",
    rating: 5,
    text: "We have a dog and two kids. The sofa covers and curtains looked new again. They told me upfront which stains would not fully go — I appreciated the honesty.",
    service: "Curtain Cleaning",
  },
  {
    name: "Suresh Babu",
    area: "Kadugodi",
    rating: 5,
    text: "Weekly wash and iron for the last two years. Pickup is always on time and the shirts come back properly pressed on hangers. Simple and reliable.",
    service: "Wash & Iron",
  },
  {
    name: "Deepa Shetty",
    area: "Varthur",
    rating: 5,
    text: "Turmeric stain on a new silk kurta. I had already tried washing it once. They still managed to lift it almost completely and charged only the stain add-on.",
    service: "Stain Removal",
  },
  {
    name: "Naveen Rao",
    area: "ITPL",
    rating: 5,
    text: "Sent two pairs of sneakers and a leather bag. Came back looking genuinely new. Rates are fair for the quality of hand work involved.",
    service: "Shoe Cleaning",
  },
  {
    name: "Anitha Krishnan",
    area: "Hoodi",
    rating: 5,
    text: "Booked the whole house linen before Deepavali — bedsheets, curtains, sofa covers. Everything came folded and pressed on the promised day.",
    service: "Home Linen",
  },
  {
    name: "Mohan Prasad",
    area: "Bellandur",
    rating: 4,
    text: "Carpet cleaning took four days, a day longer than told, but the result was excellent and they explained it was for full drying. Fair enough.",
    service: "Carpet Cleaning",
  },
];

export const reviewStats = {
  average: 4.9,
  count: 640,
};
