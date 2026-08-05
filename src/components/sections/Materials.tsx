"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, FileImage, Presentation, PlaySquare, Download, Play, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type Material = {
  id: number;
  title: string;
  type: string;
  size: string;
  icon: any;
  color: string;
  bg: string;
  url?: string;
  videoUrl?: string;
};

const materials: Material[] = [
  { id: 1, title: "Сату скрипттері", type: "PDF", size: "360 KB", icon: FileText, color: "text-red-500", bg: "bg-red-50/80 border-red-100", url: "/materials/scripts.pdf" },
  { id: 2, title: "Shyraq платформасының презентациясы", type: "PDF", size: "64,5 MB", icon: Presentation, color: "text-orange-500", bg: "bg-orange-50/80 border-orange-100", url: "/materials/presentation.pdf" },
  { id: 3, title: "Сатушыға арналған презентация", type: "PDF", size: "8.0 MB", icon: Presentation, color: "text-amber-500", bg: "bg-amber-50/80 border-amber-100", url: "/materials/sales-presentation.pdf" },
  { id: 4, title: "Коммерциялық ұсыныс (Үлгі)", type: "DOCX", size: "38.9 KB", icon: FileText, color: "text-blue-500", bg: "bg-blue-50/80 border-blue-100", url: "/materials/commercial-offer.docx" },
  { id: 5, title: "Вебинар жазбасы (Маусым)", type: "VIDEO", size: "YouTube", icon: PlaySquare, color: "text-purple-500", bg: "bg-purple-50/80 border-purple-100", videoUrl: "https://youtube.com/live/u_Ov3h0v_KA" },
  { id: 6, title: "Shyraq Логотиптері", type: "ZIP", size: "350 KB", icon: FileImage, color: "text-emerald-500", bg: "bg-emerald-50/80 border-emerald-100", url: "/materials/logos.zip" },
];

export default function Materials() {
  const [activeVideo, setActiveVideo] = useState<Material | null>(null);

  return (
    <section id="materials" className="py-20 md:py-28 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[300px] bg-orange-400/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-orange-200/80 mb-4 shadow-[0_4px_20px_rgba(234,108,0,0.1)]">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-xs md:text-sm font-bold text-orange-700 uppercase tracking-wider">База знаний</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">
              Оқу материалдары
            </h2>
            <p className="text-gray-500 text-sm md:text-base max-w-lg">
              Сату барысында қажет болатын барлық ресми құжаттар, презентациялар мен бейнебаяндар
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full sm:w-auto"
          >
            <Button className="glass-button rounded-full px-7 h-12 text-sm font-bold w-full sm:w-auto flex items-center justify-center gap-2 shadow-[0_6px_25px_rgba(234,108,0,0.35)]">
              <Download className="w-4 h-4" />
              Барлығын жүктеп алу
            </Button>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="glass rounded-3xl p-6 flex items-start gap-4 group border border-orange-100/70 hover:border-orange-300 hover:shadow-[0_16px_40px_rgba(234,108,0,0.15)] transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle sheen highlight on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className={`w-14 h-14 rounded-2xl ${item.bg} border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-base mb-1.5 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                  <span className="uppercase px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">{item.type}</span>
                  <span>•</span>
                  <span>{item.size}</span>
                </div>
              </div>
              
              {item.videoUrl ? (
                <button 
                  onClick={() => setActiveVideo(item)}
                  className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600 hover:text-white hover:bg-purple-600 hover:scale-110 transition-all duration-200 shrink-0 shadow-sm"
                >
                  <Play className="w-4 h-4 ml-0.5 fill-current" />
                </button>
              ) : (
                <a
                  href={item.url}
                  download
                  className="w-10 h-10 rounded-2xl bg-orange-100/80 border border-orange-200/80 flex items-center justify-center text-orange-600 hover:text-white hover:bg-orange-500 hover:scale-110 transition-all duration-200 shrink-0 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setActiveVideo(null)}
                  className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-video w-full">
                <ReactPlayer
                  url={activeVideo.videoUrl}
                  width="100%"
                  height="100%"
                  controls
                  playing
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
