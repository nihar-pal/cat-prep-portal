'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Target, 
  Calendar, 
  Clock, 
  Award, 
  Play, 
  BookOpen, 
  CheckCircle, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Compass,
  Building2,
  UserCheck,
  Brain,
  Gauge
} from 'lucide-react';
import { DailyTarget, ExamType, Question, SectionType } from '@/types/exam';
import { EXAM_CONFIGS } from '@/data/multiExamConfigs';
import { getDailyTargetsForExam, EXAM_SECTION_CONFIGS } from '@/data/examTargets';
import { CuteCatLogo } from '@/components/CuteCatLogo';

interface DailyTargetHubProps {
  currentExam: ExamType;
  onStartTarget: (target: DailyTarget, isTimed: boolean, filterSection?: string) => void;
  onOpenAiGenerator: () => void;
  onOpenFormulaVault: () => void;
}

export const DailyTargetHub: React.FC<DailyTargetHubProps> = ({
  currentExam,
  onStartTarget,
  onOpenAiGenerator,
  onOpenFormulaVault
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const targets = React.useMemo(() => getDailyTargetsForExam(currentExam), [currentExam]);
  const safeDayIndex = selectedDayIndex >= targets.length ? 0 : selectedDayIndex;
  const activeTarget = targets[safeDayIndex] || targets[0];
  const examConfig = EXAM_CONFIGS[currentExam] || EXAM_CONFIGS.CAT;
  const sectionConfigs = EXAM_SECTION_CONFIGS[currentExam] || [];

  const sectionCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    if (activeTarget?.questions) {
      activeTarget.questions.forEach(q => {
        counts[q.section] = (counts[q.section] || 0) + 1;
      });
    }
    return counts;
  }, [activeTarget]);

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Hero Strategy Header - Minimalist & Refined */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
              <CuteCatLogo size={20} />
              <span>Crepe Prep &bull; {currentExam} Benchmark Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Daily Target Sprint &bull; Day {activeTarget.dayNumber}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
              Curated to mirror authentic {currentExam} standards: {examConfig.fullName} pattern with exam-calibrated sections, option traps, and timing.
            </p>

            {/* Target Strategy Capsule */}
            <div className="mt-4 p-3 bg-slate-800/80 rounded-2xl border border-slate-700/80 flex items-start space-x-2.5 text-xs text-slate-300">
              <Zap size={15} className="text-amber-400 shrink-0 mt-0.5 fill-amber-400" />
              <div>
                <span className="text-amber-300 font-bold block">{currentExam} Strategy Focus:</span>
                {examConfig.strategyTip}
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl flex flex-row md:flex-col justify-around gap-4 min-w-[210px] shrink-0">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Marking Scheme</div>
              <div className="text-lg font-black text-emerald-400 font-mono mt-0.5">
                +{examConfig.scoring.correctMcq} / {examConfig.scoring.incorrectMcq === 0 ? '0' : examConfig.scoring.incorrectMcq}
              </div>
              <div className="text-[10px] text-slate-400">
                {currentExam === 'NMAT' 
                  ? 'No Negative Marking!' 
                  : currentExam === 'XAT'
                  ? 'Unattempted: -0.10 after 8 Qs'
                  : currentExam === 'SNAP'
                  ? 'Speed: 60 Qs in 60m'
                  : `TITA: +${examConfig.scoring.correctTita}, 0 penalty`}
              </div>
            </div>

            <div className="border-l md:border-l-0 md:border-t border-slate-800 pl-4 md:pl-0 md:pt-3">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Standard Duration</div>
              <div className="text-lg font-black text-white font-mono mt-0.5">
                {examConfig.totalQuestions} Qs &bull; {examConfig.totalDurationMinutes}m
              </div>
              <div className="text-[10px] text-slate-400">Sectional Lock: {examConfig.hasSectionalTimer ? 'Enforced' : 'Flexible'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Day Selector Tabs */}
      <div className="flex items-center space-x-2.5 overflow-x-auto pb-1 text-xs">
        {targets.map((target, idx) => {
          const isSelected = idx === safeDayIndex;
          return (
            <button
              key={target.id}
              onClick={() => setSelectedDayIndex(idx)}
              className={`px-4 py-2.5 rounded-2xl border text-left shrink-0 transition ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm font-bold'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="text-[10px] uppercase opacity-70">
                Day {target.dayNumber}
              </div>
              <div className="truncate max-w-[150px] font-bold">
                {target.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Featured Target Details Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 mb-1">
              <Calendar size={13} />
              <span>{activeTarget.dateStr}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {activeTarget.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {activeTarget.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onStartTarget(activeTarget, false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center space-x-1.5 transition"
            >
              <BookOpen size={14} />
              <span>Practice & Learn Mode</span>
            </button>

            <button
              onClick={() => onStartTarget(activeTarget, true)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center space-x-2 shadow-sm transition"
            >
              <Play size={14} className="fill-current" />
              <span>Start Timed {currentExam} Sprint ({activeTarget.estimatedMinutes}m)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Section Breakdown Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {sectionConfigs.map(sec => {
            const count = sectionCounts[sec.type] || 0;
            return (
              <div 
                key={sec.type}
                className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-bold uppercase text-[10px] px-2 py-0.5 rounded-full border ${sec.badgeColor}`}>
                      {sec.shortLabel} Section
                    </span>
                    <span className="font-mono font-bold text-slate-400">{count} Qs</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                    {sec.label}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    {sec.description}
                  </p>
                </div>
                <button
                  onClick={() => onStartTarget(activeTarget, true, sec.type)}
                  className="mt-4 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 flex items-center space-x-1 transition"
                >
                  <span>Attempt {sec.shortLabel} Sprint ({count} Qs)</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Competitive Edge Mastery Suite: Score Predictor, Flashcards SRS, RC Pacer */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Competitive Edge Mastery Suite
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Topper-Grade Preparation Labs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Score & College Predictor */}
          <Link
            href="/score-predictor"
            className="p-5 rounded-3xl border border-amber-300 dark:border-amber-800/60 bg-gradient-to-br from-amber-50/70 to-amber-100/30 dark:from-amber-950/20 dark:to-slate-900 hover:border-amber-500 transition group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-105 transition-transform">
                <TrendingUp size={20} />
              </div>
              <div className="flex items-center space-x-1.5 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">Empirical Normalization</span>
                <span className="text-[9px] bg-amber-200 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-bold px-1.5 py-0.5 rounded-full">New</span>
              </div>
              <h4 className="font-black text-base text-slate-900 dark:text-white">Score & College Predictor</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Empirical score-to-percentile curves for {currentExam} & live Tier-1 interview call radar across IIMs, XLRI & FMS.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-200/60 dark:border-amber-800/30 text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center justify-between">
              <span>Predict My Percentile</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </Link>

          {/* Active Recall SRS Flashcards */}
          <Link
            href="/flashcards"
            className="p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-amber-400/60 transition group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-amber-500 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Brain size={20} />
              </div>
              <div className="flex items-center space-x-1.5 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Leitner System</span>
                <span className="text-[9px] bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold px-1.5 py-0.5 rounded-full">SRS</span>
              </div>
              <h4 className="font-black text-base text-slate-900 dark:text-white">Active Recall Flashcards</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                High-yield geometry proofs, number theory invariants, SNAP vocab, and GMAT critical reasoning fallacies.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Review Flashcard Decks</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </Link>

          {/* RC Reading Speed Pacer */}
          <Link
            href="/rc-pacer"
            className="p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-amber-400/60 transition group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-indigo-500 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Gauge size={20} />
              </div>
              <div className="flex items-center space-x-1.5 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Speed & Retention</span>
                <span className="text-[9px] bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold px-1.5 py-0.5 rounded-full">200-350 WPM</span>
              </div>
              <h4 className="font-black text-base text-slate-900 dark:text-white">RC Reading Speed Pacer</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Dynamic eye-tracking pacer for dense academic passages with authentic post-reading comprehension checks.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Train Reading Speed</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </Link>
        </div>
      </div>

      {/* 5. Additional Practice & Tracking Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* College Application Tracker Callout */}
        <Link
          href="/colleges"
          className="p-5 rounded-3xl border border-amber-200 dark:border-amber-800/50 bg-amber-50/40 dark:bg-amber-950/20 hover:border-amber-400 transition cursor-pointer group shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform">
              <Building2 size={18} />
            </div>
            <div className="flex items-center space-x-1.5 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">Admissions</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">College Tracker</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Track deadlines, form fees, cutoffs, and placements across IIMs, FMS, XLRI & SPJIMR.
            </p>
          </div>
          <div className="mt-4 text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center space-x-1">
            <span>Open Tracker &rarr;</span>
          </div>
        </Link>

        {/* Profile Evaluator Callout */}
        <Link
          href="/profile-evaluator"
          className="p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-amber-400/60 transition cursor-pointer group shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <UserCheck size={18} className="text-amber-500" />
            </div>
            <div className="flex items-center space-x-1.5 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">IIM CS Calculator</span>
              <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 font-bold px-1.5 py-0.2 rounded-full">New</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Profile Evaluator</h4>
            <p className="text-xs text-slate-500 mt-1">
              Personalized cutoffs calculated for your exact 10th/12th/Grad scores, stream, and work-ex.
            </p>
          </div>
          <div className="mt-4 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
            <span>Evaluate Profile &rarr;</span>
          </div>
        </Link>

        {/* AI Question Lab */}
        <div 
          onClick={onOpenAiGenerator}
          className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer group shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Sparkles size={18} className="text-amber-500" />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Practice Engine</div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">AI Question Lab</h4>
            <p className="text-xs text-slate-500 mt-1">
              Generate custom, infinite CAT-standard questions on specific topics with proofs and trap warnings.
            </p>
          </div>
          <div className="mt-4 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
            <span>Explore Generator &rarr;</span>
          </div>
        </div>

        {/* Mistake Notebook */}
        <Link 
          href="/mistake-book"
          className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition cursor-pointer group shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <TrendingUp size={18} className="text-amber-500" />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Error Analysis</div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">My Mistake Log</h4>
            <p className="text-xs text-slate-500 mt-1">
              Review and re-attempt missed questions. Filter by calculation error, concept gap, or trap option.
            </p>
          </div>
          <div className="mt-4 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
            <span>Review Mistakes &rarr;</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
