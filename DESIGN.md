# Design system — “Signal in the Void”

A quiet, cinematic portfolio for an AI/ML engineer. The 3D scene is a signal trying to resolve out of darkness; the typography is the instrument that reads it.

---

## 1 · Content audit (step 1)

Extracted from `Mritunjai_Singh_Python_DS_AIML.pdf` (latest, 2 pages) and the previous résumé/site. Everything on the site maps back to these facts.

**Identity** — Mritunjai Singh, AI/ML Engineer | Python Developer | Data Scientist (GenAI · RAG · CV · NLP). Hyderabad, India. mritunjaisinghwork@gmail.com · +91 9347147615. GitHub `mritunjai-prog`, LinkedIn `mritunjai-prog`. Latest CV served at `/Mritunjai_Singh_CV.pdf`.

**Work experience** — Product Intern, Xebia (Jun 2026 – Jul 2026): 3+ products including a React Native app and an enterprise LMS; led a 6-member team. Stack: React, React Native, JavaScript, Java, Spring Boot, PostgreSQL.

**Education** — B.Tech CSE (Minor: AI/ML), Sir Padampat Singhania University (Udaipur), Jul 2023 – Apr 2027, CGPA 8.5/10. Focus: DSA, data visualisation, AI/ML, OS.

**Projects (7)** — KnowFlow, DocuMind and MentorAid from the latest résumé (92% extraction, 19 models on 9,424 records / 84% accuracy), plus earlier builds StratosAI, DocentDesk, KolamCraft and Amphitheatre. Copy, metrics and URLs unchanged from the CV / live repos.

**Leadership & recognition (3)** — General Secretary (Student Council, SPSU 2025–26, 25+ initiatives), Vice President (XeTech Club, Apr 2026 –, 1,000+ students engaged), Winner — Xebia Promptathon (Mar 2026).

**Certifications (6)** — Microsoft 365 & AI Administration, Azure Administrator, Azure SQL, Azure Fundamentals, Responsible Generative AI, NPTEL Elite Java.

**Skills** — Languages, Python backend, databases & retrieval, ML, data science, GenAI/NLP, tools — 48 entries total, all sourced.

**Removed with the old build** — the unlinked Supabase blog, `/login`, and the Express API (its contact-form behaviour is now a Next route handler). Legacy URLs redirect to `/`.

---

## 2 · Concept

> The hero is a live model: a luminous, breathing core suspended in a particle field, rendered through bloom, chromatic aberration and film grain. Scroll pushes the camera back; the interface resolves around it. Nothing decorative — every motion explains hierarchy or state.

- **Mood:** cinematic, nocturnal, editorial. Science-lab instrument rather than “tech startup gradient”.
- **Signature:** an oversized, masked type reveal over a genuinely reactive WebGL object, with technical micro-details (coordinates, indexes, monospace-ish eyebrows) keeping it grounded.
- **Voice:** first person, specific, no superlatives that cannot be defended.

---

## 3 · Palette

| Token | Dark (default) | Light | Use |
| --- | --- | --- | --- |
| `--bg` | `#05060A` | `#EFECE4` | Page void / bone |
| `--panel` | `#0D1017` | `#F8F6F0` | Cards, form |
| `--fg` | `#F2F2EC` | `#0A0B0D` | Primary text |
| `--muted` | `#8E908C` | `#57595C` | Secondary text |
| `--line` | white 12% | black 14% | Hairlines |
| `--acid` | `#D9FF3F` | `#D9FF3F` | Signal / accents / CTA |
| `--accent-text` | `#D9FF3F` | `#4D6200` | Accent text (contrast-safe) |
| `--iris` | `#8B6CFF` | `#5B3CE0` | Counterpoint, glow |
| `--cyan` | `#5EE7FF` | `#007D95` | Rare highlight |

Project artwork carries its own accent (lime, iris, cyan, orange, pink, green) so the index reads as a family, not a rainbow.

## 4 · Typography

- **Display — Space Grotesk.** Tight tracking (−0.06em), used at 10vw for the name and section titles. Technical, slightly quirky, not a default.
- **Body — Inter.** 14–16px, generous leading, muted colour.
- **Accent — Instrument Serif italic.** One-line interventions (“that thinks.”, the hero quote, accented words in the manifesto). Gives the engineer’s portfolio an editorial voice.
- Scale: hero `clamp(3.1rem, 10.5vw, 9.5rem)`; section titles `clamp(2.5rem, 6vw, 5.5rem)`; eyebrow `11px / 0.22em tracking / uppercase`.

---

## 5 · Section-by-section choreography

| # | Section | Motion |
| --- | --- | --- |
| 00 | **Preloader** | 000→100 counter, decelerating ease, hairline progress; curtain wipes upward and dispatches `app:ready`, releasing the hero's masked type. Skippable by click/key; skipped on repeat visits and for reduced motion. |
| 01 | **Hero** | Shader core + 1,300-particle field + wireframe cage. Pointer parallax on camera and core; scroll rotates and recedes. Name splits into characters and rises out of overflow masks, second line in outline stroke. Ticker underneath. |
| 02 | **Work** | Oversized index rows. Hover/focus: floating generative preview springs toward the cursor, row titles shift to acid, siblings dim. Click → route transition into the case study. Mobile gets inline artwork. |
| 03 | **About** | Scroll-scrubbed manifesto (words rise 18% → 100% opacity). Portrait has a slow parallax and duotone-to-colour hover. Stats grid and principle rows stagger in. |
| 04 | **Stack** | Draggable CSS-3D sphere of 22 technologies: Fibonacci distribution, per-node depth opacity/scale, auto-rotation that pauses on drag. Category filters rebuild the sphere; rows expand with grid-row transitions. |
| 05 | **Journey** | Work-experience card for the Xebia internship, then a timeline spine that draws itself with scroll (scaleY scrub); leadership, education and certification blocks reveal in sequence. |
| 06 | **Contact** | Split-text headline, serif accent, magnetic submit, live IST clock, inline validation, `aria-live` status. |
| — | **Global** | Lenis smooth scroll driven by the GSAP ticker, ScrollTrigger on all reveals, custom two-part cursor with “View / Case study” states, grain overlay, 1px progress bar, theme flip. |

---

## 6 · Degradation ladder

1. **Full** — WebGL2, fine pointer, ≥4 cores, dark theme.
2. **Static hero** — no WebGL, mobile, `saveData`, ≤4GB RAM, light theme: CSS orb with gradients and rings (no JS frames).
3. **Reduced motion** — Lenis off, GSAP timelines resolved instantly, marquees and orbit frozen, preloader removed, content fully visible.
4. **No JS** — SSR HTML carries all copy and links; forms fall back to native validation.

---

## 7 · Performance budget

| Asset | Strategy |
| --- | --- |
| Three + postprocessing (~500 KB gz) | `next/dynamic`, `ssr: false`, mounted only when the 3D path is chosen |
| Fonts | Fontsource, self-hosted WOFF2, `swap`, unicode-range subsets |
| Portrait (828 KB) | `next/image` → AVIF/WebP, sized `40vw`, lazy |
| Project artwork | Pure CSS gradients/rings — no screenshots, no image weight, no CLS |
| Canvas | DPR ≤ 1.7, antialias off, memoised geometry, `dpr`/`gl` constrained |
| Scroll work | Single rAF loop for orbit, GSAP ticker owns Lenis, ScrollTriggers `once: true` |

---

## 8 · Accessibility

Skip link, focus-visible rings, semantic sections and headings, labelled form fields with `aria-live` status, `aria-expanded` on disclosures, alt text on the portrait, decorative art marked `aria-hidden`, contrast-checked accent tokens per theme, and no motion dependency for understanding content.
