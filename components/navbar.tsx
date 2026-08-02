"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAV_TABS } from "@/lib/data"
import { SquadWordmark } from "@/components/squad-logo"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-[8000] border-b border-border/70 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center" aria-label="Go to home">
          <SquadWordmark tone="dark" className="text-2xl" />
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_TABS.map((tab) => {
            const isActive = pathname === `/${tab.id}` || (tab.id === "home" && pathname === "/")
            return (
              <li key={tab.id}>
                <Link
                  href={tab.id === "home" ? "/" : `/${tab.id}`}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{tab.label}</span>
                </Link>
              </li>
            )
          })}
          <li className="ml-4">
            <Link
              href="/join"
              className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Join us
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-md lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <ul className="grid grid-cols-2 gap-1.5 px-4 py-3">
              {NAV_TABS.map((tab) => {
                const isActive = pathname === `/${tab.id}` || (tab.id === "home" && pathname === "/")
                return (
                  <li key={tab.id}>
                    <Link
                      href={tab.id === "home" ? "/" : `/${tab.id}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                        isActive
                          ? "bg-accent text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                      )}
                    >
                      {tab.label}
                    </Link>
                  </li>
                )
              })}
              <li className="col-span-2">
                <Link
                  href="/join"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Join us
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
