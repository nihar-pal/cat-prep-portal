'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Clock, 
  Calculator as CalcIcon, 
  FileText, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  AlertCircle, 
  Bookmark, 
  RotateCcw, 
  Send, 
  Maximize2,
  Minimize2,
  Menu,
  X
} from 'lucide-react';
import { Question, QuestionStatus, UserResponse, ExamType, SectionType } from '@/types/exam';
import { EXAM_CONFIGS } from '@/data/multiExamConfigs';
import { MathRenderer } from '@/components/MathRenderer';
import { CatCalculator } from '@/components/CatCalculator';

interface CatExamInterfaceProps {
  title: string;
  examType: ExamType;
  questions: Question[];
  durationMinutes: number;
  onFinishTest: (responses: Record<string, UserResponse>, totalTimeSpentSeconds: number) => void;
  onExitTest?: () => void;
}

export const CatExamInterface: React.FC<CatExamInterfaceProps> = ({
  title,
  examType,
  questions,
  durationMinutes,
  onFinishTest,
  onExitTest
}) => {
  const examConfig = EXAM_CONFIGS[examType] || EXAM_CONFIGS.CAT;

  // Group questions by section
  const sectionsList = useMemo(() => {
    const map = new Map<SectionType, Question[]>();
    questions.forEach(q => {
      const existing = map.get(q.section) || [];
      existing.push(q);
      map.set(q.section, existing);
    });
    return Array.from(map.entries()).map(([section, qs]) => ({
      section,
      questions: qs
    }));
  }, [questions]);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const currentSection = sectionsList[activeSectionIndex] || sectionsList[0];
  const sectionQuestions = currentSection ? currentSection.questions : [];

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const currentQuestion = sectionQuestions[currentQIndex] || questions[0];

  // Responses state
  const [responses, setResponses] = useState<Record<string, UserResponse>>(() => {
    const initial: Record<string, UserResponse> = {};
    questions.forEach((q, idx) => {
      initial[q.id] = {
        questionId: q.id,
        userAnswer: '',
        status: idx === 0 ? 'NOT_ANSWERED' : 'NOT_VISITED',
        timeSpentSeconds: 0
      };
    });
    return initial;
  });

  // Current inputs
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [titaInput, setTitaInput] = useState<string>('');

  // Modals & UI states
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [showQuestionPaper, setShowQuestionPaper] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isPaletteOpenMobile, setIsPaletteOpenMobile] = useState(false);

  // Timer
  const [remainingSeconds, setRemainingSeconds] = useState(durationMinutes * 60);

  // Keep question input synchronized when navigating
  useEffect(() => {
    if (!currentQuestion) return;
    const resp = responses[currentQuestion.id];
    if (resp?.userAnswer) {
      if (currentQuestion.type === 'MCQ') {
        setSelectedOption(resp.userAnswer);
        setTitaInput('');
      } else {
        setTitaInput(resp.userAnswer);
        setSelectedOption('');
      }
    } else {
      setSelectedOption('');
      setTitaInput('');
    }

    // Mark as NOT_ANSWERED if it was NOT_VISITED
    setResponses(prev => {
      const existing = prev[currentQuestion.id];
      if (existing && existing.status === 'NOT_VISITED') {
        return {
          ...prev,
          [currentQuestion.id]: {
            ...existing,
            status: 'NOT_ANSWERED'
          }
        };
      }
      return prev;
    });
  }, [currentQuestion?.id]);

  // Main countdown timer
  useEffect(() => {
    if (remainingSeconds <= 0) {
      handleFinalSubmit();
      return;
    }
    const timer = setInterval(() => {
      setRemainingSeconds(prev => prev - 1);
      // Track time spent on active question
      if (currentQuestion) {
        setResponses(prev => {
          const qResp = prev[currentQuestion.id];
          if (!qResp) return prev;
          return {
            ...prev,
            [currentQuestion.id]: {
              ...qResp,
              timeSpentSeconds: qResp.timeSpentSeconds + 1
            }
          };
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [remainingSeconds, currentQuestion?.id]);

  const formatTimer = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Status counts for Question Palette
  const paletteCounts = useMemo(() => {
    let answered = 0;
    let notAnswered = 0;
    let notVisited = 0;
    let marked = 0;
    let answeredAndMarked = 0;

    Object.values(responses).forEach(r => {
      switch (r.status) {
        case 'ANSWERED': answered++; break;
        case 'NOT_ANSWERED': notAnswered++; break;
        case 'NOT_VISITED': notVisited++; break;
        case 'MARKED_FOR_REVIEW': marked++; break;
        case 'ANSWERED_AND_MARKED': answeredAndMarked++; break;
      }
    });

    return { answered, notAnswered, notVisited, marked, answeredAndMarked, total: questions.length };
  }, [responses, questions.length]);

  // Action: Save & Next
  const handleSaveAndNext = () => {
    if (!currentQuestion) return;
    const answer = currentQuestion.type === 'MCQ' ? selectedOption : titaInput.trim();
    const newStatus: QuestionStatus = answer ? 'ANSWERED' : 'NOT_ANSWERED';

    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        userAnswer: answer,
        status: newStatus
      }
    }));

    // Move to next question if available
    if (currentQIndex < sectionQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else if (activeSectionIndex < sectionsList.length - 1) {
      // Move to next section
      setActiveSectionIndex(activeSectionIndex + 1);
      setCurrentQIndex(0);
    }
  };

  // Action: Mark for Review & Next
  const handleMarkForReviewAndNext = () => {
    if (!currentQuestion) return;
    const answer = currentQuestion.type === 'MCQ' ? selectedOption : titaInput.trim();
    const newStatus: QuestionStatus = answer ? 'ANSWERED_AND_MARKED' : 'MARKED_FOR_REVIEW';

    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        userAnswer: answer,
        status: newStatus
      }
    }));

    if (currentQIndex < sectionQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else if (activeSectionIndex < sectionsList.length - 1) {
      setActiveSectionIndex(activeSectionIndex + 1);
      setCurrentQIndex(0);
    }
  };

  // Action: Clear Response
  const handleClearResponse = () => {
    setSelectedOption('');
    setTitaInput('');
    if (!currentQuestion) return;

    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        userAnswer: '',
        status: 'NOT_ANSWERED'
      }
    }));
  };

  // Jump to specific question
  const jumpToQuestion = (secIdx: number, qIdx: number) => {
    setActiveSectionIndex(secIdx);
    setCurrentQIndex(qIdx);
    setIsPaletteOpenMobile(false);
  };

  const handleFinalSubmit = () => {
    const totalTimeSpent = (durationMinutes * 60) - remainingSeconds;
    onFinishTest(responses, totalTimeSpent);
  };

  const getStatusBadgeStyle = (status: QuestionStatus) => {
    switch (status) {
      case 'ANSWERED':
        return 'bg-emerald-600 text-white border-emerald-700'; // Green
      case 'NOT_ANSWERED':
        return 'bg-red-500 text-white border-red-600'; // Red
      case 'MARKED_FOR_REVIEW':
        return 'bg-indigo-600 text-white border-indigo-700 rounded-full'; // Purple Circle
      case 'ANSWERED_AND_MARKED':
        return 'bg-indigo-600 text-white border-indigo-700 rounded-full relative after:content-[""] after:w-2 after:h-2 after:bg-emerald-400 after:rounded-full after:absolute after:bottom-0 after:right-0'; // Purple + Green Dot
      case 'NOT_VISITED':
      default:
        return 'bg-slate-200 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'; // Grey
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-100 dark:bg-slate-950 font-sans select-none overflow-hidden">
      {/* 1. TCS iON Authentic Header */}
      <header className="bg-slate-900 border-b border-slate-800 text-white px-4 py-2 flex items-center justify-between shadow-md z-20">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white text-xs font-black px-2 py-1 rounded tracking-wider">
            {examType}
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-slate-100 truncate max-w-xs md:max-w-md">
              {title}
            </h1>
            <p className="text-[11px] text-slate-400">
              Marking: <span className="text-emerald-400 font-semibold">+{examConfig.scoring.correctMcq}</span> / <span className="text-rose-400 font-semibold">{examConfig.scoring.incorrectMcq}</span> (MCQ) &bull; <span className="text-emerald-400 font-semibold">+{examConfig.scoring.correctTita}</span> / <span className="text-slate-300 font-semibold">0</span> (TITA)
            </p>
          </div>
        </div>

        {/* Center / Right: Action Tools & Countdown */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {examConfig.hasCalculator && (
            <button
              onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded text-xs font-semibold border transition ${
                isCalculatorOpen 
                  ? 'bg-amber-600 text-white border-amber-500' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title="Official On-Screen CAT Calculator"
            >
              <CalcIcon size={14} />
              <span className="hidden sm:inline">Calculator</span>
            </button>
          )}

          <button
            onClick={() => setShowQuestionPaper(true)}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="View Full Question Paper"
          >
            <FileText size={14} />
            <span className="hidden sm:inline">Question Paper</span>
          </button>

          <button
            onClick={() => setShowInstructions(true)}
            className="flex items-center space-x-1 px-2 py-1.5 rounded text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Test Instructions"
          >
            <HelpCircle size={14} />
          </button>

          {/* Countdown Clock */}
          <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded border font-mono text-sm font-bold ${
            remainingSeconds < 300 
              ? 'bg-rose-950/80 border-rose-600 text-rose-300 animate-pulse' 
              : 'bg-slate-800 border-slate-700 text-amber-400'
          }`}>
            <Clock size={15} />
            <span>{formatTimer(remainingSeconds)}</span>
          </div>

          {/* Mobile Palette Toggle */}
          <button 
            onClick={() => setIsPaletteOpenMobile(!isPaletteOpenMobile)}
            className="lg:hidden p-1.5 bg-slate-800 text-white rounded border border-slate-700"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* 2. Section Navigation Tabs */}
      <div className="bg-slate-800 text-slate-300 px-4 py-1.5 flex items-center justify-between border-b border-slate-700 text-xs">
        <div className="flex items-center space-x-2 overflow-x-auto">
          <span className="font-semibold text-slate-400 mr-1 uppercase tracking-wider text-[11px]">Sections:</span>
          {sectionsList.map((sec, idx) => {
            const isActive = idx === activeSectionIndex;
            return (
              <button
                key={sec.section}
                onClick={() => {
                  setActiveSectionIndex(idx);
                  setCurrentQIndex(0);
                }}
                className={`px-3 py-1 rounded font-semibold transition flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-slate-900/60 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <span>{sec.section.replace(/_/g, ' ')}</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-black/30 rounded-full font-mono">
                  {sec.questions.length}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden md:flex items-center space-x-3 text-slate-400 text-[11px]">
          <span>Current Section: <strong className="text-white">{currentSection?.section?.replace(/_/g, ' ')}</strong></span>
          <span>&bull;</span>
          <span>Question <strong>{currentQIndex + 1}</strong> of <strong>{sectionQuestions.length}</strong></span>
        </div>
      </div>

      {/* 3. Main Examination Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left & Center: Question Area (Split screen if passage exists) */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-white dark:bg-slate-900">
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Context/Passage Pane (if present, e.g. RC Passage or DILR Caselet) */}
            {currentQuestion?.contextText && (
              <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-4 md:p-6 overflow-y-auto bg-slate-50 dark:bg-slate-900/50">
                <div className="sticky top-0 bg-slate-100/90 dark:bg-slate-800/90 backdrop-blur px-3 py-1.5 rounded mb-4 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Context / Reading Passage / Caselet</span>
                  <span className="text-[10px] font-normal text-slate-500">Scroll to read full text</span>
                </div>
                <MathRenderer content={currentQuestion.contextText} className="text-sm" />
              </div>
            )}

            {/* Question Pane */}
            <div className={`flex-1 p-4 md:p-6 overflow-y-auto ${currentQuestion?.contextText ? 'md:w-1/2' : 'w-full max-w-4xl mx-auto'}`}>
              {/* Question Header info */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-base text-slate-900 dark:text-white">
                    Question {currentQIndex + 1}
                  </span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    currentQuestion.type === 'TITA' 
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                  }`}>
                    {currentQuestion.type}
                  </span>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-medium">
                    {currentQuestion.topic}
                  </span>
                </div>

                <div className="text-xs text-slate-500 font-mono">
                  {currentQuestion.type === 'MCQ' ? '+3, -1' : '+3, 0'}
                </div>
              </div>

              {/* Question Statement with KaTeX */}
              <div className="mb-6">
                <MathRenderer content={currentQuestion.questionText} className="text-base text-slate-900 dark:text-slate-100" />
              </div>

              {/* Options for MCQ */}
              {currentQuestion.type === 'MCQ' && currentQuestion.options && (
                <div className="space-y-3 mt-4">
                  {currentQuestion.options.map(opt => {
                    const isSelected = selectedOption === opt.id;
                    return (
                      <label
                        key={opt.id}
                        onClick={() => setSelectedOption(opt.id)}
                        className={`flex items-start space-x-3 p-3.5 rounded-lg border cursor-pointer transition ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-500 dark:bg-blue-950/40 dark:border-blue-500 text-blue-950 dark:text-blue-100 shadow-sm'
                            : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                        }`}>
                          {opt.id}
                        </div>
                        <div className="flex-1 text-sm pt-0.5">
                          <MathRenderer content={opt.text} />
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}

              {/* TITA (Type In The Answer) input */}
              {currentQuestion.type === 'TITA' && (
                <div className="mt-6 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 max-w-md">
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-2">
                    Type In The Answer (TITA)
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    Use your keyboard or the on-screen keypad to enter your numerical or sequence response. No negative marking applies for TITA.
                  </p>
                  <input
                    type="text"
                    value={titaInput}
                    onChange={e => setTitaInput(e.target.value)}
                    placeholder="Enter answer here (e.g. 14, 2143, 2.5)"
                    className="w-full px-4 py-2.5 text-base font-mono font-bold bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white"
                  />
                  {/* Virtual Numpad helpers */}
                  <div className="grid grid-cols-4 gap-1.5 mt-3">
                    {['1','2','3','4','5','6','7','8','9','0','.','-','Clear','Bksp'].map(btn => (
                      <button
                        key={btn}
                        type="button"
                        onClick={() => {
                          if (btn === 'Clear') setTitaInput('');
                          else if (btn === 'Bksp') setTitaInput(prev => prev.slice(0, -1));
                          else setTitaInput(prev => prev + btn);
                        }}
                        className="py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded text-xs font-semibold text-slate-800 dark:text-slate-200"
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 4. Bottom Action Bar */}
          <div className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-2 z-10">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleMarkForReviewAndNext}
                className="px-3.5 py-2 text-xs font-bold rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition flex items-center space-x-1"
              >
                <Bookmark size={13} />
                <span>Mark for Review & Next</span>
              </button>

              <button
                onClick={handleClearResponse}
                className="px-3 py-2 text-xs font-semibold rounded bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 transition flex items-center space-x-1"
              >
                <RotateCcw size={13} />
                <span>Clear Response</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {currentQIndex > 0 && (
                <button
                  onClick={() => setCurrentQIndex(currentQIndex - 1)}
                  className="px-3 py-2 text-xs font-semibold rounded bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-800 dark:text-slate-300 transition flex items-center space-x-1"
                >
                  <ChevronLeft size={14} />
                  <span>Previous</span>
                </button>
              )}

              <button
                onClick={handleSaveAndNext}
                className="px-5 py-2 text-xs font-bold rounded bg-blue-600 hover:bg-blue-500 text-white shadow transition flex items-center space-x-1"
              >
                <span>Save & Next</span>
                <ChevronRight size={14} />
              </button>

              <button
                onClick={() => setShowSubmitModal(true)}
                className="px-4 py-2 text-xs font-bold rounded bg-emerald-600 hover:bg-emerald-500 text-white shadow transition flex items-center space-x-1 ml-2"
              >
                <Send size={13} />
                <span>Submit Exam</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5. TCS iON Question Palette (Desktop Right / Mobile Modal) */}
        <aside className={`fixed inset-y-0 right-0 z-30 lg:static w-72 bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-xl lg:shadow-none transition-transform duration-200 ${
          isPaletteOpenMobile ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}>
          {/* Palette Header */}
          <div className="p-3 bg-slate-200 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
            <span>Question Palette</span>
            <button 
              onClick={() => setIsPaletteOpenMobile(false)}
              className="lg:hidden text-slate-500 hover:text-slate-800 dark:text-slate-400"
            >
              <X size={16} />
            </button>
          </div>

          {/* Legend Table */}
          <div className="p-3 text-[11px] grid grid-cols-2 gap-2 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <div className="flex items-center space-x-1.5">
              <span className="w-5 h-5 flex items-center justify-center font-bold text-[10px] bg-emerald-600 text-white rounded">
                {paletteCounts.answered}
              </span>
              <span className="text-slate-600 dark:text-slate-400">Answered</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-5 h-5 flex items-center justify-center font-bold text-[10px] bg-red-500 text-white rounded">
                {paletteCounts.notAnswered}
              </span>
              <span className="text-slate-600 dark:text-slate-400">Not Answered</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-5 h-5 flex items-center justify-center font-bold text-[10px] bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded border border-slate-300 dark:border-slate-700">
                {paletteCounts.notVisited}
              </span>
              <span className="text-slate-600 dark:text-slate-400">Not Visited</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-5 h-5 flex items-center justify-center font-bold text-[10px] bg-indigo-600 text-white rounded-full">
                {paletteCounts.marked}
              </span>
              <span className="text-slate-600 dark:text-slate-400">Review</span>
            </div>
            <div className="col-span-2 flex items-center space-x-1.5">
              <span className="w-5 h-5 flex items-center justify-center font-bold text-[10px] bg-indigo-600 text-white rounded-full relative after:content-[''] after:w-1.5 after:h-1.5 after:bg-emerald-400 after:rounded-full after:absolute after:bottom-0 after:right-0">
                {paletteCounts.answeredAndMarked}
              </span>
              <span className="text-slate-600 dark:text-slate-400">Answered & Marked (Evaluated)</span>
            </div>
          </div>

          {/* Section Selector in Palette */}
          <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800/60 text-xs font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
            {currentSection?.section} ({sectionQuestions.length} Questions)
          </div>

          {/* Question Grid */}
          <div className="flex-1 p-3 overflow-y-auto">
            <div className="grid grid-cols-4 gap-2">
              {sectionQuestions.map((q, idx) => {
                const resp = responses[q.id];
                const status = resp?.status || 'NOT_VISITED';
                const isCurrent = idx === currentQIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => jumpToQuestion(activeSectionIndex, idx)}
                    className={`h-9 flex items-center justify-center font-bold text-xs border transition ${getStatusBadgeStyle(status)} ${
                      isCurrent ? 'ring-2 ring-blue-400 ring-offset-2 scale-105' : 'hover:opacity-90'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Palette Footer Actions */}
          <div className="p-3 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow"
            >
              Submit Entire Test
            </button>
          </div>
        </aside>
      </div>

      {/* 6. CAT Virtual Calculator Floating Widget */}
      <CatCalculator 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />

      {/* 7. Question Paper Modal */}
      {showQuestionPaper && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col border border-slate-200 dark:border-slate-800">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Full Question Paper &bull; {title}
              </h2>
              <button 
                onClick={() => setShowQuestionPaper(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {questions.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-blue-600">Q{idx + 1} &bull; {q.section} &bull; {q.topic}</span>
                    <span className="text-xs font-mono text-slate-500">{q.type}</span>
                  </div>
                  {q.contextText && (
                    <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 p-3 rounded mb-3 max-h-36 overflow-y-auto">
                      <MathRenderer content={q.contextText} />
                    </div>
                  )}
                  <MathRenderer content={q.questionText} className="text-sm font-medium mb-3" />
                  {q.options && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      {q.options.map(opt => (
                        <div key={opt.id} className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <strong>{opt.id}.</strong> <MathRenderer content={opt.text} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setShowQuestionPaper(false)}
                className="px-4 py-2 bg-slate-800 text-white rounded text-xs font-semibold"
              >
                Close Question Paper
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-2xl w-full p-6 border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              General Examination Instructions ({examType})
            </h2>
            <div className="text-xs space-y-3 text-slate-600 dark:text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>1. The clock will be set at the server. The countdown timer at the top right displays remaining time.</p>
              <p>2. For MCQs, selecting an option will mark it. For TITA questions, enter your numerical or sequence answer using the virtual numpad or physical keyboard.</p>
              <p>3. <strong>Evaluation Scheme:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Correct MCQ: <strong className="text-emerald-500">+{examConfig.scoring.correctMcq} Marks</strong></li>
                <li>Incorrect MCQ: <strong className="text-rose-500">{examConfig.scoring.incorrectMcq} Marks</strong></li>
                <li>Correct TITA: <strong className="text-emerald-500">+{examConfig.scoring.correctTita} Marks</strong></li>
                <li>Incorrect TITA: <strong className="text-slate-400">0 Marks (No negative marking)</strong></li>
                <li>Answered & Marked for Review: Evaluated as a valid attempt!</li>
              </ul>
              <p>4. You can click on the Question Palette at any time to navigate between questions.</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowInstructions(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded text-xs font-semibold"
              >
                Understood, Return to Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Final Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Are you sure you want to submit?
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Once submitted, you will receive your detailed scorecard, percentile estimation, and step-by-step solutions with trap analysis.
            </p>

            {/* Attempt Summary */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-3 text-xs space-y-2 mb-6 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Questions:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-600 font-semibold">Answered:</span>
                <span className="font-bold text-emerald-600">{paletteCounts.answered}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-600 font-semibold">Answered & Marked for Review:</span>
                <span className="font-bold text-indigo-600">{paletteCounts.answeredAndMarked}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-500 font-semibold">Not Answered:</span>
                <span className="font-bold text-red-500">{paletteCounts.notAnswered}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Not Visited:</span>
                <span className="font-bold text-slate-400">{paletteCounts.notVisited}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs font-semibold"
              >
                Resume Test
              </button>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  handleFinalSubmit();
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold shadow"
              >
                Yes, Submit Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
