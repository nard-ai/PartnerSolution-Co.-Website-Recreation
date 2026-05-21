import { useEffect, useState } from "react";
import { useTheme } from "./Theme";

// Resolve the uploaded PNG via Vite's URL handling. Falls back gracefully
// if the asset can't be served, so the site never fails to render.
let resolvedLogoUrl: string | null = null;
try {
  resolvedLogoUrl = new URL("../../imports/partnersolutionv3.png", import.meta.url).href;
} catch {
  resolvedLogoUrl = null;
}

export function Logo({ className = "h-9", invert = false }: { className?: string; invert?: boolean }) {
  const { mode } = useTheme();
  const shouldInvert = invert || mode === "dark";
  const [broken, setBroken] = useState(!resolvedLogoUrl);

  useEffect(() => { setBroken(!resolvedLogoUrl); }, []);

  if (broken) {
    return (
      <span
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 22,
          color: shouldInvert ? "var(--rw-on-navy)" : "var(--rw-navy)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        RetailWare<span style={{ color: "var(--rw-amber)" }}>.</span>
      </span>
    );
  }

  return (
    <img
      src={resolvedLogoUrl!}
      alt="PartnerSolutions Co. — RetailWare"
      className={className}
      onError={() => setBroken(true)}
      style={{ filter: shouldInvert ? "invert(1) brightness(1.1)" : "none", display: "block" }}
    />
  );
}
