import type { ReactNode, CSSProperties } from "react";

export function Section({
  children,
  bg,
  color,
  pad = "default",
}: {
  children: ReactNode;
  bg?: string;
  color?: string;
  pad?: "default" | "hero" | "tight";
}) {
  const style: CSSProperties = {};
  if (bg) style.background = bg;
  if (color) style.color = color;
  const py = pad === "hero" ? "pt-10 pb-20 md:pt-16 md:pb-28" : pad === "tight" ? "py-12" : "py-20 md:py-28";
  return (
    <section className={`relative ${py}`} style={style}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">{children}</div>
    </section>
  );
}
