'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Flame, 
  BookOpen, 
  Target, 
  Sparkles, 
  Bookmark, 
  Layers, 
  Calculator, 
  ChevronDown,
  Menu,
  X,
  Compass
} from 'lucide-react';
import { ExamType } from '@/types/exam';
import { EXAM_CONFIGS } from '@/data/multiExamConfigs';
import { CatCalculator } from '@/components/CatCalculator';

interface NavbarProps {
  currentExam: ExamType;
  onSelectExam: (exam: ExamType) => void;
  onOpenFormulaVault?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentExam, 
  onSelectExam,
  onOpenFormulaVault 
}) => {
  const pathname = usePathname();
  const [isExamDropdownOpen, setIsExamDropdownOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const exams: ExamType[] = ['CAT', 'XAT', 'NMAT', 'SNAP'];
  const activeConfig = EXAM_CONFIGS[currentExam];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Exam Badge */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center shadow-lg shadow-blue-500/20 font-black text-lg">
                  C
                </div>
                <div>
                  <span className="font-black text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                    CAT<span className="text-blue-500">Prep</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-widest leading-none">
                    Multi-Exam Master
                  </span>
                </div>
              </Link>

              {/* Multi-Exam Switcher Pill */}
              <div className="relative ml-2">
                <button
                  onClick={() => setIsExamDropdownOpen(!isExamDropdownOpen)}
                  className="flex items-center space-x-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-lg text-xs font-bold transition shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  <span className="text-blue-400">{currentExam}</span>
                  <ChevronDown size={12} className="text-slate-400" />
                </button>

                {isExamDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 z-50">
                    <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                      Switch Target Exam
                    </div>
                    {exams.map(ex => {
                      const cfg = EXAM_CONFIGS[ex];
                      const isSelected = ex === currentExam;
                      return (
                        <button
                          key={ex}
                          onClick={() => {
                            onSelectExam(ex);
                            setIsExamDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition flex items-center justify-between ${
                            isSelected 
                              ? 'bg-blue-600 text-white font-bold' 
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <div>
                            <div className="font-bold">{cfg.name}</div>
                            <div className="text-[10px] text-slate-400 truncate max-w-[140px]">{cfg.fullName}</div>
                          </div>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30">
                            {cfg.totalQuestions} Qs
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 ${
                  pathname === '/' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Target size={14} />
                <span>Daily Targets</span>
              </Link>

              <Link
                href="/mock-test"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 ${
                  pathname.startsWith('/mock-test') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Layers size={14} />
                <span>Full Mock Engine</span>
              </Link>

              <Link
                href="/mistake-book"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 ${
                  pathname.startsWith('/mistake-book') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Bookmark size={14} />
                <span>Mistake Book</span>
              </Link>

              <Link
                href="/ai-generator"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 ${
                  pathname.startsWith('/ai-generator') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Sparkles size={14} className="text-amber-400" />
                <span>AI Question Lab</span>
              </Link>
            </div>

            {/* Right Tools: Streak, Formula Vault, Calculator */}
            <div className="flex items-center space-x-2.5">
              {/* Daily Streak Indicator */}
              <div 
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold"
                title="Daily Study Streak: 5 Days active"
              >
                <Flame size={15} className="text-amber-400 fill-amber-500 animate-bounce" />
                <span>5 Day Streak</span>
              </div>

              {/* Formula Vault Button */}
              {onOpenFormulaVault && (
                <button
                  onClick={onOpenFormulaVault}
                  className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                  title="Formulas, Shortcuts & Trap Vault"
                >
                  <BookOpen size={14} />
                  <span>Cheat Sheets</span>
                </button>
              )}

              {/* Calculator Toggle */}
              {activeConfig.hasCalculator && (
                <button
                  onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
                  className={`p-1.5 rounded-lg border text-xs transition ${
                    isCalculatorOpen
                      ? 'bg-amber-600 text-white border-amber-500'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                  title="CAT On-Screen Calculator"
                >
                  <Calculator size={16} />
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 pt-2 pb-4 space-y-2">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-xs font-semibold hover:bg-slate-800 text-slate-200"
            >
              Daily Target Questions
            </Link>
            <Link
              href="/mock-test"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-xs font-semibold hover:bg-slate-800 text-slate-200"
            >
              TCS iON Full Mock Test
            </Link>
            <Link
              href="/mistake-book"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-xs font-semibold hover:bg-slate-800 text-slate-200"
            >
              My Mistake Notebook
            </Link>
            <Link
              href="/ai-generator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-xs font-semibold hover:bg-slate-800 text-slate-200"
            >
              AI Question Lab (Unlimited Qs)
            </Link>
            {onOpenFormulaVault && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenFormulaVault();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold hover:bg-slate-800 text-slate-200"
              >
                Formula Cheat Sheets
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Floating Calculator */}
      <CatCalculator 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />
    </>
  );
};
