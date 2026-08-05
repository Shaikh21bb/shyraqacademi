"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full py-16 mt-20 border-t border-orange-200/50 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(255,249,242,0.6) 0%, rgba(254,237,213,0.4) 100%)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center gap-8 relative z-10">
        {/* Logo and Brand */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 text-primary font-bold text-2xl tracking-tight cursor-pointer"
        >
          <div className="relative w-10 h-10 overflow-hidden rounded-xl animate-pulse-glow shadow-[0_0_20px_rgba(234,108,0,0.4)]">
            <Image src="/logo.svg" alt="Shyraq AI" fill className="object-contain" />
          </div>
          <span className="gradient-text font-black tracking-tight text-2xl">Shyraq Academy</span>
        </motion.div>

        {/* Motto Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-6 py-3 rounded-full glass border border-orange-200/80 shadow-[0_8px_30px_rgba(234,108,0,0.12)] flex items-center gap-3"
        >
          <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
          <p className="text-gray-700 font-bold text-base md:text-lg italic tracking-wide">
            «Білімнің шырағын бірге жағайық»
          </p>
          <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
        </motion.div>

        {/* Links / Credits */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <p className="text-gray-500 text-sm font-medium flex items-center gap-1.5">
            Shyraq командасының сүйіспеншілікпен жасалған ішкі платформасы
            <Heart className="w-4 h-4 text-red-500 fill-red-500 inline animate-bounce" />
          </p>
          <p className="text-gray-400 text-xs mt-1">
            © {new Date().getFullYear()} Shyraq.ai. Барлық құқықтар қорғалған.
          </p>
        </div>
      </div>
    </footer>
  );
}
