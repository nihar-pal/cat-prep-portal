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
import { ExamType, UserResponse, Question, SectionType } from '@/types/exam';
import { EXAM_CONFIGS } from '@/data/multiExamConfigs';
import { getAllMockQuestionsForExam, EXAM_SECTION_CONFIGS } from '@/data/examTargets';
import { CatExamInterface } from '@/components/TestEngine/CatExamInterface';
import { PerformanceSummary } from '@/components/Analytics/PerformanceSummary';
import { Navbar } from '@/components/Navbar';
import { saveTestToArchive } from '@/utils/archiveStorage';

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

  const examConfig = EXAM_CONFIGS[currentExam] || EXAM_CONFIGS.CAT;
  const sectionConfigs = EXAM_SECTION_CONFIGS[currentExam] || [];

  // Combine questions for currently active exam
  const allAvailableQuestions = React.useMemo(() => getAllMockQuestionsForExam(currentExam), [currentExam]);

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
    try {
      saveTestToArchive({
        testTitle: activeSession.title,
        exam: currentExam,
        questions: activeSession.questions,
        responses,
        totalTimeSeconds: totalTimeSpentSeconds
      });
    } catch (e) {
      console.error('Failed to auto-archive mock test:', e);
    }

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
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-800">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
            <Layers size={16} />
            <span>TCS iON Simulation Test Engine &bull; {currentExam}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {currentExam} Full-Length & Sectional Mocks
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Experience the identical look, feel, and cognitive pressure of the official {examConfig.fullName} test center: {examConfig.hasSectionalTimer ? 'sectional timer locks' : 'flexible sectional navigation'}, question palette, and authentic scoring rules.
          </p>
        </div>

        {/* Mock Test Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Full Benchmark Mock Test */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200">
                  Full Sprint Mock
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  {allAvailableQuestions.length} Questions &bull; 40 mins
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {currentExam} 2026 Comprehensive Benchmark Mock #1
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Full authentic {currentExam} sectional coverage with official difficulty weighting, subtle distractor traps, and detailed post-test diagnostic proofs.
              </p>
              <div className="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle size={13} className="text-emerald-500" />
                  <span>
                    Marking: +{examConfig.scoring.correctMcq} for Correct, {examConfig.scoring.incorrectMcq === 0 ? '0 Negative Marking (No Penalty!)' : `${examConfig.scoring.incorrectMcq} for Incorrect`}
                  </span>
                </div>
                {currentExam === 'XAT' && (
                  <div className="flex items-center space-x-1.5">
                    <AlertCircle size={13} className="text-amber-500" />
                    <span>Unattempted Question Penalty: -0.10 marks after 8 skipped questions</span>
                  </div>
                )}
                <div className="flex items-center space-x-1.5">
                  <CheckCircle size={13} className={examConfig.hasCalculator ? "text-emerald-500" : "text-amber-500"} />
                  <span>
                    {examConfig.hasCalculator 
                      ? 'Official On-Screen Virtual Calculator Enabled' 
                      : 'Calculators Strictly Prohibited (Mental Math & Fast Approximations Required)'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => startMockSession(`${currentExam} 2026 Comprehensive Benchmark Mock #1`, allAvailableQuestions, 40)}
              className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition"
            >
              <Play size={15} className="fill-current" />
              <span>Launch Authentic {currentExam} Test Interface</span>
            </button>
          </div>

          {/* 2. Sectional Deep-Dive Mocks */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  Sectional Drills
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  15 to 20 mins
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Individual {currentExam} Section Speed Drills
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Focus on your target section with high-concentration sprints calibrated for speed and accuracy.
              </p>

              <div className="mt-4 space-y-2">
                {sectionConfigs.map(sec => {
                  const secQuestions = allAvailableQuestions.filter(q => q.section === sec.type);
                  return (
                    <div 
                      key={sec.type}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300"
                    >
                      <div>
                        <div className="font-bold text-xs text-slate-800 dark:text-slate-200">
                          {sec.label} Sprint
                        </div>
                        <div className="text-[10px] text-slate-500 truncate max-w-xs">
                          {sec.description}
                        </div>
                      </div>
                      <button
                        onClick={() => startMockSession(`${currentExam} ${sec.shortLabel} Sectional Speed Mock`, secQuestions, 20)}
                        className="px-3.5 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-lg shadow-sm hover:opacity-90 shrink-0 ml-2"
                      >
                        Start ({secQuestions.length} Qs)
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
