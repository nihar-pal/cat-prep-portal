'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  BrainCircuit, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Layers, 
  Award,
  BookOpen,
  ArrowRight,
  Filter
} from 'lucide-react';
import { ExamType } from '@/types/exam';
import { Navbar } from '@/components/Navbar';
import { MathRenderer } from '@/components/MathRenderer';
import { FLASHCARD_DECK, FlashcardItem } from '@/data/flashcardData';

const SRS_STORAGE_KEY = 'crepe_flashcards_srs_v1';

export default function FlashcardsPage() {
  const [currentExam, setCurrentExam] = useState<ExamType>('CAT');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // SRS tracking state: cardId -> { intervalDays: number, reviews: number, lastReviewed: number, status: 'learning' | 'reviewing' | 'mastered' }
  const [srsData, setSrsData] = useState<Record<string, { intervalDays: number; reviews: number; status: 'learning' | 'reviewing' | 'mastered' }>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SRS_STORAGE_KEY);
      if (saved) {
        setSrsData(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load flashcard SRS state:', e);
    }
  }, []);

  const saveSrs = (updated: typeof srsData) => {
    setSrsData(updated);
    try {
      localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save flashcard SRS state:', e);
    }
  };

  // Filtered Deck
  const filteredCards = FLASHCARD_DECK.filter(card => {
    const examMatch = currentExam === 'CAT' ? true : (card.exam === currentExam || card.exam === 'CAT');
    const catMatch = selectedCategory === 'ALL' || card.category === selectedCategory;
    return examMatch && catMatch;
  });

  const activeCard: FlashcardItem | undefined = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // loop back
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentIndex(randomIndex);
  };

  // SRS Quality Rating Handler
  const handleRateCard = (rating: 'again' | 'hard' | 'good' | 'mastered') => {
    if (!activeCard) return;

    const currentSrs = srsData[activeCard.id] || { intervalDays: 1, reviews: 0, status: 'learning' };
    let nextStatus: 'learning' | 'reviewing' | 'mastered' = 'learning';
    let nextInterval = 1;

    switch (rating) {
      case 'again':
        nextInterval = 1;
        nextStatus = 'learning';
        break;
      case 'hard':
        nextInterval = Math.max(1, currentSrs.intervalDays + 1);
        nextStatus = 'reviewing';
        break;
      case 'good':
        nextInterval = Math.max(3, currentSrs.intervalDays * 2);
        nextStatus = 'reviewing';
        break;
      case 'mastered':
        nextInterval = 7;
        nextStatus = 'mastered';
        break;
    }

    const updated = {
      ...srsData,
      [activeCard.id]: {
        intervalDays: nextInterval,
        reviews: currentSrs.reviews + 1,
        status: nextStatus
      }
    };

    saveSrs(updated);
    handleNext();
  };

  const masteredCount = Object.values(srsData).filter(s => s.status === 'mastered').length;
  const reviewingCount = Object.values(srsData).filter(s => s.status === 'reviewing').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <Navbar currentExam={currentExam} onSelectExam={setCurrentExam} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <div className="bg-zinc-900 text-white p-6 sm:p-8 rounded-3xl shadow-sm border border-zinc-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
                <BrainCircuit size={16} />
                <span>Leitner Spaced Repetition (SRS) Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Formula & Vocabulary Active Recall Deck
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
                Supercharge long-term memory for critical geometry cevians, number system totients, SNAP/NMAT vocabulary, and GMAT critical reasoning fallacies.
              </p>
            </div>

            {/* SRS Progress Metrics */}
            <div className="flex items-center space-x-3 bg-zinc-800/80 p-3 rounded-2xl border border-zinc-700/80 shrink-0">
              <div className="text-center px-3 border-r border-zinc-700">
                <div className="text-lg font-black text-emerald-400 font-mono">{masteredCount}</div>
                <div className="text-[10px] text-zinc-400 uppercase font-semibold">Mastered</div>
              </div>
              <div className="text-center px-3 border-r border-zinc-700">
                <div className="text-lg font-black text-amber-400 font-mono">{reviewingCount}</div>
                <div className="text-[10px] text-zinc-400 uppercase font-semibold">In Review</div>
              </div>
              <div className="text-center px-2">
                <div className="text-lg font-black text-white font-mono">{FLASHCARD_DECK.length}</div>
                <div className="text-[10px] text-zinc-400 uppercase font-semibold">Total Cards</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-1.5">
            {['ALL', 'QA Formula', 'Vocab & Rhetoric', 'CR Logic', 'DILR Framework'].map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShuffle}
              className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition flex items-center space-x-1"
              title="Shuffle Cards"
            >
              <Shuffle size={14} />
              <span className="hidden sm:inline">Shuffle</span>
            </button>
            <span className="text-xs font-mono font-bold text-zinc-500">
              Card {currentIndex + 1} of {filteredCards.length}
            </span>
          </div>
        </div>

        {/* 3D Flip Card Container */}
        {activeCard ? (
          <div className="space-y-6">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-h-[380px] sm:min-h-[420px] bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-10 border border-zinc-200 dark:border-zinc-800 hover:border-amber-400/80 dark:hover:border-amber-500/80 shadow-md cursor-pointer transition flex flex-col justify-between select-none relative group"
            >
              {/* Card Top Meta */}
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                    {activeCard.category}
                  </span>
                  <span className="text-xs font-semibold text-zinc-400">
                    {activeCard.examReference}
                  </span>
                </div>

                <div className="text-xs font-mono font-semibold text-zinc-400 flex items-center space-x-1.5">
                  <RotateCcw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
                  <span>Click anywhere to flip</span>
                </div>
              </div>

              {/* Card Content (Front vs Back) */}
              <div className="py-6 flex-1 flex flex-col justify-center">
                {!isFlipped ? (
                  /* FRONT */
                  <div className="space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Concept Prompt
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white leading-snug">
                      {activeCard.title}
                    </h2>
                    <div className="pt-2 text-sm sm:text-base text-zinc-700 dark:text-zinc-200 leading-relaxed font-medium">
                      <MathRenderer content={activeCard.front} />
                    </div>
                  </div>
                ) : (
                  /* BACK */
                  <div className="space-y-4 animate-fade-in">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center space-x-1.5">
                      <CheckCircle2 size={14} />
                      <span>Formal Proof & Exam Application</span>
                    </div>
                    <div className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed overflow-y-auto max-h-[260px] pr-2">
                      <MathRenderer content={activeCard.back} />
                    </div>
                    <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 font-medium">
                      <strong>Takeaway: </strong> {activeCard.keyTakeaway}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Indicator */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                <span>{isFlipped ? 'Answer Revealed' : 'Prompt View'}</span>
                <span className="font-semibold text-zinc-500">
                  {srsData[activeCard.id]?.status ? `Status: ${srsData[activeCard.id].status.toUpperCase()}` : 'New Card'}
                </span>
              </div>
            </div>

            {/* Leitner Spaced Repetition Buttons */}
            {isFlipped ? (
              <div className="space-y-2 animate-fade-in">
                <div className="text-center text-xs font-bold text-zinc-500">
                  How well did you recall this concept?
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => handleRateCard('again')}
                    className="py-3 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-bold transition flex flex-col items-center justify-center space-y-0.5"
                  >
                    <span>Again</span>
                    <span className="text-[10px] opacity-70">Review Soon</span>
                  </button>

                  <button
                    onClick={() => handleRateCard('hard')}
                    className="py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs font-bold transition flex flex-col items-center justify-center space-y-0.5"
                  >
                    <span>Hard</span>
                    <span className="text-[10px] opacity-70">Review Tomorrow</span>
                  </button>

                  <button
                    onClick={() => handleRateCard('good')}
                    className="py-3 px-4 rounded-2xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 text-xs font-bold transition flex flex-col items-center justify-center space-y-0.5"
                  >
                    <span>Good</span>
                    <span className="text-[10px] opacity-70">In 3 Days</span>
                  </button>

                  <button
                    onClick={() => handleRateCard('mastered')}
                    className="py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold transition flex flex-col items-center justify-center space-y-0.5"
                  >
                    <span>Mastered 🏆</span>
                    <span className="text-[10px] opacity-70">In 7 Days</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Navigation Controls when front is visible */
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition flex items-center space-x-1.5"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => setIsFlipped(true)}
                  className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold transition shadow-sm"
                >
                  Flip to Show Proof
                </button>

                <button
                  onClick={handleNext}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition flex items-center space-x-1.5"
                >
                  <span>Next Card</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500 text-sm">No flashcards found for this filter.</p>
          </div>
        )}
      </main>
    </div>
  );
}
