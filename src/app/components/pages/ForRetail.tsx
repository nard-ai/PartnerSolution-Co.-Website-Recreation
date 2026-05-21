import { motion } from "motion/react";
import { ArrowUpRight, ScanBarcode, Tag, Boxes, Truck, Users, Building2, BarChart3, Wallet, Receipt, ShoppingBag, Package, Percent } from "lucide-react";
import type { PageKey } from "../../App";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Section } from "../Section";
import { Reveal } from "../Reveal";

export function ForRetail({ onNavigate }: { onNavigate: (p: PageKey) => void }) {
  return (
    <>
      <Section pad="hero">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="rw-tag">Retail Edition</span>
              <span className="rw-tag" style={{ background: "var(--rw-amber)", borderColor: "var(--rw-amber)", color: "var(--rw-navy)" }}>Boutique · Hardware · Pharmacy · Mini-Mart</span>
            </div>
            <h1 className="rw-display text-[clamp(2.75rem,7vw,8.75rem)]">
              {["For shelves", <>that need <em key="x" style={{ color: "var(--rw-amber)" }}>memory</em>.</>].map((line, i) => (
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
              Barcode-fast checkout, batch & expiry tracking, supplier-aware reorder points, and loyalty all in one calmly opinionated stack.
            </p>
            <div className="rounded-[1.75rem] overflow-hidden aspect-[5/4]" style={{ border: "0.0625rem solid var(--rw-rule)" }}>
              <ImageWithFallback src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=80" alt="retail" className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </Section>

      <ModuleBlock
        num="01"
        title="Front-End POS"
        kicker="Counter / Mobile / Pop-up"
        desc="Scan, ring, and bag in seconds. Built for queues that don't tolerate buffering."
        bg="var(--rw-bg-2)"
        features={[
          { i: ScanBarcode, t: "Barcode + SKU search", d: "Lightning lookup with offline cache." },
          { i: Tag, t: "Promos & discounts", d: "Tiered, BOGO, member-only — no spreadsheets." },
          { i: Receipt, t: "BIR-ready OR", d: "Validated receipt series, never miss a number." },
          { i: Wallet, t: "Multiple tenders", d: "Cash, e-wallets, card, layaway, store credit." },
          { i: Users, t: "Loyalty + CRM", d: "Points and tiers built in, no plug-in needed." },
          { i: ShoppingBag, t: "Hold & resume", d: "Park a basket, ring it up later — sticky carts." },
        ]}
      />

      <ModuleBlock
        num="02"
        title="Store Back-Office"
        kicker="Inventory / Pricing / People"
        desc="Know exactly what's on the shelf, in the stockroom, and headed your way from the supplier."
        bg="var(--rw-amber)"
        features={[
          { i: Boxes, t: "Batch & expiry tracking", d: "FIFO out-the-door, expiry alerts, and recall-ready batch numbers." },
          { i: Truck, t: "Auto reorder points", d: "Generate POs when stock dips below par, with supplier lead-time math." },
          { i: Percent, t: "Margin watcher", d: "Daily contribution by SKU, category, and supplier — ranked." },
          { i: Users, t: "Cashier shifts", d: "Z-out, cash drawer reconciliation, and variance flags per cashier." },
          { i: Tag, t: "Multi-tier pricing", d: "Wholesale, member, senior, PWD — set once, applied at the till." },
          { i: Package, t: "Stock counts & audits", d: "Cycle counts on tablet with barcode scanning and variance reporting." },
        ]}
      />

      <ModuleBlock
        num="03"
        title="Head-Office"
        kicker="Multi-branch · Consolidated"
        desc="Run a chain like one shop. Push price changes, promos, and product launches to all branches at once."
        bg="var(--rw-navy)"
        color="var(--rw-on-navy)"
        features={[
          { i: Building2, t: "Branch consolidation", d: "Roll-up sales, inventory, and payroll across every location, nightly." },
          { i: BarChart3, t: "Performance scoreboards", d: "Branch vs branch, week vs week, with attach-rate & basket-size leaders." },
          { i: Package, t: "Inter-branch transfers", d: "Move stock with full audit trail, in-transit visibility, and receiving." },
          { i: Receipt, t: "BIR exports", d: "Z-reports, sales journal, and inventory book in BIR-compliant format." },
          { i: Tag, t: "Centralized catalog", d: "One product master — push new items, prices, and promos to all branches." },
          { i: ScanBarcode, t: "Loyalty unification", d: "Customers earn and redeem points across every branch seamlessly." },
        ]}
      />

      <Section>
        <div className="rounded-[2.25rem] p-[clamp(2.5rem,6vw,3.5rem)] text-center" style={{ background: "var(--rw-amber)", color: "var(--rw-navy)" }}>
          <h2 className="rw-display text-5xl md:text-8xl">
            Stocked. Synced. <em>Sold.</em>
          </h2>
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
          <div className="rw-mono text-[0.75rem] opacity-80 mb-4">{num} · {kicker}</div>
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
            className="col-span-12 sm:col-span-6 lg:col-span-4 p-[clamp(1.5rem,3vw,1.75rem)] min-h-[13.75rem] flex flex-col justify-between h-full"
            style={{ background: bg, color: color || (bg === "var(--rw-amber)" ? "#0B1D3A" : "var(--rw-on-card)") }}
          >
            <f.i size="1.75rem" strokeWidth={1.5} />
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
