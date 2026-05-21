import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowDown, Star, Zap, ShieldCheck, Banknote, BarChart3, Boxes } from "lucide-react";
import type { PageKey } from "../../App";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Section } from "../Section";
import { Reveal, CountUp } from "../Reveal";
import { DragCarousel } from "../DragCarousel";

const localAssets = import.meta.glob("/src/imports/**/*", { eager: true, import: "default" }) as Record<string, string>;
const resolveAsset = (src: string) => localAssets[src] ?? src;

export function Home({ onNavigate }: { onNavigate: (p: PageKey) => void }) {
  const testimonialViewportRef = useRef<HTMLDivElement>(null);
  const testimonialGestureRef = useRef({ pointerId: -1, startX: 0, startY: 0, axis: null as null | "x" | "y" });
  const [testimonialWidth, setTestimonialWidth] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialOffset, setTestimonialOffset] = useState(0);
  const [testimonialDragging, setTestimonialDragging] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      const viewport = testimonialViewportRef.current;
      if (!viewport) return;
      setTestimonialWidth(viewport.clientWidth);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    if (testimonialViewportRef.current) observer.observe(testimonialViewportRef.current);
    window.addEventListener("resize", updateWidth);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    setTestimonialOffset(-testimonialIndex * testimonialWidth);
  }, [testimonialIndex, testimonialWidth]);

  useEffect(() => {
    if (!activeVideoId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveVideoId(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideoId]);

  const testimonialSlides = [
    {
      quote:
        "Well it was affordable compared to other POS providers. Through use of Retailware we can transact conveniently with our customers, we can provide reports easily, and we can now monitor our promos easily.",
      who: "Gina Mojeno",
      role: "MIS Manager",
    },
    {
      quote:
        "Software that is worth paying for, and an excellent service provider.",
      who: "Dewanie Gaspar",
      role: "Operation Manager",
    },
    {
      quote:
        "I would describe your product as MY BUSINESS PARTNER IN INVENTORY AND SALES MANAGEMENT.",
      who: "Sarah Pantino",
      role: "TGP Franchisee",
    },
  ];

  const handleTestimonialPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    testimonialGestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      axis: null,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    setTestimonialDragging(false);
  };

  const handleTestimonialPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const gesture = testimonialGestureRef.current;
    if (gesture.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - gesture.startX;
    const deltaY = event.clientY - gesture.startY;

    if (!gesture.axis) {
      const jitter = testimonialWidth * 0.005;
      if (Math.abs(deltaX) < jitter && Math.abs(deltaY) < jitter) return;
      gesture.axis = Math.abs(deltaX) > Math.abs(deltaY) ? "x" : "y";
    }

    if (gesture.axis === "x") {
      event.preventDefault();
      setTestimonialDragging(true);
      setTestimonialOffset(-testimonialIndex * testimonialWidth + deltaX);
    }
  };

  const endTestimonialDrag = (clientX: number) => {
    const gesture = testimonialGestureRef.current;
    const deltaX = clientX - gesture.startX;
    const threshold = testimonialWidth * 0.14;
    const slideCount = testimonialSlides.length;

    let nextIndex = testimonialIndex;
    if (deltaX < -threshold) nextIndex += 1;
    if (deltaX > threshold) nextIndex -= 1;
    nextIndex = Math.max(0, Math.min(slideCount - 1, nextIndex));

    testimonialGestureRef.current = { pointerId: -1, startX: 0, startY: 0, axis: null };
    setTestimonialIndex(nextIndex);
    setTestimonialDragging(false);
  };

  const handleTestimonialPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const gesture = testimonialGestureRef.current;
    if (gesture.pointerId !== event.pointerId) return;
    endTestimonialDrag(event.clientX);
  };

  const handleTestimonialPointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    const gesture = testimonialGestureRef.current;
    if (gesture.pointerId !== event.pointerId) return;
    endTestimonialDrag(event.clientX);
  };

  const renderClientMarquee = (logos: { src: string; name: string }[], reverse = false) => (
    <div
      className="rw-marquee"
      style={{
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div className="rw-marquee-track" style={{ animationDirection: reverse ? "reverse" : "normal" }}>
        {Array.from({ length: 2 }).map((_, loopIndex) => (
          <div key={loopIndex} className="flex items-center gap-8 pr-8 whitespace-nowrap">
            {logos.map((logo) => (
              <div
                key={`${loopIndex}-${logo.name}`}
                className="group flex items-center justify-center flex-shrink-0"
                style={{ width: "clamp(3.5rem, 6vw, 5rem)", height: "clamp(2rem, 4vw, 3rem)" }}
              >
                <img
                  src={resolveAsset(logo.src)}
                  alt={logo.name}
                  draggable={false}
                  className="max-h-full max-w-full object-contain select-none transition duration-300 group-hover:opacity-100"
                  style={{ opacity: 0.75 }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* HERO */}
      <Section pad="hero">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <span className="rw-tag">May 2026</span>
              <span className="rw-tag" style={{ background: "var(--rw-amber)", borderColor: "var(--rw-amber)", color: "var(--rw-navy)" }}>BIR Accredited</span>
            </motion.div>

            <h1 className="rw-display text-[clamp(2.75rem,8vw,10rem)]" style={{ lineHeight: 0.95 }}>
              {[
                { node: <>Sell. <em className="rw-it" style={{ color: "var(--rw-amber)" }}>Cook.</em></> },
                { node: <>Stock.</> },
                {
                  node: (
                    <span
                      className="inline-block px-[0.35em] py-[0.05em] rounded-[0.18em] align-baseline"
                      style={{ background: "var(--rw-navy)", color: "var(--rw-on-navy)", lineHeight: 1 }}
                    >
                      Repeat.
                    </span>
                  ),
                },
              ].map((line, i) => (
                <motion.span
                  key={i}
                  className="block"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line.node}
                </motion.span>
              ))}
            </h1>
          </div>

          <Reveal delay={0.4} className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <p className="text-lg max-w-sm" style={{ color: "var(--rw-ink-soft)" }}>
              Retailware is the all-in-one POS, back-office, and head-office stack built for Filipino SMEs running stores, kitchens, and chains.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex -space-x-2">
                {["var(--rw-amber)","var(--rw-lime)","var(--rw-navy)"].map((c, i) => (
                  <div
                    key={i}
                    className="w-[clamp(2rem,4vw,2.25rem)] h-[clamp(2rem,4vw,2.25rem)] rounded-full"
                    style={{ background: c, border: "0.125rem solid var(--rw-bg)" }}
                  />
                ))}
              </div>
              <div className="rw-mono text-xs">
                <CountUp to={2400} suffix="+" /> Filipino merchants ▲ 4.9★
              </div>
            </div>
          </Reveal>
        </div>

        {/* hero collage */}
        <Reveal delay={0.5}>
          <div className="mt-14 relative">
            <div className="absolute -top-3 left-6 rw-mono text-[0.75rem]" style={{ color: "var(--rw-ink-soft)" }}>
              FIG.01 — Front-of-house in motion
            </div>
            <div className="grid grid-cols-12 gap-4">
              <motion.div whileHover={{ scale: 1.01 }} className="col-span-12 md:col-span-8 relative overflow-hidden rounded-[1.75rem]" style={{ border: "0.0625rem solid var(--rw-rule)", aspectRatio: "16/10" }}>
                <ImageWithFallback src={resolveAsset("/src/imports/fish-and-chips-interior.jpg")} alt="Cafe POS" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="rw-display text-2xl" style={{ color: "#FBF6E8" }}>Gordon Ramsay Fish & Chips</div>
                  <span className="rw-tag" style={{ background: "#FBF6E8", borderColor: "#FBF6E8", color: "var(--rw-navy)" }}>LIVE</span>
                </div>
              </motion.div>
              <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-[1.75rem] flex-1 p-6 flex flex-col justify-between" style={{ border: "0.0625rem solid var(--rw-rule)", background: "var(--rw-amber)", color: "var(--rw-navy)" }}>
                  <div className="rw-mono text-[0.75rem]">Avg. setup</div>
                  <div className="rw-display text-7xl"><CountUp to={48} /><span className="text-3xl">hrs</span></div>
                  <div className="text-sm">From signup to first receipt printed.</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-[1.75rem] flex-1 p-6 flex flex-col justify-between" style={{ border: "0.0625rem solid var(--rw-rule)", background: "var(--rw-navy)", color: "var(--rw-on-navy)" }}>
                  <div className="rw-mono text-[0.75rem]">Lower queues</div>
                  <div className="rw-display text-7xl">−<CountUp to={42} /><span className="text-3xl">%</span></div>
                  <div className="text-sm">After installing on tablet PoS.</div>
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex items-center gap-3 rw-mono text-[0.75rem] opacity-70">
          <ArrowDown size="0.875rem" /> scroll for the field guide
        </div>
      </Section>

      {/* Trust marquee — Food */}
      <div className="overflow-hidden py-4" style={{ borderTop: "0.0625rem solid var(--rw-rule)" }}>
        <div className="rw-mono text-[0.6875rem] opacity-50 px-6 mb-3 tracking-widest">FOOD CLIENTS</div>
        {renderClientMarquee([
          { src: "/src/imports/clients/food/a-mano.png", name: "A Mano" },
          { src: "/src/imports/clients/food/a1-premium-shabu-shabu.webp", name: "A1 Premium Shabu Shabu" },
          { src: "/src/imports/clients/food/abe.png", name: "Abe" },
          { src: "/src/imports/clients/food/banapple.png", name: "Banapple" },
          { src: "/src/imports/clients/food/biggs.webp", name: "Biggs" },
          { src: "/src/imports/clients/food/bom-gosto.png", name: "Bom Gosto" },
          { src: "/src/imports/clients/food/burnt-bean.jpg", name: "Burnt Bean" },
          { src: "/src/imports/clients/food/cabalen.png", name: "Cabalen" },
          { src: "/src/imports/clients/food/cafe-de-manila.jpg", name: "Cafe De Manila" },
          { src: "/src/imports/clients/food/cafe-mnr.jfif", name: "Cafe Mnr" },
          { src: "/src/imports/clients/food/cake-rack-bakeshop.jfif", name: "Cake Rack Bakeshop" },
          { src: "/src/imports/clients/food/calle-reyes.jpg", name: "Calle Reyes" },
          { src: "/src/imports/clients/food/casie's-restaurant.jfif", name: "Casie's Restaurant" },
          { src: "/src/imports/clients/food/cerveseria.png", name: "Cerveseria" },
          { src: "/src/imports/clients/food/chinatown.png", name: "Chinatown" },
          { src: "/src/imports/clients/food/cibo.png", name: "Cibo" },
          { src: "/src/imports/clients/food/cong.png", name: "Cong" },
          { src: "/src/imports/clients/food/cusina-estela.jfif", name: "Cusina Estela" },
          { src: "/src/imports/clients/food/ebi.png", name: "Ebi" },
          { src: "/src/imports/clients/food/fatfook.png", name: "Fatfook" },
          { src: "/src/imports/clients/food/forth-&-tay.jfif", name: "Forth & Tay" },
          { src: "/src/imports/clients/food/four-seasons.webp", name: "Four Seasons" },
          { src: "/src/imports/clients/food/gordon-ramsay-fishnchips.png", name: "Gordon Ramsay Fishnchips" },
          { src: "/src/imports/clients/food/gordon-ramsay.png", name: "Gordon Ramsay" },
          { src: "/src/imports/clients/food/grace-park.webp", name: "Grace Park" },
          { src: "/src/imports/clients/food/hai-chix.jfif", name: "Hai Chix" },
          { src: "/src/imports/clients/food/hakata-ton-ichi.jpg", name: "Hakata Ton Ichi" },
          { src: "/src/imports/clients/food/ihaw-at-ako.png", name: "Ihaw At Ako" },
          { src: "/src/imports/clients/food/ipponyari.png", name: "Ipponyari" },
          { src: "/src/imports/clients/food/ippudo.webp", name: "Ippudo" },
          { src: "/src/imports/clients/food/kasalo.jfif", name: "Kasalo" },
          { src: "/src/imports/clients/food/kiwami.jpg", name: "Kiwami" },
          { src: "/src/imports/clients/food/koomi.jpg", name: "Koomi" },
          { src: "/src/imports/clients/food/lola-idang's.jfif", name: "Lola Idang's" },
          { src: "/src/imports/clients/food/mala-tang.jfif", name: "Mala Tang" },
          { src: "/src/imports/clients/food/mama-lous.png", name: "Mama Lous" },
          { src: "/src/imports/clients/food/mamita's.png", name: "Mamita's" },
          { src: "/src/imports/clients/food/mangan.png", name: "Mangan" },
          { src: "/src/imports/clients/food/matutina-gerry's-seafood.jfif", name: "Matutina Gerry's Seafood" },
          { src: "/src/imports/clients/food/ne.png", name: "Ne" },
          { src: "/src/imports/clients/food/number-1.avif", name: "Number 1" },
          { src: "/src/imports/clients/food/oh-my-greek.png", name: "Oh My Greek" },
          { src: "/src/imports/clients/food/pina-colina.png", name: "Pina Colina" },
          { src: "/src/imports/clients/food/putien.jfif", name: "Putien" },
          { src: "/src/imports/clients/food/ramen-kuroda.jpg", name: "Ramen Kuroda" },
          { src: "/src/imports/clients/food/ramen-ron.png", name: "Ramen Ron" },
          { src: "/src/imports/clients/food/refinery.jfif", name: "Refinery" },
          { src: "/src/imports/clients/food/rockstar.jfif", name: "Rockstar" },
          { src: "/src/imports/clients/food/rosario.png", name: "Rosario" },
          { src: "/src/imports/clients/food/salt-and-ice-bar.png", name: "Salt And Ice Bar" },
          { src: "/src/imports/clients/food/sam-stew.png", name: "Sam Stew" },
          { src: "/src/imports/clients/food/samgyupsalamt.png", name: "Samgyupsalamt" },
          { src: "/src/imports/clients/food/seal-&-bean.avif", name: "Seal & Bean" },
          { src: "/src/imports/clients/food/soi.png", name: "Soi" },
          { src: "/src/imports/clients/food/steak-n-frice.jpg", name: "Steak N Frice" },
          { src: "/src/imports/clients/food/suki-ya.png", name: "Suki Ya" },
          { src: "/src/imports/clients/food/suki-ya2.webp", name: "Suki Ya2" },
          { src: "/src/imports/clients/food/summit.png", name: "Summit" },
          { src: "/src/imports/clients/food/tablo.webp", name: "Tablo" },
          { src: "/src/imports/clients/food/taishu-yakiniku.png", name: "Taishu Yakiniku" },
          { src: "/src/imports/clients/food/tanay-highlands.png", name: "Tanay Highlands" },
          { src: "/src/imports/clients/food/tong-yang.jfif", name: "Tong Yang" },
          { src: "/src/imports/clients/food/tsumaru-udon.png", name: "Tsumaru Udon" },
          { src: "/src/imports/clients/food/twelve-cupcakes.png", name: "Twelve Cupcakes" },
          { src: "/src/imports/clients/food/vikings.png", name: "Vikings" },
          { src: "/src/imports/clients/food/WhatsApp Image 2026-05-07 at 9.21.04 AM.jpeg", name: "Whatsapp Image 2026 05 07 At 9.21.04 Am" },
          { src: "/src/imports/clients/food/yabu.png", name: "Yabu" },
          { src: "/src/imports/clients/food/zig.png", name: "Zig" },
        ], true)}
      </div>

      {/* Trust marquee — Retail */}
      <div className="overflow-hidden py-4" style={{ borderBottom: "0.0625rem solid var(--rw-rule)" }}>
        <div className="rw-mono text-[0.6875rem] opacity-50 px-6 mb-3 tracking-widest">RETAIL CLIENTS</div>
        {renderClientMarquee([
          { src: "/src/imports/clients/retail/abi-drug.jfif", name: "Abi Drug" },
          { src: "/src/imports/clients/retail/afpces.jfif", name: "Afpces" },
          { src: "/src/imports/clients/retail/art-of-scent.jpg", name: "Art Of Scent" },
          { src: "/src/imports/clients/retail/babyzone.png", name: "Babyzone" },
          { src: "/src/imports/clients/retail/boie-drug.png", name: "Boie Drug" },
          { src: "/src/imports/clients/retail/budget-lane.jfif", name: "Budget Lane" },
          { src: "/src/imports/clients/retail/bvlgari.avif", name: "Bvlgari" },
          { src: "/src/imports/clients/retail/camerahaus.png", name: "Camerahaus" },
          { src: "/src/imports/clients/retail/canlubang.png", name: "Canlubang" },
          { src: "/src/imports/clients/retail/creston.webp", name: "Creston" },
          { src: "/src/imports/clients/retail/cubix.jpg", name: "Cubix" },
          { src: "/src/imports/clients/retail/cuts-4-tots.jpg", name: "Cuts 4 Tots" },
          { src: "/src/imports/clients/retail/denim-hub.png", name: "Denim Hub" },
          { src: "/src/imports/clients/retail/fresh-fragrance-bar.jpg", name: "Fresh Fragrance Bar" },
          { src: "/src/imports/clients/retail/fresh-salon-&-spa.jfif", name: "Fresh Salon & Spa" },
          { src: "/src/imports/clients/retail/hafele.png", name: "Hafele" },
          { src: "/src/imports/clients/retail/hoy-bata.png", name: "Hoy Bata" },
          { src: "/src/imports/clients/retail/ib-com.avif", name: "Ib Com" },
          { src: "/src/imports/clients/retail/invitation-house.png", name: "Invitation House" },
          { src: "/src/imports/clients/retail/jmed-pharma.png", name: "Jmed Pharma" },
          { src: "/src/imports/clients/retail/joners-supermart.png", name: "Joners Supermart" },
          { src: "/src/imports/clients/retail/lee-n-rrj.avif", name: "Lee N Rrj" },
          { src: "/src/imports/clients/retail/lilly-linen.jfif", name: "Lilly Linen" },
          { src: "/src/imports/clients/retail/lufthansa.jpg", name: "Lufthansa" },
          { src: "/src/imports/clients/retail/macaria.png", name: "Macaria" },
          { src: "/src/imports/clients/retail/manila-polo-club.avif", name: "Manila Polo Club" },
          { src: "/src/imports/clients/retail/md2h.png", name: "Md2h" },
          { src: "/src/imports/clients/retail/medtrust.png", name: "Medtrust" },
          { src: "/src/imports/clients/retail/merriam.jfif", name: "Merriam" },
          { src: "/src/imports/clients/retail/new-hatchin-japanese-grocery.jpg", name: "New Hatchin Japanese Grocery" },
          { src: "/src/imports/clients/retail/papemelroti.jpg", name: "Papemelroti" },
          { src: "/src/imports/clients/retail/petrol.jpg", name: "Petrol" },
          { src: "/src/imports/clients/retail/pineapplelab.jfif", name: "Pineapplelab" },
          { src: "/src/imports/clients/retail/ramcel.avif", name: "Ramcel" },
          { src: "/src/imports/clients/retail/scent-beaute.png", name: "Scent Beaute" },
          { src: "/src/imports/clients/retail/sec-helmet.avif", name: "Sec Helmet" },
          { src: "/src/imports/clients/retail/solano-veterinary.png", name: "Solano Veterinary" },
          { src: "/src/imports/clients/retail/sophie-paris.png", name: "Sophie Paris" },
          { src: "/src/imports/clients/retail/super-mart.png", name: "Super Mart" },
          { src: "/src/imports/clients/retail/the-generic-pharmacy.jfif", name: "The Generic Pharmacy" },
          { src: "/src/imports/clients/retail/theory-house.jfif", name: "Theory House" },
          { src: "/src/imports/clients/retail/victory-central-mall.jfif", name: "Victory Central Mall" },
          { src: "/src/imports/clients/retail/zanea.png", name: "Zanea" },
        ], false)}
      </div>

      {/* CORE FEATURES — asymmetric editorial grid */}
      <Section>
        <div className="grid grid-cols-12 gap-6 mb-12">
          <Reveal className="col-span-12 lg:col-span-5">
            <span className="rw-tag mb-6">02 · The Stack</span>
            <h2 className="rw-display text-4xl sm:text-6xl md:text-8xl mt-6">
              Three modules.<br />
              <em style={{ color: "var(--rw-amber)" }}>One</em> rhythm.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-lg" style={{ color: "var(--rw-ink-soft)" }}>
              From the counter to the executive desk — Retailware connects every transaction, every recipe, every receipt under one calmly opinionated system.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {[
            { num: "01", title: "Front-End POS", desc: "Tap-fast tablet & terminal interface for cashiers. Offline-first.", icon: Zap, span: "lg:col-span-7", inverse: true, bg: "var(--rw-navy)" },
            { num: "02", title: "Back-Office", desc: "Inventory, recipes, employee shifts, supplier orders — the brain of the store.", icon: Boxes, span: "lg:col-span-5", bg: "var(--rw-amber)", onAmber: true },
            { num: "03", title: "Head-Office", desc: "Multi-branch dashboards, consolidated reporting, BIR-compliant exports.", icon: BarChart3, span: "lg:col-span-5", bg: "var(--rw-bg-2)" },
            { num: "04", title: "Always-on Sync", desc: "Cloud + local, so a brownout never interrupts a sale.", icon: ShieldCheck, span: "lg:col-span-4", bg: "var(--rw-card)" },
            { num: "05", title: "Cash + e-Wallets", desc: "GCash, Maya, cards, QR Ph — accept everything, reconcile in one tap.", icon: Banknote, span: "lg:col-span-3", bg: "var(--rw-card)" },
          ].map((f, i) => (
            <Reveal
              key={f.num}
              delay={i * 0.06}
              className={`col-span-12 md:col-span-6 ${f.span} relative rounded-[1.75rem] p-7 flex flex-col justify-between min-h-[clamp(14rem,30vh,16.25rem)]`}
              style={{ background: f.bg, border: "0.0625rem solid var(--rw-rule)", color: f.inverse ? "var(--rw-on-navy)" : (f as any).onAmber ? "#0B1D3A" : "var(--rw-on-card)" }}
            >
              <div className="flex items-start justify-between">
                <span className="rw-mono text-[0.75rem] opacity-80">{f.num}</span>
                <f.icon size="1.75rem" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="rw-display text-4xl md:text-5xl mb-3">{f.title}</h3>
                <p className="text-sm opacity-90 max-w-sm">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WATCH DEMOS */}
      <Section>
        <div className="mb-8">
          <span className="rw-tag mb-4">03 · Watch Demo</span>
          <h2 className="rw-display text-4xl sm:text-6xl md:text-8xl mt-6">Watch the product in action</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          {[
            { id: 'l4TuWcJcEOU', title: 'Retailware POS for Retail Store', label: 'Retail Store' },
            { id: 'O1YsL7BOXwY', title: 'Retailware POS for Resto', label: 'Resto' },
            { id: 's3Bs1iZmm08', title: 'RW POS - New Table Layout', label: 'Table Layout' },
          ].map((v) => (
            <motion.button
              key={v.id}
              type="button"
              onClick={() => setActiveVideoId(v.id)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-[1.125rem] overflow-hidden cursor-pointer text-left"
              style={{ border: "0.0625rem solid var(--rw-rule)" }}
              aria-label={v.title}
            >
              <div
                className="relative flex min-h-[clamp(14rem,30vh,16.25rem)] flex-col items-center justify-center gap-6 px-6 text-center transition duration-300 group-hover:brightness-110"
                style={{ background: 'var(--rw-navy)', color: 'var(--rw-on-navy)' }}
              >
                <div className="grid h-[clamp(4.25rem,9vw,5rem)] w-[clamp(4.25rem,9vw,5rem)] place-items-center rounded-full border border-white/20 bg-white/10 text-3xl shadow-[0_0.75rem_1.875rem_rgba(0,0,0,0.22)] transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_1.75rem_rgba(251,246,232,0.24),0_0.75rem_1.875rem_rgba(0,0,0,0.22)]">
                  ▶
                </div>
                <div>
                  <div className="rw-display text-2xl md:text-3xl leading-tight">{v.title}</div>
                  <div className="mt-3 rw-mono text-[0.6875rem] tracking-[0.35em] uppercase opacity-75">{v.label}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

      {activeVideoId && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(0, 0, 0, 0.85)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={() => setActiveVideoId(null)}
        >
          <div className="relative w-[min(92vw,60rem)]" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActiveVideoId(null)}
              aria-label="Close video"
              className="absolute -top-3 -right-3 z-10 grid h-[clamp(2.25rem,5vw,2.75rem)] w-[clamp(2.25rem,5vw,2.75rem)] place-items-center rounded-full bg-white text-2xl leading-none text-black shadow-[0_0.625rem_1.875rem_rgba(0,0,0,0.35)] transition duration-200 hover:scale-105 hover:bg-white/95"
            >
              ✕
            </button>
            <div className="overflow-hidden rounded-[1.125rem] bg-black shadow-[0_1.875rem_5rem_rgba(0,0,0,0.5)]">
              <div style={{ aspectRatio: "16 / 9" }}>
                <iframe
                  key={activeVideoId}
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                  title="Retailware video player"
                  className="h-full w-full"
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TESTIMONIAL */}
      <Section bg="var(--rw-amber)" color="var(--rw-navy)" pad="tight">
        <div className="mb-2 rw-mono text-[0.75rem] tracking-[0.35em] uppercase flex items-center gap-2 opacity-80">
          <span>←</span>
          <span>Click & drag · or swipe</span>
        </div>

        <div
          ref={testimonialViewportRef}
          className="overflow-hidden"
          style={{ cursor: testimonialDragging ? "grabbing" : "grab", touchAction: testimonialDragging ? "none" : "pan-y", overscrollBehaviorX: "contain" }}
          onPointerDown={handleTestimonialPointerDown}
          onPointerMove={handleTestimonialPointerMove}
          onPointerUp={handleTestimonialPointerUp}
          onPointerCancel={handleTestimonialPointerCancel}
        >
          <div
            className="flex"
            style={{
              width: `${testimonialSlides.length * 100}%`,
              transform: `translate3d(${testimonialOffset}px, 0, 0)`,
              transition: testimonialDragging ? "none" : "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: "transform",
            }}
          >
            {testimonialSlides.map((t, i) => (
              <div
                key={i}
                className="shrink-0 relative overflow-visible"
                style={{ width: `${testimonialWidth || window.innerWidth}px`, minHeight: "clamp(15rem,35vh,20rem)" }}
              >
                <div className="h-full w-full px-6 md:px-10 py-8 md:py-12 flex items-center overflow-visible">
                  <div className="mx-auto max-w-[min(92vw,87.5rem)] h-full grid grid-cols-12 gap-6 items-center">
                    <div className="col-span-12 lg:col-span-2 flex lg:flex-col gap-1 self-start pt-1 md:pt-2">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star key={starIndex} fill="currentColor" stroke="none" size="1.75rem" />
                      ))}
                    </div>

                    <div className="col-span-12 lg:col-span-7 lg:pl-4 xl:pl-8">
                      <p
                        className="rw-display"
                        style={{ lineHeight: 1.02, fontSize: "clamp(1.65rem, 3.2vw, 2.65rem)", fontWeight: 500, overflowWrap: "anywhere" }}
                      >
                        "{t.quote}"
                      </p>
                      <div className="mt-6 rw-mono text-xs">— {t.who} · {t.role}</div>
                    </div>

                    <div className="col-span-12 lg:col-span-3 flex justify-end lg:pr-10 xl:pr-16 overflow-visible">
                      <div className="rw-spin w-[clamp(5.5rem,12vw,8rem)] h-[clamp(5.5rem,12vw,8rem)] rounded-full grid place-items-center" style={{ border: "0.0625rem solid var(--rw-navy)" }}>
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <defs>
                            <path id={`circ-${i}`} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                          </defs>
                          <text fontFamily="Barlow Condensed" fontSize="9" letterSpacing="2" fill="currentColor">
                            <textPath href={`#circ-${i}`}>★ TRY · 30 DAYS · FREE · NO CARD · ★ TRY · 30 DAYS · FREE · NO CARD ·</textPath>
                          </text>
                        </svg>
                      </div>
                    </div>
                    <div className="col-span-12 flex justify-end pt-2 pr-1 lg:pr-2 rw-mono text-[0.6875rem] tracking-[0.35em] uppercase opacity-70" style={{ fontVariantCaps: "all-small-caps" }}>
                      {String(i + 1).padStart(2, "0")} / {String(testimonialSlides.length).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* WHY CHOOSE — dense dark layered */}
      <Section bg="var(--rw-navy)" color="var(--rw-on-navy)">
        <div className="grid grid-cols-12 gap-6">
          <Reveal className="col-span-12 lg:col-span-4">
            <span className="rw-tag" style={{ borderColor: "var(--rw-on-navy)", color: "var(--rw-on-navy)" }}>04 · Why us</span>
            <h2 className="rw-display text-4xl sm:text-5xl md:text-7xl mt-6">
              Why choose <em style={{ color: "var(--rw-amber)" }}>Retailware</em>?
            </h2>
            <p className="mt-6 opacity-80 max-w-sm">
              Because spreadsheets don't survive Friday rush. Because BIR audits are real. Because your future expansion shouldn't require a new system.
            </p>
          </Reveal>

          <div className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.15)" }}>
            {[
              { t: "01", h: "BIR-Permit Ready", d: "We hand-walk you through the BIR POS permit process — paperwork, sandbox, and approval." },
              { t: "02", h: "Built for SMEs", d: "Pricing scaled for sari-sari to scale-up. No enterprise tax, no hidden seat fees." },
              { t: "03", h: "Offline-First", d: "Sales never stop, even when the wifi does. Local cache syncs the moment you reconnect." },
              { t: "04", h: "Pinoy Support", d: "Real humans in Manila answering Viber by 7AM. Tagalog, Bisaya, English — whatever flows." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.07} className="p-8 h-full" style={{ background: "var(--rw-navy)" }}>
                <div className="rw-mono text-[0.75rem] opacity-70 mb-6">{c.t}</div>
                <h3 className="rw-display text-3xl mb-3">{c.h}</h3>
                <p className="text-sm opacity-90">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* SHOWCASE — full-bleed horizontal scroll */}
      <Section>
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <Reveal>
            <div>
              <span className="rw-tag mb-4">05 · Field Notes</span>
              <h2 className="rw-display text-4xl sm:text-6xl md:text-8xl mt-6">In the wild.</h2>
            </div>
          </Reveal>
        </div>
      </Section>

      <DragCarousel>
        {[
          { src: "/src/imports/burnt-bean2.png", t: "Burnt | Bean · Cafe", k: "Café · Shop" },
          { src: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1400&q=80", t: "Super Mart", k: "Sari-Sari · Market" },
          { src: "/src/imports/koomi-restau.png", t: "Koomi · BGC", k: "MILK TEA & DESSERTS · SINGLE" },
          { src: "/src/imports/fishnchips.png", t: "Gordon Ramsay Fish & Chips", k: "RESTAURANT · FLAGSHIP" },
          { src: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=80", t: "Joners Supermarket", k: "Veggie · Market" },
        ].map((g, i) => (
          <div
            key={i}
            className="relative rounded-[1.5rem] overflow-hidden group select-none"
            style={{ width: "min(78vw, 28.75rem)", aspectRatio: "4/5", border: "0.0625rem solid var(--rw-rule)" }}
          >
            <ImageWithFallback
              src={resolveAsset(g.src)}
              alt={g.t}
              className="w-full h-full object-cover pointer-events-none transition duration-500 group-hover:scale-[1.03]"
              style={{ filter: "brightness(1.08) contrast(1.02)" }}
              draggable={false}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ background: "linear-gradient(to top, rgba(11,29,58,0.85), transparent 50%)", color: "#FBF6E8" }}>
              <div className="inline-flex w-fit rounded-full bg-black/20 px-3 py-1 backdrop-blur-sm">
                <div className="rw-mono text-[0.8125rem] md:text-[0.875rem] leading-none opacity-95">{g.k}</div>
              </div>
              <div className="mt-3 inline-flex w-fit rounded-full bg-black/20 px-4 py-2 backdrop-blur-sm">
                <div className="rw-display text-[0.9375rem] md:text-[1.125rem] leading-tight">{g.t}</div>
              </div>
            </div>
          </div>
        ))}
      </DragCarousel>

      {/* FINAL CTA */}
<Section>
  <div className="relative rounded-[2.25rem] p-[clamp(2.5rem,6vw,4rem)] overflow-hidden" style={{ background: "var(--rw-navy)", color: "var(--rw-on-navy)" }}>
    <div className="absolute inset-0 rw-noise" />
    <div className="relative flex flex-col items-center text-center">
      <span className="rw-tag" style={{ borderColor: "var(--rw-on-navy)", color: "var(--rw-on-navy)" }}>06 · Begin</span>
      <h2 className="rw-display text-4xl sm:text-6xl md:text-9xl mt-6">
        Try Retailware<br />
        <em style={{ color: "var(--rw-lime)" }}>free for 30 days.</em>
      </h2>
      <p className="mt-6 opacity-80 max-w-md">No credit card. No setup fee. We'll even help you migrate from your current system.</p>
    </div>
  </div>
</Section>
    </>
  );
}
