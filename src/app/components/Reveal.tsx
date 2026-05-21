import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

export function Reveal({
  children, delay = 0, y = 24, className, style,
}: { children: ReactNode; delay?: number; y?: number; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({ to, suffix = "", duration = 1.6, prefix = "" }: { to: number; suffix?: string; duration?: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);
  useEffect(() => {
    if (inView) {
      const ctrl = animate(mv, to, { duration, ease: [0.22, 1, 0.36, 1] });
      return ctrl.stop;
    }
  }, [inView, to, duration, mv]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}
