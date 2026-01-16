import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Activity } from 'lucide-react';

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
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-prof-sky border border-prof-blue/10 rounded-full text-prof-blue text-xs font-semibold tracking-widest uppercase">
            <Activity className="w-4 h-4" />
            <span>Clinical Precision AI</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-light text-prof-blue leading-[1.1] tracking-tight">
              AI-Powered Screening for <br />
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-prof-blue to-prof-lavender">
                Dyslexia & Dysgraphia.
              </span>
            </h1>
            <p className="text-xl text-prof-blue/70 max-w-lg leading-relaxed font-light">
              Advanced cognitive output analysis using computer vision and speech processing to detect early developmental patterns.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 w-full pt-4">
            <motion.button
              onClick={() => navigate('/test/reading')}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-prof-orange rounded-full text-white text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all min-w-[240px]"
              whileTap={{ scale: 0.98 }}
            >
              <span>Begin Assessment</span> <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <button className="inline-flex items-center justify-center px-10 py-5 bg-transparent border border-prof-blue rounded-full text-prof-blue text-lg font-medium hover:bg-prof-blue/5 transition-all min-w-[200px]">
              View Methodology
            </button>
          </div>

          {/* Footer Proof */}
          <div className="flex items-center gap-8 pt-8 w-full border-t border-prof-blue/10">
            <div>
              <p className="text-3xl font-bold text-prof-blue">94%</p>
              <p className="text-xs text-prof-blue/60 uppercase tracking-wider mt-1">Screening Accuracy</p>
            </div>
            <div className="w-px h-10 bg-prof-blue/10" />
            <div>
              <p className="text-3xl font-bold text-prof-blue">15k+</p>
              <p className="text-xs text-prof-blue/60 uppercase tracking-wider mt-1">Assessments</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Professional Illustration */}
        <div className="flex justify-center lg:justify-end">
          <motion.div
            className="relative w-full aspect-square max-w-[600px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Elegant Circle Background */}
            <div className="absolute inset-0 rounded-full border border-prof-lavender/30 scale-90" />
            <div className="absolute inset-0 rounded-full border border-prof-green/20 scale-75" />

            {/* Center Visualization */}
            <div className="w-full h-full flex items-center justify-center relative">

              {/* Abstract Data Waves */}
              <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 drop-shadow-2xl">
                <defs>
                  <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D1D84E" />
                    <stop offset="100%" stopColor="#E88E3D" />
                  </linearGradient>
                </defs>

                {/* Central Brain/AI Hub */}
                <circle cx="200" cy="200" r="80" fill="white" stroke="#2B2675" strokeWidth="1" />

                {/* Inner Graphic */}
                <g transform="translate(160, 160) scale(0.2)">
                  {/* Simplified Brain Icon Path (Approximation) */}
                  <path d="M200 100 C 150 100 100 150 100 200 C 100 300 200 350 200 350 C 200 350 300 300 300 200 C 300 150 250 100 200 100 Z" fill="#2B2675" />
                </g>
                <path d="M185 185 L 215 215 M 185 215 L 215 185" stroke="white" strokeWidth="4" />

                {/* Orbiting Elements - Lavender Dots */}
                <circle cx="200" cy="80" r="10" fill="#A99BF7" className="animate-float" />
                <circle cx="320" cy="200" r="15" fill="#A99BF7" opacity="0.6" className="animate-float" style={{ animationDelay: '-2s' }} />
                <circle cx="200" cy="320" r="8" fill="#A99BF7" opacity="0.8" className="animate-float" style={{ animationDelay: '-1s' }} />
                <circle cx="80" cy="200" r="12" fill="#A99BF7" opacity="0.5" className="animate-float" style={{ animationDelay: '-3s' }} />

                {/* Energy Rings (Dyslexia/Dysgraphia Scanning) */}
                <circle cx="200" cy="200" r="140" fill="none" stroke="url(#energyGradient)" strokeWidth="4" strokeDasharray="20 10" opacity="0.8" className="animate-pulse" />
                <circle cx="200" cy="200" r="120" fill="none" stroke="#D1D84E" strokeWidth="1" opacity="0.5" />

              </svg>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
