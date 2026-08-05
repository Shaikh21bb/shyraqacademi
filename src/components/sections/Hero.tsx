"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

const PARTICLES = [
  { size: 6,  color: "bg-orange-400", x: "20%", y: "15%", delay: 0,    dur: 3.5 },
  { size: 4,  color: "bg-amber-300",  x: "80%", y: "25%", delay: 0.7,  dur: 4.2 },
  { size: 8,  color: "bg-orange-300", x: "60%", y: "70%", delay: 1.4,  dur: 5.0 },
  { size: 5,  color: "bg-yellow-400", x: "15%", y: "75%", delay: 0.3,  dur: 3.8 },
  { size: 3,  color: "bg-orange-500", x: "90%", y: "60%", delay: 1.0,  dur: 4.5 },
  { size: 7,  color: "bg-amber-400",  x: "40%", y: "10%", delay: 1.8,  dur: 3.2 },
];

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* ── Ambient background glows ── */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-orange-400/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-300/10 blur-[100px] pointer-events-none animate-orb" />

      {/* ── Floating particles ── */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute ${p.color} rounded-full opacity-70 pointer-events-none`}
          style={{ width: p.size, height: p.size, left: p.x, top: p.y }}
          animate={{
            y: [-12, 12, -12],
            x: [-6, 6, -6],
            opacity: [0.4, 0.9, 0.4],
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-5 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
        {/* ── Left text column ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-5 text-center lg:text-left"
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 self-center lg:self-start"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-orange-200/60 shadow-[0_4px_20px_rgba(234,108,0,0.15)]">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold text-orange-700">Ішкі академия платформасы</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.05]"
          >
            <span className="gradient-text text-glow">SHYRAQ</span>{" "}
            <br className="hidden sm:block" />
            ACADEMY
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl font-medium text-gray-500"
          >
            Shyraq командасының ішкі академиясы
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base md:text-lg text-gray-400 max-w-lg leading-relaxed mx-auto lg:mx-0"
          >
            Біз жаңа қызметкерлерге білім беріп, кәсіби сатушы болуға көмектесеміз.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 mt-2 justify-center lg:justify-start"
          >
            <Button
              size="lg"
              onClick={() => scrollTo("courses")}
              className="glass-button rounded-full text-base md:text-lg h-13 px-7 group font-bold"
            >
              Оқуды бастау
              <motion.span
                className="ml-2 inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollTo("history")}
              className="rounded-full text-base md:text-lg h-13 px-7 border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 hover:border-orange-300 transition-all duration-300"
            >
              Компания туралы
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center gap-6 justify-center lg:justify-start mt-2"
          >
            {[
              { val: "50K+", label: "Пайдаланушы" },
              { val: "100+", label: "Серіктес мектеп" },
              { val: "#1",   label: "AI платформа" },
            ].map((s, i) => (
              <div key={i} className="text-center lg:text-left">
                <div className="text-lg font-black gradient-text">{s.val}</div>
                <div className="text-xs text-gray-400 whitespace-nowrap">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right visual column ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[300px] sm:h-[380px] md:h-[520px] w-full flex items-center justify-center"
        >
          {/* Outer glow ring */}
          <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[460px] md:h-[460px] rounded-full border border-orange-200/30 animate-spin-slow pointer-events-none" />
          <div className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[380px] md:h-[380px] rounded-full border border-dashed border-orange-300/25 animate-spin-slow-reverse pointer-events-none" />

          {/* Orbital dots */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: "100%",
                height: "100%",
                top: 0, left: 0,
                transform: `rotate(${deg}deg)`,
              }}
              animate={{ rotate: [deg, deg + 360] }}
              transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="absolute rounded-full bg-orange-400/60"
                style={{
                  width: i % 2 === 0 ? 8 : 5,
                  height: i % 2 === 0 ? 8 : 5,
                  top: "50%",
                  left: 0,
                  transform: "translateY(-50%)",
                  boxShadow: "0 0 10px rgba(234,108,0,0.7)",
                }}
              />
            </motion.div>
          ))}

          {/* Glassmorphism orb container */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] rounded-full flex items-center justify-center"
            style={{
              background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9) 0%, rgba(255,248,240,0.7) 60%, rgba(254,215,170,0.5) 100%)",
              boxShadow: "0 0 80px rgba(234,108,0,0.35), 0 0 160px rgba(234,108,0,0.12), inset 0 2px 0 rgba(255,255,255,0.8)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(255,255,255,0.7)",
            }}
          >
            {/* Inner glow */}
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-orange-100/50 to-transparent" />

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full animate-pulse-glow flex items-center justify-center bg-white overflow-hidden z-10"
              style={{
                boxShadow: "0 0 60px rgba(234,108,0,0.7), 0 0 120px rgba(234,108,0,0.3)",
              }}
            >
              <Image
                src="/logo.svg"
                alt="Shyraq Logo"
                fill
                className="object-contain p-3"
                priority
              />
            </motion.div>

            {/* Cross rays */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              {[0, 45, 90, 135].map((rot, i) => (
                <div
                  key={i}
                  className="absolute w-full h-[1.5px] bg-gradient-to-r from-transparent via-orange-400 to-transparent"
                  style={{ transform: `rotate(${rot}deg)` }}
                />
              ))}
            </div>
          </motion.div>

          {/* Floating badge cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute left-0 top-[20%] glass rounded-2xl px-4 py-3 shadow-[0_8px_30px_rgba(234,108,0,0.15)] border border-orange-100/60"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-base">🎓</div>
              <div>
                <div className="text-xs font-bold text-gray-800">Онлайн сабақтар</div>
                <div className="text-[10px] text-gray-400">бейнесабақ</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute right-0 bottom-[22%] glass rounded-2xl px-4 py-3 shadow-[0_8px_30px_rgba(234,108,0,0.15)] border border-orange-100/60"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-base">🏆</div>
              <div>
                <div className="text-xs font-bold text-gray-800">Top сатушы</div>
                <div className="text-[10px] text-gray-400">рейтинг</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
