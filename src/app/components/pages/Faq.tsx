import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Search, Plus } from "lucide-react";
import type { PageKey } from "../../App";
import { Section } from "../Section";
import { Reveal } from "../Reveal";

const faqs = [
  { cat: "BIR Permit", q: "Is RetailWare BIR-accredited?", a: "Yes. RetailWare is a BIR-accredited POS software (CAS — Computerized Accounting System). We provide the Permit-to-Use (PTU) documentation, system overview, and all sample receipts your RDO requires." },
  { cat: "BIR Permit", q: "What documents do I need to apply for a BIR POS permit?", a: "You'll need: BIR Form 1900 (Application for Authority to Use CAS), system flowchart, sample official receipts/invoices, sworn statement, and proof of business registration. We provide a turnkey packet and walk you through every step." },
  { cat: "BIR Permit", q: "How long does the BIR permit process take?", a: "On average, 3–6 weeks from application to PTU release. RetailWare's onboarding team coordinates directly with your RDO and supplies all technical documents, which typically halves the back-and-forth." },
  { cat: "BIR Permit", q: "Can I sell while my permit is being processed?", a: "Yes — you can operate under a manual receipt provisional setup while the PTU is in review. RetailWare runs in 'transition mode' so your data syncs without violating BIR rules." },
  { cat: "BIR Permit", q: "What happens during a BIR audit?", a: "RetailWare auto-generates Z-reports, sales journals, inventory books, and the BIR Computerized Books of Accounts in the exact required format. You hand the auditor a USB. Done." },
  { cat: "Pricing", q: "How much does RetailWare cost?", a: "Plans start at ₱1,499/month per branch. Multi-branch and head-office plans get tiered pricing. The 30-day trial requires no credit card." },
  { cat: "Setup", q: "How long does setup take?", a: "Most stores are live within 48 hours of signup. The migration team imports your existing menu/inventory and trains your staff via Zoom or on-site (Metro Manila)." },
  { cat: "Hardware", q: "Do I need to buy special hardware?", a: "No. RetailWare runs on Android tablets, Windows POS terminals, or even your existing iPad. We sell certified hardware bundles if you'd rather not source it yourself." },
  { cat: "Support", q: "What if my internet goes down?", a: "RetailWare is offline-first. Your POS keeps ringing sales, and the system auto-syncs as soon as you're back online — including BIR-compliant series numbering." },
  { cat: "Support", q: "How do I reach your support team?", a: "Viber, email, phone, and in-app chat — Mon–Sat 7AM–10PM Manila time. Average response time: 4 minutes." },
];

const categories = ["All", "BIR Permit", "Pricing", "Setup", "Hardware", "Support"] as const;

export function Faq({ onNavigate }: { onNavigate: (p: PageKey) => void }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [open, setOpen] = useState<number | null>(0);

  const filtered = useMemo(() => {
    return faqs
      .map((f, i) => ({ ...f, i }))
      .filter((f) => (cat === "All" || f.cat === cat) && (f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase())));
  }, [query, cat]);

  return (
    <>
      <Section pad="hero">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <span className="rw-tag mb-6">Manual · Frequently Asked</span>
            <h1 className="rw-display text-[44px] sm:text-[64px] md:text-[120px] lg:text-[150px] mt-6">
              {["Read the", <em key="x" style={{ color: "var(--rw-amber)" }}>fine print</em>, "."].slice(0, 2).map((line, i) => (
                <motion.span key={i} className="block"
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}>
                  {line}
                </motion.span>
              ))}
            </h1>
          </div>
          <Reveal delay={0.4} className="col-span-12 lg:col-span-4 flex flex-col justify-end gap-4">
            <p className="text-lg" style={{ color: "var(--rw-ink-soft)" }}>
              Most questions are about the BIR Permit-to-Use process. We've answered every one we've ever been asked.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.4}>
          <div className="mt-12 grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-7 relative">
              <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 opacity-60" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the manual… e.g. 'BIR permit'"
                className="w-full px-14 py-5 rounded-full bg-transparent rw-mono text-sm outline-none focus:bg-[var(--rw-card)]"
                style={{ border: "1px solid var(--rw-line)", color: "var(--rw-ink)" }}
              />
            </div>
            <div className="col-span-12 lg:col-span-5 flex gap-2 items-center overflow-x-auto sm:flex-wrap sm:overflow-visible pb-2">
              {categories.map((c) => {
                const active = cat === c;
                return (
                  <motion.button
                    key={c}
                    onClick={() => setCat(c)}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-4 py-2 rounded-full shrink-0"
                    style={{ border: "1px solid var(--rw-line)" }}
                  >
                    {active && (
                      <motion.span layoutId="rw-cat-pill" className="absolute inset-0 rounded-full" style={{ background: "var(--rw-amber)" }} />
                    )}
                    <span className="relative rw-mono text-[12px]" style={{ color: active ? "var(--rw-navy)" : "var(--rw-ink)" }}>{c}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Section>

      <Section pad="tight">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3 hidden lg:block">
            <div className="sticky top-32 rw-mono text-[12px] opacity-70">
              <div className="mb-3">Index</div>
              {filtered.map((f) => (
                <button key={f.i} onClick={() => setOpen(f.i)} className="block text-left py-2 rw-link">
                  {String(f.i + 1).padStart(2, "0")} — {f.q.slice(0, 28)}…
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <div style={{ borderTop: "1px solid var(--rw-rule)" }}>
              {filtered.map((f) => {
                const isOpen = open === f.i;
                return (
                  <div key={f.i} style={{ borderBottom: "1px solid var(--rw-rule)" }}>
                    <button
                      onClick={() => setOpen(isOpen ? null : f.i)}
                      className="w-full py-7 flex items-start gap-4 md:gap-6 text-left group"
                    >
                      <span className="rw-mono text-xs opacity-70 pt-3 shrink-0">{String(f.i + 1).padStart(2, "0")}</span>
                      <span className="rw-tag self-start mt-2 hidden sm:inline-flex" style={{ background: f.cat === "BIR Permit" ? "var(--rw-amber)" : "transparent", borderColor: f.cat === "BIR Permit" ? "var(--rw-amber)" : "var(--rw-line)", color: f.cat === "BIR Permit" ? "var(--rw-navy)" : "var(--rw-ink)" }}>{f.cat}</span>
                      <span className="rw-display text-2xl md:text-4xl flex-1 group-hover:italic transition-all">{f.q}</span>
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className="pt-2 shrink-0">
                        <Plus />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 md:pl-16 pr-2 md:pr-12 max-w-3xl text-lg" style={{ color: "var(--rw-ink-soft)" }}>
                            {f.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div className="py-16 text-center rw-mono text-sm opacity-70">No matches. Try a different keyword.</div>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="rounded-[28px] p-10 md:p-14 flex flex-col items-center justify-center text-center" style={{ background: "var(--rw-navy)", color: "var(--rw-on-navy)" }}>
          <h2 className="rw-display text-3xl sm:text-4xl md:text-6xl">
            Still have questions? <em style={{ color: "var(--rw-amber)" }}>Talk to a human.</em>
          </h2>
        </div>
      </Section>
    </>
  );
}
