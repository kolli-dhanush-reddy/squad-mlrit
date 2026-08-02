# SQUAD Club Portal — Kiro Handoff File

This file contains everything needed to continue development without any prior conversation context.

---

## Project Overview

**Website for:** SQUAD — Departmental Technical Club, Data Science Dept., MLRIT  
**Primary audience:** Parents attending Orientation Day + club website for students/faculty  
**Folder:** `squad-club-portal-final/` (root level alongside `squad-club-portal/` and `squad-club-portal-main/`)  
**Stack:** Next.js 16.2.6, React 19, TypeScript, Tailwind CSS v4, Framer Motion (motion), shadcn/base-ui

---

## What Was Built

This project is a **merger of two existing versions**:

| Version | Folder | Role |
|---------|--------|------|
| V1 | `squad-club-portal/` | Structure, routing, page content, data |
| V2 | `squad-club-portal-main/squad-club-portal-main/` | Better graphics, animations, splash screen |

### Final result takes:
- V1's **multi-page routing structure** (not SPA)
- V1's **4 events** (CodeX, Unplugged, Outreach, Project Expo) — Traditional Day intentionally excluded
- V1's **social links** (Instagram + LinkedIn only, no GitHub/X)
- V1's **page structure** (/about, /events, /gallery, /squad, /join, /contact)
- V2's **splash screen** (cryptographic glyph-decode + RGB split animation)
- V2's **animations** (stagger reveals, whileHover lifts, blur blobs, glassmorphism cards)
- V2's **navbar** styling improvements
- **Auto-dismiss splash** (3.5 seconds, no manual button — seniors preferred this)
- **Custom refined violet/indigo theme** (not V1's gradient, not V2's plain white)

---

## All Decisions Made (with reasoning)

1. **Multi-page routing** — kept because seniors want bookmarkable URLs and SEO
2. **No Traditional Day** — intentionally removed by seniors, do NOT add it back
3. **4 events only** — codex, unplugged, outreach, project-expo
4. **Events as modal popups** — click card → modal with gallery, same as V1 (not stacked scroll like V2)
5. **Splash screen auto-dismiss** — 3.5s timer, no "LET'S START" button (better for parent audience)
6. **Social links: Instagram + LinkedIn only** — seniors only want these two
7. **Join page = Applications Closed** — do NOT change this to a form, leave as-is
8. **Theme = soft violet** — background `oklch(0.94 0.022 285)`, primary `oklch(0.45 0.18 278)`. Changed from near-white after seniors said it was "too white"
9. **No new sections** — seniors explicitly said don't add anything new (no orientation-specific blocks)
10. **Admin panel password** = `Squad2026` (trigger: Ctrl/Cmd+Shift+A or click footer copyright text)

---

## File Structure

```
squad-club-portal-final/
├── app/
│   ├── globals.css          ← Theme variables, Tailwind imports
│   ├── layout.tsx           ← Root layout (fonts, metadata, CustomCursor, LayoutWrapper)
│   ├── page.tsx             ← Home → HomeSection
│   ├── about/page.tsx       ← About → AboutSection
│   ├── events/page.tsx      ← Events → EventsHub (modal-based)
│   ├── gallery/page.tsx     ← Gallery → GallerySection
│   ├── squad/page.tsx       ← Squad → SquadSection
│   ├── join/page.tsx        ← Join → Static "Applications Closed" page
│   └── contact/page.tsx     ← Contact → ContactPage
├── components/
│   ├── splash-screen.tsx    ← V2's glyph-decode animation, auto-dismisses after 3.5s
│   ├── layout-wrapper.tsx   ← Controls splash show/hide state
│   ├── navbar.tsx           ← usePathname-based active state, Link routing
│   ├── footer.tsx           ← Nav links, social links (Instagram + LinkedIn)
│   ├── custom-cursor.tsx    ← Spring-based custom cursor (desktop only)
│   ├── admin-panel.tsx      ← Secret admin UI (mockup/demo only, not wired to backend)
│   ├── squad-logo.tsx       ← AtomMark SVG + SquadWordmark component
│   ├── team-grid.tsx        ← Team member cards grid
│   ├── gallery.tsx          ← Masonry grid gallery with lightbox trigger
│   ├── lightbox.tsx         ← Full-screen image viewer with keyboard nav
│   ├── ui/button.tsx        ← Base-UI button with CVA variants
│   └── pages/
│       ├── home-page.tsx    ← Hero + marquee + mission pillars + stats + what-we-do + CTA
│       ├── about-page.tsx   ← Mission/vision + pillars + impact stats
│       ├── events-hub.tsx   ← Event cards grid + EventModal component
│       ├── gallery-page.tsx ← Full gallery with GALLERY_IMAGES from data.ts
│       ├── squad-page.tsx   ← Core team grid
│       └── contact-page.tsx ← Form + social links + info
├── lib/
│   ├── data.ts              ← All site data (events, team, nav, socials, gallery images)
│   └── utils.ts             ← cn() helper (clsx + tailwind-merge)
└── public/
    ├── squad-logo.png       ← Main logo
    ├── placeholder.svg      ← Used for team/event images (replace with real ones)
    └── ...other assets
```

---

## Data File: lib/data.ts

### Key exports:
- `NAV_TABS` — 6 tabs: home, about, events, squad, gallery, contact
- `CORE_TEAM` — 8 members, all placeholder data (replace with real names/photos)
- `EVENTS` — Record of 4 events: codex, unplugged, outreach, project-expo
- `SOCIALS` — Instagram + LinkedIn (real URLs already in file)
- `GALLERY_IMAGES` — 8 static placeholder images for the /gallery page
- `CONTACT_EMAIL` — `squadmlrit@gmail.com`

### Real contact info already in the file:
- Instagram: `https://www.instagram.com/squadmlrit`
- LinkedIn: `https://www.linkedin.com/in/squadclub`
- Email: `squadmlrit@gmail.com`

---

## PENDING TASKS (Things Still To Do)

### 1. Replace Placeholder Content with Real Content
The user said they will provide this later. When they do, update:

**Team members** — in `lib/data.ts`, `CORE_TEAM` array:
```ts
{ id: 1, name: "REAL NAME", role: "President", avatar: "/team/name.jpg" }
```
Put photos in `public/team/` folder.

**Event images** — in `lib/data.ts`, `buildGallery()` function is generating placeholders.
When real photos are provided, replace `buildGallery(...)` calls with actual image arrays:
```ts
images: [
  { id: 1, src: "/events/codex/photo1.jpg", alt: "CodeX 2024", span: "square" },
  ...
]
```
Put photos in `public/events/codex/`, `public/events/unplugged/`, etc.

**Gallery page images** — `GALLERY_IMAGES` array in `lib/data.ts`. Replace with real highlight photos.

**Event descriptions** — the text in `EVENTS` (description, tagline, highlights) is real copy already. Verify with seniors if any changes needed.

**Stats** — in `home-page.tsx` and `about-page.tsx`, the STATS array has:
```ts
{ value: "300+", label: "Active Members" }
{ value: "40+", label: "Events Hosted" }
{ value: "12", label: "ZPHS Schools Reached" }
{ value: "4", label: "Flagship Events" }
```
Verify these numbers with the club.

---

### 2. Background Color — Already Adjusted
Seniors said background was "too white". Fixed: changed `--background` in `globals.css` from `oklch(0.98 0.008 280)` (near-white) to `oklch(0.94 0.022 285)` (soft visible violet). If they want it darker/lighter, adjust the first value (0.94 = lightness, lower = darker).

---

### 3. Contact Form — Not Wired to Backend
Currently the contact form in `contact-page.tsx` only shows a "Message sent" state after 3.5s but does NOT actually send anything. To wire it up:
- Option A: Use a service like Formspree/Resend and add `action` attribute
- Option B: Create a Next.js API route at `app/api/contact/route.ts`

---

### 4. Admin Panel — Mockup Only
The admin panel (`components/admin-panel.tsx`) is a visual demo. It does NOT save changes. If real CMS editing is needed, this needs a backend.

---

### 5. Deployment
Not deployed yet. To deploy to Vercel:
```bash
vercel --prod
```
Or connect GitHub repo to Vercel dashboard. The `@vercel/analytics` package is already installed and conditionally loaded in `layout.tsx` for production.

---

## How to Run

```bash
cd squad-club-portal-final
npm run dev       # development server → http://localhost:3000
npm run build     # production build (already tested, passes cleanly)
npm run start     # serve production build
```

---

## Theme Reference

All colors are in `app/globals.css` under `:root`. Key values:

| Variable | Value | Purpose |
|----------|-------|---------|
| `--background` | `oklch(0.94 0.022 285)` | Soft violet page background |
| `--primary` | `oklch(0.45 0.18 278)` | Main purple (buttons, accents, links) |
| `--accent` | `oklch(0.93 0.035 278)` | Light purple (pill backgrounds, icon bg) |
| `--border` | `oklch(0.88 0.012 278)` | Purple-tinted borders |
| `--muted-foreground` | `oklch(0.52 0.01 260)` | Secondary text |
| `--foreground` | `oklch(0.17 0.008 260)` | Main dark text |

To make background darker: lower the first number in `--background` (e.g. 0.94 → 0.88)  
To make accent more purple: raise the second number (e.g. 0.022 → 0.04)

---

## Animation Patterns Used (V2 style)

All animations use `motion/react` (Framer Motion):
- Entry: `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}`
- Cards hover: `whileHover={{ y: -4 }}`
- Stagger delay: `transition={{ delay: i * 0.08 }}`
- Decorative blobs: `absolute rounded-full bg-primary/8 blur-3xl pointer-events-none`
- Glassmorphism: `bg-white/30 backdrop-blur-md border border-border`

---

## Important Notes

- Color scheme is **strict light mode** — dark mode is intentionally disabled (`color-scheme: light !important` in CSS)
- Custom cursor is active on desktop (`pointer: fine` media query)
- `typescript.ignoreBuildErrors: true` is set in `next.config.mjs` — intentional for faster iteration
- The `SplashScreen` component accepts `onDismiss` prop (called after 3.5s timer)
- Navbar uses `usePathname()` from `next/navigation` — active state based on current route
- Footer has a hidden admin trigger on the copyright text (`id="footer-admin-trigger"`)
