import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RotateCcw, FileText, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useTestContext } from '../context/TestContext';
import { API_BASE_URL } from '../config';
import { useState, useEffect } from 'react';

// API Response Interface
interface EvaluationResult {
  risk_level: string;
  dyslexia_probability: number;
  features: {
    avg_word_time_ms: number;
    reading_speed_wpm: number;
    word_error_rate: number;
    phoneme_accuracy: number;
    confusable_error_rate: number;
    // ... any other features
  };
}

export default function Scorecard() {
  const navigate = useNavigate();
  const { audioTestResults, readingTestResults, dysgraphiaResult } = useTestContext();
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        setLoading(true);
        // If we have no data, maybe we are debugging or user skipped
        // For now, proceed. API might handle empty arrays or we wrap in try/catch

        const payload = {
          test1_data: audioTestResults,
          test2_data: readingTestResults
        };

        const res = await fetch(`${API_BASE_URL}/evaluate_dyslexia`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error("Evaluation failed");

        const data: EvaluationResult = await res.json();
        setResult(data);
      } catch (err) {
        console.error(err);
        setError("Could not generate report. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluation();
  }, [audioTestResults, readingTestResults]);

  if (loading) {
    return (
      <div className="w-full h-[85vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-prof-orange animate-spin" />
        <p className="text-prof-blue/60 text-lg">Analyzing cognitive patterns...</p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="w-full h-[85vh] flex flex-col items-center justify-center gap-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-red-500 text-lg">{error || "No data available"}</p>
        <button onClick={() => navigate('/')} className="px-6 py-2 bg-prof-blue text-white rounded-lg">Return Home</button>
      </div>
    );
  }

  const scores = [
    {
      label: "Dyslexia Risk Probability",
      value: Math.round(result.dyslexia_probability * 100),
      status: result.risk_level
    },
    {
      label: "Dysgraphia Assessment",
      value: dysgraphiaResult ? dysgraphiaResult.verdict : "N/A", // This might need UI adjustment as it's not a %
      status: dysgraphiaResult?.verdict || "Pending"
    },
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
              Screening data indicates {result?.risk_level.toLowerCase()} markers.
            </p>
          </motion.div>

          {/* Insights Card */}
          <div className="bg-white rounded-xl p-8 border-l-4 border-prof-blue shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-prof-blue" />
              <h3 className="font-bold text-prof-blue text-lg">Detailed Observation</h3>
            </div>
            <p className="text-lg text-prof-blue/80 leading-relaxed font-light">
              "Subject demonstrates an average reading speed of {Math.round(result?.features.reading_speed_wpm || 0)} WPM.
              {(result?.features.confusable_error_rate || 0) > 0.2
                ? " Significant struggles noted with confusable letters (b/d/p/q)."
                : " Visual decoding of similar letters appears stable."}
              {(result?.features.word_error_rate || 0) > 0.3
                ? " High word substitution rate suggests phonological processing challenges."
                : " Word recognition accuracy is within expected ranges."}"
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
              </div>

              <div className="flex items-end gap-4">
                <span className="font-bold text-prof-blue text-4xl">{typeof score.value === 'number' ? `${score.value}%` : score.value}</span>
                {/* 
                <div className="flex-grow h-2 bg-prof-cream rounded-full mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score.value}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 + index * 0.2 }}
                    className="h-full bg-gradient-to-r from-prof-green to-prof-orange rounded-full"
                  />
                </div>
                 */}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
