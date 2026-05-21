import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import type { PageKey } from "../App";
import { Logo } from "./Logo";
import { useTheme } from "./Theme";

const items: { key: PageKey; label: string; num: string }[] = [
  { key: "home", label: "Index", num: "01" },
  { key: "food", label: "For Food", num: "02" },
  { key: "retail", label: "For Retail", num: "03" },
  { key: "about", label: "About", num: "04" },
  { key: "faq", label: "FAQ", num: "05" },
];

export function Nav({ page, onNavigate }: { page: PageKey; onNavigate: (p: PageKey) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { mode, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-40 w-full"
        style={{
          backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
          background: scrolled ? "color-mix(in srgb, var(--rw-bg) 80%, transparent)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--rw-rule)" : "1px solid transparent",
          transition: "background .3s ease, border-color .3s ease, backdrop-filter .3s ease",
        }}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-5 md:px-10 py-4 flex items-center justify-between gap-4">
          <button onClick={() => onNavigate("home")} className="shrink-0 flex items-center" aria-label="RetailWare home">
            <Logo className="h-9 md:h-10 w-auto" />
          </button>

          {/* Pill nav — desktop */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full" style={{ border: "1px solid var(--rw-line)" }}>
            {items.map((it) => (
              <button
                key={it.key}
                onClick={() => onNavigate(it.key)}
                className="relative px-4 py-2 rounded-full transition-colors"
                style={{ color: page === it.key ? "var(--rw-on-navy)" : "var(--rw-ink)" }}
              >
                {page === it.key && (
                  <motion.span
                    layoutId="rw-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--rw-navy)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative rw-mono text-[12px]">{it.num} · {it.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="relative w-10 h-10 rounded-full overflow-hidden grid place-items-center"
              style={{ border: "1px solid var(--rw-line)" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mode}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 grid place-items-center"
                >
                  {mode === "light" ? <Moon size={16} /> : <Sun size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <a className="hidden md:inline-flex rw-btn-outline !py-3 !px-4 mr-2" href="https://www.retailwarepos.com/download" target="_blank" rel="noopener">Download</a>
            <button className="hidden md:inline-flex rw-btn !py-3 !px-5" onClick={() => onNavigate("home")}>
              30-Day Trial <ArrowUpRight size={16} />
            </button>

            {/* Hamburger only below lg — replaces the pill nav */}
            <button
              className="lg:hidden w-10 h-10 rounded-full grid place-items-center"
              style={{ border: "1px solid var(--rw-line)" }}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ background: "var(--rw-navy)", color: "var(--rw-on-navy)" }}
          >
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
              <Logo className="h-9 w-auto" invert />
              <button className="p-2" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
            </div>
            <div className="flex-1 px-5 py-8 flex flex-col gap-1">
              {items.map((it, i) => (
                <motion.button
                  key={it.key}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}
                  onClick={() => { onNavigate(it.key); setOpen(false); }}
                  className="text-left flex items-baseline gap-4 py-4"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <span className="rw-mono text-xs opacity-70">{it.num}</span>
                  <span className="rw-display text-3xl sm:text-5xl">{it.label}</span>
                </motion.button>
              ))}
              <button
                className="rw-btn mt-8 self-start"
                onClick={() => { onNavigate("home"); setOpen(false); }}
              >
                Start 30-Day Trial <ArrowUpRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
