"use client"

import { motion } from "motion/react"
import { Code2, Lightbulb, Users } from "lucide-react"
import { AtomMark } from "@/components/squad-logo"

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
                className="flex flex-col gap-4 rounded-2xl border border-border bg-white/30 backdrop-blur-md p-6"
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
        </motion.div>

        {/* SQUAD Full Form */}
        <motion.div
          className="rounded-2xl border border-border bg-white/10 backdrop-blur-md p-8 md:p-12 text-center overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="font-display text-xl font-bold text-foreground mb-8 tracking-wide uppercase">
            What SQUAD Stands For
          </h3>
          <div className="relative overflow-hidden">
            <motion.p
              className="font-display text-2xl font-bold leading-snug tracking-tight sm:text-3xl md:text-4xl whitespace-nowrap"
              animate={{ x: ["100%", "-100%"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-primary">S</span>chool&nbsp;of&nbsp;
              <span className="text-primary">Q</span>ualitative&nbsp;
              <span className="text-primary">U</span>nderstanding&nbsp;&amp;&nbsp;
              <span className="text-primary">A</span>nalysis&nbsp;of&nbsp;
              <span className="text-primary">D</span>ata
              &nbsp;&nbsp;•&nbsp;&nbsp;
              <span className="text-primary">S</span>chool&nbsp;of&nbsp;
              <span className="text-primary">Q</span>ualitative&nbsp;
              <span className="text-primary">U</span>nderstanding&nbsp;&amp;&nbsp;
              <span className="text-primary">A</span>nalysis&nbsp;of&nbsp;
              <span className="text-primary">D</span>ata
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
