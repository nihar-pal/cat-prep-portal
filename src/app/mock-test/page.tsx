'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Play, 
  Layers, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Award, 
  Compass, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { ExamType, UserResponse, Question } from '@/types/exam';
import { CAT_DAILY_TARGETS } from '@/data/catDailyTargets';
import { EXAM_CONFIGS } from '@/data/multiExamConfigs';
import { CatExamInterface } from '@/components/TestEngine/CatExamInterface';
import { PerformanceSummary } from '@/components/Analytics/PerformanceSummary';
import { Navbar } from '@/components/Navbar';

export default function MockTestPage() {
  const [currentExam, setCurrentExam] = useState<ExamType>('CAT');
  const [activeSession, setActiveSession] = useState<{
    isRunning: boolean;
    isFinished: boolean;
    title: string;
    questions: Question[];
    durationMinutes: number;
    responses?: Record<string, UserResponse>;
    totalTimeSpentSeconds?: number;
  }>({
    isRunning: false,
    isFinished: false,
    title: '',
    questions: [],
    durationMinutes: 40
  });

  const examConfig = EXAM_CONFIGS[currentExam];

  // Combine questions from available targets to form a comprehensive mock set
  const allAvailableQuestions = CAT_DAILY_TARGETS.flatMap(t => t.questions);

  const startMockSession = (title: string, questions: Question[], durationMinutes: number) => {
    setActiveSession({
      isRunning: true,
      isFinished: false,
      title,
      questions,
      durationMinutes
    });
  };

  const handleFinishTest = (responses: Record<string, UserResponse>, totalTimeSpentSeconds: number) => {
    setActiveSession(prev => ({
      ...prev,
      isRunning: false,
      isFinished: true,
      responses,
      totalTimeSpentSeconds
    }));
  };

  if (activeSession.isRunning) {
    return (
      <CatExamInterface
        title={activeSession.title}
        examType={currentExam}
        questions={activeSession.questions}
        durationMinutes={activeSession.durationMinutes}
        onFinishTest={handleFinishTest}
        onExitTest={() => setActiveSession(prev => ({ ...prev, isRunning: false }))}
      />
    );
  }

  if (activeSession.isFinished && activeSession.responses) {
    return (
      <PerformanceSummary
        title={activeSession.title}
        examType={currentExam}
        questions={activeSession.questions}
        responses={activeSession.responses}
        totalTimeSpentSeconds={activeSession.totalTimeSpentSeconds || 0}
        onRetake={() => {
          setActiveSession(prev => ({
            ...prev,
            isRunning: true,
            isFinished: false,
            responses: undefined
          }));
        }}
        onBackToDashboard={() => {
          setActiveSession({
            isRunning: false,
            isFinished: false,
            title: '',
            questions: [],
            durationMinutes: 40
          });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <Navbar currentExam={currentExam} onSelectExam={setCurrentExam} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-blue-800/40">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
            <Layers size={16} />
            <span>TCS iON Simulation Test Engine &bull; {currentExam}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Full-Length Mock & Sectional Mocks
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Experience the identical look, feel, and cognitive pressure of the official CAT test center interface: sectional timer locks, on-screen calculator, question palette, and strict scoring.
          </p>
        </div>

        {/* Mock Test Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Full Benchmark Mock Test */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  Full Sprint Mock
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  {allAvailableQuestions.length} Questions &bull; 40 mins
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                CAT 2026 Comprehensive Benchmark Mock #1
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Full sectional coverage: High-yield VARC Reading Comprehension + Verbal Ability, DILR Games & Matrix Optimization, and Quantitative Aptitude.
              </p>
              <div className="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle size={13} className="text-emerald-500" />
                  <span>Marking: +3 for Correct MCQ, -1 for Incorrect MCQ</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle size={13} className="text-emerald-500" />
                  <span>TITA: +3 for Correct, 0 Negative Penalty</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle size={13} className="text-emerald-500" />
                  <span>Official On-Screen CAT Virtual Calculator Enabled</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => startMockSession('CAT 2026 Comprehensive Benchmark Mock #1', allAvailableQuestions, 40)}
              className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition"
            >
              <Play size={15} className="fill-current" />
              <span>Launch Authentic Test Interface</span>
            </button>
          </div>

          {/* 2. Sectional Deep-Dive Mocks */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200">
                  Sectional Drills
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  15 to 20 mins
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Individual Section Speed Drills
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Focus on your weakest section with high-concentration sprints calibrated for speed and accuracy.
              </p>

              <div className="mt-4 space-y-2">
                {/* VARC Section */}
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300">
                  <div>
                    <div className="font-bold text-xs text-slate-800 dark:text-slate-200">VARC Section Sprint</div>
                    <div className="text-[10px] text-slate-500">RC Passages + TITA Para Jumbles</div>
                  </div>
                  <button
                    onClick={() => {
                      const varcQs = allAvailableQuestions.filter(q => q.section === 'VARC');
                      startMockSession('VARC Sectional Speed Mock', varcQs, 20);
                    }}
                    className="px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg shadow-sm"
                  >
                    Start
                  </button>
                </div>

                {/* DILR Section */}
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300">
                  <div>
                    <div className="font-bold text-xs text-slate-800 dark:text-slate-200">DILR Section Sprint</div>
                    <div className="text-[10px] text-slate-500">Games & Tournaments + Matrix Allocation</div>
                  </div>
                  <button
                    onClick={() => {
                      const dilrQs = allAvailableQuestions.filter(q => q.section === 'DILR');
                      startMockSession('DILR Sectional Speed Mock', dilrQs, 20);
                    }}
                    className="px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg shadow-sm"
                  >
                    Start
                  </button>
                </div>

                {/* QA Section */}
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300">
                  <div>
                    <div className="font-bold text-xs text-slate-800 dark:text-slate-200">QA Section Sprint</div>
                    <div className="text-[10px] text-slate-500">Arithmetic, Algebra, Geometry, Numbers</div>
                  </div>
                  <button
                    onClick={() => {
                      const qaQs = allAvailableQuestions.filter(q => q.section === 'QA');
                      startMockSession('QA Sectional Speed Mock', qaQs, 20);
                    }}
                    className="px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg shadow-sm"
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
