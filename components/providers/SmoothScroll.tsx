"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

type ScrollAPI = {
  scrollTo: (target: string | number, offset?: number) => void;
  stop: () => void;
  start: () => void;
};

const ScrollContext = createContext<ScrollAPI | null>(null);

/** Access Lenis from anywhere (nav links, CTA buttons, preloader). */
export function useSmoothScroll() {
  const ctx = useContext(ScrollContext);
  // Graceful no-op on SSR / when smooth scrolling is disabled.
  return (
    ctx ?? {
      scrollTo: (target: string | number) => {
        if (typeof document === "undefined") return;
        if (typeof target === "number") window.scrollTo({ top: target });
        else document.querySelector(target)?.scrollIntoView();
      },
      stop: () => undefined,
      start: () => undefined,
    }
  );
}

/**
 * Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger and the
 * lerp stay in lockstep. Disabled entirely for reduced-motion users.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    registerGsap();
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string | number, offset = -64) => {
    // Anchors only exist on the home page. From a case study, go home.
    if (typeof target === "string" && !document.querySelector(target)) {
      if (window.location.pathname !== "/") {
        window.location.href = `/${target}`;
      }
      return;
    }

    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.4 });
      return;
    }

    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
      return;
    }
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  return (
    <ScrollContext.Provider value={{ scrollTo, stop, start }}>
      {children}
    </ScrollContext.Provider>
  );
}
