# SQUAD Club Portal — Complete Kiro Handoff File

> This document is the single source of truth for continuing development.
> It was written to allow any developer (or Kiro session) to pick up exactly where work left off
> without needing any prior conversation history.
>
> Last updated: after Option C gradient theme applied.

---

## 1. Project Identity

| Field | Value |
|-------|-------|
| Club name | SQUAD |
| Full name | Departmental Club — Data Science, MLRIT |
| Primary audience | Parents attending Orientation Day (first priority) + club website for students/faculty |
| Contact email | squadmlrit@gmail.com |
| Instagram | https://www.instagram.com/squadmlrit |
| LinkedIn | https://www.linkedin.com/in/squadclub |
| GitHub repo | https://github.com/kolli-dhanush-reddy/squad-mlrit |
| Local folder | `squad-club-portal-final/` at workspace root |

---

## 2. Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 16.2.6 | Framework (App Router) |
| React | 19 | UI |
| TypeScript | 5.7.3 | Types |
| Tailwind CSS | v4.3.3 | Styling |
| Framer Motion | motion ^12.43.0 | All animations |
| shadcn / base-ui | latest | Button primitive |
| Vercel Analytics | 1.6.1 | Production analytics (already installed) |
| lucide-react | ^1.16.0 | Icons |

**Package manager:** npm (pnpm was used originally in V1/V2 but final project uses npm)
**Build command:** `npm run build`
**Dev command:** `npm run dev` → http://localhost:3000

---

## 3. Project Origin — What Was Merged

This project was built by merging two existing versions:

### V1 (`squad-club-portal/`)
- Multi-page routing with 7 routes
- All real content (event descriptions, team data, contact info)
- 4 events: CodeX, Unplugged, Outreach, Project Expo
- Events shown as modal popups when clicked
- Instagram + LinkedIn socials only
- Simpler splash screen (auto-dismiss timer, no animation)

### V2 (`squad-club-portal-main/squad-club-portal-main/`)
- Single-page app (not used — V1 routing kept)
- Much better splash screen with glyph-decode animation
- Better card animations, hover effects, glassmorphism
- 5 events (Traditional Day added — NOT included in final)
- More social links (GitHub, X — NOT included in final)

### Final version takes:
- V1's structure, routing, content, data
- V2's splash screen (heavily reworked — see Section 6)
- V2's animation style (applied to all V1 components)
- Custom theme (Option C gradient — see Section 7)

---

## 4. Complete File Structure

```
squad-club-portal-final/
│
├── app/                              ← Next.js App Router
│   ├── globals.css                   ← ALL theme variables + Tailwind imports + body gradient
│   ├── layout.tsx                    ← Root layout: fonts, metadata, CustomCursor, LayoutWrapper
│   ├── page.tsx                      ← / → renders HomeSection
│   ├── about/
│   │   └── page.tsx                  ← /about → renders AboutSection
│   ├── events/
│   │   └── page.tsx                  ← /events → renders EventsHub
│   ├── gallery/
│   │   └── page.tsx                  ← /gallery → renders GallerySection
│   ├── squad/
│   │   └── page.tsx                  ← /squad → renders SquadSection
│   ├── join/
│   │   └── page.tsx                  ← /join → static "Applications Closed" page (inline component)
│   └── contact/
│       └── page.tsx                  ← /contact → renders ContactPage
│
├── components/
│   ├── splash-screen.tsx             ← Glyph-decode animation, atom replaces A, auto-dismiss 3.8s
│   ├── layout-wrapper.tsx            ← Client component: manages showSplash state
│   ├── navbar.tsx                    ← Sticky nav, usePathname active state, Link routing, mobile menu
│   ├── footer.tsx                    ← Logo, nav links (Explore + More), social links, admin trigger
│   ├── custom-cursor.tsx             ← Spring-based dual cursor (ring + dot), desktop only
│   ├── admin-panel.tsx               ← Secret editor UI, password-protected, mockup only
│   ├── squad-logo.tsx                ← AtomMark SVG component + SquadWordmark component
│   ├── team-grid.tsx                 ← Grid of CORE_TEAM member cards (reads from lib/data.ts)
│   ├── gallery.tsx                   ← Masonry grid, triggers lightbox on click
│   ├── lightbox.tsx                  ← Full-screen image viewer, keyboard nav (arrow keys + esc)
│   ├── ui/
│   │   └── button.tsx                ← Base-UI button with CVA variants
│   └── pages/
│       ├── home-page.tsx             ← Hero + marquee + mission pillars + stats strip + what-we-do cards + CTA
│       ├── about-page.tsx            ← Mission/vision text + 3 pillar cards + impact stats grid
│       ├── events-hub.tsx            ← 4 event cards grid + EventModal (inline component)
│       ├── gallery-page.tsx          ← Page header + Gallery component using GALLERY_IMAGES
│       ├── squad-page.tsx            ← Page header + team member cards grid
│       └── contact-page.tsx          ← Contact form (not wired) + info row + social links
│
├── lib/
│   ├── data.ts                       ← SINGLE SOURCE OF TRUTH for all site content
│   └── utils.ts                      ← cn() helper (clsx + tailwind-merge)
│
├── public/
│   ├── squad-logo.png                ← Club logo
│   ├── placeholder.svg               ← Used everywhere real images are missing
│   ├── placeholder-user.jpg          ← Used for team member photos
│   └── [events/ and team/ folders]   ← THESE DON'T EXIST YET — add real photos here
│
├── KIRO_HANDOFF.md                   ← This file
├── package.json
├── next.config.mjs                   ← typescript.ignoreBuildErrors: true (intentional)
├── tsconfig.json
├── postcss.config.mjs
└── .gitignore
```

---

## 5. lib/data.ts — Full Data Reference

This is the only file you need to edit to update site content. Never hardcode content in components.

### SectionId type
```ts
type SectionId = "home" | "about" | "events" | "squad" | "gallery" | "contact"
```

### NAV_TABS
6 navigation items. Controls both the navbar and footer links.
```ts
[home, about, events, squad, gallery, contact]
```

### CORE_TEAM
8 members, all currently placeholder data.
```ts
type TeamMember = { id: number; name: string; role: string; avatar: string }
```
To update: change name/role values, set avatar to `/team/filename.webp`

### EVENTS
Record of 4 events. Key type: `"codex" | "unplugged" | "outreach" | "project-expo"`
```ts
type EventContent = {
  id: string
  title: string
  tagline: string
  description: string
  highlights: string[]   // shown as pills in card and modal
  images: GalleryImage[] // currently generated by buildGallery() placeholder function
}
```
To add real images: replace `images: buildGallery(...)` with a real array (see Section 9).

### SOCIALS
Instagram + LinkedIn only. Real URLs already in the file.
```ts
[
  { label: "Instagram", href: "https://www.instagram.com/squadmlrit...", handle: "@squadmlrit" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/squadclub...", handle: "SQUAD — MLRIT" },
]
```
Do NOT add GitHub or X — seniors decided Instagram + LinkedIn only.

### GALLERY_IMAGES
8 static images for the `/gallery` page (separate from event galleries).
Replace with real highlight photos when available.

### CONTACT_EMAIL
`"squadmlrit@gmail.com"` — used in footer and contact page.

---

## 6. Splash Screen — Full Technical Detail

**File:** `components/splash-screen.tsx`

### What it does
1. All 5 letter slots start with empty strings
2. A `setInterval` at 55ms randomizes all unlocked slots with glyphs from:
   `"!<>-_\\/[]{}—=+*^?#01ABCDEFGHIJKLMNOPQRSTUVWXYZ"`
3. Timeouts lock each slot in order: S (500ms) → Q (780ms) → U (1060ms) → **atom** (1340ms) → D (1620ms)
4. When a slot locks, it stops scrambling and shows its final value
5. Index 3 (the A position) resolves to the **AtomMark SVG**, never to the letter "A"
6. The atom animates in: `scale: 0.3→1, rotate: -180→0` spring animation
7. Subtitle ("Departmental Club...") fades in at 2s delay
8. `onDismiss` is called after 3.8s via `setTimeout` in `layout-wrapper.tsx`
9. Exit animation: the whole panel slides up (`y: "-100%"`) over 0.9s

### Key code — why A never shows
```ts
const RESOLVED = ["S", "Q", "U", "⚛", "D"]
// index 3 is the atom placeholder — the render logic checks i === 3
// and renders <AtomMark> instead of any letter
```

### How to adjust timing
- Change `500 + i * 280` to adjust when letters lock (currently 500ms start, 280ms between each)
- Change `3800` in layout-wrapper.tsx to adjust auto-dismiss duration

### How LayoutWrapper uses SplashScreen
```tsx
// layout-wrapper.tsx
const [showSplash, setShowSplash] = useState(true)
// SplashScreen receives onDismiss which sets showSplash(false)
// Children (Navbar + page + Footer) only render when showSplash is false
```

---

## 7. Theme — Current State (Option C)

**Description:** Rich violet → deep indigo gradient. Dark background, light text, vibrant violet primary.

### CSS Variables (in app/globals.css)

| Variable | Value | Notes |
|----------|-------|-------|
| `--background` | `oklch(0.16 0.06 285)` | Dark violet-indigo base |
| `--foreground` | `oklch(0.96 0.006 280)` | Near-white text |
| `--card` | `oklch(0.21 0.07 280 / 75%)` | Semi-transparent card bg |
| `--primary` | `oklch(0.72 0.22 280)` | Bright violet (buttons, links, accents) |
| `--primary-foreground` | `oklch(0.98 0.004 280)` | Text on primary buttons |
| `--accent` | `oklch(0.30 0.10 280)` | Subtle violet for pill/icon backgrounds |
| `--accent-foreground` | `oklch(0.88 0.14 280)` | Text on accent bg |
| `--muted-foreground` | `oklch(0.65 0.04 275)` | Secondary/helper text |
| `--border` | `oklch(0.30 0.08 280)` | Card and divider borders |

### Body gradient (in globals.css)
```css
body {
  background-image: linear-gradient(
    135deg,
    oklch(0.18 0.09 300) 0%,    /* violet-pink top-left */
    oklch(0.16 0.06 285) 50%,   /* deep violet center */
    oklch(0.14 0.08 260) 100%   /* dark indigo bottom-right */
  );
  background-attachment: fixed; /* gradient stays fixed as user scrolls */
}
```

### How to adjust
- **Darker overall:** lower the first number in `--background` (0.16 → 0.12)
- **More purple vs blue:** increase the hue value (285 → 295 = more purple, 285 → 270 = more blue)
- **Brighter accent buttons:** raise `--primary` lightness (0.72 → 0.80)

### Theme checkpoints (git tags)
| Tag | Description |
|-----|-------------|
| `checkpoint-violet-theme` | Original soft light violet (very first theme) |
| `checkpoint-navy-theme` | Deep navy blue (Option A) |
| current `master` | Option C rich gradient (active) |

To restore a checkpoint:
```bash
git checkout checkpoint-violet-theme -- app/globals.css app/layout.tsx
git commit -m "restore: violet theme"
git push
```

---

## 8. Admin Panel

**File:** `components/admin-panel.tsx`
**Password:** `Squad2026`
**Trigger methods:**
1. Keyboard: `Ctrl + Shift + A` (or `Cmd + Shift + A` on Mac)
2. Click the "Designed & built by the SQUAD core team." text in the footer

**Current state:** Visual mockup only. The panel shows text/image/layout/theme "tools" in a sidebar but none of them actually save anything. The "Save changes" button is disabled.

**How to make it functional (discussed but not implemented):**
The recommended approach was Google Sheets as a backend:
- Each editable field maps to a row in a Google Sheet
- Admin saves → POST to a Next.js API route → writes to Google Sheet via Sheets API
- Site reads from the Sheet at build/request time
- Everyone on the team can edit the Sheet directly too

The alternative was Formspree/Resend for the contact form only, or a full headless CMS like Sanity.

---

## 9. Pending Tasks

### A. Replace Event Photos (HIGH PRIORITY — user is uploading these)

**Upload method (no credits needed):**
1. Go to https://github.com/kolli-dhanush-reddy/squad-mlrit
2. Navigate to `public/` → "Add file" → "Upload files"
3. Compress photos at **squoosh.app** → WebP format, 80% quality before uploading
4. GitHub limits: 25MB per file, 100MB per commit
5. Organize into folders:
   - `public/events/codex/photo1.webp`, `photo2.webp` etc.
   - `public/events/unplugged/photo1.webp` etc.
   - `public/events/outreach/photo1.webp` etc.
   - `public/events/project-expo/photo1.webp` etc.

**After upload, edit `lib/data.ts` — replace `buildGallery(...)` calls:**
```ts
codex: {
  id: "codex",
  title: "CodeX",
  tagline: "...",
  description: "...",
  highlights: [...],
  images: [
    { id: 1, src: "/events/codex/photo1.webp", alt: "CodeX 2024", span: "square" },
    { id: 2, src: "/events/codex/photo2.webp", alt: "CodeX 2024", span: "tall" },
    { id: 3, src: "/events/codex/photo3.webp", alt: "CodeX 2024", span: "wide" },
    // span values: "square" | "tall" | "wide"
    // tall = portrait (row-span-2), wide = landscape (col-span-2), square = 1x1
  ],
},
```
Repeat for unplugged, outreach, project-expo.

Also update `GALLERY_IMAGES` array with highlight photos for the `/gallery` page.

### B. Replace Team Member Photos + Names

```ts
// In lib/data.ts, CORE_TEAM array:
{ id: 1, name: "Actual Name", role: "President", avatar: "/team/name.webp" }
```
Upload photos to `public/team/name.webp` via GitHub web UI.
Current placeholder: `/placeholder.svg?height=400&width=400`

### C. Wire the Contact Form

Currently `contact-page.tsx` handles submit by setting a "sent" state for 3.5s but doesn't send anything.

**Easiest fix (Formspree — free tier, no backend needed):**
1. Sign up at formspree.io
2. Create a form, get your form ID (e.g. `xrgvpqna`)
3. In `contact-page.tsx`, change the form tag:
```tsx
<form
  action="https://formspree.io/f/YOUR_FORM_ID"
  method="POST"
  // remove onSubmit handler
>
```

**Alternative (Next.js API route + Resend):**
Create `app/api/contact/route.ts`, install `resend`, send email on POST.

### D. Deploy to Vercel

```bash
# Install Vercel CLI if needed
npm i -g vercel

# From squad-club-portal-final folder:
vercel --prod
```

Or connect the GitHub repo to Vercel dashboard at vercel.com for auto-deploy on every push.
`@vercel/analytics` is already in dependencies and conditionally loaded in `layout.tsx`:
```tsx
{process.env.NODE_ENV === 'production' && <Analytics />}
```

### E. Admin Panel Backend (optional, discussed)

See Section 8 for the Google Sheets approach discussion.

---

## 10. Key Decisions Log

Every decision is recorded here with the reason, so future developers don't undo things that were intentional.

| # | Decision | Reason |
|---|----------|--------|
| 1 | Multi-page routing (not SPA) | Bookmarkable URLs, better SEO, seniors preferred |
| 2 | No Traditional Day event | Explicitly removed by seniors — do NOT add back |
| 3 | 4 events only | codex, unplugged, outreach, project-expo |
| 4 | Events open in modal popups | Not stacked sections — V1 pattern kept |
| 5 | Splash auto-dismisses (no button) | Button felt wrong for parent audience |
| 6 | Instagram + LinkedIn socials only | Seniors' decision — no GitHub/X |
| 7 | Join page = "Applications Closed" | Not a form — applications are genuinely closed |
| 8 | "Departmental Club" not "Departmental Technical Club" | Changed per seniors' request |
| 9 | A in SQUAD logo is always atom SVG | Never shows the letter A — glyph decodes then atom appears |
| 10 | Dark mode (gradient theme) | Seniors wanted richer colors, not plain background |
| 11 | typescript.ignoreBuildErrors: true | Kept from V1 for faster iteration — intentional |
| 12 | No new orientation-specific sections | Seniors explicitly said don't add anything new |
| 13 | Admin password = Squad2026 | Set by user, stored client-side (known security limitation) |

---

## 11. Animation Reference

All animations use `motion/react` (Framer Motion v12). Import: `import { motion } from "motion/react"`.

### Standard entry animation (used on all section headings + cards)
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.5 }}
>
```

### Staggered children (used on grid cards)
```tsx
transition={{ duration: 0.5, delay: index * 0.08 }}
```

### Card hover lift
```tsx
whileHover={{ y: -4 }}
```

### Decorative background blobs
```tsx
<div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
```

### Glassmorphism card style
```tsx
className="rounded-2xl border border-border bg-white/10 backdrop-blur-md"
// On dark theme bg-white/10 gives a subtle lighter glass effect
```

### Navbar animated pill (active state indicator)
```tsx
<motion.span
  layoutId="nav-pill"
  className="absolute inset-0 rounded-full bg-accent"
  transition={{ type: "spring", stiffness: 400, damping: 32 }}
/>
```

---

## 12. Important Technical Notes

- **Color scheme is dark** — `color-scheme: dark !important` in CSS, `colorScheme: 'dark'` in viewport meta. Do not switch back to light without updating all components that use `bg-white/X` opacity values (they assume a dark background now).

- **Custom cursor** — active only on `pointer: fine` devices (desktop). Hidden on mobile/touch. Implemented in `custom-cursor.tsx` with spring physics.

- **Footer admin trigger** — the "Designed & built by the SQUAD core team." text in the footer has `id="footer-admin-trigger"`. The admin panel listens for click events on this ID.

- **LayoutWrapper vs page.tsx** — splash screen state lives in `layout-wrapper.tsx` (client component). The root `layout.tsx` is a server component that wraps everything in `LayoutWrapper`. Children only render after splash dismisses.

- **`next.config.mjs`** — has `typescript.ignoreBuildErrors: true` and `images: { unoptimized: true }`. Both intentional.

- **Path aliases** — `@/*` maps to the project root. So `@/components/navbar` = `components/navbar.tsx`.

- **No dark mode toggle** — the site is permanently dark. The `.dark {}` CSS block in globals.css still exists (from shadcn boilerplate) but is never activated.

---

## 13. How to Run

```bash
# Install dependencies
npm install

# Development (hot reload)
npm run dev
# → http://localhost:3000

# Production build (verify before deploying)
npm run build
npm run start
```

---

## 14. Git History Summary

| Commit message | What changed |
|----------------|-------------|
| initial commit | All files created |
| replace 'Departmental Technical Club' with 'Departmental Club' | Text change sitewide |
| splash: lock A slot during decode... | First attempt at atom fix |
| splash: decode S,Q,U,D first then A snaps to atom last | Second attempt |
| splash: atom replaces A slot directly, A never shown | Final working version |
| update handoff: splash rework, image upload guide... | Handoff update |
| theme: deep navy (Option A) | Navy theme (tagged checkpoint-navy-theme) |
| theme: Option C — rich violet to deep indigo gradient | Current active theme |

**Tags:**
- `checkpoint-violet-theme` — soft light violet (original)
- `checkpoint-navy-theme` — deep navy blue (Option A)
