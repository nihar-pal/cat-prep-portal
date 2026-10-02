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
  Check,
  Bot
} from 'lucide-react';
import { Question, UserResponse, ExamType, MistakeEntry } from '@/types/exam';
import { EXAM_CONFIGS } from '@/data/multiExamConfigs';
import { MathRenderer } from '@/components/MathRenderer';
import { PostSubmissionAiCoach } from '@/components/Chat/PostSubmissionAiCoach';
import { CuteCatLogo } from '@/components/CuteCatLogo';

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

  const questionsSummary = questions.map(q => {
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

    let isCorrect = false;
    if (!isAttempted) {
      unattemptedCount++;
    } else {
      sectionStats[sec].attempted++;
      isCorrect = userAns.toLowerCase() === q.correctAnswer.trim().toLowerCase();

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

    return {
      id: q.id,
      section: q.section,
      topic: q.topic,
      isCorrect,
      isAttempted,
      userAnswer: userAns,
      correctAnswer: q.correctAnswer,
      timeSeconds: timeSpent
    };
  });

  // XAT Unattempted Question Penalty (Official rule: first 8 skips free; -0.10 thereafter)
  let unattemptedPenaltyDeduction = 0;
  if (examType === 'XAT' && unattemptedCount > 8) {
    unattemptedPenaltyDeduction = Number(((unattemptedCount - 8) * 0.10).toFixed(2));
    totalScore = Number((totalScore - unattemptedPenaltyDeduction).toFixed(2));
  } else {
    totalScore = Number(totalScore.toFixed(2));
  }

  const attemptedCount = correctCount + wrongCount;
  const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
  const maxPossibleScore = questions.reduce((acc, q) => acc + examConfig.scoring.correctMcq, 0);

  // Percentile Estimation Logic
  const scorePercentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
  let estimatedPercentile = 70.0;
  if (scorePercentage >= 75) estimatedPercentile = 99.8;
  else if (scorePercentage >= 60) estimatedPercentile = 99.2;
  else if (scorePercentage >= 50) estimatedPercentile = 98.0;
  else if (scorePercentage >= 40) estimatedPercentile = 95.0;
  else if (scorePercentage >= 30) estimatedPercentile = 90.0;
  else if (scorePercentage >= 20) estimatedPercentile = 80.0;

  useEffect(() => {
    if (estimatedPercentile >= 95) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
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
    <div className="min-h-screen bg-zinc-50/70 dark:bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8 font-sans text-zinc-900 dark:text-zinc-100">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToDashboard}
            className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center space-x-1"
          >
            <span>&larr; Back to Dashboard</span>
          </button>
          <div className="flex items-center space-x-2">
            <CuteCatLogo size={20} />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800">
              {examType} Diagnostic Scorecard
            </span>
          </div>
        </div>

        {/* 1. Hero Scorecard - Minimalist Dark Charcoal / Warm Zinc (Non-bluish) */}
        <div className="bg-zinc-900 text-zinc-100 rounded-3xl p-6 sm:p-8 shadow-sm border border-zinc-800 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Trophy size={16} />
                <span>Test Completed</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{title}</h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Evaluated under official {examType} marking (+{examConfig.scoring.correctMcq} / {examConfig.scoring.incorrectMcq === 0 ? '0' : examConfig.scoring.incorrectMcq})
                {unattemptedPenaltyDeduction > 0 && (
                  <span className="block text-amber-400 text-xs font-semibold mt-0.5">
                    &bull; Includes XAT unattempted penalty of -{unattemptedPenaltyDeduction} marks ({unattemptedCount - 8} skips beyond 8 allowed).
                  </span>
                )}
              </p>
            </div>

            {/* Score & Percentile Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-zinc-800/80 border border-zinc-700/80 p-4 rounded-2xl text-center min-w-[120px]">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Raw Score</div>
                <div className="text-3xl font-black text-white mt-0.5">
                  {totalScore} <span className="text-xs font-normal text-zinc-400">/ {maxPossibleScore}</span>
                </div>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-800/60 p-4 rounded-2xl text-center min-w-[130px]">
                <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-center space-x-1">
                  <Sparkles size={11} />
                  <span>Est. Percentile</span>
                </div>
                <div className="text-3xl font-black text-emerald-400 mt-0.5 font-mono">
                  {estimatedPercentile.toFixed(1)}%ile
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-zinc-800">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 size={16} />
              </div>
              <div>
                <div className="text-[11px] text-zinc-400">Correct</div>
                <div className="text-sm font-bold text-white">{correctCount} Questions</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                <XCircle size={16} />
              </div>
              <div>
                <div className="text-[11px] text-zinc-400">Incorrect</div>
                <div className="text-sm font-bold text-white">{wrongCount} Questions</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-zinc-800 text-zinc-300">
                <Target size={16} />
              </div>
              <div>
                <div className="text-[11px] text-zinc-400">Accuracy</div>
                <div className="text-sm font-bold text-white">{accuracy}%</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Clock size={16} />
              </div>
              <div>
                <div className="text-[11px] text-zinc-400">Time Taken</div>
                <div className="text-sm font-bold text-white">{formatSeconds(totalTimeSpentSeconds)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Sectional Diagnostic Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-zinc-200/80 dark:border-zinc-800">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-4 flex items-center space-x-2">
            <Target size={17} className="text-amber-500" />
            <span>Sectional Performance Diagnostics</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-700 dark:text-zinc-300">
              <thead className="bg-zinc-50 dark:bg-zinc-800/60 uppercase font-semibold text-zinc-400 border-b border-zinc-200 dark:border-zinc-700">
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
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {Object.entries(sectionStats).map(([sec, stats]) => {
                  const secAcc = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;
                  return (
                    <tr key={sec} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                      <td className="py-3 px-4 font-bold text-zinc-900 dark:text-white">{sec.replace(/_/g, ' ')}</td>
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
                      <td className="py-3 px-4 font-bold text-zinc-900 dark:text-white">{stats.score}</td>
                      <td className="py-3 px-4 text-zinc-500">{formatSeconds(stats.timeSeconds)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. NEW FEATURE: Embedded Post-Submission AI Chatbot Coach */}
        <PostSubmissionAiCoach
          testContext={{
            title,
            totalScore,
            maxScore: maxPossibleScore,
            percentile: estimatedPercentile,
            accuracy,
            correctCount,
            wrongCount,
            unattemptedCount,
            totalTimeSeconds: totalTimeSpentSeconds,
            questionsSummary
          }}
        />

        {/* 4. Comprehensive Solutions & Trap Breakdown */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-zinc-200/80 dark:border-zinc-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center space-x-2">
                <BookOpen size={18} className="text-amber-500" />
                <span>Deep Solution Review & Distractor Trap Analysis</span>
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Step-by-step proofs, IIM Alum shortcut speed hacks, and trap option warnings.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-3 py-1.5 rounded-xl font-bold transition ${
                  filterType === 'ALL'
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                }`}
              >
                All ({questions.length})
              </button>
              <button
                onClick={() => setFilterType('INCORRECT')}
                className={`px-3 py-1.5 rounded-xl font-bold transition ${
                  filterType === 'INCORRECT'
                    ? 'bg-rose-600 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                }`}
              >
                Wrong ({wrongCount})
              </button>
              <button
                onClick={() => setFilterType('UNATTEMPTED')}
                className={`px-3 py-1.5 rounded-xl font-bold transition ${
                  filterType === 'UNATTEMPTED'
                    ? 'bg-amber-600 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                }`}
              >
                Unattempted ({unattemptedCount})
              </button>
              <button
                onClick={() => setFilterType('CORRECT')}
                className={`px-3 py-1.5 rounded-xl font-bold transition ${
                  filterType === 'CORRECT'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                }`}
              >
                Correct ({correctCount})
              </button>
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-6">
            {filteredQuestions.map((q) => {
              const resp = responses[q.id];
              const userAns = resp?.userAnswer?.trim() || '';
              const isAttempted = userAns.length > 0;
              const isCorrect = userAns.toLowerCase() === q.correctAnswer.trim().toLowerCase();
              const isSavedInMistakes = savedMistakes[q.id];

              return (
                <div 
                  key={q.id}
                  className={`p-5 rounded-2xl border transition ${
                    !isAttempted 
                      ? 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/30'
                      : isCorrect
                      ? 'border-emerald-200 dark:border-emerald-950 bg-emerald-50/20 dark:bg-emerald-950/10'
                      : 'border-rose-200 dark:border-rose-950 bg-rose-50/20 dark:bg-rose-950/10'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-2.5 py-0.5 rounded-full">
                        {q.section} &bull; {q.topic}
                      </span>
                      <span className="text-[11px] text-zinc-400">
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
                        <span className="text-xs font-medium text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full">
                          Unattempted (0)
                        </span>
                      )}

                      {!isCorrect && (
                        <button
                          onClick={() => setMistakeModalQ(q)}
                          disabled={isSavedInMistakes}
                          className={`flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-xl transition ${
                            isSavedInMistakes
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-zinc-100 hover:bg-amber-50 text-zinc-700 hover:text-amber-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
                          }`}
                        >
                          {isSavedInMistakes ? <Check size={12} /> : <Bookmark size={12} />}
                          <span>{isSavedInMistakes ? 'In Mistake Log' : 'Log to Mistake Book'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {q.contextText && (
                    <details className="mb-3 text-xs bg-zinc-100/70 dark:bg-zinc-800/70 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
                      <summary className="font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer select-none">
                        View Reading Passage / Caselet Context
                      </summary>
                      <div className="mt-2 text-zinc-600 dark:text-zinc-300 max-h-48 overflow-y-auto">
                        <MathRenderer content={q.contextText} />
                      </div>
                    </details>
                  )}

                  <div className="text-sm font-medium mb-3">
                    <MathRenderer content={q.questionText} />
                  </div>

                  {q.options && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 text-xs">
                      {q.options.map(opt => {
                        const isCorrectOption = opt.id === q.correctAnswer;
                        const isUserChoice = userAns === opt.id;

                        let style = 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700';
                        if (isCorrectOption) {
                          style = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 font-semibold text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-500';
                        } else if (isUserChoice && !isCorrect) {
                          style = 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 font-semibold text-rose-900 dark:text-rose-200 line-through';
                        }

                        return (
                          <div key={opt.id} className={`p-3 rounded-xl border flex items-start space-x-2 ${style}`}>
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

                  {/* Summary Bar */}
                  <div className="bg-zinc-100/70 dark:bg-zinc-800/40 rounded-xl p-3 text-xs flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div>
                      <span className="text-zinc-400">Your Answer: </span>
                      <strong className={`font-mono text-sm ${isCorrect ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {userAns || 'Not Attempted'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-zinc-400">Correct Answer: </span>
                      <strong className="font-mono text-sm text-emerald-600">
                        {q.correctAnswer}
                      </strong>
                    </div>
                    <div>
                      <span className="text-zinc-400">Time Spent: </span>
                      <strong className="font-mono text-zinc-700 dark:text-zinc-300">
                        {formatSeconds(resp?.timeSpentSeconds || 0)}
                      </strong>
                    </div>
                  </div>

                  {/* Step-by-Step Proof */}
                  <div className="space-y-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 text-xs">
                    <div className="font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide flex items-center space-x-1.5">
                      <BookOpen size={13} className="text-amber-500" />
                      <span>Conceptual Solution Steps</span>
                    </div>
                    <div className="space-y-1.5 text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      {q.explanation.stepByStep.map((step, sIdx) => (
                        <MathRenderer key={sIdx} content={step} className="text-xs" />
                      ))}
                    </div>

                    {q.explanation.shortcutOrAlumTip && (
                      <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 rounded-xl text-amber-900 dark:text-amber-200">
                        <div className="font-bold flex items-center space-x-1.5 mb-1 text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-300">
                          <Zap size={14} className="text-amber-600 fill-amber-500" />
                          <span>IIM Alum Speed Hack (Save 60-90s)</span>
                        </div>
                        <MathRenderer content={q.explanation.shortcutOrAlumTip} className="text-xs" />
                      </div>
                    )}

                    {q.explanation.trapAnalysis && (
                      <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 rounded-xl text-rose-900 dark:text-rose-200">
                        <div className="font-bold flex items-center space-x-1.5 mb-1 text-[11px] uppercase tracking-wider text-rose-700 dark:text-rose-400">
                          <AlertTriangle size={13} className="text-rose-600" />
                          <span>Distractor Trap Warning</span>
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

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <button
            onClick={onRetake}
            className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 text-zinc-800 dark:text-zinc-200 font-bold text-xs flex items-center space-x-2 shadow-xs"
          >
            <RotateCcw size={14} />
            <span>Retake This Daily Sprint</span>
          </button>

          <button
            onClick={onBackToDashboard}
            className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-xs flex items-center space-x-2 shadow-sm"
          >
            <span>Back to Dashboard</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Mistake Modal */}
      {mistakeModalQ && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl max-w-md w-full p-6 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1">
              Log Question to Mistake Book
            </h3>
            <p className="text-xs text-zinc-500 mb-4">
              Categorize the error so you can systematically eliminate this flaw.
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
                  className={`flex items-center space-x-2 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                    selectedMistakeTag === tag
                      ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 font-bold text-amber-900 dark:text-amber-200'
                      : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    selectedMistakeTag === tag ? 'border-amber-600 bg-amber-600' : 'border-zinc-400'
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
                className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveToMistakeBook(mistakeModalQ)}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-sm"
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
