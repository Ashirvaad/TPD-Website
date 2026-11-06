"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/types";
import { cn } from "@/lib/utils";

/** Accessible accordion (button + region, aria-expanded/controls). */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();

  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const expanded = open === i;
        const btn = `${base}-q-${i}`;
        const panel = `${base}-a-${i}`;
        return (
          <li key={item.q}>
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={expanded}
                aria-controls={panel}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg transition-colors hover:text-accent"
              >
                <span>{item.q}</span>
                <Plus
                  size={18}
                  aria-hidden
                  className={cn("shrink-0 transition-transform duration-500", expanded && "rotate-45 text-accent")}
                />
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              aria-labelledby={btn}
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out)]",
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden" inert={!expanded}>
                <p className="max-w-2xl pb-6 text-muted">
                  {item.a}
                  {item.pending && process.env.NODE_ENV !== "production" && (
                    <span className="ml-2 text-xs text-subtle">[awaiting confirmation]</span>
                  )}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
