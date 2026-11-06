"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { Logo } from "@/components/ui/Logo";
import { startScroll, stopScroll } from "@/lib/lenis";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Scroll lock, Escape, focus management and entrance animation for the mobile menu.
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    stopScroll();
    const focusables = () => Array.from(menu?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();

    if (menu && !prefersReducedMotion()) {
      gsap.fromTo(menu, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "expo.out" });
      gsap.fromTo(
        menu.querySelectorAll("[data-menu-item]"),
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.05, delay: 0.1, ease: "expo.out" },
      );
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        const els = focusables();
        const firstEl = els[0];
        const lastEl = els[els.length - 1];
        if (!firstEl || !lastEl) return;
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      startScroll();
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[var(--z-nav)] transition-[background-color,border-color,backdrop-filter] duration-500",
          "border-b bg-bg/85 backdrop-blur-xl",
          scrolled ? "border-line-soft" : "border-transparent",
        )}
      >
        <nav aria-label="Primary" className="container-x flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link href="/" aria-label={`${siteConfig.name} — home`} className="relative z-[1] shrink-0">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {siteConfig.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative px-3.5 py-2 text-[0.84rem] transition-colors duration-300",
                      active ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-500 ease-[var(--ease-out)]",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link href={siteConfig.hero.primaryCta.href} className="btn btn-primary btn-sm hidden sm:inline-flex">
              {siteConfig.hero.primaryCta.label}
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu size={18} aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[var(--z-menu)] flex flex-col overflow-y-auto bg-[#0e0b14] lg:hidden"
        >
          <div className="container-x flex h-[var(--nav-h)] shrink-0 items-center justify-between">
            <Link href="/" onClick={() => setOpen(false)} aria-label="Home">
              <Logo />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line"
              aria-label="Close menu"
            >
              <X size={18} aria-hidden />
            </button>
          </div>
          <ul className="container-x mt-6 flex flex-1 flex-col justify-center gap-1 pb-10">
            {[...siteConfig.nav, ...siteConfig.footerNav].map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <Link
                  data-menu-item
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-baseline gap-4 py-2 font-display text-[clamp(2.2rem,9vw,3.5rem)] leading-none",
                    isActive(item.href) ? "text-accent" : "text-fg",
                  )}
                >
                  <span className="font-sans text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="container-x pb-10">
            <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
              Start a Project <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
