import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Camera, ArrowRight } from 'lucide-react';

export default function HandwritingTest() {
   const navigate = useNavigate();

   return (
      <section className="w-full flex-grow flex items-center min-h-[85vh] py-12">
         <div className="w-full max-w-[1400px] mx-auto px-8 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* LEFT COLUMN: Instructions & Word */}
            <div className="flex flex-col items-start space-y-10 order-2 lg:order-1">
               <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md p-2 pr-6 rounded-full border border-white shadow-sm">
                  <div className="w-12 h-12 bg-soft-orange rounded-full flex items-center justify-center text-white shadow-inner">
                     <span className="text-xl">✍️</span>
                  </div>
                  <div>
                     <h2 className="text-sm font-bold text-soft-blue uppercase tracking-wider">Writing space</h2>
                     <p className="text-soft-blue/60 font-medium text-xs">Ready when you are...</p>
                  </div>
               </div>

               <h1 className="text-5xl lg:text-7xl font-bold text-soft-blue tracking-tight leading-none drop-shadow-sm">
                  Write this <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-soft-orange to-soft-green">with care.</span>
               </h1>

               <div className="w-full glass-panel p-8 rounded-[2.5rem] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-soft-orange/20 rounded-bl-[2.5rem]" />
                  <div className="text-sm font-bold text-soft-orange mb-2 uppercase tracking-widest relative z-10">Target</div>
                  <div className="text-5xl lg:text-7xl font-bold text-soft-blue tracking-wide font-serif italic relative z-10">
                     Astronaut
                  </div>
               </div>

               <div className="flex gap-4 w-full">
                  <button className="flex-1 py-5 rounded-3xl bg-white/60 border border-white text-soft-blue font-bold hover:bg-white transition-all flex items-center justify-center gap-3 shadow-md">
                     <Upload className="w-5 h-5" /> Gallery
                  </button>
                  <button
                     onClick={() => navigate('/scorecard')}
                     className="flex-1 py-5 rounded-3xl bg-gradient-to-r from-soft-orange to-soft-green text-white font-bold shadow-lg shadow-soft-green/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                  >
                     Next <ArrowRight className="w-5 h-5" />
                  </button>
               </div>
            </div>

            {/* RIGHT COLUMN: Camera Zone */}
            <div className="order-1 lg:order-2 h-full min-h-[500px] flex items-center">
               <motion.div
                  className="relative w-full aspect-[4/5] rounded-[3rem] border-2 border-dashed border-soft-lavender bg-white/30 backdrop-blur-sm flex flex-col items-center justify-center gap-8 cursor-pointer hover:bg-white/50 transition-all group overflow-hidden shadow-xl"
                  whileHover={{ scale: 1.01 }}
                  onClick={() => {
                     setTimeout(() => navigate('/scorecard'), 1500);
                  }}
               >

                  <div className="p-10 bg-soft-cream rounded-full group-hover:scale-110 transition-all shadow-inner">
                     <Camera className="w-16 h-16 text-soft-blue" />
                  </div>
                  <div className="text-center space-y-2">
                     <p className="text-3xl font-bold text-soft-blue">Tap to Scan</p>
                     <p className="text-lg text-soft-blue/60 font-medium">Capture your handwriting</p>
                  </div>
               </motion.div>
            </div>

         </div>
      </section>
   );
}
