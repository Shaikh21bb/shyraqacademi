"use client";

import { motion } from "framer-motion";
import Image from "next/image";


const team = [
  { id: 1, name: "Сандуғаш Е.", role: "Сату бөлімінің басшысы", department: "Сату Бөлімі", image: "/team1.jpg" },
  { id: 2, name: "Мадияр Е.", role: "IT & AI маманы", department: "IT & AI", image: "/team2.jpg" },
  { id: 3, name: "Алия М.", role: "Бас Маркетолог", department: "Маркетинг", image: "/team3.jpg" },
  { id: 4, name: "Назгүл Қ.", role: "Бас Куратор", department: "Клиенттермен Жұмыс", image: "/team4.jpg" },
];

export default function Team() {
  return (
    <section id="team" className="py-20 md:py-28 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-orange-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        


        {/* Team Grid */}
        <div>
          <div className="text-center mb-10 md:mb-14">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Команда мүшелері</h3>
            <p className="text-gray-400 text-sm md:text-base">Платформа артындағы кәсіби мамандар</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="glass rounded-3xl p-6 flex flex-col items-center text-center group border border-orange-100/80 hover:border-orange-300 hover:shadow-[0_16px_48px_rgba(234,108,0,0.18)] transition-all duration-300 cursor-pointer"
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-md overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-orange-100 to-amber-50">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-orange-600 transition-colors">{member.name}</h3>
                <p className="text-orange-600 font-semibold text-xs sm:text-sm mb-1.5">{member.role}</p>
                <span className="text-gray-400 text-xs px-2.5 py-1 rounded-full bg-orange-50/80 border border-orange-100 font-medium">
                  {member.department}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
