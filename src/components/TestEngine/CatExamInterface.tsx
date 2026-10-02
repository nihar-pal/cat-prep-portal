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
  X,
  Lock,
  Unlock,
  ShieldCheck,
  User,
  AlertTriangle,
  Play,
  ArrowRight,
  Info
} from 'lucide-react';
import { Question, QuestionStatus, UserResponse, ExamType, SectionType } from '@/types/exam';
import { EXAM_CONFIGS } from '@/data/multiExamConfigs';
import { MathRenderer } from '@/components/MathRenderer';
import { CatCalculator } from '@/components/CatCalculator';
import { useAuth } from '@/context/AuthContext';
import { CuteCatLogo } from '@/components/CuteCatLogo';

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
  const { user } = useAuth();
  const examConfig = EXAM_CONFIGS[examType] || EXAM_CONFIGS.CAT;

  // Stages: 'INSTRUCTIONS' (authentic pre-exam screen) -> 'TEST' -> 'FINISH'
  const [testStage, setTestStage] = useState<'INSTRUCTIONS' | 'TEST'>('INSTRUCTIONS');
  const [declarationAccepted, setDeclarationAccepted] = useState(false);

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

  // Section Tracking
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [completedSectionIndices, setCompletedSectionIndices] = useState<number[]>([]);
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
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showSectionSubmitModal, setShowSectionSubmitModal] = useState(false);
  const [showFinalSubmitModal, setShowFinalSubmitModal] = useState(false);
  const [isPaletteOpenMobile, setIsPaletteOpenMobile] = useState(false);
  const [sectionTransitionAlert, setSectionTransitionAlert] = useState<string | null>(null);
  const [sectionLockWarning, setSectionLockWarning] = useState<string | null>(null);

  // Determine section duration
  const getSectionDurationSeconds = (secIndex: number) => {
    if (!examConfig.hasSectionalTimer) {
      return durationMinutes * 60;
    }
    const secObj = sectionsList[secIndex];
    if (secObj) {
      const foundInConfig = examConfig.sections.find(s => s.type === secObj.section);
      if (foundInConfig) {
        return foundInConfig.durationMinutes * 60;
      }
    }
    // Fallback split evenly
    return Math.floor((durationMinutes * 60) / Math.max(1, sectionsList.length));
  };

  // Sectional Timer state & Overall Timer state
  const [sectionRemainingSeconds, setSectionRemainingSeconds] = useState(() => getSectionDurationSeconds(0));
  const [overallTotalElapsedSeconds, setOverallTotalElapsedSeconds] = useState(0);
  const [compositeRemainingSeconds, setCompositeRemainingSeconds] = useState(durationMinutes * 60);

  // Reset section timer when changing section
  useEffect(() => {
    if (examConfig.hasSectionalTimer && testStage === 'TEST') {
      setSectionRemainingSeconds(getSectionDurationSeconds(activeSectionIndex));
    }
  }, [activeSectionIndex, testStage]);

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

  // Timer Tick Hook
  useEffect(() => {
    if (testStage !== 'TEST') return;

    const timer = setInterval(() => {
      setOverallTotalElapsedSeconds(prev => prev + 1);

      // 1. If sectional timer applies (CAT, GMAT, NMAT)
      if (examConfig.hasSectionalTimer) {
        setSectionRemainingSeconds(prev => {
          if (prev <= 1) {
            // Auto transition to next section or auto submit
            handleSectionTimeExpired();
            return 0;
          }
          return prev - 1;
        });
      } else {
        // 2. If composite timer applies (XAT, SNAP)
        setCompositeRemainingSeconds(prev => {
          if (prev <= 1) {
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        });
      }

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
  }, [testStage, activeSectionIndex, currentQuestion?.id, examConfig.hasSectionalTimer]);

  // Handle Section Time Expiry (Auto-Advance in CAT/GMAT/NMAT)
  const handleSectionTimeExpired = () => {
    const isLastSection = activeSectionIndex >= sectionsList.length - 1;
    if (isLastSection) {
      handleFinalSubmit();
    } else {
      const completedSecName = sectionsList[activeSectionIndex]?.section.replace(/_/g, ' ');
      const nextSecIndex = activeSectionIndex + 1;
      const nextSecName = sectionsList[nextSecIndex]?.section.replace(/_/g, ' ');
      
      setCompletedSectionIndices(prev => [...prev, activeSectionIndex]);
      setActiveSectionIndex(nextSecIndex);
      setCurrentQIndex(0);
      setSectionTransitionAlert(
        `Time has expired for Section ${activeSectionIndex + 1} (${completedSecName}). Your responses have been saved and locked. You are now entering Section ${nextSecIndex + 1}: ${nextSecName}.`
      );
    }
  };

  // Move to next section manually after user confirms
  const handleConfirmSectionSubmit = () => {
    setShowSectionSubmitModal(false);
    const isLastSection = activeSectionIndex >= sectionsList.length - 1;
    if (isLastSection) {
      handleFinalSubmit();
    } else {
      const completedSecName = sectionsList[activeSectionIndex]?.section.replace(/_/g, ' ');
      const nextSecIndex = activeSectionIndex + 1;
      const nextSecName = sectionsList[nextSecIndex]?.section.replace(/_/g, ' ');

      setCompletedSectionIndices(prev => [...prev, activeSectionIndex]);
      setActiveSectionIndex(nextSecIndex);
      setCurrentQIndex(0);
      setSectionTransitionAlert(
        `Section ${activeSectionIndex + 1} (${completedSecName}) submitted successfully. You are now in Section ${nextSecIndex + 1}: ${nextSecName}.`
      );
    }
  };

  // Section Tab Click Handler
  const handleSelectSectionTab = (targetSecIdx: number) => {
    if (targetSecIdx === activeSectionIndex) return;

    if (!examConfig.allowSectionSwitching) {
      if (completedSectionIndices.includes(targetSecIdx)) {
        setSectionLockWarning(`Section ${targetSecIdx + 1} has already been submitted and locked. Under official ${examType} rules, candidates cannot revisit completed sections.`);
      } else {
        setSectionLockWarning(`Section switching is locked in ${examType}. You must complete or submit the active section before moving forward.`);
      }
      setTimeout(() => setSectionLockWarning(null), 4000);
      return;
    }

    // If section switching is allowed (XAT, SNAP)
    setActiveSectionIndex(targetSecIdx);
    setCurrentQIndex(0);
  };

  const formatTimer = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

  // Section specific counts
  const currentSectionCounts = useMemo(() => {
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;

    sectionQuestions.forEach(q => {
      const resp = responses[q.id];
      if (resp?.status === 'ANSWERED' || resp?.status === 'ANSWERED_AND_MARKED') answered++;
      else if (resp?.status === 'NOT_ANSWERED') notAnswered++;
      if (resp?.status === 'MARKED_FOR_REVIEW' || resp?.status === 'ANSWERED_AND_MARKED') marked++;
    });

    return { answered, notAnswered, marked, total: sectionQuestions.length };
  }, [responses, sectionQuestions]);

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

    // Move to next question within current section
    if (currentQIndex < sectionQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // Reached end of current section
      if (examConfig.hasSectionalTimer) {
        setShowSectionSubmitModal(true);
      } else if (activeSectionIndex < sectionsList.length - 1) {
        setActiveSectionIndex(activeSectionIndex + 1);
        setCurrentQIndex(0);
      } else {
        setShowFinalSubmitModal(true);
      }
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
    } else {
      if (examConfig.hasSectionalTimer) {
        setShowSectionSubmitModal(true);
      } else if (activeSectionIndex < sectionsList.length - 1) {
        setActiveSectionIndex(activeSectionIndex + 1);
        setCurrentQIndex(0);
      } else {
        setShowFinalSubmitModal(true);
      }
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
  const jumpToQuestion = (qIdx: number) => {
    setCurrentQIndex(qIdx);
    setIsPaletteOpenMobile(false);
  };

  const handleFinalSubmit = () => {
    onFinishTest(responses, overallTotalElapsedSeconds);
  };

  const getStatusBadgeStyle = (status: QuestionStatus) => {
    switch (status) {
      case 'ANSWERED':
        return 'bg-emerald-600 text-white border-emerald-700';
      case 'NOT_ANSWERED':
        return 'bg-red-500 text-white border-red-600';
      case 'MARKED_FOR_REVIEW':
        return 'bg-indigo-600 text-white border-indigo-700 rounded-full';
      case 'ANSWERED_AND_MARKED':
        return 'bg-indigo-600 text-white border-indigo-700 rounded-full relative after:content-[""] after:w-2 after:h-2 after:bg-emerald-400 after:rounded-full after:absolute after:bottom-0 after:right-0';
      case 'NOT_VISITED':
      default:
        return 'bg-slate-200 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  // Calculator logic for GMAT: Enabled ONLY in Data Insights
  const isCalculatorAllowedInCurrentSection = useMemo(() => {
    if (examType === 'GMAT') {
      return currentSection?.section === 'Data_Insights';
    }
    return examConfig.hasCalculator;
  }, [examType, currentSection?.section, examConfig.hasCalculator]);

  // =========================================================================
  // VIEW 1: AUTHENTIC PRE-EXAM INSTRUCTIONS & CANDIDATE VERIFICATION SCREEN
  // =========================================================================
  if (testStage === 'INSTRUCTIONS') {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 select-none flex flex-col justify-between">
        {/* TCS iON Official Header */}
        <header className="bg-slate-900 border-b border-slate-800 text-white px-4 sm:px-8 py-3 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <CuteCatLogo size={28} />
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Official Examination Terminal &bull; {examType}
              </div>
              <h1 className="text-sm sm:text-base font-black tracking-tight text-white">
                {title}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono text-slate-400">
            <span className="hidden sm:inline">System: <strong className="text-white">NODE-C042</strong></span>
            <span>Center: <strong className="text-white">ION-DIGITAL-7712</strong></span>
          </div>
        </header>

        {/* Center Instructions Container */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 w-full flex-1 overflow-y-auto space-y-6">
          {/* Candidate Profile Strip */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white font-black text-xl flex items-center justify-center shadow-sm">
                {(user?.name || 'Candidate').charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400">
                  Registered Candidate Terminal
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {user?.name || 'Nihar Pal (Candidate)'}
                </h2>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  Roll No: <span className="font-semibold text-slate-700 dark:text-slate-300">{examType}-2026-98412</span> &bull; Medium: <span className="font-semibold text-slate-700 dark:text-slate-300">English</span>
                </div>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-200 dark:sm:border-slate-800 sm:pl-6 text-xs space-y-1">
              <div className="text-slate-500 font-medium">Exam Blueprint:</div>
              <div className="font-bold text-slate-900 dark:text-white font-mono">
                {sectionsList.length} Sections &bull; {questions.length} Questions &bull; {durationMinutes} Mins
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Status: Verified & Ready
              </div>
            </div>
          </div>

          {/* Official Instructions Content */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Info size={18} className="text-amber-500" />
                <span>Please Read the Following Instructions Carefully</span>
              </h3>
            </div>

            {/* General Instructions Text */}
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
              <p>
                <strong>1. Total Duration:</strong> The total duration of this examination is <strong>{durationMinutes} minutes</strong>. The server clock controls the test timing. A real-time countdown timer in the top-right corner indicates the remaining time.
              </p>
              
              {examConfig.hasSectionalTimer ? (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-medium">
                  <strong>⚠️ Strict Sectional Timer Protocol ({examType}):</strong> This examination features independent sectional timers. You are allotted fixed minutes per section. Section switching is <strong>strictly locked</strong>. When a section timer expires (or when you confirm section submission), that section is permanently locked and you cannot return to it.
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 font-medium">
                  <strong>ℹ️ Flexible Section Navigation ({examType}):</strong> You have a composite timer of {durationMinutes} minutes. You are permitted to switch between sections at any time during the test.
                </div>
              )}

              {/* Section Details Table */}
              <div className="pt-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 mb-2">Sectional Breakdown & Structure:</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5">Section Name</th>
                        <th className="p-2.5">Questions</th>
                        <th className="p-2.5">Duration</th>
                        <th className="p-2.5">Calculator</th>
                        <th className="p-2.5">Marking Scheme</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {sectionsList.map((sec, i) => {
                        const secDuration = Math.round(getSectionDurationSeconds(i) / 60);
                        const isCalcAllowed = examType === 'GMAT' ? sec.section === 'Data_Insights' : examConfig.hasCalculator;
                        return (
                          <tr key={sec.section} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                            <td className="p-2.5 font-bold text-slate-800 dark:text-slate-200">{sec.section.replace(/_/g, ' ')}</td>
                            <td className="p-2.5 font-mono">{sec.questions.length} Qs</td>
                            <td className="p-2.5 font-mono">{secDuration} mins</td>
                            <td className="p-2.5">
                              {isCalcAllowed ? (
                                <span className="text-emerald-600 font-bold">Enabled</span>
                              ) : (
                                <span className="text-slate-400">Prohibited</span>
                              )}
                            </td>
                            <td className="p-2.5 font-mono">+{examConfig.scoring.correctMcq} / {examConfig.scoring.incorrectMcq}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Question Palette Symbols */}
              <div className="pt-3">
                <div className="font-bold text-slate-800 dark:text-slate-200 mb-2">Question Palette Status Legend:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <span className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs bg-slate-200 text-slate-700 border border-slate-300 dark:bg-slate-700 dark:text-slate-200">1</span>
                    <span>You have not visited the question yet.</span>
                  </div>
                  <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <span className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs bg-red-500 text-white">2</span>
                    <span>You have not answered the question.</span>
                  </div>
                  <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <span className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs bg-emerald-600 text-white">3</span>
                    <span>You have answered the question.</span>
                  </div>
                  <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs bg-indigo-600 text-white">4</span>
                    <span>You have marked the question for review without answering.</span>
                  </div>
                  <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 sm:col-span-2">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs bg-indigo-600 text-white relative after:content-[''] after:w-2 after:h-2 after:bg-emerald-400 after:rounded-full after:absolute after:bottom-0 after:right-0">5</span>
                    <span>The question is answered and marked for review (<strong>This will be evaluated</strong>).</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Declaration Checkbox */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <label className="flex items-start space-x-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={declarationAccepted}
                  onChange={(e) => setDeclarationAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  I have read and understood all the instructions above. All computer hardware allotted to me is in proper working condition. I declare that I am not in possession of any unauthorized material and undertake to adhere strictly to the examination rules.
                </span>
              </label>
            </div>
          </div>
        </main>

        {/* Bottom Action Footer */}
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-4 flex items-center justify-between">
          {onExitTest ? (
            <button
              onClick={onExitTest}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition"
            >
              Cancel & Exit
            </button>
          ) : <div />}

          <button
            onClick={() => {
              if (declarationAccepted) {
                setTestStage('TEST');
              }
            }}
            disabled={!declarationAccepted}
            className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center space-x-2 shadow-sm transition ${
              declarationAccepted
                ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-blue-500/20'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>I Am Ready to Begin</span>
            <ArrowRight size={15} />
          </button>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: AUTHENTIC LIVE TEST EXAMINATION ENGINE
  // =========================================================================
  return (
    <div className="flex flex-col h-screen w-screen bg-slate-100 dark:bg-slate-950 font-sans select-none overflow-hidden">
      {/* 1. TCS iON Authentic Header */}
      <header className="bg-slate-900 border-b border-slate-800 text-white px-4 py-2 flex items-center justify-between shadow-md z-20">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 text-white text-xs font-black px-2.5 py-1 rounded tracking-wider">
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
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Calculator Button */}
          {examConfig.hasCalculator && (
            <button
              onClick={() => {
                if (isCalculatorAllowedInCurrentSection) {
                  setIsCalculatorOpen(!isCalculatorOpen);
                }
              }}
              disabled={!isCalculatorAllowedInCurrentSection}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded text-xs font-semibold border transition ${
                !isCalculatorAllowedInCurrentSection
                  ? 'opacity-40 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-500'
                  : isCalculatorOpen 
                    ? 'bg-amber-600 text-white border-amber-500' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title={
                !isCalculatorAllowedInCurrentSection
                  ? 'Calculators strictly prohibited in this section'
                  : 'Official On-Screen Calculator'
              }
            >
              <CalcIcon size={14} />
              <span className="hidden sm:inline">Calculator</span>
              {!isCalculatorAllowedInCurrentSection && <Lock size={10} className="ml-1 text-slate-400" />}
            </button>
          )}

          {/* Question Paper Button */}
          <button
            onClick={() => setShowQuestionPaper(true)}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="View Full Question Paper"
          >
            <FileText size={14} />
            <span className="hidden sm:inline">Question Paper</span>
          </button>

          {/* Instructions Modal Button */}
          <button
            onClick={() => setShowInstructionsModal(true)}
            className="flex items-center space-x-1 px-2 py-1.5 rounded text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Test Instructions"
          >
            <HelpCircle size={14} />
          </button>

          {/* Countdown Clock */}
          <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
              {examConfig.hasSectionalTimer ? 'Section Time Left' : 'Time Left'}
            </span>
            <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded border font-mono text-xs sm:text-sm font-bold ${
              (examConfig.hasSectionalTimer ? sectionRemainingSeconds : compositeRemainingSeconds) < 300 
                ? 'bg-rose-950/80 border-rose-600 text-rose-300 animate-pulse' 
                : 'bg-slate-800 border-slate-700 text-amber-400'
            }`}>
              <Clock size={14} />
              <span>
                {formatTimer(examConfig.hasSectionalTimer ? sectionRemainingSeconds : compositeRemainingSeconds)}
              </span>
            </div>
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
            const isCompleted = completedSectionIndices.includes(idx);
            const isLocked = !examConfig.allowSectionSwitching && !isActive;

            return (
              <button
                key={sec.section}
                onClick={() => handleSelectSectionTab(idx)}
                className={`px-3 py-1 rounded font-semibold transition flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow'
                    : isCompleted
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800 cursor-not-allowed'
                      : isLocked
                        ? 'bg-slate-900/60 text-slate-500 border border-slate-800/80'
                        : 'bg-slate-900/60 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <span>{sec.section.replace(/_/g, ' ')}</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-black/30 rounded-full font-mono">
                  {sec.questions.length}
                </span>
                {isLocked && !isCompleted && <Lock size={10} className="text-slate-400" />}
                {isCompleted && <CheckCircle size={10} className="text-emerald-400" />}
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

      {/* Temporary Lock Warning Toast */}
      {sectionLockWarning && (
        <div className="bg-rose-900 text-rose-100 text-xs px-4 py-2 flex items-center justify-between animate-fade-in">
          <div className="flex items-center space-x-2">
            <Lock size={14} className="text-rose-300" />
            <span>{sectionLockWarning}</span>
          </div>
          <button onClick={() => setSectionLockWarning(null)} className="text-rose-300 hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Section Transition Toast */}
      {sectionTransitionAlert && (
        <div className="bg-amber-900 text-amber-100 text-xs px-4 py-2.5 flex items-center justify-between border-b border-amber-800">
          <div className="flex items-center space-x-2">
            <CheckCircle size={14} className="text-emerald-400" />
            <span>{sectionTransitionAlert}</span>
          </div>
          <button onClick={() => setSectionTransitionAlert(null)} className="text-amber-300 hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}

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
                    currentQuestion?.type === 'TITA' 
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                  }`}>
                    {currentQuestion?.type}
                  </span>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-medium">
                    {currentQuestion?.topic}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Time Pacer Indicator */}
                  {currentQuestion && (() => {
                    const timeSpent = responses[currentQuestion.id]?.timeSpentSeconds || 0;
                    const mins = Math.floor(timeSpent / 60);
                    const secs = timeSpent % 60;
                    const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;

                    if (timeSpent < 90) {
                      return (
                        <span className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          <Clock size={11} />
                          <span>{timeStr} &bull; Optimal Pace</span>
                        </span>
                      );
                    } else if (timeSpent <= 150) {
                      return (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          <Clock size={11} />
                          <span>{timeStr} &bull; Decide or Move</span>
                        </span>
                      );
                    } else {
                      return (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 animate-pulse">
                          <AlertTriangle size={11} />
                          <span>{timeStr} &bull; ⚠️ Topper 2.5m Skip Rule</span>
                        </span>
                      );
                    }
                  })()}

                  <div className="text-xs text-slate-500 font-mono">
                    {currentQuestion?.type === 'MCQ' 
                      ? `+${examConfig.scoring.correctMcq}, ${examConfig.scoring.incorrectMcq}` 
                      : `+${examConfig.scoring.correctTita}, 0`}
                  </div>
                </div>
              </div>


              {/* Question Stem */}
              <div className="mb-6">
                <MathRenderer content={currentQuestion?.questionText || ''} className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-100 leading-relaxed" />
              </div>

              {/* Options Section */}
              {currentQuestion?.type === 'MCQ' && currentQuestion?.options ? (
                <div className="space-y-3">
                  {currentQuestion.options.map(option => {
                    const isSelected = selectedOption === option.id;
                    return (
                      <label
                        key={option.id}
                        className={`flex items-start p-3.5 rounded-xl border cursor-pointer transition select-none ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-500 dark:bg-blue-950/40 dark:border-blue-500 text-blue-900 dark:text-blue-100 ring-1 ring-blue-500'
                            : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question_${currentQuestion.id}`}
                          value={option.id}
                          checked={isSelected}
                          onChange={() => setSelectedOption(option.id)}
                          className="mt-1 mr-3 h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                        />
                        <div className="flex-1 text-sm">
                          <span className="font-bold mr-2">{option.id}.</span>
                          <MathRenderer content={option.text} />
                        </div>
                      </label>
                    );
                  })}
                </div>
              ) : (
                /* TITA Virtual Numpad & Text Input */
                <div className="space-y-4 max-w-sm">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      Type in the Answer (TITA)
                    </label>
                    <input
                      type="text"
                      value={titaInput}
                      onChange={(e) => setTitaInput(e.target.value)}
                      placeholder="Enter number or sequence..."
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-lg font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* TCS iON Virtual Numpad */}
                  <div className="grid grid-cols-3 gap-1.5 p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    {['1','2','3','4','5','6','7','8','9','-','0','.'].map(key => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setTitaInput(prev => prev + key)}
                        className="h-10 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 font-bold text-sm text-slate-800 dark:text-white rounded shadow-sm border border-slate-200 dark:border-slate-600 transition"
                      >
                        {key}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setTitaInput(prev => prev.slice(0, -1))}
                      className="col-span-1 h-10 bg-slate-200 dark:bg-slate-600 font-bold text-xs rounded text-slate-700 dark:text-slate-200"
                    >
                      Bksp
                    </button>
                    <button
                      type="button"
                      onClick={() => setTitaInput('')}
                      className="col-span-2 h-10 bg-rose-100 dark:bg-rose-950/60 font-bold text-xs text-rose-700 dark:text-rose-300 rounded"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 4. Bottom Action Bar */}
          <div className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-3 sm:px-6 flex flex-wrap items-center justify-between gap-2 shadow-inner">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleMarkForReviewAndNext}
                className="px-3.5 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-bold text-xs transition"
              >
                Mark for Review & Next
              </button>
              <button
                onClick={handleClearResponse}
                className="px-3 py-2 rounded-lg bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 font-semibold text-xs transition"
              >
                Clear Response
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleSaveAndNext}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow transition"
              >
                Save & Next
              </button>
            </div>
          </div>
        </div>

        {/* 5. Right Sidebar: Question Palette & Candidate Profile */}
        <aside className={`w-72 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between absolute lg:relative inset-y-0 right-0 z-30 transition-transform ${
          isPaletteOpenMobile ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}>
          {/* Candidate Profile Strip */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs">
                {(user?.name || 'C').charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                  {user?.name || 'Candidate: Nihar'}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  Terminal: NODE-C042
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsPaletteOpenMobile(false)}
              className="lg:hidden text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>
          </div>

          {/* Palette Legend */}
          <div className="p-3 bg-slate-50/60 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-[10px] space-y-1.5">
            <div className="grid grid-cols-2 gap-1.5 font-medium">
              <div className="flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] bg-emerald-600 text-white">{paletteCounts.answered}</span>
                <span className="text-slate-600 dark:text-slate-300">Answered</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] bg-red-500 text-white">{paletteCounts.notAnswered}</span>
                <span className="text-slate-600 dark:text-slate-300">Not Answered</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300">{paletteCounts.notVisited}</span>
                <span className="text-slate-600 dark:text-slate-300">Not Visited</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] bg-indigo-600 text-white">{paletteCounts.marked}</span>
                <span className="text-slate-600 dark:text-slate-300">Marked</span>
              </div>
            </div>
          </div>

          {/* Question Grid for Current Section */}
          <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 flex items-center justify-between text-xs font-bold">
            <span className="text-slate-700 dark:text-slate-300 truncate max-w-[170px]">
              {currentSection?.section.replace(/_/g, ' ')}
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              {currentSectionCounts.answered}/{sectionQuestions.length} Ans
            </span>
          </div>

          <div className="flex-1 p-3 overflow-y-auto">
            <div className="grid grid-cols-4 gap-2">
              {sectionQuestions.map((q, idx) => {
                const resp = responses[q.id];
                const status = resp?.status || 'NOT_VISITED';
                const isCurrent = idx === currentQIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => jumpToQuestion(idx)}
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
          <div className="p-3 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-2">
            {examConfig.hasSectionalTimer ? (
              <button
                onClick={() => setShowSectionSubmitModal(true)}
                className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow"
              >
                {activeSectionIndex >= sectionsList.length - 1 ? 'Submit Entire Test' : `Submit ${currentSection?.section.replace(/_/g, ' ')} Section`}
              </button>
            ) : (
              <button
                onClick={() => setShowFinalSubmitModal(true)}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow"
              >
                Submit Entire Test
              </button>
            )}
          </div>
        </aside>
      </div>

      {/* 6. Virtual Calculator Floating Widget */}
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

      {/* 8. Instructions Modal (While In Test) */}
      {showInstructionsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-2xl w-full p-6 border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Examination Instructions & Rules ({examType})
            </h2>
            <div className="text-xs space-y-3 text-slate-600 dark:text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>1. The clock is calibrated at the server. The countdown timer at the top right displays remaining time.</p>
              <p>2. For MCQs, selecting an option will mark it. For TITA questions, enter your numerical or sequence answer using the virtual numpad or physical keyboard.</p>
              <p>3. <strong>Scoring Scheme:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Correct MCQ: <strong className="text-emerald-500">+{examConfig.scoring.correctMcq} Marks</strong></li>
                <li>Incorrect MCQ: <strong className="text-rose-500">{examConfig.scoring.incorrectMcq} Marks</strong></li>
                <li>Correct TITA: <strong className="text-emerald-500">+{examConfig.scoring.correctTita} Marks</strong></li>
                <li>Incorrect TITA: <strong className="text-slate-400">0 Marks (No negative marking)</strong></li>
                <li>Answered & Marked for Review: Evaluated as a valid attempt!</li>
              </ul>
              {examType === 'XAT' && (
                <p className="text-amber-500 font-semibold">
                  * Unattempted question penalty: -0.10 marks deducted for every unattempted question beyond 8 questions.
                </p>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowInstructionsModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded text-xs font-semibold"
              >
                Understood, Return to Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Section Submit Confirmation Modal (CAT / GMAT / NMAT) */}
      {showSectionSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Submit {currentSection?.section.replace(/_/g, ' ')} Section?
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Under official {examType} rules, once you submit this section, it will be <strong>permanently locked</strong> and you cannot return to review or change any answers in it.
            </p>

            {/* Current Section Summary */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-3 text-xs space-y-2 mb-6 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Section Questions:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{currentSectionCounts.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-600 font-semibold">Answered:</span>
                <span className="font-bold text-emerald-600">{currentSectionCounts.answered}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-600 font-semibold">Marked for Review:</span>
                <span className="font-bold text-indigo-600">{currentSectionCounts.marked}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-500 font-semibold">Not Answered / Left:</span>
                <span className="font-bold text-red-500">{currentSectionCounts.total - currentSectionCounts.answered}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowSectionSubmitModal(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs font-semibold"
              >
                Resume Section
              </button>
              <button
                onClick={handleConfirmSectionSubmit}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs font-bold shadow"
              >
                Confirm & Lock Section
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. Final Submit Confirmation Modal */}
      {showFinalSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Ready to submit entire examination?
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Your test session will be concluded and permanently preserved in the <strong>48-Hour Diagnostic Vault</strong> with complete step-by-step proofs, trap analyses, and AI Chatbot coaching.
            </p>

            {/* Total Attempt Summary */}
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
                onClick={() => setShowFinalSubmitModal(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs font-semibold"
              >
                Resume Test
              </button>
              <button
                onClick={() => {
                  setShowFinalSubmitModal(false);
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
