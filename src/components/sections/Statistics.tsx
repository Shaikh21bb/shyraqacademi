"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/ui/CountUp";

const stats = [
  { label: "Құрылған жыл", value: 2024, suffix: "" },
  { label: "Пайдаланушы", value: 50000, suffix: "+" },
  { label: "AI Платформа", value: 1, suffix: "" },
  { label: "Серіктес мектеп", value: 100, suffix: "+" },
];

export default function Statistics() {
  return (
    <section className="py-12 md:py-24 bg-white/40 border-y border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-4 md:p-8 rounded-3xl flex flex-col items-center justify-center text-center group hover:bg-orange-50/50 transition-colors"
            >
              <h3 className="text-3xl md:text-5xl font-bold text-primary mb-1 md:mb-2 flex items-center justify-center text-glow group-hover:scale-110 transition-transform duration-300">
                <CountUp to={stat.value} duration={2} />
                {stat.suffix && <span>{stat.suffix}</span>}
              </h3>
              <p className="text-gray-600 font-medium text-xs md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
