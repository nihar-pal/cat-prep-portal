'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Calendar, 
  IndianRupee, 
  TrendingUp, 
  Building2, 
  ShieldAlert, 
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Database,
  ArrowUpDown,
  Flame,
  Award,
  Lock,
  Unlock,
  Key,
  LogOut,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { CuteCatLogo } from '@/components/CuteCatLogo';
import { MockPercentileSubmission } from '@/app/api/mock-percentiles/route';

export default function AdminPercentilesPage() {
  const [submissions, setSubmissions] = useState<MockPercentileSubmission[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [bracketFilter, setBracketFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [selectedSubmission, setSelectedSubmission] = useState<MockPercentileSubmission | null>(null);

  // Admin authentication state
  const [adminKey, setAdminKey] = useState<string>('');
  const [passkeyInput, setPasskeyInput] = useState<string>('');
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const fetchRecords = async (keyToUse?: string) => {
    const key = keyToUse !== undefined ? keyToUse : adminKey;
    if (!key) {
      setIsAuthorized(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/mock-percentiles?adminKey=${encodeURIComponent(key)}`, {
        headers: {
          'x-admin-key': key
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissions(data.submissions || []);
        setStats(data.stats || null);
        setIsAuthorized(true);
        setAdminKey(key);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('crepe_admin_key', key);
        }
        setAuthError(null);
      } else {
        setIsAuthorized(false);
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('crepe_admin_key');
        }
        setAuthError(data.error || 'Invalid admin passkey. Access restricted.');
      }
    } catch (err) {
      console.error('Error fetching admin records:', err);
      setAuthError('Connection error while contacting admin API.');
      setIsAuthorized(false);
    } finally {
      setIsLoading(false);
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    const savedKey = typeof window !== 'undefined' ? sessionStorage.getItem('crepe_admin_key') : null;
    if (savedKey) {
      setAdminKey(savedKey);
      fetchRecords(savedKey);
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkeyInput.trim()) {
      setAuthError('Please enter the admin passkey to proceed');
      return;
    }
    setIsVerifying(true);
    setAuthError(null);
    await fetchRecords(passkeyInput.trim());
  };

  const handleSignOut = () => {
    setIsAuthorized(false);
    setAdminKey('');
    setPasskeyInput('');
    setSubmissions([]);
    setStats(null);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('crepe_admin_key');
    }
  };

  // Filtered submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(sub => {
      const matchesSearch = 
        sub.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sub.academicStream && sub.academicStream.toLowerCase().includes(searchQuery.toLowerCase())) ||
        sub.targetColleges.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesBracket = true;
      if (bracketFilter === '98+') matchesBracket = sub.effectivePercentile >= 98;
      else if (bracketFilter === '95-98') matchesBracket = sub.effectivePercentile >= 95 && sub.effectivePercentile < 98;
      else if (bracketFilter === '90-95') matchesBracket = sub.effectivePercentile >= 90 && sub.effectivePercentile < 95;
      else if (bracketFilter === 'BELOW_90') matchesBracket = sub.effectivePercentile < 90;

      let matchesCategory = true;
      if (categoryFilter !== 'ALL') matchesCategory = sub.category === categoryFilter;

      return matchesSearch && matchesBracket && matchesCategory;
    });
  }, [submissions, searchQuery, bracketFilter, categoryFilter]);

  // Export to CSV
  const handleExportCSV = () => {
    if (submissions.length === 0) return;

    const headers = [
      'Candidate ID',
      'Candidate Name',
      'Effective Percentile',
      'IMS SimCAT',
      'TIME AIMCAT',
      'Cracku',
      'Career Launcher CL',
      'Override Percentile',
      'Category',
      'Academic Stream',
      'Total Budget (INR)',
      'Target Colleges',
      'Timestamp'
    ];

    const rows = submissions.map(sub => [
      `"${sub.id}"`,
      `"${sub.candidateName.replace(/"/g, '""')}"`,
      sub.effectivePercentile,
      sub.imsPercentile ?? '',
      sub.timePercentile ?? '',
      sub.crackuPercentile ?? '',
      sub.clPercentile ?? '',
      sub.overridePercentile ?? '',
      `"${sub.category}"`,
      `"${sub.academicStream || ''}"`,
      sub.totalBudget,
      `"${(sub.targetColleges || []).join('; ')}"`,
      `"${sub.timestamp}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `crepe_aspirant_percentiles_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
              <Lock size={28} />
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs font-bold text-amber-500 uppercase tracking-widest">
              <CuteCatLogo size={20} />
              <span>Crepe Admin Intelligence</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Admin Access Gate
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Candidate mock percentiles and individual form planning data are strictly confidential. Only authorized administrators may view aspirant records.
            </p>
          </div>

          <form onSubmit={handleAuthenticate} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Admin Passkey
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  placeholder="Enter admin passkey..."
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-white text-sm font-mono placeholder:text-slate-600 transition"
                />
                <Key size={16} className="absolute right-3.5 top-3.5 text-slate-500" />
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center space-x-2">
                <AlertTriangle size={14} className="shrink-0 text-rose-400" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center space-x-2 transition shadow-lg shadow-amber-500/10 disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Verifying Passkey...</span>
                </>
              ) : (
                <>
                  <Unlock size={16} />
                  <span>Unlock Admin Console</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <Link 
              href="/"
              className="text-slate-400 hover:text-amber-400 transition flex items-center space-x-1"
            >
              <span>&larr; Return to Aspirant Portal</span>
            </Link>
            <span className="text-[10px] font-mono text-slate-600">v2.4 Confidential</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2 group">
              <CuteCatLogo size={36} className="group-hover:scale-105 transition-transform" />
              <div>
                <div className="flex items-baseline space-x-1">
                  <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
                    Crepe
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 block -mt-1">
                  Admin Intelligence Console
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">
              <ShieldCheck size={12} />
              <span>Admin Authorized</span>
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={() => fetchRecords()}
              disabled={isLoading}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 font-bold text-xs flex items-center space-x-1.5 transition text-slate-700 dark:text-slate-300 shadow-sm"
            >
              <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
              <span>Refresh Records</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center space-x-1.5 transition shadow-sm"
            >
              <Download size={13} />
              <span>Export CSV (Excel)</span>
            </button>

            <a
              href={`/api/mock-percentiles?adminKey=${encodeURIComponent(adminKey)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 font-bold text-xs flex items-center space-x-1"
              title="Open raw backend JSON endpoint"
            >
              <Database size={13} />
              <span>Raw JSON</span>
              <ExternalLink size={11} />
            </a>

            <button
              onClick={handleSignOut}
              className="px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 font-bold text-xs flex items-center space-x-1.5 transition"
              title="End administrative session"
            >
              <LogOut size={13} />
              <span>Lock Console</span>
            </button>
          </div>
        </div>

        {/* Hero Title & Description */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            User Mock Percentiles & Form Intent Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time feed of all mock test percentiles submitted by aspirants (IMS, TIME, Cracku, CL, and custom overrides) along with the MBA college forms they intend to purchase.
          </p>
        </div>

        {/* KPI Summary Cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Aspirants</span>
              <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                {stats.totalSubmissions}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">Recorded</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Effective Mean</span>
              <span className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400">
                {stats.avgEffectivePercentile} <span className="text-xs font-normal">%ile</span>
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Normalized</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">IMS SimCAT</span>
              <span className="text-2xl font-black font-mono text-slate-800 dark:text-slate-200">
                {stats.avgIms ?? '--'} <span className="text-xs font-normal">%ile</span>
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Average</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">TIME AIMCAT</span>
              <span className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                {stats.avgTime ?? '--'} <span className="text-xs font-normal">%ile</span>
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Average</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Cracku Mocks</span>
              <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                {stats.avgCracku ?? '--'} <span className="text-xs font-normal">%ile</span>
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Average</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">CL (CDC)</span>
              <span className="text-2xl font-black font-mono text-slate-800 dark:text-slate-200">
                {stats.avgCl ?? '--'} <span className="text-xs font-normal">%ile</span>
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Average</span>
            </div>
          </div>
        )}

        {/* Most Targeted Colleges Radar */}
        {stats?.topTargetedColleges && stats.topTargetedColleges.length > 0 && (
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs shadow-sm">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
              Most Frequently Targeted Colleges Across All Submissions:
            </span>
            <div className="flex flex-wrap gap-2">
              {stats.topTargetedColleges.map((col: any, idx: number) => (
                <div 
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold flex items-center space-x-1.5"
                >
                  <span className="text-slate-900 dark:text-white font-bold">{col.collegeName}</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono text-[10px] font-bold">
                    {col.count} {col.count === 1 ? 'user' : 'users'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate name, category, stream, or targeted college..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <select
              value={bracketFilter}
              onChange={e => setBracketFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold"
            >
              <option value="ALL">All Percentile Brackets</option>
              <option value="98+">98+ Percentile</option>
              <option value="95-98">95 - 98 Percentile</option>
              <option value="90-95">90 - 95 Percentile</option>
              <option value="BELOW_90">Below 90 Percentile</option>
            </select>

            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold"
            >
              <option value="ALL">All Categories</option>
              <option value="General">General / Open</option>
              <option value="NC-OBC">NC-OBC</option>
              <option value="EWS">EWS</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>
        </div>

        {/* Submissions Table Feed */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users size={16} className="text-amber-500" />
              <h2 className="font-black text-sm text-slate-900 dark:text-white">
                Candidate Percentiles Log ({filteredSubmissions.length} of {submissions.length})
              </h2>
            </div>
            <span className="text-xs text-slate-400">Stored persistently in backend database</span>
          </div>

          {filteredSubmissions.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No aspirant submissions found matching the criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950/50 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-3.5">Candidate / Profile</th>
                    <th className="px-4 py-3.5">Effective %ile</th>
                    <th className="px-4 py-3.5">Mocks Detail</th>
                    <th className="px-4 py-3.5">Target Colleges Selected</th>
                    <th className="px-4 py-3.5">Total Form Budget</th>
                    <th className="px-4 py-3.5">Recorded At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredSubmissions.map(sub => (
                    <tr 
                      key={sub.id} 
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition cursor-pointer"
                      onClick={() => setSelectedSubmission(sub)}
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 dark:text-white">{sub.candidateName}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {sub.category} &bull; {sub.academicStream || 'General'}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="font-mono font-black text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-xl border border-amber-200 dark:border-amber-900/60">
                          {sub.effectivePercentile}%ile
                        </span>
                        {sub.overridePercentile && (
                          <span className="block text-[9px] text-slate-400 mt-1 font-semibold">
                            Manual Override
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                        <div className="space-y-0.5">
                          {sub.imsPercentile && <div>IMS: <span className="font-bold text-slate-900 dark:text-white">{sub.imsPercentile}</span></div>}
                          {sub.timePercentile && <div>TIME: <span className="font-bold text-indigo-600 dark:text-indigo-400">{sub.timePercentile}</span></div>}
                          {sub.crackuPercentile && <div>Cracku: <span className="font-bold text-emerald-600 dark:text-emerald-400">{sub.crackuPercentile}</span></div>}
                          {sub.clPercentile && <div>CL: <span className="font-bold text-slate-900 dark:text-white">{sub.clPercentile}</span></div>}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[280px]">
                          {sub.targetColleges && sub.targetColleges.slice(0, 5).map((col, idx) => (
                            <span 
                              key={idx} 
                              className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700"
                            >
                              {col}
                            </span>
                          ))}
                          {sub.targetColleges && sub.targetColleges.length > 5 && (
                            <span className="text-[10px] text-slate-400 font-bold self-center">
                              +{sub.targetColleges.length - 5} more
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-4 font-mono font-bold text-slate-900 dark:text-white">
                        ₹{sub.totalBudget.toLocaleString('en-IN')}
                      </td>

                      <td className="px-4 py-4 text-[11px] text-slate-400 whitespace-nowrap">
                        {new Date(sub.timestamp).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detailed Modal / Inspector if a candidate is clicked */}
        {selectedSubmission && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
              <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="font-black text-base text-slate-900 dark:text-white">
                    {selectedSubmission.candidateName}
                  </h3>
                  <span className="text-xs text-slate-400">
                    ID: {selectedSubmission.id} &bull; {selectedSubmission.category} &bull; {selectedSubmission.academicStream}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Effective CAT %ile</span>
                    <span className="text-xl font-black font-mono text-amber-600 dark:text-amber-400">
                      {selectedSubmission.effectivePercentile}%ile
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Planned Form Budget</span>
                    <span className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                      ₹{selectedSubmission.totalBudget.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1 font-mono">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Mock Scores Entered:</span>
                  <div>IMS (SimCAT): {selectedSubmission.imsPercentile ?? 'Not entered'}</div>
                  <div>TIME (AIMCAT): {selectedSubmission.timePercentile ?? 'Not entered'}</div>
                  <div>CRACKU: {selectedSubmission.crackuPercentile ?? 'Not entered'}</div>
                  <div>CL (CDC): {selectedSubmission.clPercentile ?? 'Not entered'}</div>
                  {selectedSubmission.overridePercentile && (
                    <div className="text-amber-600 font-bold">Manual Override: {selectedSubmission.overridePercentile}%ile</div>
                  )}
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">
                    Target Colleges Selected ({selectedSubmission.targetColleges.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1">
                    {selectedSubmission.targetColleges.map((col, idx) => (
                      <span key={idx} className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-[11px] text-slate-800 dark:text-slate-200">
                        {col}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                  <span>Submission Timestamp:</span>
                  <span>{new Date(selectedSubmission.timestamp).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedSubmission(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs"
              >
                Close Inspector
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
