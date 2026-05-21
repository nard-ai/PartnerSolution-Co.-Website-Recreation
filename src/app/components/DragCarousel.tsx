import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion } from "motion/react";
import { MoveHorizontal } from "lucide-react";

export function DragCarousel({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const update = () => {
      const c = containerRef.current;
      const t = trackRef.current;
      if (!c || !t) return;
      const overflow = t.scrollWidth - c.clientWidth;
      setBounds({ left: -Math.max(overflow, 0), right: 0 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="relative">
      <div ref={containerRef} className="overflow-hidden" style={{ cursor: "grab" }}>
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={bounds}
          dragElastic={0.08}
          whileTap={{ cursor: "grabbing" }}
          className="flex gap-4 px-[clamp(1.25rem,3vw,2.5rem)] py-4"
          style={{ width: "max-content" }}
        >
          {children}
        </motion.div>
      </div>
      <div className="mx-auto max-w-[min(92vw,87.5rem)] px-[clamp(1.25rem,3vw,2.5rem)] mt-4 flex items-center gap-2 rw-mono text-[0.75rem] opacity-70">
        <MoveHorizontal size="0.875rem" /> click & drag · or swipe
      </div>
    </div>
  );
}
