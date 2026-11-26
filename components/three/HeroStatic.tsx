/**
 * Zero-WebGL hero visual.
 * Used as the dynamic-import placeholder, the low-power/mobile fallback and
 * the reduced-motion treatment. Pure CSS gradients + rings — no JS frames.
 */
export function HeroStatic({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[min(86vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] md:left-[66%]"
        style={{
          background:
            "radial-gradient(circle at 38% 32%, rgba(217,255,63,0.34), transparent 55%), radial-gradient(circle at 68% 72%, rgba(139,108,255,0.42), transparent 60%)",
        }}
      />

      <div className="absolute left-1/2 top-1/2 aspect-square w-[min(80vw,440px)] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] md:left-[66%]">
        <div className="absolute inset-0 animate-[spin_38s_linear_infinite] rounded-full border border-acid/25" />
        <div className="absolute inset-[12%] animate-[spin_26s_linear_infinite_reverse] rounded-full border border-iris/30" />
        <div className="absolute inset-[26%] rounded-full border border-acid/40" />
        <div
          className="absolute inset-[30%] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 34% 28%, rgba(217,255,63,0.9), rgba(139,108,255,0.85) 48%, rgba(94,231,255,0.55) 72%, rgba(7,8,12,0.9) 100%)",
            boxShadow:
              "0 0 80px rgba(139,108,255,0.35), inset 0 0 60px rgba(0,0,0,0.6)",
          }}
        />
        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-acid shadow-[0_0_18px_4px_rgba(217,255,63,0.6)]" />
      </div>
    </div>
  );
}
