import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

import {
  priceGroups as staticPriceGroups,
  priceList as staticPriceList,
  type PriceItem,
} from "@/data/pricing";
import {
  getServiceMedia,
  serviceDefs,
  services as staticServices,
  type Service,
  type ServiceDef,
} from "@/data/services";
import { COLLECTIONS, getDb } from "@/lib/firebase";

/**
 * Live catalogue.
 *
 * The static files in src/data remain the fallback (and the SSR/first-paint
 * content, so the site never renders empty). When Firestore holds documents
 * they take over — that is how /admin edits reach the public website.
 */

export type PriceDoc = PriceItem & { order?: number };
export type ServiceDoc = ServiceDef & { order?: number };

export type Catalog = {
  priceList: PriceItem[];
  priceGroups: string[];
  services: Service[];
  source: "firestore" | "static";
};

export const staticCatalog: Catalog = {
  priceList: staticPriceList,
  priceGroups: [...staticPriceGroups],
  services: staticServices,
  source: "static",
};

function bySortOrder<T extends { order?: number }>(a: T, b: T) {
  return (a.order ?? 0) - (b.order ?? 0);
}

export function buildCatalog(prices: PriceDoc[], serviceRows: ServiceDoc[]): Catalog {
  const priceList: PriceItem[] = prices.length
    ? prices.slice().sort(bySortOrder).map(({ order: _order, ...p }) => p)
    : staticPriceList;

  const priceGroups: string[] = [];
  for (const p of priceList) if (!priceGroups.includes(p.group)) priceGroups.push(p.group);

  const defs = serviceRows.length ? serviceRows.slice().sort(bySortOrder) : serviceDefs;
  const services: Service[] = defs.map((def) => {
    const price = priceList.find((p) => p.id === def.priceId);
    const media = getServiceMedia(def.slug, def.name);
    return {
      ...def,
      fromPrice: price?.price ?? 0,
      unit: price?.unit ?? "",
      image: media.image,
      imageAlt: media.alt,
    };
  });

  return {
    priceList,
    priceGroups: priceGroups.length ? priceGroups : [...staticPriceGroups],
    services,
    source: prices.length || serviceRows.length ? "firestore" : "static",
  };
}

export async function fetchCatalog(): Promise<Catalog> {
  const db = await getDb();
  const [priceSnap, serviceSnap] = await Promise.all([
    getDocs(collection(db, COLLECTIONS.prices)),
    getDocs(collection(db, COLLECTIONS.services)),
  ]);
  const prices = priceSnap.docs.map((d) => ({ ...(d.data() as Omit<PriceDoc, "id">), id: d.id }));
  const serviceRows = serviceSnap.docs.map((d) => ({
    ...(d.data() as Omit<ServiceDoc, "slug">),
    slug: d.id,
  }));
  return buildCatalog(prices as PriceDoc[], serviceRows as ServiceDoc[]);
}

export const catalogQueryOptions = {
  queryKey: ["catalog"] as const,
  queryFn: fetchCatalog,
  staleTime: 60_000,
  retry: 1,
};

/** Live catalogue with the bundled data as an instant, SSR-safe fallback. */
export function useCatalog(): Catalog {
  const { data } = useQuery({
    ...catalogQueryOptions,
    enabled: typeof window !== "undefined",
  });
  return data ?? staticCatalog;
}
