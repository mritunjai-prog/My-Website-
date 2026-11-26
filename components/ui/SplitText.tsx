"use client";

import {
  createElement,
  useEffect,
  useRef,
  type ElementType,
} from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type SplitTextProps = {
  /** Use \n to force a line break. */
  text: string;
  as?: ElementType;
  mode?: "chars" | "words";
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** Wait for the preloader to finish before revealing. */
  waitForReady?: boolean;
  trigger?: "mount" | "scroll";
};

/**
 * Masked, staggered text reveal.
 * Each line lives inside an overflow-hidden mask; chars/words slide up into
 * place with GSAP. The visible copy is hidden from assistive tech and a single
 * screen-reader string is exposed instead.
 */
export function SplitText({
  text,
  as = "span",
  mode = "chars",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.018,
  waitForReady = false,
  trigger = "mount",
}: SplitTextProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const lines = text.split("\n");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = root.querySelectorAll<HTMLElement>(".split-item");

    if (reduced) {
      gsap.set(targets, { yPercent: 0, opacity: 1, rotate: 0 });
      return;
    }

    registerGsap();
    const ctx = gsap.context(() => {
      const play = () => {
        gsap.fromTo(
          targets,
          { yPercent: 118, rotate: 4, opacity: 0 },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: 1.05,
            delay,
            stagger,
            ease: "expo.out",
            ...(trigger === "scroll"
              ? {
                  scrollTrigger: {
                    trigger: root,
                    start: "top 88%",
                    once: true,
                  },
                }
              : {}),
          },
        );
      };

      const ready = document.documentElement.dataset.ready === "true";
      if (!waitForReady || ready) {
        play();
        return;
      }

      // Hold the reveal until the preloader signals the site is ready.
      gsap.set(targets, { yPercent: 118, opacity: 0 });
      let played = false;
      const onReady = () => {
        if (played) return;
        played = true;
        play();
      };
      window.addEventListener("app:ready", onReady, { once: true });
      const safety = window.setTimeout(onReady, 3200);

      return () => {
        window.removeEventListener("app:ready", onReady);
        window.clearTimeout(safety);
      };
    }, root);

    return () => ctx.revert();
  }, [delay, stagger, trigger, waitForReady, text, mode]);

  const content = lines.map((line, lineIndex) => (
    <span
      key={`${line}-${lineIndex}`}
      className={cn("line-mask", lineClassName)}
      aria-hidden="true"
    >
      {mode === "chars"
        ? Array.from(line).map((char, charIndex) => (
            <span className="split-item char" key={charIndex}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))
        : line.split(" ").map((word, wordIndex) => (
            <span className="split-item word" key={wordIndex}>
              {word}&nbsp;
            </span>
          ))}
    </span>
  ));

  return createElement(
    as,
    { ref: rootRef, className },
    <span className="sr-only">{text.replace(/\n/g, " ")}</span>,
    content,
  );
}
