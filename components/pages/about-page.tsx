"use client"

import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { Code2, Lightbulb, Users } from "lucide-react"
import { AtomMark } from "@/components/squad-logo"

const FULL_FORM_WORDS = [
  { letter: "S", rest: "chool" },
  { letter: "", rest: "of" },
  { letter: "Q", rest: "ualitative" },
  { letter: "U", rest: "nderstanding" },
  { letter: "", rest: "&" },
  { letter: "A", rest: "nalysis" },
  { letter: "", rest: "of" },
  { letter: "D", rest: "ata" },
]

function FullFormTypewriter() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [phase, setPhase] = useState<"in" | "out">("in")

  useEffect(() => {
    if (phase === "in") {
      if (visibleCount < FULL_FORM_WORDS.length) {
        const t = setTimeout(() => setVisibleCount(v => v + 1), 500)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase("out"), 2800)
        return () => clearTimeout(t)
      }
    } else {
      if (visibleCount > 0) {
        const t = setTimeout(() => setVisibleCount(v => v - 1), 320)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase("in"), 600)
        return () => clearTimeout(t)
      }
    }
  }, [visibleCount, phase])

  return (
    <p className="font-display text-2xl font-bold leading-snug tracking-tight sm:text-3xl md:text-4xl flex flex-wrap justify-center gap-y-1 min-h-[3rem]">
      {FULL_FORM_WORDS.map((word, i) => (
        <motion.span
          key={i}
          animate={{
            opacity: i < visibleCount ? 1 : 0,
            filter: i < visibleCount ? "blur(0px)" : "blur(6px)",
            maxWidth: i < visibleCount ? "200px" : "0px",
            marginRight: i < visibleCount ? "0.75rem" : "0px",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="inline-block overflow-hidden whitespace-nowrap"
          style={{ maxWidth: "0px", opacity: 0 }}
        >
          {word.letter && <span className="text-primary">{word.letter}</span>}
          {word.rest}
        </motion.span>
      ))}
    </p>
  )
}

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

export function AboutSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
        {/* Mission & Vision */}
        <motion.div
          className="mb-16 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-6">
            <p className="text-xs font-medium uppercase tracking-widest text-primary">Who we are</p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Our mission &amp; vision
            </h2>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              We exist to make technical growth accessible, collaborative, and genuinely exciting.
              Our vision is a campus where every curious student has a place to learn, build, and lead.
            </p>
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-white/30 backdrop-blur-md p-4">
              <AtomMark className="h-8 w-8 text-primary" />
              <p className="text-sm font-medium text-foreground">
                Departmental Club — Data Science, MLRIT
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                className={`flex flex-col gap-4 rounded-2xl border border-border bg-white/30 backdrop-blur-md p-6 transition-all duration-300 ${p.cardHover}`}
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
        </motion.div>

        {/* SQUAD Full Form */}
        <motion.div
          className="rounded-2xl border border-border bg-white/10 backdrop-blur-md p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="font-display text-xl font-bold text-foreground mb-8 tracking-wide uppercase">
            What SQUAD Stands For
          </h3>
          <FullFormTypewriter />
        </motion.div>
      </div>
    </section>
  )
}
