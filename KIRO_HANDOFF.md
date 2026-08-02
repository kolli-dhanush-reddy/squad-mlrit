# SQUAD Club Portal — Kiro Handoff File

This file contains everything needed to continue development without any prior conversation context.
Last updated: after splash screen rework + image upload planning.

---

## Project Overview

**Website for:** SQUAD — Departmental Club, Data Science Dept., MLRIT
**Primary audience:** Parents attending Orientation Day + club website for students/faculty
**Folder:** `squad-club-portal-final/` (root level alongside `squad-club-portal/` and `squad-club-portal-main/`)
**Stack:** Next.js 16.2.6, React 19, TypeScript, Tailwind CSS v4, Framer Motion (motion), shadcn/base-ui
**GitHub repo:** https://github.com/kolli-dhanush-reddy/squad-mlrit

---

## What Was Built

Merger of two existing versions:

| Version | Folder | Role |
|---------|--------|------|
| V1 | `squad-club-portal/` | Structure, routing, page content, data |
| V2 | `squad-club-portal-main/squad-club-portal-main/` | Better graphics, animations, splash screen |

### Final result takes:
- V1's multi-page routing (not SPA)
- V1's 4 events (CodeX, Unplugged, Outreach, Project Expo) — Traditional Day intentionally excluded
- V1's social links (Instagram + LinkedIn only)
- V1's page structure (/about, /events, /gallery, /squad, /join, /contact)
- V2's splash screen (reworked — see below)
- V2's animations (stagger reveals, whileHover lifts, blur blobs, glassmorphism cards)
- Refined violet/indigo theme

---

## All Decisions Made

1. **Multi-page routing** — kept for bookmarkable URLs and SEO
2. **No Traditional Day** — intentionally removed by seniors, do NOT add it back
3. **4 events only** — codex, unplugged, outreach, project-expo
4. **Events as modal popups** — click card → modal with gallery (not stacked scroll)
5. **Splash screen auto-dismiss** — 3.8s timer, no button
6. **Social links: Instagram + LinkedIn only**
7. **Join page = Applications Closed** — do NOT change to a form
8. **Theme = soft violet** — background `oklch(0.94 0.022 285)`, primary `oklch(0.45 0.18 278)`. Changed from near-white after seniors said it was "too white"
9. **No new sections** — seniors said don't add anything new
10. **Admin panel password** = `Squad2026` (trigger: Ctrl/Cmd+Shift+A or click footer copyright text)
11. **"Departmental Technical Club" → "Departmental Club"** — changed sitewide per seniors

---

## Splash Screen (fully reworked)

**File:** `components/splash-screen.tsx`

**Current behavior:**
- All 5 letter slots start scrambling with random glyphs
- S → Q → U lock in sequence (280ms apart)
- The A slot resolves directly to the **atom SVG** (A is never shown as a letter)
- D locks last
- Subtitle fades in after 2s
- Auto-dismisses after 3.8s

**Key detail:** `RESOLVED = ["S", "Q", "U", "⚛", "D"]` — index 3 is the atom, never "A".
The atom animates in with `scale: 0.3 → 1, rotate: -180 → 0` spring animation.

**No RGB split layers** in current version (removed to simplify). If you want to re-add the chromatic aberration effect, it used two `absolute` spans with `mix-blend-mode: screen` offset by ±2px.

---

## File Structure

```
squad-club-portal-final/
├── app/
│   ├── globals.css          ← Theme variables, Tailwind imports
│   ├── layout.tsx           ← Root layout (fonts, metadata, CustomCursor, LayoutWrapper)
│   ├── page.tsx             ← Home → HomeSection
│   ├── about/page.tsx
│   ├── events/page.tsx      ← Events → EventsHub (modal-based)
│   ├── gallery/page.tsx
│   ├── squad/page.tsx
│   ├── join/page.tsx        ← Static "Applications Closed" page
│   └── contact/page.tsx
├── components/
│   ├── splash-screen.tsx    ← Glyph-decode, atom replaces A, auto-dismiss 3.8s
│   ├── layout-wrapper.tsx   ← Controls splash show/hide state
│   ├── navbar.tsx           ← usePathname active state, Link routing
│   ├── footer.tsx           ← Nav + social links (Instagram + LinkedIn)
│   ├── custom-cursor.tsx    ← Spring cursor (desktop only)
│   ├── admin-panel.tsx      ← Secret admin UI (mockup, not wired to backend)
│   ├── squad-logo.tsx       ← AtomMark SVG + SquadWordmark
│   ├── team-grid.tsx        ← Team member cards
│   ├── gallery.tsx          ← Masonry grid with lightbox trigger
│   ├── lightbox.tsx         ← Full-screen image viewer
│   ├── ui/button.tsx
│   └── pages/
│       ├── home-page.tsx    ← Hero + marquee + pillars + stats + what-we-do + CTA
│       ├── about-page.tsx   ← Mission/vision + pillars + stats
│       ├── events-hub.tsx   ← Event cards + EventModal
│       ├── gallery-page.tsx ← GALLERY_IMAGES from data.ts
│       ├── squad-page.tsx   ← Core team grid
│       └── contact-page.tsx ← Form + socials + info
├── lib/
│   ├── data.ts              ← All site data
│   └── utils.ts             ← cn() helper
└── public/
    ├── squad-logo.png
    ├── placeholder.svg      ← Replace with real images
    └── events/              ← PUT REAL PHOTOS HERE (see below)
```

---

## Data File: lib/data.ts

### Key exports:
- `NAV_TABS` — 6 tabs: home, about, events, squad, gallery, contact
- `CORE_TEAM` — 8 members, all placeholder (replace with real names/photos)
- `EVENTS` — 4 events: codex, unplugged, outreach, project-expo
- `SOCIALS` — Instagram + LinkedIn (real URLs already in file)
- `GALLERY_IMAGES` — 8 static placeholder images for /gallery page
- `CONTACT_EMAIL` — `squadmlrit@gmail.com`

### Real contact info already in the file:
- Instagram: `https://www.instagram.com/squadmlrit`
- LinkedIn: `https://www.linkedin.com/in/squadclub`
- Email: `squadmlrit@gmail.com`

---

## PENDING TASKS

### 1. Add Real Event Photos (IN PROGRESS)

User is uploading photos via GitHub web UI. No Kiro credits needed for this step.

**Upload process:**
1. Go to https://github.com/kolli-dhanush-reddy/squad-mlrit
2. Navigate to `public/` → "Add file" → "Upload files"
3. Upload into subfolders:
   - `public/events/codex/`
   - `public/events/unplugged/`
   - `public/events/outreach/`
   - `public/events/project-expo/`
4. Compress photos first at **squoosh.app** → WebP, 80% quality (GitHub limit: 25MB/file)
5. After upload, tell Kiro the filenames → Kiro updates `lib/data.ts`

**When photos are ready, update `lib/data.ts` like this:**
```ts
// Replace buildGallery(...) calls with real arrays:
codex: {
  ...
  images: [
    { id: 1, src: "/events/codex/photo1.webp", alt: "CodeX 2024 — photo 1", span: "square" },
    { id: 2, src: "/events/codex/photo2.webp", alt: "CodeX 2024 — photo 2", span: "tall" },
    // span options: "square" | "tall" | "wide"
  ]
}
```

### 2. Add Real Team Member Photos + Names

Update `CORE_TEAM` in `lib/data.ts`:
```ts
{ id: 1, name: "Real Name", role: "President", avatar: "/team/name.webp" }
```
Upload photos to `public/team/`.

### 3. Wire Contact Form

Currently shows "Message sent" but doesn't actually send. Options:
- **Easiest:** Use Formspree.io — add `action="https://formspree.io/f/YOUR_ID"` to the form
- **Next.js API route:** `app/api/contact/route.ts` that emails via Resend/Nodemailer

### 4. Admin Panel — Mockup Only

`components/admin-panel.tsx` is visual demo only. Password: `Squad2026`. For real editing, would need backend (Google Sheets API is the recommended approach — see discussion in chat).

### 5. Deployment

Not deployed yet. To deploy to Vercel:
```bash
vercel --prod
```
Or connect https://github.com/kolli-dhanush-reddy/squad-mlrit to Vercel dashboard.
`@vercel/analytics` is already installed and conditionally loaded in `layout.tsx` for production.

---

## How to Run

```bash
cd squad-club-portal-final
npm run dev       # → http://localhost:3000
npm run build     # production build
npm run start     # serve production build
```

---

## Theme Reference

All in `app/globals.css` under `:root`:

| Variable | Value | Purpose |
|----------|-------|---------|
| `--background` | `oklch(0.94 0.022 285)` | Soft violet page background |
| `--primary` | `oklch(0.45 0.18 278)` | Main purple (buttons, accents) |
| `--accent` | `oklch(0.93 0.035 278)` | Light purple (pill bg, icon bg) |
| `--border` | `oklch(0.88 0.012 278)` | Purple-tinted borders |
| `--muted-foreground` | `oklch(0.52 0.01 260)` | Secondary text |
| `--foreground` | `oklch(0.17 0.008 260)` | Main dark text |

To darken background: lower first value in `--background` (0.94 → 0.88)
To make it more purple: raise second value (0.022 → 0.04)

---

## Animation Patterns

All use `motion/react` (Framer Motion):
- Entry: `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}`
- Cards hover lift: `whileHover={{ y: -4 }}`
- Stagger: `transition={{ delay: i * 0.08 }}`
- Blobs: `absolute rounded-full bg-primary/8 blur-3xl pointer-events-none`
- Glass cards: `bg-white/30 backdrop-blur-md border border-border`

---

## Important Notes

- Strict light mode — dark mode intentionally disabled (`color-scheme: light !important`)
- Custom cursor active on desktop only (`pointer: fine` media query)
- `typescript.ignoreBuildErrors: true` in `next.config.mjs` — intentional
- Footer copyright text is a hidden admin trigger (`id="footer-admin-trigger"`)
- Splash screen `onDismiss` prop called after 3.8s timer in `layout-wrapper.tsx`
- Navbar uses `usePathname()` from `next/navigation` for active state
- "A" in SQUAD logo is always the atom SVG — never the letter A
