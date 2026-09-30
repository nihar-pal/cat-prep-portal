'use client';

import React, { useState } from 'react';
import { X, Search, BookOpen, Zap, AlertTriangle, ChevronRight } from 'lucide-react';
import { FORMULA_CHEAT_SHEETS } from '@/data/catDailyTargets';
import { MathRenderer } from '@/components/MathRenderer';

interface FormulaVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaVaultModal: React.FC<FormulaVaultModalProps> = ({ isOpen, onClose }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const currentCategory = FORMULA_CHEAT_SHEETS[activeCategoryIndex] || FORMULA_CHEAT_SHEETS[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col border border-slate-200 dark:border-slate-800 overflow-hidden font-sans">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <BookOpen size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold">CAT Formula, Shortcut & Trap Vault</h2>
              <p className="text-[11px] text-slate-400">High-yield revision cheat sheets for QA, VARC & DILR</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Navigation Tabs */}
        <div className="bg-slate-100 dark:bg-slate-950 px-6 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center space-x-2 overflow-x-auto text-xs">
          {FORMULA_CHEAT_SHEETS.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategoryIndex(idx)}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition shrink-0 ${
                idx === activeCategoryIndex
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {currentCategory.subcategories.map((sub, sIdx) => (
            <div key={sIdx} className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center space-x-1.5">
                <ChevronRight size={14} />
                <span>{sub.title}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sub.formulas.map((item, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700 transition"
                  >
                    <div className="font-bold text-xs text-slate-800 dark:text-slate-200 mb-1.5">
                      {item.name}
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-mono my-2 text-center overflow-x-auto">
                      <MathRenderer content={`$$${item.formula}$$`} />
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-start space-x-1">
                      <Zap size={12} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>{item.notes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>CAT & OMETs High-Yield Cheatsheet</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-xs hover:opacity-90 transition"
          >
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
};
