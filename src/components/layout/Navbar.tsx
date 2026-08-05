"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "#hero",      label: "Басты бет",   emoji: "🏠" },
  { href: "#courses",   label: "Оқу",         emoji: "🎓" },
  { href: "#roadmap",   label: "Сату",        emoji: "📈" },
  { href: "#team",      label: "Команда",     emoji: "👥" },
  { href: "#materials", label: "Материалдар", emoji: "📂" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleLink = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  /* ── sidebar variants ── */
  const sidebar = {
    hidden: { x: "100%", opacity: 0 },
    show:   { x: "0%",   opacity: 1, transition: { type: "spring" as const, damping: 28, stiffness: 220 } },
    exit:   { x: "100%", opacity: 0, transition: { duration: 0.35, ease: "easeInOut" as const } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 40 },
    show:   (i: number) => ({
      opacity: 1, x: 0,
      transition: { delay: 0.1 + i * 0.08, type: "spring" as const, damping: 20, stiffness: 200 },
    }),
  };

  return (
    <>
      {/* ─────────── HEADER BAR ─────────── */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "py-3 bg-white/70 backdrop-blur-2xl border-b border-orange-100/60 shadow-[0_4px_24px_rgba(234,108,0,0.08)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="flex items-center gap-3 text-primary font-bold text-2xl tracking-tight cursor-pointer"
          >
            <div className="relative w-10 h-10 overflow-hidden rounded-xl animate-pulse-glow shadow-[0_0_20px_rgba(234,108,0,0.4)]">
              <Image src="/logo.svg" alt="Shyraq AI" fill className="object-contain" />
            </div>
            <span className="gradient-text font-black tracking-tight">SHYRAQ</span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 font-medium text-gray-600">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative group py-1 text-[15px] hover:text-primary transition-colors duration-200"
              >
                {l.label}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300 rounded-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button className="hidden md:block glass-button px-6 py-2.5 rounded-full font-semibold text-sm">
            Оқуды бастау
          </button>

          {/* Mobile Hamburger */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden relative z-[60] flex items-center justify-center w-11 h-11 rounded-2xl bg-white/80 backdrop-blur-md border border-orange-100 shadow-sm text-gray-700"
            aria-label="Меню"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-5 h-5 text-orange-600" />
                </motion.span>
              ) : (
                <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* ─────────── FULL-SCREEN MOBILE MENU ─────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            />

            {/* Sidebar Panel */}
            <motion.div
              key="sidebar"
              variants={sidebar}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-[360px] md:hidden flex flex-col overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #FFF5EB 0%, #FFF9F2 30%, #FFFDF8 70%, #FFF5EB 100%)",
                boxShadow: "-20px 0 60px rgba(234,108,0,0.15), -4px 0 20px rgba(0,0,0,0.08)",
              }}
            >
              {/* Decorative glow blobs */}
              <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full bg-orange-400/20 blur-[80px] pointer-events-none" />
              <div className="absolute bottom-[10%] left-[-60px] w-48 h-48 rounded-full bg-amber-300/15 blur-[60px] pointer-events-none" />

              {/* Top bar inside panel */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-orange-100/50">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-9 h-9 overflow-hidden rounded-xl shadow-[0_0_15px_rgba(234,108,0,0.35)]">
                    <Image src="/logo.svg" alt="Shyraq" fill className="object-contain" />
                  </div>
                  <span className="gradient-text font-black text-xl tracking-tight">SHYRAQ</span>
                </div>
                <motion.button
                  onClick={() => setMobileOpen(false)}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    variants={itemVariants}
                    initial="hidden"
                    animate="show"
                    custom={i}
                    onClick={() => handleLink(link.href)}
                    className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-200
                               hover:bg-orange-50 active:scale-[0.98]"
                  >
                    {/* Icon bubble */}
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 flex items-center justify-center text-xl shrink-0 group-hover:shadow-[0_4px_16px_rgba(234,108,0,0.2)] group-hover:scale-110 transition-all duration-200">
                      {link.emoji}
                    </div>
                    <span className="text-[17px] font-semibold text-gray-800 group-hover:text-orange-700 transition-colors">
                      {link.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-200" />
                  </motion.a>
                ))}
              </nav>

              {/* Bottom CTA */}
              <motion.div
                custom={navLinks.length}
                variants={itemVariants}
                initial="hidden"
                animate="show"
                className="px-4 pb-8 pt-2"
              >
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent mb-5" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="glass-button w-full py-4 rounded-2xl font-bold text-[17px] flex items-center justify-center gap-2"
                >
                  Оқуды бастау
                  <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  © {new Date().getFullYear()} Shyraq.ai
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
