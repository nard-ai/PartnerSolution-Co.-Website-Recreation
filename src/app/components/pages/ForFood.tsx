import { motion } from "motion/react";
import { ArrowUpRight, ChefHat, Receipt, Utensils, Flame, Boxes, Truck, Users, Building2, BarChart3, Wallet } from "lucide-react";
import type { PageKey } from "../../App";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Section } from "../Section";
import { Reveal } from "../Reveal";

export function ForFood({ onNavigate }: { onNavigate: (p: PageKey) => void }) {
  return (
    <>
      <Section pad="hero">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="rw-tag">Food Edition</span>
              <span className="rw-tag" style={{ background: "var(--rw-amber)", borderColor: "var(--rw-amber)", color: "var(--rw-navy)" }}>Restaurants · Cafés · QSR · Fine Dining</span>
            </div>
            <h1 className="rw-display text-[44px] sm:text-[64px] md:text-[120px] lg:text-[140px]">
              {["For the", <em key="x" style={{ color: "var(--rw-amber)" }}>kitchen</em>, "that never", "sleeps."].map((line, i) => (
                <motion.span
                  key={i}
                  className="block"
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>
          </div>
          <Reveal delay={0.4} className="col-span-12 lg:col-span-5 flex flex-col justify-end gap-6">
            <p className="text-lg" style={{ color: "var(--rw-ink-soft)" }}>
              From a single ramen counter to a 30-branch chicken empire — RetailWare handles modifiers, recipes, table maps, KDS routing, and split bills without breaking a sweat.
            </p>
            <div className="rounded-[28px] overflow-hidden aspect-[5/4]" style={{ border: "1px solid var(--rw-rule)" }}>
              <ImageWithFallback src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80" alt="kitchen" className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </Section>

      <ModuleBlock
        num="01"
        title="Front-End POS"
        kicker="Counter / Floor / Drive-Thru"
        desc="A tap-fast tablet POS designed for greasy fingers, evening rush, and ten-table sections."
        bg="var(--rw-bg-2)"
        features={[
          { i: Utensils, t: "Table maps & merges", d: "Drag-merge-split tables in real time." },
          { i: ChefHat, t: "Modifiers & combos", d: "Endless variations, no menu chaos." },
          { i: Flame, t: "Kitchen Display Sync", d: "Tickets fly to KDS in <1 second." },
          { i: Receipt, t: "BIR-compliant receipts", d: "Series, OR, VAT, exempt — handled." },
          { i: Wallet, t: "Multiple tenders", d: "Cash, GCash, Maya, card, gift cert." },
          { i: Users, t: "Server attribution", d: "Track sales per crew, per shift." },
        ]}
      />

      <ModuleBlock
        num="02"
        title="Store Back-Office"
        kicker="Recipes / Inventory / Costing"
        desc="The brain behind the burger. Real-time food cost, recipe yield, and supplier-aware reordering."
        bg="var(--rw-amber)"
        features={[
          { i: Boxes, t: "Recipe-level inventory", d: "Each sold dish auto-deducts ingredients in real time." },
          { i: Truck, t: "Supplier orders", d: "Generate POs from low-stock alerts and receive against PO." },
          { i: BarChart3, t: "Daily food cost", d: "See margin shifts before payroll does, with per-dish breakdown." },
          { i: Users, t: "Crew schedules", d: "Shift planner, biometric clock-in, and timesheet exports." },
          { i: Wallet, t: "Cash drawer reconciliation", d: "Z-out per shift with cash variance flags and audit trail." },
          { i: Flame, t: "Wastage tracking", d: "Log spoilage and 86'd items to keep menu margins honest." },
        ]}
      />

      <ModuleBlock
        num="03"
        title="Head-Office"
        kicker="Multi-branch · Consolidated"
        desc="See every kitchen from a single dashboard. Push menu updates to all branches in one click."
        bg="var(--rw-navy)"
        color="var(--rw-on-navy)"
        features={[
          { i: Building2, t: "Branch consolidation", d: "Sales, costs, and payroll rolled up nightly across all locations." },
          { i: BarChart3, t: "Menu engineering", d: "See your stars, dogs, plowhorses, and puzzles by branch and daypart." },
          { i: Receipt, t: "BIR exports", d: "Z-reports, sales journal, and inventory book in BIR-ready format." },
          { i: ChefHat, t: "Central recipe library", d: "Edit a recipe once, push to every kitchen instantly." },
          { i: Truck, t: "Commissary distribution", d: "Track central kitchen output and inter-branch ingredient transfers." },
          { i: Utensils, t: "Franchise dashboards", d: "Royalty calculations and brand-standard compliance scoring." },
        ]}
      />

      <Section>
        <div className="rounded-[36px] p-10 md:p-14 grid grid-cols-12 gap-6 items-center" style={{ background: "var(--rw-amber)", color: "var(--rw-navy)" }}>
          <div className="col-span-12 flex flex-col items-center text-center gap-4 py-2 md:py-4">
            <h2 className="rw-display w-full max-w-none text-[clamp(3.5rem,7vw,7.75rem)] leading-[0.92] tracking-[-0.05em]">
              Hungry to switch? <em>Let's plate it up.</em>
            </h2>
            <p className="w-full max-w-none text-lg md:text-2xl font-medium opacity-70">
              Switch to RetailWare and go live in 48 hours.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

function ModuleBlock({
  num, title, kicker, desc, features, bg, color,
}: {
  num: string; title: string; kicker: string; desc: string;
  features: { i: any; t: string; d: string }[];
  bg: string; color?: string;
}) {
  return (
    <Section bg={bg} color={color}>
      <div className="grid grid-cols-12 gap-6 mb-10">
        <Reveal className="col-span-12 lg:col-span-4">
          <div className="rw-mono text-[12px] opacity-80 mb-4">{num} · {kicker}</div>
          <h2 className="rw-display text-5xl md:text-7xl">{title}</h2>
        </Reveal>
        <Reveal delay={0.1} className="col-span-12 lg:col-span-5 lg:col-start-7 self-end">
          <p className="text-lg opacity-90 max-w-md">{desc}</p>
        </Reveal>
      </div>
      <div className="grid grid-cols-12 gap-px" style={{ background: color || "var(--rw-rule)" }}>
        {features.map((f, idx) => (
          <Reveal
            key={idx}
            delay={idx * 0.05}
            className="col-span-12 sm:col-span-6 lg:col-span-4 p-7 min-h-[220px] flex flex-col justify-between h-full"
            style={{ background: bg, color: color || (bg === "var(--rw-amber)" ? "#0B1D3A" : "var(--rw-on-card)") }}
          >
            <f.i size={28} strokeWidth={1.5} />
            <div>
              <h3 className="rw-display text-2xl mb-2">{f.t}</h3>
              <p className="text-sm opacity-80">{f.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
