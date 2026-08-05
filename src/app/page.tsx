import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import CeoWelcome from "@/components/sections/CeoWelcome";
import HistoryTimeline from "@/components/sections/HistoryTimeline";
import Statistics from "@/components/sections/Statistics";
import Courses from "@/components/sections/Courses";
import Roadmap from "@/components/sections/Roadmap";
import Objections from "@/components/sections/Objections";
import Team from "@/components/sections/Team";
import Materials from "@/components/sections/Materials";
import Quiz from "@/components/sections/Quiz";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden pt-12">
        <div className="w-full">
          <Hero />
          <CeoWelcome />
          <HistoryTimeline />
          <Statistics />
          <Courses />
          <Roadmap />
          <Objections />
          <Team />
          <Materials />
          <Quiz />
        </div>
      </main>
      <Footer />
    </>
  );
}
