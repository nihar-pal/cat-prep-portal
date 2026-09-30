import { College } from '@/types/college';

export const TOP_MBA_COLLEGES: College[] = [
  {
    id: 'iim-ahmedabad',
    name: 'Indian Institute of Management Ahmedabad',
    shortName: 'IIM Ahmedabad',
    location: 'Ahmedabad, Gujarat',
    nirfRank: 1,
    flagshipProgram: 'PGP (Post Graduate Programme in Management)',
    acceptedExams: ['CAT'],
    tuitionFeeLakhs: 25.0,
    additionalExpensesLakhs: 2.0,
    placements: {
      averageCtcLakhs: 34.36,
      medianCtcLakhs: 31.50,
      highestDomesticCtcLakhs: 115.0,
      top25PercentileCtcLakhs: 44.5,
      batchSize: 395,
      year: '2024'
    },
    cutoffs: [
      {
        exam: 'CAT',
        overallPercentileOrScore: '99.5+ %ile',
        sectionalCutoffReq: true,
        sectionalDetails: 'VARC: 80%ile, DILR: 75%ile, QA: 75%ile (Strict CS Formula)'
      }
    ],
    application: {
      lastDate: '2026-09-20',
      formFee: 2500, // Included in CAT registration
      portalUrl: 'https://www.iima.ac.in',
      stage: 'Closed',
      mandatoryDocuments: ['CAT Scorecard', 'Graduation Marksheets', 'Work Experience Letters', 'Category Certificate (if applicable)']
    },
    highlights: [
      'Ranked #1 MBA College in India (NIRF)',
      'Global prestige with elite MBB (McKinsey, BCG, Bain) presence',
      'Pioneer of case-study pedagogy in India'
    ],
    selectionCriteria: {
      examScoreWeight: 65,
      interviewWeight: 25,
      academicsAndWorkExWeight: 10
    }
  },
  {
    id: 'iim-bangalore',
    name: 'Indian Institute of Management Bangalore',
    shortName: 'IIM Bangalore',
    location: 'Bengaluru, Karnataka',
    nirfRank: 2,
    flagshipProgram: 'PGP (MBA)',
    acceptedExams: ['CAT'],
    tuitionFeeLakhs: 24.5,
    additionalExpensesLakhs: 2.0,
    placements: {
      averageCtcLakhs: 35.31,
      medianCtcLakhs: 33.0,
      highestDomesticCtcLakhs: 110.0,
      top25PercentileCtcLakhs: 46.0,
      batchSize: 512,
      year: '2024'
    },
    cutoffs: [
      {
        exam: 'CAT',
        overallPercentileOrScore: '99.3+ %ile',
        sectionalCutoffReq: true,
        sectionalDetails: 'VARC: 80%ile, DILR: 75%ile, QA: 75%ile (High Academic Profile weight)'
      }
    ],
    application: {
      lastDate: '2026-09-20',
      formFee: 2500,
      portalUrl: 'https://www.iimb.ac.in',
      stage: 'Closed',
      mandatoryDocuments: ['CAT Scorecard', 'Class 10/12/Degree transcripts', 'Work Ex Certificates']
    },
    highlights: [
      'Silicon Valley of India advantage for Product & Tech Consulting',
      'Strongest alumni network across global venture capital',
      'High weightage to work experience quality and diverse profiles'
    ],
    selectionCriteria: {
      examScoreWeight: 50,
      interviewWeight: 35,
      academicsAndWorkExWeight: 15
    }
  },
  {
    id: 'iim-calcutta',
    name: 'Indian Institute of Management Calcutta',
    shortName: 'IIM Calcutta',
    location: 'Kolkata, West Bengal',
    nirfRank: 4,
    flagshipProgram: 'MBA',
    acceptedExams: ['CAT'],
    tuitionFeeLakhs: 27.0,
    additionalExpensesLakhs: 2.5,
    placements: {
      averageCtcLakhs: 35.07,
      medianCtcLakhs: 33.67,
      highestDomesticCtcLakhs: 120.0,
      top25PercentileCtcLakhs: 48.2,
      batchSize: 464,
      year: '2024'
    },
    cutoffs: [
      {
        exam: 'CAT',
        overallPercentileOrScore: '99.6+ %ile',
        sectionalCutoffReq: true,
        sectionalDetails: 'VARC: 80%ile, DILR: 80%ile, QA: 80%ile (Quant Heavy)'
      }
    ],
    application: {
      lastDate: '2026-09-20',
      formFee: 2500,
      portalUrl: 'https://www.iimcal.ac.in',
      stage: 'Closed',
      mandatoryDocuments: ['CAT Registration Proof', 'Academic Transcripts']
    },
    highlights: [
      'Unrivaled Finance Mecca of India (Goldman Sachs, Morgan Stanley, Avendus)',
      'Triple Crown Accreditation (AACSB, AMBA, EQUIS)',
      'Joka culture with vibrant student-driven ecosystem'
    ],
    selectionCriteria: {
      examScoreWeight: 60,
      interviewWeight: 30,
      academicsAndWorkExWeight: 10
    }
  },
  {
    id: 'fms-delhi',
    name: 'Faculty of Management Studies, University of Delhi',
    shortName: 'FMS Delhi',
    location: 'New Delhi, Delhi',
    nirfRank: 35, // Low due to lack of campus size criteria, but top 5 in placement
    flagshipProgram: 'Full-Time MBA',
    acceptedExams: ['CAT'],
    tuitionFeeLakhs: 2.0, // Insane ROI!
    additionalExpensesLakhs: 1.0,
    placements: {
      averageCtcLakhs: 34.10,
      medianCtcLakhs: 31.0,
      highestDomesticCtcLakhs: 123.0,
      top25PercentileCtcLakhs: 46.1,
      batchSize: 269,
      year: '2024'
    },
    cutoffs: [
      {
        exam: 'CAT',
        overallPercentileOrScore: '99.3+ %ile',
        sectionalCutoffReq: false,
        sectionalDetails: 'VARC: 40% weightage, QA: 30% weightage, DILR: 30% weightage'
      }
    ],
    application: {
      lastDate: '2026-12-15',
      formFee: 1000,
      portalUrl: 'https://fms.edu',
      stage: 'Open',
      mandatoryDocuments: ['CAT Application Number', '10th/12th/Graduation details', 'Identity Proof']
    },
    highlights: [
      'Highest Return on Investment (ROI) MBA college in the world (Fee ~₹2L vs Avg CTC ~₹34L)',
      'Exttemely prestigious Red Building of Dreams in North Campus, DU',
      'Special weightage given to VARC in shortlisting'
    ],
    selectionCriteria: {
      examScoreWeight: 50,
      interviewWeight: 30,
      academicsAndWorkExWeight: 20
    }
  },
  {
    id: 'xlri-jamshedpur',
    name: 'XLRI - Xavier School of Management',
    shortName: 'XLRI Jamshedpur',
    location: 'Jamshedpur, Jharkhand',
    nirfRank: 9,
    flagshipProgram: 'PGDM (Business Management & Human Resource Management)',
    acceptedExams: ['XAT'],
    tuitionFeeLakhs: 28.0,
    additionalExpensesLakhs: 2.5,
    placements: {
      averageCtcLakhs: 32.70,
      medianCtcLakhs: 30.0,
      highestDomesticCtcLakhs: 75.0,
      top25PercentileCtcLakhs: 42.0,
      batchSize: 490,
      year: '2024'
    },
    cutoffs: [
      {
        exam: 'XAT',
        overallPercentileOrScore: '95+ %ile (BM) / 93+ %ile (HRM)',
        sectionalCutoffReq: true,
        sectionalDetails: 'VALR: 75%ile, DM: 75%ile, QADI: 75%ile'
      }
    ],
    application: {
      lastDate: '2026-11-30',
      formFee: 2200,
      portalUrl: 'https://xatonline.in',
      stage: 'Open',
      mandatoryDocuments: ['XAT ID', 'Academic records', 'Work experience details']
    },
    highlights: [
      'Pioneer of Management education in India (Established 1949)',
      '#1 Human Resource Management (HRM) program in Asia Pacific',
      'Renowned Decision Making section focus'
    ],
    selectionCriteria: {
      examScoreWeight: 60,
      interviewWeight: 25,
      academicsAndWorkExWeight: 15
    }
  },
  {
    id: 'spjimr-mumbai',
    name: 'S.P. Jain Institute of Management and Research',
    shortName: 'SPJIMR Mumbai',
    location: 'Mumbai, Maharashtra',
    nirfRank: 20,
    flagshipProgram: 'PGDM',
    acceptedExams: ['CAT', 'XAT'],
    tuitionFeeLakhs: 22.5,
    additionalExpensesLakhs: 2.0,
    placements: {
      averageCtcLakhs: 33.0,
      medianCtcLakhs: 31.5,
      highestDomesticCtcLakhs: 81.0,
      top25PercentileCtcLakhs: 40.4,
      batchSize: 240,
      year: '2024'
    },
    cutoffs: [
      {
        exam: 'CAT',
        overallPercentileOrScore: '85+ %ile (Profile-based) / 97+ %ile (Score-based)',
        sectionalCutoffReq: true,
        sectionalDetails: 'Sectionals: 75%ile across each section'
      },
      {
        exam: 'XAT',
        overallPercentileOrScore: '85+ %ile (Profile) / 97+ %ile',
        sectionalCutoffReq: true,
        sectionalDetails: 'Sectionals: 75%ile across each section'
      }
    ],
    application: {
      lastDate: '2026-11-22',
      formFee: 2000,
      portalUrl: 'https://www.spjimr.org',
      stage: 'Open',
      mandatoryDocuments: ['CAT/XAT ID', 'Detailed SOP', 'Extracurricular & Versatility Proofs']
    },
    highlights: [
      'Unique early profile-based calls before CAT/XAT results',
      'Specialized specialization selection at application stage (Marketing, Finance, Ops, IM)',
      'DOCC non-profit social initiative immersion'
    ],
    selectionCriteria: {
      examScoreWeight: 35,
      interviewWeight: 40,
      academicsAndWorkExWeight: 25
    }
  },
  {
    id: 'mdi-gurgaon',
    name: 'Management Development Institute Gurgaon',
    shortName: 'MDI Gurgaon',
    location: 'Gurugram, Haryana',
    nirfRank: 13,
    flagshipProgram: 'PGDM / PGDM-HRM / PGDM-IB',
    acceptedExams: ['CAT'],
    tuitionFeeLakhs: 24.2,
    additionalExpensesLakhs: 2.0,
    placements: {
      averageCtcLakhs: 27.60,
      medianCtcLakhs: 26.13,
      highestDomesticCtcLakhs: 63.3,
      top25PercentileCtcLakhs: 33.5,
      batchSize: 319,
      year: '2024'
    },
    cutoffs: [
      {
        exam: 'CAT',
        overallPercentileOrScore: '94+ %ile',
        sectionalCutoffReq: false,
        sectionalDetails: 'No rigid sectional cutoffs, overall profile balanced'
      }
    ],
    application: {
      lastDate: '2026-11-24',
      formFee: 3000,
      portalUrl: 'https://www.mdi.ac.in',
      stage: 'Open',
      mandatoryDocuments: ['CAT Scorecard', 'Resume', 'Transcripts']
    },
    highlights: [
      'Prime NCR corporate hub proximity for leadership roles',
      'Renowned for Consulting, FMCG Marketing, and HR',
      'Vibrant campus culture with 100% executive placements'
    ],
    selectionCriteria: {
      examScoreWeight: 50,
      interviewWeight: 30,
      academicsAndWorkExWeight: 20
    }
  },
  {
    id: 'nmims-mumbai',
    name: 'SBM, NMIMS Deemed-to-be-University',
    shortName: 'NMIMS Mumbai',
    location: 'Mumbai, Maharashtra',
    nirfRank: 21,
    flagshipProgram: 'MBA (Core / Business Analytics / HR)',
    acceptedExams: ['NMAT'],
    tuitionFeeLakhs: 24.0,
    additionalExpensesLakhs: 3.0,
    placements: {
      averageCtcLakhs: 26.63,
      medianCtcLakhs: 24.70,
      highestDomesticCtcLakhs: 67.8,
      top25PercentileCtcLakhs: 32.5,
      batchSize: 600,
      year: '2024'
    },
    cutoffs: [
      {
        exam: 'NMAT',
        overallPercentileOrScore: '235+ Score',
        sectionalCutoffReq: true,
        sectionalDetails: 'QS: 74+, LS: 76+, LR: 73+ (Approximate historical benchmarks)'
      }
    ],
    application: {
      lastDate: '2026-10-10',
      formFee: 2600,
      portalUrl: 'https://www.nmims.edu',
      stage: 'Closing Soon',
      mandatoryDocuments: ['NMAT by GMAC Registration ID', 'Academic Transcripts']
    },
    highlights: [
      'Financial capital Mumbai prime location advantages',
      'Huge corporate alumni presence across BFSI & Conglomerates',
      'No negative marking exam format (NMAT)'
    ],
    selectionCriteria: {
      examScoreWeight: 70,
      interviewWeight: 20,
      academicsAndWorkExWeight: 10
    }
  },
  {
    id: 'sibm-pune',
    name: 'Symbiosis Institute of Business Management Pune',
    shortName: 'SIBM Pune',
    location: 'Pune, Maharashtra',
    nirfRank: 17,
    flagshipProgram: 'MBA',
    acceptedExams: ['SNAP'],
    tuitionFeeLakhs: 24.5,
    additionalExpensesLakhs: 2.0,
    placements: {
      averageCtcLakhs: 26.77,
      medianCtcLakhs: 25.0,
      highestDomesticCtcLakhs: 49.0,
      top25PercentileCtcLakhs: 33.2,
      batchSize: 220,
      year: '2024'
    },
    cutoffs: [
      {
        exam: 'SNAP',
        overallPercentileOrScore: '98+ %ile (~43-45 marks)',
        sectionalCutoffReq: false,
        sectionalDetails: 'No sectional cutoff, only overall score considered'
      }
    ],
    application: {
      lastDate: '2026-12-09',
      formFee: 1000, // Plus SNAP registration fee ₹2250
      portalUrl: 'https://www.sibm.edu',
      stage: 'Open',
      mandatoryDocuments: ['SNAP ID', 'Graduation Certificate']
    },
    highlights: [
      'Lavale hilltop scenic campus with world-class facilities',
      'Top choice for Marketing & Sales FMCG placements in western India',
      'GE-PI-WAT rigorous selection process'
    ],
    selectionCriteria: {
      examScoreWeight: 50,
      interviewWeight: 30,
      academicsAndWorkExWeight: 20
    }
  },
  {
    id: 'scmhrd-pune',
    name: 'Symbiosis Centre for Management and Human Resource Development',
    shortName: 'SCMHRD Pune',
    location: 'Hinjawadi, Pune',
    nirfRank: 24,
    flagshipProgram: 'MBA (HR / Marketing / Finance / Infrastructure)',
    acceptedExams: ['SNAP'],
    tuitionFeeLakhs: 22.5,
    additionalExpensesLakhs: 2.0,
    placements: {
      averageCtcLakhs: 23.71,
      medianCtcLakhs: 22.0,
      highestDomesticCtcLakhs: 38.0,
      top25PercentileCtcLakhs: 28.5,
      batchSize: 180,
      year: '2024'
    },
    cutoffs: [
      {
        exam: 'SNAP',
        overallPercentileOrScore: '97+ %ile (~41-43 marks)',
        sectionalCutoffReq: false,
        sectionalDetails: 'No sectional cutoffs'
      }
    ],
    application: {
      lastDate: '2026-12-09',
      formFee: 1000,
      portalUrl: 'https://www.scmhrd.edu',
      stage: 'Open',
      mandatoryDocuments: ['SNAP Registration ID', 'Academic marks cards']
    },
    highlights: [
      'Top-tier Human Resources (HR) and Infrastructure Management programs',
      'Located in Pune IT & Industrial corridor of Hinjawadi',
      'Strong corporate live projects and case competition culture'
    ],
    selectionCriteria: {
      examScoreWeight: 50,
      interviewWeight: 30,
      academicsAndWorkExWeight: 20
    }
  },
  {
    id: 'iit-bombay-sjmsom',
    name: 'Shailesh J. Mehta School of Management, IIT Bombay',
    shortName: 'SJMSOM IIT Bombay',
    location: 'Mumbai, Maharashtra',
    nirfRank: 10,
    flagshipProgram: 'Master of Management (MBA)',
    acceptedExams: ['CAT'],
    tuitionFeeLakhs: 14.5,
    additionalExpensesLakhs: 1.5,
    placements: {
      averageCtcLakhs: 28.88,
      medianCtcLakhs: 26.64,
      highestDomesticCtcLakhs: 54.0,
      top25PercentileCtcLakhs: 35.8,
      batchSize: 115,
      year: '2024'
    },
    cutoffs: [
      {
        exam: 'CAT',
        overallPercentileOrScore: '98.5+ %ile',
        sectionalCutoffReq: true,
        sectionalDetails: 'VARC: 75%ile, DILR: 75%ile, QA: 75%ile'
      }
    ],
    application: {
      lastDate: '2026-01-31',
      formFee: 1600,
      portalUrl: 'https://www.som.iitb.ac.in',
      stage: 'Opening Soon',
      mandatoryDocuments: ['CAT Scorecard', '4-year Engineering Degree or Master Degree']
    },
    highlights: [
      'Incredible ROI with ₹14.5L fee and ₹28.8L average package',
      'IIT Bombay ecosystem, incubation labs, and international exposure',
      'Top roles in Supply Chain, Operations, Strategy, and Tech Product Management'
    ],
    selectionCriteria: {
      examScoreWeight: 50,
      interviewWeight: 35,
      academicsAndWorkExWeight: 15
    }
  },
  {
    id: 'iift-delhi',
    name: 'Indian Institute of Foreign Trade',
    shortName: 'IIFT Delhi & Kolkata',
    location: 'New Delhi / Kolkata',
    nirfRank: 15,
    flagshipProgram: 'MBA (International Business)',
    acceptedExams: ['CAT'],
    tuitionFeeLakhs: 21.7,
    additionalExpensesLakhs: 2.0,
    placements: {
      averageCtcLakhs: 29.10,
      medianCtcLakhs: 26.50,
      highestDomesticCtcLakhs: 85.4,
      top25PercentileCtcLakhs: 36.5,
      batchSize: 420,
      year: '2024'
    },
    cutoffs: [
      {
        exam: 'CAT',
        overallPercentileOrScore: '98+ %ile',
        sectionalCutoffReq: true,
        sectionalDetails: 'Sectionals applied across VARC, DILR, QA'
      }
    ],
    application: {
      lastDate: '2026-11-20',
      formFee: 2500,
      portalUrl: 'https://iift.ac.in',
      stage: 'Open',
      mandatoryDocuments: ['CAT Admit Card / Scorecard', 'Category Proof', 'Transcripts']
    },
    highlights: [
      'Ministry of Commerce & Industry autonomous institute',
      'Global trade, commodity finance, and international logistics leadership',
      'Now admits directly via CAT score'
    ],
    selectionCriteria: {
      examScoreWeight: 55,
      interviewWeight: 30,
      academicsAndWorkExWeight: 15
    }
  }
];
