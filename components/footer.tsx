"use client"

import { SquadWordmark } from "@/components/squad-logo"
import { NAV_TABS, SOCIALS, CONTACT_EMAIL } from "@/lib/data"
import Link from "next/link"

const EXPLORE = NAV_TABS.slice(0, 3)
const MORE = NAV_TABS.slice(3)

export function Footer() {
  return (
    <footer className="border-t border-border bg-white/30 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 md:px-8 md:py-20">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="flex max-w-xs flex-col gap-3">
            <SquadWordmark tone="dark" className="text-2xl" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Departmental Technical Club — Data Science, MLRIT. Building, competing, and
              celebrating together.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-primary hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="flex flex-wrap gap-10">
            <nav className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-foreground">Explore</span>
              {EXPLORE.map((t) => (
                <Link
                  key={t.id}
                  href={t.id === "home" ? "/" : `/${t.id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t.label}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-foreground">More</span>
              {MORE.map((t) => (
                <Link
                  key={t.id}
                  href={`/${t.id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t.label}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-foreground">Social</span>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} SQUAD Club · MLRIT. All rights reserved.</span>
          <button
            type="button"
            id="footer-admin-trigger"
            className="transition-colors hover:text-primary"
          >
            Designed &amp; built by the SQUAD core team.
          </button>
        </div>
      </div>
    </footer>
  )
}
