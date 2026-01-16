import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RotateCcw, Heart } from 'lucide-react';

export default function Scorecard() {
  const navigate = useNavigate();

  const scores = [
    { label: "Reading", value: 92, color: "bg-gradient-to-r from-soft-green to-soft-orange" },
    { label: "Listening", value: 85, color: "bg-gradient-to-r from-soft-blue to-soft-lavender" },
    { label: "Writing", value: 88, color: "bg-gradient-to-r from-soft-orange to-soft-cream" },
  ];

  return (
    <section className="w-full flex-grow flex items-center min-h-[85vh] py-12">
      <div className="w-full max-w-[1400px] mx-auto px-8 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">

        {/* LEFT COLUMN: Summary & Celebration */}
        <div className="flex flex-col justify-center space-y-10 order-1">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-32 h-32 bg-gradient-to-br from-soft-lavender to-soft-sky rounded-full flex items-center justify-center shadow-xl mb-8">
              <span className="text-6xl">🌟</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold text-soft-blue tracking-tight leading-none mb-4">
              So <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-soft-lavender to-soft-blue">Amazing!</span>
            </h1>
            <p className="text-2xl text-soft-blue/70 font-medium">You did wonderful work today.</p>
          </motion.div>

          {/* Friendly Insight Card */}
          <div className="glass-panel rounded-[2.5rem] p-10 relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 inline-flex px-4 py-1.5 bg-soft-lavender/20 rounded-full w-fit">
                <Heart className="w-5 h-5 text-soft-blue fill-current" />
                <span className="text-soft-blue font-bold text-sm tracking-wide">Love Note</span>
              </div>
              <p className="text-xl text-soft-blue leading-relaxed font-medium">
                "Your focus was calm and steady! You read beautifully and listened with care. Keep shining!"
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="self-start inline-flex items-center gap-4 px-10 py-5 bg-soft-blue text-white rounded-full font-bold text-lg hover:scale-[1.02] transition-all shadow-xl shadow-soft-blue/30"
          >
            <RotateCcw className="w-5 h-5" /> Play Again
          </button>
        </div>

        {/* RIGHT COLUMN: Detailed Stats */}
        <div className="order-2 flex flex-col justify-center gap-6">
          <div className="flex items-center justify-between pb-2 mb-4">
            <h2 className="text-xl font-bold text-soft-blue/50 uppercase tracking-widest">Growth</h2>
          </div>

          {scores.map((score, index) => (
            <motion.div
              key={score.label}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.15 }}
              className="glass-panel rounded-[2.5rem] p-10 shadow-lg flex flex-col gap-5 hover:scale-[1.02] transition-all"
            >
              <div className="flex justify-between items-end">
                <span className="font-bold text-soft-blue/80 text-2xl">{score.label}</span>
                <span className="font-black text-soft-blue text-4xl">{score.value}%</span>
              </div>

              <div className="h-6 bg-white/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score.value}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + index * 0.2 }}
                  className={`h-full ${score.color} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
