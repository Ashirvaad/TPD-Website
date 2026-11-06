"use client";

import { useRef, useState } from "react";
import type { PricingCategory } from "@/types";
import { PricingCard } from "./PricingCard";

/** Accessible tabs (arrow keys, Home/End) for pricing categories. */
export function PricingTabs({ categories }: { categories: PricingCategory[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    const n = (i + categories.length) % categories.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  const current = categories[active]!;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Pricing categories"
        className="flex gap-2 overflow-x-auto pb-2"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") focusTab(active + 1);
          else if (e.key === "ArrowLeft") focusTab(active - 1);
          else if (e.key === "Home") focusTab(0);
          else if (e.key === "End") focusTab(categories.length - 1);
          else return;
          e.preventDefault();
        }}
      >
        {categories.map((c, i) => (
          <button
            key={c.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            id={`tab-${c.id}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`panel-${c.id}`}
            tabIndex={i === active ? 0 : -1}
            className="chip shrink-0"
            onClick={() => setActive(i)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div id={`panel-${current.id}`} role="tabpanel" aria-labelledby={`tab-${current.id}`} tabIndex={0} className="mt-10 outline-none">
        <p className="mb-10 max-w-xl text-muted">{current.intro}</p>
        <div key={current.id} className="grid gap-6 lg:grid-cols-3">
          {current.packages.map((p, i) => (
            <div key={p.id} className="animate-[fadeUp_.6s_var(--ease-out)_both]" style={{ animationDelay: `${i * 70}ms` }}>
              <PricingCard pkg={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
