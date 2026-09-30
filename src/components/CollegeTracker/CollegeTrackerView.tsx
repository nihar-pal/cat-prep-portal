'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  AlertCircle, 
  Bookmark, 
  ChevronRight, 
  GraduationCap, 
  Sparkles,
  ArrowUpDown,
  FileText,
  X,
  Plus
} from 'lucide-react';
import { College, ApplicationStatus, UserCollegeApplication } from '@/types/college';
import { TOP_MBA_COLLEGES } from '@/data/collegesData';
import { useAuth } from '@/context/AuthContext';
import { ExamType } from '@/types/exam';

export const CollegeTrackerView: React.FC = () => {
  const { user, toggleSaveCollege } = useAuth();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState<string>('ALL');
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'deadline' | 'placements' | 'feeAsc' | 'nirf'>('deadline');
  
  // User personal tracking state (persisted in localStorage)
  const [trackedApplications, setTrackedApplications] = useState<Record<string, UserCollegeApplication>>({});
  const [activeCollegeDetail, setActiveCollegeDetail] = useState<College | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('crepe_college_applications');
      if (stored) {
        setTrackedApplications(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const updateApplicationStatus = (collegeId: string, status: ApplicationStatus) => {
    const updated = {
      ...trackedApplications,
      [collegeId]: {
        collegeId,
        status,
        submissionDate: status === 'Form Submitted' ? new Date().toLocaleDateString() : trackedApplications[collegeId]?.submissionDate
      }
    };
    setTrackedApplications(updated);
    try {
      localStorage.setItem('crepe_college_applications', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Filtered & Sorted Colleges
  const filteredColleges = useMemo(() => {
    return TOP_MBA_COLLEGES.filter(col => {
      // Search
      const matchesSearch = 
        col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Exam Filter
      const matchesExam = selectedExam === 'ALL' || col.acceptedExams.includes(selectedExam as ExamType);

      // Stage / Status Filter
      let matchesStage = true;
      if (selectedStage === 'OPEN') matchesStage = col.application.stage === 'Open' || col.application.stage === 'Closing Soon';
      if (selectedStage === 'TRACKED') matchesStage = !!trackedApplications[col.id] || (user?.savedCollegeIds.includes(col.id) ?? false);

      return matchesSearch && matchesExam && matchesStage;
    }).sort((a, b) => {
      if (sortBy === 'placements') {
        return b.placements.averageCtcLakhs - a.placements.averageCtcLakhs;
      }
      if (sortBy === 'feeAsc') {
        return a.tuitionFeeLakhs - b.tuitionFeeLakhs;
      }
      if (sortBy === 'nirf') {
        return (a.nirfRank || 999) - (b.nirfRank || 999);
      }
      // Default: Deadline
      return new Date(a.application.lastDate).getTime() - new Date(b.application.lastDate).getTime();
    });
  }, [searchQuery, selectedExam, selectedStage, sortBy, trackedApplications, user]);

  // Overall Metrics
  const stats = useMemo(() => {
    const trackedCount = Object.keys(trackedApplications).length;
    const submittedCount = Object.values(trackedApplications).filter(a => a.status === 'Form Submitted' || a.status === 'Interview Shortlisted' || a.status === 'Converted').length;
    
    let totalFormFeeSpent = 0;
    Object.keys(trackedApplications).forEach(id => {
      const col = TOP_MBA_COLLEGES.find(c => c.id === id);
      if (col && (trackedApplications[id].status === 'Form Submitted' || trackedApplications[id].status === 'Interview Shortlisted')) {
        totalFormFeeSpent += col.application.formFee;
      }
    });

    return {
      totalColleges: TOP_MBA_COLLEGES.length,
      trackedCount,
      submittedCount,
      totalFormFeeSpent
    };
  }, [trackedApplications]);

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Converted':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300';
      case 'Interview Shortlisted':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300';
      case 'Form Submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300';
      case 'Drafting Application':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300';
      case 'Rejected':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300';
      case 'Waitlisted':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border-orange-300';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300';
    }
  };

  const getStageBadge = (stage: College['application']['stage']) => {
    switch (stage) {
      case 'Open':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Closing Soon':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800 animate-pulse';
      case 'Opening Soon':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Closed':
      default:
        return 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1.5">
            <Building2 size={15} />
            <span>Admissions Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            MBA College Application Tracker
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
            Monitor deadlines, verify cut-offs, analyze placement ROI, and manage your personal application stages across premier institutes in one place.
          </p>
        </div>

        {/* Quick summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800 text-xs">
          <div>
            <div className="text-slate-400 text-[11px]">Database Listed</div>
            <div className="text-lg font-bold text-white mt-0.5">{stats.totalColleges} Colleges</div>
          </div>
          <div>
            <div className="text-slate-400 text-[11px]">Tracked Applications</div>
            <div className="text-lg font-bold text-amber-400 mt-0.5">{stats.trackedCount} Active</div>
          </div>
          <div>
            <div className="text-slate-400 text-[11px]">Submitted Forms</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">{stats.submittedCount} Completed</div>
          </div>
          <div>
            <div className="text-slate-400 text-[11px]">Application Spend</div>
            <div className="text-lg font-bold text-blue-400 mt-0.5">₹{stats.totalFormFeeSpent.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* 2. Search, Filters, and Sort Controls */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search college name, short name or city (e.g. Ahmedabad, FMS, Mumbai, XLRI)..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center space-x-1.5 w-full sm:w-auto text-xs shrink-0">
            <ArrowUpDown size={14} className="text-slate-400" />
            <span className="text-slate-500 font-semibold hidden md:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="deadline">Application Deadline (Nearest)</option>
              <option value="placements">Average CTC Placements (High to Low)</option>
              <option value="feeAsc">Tuition Fee (Best ROI / Low to High)</option>
              <option value="nirf">NIRF National Rank</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
          {/* Exam filter */}
          <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Exam:</span>
            {['ALL', 'CAT', 'XAT', 'NMAT', 'SNAP'].map(ex => (
              <button
                key={ex}
                onClick={() => setSelectedExam(ex)}
                className={`px-3 py-1 rounded-lg font-bold transition text-xs ${
                  selectedExam === ex
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {ex}
              </button>
            ))}
          </div>

          {/* Stage filter */}
          <div className="flex items-center space-x-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">View:</span>
            <button
              onClick={() => setSelectedStage('ALL')}
              className={`px-2.5 py-1 rounded-lg font-semibold text-xs transition ${
                selectedStage === 'ALL'
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              All ({TOP_MBA_COLLEGES.length})
            </button>
            <button
              onClick={() => setSelectedStage('OPEN')}
              className={`px-2.5 py-1 rounded-lg font-semibold text-xs transition ${
                selectedStage === 'OPEN'
                  ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Open Applications
            </button>
            <button
              onClick={() => setSelectedStage('TRACKED')}
              className={`px-2.5 py-1 rounded-lg font-semibold text-xs transition ${
                selectedStage === 'TRACKED'
                  ? 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200 font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              My Tracked ({stats.trackedCount})
            </button>
          </div>
        </div>
      </div>

      {/* 3. College Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredColleges.map(col => {
          const userApp = trackedApplications[col.id];
          const currentStatus: ApplicationStatus = userApp?.status || 'Not Started';
          const isSaved = user?.savedCollegeIds.includes(col.id);

          // Calculate estimated ROI ratio: (Average Placement CTC / Tuition Fee)
          const roiRatio = (col.placements.averageCtcLakhs / col.tuitionFeeLakhs).toFixed(1);

          return (
            <div
              key={col.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Top Row: Name, Location, Stage & Bookmark */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStageBadge(col.application.stage)}`}>
                        {col.application.stage}
                      </span>
                      {col.nirfRank && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          NIRF #{col.nirfRank}
                        </span>
                      )}
                      <span className="text-[10px] font-semibold text-slate-400">
                        {col.location}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                      {col.shortName}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate max-w-sm">
                      {col.flagshipProgram}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleSaveCollege(col.id)}
                    className={`p-2 rounded-xl border transition ${
                      isSaved
                        ? 'bg-amber-50 dark:bg-amber-950 border-amber-300 text-amber-600'
                        : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white'
                    }`}
                    title="Bookmark College"
                  >
                    <Bookmark size={15} className={isSaved ? 'fill-amber-500' : ''} />
                  </button>
                </div>

                {/* Exams & Cutoff Capsule */}
                <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 text-xs flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-slate-400 font-semibold text-[11px]">Exams:</span>
                    {col.acceptedExams.map(ex => (
                      <span key={ex} className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono">
                        {ex}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px]">
                    <span className="text-slate-400">Cut-off: </span>
                    <strong className="text-slate-900 dark:text-slate-100 font-mono">
                      {col.cutoffs[0]?.overallPercentileOrScore}
                    </strong>
                  </div>
                </div>

                {/* Key Metrics: Fees, Avg Placement, ROI */}
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                    <div className="text-[10px] text-slate-400 font-medium">Tuition Fees</div>
                    <div className="text-sm font-black text-slate-900 dark:text-white mt-0.5">
                      ₹{col.tuitionFeeLakhs}L
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-emerald-50/40 dark:bg-emerald-950/20">
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Avg Placement</div>
                    <div className="text-sm font-black text-emerald-700 dark:text-emerald-300 mt-0.5">
                      ₹{col.placements.averageCtcLakhs} LPA
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-amber-50/40 dark:bg-amber-950/20">
                    <div className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">ROI Ratio</div>
                    <div className="text-sm font-black text-amber-800 dark:text-amber-300 mt-0.5">
                      {roiRatio}x
                    </div>
                  </div>
                </div>

                {/* Deadline & Form Fee Pill */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <div className="flex items-center space-x-1.5">
                    <Clock size={13} className="text-slate-400" />
                    <span>Last Date: <strong className="text-slate-800 dark:text-slate-200">{col.application.lastDate}</strong></span>
                  </div>
                  <div>
                    <span>Form Fee: <strong className="text-slate-800 dark:text-slate-200">₹{col.application.formFee.toLocaleString()}</strong></span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar: Personal Status Dropdown & Portal Link */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                {/* Personal Status Dropdown */}
                <div className="flex items-center space-x-1.5 flex-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase hidden sm:inline">My Status:</span>
                  <select
                    value={currentStatus}
                    onChange={e => updateApplicationStatus(col.id, e.target.value as ApplicationStatus)}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition focus:outline-none ${getStatusBadge(currentStatus)}`}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="Interested">Interested</option>
                    <option value="Drafting Application">Drafting Application</option>
                    <option value="Form Submitted">Form Submitted</option>
                    <option value="Interview Shortlisted">Interview Shortlisted</option>
                    <option value="Converted">Converted 🎉</option>
                    <option value="Waitlisted">Waitlisted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {/* Details modal and External Portal link */}
                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    onClick={() => setActiveCollegeDetail(col)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold transition"
                  >
                    Details
                  </button>

                  <a
                    href={col.application.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition"
                    title="Open Official Application Portal"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. College Comprehensive Details Modal */}
      {activeCollegeDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 max-h-[85vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                  Comprehensive Admission Dossier
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                  {activeCollegeDetail.name}
                </h2>
                <p className="text-xs text-slate-500">
                  {activeCollegeDetail.flagshipProgram} &bull; {activeCollegeDetail.location}
                </p>
              </div>
              <button
                onClick={() => setActiveCollegeDetail(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            {/* Placements Detailed Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
              <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5 uppercase tracking-wide">
                <TrendingUp size={15} className="text-emerald-500" />
                <span>Audited Placement Statistics ({activeCollegeDetail.placements.year})</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-400">Average CTC</div>
                  <div className="text-sm font-black text-emerald-600">₹{activeCollegeDetail.placements.averageCtcLakhs} LPA</div>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-400">Median CTC</div>
                  <div className="text-sm font-black text-slate-800 dark:text-slate-200">₹{activeCollegeDetail.placements.medianCtcLakhs} LPA</div>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-400">Top 25% CTC</div>
                  <div className="text-sm font-black text-blue-600">₹{activeCollegeDetail.placements.top25PercentileCtcLakhs || 'N/A'} LPA</div>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-400">Batch Size</div>
                  <div className="text-sm font-black text-slate-800 dark:text-slate-200">{activeCollegeDetail.placements.batchSize || '—'}</div>
                </div>
              </div>
            </div>

            {/* Cut-offs & Selection Weightage */}
            <div className="space-y-3 text-xs">
              <div className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                Cut-offs & Shortlisting Weights
              </div>
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                {activeCollegeDetail.cutoffs.map((co, cIdx) => (
                  <div key={cIdx} className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-2">
                    <div>
                      <strong className="text-blue-600">{co.exam}:</strong> {co.overallPercentileOrScore}
                      {co.sectionalDetails && <div className="text-[11px] text-slate-400 mt-0.5">{co.sectionalDetails}</div>}
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                      {co.sectionalCutoffReq ? 'Sectionals Required' : 'Overall Only'}
                    </span>
                  </div>
                ))}

                <div className="pt-2 grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/40">
                    <span className="text-slate-400 block">Exam Score</span>
                    <strong className="text-slate-800 dark:text-slate-200">{activeCollegeDetail.selectionCriteria.examScoreWeight}%</strong>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/40">
                    <span className="text-slate-400 block">Personal Interview</span>
                    <strong className="text-slate-800 dark:text-slate-200">{activeCollegeDetail.selectionCriteria.interviewWeight}%</strong>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/40">
                    <span className="text-slate-400 block">Acads & WorkEx</span>
                    <strong className="text-slate-800 dark:text-slate-200">{activeCollegeDetail.selectionCriteria.academicsAndWorkExWeight}%</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Mandatory Application Documents */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                Key Checklist Documents
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-600 dark:text-slate-300">
                {activeCollegeDetail.application.mandatoryDocuments.map((doc, dIdx) => (
                  <li key={dIdx} className="flex items-center space-x-1.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                    <CheckCircle size={13} className="text-emerald-500 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setActiveCollegeDetail(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400"
              >
                Close
              </button>

              <a
                href={activeCollegeDetail.application.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold flex items-center space-x-1.5 shadow"
              >
                <span>Visit Application Portal</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
