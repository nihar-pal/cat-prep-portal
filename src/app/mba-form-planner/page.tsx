'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { MbaFormPlannerView } from '@/components/FormPlanner/MbaFormPlannerView';
import { FormulaVaultModal } from '@/components/FormulaVaultModal';
import { ExamType } from '@/types/exam';

export default function MbaFormPlannerPage() {
  const [currentExam, setCurrentExam] = useState<ExamType>('CAT');
  const [isFormulaVaultOpen, setIsFormulaVaultOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <Navbar
        currentExam={currentExam}
        onSelectExam={setCurrentExam}
        onOpenFormulaVault={() => setIsFormulaVaultOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MbaFormPlannerView />
      </main>

      <FormulaVaultModal
        isOpen={isFormulaVaultOpen}
        onClose={() => setIsFormulaVaultOpen(false)}
      />
    </div>
  );
}
