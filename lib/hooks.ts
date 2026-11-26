"use client";

import { useEffect, useState } from "react";

/** Generic media-query hook with live updates. */
export function useMediaQuery(query: string, fallback = false) {
  const [matches, setMatches] = useState(fallback);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Motion preference straight from the OS. */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * Coarse device-power heuristic. Deliberately conservative: when in doubt we
 * render the light experience, because a stable 30fps beats a janky 60.
 */
export function useIsLowPower() {
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 768px)").matches;

    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };

    const weakCpu = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
    const lowRam = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
    const saveData = nav.connection?.saveData === true;

    setLowPower(reduced || saveData || (coarse && (narrow || weakCpu || lowRam)));
  }, []);

  return lowPower;
}

/** Live clock for the footer, formatted in the visitor's locale. */
export function useLocalTime(timeZone = "Asia/Kolkata") {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());

    setTime(format());
    const id = window.setInterval(() => setTime(format()), 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}

/** Reads the theme set by the bootstrap script and stays in sync on toggle. */
export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const root = document.documentElement;
    const read = () =>
      setTheme(root.dataset.theme === "light" ? "light" : "dark");
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return theme;
}
