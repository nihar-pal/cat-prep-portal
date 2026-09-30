'use client';

import React, { useState } from 'react';
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
  Compass
} from 'lucide-react';
import { DailyTarget, ExamType, Question } from '@/types/exam';
import { CAT_DAILY_TARGETS } from '@/data/catDailyTargets';
import { EXAM_CONFIGS } from '@/data/multiExamConfigs';

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
    <div className="space-y-8">
      {/* 1. Exam Target Header & Strategy Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-800/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
              <Sparkles size={14} />
              <span>CAT Exam Benchmark Series &bull; {currentExam} Mode</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Curated Daily Target Questions
            </h1>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Designed to reflect the exact CAT format: 1 RC Passage, 1 DILR Caselet, and QA problems with TITA numerical entries, genuine trapped options, and IIM alum shortcuts.
            </p>

            {/* Target Strategy Capsule */}
            <div className="mt-4 p-3 bg-white/10 backdrop-blur rounded-xl border border-white/10 flex items-start space-x-2.5 text-xs text-amber-200">
              <Zap size={16} className="text-amber-400 shrink-0 mt-0.5 fill-amber-400" />
              <div>
                <strong className="text-white block font-semibold">{currentExam} Strategy Rule:</strong>
                {examConfig.strategyTip}
              </div>
            </div>
          </div>

          {/* Quick Stats Pillar */}
          <div className="bg-slate-950/60 backdrop-blur border border-slate-800 p-5 rounded-2xl flex flex-row md:flex-col justify-around gap-4 min-w-[200px]">
            <div>
              <div className="text-[11px] uppercase font-semibold text-slate-400">Marking Scheme</div>
              <div className="text-lg font-black text-emerald-400 font-mono">
                +{examConfig.scoring.correctMcq} / {examConfig.scoring.incorrectMcq}
              </div>
              <div className="text-[10px] text-slate-500">TITA: +{examConfig.scoring.correctTita}, 0 penalty</div>
            </div>

            <div className="border-l md:border-l-0 md:border-t border-slate-800 pl-4 md:pl-0 md:pt-3">
              <div className="text-[11px] uppercase font-semibold text-slate-400">Total Standard</div>
              <div className="text-lg font-black text-white font-mono">
                {examConfig.totalQuestions} Qs &bull; {examConfig.totalDurationMinutes}m
              </div>
              <div className="text-[10px] text-slate-500">Sectional Lock: {examConfig.hasSectionalTimer ? 'Active' : 'Flexible'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Day-by-Day Selector Carousel */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2">
        {CAT_DAILY_TARGETS.map((target, idx) => {
          const isSelected = idx === selectedDayIndex;
          return (
            <button
              key={target.id}
              onClick={() => setSelectedDayIndex(idx)}
              className={`px-4 py-3 rounded-xl border text-left shrink-0 transition ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-400/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                Day {target.dayNumber}
              </div>
              <div className="font-bold text-xs truncate max-w-[160px] mt-0.5">
                {target.title}
              </div>
              <div className="text-[10px] opacity-75 mt-1 font-mono">
                {target.questions.length} Questions &bull; {target.estimatedMinutes}m
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Featured Active Target Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
              <Calendar size={14} />
              <span>{activeTarget.dateStr}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {activeTarget.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {activeTarget.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onStartTarget(activeTarget, false)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center space-x-1.5 transition"
            >
              <BookOpen size={15} />
              <span>Practice & Learn Mode</span>
            </button>

            <button
              onClick={() => onStartTarget(activeTarget, true)}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-blue-600/25 transition"
            >
              <Play size={15} className="fill-white" />
              <span>Start Timed CAT Sprint ({activeTarget.estimatedMinutes}m)</span>
            </button>
          </div>
        </div>

        {/* Section Content Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* VARC Pillar */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400">VARC Pillar</span>
                <span className="text-xs font-mono font-bold text-slate-500">{activeTarget.sections.varcCount} Qs</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                Reading Comp & Verbal Ability
              </h3>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 mt-2">
                <li>&bull; 1 Multi-paragraph philosophical/economic RC</li>
                <li>&bull; Inference, Author\'s Tone & Exception Questions</li>
                <li>&bull; TITA Para Jumble with logical discourse markers</li>
                <li>&bull; Para Summary with fine distractor traps</li>
              </ul>
            </div>
            <button
              onClick={() => onStartTarget(activeTarget, true, 'VARC')}
              className="mt-4 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
            >
              <span>Attempt VARC Sprint Only</span>
              <ChevronRight size={13} />
            </button>
          </div>

          {/* DILR Pillar */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400">DILR Pillar</span>
                <span className="text-xs font-mono font-bold text-slate-500">{activeTarget.sections.dilrCount} Qs</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                Logical Reasoning & Caselet
              </h3>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 mt-2">
                <li>&bull; 1 High-yield Tournament or Grid puzzle</li>
                <li>&bull; Multi-constraint boundary analysis</li>
                <li>&bull; Mix of MCQ choices and TITA exact values</li>
                <li>&bull; Deductive elimination techniques</li>
              </ul>
            </div>
            <button
              onClick={() => onStartTarget(activeTarget, true, 'DILR')}
              className="mt-4 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
            >
              <span>Attempt DILR Sprint Only</span>
              <ChevronRight size={13} />
            </button>
          </div>

          {/* QA Pillar */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400">QA Pillar</span>
                <span className="text-xs font-mono font-bold text-slate-500">{activeTarget.sections.qaCount} Qs</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                Quant High-Yield Sprints
              </h3>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 mt-2">
                <li>&bull; Arithmetic (Relative Speed, Work & Time)</li>
                <li>&bull; Algebra (Log inequalities, Roots of polynomials)</li>
                <li>&bull; Geometry (Perpendicular intersecting chords)</li>
                <li>&bull; Numbers (Fermat totient, Remainder theorem)</li>
              </ul>
            </div>
            <button
              onClick={() => onStartTarget(activeTarget, true, 'QA')}
              className="mt-4 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
            >
              <span>Attempt QA Sprint Only</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Quick Actions Grid: AI Lab, Mistake Notebook, Cheat Sheet */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div 
          onClick={onOpenAiGenerator}
          className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-500/50 cursor-pointer transition shadow-sm group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3 group-hover:scale-110 transition">
            <Sparkles size={20} />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">AI Question Generator</h4>
          <p className="text-xs text-slate-500 mt-1">
            Generate unlimited high-grade questions on specific topics like Escalators, Syllogisms, or Base systems with instant verification.
          </p>
        </div>

        <div 
          onClick={onOpenFormulaVault}
          className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/50 cursor-pointer transition shadow-sm group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3 group-hover:scale-110 transition">
            <BookOpen size={20} />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Formula & Trap Vault</h4>
          <p className="text-xs text-slate-500 mt-1">
            Access 60-second shortcut formulas for Arithmetic, Algebra, Geometry, and the VARC Tone & Inference Traps Matrix.
          </p>
        </div>

        <a 
          href="/mistake-book"
          className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-500/50 cursor-pointer transition shadow-sm group block"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3 group-hover:scale-110 transition">
            <TrendingUp size={20} />
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Personal Error Log</h4>
          <p className="text-xs text-slate-500 mt-1">
            Review questions you missed, filter by error type (Calculation error, Concept gap, Trap option), and re-attempt them.
          </p>
        </a>
      </div>
    </div>
  );
};
