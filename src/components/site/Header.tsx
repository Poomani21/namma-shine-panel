import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

import logo from "@/assets/logo.png.asset.json";
import { site, telLink } from "@/lib/site";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/estimate", label: "Online Estimate" },
  { to: "/knowledge", label: "Knowledge Centre" },
  { to: "/about", label: "About" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
  { to: "/terms-conditions", label: "Terms & Conditions" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logo.url}
            alt="Namma Laundry logo"
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-full"
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-tight text-primary">
              Namma Laundry
            </span>
            <span className="block truncate text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              More care. More value.
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={telLink}>
              <Phone className="size-4" /> {site.phoneDisplay}
            </a>
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-md border border-border text-primary lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <nav className="hidden border-t border-border/70 lg:block">
        <ul className="mx-auto flex max-w-6xl items-center gap-7 px-6 py-2.5 text-sm">
          {nav.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-primary font-medium" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "text-primary font-medium" }}
                  className="block border-b border-border/60 py-3 text-[15px] last:border-0"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <Button asChild className="w-full">
                <a href={telLink}>
                  <Phone className="size-4" /> Call {site.phoneDisplay}
                </a>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
