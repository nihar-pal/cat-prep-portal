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
  Building2,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { ExamType } from '@/types/exam';
import { EXAM_CONFIGS } from '@/data/multiExamConfigs';
import { CatCalculator } from '@/components/CatCalculator';
import { CuteCatLogo } from '@/components/CuteCatLogo';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/Auth/AuthModal';

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
  const { user, logout } = useAuth();

  const [isExamDropdownOpen, setIsExamDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const exams: ExamType[] = ['CAT', 'XAT', 'NMAT', 'SNAP'];
  const activeConfig = EXAM_CONFIGS[currentExam];

  const openLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthMode('register');
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2.5 group">
                <CuteCatLogo size={36} className="group-hover:scale-105 transition-transform" />
                <div className="flex flex-col">
                  <div className="flex items-baseline space-x-1">
                    <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
                      Crepe
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider -mt-1">
                    CAT & MBA Command
                  </span>
                </div>
              </Link>

              {/* Minimalist Multi-Exam Pill */}
              <div className="relative ml-2">
                <button
                  onClick={() => setIsExamDropdownOpen(!isExamDropdownOpen)}
                  className="flex items-center space-x-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200/70 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-bold transition"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-slate-900 dark:text-white font-mono">{currentExam}</span>
                  <ChevronDown size={11} className="text-slate-400" />
                </button>

                {isExamDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-52 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-1.5 z-50">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
                      Switch Active Exam
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
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs transition flex items-center justify-between ${
                            isSelected 
                              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold' 
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div>
                            <div className="font-bold">{cfg.name}</div>
                            <div className="text-[10px] opacity-70 truncate max-w-[120px]">{cfg.fullName}</div>
                          </div>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">
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
            <div className="hidden lg:flex items-center space-x-1 text-xs font-semibold">
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-full transition flex items-center space-x-1.5 ${
                  pathname === '/' 
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <Target size={14} />
                <span>Daily Targets</span>
              </Link>

              <Link
                href="/colleges"
                className={`px-3 py-1.5 rounded-full transition flex items-center space-x-1.5 ${
                  pathname.startsWith('/colleges') 
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <Building2 size={14} />
                <span>College Tracker</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              </Link>

              <Link
                href="/mock-test"
                className={`px-3 py-1.5 rounded-full transition flex items-center space-x-1.5 ${
                  pathname.startsWith('/mock-test') 
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <Layers size={14} />
                <span>Full Mocks</span>
              </Link>

              <Link
                href="/mistake-book"
                className={`px-3 py-1.5 rounded-full transition flex items-center space-x-1.5 ${
                  pathname.startsWith('/mistake-book') 
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <Bookmark size={14} />
                <span>Mistake Book</span>
              </Link>

              <Link
                href="/ai-generator"
                className={`px-3 py-1.5 rounded-full transition flex items-center space-x-1.5 ${
                  pathname.startsWith('/ai-generator') 
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <Sparkles size={14} className="text-amber-500" />
                <span>AI Question Lab</span>
              </Link>
            </div>

            {/* Right Tools: Streak, Calculator, Auth Profile */}
            <div className="flex items-center space-x-2">
              {/* Daily Streak Indicator */}
              <div 
                className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold"
                title="Active study streak"
              >
                <Flame size={14} className="text-amber-500 fill-amber-500" />
                <span>{user?.studyStreakDays || 5}d Streak</span>
              </div>

              {/* Cheat sheets */}
              {onOpenFormulaVault && (
                <button
                  onClick={onOpenFormulaVault}
                  className="hidden md:flex items-center space-x-1 px-2.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
                  title="Formulas & Traps"
                >
                  <BookOpen size={14} />
                  <span>Cheat Sheets</span>
                </button>
              )}

              {/* Calculator Toggle */}
              {activeConfig.hasCalculator && (
                <button
                  onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
                  className={`p-2 rounded-full border text-xs transition ${
                    isCalculatorOpen
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 hover:text-slate-900 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                  title="CAT On-Screen Calculator"
                >
                  <Calculator size={15} />
                </button>
              )}

              {/* User Authentication Menu / Button */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden sm:inline">
                      {user.name}
                    </span>
                    <ChevronDown size={11} className="text-slate-400" />
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-50 text-xs">
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                        <div className="font-bold text-slate-900 dark:text-white truncate">{user.name}</div>
                        <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                        <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold mt-1">
                          Goal: {user.targetExam} ({user.targetPercentile})
                        </div>
                      </div>

                      <Link
                        href="/colleges"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                      >
                        <Building2 size={14} />
                        <span>Tracked Colleges ({user.savedCollegeIds.length})</span>
                      </Link>

                      <Link
                        href="/mistake-book"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                      >
                        <Bookmark size={14} />
                        <span>My Mistake Log</span>
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition text-left mt-1 border-t border-slate-100 dark:border-slate-800 pt-2"
                      >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={openLogin}
                    className="px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    Log In
                  </button>
                  <button
                    onClick={openRegister}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 shadow-sm transition"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 rounded-full text-slate-600 hover:text-slate-900 dark:text-slate-300"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-2 text-xs">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              Daily Target Questions
            </Link>
            <Link
              href="/colleges"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-900 text-amber-600 dark:text-amber-400 font-bold"
            >
              College Application Tracker 🎓
            </Link>
            <Link
              href="/mock-test"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              TCS iON Full Mock Test
            </Link>
            <Link
              href="/mistake-book"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              My Mistake Notebook
            </Link>
            <Link
              href="/ai-generator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              AI Question Lab
            </Link>
          </div>
        )}
      </nav>

      {/* Floating Calculator */}
      <CatCalculator 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};
