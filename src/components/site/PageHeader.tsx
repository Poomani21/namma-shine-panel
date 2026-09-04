import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="surface-green">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16 lg:px-6">
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 max-w-3xl font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-sm opacity-85 sm:text-base">{subtitle}</p>
        ) : null}
        {children ? <div className="mt-7 flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </section>
  );
}