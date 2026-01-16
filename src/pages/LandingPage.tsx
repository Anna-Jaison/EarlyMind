import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Cloud } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <section className="w-full flex-grow flex items-center min-h-[85vh] py-20">
      <div className="w-full max-w-[1400px] mx-auto px-8 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Left Column: Text Content */}
        <motion.div
          className="flex flex-col items-start space-y-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/60 backdrop-blur-md border border-white rounded-full text-soft-blue text-sm font-bold tracking-wide shadow-sm">
            <Cloud className="w-4 h-4 text-soft-lavender fill-current" />
            <span>Gentle Learning AI</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] text-soft-blue tracking-tight">
              DREAM BIG, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-soft-lavender to-soft-blue">
                LEARN SOFT.
              </span>
            </h1>
            <p className="text-xl text-soft-blue/70 max-w-lg leading-relaxed font-medium pt-2">
              A calm, cloud-like space for your mind to explore and grow.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 w-full pt-6">
            <motion.button
              onClick={() => navigate('/test/reading')}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-6 bg-gradient-to-r from-soft-blue to-soft-lavender rounded-full text-white text-xl font-bold shadow-xl shadow-soft-lavender/40 hover:shadow-2xl hover:scale-105 transition-all min-w-[240px]"
              whileTap={{ scale: 0.98 }}
            >
              <span>Start Test</span> <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform text-color-soft-blue" />
            </motion.button>

            <button className="inline-flex items-center justify-center px-10 py-6 bg-white/50 backdrop-blur-md border border-white rounded-full text-soft-blue text-lg font-bold hover:bg-white transition-all min-w-[200px] shadow-sm">
              Experience It
            </button>
          </div>

          {/* Footer Proof */}
          <div className="flex items-center gap-6 pt-8 w-full border-t border-soft-blue/5">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-12 h-12 rounded-full border-4 border-white shadow-md flex items-center justify-center bg-gradient-to-br ${i === 1 ? 'from-soft-sky to-white' : i === 2 ? 'from-soft-lavender to-white' : 'from-soft-green to-white'}`}>
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-soft-blue/60 uppercase tracking-widest">
              Safe & Sound
            </p>
          </div>
        </motion.div>

        {/* Right Column: Soft Gradient Illustration */}
        <div className="flex justify-center lg:justify-end">
          <motion.div
            className="relative w-full aspect-square max-w-[650px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Glass Card Container */}
            <div className="w-full h-full glass-panel rounded-[3rem] p-10 flex items-center justify-center relative shadow-2xl shadow-soft-lavender/20 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-soft-sky rounded-full blur-[80px] opacity-60" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-soft-green rounded-full blur-[80px] opacity-40" />

              {/* Vector Illustration */}
              <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 drop-shadow-lg">
                <defs>
                  <linearGradient id="softBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E6EAFF" />
                    <stop offset="100%" stopColor="#A99BF7" />
                  </linearGradient>
                  <linearGradient id="softEyeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D1D84E" />
                    <stop offset="100%" stopColor="#E88E3D" />
                  </linearGradient>
                </defs>

                {/* Robot Character - Floating */}
                <g className="animate-float" transform="translate(100, 50)">
                  {/* Body */}
                  <rect x="50" y="100" width="100" height="120" rx="30" fill="url(#softBodyGradient)" stroke="white" strokeWidth="2" />

                  {/* Head */}
                  <path d="M40 90 C 40 40, 160 40, 160 90" fill="white" stroke="#2B2675" strokeWidth="0" />
                  <rect x="40" y="40" width="120" height="80" rx="30" fill="white" stroke="#2B2675" strokeWidth="2" />

                  {/* Face Screen */}
                  <rect x="55" y="55" width="90" height="50" rx="20" fill="#E6EAFF" opacity="0.5" />

                  {/* Eyes */}
                  <circle cx="80" cy="80" r="8" fill="#2B2675" />
                  <circle cx="120" cy="80" r="8" fill="#2B2675" />
                  {/* Cheeks */}
                  <circle cx="70" cy="90" r="6" fill="#A99BF7" opacity="0.5" />
                  <circle cx="130" cy="90" r="6" fill="#A99BF7" opacity="0.5" />

                  {/* Antenna */}
                  <path d="M100 40 L 100 10" stroke="#2B2675" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="100" cy="10" r="8" fill="#D1D84E" stroke="#2B2675" strokeWidth="2" />

                  {/* Arms - Soft Curves */}
                  <path d="M40 140 Q 10 160 20 190" stroke="#white" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.8" />
                  <path d="M160 140 Q 190 120 180 90" stroke="#white" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.8" />
                </g>

                {/* Floating Abstract Shapes */}
                <circle cx="50" cy="280" r="15" fill="#D1D84E" opacity="0.8" className="animate-float" />
                <circle cx="320" cy="100" r="24" fill="#E88E3D" opacity="0.6" className="animate-float" style={{ animationDelay: '-2s' }} />
                <circle cx="300" cy="300" r="40" fill="#E6EAFF" opacity="0.5" className="animate-float" style={{ animationDelay: '-4s' }} />

              </svg>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
