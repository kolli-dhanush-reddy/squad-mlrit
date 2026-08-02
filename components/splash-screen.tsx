"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "motion/react"
import { AtomMark } from "@/components/squad-logo"

const TARGET = "SQUAD"
const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function DecodingText() {
  // locked[i] = true once that letter has resolved
  const [locked, setLocked] = useState<boolean[]>([false, false, false, false, false])
  const [atomVisible, setAtomVisible] = useState(false)

  useEffect(() => {
    // Lock S, Q, U, D in sequence — leave index 3 (A) for last
    const order = [0, 1, 2, 4] // S Q U D
    const timers: ReturnType<typeof setTimeout>[] = []

    order.forEach((idx, step) => {
      timers.push(
        setTimeout(() => {
          setLocked((prev) => {
            const next = [...prev]
            next[idx] = true
            return next
          })
        }, 400 + step * 300),
      )
    })

    // Lock the A last, then immediately swap to atom
    timers.push(
      setTimeout(() => {
        setLocked([true, true, true, true, true])
        setTimeout(() => setAtomVisible(true), 120)
      }, 400 + 4 * 300),
    )

    return () => timers.forEach(clearTimeout)
  }, [])

  // Scramble display for unlocked letters
  const [scramble, setScramble] = useState<string[]>(["", "", "", "", ""])
  useEffect(() => {
    const id = setInterval(() => {
      setScramble(TARGET.split("").map((ch, i) => {
        if (locked[i]) return ch
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }))
    }, 55)
    return () => clearInterval(id)
  }, [locked])

  // Ghost text for RGB split — always show plain letters (no atom in ghost)
  const ghostText = TARGET.split("").map((ch, i) => locked[i] ? ch : (scramble[i] || ch)).join("")

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
        {TARGET.split("").map((ch, i) => {
          // The A slot
          if (i === 3) {
            if (atomVisible) {
              return (
                <motion.span
                  key="atom"
                  initial={{ opacity: 0, scale: 0.4, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14 }}
                  className="inline-flex items-center justify-center text-white"
                >
                  <AtomMark className="h-[0.82em] w-[0.82em]" />
                </motion.span>
              )
            }
            // Show "A" while other letters decode, then lock it last
            return (
              <span key="a-slot">
                {locked[i] ? "A" : (scramble[i] || "\u00A0")}
              </span>
            )
          }

          return (
            <span key={i} className={locked[i] ? "" : "opacity-70"}>
              {locked[i] ? ch : (scramble[i] || "\u00A0")}
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
