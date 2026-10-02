import { ExamType, SectionType } from '@/types/exam';

export interface ExamConfig {
  id: ExamType;
  name: string;
  fullName: string;
  conductingBody: string;
  targetColleges: string[];
  totalQuestions: number;
  totalDurationMinutes: number;
  hasSectionalTimer: boolean;
  allowSectionSwitching: boolean;
  hasCalculator: boolean;
  scoring: {
    correctMcq: number;
    incorrectMcq: number;
    correctTita: number;
    incorrectTita: number;
    unattemptedPenaltyThreshold?: number;
    unattemptedPenalty?: number;
  };
  sections: {
    type: SectionType;
    label: string;
    questionsCount: number;
    durationMinutes: number;
    description: string;
  }[];
  percentileBenchmarks: {
    percentile: string;
    scoreRange: string;
    description: string;
  }[];
  strategyTip: string;
}

export const EXAM_CONFIGS: Record<ExamType, ExamConfig> = {
  CAT: {
    id: 'CAT',
    name: 'CAT',
    fullName: 'Common Admission Test',
    conductingBody: 'Indian Institutes of Management (IIMs)',
    targetColleges: ['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'IIM Lucknow', 'FMS Delhi', 'SPJIMR', 'XLRI (via XAT/CAT for some)'],
    totalQuestions: 66,
    totalDurationMinutes: 120,
    hasSectionalTimer: true,
    allowSectionSwitching: false,
    hasCalculator: true,
    scoring: {
      correctMcq: 3,
      incorrectMcq: -1,
      correctTita: 3,
      incorrectTita: 0
    },
    sections: [
      {
        type: 'VARC',
        label: 'Verbal Ability & Reading Comprehension',
        questionsCount: 24,
        durationMinutes: 40,
        description: '16 RC questions (4 passages x 4 Qs) + 8 VA questions (Para Jumbles, Para Summary, Odd Sentence Out, Completion)'
      },
      {
        type: 'DILR',
        label: 'Data Interpretation & Logical Reasoning',
        questionsCount: 20,
        durationMinutes: 40,
        description: '4 high-yield sets of 5 questions each (Games & Tournaments, Matrix Arrangements, Numerical Logic, DI Caselets)'
      },
      {
        type: 'QA',
        label: 'Quantitative Aptitude',
        questionsCount: 22,
        durationMinutes: 40,
        description: 'Arithmetic (~8-9 Qs), Algebra (~6-7 Qs), Geometry (~3-4 Qs), Numbers & Modern Math (~3 Qs)'
      }
    ],
    percentileBenchmarks: [
      { percentile: '99.5+ %ile', scoreRange: '88 - 105+ marks', description: 'Top IIM ABC calls guarantee zone' },
      { percentile: '99.0 %ile', scoreRange: '78 - 86 marks', description: 'Premier Tier-1 IIMs & FMS shortlist range' },
      { percentile: '95.0 %ile', scoreRange: '56 - 65 marks', description: 'New IIMs, MDI, SPJIMR, IIT B/D shortlist' },
      { percentile: '90.0 %ile', scoreRange: '45 - 52 marks', description: 'Baby IIMs, IMT Ghaziabad, FORE, GIM' }
    ],
    strategyTip: 'Accuracy over volume! In CAT, attempting 12-14 questions per section with 90% accuracy guarantees a 99+ percentile.'
  },
  XAT: {
    id: 'XAT',
    name: 'XAT',
    fullName: 'Xavier Aptitude Test',
    conductingBody: 'XLRI Jamshedpur',
    targetColleges: ['XLRI Jamshedpur', 'XLRI Delhi', 'XIMB', 'IMT', 'GIM', 'TAPMI', 'IRMA'],
    totalQuestions: 75,
    totalDurationMinutes: 175,
    hasSectionalTimer: false,
    allowSectionSwitching: true,
    hasCalculator: false,
    scoring: {
      correctMcq: 1,
      incorrectMcq: -0.25,
      correctTita: 1,
      incorrectTita: 0,
      unattemptedPenaltyThreshold: 8,
      unattemptedPenalty: -0.10
    },
    sections: [
      {
        type: 'DM',
        label: 'Decision Making',
        questionsCount: 21,
        durationMinutes: 50,
        description: 'Business ethics, stakeholder dilemmas, managerial cases, logical judgment'
      },
      {
        type: 'VALR',
        label: 'Verbal & Logical Ability',
        questionsCount: 26,
        durationMinutes: 55,
        description: 'Critical reasoning, philosophical RC passages, poetry comprehension, vocab in context'
      },
      {
        type: 'QADI',
        label: 'Quantitative Ability & Data Interpretation',
        questionsCount: 28,
        durationMinutes: 70,
        description: 'Advanced Geometry, Functions, DI sets, Data Sufficiency (Calculators NOT allowed)'
      }
    ],
    percentileBenchmarks: [
      { percentile: '99.0 %ile', scoreRange: '42 - 47 marks', description: 'XLRI BM & HRM direct call safe zone' },
      { percentile: '95.0 %ile', scoreRange: '36 - 40 marks', description: 'XLRI sectional boundary & XIMB/IMT calls' },
      { percentile: '90.0 %ile', scoreRange: '31 - 34 marks', description: 'GIM, TAPMI, Great Lakes Chennai calls' }
    ],
    strategyTip: 'Beware of the unattempted question penalty! Plan strategic guesses or balanced skips after 8 blank questions.'
  },
  NMAT: {
    id: 'NMAT',
    name: 'NMAT by GMAC',
    fullName: 'NMIMS Management Aptitude Test',
    conductingBody: 'Graduate Management Admission Council (GMAC)',
    targetColleges: ['NMIMS Mumbai', 'NMIMS Bangalore', 'XIM University', 'SDA Bocconi Asia', 'K J Somaiya'],
    totalQuestions: 108,
    totalDurationMinutes: 120,
    hasSectionalTimer: true,
    allowSectionSwitching: false,
    hasCalculator: false,
    scoring: {
      correctMcq: 3,
      incorrectMcq: 0, // No negative marking!
      correctTita: 3,
      incorrectTita: 0
    },
    sections: [
      {
        type: 'Language_Skills',
        label: 'Language Skills',
        questionsCount: 36,
        durationMinutes: 28,
        description: 'Grammar, vocabulary, cloze test, analogies, 2 quick RC passages'
      },
      {
        type: 'Quantitative_Skills',
        label: 'Quantitative Skills',
        questionsCount: 36,
        durationMinutes: 52,
        description: 'Numbers, Arithmetic, Modern Math (P&C, Probability), Data Interpretation'
      },
      {
        type: 'Logical_Reasoning',
        label: 'Logical Reasoning',
        questionsCount: 36,
        durationMinutes: 40,
        description: 'Input-output, critical reasoning, syllogisms, blood relations, arrangements'
      }
    ],
    percentileBenchmarks: [
      { percentile: '240+ Scaled Score', scoreRange: '235 - 250', description: 'NMIMS Mumbai Core MBA guarantee cutoff' },
      { percentile: '225 - 234', scoreRange: '225 - 234', description: 'NMIMS Bangalore & HR / Business Analytics' },
      { percentile: '210 - 224', scoreRange: '210 - 224', description: 'XIMB HR & SDA Bocconi, K J Somaiya' }
    ],
    strategyTip: 'NO NEGATIVE MARKING! Never leave any question blank. Pace yourself to hit every single question within the section time.'
  },
  SNAP: {
    id: 'SNAP',
    name: 'SNAP',
    fullName: 'Symbiosis National Aptitude Test',
    conductingBody: 'Symbiosis International University (SIU)',
    targetColleges: ['SIBM Pune', 'SCMHRD Pune', 'SIIB', 'SIOM Nashik', 'SICSR'],
    totalQuestions: 60,
    totalDurationMinutes: 60,
    hasSectionalTimer: false,
    allowSectionSwitching: true,
    hasCalculator: false,
    scoring: {
      correctMcq: 1,
      incorrectMcq: -0.25,
      correctTita: 1,
      incorrectTita: 0
    },
    sections: [
      {
        type: 'General_English',
        label: 'General English',
        questionsCount: 15,
        durationMinutes: 12,
        description: 'Grammar, Vocab, Figures of Speech, Idioms, Antonyms/Synonyms'
      },
      {
        type: 'Analytical_Reasoning',
        label: 'Analytical & Logical Reasoning',
        questionsCount: 25,
        durationMinutes: 25,
        description: 'Clocks & Calendars, Coding-Decoding, Series, Visual Reasoning, Arrangements'
      },
      {
        type: 'Quant_DI_DS',
        label: 'Quantitative, DI & DS',
        questionsCount: 20,
        durationMinutes: 23,
        description: 'Arithmetic, Basic Algebra, Tables, Data Sufficiency (Speed oriented)'
      }
    ],
    percentileBenchmarks: [
      { percentile: '99.0+ %ile', scoreRange: '43 - 47 marks', description: 'SIBM Pune flagship MBA call safe threshold' },
      { percentile: '97.5+ %ile', scoreRange: '40 - 42 marks', description: 'SCMHRD Pune flagship MBA call threshold' },
      { percentile: '90.0 %ile', scoreRange: '34 - 37 marks', description: 'SIIB, SIBM Bangalore, SIOM' }
    ],
    strategyTip: 'Speed is king! 1 question per minute. Skip lengthy puzzles immediately and harvest direct 10-second grammar and quant questions.'
  },
  GMAT: {
    id: 'GMAT',
    name: 'GMAT Focus',
    fullName: 'GMAT Focus Edition',
    conductingBody: 'Graduate Management Admission Council (GMAC)',
    targetColleges: ['ISB Hyderabad & Mohali', 'IIM Ahmedabad (PGPX)', 'IIM Bangalore (EPGP)', 'IIM Calcutta (MBAEx)', 'INSEAD', 'Harvard / Stanford / Wharton', 'London Business School (LBS)'],
    totalQuestions: 64,
    totalDurationMinutes: 135,
    hasSectionalTimer: true,
    allowSectionSwitching: false,
    hasCalculator: true, // For Data Insights only
    scoring: {
      correctMcq: 3,
      incorrectMcq: -1,
      correctTita: 3,
      incorrectTita: 0
    },
    sections: [
      {
        type: 'Quantitative_Reasoning',
        label: 'Quantitative Reasoning',
        questionsCount: 21,
        durationMinutes: 45,
        description: 'Pure Problem Solving (Arithmetic, Algebra, Number Properties, Overlapping Sets; No Geometry; Calculators not allowed)'
      },
      {
        type: 'Verbal_Reasoning',
        label: 'Verbal Reasoning',
        questionsCount: 23,
        durationMinutes: 45,
        description: 'Critical Reasoning (Strengthen, Weaken, Assumptions, Bold-Face) and Reading Comprehension (Academic/Business Passages)'
      },
      {
        type: 'Data_Insights',
        label: 'Data Insights',
        questionsCount: 20,
        durationMinutes: 45,
        description: 'Data Sufficiency (5 standard options), Multi-Source Reasoning, Two-Part Analysis & Graph Interpretation (Calculator permitted)'
      }
    ],
    percentileBenchmarks: [
      { percentile: '705+ (99th %ile)', scoreRange: '705 - 805 Scale', description: 'M7 Global B-Schools (HBS/Stanford/Wharton) & ISB top scholarship zone' },
      { percentile: '655 - 695 (90-98th %ile)', scoreRange: '655 - 695 Scale', description: 'ISB, IIM Executive 1-yr MBA, INSEAD, LBS shortlist tier' },
      { percentile: '605 - 645 (75-88th %ile)', scoreRange: '605 - 645 Scale', description: 'Leading US & European specialized Master in Management (MiM) programs' },
      { percentile: '555 - 595 (50-70th %ile)', scoreRange: '555 - 595 Scale', description: 'Solid competitive baseline for international universities' }
    ],
    strategyTip: 'Every question counts equally across sections in GMAT Focus! You can bookmark and review/edit up to 3 answers per section before time runs out.'
  }
};

