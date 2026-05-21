import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Home } from "./components/pages/Home";
import { ForFood } from "./components/pages/ForFood";
import { ForRetail } from "./components/pages/ForRetail";
import { About } from "./components/pages/About";
import { Faq } from "./components/pages/Faq";
import { ThemeProvider } from "./components/Theme";
import "../styles/retailware.css";

export type PageKey = "home" | "food" | "retail" | "about" | "faq";

export default function App() {
  const [page, setPage] = useState<PageKey>("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const Page = {
    home: <Home onNavigate={setPage} />,
    food: <ForFood onNavigate={setPage} />,
    retail: <ForRetail onNavigate={setPage} />,
    about: <About onNavigate={setPage} />,
    faq: <Faq onNavigate={setPage} />,
  }[page];

  return (
    <ThemeProvider>
      <div className="rw-root min-h-screen w-full">
        <Nav page={page} onNavigate={setPage} />
        <AnimatePresence mode="wait">
          <motion.main
            key={page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {Page}
          </motion.main>
        </AnimatePresence>
        <Footer onNavigate={setPage} />
      </div>
    </ThemeProvider>
  );
}
