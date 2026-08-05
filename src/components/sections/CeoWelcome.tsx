"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote, Sparkles } from "lucide-react";

export default function CeoWelcome() {
  return (
    <section id="ceo-welcome" className="py-20 md:py-28 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-400/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel rounded-3xl p-6 sm:p-10 md:p-14 border border-orange-200/80 shadow-[0_20px_60px_rgba(234,108,0,0.12)] relative overflow-hidden"
        >
          {/* Subtle top gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            
            {/* CEO Large Banner */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg group border border-orange-200/80 bg-orange-100">
              <Image
                src="/ceo-large.jpg"
                alt="CEO Shyraq.ai - Еламан Бауыржанұлы"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                priority
              />
              
              {/* Bottom gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Overlay Glass Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 glass rounded-xl border border-white/60 flex items-center justify-between backdrop-blur-md shadow-lg z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-[0_4px_16px_rgba(234,108,0,0.4)]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-900">Shyraq.ai Негізін қалаушы</h5>
                    <p className="text-xs text-orange-600 font-medium">CEO & Founder</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text & Quote */}
            <div className="flex flex-col gap-6">
              <div className="w-12 h-12 rounded-2xl bg-orange-100/80 border border-orange-200 flex items-center justify-center">
                <Quote className="w-6 h-6 text-orange-500" />
              </div>

              <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-snug tracking-tight">
                «Біздің мақсатымыз — әрбір мұғалімге цифрлық көмекші сыйлап, <span className="gradient-text">білімнің шырағын маздату.</span>»
              </blockquote>

              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Шырақ академиясы әрбір жаңа менеджердің өз әлеуетін 100% ашуына барлық жағдай жасайды.
              </p>

              <div className="flex items-center gap-4 mt-2 pt-4 border-t border-orange-100">
                <div className="relative w-14 h-14 rounded-2xl border-2 border-white shadow-[0_6px_20px_rgba(234,108,0,0.25)] overflow-hidden shrink-0 bg-orange-100">
                  <Image
                    src="/ceo.jpg"
                    alt="Еламан Бауыржанұлы"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Еламан Бауыржанұлы</h4>
                  <p className="text-orange-600 font-medium text-xs md:text-sm">Shyraq.ai Бас директоры (CEO)</p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
