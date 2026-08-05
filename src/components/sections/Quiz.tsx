"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

const questions = [
  { q: "Shyraq платформасының негізгі мақсаты қандай?", options: ["Мұғалімдердің жұмысын жеңілдету", "Ойын ойнау", "Сатуды азайту", "Жарнама жасау"], a: 0 },
  { q: "Платформаға қандай технология енгізілген?", options: ["Blockchain", "AI (Жасанды интеллект)", "VR", "IoT"], a: 1 },
  { q: "Сатудың бірінші кезеңі қандай?", options: ["Келісім", "Қарсылықтар", "Алғашқы байланыс", "Демонстрация"], a: 2 },
  { q: "Клиентке презентация жасау қалай аталады?", options: ["Демонстрация", "Төлем", "Сұрақтар", "Келісім шарт"], a: 0 },
  { id: 5, q: "«Бұл өте қымбат» дегенге ең жақсы жауап?", options: ["Иә, кешіріңіз", "Біз арзанырақ табамыз", "Бұл инвестиция өзін тез ақтайды", "Басқа компанияға барыңыз"], a: 2 },
  { id: 6, q: "Shyraq платформасы неше мектеппен серіктес?", options: ["10+", "50+", "100+", "1000+"], a: 2 },
  { id: 7, q: "Командадағы SDR мағынасы қандай?", options: ["Sales Development Rep", "Software Developer", "System Design", "Sales Director"], a: 0 },
  { id: 8, q: "Қандай түс Shyraq брендінің негізгі түсі?", options: ["Көк", "Жасыл", "Қызғылт сары (Orange)", "Қара"], a: 2 },
  { id: 9, q: "Курсты толық аяқтағанда қандай белгі беріледі?", options: ["Кубок", "Медаль", "Сертификат", "Жалау"], a: 0 },
  { id: 10, q: "Біздің ұран қандай?", options: ["Тек алға", "Білімнің шырағын бірге жағайық", "Ең мықты платформа", "Сату біздің мақсатымыз"], a: 1 },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === questions[currentQuestion].a) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setIsAnswered(false);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
        triggerConfetti(score + (index === questions[currentQuestion].a ? 1 : 0));
      }
    }, 1000);
  };

  const triggerConfetti = (finalScore: number) => {
    const percentage = (finalScore / questions.length) * 100;
    if (percentage >= 80) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
      }, 250);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  return (
    <section id="quiz" className="py-16 md:py-24 bg-gradient-to-b from-white to-orange-50/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Білімді тексеру</h2>
          <p className="text-gray-500">Курс соңындағы қорытынды тест (10 сұрақ)</p>
        </div>

        <div className="glass-panel rounded-3xl p-6 md:p-10 border-orange-200 shadow-lg min-h-[400px] flex flex-col relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full flex-1"
              >
                <div className="flex justify-between items-center mb-6 text-sm font-bold text-orange-500">
                  <span>Сұрақ {currentQuestion + 1} / {questions.length}</span>
                  <span>Ұпай: {score}</span>
                </div>
                
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 leading-snug">
                  {questions[currentQuestion].q}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isCorrect = index === questions[currentQuestion].a;
                    let buttonClass = "bg-white hover:bg-orange-50 text-gray-700 border-gray-200";
                    
                    if (isAnswered) {
                      if (isCorrect) buttonClass = "bg-green-100 border-green-500 text-green-800";
                      else if (selectedAnswer === index) buttonClass = "bg-red-100 border-red-500 text-red-800";
                      else buttonClass = "bg-gray-50 opacity-50 border-gray-100 text-gray-400";
                    }

                    return (
                      <button
                        key={index}
                        disabled={isAnswered}
                        onClick={() => handleAnswer(index)}
                        className={`p-4 rounded-xl border-2 text-left font-medium transition-all ${buttonClass} flex justify-between items-center`}
                      >
                        <span>{option}</span>
                        {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                        {isAnswered && selectedAnswer === index && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full flex-1 text-center py-10"
              >
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${score >= 8 ? 'bg-orange-100' : 'bg-gray-100'}`}>
                  <span className="text-5xl">{score >= 8 ? '🏆' : '📚'}</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {score >= 8 ? "Құттықтаймыз!" : "Жақсы талпыныс!"}
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  Сіз {questions.length} сұрақтың <span className="font-bold text-orange-600 text-xl">{score}</span> сұрағына дұрыс жауап бердіңіз.
                </p>
                
                {score >= 8 ? (
                  <div className="bg-orange-50 text-orange-700 p-4 rounded-xl mb-8 font-medium">
                    Сіз жаңа бейджге ие болдыңыз! Платформаны толық меңгердіңіз.
                  </div>
                ) : (
                  <div className="bg-gray-50 text-gray-600 p-4 rounded-xl mb-8 font-medium">
                    Нәтижені жақсарту үшін курстарды қайта қарап шығыңыз. (80% қажет)
                  </div>
                )}
                
                <Button onClick={resetQuiz} className="glass-button rounded-full px-8 h-12 text-lg">
                  Қайтадан өту
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
