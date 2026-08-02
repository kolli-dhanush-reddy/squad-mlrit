"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Lock, X, Type, ImageIcon, Layout, Palette, MousePointerClick, ShieldCheck,
} from "lucide-react"

const ADMIN_PASSWORD = "Squad2026"
type Mode = "closed" | "login" | "dashboard"

export function AdminPanel() {
  const [mode, setMode] = useState<Mode>("closed")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [selectedTool, setSelectedTool] = useState("text")

  const togglePanel = () => {
    setMode((m) => {
      if (m === "closed") return "login"
      setPassword("")
      setError(false)
      return "closed"
    })
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault()
        togglePanel()
      }
    }
    const footerBtn = document.getElementById("footer-admin-trigger")
    const onFooterClick = () => togglePanel()
    window.addEventListener("keydown", onKey)
    footerBtn?.addEventListener("click", onFooterClick)
    return () => {
      window.removeEventListener("keydown", onKey)
      footerBtn?.removeEventListener("click", onFooterClick)
    }
  }, [])

  const close = () => { setMode("closed"); setPassword(""); setError(false) }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) { setMode("dashboard"); setError(false) }
    else setError(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setMode("login")}
        aria-label="Admin access"
        className="fixed bottom-2 right-2 z-[20] h-4 w-4 rounded-full opacity-0"
        tabIndex={-1}
      />
      <AnimatePresence>
        {mode === "login" && (
          <motion.div
            className="fixed inset-0 z-[9600] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.form
              onSubmit={submit}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-border bg-card p-7"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <Lock className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-lg font-semibold text-foreground">Secret Admin Login</h2>
                  <p className="text-xs text-muted-foreground">Restricted — editors only</p>
                </div>
              </div>
              <label htmlFor="admin-pass" className="mb-1.5 block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="admin-pass"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false) }}
                placeholder="Enter password"
                autoFocus
                className="w-full rounded-lg border border-input bg-white/10 backdrop-blur-sm px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
              />
              {error && <p className="mt-2 text-xs text-destructive">Incorrect password. Try again.</p>}
              <div className="mt-5 flex gap-2">
                <button type="button" onClick={close} className="flex-1 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                  Cancel
                </button>
                <button type="submit" className="flex-1 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                  Unlock
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}

        {mode === "dashboard" && (
          <motion.div
            className="fixed inset-0 z-[9600] flex flex-col bg-background/95 backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="font-display font-semibold text-foreground">SQUAD Studio</span>
                <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-primary">Mockup</span>
              </div>
              <button type="button" onClick={close} className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary" aria-label="Exit editor">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              <aside className="flex w-16 flex-col items-center gap-2 border-r border-border bg-secondary/40 py-4 sm:w-56 sm:items-stretch sm:px-3">
                {TOOLS.map((tool) => {
                  const isActive = selectedTool === tool.id
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => setSelectedTool(tool.id)}
                      className={`flex items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors sm:justify-start ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
                    >
                      <tool.icon className="h-5 w-5 shrink-0" />
                      <span className="hidden sm:inline">{tool.label}</span>
                    </button>
                  )
                })}
              </aside>

              <main className="relative flex-1 overflow-auto bg-muted/40 p-6">
                <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-primary/40 bg-card p-8">
                  <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <MousePointerClick className="h-4 w-4" />
                    Click an element on the page to edit it
                  </div>
                  <div className="group relative mb-4 rounded-lg border-2 border-transparent p-3 transition-colors hover:border-primary/50">
                    <span className="absolute -top-2.5 left-3 hidden rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground group-hover:block">Editable heading</span>
                    <h3 className="font-display text-2xl font-bold text-foreground">Where sharp minds build what&apos;s next.</h3>
                  </div>
                  <div className="group relative mb-4 rounded-lg border-2 border-transparent p-3 transition-colors hover:border-primary/50">
                    <span className="absolute -top-2.5 left-3 hidden rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground group-hover:block">Editable text</span>
                    <p className="text-sm leading-relaxed text-muted-foreground">SQUAD is a community of engineers, designers, and dreamers dedicated to technical excellence.</p>
                  </div>
                  <div className="group relative rounded-lg border-2 border-transparent p-3 transition-colors hover:border-primary/50">
                    <span className="absolute -top-2.5 left-3 hidden rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground group-hover:block">Editable image</span>
                    <div className="flex h-40 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <ImageIcon className="h-8 w-8" />
                    </div>
                  </div>
                </div>
              </main>

              <aside className="hidden w-64 flex-col gap-4 border-l border-border p-5 lg:flex">
                <h4 className="font-display text-sm font-semibold text-foreground">
                  {TOOLS.find((t) => t.id === selectedTool)?.label} Options
                </h4>
                <div className="flex flex-col gap-3">
                  <MockControl label="Content" placeholder="Type here..." />
                  <MockControl label="Font size" placeholder="48px" />
                  <MockControl label="Color" placeholder="#7c3aed" />
                </div>
                <button type="button" className="mt-auto rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-80" disabled>
                  Save changes (wire to backend)
                </button>
              </aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const TOOLS = [
  { id: "text", label: "Edit Text", icon: Type },
  { id: "image", label: "Change Image", icon: ImageIcon },
  { id: "layout", label: "Layout", icon: Layout },
  { id: "theme", label: "Theme", icon: Palette },
]

function MockControl({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input readOnly placeholder={placeholder} className="w-full rounded-lg border border-input bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none" />
    </label>
  )
}
