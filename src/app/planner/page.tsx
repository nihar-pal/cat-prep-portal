'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CalendarCheck, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  Clock, 
  Flame, 
  Target, 
  Sparkles, 
  Layers, 
  BookOpen, 
  ChevronRight, 
  Award,
  AlertTriangle,
  RotateCcw,
  Compass,
  Check
} from 'lucide-react';
import { ExamType } from '@/types/exam';
import { Navbar } from '@/components/Navbar';
import { 
  HIGH_YIELD_TOPICS, 
  HighYieldTopic, 
  EXAM_COUNTDOWNS, 
  DEFAULT_DAILY_TASKS, 
  DailyPlannerTask 
} from '@/data/studyPlannerData';

const TASKS_STORAGE_KEY = 'crepe_planner_tasks_v1';
const MASTERY_STORAGE_KEY = 'crepe_topic_mastery_v1';

export default function StudyPlannerPage() {
  const [currentExam, setCurrentExam] = useState<ExamType>('CAT');
  const [tasks, setTasks] = useState<DailyPlannerTask[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<'Target' | 'Revision' | 'Mock' | 'Analysis'>('Target');
  const [masteryMap, setMasteryMap] = useState<Record<string, 'not_started' | 'in_progress' | 'mastered'>>({});
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<'ALL' | 'Tier 1' | 'Tier 2'>('ALL');

  // Load tasks and mastery from localStorage
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        setTasks(DEFAULT_DAILY_TASKS);
      }

      const storedMastery = localStorage.getItem(MASTERY_STORAGE_KEY);
      if (storedMastery) {
        setMasteryMap(JSON.parse(storedMastery));
      }
    } catch (err) {
      console.error('Error loading planner data:', err);
      setTasks(DEFAULT_DAILY_TASKS);
    }
  }, []);

  // Save tasks on change
  const saveTasks = (newTasks: DailyPlannerTask[]) => {
    setTasks(newTasks);
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
    } catch (err) {
      console.error('Error saving tasks:', err);
    }
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t);
    saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    saveTasks(updated);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: DailyPlannerTask = {
      id: `task_${Date.now()}`,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      estimatedMinutes: 20,
      isCompleted: false,
      priority: 'Medium'
    };

    saveTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const handleResetTasks = () => {
    if (confirm('Reset to default daily task checklist?')) {
      saveTasks(DEFAULT_DAILY_TASKS);
    }
  };

  // Toggle mastery status
  const cycleMastery = (topicId: string) => {
    const current = masteryMap[topicId] || 'not_started';
    let next: 'not_started' | 'in_progress' | 'mastered' = 'in_progress';
    if (current === 'not_started') next = 'in_progress';
    else if (current === 'in_progress') next = 'mastered';
    else next = 'not_started';

    const updated = { ...masteryMap, [topicId]: next };
    setMasteryMap(updated);
    try {
      localStorage.setItem(MASTERY_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving mastery:', err);
    }
  };

  // Metrics
  const completedTasksCount = tasks.filter(t => t.isCompleted).length;
  const taskProgressPercent = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;

  // Filter topics for the currently active exam
  const examTopics = HIGH_YIELD_TOPICS.filter(t => t.exam === currentExam);
  const filteredTopics = examTopics.filter(t => {
    if (selectedTopicFilter === 'Tier 1') return t.priorityTier.includes('Tier 1');
    if (selectedTopicFilter === 'Tier 2') return t.priorityTier.includes('Tier 2');
    return true;
  });

  const masteredCount = examTopics.filter(t => masteryMap[t.id] === 'mastered').length;
  const inProgressCount = examTopics.filter(t => masteryMap[t.id] === 'in_progress').length;

  // Countdown calculations
  const countdown = EXAM_COUNTDOWNS[currentExam] || EXAM_COUNTDOWNS.CAT;
  const targetDateObj = new Date(countdown.targetDate);
  const now = new Date();
  const diffDays = Math.max(0, Math.ceil((targetDateObj.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <Navbar currentExam={currentExam} onSelectExam={setCurrentExam} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Banner */}
        <div className="bg-zinc-900 text-white p-6 sm:p-8 rounded-3xl shadow-sm border border-zinc-800 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
                <CalendarCheck size={16} />
                <span>Executive Study & Task Planner &bull; {currentExam}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                High-Yield Topic Priority & Daily Schedule
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
                Focus on what moves the percentile needle most. Track daily study milestones and master the top 20% of topics that yield 80% of official {currentExam} score weightage.
              </p>
            </div>

            {/* Live Exam Countdown Card */}
            <div className="bg-zinc-800/80 border border-zinc-700/80 rounded-2xl p-4 text-center shrink-0 min-w-[200px]">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                {countdown.name} Countdown
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white my-1 font-mono">
                {diffDays} <span className="text-sm font-sans font-medium text-zinc-400">days left</span>
              </div>
              <div className="text-[10px] text-zinc-400 leading-tight">
                {countdown.notes}
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Daily Task Checklist */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Daily Execution Loop
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 font-bold">
                  {completedTasksCount} / {tasks.length} Completed
                </span>
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-1">
                Today's Milestone Checklist
              </h2>
            </div>

            <div className="flex items-center space-x-3">
              {/* Progress bar */}
              <div className="w-36 sm:w-48 bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${taskProgressPercent}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-zinc-500">
                {taskProgressPercent}%
              </span>

              <button
                onClick={handleResetTasks}
                title="Reset tasks to default template"
                className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
              >
                <RotateCcw size={15} />
              </button>
            </div>
          </div>

          {/* Add Task Form */}
          <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a new study task (e.g. Master GMAT Bold-face CR or 20 TSD questions)..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <select
              value={newTaskCategory}
              onChange={(e: any) => setNewTaskCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs font-semibold text-zinc-700 dark:text-zinc-300 focus:outline-none"
            >
              <option value="Target">Target Sprint</option>
              <option value="Revision">Revision</option>
              <option value="Mock">Mock Test</option>
              <option value="Analysis">48h Archive Analysis</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition shrink-0"
            >
              <Plus size={14} />
              <span>Add Task</span>
            </button>
          </form>

          {/* Task Items */}
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {tasks.map(task => (
              <div 
                key={task.id}
                className="py-3 flex items-center justify-between group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 px-2 rounded-xl transition"
              >
                <div 
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center space-x-3 cursor-pointer flex-1 select-none"
                >
                  <button className="text-zinc-400 hover:text-amber-500 transition shrink-0">
                    {task.isCompleted ? (
                      <CheckCircle2 size={18} className="text-emerald-500" />
                    ) : (
                      <Circle size={18} />
                    )}
                  </button>
                  <span className={`text-xs ${
                    task.isCompleted 
                      ? 'line-through text-zinc-400 dark:text-zinc-500' 
                      : 'text-zinc-800 dark:text-zinc-200 font-medium'
                  }`}>
                    {task.title}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                    {task.category}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-rose-500 transition"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: High-Yield Topic Syllabus & Mastery Matrix */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Authentic Syllabus Breakdown
                </span>
                <span className="text-xs font-mono text-zinc-500 font-bold">
                  {masteredCount} of {examTopics.length} Topics Mastered
                </span>
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-1">
                {currentExam} High-Yield Topic Weightage Matrix
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center space-x-1.5">
              {(['ALL', 'Tier 1', 'Tier 2'] as const).map(tier => (
                <button
                  key={tier}
                  onClick={() => setSelectedTopicFilter(tier)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                    selectedTopicFilter === tier
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                      : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                  }`}
                >
                  {tier === 'ALL' ? 'All Tiers' : `${tier} Only`}
                </button>
              ))}
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTopics.map(topic => {
              const status = masteryMap[topic.id] || 'not_started';

              return (
                <div
                  key={topic.id}
                  className="bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                        {topic.section}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                        ~{topic.weightagePercent}% Weightage
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                        {topic.topic}
                      </h3>
                      <p className="text-[11px] text-zinc-500 mt-0.5 font-medium">
                        {topic.priorityTier} &bull; Target: {topic.targetStudyHours} hrs
                      </p>
                    </div>

                    {/* Subtopics tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {topic.subtopics.map(sub => (
                        <span 
                          key={sub}
                          className="px-2 py-0.5 rounded-md bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 text-[10px] text-zinc-700 dark:text-zinc-300"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>

                    {/* Alum tip / Trap warning */}
                    <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/40 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      <span className="font-bold text-amber-800 dark:text-amber-300">Alum Tactic: </span>
                      {topic.keyTrapsAndTips}
                    </div>
                  </div>

                  {/* Mastery status controller */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                    <span className="text-[11px] text-zinc-500">
                      Recommended: {topic.recommendedQuestions} questions
                    </span>

                    <button
                      onClick={() => cycleMastery(topic.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                        status === 'mastered'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : status === 'in_progress'
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                      }`}
                    >
                      {status === 'mastered' && <Check size={12} />}
                      <span>
                        {status === 'mastered' 
                          ? 'Mastered' 
                          : status === 'in_progress' 
                            ? 'In Progress' 
                            : 'Click to Track'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Recommended Weekly Study Architecture */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Compass size={16} />
            <span>Structured Timetable Guidelines</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            IIM & M7 Top-Percentile Weekly Study Rhythm
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <div className="font-bold text-sm text-zinc-900 dark:text-white flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Monday – Friday: Daily Sprints (2 to 2.5 Hours/day)</span>
              </div>
              <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>30 mins:</strong> Complete the curated Crepe Daily Target sprint under strict timed pressure.</li>
                <li><strong>45 mins:</strong> Deep topic drill in your weakest section (e.g. Inequalities or Games & Tournaments).</li>
                <li><strong>30 mins:</strong> Solve 1 Reading Comprehension passage or 2 Critical Reasoning bold-face sets.</li>
                <li><strong>15 mins:</strong> Re-attempt 3 resolved mistakes from the Mistake Notebook.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <div className="font-bold text-sm text-zinc-900 dark:text-white flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Saturday – Sunday: Full Mock & 48h Vault Audit (4 Hours/day)</span>
              </div>
              <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 list-disc list-inside leading-relaxed">
                <li><strong>Morning:</strong> Take 1 Full-Length Benchmark Mock Test in realistic conditions (no pauses, timer locks).</li>
                <li><strong>Afternoon:</strong> Open the test in the <strong>48-Hour Archive Vault</strong>. Conduct a question-by-question post-mortem.</li>
                <li><strong>Chatbot Consultation:</strong> Ask the AI Chatbot Coach why you fell for specific distractor traps.</li>
                <li><strong>Night:</strong> Log all conceptual slips into your personal Mistake Notebook.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
