import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/*
  Scroll suave propio (requestAnimationFrame). Nos da control total sobre la
  duración y el easing, y respeta prefers-reduced-motion.
*/
export function smoothScrollToY(targetY, duration = 600) {
  const startY = window.scrollY;
  const distance = Math.max(targetY, 0) - startY;
  if (Math.abs(distance) < 2) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    window.scrollTo({ top: Math.max(targetY, 0), behavior: 'instant' });
    return;
  }

  const start = performance.now();
  const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    window.scrollTo({ top: startY + distance * ease(p), behavior: 'instant' });
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* Desplaza a una sección por id dejando aire bajo el navbar flotante. */
export function scrollToSection(id, offset = 96) {
  const el = document.getElementById(id);
  if (!el) return;
  const targetY = el.getBoundingClientRect().top + window.scrollY - offset;
  smoothScrollToY(targetY);
}