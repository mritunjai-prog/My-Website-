"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Two-part custom cursor.
 * - A crisp dot that tracks the pointer.
 * - A lagging ring that grows / labels itself based on `data-cursor`.
 * Only enabled for fine pointers; the native cursor is restored on touch.
 */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.35 });

  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<"default" | "grow" | "view">("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.dataset.cursor = "on";

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor]",
      );
      const next = (target?.dataset.cursor as typeof variant) ?? "default";
      setVariant(next);
      setLabel(target?.dataset.cursorLabel ?? "");
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setVariant((v) => (v === "view" ? v : "grow"));
    const onUp = () => {
      const target = document
        .elementFromPoint(x.get(), y.get())
        ?.closest<HTMLElement>("[data-cursor]");
      setVariant((target?.dataset.cursor as typeof variant) ?? "default");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      delete document.documentElement.dataset.cursor;
    };
  }, [x, y]);

  if (!enabled) return null;

  const isView = variant === "view";
  const isGrow = variant === "grow";

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[85]">
      <motion.span
        className="absolute h-1.5 w-1.5 rounded-full bg-fg"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
        animate={{ opacity: visible && !isView ? 1 : 0, scale: isGrow ? 0.4 : 1 }}
        transition={{ duration: 0.2 }}
      />

      <motion.span
        className="absolute flex items-center justify-center rounded-full border border-fg/70 backdrop-blur-[1px]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: isView ? "normal" : "difference",
        }}
        animate={{
          width: isView ? 84 : isGrow ? 52 : 34,
          height: isView ? 84 : isGrow ? 52 : 34,
          opacity: visible ? 1 : 0,
          borderWidth: isView ? 0 : 1,
          backgroundColor: isView ? "var(--acid)" : "rgba(255,255,255,0)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        {isView && (
          <span
            className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--acid-ink)" }}
          >
            {label || "View"}
          </span>
        )}
      </motion.span>
    </div>
  );
}
