'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  TrendingUp, 
  Award, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  Target, 
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { ExamType } from '@/types/exam';
import { Navbar } from '@/components/Navbar';
import { EXAM_PREDICTOR_CONFIGS } from '@/data/scorePredictorData';

export default function ScorePredictorPage() {
  const [currentExam, setCurrentExam] = useState<ExamType>('CAT');
  const config = EXAM_PREDICTOR_CONFIGS[currentExam] || EXAM_PREDICTOR_CONFIGS.CAT;

  // Initialize scores state with defaults
  const [scores, setScores] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    config.sections.forEach(s => {
      init[s.key] = s.defaultScore;
    });
    return init;
  });

  const [copied, setCopied] = useState(false);

  // When exam changes, reset scores to defaults of that exam
  const handleExamSwitch = (newExam: ExamType) => {
    setCurrentExam(newExam);
    const newCfg = EXAM_PREDICTOR_CONFIGS[newExam] || EXAM_PREDICTOR_CONFIGS.CAT;
    const init: Record<string, number> = {};
    newCfg.sections.forEach(s => {
      init[s.key] = s.defaultScore;
    });
    setScores(init);
  };

  const handleScoreChange = (key: string, value: number) => {
    setScores(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Perform calculation
  const prediction = useMemo(() => {
    return config.calculatePercentile(scores);
  }, [config, scores]);

  // Evaluate college call status
  const collegeStatusList = useMemo(() => {
    return config.collegeCutoffs.map(col => {
      const diff = prediction.percentile - col.requiredPercentile;
      let status: 'SAFE' | 'COMPETITIVE' | 'REACH' = 'REACH';
      if (diff >= 0.5) status = 'SAFE';
      else if (diff >= -0.5) status = 'COMPETITIVE';

      return {
        ...col,
        status,
        diff
      };
    });
  }, [config.collegeCutoffs, prediction.percentile]);

  const safeCount = collegeStatusList.filter(c => c.status === 'SAFE').length;
  const competitiveCount = collegeStatusList.filter(c => c.status === 'COMPETITIVE').length;

  const handleCopySummary = () => {
    const text = `🎯 Crepe ${currentExam} Score & Percentile Prediction:\n• Total Score: ${prediction.scaledScoreOrScore}\n• Predicted Percentile: ${prediction.percentile}%ile (${prediction.percentileBand})\n• Safe College Shortlists: ${safeCount} premier institutions\nPredict yours at: https://cat-prep-portal-green.vercel.app/score-predictor`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <Navbar currentExam={currentExam} onSelectExam={handleExamSwitch} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Banner */}
        <div className="bg-zinc-900 text-white p-6 sm:p-8 rounded-3xl shadow-sm border border-zinc-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
                <Calculator size={16} />
                <span>Empirical Score Normalization Engine &bull; {currentExam}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Score $\leftrightarrow$ Percentile $\leftrightarrow$ College Shortlist Predictor
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
                Adjust your sectional raw marks to immediately forecast your normalized scaled score, estimated national percentile rank, and interview call probabilities across top MBA institutions.
              </p>
            </div>

            {/* Exam Filter Pills */}
            <div className="flex items-center space-x-1.5 bg-zinc-800/80 p-1.5 rounded-2xl border border-zinc-700/80 shrink-0">
              {(['CAT', 'GMAT', 'XAT', 'NMAT', 'SNAP'] as const).map(ex => (
                <button
                  key={ex}
                  onClick={() => handleExamSwitch(ex)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    ex === currentExam
                      ? 'bg-white text-zinc-900 shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Prediction Results Highlight Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Percentile Metric */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Predicted Percentile
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-500">
                  {currentExam} 2026
                </span>
              </div>
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mt-3 font-mono">
                {prediction.percentile} <span className="text-xl font-sans font-bold text-amber-500">%ile</span>
              </div>
              <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mt-1">
                {prediction.percentileBand}
              </p>
              <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed">
                {prediction.analysisText}
              </p>
            </div>

            <button
              onClick={handleCopySummary}
              className="py-2.5 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center justify-center space-x-1.5 transition"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              <span>{copied ? 'Summary Copied!' : 'Copy Prediction Summary'}</span>
            </button>
          </div>

          {/* Score Composition & Shortlist Badges */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Score Composition
              </span>
              <div className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white mt-3 font-mono">
                {prediction.scaledScoreOrScore} <span className="text-sm font-sans font-medium text-zinc-400">/ {config.totalMaxScore}</span>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                {config.sections.map(s => (
                  <div key={s.key} className="flex justify-between items-center py-1 border-b border-zinc-100 dark:border-zinc-800/80">
                    <span className="text-zinc-500 truncate max-w-[170px]">{s.name}:</span>
                    <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">
                      {scores[s.key] || 0} marks
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2 text-[11px] text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
              <span>Calibrated via historical normalization curves</span>
            </div>
          </div>

          {/* Quick Call Summary */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Interview Call Horizon
              </span>
              <div className="mt-3 space-y-3">
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">Direct Call Safe Zone</span>
                  </div>
                  <span className="text-sm font-mono font-black text-emerald-800 dark:text-emerald-300">
                    {safeCount} Colleges
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-200">Competitive Shortlist</span>
                  </div>
                  <span className="text-sm font-mono font-black text-amber-800 dark:text-amber-300">
                    {competitiveCount} Colleges
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/colleges"
              className="py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold flex items-center justify-center space-x-1.5 transition"
            >
              <Building2 size={14} />
              <span>Explore All College Deadlines</span>
              <ChevronRight size={13} />
            </Link>
          </div>
        </div>

        {/* Section Score Adjuster Sliders */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Adjust Sectional Raw Marks
              </h2>
              <p className="text-xs text-zinc-500">
                Drag the sliders to simulate expected scores and inspect real-time changes in national percentile.
              </p>
            </div>

            <div className="text-xs font-mono font-bold text-zinc-500">
              Interactive Calibration
            </div>
          </div>

          <div className="space-y-6">
            {config.sections.map(sec => {
              const val = scores[sec.key] || 0;
              return (
                <div key={sec.key} className="space-y-2 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-zinc-900 dark:text-white">
                        {sec.name}
                      </div>
                      <div className="text-[10px] text-zinc-500">
                        {sec.description}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min={sec.minScore}
                        max={sec.maxScore}
                        step={sec.step}
                        value={val}
                        onChange={(e) => handleScoreChange(sec.key, parseFloat(e.target.value) || 0)}
                        className="w-20 px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm font-mono font-bold text-right text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      <span className="text-xs font-medium text-zinc-400">/ {sec.maxScore}</span>
                    </div>
                  </div>

                  {/* Slider */}
                  <input
                    type="range"
                    min={sec.minScore}
                    max={sec.maxScore}
                    step={sec.step}
                    value={val}
                    onChange={(e) => handleScoreChange(sec.key, parseFloat(e.target.value))}
                    className="w-full accent-amber-500 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Live College Shortlist Breakdown */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Live College Interview Call Radar
              </h2>
              <p className="text-xs text-zinc-500">
                Institutions highlighted in green indicate your predicted score safely meets or exceeds the historical threshold.
              </p>
            </div>

            <div className="flex items-center space-x-3 text-xs font-medium">
              <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Safe Call</span>
              </span>
              <span className="flex items-center space-x-1 text-amber-600 dark:text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Competitive</span>
              </span>
              <span className="flex items-center space-x-1 text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
                <span>Reach</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collegeStatusList.map(col => (
              <div
                key={col.collegeName}
                className={`p-5 rounded-2xl border transition flex flex-col justify-between space-y-3 ${
                  col.status === 'SAFE'
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                    : col.status === 'COMPETITIVE'
                      ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60'
                      : 'bg-zinc-50/60 dark:bg-zinc-800/30 border-zinc-200 dark:border-zinc-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                      {col.tier}
                    </span>
                    <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                      col.status === 'SAFE'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                        : col.status === 'COMPETITIVE'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                    }`}>
                      {col.status === 'SAFE' ? 'Safe Call' : col.status === 'COMPETITIVE' ? 'Competitive' : 'Reach'}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-zinc-900 dark:text-white mt-2">
                    {col.collegeName}
                  </h3>
                  <div className="text-[11px] text-zinc-500 font-medium">
                    {col.flagshipProgram} &bull; Required: <strong>{col.requiredPercentile}%ile</strong> ({col.cutoffScoreDisplay})
                  </div>
                </div>

                <div className="text-[11px] text-zinc-600 dark:text-zinc-400 bg-white/70 dark:bg-zinc-900/70 p-2.5 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50">
                  <span className="font-bold text-zinc-700 dark:text-zinc-300">Selection Criteria: </span>
                  {col.notes}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
