import type { PageKey } from "../App";
import { Logo } from "./Logo";

export function Footer({ onNavigate: _ }: { onNavigate: (p: PageKey) => void }) {
  return (
    <footer className="relative" style={{ background: "var(--rw-navy)", color: "var(--rw-on-navy)" }}>
      <div className="overflow-hidden py-6" style={{ background: "var(--rw-amber)", color: "var(--rw-navy)", borderTop: "0.0625rem solid var(--rw-navy)", borderBottom: "0.0625rem solid var(--rw-navy)" }}>
        <div className="rw-marquee">
          <div className="rw-marquee-track rw-display text-3xl sm:text-5xl md:text-7xl">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 pr-12">
              <span>Sell smarter</span><span>✦</span>
              <span>BIR-ready POS</span><span>✦</span>
              <span>Built in the Philippines</span><span>✦</span>
              <span>30 days free</span><span>✦</span>
            </div>
          ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[min(92vw,87.5rem)] px-[clamp(1.25rem,3vw,2.5rem)] py-16 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-5">
          <Logo className="h-12 w-auto mb-6" invert />
          <p className="rw-display text-3xl md:text-4xl max-w-md" style={{ lineHeight: 1.05 }}>
            The point-of-sale your <em style={{ color: "var(--rw-amber)" }}>tita</em> would approve of.
          </p>

          <div className="mt-8 rw-mono text-sm opacity-90">
            <div>3rd Flr. Rm. 19 DLA Bldg. National Road Putatan, Muntinlupa City</div>
            <div className="mt-2">Email: <a className="rw-link" href="mailto:sales@retailwarepos.com">sales@retailwarepos.com</a> · <a className="rw-link" href="mailto:support@retailwarepos.com">support@retailwarepos.com</a></div>
            <div className="mt-1">Phone: <a className="rw-link" href="tel:+63288563683">(02) - 8-856-3683</a> · <a className="rw-link" href="tel:+639175044183">0917-504-4183</a></div>
          </div>
        </div>

        <FooterCol title="Retail Store" items={["Apparel & Boutique", "Hardware", "Mini-Marts", "Pharmacy", "Bookstores"]} />
        <FooterCol title="Food Store" items={["Restaurants", "Cafés", "Fast Food", "Fine Dining", "Cloud Kitchens"]} />
        <FooterCol title="Company" items={["About", "Careers", "Press Kit", "Contact", "Download", "Support", "Partners"]} />
      </div>

      <div className="mx-auto max-w-[min(92vw,87.5rem)] px-[clamp(1.25rem,3vw,2.5rem)] py-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between rw-mono text-[0.75rem] opacity-80" style={{ borderTop: "0.0625rem solid rgba(255,255,255,0.15)" }}>
        <div>©2008 by Retailware System.. Powered by PartnerSolutions, Co.</div>
        <div className="flex flex-wrap gap-4">
          <a className="rw-link" href="#">Privacy</a>
          <a className="rw-link" href="#">Terms</a>
          <a className="rw-link" href="#">BIR Compliance</a>
          <a className="rw-link" href="https://www.retailwarepos.com/fillup-form-request-support" target="_blank" rel="noopener">Support</a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
      <div className="rw-mono text-[0.75rem] mb-4 opacity-70">{title}</div>
      <ul className="space-y-3">
        {items.map((i) => {
          const href = i === "Download"
            ? "https://www.retailwarepos.com/download"
            : (i === "Support" ? "https://www.retailwarepos.com/fillup-form-request-support" : (i === "Contact" ? "mailto:sales@retailwarepos.com" : "#"));
          return (
            <li key={i}><a className="rw-link" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener' : undefined}>{i}</a></li>
          );
        })}
      </ul>
    </div>
  );
}
