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
  Sparkles,
  Lock,
  Unlock,
  ShieldCheck,
  Timer,
  Zap,
  Archive
} from 'lucide-react';
import { ExamType, UserResponse, Question, SectionType } from '@/types/exam';
import { EXAM_CONFIGS } from '@/data/multiExamConfigs';
import { getAllMockQuestionsForExam, EXAM_SECTION_CONFIGS } from '@/data/examTargets';
import { FULL_MOCK_EXAMS } from '@/data/fullMockExams';
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
    durationMinutes: 120
  });

  const examConfig = EXAM_CONFIGS[currentExam] || EXAM_CONFIGS.CAT;
  const sectionConfigs = EXAM_SECTION_CONFIGS[currentExam] || [];
  const fullMockDef = FULL_MOCK_EXAMS[currentExam] || FULL_MOCK_EXAMS.CAT;

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
            durationMinutes: 120
          });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <Navbar currentExam={currentExam} onSelectExam={setCurrentExam} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Banner */}
        <div className="bg-zinc-900 text-white p-6 sm:p-8 rounded-3xl shadow-sm border border-zinc-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
                <Layers size={16} />
                <span>Authentic Test Center Simulation &bull; {currentExam}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {currentExam} Official Simulation Mock Tests
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
                Experience the identical interface, cognitive pressure, and rules of the official {examConfig.fullName} test center: {examConfig.hasSectionalTimer ? 'strict sectional timer locks' : 'flexible composite navigation'}, authentic marking schemes, and pre-exam verification.
              </p>
            </div>

            <div className="flex items-center space-x-2 bg-zinc-800/80 border border-zinc-700/80 rounded-2xl px-4 py-3 shrink-0">
              <Archive size={18} className="text-amber-400 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">48h Vault Active</div>
                <div className="text-[10px] text-zinc-400">All submissions auto-archived</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mock Test Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Full Benchmark Mock Test - Exact Official Timing & Rules */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
                  Official Full Simulation
                </span>
                <span className="text-xs font-mono text-zinc-500 font-bold flex items-center space-x-1">
                  <Clock size={12} className="text-amber-500" />
                  <span>{fullMockDef.totalDurationMinutes} mins total</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  {fullMockDef.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  {fullMockDef.subtitle}
                </p>
              </div>

              {/* Exact Official Rules Checklist */}
              <div className="space-y-2 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 text-xs">
                <div className="flex items-center space-x-2 text-zinc-700 dark:text-zinc-300">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  <span>
                    <strong>Marking: </strong> 
                    +{examConfig.scoring.correctMcq} for Correct, {examConfig.scoring.incorrectMcq === 0 ? '0 Negative (No Penalty)' : `${examConfig.scoring.incorrectMcq} for Wrong`}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-zinc-700 dark:text-zinc-300">
                  {examConfig.hasSectionalTimer ? (
                    <>
                      <Lock size={14} className="text-amber-500 shrink-0" />
                      <span>
                        <strong>Sectional Locks: </strong> 
                        Strict sectional timers ({Object.entries(fullMockDef.sectionDurations).map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v}m`).join(', ')})
                      </span>
                    </>
                  ) : (
                    <>
                      <Unlock size={14} className="text-blue-500 shrink-0" />
                      <span>
                        <strong>Section Navigation: </strong> 
                        Flexible free switching permitted across all sections
                      </span>
                    </>
                  )}
                </div>

                {currentExam === 'XAT' && (
                  <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>
                      <strong>Unattempted Penalty: </strong> 
                      -0.10 marks deducted per blank question beyond 8
                    </span>
                  </div>
                )}

                <div className="flex items-center space-x-2 text-zinc-700 dark:text-zinc-300">
                  <ShieldCheck size={14} className={examConfig.hasCalculator ? "text-emerald-500 shrink-0" : "text-zinc-400 shrink-0"} />
                  <span>
                    <strong>Calculator: </strong>
                    {currentExam === 'GMAT' 
                      ? 'Permitted strictly in Data Insights section' 
                      : examConfig.hasCalculator 
                        ? 'Official on-screen virtual calculator enabled' 
                        : 'Calculators strictly prohibited (Mental Math)'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => startMockSession(fullMockDef.title, fullMockDef.questions, fullMockDef.totalDurationMinutes)}
              className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition group"
            >
              <Play size={15} className="fill-current text-amber-400 dark:text-amber-600 group-hover:scale-110 transition-transform" />
              <span>Launch Official {currentExam} Test Terminal</span>
            </button>
          </div>

          {/* 2. Sectional Deep-Dive Drills */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  Sectional Drills
                </span>
                <span className="text-xs font-mono text-zinc-500 font-bold">
                  Targeted Speed Sprints
                </span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Individual {currentExam} Section Speed Drills
              </h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Need to hone a specific weak area? Launch targeted drills with authentic sectional time allocations.
              </p>

              <div className="mt-4 space-y-2.5">
                {sectionConfigs.map(sec => {
                  const secQuestions = allAvailableQuestions.filter(q => q.section === sec.type);
                  const configSec = examConfig.sections.find(s => s.type === sec.type);
                  const duration = configSec ? configSec.durationMinutes : 20;

                  return (
                    <div 
                      key={sec.type}
                      className="flex items-center justify-between p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition bg-zinc-50/50 dark:bg-zinc-800/30"
                    >
                      <div className="pr-2">
                        <div className="font-bold text-xs text-zinc-900 dark:text-white flex items-center space-x-1.5">
                          <span>{sec.label}</span>
                          <span className="text-[10px] font-mono text-zinc-400">({duration} mins)</span>
                        </div>
                        <div className="text-[10px] text-zinc-500 truncate max-w-xs mt-0.5">
                          {sec.description}
                        </div>
                      </div>
                      <button
                        onClick={() => startMockSession(`${currentExam} ${sec.shortLabel} Sectional Drill`, secQuestions, duration)}
                        className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold rounded-xl shadow-sm transition shrink-0 ml-2"
                      >
                        Start ({secQuestions.length} Qs)
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-[11px] text-zinc-400 text-center pt-2">
              All sectional drill scores and proofs auto-archive to the <Link href="/archives" className="underline font-bold text-amber-600 dark:text-amber-400">48-Hour Vault</Link>.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
