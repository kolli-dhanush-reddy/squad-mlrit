"use client"

import { SquadWordmark } from "@/components/squad-logo"
import { NAV_TABS, SOCIALS, CONTACT_EMAIL } from "@/lib/data"
import Link from "next/link"

const EXPLORE = NAV_TABS.slice(0, 3)
const MORE = NAV_TABS.slice(3)

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 md:px-8 md:py-20">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="flex max-w-xs flex-col gap-3">
            <SquadWordmark tone="dark" className="text-2xl text-white" />
            <p className="text-sm leading-relaxed text-slate-400">
              Departmental Club — Data Science, MLRIT. Building, competing, and
              celebrating together.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-cyan-400 transition-colors duration-200 hover:text-cyan-300"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="flex flex-wrap gap-10">
            <nav className="flex flex-col gap-2">
              <span className="text-sm font-semibold tracking-wide text-white">Explore</span>
              {EXPLORE.map((t) => (
                <Link
                  key={t.id}
                  href={t.id === "home" ? "/" : `/${t.id}`}
                  className="text-sm text-slate-300 transition-colors duration-200 hover:text-white"
                >
                  {t.label}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-col gap-2">
              <span className="text-sm font-semibold tracking-wide text-white">More</span>
              {MORE.map((t) => (
                <Link
                  key={t.id}
                  href={`/${t.id}`}
                  className="text-sm text-slate-300 transition-colors duration-200 hover:text-white"
                >
                  {t.label}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-col gap-2">
              <span className="text-sm font-semibold tracking-wide text-white">Social</span>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-300 transition-colors duration-200 hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-xs text-slate-400 sm:flex-row">
          <span>© {new Date().getFullYear()} SQUAD Club · MLRIT. All rights reserved.</span>
          <button
            type="button"
            id="footer-admin-trigger"
            className="transition-colors duration-200 hover:text-white"
          >
            Designed &amp; built by the SQUAD core team.
          </button>
        </div>
      </div>
    </footer>
  )
}
