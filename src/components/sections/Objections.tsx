"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, ChevronDown, MessageSquareCheck } from "lucide-react";
import { Input } from "@/components/ui/input";

const objections = [
  {
    id: "item-1",
    question: "«Бұл өте қымбат...»",
    answer: "Біздің платформа үнемдейтін уақыт пен ресурстарды ескерсек, бұл инвестиция өзін 1-2 айда ақтайды. Келіңіз, сіздің мектебіңізде қанша уақыт үнемделетінін бірге есептейік.",
    badge: "Баға қарсылығы",
  },
  {
    id: "item-2",
    question: "«Бізге қазір қажет емес»",
    answer: "Қазір енгізу — бәсекелестерден озып кетудің ең сапалы жолы. Сіздің командаңыз жаңа жүйеге бейімделіп жатқанда, басқалар енді ғана ойлана бастайды.",
    badge: "Уақыт қарсылығы",
  },
  {
    id: "item-3",
    question: "«Оқыту және үйрену қиын болады»",
    answer: "Shyraq интерфейсі барынша интуитивті (Apple стилінде жасалған). Сонымен қатар, біз толық кураторлық оқыту мен 24/7 қолдау көрсетеміз.",
    badge: "Күрделілік",
  },
  {
    id: "item-4",
    question: "«Біз басқа жүйені қолданамыз»",
    answer: "Біздің AI жүйеміз кез келген белгілі платформамен оңай интеграцияланады. Деректерді көшіру толық автоматтандырылған.",
    badge: "Интеграция",
  },
];

export default function Objections() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>("item-1");

  const filteredObjections = objections.filter(
    (obj) =>
      obj.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obj.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obj.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-orange-50/40 via-white to-orange-50/20">
      {/* Background orb glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-400/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-orange-200/80 mb-4 shadow-[0_4px_20px_rgba(234,108,0,0.1)]">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-xs md:text-sm font-bold text-orange-700 uppercase tracking-wider">Шпаргалка</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">
            Қарсылықтармен жұмыс
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            Клиенттер қоятын жиі сұрақтарға арналған сәтті жауап үлгілері
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-8"
        >
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
          <Input
            type="text"
            placeholder="Сұрақты немесе кілт сөзді жазыңыз..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 pr-6 h-14 rounded-2xl glass border-orange-200 focus-visible:ring-orange-500 text-base shadow-[0_8px_30px_rgba(234,108,0,0.08)] placeholder:text-gray-400"
          />
        </motion.div>

        {/* Accordion Cards */}
        <div className="space-y-4">
          {filteredObjections.length > 0 ? (
            filteredObjections.map((obj, idx) => {
              const isOpen = openId === obj.id;
              return (
                <motion.div
                  key={obj.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`glass rounded-2xl overflow-hidden border transition-all duration-300 ${
                    isOpen
                      ? "border-orange-300 shadow-[0_12px_40px_rgba(234,108,0,0.15)] bg-white/90"
                      : "border-orange-100/80 shadow-sm hover:border-orange-200"
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : obj.id)}
                    className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                        isOpen ? "bg-orange-500 text-white shadow-[0_4px_16px_rgba(234,108,0,0.4)]" : "bg-orange-100 text-orange-600 group-hover:bg-orange-200"
                      }`}>
                        <MessageSquareCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-100/80 text-orange-700 mr-2">
                          {obj.badge}
                        </span>
                        <h3 className="inline font-bold text-gray-900 text-base md:text-lg group-hover:text-orange-600 transition-colors">
                          {obj.question}
                        </h3>
                      </div>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shrink-0"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 border-t border-orange-100/60">
                          <p className="text-gray-600 leading-relaxed text-sm md:text-base bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                            💡 <span className="font-semibold text-gray-800">Ұсынылатын жауап:</span> {obj.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-10 glass rounded-2xl text-gray-500 text-sm">
              Сұрағыңызға сәйкес нәтиже табылмады.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
