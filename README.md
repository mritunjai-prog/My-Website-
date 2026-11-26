# Mritunjai Singh · Portfolio 2026

An immersive, scroll-driven portfolio for an AI/ML engineer. Obsidian base, acid-lime signal, a WebGL core that reacts to the pointer, and typography that does the heavy lifting.

**Live:** https://my-website-pearl-gamma.vercel.app

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS 3 + CSS design tokens |
| 3D | Three.js via React Three Fiber + custom GLSL + `@react-three/postprocessing` (bloom, chromatic aberration, grain, vignette) |
| Scroll | Lenis + GSAP ScrollTrigger |
| UI motion | Framer Motion |
| Type | Space Grotesk · Inter · Instrument Serif (self-hosted via Fontsource, so no Google Fonts request) |
| Email | Resend REST API via a Next route handler, with a `mailto:` fallback |

---

## What is in here

- **Signal core hero**: a shader-displaced icosahedron, particle field, wireframe cage and orbital rings; camera responds to pointer and scroll.
- **Scroll choreography**: masked split-text reveals, scrubbed word-by-word manifesto, timeline spine that draws itself, magnetic buttons, page transitions.
- **Experience + project index**: the Xebia product internship, leadership timeline, and oversized project rows with a pointer-following generative preview and 3D tilt. Each project has a case-study route at `/projects/[slug]`.
- **3D skill cloud**: a draggable CSS-3D orbit of 22 technologies with live depth cues, plus filterable category rails.
- **Contact**: validated form, `mailto:` fallback, live IST clock, magnetic CTA.
- **Chrome**: preloader with counter, custom cursor, grain overlay, scroll progress, dark default with a light theme.
- **Graceful degradation**: no WebGL → CSS hero; low-power/mobile → lighter visuals; `prefers-reduced-motion` → all choreography disabled, content shown.
- **SEO**: metadata, Open Graph image generated at build time, `Person` JSON-LD, sitemap, robots.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # TypeScript, no emit
npm run build      # production build
npm start          # serve the production build
```

Node 20.9+ is required (Next 16).

---

## Project structure

```
app/
  layout.tsx                 # shell: fonts, theme bootstrap, nav, footer, JSON-LD
  page.tsx                   # home: composes the sections
  template.tsx               # route transition
  globals.css                # design tokens, base, utilities, orbit + cursor CSS
  opengraph-image.tsx        # build-time OG card (Satori + local TTFs)
  projects/[slug]/page.tsx   # case studies (static params, per-project metadata)
  api/contact/route.ts       # contact form → Resend / mailto fallback
  sitemap.ts · robots.ts · not-found.tsx
components/
  three/                     # HeroScene (R3F) + GLSL + static fallback
  sections/                  # Hero, Work, About, Stack, Journey, Contact, Footer
  ui/                        # SplitText, Reveal, ScrollText, MagneticButton, TiltCard…
  chrome/                    # Preloader, CustomCursor, ThemeToggle, ScrollProgress
  nav/Nav.tsx
  providers/SmoothScroll.tsx # Lenis ⇄ GSAP ticker via context
content/                     # ← all the real content lives here
  site.ts · projects.ts · skills.ts · experience.ts
lib/                         # cn/alpha, hooks, gsap registration
public/                      # profile.jpg, CV pdf, favicon, OG fonts
```

---

## Editing content

Everything factual is centralised in `content/`:

| File | Contents |
| --- | --- |
| `content/site.ts` | Name, role, bio, email, phone, location, socials, résumé path, stats, education, certifications, principles |
| `content/projects.ts` | Seven projects (three from the latest résumé, four earlier builds): summary, highlights, stack, GitHub / live URLs, accent colours |
| `content/skills.ts` | Skill groups and the 22 nodes in the orbit |
| `content/experience.ts` | Xebia internship, leadership & recognition timeline, marquee strings |

Adding a project only needs an entry in `projects.ts`. The home index, case-study route, static params, sitemap and next-project link all derive from it.

### Project covers (optional)

Case studies no longer use a giant placeholder graphic. They show a project-at-a-glance panel by default. Drop real screenshots in and they take over automatically:

1. Save a screenshot as `public/projects/<slug>.jpg` (for example `public/projects/documind.jpg`).
2. Add it to the project entry in `content/projects.ts`:

```ts
cover: "/projects/documind.jpg",
coverAlt: "DocuMind document dashboard",
```

The same image is then used on the work index previews. Use 16:9 screenshots at ~1600px wide.

To swap the résumé: replace `public/Mritunjai_Singh_CV.pdf` (keep the filename, or update `site.resume`). The current file is the latest 2-page edition (`Mritunjai_Singh_Python_DS_AIML.pdf`), also kept at the repo root for reference.

---

## Contact form

`POST /api/contact` validates input, drops honeypot submissions, applies a light in-memory rate limit and then:

1. **If `RESEND_API_KEY` is set** → sends a formatted email to `CONTACT_TO_EMAIL` with `reply_to` set to the visitor.
2. **If not** → returns `{ mode: "mailto" }` and the client opens a pre-filled email draft. The form is never a dead end.

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=mritunjaisinghwork@gmail.com
CONTACT_FROM_EMAIL="Mritunjai Portfolio <hello@your-verified-domain.com>"
```

> Resend requires a verified sending domain. Until then the sandbox sender can only deliver to the account owner.

---

## Performance & accessibility decisions

- The 3D bundle (three + postprocessing) is dynamically imported client-side; the hero renders a CSS artwork during load and for weak devices.
- Canvas DPR is capped at 1.7 with `antialias: false`; geometry, particles and materials are memoised.
- The 3D scene only renders in dark mode and on capable devices. Light mode and mobile use the static artwork, keeping 60fps achievable.
- Fonts are self-hosted with `font-display: swap`, so there is no render-blocking third-party request.
- `prefers-reduced-motion` disables Lenis, GSAP timelines, the preloader, marquees and orbit rotation.
- Semantic landmarks, visible focus styles, skip link, labelled inputs, `aria-live` form status, decorative artwork hidden from AT, colour tokens chosen for AA contrast in both themes.

If you need to shave more: replace `EffectComposer` in `components/three/HeroScene.tsx` with just `<Bloom />`, or lower `particles` in `<Scene />`.

---

## Deploy to Vercel

1. Push the repo to GitHub (branch `arena/ecc969b1-my-website` is the current working branch).
2. In Vercel: **Add New → Project → import the repo**. Framework is auto-detected as Next.js; no custom build settings needed.
3. Add environment variables from `.env.example` (at minimum `NEXT_PUBLIC_SITE_URL` once the domain is known).
4. Deploy. Then point your domain in **Settings → Domains** and update `NEXT_PUBLIC_SITE_URL` to the final URL so metadata, sitemap and the OG image stay consistent.
5. Optional CLI:

```bash
npm i -g vercel
vercel --prod
```

The old Express/Supabase backend and the Vite build were removed with this redesign; both remain recoverable from commit `678cc9d`.

---

## Licence

MIT. See [LICENSE](LICENSE). Content and photography belong to Mritunjai Singh.
