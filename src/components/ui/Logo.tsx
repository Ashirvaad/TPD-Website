import { cn } from "@/lib/utils";

/** Vector rendering of The Purple Door "door-P" mark with a configurable wordmark. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 451 547" className={className} aria-hidden="true" focusable="false">
      <path
        d="M0 0H299C389 17 451 87 451 177C451 277 369 354 259 354H234V90H51L161 125V547L0 495Z"
        fill="currentColor"
      />
      <ellipse cx="130" cy="356" rx="14" ry="18" fill="none" stroke="var(--bg)" strokeWidth="3" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-8 w-auto text-[#8f6ad8]" />
      <span className="flex flex-col font-display leading-[0.85] tracking-wide">
        <span className="text-[0.8rem] uppercase">The Purple</span>
        <span className="text-[0.8rem] uppercase">Door</span>
      </span>
    </span>
  );
}
