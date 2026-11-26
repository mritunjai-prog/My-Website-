import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  separator?: string;
  duration?: number;
  reverse?: boolean;
};

/** CSS-only infinite marquee (pauses on hover, static under reduced motion). */
export function Marquee({
  items,
  className,
  separator = "✳",
  duration = 34,
  reverse,
}: MarqueeProps) {
  const content = (
    <div
      className="flex shrink-0 items-center gap-8 pr-8"
      aria-hidden="true"
    >
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center gap-8">
          <span className="whitespace-nowrap">{item}</span>
          <span className="text-accent/70 text-xs">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className="marquee-track"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {content}
        {content}
      </div>
    </div>
  );
}
