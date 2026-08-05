"use client";

import { motion } from "framer-motion";
import { Sparkles, Calendar, TrendingUp, Award } from "lucide-react";

const timelineData = [
  {
    year: "2024",
    title: "Shyraq академия ретінде негізі қаланды",
    description: "Команда жинақталып, мұғалімдерді цифрландыру бойынша алғашқы оқыту курстары басталды.",
    icon: Calendar,
    badge: "Старт",
  },
  {
    year: "2025",
    title: "AI платформасына айналу",
    description: "Жасанды интеллект модулі біріктіріліп, сату воронкалары автоматтандырылды.",
    icon: TrendingUp,
    badge: "Инновация",
  },
  {
    year: "2026",
    title: "Республикалық масштабқа шығу",
    description: "50 000+ пайдаланушы және 100+ серіктес мектептер таныған №1 білім беру платформасы.",
    icon: Award,
    badge: "№1 Платформа",
  },
];

export default function HistoryTimeline() {
  return (
    <section id="history" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/3 w-[500px] h-[300px] bg-orange-400/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-orange-200/80 mb-4 shadow-[0_4px_20px_rgba(234,108,0,0.1)]">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-xs md:text-sm font-bold text-orange-700 uppercase tracking-wider">Даму жолы</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">
            Біздің тарихымыз
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            Шырақ академиясының құрылуынан бүгінгі биіктерге дейінгі кезеңдер
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l-2 border-orange-200/80 ml-6 md:ml-10 space-y-10 md:space-y-12">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline Dot Node */}
              <div className="absolute -left-[17px] top-4 w-9 h-9 rounded-2xl bg-white border-2 border-orange-400 shadow-[0_0_20px_rgba(234,108,0,0.5)] flex items-center justify-center text-orange-500 group-hover:scale-115 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <item.icon className="w-4 h-4" />
              </div>
              
              <div className="glass p-6 md:p-8 rounded-3xl border border-orange-100/70 hover:border-orange-300 hover:shadow-[0_16px_40px_rgba(234,108,0,0.15)] transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl md:text-3xl font-black gradient-text tracking-tight">
                    {item.year}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-100/80 text-orange-700 border border-orange-200/60">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
