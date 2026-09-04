import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import type { Service } from "@/data/services";

/**
 * Single card used for every service on the home page and the services page,
 * so image, name, description, price and CTA stay consistent everywhere.
 */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className="card-elegant group flex flex-col overflow-hidden transition-shadow hover:shadow-lg"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={service.image}
          alt={service.imageAlt}
          loading="lazy"
          width={1024}
          height={768}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl text-primary">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
        <p className="mt-4 text-sm">
          From <span className="font-display text-lg text-primary">₹{service.fromPrice}</span>{" "}
          <span className="text-muted-foreground">{service.unit}</span>
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
          View details <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
