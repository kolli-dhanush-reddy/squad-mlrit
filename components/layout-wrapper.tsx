"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "motion/react"
import { SplashScreen } from "@/components/splash-screen"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen onDismiss={() => setShowSplash(false)} />}
      </AnimatePresence>
      {!showSplash && <>{children}</>}
    </>
  )
}
