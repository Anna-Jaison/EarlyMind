import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RotateCcw, FileText, CheckCircle2 } from 'lucide-react';

export default function Scorecard() {
  const navigate = useNavigate();

  const scores = [
    { label: "Decode Velocity", value: 92, status: "Optimal" },
    { label: "Auditory Reception", value: 85, status: "Normal" },
    { label: "Motor Consistency", value: 88, status: "High" },
  ];

  return (
    <section className="w-full flex-grow flex items-center min-h-[85vh] py-12">
      <div className="w-full max-w-[1400px] mx-auto px-8 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">

        {/* LEFT COLUMN: Summary & Celebration */}
        <div className="flex flex-col justify-center space-y-10 order-1">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-prof-green/20 rounded text-prof-blue text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" /> Analysis Complete
            </div>
            <h1 className="text-5xl lg:text-7xl font-light text-prof-blue tracking-tight mb-4">
              Cognitive Profile <br /><span className="font-bold">Generated.</span>
            </h1>
            <p className="text-xl text-prof-blue/70">
              Screening data indicates strong developmental markers.
            </p>
          </motion.div>

          {/* Insights Card */}
          <div className="bg-white rounded-xl p-8 border-l-4 border-prof-blue shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-prof-blue" />
              <h3 className="font-bold text-prof-blue text-lg">Detailed Observation</h3>
            </div>
            <p className="text-lg text-prof-blue/80 leading-relaxed font-light">
              "Subject demonstrates high-efficiency visual decoding. Dyslexia risk markers are minimal. Dysgraphia screening shows excellent motor control with consistent stroke patterns."
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="self-start inline-flex items-center gap-3 px-8 py-4 bg-prof-orange text-white rounded-full font-semibold text-base hover:shadow-lg transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Start New Screening
          </button>
        </div>

        {/* RIGHT COLUMN: Detailed Stats */}
        <div className="order-2 flex flex-col justify-center gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-prof-blue/10">
            <h2 className="text-sm font-bold text-prof-blue/50 uppercase tracking-widest">Quantitative Metrics</h2>
            <span className="text-xs text-prof-lavender font-bold">AI CONFIDENCE: 98%</span>
          </div>

          {scores.map((score, index) => (
            <motion.div
              key={score.label}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.15 }}
              className="bg-white rounded-lg p-6 flex flex-col gap-4 border border-prof-blue/5 hover:border-prof-blue/20 transition-all"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-prof-blue/70 text-lg">{score.label}</span>
                <span className="px-3 py-1 bg-prof-sky/50 rounded text-xs font-bold text-prof-blue uppercase">{score.status}</span>
              </div>

              <div className="flex items-end gap-4">
                <span className="font-bold text-prof-blue text-4xl">{score.value}%</span>
                <div className="flex-grow h-2 bg-prof-cream rounded-full mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score.value}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 + index * 0.2 }}
                    className="h-full bg-gradient-to-r from-prof-green to-prof-orange rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
