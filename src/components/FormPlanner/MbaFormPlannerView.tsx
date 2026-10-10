'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Search, 
  Filter, 
  Calendar, 
  IndianRupee, 
  TrendingUp, 
  ExternalLink, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Bookmark, 
  ChevronRight, 
  Sparkles,
  ArrowUpDown,
  CheckSquare,
  Square,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  Flame,
  Sliders,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { 
  MBA_PLANNER_COLLEGES, 
  MbaPlannerCollege, 
  FormMatchCategory,
  MockPercentilesInput,
  calculateNormalizedPercentile,
  categorizeCollegeForPercentile 
} from '@/data/formPlannerData';
import { CuteCatLogo } from '@/components/CuteCatLogo';

export const MbaFormPlannerView: React.FC = () => {
  // Candidate Profile State
  const [candidateName, setCandidateName] = useState('Aspirant');
  const [category, setCategory] = useState('General');
  const [academicStream, setAcademicStream] = useState('Engineering');

  // Mock Percentiles State
  const [mockInputs, setMockInputs] = useState<MockPercentilesInput>({
    imsPercentile: 92.5,
    timePercentile: 88.0,
    crackuPercentile: 94.0,
    clPercentile: 91.0,
    otherPercentile: undefined,
    overridePercentile: 94.0,
    isOverrideActive: false
  });

  // Calculate Effective Percentile dynamically
  const { effectivePercentile, isOverridden, componentsUsed } = useMemo(() => {
    return calculateNormalizedPercentile(mockInputs);
  }, [mockInputs]);

  // Selected Colleges for Form Budget (Set of college IDs)
  const [selectedCollegeIds, setSelectedCollegeIds] = useState<Set<string>>(new Set([
    'bitsom-mumbai',
    'spjimr-mumbai',
    'mdi-gurgaon',
    'fms-delhi',
    'iim-ahmedabad',
    'iim-bangalore',
    'iim-calcutta'
  ]));

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | FormMatchCategory>('ALL');
  const [appTypeFilter, setAppTypeFilter] = useState<'ALL' | 'SEPARATE' | 'CAT_INCLUDED'>('ALL');
  const [examFilter, setExamFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'deadline' | 'cutoff' | 'feeAsc' | 'placements'>('deadline');

  const [candidateId, setCandidateId] = useState<string>('');
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [lastSavedTime, setLastSavedTime] = useState<string>('');
  const [isSavingRecord, setIsSavingRecord] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [hasCopiedPlan, setHasCopiedPlan] = useState(false);

  // Restore client state and candidate ID from localStorage on mount
  useEffect(() => {
    try {
      let cid = localStorage.getItem('crepe_candidate_id');
      if (!cid) {
        cid = `sub_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
        localStorage.setItem('crepe_candidate_id', cid);
      }
      setCandidateId(cid);

      const savedState = localStorage.getItem('crepe_form_planner_state');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.mockInputs) setMockInputs(parsed.mockInputs);
        if (parsed.candidateName) setCandidateName(parsed.candidateName);
        if (parsed.category) setCategory(parsed.category);
        if (parsed.academicStream) setAcademicStream(parsed.academicStream);
        if (Array.isArray(parsed.selectedCollegeIds) && parsed.selectedCollegeIds.length > 0) {
          setSelectedCollegeIds(new Set(parsed.selectedCollegeIds));
        }
      }
    } catch (e) {
      console.error('Error loading local planner state:', e);
    }
  }, []);

  // Debounced Automatic Save to Backend & LocalStorage
  useEffect(() => {
    if (!candidateId) return;

    // Persist to localStorage immediately
    try {
      localStorage.setItem('crepe_form_planner_state', JSON.stringify({
        mockInputs,
        candidateName,
        category,
        academicStream,
        selectedCollegeIds: Array.from(selectedCollegeIds)
      }));
    } catch (_) {}

    setAutoSaveStatus('saving');

    const timer = setTimeout(async () => {
      try {
        const selectedNames = MBA_PLANNER_COLLEGES
          .filter(c => selectedCollegeIds.has(c.id))
          .map(c => c.shortName);

        const totalBudget = MBA_PLANNER_COLLEGES
          .filter(c => selectedCollegeIds.has(c.id))
          .reduce((sum, c) => sum + c.applicationFee, 0);

        const res = await fetch('/api/mock-percentiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            candidateId,
            candidateName: candidateName || 'Anonymous Aspirant',
            imsPercentile: mockInputs.imsPercentile || null,
            timePercentile: mockInputs.timePercentile || null,
            crackuPercentile: mockInputs.crackuPercentile || null,
            clPercentile: mockInputs.clPercentile || null,
            overridePercentile: mockInputs.isOverrideActive ? mockInputs.overridePercentile : null,
            effectivePercentile,
            category,
            academicStream,
            targetColleges: selectedNames,
            totalBudget
          })
        });

        if (res.ok) {
          setAutoSaveStatus('saved');
          const now = new Date();
          setLastSavedTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      } catch (err) {
        console.warn('Auto-save network error:', err);
        setAutoSaveStatus('idle');
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [candidateId, mockInputs, candidateName, category, academicStream, selectedCollegeIds, effectivePercentile]);

  // Manual save trigger (instant)
  const handleSaveMockRecord = async () => {
    setIsSavingRecord(true);
    setSaveSuccessMessage(null);
    try {
      const selectedNames = MBA_PLANNER_COLLEGES
        .filter(c => selectedCollegeIds.has(c.id))
        .map(c => c.shortName);

      const totalBudget = MBA_PLANNER_COLLEGES
        .filter(c => selectedCollegeIds.has(c.id))
        .reduce((sum, c) => sum + c.applicationFee, 0);

      const res = await fetch('/api/mock-percentiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateId,
          candidateName: candidateName || 'Anonymous Aspirant',
          imsPercentile: mockInputs.imsPercentile || null,
          timePercentile: mockInputs.timePercentile || null,
          crackuPercentile: mockInputs.crackuPercentile || null,
          clPercentile: mockInputs.clPercentile || null,
          overridePercentile: mockInputs.isOverrideActive ? mockInputs.overridePercentile : null,
          effectivePercentile,
          category,
          academicStream,
          targetColleges: selectedNames,
          totalBudget
        })
      });

      const data = await res.json();
      if (data.success) {
        setSaveSuccessMessage('Progress saved');
        setAutoSaveStatus('saved');
        setTimeout(() => setSaveSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error('Error saving record:', err);
    } finally {
      setIsSavingRecord(false);
    }
  };

  // Toggle college selection
  const toggleSelectCollege = (id: string) => {
    setSelectedCollegeIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Select all target and safe colleges
  const handleSelectAllRecommended = () => {
    const recommendedIds = MBA_PLANNER_COLLEGES
      .filter(col => {
        const { category } = categorizeCollegeForPercentile(col, effectivePercentile);
        return category === 'Target' || category === 'Safe';
      })
      .map(c => c.id);

    setSelectedCollegeIds(new Set([...Array.from(selectedCollegeIds), ...recommendedIds]));
  };

  // Categorize and filter colleges
  const processedColleges = useMemo(() => {
    return MBA_PLANNER_COLLEGES.map(college => {
      const match = categorizeCollegeForPercentile(college, effectivePercentile);
      return {
        ...college,
        match
      };
    });
  }, [effectivePercentile]);

  // Filtered and sorted colleges
  const filteredColleges = useMemo(() => {
    return processedColleges.filter(col => {
      // Search
      const matchesSearch = 
        col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.programs.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = categoryFilter === 'ALL' || col.match.category === categoryFilter;

      // Application type filter
      let matchesAppType = true;
      if (appTypeFilter === 'SEPARATE') matchesAppType = col.requiresSeparateApplication;
      if (appTypeFilter === 'CAT_INCLUDED') matchesAppType = !col.requiresSeparateApplication;

      // Exam filter
      const matchesExam = examFilter === 'ALL' || col.acceptedExams.includes(examFilter);

      return matchesSearch && matchesCategory && matchesAppType && matchesExam;
    }).sort((a, b) => {
      if (sortBy === 'cutoff') {
        return b.primaryCutoffPercentile - a.primaryCutoffPercentile;
      }
      if (sortBy === 'feeAsc') {
        return a.applicationFee - b.applicationFee;
      }
      if (sortBy === 'placements') {
        return b.avgCtcLakhs - a.avgCtcLakhs;
      }
      // Default: Deadline
      return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime();
    });
  }, [processedColleges, searchQuery, categoryFilter, appTypeFilter, examFilter, sortBy]);

  // Counts by category
  const categoryCounts = useMemo(() => {
    const counts = { Target: 0, Safe: 0, Backup: 0, Difficult: 0 };
    processedColleges.forEach(c => {
      counts[c.match.category]++;
    });
    return counts;
  }, [processedColleges]);

  // Budget calculations for selected colleges
  const selectedBudgetSummary = useMemo(() => {
    const selected = processedColleges.filter(c => selectedCollegeIds.has(c.id));
    const totalFee = selected.reduce((sum, c) => sum + c.applicationFee, 0);
    const separateCount = selected.filter(c => c.requiresSeparateApplication).length;
    const catIncludedCount = selected.filter(c => !c.requiresSeparateApplication).length;

    // Find earliest deadline among selected
    const sortedDeadlines = selected
      .filter(c => c.requiresSeparateApplication && c.applicationDeadline >= new Date().toISOString().split('T')[0])
      .sort((a, b) => new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime());

    const earliest = sortedDeadlines[0] || null;

    return {
      count: selected.length,
      totalFee,
      separateCount,
      catIncludedCount,
      earliestDeadline: earliest
    };
  }, [processedColleges, selectedCollegeIds]);

  // Copy plan summary to clipboard
  const handleCopyPlan = () => {
    const selected = processedColleges.filter(c => selectedCollegeIds.has(c.id));
    const lines = [
      `🎓 CREPE MBA FORM PLANNER - CANDIDATE SUMMARY`,
      `Effective Percentile: ${effectivePercentile}%ile (${isOverridden ? 'Manual Override' : 'Normalized Mocks'})`,
      `Category: ${category} | Stream: ${academicStream}`,
      `Total Forms Selected: ${selected.length} | Estimated Form Fees: ₹${selectedBudgetSummary.totalFee.toLocaleString('en-IN')}`,
      `\nCOLLEGES SELECTED:`,
      ...selected.map(c => `- ${c.shortName}: ₹${c.applicationFee} (Cutoff: ${c.cutoffDisplay}, Deadline: ${c.deadlineDisplay}) [${c.match.badgeLabel}]`),
      `\nGenerated on Crepe Command Portal: https://cat-prep-portal-green.vercel.app/mba-form-planner`
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setHasCopiedPlan(true);
    setTimeout(() => setHasCopiedPlan(false), 3000);
  };

  return (
    <div className="space-y-8 font-sans text-slate-800 dark:text-slate-100">
      {/* 1. Header Hero Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
              <CuteCatLogo size={20} />
              <span>Crepe MBA &bull; Admissions Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              MBA College Form Planner & Budget Architect
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
              Decide which college application forms to fill before deadlines strike. Input your mock percentiles across IMS, TIME, Cracku, and CL to categorize institutions into <span className="text-amber-400 font-bold">Target</span>, <span className="text-emerald-400 font-bold">Safe</span>, <span className="text-slate-300 font-bold">Backup</span>, and <span className="text-rose-400 font-bold">Difficult</span>.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center space-x-1">
                <AlertCircle size={12} className="text-amber-400" />
                <span>Separate forms like BITSoM & SPJIMR close early!</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center space-x-1">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span>32 Colleges Calibrated</span>
              </span>
            </div>
          </div>

          {/* Personal Plan Summary Card */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex flex-col gap-2.5 shrink-0 min-w-[210px]">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Your Plan Overview</div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-slate-300">Shortlisted:</span>
              <span className="font-mono font-bold text-amber-400 text-sm">{selectedBudgetSummary.count} colleges</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-slate-300">Total Fees:</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">₹{selectedBudgetSummary.totalFee.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Privacy:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle size={11} /> Private to you
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Mock Percentile Input Command Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">
                    Step 1: Enter Your Mock Series Percentiles
                  </h2>
                  {autoSaveStatus === 'saving' && (
                    <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 text-[10px] font-bold animate-pulse">
                      <RefreshCw size={10} className="animate-spin" />
                      <span>Saving...</span>
                    </span>
                  )}
                  {autoSaveStatus === 'saved' && (
                    <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold">
                      <CheckCircle size={10} />
                      <span>Progress saved {lastSavedTime ? `(${lastSavedTime})` : ''}</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Enter your latest or median percentile in major coaching mocks. Values auto-save as you type.
                </p>
              </div>

              {/* Effective Percentile Badge Display */}
              <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Calculated CAT Equivalent</div>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
                    {effectivePercentile.toFixed(1)} <span className="text-sm font-normal">%ile</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <Flame size={20} />
                </div>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* IMS SimCAT */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    IMS (SimCAT)
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">+0.5%ile cal.</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="99.99"
                  step="0.1"
                  placeholder="e.g. 92.5"
                  value={mockInputs.imsPercentile ?? ''}
                  onChange={e => {
                    const val = e.target.value === '' ? undefined : parseFloat(e.target.value);
                    setMockInputs(prev => ({ ...prev, imsPercentile: val }));
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Balanced VARC & QA scaling</span>
              </div>

              {/* TIME AIMCAT */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    TIME (AIMCAT)
                  </label>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">+2.5%ile bonus</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="99.99"
                  step="0.1"
                  placeholder="e.g. 88.0"
                  value={mockInputs.timePercentile ?? ''}
                  onChange={e => {
                    const val = e.target.value === '' ? undefined : parseFloat(e.target.value);
                    setMockInputs(prev => ({ ...prev, timePercentile: val }));
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Adjusts for high AIMCAT difficulty</span>
              </div>

              {/* CRACKU */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    CRACKU Mocks
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">+1.0%ile cal.</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="99.99"
                  step="0.1"
                  placeholder="e.g. 94.0"
                  value={mockInputs.crackuPercentile ?? ''}
                  onChange={e => {
                    const val = e.target.value === '' ? undefined : parseFloat(e.target.value);
                    setMockInputs(prev => ({ ...prev, crackuPercentile: val }));
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Strict quant speed benchmark</span>
              </div>

              {/* Career Launcher CL */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    CL (Career Launcher)
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">+0.5%ile cal.</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="99.99"
                  step="0.1"
                  placeholder="e.g. 91.0"
                  value={mockInputs.clPercentile ?? ''}
                  onChange={e => {
                    const val = e.target.value === '' ? undefined : parseFloat(e.target.value);
                    setMockInputs(prev => ({ ...prev, clPercentile: val }));
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Comprehensive CDC pool</span>
              </div>
            </div>

            {/* Manual Override Option & Metadata */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="overrideToggle"
                  checked={mockInputs.isOverrideActive}
                  onChange={e => setMockInputs(prev => ({ ...prev, isOverrideActive: e.target.checked }))}
                  className="mt-1 w-4 h-4 rounded text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer"
                />
                <div>
                  <label htmlFor="overrideToggle" className="font-bold text-xs text-slate-900 dark:text-white cursor-pointer block">
                    Direct Override Mode (Use Fixed Target or Median Percentile)
                  </label>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Check this if you want to bypass institute averaging and filter colleges strictly on a custom target percentile.
                  </p>
                </div>
              </div>

              {mockInputs.isOverrideActive && (
                <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 p-2 rounded-xl border border-amber-300 dark:border-amber-700 shrink-0">
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-300">Target %ile:</span>
                  <input
                    type="number"
                    min="1"
                    max="99.99"
                    step="0.1"
                    value={mockInputs.overridePercentile ?? 94.0}
                    onChange={e => {
                      const val = parseFloat(e.target.value) || 90;
                      setMockInputs(prev => ({ ...prev, overridePercentile: val }));
                    }}
                    className="w-20 px-2 py-1 font-mono font-bold text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                  <input
                    type="range"
                    min="75"
                    max="99.9"
                    step="0.2"
                    value={mockInputs.overridePercentile ?? 94.0}
                    onChange={e => {
                      const val = parseFloat(e.target.value);
                      setMockInputs(prev => ({ ...prev, overridePercentile: val }));
                    }}
                    className="w-24 accent-amber-500 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Profile Meta & Save Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-400 font-semibold">Your Name/Tag:</span>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={e => setCandidateName(e.target.value)}
                    placeholder="e.g. Rohan (GEM)"
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200 text-xs"
                  />
                </div>

                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-400 font-semibold">Category:</span>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200 text-xs"
                  >
                    <option value="General">General / Open</option>
                    <option value="NC-OBC">NC-OBC</option>
                    <option value="EWS">EWS</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>

                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-400 font-semibold">Background:</span>
                  <select
                    value={academicStream}
                    onChange={e => setAcademicStream(e.target.value)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200 text-xs"
                  >
                    <option value="Engineering">Engineering (GEM / GEF)</option>
                    <option value="Commerce">Commerce / CA</option>
                    <option value="Economics">Economics / Arts</option>
                    <option value="Science">Science / Medicine</option>
                  </select>
                </div>
              </div>

              {/* Save To Backend Database Button */}
              <button
                onClick={handleSaveMockRecord}
                disabled={isSavingRecord}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold transition flex items-center justify-center space-x-2 shadow-sm shrink-0"
              >
                {isSavingRecord ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <Bookmark size={14} className="text-amber-500" />
                )}
                <span>Save Progress</span>
              </button>
            </div>

            {saveSuccessMessage && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs flex items-center space-x-2">
                <CheckCircle size={15} />
                <span>{saveSuccessMessage}</span>
              </div>
            )}
          </div>

          {/* 3. Budget Calculator & Selection Summary (Sticky Bar) */}
          <div className="sticky top-20 z-30 bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Selected Forms</span>
                <span className="text-xl font-black font-mono text-white">
                  {selectedBudgetSummary.count} <span className="text-xs font-normal text-slate-400">colleges</span>
                </span>
              </div>

              <div className="border-l border-slate-800 pl-4 sm:pl-6">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Total Application Fee</span>
                <span className="text-xl font-black font-mono text-emerald-400 flex items-center">
                  <IndianRupee size={16} />
                  <span>{selectedBudgetSummary.totalFee.toLocaleString('en-IN')}</span>
                </span>
              </div>

              <div className="border-l border-slate-800 pl-4 sm:pl-6 hidden sm:block">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Fee Split</span>
                <span className="text-xs text-slate-300 font-medium">
                  {selectedBudgetSummary.separateCount} Separate ({selectedBudgetSummary.catIncludedCount} via CAT)
                </span>
              </div>

              {selectedBudgetSummary.earliestDeadline && (
                <div className="border-l border-slate-800 pl-4 sm:pl-6">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">Earliest Deadline</span>
                  <span className="text-xs font-bold text-slate-200">
                    {selectedBudgetSummary.earliestDeadline.shortName} &bull; {selectedBudgetSummary.earliestDeadline.deadlineDisplay}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center space-x-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
              <button
                onClick={handleSelectAllRecommended}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
                title="Select all colleges in Target and Safe bands"
              >
                + Select Target & Safe
              </button>

              <button
                onClick={handleCopyPlan}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition flex items-center space-x-1"
                title="Copy structured form plan checklist"
              >
                {hasCopiedPlan ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{hasCopiedPlan ? 'Copied!' : 'Copy Plan'}</span>
              </button>
            </div>
          </div>

          {/* 4. Filter Tabs and Controls */}
          <div className="space-y-4">
            {/* Match Category Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={() => setCategoryFilter('ALL')}
                className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center space-x-1.5 ${
                  categoryFilter === 'ALL'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <span>All Colleges</span>
                <span className="px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px]">
                  {processedColleges.length}
                </span>
              </button>

              <button
                onClick={() => setCategoryFilter('Target')}
                className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center space-x-1.5 ${
                  categoryFilter === 'Target'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/60'
                }`}
              >
                <span>Target / Sweet Spot</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950 text-[10px]">
                  {categoryCounts.Target}
                </span>
              </button>

              <button
                onClick={() => setCategoryFilter('Safe')}
                className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center space-x-1.5 ${
                  categoryFilter === 'Safe'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60'
                }`}
              >
                <span>Safe / High Probability</span>
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[10px]">
                  {categoryCounts.Safe}
                </span>
              </button>

              <button
                onClick={() => setCategoryFilter('Backup')}
                className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center space-x-1.5 ${
                  categoryFilter === 'Backup'
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <span>Backup / Safety Net</span>
                <span className="px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px]">
                  {categoryCounts.Backup}
                </span>
              </button>

              <button
                onClick={() => setCategoryFilter('Difficult')}
                className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center space-x-1.5 ${
                  categoryFilter === 'Difficult'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60'
                }`}
              >
                <span>Difficult / Dream</span>
                <span className="px-1.5 py-0.2 rounded-full bg-rose-100 dark:bg-rose-950 text-[10px]">
                  {categoryCounts.Difficult}
                </span>
              </button>
            </div>

            {/* Secondary Controls: Search, Application Type, Exam, Sort */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs">
              {/* Search */}
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search college, program, or location..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Separate App Filter */}
              <div className="flex items-center space-x-1 shrink-0">
                <span className="text-slate-400 font-semibold mr-1">Application:</span>
                <select
                  value={appTypeFilter}
                  onChange={e => setAppTypeFilter(e.target.value as any)}
                  className="px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold"
                >
                  <option value="ALL">All Application Types</option>
                  <option value="SEPARATE">Separate Form Required (BITSoM, MDI, etc.)</option>
                  <option value="CAT_INCLUDED">Covered in CAT Form (IIMs)</option>
                </select>
              </div>

              {/* Exam Filter */}
              <div className="flex items-center space-x-1 shrink-0">
                <span className="text-slate-400 font-semibold mr-1">Exam:</span>
                <select
                  value={examFilter}
                  onChange={e => setExamFilter(e.target.value)}
                  className="px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold"
                >
                  <option value="ALL">All Entrance Exams</option>
                  <option value="CAT">Accepts CAT</option>
                  <option value="XAT">Accepts XAT</option>
                  <option value="GMAT">Accepts GMAT</option>
                  <option value="NMAT">Accepts NMAT</option>
                  <option value="SNAP">Accepts SNAP</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center space-x-1 shrink-0">
                <ArrowUpDown size={12} className="text-slate-400" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold"
                >
                  <option value="deadline">Sort: Upcoming Deadline</option>
                  <option value="cutoff">Sort: Cutoff Percentile</option>
                  <option value="feeAsc">Sort: Application Fee (Low to High)</option>
                  <option value="placements">Sort: Highest Average CTC</option>
                </select>
              </div>
            </div>
          </div>

          {/* 5. Colleges Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Showing {filteredColleges.length} matching institutions</span>
              <span>{selectedCollegeIds.size} added to current form plan</span>
            </div>

            {filteredColleges.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <Building2 size={36} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm">No colleges match your active filters</h3>
                <p className="text-xs text-slate-400 mt-1">Try clearing filters or switching category tab.</p>
                <button
                  onClick={() => {
                    setCategoryFilter('ALL');
                    setAppTypeFilter('ALL');
                    setExamFilter('ALL');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredColleges.map(col => {
                  const isSelected = selectedCollegeIds.has(col.id);

                  return (
                    <div
                      key={col.id}
                      className={`p-5 rounded-3xl border transition flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-50/20 dark:bg-amber-950/10 border-amber-400 dark:border-amber-700/70 shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {/* Top Header */}
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center space-x-2.5">
                            <button
                              onClick={() => toggleSelectCollege(col.id)}
                              className="text-amber-500 hover:scale-105 transition-transform"
                              title={isSelected ? 'Remove from Form Plan' : 'Add to Form Plan'}
                            >
                              {isSelected ? (
                                <CheckSquare size={20} className="fill-amber-500 text-white dark:text-slate-900" />
                              ) : (
                                <Square size={20} className="text-slate-300 dark:text-slate-600" />
                              )}
                            </button>

                            <div>
                              <h3 className="font-black text-sm text-slate-900 dark:text-white leading-tight">
                                {col.shortName}
                              </h3>
                              <span className="text-[11px] text-slate-400">{col.location}</span>
                            </div>
                          </div>

                          {/* Match Category Badge */}
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0 ${col.match.badgeColorClass}`}>
                            {col.match.badgeLabel}
                          </span>
                        </div>

                        {/* Special Warning if applies */}
                        {col.specialFormWarning && (
                          <div className="my-2.5 p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-[11px] text-amber-800 dark:text-amber-300 flex items-start space-x-1.5">
                            <AlertTriangle size={13} className="shrink-0 mt-0.5 text-amber-500" />
                            <span>{col.specialFormWarning}</span>
                          </div>
                        )}

                        {/* Cutoff & Form Fee Matrix */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-3 text-xs">
                          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-semibold">Cutoff</span>
                            <span className="font-mono font-bold text-slate-800 dark:text-slate-200 truncate block">
                              {col.cutoffDisplay}
                            </span>
                          </div>

                          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-semibold">Form Fee</span>
                            <span className={`font-mono font-bold block ${col.applicationFee > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600'}`}>
                              {col.applicationFee > 0 ? `₹${col.applicationFee.toLocaleString('en-IN')}` : 'Included in CAT'}
                            </span>
                          </div>

                          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 col-span-2 sm:col-span-1">
                            <span className="text-[10px] text-slate-400 block font-semibold">Average CTC</span>
                            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 block">
                              ₹{col.avgCtcLakhs} LPA
                            </span>
                          </div>
                        </div>

                        {/* Program & Separate App Indicator */}
                        <div className="space-y-1 mb-3">
                          <div className="flex items-center space-x-1 text-[11px] text-slate-600 dark:text-slate-400">
                            <span className="font-semibold text-slate-500">Programs:</span>
                            <span className="truncate">{col.programs.join(', ')}</span>
                          </div>

                          <div className="flex items-center space-x-1 text-[11px]">
                            <span className="font-semibold text-slate-500">Exams:</span>
                            <div className="flex gap-1 flex-wrap">
                              {col.acceptedExams.map(ex => (
                                <span key={ex} className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono">
                                  {ex}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Strategic Advice */}
                        <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 text-[11px] text-slate-600 dark:text-slate-300">
                          <span className="font-bold text-slate-800 dark:text-slate-200">Advisory: </span>
                          {col.match.advice}
                        </div>
                      </div>

                      {/* Bottom Footer: Deadline & Action */}
                      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1 text-slate-500">
                          <Clock size={12} className="text-amber-500" />
                          <span className="font-semibold text-[11px]">Deadline: {col.deadlineDisplay}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleSelectCollege(col.id)}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                              isSelected
                                ? 'bg-amber-500 text-slate-950'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                            }`}
                          >
                            {isSelected ? '✓ In Plan' : '+ Add to Plan'}
                          </button>

                          <a
                            href={col.portalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300"
                            title="Open Official College Application Portal"
                          >
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
    </div>
  );
};
