"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, PlayCircle, X, ExternalLink } from "lucide-react";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { Button } from "@/components/ui/button";
// YouTube немесе Google Drive URL-ін embed URL-ге айналдырады
function getYouTubeEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    let videoId = "";
    if (u.hostname.includes("youtu.be")) {
      videoId = u.pathname.slice(1);
    } else if (u.pathname.startsWith("/live/")) {
      videoId = u.pathname.split("/live/")[1].split("?")[0];
    } else {
      videoId = u.searchParams.get("v") || "";
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  } catch {
    return url;
  }
}

export interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  videoUrl: string; // YouTube сілтемесі немесе Google Drive сілтемесі
}

const courses: Course[] = [
  {
    id: 1,
    title: "Кіріспе: Shyraq Академиясы",
    description: "Shyraq академиясының негізгі мақсаты мен миссиясы.",
    duration: "5 мин",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // YouTube сілтемесін осы жерге қоясыз
  },
  {
    id: 2,
    title: "Өнім туралы толық мәлімет",
    description: "Біздің AI платформа қалай жұмыс істейді?",
    duration: "3 мин 49 сек",
    videoUrl: "https://youtu.be/NDxFoTcdLRE?si=-l7RRcukReFD6F-c",
  },
  {
    id: 3,
    title: "Сату негіздері мен техникасы",
    description: "Клиентпен тиімді қарым-қатынас орнату жолдары.",
    duration: "15 мин",
    videoUrl: "https://youtu.be/w3k2Im3iY7s?si=XNi2iYz2QuLUHriM",
  },
  {
    id: 4,
    title: "Келісімді сәтті аяқтау",
    description: "Келісім-шарт жасасу және келіссөздер жүргізу.",
    duration: "10 мин",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

export default function Courses() {
  const [completedCourses, setCompletedCourses] = useLocalStorage<number[]>("completedCourses", []);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  const progress = Math.round((completedCourses.length / courses.length) * 100);

  const toggleCourse = (id: number) => {
    if (completedCourses.includes(id)) {
      setCompletedCourses(completedCourses.filter((c) => c !== id));
    } else {
      setCompletedCourses([...completedCourses, id]);
    }
  };

  const isGoogleDrive = (url: string) => url.includes("drive.google.com");

  const getGoogleDriveEmbedUrl = (url: string) => {
    // Google Drive сілтемесін embed форматына айналдыру (/view -> /preview)
    return url.replace(/\/view.*$/, "/preview").replace(/\/edit.*$/, "/preview");
  };

  return (
    <section id="courses" className="py-16 md:py-24 bg-gradient-to-b from-orange-50/40 via-white to-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Header & Global Progress */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 border border-orange-200 mb-4">
              <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">Бейнекурстар</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3">Оқу бағдарламасы</h2>
            <p className="text-gray-500 max-w-xl text-sm md:text-base">Қызметкерлерді дамытуға арналған арнайы бейнекурстар.</p>
          </motion.div>
          
          <div className="flex items-center gap-4 p-4 md:p-6 glass rounded-3xl border-orange-200 w-full md:w-auto">
            <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-white shadow-inner shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-orange-100"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-orange-500 transition-all duration-1000 ease-out"
                  strokeDasharray={`${progress}, 100`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-xl font-bold text-gray-800">{progress}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 font-medium">Жалпы прогресс</div>
              <div className="text-lg font-bold text-gray-900">Аяқталған курс</div>
              
              {/* Badges */}
              <div className="flex gap-2 mt-2">
                <motion.div initial={{ scale: 0 }} animate={{ scale: progress >= 25 ? 1 : 0 }} className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 border border-orange-300 text-xl shadow-sm" title="25% Аяқталды">⭐</motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: progress >= 50 ? 1 : 0 }} className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 border border-orange-300 text-xl shadow-sm" title="50% Аяқталды">🥈</motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: progress >= 75 ? 1 : 0 }} className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 border border-orange-300 text-xl shadow-sm" title="75% Аяқталды">🥇</motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: progress >= 100 ? 1 : 0 }} className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 border border-orange-300 text-xl shadow-[0_0_15px_rgba(249,115,22,0.5)]" title="100% Тамаша!">🏆</motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {courses.map((course, idx) => {
            const isCompleted = completedCourses.includes(course.id);
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={`relative overflow-hidden rounded-3xl transition-all duration-500 ${
                  isCompleted
                    ? "shadow-[0_20px_60px_rgba(234,108,0,0.35)]"
                    : "shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(234,108,0,0.20)]"
                }`}
              >
                {/* Gradient border wrapper */}
                <div
                  className={`p-[1.5px] rounded-3xl h-full ${
                    isCompleted
                      ? "bg-gradient-to-br from-orange-400 via-amber-400 to-orange-600"
                      : "bg-gradient-to-br from-orange-100 via-white to-amber-100"
                  }`}
                >
                  <div className={`h-full rounded-[22px] p-5 md:p-6 flex flex-col ${
                    isCompleted
                      ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white"
                      : "bg-white text-gray-800"
                  }`}>
                    
                    {/* Video Thumbnail Box */}
                    <div
                      onClick={() => setActiveCourse(course)}
                      className={`w-full aspect-video rounded-xl mb-5 flex items-center justify-center relative overflow-hidden cursor-pointer group ${
                        isCompleted
                          ? "bg-white/15"
                          : "bg-gradient-to-br from-orange-50 to-amber-50"
                      }`}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                      {/* Shimmer on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)", transform: "translateX(-100%)", animation: "shimmer-sweep 0.8s ease forwards" }} />
                      {/* Play button */}
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center ${
                          isCompleted ? "bg-white/25" : "bg-white shadow-[0_8px_30px_rgba(234,108,0,0.35)]"
                        }`}
                      >
                        <PlayCircle className={`w-8 h-8 md:w-9 md:h-9 ${
                          isCompleted ? "text-white" : "text-orange-500"
                        }`} />
                      </motion.div>
                      <span className="absolute bottom-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-black/60 text-white backdrop-blur-sm flex items-center gap-1">
                        <PlayCircle className="w-3 h-3" /> Көру
                      </span>
                      {isCompleted && (
                        <span className="absolute top-3 left-3 flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-green-500/80 text-white backdrop-blur-sm">
                          <CheckCircle className="w-3 h-3" /> Аяқталды
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className={`text-lg md:text-xl font-bold mb-2 leading-snug ${
                        isCompleted ? "text-white" : "text-gray-900"
                      }`}>{course.title}</h3>
                      <p className={`text-sm mb-4 leading-relaxed ${
                        isCompleted ? "text-orange-50/80" : "text-gray-500"
                      }`}>{course.description}</p>
                    </div>
                    
                    <div className={`flex items-center justify-between pt-4 border-t ${
                      isCompleted ? "border-white/20" : "border-orange-50"
                    }`}>
                      <div className={`text-sm font-semibold px-3 py-1.5 rounded-full ${
                        isCompleted ? "bg-white/20 text-white" : "bg-orange-100 text-orange-700"
                      }`}>
                        {course.duration}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => setActiveCourse(course)}
                          variant="outline"
                          size="sm"
                          className={`rounded-full text-xs font-semibold ${
                            isCompleted
                              ? "border-white/40 text-white hover:bg-white/20"
                              : "border-orange-200 text-orange-600 hover:bg-orange-50"
                          }`}
                        >
                          Видеоны ашу
                        </Button>

                        <Button
                          onClick={() => toggleCourse(course.id)}
                          size="sm"
                          className={`rounded-full text-xs font-semibold ${
                            isCompleted
                              ? "bg-white text-orange-600 hover:bg-orange-50 border-0"
                              : "glass-button border-0"
                          }`}
                        >
                          {isCompleted ? (
                            <><CheckCircle className="w-3.5 h-3.5 mr-1" />Аяқталды</>
                          ) : (
                            "Белгілеу"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-orange-200 max-h-[95vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-6 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100 shrink-0">
                <div className="mr-4">
                  <h3 className="text-base md:text-xl font-bold text-gray-900 line-clamp-1">{activeCourse.title}</h3>
                  <p className="text-xs md:text-sm text-gray-500 line-clamp-1">{activeCourse.description}</p>
                </div>
                <button
                  onClick={() => setActiveCourse(null)}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white text-gray-500 hover:text-gray-900 hover:bg-orange-100 flex items-center justify-center transition-colors shadow-sm shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Frame */}
              <div className="relative aspect-video bg-black w-full overflow-hidden">
                {isGoogleDrive(activeCourse.videoUrl) ? (
                  <iframe
                    src={getGoogleDriveEmbedUrl(activeCourse.videoUrl)}
                    className="w-full h-full border-0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <iframe
                    src={getYouTubeEmbedUrl(activeCourse.videoUrl)}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={activeCourse.title}
                  />
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white shrink-0">
                <a
                  href={activeCourse.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-orange-600 hover:underline flex items-center gap-1"
                >
                  Түпнұсқа сілтемені ашу <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => {
                      if (!completedCourses.includes(activeCourse.id)) {
                        toggleCourse(activeCourse.id);
                      }
                      setActiveCourse(null);
                    }}
                    className="glass-button rounded-full px-6"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Көрдім (Аяқталды деп белгілеу)
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
