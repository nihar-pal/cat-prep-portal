'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  BookOpen, 
  Zap, 
  AlertTriangle, 
  Bookmark, 
  Check, 
  Layers, 
  Play
} from 'lucide-react';
import { ExamType, SectionType, QuestionDifficulty, QuestionType, Question, MistakeEntry } from '@/types/exam';
import { MathRenderer } from '@/components/MathRenderer';

export const AIQuestionGenerator: React.FC = () => {
  const [exam, setExam] = useState<ExamType>('CAT');
  const [section, setSection] = useState<string>('QA');
  const [topic, setTopic] = useState<string>('Time Speed Distance');
  const [difficulty, setDifficulty] = useState<QuestionDifficulty>('Hard');
  const [qType, setQType] = useState<QuestionType>('MCQ');

  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);

  // Solving state
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [savedToMistakes, setSavedToMistakes] = useState(false);

  const examSections: Record<ExamType, { value: string; label: string }[]> = {
    CAT: [
      { value: 'QA', label: 'Quantitative Aptitude (QA)' },
      { value: 'VARC', label: 'Verbal & Reading Comp (VARC)' },
      { value: 'DILR', label: 'Data Interpretation & LR (DILR)' }
    ],
    XAT: [
      { value: 'DM', label: 'Decision Making (DM)' },
      { value: 'VALR', label: 'Verbal & Logical Ability (VALR)' },
      { value: 'QADI', label: 'Quantitative Ability & DI (QADI)' }
    ],
    NMAT: [
      { value: 'Language_Skills', label: 'Language Skills' },
      { value: 'Quantitative_Skills', label: 'Quantitative Skills' },
      { value: 'Logical_Reasoning', label: 'Logical Reasoning' }
    ],
    SNAP: [
      { value: 'General_English', label: 'General English' },
      { value: 'Analytical_Reasoning', label: 'Analytical & Logical Reasoning' },
      { value: 'Quant_DI_DS', label: 'Quantitative, DI & DS' }
    ]
  };

  const topicOptions: Record<string, string[]> = {
    QA: [
      'Time Speed Distance & Escalators',
      'Time & Work with Alternating Days',
      'Quadratic Equations & Roots of Polynomials',
      'Logarithms & Inequalities',
      'Circles & Intersecting Chords',
      'Triangles & Apollonius Theorem',
      'Permutations & Combinations (Distribution)',
      'Number Systems & Fermat Totient'
    ],
    VARC: [
      'Reading Comprehension (Philosophy & Mind)',
      'Reading Comprehension (Behavioral Economics)',
      'TITA Para Jumbles (4 Sentences)',
      'Para Summary & Trap Distractors',
      'Odd Sentence Out'
    ],
    DILR: [
      'Games & Tournaments (Round Robin Points Table)',
      'Matrix Scheduling & Multi-Constraint Optimization',
      'Routes & Network Bottlenecks',
      'Missing Data Tables & Conditional Averages'
    ],
    DM: [
      'Business Ethics & Whistleblowing',
      'Stakeholder Prioritization Dilemma',
      'Environmental Compliance vs Profitability',
      'Employee Performance & Toxic Star Reprimand'
    ],
    VALR: [
      'Bold-Face Argument Role Analysis',
      'Philosophical & Socio-cultural Reading Comprehension',
      'Contextual Vocabulary & Semantic Nuance',
      'Logical Flaws in Arguments'
    ],
    QADI: [
      'Cauchy Functional Equations',
      'Data Sufficiency (Inequalities & Absolute Values)',
      'Incircle & Circumcircle Properties',
      'Arithmetico-Geometric Progressions (AGP)'
    ],
    Language_Skills: [
      'Verbal Analogies (Relational Bridge)',
      'Phrasal Prepositions & Collocations',
      'Subject-Verb Concord & Proximity Rules',
      'Contextual Vocabulary & Antonyms'
    ],
    Quantitative_Skills: [
      'Permutations & Vowel Grouping Strings',
      'Complementary Probability & Independent Events',
      'Compound Interest vs Simple Interest (2-Yr Difference)',
      'Data Sufficiency (Arithmetic Progression Properties)',
      'Work & Efficiency Ratios'
    ],
    Logical_Reasoning: [
      'Machine Input-Output Sequential Sorting',
      'Categorical Syllogisms & Venn Overlaps',
      'Coded Blood Relations & Gender Elimination',
      'Implicit Assumptions vs Extreme Statements'
    ],
    General_English: [
      'Figures of Speech (Oxymoron, Synecdoche, Metaphor)',
      'Idioms & Phrases (Medieval & Classical Origins)',
      'Latin Loan Words in Business English',
      'Commonly Misspelled Double-Letter Words'
    ],
    Analytical_Reasoning: [
      'Clocks Hand Angles & Angular Velocities',
      'Gregorian Calendar Leap Years & Odd Days',
      'Number Series (Cubes and Differences)',
      'Cartesian Direction Sense & Displacement',
      'Alphabet Shift & Numerical Ciphers'
    ],
    Quant_DI_DS: [
      'Trains Passing Platforms & Relative Speed',
      'Perpendicular Line Equations & Slopes',
      'Successive Percentage Discounts Multipliers',
      '3D Sphere Melting & Recasting Volume Scaling',
      'Rapid Financial Table Percentage Growth'
    ]
  };

  const handleExamChange = (newExam: ExamType) => {
    setExam(newExam);
    const firstSec = examSections[newExam][0].value;
    setSection(firstSec);
    const firstTopic = (topicOptions[firstSec] || topicOptions.QA)[0];
    setTopic(firstTopic);
  };

  const handleSectionChange = (newSec: string) => {
    setSection(newSec);
    const firstTopic = (topicOptions[newSec] || topicOptions.QA)[0];
    setTopic(firstTopic);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setSubmitted(false);
    setUserAnswer('');
    setSavedToMistakes(false);

    try {
      const res = await fetch('/api/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam, section, topic, difficulty, type: qType })
      });
      const data = await res.json();
      if (data.question) {
        setQuestion(data.question);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isCorrect = question && userAnswer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();

  const handleSaveMistake = () => {
    if (!question) return;
    const entry: MistakeEntry = {
      id: `ai-mistake-${Date.now()}`,
      question,
      userGivenAnswer: userAnswer,
      mistakeTag: 'Conceptual Error',
      dateAdded: new Date().toLocaleDateString(),
      resolved: false
    };
    try {
      const existing = localStorage.getItem('cat_mistake_book');
      const list = existing ? JSON.parse(existing) : [];
      list.push(entry);
      localStorage.setItem('cat_mistake_book', JSON.stringify(list));
      setSavedToMistakes(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      {/* Header Banner - Minimalist Dark Charcoal */}
      <div className="bg-zinc-900 text-white p-6 sm:p-8 rounded-3xl shadow-sm border border-zinc-800">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
          <Sparkles size={16} />
          <span>Multi-Exam AI Question Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
          Infinite CAT, XAT, NMAT & SNAP Question Lab
        </h1>
        <p className="text-zinc-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
          Generate bespoke questions calibrated to authentic exam formats: XAT Decision Making, NMAT speed arithmetic & reasoning, SNAP figures of speech, and CAT tricky logic traps.
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          {/* Exam */}
          <div>
            <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">Target Exam</label>
            <select
              value={exam}
              onChange={e => handleExamChange(e.target.value as ExamType)}
              className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-semibold"
            >
              <option value="CAT">CAT (IIMs)</option>
              <option value="XAT">XAT (XLRI)</option>
              <option value="NMAT">NMAT (NMIMS)</option>
              <option value="SNAP">SNAP (SIBM)</option>
            </select>
          </div>

          {/* Section */}
          <div>
            <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 uppercase">Section</label>
            <select
              value={section}
              onChange={e => handleSectionChange(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-semibold"
            >
              {(examSections[exam] || examSections.CAT).map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">Difficulty</label>
            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value as QuestionDifficulty)}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
            >
              <option value="Moderate">Moderate (CAT 90-95%ile)</option>
              <option value="Hard">Hard (CAT 97-99%ile)</option>
              <option value="CAT 99+ %ile">CAT 99.5+%ile Trapped</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">Question Format</label>
            <select
              value={qType}
              onChange={e => setQType(e.target.value as QuestionType)}
              className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
            >
              <option value="MCQ">MCQ (+3 / -1)</option>
              <option value="TITA">TITA (Numerical / No Negative)</option>
            </select>
          </div>
        </div>

        {/* Topic selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
            Specific High-Yield Subtopic
          </label>
          <div className="flex flex-wrap gap-2">
            {(topicOptions[section] || topicOptions.QA).map(t => (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  topic === t
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg transition disabled:opacity-50"
          >
            <Sparkles size={15} />
            <span>{loading ? 'Synthesizing CAT Standard Question...' : 'Generate High-Yield Question'}</span>
          </button>
        </div>
      </div>

      {/* Generated Question Card */}
      {question && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
          {/* Card Top Pill */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xs bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded">
                {question.exam} &bull; {question.section}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {question.topic}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {question.difficulty}
              </span>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                {question.type === 'MCQ' ? '+3, -1' : '+3, 0'}
              </span>
            </div>
          </div>

          {/* Context if exists */}
          {question.contextText && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <div className="font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">
                Passage / Caselet Scenario
              </div>
              <MathRenderer content={question.contextText} className="text-xs" />
            </div>
          )}

          {/* Question Statement */}
          <div className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
            <MathRenderer content={question.questionText} />
          </div>

          {/* Options or TITA Input */}
          {!submitted ? (
            <div className="space-y-4">
              {question.type === 'MCQ' && question.options && (
                <div className="space-y-2">
                  {question.options.map(opt => (
                    <label
                      key={opt.id}
                      onClick={() => setUserAnswer(opt.id)}
                      className={`flex items-start space-x-3 p-3 rounded-xl border text-xs cursor-pointer transition ${
                        userAnswer === opt.id
                          ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 font-bold text-blue-900 dark:text-blue-200 ring-1 ring-blue-500'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold text-blue-600">{opt.id}.</span>
                      <div className="flex-1">
                        <MathRenderer content={opt.text} />
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {question.type === 'TITA' && (
                <div className="max-w-xs">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Enter Numerical Response:
                  </label>
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    placeholder="e.g. 15, 2.5, 9"
                    className="w-full px-3 py-2 text-sm font-mono font-bold border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                  />
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSubmitted(true)}
                  disabled={!userAnswer.trim()}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-lg text-xs font-bold shadow"
                >
                  Submit & Verify Answer
                </button>
              </div>
            </div>
          ) : (
            /* Solution / Feedback Section */
            <div className="space-y-5 pt-2 border-t border-slate-200 dark:border-slate-800">
              {/* Result Pill */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {isCorrect ? (
                    <div className="flex items-center space-x-1.5 text-emerald-600 font-bold text-sm bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
                      <CheckCircle2 size={16} />
                      <span>Spot On! (+3 Marks)</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1.5 text-rose-600 font-bold text-sm bg-rose-50 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-300 dark:border-rose-800">
                      <XCircle size={16} />
                      <span>Incorrect Attempt ({question.type === 'MCQ' ? '-1 Mark' : '0'})</span>
                    </div>
                  )}
                  <span className="text-xs text-slate-500">
                    Correct Answer: <strong className="font-mono text-emerald-600">{question.correctAnswer}</strong>
                  </span>
                </div>

                {!isCorrect && (
                  <button
                    onClick={handleSaveMistake}
                    disabled={savedToMistakes}
                    className={`flex items-center space-x-1 px-3 py-1 rounded text-xs font-semibold transition ${
                      savedToMistakes
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {savedToMistakes ? <Check size={13} /> : <Bookmark size={13} />}
                    <span>{savedToMistakes ? 'Saved to Mistake Book' : 'Log to Mistake Book'}</span>
                  </button>
                )}
              </div>

              {/* Step-by-Step Proof */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                  <BookOpen size={14} className="text-blue-600" />
                  <span>Step-by-Step Mathematical & Logical Solution</span>
                </div>
                {question.explanation.stepByStep.map((s, idx) => (
                  <MathRenderer key={idx} content={s} className="text-xs" />
                ))}
              </div>

              {/* IIM Alum Shortcut */}
              {question.explanation.shortcutOrAlumTip && (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs">
                  <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center space-x-1.5 mb-1">
                    <Zap size={15} className="fill-amber-500 text-amber-600" />
                    <span>IIM Alum Speed Technique (Save 60-90s)</span>
                  </div>
                  <MathRenderer content={question.explanation.shortcutOrAlumTip} className="text-xs" />
                </div>
              )}

              {/* Trap Analysis */}
              {question.explanation.trapAnalysis && (
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-xs">
                  <div className="font-bold text-rose-800 dark:text-rose-400 flex items-center space-x-1.5 mb-1">
                    <AlertTriangle size={15} className="text-rose-600" />
                    <span>Common Trap Warning</span>
                  </div>
                  <MathRenderer content={question.explanation.trapAnalysis} className="text-xs" />
                </div>
              )}

              {/* Re-try / Generate next */}
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setUserAnswer('');
                  }}
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Try Again
                </button>
                <button
                  onClick={handleGenerate}
                  className="px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold shadow-sm"
                >
                  Generate Another Question &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
