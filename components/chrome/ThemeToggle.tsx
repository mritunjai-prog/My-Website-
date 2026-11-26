"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

/**
 * Dark is the canonical experience; light is a considered inversion rather
 * than an afterthought. Preference is stored on <html data-theme> and in
 * localStorage (applied before paint by the inline script in the layout).
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as Theme) ?? "dark";
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("ms:theme", next);
    } catch {
      /* storage blocked — session-only theme */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      aria-pressed={theme === "light"}
      data-cursor="grow"
      className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg/70 transition-colors hover:border-fg/40 hover:text-fg"
    >
      {mounted ? (
        theme === "dark" ? (
          <Moon size={15} strokeWidth={1.6} />
        ) : (
          <Sun size={15} strokeWidth={1.6} />
        )
      ) : (
        <span className="h-[15px] w-[15px]" />
      )}
    </button>
  );
}
