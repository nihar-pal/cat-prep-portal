'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Trash2, 
  CheckCircle2, 
  RotateCcw, 
  AlertTriangle, 
  BookOpen, 
  Filter, 
  Zap, 
  ArrowLeft 
} from 'lucide-react';
import Link from 'next/link';
import { MistakeEntry } from '@/types/exam';
import { MathRenderer } from '@/components/MathRenderer';
import { Navbar } from '@/components/Navbar';

export default function MistakeBookPage() {
  const [mistakes, setMistakes] = useState<MistakeEntry[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [retestAnswer, setRetestAnswer] = useState<string>('');
  const [retestSubmitted, setRetestSubmitted] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cat_mistake_book');
      if (stored) {
        setMistakes(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleDeleteMistake = (id: string) => {
    const updated = mistakes.filter(m => m.id !== id);
    setMistakes(updated);
    try {
      localStorage.setItem('cat_mistake_book', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleResolved = (id: string) => {
    const updated = mistakes.map(m => m.id === id ? { ...m, resolved: !m.resolved } : m);
    setMistakes(updated);
    try {
      localStorage.setItem('cat_mistake_book', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const filteredMistakes = mistakes.filter(m => {
    if (selectedTag === 'ALL') return true;
    if (selectedTag === 'RESOLVED') return m.resolved;
    if (selectedTag === 'UNRESOLVED') return !m.resolved;
    return m.mistakeTag === selectedTag;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <Navbar currentExam="CAT" onSelectExam={() => {}} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-300 mb-2">
            <Bookmark size={15} />
            <span>Targeted Error Correction</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            My CAT Mistake Notebook
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            IIM 99+ percentilers treat mistakes as gold dust. Re-attempt questions you previously missed, dissect trap options, and mark concepts as mastered.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="font-bold text-slate-500 uppercase text-[11px] mr-1">Filter By:</span>
          {['ALL', 'UNRESOLVED', 'RESOLVED', 'Conceptual Error', 'Calculation Mistake', 'Misread Question', 'Trap Option Picked'].map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredMistakes.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <Bookmark size={24} />
            </div>
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">No Mistake Logs Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Whenever you get a question wrong in a Daily Target Sprint or Mock, click "Log to Mistake Book" to track and eliminate your blind spots.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow"
            >
              Attempt Today\'s Daily Target
            </Link>
          </div>
        ) : (
          /* Mistake Cards List */
          <div className="space-y-4">
            {filteredMistakes.map(entry => {
              const q = entry.question;
              const isRetesting = activeQuestionId === entry.id;

              return (
                <div
                  key={entry.id}
                  className={`p-5 rounded-2xl border transition bg-white dark:bg-slate-900 ${
                    entry.resolved 
                      ? 'border-emerald-200 dark:border-emerald-950 opacity-75' 
                      : 'border-slate-200 dark:border-slate-800 shadow-sm'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2.5 py-0.5 rounded">
                        {q.section} &bull; {q.topic}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                        {entry.mistakeTag}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Logged on {entry.dateAdded}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleResolved(entry.id)}
                        className={`px-3 py-1 rounded text-xs font-semibold flex items-center space-x-1 transition ${
                          entry.resolved
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        <CheckCircle2 size={13} />
                        <span>{entry.resolved ? 'Mastered' : 'Mark Mastered'}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteMistake(entry.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Delete from log"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Context if present */}
                  {q.contextText && (
                    <details className="mb-3 text-xs bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                      <summary className="font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                        View Context Scenario
                      </summary>
                      <div className="mt-2 text-slate-600 dark:text-slate-300">
                        <MathRenderer content={q.contextText} />
                      </div>
                    </details>
                  )}

                  {/* Question text */}
                  <div className="text-sm font-medium mb-3">
                    <MathRenderer content={q.questionText} />
                  </div>

                  {/* Logged Error Summary */}
                  <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-xs flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div>
                      <span className="text-rose-700 dark:text-rose-400 font-semibold">Your Previous Answer: </span>
                      <strong className="font-mono text-rose-800 dark:text-rose-300">{entry.userGivenAnswer || 'Blank / Timed Out'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-slate-400 font-semibold">Correct Answer: </span>
                      <strong className="font-mono text-emerald-600">{q.correctAnswer}</strong>
                    </div>
                  </div>

                  {/* Interactive Re-attempt Accordion */}
                  {!isRetesting ? (
                    <button
                      onClick={() => {
                        setActiveQuestionId(entry.id);
                        setRetestAnswer('');
                        setRetestSubmitted(false);
                      }}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
                    >
                      <RotateCcw size={12} />
                      <span>Re-attempt this question now</span>
                    </button>
                  ) : (
                    <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-950/20 space-y-3 mt-3">
                      <div className="font-bold text-xs text-blue-900 dark:text-blue-200">Re-attempt Mode</div>

                      {q.options ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {q.options.map(opt => (
                            <label
                              key={opt.id}
                              onClick={() => setRetestAnswer(opt.id)}
                              className={`p-2 rounded border cursor-pointer flex items-center space-x-2 ${
                                retestAnswer === opt.id ? 'bg-blue-600 text-white font-bold' : 'bg-white dark:bg-slate-800'
                              }`}
                            >
                              <span>{opt.id}.</span>
                              <MathRenderer content={opt.text} />
                            </label>
                          ))}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={retestAnswer}
                          onChange={e => setRetestAnswer(e.target.value)}
                          placeholder="Enter TITA response..."
                          className="px-3 py-1.5 text-xs font-mono border rounded bg-white dark:bg-slate-800"
                        />
                      )}

                      {!retestSubmitted ? (
                        <div className="flex space-x-2 pt-2">
                          <button
                            onClick={() => setRetestSubmitted(true)}
                            className="px-4 py-1.5 bg-blue-600 text-white rounded text-xs font-bold"
                          >
                            Verify
                          </button>
                          <button
                            onClick={() => setActiveQuestionId(null)}
                            className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="text-xs space-y-2 pt-2">
                          {retestAnswer.toLowerCase() === q.correctAnswer.toLowerCase() ? (
                            <div className="text-emerald-600 font-bold flex items-center space-x-1">
                              <CheckCircle2 size={14} />
                              <span>Correct! Excellent correction.</span>
                            </div>
                          ) : (
                            <div className="text-rose-600 font-bold flex items-center space-x-1">
                              <AlertTriangle size={14} />
                              <span>Still incorrect. Review the step-by-step proof below.</span>
                            </div>
                          )}
                          <div className="p-3 bg-white dark:bg-slate-900 rounded border text-slate-600 dark:text-slate-300">
                            {q.explanation.stepByStep.map((s, idx) => (
                              <MathRenderer key={idx} content={s} className="text-xs" />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
