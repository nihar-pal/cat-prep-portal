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
  UserCheck
} from 'lucide-react';
import { DailyTarget, ExamType, Question } from '@/types/exam';
import { CAT_DAILY_TARGETS } from '@/data/catDailyTargets';
import { EXAM_CONFIGS } from '@/data/multiExamConfigs';
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
  const activeTarget = CAT_DAILY_TARGETS[selectedDayIndex] || CAT_DAILY_TARGETS[0];
  const examConfig = EXAM_CONFIGS[currentExam];

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
              Curated to mirror CAT IIM standards: 1 RC Passage, 1 DILR Caselet, and 5 QA Questions with genuine option traps, TITA numerical inputs, and IIM alum shortcuts.
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
                +{examConfig.scoring.correctMcq} / {examConfig.scoring.incorrectMcq}
              </div>
              <div className="text-[10px] text-slate-400">TITA: +{examConfig.scoring.correctTita}, 0 penalty</div>
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
        {CAT_DAILY_TARGETS.map((target, idx) => {
          const isSelected = idx === selectedDayIndex;
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
              <span>Start Timed CAT Sprint ({activeTarget.estimatedMinutes}m)</span>
            </button>
          </div>
        </div>

        {/* Section Breakdown Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* VARC */}
          <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold uppercase text-[10px] text-blue-600 dark:text-blue-400">VARC Section</span>
                <span className="font-mono font-bold text-slate-400">{activeTarget.sections.varcCount} Qs</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                RC Passage & Verbal Ability
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                Dense analytical reading comprehension, inference traps, TITA 4-sentence Para Jumble, and Para Summary.
              </p>
            </div>
            <button
              onClick={() => onStartTarget(activeTarget, true, 'VARC')}
              className="mt-4 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
            >
              <span>Attempt VARC Sprint</span>
              <ChevronRight size={13} />
            </button>
          </div>

          {/* DILR */}
          <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold uppercase text-[10px] text-purple-600 dark:text-purple-400">DILR Section</span>
                <span className="font-mono font-bold text-slate-400">{activeTarget.sections.dilrCount} Qs</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                Logical Reasoning Caselet
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                Tournament point matrices, constraint optimization puzzles, and numerical deductions.
              </p>
            </div>
            <button
              onClick={() => onStartTarget(activeTarget, true, 'DILR')}
              className="mt-4 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center space-x-1"
            >
              <span>Attempt DILR Sprint</span>
              <ChevronRight size={13} />
            </button>
          </div>

          {/* QA */}
          <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold uppercase text-[10px] text-amber-600 dark:text-amber-400">QA Section</span>
                <span className="font-mono font-bold text-slate-400">{activeTarget.sections.qaCount} Qs</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                Quantitative Aptitude Sprints
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                Arithmetic relative speeds, quadratic polynomial roots, logarithmic inequalities, and Fermat remainders.
              </p>
            </div>
            <button
              onClick={() => onStartTarget(activeTarget, true, 'QA')}
              className="mt-4 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
            >
              <span>Attempt QA Sprint</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Quick Actions Grid: College Tracker, Profile Evaluator, AI Lab, Mistake Log */}
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
