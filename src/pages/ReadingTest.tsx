import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Mic, CheckCircle, Smartphone } from 'lucide-react';

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
           {/* Character Guide */}
           <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md p-2 pr-6 rounded-full border border-white shadow-sm">
              <div className="w-12 h-12 bg-soft-lavender rounded-full flex items-center justify-center text-white shadow-inner">
                 <Smartphone className="w-6 h-6" />
              </div>
              <div>
                 <h2 className="text-sm font-bold text-soft-blue uppercase tracking-wider">Reading Pal</h2>
                 <p className="text-soft-blue/70 font-medium text-xs">I'm all ears...</p>
              </div>
           </div>

           <h1 className="text-5xl lg:text-7xl font-bold text-soft-blue tracking-tight leading-none drop-shadow-sm">
              Read this <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-soft-green to-soft-orange">Next Word.</span>
           </h1>
           
           {/* HUD */}
           <div className="inline-flex items-center gap-6 px-8 py-5 bg-white/60 backdrop-blur-md rounded-3xl border border-white shadow-lg w-full max-w-sm">
               <div className="flex items-center gap-3 text-soft-blue font-black flex-1">
                  <Timer className="w-6 h-6 text-soft-orange" />
                  <span className="font-mono text-2xl">{timeLeft}s</span>
               </div>
               <div className="w-[1px] h-8 bg-soft-blue/10" />
               <div className="text-soft-blue/60 font-bold text-lg flex-1 text-right">
                  {currentIndex + 1} / {words.length}
               </div>
           </div>

           {/* Controls */}
           <div className="flex flex-wrap gap-5 w-full pt-4">
               <button 
                 className={`h-20 w-20 rounded-3xl flex items-center justify-center border border-white transition-all shadow-md ${isListening ? 'bg-soft-orange text-white animate-pulse shadow-soft-orange/50' : 'bg-white/50 text-soft-blue hover:bg-white'}`}
                 onClick={() => setIsListening(!isListening)}
               >
                  <Mic className="w-8 h-8" />
               </button>
               
               <button 
                 onClick={handleNext}
                 className="flex-grow h-20 bg-gradient-to-r from-soft-orange to-soft-green rounded-3xl text-white text-xl font-bold border border-white/50 shadow-xl shadow-soft-green/30 hover:scale-[1.02] hover:shadow-2xl transition-all flex items-center justify-center gap-4 px-8"
               >
                  Good Job <CheckCircle className="w-7 h-7" />
               </button>
           </div>
        </div>

        {/* RIGHT COLUMN: The Visual Task */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end h-full min-h-[400px]">
           <div className="relative w-full aspect-square max-w-[500px] glass-panel rounded-[3rem] shadow-2xl flex items-center justify-center overflow-hidden">
               <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-soft-sky rounded-full blur-[60px] opacity-60" />
               <div className="absolute bottom-[-20%] left-[-20%] w-64 h-64 bg-soft-lavender rounded-full blur-[60px] opacity-60" />
               
               <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.1, rotate: 2 }}
                    className="relative z-10"
                  >
                    <span className="text-6xl lg:text-[8rem] font-bold text-soft-blue tracking-tight drop-shadow-sm">
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
