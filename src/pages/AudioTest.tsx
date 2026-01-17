import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Ear, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../config';

// Types based on API Documentation
interface Trial {
  audio: string; // The word key
  audio_word: string; // The word to display (if needed, or just rely on options) - actually API says 'audio' is the key
  audio_url: string;
  options: string[];
  correct_index: number;
}

interface ResponseItem {
  audio: string;
  selected: string;
  correct: boolean;
  reaction_time: number;
}

interface AnalysisResponse {
  next_trial?: Trial;
  analysis?: {
    assessment: string;
    stats: {
      accuracy: number;
      avg_rt: number;
    };
  };
}

export default function AudioTest() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  // Test State
  const [currentTrial, setCurrentTrial] = useState<Trial | null>(null);
  const [baselineQueue, setBaselineQueue] = useState<Trial[]>([]);
  const [responses, setResponses] = useState<ResponseItem[]>([]);
  const [trialCount, setTrialCount] = useState(0); // 0-based index of completed trials
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const startTimeRef = useRef<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Constants
  const BASELINE_TRIALS = 4;
  const MAX_ADAPTIVE_TRIALS = 6;
  const TOTAL_MAX_TRIALS = BASELINE_TRIALS + MAX_ADAPTIVE_TRIALS;

  // Initialize: Fetch Baseline
  useEffect(() => {
    const fetchBaseline = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/baseline`);
        if (!res.ok) throw new Error('Failed to fetch baseline');
        const data: Trial[] = await res.json();

        if (data.length > 0) {
          // Take the first one as current, rest as queue
          setCurrentTrial(data[0]);
          setBaselineQueue(data.slice(1));
          startTimeRef.current = Date.now();
        } else {
          setError("No baseline data received");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to connect to server. Is it running on port 5000?");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBaseline();
  }, []);

  const playSound = () => {
    if (!currentTrial) return;

    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = new Audio(currentTrial.audio_url);
      audioRef.current.play().catch(e => console.error("Audio play error", e));

      audioRef.current.onended = () => setIsPlaying(false);
    } else {
      // First play
      audioRef.current = new Audio(currentTrial.audio_url);
      audioRef.current.play().catch(e => console.error("Audio play error", e));
      audioRef.current.onended = () => setIsPlaying(false);
    }

    // Fallback timeout just in case
    setTimeout(() => setIsPlaying(false), 2000);
  };

  // Auto-play audio when trial changes
  useEffect(() => {
    if (currentTrial && !isLoading) {
      // Small delay to let UI settle
      const timer = setTimeout(() => {
        playSound();
        startTimeRef.current = Date.now();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentTrial]);

  const handleOptionSelect = async (selectedWord: string) => {
    if (!currentTrial) return;

    const endTime = Date.now();
    const reactionTime = (endTime - startTimeRef.current) / 1000;

    // Determine correctness
    // API logic: correct_index is the source of truth, but we also have audio_word
    // Let's us correct_index if available, otherwise check against audio_word
    const isCorrect = selectedWord === currentTrial.options[currentTrial.correct_index];

    const newResponse: ResponseItem = {
      audio: currentTrial.audio_word || currentTrial.audio,
      selected: selectedWord,
      correct: isCorrect,
      reaction_time: reactionTime
    };

    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);

    const nextTrialCount = trialCount + 1;

    // Only update trial count if we are not finished
    if (nextTrialCount < TOTAL_MAX_TRIALS) {
      setTrialCount(nextTrialCount);
    }

    setIsLoading(true);

    try {
      if (nextTrialCount < BASELINE_TRIALS) {
        // Continue Baseline
        if (baselineQueue.length > 0) {
          const next = baselineQueue[0];
          setBaselineQueue(prev => prev.slice(1));
          setCurrentTrial(next);
          setIsLoading(false);
        } else {
          // Should not happen if API returns enough baseline items
          console.warn("Ran out of baseline items early!");
          await fetchNextAdaptive(updatedResponses);
        }
      } else if (nextTrialCount < TOTAL_MAX_TRIALS) {
        // Adaptive Phase
        await fetchNextAdaptive(updatedResponses);
      } else {
        // Finished
        finishTest();
      }
    } catch (err) {
      console.error(err);
      setError("Error processing trial");
      setIsLoading(false);
    }
  };

  const fetchNextAdaptive = async (currentResponses: ResponseItem[]) => {
    try {
      const res = await fetch(`${API_BASE_URL}/next-trial`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses: currentResponses })
      });

      if (!res.ok) throw new Error('Failed to fetch next trial');

      const data: AnalysisResponse = await res.json();

      if (data.next_trial) {
        setCurrentTrial(data.next_trial);
        setIsLoading(false);
      } else {
        // No next trial returned (or analysis returned), end test
        finishTest();
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch adaptive trial");
      setIsLoading(false);
    }
  };

  const finishTest = () => {
    // Navigate to next test or results
    navigate('/test/handwriting');
  };

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 text-xl">{error}</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-prof-blue text-white rounded">Retry</button>
      </div>
    );
  }

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
              Trial {trialCount + 1} of {TOTAL_MAX_TRIALS}
            </p>
          </div>

          {/* Speaker Button */}
          <motion.button
            onClick={playSound}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading || !currentTrial}
            className={`w-full max-w-sm aspect-video rounded-2xl bg-white border-2 border-prof-orange flex items-center justify-center group transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-prof-orange/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className={`relative z-10 p-8 rounded-full transition-all duration-300 ${isPlaying ? 'bg-prof-orange text-white scale-110 shadow-lg' : 'bg-prof-orange/10 text-prof-orange shadow-md border-2 border-prof-orange'}`}>
              <Volume2 className="w-12 h-12" />
            </div>
          </motion.button>
        </div>

        {/* RIGHT COLUMN: The Game Grid */}
        <div className="order-1 lg:order-2 h-full flex flex-col justify-center gap-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center w-full h-full"
              >
                <Loader2 className="w-12 h-12 text-prof-orange animate-spin" />
              </motion.div>
            ) : (
              <motion.div
                key="options"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
              >
                {currentTrial?.options.map((word, idx) => (
                  <motion.button
                    key={`${word}-${idx}`}
                    onClick={() => handleOptionSelect(word)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-8 rounded-xl text-xl font-medium transition-all border bg-white text-prof-blue border-prof-blue/10 hover:border-prof-blue hover:bg-prof-sky/30 shadow-sm"
                  >
                    {word}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {!currentTrial && !isLoading && (
            <div className="text-center text-prof-blue/60">Test Complete</div>
          )}
        </div>

      </div>
    </section>
  );
}
