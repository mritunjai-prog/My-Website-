"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { orbitSkills, skillGroups, skillCount } from "@/content/skills";
import { cn } from "@/lib/utils";

const RADIUS = 168;

/**
 * Round to 0.001px. Trig results can differ in the last float digit between
 * the Node SSR pass and the browser, which would otherwise produce a
 * hydration mismatch on the inline `--x/--y/--z` custom properties.
 */
const snap = (value: number) => Math.round(value * 1000) / 1000;

/** Fibonacci-sphere distribution keeps the nodes evenly spaced. */
function spherePoints(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    return {
      x: snap(Math.cos(theta) * Math.sin(phi) * RADIUS),
      y: snap(Math.cos(phi) * RADIUS),
      z: snap(Math.sin(theta) * Math.sin(phi) * RADIUS),
    };
  });
}

export function Stack() {
  const [active, setActive] = useState<string>("all");
  const [motionOn, setMotionOn] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const rotation = useRef({ x: -12, y: 0 });
  const target = useRef({ x: -12, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const activeGroup = skillGroups.find((group) => group.id === active);

  const nodes = useMemo(() => {
    if (activeGroup) return activeGroup.skills.slice(0, 20);
    return [...orbitSkills].slice(0, 20);
  }, [activeGroup]);

  const points = useMemo(() => spherePoints(nodes.length), [nodes.length]);

  useEffect(() => {
    setMotionOn(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Single rAF loop drives rotation + depth cues without re-rendering React.
  useEffect(() => {
    const sphere = sphereRef.current;
    if (!sphere) return;

    const elements = Array.from(
      sphere.querySelectorAll<HTMLElement>(".orbit-node"),
    );

    let raf = 0;

    const render = () => {
      if (motionOn && !dragging.current) {
        target.current.y += 0.16;
      }
      rotation.current.y += (target.current.y - rotation.current.y) * 0.07;
      rotation.current.x += (target.current.x - rotation.current.x) * 0.07;

      sphere.style.setProperty("--ry", `${rotation.current.y}deg`);
      sphere.style.setProperty("--rx", `${rotation.current.x}deg`);

      const ry = (rotation.current.y * Math.PI) / 180;
      const rx = (rotation.current.x * Math.PI) / 180;

      elements.forEach((el, index) => {
        const point = points[index];
        if (!point) return;

        // Mirror the CSS transform order: rotateY then rotateX.
        const x1 = point.x * Math.cos(ry) + point.z * Math.sin(ry);
        const z1 = -point.x * Math.sin(ry) + point.z * Math.cos(ry);
        const z2 = point.y * Math.sin(rx) + z1 * Math.cos(rx);

        const depth = (z2 + RADIUS) / (2 * RADIUS); // 0 = back, 1 = front
        el.style.setProperty("--s", `${0.72 + depth * 0.38}`);
        el.style.setProperty("--o", `${0.18 + depth * 0.82}`);
        el.style.zIndex = `${Math.round(depth * 100)}`;
      });

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [motionOn, points, nodes]);

  const onPointerDown = (event: React.PointerEvent) => {
    dragging.current = true;
    last.current = { x: event.clientX, y: event.clientY };
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = event.clientX - last.current.x;
    const dy = event.clientY - last.current.y;
    last.current = { x: event.clientX, y: event.clientY };
    target.current.y += dx * 0.35;
    target.current.x = Math.max(
      -58,
      Math.min(58, target.current.x - dy * 0.3),
    );
  };

  const endDrag = () => {
    dragging.current = false;
  };

  return (
    <section id="stack" className="relative border-b border-line py-24 md:py-36">
      <div className="shell">
        <SectionHeading
          index="03"
          label="Stack"
          title={"From raw text\nto shipped API."}
          description={`${skillCount} tools I use, grouped by where they sit in the pipeline. Drag the cloud around.`}
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Orbit */}
          <div
            ref={stageRef}
            className="orbit-stage relative mx-auto flex aspect-square w-full max-w-[460px] select-none items-center justify-center"
            style={{ touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            data-cursor={motionOn ? "grow" : undefined}
            aria-hidden="true"
          >
            <div
              className="absolute inset-[12%] rounded-full border border-line/60"
              style={{ transform: "rotateX(72deg)" }}
            />
            <div
              className="absolute inset-[4%] rounded-full border border-dashed border-line/40"
              style={{ transform: "rotateX(72deg)" }}
            />

            <div ref={sphereRef} className="orbit-sphere h-1 w-1">
              {nodes.map((skill, index) => (
                <span
                  key={`${active}-${skill}`}
                  className={cn(
                    "orbit-node whitespace-nowrap rounded-full border px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.12em] backdrop-blur-sm",
                    index % 7 === 0
                      ? "border-acid/40 bg-acid/10 text-acid"
                      : "border-line bg-panel/70 text-fg/80",
                  )}
                  style={{
                    ["--x" as string]: `${points[index]?.x ?? 0}px`,
                    ["--y" as string]: `${points[index]?.y ?? 0}px`,
                    ["--z" as string]: `${points[index]?.z ?? 0}px`,
                    opacity: "var(--o, 1)",
                    scale: "var(--s, 1)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="pointer-events-none absolute flex flex-col items-center">
              <span className="font-display text-4xl tracking-tighter">
                {activeGroup ? activeGroup.skills.length : skillCount}
                <span className="text-accent">+</span>
              </span>
              <span className="eyebrow mt-1 text-fg/60">
                {activeGroup ? activeGroup.label : "tools"}
              </span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActive("all")}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs transition-colors",
                  active === "all"
                    ? "border-acid bg-acid text-acid-ink"
                    : "border-line text-muted hover:border-fg/40 hover:text-fg",
                )}
              >
                All
              </button>
              {skillGroups.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActive(group.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs transition-colors",
                    active === group.id
                      ? "border-acid bg-acid text-acid-ink"
                      : "border-line text-muted hover:border-fg/40 hover:text-fg",
                  )}
                >
                  {group.label}
                </button>
              ))}
            </div>

            <Reveal className="mt-8 border-t border-line" stagger={0.06}>
              {skillGroups.map((group) => {
                const isOpen = expanded === group.id;
                return (
                  <div key={group.id} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded(isOpen ? null : group.id)
                      }
                      aria-expanded={isOpen}
                      className="group flex w-full items-center justify-between gap-4 py-4 text-left"
                    >
                      <span className="flex items-baseline gap-3">
                        <span
                          className={cn(
                            "font-display text-lg tracking-tight transition-colors md:text-xl",
                            isOpen ? "text-accent" : "text-fg",
                          )}
                        >
                          {group.label}
                        </span>
                        <span className="hidden text-[0.7rem] uppercase tracking-[0.12em] text-muted sm:inline">
                          {group.caption}
                        </span>
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="text-[0.7rem] tabular-nums text-muted">
                          {String(group.skills.length).padStart(2, "0")}
                        </span>
                        <Plus
                          size={14}
                          className={cn(
                            "text-muted transition-transform duration-300",
                            isOpen && "rotate-45 text-accent",
                          )}
                        />
                      </span>
                    </button>

                    <div
                      className={cn(
                        "grid transition-all duration-500 ease-out-expo",
                        isOpen
                          ? "grid-rows-[1fr] pb-5 opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-wrap gap-2">
                          {group.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-sm border border-line bg-panel/60 px-2.5 py-1.5 text-xs text-fg/80"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
