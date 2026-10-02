import { ExamType, Question } from '@/types/exam';
import { CAT_DAILY_TARGETS } from '@/data/catDailyTargets';
import { GMAT_DAILY_TARGETS } from '@/data/gmatDailyTargets';
import { XAT_DAILY_TARGETS } from '@/data/xatDailyTargets';
import { NMAT_DAILY_TARGETS } from '@/data/nmatDailyTargets';
import { SNAP_DAILY_TARGETS } from '@/data/snapDailyTargets';

export interface FullMockTestDefinition {
  id: string;
  exam: ExamType;
  title: string;
  subtitle: string;
  edition: string;
  totalDurationMinutes: number;
  totalQuestionsCount: number;
  hasSectionalTimer: boolean;
  allowSectionSwitching: boolean;
  sectionDurations: Record<string, number>;
  questions: Question[];
}

export const FULL_MOCK_EXAMS: Record<ExamType, FullMockTestDefinition> = {
  // ==========================================
  // 1. CAT 2026 OFFICIAL BENCHMARK FULL MOCK
  // ==========================================
  CAT: {
    id: 'cat-full-mock-1',
    exam: 'CAT',
    title: 'CAT 2026 Official IIM Benchmark Full Mock Test #1',
    subtitle: 'Authentic 3-Section TCS iON Format: 40 mins VARC + 40 mins DILR + 40 mins QA with strict sectional locks.',
    edition: '2026 Official Edition',
    totalDurationMinutes: 120,
    totalQuestionsCount: 22,
    hasSectionalTimer: true,
    allowSectionSwitching: false,
    sectionDurations: {
      VARC: 40,
      DILR: 40,
      QA: 40
    },
    questions: CAT_DAILY_TARGETS.flatMap(t => t.questions)
  },

  // ==========================================
  // 2. GMAT FOCUS OFFICIAL SIMULATION FULL MOCK
  // ==========================================
  GMAT: {
    id: 'gmat-focus-full-mock-1',
    exam: 'GMAT',
    title: 'GMAT Focus Edition 705+ Official Simulation Mock #1',
    subtitle: 'Official GMAC Focus Edition: 45 mins Quantitative + 45 mins Verbal + 45 mins Data Insights. Calculator in DI only.',
    edition: 'Focus Edition 2026',
    totalDurationMinutes: 135,
    totalQuestionsCount: 14,
    hasSectionalTimer: true,
    allowSectionSwitching: false,
    sectionDurations: {
      Quantitative_Reasoning: 45,
      Verbal_Reasoning: 45,
      Data_Insights: 45
    },
    questions: GMAT_DAILY_TARGETS.flatMap(t => t.questions)
  },

  // ==========================================
  // 3. XAT 2027 OFFICIAL BENCHMARK FULL MOCK
  // ==========================================
  XAT: {
    id: 'xat-full-mock-1',
    exam: 'XAT',
    title: 'XAT 2027 XLRI Comprehensive Benchmark Full Mock #1',
    subtitle: 'Official XLRI Format: 175 mins composite time for Decision Making, VALR, and QADI. Free section navigation.',
    edition: 'XLRI Jamshedpur 2027',
    totalDurationMinutes: 175,
    totalQuestionsCount: 13,
    hasSectionalTimer: false,
    allowSectionSwitching: true,
    sectionDurations: {
      DM: 50,
      VALR: 55,
      QADI: 70
    },
    questions: XAT_DAILY_TARGETS.flatMap(t => t.questions)
  },

  // ==========================================
  // 4. SNAP 2026 SPEED SPRINT FULL MOCK
  // ==========================================
  SNAP: {
    id: 'snap-full-mock-1',
    exam: 'SNAP',
    title: 'SNAP 2026 SIBM Pune High-Velocity Full Mock #1',
    subtitle: 'Official SIU Format: 60 minutes speed sprint. General English, Analytical Reasoning & Speed Quant.',
    edition: 'SIU 2026 Standard',
    totalDurationMinutes: 60,
    totalQuestionsCount: 14,
    hasSectionalTimer: false,
    allowSectionSwitching: true,
    sectionDurations: {
      General_English: 15,
      Analytical_Reasoning: 25,
      Quant_DI_DS: 20
    },
    questions: SNAP_DAILY_TARGETS.flatMap(t => t.questions)
  },

  // ==========================================
  // 5. NMAT 2026 ADAPTIVE BENCHMARK FULL MOCK
  // ==========================================
  NMAT: {
    id: 'nmat-full-mock-1',
    exam: 'NMAT',
    title: 'NMAT by GMAC NMIMS Mumbai Benchmark Mock #1',
    subtitle: 'Official GMAC Format: 28 mins Language + 52 mins Quant + 40 mins Logical. Zero negative marking.',
    edition: 'GMAC NMAT 2026',
    totalDurationMinutes: 120,
    totalQuestionsCount: 13,
    hasSectionalTimer: true,
    allowSectionSwitching: false,
    sectionDurations: {
      Language_Skills: 28,
      Quantitative_Skills: 52,
      Logical_Reasoning: 40
    },
    questions: NMAT_DAILY_TARGETS.flatMap(t => t.questions)
  }
};
