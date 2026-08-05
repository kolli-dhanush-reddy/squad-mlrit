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
    iconClass: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.25)]",
    cardHover: "hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]",
  },
  {
    icon: Lightbulb,
    title: "Relentless Innovation",
    body: "From prototypes to production ideas, we turn curiosity into things that actually work.",
    iconClass: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.25)]",
    cardHover: "hover:border-indigo-500/40 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)]",
  },
  {
    icon: Users,
    title: "A Builder Community",
    body: "A tight-knit crew that learns together, ships together, and lifts the whole campus with it.",
    iconClass: "bg-sky-500/10 text-sky-400 border border-sky-500/30 shadow-[0_0_15px_rgba(14,165,233,0.25)]",
    cardHover: "hover:border-sky-500/40 hover:shadow-[0_0_25px_rgba(14,165,233,0.15)]",
  },
]


export function HomeSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/2 top-2/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-accent/40 blur-[80px]" />

      {/* Hero */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 border-b border-border px-4 py-20 md:px-8 md:py-32 min-h-[82vh]">
        <motion.span
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium tracking-wide text-primary"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AtomMark className="h-4 w-4 text-primary" />
          Departmental Club — Data Science, MLRIT
        </motion.span>

        <motion.h1
          className="max-w-3xl text-balance font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          Empowering{" "}
          <span className="bg-gradient-to-r from-primary via-primary/80 to-accent-foreground bg-clip-text text-transparent">
            innovation
          </span>
          , technical mastery, and collaborative growth.
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
          {/* Primary CTA — solid with glow */}
          <Link
            href="/events"
            className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/50 hover:shadow-xl"
          >
            Explore Our Events
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </Link>
          {/* Secondary CTA — ghost outline */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
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
                className={`flex flex-col gap-3 rounded-2xl border border-border bg-white/30 backdrop-blur-md p-5 transition-all duration-300 ${p.cardHover}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -5 }}
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${p.iconClass}`}>
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold tracking-tight text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{p.body}</p>
              </motion.div>
            ))}
          </div>
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
          className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <h2 className="relative mb-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Ready to innovate with us?
          </h2>
          <Link
            href="/join"
            className="relative inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/50 hover:shadow-xl"
          >
            Join us <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
