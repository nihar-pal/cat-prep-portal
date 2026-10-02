import { ExamType, DailyTarget, Question, SectionType } from '@/types/exam';
import { CAT_DAILY_TARGETS } from '@/data/catDailyTargets';
import { XAT_DAILY_TARGETS } from '@/data/xatDailyTargets';
import { NMAT_DAILY_TARGETS } from '@/data/nmatDailyTargets';
import { SNAP_DAILY_TARGETS } from '@/data/snapDailyTargets';

export interface ExamSectionInfo {
  type: SectionType;
  label: string;
  shortLabel: string;
  badgeColor: string;
  accentColor: string;
  description: string;
}

export const EXAM_SECTION_CONFIGS: Record<ExamType, ExamSectionInfo[]> = {
  CAT: [
    {
      type: 'VARC',
      label: 'Verbal Ability & Reading Comprehension',
      shortLabel: 'VARC',
      badgeColor: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
      accentColor: 'amber',
      description: 'RC Passages, TITA Para Jumbles, Para Summary & Distractor elimination.'
    },
    {
      type: 'DILR',
      label: 'Data Interpretation & Logical Reasoning',
      shortLabel: 'DILR',
      badgeColor: 'text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700',
      accentColor: 'zinc',
      description: 'High-yield Caselets, Tournament matrices, Constraint scheduling & Number logic.'
    },
    {
      type: 'QA',
      label: 'Quantitative Aptitude',
      shortLabel: 'QA',
      badgeColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
      accentColor: 'emerald',
      description: 'Arithmetic Relative Speed, Polynomial roots, Fermat remainders & Geometry.'
    }
  ],
  XAT: [
    {
      type: 'DM',
      label: 'Decision Making (DM)',
      shortLabel: 'DM',
      badgeColor: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800',
      accentColor: 'rose',
      description: 'Business ethics, managerial trade-offs, human resources & 5-option caselets.'
    },
    {
      type: 'VALR',
      label: 'Verbal & Logical Ability (VALR)',
      shortLabel: 'VALR',
      badgeColor: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
      accentColor: 'amber',
      description: 'Critical reasoning, bold-face roles, philosophical RC & contextual vocabulary.'
    },
    {
      type: 'QADI',
      label: 'Quantitative Ability & DI (QADI)',
      shortLabel: 'QADI',
      badgeColor: 'text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700',
      accentColor: 'zinc',
      description: 'Advanced Geometry, Data Sufficiency (Statement I & II), and functions without calculator.'
    }
  ],
  NMAT: [
    {
      type: 'Language_Skills',
      label: 'Language Skills',
      shortLabel: 'Language',
      badgeColor: 'text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800',
      accentColor: 'sky',
      description: 'Prepositions, Verbal Analogies, Cloze tests & grammatical error detection.'
    },
    {
      type: 'Quantitative_Skills',
      label: 'Quantitative Skills',
      shortLabel: 'Quant',
      badgeColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
      accentColor: 'emerald',
      description: 'P&C, Probability, CI vs SI shortcuts, Work-Time and Data Sufficiency.'
    },
    {
      type: 'Logical_Reasoning',
      label: 'Logical Reasoning',
      shortLabel: 'Logical',
      badgeColor: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
      accentColor: 'amber',
      description: 'Machine Input-Output decoding, Categorical Syllogisms, Coded Blood Relations.'
    }
  ],
  SNAP: [
    {
      type: 'General_English',
      label: 'General English',
      shortLabel: 'English',
      badgeColor: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
      accentColor: 'amber',
      description: 'Figures of Speech (Oxymoron, Synecdoche), Idioms & Phrases, Latin terms & Spelling.'
    },
    {
      type: 'Analytical_Reasoning',
      label: 'Analytical & Logical Reasoning',
      shortLabel: 'Reasoning',
      badgeColor: 'text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700',
      accentColor: 'zinc',
      description: 'Clock hands angle formulas, Calendar odd days, Number series & Vector directions.'
    },
    {
      type: 'Quant_DI_DS',
      label: 'Quantitative, DI & DS',
      shortLabel: 'Quant / DI',
      badgeColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
      accentColor: 'emerald',
      description: 'Speed arithmetic, Trains & Platforms, Perpendicular lines & Quick DI tables.'
    }
  ]
};

export function getDailyTargetsForExam(exam: ExamType): DailyTarget[] {
  switch (exam) {
    case 'XAT':
      return XAT_DAILY_TARGETS;
    case 'NMAT':
      return NMAT_DAILY_TARGETS;
    case 'SNAP':
      return SNAP_DAILY_TARGETS;
    case 'CAT':
    default:
      return CAT_DAILY_TARGETS;
  }
}

export function getAllMockQuestionsForExam(exam: ExamType): Question[] {
  const targets = getDailyTargetsForExam(exam);
  return targets.flatMap(t => t.questions);
}
