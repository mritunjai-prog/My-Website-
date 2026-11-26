"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ScrollTextProps = {
  text: string;
  className?: string;
  /** Words to tint with the accent colour. */
  highlight?: string[];
};

/**
 * Scroll-scrubbed reading effect: words lift from 18% to full opacity as the
 * paragraph crosses the viewport. A quiet, readable form of scroll storytelling.
 */
export function ScrollText({ text, className, highlight = [] }: ScrollTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el.querySelectorAll(".scrub-word"), { opacity: 1 });
      return;
    }

    registerGsap();
    const ctx = gsap.context(() => {
      gsap.to(el.querySelectorAll(".scrub-word"), {
        opacity: 1,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [text]);

  return (
    <p ref={ref} className={cn(className)}>
      {words.map((word, index) => {
        const clean = word.replace(/[^\w’']/g, "");
        const accented = highlight.includes(clean);
        return (
          <span
            key={`${word}-${index}`}
            className={cn(
              "scrub-word inline-block",
              accented && "font-serif italic text-accent",
            )}
            style={{ opacity: 0.18 }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </p>
  );
}
