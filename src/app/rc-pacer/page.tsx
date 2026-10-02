'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Sparkles, 
  Eye, 
  ArrowRight, 
  BookOpen, 
  Zap,
  TrendingUp,
  Sliders
} from 'lucide-react';
import { ExamType } from '@/types/exam';
import { Navbar } from '@/components/Navbar';
import { MathRenderer } from '@/components/MathRenderer';
import { PACER_PASSAGES, PacerPassage } from '@/data/rcPacerData';

export default function RcPacerPage() {
  const [currentExam, setCurrentExam] = useState<ExamType>('CAT');
  const [selectedPassageIndex, setSelectedPassageIndex] = useState(0);
  const activePassage = PACER_PASSAGES[selectedPassageIndex] || PACER_PASSAGES[0];

  // Pacer configuration
  const [targetWpm, setTargetWpm] = useState<number>(275);
  const [isPacingRunning, setIsPacingRunning] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(-1);
  const [readingElapsedSeconds, setReadingElapsedSeconds] = useState(0);
  const [hasFinishedReading, setHasFinishedReading] = useState(false);

  // Comprehension Testing State
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  // Split text into words
  const words = useRef<string[]>([]);
  words.current = activePassage.text.split(/\s+/);

  // Timer interval for elapsed reading time
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPacingRunning && !hasFinishedReading) {
      timer = setInterval(() => {
        setReadingElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPacingRunning, hasFinishedReading]);

  // Word-by-word pacer pacing interval
  useEffect(() => {
    let pacerInterval: NodeJS.Timeout;
    if (isPacingRunning && !hasFinishedReading) {
      const msPerWord = (60 / targetWpm) * 1000;
      pacerInterval = setInterval(() => {
        setActiveWordIndex(prev => {
          if (prev >= words.current.length - 1) {
            setIsPacingRunning(false);
            setHasFinishedReading(true);
            return prev;
          }
          return prev + 1;
        });
      }, msPerWord);
    }
    return () => clearInterval(pacerInterval);
  }, [isPacingRunning, targetWpm, hasFinishedReading]);

  const handleStartPacer = () => {
    setIsPacingRunning(true);
    if (activeWordIndex === -1) {
      setActiveWordIndex(0);
    }
  };

  const handlePausePacer = () => {
    setIsPacingRunning(false);
  };

  const handleReset = () => {
    setIsPacingRunning(false);
    setActiveWordIndex(-1);
    setReadingElapsedSeconds(0);
    setHasFinishedReading(false);
    setUserAnswers({});
    setIsQuizSubmitted(false);
  };

  const handleFinishReading = () => {
    setIsPacingRunning(false);
    setHasFinishedReading(true);
  };

  // Calculate actual reading WPM
  const actualWpm = readingElapsedSeconds > 0
    ? Math.round((activePassage.wordCount / readingElapsedSeconds) * 60)
    : targetWpm;

  // Quiz evaluation
  const correctCount = isQuizSubmitted
    ? activePassage.questions.filter(q => userAnswers[q.id] === q.correctAnswer).length
    : 0;
  const accuracyPercent = isQuizSubmitted && activePassage.questions.length > 0
    ? Math.round((correctCount / activePassage.questions.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <Navbar currentExam={currentExam} onSelectExam={setCurrentExam} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Banner */}
        <div className="bg-zinc-900 text-white p-6 sm:p-8 rounded-3xl shadow-sm border border-zinc-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
                <Eye size={16} />
                <span>Reading Speed & Cognitive Pacer Lab</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                RC Words-Per-Minute (WPM) & Comprehension Pacer
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
                Train your eyes to scan academic philosophy, economics, and science passages at <strong>250–350 WPM</strong> without subvocalizing, then immediately verify retention through post-reading retention checks.
              </p>
            </div>

            {/* Current Target WPM Indicator */}
            <div className="bg-zinc-800/80 border border-zinc-700/80 rounded-2xl p-4 text-center shrink-0 min-w-[180px]">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Target Pace
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white my-0.5 font-mono">
                {targetWpm} <span className="text-xs font-sans font-medium text-zinc-400">WPM</span>
              </div>
              <div className="text-[10px] text-zinc-400">
                {targetWpm >= 300 ? '99th %ile IIM Pace' : targetWpm >= 250 ? 'Strong Competitive Pace' : 'Baseline Calibration'}
              </div>
            </div>
          </div>
        </div>

        {/* Pacer Control Deck */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Target WPM Presets */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase text-zinc-500 mr-1 flex items-center space-x-1">
              <Sliders size={13} />
              <span>Select Pace:</span>
            </span>
            {[200, 250, 275, 300, 350].map(speed => (
              <button
                key={speed}
                onClick={() => setTargetWpm(speed)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
                  targetWpm === speed
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                }`}
              >
                {speed} WPM
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            {!isPacingRunning ? (
              <button
                onClick={handleStartPacer}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center space-x-1.5"
              >
                <Play size={14} className="fill-current" />
                <span>{activeWordIndex > 0 ? 'Resume Pacer' : 'Start Pacer Guide'}</span>
              </button>
            ) : (
              <button
                onClick={handlePausePacer}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center space-x-1.5"
              >
                <Pause size={14} className="fill-current" />
                <span>Pause Pacer</span>
              </button>
            )}

            {!hasFinishedReading && (
              <button
                onClick={handleFinishReading}
                className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl text-xs font-bold shadow-sm transition flex items-center space-x-1.5"
              >
                <CheckCircle2 size={14} />
                <span>Done Reading</span>
              </button>
            )}

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition"
              title="Reset Pacer"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>

        {/* Passage Display with Live Pacer Highlighting */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-10 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3 text-xs">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full font-bold uppercase bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-[10px]">
                {activePassage.sourceGenre}
              </span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{activePassage.title}</span>
            </div>

            <div className="font-mono text-zinc-400">
              {activePassage.wordCount} words &bull; {readingElapsedSeconds}s elapsed
            </div>
          </div>

          {/* Reading Area with Soft Amber Focus Halo */}
          <div className="text-base sm:text-lg leading-relaxed text-zinc-800 dark:text-zinc-200 font-serif space-y-4 select-none">
            <p>
              {words.current.map((w, idx) => {
                const isCurrent = idx === activeWordIndex;
                const isPast = idx < activeWordIndex;

                return (
                  <span
                    key={idx}
                    className={`transition-colors duration-150 rounded px-0.5 ${
                      isCurrent
                        ? 'bg-amber-400 text-black font-bold shadow-sm ring-2 ring-amber-400'
                        : isPast
                          ? 'opacity-85'
                          : 'opacity-40'
                    }`}
                  >
                    {w}{' '}
                  </span>
                );
              })}
            </p>
          </div>
        </div>

        {/* Post-Reading Diagnostic Comprehension Test */}
        {hasFinishedReading && (
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-10 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6 animate-fade-in">
            {/* Speed Summary Header */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase text-amber-600 dark:text-amber-400">
                  Reading Velocity Scorecard
                </span>
                <div className="text-2xl font-black text-zinc-900 dark:text-white mt-0.5 font-mono">
                  {actualWpm} <span className="text-sm font-sans font-medium text-zinc-500">WPM achieved</span>
                </div>
                <div className="text-xs text-zinc-500">
                  Completed {activePassage.wordCount} words in {readingElapsedSeconds} seconds.
                </div>
              </div>

              {isQuizSubmitted && (
                <div className="text-right sm:border-l sm:border-zinc-200 dark:sm:border-zinc-700 sm:pl-6">
                  <div className="text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                    Comprehension Retention
                  </div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {accuracyPercent}%
                  </div>
                  <div className="text-xs text-zinc-500">
                    {correctCount} of {activePassage.questions.length} questions correct
                  </div>
                </div>
              )}
            </div>

            <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center space-x-2">
                <Award size={18} className="text-amber-500" />
                <span>Verify Your Reading Comprehension</span>
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Reading speed without retention is meaningless in CAT/GMAT. Answer these central thesis and inference questions.
              </p>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {activePassage.questions.map((q, qIdx) => (
                <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800 space-y-3">
                  <div className="font-bold text-sm text-zinc-900 dark:text-white">
                    Q{qIdx + 1}. {q.questionText}
                  </div>

                  <div className="space-y-2">
                    {q.options.map(opt => {
                      const isSelected = userAnswers[q.id] === opt.id;
                      const isCorrect = q.correctAnswer === opt.id;

                      let optStyle = 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200';
                      if (isQuizSubmitted) {
                        if (isCorrect) {
                          optStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                        } else if (isSelected && !isCorrect) {
                          optStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200';
                        }
                      } else if (isSelected) {
                        optStyle = 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-100 font-bold';
                      }

                      return (
                        <label
                          key={opt.id}
                          className={`flex items-start p-3 rounded-xl border text-xs cursor-pointer transition select-none ${optStyle}`}
                        >
                          <input
                            type="radio"
                            name={`quiz_${q.id}`}
                            value={opt.id}
                            disabled={isQuizSubmitted}
                            checked={isSelected}
                            onChange={() => setUserAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
                            className="mt-0.5 mr-2.5"
                          />
                          <span>
                            <strong>{opt.id}.</strong> {opt.text}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {isQuizSubmitted && (
                    <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      <strong>Explanation: </strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!isQuizSubmitted ? (
              <button
                onClick={() => setIsQuizSubmitted(true)}
                className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition"
              >
                <CheckCircle2 size={16} />
                <span>Submit Comprehension Answers</span>
              </button>
            ) : (
              <div className="flex justify-end">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold transition flex items-center space-x-1.5"
                >
                  <RotateCcw size={14} />
                  <span>Practice Another Passage</span>
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
