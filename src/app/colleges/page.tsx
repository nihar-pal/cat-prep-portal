'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { CollegeTrackerView } from '@/components/CollegeTracker/CollegeTrackerView';
import { FormulaVaultModal } from '@/components/FormulaVaultModal';
import { ExamType } from '@/types/exam';

export default function CollegesPage() {
  const [currentExam, setCurrentExam] = useState<ExamType>('CAT');
  const [isFormulaVaultOpen, setIsFormulaVaultOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <Navbar
        currentExam={currentExam}
        onSelectExam={setCurrentExam}
        onOpenFormulaVault={() => setIsFormulaVaultOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CollegeTrackerView />
      </main>

      <FormulaVaultModal
        isOpen={isFormulaVaultOpen}
        onClose={() => setIsFormulaVaultOpen(false)}
      />
    </div>
  );
}
