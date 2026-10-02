export type ExamType = 'CAT' | 'XAT' | 'NMAT' | 'SNAP';

export type SectionType = 
  | 'VARC' 
  | 'DILR' 
  | 'QA'
  // XAT specific
  | 'DM' 
  | 'VALR' 
  | 'QADI' 
  | 'GK'
  // NMAT specific
  | 'Language_Skills' 
  | 'Quantitative_Skills' 
  | 'Logical_Reasoning'
  // SNAP specific
  | 'General_English' 
  | 'Analytical_Reasoning' 
  | 'Quant_DI_DS';

export type QuestionType = 'MCQ' | 'TITA';

export type QuestionDifficulty = 'Moderate' | 'Hard' | 'CAT 99+ %ile';

export interface Option {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
}

export interface Question {
  id: string;
  exam: ExamType;
  section: SectionType;
  topic: string;
  subtopic?: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  contextText?: string; // RC Passage, DILR Caselet narrative, or DI table markdown
  contextChart?: {
    type: 'table' | 'bar' | 'network' | 'custom';
    title: string;
    data: any;
  };
  questionText: string;
  options?: Option[]; // For MCQ
  correctAnswer: string; // e.g. 'B' or '144' for TITA
  explanation: {
    coreConcept: string;
    stepByStep: string[];
    shortcutOrAlumTip?: string;
    trapAnalysis?: string; // Why common wrong options are tempting
    prerequisite?: string;
  };
  pastYearReference?: string; // e.g. 'CAT 2023 Slot 2 Equivalent'
}

export interface CaseletSet {
  id: string;
  exam: ExamType;
  section: SectionType;
  title: string;
  topic: string;
  contextText: string;
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
  };
  questions: Question[];
}

export interface SectionBreakdownItem {
  section: SectionType;
  label: string;
  count: number;
  description: string;
}

export interface DailyTarget {
  id: string;
  dayNumber: number;
  dateStr: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  exam: ExamType;
  sectionBreakdown?: SectionBreakdownItem[];
  sections?: {
    varcCount?: number;
    dilrCount?: number;
    qaCount?: number;
    [key: string]: number | undefined;
  };
  questions: Question[];
}

export type QuestionStatus = 
  | 'NOT_VISITED' 
  | 'NOT_ANSWERED' 
  | 'ANSWERED' 
  | 'MARKED_FOR_REVIEW' 
  | 'ANSWERED_AND_MARKED';

export interface UserResponse {
  questionId: string;
  userAnswer?: string;
  status: QuestionStatus;
  timeSpentSeconds: number;
  isCorrect?: boolean;
  scoreAwarded?: number;
}

export interface TestSessionResult {
  id: string;
  testTitle: string;
  exam: ExamType;
  completedAt: string;
  totalTimeSeconds: number;
  totalScore: number;
  maxScore: number;
  accuracy: number;
  percentileEstimate: number;
  sectionScores: Record<string, {
    score: number;
    attempted: number;
    correct: number;
    wrong: number;
    accuracy: number;
    timeSpentSeconds: number;
  }>;
  responses: Record<string, UserResponse>;
}

export interface MistakeEntry {
  id: string;
  question: Question;
  userGivenAnswer: string;
  mistakeTag: 'Conceptual Error' | 'Calculation Mistake' | 'Misread Question' | 'Time Pressure' | 'Trap Option Picked';
  notes?: string;
  dateAdded: string;
  resolved: boolean;
}
