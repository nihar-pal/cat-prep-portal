export type CollegeTier = 'Tier 1' | 'Tier 1.5' | 'Tier 2';
export type FormMatchCategory = 'Difficult' | 'Target' | 'Safe' | 'Backup';

export interface MbaPlannerCollege {
  id: string;
  name: string;
  shortName: string;
  location: string;
  tier: CollegeTier;
  requiresSeparateApplication: boolean;
  applicationFee: number; // in INR
  feeNote: string;
  applicationDeadline: string; // YYYY-MM-DD
  deadlineDisplay: string;
  deadlineStatus: 'Closing Soon' | 'Open' | 'Opening Soon' | 'CAT Window';
  portalUrl: string;
  acceptedExams: string[];
  primaryCutoffPercentile: number;
  cutoffDisplay: string;
  avgCtcLakhs: number;
  medianCtcLakhs: number;
  tuitionFeeLakhs: number;
  roiRating: 'Exceptional' | 'High' | 'Good' | 'Moderate';
  programs: string[];
  highlights: string[];
  specialFormWarning?: string;
  categoryAdvice?: string;
}

export const MBA_PLANNER_COLLEGES: MbaPlannerCollege[] = [
  // --- NON-IIMs THAT REQUIRE SEPARATE APPLICATION (Special User Focus) ---
  {
    id: 'bitsom-mumbai',
    name: 'BITS School of Management (BITSoM)',
    shortName: 'BITSoM Mumbai',
    location: 'Mumbai, Maharashtra',
    tier: 'Tier 1.5',
    requiresSeparateApplication: true,
    applicationFee: 1500,
    feeNote: 'Separate Application Required (Round 1 & 2)',
    applicationDeadline: '2026-11-17',
    deadlineDisplay: 'R1: Nov 17 | R2: Jan 28',
    deadlineStatus: 'Closing Soon',
    portalUrl: 'https://www.bitsom.edu.in',
    acceptedExams: ['CAT', 'GMAT', 'GRE'],
    primaryCutoffPercentile: 92.0,
    cutoffDisplay: '90-93+ %ile (Holistic Profile)',
    avgCtcLakhs: 23.41,
    medianCtcLakhs: 22.0,
    tuitionFeeLakhs: 27.5,
    roiRating: 'High',
    programs: ['Two-Year Residential MBA'],
    highlights: [
      'Stellar founding faculty from Wharton, Kellogg, NYU Stern',
      'Ultra-modern Kalyan Mumbai campus backed by Aditya Birla Group',
      'Early Round 1 applications get high scholarship priority'
    ],
    specialFormWarning: 'Separate form! Round 1 closes in mid-November before CAT. Profile & essays are scrutinized.'
  },
  {
    id: 'spjimr-mumbai',
    name: 'S.P. Jain Institute of Management and Research',
    shortName: 'SPJIMR Mumbai',
    location: 'Mumbai, Maharashtra',
    tier: 'Tier 1',
    requiresSeparateApplication: true,
    applicationFee: 2000,
    feeNote: 'Separate Form Mandatory Before CAT Exam',
    applicationDeadline: '2026-11-22',
    deadlineDisplay: 'Nov 22, 2026 (Before CAT!)',
    deadlineStatus: 'Closing Soon',
    portalUrl: 'https://www.spjimr.org',
    acceptedExams: ['CAT', 'XAT', 'GMAT'],
    primaryCutoffPercentile: 85.0, // Profile call is 85, score call is 97
    cutoffDisplay: '85+ %ile (Profile) / 97+ %ile (Score)',
    avgCtcLakhs: 33.0,
    medianCtcLakhs: 31.5,
    tuitionFeeLakhs: 22.5,
    roiRating: 'Exceptional',
    programs: ['PGDM (Marketing, Finance, Operations, Information Mgmt)'],
    highlights: [
      'Elite Tier-1 non-IIM with ₹33 LPA average CTC',
      'Requires choosing your exact specialization at form-filling stage',
      'Early profile-based calls issued prior to CAT results'
    ],
    specialFormWarning: 'CRITICAL: Form closes BEFORE CAT exam! Once closed, you cannot apply even with 99.9%ile.'
  },
  {
    id: 'mdi-gurgaon',
    name: 'Management Development Institute',
    shortName: 'MDI Gurgaon',
    location: 'Gurugram, NCR',
    tier: 'Tier 1',
    requiresSeparateApplication: true,
    applicationFee: 3000,
    feeNote: 'Separate Form Required',
    applicationDeadline: '2026-11-24',
    deadlineDisplay: 'Nov 24, 2026 (Exam Eve)',
    deadlineStatus: 'Closing Soon',
    portalUrl: 'https://www.mdi.ac.in',
    acceptedExams: ['CAT'],
    primaryCutoffPercentile: 94.5,
    cutoffDisplay: '94-96+ %ile',
    avgCtcLakhs: 27.60,
    medianCtcLakhs: 26.13,
    tuitionFeeLakhs: 24.2,
    roiRating: 'Exceptional',
    programs: ['PGDM', 'PGDM-HRM', 'PGDM-International Business'],
    highlights: [
      'Top choice in NCR with massive Consulting and FMCG presence',
      'No strict sectional cutoffs, overall balanced score considered',
      '100% placement track record with ₹27.6L average package'
    ],
    specialFormWarning: 'Deadline is typically on the eve of CAT. Late submissions are strictly rejected.'
  },
  {
    id: 'fms-delhi',
    name: 'Faculty of Management Studies, University of Delhi',
    shortName: 'FMS Delhi',
    location: 'New Delhi, Delhi',
    tier: 'Tier 1',
    requiresSeparateApplication: true,
    applicationFee: 1000,
    feeNote: 'Separate Form Required (Unbeatable ROI)',
    applicationDeadline: '2026-12-15',
    deadlineDisplay: 'Mid Dec, 2026',
    deadlineStatus: 'Open',
    portalUrl: 'https://fms.edu',
    acceptedExams: ['CAT'],
    primaryCutoffPercentile: 99.3,
    cutoffDisplay: '99.2-99.5+ %ile (VARC Weighted)',
    avgCtcLakhs: 34.10,
    medianCtcLakhs: 31.0,
    tuitionFeeLakhs: 2.0,
    roiRating: 'Exceptional',
    programs: ['Full-Time MBA'],
    highlights: [
      'World-famous ROI: ₹2 Lakh fee vs ₹34+ LPA average placement',
      'VARC carries highest weightage (40%) in shortlisting formula',
      'Red building of dreams in University of Delhi North Campus'
    ],
    specialFormWarning: 'Separate form opens in November/December. Lowest form fee (₹1,000) for Tier-1 MBA.'
  },
  {
    id: 'iift-delhi',
    name: 'Indian Institute of Foreign Trade',
    shortName: 'IIFT Delhi & Kolkata',
    location: 'New Delhi / Kolkata',
    tier: 'Tier 1',
    requiresSeparateApplication: true,
    applicationFee: 2500,
    feeNote: 'Separate Form Required (Admits via CAT)',
    applicationDeadline: '2026-11-20',
    deadlineDisplay: 'Nov 20, 2026',
    deadlineStatus: 'Closing Soon',
    portalUrl: 'https://iift.ac.in',
    acceptedExams: ['CAT'],
    primaryCutoffPercentile: 98.0,
    cutoffDisplay: '97.5-98.5+ %ile',
    avgCtcLakhs: 29.10,
    medianCtcLakhs: 26.50,
    tuitionFeeLakhs: 21.7,
    roiRating: 'Exceptional',
    programs: ['MBA (International Business)', 'MBA (Business Analytics)'],
    highlights: [
      'Ministry of Commerce premier autonomous institute',
      'No separate exam anymore; shortlisting is done strictly via CAT',
      'Top destination for Global Trade, Commodities, and Strategy roles'
    ],
    specialFormWarning: 'Separate application mandatory via IIFT admission portal before deadline.'
  },
  {
    id: 'iit-bombay-sjmsom',
    name: 'SJMSOM, IIT Bombay',
    shortName: 'SJMSOM IIT Bombay',
    location: 'Mumbai, Maharashtra',
    tier: 'Tier 1',
    requiresSeparateApplication: true,
    applicationFee: 1600,
    feeNote: 'Separate Form (Opens post-CAT)',
    applicationDeadline: '2027-01-31',
    deadlineDisplay: 'Jan 31, 2027 (Post-CAT)',
    deadlineStatus: 'Opening Soon',
    portalUrl: 'https://www.som.iitb.ac.in',
    acceptedExams: ['CAT'],
    primaryCutoffPercentile: 98.5,
    cutoffDisplay: '98.5+ %ile (4-yr Degree Required)',
    avgCtcLakhs: 28.88,
    medianCtcLakhs: 26.64,
    tuitionFeeLakhs: 14.5,
    roiRating: 'Exceptional',
    programs: ['Master of Management (MBA)'],
    highlights: [
      'Incredible ROI: ₹14.5L fee with ₹28.8L average package',
      'IIT Bombay campus life and premier tech/consulting recruiters',
      'Requires 4-year engineering degree or Master degree'
    ],
    specialFormWarning: 'Application opens immediately after CAT results in January.'
  },
  {
    id: 'iit-delhi-dms',
    name: 'Department of Management Studies, IIT Delhi',
    shortName: 'DMS IIT Delhi',
    location: 'New Delhi, Delhi',
    tier: 'Tier 1',
    requiresSeparateApplication: true,
    applicationFee: 1600,
    feeNote: 'Separate Form (Post-CAT)',
    applicationDeadline: '2027-01-31',
    deadlineDisplay: 'Jan 31, 2027 (Post-CAT)',
    deadlineStatus: 'Opening Soon',
    portalUrl: 'https://dms.iitd.ac.in',
    acceptedExams: ['CAT'],
    primaryCutoffPercentile: 97.5,
    cutoffDisplay: '97.0-98.0+ %ile',
    avgCtcLakhs: 24.45,
    medianCtcLakhs: 23.50,
    tuitionFeeLakhs: 12.0,
    roiRating: 'Exceptional',
    programs: ['MBA', 'MBA (Telecom Systems Mgmt)'],
    highlights: [
      'NIRF Rank 4 among top management institutes',
      'Low tuition fee of ₹12L with high placement median of ₹23.5L',
      'Central Delhi location advantages and tech-management cross synergy'
    ],
    specialFormWarning: 'Apply online post CAT results with your CAT registration number.'
  },
  {
    id: 'iit-kharagpur-vgsom',
    name: 'Vinod Gupta School of Management, IIT Kharagpur',
    shortName: 'VGSoM IIT Kharagpur',
    location: 'Kharagpur, West Bengal',
    tier: 'Tier 1.5',
    requiresSeparateApplication: true,
    applicationFee: 1600,
    feeNote: 'Separate Form (Post-CAT)',
    applicationDeadline: '2027-01-31',
    deadlineDisplay: 'Jan 31, 2027',
    deadlineStatus: 'Opening Soon',
    portalUrl: 'https://som.iitkgp.ac.in',
    acceptedExams: ['CAT'],
    primaryCutoffPercentile: 95.0,
    cutoffDisplay: '94-96+ %ile',
    avgCtcLakhs: 22.13,
    medianCtcLakhs: 21.0,
    tuitionFeeLakhs: 13.0,
    roiRating: 'Exceptional',
    programs: ['MBA'],
    highlights: [
      'First business school established inside an IIT system',
      'High supply chain, analytics, and manufacturing leadership placement',
      'Rich 2,100-acre sprawling campus'
    ]
  },
  {
    id: 'iit-madras-doms',
    name: 'DoMS, IIT Madras',
    shortName: 'DoMS IIT Madras',
    location: 'Chennai, Tamil Nadu',
    tier: 'Tier 1.5',
    requiresSeparateApplication: true,
    applicationFee: 1600,
    feeNote: 'Separate Form (Post-CAT)',
    applicationDeadline: '2027-01-31',
    deadlineDisplay: 'Jan 31, 2027',
    deadlineStatus: 'Opening Soon',
    portalUrl: 'https://doms.iitm.ac.in',
    acceptedExams: ['CAT'],
    primaryCutoffPercentile: 94.0,
    cutoffDisplay: '93-95+ %ile',
    avgCtcLakhs: 20.19,
    medianCtcLakhs: 19.50,
    tuitionFeeLakhs: 11.5,
    roiRating: 'Exceptional',
    programs: ['MBA'],
    highlights: [
      'Excellent ROI with ₹11.5L fee and ₹20.2L average package',
      'Strong analytics, data science, and operations curriculum',
      'High conversion rate for engineers with good academic records'
    ]
  },
  {
    id: 'imt-ghaziabad',
    name: 'Institute of Management Technology',
    shortName: 'IMT Ghaziabad',
    location: 'Ghaziabad, NCR',
    tier: 'Tier 1.5',
    requiresSeparateApplication: true,
    applicationFee: 2500,
    feeNote: 'Separate Form Required (Common for Ghaziabad/Nagpur/Hyd)',
    applicationDeadline: '2026-11-25',
    deadlineDisplay: 'Nov 25, 2026',
    deadlineStatus: 'Closing Soon',
    portalUrl: 'https://www.imt.edu',
    acceptedExams: ['CAT', 'XAT', 'GMAT'],
    primaryCutoffPercentile: 91.0,
    cutoffDisplay: '90-93+ %ile (CAT / XAT)',
    avgCtcLakhs: 17.35,
    medianCtcLakhs: 16.0,
    tuitionFeeLakhs: 21.5,
    roiRating: 'High',
    programs: ['PGDM (Marketing)', 'PGDM (Core)', 'PGDM (Finance)', 'PGDM (BFS)'],
    highlights: [
      'Uncontested marketing powerhouse among non-IIMs',
      'Strong presence of top FMCG, Consumer Tech, and Media brands',
      'Common application form covers Ghaziabad, Nagpur, and Hyderabad campuses'
    ],
    specialFormWarning: 'Form fee is ₹2,500. Deadline is right before CAT.'
  },
  {
    id: 'imi-new-delhi',
    name: 'International Management Institute',
    shortName: 'IMI New Delhi',
    location: 'New Delhi, Delhi',
    tier: 'Tier 1.5',
    requiresSeparateApplication: true,
    applicationFee: 2500,
    feeNote: 'Separate Form Required',
    applicationDeadline: '2026-12-15',
    deadlineDisplay: 'Dec 15, 2026',
    deadlineStatus: 'Open',
    portalUrl: 'https://www.imi.edu',
    acceptedExams: ['CAT', 'XAT', 'GMAT'],
    primaryCutoffPercentile: 88.5,
    cutoffDisplay: '88-91+ %ile',
    avgCtcLakhs: 17.01,
    medianCtcLakhs: 16.50,
    tuitionFeeLakhs: 20.8,
    roiRating: 'High',
    programs: ['PGDM', 'PGDM (HRM)', 'PGDM (Banking & Financial Services)'],
    highlights: [
      'Prime Qutab Institutional Area location in South Delhi',
      'Strong BFSI and analytics domain placements',
      'AMBA and AACSB accredited'
    ]
  },
  {
    id: 'ximb-bhubaneswar',
    name: 'Xavier Institute of Management, XIM University',
    shortName: 'XIMB Bhubaneswar',
    location: 'Bhubaneswar, Odisha',
    tier: 'Tier 1.5',
    requiresSeparateApplication: true,
    applicationFee: 2000,
    feeNote: 'Separate Form Required (Accepts CAT/XAT/X-GMT)',
    applicationDeadline: '2026-12-10',
    deadlineDisplay: 'Dec 10, 2026',
    deadlineStatus: 'Open',
    portalUrl: 'https://xim.edu.in',
    acceptedExams: ['CAT', 'XAT', 'GMAT', 'X-GMT'],
    primaryCutoffPercentile: 90.0,
    cutoffDisplay: '89-91+ %ile (BM) / 86+ %ile (HRM)',
    avgCtcLakhs: 19.53,
    medianCtcLakhs: 18.37,
    tuitionFeeLakhs: 22.0,
    roiRating: 'High',
    programs: ['MBA-BM (Business Management)', 'MBA-HRM'],
    highlights: [
      'Historic Jesuit business school with 35+ years of excellence',
      'Strong consulting, BFSI, and systems placements',
      'Also conducts own test (X-GMT) in January if CAT/XAT goes average'
    ]
  },
  {
    id: 'gim-goa',
    name: 'Goa Institute of Management',
    shortName: 'GIM Goa',
    location: 'Sanquelim, Goa',
    tier: 'Tier 1.5',
    requiresSeparateApplication: true,
    applicationFee: 2500,
    feeNote: 'Separate Form (Achievers Round for Top Profiles)',
    applicationDeadline: '2026-12-20',
    deadlineDisplay: 'Dec 20, 2026',
    deadlineStatus: 'Open',
    portalUrl: 'https://www.gim.ac.in',
    acceptedExams: ['CAT', 'XAT', 'GMAT', 'CMAT'],
    primaryCutoffPercentile: 88.0,
    cutoffDisplay: '88-90+ %ile (Achievers round at 80+)',
    avgCtcLakhs: 15.20,
    medianCtcLakhs: 14.50,
    tuitionFeeLakhs: 19.5,
    roiRating: 'High',
    programs: ['PGDM', 'PGDM (Big Data Analytics)', 'PGDM (Healthcare)', 'PGDM (BFSI)'],
    highlights: [
      'Pioneer of specialized Big Data Analytics (BDA) program in India',
      'Scenic Western Ghats campus in Sanquelim',
      'Achievers Round shortlists profiles before CAT based on work-ex & achievements'
    ]
  },
  {
    id: 'great-lakes-chennai',
    name: 'Great Lakes Institute of Management',
    shortName: 'Great Lakes Chennai',
    location: 'Chennai, Tamil Nadu',
    tier: 'Tier 1.5',
    requiresSeparateApplication: true,
    applicationFee: 2000,
    feeNote: 'Separate Form (Cycle 1 & Cycle 2)',
    applicationDeadline: '2026-12-01',
    deadlineDisplay: 'Cycle 1: Dec 01 | Cycle 2: Jan 15',
    deadlineStatus: 'Open',
    portalUrl: 'https://www.greatlakes.edu.in',
    acceptedExams: ['CAT', 'XAT', 'CMAT', 'GMAT'],
    primaryCutoffPercentile: 83.0,
    cutoffDisplay: '80-85+ %ile (PGDM 2-yr) / Profile for PGPM',
    avgCtcLakhs: 15.10,
    medianCtcLakhs: 14.20,
    tuitionFeeLakhs: 20.7,
    roiRating: 'High',
    programs: ['PGPM (1-Year for WorkEx > 24m)', 'PGDM (2-Year)'],
    highlights: [
      'Flagship 1-year PGPM is top 3 in India alongside ISB and IIM 1-yr programs',
      'Founded by management guru Dr. Bala V. Balachandran',
      'Strong analytics, product management, and fintech placements'
    ]
  },
  {
    id: 'tapmi-manipal',
    name: 'T.A. Pai Management Institute',
    shortName: 'TAPMI Manipal',
    location: 'Manipal, Karnataka',
    tier: 'Tier 1.5',
    requiresSeparateApplication: true,
    applicationFee: 2200,
    feeNote: 'Separate Form Required',
    applicationDeadline: '2026-12-20',
    deadlineDisplay: 'Dec 20, 2026',
    deadlineStatus: 'Open',
    portalUrl: 'https://www.tapmi.edu.in',
    acceptedExams: ['CAT', 'XAT', 'GMAT', 'NMAT'],
    primaryCutoffPercentile: 85.0,
    cutoffDisplay: '83-86+ %ile',
    avgCtcLakhs: 14.80,
    medianCtcLakhs: 14.0,
    tuitionFeeLakhs: 18.5,
    roiRating: 'Good',
    programs: ['MBA', 'MBA (Banking & Financial Services)', 'MBA (HR)', 'MBA (Marketing)'],
    highlights: [
      'First AICTE b-school in India with AACSB and AMBA double accreditation',
      'Famous live Bloomberg terminal integration in finance curriculum',
      'Student-managed investment fund (SMIF) handling real portfolios'
    ]
  },
  {
    id: 'fore-new-delhi',
    name: 'FORE School of Management',
    shortName: 'FORE New Delhi',
    location: 'New Delhi, Delhi',
    tier: 'Tier 2',
    requiresSeparateApplication: true,
    applicationFee: 2000,
    feeNote: 'Separate Form Required',
    applicationDeadline: '2026-12-22',
    deadlineDisplay: 'Dec 22, 2026',
    deadlineStatus: 'Open',
    portalUrl: 'https://www.fsm.ac.in',
    acceptedExams: ['CAT', 'XAT', 'GMAT'],
    primaryCutoffPercentile: 84.0,
    cutoffDisplay: '82-85+ %ile',
    avgCtcLakhs: 16.01,
    medianCtcLakhs: 15.0,
    tuitionFeeLakhs: 18.0,
    roiRating: 'Good',
    programs: ['PGDM', 'PGDM (International Business)', 'PGDM (Financial Mgmt)', 'PGDM (Big Data)'],
    highlights: [
      'South Delhi Qutab Institutional Area prime corporate proximity',
      'Strong marketing, consulting, and finance recruitment',
      'Established in 1981 with 7,000+ strong alumni network'
    ]
  },
  {
    id: 'lbsim-new-delhi',
    name: 'Lal Bahadur Shastri Institute of Management',
    shortName: 'LBSIM New Delhi',
    location: 'Dwarka, New Delhi',
    tier: 'Tier 2',
    requiresSeparateApplication: true,
    applicationFee: 2000,
    feeNote: 'Separate Form Required',
    applicationDeadline: '2026-12-22',
    deadlineDisplay: 'Dec 22, 2026',
    deadlineStatus: 'Open',
    portalUrl: 'https://www.lbsim.ac.in',
    acceptedExams: ['CAT', 'XAT'],
    primaryCutoffPercentile: 82.5,
    cutoffDisplay: '80-84+ %ile',
    avgCtcLakhs: 12.24,
    medianCtcLakhs: 11.80,
    tuitionFeeLakhs: 15.5,
    roiRating: 'Good',
    programs: ['PGDM (General)', 'PGDM (Financial Management)', 'PGDM (Research & Business Analytics)'],
    highlights: [
      'Renowned for value-based education and financial management depth',
      'Dwarka Metro connected modern campus in NCR',
      'Solid backup for students aiming between 80 to 85 percentile'
    ]
  },
  {
    id: 'kj-somaiya-mumbai',
    name: 'K J Somaiya Institute of Management',
    shortName: 'K J Somaiya Mumbai',
    location: 'Vidyavihar, Mumbai',
    tier: 'Tier 2',
    requiresSeparateApplication: true,
    applicationFee: 3000,
    feeNote: 'Separate Form Required (Accepts CAT/XAT/NMAT/CMAT)',
    applicationDeadline: '2027-01-15',
    deadlineDisplay: 'Jan 15, 2027',
    deadlineStatus: 'Open',
    portalUrl: 'https://simsr.somaiya.edu',
    acceptedExams: ['CAT', 'XAT', 'NMAT', 'CMAT', 'GMAT'],
    primaryCutoffPercentile: 83.5,
    cutoffDisplay: '82-85+ %ile / 222+ NMAT Score',
    avgCtcLakhs: 12.32,
    medianCtcLakhs: 11.75,
    tuitionFeeLakhs: 20.8,
    roiRating: 'Moderate',
    programs: ['MBA', 'MBA (Healthcare Mgmt)', 'MBA (Sports Mgmt)'],
    highlights: [
      'Huge 50-acre green campus in central Mumbai',
      'Accepts virtually all major entrance exams (CAT, XAT, NMAT, CMAT)',
      'Large batch with high corporate representation in BFSI and retail'
    ]
  },
  {
    id: 'irma-anand',
    name: 'Institute of Rural Management Anand',
    shortName: 'IRMA Anand',
    location: 'Anand, Gujarat',
    tier: 'Tier 1.5',
    requiresSeparateApplication: true,
    applicationFee: 2000,
    feeNote: 'Separate Form Required',
    applicationDeadline: '2026-12-31',
    deadlineDisplay: 'Dec 31, 2026',
    deadlineStatus: 'Open',
    portalUrl: 'https://irma.ac.in',
    acceptedExams: ['CAT', 'XAT', 'CMAT'],
    primaryCutoffPercentile: 82.0,
    cutoffDisplay: '80-84+ %ile',
    avgCtcLakhs: 15.50,
    medianCtcLakhs: 15.0,
    tuitionFeeLakhs: 16.8,
    roiRating: 'High',
    programs: ['PGDM (Rural Management)'],
    highlights: [
      'Founded by Dr. Verghese Kurien (Father of the White Revolution)',
      'Unchallenged leader in FMCG, Agribusiness, Microfinance, and ESG Consulting',
      'AMUL, ITC, Mother Dairy, and multinational agribusiness recruiters'
    ]
  },
  {
    id: 'mica-ahmedabad',
    name: 'MICA (The School of Ideas)',
    shortName: 'MICA Ahmedabad',
    location: 'Ahmedabad, Gujarat',
    tier: 'Tier 1.5',
    requiresSeparateApplication: true,
    applicationFee: 2100,
    feeNote: 'Requires MICA Form + MICAT Exam',
    applicationDeadline: '2026-11-20',
    deadlineDisplay: 'MICAT-1: Nov 20 | MICAT-2: Jan 16',
    deadlineStatus: 'Closing Soon',
    portalUrl: 'https://www.mica.ac.in',
    acceptedExams: ['CAT', 'XAT', 'GMAT'],
    primaryCutoffPercentile: 80.0,
    cutoffDisplay: '80+ %ile CAT/XAT + MICAT Score',
    avgCtcLakhs: 20.09,
    medianCtcLakhs: 19.0,
    tuitionFeeLakhs: 23.0,
    roiRating: 'High',
    programs: ['PGDM-C (Communications)', 'PGDM'],
    highlights: [
      'India’s premier institute for Strategic Marketing, Advertising, and Digital Media',
      'Conducts own creative psychometric test (MICAT)',
      'Top roles in Google, Meta, P&G, Unilever, and creative agencies'
    ]
  },
  {
    id: 'xlri-jamshedpur',
    name: 'XLRI - Xavier School of Management',
    shortName: 'XLRI Jamshedpur',
    location: 'Jamshedpur / Delhi-NCR',
    tier: 'Tier 1',
    requiresSeparateApplication: true,
    applicationFee: 2400,
    feeNote: 'Included in XAT registration (₹2200 base + ₹200/prog)',
    applicationDeadline: '2026-11-30',
    deadlineDisplay: 'Nov 30, 2026 (XAT Form)',
    deadlineStatus: 'Open',
    portalUrl: 'https://xatonline.in',
    acceptedExams: ['XAT'],
    primaryCutoffPercentile: 95.0,
    cutoffDisplay: '95+ %ile (BM) / 93+ %ile (HRM)',
    avgCtcLakhs: 32.70,
    medianCtcLakhs: 30.0,
    tuitionFeeLakhs: 28.0,
    roiRating: 'Exceptional',
    programs: ['PGDM (Business Management)', 'PGDM (Human Resource Management)'],
    highlights: [
      '#1 Human Resource Management program in Asia Pacific',
      'Equal prestige to IIM Ahmedabad/Bangalore/Calcutta',
      'XAT registration form allows selecting XLRI BM and HRM programs'
    ]
  },
  {
    id: 'nmims-mumbai',
    name: 'SBM, NMIMS Mumbai',
    shortName: 'NMIMS Mumbai',
    location: 'Mumbai, Maharashtra',
    tier: 'Tier 1',
    requiresSeparateApplication: true,
    applicationFee: 2600,
    feeNote: 'Separate NMIMS Application besides NMAT Test Fee',
    applicationDeadline: '2026-10-10',
    deadlineDisplay: 'Oct 10 (Retakes till Dec)',
    deadlineStatus: 'Closing Soon',
    portalUrl: 'https://www.nmims.edu',
    acceptedExams: ['NMAT'],
    primaryCutoffPercentile: 94.0,
    cutoffDisplay: '235+ NMAT Score (74+ QA, 76+ LS)',
    avgCtcLakhs: 26.63,
    medianCtcLakhs: 24.70,
    tuitionFeeLakhs: 24.0,
    roiRating: 'Exceptional',
    programs: ['MBA (Core)', 'MBA (Business Analytics)', 'MBA (HR)'],
    highlights: [
      'Massive corporate presence in Mumbai financial hub',
      'No negative marking on NMAT exam',
      'Requires separate college application form on NMIMS portal'
    ],
    specialFormWarning: 'You must apply on the NMIMS portal in addition to registering for NMAT by GMAC.'
  },
  {
    id: 'sibm-pune',
    name: 'Symbiosis Institute of Business Management',
    shortName: 'SIBM Pune',
    location: 'Lavale, Pune',
    tier: 'Tier 1',
    requiresSeparateApplication: true,
    applicationFee: 1000,
    feeNote: '₹1000 Institute Form (Besides ₹2250 SNAP fee)',
    applicationDeadline: '2026-12-09',
    deadlineDisplay: 'Dec 09, 2026 (SNAP Form)',
    deadlineStatus: 'Open',
    portalUrl: 'https://www.sibm.edu',
    acceptedExams: ['SNAP'],
    primaryCutoffPercentile: 98.0,
    cutoffDisplay: '98+ %ile (~43-45 marks)',
    avgCtcLakhs: 26.77,
    medianCtcLakhs: 25.0,
    tuitionFeeLakhs: 24.5,
    roiRating: 'Exceptional',
    programs: ['MBA (Marketing, Finance, HR, Operations)'],
    highlights: [
      'Flagship Symbiosis campus with scenic hilltop infrastructure',
      'Top choice for FMCG Marketing and General Management',
      'Each Symbiosis institute requires a separate ₹1,000 tick-box fee'
    ]
  },
  {
    id: 'scmhrd-pune',
    name: 'Symbiosis Centre for Management & HRD',
    shortName: 'SCMHRD Pune',
    location: 'Hinjawadi, Pune',
    tier: 'Tier 1.5',
    requiresSeparateApplication: true,
    applicationFee: 1000,
    feeNote: '₹1000 Institute Form (Besides SNAP fee)',
    applicationDeadline: '2026-12-09',
    deadlineDisplay: 'Dec 09, 2026',
    deadlineStatus: 'Open',
    portalUrl: 'https://www.scmhrd.edu',
    acceptedExams: ['SNAP'],
    primaryCutoffPercentile: 97.0,
    cutoffDisplay: '96.5-97.5+ %ile (~41-43 marks)',
    avgCtcLakhs: 23.71,
    medianCtcLakhs: 22.0,
    tuitionFeeLakhs: 22.5,
    roiRating: 'High',
    programs: ['MBA', 'MBA (Infrastructure Development & Mgmt)', 'MBA (Business Analytics)'],
    highlights: [
      'Elite HR management institute located in Hinjawadi IT corridor',
      'Pioneer of Infrastructure Development MBA',
      'Fast-paced SNAP test format (60 mins, 60 questions)'
    ]
  },

  // --- IIMs (NO SEPARATE FORM NEEDED - COVERED IN CAT REGISTRATION) ---
  {
    id: 'iim-ahmedabad',
    name: 'Indian Institute of Management Ahmedabad',
    shortName: 'IIM Ahmedabad',
    location: 'Ahmedabad, Gujarat',
    tier: 'Tier 1',
    requiresSeparateApplication: false,
    applicationFee: 0,
    feeNote: 'Included in CAT Registration (₹2,500)',
    applicationDeadline: '2026-09-20',
    deadlineDisplay: 'Covered in CAT Form',
    deadlineStatus: 'CAT Window',
    portalUrl: 'https://www.iima.ac.in',
    acceptedExams: ['CAT'],
    primaryCutoffPercentile: 99.5,
    cutoffDisplay: '99.5+ %ile (Rigid CS Formula)',
    avgCtcLakhs: 34.36,
    medianCtcLakhs: 31.50,
    tuitionFeeLakhs: 25.0,
    roiRating: 'Exceptional',
    programs: ['PGP (MBA)', 'PGP-FABM (Food & Agri-Business)'],
    highlights: [
      '#1 NIRF Ranked MBA institution in India',
      'Global prestige with elite MBB (McKinsey, BCG, Bain) presence',
      'No separate application fee required for PGP'
    ]
  },
  {
    id: 'iim-bangalore',
    name: 'Indian Institute of Management Bangalore',
    shortName: 'IIM Bangalore',
    location: 'Bengaluru, Karnataka',
    tier: 'Tier 1',
    requiresSeparateApplication: false,
    applicationFee: 0,
    feeNote: 'Included in CAT Registration',
    applicationDeadline: '2026-09-20',
    deadlineDisplay: 'Covered in CAT Form',
    deadlineStatus: 'CAT Window',
    portalUrl: 'https://www.iimb.ac.in',
    acceptedExams: ['CAT'],
    primaryCutoffPercentile: 99.3,
    cutoffDisplay: '99.3+ %ile (High Profile Weight)',
    avgCtcLakhs: 35.31,
    medianCtcLakhs: 33.0,
    tuitionFeeLakhs: 24.5,
    roiRating: 'Exceptional',
    programs: ['PGP (MBA)', 'PGP-BA (Business Analytics)'],
    highlights: [
      'Silicon Valley of India ecosystem advantage for Tech & Product Consulting',
      'Strong weightage to work experience quality and 10th/12th/Grad consistency',
      'Top alumni network across venture capital and private equity'
    ]
  },
  {
    id: 'iim-calcutta',
    name: 'Indian Institute of Management Calcutta',
    shortName: 'IIM Calcutta',
    location: 'Kolkata, West Bengal',
    tier: 'Tier 1',
    requiresSeparateApplication: false,
    applicationFee: 0,
    feeNote: 'Included in CAT Registration',
    applicationDeadline: '2026-09-20',
    deadlineDisplay: 'Covered in CAT Form',
    deadlineStatus: 'CAT Window',
    portalUrl: 'https://www.iimcal.ac.in',
    acceptedExams: ['CAT'],
    primaryCutoffPercentile: 99.6,
    cutoffDisplay: '99.6+ %ile (Quant & Finance Focus)',
    avgCtcLakhs: 35.07,
    medianCtcLakhs: 33.67,
    tuitionFeeLakhs: 27.0,
    roiRating: 'Exceptional',
    programs: ['MBA'],
    highlights: [
      'Unrivaled Finance Mecca of India (Goldman Sachs, Morgan Stanley, J.P. Morgan)',
      'Triple Crown Accreditation (AACSB, AMBA, EQUIS)',
      'High CAT score weightage compared to profile weight'
    ]
  },
  {
    id: 'iim-lucknow',
    name: 'Indian Institute of Management Lucknow',
    shortName: 'IIM Lucknow',
    location: 'Lucknow, Uttar Pradesh',
    tier: 'Tier 1',
    requiresSeparateApplication: false,
    applicationFee: 0,
    feeNote: 'Included in CAT Registration',
    applicationDeadline: '2026-09-20',
    deadlineDisplay: 'Covered in CAT Form',
    deadlineStatus: 'CAT Window',
    portalUrl: 'https://www.iiml.ac.in',
    acceptedExams: ['CAT'],
    primaryCutoffPercentile: 98.8,
    cutoffDisplay: '98.5-99.2+ %ile',
    avgCtcLakhs: 32.20,
    medianCtcLakhs: 30.0,
    tuitionFeeLakhs: 21.0,
    roiRating: 'Exceptional',
    programs: ['PGP', 'PGP-ABM', 'PGP-SM (Sustainable Management)'],
    highlights: [
      'Renowned academic rigor and consulting leadership',
      'Balanced selection criteria between CAT score and academic profile',
      'Elite placement record matching Ahmedabad and Bangalore'
    ]
  },
  {
    id: 'iim-kozhikode',
    name: 'Indian Institute of Management Kozhikode',
    shortName: 'IIM Kozhikode',
    location: 'Kozhikode, Kerala',
    tier: 'Tier 1',
    requiresSeparateApplication: false,
    applicationFee: 0,
    feeNote: 'Included in CAT Registration',
    applicationDeadline: '2026-09-20',
    deadlineDisplay: 'Covered in CAT Form',
    deadlineStatus: 'CAT Window',
    portalUrl: 'https://www.iimk.ac.in',
    acceptedExams: ['CAT'],
    primaryCutoffPercentile: 98.2,
    cutoffDisplay: '98.0-98.8+ %ile (High Diversity Weight)',
    avgCtcLakhs: 31.02,
    medianCtcLakhs: 28.0,
    tuitionFeeLakhs: 20.5,
    roiRating: 'Exceptional',
    programs: ['PGP', 'PGP-Finance', 'PGP-Liberal Studies & Management'],
    highlights: [
      'Pioneer of Gender Diversity in management education',
      'Scenic hilltop campus in Kerala',
      'Significant bonus marks for female and non-engineering aspirants'
    ]
  },
  {
    id: 'iim-indore',
    name: 'Indian Institute of Management Indore',
    shortName: 'IIM Indore',
    location: 'Indore, Madhya Pradesh',
    tier: 'Tier 1',
    requiresSeparateApplication: false,
    applicationFee: 0,
    feeNote: 'Included in CAT Registration',
    applicationDeadline: '2026-09-20',
    deadlineDisplay: 'Covered in CAT Form',
    deadlineStatus: 'CAT Window',
    portalUrl: 'https://www.iimidr.ac.in',
    acceptedExams: ['CAT'],
    primaryCutoffPercentile: 98.0,
    cutoffDisplay: '98.0+ %ile (Heavy 10th & 12th Weight)',
    avgCtcLakhs: 30.21,
    medianCtcLakhs: 27.20,
    tuitionFeeLakhs: 21.5,
    roiRating: 'Exceptional',
    programs: ['PGP', 'PGP-HRM'],
    highlights: [
      'Triple Crown Accredited institution',
      'Heavy shortlisting weightage given to Class 10 (34%) and Class 12 (40%) scores',
      'Large batch with robust sales, marketing, and BFSI placements'
    ]
  },
  {
    id: 'iim-mumbai',
    name: 'Indian Institute of Management Mumbai (formerly NITIE)',
    shortName: 'IIM Mumbai',
    location: 'Powai, Mumbai',
    tier: 'Tier 1',
    requiresSeparateApplication: false,
    applicationFee: 0,
    feeNote: 'Included in CAT Registration (Now an IIM)',
    applicationDeadline: '2026-09-20',
    deadlineDisplay: 'Covered in CAT Form',
    deadlineStatus: 'CAT Window',
    portalUrl: 'https://www.iimmumbai.ac.in',
    acceptedExams: ['CAT'],
    primaryCutoffPercentile: 98.0,
    cutoffDisplay: '97.5-98.5+ %ile',
    avgCtcLakhs: 31.00,
    medianCtcLakhs: 28.20,
    tuitionFeeLakhs: 21.0,
    roiRating: 'Exceptional',
    programs: ['MBA', 'MBA (Operations & Supply Chain)', 'MBA (Sustainability)'],
    highlights: [
      'God of Supply Chain & Operations in India, located in Powai Mumbai',
      'Converted from NITIE to full IIM in 2023; open to all academic backgrounds',
      'Elite FMCG and Consulting leadership presence'
    ]
  },
  {
    id: 'iim-cap',
    name: 'IIM Common Admission Process (CAP - Udaipur, Trichy, Ranchi, Raipur, Kashipur)',
    shortName: 'IIM CAP Consortium',
    location: '9 Participating New IIMs',
    tier: 'Tier 1.5',
    requiresSeparateApplication: false,
    applicationFee: 0,
    feeNote: 'Included in CAT Registration (Single CAP PI)',
    applicationDeadline: '2026-09-20',
    deadlineDisplay: 'Covered in CAT Form',
    deadlineStatus: 'CAT Window',
    portalUrl: 'https://www.iimcap.in',
    acceptedExams: ['CAT'],
    primaryCutoffPercentile: 94.0,
    cutoffDisplay: '93-95+ %ile (Sectionals 70-75%ile)',
    avgCtcLakhs: 19.50,
    medianCtcLakhs: 18.50,
    tuitionFeeLakhs: 18.0,
    roiRating: 'High',
    programs: ['MBA across 9 Participating IIMs'],
    highlights: [
      'Single centralized Personal Interview (CAP PI) for 9 premier new IIMs',
      'IIM Udaipur and IIM Trichy regularly cross ₹20 LPA average placements',
      'No separate registration fee required; select all IIMs during CAT registration'
    ]
  }
];

export interface MockPercentilesInput {
  imsPercentile?: number;
  timePercentile?: number;
  crackuPercentile?: number;
  clPercentile?: number;
  otherPercentile?: number;
  overridePercentile?: number;
  isOverrideActive: boolean;
}

/**
 * Normalizes disparate mock series into an authentic CAT-equivalent percentile.
 *
 * Institute Empirical Calibration:
 * - TIME (AIMCAT): Historically ~2.5% harder than CAT (+2.5 bonus to actual CAT equivalent)
 * - CRACKU: High quant rigor and large pool (+1.0 bonus)
 * - IMS (SimCAT): Very close to CAT scaling (+0.5 bonus)
 * - CL (CDC): Balanced CAT-like difficulty (+0.5 bonus)
 */
export function calculateNormalizedPercentile(input: MockPercentilesInput): {
  effectivePercentile: number;
  isOverridden: boolean;
  componentsUsed: { source: string; raw: number; calibrated: number; weight: number }[];
} {
  if (input.isOverrideActive && typeof input.overridePercentile === 'number' && !isNaN(input.overridePercentile)) {
    const clamped = Math.min(99.99, Math.max(1, input.overridePercentile));
    return {
      effectivePercentile: +clamped.toFixed(2),
      isOverridden: true,
      componentsUsed: [{ source: 'Manual Override', raw: clamped, calibrated: clamped, weight: 1.0 }]
    };
  }

  const components: { source: string; raw: number; calibrated: number; weight: number }[] = [];

  if (typeof input.timePercentile === 'number' && !isNaN(input.timePercentile) && input.timePercentile > 0) {
    const cal = Math.min(99.99, input.timePercentile + 2.5);
    components.push({ source: 'TIME (AIMCAT)', raw: input.timePercentile, calibrated: cal, weight: 1.2 });
  }

  if (typeof input.imsPercentile === 'number' && !isNaN(input.imsPercentile) && input.imsPercentile > 0) {
    const cal = Math.min(99.99, input.imsPercentile + 0.5);
    components.push({ source: 'IMS (SimCAT)', raw: input.imsPercentile, calibrated: cal, weight: 1.1 });
  }

  if (typeof input.crackuPercentile === 'number' && !isNaN(input.crackuPercentile) && input.crackuPercentile > 0) {
    const cal = Math.min(99.99, input.crackuPercentile + 1.0);
    components.push({ source: 'CRACKU', raw: input.crackuPercentile, calibrated: cal, weight: 1.0 });
  }

  if (typeof input.clPercentile === 'number' && !isNaN(input.clPercentile) && input.clPercentile > 0) {
    const cal = Math.min(99.99, input.clPercentile + 0.5);
    components.push({ source: 'Career Launcher (CL)', raw: input.clPercentile, calibrated: cal, weight: 1.0 });
  }

  if (typeof input.otherPercentile === 'number' && !isNaN(input.otherPercentile) && input.otherPercentile > 0) {
    components.push({ source: 'Other Mocks', raw: input.otherPercentile, calibrated: input.otherPercentile, weight: 0.8 });
  }

  if (components.length === 0) {
    // Default fallback if no input yet
    return {
      effectivePercentile: 90.0,
      isOverridden: false,
      componentsUsed: []
    };
  }

  let totalWeight = 0;
  let weightedSum = 0;

  components.forEach(c => {
    weightedSum += c.calibrated * c.weight;
    totalWeight += c.weight;
  });

  const effective = Math.min(99.99, Math.max(1, +(weightedSum / totalWeight).toFixed(2)));

  return {
    effectivePercentile: effective,
    isOverridden: false,
    componentsUsed: components
  };
}

/**
 * Classifies a college into 'Difficult' | 'Target' | 'Safe' | 'Backup'
 * based on current effective percentile and college cutoff requirements.
 */
export function categorizeCollegeForPercentile(
  college: MbaPlannerCollege,
  effectivePercentile: number
): {
  category: FormMatchCategory;
  percentileDelta: number;
  badgeLabel: string;
  badgeColorClass: string;
  advice: string;
} {
  const delta = +(effectivePercentile - college.primaryCutoffPercentile).toFixed(2);

  // Special rule for super-elite colleges (IIM A, B, C, FMS)
  const isSuperElite = ['iim-ahmedabad', 'iim-bangalore', 'iim-calcutta', 'fms-delhi'].includes(college.id);

  if (isSuperElite && effectivePercentile < 98.0) {
    return {
      category: 'Difficult',
      percentileDelta: delta,
      badgeLabel: 'Difficult / Dream',
      badgeColorClass: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800',
      advice: 'Significant stretch. Keep as an aspirational dream; focus on hitting 99.3+ in remaining mocks.'
    };
  }

  if (delta < -1.0) {
    return {
      category: 'Difficult',
      percentileDelta: delta,
      badgeLabel: 'Difficult / Dream',
      badgeColorClass: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800',
      advice: `Requires a ${Math.abs(delta).toFixed(1)}%ile jump. Fill form only if you have budget or high profile achievements.`
    };
  }

  if (delta >= -1.0 && delta <= 1.5) {
    return {
      category: 'Target',
      percentileDelta: delta,
      badgeLabel: 'Target / Sweet Spot',
      badgeColorClass: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
      advice: 'Prime target! Your mock trajectory is in the sweet spot for interview call. MUST FILL FORM.'
    };
  }

  if (delta > 1.5 && delta <= 5.0) {
    return {
      category: 'Safe',
      percentileDelta: delta,
      badgeLabel: 'Safe / Solid Bet',
      badgeColorClass: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
      advice: 'Comfortably clears historical cutoff. Very high probability of interview call.'
    };
  }

  // delta > 5.0
  return {
    category: 'Backup',
    percentileDelta: delta,
    badgeLabel: 'Backup / Safety Net',
    badgeColorClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    advice: 'Very high safety buffer. Use as reliable fallback to ensure you convert an MBA seat this season.'
  };
}
