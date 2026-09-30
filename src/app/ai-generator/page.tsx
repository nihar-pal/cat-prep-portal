'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { AIQuestionGenerator } from '@/components/AIQuestionGenerator';
import { FormulaVaultModal } from '@/components/FormulaVaultModal';
import { ExamType } from '@/types/exam';

export default function AiGeneratorPage() {
  const [currentExam, setCurrentExam] = useState<ExamType>('CAT');
  const [isFormulaVaultOpen, setIsFormulaVaultOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <Navbar
        currentExam={currentExam}
        onSelectExam={setCurrentExam}
        onOpenFormulaVault={() => setIsFormulaVaultOpen(true)}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <AIQuestionGenerator />
      </main>

      <FormulaVaultModal
        isOpen={isFormulaVaultOpen}
        onClose={() => setIsFormulaVaultOpen(false)}
      />
    </div>
  );
}
