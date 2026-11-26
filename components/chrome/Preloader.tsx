"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Boot sequence: a percentage counter against a curtain, then a wipe that
 * reveals the hero's masked type. Runs once per session, is skippable by
 * click/key, and is removed entirely for reduced-motion visitors.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("ms:visited") === "1";

    const finish = () => {
      setDone(true);
      document.documentElement.dataset.ready = "true";
      window.dispatchEvent(new Event("app:ready"));
      sessionStorage.setItem("ms:visited", "1");
      window.setTimeout(() => setVisible(false), 950);
    };

    if (reduced || seen) {
      document.documentElement.dataset.ready = "true";
      setVisible(false);
      window.dispatchEvent(new Event("app:ready"));
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    const duration = 1650;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out so the counter decelerates into 100
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    frame.current = requestAnimationFrame(tick);

    const skip = () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      finish();
    };
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      document.documentElement.style.overflow = "";
    };
  }, []);

  // Release scroll once the curtain starts lifting.
  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="preloader-curtain fixed inset-0 z-[80] flex flex-col justify-between bg-bg px-6 py-8 md:px-12 md:py-10"
          data-done={done}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          aria-hidden="true"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-acid font-display text-sm font-bold text-acid-ink">
                MS
              </span>
              <span className="eyebrow text-fg/70">Mritunjai Singh</span>
            </div>
            <span className="eyebrow hidden md:block">Portfolio — 2026</span>
          </div>

          <div className="flex items-baseline justify-between gap-6">
            <p className="max-w-md font-serif text-2xl italic leading-tight text-fg/80 md:text-4xl">
              calibrating the signal…
            </p>
            <div className="font-display text-[18vw] leading-none tracking-tighter text-fg md:text-[9rem]">
              {String(count).padStart(3, "0")}
            </div>
          </div>

          <div className="flex items-center justify-between gap-8">
            <div className="h-px flex-1 bg-line">
              <div
                className="h-px bg-acid transition-[width] duration-150"
                style={{ width: `${count}%` }}
              />
            </div>
            <span className="eyebrow whitespace-nowrap">
              AI/ML · GenAI · RAG
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
