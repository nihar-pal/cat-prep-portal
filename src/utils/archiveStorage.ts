import { ArchivedTestSession, ExamType, Question, UserResponse } from '@/types/exam';
import { EXAM_CONFIGS } from '@/data/multiExamConfigs';

const ARCHIVES_STORAGE_KEY = 'crepe_test_archives_v1';
const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000;

export interface TimeRemainingInfo {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
  isExpired: boolean;
  percentRemaining: number;
}

export function saveTestToArchive(params: {
  testTitle: string;
  exam: ExamType;
  questions: Question[];
  responses: Record<string, UserResponse>;
  totalTimeSeconds: number;
}): ArchivedTestSession {
  const { testTitle, exam, questions, responses, totalTimeSeconds } = params;
  const config = EXAM_CONFIGS[exam] || EXAM_CONFIGS.CAT;

  let totalScore = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let attemptedQuestions = 0;

  const sectionScores: Record<string, {
    score: number;
    attempted: number;
    correct: number;
    wrong: number;
    accuracy: number;
    timeSpentSeconds: number;
  }> = {};

  questions.forEach(q => {
    const resp = responses[q.id];
    const secKey = q.section;

    if (!sectionScores[secKey]) {
      sectionScores[secKey] = {
        score: 0,
        attempted: 0,
        correct: 0,
        wrong: 0,
        accuracy: 0,
        timeSpentSeconds: 0
      };
    }

    if (resp && resp.userAnswer && resp.userAnswer.trim().length > 0) {
      attemptedQuestions++;
      sectionScores[secKey].attempted++;
      sectionScores[secKey].timeSpentSeconds += resp.timeSpentSeconds || 0;

      const isCorrect = resp.userAnswer.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase();
      if (isCorrect) {
        correctCount++;
        sectionScores[secKey].correct++;
        const delta = q.type === 'TITA' ? config.scoring.correctTita : config.scoring.correctMcq;
        totalScore += delta;
        sectionScores[secKey].score += delta;
      } else {
        wrongCount++;
        sectionScores[secKey].wrong++;
        const delta = q.type === 'TITA' ? config.scoring.incorrectTita : config.scoring.incorrectMcq;
        totalScore += delta;
        sectionScores[secKey].score += delta;
      }
    }
  });

  // Calculate sectional accuracies
  Object.keys(sectionScores).forEach(secKey => {
    const s = sectionScores[secKey];
    s.accuracy = s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0;
  });

  const maxScore = questions.length * config.scoring.correctMcq;
  const accuracy = attemptedQuestions > 0 ? Math.round((correctCount / attemptedQuestions) * 100) : 0;

  // Approximate percentile estimation based on exam
  let percentileEstimate = 75;
  const ratio = maxScore > 0 ? totalScore / maxScore : 0;
  if (ratio >= 0.70) percentileEstimate = 99.5;
  else if (ratio >= 0.55) percentileEstimate = 98.0;
  else if (ratio >= 0.40) percentileEstimate = 94.0;
  else if (ratio >= 0.28) percentileEstimate = 88.0;
  else if (ratio >= 0.15) percentileEstimate = 78.0;
  else percentileEstimate = Math.max(50, Math.round(ratio * 100));

  const now = Date.now();
  const completedAt = new Date(now).toISOString();
  const expiresAt = new Date(now + FORTY_EIGHT_HOURS_MS).toISOString();

  const newArchive: ArchivedTestSession = {
    id: `archive_${now}_${Math.random().toString(36).substring(2, 7)}`,
    testTitle,
    exam,
    completedAt,
    expiresAt,
    totalTimeSeconds,
    totalScore,
    maxScore,
    accuracy,
    percentileEstimate,
    totalQuestions: questions.length,
    attemptedQuestions,
    correctCount,
    wrongCount,
    sectionScores,
    responses,
    questions
  };

  if (typeof window !== 'undefined') {
    try {
      const existingStr = localStorage.getItem(ARCHIVES_STORAGE_KEY);
      let existing: ArchivedTestSession[] = existingStr ? JSON.parse(existingStr) : [];
      // Keep most recent 50 archives to maintain storage sanity
      existing = [newArchive, ...existing].slice(0, 50);
      localStorage.setItem(ARCHIVES_STORAGE_KEY, JSON.stringify(existing));
    } catch (err) {
      console.error('Failed to save test to 48-hour archives:', err);
    }
  }

  return newArchive;
}

export function getArchivedTests(includeExpired = true): ArchivedTestSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ARCHIVES_STORAGE_KEY);
    if (!raw) return [];
    const parsed: ArchivedTestSession[] = JSON.parse(raw);
    const now = Date.now();

    if (includeExpired) {
      return parsed;
    }

    return parsed.filter(item => {
      const expTime = new Date(item.expiresAt).getTime();
      return expTime > now;
    });
  } catch (err) {
    console.error('Failed to load archived tests:', err);
    return [];
  }
}

export function getArchivedTestById(id: string): ArchivedTestSession | null {
  const all = getArchivedTests(true);
  return all.find(item => item.id === id) || null;
}

export function deleteArchivedTest(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const all = getArchivedTests(true);
    const updated = all.filter(t => t.id !== id);
    localStorage.setItem(ARCHIVES_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete archived test:', err);
  }
}

export function clearAllArchivedTests(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(ARCHIVES_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear archives:', err);
  }
}

export function getArchiveTimeLeft(expiresAt: string, completedAt?: string): TimeRemainingInfo {
  const now = Date.now();
  const expireTime = new Date(expiresAt).getTime();
  const diffMs = expireTime - now;

  if (diffMs <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      formatted: 'Expired',
      isExpired: true,
      percentRemaining: 0
    };
  }

  const totalSecs = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSecs / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;

  const totalWindow = completedAt 
    ? expireTime - new Date(completedAt).getTime()
    : FORTY_EIGHT_HOURS_MS;
  const percentRemaining = Math.max(0, Math.min(100, Math.round((diffMs / totalWindow) * 100)));

  let formatted = '';
  if (hours > 0) {
    formatted = `${hours}h ${minutes}m left`;
  } else if (minutes > 0) {
    formatted = `${minutes}m ${seconds}s left`;
  } else {
    formatted = `${seconds}s left`;
  }

  return {
    hours,
    minutes,
    seconds,
    formatted,
    isExpired: false,
    percentRemaining
  };
}
