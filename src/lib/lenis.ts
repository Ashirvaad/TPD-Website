import type Lenis from "lenis";

/**
 * Module-level handle to the single Lenis instance created by <SmoothScroll />.
 * Other components use these helpers instead of creating their own scroll logic.
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

export function stopScroll() {
  instance?.stop();
  document.documentElement.classList.add("scroll-locked");
}

export function startScroll() {
  instance?.start();
  document.documentElement.classList.remove("scroll-locked");
}

export function scrollToTop(immediate = true) {
  if (instance) instance.scrollTo(0, { immediate, force: true });
  else window.scrollTo(0, 0);
}
