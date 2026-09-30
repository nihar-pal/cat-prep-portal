import { ExamType } from './exam';

export type ApplicationStatus = 
  | 'Not Started'
  | 'Interested'
  | 'Drafting Application'
  | 'Form Submitted'
  | 'Interview Shortlisted'
  | 'Converted'
  | 'Waitlisted'
  | 'Rejected';

export interface College {
  id: string;
  name: string;
  shortName: string;
  location: string;
  nirfRank?: number;
  flagshipProgram: string;
  acceptedExams: ExamType[];
  tuitionFeeLakhs: number; // In Lakhs INR
  additionalExpensesLakhs?: number;
  placements: {
    averageCtcLakhs: number; // Average CTC in LPA
    medianCtcLakhs: number;
    highestDomesticCtcLakhs?: number;
    top25PercentileCtcLakhs?: number;
    batchSize?: number;
    year: string;
  };
  cutoffs: {
    exam: ExamType;
    overallPercentileOrScore: string; // e.g. "99+ %ile" or "235+ Score"
    sectionalCutoffReq: boolean;
    sectionalDetails?: string;
  }[];
  application: {
    lastDate: string; // YYYY-MM-DD
    extendedDate?: string;
    formFee: number; // INR
    portalUrl: string;
    stage: 'Open' | 'Closing Soon' | 'Closed' | 'Opening Soon';
    mandatoryDocuments: string[];
  };
  highlights: string[];
  selectionCriteria: {
    examScoreWeight: number; // e.g. 50%
    interviewWeight: number; // e.g. 30%
    academicsAndWorkExWeight: number; // e.g. 20%
  };
}

export interface UserCollegeApplication {
  collegeId: string;
  status: ApplicationStatus;
  applicationNumber?: string;
  submissionDate?: string;
  interviewDate?: string;
  personalNotes?: string;
  userPriority?: 'High' | 'Medium' | 'Low';
  reminderSet?: boolean;
}
