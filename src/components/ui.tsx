import type { ReactNode } from "react";
import clsx from "clsx";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { Lens } from "../data";

export function Card({
  title,
  subtitle,
  action,
  children,
  className,
  padded = true,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section
      className={clsx(
        "bg-white border border-ink-200 rounded-xl shadow-card",
        className
      )}
    >
      {(title || action) && (
        <header className="flex items-start justify-between gap-4 px-5 pt-4 pb-3 border-b border-ink-100">
          <div>
            {title && (
              <h3 className="text-[13px] font-semibold text-ink-900 tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-ink-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div className="text-xs text-ink-500">{action}</div>}
        </header>
      )}
      <div className={clsx(padded && "p-5")}>{children}</div>
    </section>
  );
}

export function LensBadge({ lens, className }: { lens: Lens; className?: string }) {
  const map: Record<Lens, { label: string; cls: string }> = {
    customer: {
      label: "Critical to customer",
      cls: "bg-brand-50 text-brand-700 ring-brand-100",
    },
    business: {
      label: "Critical to business",
      cls: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    },
    regulator: {
      label: "Critical to regulator",
      cls: "bg-amber-50 text-amber-700 ring-amber-100",
    },
  };
  const m = map[lens];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full text-[10px] font-medium px-2 py-0.5 ring-1 ring-inset",
        m.cls,
        className
      )}
    >
      <span
        className={clsx(
          "h-1.5 w-1.5 rounded-full",
          lens === "customer" && "bg-brand-500",
          lens === "business" && "bg-emerald-500",
          lens === "regulator" && "bg-amber-500"
        )}
      />
      {m.label}
    </span>
  );
}

export function Kpi({
  label,
  value,
  suffix,
  delta,
  trend,
  good,
  hint,
  lens,
}: {
  label: string;
  value: string;
  suffix?: string;
  delta?: string;
  // `trend` reflects the actual direction the metric moved (up vs down).
  trend?: "up" | "down";
  // `good` reflects whether that movement is favourable. For inverse metrics
  // (e.g. AHT, Grievance TAT) a downward trend can still be good — set this
  // explicitly to decouple arrow direction from colour.
  good?: boolean;
  hint?: string;
  lens: Lens;
}) {
  // Prefer explicit delta sign for the arrow so it always matches the label.
  const deltaDown = delta?.trim().startsWith("-") ?? false;
  const arrowUp = delta ? !deltaDown : trend !== "down";
  const isGood = good ?? trend === "up";
  return (
    <div className="bg-white border border-ink-200 rounded-xl p-4 shadow-card flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wide text-ink-500 font-medium">
          {label}
        </span>
        <LensBadge lens={lens} />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-semibold tracking-tight text-ink-900">
          {value}
        </span>
        {suffix && <span className="text-sm text-ink-500">{suffix}</span>}
      </div>
      <div className="flex items-center justify-between">
        {delta ? (
          <span
            className={clsx(
              "inline-flex items-center gap-1 text-xs font-medium",
              isGood ? "text-emerald-600" : "text-rose-600"
            )}
          >
            {arrowUp ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {delta}
          </span>
        ) : (
          <span />
        )}
        {hint && <span className="text-[11px] text-ink-500">{hint}</span>}
      </div>
    </div>
  );
}

export function Pill({
  children,
  tone = "ink",
  className,
}: {
  children: ReactNode;
  tone?: "ink" | "brand" | "good" | "warn" | "bad";
  className?: string;
}) {
  const map = {
    ink: "bg-ink-100 text-ink-700 ring-ink-200",
    brand: "bg-brand-50 text-brand-700 ring-brand-100",
    good: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    warn: "bg-amber-50 text-amber-700 ring-amber-100",
    bad: "bg-rose-50 text-rose-700 ring-rose-100",
  } as const;
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full text-[11px] font-medium px-2 py-0.5 ring-1 ring-inset",
        map[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Bar({
  value,
  max = 100,
  tone = "brand",
  className,
}: {
  value: number;
  max?: number;
  tone?: "brand" | "good" | "warn" | "bad" | "ink";
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const map = {
    brand: "bg-brand-500",
    good: "bg-emerald-500",
    warn: "bg-amber-500",
    bad: "bg-rose-500",
    ink: "bg-ink-500",
  } as const;
  return (
    <div className={clsx("h-1.5 w-full rounded-full bg-ink-100", className)}>
      <div
        className={clsx("h-full rounded-full", map[tone])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  desc,
  right,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-3">
      <div>
        {eyebrow && (
          <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-700">
            {eyebrow}
          </div>
        )}
        <h2 className="text-base font-semibold text-ink-900 tracking-tight">
          {title}
        </h2>
        {desc && <p className="text-xs text-ink-500 mt-0.5">{desc}</p>}
      </div>
      {right}
    </div>
  );
}
