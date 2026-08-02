"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "motion/react"
import { AtomMark } from "@/components/squad-logo"

const TARGET = "SQUAD"
const ATOM_INDEX = 3
const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function DecodingText() {
  const [display, setDisplay] = useState<string[]>(() => TARGET.split("").map(() => ""))
  const [done, setDone] = useState(false)

  useEffect(() => {
    let frame = 0
    const lockAt = TARGET.split("").map((_, i) => 8 + i * 7)
    const total = Math.max(...lockAt) + 6

    const interval = setInterval(() => {
      frame += 1
      setDisplay(
        TARGET.split("").map((ch, i) => {
          if (frame >= lockAt[i]) return ch
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        }),
      )
      if (frame >= total) {
        clearInterval(interval)
        setDone(true)
      }
    }, 55)

    return () => clearInterval(interval)
  }, [])

  const ghostText = display
    .map((c, i) => (i === ATOM_INDEX && done && c === TARGET[ATOM_INDEX] ? "A" : c))
    .join("")

  const atomRevealed = done && display[ATOM_INDEX] === TARGET[ATOM_INDEX]

  return (
    <span
      className="relative inline-flex items-center font-display text-6xl font-bold tracking-[0.1em] text-white sm:text-7xl md:text-8xl"
      aria-label="SQUAD"
    >
      {/* RGB split layers */}
      <span
        aria-hidden="true"
        className="absolute inset-0 select-none text-[oklch(0.7_0.2_20)] opacity-70"
        style={{ transform: "translate(-2px,0)", mixBlendMode: "screen" }}
      >
        {ghostText}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 select-none text-[oklch(0.7_0.15_230)] opacity-70"
        style={{ transform: "translate(2px,0)", mixBlendMode: "screen" }}
      >
        {ghostText}
      </span>

      <span className="relative inline-flex items-center gap-[0.02em]">
        {display.map((c, i) => {
          if (i === ATOM_INDEX) {
            // Always show the atom slot — locked to "A" during decode, then swaps to atom SVG
            if (atomRevealed) {
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 160, damping: 12 }}
                  className="inline-flex items-center text-white"
                >
                  <AtomMark className="h-[0.72em] w-[0.72em] sm:h-[0.74em] sm:w-[0.74em]" />
                </motion.span>
              )
            }
            // Lock the A slot to always show "A" while other letters are still decoding
            return (
              <span key={i} className="opacity-90">
                A
              </span>
            )
          }
          return (
            <span key={i} className={c === TARGET[i] && done ? "" : "opacity-90"}>
              {c || "\u00A0"}
            </span>
          )
        })}
      </span>
    </span>
  )
}

export function SplashScreen({ onDismiss }: { onDismiss: () => void }) {
  const calledRef = useRef(false)

  // Auto-dismiss after 3.5 seconds
  useEffect(() => {
    const t = setTimeout(() => {
      if (!calledRef.current) {
        calledRef.current = true
        onDismiss()
      }
    }, 3500)
    return () => clearTimeout(t)
  }, [onDismiss])

  const scanlines = useMemo(
    () => ({
      backgroundImage:
        "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
    }),
    [],
  )

  return (
    <motion.div
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-black"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* CRT scanlines */}
      <div className="pointer-events-none absolute inset-0 opacity-60" style={scanlines} />

      <div className="relative flex flex-col items-center gap-8 px-6">
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
        >
          <DecodingText />
        </motion.div>

        <motion.p
          className="max-w-md text-center text-sm tracking-wide text-white/60"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          Departmental Club — Data Science Department, MLRIT
        </motion.p>
      </div>
    </motion.div>
  )
}
