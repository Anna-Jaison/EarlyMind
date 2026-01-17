import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Loader2, AlertCircle, Eye } from 'lucide-react';
import { API_BASE_URL } from '../config';

// --- Types ---

interface Trial {
  text_word: string;
  // Options might be present in API but we focus on text_word for reading
  options?: string[];
  correct_index?: number;
  analysis?: string;
}

interface ResponseItem {
  text_word: string;
  selected: string; // The transcribed word
  correct: boolean;
  reaction_time: number;
}

interface AnalysisResponse {
  next_trial?: Trial;
  analysis?: string;
}

// Speech Recognition Type Augmentation
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

import { useTestContext } from '../context/TestContext';

export default function ReadingTest() {
  const navigate = useNavigate();
  const { setReadingTestResults } = useTestContext();

  // --- State ---
  const [currentTrial, setCurrentTrial] = useState<Trial | null>(null);
  const [baselineQueue, setBaselineQueue] = useState<Trial[]>([]);
  const [responses, setResponses] = useState<ResponseItem[]>([]);
  const [trialCount, setTrialCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingResponse, setPendingResponse] = useState<ResponseItem | null>(null);

  // Speech State
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string>("");
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Refs
  const recognitionRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);

  // Constants
  const BASELINE_TRIALS = 4;
  const TOTAL_MAX_TRIALS = 10;

  // --- Initialization ---

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onresult = (event: any) => {
        const word = event.results[0][0].transcript;
        setTranscript(word);
        handleSpeechResult(word);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        // On network error or other fatal errors, allow manual override
        if (event.error === 'network' || event.error === 'not-allowed' || event.error === 'no-speech') {
          setFeedbackStatus('error');
          // We don't clear error immediately so user sees the problem
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setError("Web Speech API not supported in this browser.");
    }

    // Fetch Baseline
    const fetchBaseline = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/test2/baseline`);
        if (!res.ok) throw new Error('Failed to fetch baseline');
        const data: Trial[] = await res.json();

        if (data.length > 0) {
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

  // --- Logic ---

  const startListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) return;

    setTranscript("");
    setFeedbackStatus('idle');
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (e) {
      console.error(e);
      setFeedbackStatus('error');
    }
  };

  // Helper for manual override
  const handleManualResult = async (isCorrect: boolean) => {
    if (!currentTrial) return;

    const endTime = Date.now();
    const reactionTime = (endTime - startTimeRef.current) / 1000;

    const newResponse: ResponseItem = {
      text_word: currentTrial.text_word,
      selected: isCorrect ? currentTrial.text_word : "manual_incorrect",
      correct: isCorrect,
      reaction_time: reactionTime
    };

    // const updatedResponses = [...responses, newResponse];
    // setResponses(updatedResponses);

    setFeedbackStatus(isCorrect ? 'success' : 'error');
    // await proceedToNextTrial(updatedResponses);
    setPendingResponse(newResponse);
  };

  const handleSpeechResult = async (spokenWord: string) => {
    if (!currentTrial) return;

    const endTime = Date.now();
    const reactionTime = (endTime - startTimeRef.current) / 1000;

    // Normalize logic
    const target = currentTrial.text_word.toLowerCase().trim();
    const spoken = spokenWord.toLowerCase().trim();

    // Simple direct match for now. Fuzzy match could be better but out of scope.
    const isCorrect = target === spoken;

    const newResponse: ResponseItem = {
      text_word: currentTrial.text_word,
      selected: spokenWord, // Keep original casing for debug/display
      correct: isCorrect,
      reaction_time: reactionTime
    };

    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);

    // Feedback UI
    setFeedbackStatus(isCorrect ? 'success' : 'error');

    // Store as pending, do NOT proceed yet
    setPendingResponse(newResponse);
  };

  const handleSubmit = async () => {
    if (!pendingResponse) return;

    const updatedResponses = [...responses, pendingResponse];
    setResponses(updatedResponses);

    setPendingResponse(null);
    setTranscript("");
    setFeedbackStatus('idle');

    await proceedToNextTrial(updatedResponses);
  };

  const proceedToNextTrial = async (currentResponses: ResponseItem[]) => {
    const nextTrialCount = trialCount + 1;

    // Finish Check
    if (nextTrialCount >= TOTAL_MAX_TRIALS) {
      finishTest();
      return;
    }

    setTrialCount(nextTrialCount);
    setIsLoading(true);

    try {
      if (nextTrialCount < BASELINE_TRIALS) {
        // Continue Baseline
        if (baselineQueue.length > 0) {
          const next = baselineQueue[0];
          setBaselineQueue(prev => prev.slice(1));
          setCurrentTrial(next);
          startTimeRef.current = Date.now();
        } else {
          // Fallback if baseline queue unexpected empty
          await fetchNextAdaptive(currentResponses);
        }
        setIsLoading(false);
      } else {
        // Adaptive Phase
        await fetchNextAdaptive(currentResponses);
      }
    } catch (err) {
      console.error(err);
      setError("Error processing trial");
      setIsLoading(false);
    }
  };

  const fetchNextAdaptive = async (currentResponses: ResponseItem[]) => {
    try {
      const res = await fetch(`${API_BASE_URL}/test2/adaptive`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses: currentResponses })
      });

      if (!res.ok) throw new Error('Failed to fetch next trial');

      const data: AnalysisResponse = await res.json();

      // If the API returns the trial directly:
      const nextTrial = (data as any).text_word ? data : (data.next_trial ? data.next_trial : null);

      if (nextTrial) {
        setCurrentTrial(nextTrial as Trial);
        startTimeRef.current = Date.now();
      } else {
        finishTest();
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch adaptive trial");
    } finally {
      setIsLoading(false);
    }
  };

  const finishTest = () => {
    setReadingTestResults(responses);
    navigate('/test/audio'); // Proceed to Audio Test
  };

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-red-500 text-xl">{error}</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-prof-blue text-white rounded">Retry</button>
      </div>
    );
  }

  return (
    <section className="w-full flex-grow flex items-center min-h-[85vh] py-12">
      <div className="w-full max-w-[1400px] mx-auto px-8 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* LEFT COLUMN: Instructions & Feedback */}
        <div className="flex flex-col items-start space-y-10 order-2 lg:order-1">
          <div className="flex items-center gap-3 px-4 py-2 border-l-4 border-prof-green bg-white/50">
            <Eye className="w-5 h-5 text-prof-green" />
            <span className="text-sm font-semibold text-prof-blue uppercase tracking-widest">DYSLEXIA SCREENING</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl lg:text-6xl font-light text-prof-blue tracking-tight">
              Read the word <br />
              <span className="font-bold">aloud.</span>
            </h1>
            <p className="text-prof-blue/60 text-lg">
              Trial {trialCount + 1} of {TOTAL_MAX_TRIALS}
            </p>
          </div>

          {/* Transcript Display */}
          <div className="h-24 flex items-center">
            <AnimatePresence mode="wait">
              {transcript ? (
                <motion.div
                  key="transcript"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`text-2xl font-serif italic ${feedbackStatus === 'success' ? 'text-prof-green' : feedbackStatus === 'error' ? 'text-red-400' : 'text-prof-blue/80'}`}
                >
                  "{transcript}"
                </motion.div>
              ) : (
                <div className="text-prof-blue/20 italic">
                  Tap record and speak clearly...
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Interaction Button */}
          {pendingResponse ? (
            <button
              onClick={handleSubmit}
              className="group relative px-10 py-6 rounded-full text-xl font-semibold flex items-center gap-4 transition-all shadow-lg overflow-hidden bg-prof-green text-white hover:shadow-xl hover:-translate-y-1"
            >
              Submit Response
            </button>
          ) : (
            <button
              onClick={startListening}
              disabled={isListening || isLoading}
              className={`
                    group relative px-10 py-6 rounded-full text-xl font-semibold flex items-center gap-4 transition-all shadow-lg overflow-hidden
                    ${isListening
                  ? 'bg-red-50 text-red-500 border-2 border-red-100'
                  : 'bg-prof-orange text-white hover:shadow-xl hover:-translate-y-1'
                }
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            >
              {/* Pulse ring for listening */}
              {isListening && (
                <span className="absolute inset-0 rounded-full border-4 border-red-200 animate-ping opacity-75"></span>
              )}

              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : isListening ? (
                <>
                  <Mic className="w-6 h-6 animate-pulse" />
                  Listening...
                </>
              ) : (
                <>
                  <Mic className="w-6 h-6" />
                  Tap to Record
                </>
              )}
            </button>
          )}

          {feedbackStatus === 'error' && (
            <div className="flex flex-col gap-2 mt-4">
              <p className="text-red-400 text-sm">Microphone error. Manual Override:</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleManualResult(true)}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                  Mark Correct
                </button>
                <button
                  onClick={() => handleManualResult(false)}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Mark Incorrect
                </button>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Target Word Display */}
        <div className="order-1 lg:order-2 h-full flex flex-col justify-center items-center min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Loader2 className="w-16 h-16 text-prof-orange animate-spin" />
              </motion.div>
            ) : (
              <motion.div
                key={currentTrial?.text_word}
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                className="relative"
              >
                <div className="absolute inset-0 bg-prof-sky/20 blur-3xl rounded-full scale-150" />
                <h2 className="relative text-7xl lg:text-9xl font-bold text-prof-blue tracking-tighter">
                  {currentTrial?.text_word}
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
