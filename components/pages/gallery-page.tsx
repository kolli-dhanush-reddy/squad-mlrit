"use client"

import { motion } from "motion/react"
import { Images } from "lucide-react"
import { Gallery } from "@/components/gallery"
import { GALLERY_IMAGES } from "@/lib/data"

export function GallerySection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
        <motion.div
          className="mb-10 flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
              <Images className="h-5 w-5" />
            </span>
            <p className="text-xs font-medium uppercase tracking-widest text-primary">Memories</p>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Gallery
          </h2>
          <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            A collection of moments from our events, workshops, and celebrations. Tap any photo to expand.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="mb-5 flex items-baseline justify-between">
            <h3 className="font-display text-xl font-bold tracking-tight text-foreground">Event Highlights</h3>
            <span className="text-sm text-muted-foreground">{GALLERY_IMAGES.length} photos — tap to expand</span>
          </div>
          <Gallery images={GALLERY_IMAGES} />
        </motion.div>
      </div>
    </section>
  )
}
