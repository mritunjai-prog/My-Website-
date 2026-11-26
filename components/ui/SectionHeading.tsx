import { SplitText } from "./SplitText";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

/** Shared section header: index rail, oversized display title, short lead. */
export function SectionHeading({
  index,
  label,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <header className={cn("w-full", className)}>
      <div
        className={cn(
          "flex items-center gap-4 pb-6",
          align === "center" && "justify-center",
        )}
      >
        <span className="eyebrow text-accent">{index}</span>
        <span className="h-px w-10 bg-line" />
        <span className="eyebrow">{label}</span>
      </div>

      <SplitText
        as="h2"
        text={title}
        mode="words"
        trigger="scroll"
        stagger={0.05}
        className={cn(
          "font-display text-clamp-display leading-[0.95] tracking-tighter text-fg",
          align === "center" && "text-center",
        )}
      />

      {description ? (
        <p
          className={cn(
            "mt-6 max-w-xl text-[0.95rem] leading-relaxed text-muted",
            align === "center" && "mx-auto text-center",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
