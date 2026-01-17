import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Camera, ArrowRight, PenTool } from 'lucide-react';

export default function HandwritingTest() {
   const navigate = useNavigate();
   const [isUploading, setIsUploading] = React.useState(false);
   const fileInputRef = React.useRef<HTMLInputElement>(null);

   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         handleFileUpload(file);
      }
   };

   const handleFileUpload = async (file: File) => {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      try {
         const response = await fetch('http://localhost:5000/dysgraphia', {
            method: 'POST',
            body: formData,
         });

         if (!response.ok) {
            throw new Error('Upload failed');
         }

         const data = await response.json();
         localStorage.setItem('dysgraphia_result', JSON.stringify(data));
         navigate('/scorecard');
      } catch (error) {
         console.error('Error uploading file:', error);
         alert('Failed to analyze handwriting. Please try again.');
      } finally {
         setIsUploading(false);
      }
   };

   const triggerFileInput = () => {
      fileInputRef.current?.click();
   };

   return (
      <section className="w-full flex-grow flex items-center min-h-[85vh] py-12">
         <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*"
         />
         <div className="w-full max-w-[1400px] mx-auto px-8 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* LEFT COLUMN: Instructions & Word */}
            <div className="flex flex-col items-start space-y-10 order-2 lg:order-1">
               {/* Context Label */}
               <div className="flex items-center gap-3 px-4 py-2 border-l-4 border-prof-lavender bg-white/50">
                  <PenTool className="w-5 h-5 text-prof-lavender" />
                  <span className="text-sm font-semibold text-prof-blue uppercase tracking-widest">DYSGRAPHIA ASSESSMENT</span>
               </div>

               <div className="space-y-2">
                  <h1 className="text-4xl lg:text-6xl font-light text-prof-blue tracking-tight">
                     Replicate the <br />
                     <span className="font-bold text-blue bg-clip-text bg-gradient-to-r from-prof-green to-prof-orange">target sequence.</span>
                  </h1>
                  <p className="text-prof-blue/60 text-lg">
                     Analysis of spatial planning, stroke consistency, and motor control.
                  </p>
               </div>

               <div className="w-full bg-white p-8 rounded-2xl border border-prof-blue/10 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-prof-lavender/10 rounded-bl-[2.5rem]" />
                  <div className="text-xs font-bold text-prof-blue/50 mb-2 uppercase tracking-widest relative z-10">Target String</div>
                  <div className="text-6xl font-serif italic text-prof-blue tracking-wide relative z-10">
                     Astronaut
                  </div>
               </div>

               <div className="flex gap-4 w-full">
                  <button
                     onClick={triggerFileInput}
                     disabled={isUploading}
                     className="flex-1 py-4 rounded-full bg-transparent border border-prof-blue text-prof-blue font-medium hover:bg-prof-blue/5 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                     <Upload className="w-4 h-4" /> {isUploading ? 'Analyzing...' : 'Upload Sample'}
                  </button>
                  <button
                     onClick={() => navigate('/scorecard')}
                     className="flex-1 py-4 rounded-full bg-prof-blue border-2 border-prof-blue   text-blue font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3"
                  >
                     Generate Report <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
            </div>

            {/* RIGHT COLUMN: Camera Zone */}
            <div className="order-1 lg:order-2 h-full flex flex-col justify-center items-center">
               <motion.div
                  className="relative w-full max-w-sm aspect-square rounded-3xl border-2 border-dashed border-prof-blue/20 bg-white/40 flex flex-col items-center justify-center gap-6 cursor-pointer hover:border-prof-blue/40 hover:bg-white/60 transition-all group overflow-hidden"
                  whileHover={{ scale: 1.005 }}
                  onClick={triggerFileInput}
               >

                  <div className="p-6 bg-white rounded-full shadow-lg group-hover:scale-110 transition-all border border-prof-blue/5">
                     <Camera className="w-10 h-10 text-prof-blue" />
                  </div>
                  <div className="text-center space-y-1">
                     <p className="text-2xl font-semibold text-prof-blue">{isUploading ? 'Processing...' : 'Capture Input'}</p>
                     <p className="text-base text-prof-blue/50">Align handwriting within frame</p>
                  </div>
               </motion.div>
            </div>

         </div>
      </section>
   );
}
