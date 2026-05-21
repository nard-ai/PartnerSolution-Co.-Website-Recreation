export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="38" height="38" rx="10" fill="var(--rw-ink)" />
      <circle cx="14" cy="20" r="6" fill="var(--rw-coral)" />
      <circle cx="26" cy="20" r="6" fill="var(--rw-lime)" style={{ mixBlendMode: "difference" } as any} />
      <rect x="6" y="28" width="28" height="2" fill="var(--rw-paper)" />
    </svg>
  );
}
