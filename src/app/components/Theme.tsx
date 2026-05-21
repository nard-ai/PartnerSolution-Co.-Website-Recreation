import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Mode = "light" | "dark";
const ThemeCtx = createContext<{ mode: Mode; toggle: () => void }>({ mode: "dark", toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);
  const toggle = () => setMode((m) => (m === "light" ? "dark" : "light"));
  return <ThemeCtx.Provider value={{ mode, toggle }}>{children}</ThemeCtx.Provider>;
}
export const useTheme = () => useContext(ThemeCtx);
