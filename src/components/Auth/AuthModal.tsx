'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, User, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { CuteCatLogo } from '@/components/CuteCatLogo';
import { ExamType } from '@/types/exam';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose,
  initialMode = 'login' 
}) => {
  const { login, register, quickDemoLogin } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetExam, setTargetExam] = useState<ExamType>('CAT');
  const [targetPercentile, setTargetPercentile] = useState('99+ %ile');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'login') {
        const success = await login(email, password);
        if (success) {
          onClose();
        } else {
          setError('Invalid credentials.');
        }
      } else {
        if (!name) {
          setError('Please provide your name.');
          setLoading(false);
          return;
        }
        const success = await register(name, email, password, targetExam, targetPercentile);
        if (success) {
          onClose();
        } else {
          setError('Registration failed.');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    quickDemoLogin();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 relative overflow-hidden font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-full transition"
        >
          <X size={18} />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <CuteCatLogo size={48} />
          </div>
          <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
            {mode === 'login' ? 'Welcome back to Crepe' : 'Create your Crepe Account'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track your MBA applications, target percentiles & daily progress
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800/70 p-1 rounded-xl mb-6 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === 'login'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); }}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === 'register'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400 font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">Your Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Nihar Pal"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">Email Address</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">Primary Exam</label>
                <select
                  value={targetExam}
                  onChange={e => setTargetExam(e.target.value as ExamType)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="CAT">CAT (IIMs)</option>
                  <option value="XAT">XAT (XLRI)</option>
                  <option value="NMAT">NMAT (NMIMS)</option>
                  <option value="SNAP">SNAP (SIBM)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">Goal Percentile</label>
                <select
                  value={targetPercentile}
                  onChange={e => setTargetPercentile(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="99.5+ %ile">99.5+ %ile</option>
                  <option value="99+ %ile">99+ %ile</option>
                  <option value="95+ %ile">95+ %ile</option>
                  <option value="90+ %ile">90+ %ile</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs shadow-sm transition flex items-center justify-center space-x-1.5"
          >
            <span>{mode === 'login' ? 'Sign In to Crepe' : 'Create My Account'}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 mb-2">Want to explore right away?</p>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/50 text-xs font-bold transition flex items-center justify-center space-x-1.5"
          >
            <Sparkles size={13} className="text-amber-500 fill-amber-500" />
            <span>1-Click Demo Login (Aspirant Profile)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
