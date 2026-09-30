'use client';

import React, { useState, useMemo } from 'react';
import { 
  UserCheck, 
  GraduationCap, 
  Briefcase, 
  Percent, 
  Target, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { 
  UserProfileData, 
  AcademicStream, 
  GraduationDiscipline, 
  SocialCategory, 
  CandidateGender 
} from '@/types/profile';
import { evaluateProfile } from '@/data/profileEvaluationLogic';

export const ProfileEvaluatorView: React.FC = () => {
  // Candidate form inputs with strong defaults
  const [tenth, setTenth] = useState<number>(88);
  const [twelfth, setTwelfth] = useState<number>(86);
  const [twelfthStream, setTwelfthStream] = useState<AcademicStream>('Science');
  const [grad, setGrad] = useState<number>(78);
  const [discipline, setDiscipline] = useState<GraduationDiscipline>('Engineering / Technology');
  const [workEx, setWorkEx] = useState<number>(20);
  const [category, setCategory] = useState<SocialCategory>('General / Open');
  const [gender, setGender] = useState<CandidateGender>('Male');
  const [percentile, setPercentile] = useState<number>(98.5);

  const [filterTier, setFilterTier] = useState<'ALL' | 'SAFE' | 'TARGET' | 'DREAM'>('ALL');

  const evaluation = useMemo(() => {
    const profileData: UserProfileData = {
      tenthPercentage: tenth,
      twelfthPercentage: twelfth,
      twelfthStream,
      graduationPercentage: grad,
      graduationDiscipline: discipline,
      workExperienceMonths: workEx,
      category,
      gender,
      currentPercentile: percentile
    };
    return evaluateProfile(profileData);
  }, [tenth, twelfth, twelfthStream, grad, discipline, workEx, category, gender, percentile]);

  const filteredVerdicts = evaluation.verdicts.filter(v => {
    if (filterTier === 'SAFE') return v.categoryCallStatus === 'High Probability (Safe)';
    if (filterTier === 'TARGET') return v.categoryCallStatus === 'Realistic Call (Target)';
    if (filterTier === 'DREAM') return v.categoryCallStatus === 'Ambitious (Dream)';
    return true;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Header Banner - Clean Minimalist Dark Charcoal */}
      <div className="bg-zinc-900 text-zinc-100 rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
            <UserCheck size={16} />
            <span>IIM Composite Score (CS) Simulator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            MBA Profile Evaluator & Personalized Cut-offs
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
            IIM cutoffs depend heavily on your 10th/12th/Grad scores, academic stream, gender diversity points, and work experience. See the exact percentile *you* need for each top college.
          </p>
        </div>

        {/* Live Profile Score Card Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-zinc-800 text-xs">
          <div>
            <div className="text-zinc-400 text-[11px]">Academic Rating</div>
            <div className="text-base font-bold text-white mt-0.5">{evaluation.profileRating}</div>
          </div>
          <div>
            <div className="text-zinc-400 text-[11px]">Profile Strength</div>
            <div className="text-base font-bold text-amber-400 mt-0.5">{evaluation.compositeRatingScore} / 100</div>
          </div>
          <div>
            <div className="text-zinc-400 text-[11px]">Diversity Points</div>
            <div className="text-base font-bold text-emerald-400 mt-0.5">
              +{evaluation.academicDiversityBonus + evaluation.genderDiversityBonus} pts
            </div>
          </div>
          <div>
            <div className="text-zinc-400 text-[11px]">Work Ex Score</div>
            <div className="text-base font-bold text-zinc-200 mt-0.5">{evaluation.workExPoints} / 10</div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Input Matrix */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Enter Your Academic & Demographic Profile
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Adjust sliders and dropdowns to observe how your college call probabilities adapt instantly.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
            Real-Time Simulation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Column 1: Schooling */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                <span>10th Standard:</span>
                <span className="font-mono text-amber-600 dark:text-amber-400">{tenth}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={tenth}
                onChange={e => setTenth(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                <span>12th Standard:</span>
                <span className="font-mono text-amber-600 dark:text-amber-400">{twelfth}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={twelfth}
                onChange={e => setTwelfth(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">12th Stream</label>
              <select
                value={twelfthStream}
                onChange={e => setTwelfthStream(e.target.value as AcademicStream)}
                className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
              >
                <option value="Science">Science (PCM/PCB)</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts / Humanities">Arts / Humanities</option>
              </select>
            </div>
          </div>

          {/* Column 2: Graduation & Work Experience */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                <span>Graduation Percentage:</span>
                <span className="font-mono text-amber-600 dark:text-amber-400">{grad}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={grad}
                onChange={e => setGrad(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">Graduation Discipline</label>
              <select
                value={discipline}
                onChange={e => setDiscipline(e.target.value as GraduationDiscipline)}
                className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
              >
                <option value="Engineering / Technology">Engineering / Technology (B.Tech/BE)</option>
                <option value="Commerce / Economics">Commerce / Economics (B.Com/B.Sc Eco)</option>
                <option value="Arts / Humanities">Arts / Humanities (BA)</option>
                <option value="Management (BBA/BMS)">Management (BBA / BMS / BBS)</option>
                <option value="Science / Medicine">Science / Medicine / Pharma</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                <span>Work Experience (Months):</span>
                <span className="font-mono text-amber-600 dark:text-amber-400">{workEx} months ({Math.floor(workEx/12)}y {workEx%12}m)</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={workEx}
                onChange={e => setWorkEx(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-zinc-400 block mt-0.5">Sweet spot: 24 to 36 months</span>
            </div>
          </div>

          {/* Column 3: Category, Gender & Percentile */}
          <div className="space-y-4">
            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">Social Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as SocialCategory)}
                className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
              >
                <option value="General / Open">General / Open (UR)</option>
                <option value="NC-OBC">NC-OBC (Non-Creamy Layer)</option>
                <option value="EWS">EWS (Economically Weaker Section)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="PwD">PwD (Persons with Benchmark Disabilities)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">Gender</label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value as CandidateGender)}
                className="w-full p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary / Other">Non-Binary / Transgender</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                <span>Target / Mock CAT Percentile:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{percentile}%ile</span>
              </div>
              <input
                type="range"
                min="70"
                max="100"
                step="0.5"
                value={percentile}
                onChange={e => setPercentile(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Demographic Diagnosis Capsule */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/80 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-zinc-900 dark:text-zinc-100">Demographic Archetype:</span>
            <span className="px-2.5 py-0.5 rounded-full font-bold bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200">
              {discipline === 'Engineering / Technology' ? 'Engineer' : 'Non-Engineer'} &bull; {gender} &bull; {category}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-zinc-500">
            {discipline === 'Engineering / Technology' && gender === 'Male' && category === 'General / Open' ? (
              <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center space-x-1">
                <AlertTriangle size={13} />
                <span>GEM Profile (Requires maximum CAT percentile focus)</span>
              </span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1">
                <CheckCircle2 size={13} />
                <span>Diversity Advantage Active (Calls at lower percentiles)</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. Personalized Call Predictions & Cutoff Shortlist */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center space-x-2">
              <Building2 size={18} className="text-amber-500" />
              <span>Personalized College Cut-off & Call Forecast</span>
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Based on your unique 10th/12th/Grad scores, work-ex, and diversity matrix.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 text-xs">
            <button
              onClick={() => setFilterTier('ALL')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                filterTier === 'ALL'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
              }`}
            >
              All ({evaluation.verdicts.length})
            </button>
            <button
              onClick={() => setFilterTier('SAFE')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                filterTier === 'SAFE'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
              }`}
            >
              High Probability
            </button>
            <button
              onClick={() => setFilterTier('TARGET')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                filterTier === 'TARGET'
                  ? 'bg-amber-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
              }`}
            >
              Target Range
            </button>
            <button
              onClick={() => setFilterTier('DREAM')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                filterTier === 'DREAM'
                  ? 'bg-rose-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
              }`}
            >
              Ambitious
            </button>
          </div>
        </div>

        {/* Verdict Cards List */}
        <div className="space-y-3">
          {filteredVerdicts.map(verdict => {
            const isSafe = verdict.categoryCallStatus === 'High Probability (Safe)';
            const isTarget = verdict.categoryCallStatus === 'Realistic Call (Target)';

            return (
              <div
                key={verdict.collegeId}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                        {verdict.collegeName}
                      </h4>
                      <span className="text-[10px] text-zinc-400 font-semibold">
                        {verdict.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] border ${
                      isSafe
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                        : isTarget
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                        : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                    }`}>
                      {verdict.categoryCallStatus}
                    </span>
                  </div>
                </div>

                {/* Cutoff comparison: Benchmark vs Personalized */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-zinc-50/70 dark:bg-zinc-800/30 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/80">
                  <div>
                    <span className="text-zinc-400 text-[10px] block">Public Average Benchmark</span>
                    <strong className="text-zinc-700 dark:text-zinc-300 font-mono text-sm">{verdict.generalBenchmarkPercentile}%ile</strong>
                  </div>

                  <div>
                    <span className="text-zinc-400 text-[10px] block">Target Percentile For YOUR Profile</span>
                    <strong className="text-amber-600 dark:text-amber-400 font-mono text-sm font-bold">
                      {verdict.requiredPercentileForYou}%ile
                    </strong>
                  </div>

                  <div>
                    <span className="text-zinc-400 text-[10px] block">Your Current Mock Position</span>
                    <span className={`font-mono text-sm font-bold ${
                      percentile >= verdict.requiredPercentileForYou ? 'text-emerald-600' : 'text-rose-500'
                    }`}>
                      {percentile}%ile ({percentile >= verdict.requiredPercentileForYou ? 'Surpassed' : 'Need +' + (verdict.requiredPercentileForYou - percentile).toFixed(1) + '%ile'})
                    </span>
                  </div>
                </div>

                {/* Factors & Advice */}
                <div className="space-y-1.5 pt-1 text-[11px]">
                  {verdict.factorsBenefitingYou.length > 0 && (
                    <div className="flex items-start space-x-1.5 text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 size={13} className="shrink-0 mt-0.5" />
                      <span><strong>Advantage:</strong> {verdict.factorsBenefitingYou.join(' • ')}</span>
                    </div>
                  )}

                  {verdict.factorsChallengingYou.length > 0 && (
                    <div className="flex items-start space-x-1.5 text-amber-700 dark:text-amber-400">
                      <AlertTriangle size={13} className="shrink-0 mt-0.5" />
                      <span><strong>Challenge:</strong> {verdict.factorsChallengingYou.join(' • ')}</span>
                    </div>
                  )}

                  <div className="text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800">
                    <strong>Strategy Note:</strong> {verdict.strategicAdvice}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
