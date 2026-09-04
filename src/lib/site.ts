export const site = {
  name: "Namma Laundry",
  domain: "nammalaundry.in",
  phoneDisplay: "91483 90404",
  phone: "+919148390404",
  whatsapp: "919148390404",
  yearsExperience: 10,
  city: "Bengaluru",
  areas: [
    "Whitefield",
    "Marathahalli",
    "Brookefield",
    "Kadugodi",
    "Varthur",
    "ITPL / Hoodi",
    "Bellandur",
    "HSR Layout",
  ],
  hours: "Mon – Sun, 8:00 AM – 9:00 PM",
} as const;

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const telLink = `tel:${site.phone}`;
