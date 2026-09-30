import { UserProfileData, ProfileEvaluationResult, CollegeProfileVerdict } from '@/types/profile';

export function evaluateProfile(data: UserProfileData): ProfileEvaluationResult {
  const {
    tenthPercentage,
    twelfthPercentage,
    graduationPercentage,
    graduationDiscipline,
    workExperienceMonths,
    category,
    gender,
    currentPercentile
  } = data;

  // 1. Academic Rating (e.g. 9/8/8)
  const getRating = (pct: number) => {
    if (pct >= 90) return 9;
    if (pct >= 80) return 8;
    if (pct >= 70) return 7;
    if (pct >= 60) return 6;
    return 5;
  };

  const r10 = getRating(tenthPercentage);
  const r12 = getRating(twelfthPercentage);
  const rGrad = getRating(graduationPercentage);
  const profileRating = `${r10}/${r12}/${rGrad} Academic Profile`;

  // 2. Diversity Points
  const isEngineer = graduationDiscipline === 'Engineering / Technology';
  const isFemaleOrOther = gender === 'Female' || gender === 'Non-Binary / Other';

  const academicDiversityBonus = isEngineer ? 0 : 5; // Up to 5 points in IIMs
  const genderDiversityBonus = isFemaleOrOther ? 5 : 0; // Up to 5 points in IIMA/IIMK

  // 3. Work Experience Points (Max at 24 - 36 months)
  let workExPoints = 0;
  if (workExperienceMonths >= 24 && workExperienceMonths <= 36) {
    workExPoints = 10;
  } else if (workExperienceMonths >= 12 && workExperienceMonths < 24) {
    workExPoints = 7;
  } else if (workExperienceMonths > 36 && workExperienceMonths <= 48) {
    workExPoints = 7;
  } else if (workExperienceMonths > 48) {
    workExPoints = 4;
  } else {
    workExPoints = 1; // Fresher / < 12 months
  }

  // 4. Overall Profile Composite Rating (out of 100)
  const acadScore = ((r10 + r12 + rGrad) / 27) * 45; // 45% weight
  const divScore = ((academicDiversityBonus + genderDiversityBonus) / 10) * 20; // 20% weight
  const workScore = (workExPoints / 10) * 15; // 15% weight
  const catScoreComponent = (currentPercentile / 100) * 20; // 20% weight
  const compositeRatingScore = Math.min(100, Math.round(acadScore + divScore + workScore + catScoreComponent));

  // 5. Category Offset for Cutoffs
  let categoryOffset = 0;
  if (category === 'NC-OBC') categoryOffset = 10.0;
  else if (category === 'EWS') categoryOffset = 7.0;
  else if (category === 'SC') categoryOffset = 20.0;
  else if (category === 'ST' || category === 'PwD') categoryOffset = 28.0;

  // Diversity Offset
  const diversityOffset = (academicDiversityBonus ? 1.5 : 0) + (genderDiversityBonus ? 1.5 : 0);

  // 6. College Specific Shortlist Predictions
  const verdicts: CollegeProfileVerdict[] = [
    {
      collegeId: 'iim-ahmedabad',
      collegeName: 'IIM Ahmedabad',
      location: 'Ahmedabad',
      generalBenchmarkPercentile: 99.6,
      requiredPercentileForYou: Math.max(70, Number((99.7 - (isEngineer ? 0 : 1.2) - (isFemaleOrOther ? 1.0 : 0) - categoryOffset).toFixed(1))),
      compositeScoreEstimate: Math.round(compositeRatingScore * 0.95),
      categoryCallStatus: 'Ambitious (Dream)',
      factorsBenefitingYou: [
        tenthPercentage >= 85 ? 'Solid Class 10 score' : '',
        !isEngineer ? 'Non-Engineering Academic Category (AC-2/3/4) diversity advantage' : '',
        workExperienceMonths >= 20 ? 'Competitive work experience duration' : ''
      ].filter(Boolean),
      factorsChallengingYou: [
        isEngineer && !isFemaleOrOther && category === 'General / Open' ? 'General Engineering Male (GEM) pool has the steepest competition (~99.8%ile required)' : '',
        graduationPercentage < 80 ? 'IIMA gives high weightage to graduation performance' : ''
      ].filter(Boolean),
      strategicAdvice: isEngineer && category === 'General / Open'
        ? 'As a GEM candidate, target a minimum raw score of 85+ (99.7+%ile) in CAT to overcome zero diversity points.'
        : 'Your diversity attributes give you a significant boost. A 98+ percentile gives you strong call prospects.'
    },
    {
      collegeId: 'iim-bangalore',
      collegeName: 'IIM Bangalore',
      location: 'Bengaluru',
      generalBenchmarkPercentile: 99.4,
      requiredPercentileForYou: Math.max(70, Number((99.5 - (workExPoints >= 7 ? 1.5 : 0) - (isEngineer ? 0 : 0.8) - categoryOffset).toFixed(1))),
      compositeScoreEstimate: Math.round(compositeRatingScore * 0.96),
      categoryCallStatus: 'Ambitious (Dream)',
      factorsBenefitingYou: [
        workExperienceMonths >= 24 ? 'Prime work experience (IIMB awards maximum points for 24-36 months)' : '',
        tenthPercentage >= 85 && twelfthPercentage >= 85 ? 'Consistent past school academic record' : ''
      ].filter(Boolean),
      factorsChallengingYou: [
        workExperienceMonths < 12 ? 'Freshers face tough competition at IIMB due to its high work-ex weight' : '',
        isEngineer && category === 'General / Open' ? 'High applicant concentration in engineering category' : ''
      ].filter(Boolean),
      strategicAdvice: workExperienceMonths >= 20
        ? 'Your professional work history is tailor-made for IIMB\'s selection matrix. Focus on balancing sectional cutoffs.'
        : 'Since you have limited work-ex, prioritize maximizing your raw CAT score above 99.4%ile.'
    },
    {
      collegeId: 'iim-calcutta',
      collegeName: 'IIM Calcutta',
      location: 'Kolkata',
      generalBenchmarkPercentile: 99.6,
      requiredPercentileForYou: Math.max(70, Number((99.7 - (isFemaleOrOther ? 1.0 : 0) - categoryOffset).toFixed(1))),
      compositeScoreEstimate: Math.round(compositeRatingScore * 0.98),
      categoryCallStatus: 'Ambitious (Dream)',
      factorsBenefitingYou: [
        'IIMC gives ZERO weightage to graduation percentage in initial shortlisting!',
        tenthPercentage >= 80 && twelfthPercentage >= 80 ? 'Full academic rating points secured in 10th/12th' : '',
        isFemaleOrOther ? 'Gender diversity points awarded' : ''
      ].filter(Boolean),
      factorsChallengingYou: [
        'Requires top-tier raw CAT score (CAT weight is 56% in shortlisting)'
      ],
      strategicAdvice: 'IIMC is the best top-3 IIM for candidates with low graduation scores, as graduation marks are not factored into the initial call formula!'
    },
    {
      collegeId: 'fms-delhi',
      collegeName: 'FMS Delhi',
      location: 'New Delhi',
      generalBenchmarkPercentile: 99.3,
      requiredPercentileForYou: Math.max(70, Number((99.4 - (isFemaleOrOther ? 1.0 : 0) - categoryOffset).toFixed(1))),
      compositeScoreEstimate: Math.round(compositeRatingScore * 0.92),
      categoryCallStatus: 'Realistic Call (Target)',
      factorsBenefitingYou: [
        'FMS weighs CAT score almost entirely (VARC 40%, QA 30%, DILR 30%)',
        isFemaleOrOther ? 'Additional 5 marks awarded to female candidates' : '',
        'Zero penalty for freshers or low graduation marks'
      ].filter(Boolean),
      factorsChallengingYou: [
        'Demands exceptional VARC percentile due to 40% sectional multiplier'
      ],
      strategicAdvice: 'Highest ROI institution in India. Maximize VARC accuracy; attempting 15+ VARC questions with 90% accuracy is the golden key for FMS.'
    },
    {
      collegeId: 'spjimr-mumbai',
      collegeName: 'SPJIMR Mumbai',
      location: 'Mumbai',
      generalBenchmarkPercentile: 95.0,
      requiredPercentileForYou: Math.max(70, Number((88.0 - (academicDiversityBonus ? 2.0 : 0) - (workExPoints >= 7 ? 2.0 : 0)).toFixed(1))),
      compositeScoreEstimate: Math.round(compositeRatingScore * 1.05),
      categoryCallStatus: 'High Probability (Safe)',
      factorsBenefitingYou: [
        r10 >= 8 && r12 >= 8 ? 'Strong past academic pedigree fits profile call criteria' : '',
        workExperienceMonths >= 18 ? 'Relevant corporate domain experience' : '',
        'Profile-based calls given at 85+ percentile before CAT results are even out!'
      ].filter(Boolean),
      factorsChallengingYou: [
        'Requires compelling SOP and versatility in extracurricular achievements'
      ],
      strategicAdvice: 'Apply for the early profile-based shortlist. With consistent academics, you can secure an interview call even at 88-92%ile.'
    },
    {
      collegeId: 'xlri-jamshedpur',
      collegeName: 'XLRI Jamshedpur',
      location: 'Jamshedpur',
      generalBenchmarkPercentile: 95.0,
      requiredPercentileForYou: Math.max(70, Number((95.0 - (isFemaleOrOther ? 1.0 : 0) - (isEngineer ? 0 : 1.0)).toFixed(1))),
      compositeScoreEstimate: Math.round(compositeRatingScore * 0.94),
      categoryCallStatus: 'Realistic Call (Target)',
      factorsBenefitingYou: [
        'Evaluated purely via XAT exam without CAT academic normalization',
        !isEngineer ? 'Higher selection proportion in HRM for diverse candidates' : ''
      ].filter(Boolean),
      factorsChallengingYou: [
        'Decision Making (DM) section requires specialized ethical reasoning practice'
      ],
      strategicAdvice: 'XLRI is egalitarian—your interview performance and XAT score hold supreme weight over past academic fluctuations.'
    },
    {
      collegeId: 'mdi-gurgaon',
      collegeName: 'MDI Gurgaon',
      location: 'Gurugram',
      generalBenchmarkPercentile: 94.5,
      requiredPercentileForYou: Math.max(70, Number((94.5 - (workExPoints >= 7 ? 1.5 : 0) - (isFemaleOrOther ? 1.0 : 0)).toFixed(1))),
      compositeScoreEstimate: Math.round(compositeRatingScore * 0.96),
      categoryCallStatus: 'High Probability (Safe)',
      factorsBenefitingYou: [
        'Moderate cutoff compared to older IIMs',
        workExperienceMonths >= 12 ? 'Strong corporate preference for candidates with work experience' : ''
      ].filter(Boolean),
      factorsChallengingYou: [],
      strategicAdvice: 'A 94-96%ile in CAT makes MDI Gurgaon a very safe and high-yielding Tier-1 call.'
    },
    {
      collegeId: 'sjmsom-iit-bombay',
      collegeName: 'SJMSOM, IIT Bombay',
      location: 'Mumbai',
      generalBenchmarkPercentile: 98.5,
      requiredPercentileForYou: Math.max(70, Number((98.5 - categoryOffset).toFixed(1))),
      compositeScoreEstimate: Math.round(compositeRatingScore * 0.93),
      categoryCallStatus: isEngineer ? 'Realistic Call (Target)' : 'Ambitious (Dream)',
      factorsBenefitingYou: [
        isEngineer ? 'Eligibility satisfied (requires 4-year engineering or master\'s)' : '',
        'Unmatched ₹14.5L fee to ₹28.8L average package ROI'
      ].filter(Boolean),
      factorsChallengingYou: [
        !isEngineer ? 'Mandatory engineering or master\'s degree prerequisite' : ''
      ].filter(Boolean),
      strategicAdvice: isEngineer
        ? 'One of the best options for engineers. A 98.5+ percentile with decent academics guarantees an interview call.'
        : 'Note: SJMSOM requires a 4-year degree (B.Tech/B.E.) or Master\'s degree.'
    }
  ];

  // Categorize verdicts based on user's current percentile
  verdicts.forEach(v => {
    const diff = currentPercentile - v.requiredPercentileForYou;
    if (diff >= 0.5) {
      v.categoryCallStatus = 'High Probability (Safe)';
    } else if (diff >= -1.5) {
      v.categoryCallStatus = 'Realistic Call (Target)';
    } else {
      v.categoryCallStatus = 'Ambitious (Dream)';
    }
  });

  // Strengths and Gaps
  const keyStrengths: string[] = [];
  if (r10 >= 8 && r12 >= 8) keyStrengths.push('Clean School Academics (80%+ across 10th and 12th)');
  if (!isEngineer) keyStrengths.push('Non-Engineering Background (Significant Academic Diversity Points in IIM A, B, K, I)');
  if (isFemaleOrOther) keyStrengths.push('Gender Diversity Points (Boosts Composite Score by 2-5% at top IIMs)');
  if (workExPoints >= 7) keyStrengths.push('Ideal Work Experience Bracket (High employability score)');

  const criticalGaps: string[] = [];
  if (isEngineer && gender === 'Male' && category === 'General / Open') {
    criticalGaps.push('GEM (General Engineering Male) demographic penalty: zero diversity points, requires 99.7+%ile for IIM A/B/C.');
  }
  if (rGrad < 7) {
    criticalGaps.push('Graduation marks below 70%: avoid colleges with strict graduation filters (e.g. IIMA); focus on IIMC and FMS which don\'t penalize graduation.');
  }
  if (workExperienceMonths === 0) {
    criticalGaps.push('Fresher status: slight disadvantage at IIM Bangalore and executive MBA shortlists.');
  }

  const recommendedExams = ['CAT'];
  if (!isEngineer) recommendedExams.push('XAT (XLRI HRM)', 'NMAT (NMIMS HR/Core)');
  else recommendedExams.push('XAT (XLRI BM)', 'SNAP (SIBM Pune)');

  return {
    profileRating,
    compositeRatingScore,
    academicDiversityBonus,
    genderDiversityBonus,
    workExPoints,
    verdicts,
    keyStrengths,
    criticalGaps,
    recommendedExams
  };
}
