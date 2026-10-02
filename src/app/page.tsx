'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { DailyTargetHub } from '@/components/DailyTargets/DailyTargetHub';
import { CatExamInterface } from '@/components/TestEngine/CatExamInterface';
import { PerformanceSummary } from '@/components/Analytics/PerformanceSummary';
import { FormulaVaultModal } from '@/components/FormulaVaultModal';
import { ExamType, DailyTarget, UserResponse, Question } from '@/types/exam';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [currentExam, setCurrentExam] = useState<ExamType>('CAT');
  const [isFormulaVaultOpen, setIsFormulaVaultOpen] = useState(false);

  // Active Test Session State
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
    durationMinutes: 35
  });

  const handleStartTarget = (target: DailyTarget, isTimed: boolean, filterSection?: string) => {
    let targetQuestions = target.questions;
    if (filterSection) {
      targetQuestions = targetQuestions.filter(q => q.section === filterSection);
    }

    const duration = isTimed ? (filterSection ? 15 : target.estimatedMinutes) : 180; // 3 hours if practice mode

    setActiveSession({
      isRunning: true,
      isFinished: false,
      title: `${target.title}${filterSection ? ` (${filterSection.replace(/_/g, ' ')} Sprint)` : ''}${isTimed ? '' : ' - Practice Mode'}`,
      questions: targetQuestions,
      durationMinutes: duration
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

  // If a test is active, show the authentic TCS iON test screen
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

  // If a test finished, show the comprehensive diagnostic performance summary
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
            durationMinutes: 35
          });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      {/* Top Navigation */}
      <Navbar
        currentExam={currentExam}
        onSelectExam={setCurrentExam}
        onOpenFormulaVault={() => setIsFormulaVaultOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DailyTargetHub
          currentExam={currentExam}
          onStartTarget={handleStartTarget}
          onOpenAiGenerator={() => router.push('/ai-generator')}
          onOpenFormulaVault={() => setIsFormulaVaultOpen(true)}
        />
      </main>

      {/* Formula & Trap Cheat Sheet Modal */}
      <FormulaVaultModal
        isOpen={isFormulaVaultOpen}
        onClose={() => setIsFormulaVaultOpen(false)}
      />
    </div>
  );
}
