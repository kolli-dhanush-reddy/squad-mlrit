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

      {/* Mobile backdrop + slide-in menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Blurred backdrop */}
            <motion.div
              className="fixed inset-0 z-[7999] bg-black/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            {/* Slide-in panel */}
            <motion.div
              className="fixed right-0 top-0 z-[8001] h-full w-72 border-l border-border bg-background/95 backdrop-blur-xl shadow-2xl lg:hidden flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <SquadWordmark tone="dark" className="text-xl" />
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ul className="flex flex-col gap-1 px-4 py-4 flex-1">
                {NAV_TABS.map((tab) => {
                  const isActive = pathname === `/${tab.id}` || (tab.id === "home" && pathname === "/")
                  return (
                    <li key={tab.id}>
                      <Link
                        href={tab.id === "home" ? "/" : `/${tab.id}`}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors",
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
              </ul>
              <div className="px-4 pb-6">
                <Link
                  href="/join"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Join us
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
