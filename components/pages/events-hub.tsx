"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Zap } from "lucide-react"
import { EVENTS } from "@/lib/data"
import { Gallery } from "@/components/gallery"

const EVENT_KEYS = ["codex", "unplugged", "outreach", "project-expo"] as const

export function EventsHub() {
  const [selectedEvent, setSelectedEvent] = useState<keyof typeof EVENTS | null>(null)

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <motion.div
            className="mb-12 flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-primary">What we do</p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Events Hub
            </h2>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Explore our flagship events — from coding competitions to workshops and community outreach.
              Click any event to learn more and view the gallery.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_KEYS.map((key, index) => (
              <motion.button
                key={key}
                type="button"
                onClick={() => setSelectedEvent(key)}
                className="group relative overflow-hidden rounded-2xl border border-border bg-white/30 backdrop-blur-md p-8 text-left transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
              >
                {/* Hover accent */}
                <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {EVENTS[key].title}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {EVENTS[key].description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {EVENTS[key].highlights.slice(0, 2).map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-border bg-white/40 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-foreground"
                    >
                      {h}
                    </span>
                  ))}
                  {EVENTS[key].highlights.length > 2 && (
                    <span className="rounded-full border border-border bg-white/40 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      +{EVENTS[key].highlights.length - 2}
                    </span>
                  )}
                </div>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
                  <span>View details</span>
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedEvent && (
          <EventModal event={EVENTS[selectedEvent]} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>
    </>
  )
}

function EventModal({
  event,
  onClose,
}: {
  event: (typeof EVENTS)[keyof typeof EVENTS]
  onClose: () => void
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-border bg-background/95 backdrop-blur-md shadow-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 md:p-8">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">
              {event.tagline}
            </p>
            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {event.title}
            </h2>
            <p className="max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground">
              {event.description}
            </p>
          </motion.div>

          <motion.div
            className="mb-8 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {event.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-border bg-accent px-4 py-2 text-sm font-medium text-foreground"
              >
                {h}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="mb-5 flex items-baseline justify-between">
              <h3 className="font-display text-xl font-bold tracking-tight text-foreground">Gallery</h3>
              <span className="text-sm text-muted-foreground">{event.images.length} photos — tap to expand</span>
            </div>
            <Gallery images={event.images} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
