import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, ArrowRight, Ear } from 'lucide-react';

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
          {/* Context Label */}
          <div className="flex items-center gap-3 px-4 py-2 border-l-4 border-prof-orange bg-white/50">
            <Ear className="w-5 h-5 text-prof-orange" />
            <span className="text-sm font-semibold text-prof-blue uppercase tracking-widest">Auditory Processing</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl lg:text-6xl font-light text-prof-blue tracking-tight">
              Listen and <br />
              <span className="font-bold">identify.</span>
            </h1>
            <p className="text-prof-blue/60 text-lg">
              Screening for auditory reception and word discrimination.
            </p>
          </div>

          {/* Speaker Button */}
          <motion.button
            onClick={playSound}
            whileTap={{ scale: 0.98 }}
            className={`w-full max-w-sm aspect-video rounded-2xl bg-white border border-prof-blue/10 flex items-center justify-center group transition-all shadow-lg hover:shadow-xl hover:border-prof-blue/30 relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-prof-sky opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className={`relative z-10 p-8 rounded-full transition-all duration-300 ${isPlaying ? 'bg-prof-orange text-white scale-110 shadow-lg' : 'bg-white text-prof-blue shadow-md border border-prof-blue/10'}`}>
              <Volume2 className="w-12 h-12" />
            </div>
          </motion.button>

        </div>

        {/* RIGHT COLUMN: The Game Grid */}
        <div className="order-1 lg:order-2 h-full flex flex-col justify-center gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {words.map((word) => (
              <motion.button
                key={word}
                onClick={() => setSelectedWord(word)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-8 rounded-xl text-xl font-medium transition-all border ${selectedWord === word
                  ? 'bg-prof-orange text-white border-prof-orange shadow-lg'
                  : 'bg-white text-prof-blue border-prof-blue/10 hover:border-prof-blue hover:bg-prof-sky/30'
                  }`}
              >
                {word}
              </motion.button>
            ))}
          </div>

          <button
            onClick={() => navigate('/test/handwriting')}
            disabled={!selectedWord}
            className={`w-full py-5 rounded-full text-lg font-semibold border transition-all flex items-center justify-center gap-4 ${selectedWord
              ? 'bg-prof-orange text-white border-prof-orange shadow-lg hover:-translate-y-0.5'
              : 'bg-transparent text-prof-blue/40 border-prof-blue/10 cursor-not-allowed'
              }`}
          >
            Proceed to Motor Assessment <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
