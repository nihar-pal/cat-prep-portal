import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface MockPercentileSubmission {
  id: string;
  candidateName: string;
  imsPercentile: number | null;
  timePercentile: number | null;
  crackuPercentile: number | null;
  clPercentile: number | null;
  overridePercentile: number | null;
  effectivePercentile: number;
  category: string;
  academicStream?: string;
  targetColleges: string[];
  totalBudget: number;
  timestamp: string;
  notes?: string;
}

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'mockPercentileSubmissions.json');

// In-memory fallback if file system is read-only (e.g. serverless)
let inMemorySubmissions: MockPercentileSubmission[] = [];

function loadSubmissions(): MockPercentileSubmission[] {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemorySubmissions = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading mockPercentileSubmissions.json:', err);
  }
  return inMemorySubmissions;
}

function saveSubmissions(submissions: MockPercentileSubmission[]) {
  inMemorySubmissions = submissions;
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(submissions, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not persist to file system (operating in memory mode):', err);
  }
}

function computeStatistics(submissions: MockPercentileSubmission[]) {
  if (submissions.length === 0) {
    return {
      totalSubmissions: 0,
      avgEffectivePercentile: 0,
      avgIms: 0,
      avgTime: 0,
      avgCracku: 0,
      avgCl: 0,
      brackets: {
        below85: 0,
        from85to90: 0,
        from90to95: 0,
        from95to98: 0,
        above98: 0,
      },
      topTargetedColleges: [],
    };
  }

  let totalEffective = 0;
  let imsSum = 0, imsCount = 0;
  let timeSum = 0, timeCount = 0;
  let crackuSum = 0, crackuCount = 0;
  let clSum = 0, clCount = 0;

  const brackets = {
    below85: 0,
    from85to90: 0,
    from90to95: 0,
    from95to98: 0,
    above98: 0,
  };

  const collegeCountMap: Record<string, number> = {};

  submissions.forEach(sub => {
    totalEffective += sub.effectivePercentile;
    const p = sub.effectivePercentile;

    if (p < 85) brackets.below85++;
    else if (p < 90) brackets.from85to90++;
    else if (p < 95) brackets.from90to95++;
    else if (p < 98) brackets.from95to98++;
    else brackets.above98++;

    if (typeof sub.imsPercentile === 'number') {
      imsSum += sub.imsPercentile;
      imsCount++;
    }
    if (typeof sub.timePercentile === 'number') {
      timeSum += sub.timePercentile;
      timeCount++;
    }
    if (typeof sub.crackuPercentile === 'number') {
      crackuSum += sub.crackuPercentile;
      crackuCount++;
    }
    if (typeof sub.clPercentile === 'number') {
      clSum += sub.clPercentile;
      clCount++;
    }

    if (Array.isArray(sub.targetColleges)) {
      sub.targetColleges.forEach(col => {
        collegeCountMap[col] = (collegeCountMap[col] || 0) + 1;
      });
    }
  });

  const topTargetedColleges = Object.entries(collegeCountMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([collegeName, count]) => ({ collegeName, count }));

  return {
    totalSubmissions: submissions.length,
    avgEffectivePercentile: +(totalEffective / submissions.length).toFixed(1),
    avgIms: imsCount > 0 ? +(imsSum / imsCount).toFixed(1) : null,
    avgTime: timeCount > 0 ? +(timeSum / timeCount).toFixed(1) : null,
    avgCracku: crackuCount > 0 ? +(crackuSum / crackuCount).toFixed(1) : null,
    avgCl: clCount > 0 ? +(clSum / clCount).toFixed(1) : null,
    brackets,
    topTargetedColleges,
  };
}

export async function GET() {
  try {
    const submissions = loadSubmissions();
    const sorted = [...submissions].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    const stats = computeStatistics(sorted);

    return NextResponse.json({
      success: true,
      submissions: sorted,
      stats,
    });
  } catch (error) {
    console.error('GET /api/mock-percentiles error:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve percentile records' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      candidateName,
      imsPercentile,
      timePercentile,
      crackuPercentile,
      clPercentile,
      overridePercentile,
      effectivePercentile,
      category = 'General',
      academicStream = 'Not Specified',
      targetColleges = [],
      totalBudget = 0,
      notes = '',
    } = body;

    if (typeof effectivePercentile !== 'number' || effectivePercentile < 0 || effectivePercentile > 100) {
      return NextResponse.json(
        { success: false, error: 'A valid effective percentile between 0 and 100 is required' },
        { status: 400 }
      );
    }

    const currentSubmissions = loadSubmissions();

    const newRecord: MockPercentileSubmission = {
      id: `sub_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      candidateName: (candidateName && candidateName.trim()) ? candidateName.trim() : `Aspirant #${Math.floor(1000 + Math.random() * 9000)}`,
      imsPercentile: typeof imsPercentile === 'number' ? +imsPercentile.toFixed(2) : null,
      timePercentile: typeof timePercentile === 'number' ? +timePercentile.toFixed(2) : null,
      crackuPercentile: typeof crackuPercentile === 'number' ? +crackuPercentile.toFixed(2) : null,
      clPercentile: typeof clPercentile === 'number' ? +clPercentile.toFixed(2) : null,
      overridePercentile: typeof overridePercentile === 'number' ? +overridePercentile.toFixed(2) : null,
      effectivePercentile: +effectivePercentile.toFixed(2),
      category,
      academicStream,
      targetColleges: Array.isArray(targetColleges) ? targetColleges.slice(0, 20) : [],
      totalBudget: typeof totalBudget === 'number' ? totalBudget : 0,
      timestamp: new Date().toISOString(),
      notes: typeof notes === 'string' ? notes.slice(0, 300) : '',
    };

    const updated = [newRecord, ...currentSubmissions];
    saveSubmissions(updated);
    const stats = computeStatistics(updated);

    return NextResponse.json({
      success: true,
      message: 'Mock percentile record saved successfully',
      submission: newRecord,
      stats,
    });
  } catch (error) {
    console.error('POST /api/mock-percentiles error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error processing submission' }, { status: 500 });
  }
}
