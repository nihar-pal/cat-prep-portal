'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ExamType } from '@/types/exam';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  targetExam: ExamType;
  targetPercentile: string;
  studyStreakDays: number;
  joinedDate: string;
  avatarSeed?: string;
  savedCollegeIds: string[];
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string, targetExam: ExamType, targetPercentile: string) => Promise<boolean>;
  logout: () => void;
  toggleSaveCollege: (collegeId: string) => void;
  quickDemoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('crepe_user_session');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    // Check registered accounts in localStorage
    try {
      const storedAccounts = localStorage.getItem('crepe_accounts');
      const accounts: Array<UserProfile & { password?: string }> = storedAccounts ? JSON.parse(storedAccounts) : [];
      
      const found = accounts.find(a => a.email.toLowerCase() === email.toLowerCase());
      if (found) {
        const { password, ...cleanProfile } = found;
        setUser(cleanProfile);
        localStorage.setItem('crepe_user_session', JSON.stringify(cleanProfile));
        return true;
      }

      // If no stored account matches, allow login with a fresh generated profile for smooth onboarding
      const fallbackUser: UserProfile = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        targetExam: 'CAT',
        targetPercentile: '99+ %ile',
        studyStreakDays: 5,
        joinedDate: new Date().toLocaleDateString(),
        savedCollegeIds: ['iim-ahmedabad', 'fms-delhi', 'spjimr-mumbai']
      };
      setUser(fallbackUser);
      localStorage.setItem('crepe_user_session', JSON.stringify(fallbackUser));
      return true;
    } catch (e) {
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    pass: string,
    targetExam: ExamType,
    targetPercentile: string
  ): Promise<boolean> => {
    try {
      const newProfile: UserProfile = {
        id: `user-${Date.now()}`,
        name,
        email,
        targetExam,
        targetPercentile,
        studyStreakDays: 1,
        joinedDate: new Date().toLocaleDateString(),
        savedCollegeIds: ['iim-ahmedabad', 'fms-delhi']
      };

      // Persist in accounts list
      const storedAccounts = localStorage.getItem('crepe_accounts');
      const accounts = storedAccounts ? JSON.parse(storedAccounts) : [];
      accounts.push({ ...newProfile, password: pass });
      localStorage.setItem('crepe_accounts', JSON.stringify(accounts));

      // Set active session
      setUser(newProfile);
      localStorage.setItem('crepe_user_session', JSON.stringify(newProfile));
      return true;
    } catch (e) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('crepe_user_session');
  };

  const toggleSaveCollege = (collegeId: string) => {
    if (!user) return;
    const exists = user.savedCollegeIds.includes(collegeId);
    const updated = exists 
      ? user.savedCollegeIds.filter(id => id !== collegeId)
      : [...user.savedCollegeIds, collegeId];

    const updatedUser = { ...user, savedCollegeIds: updated };
    setUser(updatedUser);
    localStorage.setItem('crepe_user_session', JSON.stringify(updatedUser));
  };

  const quickDemoLogin = () => {
    const demoUser: UserProfile = {
      id: 'demo-aspirant-99',
      name: 'Nihar',
      email: 'nihar@crepe.app',
      targetExam: 'CAT',
      targetPercentile: '99.5+ %ile',
      studyStreakDays: 7,
      joinedDate: 'Oct 2026',
      savedCollegeIds: ['iim-ahmedabad', 'fms-delhi', 'xlri-jamshedpur', 'spjimr-mumbai']
    };
    setUser(demoUser);
    localStorage.setItem('crepe_user_session', JSON.stringify(demoUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        toggleSaveCollege,
        quickDemoLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
