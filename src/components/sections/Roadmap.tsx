"use client";

import { motion } from "framer-motion";
import { PhoneCall, Search, MonitorPlay, ShieldAlert, CheckSquare, CreditCard, Sparkles } from "lucide-react";

const steps = [
  { id: 1, title: "Алғашқы байланыс", icon: PhoneCall,    desc: "Клиентпен танысу", stepNum: "01" },
  { id: 2, title: "Қажеттілікті табу", icon: Search,       desc: "Сұрақтар қою",    stepNum: "02" },
  { id: 3, title: "Демонстрация",       icon: MonitorPlay,  desc: "Платформаны көрсету", stepNum: "03" },
  { id: 4, title: "Қарсылықтар",       icon: ShieldAlert,  desc: "Сұрақтарға жауап", stepNum: "04" },
  { id: 5, title: "Келісім",           icon: CheckSquare,  desc: "Шешім қабылдау",  stepNum: "05" },
  { id: 6, title: "Төлем жасау",       icon: CreditCard,   desc: "Сәтті аяқтау",    stepNum: "06" },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-20 md:py-28 overflow-hidden relative bg-gradient-to-b from-transparent via-orange-50/20 to-transparent">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-orange-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
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
            <span className="text-xs md:text-sm font-bold text-orange-700 uppercase tracking-wider">Сату воронкасы</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Сату кезеңдері
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg">
            Клиентті алғашқы қоңыраудан сәтті келісімге дейін жеткізу жолы
          </p>
        </motion.div>

        <div className="relative">
          {/* Horizontal Connecting Line (desktop) */}
          <div className="absolute top-[36px] left-8 right-8 h-[2px] bg-orange-100 hidden lg:block z-0" />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "calc(100% - 64px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[36px] left-8 h-[2px] bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 hidden lg:block z-0 shadow-[0_0_12px_rgba(234,108,0,0.8)]"
          />

          {/* Vertical Connecting Line (mobile) */}
          <div className="absolute left-[34px] top-6 bottom-6 w-[2px] bg-orange-100 lg:hidden z-0" />
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "calc(100% - 48px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[34px] top-6 w-[2px] bg-gradient-to-b from-orange-400 via-amber-400 to-orange-500 lg:hidden z-0 shadow-[0_0_12px_rgba(234,108,0,0.8)]"
          />

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 md:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="flex lg:flex-col items-center lg:text-center gap-4 lg:gap-0 group pl-2 lg:pl-0 cursor-pointer"
              >
                {/* Icon box with number badge */}
                <div className="relative mb-0 lg:mb-5 shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white glass border border-orange-200/80 flex items-center justify-center shadow-[0_8px_30px_rgba(234,108,0,0.12)] group-hover:shadow-[0_12px_40px_rgba(234,108,0,0.3)] group-hover:scale-110 group-hover:border-orange-400 transition-all duration-300">
                    <step.icon className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black flex items-center justify-center shadow-md">
                    {step.stepNum}
                  </div>
                </div>

                {/* Text card */}
                <div className="glass p-4 lg:p-3 rounded-2xl w-full text-left lg:text-center border border-orange-100/60 group-hover:border-orange-200 transition-colors">
                  <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1 group-hover:text-orange-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-snug">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
