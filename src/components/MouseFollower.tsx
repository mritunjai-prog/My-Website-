import { useEffect, useRef, useState } from "react";

export function MouseFollower() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const hoveringRef = useRef(false);
  const visibleRef = useRef(false);
  const cursorRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setEnabled(finePointer && !reducedMotion);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const setVisible = (visible: boolean) => {
      visibleRef.current = visible;
      if (dotRef.current) dotRef.current.style.opacity = visible ? "1" : "0";
      if (ringRef.current) ringRef.current.style.opacity = visible ? "1" : "0";
    };

    const setHovering = (hovering: boolean) => {
      hoveringRef.current = hovering;
      if (!ringRef.current) return;
      ringRef.current.style.width = hovering ? "34px" : "22px";
      ringRef.current.style.height = hovering ? "34px" : "22px";
    };

    const onMove = (event: MouseEvent) => {
      cursorRef.current.tx = event.clientX;
      cursorRef.current.ty = event.clientY;
      if (!visibleRef.current) setVisible(true);
    };

    const onWindowLeave = () => setVisible(false);
    const onWindowEnter = () => setVisible(true);

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const hitInteractive = target.closest(
        "a, button, [role='button'], input, textarea, select, label, .cursor-hover",
      );
      setHovering(Boolean(hitInteractive));
    };

    const animate = () => {
      const c = cursorRef.current;

      // Fast follow to keep the dot accurate and close to the native cursor.
      c.x += (c.tx - c.x) * 0.35;
      c.y += (c.ty - c.y) * 0.35;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${c.x - 4}px, ${c.y - 4}px, 0)`;
      }

      if (ringRef.current) {
        const radius = hoveringRef.current ? 17 : 11;
        ringRef.current.style.transform = `translate3d(${c.x - radius}px, ${c.y - radius}px, 0)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    setVisible(false);
    setHovering(false);
    frameRef.current = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseleave", onWindowLeave);
    window.addEventListener("mouseenter", onWindowEnter);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseleave", onWindowLeave);
      window.removeEventListener("mouseenter", onWindowEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[60] h-2 w-2 rounded-full bg-primary opacity-0 transition-opacity duration-150"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[59] h-[22px] w-[22px] rounded-full border border-primary/40 opacity-0 transition-[width,height,opacity] duration-150"
      />
    </>
  );
}
