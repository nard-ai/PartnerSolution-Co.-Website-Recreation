  import { motion } from "motion/react";
import type { PageKey } from "../../App";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Section } from "../Section";
import { Reveal, CountUp } from "../Reveal";

export function About({ onNavigate: _ }: { onNavigate: (p: PageKey) => void }) {
  return (
    <>
      <Section pad="hero">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <span className="rw-tag mb-6">Colophon · Who we are</span>
            <h1 className="rw-display text-[clamp(2.75rem,7vw,9.375rem)] mt-6">
              {["We build POS", <>for the <em key="x" style={{ color: "var(--rw-amber)" }}>Pinoy</em></>, "hustle."].map((line, i) => (
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
              PartnerSolutions, Co. is a Filipino software company behind
Retailware, all-in-one POS, back-office, and head-office
stack built for Filipino SMEs, restaurants, and retail chains.
We've been serving Filipino businesses since 2008.
            </p>
            <div className="rw-mono text-xs opacity-70">EST. 2008 · MUNTINLUPA, PH</div>
          </Reveal>
        </div>
      </Section>

      {/* Sticky split — mission */}
      <Section bg="var(--rw-navy)" color="var(--rw-on-navy)">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <span className="rw-tag" style={{ borderColor: "var(--rw-on-navy)", color: "var(--rw-on-navy)" }}>Mission</span>
              <h2 className="rw-display text-4xl sm:text-5xl md:text-7xl mt-6">
                The corner store deserves <em style={{ color: "var(--rw-amber)" }}>better tools</em>.
              </h2>
              <div className="mt-10 grid grid-cols-3 gap-4">
                <Stat n={2400} suffix="+" label="Merchants" />
                <Stat n={42} label="Team Pinoys" />
                <Stat n={11} label="Years building" />
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 grid gap-6">
            {[
              ["01", "Local first", "We design for brownouts, slow internet, and BIR forms — because that's the real Philippines."],
              ["02", "SME-priced", "Enterprise software shouldn't cost an enterprise. Pricing scales with your shelves, not the seat count."],
              ["03", "Human support", "Real Pinoys answering Viber by 7AM. Tagalog, Bisaya, English — whatever flows."],
              ["04", "Long memory", "We support old hardware longer than anyone. Your 2018 tablet still gets updates."],
            ].map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 0.08} className="grid grid-cols-12 gap-4 py-6" style={{ borderTop: "0.0625rem solid rgba(255,255,255,0.15)" }}>
                <div className="col-span-2 rw-mono text-sm opacity-70">{n}</div>
                <div className="col-span-10">
                  <h3 className="rw-display text-3xl md:text-4xl mb-2">{t}</h3>
                  <p className="opacity-80">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Team photo collage */}
      <Section>
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <Reveal>
            <div>
              <span className="rw-tag mb-4">The crew</span>
              <h2 className="rw-display text-4xl sm:text-6xl md:text-8xl mt-6"><CountUp to={42} /> humans.<br />One mission.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md" style={{ color: "var(--rw-ink-soft)" }}>
              Engineers, designers, BIR-whisperers, and onboarding specialists, based at our Muntinlupa HQ with field teams across Metro Manila.
            </p>
          </Reveal>
        </div>

        {/* Full-bleed horizontal scroll */}
      </Section>
      <div className="rw-hscroll px-6 md:px-10 pb-10">
        {[
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
          "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=1200&q=80",
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80",
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80",
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&q=80",
        ].map((src, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="rounded-[1.5rem] overflow-hidden"
            style={{ width: "min(70vw, 26.25rem)", aspectRatio: "4/5", border: "0.0625rem solid var(--rw-rule)" }}
          >
            <ImageWithFallback src={src} alt="team" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Values strip */}
      <Section bg="var(--rw-amber)" color="var(--rw-navy)">
        <div className="grid grid-cols-12 gap-px" style={{ background: "var(--rw-navy)" }}>
          {[
            ["☉", "Transparency", "Open pricing, open changelog, open Mondays."],
            ["✺", "Patience", "We onboard at your pace, not ours."],
            ["◆", "Craft", "Shipping software like a kape — slow, deliberate, hot."],
            ["★", "Bayanihan", "When one merchant grows, the whole community wins."],
          ].map(([icon, t, d], i) => (
            <Reveal key={t as string} delay={i * 0.06} className="col-span-12 sm:col-span-6 lg:col-span-3 p-8 h-full" style={{ background: "var(--rw-amber)" }}>
              <div className="rw-display text-5xl mb-4">{icon}</div>
              <h3 className="rw-display text-2xl mb-2">{t}</h3>
              <p className="text-sm opacity-90">{d}</p>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

function Stat({ n, suffix = "", label }: { n: number; suffix?: string; label: string }) {
  return (
    <div>
      <div className="rw-display text-4xl sm:text-5xl md:text-6xl"><CountUp to={n} suffix={suffix} /></div>
      <div className="rw-mono text-[0.75rem] opacity-70 mt-2">{label}</div>
    </div>
  );
}
