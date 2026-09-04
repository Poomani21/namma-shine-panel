import { Link } from "@tanstack/react-router";
import { Calculator, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site, telLink, waLink } from "@/lib/site";

/** Sticky mobile action bar — the primary conversion path on ad traffic. */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-border bg-background/95 p-2 backdrop-blur lg:hidden">
      <Button asChild size="lg" className="w-full">
        <a href={telLink}>
          <Phone className="size-4" /> Call
        </a>
      </Button>
      <Button asChild size="lg" variant="secondary" className="w-full">
        <a href={waLink("Hi Namma Laundry, I would like to book a pickup.")}>
          <MessageCircle className="size-4" /> WhatsApp
        </a>
      </Button>
    </div>
  );
}

export function CtaSection({
  title = "Ready when you are",
  subtitle = "Free pickup and delivery. Tell us what needs cleaning and we will confirm the price before we start.",
  whatsappMessage = "Hi Namma Laundry, I would like to book a pickup.",
}: {
  title?: string;
  subtitle?: string;
  whatsappMessage?: string;
}) {
  return (
    <section className="surface-green">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-6">
        <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm opacity-85 sm:text-base">{subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" variant="gold">
            <a href={waLink(whatsappMessage)}>
              <MessageCircle className="size-4" /> Book on WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outlineLight">
            <a href={telLink}>
              <Phone className="size-4" /> {site.phoneDisplay}
            </a>
          </Button>
          <Button asChild size="lg" variant="ghostLight">
            <Link to="/estimate">
              <Calculator className="size-4" /> Get an estimate
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
