import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Mic, CheckCircle, Eye } from 'lucide-react';

const words = [
  "Galaxy", "Rocket", "Star", "Planet", "Meteor",
  "Comet", "Orbit", "Nebula", "Alien", "Gravity"
];

export default function ReadingTest() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/test/audio');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate('/test/audio');
    }
  };

  return (
    <section className="w-full flex-grow flex items-center min-h-[85vh] py-12">
      <div className="w-full max-w-[1400px] mx-auto px-8 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT COLUMN: Controls & Instructions */}
        <div className="flex flex-col items-start space-y-10 order-2 lg:order-1">
          {/* Context Label */}
          <div className="flex items-center gap-3 px-4 py-2 border-l-4 border-prof-green bg-white/50">
            <Eye className="w-5 h-5 text-prof-green" />
            <span className="text-sm font-semibold text-prof-blue uppercase tracking-widest">DYSLEXIA SCREENING</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl lg:text-6xl font-light text-prof-blue tracking-tight">
              Read the target <br />
              <span className="font-bold">aloud.</span>
            </h1>
            <p className="text-prof-blue/60 text-lg">
              Assessment of phonological awareness and decoding speed.
            </p>
          </div>

          {/* HUD */}
          <div className="flex items-center gap-8 pt-4 w-full">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-prof-blue/40 uppercase tracking-widest">Time Remaining</span>
              <div className="flex items-center gap-2 text-prof-orange font-light text-4xl">
                <Timer className="w-6 h-6" />
                <span>{timeLeft}s</span>
              </div>
            </div>
            <div className="w-px h-12 bg-prof-blue/10" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-prof-blue/40 uppercase tracking-widest">Progress</span>
              <span className="text-prof-blue font-light text-4xl">{currentIndex + 1}<span className="text-lg text-prof-blue/30">/{words.length}</span></span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-5 w-full pt-8">
            <button
              className={`h-15 w-20 rounded-full flex items-center justify-center border border-prof-blue/20 transition-all shadow-sm ${isListening ? 'bg-prof-lavender text-white animate-pulse' : 'bg-white text-prof-blue hover:bg-prof-blue hover:text-white'}`}
              onClick={() => setIsListening(!isListening)}
            >
              <Mic className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="flex-grow h-15 bg-prof-blue border-1 border-prof-blue  rounded-full text-blue-950 text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-4 px-8"


            >
              Record & Continue <CheckCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: The Visual Task */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end h-full min-h-[400px]">
          <div className="relative w-full aspect-square max-w-[500px] bg-white rounded-[40px] shadow-2xl shadow-prof-blue/5 flex items-center justify-center overflow-hidden border border-prof-blue/5">
            {/* Elegant Background Element */}
            <div className="absolute top-[-20%] right-[-20%] w-80 h-80 bg-prof-sky rounded-full blur-[80px] opacity-50" />
            <div className="absolute bottom-[-10%] left-[-10%] w-60 h-60 bg-prof-lavender/30 rounded-full blur-[60px]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="relative z-10"
              >
                <span className="text-6xl lg:text-[7rem] font-bold text-prof-blue tracking-tight">
                  {words[currentIndex]}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
