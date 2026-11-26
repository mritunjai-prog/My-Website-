"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Vertical travel in px. */
  y?: number;
  delay?: number;
  duration?: number;
  /** Stagger direct children instead of the wrapper itself. */
  stagger?: number;
  start?: string;
};

/**
 * Scroll-triggered fade/translate. Animation is skipped (content shown
 * immediately) when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  y = 26,
  delay = 0,
  duration = 0.9,
  stagger,
  start = "top 88%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    registerGsap();
    const targets = stagger ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger: stagger ?? 0,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration, stagger, start, y]);

  return (
    <div ref={ref} className={cn(className)} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
