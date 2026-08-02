"use client"

import { motion } from "motion/react"
import { ArrowRight, ArrowDown, Code2, Lightbulb, Users } from "lucide-react"
import { AtomMark } from "@/components/squad-logo"
import Link from "next/link"

const BUZZWORDS = ["INNOVATION", "TECHNOLOGY", "LEADERSHIP", "COMMUNITY", "OUTREACH", "SQUAD"]

const PILLARS = [
  {
    icon: Code2,
    title: "Technical Excellence",
    body: "We sharpen skills through competitions, workshops, and real projects that push engineering craft.",
  },
  {
    icon: Lightbulb,
    title: "Relentless Innovation",
    body: "From prototypes to production ideas, we turn curiosity into things that actually work.",
  },
  {
    icon: Users,
    title: "A Builder Community",
    body: "A tight-knit crew that learns together, ships together, and lifts the whole campus with it.",
  },
]

const STATS = [
  { value: "300+", label: "Active Members" },
  { value: "40+", label: "Events Hosted" },
  { value: "12", label: "ZPHS Schools Reached" },
  { value: "4", label: "Flagship Events" },
]

export function HomeSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 rounded-full bg-accent/60 blur-3xl" />

      {/* Hero */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 border-b border-border px-4 py-20 md:px-8 md:py-32 min-h-[82vh]">
        <motion.span
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white/40 backdrop-blur-md px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AtomMark className="h-4 w-4 text-primary" />
          Departmental Technical Club — Data Science, MLRIT
        </motion.span>

        <motion.h1
          className="max-w-3xl text-balance font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          Empowering innovation, technical mastery, and collaborative growth.
        </motion.h1>

        <motion.p
          className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          SQUAD is the technical club of the Department of Data Science at MLRIT — a community of
          engineers, designers, and builders competing, teaching, and celebrating together.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          <Link
            href="/events"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore Our Events
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/30 backdrop-blur-md px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/50"
          >
            Get in Touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="border-b border-border bg-white/20 backdrop-blur-sm">
        <div className="relative overflow-hidden py-4">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" } }}
          >
            {[...BUZZWORDS, ...BUZZWORDS, ...BUZZWORDS].map((word, i) => (
              <span key={i} className="text-sm font-medium text-muted-foreground">
                {word} •
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mission + Pillars */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-primary">Who we are</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Our mission &amp; vision
            </h2>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              We exist to make technical growth accessible, collaborative, and genuinely exciting.
              Our vision is a campus where every curious student has a place to learn, build, and lead.
            </p>
            <Link
              href="/about"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white/30 backdrop-blur-md px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/50"
            >
              Read Our Story <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-white/30 backdrop-blur-md p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-sm font-semibold text-foreground sm:text-base">{p.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-y border-border bg-white/20 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4 md:px-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-center gap-1 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <span className="font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                {s.value}
              </span>
              <span className="text-xs text-muted-foreground sm:text-sm">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* What We Do Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <motion.div
          className="mb-10 flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-primary">Explore</p>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            What we do
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { href: "/events", label: "Flagship Events", desc: "Coding competitions, workshops, and technical events." },
            { href: "/squad", label: "Our Community", desc: "Meet the core team driving innovation." },
            { href: "/gallery", label: "Memories", desc: "Photos from our events and celebrations." },
          ].map((card, i) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <Link
                href={card.href}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-white/30 backdrop-blur-md p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
                  <ArrowRight className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                  {card.label}
                </h3>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <motion.div
          className="rounded-2xl border border-border bg-primary/5 backdrop-blur-md p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Ready to innovate with us?
          </h2>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Join us <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
