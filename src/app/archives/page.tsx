'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Archive, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  Trash2, 
  ArrowLeft, 
  Play, 
  BarChart3, 
  ShieldCheck, 
  Timer,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { ExamType, ArchivedTestSession } from '@/types/exam';
import { Navbar } from '@/components/Navbar';
import { PerformanceSummary } from '@/components/Analytics/PerformanceSummary';
import { 
  getArchivedTests, 
  deleteArchivedTest, 
  clearAllArchivedTests, 
  getArchiveTimeLeft, 
  TimeRemainingInfo 
} from '@/utils/archiveStorage';

export default function ArchivesPage() {
  const [currentExam, setCurrentExam] = useState<ExamType>('CAT');
  const [selectedExamFilter, setSelectedExamFilter] = useState<'ALL' | ExamType>('ALL');
  const [archives, setArchives] = useState<ArchivedTestSession[]>([]);
  const [activeReviewSession, setActiveReviewSession] = useState<ArchivedTestSession | null>(null);
  const [timeRemainingMap, setTimeRemainingMap] = useState<Record<string, TimeRemainingInfo>>({});

  // Load archives on mount
  const refreshArchives = () => {
    const list = getArchivedTests(true);
    setArchives(list);
  };

  useEffect(() => {
    refreshArchives();
  }, []);

  // Update countdown timers every second
  useEffect(() => {
    const updateTimers = () => {
      const map: Record<string, TimeRemainingInfo> = {};
      archives.forEach(test => {
        map[test.id] = getArchiveTimeLeft(test.expiresAt, test.completedAt);
      });
      setTimeRemainingMap(map);
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, [archives]);

  // Filtered archives
  const filteredArchives = archives.filter(item => {
    if (selectedExamFilter === 'ALL') return true;
    return item.exam === selectedExamFilter;
  });

  const activeSessionsCount = archives.filter(item => {
    const info = timeRemainingMap[item.id];
    return info && !info.isExpired;
  }).length;

  const averageAccuracy = archives.length > 0
    ? Math.round(archives.reduce((acc, curr) => acc + (curr.accuracy || 0), 0) / archives.length)
    : 0;

  const highestPercentile = archives.length > 0
    ? Math.max(...archives.map(a => a.percentileEstimate || 0))
    : 0;

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this test session from archives?')) {
      deleteArchivedTest(id);
      refreshArchives();
      if (activeReviewSession?.id === id) {
        setActiveReviewSession(null);
      }
    }
  };

  const handleClearAll = () => {
    if (confirm('Clear all archived tests? This will permanently erase your recent 48-hour diagnostic history.')) {
      clearAllArchivedTests();
      refreshArchives();
      setActiveReviewSession(null);
    }
  };

  // If viewing a specific archived test analysis
  if (activeReviewSession) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
        {/* Review Top Banner */}
        <div className="bg-zinc-900 text-white px-4 sm:px-8 py-3.5 border-b border-zinc-800 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveReviewSession(null)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-slate-200 hover:text-white rounded-lg text-xs font-bold transition"
            >
              <ArrowLeft size={14} />
              <span>Back to Archives</span>
            </button>
            <div className="h-4 w-px bg-zinc-700"></div>
            <div className="text-xs">
              <span className="text-zinc-400">Archived Session: </span>
              <span className="font-bold text-white">{activeReviewSession.testTitle}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {timeRemainingMap[activeReviewSession.id] && (
              <span className={`text-xs px-2.5 py-1 rounded-full font-mono font-bold flex items-center space-x-1.5 ${
                timeRemainingMap[activeReviewSession.id].isExpired
                  ? 'bg-rose-950/60 text-rose-300 border border-rose-800'
                  : 'bg-amber-950/60 text-amber-300 border border-amber-800'
              }`}>
                <Clock size={12} />
                <span>
                  {timeRemainingMap[activeReviewSession.id].isExpired 
                    ? '48h Window Expired' 
                    : `Active in Vault: ${timeRemainingMap[activeReviewSession.id].formatted}`}
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Full Diagnostic Performance Summary Component with AI Chatbot */}
        <PerformanceSummary
          title={activeReviewSession.testTitle}
          examType={activeReviewSession.exam}
          questions={activeReviewSession.questions}
          responses={activeReviewSession.responses}
          totalTimeSpentSeconds={activeReviewSession.totalTimeSeconds || 0}
          onRetake={() => {
            // Back to test take
            window.location.href = '/';
          }}
          onBackToDashboard={() => setActiveReviewSession(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <Navbar currentExam={currentExam} onSelectExam={setCurrentExam} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Hero Header */}
        <div className="bg-zinc-900 text-white p-6 sm:p-8 rounded-3xl shadow-sm border border-zinc-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
                <Archive size={15} />
                <span>48-Hour Post-Test Diagnostic Vault</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Test Archives & Retrospective Analysis
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
                Every test or daily sprint you complete is preserved here for <strong>48 hours</strong>. Review step-by-step proofs, examine trap answer distractors, and get personalized remediation from the AI Post-Submission Coach.
              </p>
            </div>

            {archives.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-3.5 py-2 text-xs font-bold text-zinc-400 hover:text-rose-400 bg-zinc-800/80 hover:bg-rose-950/30 border border-zinc-700/60 hover:border-rose-800 rounded-xl transition flex items-center space-x-1.5 self-start md:self-center shrink-0"
              >
                <Trash2 size={13} />
                <span>Clear Vault</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-zinc-900 dark:text-white">
                {activeSessionsCount}
              </div>
              <div className="text-xs font-medium text-zinc-500">
                Active Analysis Windows (≤48h)
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-zinc-900 dark:text-white">
                {averageAccuracy}%
              </div>
              <div className="text-xs font-medium text-zinc-500">
                Average Vault Accuracy
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Award size={24} />
            </div>
            <div>
              <div className="text-2xl font-black text-zinc-900 dark:text-white">
                {highestPercentile > 0 ? `${highestPercentile} %ile` : '—'}
              </div>
              <div className="text-xs font-medium text-zinc-500">
                Peak Estimated Percentile
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
            {(['ALL', 'CAT', 'GMAT', 'XAT', 'NMAT', 'SNAP'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedExamFilter(filter)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                  selectedExamFilter === filter
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                {filter === 'ALL' ? 'All Exams' : filter}
              </button>
            ))}
          </div>

          <div className="text-xs text-zinc-500 font-mono">
            Showing {filteredArchives.length} test{filteredArchives.length === 1 ? '' : 's'}
          </div>
        </div>

        {/* Archive List */}
        {filteredArchives.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-10 sm:p-14 border border-zinc-200 dark:border-zinc-800 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center mx-auto">
              <Archive size={32} />
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                No Tests in Archive Yet
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                When you finish any Daily Target sprint, Sectional drill, or Full Mock test, your complete test session automatically archives here for 48 hours for diagnostic review.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold rounded-xl shadow-sm transition flex items-center space-x-1.5"
              >
                <Play size={13} className="fill-current" />
                <span>Start Today's Target</span>
              </Link>
              <Link
                href="/mock-test"
                className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold rounded-xl transition flex items-center space-x-1.5"
              >
                <BarChart3 size={13} />
                <span>Take Full Mock Test</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredArchives.map(test => {
              const timerInfo = timeRemainingMap[test.id] || getArchiveTimeLeft(test.expiresAt, test.completedAt);
              const formattedDate = new Date(test.completedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={test.id}
                  onClick={() => setActiveReviewSession(test)}
                  className="bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 hover:border-amber-400/60 dark:hover:border-amber-500/60 shadow-sm transition cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Test Info */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                          {test.exam}
                        </span>

                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold flex items-center space-x-1 ${
                          timerInfo.isExpired
                            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                            : timerInfo.hours < 6
                              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                        }`}>
                          <Timer size={12} />
                          <span>{timerInfo.isExpired ? 'Expired' : timerInfo.formatted}</span>
                        </span>

                        <span className="text-xs text-zinc-400">
                          Completed {formattedDate}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                        {test.testTitle}
                      </h3>

                      {/* Expiry Progress Bar */}
                      {!timerInfo.isExpired && (
                        <div className="w-48 sm:w-64 bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${
                              timerInfo.hours < 6 ? 'bg-rose-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${timerInfo.percentRemaining}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Score Badges & CTA */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                      <div className="text-right px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-800">
                        <div className="text-xs font-semibold text-zinc-400">Score</div>
                        <div className="text-sm font-black text-zinc-900 dark:text-white">
                          {test.totalScore} <span className="text-xs font-normal text-zinc-500">/ {test.maxScore}</span>
                        </div>
                      </div>

                      <div className="text-right px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-800">
                        <div className="text-xs font-semibold text-zinc-400">Accuracy</div>
                        <div className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                          {test.accuracy}%
                        </div>
                      </div>

                      <div className="text-right px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-800">
                        <div className="text-xs font-semibold text-zinc-400">Percentile</div>
                        <div className="text-sm font-black text-purple-600 dark:text-purple-400">
                          {test.percentileEstimate}%ile
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5 ml-2">
                        <button
                          onClick={() => setActiveReviewSession(test)}
                          className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold rounded-xl shadow-sm transition flex items-center space-x-1.5 shrink-0"
                        >
                          <Sparkles size={13} className="text-amber-400 dark:text-amber-600" />
                          <span>Review & Coach</span>
                          <ChevronRight size={13} />
                        </button>

                        <button
                          onClick={(e) => handleDelete(test.id, e)}
                          title="Delete this archive"
                          className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
