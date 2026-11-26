"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  external?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
};

/**
 * Magnetic button: the element (and its label, slightly more) is pulled toward
 * the pointer, then springs back. Only active on fine pointers.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.28,
  href,
  onClick,
  ariaLabel,
  external,
  disabled,
  type = "button",
}: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 });

  const handleMove = (event: React.PointerEvent) => {
    const el = ref.current;
    if (!el || event.pointerType === "touch") return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const common = {
    ref: ref as never,
    className: cn("relative inline-flex", className),
    style: { x: springX, y: springY },
    onPointerMove: handleMove,
    onPointerLeave: reset,
    onBlur: reset,
    "aria-label": ariaLabel,
    "data-cursor": "grow",
  };

  if (href) {
    return (
      <motion.a
        {...common}
        href={href}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...common} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </motion.button>
  );
}
