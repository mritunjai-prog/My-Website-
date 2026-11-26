import type { Project } from "@/content/projects";
import { alpha, cn } from "@/lib/utils";

type ProjectVisualProps = {
  project: Project;
  className?: string;
  variant?: "thumb" | "hero";
  /** Show the project name inside the artwork. */
  labelled?: boolean;
};

/**
 * Generative project artwork — pure CSS (gradients, orbital rings, grid).
 * Zero image weight, zero layout shift, and it adapts to every accent colour.
 * This replaces screenshot mock-ups we do not have real source material for.
 */
export function ProjectVisual({
  project,
  className,
  variant = "thumb",
  labelled = true,
}: ProjectVisualProps) {
  const { accent, secondary, index, title, tags } = project;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-[#07080c]",
        variant === "hero" ? "aspect-[16/10]" : "aspect-[4/3]",
        className,
      )}
      aria-hidden="true"
    >
      {/* Base light field */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 90% at 18% 8%, ${alpha(accent, 0.42)} 0%, transparent 55%),
                       radial-gradient(100% 90% at 88% 95%, ${alpha(secondary, 0.5)} 0%, transparent 60%),
                       linear-gradient(160deg, #0a0c12 10%, #05060a 90%)`,
        }}
      />

      {/* Technical grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(90% 80% at 50% 50%, #000 20%, transparent 75%)",
        }}
      />

      {/* Orbital rings */}
      <div className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2">
        {[0.36, 0.56, 0.8].map((scale, i) => (
          <div
            key={scale}
            className="absolute left-1/2 top-1/2 rounded-full border"
            style={{
              width: `${scale * 100}%`,
              height: `${scale * 100}%`,
              transform: "translate(-50%, -50%)",
              borderColor: alpha(i === 1 ? secondary : accent, 0.22),
            }}
          />
        ))}
        <div
          className="absolute left-1/2 top-1/2 h-[36%] w-[36%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle, ${alpha(accent, 0.9)} 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ animation: "spin 18s linear infinite" }}
        >
          <span
            className="absolute left-1/2 top-[7%] h-1.5 w-1.5 rounded-full"
            style={{
              background: accent,
              boxShadow: `0 0 20px 5px ${alpha(accent, 0.5)}`,
            }}
          />
        </div>
      </div>

      {/* Corner registration marks */}
      {[
        "left-4 top-4 border-l border-t",
        "right-4 top-4 border-r border-t",
        "left-4 bottom-4 border-b border-l",
        "right-4 bottom-4 border-b border-r",
      ].map((pos) => (
        <span
          key={pos}
          className={cn("absolute h-3 w-3 opacity-50", pos)}
          style={{ borderColor: accent }}
        />
      ))}

      {/* Index numeral */}
      <span
        className={cn(
          "absolute font-display leading-none tracking-tighter",
          variant === "hero"
            ? "-bottom-8 right-2 text-[11rem] md:text-[17rem]"
            : "-bottom-4 -right-1 text-[6.5rem]",
        )}
        style={{
          color: "transparent",
          WebkitTextStroke: `1px ${alpha(accent, 0.5)}`,
        }}
      >
        {index}
      </span>

      {labelled && (
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 md:inset-x-5 md:bottom-5">
          <div>
            <p
              className="eyebrow mb-1"
              style={{ color: alpha(accent, 0.95) }}
            >
              {project.year}
            </p>
            <p
              className={cn(
                "font-display tracking-tighter text-white",
                variant === "hero" ? "text-2xl md:text-4xl" : "text-lg",
              )}
            >
              {title}
            </p>
          </div>
          <div className="hidden max-w-[45%] flex-wrap justify-end gap-1 md:flex">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
