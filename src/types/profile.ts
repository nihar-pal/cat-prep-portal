export type AcademicStream = 'Science' | 'Commerce' | 'Arts / Humanities';
export type GraduationDiscipline = 'Engineering / Technology' | 'Commerce / Economics' | 'Arts / Humanities' | 'Science / Medicine' | 'Management (BBA/BMS)';
export type SocialCategory = 'General / Open' | 'NC-OBC' | 'EWS' | 'SC' | 'ST' | 'PwD';
export type CandidateGender = 'Male' | 'Female' | 'Non-Binary / Other';

export interface UserProfileData {
  tenthPercentage: number;
  twelfthPercentage: number;
  twelfthStream: AcademicStream;
  graduationPercentage: number;
  graduationDiscipline: GraduationDiscipline;
  workExperienceMonths: number;
  category: SocialCategory;
  gender: CandidateGender;
  currentPercentile: number; // e.g. 98.2
}

export interface CollegeProfileVerdict {
  collegeId: string;
  collegeName: string;
  location: string;
  categoryCallStatus: 'High Probability (Safe)' | 'Realistic Call (Target)' | 'Ambitious (Dream)';
  requiredPercentileForYou: number; // e.g. 97.5 for non-eng female vs 99.7 for GEM
  generalBenchmarkPercentile: number; // general public benchmark
  compositeScoreEstimate: number; // 0 to 100
  factorsBenefitingYou: string[];
  factorsChallengingYou: string[];
  strategicAdvice: string;
}

export interface ProfileEvaluationResult {
  profileRating: string; // e.g. "8/9/8 Strong Academic Profile"
  compositeRatingScore: number; // out of 100
  academicDiversityBonus: number; // 0 to 5 points
  genderDiversityBonus: number; // 0 to 5 points
  workExPoints: number; // 0 to 10 points
  verdicts: CollegeProfileVerdict[];
  keyStrengths: string[];
  criticalGaps: string[];
  recommendedExams: string[];
}
