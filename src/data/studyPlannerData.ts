import { ExamType } from '@/types/exam';

export type PriorityTier = 'Tier 1: High Yield (Must Master)' | 'Tier 2: Core Scoring' | 'Tier 3: Bonus / Foundation';

export interface HighYieldTopic {
  id: string;
  exam: ExamType;
  section: string;
  topic: string;
  subtopics: string[];
  weightagePercent: number;
  priorityTier: PriorityTier;
  targetStudyHours: number;
  keyTrapsAndTips: string;
  recommendedQuestions: number;
}

export interface ExamCountdown {
  exam: ExamType;
  name: string;
  targetDate: string; // ISO string
  notes: string;
}

export interface DailyPlannerTask {
  id: string;
  title: string;
  category: 'Target' | 'Revision' | 'Mock' | 'Analysis';
  estimatedMinutes: number;
  isCompleted: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

export const EXAM_COUNTDOWNS: Record<ExamType, ExamCountdown> = {
  CAT: {
    exam: 'CAT',
    name: 'CAT 2026',
    targetDate: '2026-11-29T08:30:00.000Z',
    notes: 'Last Sunday of November. 66 questions, 120 minutes.'
  },
  GMAT: {
    exam: 'GMAT',
    name: 'GMAT Focus Target',
    targetDate: '2026-11-15T09:00:00.000Z',
    notes: 'Rolling flexible appointment. 64 questions, 135 minutes.'
  },
  XAT: {
    exam: 'XAT',
    name: 'XAT 2027',
    targetDate: '2027-01-03T14:00:00.000Z',
    notes: 'First Sunday of January. Decision Making + VALR + QADI.'
  },
  SNAP: {
    exam: 'SNAP',
    name: 'SNAP 2026 Slot 1',
    targetDate: '2026-12-13T14:00:00.000Z',
    notes: '60 questions in 60 minutes speed sprint.'
  },
  NMAT: {
    exam: 'NMAT',
    name: 'NMAT 2026 Window',
    targetDate: '2026-11-20T10:00:00.000Z',
    notes: 'Adaptive test, 108 questions, 0 negative marking.'
  }
};

export const HIGH_YIELD_TOPICS: HighYieldTopic[] = [
  // ================= CAT =================
  {
    id: 'cat-qa-arithmetic',
    exam: 'CAT',
    section: 'Quantitative Aptitude (QA)',
    topic: 'Commercial & Motion Arithmetic',
    subtopics: ['Time-Speed-Distance (Races & Escalators)', 'Work-Time & Pipes', 'Mixtures & Alligation', 'Percentages, Profit & Loss'],
    weightagePercent: 35,
    priorityTier: 'Tier 1: High Yield (Must Master)',
    targetStudyHours: 40,
    keyTrapsAndTips: 'Consistently 8 to 9 out of 22 QA questions. Master relative speed and alligation grids to solve each in under 2 minutes.',
    recommendedQuestions: 120
  },
  {
    id: 'cat-qa-algebra',
    exam: 'CAT',
    section: 'Quantitative Aptitude (QA)',
    topic: 'Higher Algebra & Functions',
    subtopics: ['Quadratic Equations & Roots', 'Modulus & Absolute Value', 'Logarithms & Indices', 'Sequences & Series (AP/GP/AGP)', 'Maxima & Minima'],
    weightagePercent: 30,
    priorityTier: 'Tier 1: High Yield (Must Master)',
    targetStudyHours: 35,
    keyTrapsAndTips: 'Usually 6 to 7 questions. Watch out for domain restrictions in logarithmic arguments and extraneous roots in modulus equations.',
    recommendedQuestions: 100
  },
  {
    id: 'cat-varc-rc',
    exam: 'CAT',
    section: 'Verbal Ability & Reading Comprehension (VARC)',
    topic: 'Academic Reading Comprehension',
    subtopics: ['Philosophy & Epistemology', 'Sociology & Cultural Anthropology', 'Evolutionary Biology', 'Economic History & Trade Policy'],
    weightagePercent: 66,
    priorityTier: 'Tier 1: High Yield (Must Master)',
    targetStudyHours: 50,
    keyTrapsAndTips: '16 out of 24 VARC questions. Eliminate extreme words (all, never, exclusively). Read for argument structure rather than facts.',
    recommendedQuestions: 80
  },
  {
    id: 'cat-dilr-games',
    exam: 'CAT',
    section: 'Data Interpretation & Logical Reasoning (DILR)',
    topic: 'Games, Tournaments & Scheduling',
    subtopics: ['Round-Robin & Knockout Tournaments', 'Seeding & Upsets', 'Multi-Constraint Scheduling', 'Resource Allocation Matrices'],
    weightagePercent: 25,
    priorityTier: 'Tier 1: High Yield (Must Master)',
    targetStudyHours: 30,
    keyTrapsAndTips: '1 full set (5 questions). Never start answering before establishing boundary conditions for tie-breakers and maximum possible scores.',
    recommendedQuestions: 40
  },
  {
    id: 'cat-dilr-numeric',
    exam: 'CAT',
    section: 'Data Interpretation & Logical Reasoning (DILR)',
    topic: 'Numerical Logic & Venn Diagrams',
    subtopics: ['3 & 4-Set Venn Diagrams', 'Max-Min Optimization in Overlaps', 'Cryptarithmetic & Missing Values', 'Scatter & Spider Charts'],
    weightagePercent: 25,
    priorityTier: 'Tier 1: High Yield (Must Master)',
    targetStudyHours: 30,
    keyTrapsAndTips: 'Sets often contain "Either/Or" ambiguity. Identify the 1 core anchor equation that unlocks the entire grid.',
    recommendedQuestions: 40
  },
  {
    id: 'cat-qa-geometry',
    exam: 'CAT',
    section: 'Quantitative Aptitude (QA)',
    topic: 'Geometry & Mensuration',
    subtopics: ['Similar Triangles & Cevians', 'Circles, Tangents & Cyclic Quadrilaterals', 'Coordinate Geometry (Slopes & Reflections)', '3D Solid Mensuration'],
    weightagePercent: 18,
    priorityTier: 'Tier 2: Core Scoring',
    targetStudyHours: 25,
    keyTrapsAndTips: '3 to 4 questions. Always test for symmetric configurations or drop perpendiculars from circle centers.',
    recommendedQuestions: 60
  },
  {
    id: 'cat-varc-va',
    exam: 'CAT',
    section: 'Verbal Ability & Reading Comprehension (VARC)',
    topic: 'Verbal Ability Non-RC (TITA)',
    subtopics: ['Para Jumbles (4-sentence sequence)', 'Para Summary', 'Odd Sentence Out', 'Para Completion'],
    weightagePercent: 34,
    priorityTier: 'Tier 2: Core Scoring',
    targetStudyHours: 20,
    keyTrapsAndTips: '8 questions total. Para Jumbles are TITA (no negative marking), meaning they are zero-risk points!',
    recommendedQuestions: 60
  },

  // ================= GMAT FOCUS =================
  {
    id: 'gmat-di-ds',
    exam: 'GMAT',
    section: 'Data Insights',
    topic: 'Data Sufficiency (5-Option Protocol)',
    subtopics: ['Value vs Yes/No Formulation', 'Integer Parity & Divisibility', 'Linear Inequalities', 'Standard Deviation & Dispersion'],
    weightagePercent: 40,
    priorityTier: 'Tier 1: High Yield (Must Master)',
    targetStudyHours: 35,
    keyTrapsAndTips: 'Official 5-choice standard. A definite "NO" is as SUFFICIENT as a definite "YES". Never carry information from (1) into (2).',
    recommendedQuestions: 100
  },
  {
    id: 'gmat-verb-cr',
    exam: 'GMAT',
    section: 'Verbal Reasoning',
    topic: 'Critical Reasoning Core',
    subtopics: ['Bold-Face Role Analysis', 'Necessary Assumption (Negation Technique)', 'Causal Weaken & Confounding Variables', 'Resolve the Paradox'],
    weightagePercent: 50,
    priorityTier: 'Tier 1: High Yield (Must Master)',
    targetStudyHours: 35,
    keyTrapsAndTips: 'Bold-face questions require identifying Conclusion indicators ("Therefore") vs Counter-premises ("However"). Negate assumptions to verify.',
    recommendedQuestions: 90
  },
  {
    id: 'gmat-quant-ps',
    exam: 'GMAT',
    section: 'Quantitative Reasoning',
    topic: 'Pure Problem Solving (Number Properties & Rates)',
    subtopics: ['Prime Factorization & Trailing Zeroes', 'Harmonic Work-Rate Equations', 'Absolute Value Squaring Intervals', 'Overlapping Sets & Combinatorics'],
    weightagePercent: 60,
    priorityTier: 'Tier 1: High Yield (Must Master)',
    targetStudyHours: 40,
    keyTrapsAndTips: 'Calculators are strictly forbidden in GMAT Focus Quant! Practice rapid mental arithmetic and prime exponent decomposition.',
    recommendedQuestions: 100
  },
  {
    id: 'gmat-di-multi',
    exam: 'GMAT',
    section: 'Data Insights',
    topic: 'Multi-Source & Two-Part Analysis',
    subtopics: ['Multi-Tab Document Verification', 'Two-Part Break-Even & Contribution Margin', 'Sortable Table Data Queries', 'Dual Graph Relationships'],
    weightagePercent: 60,
    priorityTier: 'Tier 2: Core Scoring',
    targetStudyHours: 30,
    keyTrapsAndTips: 'On-screen calculator is enabled in Data Insights. Use column sorting to rapidly isolate maximum and minimum ratios.',
    recommendedQuestions: 60
  },

  // ================= XAT =================
  {
    id: 'xat-dm-ethics',
    exam: 'XAT',
    section: 'Decision Making (DM)',
    topic: 'Managerial Dilemmas & Business Ethics',
    subtopics: ['Corporate Governance & Whistleblowing', 'Stakeholder Balancing (Employees vs Shareholders)', 'Environmental Regulation vs Profit', 'HR Performance Evaluations'],
    weightagePercent: 60,
    priorityTier: 'Tier 1: High Yield (Must Master)',
    targetStudyHours: 35,
    keyTrapsAndTips: 'Never choose an emotional, retaliatory, or illegal action. Look for options that provide transparent institutional process and remediation.',
    recommendedQuestions: 75
  },
  {
    id: 'xat-valr-cr',
    exam: 'XAT',
    section: 'Verbal & Logical Ability (VALR)',
    topic: 'Philosophical RC & Critical Reasoning',
    subtopics: ['Existential & Literary Passages', 'Poetry Comprehension & Metaphors', 'Logical Fallacies', 'Contextual Cloze & Vocabulary'],
    weightagePercent: 55,
    priorityTier: 'Tier 1: High Yield (Must Master)',
    targetStudyHours: 30,
    keyTrapsAndTips: 'XAT RC is denser than CAT. Read slowly to absorb subtle philosophical nuance before jumping to options.',
    recommendedQuestions: 60
  },
  {
    id: 'xat-qadi-geom',
    exam: 'XAT',
    section: 'Quantitative Ability & DI (QADI)',
    topic: 'Advanced Geometry, Functions & DI',
    subtopics: ['Coordinate Geometry & Tangents', 'Trigonometry & Heights/Distances', 'Data Sufficiency (XLRI Format)', 'Non-Calculator DI Sets'],
    weightagePercent: 50,
    priorityTier: 'Tier 2: Core Scoring',
    targetStudyHours: 30,
    keyTrapsAndTips: 'Beware of the unattempted question penalty (-0.10 marks after 8 unattempted questions). Don\'t leave entire sections blank.',
    recommendedQuestions: 60
  },

  // ================= SNAP =================
  {
    id: 'snap-eng-rhetoric',
    exam: 'SNAP',
    section: 'General English',
    topic: 'Figures of Speech & Rhetoric',
    subtopics: ['Oxymoron, Synecdoche & Metaphor', 'Idioms & Foreign Phrases', 'Spelling Traps', 'Antonyms & Synonyms'],
    weightagePercent: 40,
    priorityTier: 'Tier 1: High Yield (Must Master)',
    targetStudyHours: 15,
    keyTrapsAndTips: 'Each question takes only 10-15 seconds. High speed harvest! Memorize common rhetorical definitions.',
    recommendedQuestions: 80
  },
  {
    id: 'snap-reasoning-clocks',
    exam: 'SNAP',
    section: 'Analytical & Logical Reasoning',
    topic: 'Clocks, Calendars & Series',
    subtopics: ['Clock Hands Angle Formulas ($\\|30H - 5.5M\\|)$', 'Gregorian Odd Days Calendar Calculation', 'Number & Letter Sequences', 'Vector Direction Sense'],
    weightagePercent: 45,
    priorityTier: 'Tier 1: High Yield (Must Master)',
    targetStudyHours: 20,
    keyTrapsAndTips: 'Learn direct clock angle shortcuts ($|30H - 11/2 M|$) and century leap year rules to solve in 30 seconds.',
    recommendedQuestions: 70
  },
  {
    id: 'snap-quant-speed',
    exam: 'SNAP',
    section: 'Quantitative, DI & DS',
    topic: 'Speed Commercial Arithmetic & Lines',
    subtopics: ['Relative Speed & Train Platforms', 'Coordinate Geometry (Perpendicular Slopes)', 'Rapid 2-Column Table DI', 'Percentages & Ratios'],
    weightagePercent: 50,
    priorityTier: 'Tier 2: Core Scoring',
    targetStudyHours: 20,
    keyTrapsAndTips: '1 question per minute! Skip any geometry question that requires drawing complex multi-step figures.',
    recommendedQuestions: 60
  },

  // ================= NMAT =================
  {
    id: 'nmat-quant-pnc',
    exam: 'NMAT',
    section: 'Quantitative Skills',
    topic: 'Modern Math (P&C & Probability)',
    subtopics: ['Combinations with Identical Items', 'Conditional Probability & Dice', 'Data Interpretation Tables', 'Arithmetic Shortcuts'],
    weightagePercent: 35,
    priorityTier: 'Tier 1: High Yield (Must Master)',
    targetStudyHours: 25,
    keyTrapsAndTips: 'NMAT heavily tests P&C and Probability. No negative marking means you MUST mark an answer for every single question!',
    recommendedQuestions: 80
  },
  {
    id: 'nmat-reasoning-input',
    exam: 'NMAT',
    section: 'Logical Reasoning',
    topic: 'Machine Input-Output & Syllogisms',
    subtopics: ['Step-by-step Shifting Rules', 'Categorical Syllogisms (Possibility cases)', 'Critical Reasoning Assumptions', 'Coded Blood Relations'],
    weightagePercent: 40,
    priorityTier: 'Tier 1: High Yield (Must Master)',
    targetStudyHours: 25,
    keyTrapsAndTips: 'Decode the machine rule (alphabetical ascending from left, numerical descending from right) on scrap paper first.',
    recommendedQuestions: 70
  }
];

export const DEFAULT_DAILY_TASKS: DailyPlannerTask[] = [
  {
    id: 'task-1',
    title: 'Solve today\'s curated Daily Target Sprint (15-30 mins)',
    category: 'Target',
    estimatedMinutes: 25,
    isCompleted: false,
    priority: 'High'
  },
  {
    id: 'task-2',
    title: 'Review today\'s completed test in the 48-Hour Archive Vault',
    category: 'Analysis',
    estimatedMinutes: 20,
    isCompleted: false,
    priority: 'High'
  },
  {
    id: 'task-3',
    title: 'Solve 1 Academic RC Passage / Critical Reasoning set',
    category: 'Target',
    estimatedMinutes: 20,
    isCompleted: false,
    priority: 'Medium'
  },
  {
    id: 'task-4',
    title: 'Re-attempt 3 resolved mistakes from the Mistake Notebook',
    category: 'Revision',
    estimatedMinutes: 15,
    isCompleted: false,
    priority: 'Medium'
  },
  {
    id: 'task-5',
    title: 'Revise High-Yield Formula Vault (Arithmetic & Algebra shortcuts)',
    category: 'Revision',
    estimatedMinutes: 15,
    isCompleted: false,
    priority: 'Low'
  }
];
