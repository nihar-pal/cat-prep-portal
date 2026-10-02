import { ExamType } from '@/types/exam';

export interface SectionScoreRange {
  name: string;
  key: string;
  maxScore: number;
  minScore: number;
  defaultScore: number;
  step: number;
  description: string;
}

export interface ExamPredictorConfig {
  exam: ExamType;
  fullName: string;
  totalMaxScore: number;
  sections: SectionScoreRange[];
  calculatePercentile: (scores: Record<string, number>) => {
    totalRawScore: number;
    scaledScoreOrScore: number;
    percentile: number;
    percentileBand: string;
    analysisText: string;
  };
  collegeCutoffs: {
    collegeName: string;
    tier: 'Tier 1' | 'Tier 1.5' | 'Tier 2';
    requiredPercentile: number;
    cutoffScoreDisplay: string;
    flagshipProgram: string;
    notes: string;
  }[];
}

export const EXAM_PREDICTOR_CONFIGS: Record<ExamType, ExamPredictorConfig> = {
  // ================= CAT =================
  CAT: {
    exam: 'CAT',
    fullName: 'Common Admission Test 2026',
    totalMaxScore: 198,
    sections: [
      {
        name: 'Verbal Ability & RC (VARC)',
        key: 'VARC',
        maxScore: 72,
        minScore: -24,
        defaultScore: 32,
        step: 1,
        description: '24 questions (+3, -1 for MCQ, +3, 0 for TITA)'
      },
      {
        name: 'Data Interpretation & LR (DILR)',
        key: 'DILR',
        maxScore: 60,
        minScore: -20,
        defaultScore: 22,
        step: 1,
        description: '20 questions (+3, -1 for MCQ, +3, 0 for TITA)'
      },
      {
        name: 'Quantitative Aptitude (QA)',
        key: 'QA',
        maxScore: 66,
        minScore: -22,
        defaultScore: 24,
        step: 1,
        description: '22 questions (+3, -1 for MCQ, +3, 0 for TITA)'
      }
    ],
    calculatePercentile: (scores) => {
      const varc = scores.VARC || 0;
      const dilr = scores.DILR || 0;
      const qa = scores.QA || 0;
      const totalRaw = varc + dilr + qa;

      let percentile = 50.0;
      // Empirically calibrated against recent CAT normalization slot curves
      if (totalRaw >= 100) percentile = 99.85 + Math.min(0.14, (totalRaw - 100) * 0.005);
      else if (totalRaw >= 88) percentile = 99.40 + ((totalRaw - 88) / 12) * 0.45;
      else if (totalRaw >= 78) percentile = 99.00 + ((totalRaw - 78) / 10) * 0.40;
      else if (totalRaw >= 68) percentile = 97.50 + ((totalRaw - 68) / 10) * 1.50;
      else if (totalRaw >= 56) percentile = 94.50 + ((totalRaw - 56) / 12) * 3.00;
      else if (totalRaw >= 46) percentile = 90.00 + ((totalRaw - 46) / 10) * 4.50;
      else if (totalRaw >= 38) percentile = 84.00 + ((totalRaw - 38) / 8) * 6.00;
      else if (totalRaw >= 28) percentile = 72.00 + ((totalRaw - 28) / 10) * 12.00;
      else if (totalRaw >= 18) percentile = 55.00 + ((totalRaw - 18) / 10) * 17.00;
      else percentile = Math.max(10.0, 50.0 + (totalRaw / 18) * 5.0);

      percentile = Math.min(99.99, Math.max(1.0, Math.round(percentile * 100) / 100));

      let band = '70-80 %ile';
      let analysisText = 'Good baseline. Accelerate mock frequency and focus on Arithmetic & RC to cross 90 %ile.';
      if (percentile >= 99.5) {
        band = '99.5+ %ile (Top IIM ABC Call Zone)';
        analysisText = 'Elite performance! Safe for IIM Ahmedabad, Bangalore, Calcutta direct interview shortlists.';
      } else if (percentile >= 99.0) {
        band = '99.0 - 99.49 %ile (Tier-1 Shortlist Zone)';
        analysisText = 'Outstanding score! Safe for FMS Delhi, IIM Lucknow, IIM Kozhikode, and SPJIMR.';
      } else if (percentile >= 95.0) {
        band = '95.0 - 98.99 %ile (New IIMs & MDI/IITs)';
        analysisText = 'Strong score! Excellent conversion chances for IIM Shillong, MDI Gurgaon, IIT Bombay (SJMSOM), and SPJIMR profile calls.';
      } else if (percentile >= 90.0) {
        band = '90.0 - 94.99 %ile (Baby IIMs & IMT/FORE)';
        analysisText = 'Solid scoring zone. Strong calls from CAP IIMs, IMT Ghaziabad, FORE, and GIM.';
      }

      return {
        totalRawScore: totalRaw,
        scaledScoreOrScore: totalRaw,
        percentile,
        percentileBand: band,
        analysisText
      };
    },
    collegeCutoffs: [
      { collegeName: 'IIM Ahmedabad (IIM-A)', tier: 'Tier 1', requiredPercentile: 99.6, cutoffScoreDisplay: '92+ marks', flagshipProgram: 'PGP (Flagship MBA)', notes: 'Composite score heavily weights Class 10/12 academics.' },
      { collegeName: 'IIM Bangalore (IIM-B)', tier: 'Tier 1', requiredPercentile: 99.5, cutoffScoreDisplay: '90+ marks', flagshipProgram: 'PGP (Flagship MBA)', notes: 'Strong weightage on graduation GPA and work experience.' },
      { collegeName: 'IIM Calcutta (IIM-C)', tier: 'Tier 1', requiredPercentile: 99.4, cutoffScoreDisplay: '88+ marks', flagshipProgram: 'MBA', notes: 'Heavy weightage on CAT score and Quantitative Aptitude.' },
      { collegeName: 'FMS Delhi', tier: 'Tier 1', requiredPercentile: 99.2, cutoffScoreDisplay: '84+ marks', flagshipProgram: 'MBA (Full Time)', notes: 'Highest ROI in Asia (Fees ₹2 Lakh, Avg CTC ₹34.1 LPA). VARC weighted 40%.' },
      { collegeName: 'IIM Lucknow (IIM-L)', tier: 'Tier 1', requiredPercentile: 99.0, cutoffScoreDisplay: '80+ marks', flagshipProgram: 'PGP', notes: 'Strict sectional cutoffs (85 %ile in each section).' },
      { collegeName: 'SPJIMR Mumbai', tier: 'Tier 1', requiredPercentile: 95.0, cutoffScoreDisplay: '60+ marks (Profile based)', notes: 'Specialization-based calls with profile shortlist.' , flagshipProgram: 'PGDM' },
      { collegeName: 'MDI Gurgaon', tier: 'Tier 1.5', requiredPercentile: 95.5, cutoffScoreDisplay: '62+ marks', flagshipProgram: 'PGDM', notes: 'Top corporate recruiter network; no rigid sectional cutoffs.' },
      { collegeName: 'SJMSOM, IIT Bombay', tier: 'Tier 1.5', requiredPercentile: 98.0, cutoffScoreDisplay: '74+ marks', flagshipProgram: 'MBA', notes: 'Open to engineers and four-year degree holders.' }
    ]
  },

  // ================= GMAT FOCUS =================
  GMAT: {
    exam: 'GMAT',
    fullName: 'GMAT Focus Edition 2026',
    totalMaxScore: 805,
    sections: [
      {
        name: 'Quantitative Reasoning (PS)',
        key: 'Quant',
        maxScore: 90,
        minScore: 60,
        defaultScore: 82,
        step: 1,
        description: '21 questions (60 to 90 scaled)'
      },
      {
        name: 'Verbal Reasoning (CR & RC)',
        key: 'Verbal',
        maxScore: 90,
        minScore: 60,
        defaultScore: 82,
        step: 1,
        description: '23 questions (60 to 90 scaled)'
      },
      {
        name: 'Data Insights (DS & IR)',
        key: 'DataInsights',
        maxScore: 90,
        minScore: 60,
        defaultScore: 81,
        step: 1,
        description: '20 questions (60 to 90 scaled)'
      }
    ],
    calculatePercentile: (scores) => {
      const q = scores.Quant || 60;
      const v = scores.Verbal || 60;
      const di = scores.DataInsights || 60;

      // Official GMAT Focus composite scaled formula: Total = 205 + (Q + V + DI - 180) * (600 / 90)
      const sum = q + v + di; // range 180 to 270
      const totalScore = Math.round(205 + ((sum - 180) / 90) * 600);
      const roundedTotal = Math.min(805, Math.max(205, Math.round(totalScore / 10) * 10 + 5));

      let percentile = 50.0;
      if (roundedTotal >= 755) percentile = 99.9;
      else if (roundedTotal >= 715) percentile = 99.0 + ((roundedTotal - 715) / 40) * 0.9;
      else if (roundedTotal >= 685) percentile = 97.0 + ((roundedTotal - 685) / 30) * 2.0;
      else if (roundedTotal >= 655) percentile = 93.0 + ((roundedTotal - 655) / 30) * 4.0;
      else if (roundedTotal >= 625) percentile = 83.0 + ((roundedTotal - 625) / 30) * 10.0;
      else if (roundedTotal >= 595) percentile = 70.0 + ((roundedTotal - 595) / 30) * 13.0;
      else if (roundedTotal >= 555) percentile = 50.0 + ((roundedTotal - 555) / 40) * 20.0;
      else percentile = Math.max(5.0, 50.0 - ((555 - roundedTotal) / 100) * 25.0);

      percentile = Math.min(99.99, Math.max(1.0, Math.round(percentile * 10) / 10));

      let band = '605-645 Scale (Good Global Baseline)';
      let analysisText = 'Competitive for European MiM programs and top Indian executive MBAs.';
      if (roundedTotal >= 705) {
        band = '705+ Scale (99th %ile - Elite M7 & ISB Zone)';
        analysisText = 'World-class score! Top global shortlist zone for Harvard, Stanford, Wharton, INSEAD, and full ISB scholarships.';
      } else if (roundedTotal >= 655) {
        band = '655 - 695 Scale (93-98th %ile - Top Tier-1)';
        analysisText = 'Strong score for ISB Hyderabad/Mohali, LBS, INSEAD, and IIM Ahmedabad PGPX.';
      }

      return {
        totalRawScore: sum,
        scaledScoreOrScore: roundedTotal,
        percentile,
        percentileBand: band,
        analysisText
      };
    },
    collegeCutoffs: [
      { collegeName: 'ISB Hyderabad & Mohali', tier: 'Tier 1', requiredPercentile: 90.0, cutoffScoreDisplay: '665+ GMAT Focus', flagshipProgram: 'PGP (Post Graduate Programme in Management)', notes: 'Average GMAT Focus score is ~665 (equivalent to classic 710).' },
      { collegeName: 'IIM Ahmedabad (PGPX)', tier: 'Tier 1', requiredPercentile: 92.0, cutoffScoreDisplay: '675+ GMAT Focus', flagshipProgram: 'PGPX (Executive 1-Year MBA)', notes: 'Requires minimum 4 years of executive work experience.' },
      { collegeName: 'IIM Bangalore (EPGP)', tier: 'Tier 1', requiredPercentile: 92.0, cutoffScoreDisplay: '675+ GMAT Focus', flagshipProgram: 'EPGP (Executive MBA)', notes: 'Strong preference for international leadership background.' },
      { collegeName: 'INSEAD France & Singapore', tier: 'Tier 1', requiredPercentile: 93.0, cutoffScoreDisplay: '685+ GMAT Focus', flagshipProgram: '10-Month MBA', notes: 'Top global MBA program with strict language requirements.' },
      { collegeName: 'London Business School (LBS)', tier: 'Tier 1', requiredPercentile: 94.0, cutoffScoreDisplay: '695+ GMAT Focus', flagshipProgram: 'MBA / MiM', notes: 'Balanced sectional percentiles required across Quant and Verbal.' }
    ]
  },

  // ================= XAT =================
  XAT: {
    exam: 'XAT',
    fullName: 'Xavier Aptitude Test 2027',
    totalMaxScore: 75,
    sections: [
      {
        name: 'Decision Making (DM)',
        key: 'DM',
        maxScore: 21,
        minScore: -5.25,
        defaultScore: 13,
        step: 0.5,
        description: '21 questions (+1, -0.25)'
      },
      {
        name: 'Verbal & Logical Ability (VALR)',
        key: 'VALR',
        maxScore: 26,
        minScore: -6.5,
        defaultScore: 14,
        step: 0.5,
        description: '26 questions (+1, -0.25)'
      },
      {
        name: 'Quantitative Ability & DI (QADI)',
        key: 'QADI',
        maxScore: 28,
        minScore: -7.0,
        defaultScore: 15,
        step: 0.5,
        description: '28 questions (+1, -0.25)'
      }
    ],
    calculatePercentile: (scores) => {
      const dm = scores.DM || 0;
      const valr = scores.VALR || 0;
      const qadi = scores.QADI || 0;
      const total = dm + valr + qadi;

      let percentile = 50.0;
      if (total >= 46) percentile = 99.5;
      else if (total >= 42) percentile = 99.0 + ((total - 42) / 4) * 0.5;
      else if (total >= 37) percentile = 96.0 + ((total - 37) / 5) * 3.0;
      else if (total >= 32) percentile = 90.0 + ((total - 32) / 5) * 6.0;
      else if (total >= 27) percentile = 80.0 + ((total - 27) / 5) * 10.0;
      else if (total >= 22) percentile = 65.0 + ((total - 22) / 5) * 15.0;
      else percentile = Math.max(10.0, 50.0 + (total / 22) * 15.0);

      percentile = Math.min(99.99, Math.max(1.0, Math.round(percentile * 10) / 10));

      let band = '80-90 %ile';
      let analysisText = 'Decent foundation for TAPMI, GIM, Great Lakes Chennai.';
      if (percentile >= 96.0) {
        band = '96+ %ile (XLRI Jamshedpur BM & HRM Direct Call Safe Zone)';
        analysisText = 'Direct interview call safe zone for XLRI Jamshedpur BM & HRM flagship programs!';
      } else if (percentile >= 92.0) {
        band = '92-95 %ile (XLRI Delhi & XIMB Zone)';
        analysisText = 'Strong shortlist zone for XLRI Delhi campus, XIM University, and IMT Ghaziabad.';
      }

      return {
        totalRawScore: total,
        scaledScoreOrScore: total,
        percentile,
        percentileBand: band,
        analysisText
      };
    },
    collegeCutoffs: [
      { collegeName: 'XLRI Jamshedpur (BM)', tier: 'Tier 1', requiredPercentile: 96.0, cutoffScoreDisplay: '37+ marks', flagshipProgram: 'PGDM Business Management', notes: 'Requires sectional clearance in DM (75%), VALR (75%), QADI (80%).' },
      { collegeName: 'XLRI Jamshedpur (HRM)', tier: 'Tier 1', requiredPercentile: 94.0, cutoffScoreDisplay: '34+ marks', flagshipProgram: 'PGDM Human Resource Management', notes: '#1 HR MBA program in the Asia-Pacific region.' },
      { collegeName: 'XIM University (XIMB)', tier: 'Tier 1.5', requiredPercentile: 90.0, cutoffScoreDisplay: '30+ marks', flagshipProgram: 'MBA-BM', notes: 'Premier regional legacy institution with strong consulting presence.' },
      { collegeName: 'IMT Ghaziabad', tier: 'Tier 1.5', requiredPercentile: 90.0, cutoffScoreDisplay: '30+ marks', flagshipProgram: 'PGDM Marketing', notes: 'Top corporate marketing hub; accepts CAT or XAT scores.' }
    ]
  },

  // ================= SNAP =================
  SNAP: {
    exam: 'SNAP',
    fullName: 'Symbiosis National Aptitude Test 2026',
    totalMaxScore: 60,
    sections: [
      {
        name: 'General English',
        key: 'General_English',
        maxScore: 15,
        minScore: -3.75,
        defaultScore: 11,
        step: 0.25,
        description: '15 questions (+1, -0.25)'
      },
      {
        name: 'Analytical & Logical Reasoning',
        key: 'Analytical_Reasoning',
        maxScore: 25,
        minScore: -6.25,
        defaultScore: 19,
        step: 0.25,
        description: '25 questions (+1, -0.25)'
      },
      {
        name: 'Quantitative, DI & DS',
        key: 'Quant_DI_DS',
        maxScore: 20,
        minScore: -5.0,
        defaultScore: 15,
        step: 0.25,
        description: '20 questions (+1, -0.25)'
      }
    ],
    calculatePercentile: (scores) => {
      const eng = scores.General_English || 0;
      const lr = scores.Analytical_Reasoning || 0;
      const qa = scores.Quant_DI_DS || 0;
      const total = eng + lr + qa;

      let percentile = 50.0;
      if (total >= 46) percentile = 99.5;
      else if (total >= 43) percentile = 98.5 + ((total - 43) / 3) * 1.0;
      else if (total >= 39) percentile = 96.0 + ((total - 39) / 4) * 2.5;
      else if (total >= 34) percentile = 88.0 + ((total - 34) / 5) * 8.0;
      else if (total >= 28) percentile = 75.0 + ((total - 28) / 6) * 13.0;
      else percentile = Math.max(10.0, 50.0 + (total / 28) * 25.0);

      percentile = Math.min(99.99, Math.max(1.0, Math.round(percentile * 10) / 10));

      let band = '85-94 %ile';
      let analysisText = 'Good for SIIB Pune, SIBM Bangalore, and SIOM Nashik.';
      if (percentile >= 98.5) {
        band = '98.5+ %ile (SIBM Pune Direct Call Zone)';
        analysisText = 'Flagship SIBM Pune direct interview call guaranteed! Top 1.5% national bracket.';
      } else if (percentile >= 96.5) {
        band = '96.5 - 98.4 %ile (SCMHRD Pune Direct Call Zone)';
        analysisText = 'Strong call safe threshold for SCMHRD Pune (Flagship MBA & MBA-BA).';
      }

      return {
        totalRawScore: total,
        scaledScoreOrScore: total,
        percentile,
        percentileBand: band,
        analysisText
      };
    },
    collegeCutoffs: [
      { collegeName: 'SIBM Pune (Flagship)', tier: 'Tier 1', requiredPercentile: 98.5, cutoffScoreDisplay: '43.5+ marks', flagshipProgram: 'MBA Flagship', notes: 'Premier SIU campus. Avg CTC ₹28.2 LPA. No sectional cutoffs.' },
      { collegeName: 'SCMHRD Pune', tier: 'Tier 1', requiredPercentile: 96.5, cutoffScoreDisplay: '40.0+ marks', flagshipProgram: 'MBA / MBA Business Analytics', notes: 'Tier-1 recognition for HR and Business Analytics.' },
      { collegeName: 'SIIB Pune', tier: 'Tier 2', requiredPercentile: 92.0, cutoffScoreDisplay: '36.0+ marks', flagshipProgram: 'MBA International Business', notes: 'Strong export-import and commodity trading recruitments.' },
      { collegeName: 'SIBM Bangalore', tier: 'Tier 2', requiredPercentile: 88.0, cutoffScoreDisplay: '33.5+ marks', flagshipProgram: 'MBA', notes: 'Strategic IT & product management location in Electronic City.' }
    ]
  },

  // ================= NMAT =================
  NMAT: {
    exam: 'NMAT',
    fullName: 'NMAT by GMAC 2026',
    totalMaxScore: 360,
    sections: [
      {
        name: 'Language Skills',
        key: 'Language_Skills',
        maxScore: 120,
        minScore: 0,
        defaultScore: 82,
        step: 1,
        description: '36 questions (Scaled 0 to 120, 28 mins)'
      },
      {
        name: 'Quantitative Skills',
        key: 'Quantitative_Skills',
        maxScore: 120,
        minScore: 0,
        defaultScore: 80,
        step: 1,
        description: '36 questions (Scaled 0 to 120, 52 mins)'
      },
      {
        name: 'Logical Reasoning',
        key: 'Logical_Reasoning',
        maxScore: 120,
        minScore: 0,
        defaultScore: 78,
        step: 1,
        description: '36 questions (Scaled 0 to 120, 40 mins)'
      }
    ],
    calculatePercentile: (scores) => {
      const lang = scores.Language_Skills || 0;
      const quant = scores.Quantitative_Skills || 0;
      const lr = scores.Logical_Reasoning || 0;
      const totalScaled = lang + quant + lr;

      let percentile = 50.0;
      if (totalScaled >= 250) percentile = 99.0 + Math.min(0.9, (totalScaled - 250) * 0.05);
      else if (totalScaled >= 235) percentile = 96.0 + ((totalScaled - 235) / 15) * 3.0;
      else if (totalScaled >= 220) percentile = 88.0 + ((totalScaled - 220) / 15) * 8.0;
      else if (totalScaled >= 200) percentile = 75.0 + ((totalScaled - 200) / 20) * 13.0;
      else percentile = Math.max(10.0, 50.0 + (totalScaled / 200) * 25.0);

      percentile = Math.min(99.99, Math.max(1.0, Math.round(percentile * 10) / 10));

      let band = '200-220 Scaled';
      let analysisText = 'Calls from SDA Bocconi Asia Center and K J Somaiya.';
      if (totalScaled >= 235) {
        band = '235+ Scaled (NMIMS Mumbai Core Safe Zone)';
        analysisText = 'Direct interview call guaranteed for flagship NMIMS Mumbai MBA (Core)!';
      } else if (totalScaled >= 222) {
        band = '222 - 234 Scaled (NMIMS Bangalore & HR Zone)';
        analysisText = 'Safe shortlist zone for NMIMS Mumbai HR, NMIMS Bangalore, and XIMB HRM.';
      }

      return {
        totalRawScore: totalScaled,
        scaledScoreOrScore: totalScaled,
        percentile,
        percentileBand: band,
        analysisText
      };
    },
    collegeCutoffs: [
      { collegeName: 'NMIMS Mumbai (Core MBA)', tier: 'Tier 1', requiredPercentile: 96.0, cutoffScoreDisplay: '235+ scaled score', flagshipProgram: 'MBA Core', notes: 'Strict sectional cutoffs ~70+ in Language, Quant, and Logical.' },
      { collegeName: 'NMIMS Mumbai (MBA-HR)', tier: 'Tier 1.5', requiredPercentile: 90.0, cutoffScoreDisplay: '225+ scaled score', flagshipProgram: 'MBA Human Resources', notes: 'Dedicated HR leadership track.' },
      { collegeName: 'NMIMS Bangalore', tier: 'Tier 2', requiredPercentile: 88.0, cutoffScoreDisplay: '220+ scaled score', flagshipProgram: 'MBA', notes: 'Premier regional NMIMS campus in Koramangala.' },
      { collegeName: 'SDA Bocconi Asia Center', tier: 'Tier 2', requiredPercentile: 80.0, cutoffScoreDisplay: '200+ scaled score', flagshipProgram: 'IMB (International Master in Business)', notes: 'Direct Italian triple-accredited curriculum with Milan semester.' }
    ]
  }
};
