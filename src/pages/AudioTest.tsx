import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, ArrowRight } from 'lucide-react';

export default function AudioTest() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const words = ["Apple", "Robot", "Space", "Music"];

  const playSound = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  return (
    <section className="w-full flex-grow flex items-center min-h-[85vh] py-12">
      <div className="w-full max-w-[1400px] mx-auto px-8 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* LEFT COLUMN: Instructions & Audio Trigger */}
        <div className="flex flex-col items-start space-y-10 order-2 lg:order-1">
          <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md p-2 pr-6 rounded-full border border-white shadow-sm">
            <div className="w-12 h-12 bg-soft-blue rounded-full flex items-center justify-center text-white shadow-inner">
              <span className="text-xl">🎧</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-soft-blue uppercase tracking-wider">Audio Check</h2>
              <p className="text-soft-blue/60 font-medium text-xs">Waiting for sound...</p>
            </div>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-soft-blue tracking-tight leading-none">
            Listen & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-soft-blue to-soft-lavender">choose comfortably.</span>
          </h1>

          <p className="text-xl text-soft-blue/70 max-w-md font-medium">
            Press the button to hear a gentle sound.
          </p>

          {/* Giant Speaker Button */}
          <motion.button
            onClick={playSound}
            whileTap={{ scale: 0.95 }}
            className={`w-full max-w-sm aspect-video rounded-[2.5rem] bg-white/60 border border-white flex items-center justify-center group transition-all shadow-xl hover:shadow-2xl hover:translate-y-[-2px] relative overflow-hidden`}
          >
            <div className={`relative z-10 p-8 rounded-full transition-all duration-500 ${isPlaying ? 'bg-soft-lavender text-white scale-110 shadow-lg' : 'bg-soft-sky text-soft-blue shadow-md group-hover:scale-110'}`}>
              <Volume2 className="w-16 h-16" />
            </div>
          </motion.button>

        </div>

        {/* RIGHT COLUMN: The Game Grid */}
        <div className="order-1 lg:order-2 h-full flex flex-col justify-center gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            {words.map((word) => (
              <motion.button
                key={word}
                onClick={() => setSelectedWord(word)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-8 rounded-3xl text-2xl font-bold transition-all border border-white shadow-lg ${selectedWord === word
                    ? 'bg-gradient-to-br from-soft-blue to-soft-lavender text-white ring-4 ring-white/50'
                    : 'glass-panel text-soft-blue hover:bg-white'
                  }`}
              >
                {word}
              </motion.button>
            ))}
          </div>

          <button
            onClick={() => navigate('/test/handwriting')}
            disabled={!selectedWord}
            className={`w-full py-6 rounded-3xl text-xl font-bold border border-white shadow-xl transition-all flex items-center justify-center gap-4 ${selectedWord
                ? 'bg-gradient-to-r from-soft-blue to-soft-lavender text-white hover:scale-[1.01] hover:shadow-2xl'
                : 'bg-white/30 text-soft-blue/30 cursor-not-allowed shadow-none'
              }`}
          >
            Next Test <ArrowRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </section>
  );
}
