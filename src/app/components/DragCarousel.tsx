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
          className="flex gap-4 px-6 md:px-10 py-4"
          style={{ width: "max-content" }}
        >
          {children}
        </motion.div>
      </div>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 mt-4 flex items-center gap-2 rw-mono text-[12px] opacity-70">
        <MoveHorizontal size={14} /> click & drag · or swipe
      </div>
    </div>
  );
}
