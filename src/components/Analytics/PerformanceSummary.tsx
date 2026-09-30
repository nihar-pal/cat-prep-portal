'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Target, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Bookmark, 
  RotateCcw, 
  ArrowRight, 
  BookOpen, 
  Sparkles,
  Zap,
  Filter,
  Check
} from 'lucide-react';
import { Question, UserResponse, ExamType, MistakeEntry } from '@/types/exam';
import { EXAM_CONFIGS } from '@/data/multiExamConfigs';
import { MathRenderer } from '@/components/MathRenderer';

interface PerformanceSummaryProps {
  title: string;
  examType: ExamType;
  questions: Question[];
  responses: Record<string, UserResponse>;
  totalTimeSpentSeconds: number;
  onRetake: () => void;
  onBackToDashboard: () => void;
}

export const PerformanceSummary: React.FC<PerformanceSummaryProps> = ({
  title,
  examType,
  questions,
  responses,
  totalTimeSpentSeconds,
  onRetake,
  onBackToDashboard
}) => {
  const examConfig = EXAM_CONFIGS[examType] || EXAM_CONFIGS.CAT;

  // Calculate detailed scores
  let totalScore = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;

  const sectionStats: Record<string, {
    total: number;
    attempted: number;
    correct: number;
    wrong: number;
    score: number;
    timeSeconds: number;
  }> = {};

  questions.forEach(q => {
    const sec = q.section;
    if (!sectionStats[sec]) {
      sectionStats[sec] = { total: 0, attempted: 0, correct: 0, wrong: 0, score: 0, timeSeconds: 0 };
    }
    sectionStats[sec].total++;

    const resp = responses[q.id];
    const userAns = resp?.userAnswer?.trim() || '';
    const isAttempted = userAns.length > 0;
    const timeSpent = resp?.timeSpentSeconds || 0;
    sectionStats[sec].timeSeconds += timeSpent;

    if (!isAttempted) {
      unattemptedCount++;
    } else {
      sectionStats[sec].attempted++;
      const isCorrect = userAns.toLowerCase() === q.correctAnswer.trim().toLowerCase();

      if (isCorrect) {
        correctCount++;
        sectionStats[sec].correct++;
        const pts = q.type === 'MCQ' ? examConfig.scoring.correctMcq : examConfig.scoring.correctTita;
        totalScore += pts;
        sectionStats[sec].score += pts;
      } else {
        wrongCount++;
        sectionStats[sec].wrong++;
        const pts = q.type === 'MCQ' ? examConfig.scoring.incorrectMcq : examConfig.scoring.incorrectTita;
        totalScore += pts;
        sectionStats[sec].score += pts;
      }
    }
  });

  const attemptedCount = correctCount + wrongCount;
  const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
  const maxPossibleScore = questions.reduce((acc, q) => acc + examConfig.scoring.correctMcq, 0);

  // Percentile Estimation Logic based on raw score ratio
  const scorePercentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
  let estimatedPercentile = 70.0;
  if (scorePercentage >= 75) estimatedPercentile = 99.8;
  else if (scorePercentage >= 60) estimatedPercentile = 99.2;
  else if (scorePercentage >= 50) estimatedPercentile = 98.0;
  else if (scorePercentage >= 40) estimatedPercentile = 95.0;
  else if (scorePercentage >= 30) estimatedPercentile = 90.0;
  else if (scorePercentage >= 20) estimatedPercentile = 80.0;

  // Trigger celebration confetti for high scores!
  useEffect(() => {
    if (estimatedPercentile >= 95) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // gracefully ignore if canvas not supported
      }
    }
  }, [estimatedPercentile]);

  // Solution review filtering
  const [filterType, setFilterType] = useState<'ALL' | 'INCORRECT' | 'UNATTEMPTED' | 'CORRECT'>('ALL');
  const [savedMistakes, setSavedMistakes] = useState<Record<string, boolean>>({});
  const [mistakeModalQ, setMistakeModalQ] = useState<Question | null>(null);
  const [selectedMistakeTag, setSelectedMistakeTag] = useState<MistakeEntry['mistakeTag']>('Conceptual Error');

  const filteredQuestions = questions.filter(q => {
    const userAns = responses[q.id]?.userAnswer?.trim() || '';
    const isAttempted = userAns.length > 0;
    const isCorrect = userAns.toLowerCase() === q.correctAnswer.trim().toLowerCase();

    if (filterType === 'CORRECT') return isAttempted && isCorrect;
    if (filterType === 'INCORRECT') return isAttempted && !isCorrect;
    if (filterType === 'UNATTEMPTED') return !isAttempted;
    return true;
  });

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}m ${s}s`;
  };

  const handleSaveToMistakeBook = (q: Question) => {
    const userAns = responses[q.id]?.userAnswer || '';
    const newEntry: MistakeEntry = {
      id: `mistake-${q.id}-${Date.now()}`,
      question: q,
      userGivenAnswer: userAns,
      mistakeTag: selectedMistakeTag,
      dateAdded: new Date().toLocaleDateString(),
      resolved: false
    };

    try {
      const stored = localStorage.getItem('cat_mistake_book');
      const list: MistakeEntry[] = stored ? JSON.parse(stored) : [];
      // avoid duplicates for same question
      const filtered = list.filter(item => item.question.id !== q.id);
      filtered.push(newEntry);
      localStorage.setItem('cat_mistake_book', JSON.stringify(filtered));
      setSavedMistakes(prev => ({ ...prev, [q.id]: true }));
      setMistakeModalQ(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header navigation bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToDashboard}
            className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 flex items-center space-x-1"
          >
            <span>&larr; Back to Dashboard</span>
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            {examType} Exam Scorecard
          </span>
        </div>

        {/* 1. Hero Scorecard Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Trophy size={16} />
                <span>Test Completed</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{title}</h1>
              <p className="text-sm text-slate-300 mt-1">
                Evaluation under official {examType} scoring (+{examConfig.scoring.correctMcq} / {examConfig.scoring.incorrectMcq})
              </p>
            </div>

            {/* Score & Percentile Badges */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="bg-slate-800/80 backdrop-blur border border-slate-700 p-4 rounded-xl text-center min-w-[120px]">
                <div className="text-xs font-semibold text-slate-400 uppercase">Raw Score</div>
                <div className="text-3xl font-black text-white mt-0.5">
                  {totalScore} <span className="text-xs font-normal text-slate-400">/ {maxPossibleScore}</span>
                </div>
              </div>

              <div className="bg-emerald-950/80 backdrop-blur border border-emerald-600/50 p-4 rounded-xl text-center min-w-[140px]">
                <div className="text-xs font-semibold text-emerald-400 uppercase flex items-center justify-center space-x-1">
                  <Sparkles size={12} />
                  <span>Est. Percentile</span>
                </div>
                <div className="text-3xl font-black text-emerald-300 mt-0.5">
                  {estimatedPercentile.toFixed(1)}%ile
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-700/60">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <div className="text-xs text-slate-400">Correct</div>
                <div className="text-base font-bold text-white">{correctCount} Questions</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                <XCircle size={18} />
              </div>
              <div>
                <div className="text-xs text-slate-400">Incorrect</div>
                <div className="text-base font-bold text-white">{wrongCount} Questions</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                <Target size={18} />
              </div>
              <div>
                <div className="text-xs text-slate-400">Accuracy</div>
                <div className="text-base font-bold text-white">{accuracy}%</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                <Clock size={18} />
              </div>
              <div>
                <div className="text-xs text-slate-400">Time Taken</div>
                <div className="text-base font-bold text-white">{formatSeconds(totalTimeSpentSeconds)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Section-by-Section Diagnostic Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
            <Target size={18} className="text-blue-600" />
            <span>Sectional Performance Diagnostics</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4">Section</th>
                  <th className="py-3 px-4">Attempted</th>
                  <th className="py-3 px-4">Correct</th>
                  <th className="py-3 px-4">Wrong</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Time Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {Object.entries(sectionStats).map(([sec, stats]) => {
                  const secAcc = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;
                  return (
                    <tr key={sec} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{sec}</td>
                      <td className="py-3 px-4">{stats.attempted} / {stats.total}</td>
                      <td className="py-3 px-4 text-emerald-600 font-semibold">{stats.correct}</td>
                      <td className="py-3 px-4 text-rose-500 font-semibold">{stats.wrong}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          secAcc >= 80 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                          secAcc >= 60 ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                          'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}>
                          {secAcc}%
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{stats.score}</td>
                      <td className="py-3 px-4 text-slate-500">{formatSeconds(stats.timeSeconds)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Comprehensive Question Solutions & Trap Analysis */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <BookOpen size={20} className="text-indigo-600" />
                <span>Deep Solution Review & Trap Breakdown</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Review expert step-by-step methods, IIM Alum shortcut hacks, and avoid common test-taker traps.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  filterType === 'ALL'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                All ({questions.length})
              </button>
              <button
                onClick={() => setFilterType('INCORRECT')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  filterType === 'INCORRECT'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                Wrong ({wrongCount})
              </button>
              <button
                onClick={() => setFilterType('UNATTEMPTED')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  filterType === 'UNATTEMPTED'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                Unattempted ({unattemptedCount})
              </button>
              <button
                onClick={() => setFilterType('CORRECT')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  filterType === 'CORRECT'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                Correct ({correctCount})
              </button>
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-6">
            {filteredQuestions.map((q, idx) => {
              const resp = responses[q.id];
              const userAns = resp?.userAnswer?.trim() || '';
              const isAttempted = userAns.length > 0;
              const isCorrect = userAns.toLowerCase() === q.correctAnswer.trim().toLowerCase();
              const isSavedInMistakes = savedMistakes[q.id];

              return (
                <div 
                  key={q.id}
                  className={`p-5 rounded-xl border transition ${
                    !isAttempted 
                      ? 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40'
                      : isCorrect
                      ? 'border-emerald-200 dark:border-emerald-950 bg-emerald-50/30 dark:bg-emerald-950/10'
                      : 'border-rose-200 dark:border-rose-950 bg-rose-50/30 dark:bg-rose-950/10'
                  }`}
                >
                  {/* Question header badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded">
                        {q.section} &bull; {q.topic}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {q.pastYearReference}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {isAttempted ? (
                        isCorrect ? (
                          <span className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full">
                            <CheckCircle2 size={13} />
                            <span>Correct (+3)</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1 text-xs font-bold text-rose-600 bg-rose-100 dark:bg-rose-950/80 px-2.5 py-0.5 rounded-full">
                            <XCircle size={13} />
                            <span>Incorrect ({q.type === 'MCQ' ? '-1' : '0'})</span>
                          </span>
                        )
                      ) : (
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                          Unattempted (0)
                        </span>
                      )}

                      {/* Add to Mistake Book Button */}
                      {!isCorrect && (
                        <button
                          onClick={() => setMistakeModalQ(q)}
                          disabled={isSavedInMistakes}
                          className={`flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded transition ${
                            isSavedInMistakes
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          {isSavedInMistakes ? <Check size={12} /> : <Bookmark size={12} />}
                          <span>{isSavedInMistakes ? 'In Mistake Book' : 'Log to Mistake Book'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Context excerpt if exists */}
                  {q.contextText && (
                    <details className="mb-3 text-xs bg-slate-100 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                      <summary className="font-bold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                        View Passage / Caselet Context
                      </summary>
                      <div className="mt-2 text-slate-600 dark:text-slate-300 max-h-48 overflow-y-auto">
                        <MathRenderer content={q.contextText} />
                      </div>
                    </details>
                  )}

                  {/* Question Text */}
                  <div className="text-sm font-medium mb-3">
                    <MathRenderer content={q.questionText} />
                  </div>

                  {/* MCQ Options Display */}
                  {q.options && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 text-xs">
                      {q.options.map(opt => {
                        const isCorrectOption = opt.id === q.correctAnswer;
                        const isUserChoice = userAns === opt.id;

                        let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700';
                        if (isCorrectOption) {
                          style = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 font-semibold text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-500';
                        } else if (isUserChoice && !isCorrect) {
                          style = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 font-semibold text-rose-900 dark:text-rose-200 line-through';
                        }

                        return (
                          <div key={opt.id} className={`p-2.5 rounded-lg border flex items-start space-x-2 ${style}`}>
                            <span className="font-bold">{opt.id}.</span>
                            <div className="flex-1">
                              <MathRenderer content={opt.text} />
                            </div>
                            {isCorrectOption && <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />}
                            {isUserChoice && !isCorrect && <XCircle size={14} className="text-rose-600 shrink-0 mt-0.5" />}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Answer Summary Callout */}
                  <div className="bg-slate-100 dark:bg-slate-800/60 rounded-lg p-3 text-xs flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div>
                      <span className="text-slate-500">Your Answer: </span>
                      <strong className={`font-mono text-sm ${isCorrect ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {userAns || 'Not Attempted'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Correct Answer: </span>
                      <strong className="font-mono text-sm text-emerald-600">
                        {q.correctAnswer}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Time Spent: </span>
                      <strong className="font-mono text-slate-800 dark:text-slate-200">
                        {formatSeconds(resp?.timeSpentSeconds || 0)}
                      </strong>
                    </div>
                  </div>

                  {/* Step-by-Step Mathematical/Verbal Explanation */}
                  <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wide flex items-center space-x-1.5">
                      <BookOpen size={13} className="text-blue-600" />
                      <span>Detailed Conceptual Proof & Steps</span>
                    </div>
                    <div className="space-y-1.5 text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                      {q.explanation.stepByStep.map((step, sIdx) => (
                        <MathRenderer key={sIdx} content={step} className="text-xs" />
                      ))}
                    </div>

                    {/* IIM Alum Shortcut / 60-Second Tip */}
                    {q.explanation.shortcutOrAlumTip && (
                      <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-lg text-amber-900 dark:text-amber-200">
                        <div className="font-bold flex items-center space-x-1.5 mb-1 text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-300">
                          <Zap size={14} className="text-amber-600 fill-amber-500" />
                          <span>IIM Alum Speed Hack (Save 60-90s)</span>
                        </div>
                        <MathRenderer content={q.explanation.shortcutOrAlumTip} className="text-xs" />
                      </div>
                    )}

                    {/* Trap Analysis */}
                    {q.explanation.trapAnalysis && (
                      <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-lg text-rose-900 dark:text-rose-200">
                        <div className="font-bold flex items-center space-x-1.5 mb-1 text-[11px] uppercase tracking-wider text-rose-700 dark:text-rose-400">
                          <AlertTriangle size={13} className="text-rose-600" />
                          <span>Trap Alert & Distractor Deconstruction</span>
                        </div>
                        <MathRenderer content={q.explanation.trapAnalysis} className="text-xs" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Bottom Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <button
            onClick={onRetake}
            className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center space-x-2 shadow-sm"
          >
            <RotateCcw size={14} />
            <span>Retake This Daily Sprint</span>
          </button>

          <button
            onClick={onBackToDashboard}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-2 shadow"
          >
            <span>Proceed to Dashboard</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 5. Add to Mistake Book Modal */}
      {mistakeModalQ && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Log Question to Mistake Book
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Categorize why you got this question wrong to identify and fix your systematic blind spots.
            </p>

            <div className="space-y-2 mb-6">
              {[
                'Conceptual Error',
                'Calculation Mistake',
                'Misread Question',
                'Time Pressure',
                'Trap Option Picked'
              ].map(tag => (
                <label
                  key={tag}
                  onClick={() => setSelectedMistakeTag(tag as MistakeEntry['mistakeTag'])}
                  className={`flex items-center space-x-2 p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                    selectedMistakeTag === tag
                      ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 font-bold text-amber-900 dark:text-amber-200'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    selectedMistakeTag === tag ? 'border-amber-600 bg-amber-600' : 'border-slate-400'
                  }`}>
                    {selectedMistakeTag === tag && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                  </span>
                  <span>{tag}</span>
                </label>
              ))}
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setMistakeModalQ(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveToMistakeBook(mistakeModalQ)}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs font-bold shadow"
              >
                Save to Error Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
