'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProfileEvaluatorView } from '@/components/ProfileEvaluator/ProfileEvaluatorView';
import { FormulaVaultModal } from '@/components/FormulaVaultModal';
import { ExamType } from '@/types/exam';

export default function ProfileEvaluatorPage() {
  const [currentExam, setCurrentExam] = useState<ExamType>('CAT');
  const [isFormulaVaultOpen, setIsFormulaVaultOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50/70 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100">
      <Navbar
        currentExam={currentExam}
        onSelectExam={setCurrentExam}
        onOpenFormulaVault={() => setIsFormulaVaultOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileEvaluatorView />
      </main>

      <FormulaVaultModal
        isOpen={isFormulaVaultOpen}
        onClose={() => setIsFormulaVaultOpen(false)}
      />
    </div>
  );
}
