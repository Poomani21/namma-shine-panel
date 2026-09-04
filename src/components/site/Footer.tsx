import { Link } from "@tanstack/react-router";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";

import logo from "@/assets/logo.png.asset.json";
import { useCatalog } from "@/lib/catalog";
import { site, telLink, waLink } from "@/lib/site";

export function Footer() {
  const { services } = useCatalog();
  return (
    <footer className="surface-green mt-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="Namma Laundry" width={48} height={48} loading="lazy" className="size-12 rounded-full" />
            <span className="font-display text-xl text-gradient-gold">Namma Laundry</span>
          </div>
          <p className="mt-4 max-w-xs text-sm opacity-85">
            {site.yearsExperience}+ years of professional laundry, dry cleaning and fabric care in {site.city}.
            Free pickup and delivery.
          </p>
          <div className="rule-gold mt-5" />
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-gold">Services</h3>
          <ul className="mt-4 space-y-2 text-sm opacity-85">
            {services.slice(0, 8).map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-gold">
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/services" className="hover:text-gold">
                All services →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-gold">Company</h3>
          <ul className="mt-4 space-y-2 text-sm opacity-85">
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/pricing" className="hover:text-gold">Price List</Link></li>
            <li><Link to="/estimate" className="hover:text-gold">Online Estimate</Link></li>
            <li><Link to="/knowledge" className="hover:text-gold">Knowledge Centre</Link></li>
            <li><Link to="/reviews" className="hover:text-gold">Customer Reviews</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact & Booking</Link></li>
            <li><Link to="/terms-conditions" className="hover:text-gold">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-gold">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm opacity-85">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href={telLink} className="hover:text-gold">{site.phoneDisplay}</a>
            </li>
            <li className="flex items-start gap-2">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href={waLink("Hi Namma Laundry, I would like to book a pickup.")} className="hover:text-gold">
                WhatsApp booking
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>{site.hours}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>{site.areas.join(", ")}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/25">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-5 text-xs opacity-70 sm:flex-row sm:items-center sm:justify-between lg:px-6">
          <p>© {new Date().getFullYear()} Namma Laundry. All rights reserved.</p>
          <p>{site.domain}</p>
        </div>
      </div>
    </footer>
  );
}
