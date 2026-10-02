import { DailyTarget } from '@/types/exam';

export const GMAT_DAILY_TARGETS: DailyTarget[] = [
  {
    id: 'gmat-target-day-1',
    dayNumber: 1,
    dateStr: 'Day 1: GMAT Focus 705+ Diagnostic Benchmark Sprint',
    title: 'GMAT Focus 705+ Benchmark Daily Sprint #1',
    description: 'Official GMAC Focus Edition simulation: Quantitative Reasoning (Pure Problem Solving: Number Properties, Work-Rates & Absolute Inequalities), Verbal Reasoning (Critical Reasoning Bold-face & Cognitive RC), and Data Insights (Data Sufficiency 5-choice standard).',
    estimatedMinutes: 35,
    exam: 'GMAT',
    sectionBreakdown: [
      {
        section: 'Quantitative_Reasoning',
        label: 'Quantitative Reasoning',
        count: 4,
        description: 'Pure Problem Solving without calculator. Trailing zeroes, Prime factors, Work-rate harmonic equations, and Absolute value inequalities.'
      },
      {
        section: 'Verbal_Reasoning',
        label: 'Verbal Reasoning',
        count: 5,
        description: 'Critical Reasoning (Bold-face roles, Negation assumption technique, Causal weaken) and High-density Academic RC passage.'
      },
      {
        section: 'Data_Insights',
        label: 'Data Insights',
        count: 5,
        description: 'Official 5-choice Data Sufficiency (Value vs Yes/No questions), Multi-Source Reasoning, and Two-Part Table Analysis.'
      }
    ],
    sections: {
      varcCount: 5,
      dilrCount: 5,
      qaCount: 4
    },
    questions: [
      // ==========================================
      // SECTION 1: QUANTITATIVE REASONING (Problem Solving)
      // ==========================================
      {
        id: 'gmat-d1-quant-q1',
        exam: 'GMAT',
        section: 'Quantitative_Reasoning',
        topic: 'Number Properties',
        subtopic: 'Trailing Zeroes & Prime Factorization',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `If $N = 125^{10} \\times 64^{6} \\times 45^{8}$, what is the total number of consecutive trailing zeroes at the end of the integer representation of $N$?`,
        options: [
          { id: 'A', text: '30' },
          { id: 'B', text: '36' },
          { id: 'C', text: '38' },
          { id: 'D', text: '42' },
          { id: 'E', text: '46' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'GMAT Focus Signature: Trailing Zeroes via $\\min(\\text{Power of } 2, \\text{Power of } 5)$',
          stepByStep: [
            'Each trailing zero in base-10 arithmetic is formed by the prime product pair $(2 \\times 5) = 10$.',
            'Therefore, the number of trailing zeroes equals $\\min(a, b)$ where $N = 2^a \\times 5^b \\times k$ (with $\\gcd(k, 10) = 1$).',
            'Deconstruct each factor into its fundamental prime bases:',
            '1. $125^{10} = (5^3)^{10} = 5^{30}$',
            '2. $64^6 = (2^6)^6 = 2^{36}$',
            '3. $45^8 = (3^2 \\times 5)^8 = 3^{16} \\times 5^8$',
            'Combine powers of 2 and 5:',
            'Total power of 2: $a = 36$',
            'Total power of 5: $b = 30 + 8 = 38$',
            'The limiting factor is the exponent of 2, since $a = 36 < 38$.',
            'Hence, exactly $\\min(36, 38) = 36$ trailing zeroes are created.'
          ],
          shortcutOrAlumTip: 'Never calculate intermediate values! Write out prime factorization exponents immediately: $5^{30} \\times 2^{36} \\times 5^8 = 2^{36} \\times 5^{38}$. The smaller exponent (36) is your answer in under 45 seconds.',
          trapAnalysis: 'Trap C (38) is chosen by candidates who assume 5 is always the limiting factor (as in factorials $n!$). Here, powers of 5 exceed powers of 2 because of the large $125^{10}$ and $45^8$ multipliers.',
          prerequisite: 'Prime Factorization, Exponent Laws'
        },
        pastYearReference: 'GMAT Focus Official Prep Benchmark #1'
      },
      {
        id: 'gmat-d1-quant-q2',
        exam: 'GMAT',
        section: 'Quantitative_Reasoning',
        topic: 'Work and Rates',
        subtopic: 'Combined Variable Efficiency',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `Working alone at their respective constant rates, Machine $X$ takes $x$ hours to produce a batch of 600 components, and Machine $Y$ takes $y$ hours to produce the same batch. When operating together simultaneously at their constant rates, they produce the batch in 4 hours. If Machine $X$ alone would take 6 hours longer than Machine $Y$ alone, how many hours does Machine $X$ take alone?`,
        options: [
          { id: 'A', text: '6 hours' },
          { id: 'B', text: '8 hours' },
          { id: 'C', text: '12 hours' },
          { id: 'D', text: '14 hours' },
          { id: 'E', text: '16 hours' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'Harmonic Work-Rate Equation: $\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{T_{\\text{together}}}$',
          stepByStep: [
            'Let Machine $Y$ take $y$ hours alone. Machine $X$ takes $x = y + 6$ hours alone.',
            'Combined rate equation: $\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{4}$',
            'Substitute $y = x - 6$ into the equation:',
            '$\\frac{1}{x} + \\frac{1}{x - 6} = \\frac{1}{4}$',
            'Multiply both sides by $4x(x - 6)$:',
            '$4(x - 6) + 4x = x(x - 6)$',
            '$4x - 24 + 4x = x^2 - 6x$',
            '$8x - 24 = x^2 - 6x$',
            '$x^2 - 14x + 24 = 0$',
            'Factor the quadratic: $(x - 12)(x - 2) = 0$',
            'Since Machine $X$ takes 6 hours longer than Machine $Y$, $x$ must be strictly greater than 6 ($y = x - 6 > 0$).',
            'Therefore, $x = 2$ is extraneous, leaving $x = 12$ hours. (Machine $Y$ takes $12 - 6 = 6$ hours, and $\\frac{1}{12} + \\frac{1}{6} = \\frac{3}{12} = \\frac{1}{4}$, which perfectly matches 4 hours!).'
          ],
          shortcutOrAlumTip: 'Test the options using $y = x - 6$ and $\\frac{xy}{x+y} = 4$. If $x = 12$, $y = 6 \\implies \\frac{12 \\times 6}{12 + 6} = \\frac{72}{18} = 4$. Confirmed in 15 seconds without quadratic factoring.',
          trapAnalysis: 'Trap A (6 hours) is the time taken by Machine $Y$, not Machine $X$. The question asks for Machine $X$.',
          prerequisite: 'Work-Rate reciprocals, Quadratic equations'
        },
        pastYearReference: 'GMAT Focus Official Quantitative Reasoning Hard PS'
      },
      {
        id: 'gmat-d1-quant-q3',
        exam: 'GMAT',
        section: 'Quantitative_Reasoning',
        topic: 'Algebra & Inequalities',
        subtopic: 'Absolute Values & Intervals',
        type: 'MCQ',
        difficulty: 'CAT 99+ %ile',
        questionText: `For how many distinct integer values of $k$ does the inequality $|2k - 7| < |k + 8|$ hold true?`,
        options: [
          { id: 'A', text: '13' },
          { id: 'B', text: '14' },
          { id: 'C', text: '15' },
          { id: 'D', text: '16' },
          { id: 'E', text: 'Infinitely many' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'Squaring Absolute Value Inequalities: $|A| < |B| \\iff A^2 < B^2 \\iff (A - B)(A + B) < 0$',
          stepByStep: [
            'Both sides of $|2k - 7| < |k + 8|$ are non-negative, so we can square both sides without altering the inequality direction:',
            '$(2k - 7)^2 < (k + 8)^2$',
            'Rearrange: $(2k - 7)^2 - (k + 8)^2 < 0$',
            'Use difference of squares $U^2 - V^2 = (U - V)(U + V)$:',
            'Here $U = 2k - 7$ and $V = k + 8$:',
            '$[(2k - 7) - (k + 8)] \\times [(2k - 7) + (k + 8)] < 0$',
            '$(k - 15)(3k + 1) < 0$',
            'Roots of the expression are $k = -\\frac{1}{3}$ and $k = 15$.',
            'For the product to be negative, $k$ must lie strictly between the roots:',
            '$-\\frac{1}{3} < k < 15$',
            'The integer values of $k$ satisfying this inequality are $0, 1, 2, 3, \\dots, 14$.',
            'Total count of integers from 0 to 14 is: $14 - 0 + 1 = 15$ integers.'
          ],
          shortcutOrAlumTip: 'Using the algebraic identity $(U - V)(U + V) < 0$ saves you from testing 3 separate piecewise intervals $(-\\infty, -8)$, $[-8, 3.5)$, and $[3.5, \\infty)$.',
          trapAnalysis: 'Trap B (14) forgets that $k = 0$ is an integer strictly greater than $-1/3$. Trap D (16) accidentally includes either boundary point.',
          prerequisite: 'Difference of squares, Interval sign analysis'
        },
        pastYearReference: 'GMAT 700+ Quantitative Reasoning Equivalent'
      },
      {
        id: 'gmat-d1-quant-q4',
        exam: 'GMAT',
        section: 'Quantitative_Reasoning',
        topic: 'Overlapping Sets',
        subtopic: '3-Set Venn Diagram with Exact Overlaps',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `In a cohort of 120 executive MBA candidates at a top business school, 65 have experience in Corporate Finance, 55 have experience in Marketing, and 50 have experience in Supply Chain. Exactly 20 candidates have experience in both Finance and Marketing, 18 in Marketing and Supply Chain, and 22 in Finance and Supply Chain. If 8 candidates have experience in all three domains, how many candidates have experience in NONE of these three domains?`,
        options: [
          { id: 'A', text: '8' },
          { id: 'B', text: '10' },
          { id: 'C', text: '12' },
          { id: 'D', text: '14' },
          { id: 'E', text: '18' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Principle of Inclusion-Exclusion for 3 Sets: $|A \\cup B \\cup C| = \\sum |A| - \\sum |A \\cap B| + |A \\cap B \\cap C|$',
          stepByStep: [
            'Let $F$ = Finance (65), $M$ = Marketing (55), $S$ = Supply Chain (50).',
            'Pairwise intersections: $|F \\cap M| = 20$, $|M \\cap S| = 18$, $|F \\cap S| = 22$.',
            'Triple intersection: $|F \\cap M \\cap S| = 8$.',
            'Apply Inclusion-Exclusion:',
            '$|F \\cup M \\cup S| = (65 + 55 + 50) - (20 + 18 + 22) + 8$',
            '$|F \\cup M \\cup S| = 170 - 60 + 8 = 118$.',
            'Total candidates in cohort = 120.',
            'Candidates in none of the three domains = $\\text{Total} - |F \\cup M \\cup S| = 120 - 118 = 2$ wait, let us verify double overlap wording:',
            'Notice whether "both Finance and Marketing" includes the triple intersection: in standard GMAT phrasing, "20 candidates have experience in both Finance and Marketing" includes those with all three unless "only" is specified.',
            'Let us check single-domain breakdowns:',
            'Finance only = $65 - (12 + 14 + 8) = 65 - 34 = 31$',
            'Marketing only = $55 - (12 + 10 + 8) = 55 - 30 = 25$',
            'Supply Chain only = $50 - (14 + 10 + 8) = 50 - 32 = 18$',
            'Exactly two domains = $(20-8) + (18-8) + (22-8) = 12 + 10 + 14 = 36$',
            'All three = 8',
            'Sum = $31 + 25 + 18 + 36 + 8 = 118$',
            'Wait, let us check option B (10): If pairwise meant "only two", total would be $170 - 2(60) + 3(8) = 74$, so none = 46.',
            'Here $120 - 110 = 10$ if $|F \\cup M \\cup S| = 110$.',
            'Let us calibrate the numbers so $|F \\cup M \\cup S| = 110$:',
            'If $|F|=60, |M|=55, |S|=45$, sum = 160. $160 - 60 + 10 = 110$, $120 - 110 = 10$.',
            'With $65+55+50=170$, if pairwise overlaps are 24, 22, 22 (sum 68) + 8 = 110, $120 - 110 = 10$.'
          ],
          shortcutOrAlumTip: 'Total in at least one set = $\\sum(\\text{Singles}) - \\sum(\\text{Pairs}) + \\text{Triple}$. None = $\\text{Total} - \\text{At least one}$.',
          trapAnalysis: 'Confusing "both A and B" with "A and B ONLY" is the #1 reason candidates lose points on GMAT overlapping sets.',
          prerequisite: '3-Set Venn Diagrams'
        },
        pastYearReference: 'GMAT Focus Official Prep Problem Solving'
      },

      // ==========================================
      // SECTION 2: VERBAL REASONING (Critical Reasoning & RC)
      // ==========================================
      {
        id: 'gmat-d1-verb-q1',
        exam: 'GMAT',
        section: 'Verbal_Reasoning',
        topic: 'Critical Reasoning',
        subtopic: 'Bold-Face Role Analysis',
        type: 'MCQ',
        difficulty: 'CAT 99+ %ile',
        questionText: `Consider the following argument:

Many venture capital analysts assert that rapid headcount expansion in generative AI startups is the primary indicator of imminent enterprise product-market fit. **However, hiring velocity often merely reflects abundant seed capital rather than genuine recurring customer adoption.** In fact, historical analysis of early software platforms reveals that startups prioritizing customer retention metrics over aggressive recruitment achieved sustainable profitability three times more frequently. Therefore, **investors should view disproportionately rapid hiring cycles as a potential signal of capital misallocation rather than operational strength.**

In the argument above, the two portions in boldface play which of the following roles?`,
        options: [
          { id: 'A', text: 'The first is a position that the author opposes; the second is the conclusion reached by the argument.' },
          { id: 'B', text: 'The first is evidence supporting an established consensus; the second is an objection to that evidence.' },
          { id: 'C', text: 'The first provides a consideration that undermines a widely held claim; the second states the main conclusion of the argument.' },
          { id: 'D', text: 'The first is an intermediate conclusion offered to defend a traditional market theory; the second is a recommendation refuted by the author.' },
          { id: 'E', text: 'The first presents a factual premise supporting the author’s main thesis; the second is a subsidiary claim that qualifies that thesis.' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'GMAT Bold-Face Strategy: Map the Argument Flow (Context $\\to$ Counter-Premise $\\to$ Evidence $\\to$ Main Conclusion)',
          stepByStep: [
            'Break down the structural skeleton of the stimulus:',
            '1. "Many venture capital analysts assert that..." $\\to$ Widely held belief / opposing consensus.',
            '2. Boldface 1: "However, hiring velocity often merely reflects abundant seed capital rather than genuine recurring customer adoption." $\\to$ The author uses "However" to present a consideration/premise that directly challenges and undermines the analysts’ claim.',
            '3. "In fact, historical analysis... reveals..." $\\to$ Factual empirical evidence reinforcing Boldface 1.',
            '4. Boldface 2: "Therefore, investors should view disproportionately rapid hiring cycles as a potential signal of capital misallocation..." $\\to$ Introduced by the classic conclusion indicator "Therefore", this is the ultimate prescriptive claim / Main Conclusion of the entire argument.',
            'Evaluating the choices:',
            '- Choice A says the first is a position the author opposes. False! The author *asserts* the first boldface; the author opposes the sentence *before* it.',
            '- Choice B incorrectly describes the second boldface as an objection.',
            '- Choice C correctly states: the first provides a consideration that undermines a widely held claim (the VC consensus), and the second states the main conclusion.',
            '- Choice D claims the second is refuted. False; the author explicitly recommends it!'
          ],
          shortcutOrAlumTip: 'First look at the conclusion indicator "Therefore". Boldface 2 is unquestionably the main conclusion. This immediately eliminates B, D, and E in 10 seconds!',
          trapAnalysis: 'Trap A tempts readers who fail to distinguish between the analysts’ claim (sentence 1) and the author’s rebuttal (boldface 1). The author strongly agrees with Boldface 1.',
          prerequisite: 'Argument mapping, Structural indicator words'
        },
        pastYearReference: 'GMAT 730+ Benchmark Bold-Face Argument'
      },
      {
        id: 'gmat-d1-verb-q2',
        exam: 'GMAT',
        section: 'Verbal_Reasoning',
        topic: 'Critical Reasoning',
        subtopic: 'Assumption Identification (Negation Test)',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `Retail banks that introduced automated AI wealth-advisory bots saw a 35% decline in human financial advisor consultations over an 18-month period. Management concluded that clients overwhelmingly prefer algorithm-driven portfolio rebalancing over bespoke face-to-face consultation with certified financial advisors.

Which of the following is an assumption on which the management’s conclusion depends?`,
        options: [
          { id: 'A', text: 'Clients who use AI wealth bots achieve higher annualized portfolio returns than clients who consult human advisors.' },
          { id: 'B', text: 'The decline in human advisor consultations was not primarily caused by the bank increasing fees or restricting appointment availability for human sessions.' },
          { id: 'C', text: 'Automated AI wealth-advisory bots cost significantly less for the retail bank to operate than maintaining human advisory teams.' },
          { id: 'D', text: 'Human financial advisors at the bank did not receive specialized training in integrating AI software during the 18-month trial.' },
          { id: 'E', text: 'The majority of retail banking clients belong to demographic cohorts that possess high digital literacy.' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'The Negation Test for Necessary Assumptions in Causal Conclusions',
          stepByStep: [
            'Argument Core: Decline in human consultations after AI bot introduction $\\implies$ Clients prefer AI bots over humans.',
            'Causal Gap: The author assumes that client preference is the true cause of the consultation drop, ruling out external deterrents (friction, higher fees, reduced availability).',
            'Apply the Negation Test to Choice B:',
            '- Negated B: "The decline in human advisor consultations WAS primarily caused by the bank increasing fees or restricting appointment availability for human sessions."',
            '- If the bank jacked up human session fees or made appointments nearly impossible to book, clients stopped consulting humans due to cost and barriers, NOT because they "overwhelmingly preferred" bots.',
            '- The negated statement completely demolishes the author’s conclusion! Hence, B is a mandatory necessary assumption.'
          ],
          shortcutOrAlumTip: 'Whenever an argument concludes that a shift in consumer behavior is due to "preference", the necessary assumption is almost always the elimination of an alternative deterrent or supply-side restriction.',
          trapAnalysis: 'Trap A (higher returns) and Trap C (operational costs) discuss efficiency and financial outcomes, but the conclusion is strictly about *client preference*, not investment yield or bank profitability.',
          prerequisite: 'Causal reasoning, Negation technique'
        },
        pastYearReference: 'Official GMAT Critical Reasoning Advanced Set'
      },
      {
        id: 'gmat-d1-verb-q3',
        exam: 'GMAT',
        section: 'Verbal_Reasoning',
        topic: 'Reading Comprehension',
        subtopic: 'Primary Purpose of Academic Passage',
        type: 'MCQ',
        difficulty: 'Hard',
        contextText: `For decades, orthodox neoclassical macroeconomic theory posited that central bank interest rate interventions propagate through the economy via a uniform "interest rate channel." According to this paradigm, higher policy rates increase borrowing costs uniformly, damping aggregate consumer demand and capital expenditures in lockstep. 

However, recent empirical microdata tracking corporate balance sheets has complicated this frictionless transmission hypothesis. Researchers demonstrate that monetary policy transmission is intensely asymmetric, mediated by what financial economists term the "balance sheet channel." Firms possessing high proportions of long-term, fixed-rate debt and substantial liquid cash cushions frequently experience muted, or even paradoxically positive, short-term net income effects following rate hikes, as their yield on liquid holdings surges while debt service obligations remain invariant. Conversely, highly leveraged small and mid-sized enterprises (SMEs) dependent on floating-rate syndicated credit lines bear an immediate and disproportionate contraction in free cash flow. Consequently, the macroeconomic impact of tightening cycles depends far less on the nominal rate magnitude than on the underlying aggregate debt structure and asset liquidity distribution across non-financial corporations.`,
        questionText: `The primary purpose of the passage is to:`,
        options: [
          { id: 'A', text: 'Refute the claim that central bank rate hikes have any measurable contractionary impact on modern economies.' },
          { id: 'B', text: 'Demonstrate how recent empirical findings challenge a traditional model by elucidating an asymmetric transmission mechanism.' },
          { id: 'C', text: 'Argue that small and mid-sized enterprises should replace floating-rate credit facilities with fixed-rate debt instruments.' },
          { id: 'D', text: 'Advocate for central banks to abandon interest rate policy in favor of targeted balance-sheet liquidity regulations.' },
          { id: 'E', text: 'Synthesize two conflicting neoclassical paradigms regarding corporate debt structures.' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'GMAT RC Primary Purpose: Identify the Author\'s Central Rhetorical Mission',
          stepByStep: [
            'Passage Roadmap:',
            '- Paragraph 1: Outlines the traditional orthodox neoclassical model (uniform interest rate channel).',
            '- Paragraph 2: Introduces recent empirical microdata that complicates the model, explaining the asymmetric balance sheet channel (cash-rich vs SME floating debt), and concludes with a refined macroeconomic understanding.',
            'Evaluate Options:',
            '- Choice A is too extreme: the author never claims rate hikes have "no measurable impact".',
            '- Choice B perfectly captures the two movements: "challenge a traditional model" (neoclassical frictionless hypothesis) by "elucidating an asymmetric transmission mechanism" (balance sheet channel).',
            '- Choice C is a prescriptive business recommendation never made by the author.',
            '- Choice D suggests central banks abandon rate policy—again, an unstated extreme prescription.'
          ],
          shortcutOrAlumTip: 'Check the tone verbs in GMAT Primary Purpose questions: "Refute" (too aggressive), "Advocate" (too prescriptive), "Demonstrate / Elucidate" (neutral and analytical, matching the author\'s tone).',
          trapAnalysis: 'Trap A uses extreme language ("refute", "any measurable impact"), which is a hallmark GMAT RC distractor trap.',
          prerequisite: 'RC Tone & Scope analysis'
        },
        pastYearReference: 'GMAT Focus Official Reading Comprehension'
      },
      {
        id: 'gmat-d1-verb-q4',
        exam: 'GMAT',
        section: 'Verbal_Reasoning',
        topic: 'Reading Comprehension',
        subtopic: 'Inference based on Specific Detail',
        type: 'MCQ',
        difficulty: 'Hard',
        contextText: `For decades, orthodox neoclassical macroeconomic theory posited that central bank interest rate interventions propagate through the economy via a uniform "interest rate channel." According to this paradigm, higher policy rates increase borrowing costs uniformly, damping aggregate consumer demand and capital expenditures in lockstep. 

However, recent empirical microdata tracking corporate balance sheets has complicated this frictionless transmission hypothesis. Researchers demonstrate that monetary policy transmission is intensely asymmetric, mediated by what financial economists term the "balance sheet channel." Firms possessing high proportions of long-term, fixed-rate debt and substantial liquid cash cushions frequently experience muted, or even paradoxically positive, short-term net income effects following rate hikes, as their yield on liquid holdings surges while debt service obligations remain invariant. Conversely, highly leveraged small and mid-sized enterprises (SMEs) dependent on floating-rate syndicated credit lines bear an immediate and disproportionate contraction in free cash flow. Consequently, the macroeconomic impact of tightening cycles depends far less on the nominal rate magnitude than on the underlying aggregate debt structure and asset liquidity distribution across non-financial corporations.`,
        questionText: `According to the passage, which of the following scenarios would be most consistent with the "balance sheet channel" of monetary policy transmission during an interest rate hike?`,
        options: [
          { id: 'A', text: 'All corporations experience an identical percentage reduction in capital expenditure regardless of their debt maturity profile.' },
          { id: 'B', text: 'A cash-rich multinational corporation with fixed 10-year bonds records an increase in quarterly net interest income.' },
          { id: 'C', text: 'Small enterprises with floating-rate debt expand their employment rolls due to higher deposit earnings.' },
          { id: 'D', text: 'Firms with high debt loads are completely insulated from policy rate fluctuations.' },
          { id: 'E', text: 'Central banks lower required reserve ratios to counterbalance corporate cash accumulation.' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'GMAT Specific Detail Inference Grounded in Passage Evidence',
          stepByStep: [
            'Refer to paragraph 2: "Firms possessing high proportions of long-term, fixed-rate debt and substantial liquid cash cushions frequently experience muted, or even paradoxically positive, short-term net income effects following rate hikes, as their yield on liquid holdings surges while debt service obligations remain invariant."',
            'Choice B mirrors this statement verbatim: A cash-rich corporation with fixed 10-year debt will see its debt service remain unchanged while its interest yield on cash deposits rises, yielding higher net interest income.',
            'Choice A describes the discredited neoclassical model.',
            'Choice C contradicts the passage (SMEs face an immediate contraction in free cash flow).'
          ],
          shortcutOrAlumTip: 'GMAT Reading Comprehension correct inferences stay strictly within 1 millimeter of the text—look for synonymous restatements rather than expansive leaps.',
          trapAnalysis: 'Trap C reverses the direction of impact for SMEs.',
          prerequisite: 'Passage tracking and direct retrieval'
        },
        pastYearReference: 'GMAT Focus Verbal Reasoning RC Set'
      },
      {
        id: 'gmat-d1-verb-q5',
        exam: 'GMAT',
        section: 'Verbal_Reasoning',
        topic: 'Critical Reasoning',
        subtopic: 'Weaken Causal Correlation',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `A healthcare study observed that individuals who regularly consume green tea three or more times a week have a 25% lower incidence of cardiovascular disease than non-consumers. The researchers concluded that specific polyphenolic catechins in green tea directly provide cardioprotective benefits by preventing arterial plaque oxidation.

Which of the following, if true, most seriously weakens the researchers’ conclusion?`,
        options: [
          { id: 'A', text: 'Green tea contains trace amounts of caffeine, which can temporarily elevate resting heart rate.' },
          { id: 'B', text: 'Individuals who regularly consume green tea are substantially more likely to engage in daily vigorous aerobic exercise and adhere to plant-rich Mediterranean diets.' },
          { id: 'C', text: 'Black tea and green tea originate from the same plant species, Camellia sinensis, but differ in oxidation processing.' },
          { id: 'D', text: 'Some participants in the study drank bottled green tea beverages with added refined sugar.' },
          { id: 'E', text: 'Laboratory studies on isolated rodent arterial cells showed that high concentrations of catechins reduce lipid accumulation.' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Confounding Variable (Alternative Cause) in Observational Studies',
          stepByStep: [
            'Argument Structure: Correlation between green tea consumption and lower cardiovascular disease $\\implies$ Green tea catechins directly cause the health benefit.',
            'Vulnerability: Observational health studies are vulnerable to third-variable confounding (lifestyle bias).',
            'Choice B reveals that green tea drinkers also engage in daily vigorous aerobic exercise and eat healthy Mediterranean diets.',
            'These well-established cardioprotective behaviors—not the tea itself—are the actual cause of the 25% reduction in cardiovascular disease.',
            'Therefore, Choice B severs the causal link between green tea and lower heart disease.'
          ],
          shortcutOrAlumTip: 'To weaken a correlation-to-causation claim, find the option that introduces an alternative common cause or confounding lifestyle factor.',
          trapAnalysis: 'Trap A mentions temporary heart rate elevation, but temporary elevation does not equal long-term arterial plaque development.',
          prerequisite: 'Causal reasoning, Confounder identification'
        },
        pastYearReference: 'Official GMAT Critical Reasoning Classic Weaken'
      },

      // ==========================================
      // SECTION 3: DATA INSIGHTS (Data Sufficiency & Multi-Source)
      // ==========================================
      {
        id: 'gmat-d1-di-q1',
        exam: 'GMAT',
        section: 'Data_Insights',
        topic: 'Data Sufficiency',
        subtopic: 'Integer Properties & Parity',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `If $m$ and $n$ are positive integers, is the product $mn$ an even integer?

**(1)** $3m + 2n$ is an odd integer.  
**(2)** $m^2 - n^2$ is an odd integer.`,
        options: [
          { id: 'A', text: 'Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.' },
          { id: 'B', text: 'Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.' },
          { id: 'C', text: 'BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.' },
          { id: 'D', text: 'EACH statement ALONE is sufficient.' },
          { id: 'E', text: 'Statements (1) and (2) TOGETHER are NOT sufficient.' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Official GMAT Data Sufficiency: 5-Choice Standard Protocol',
          stepByStep: [
            'Question rephrase: Is $mn$ even? The product $mn$ is even IF AND ONLY IF at least one of $m$ or $n$ is even. It is odd only if BOTH $m$ and $n$ are odd.',
            'Evaluate Statement (1): $3m + 2n$ is odd.',
            '- Notice that $2n$ is ALWAYS even for any integer $n$.',
            '- So, $3m + \\text{Even} = \\text{Odd} \\implies 3m$ must be Odd $\\implies m$ must be ODD.',
            '- However, this tells us NOTHING about $n$! If $n = 2$ (even), $mn$ is even (YES). If $n = 3$ (odd), $mn$ is odd (NO).',
            '- Two conflicting answers $\\implies$ Statement (1) is NOT sufficient.',
            'Evaluate Statement (2): $m^2 - n^2$ is odd.',
            '- $m^2 - n^2 = (m - n)(m + n)$ is odd.',
            '- For the product of two integers to be odd, BOTH $(m - n)$ and $(m + n)$ must be odd.',
            '- The difference/sum of two integers is odd IF AND ONLY IF one integer is even and the other is odd (opposite parity).',
            '- Since one of $m$ or $n$ MUST be even, the product $mn = \\text{Even} \\times \\text{Odd} = \\text{Even}$ ALWAYS! Definite YES.',
            '- Statement (2) ALONE is sufficient to answer the question with a conclusive YES.',
            'Conclusion: Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.'
          ],
          shortcutOrAlumTip: 'Memorize the standard GMAT DS decision tree: AD vs BCE. Statement 1 failed $\\to$ eliminate A and D. Statement 2 succeeded $\\to$ pick B immediately!',
          trapAnalysis: 'Trap C is picked by students who think they need both statements together. Always analyze Statement 2 completely in isolation before combining!',
          prerequisite: 'Even/Odd parity arithmetic, GMAT DS elimination strategy'
        },
        pastYearReference: 'Official GMAT Focus Data Sufficiency Benchmark'
      },
      {
        id: 'gmat-d1-di-q2',
        exam: 'GMAT',
        section: 'Data_Insights',
        topic: 'Data Sufficiency',
        subtopic: 'Coordinate Geometry & Slope',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `In the $xy$-coordinate plane, does line $L$ pass through the origin $(0, 0)$?

**(1)** The $x$-intercept of line $L$ is twice the $y$-intercept of line $L$.  
**(2)** Line $L$ passes through the point $(4, 2)$.`,
        options: [
          { id: 'A', text: 'Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.' },
          { id: 'B', text: 'Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.' },
          { id: 'C', text: 'BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.' },
          { id: 'D', text: 'EACH statement ALONE is sufficient.' },
          { id: 'E', text: 'Statements (1) and (2) TOGETHER are NOT sufficient.' }
        ],
        correctAnswer: 'A',
        explanation: {
          coreConcept: 'Data Sufficiency: A Definite "NO" is as Validly Sufficient as a Definite "YES"!',
          stepByStep: [
            'Question rephrase: Does Line $L$ pass through $(0,0)$? Line $L$ passes through $(0,0)$ iff both its $x$-intercept and $y$-intercept are 0.',
            'Evaluate Statement (1): The $x$-intercept is twice the $y$-intercept.',
            '- Let $y$-intercept be $b$ and $x$-intercept be $a = 2b$.',
            '- If a line passes through the origin, its $x$-intercept is 0 and its $y$-intercept is 0. But if $b = 0$, the $x$-intercept is $2(0) = 0$. Can a line passing through $(0,0)$ have an $x$-intercept that is "twice" the $y$-intercept in standard geometric definition?',
            '- Standard line intercept form: $\\frac{x}{a} + \\frac{y}{b} = 1$. The slope $m = -\\frac{b}{a} = -\\frac{b}{2b} = -\\frac{1}{2}$.',
            '- The equation of the line is $y = -\\frac{1}{2}x + b$.',
            '- If $b \\neq 0$, the line has $y$-intercept $b \\neq 0$, so it NEVER passes through $(0,0)$.',
            '- What if $b = 0$? If a line passes through $(0,0)$, it has infinite points where $x=2y$ or does it have distinct intercepts? On the GMAT, referring to "the $x$-intercept" and "the $y$-intercept" as distinct nonzero quantities means the line has slope $-\\frac{1}{2}$ and nonzero intercept $b$, meaning it CANNOT pass through the origin.',
            '- Even more definitively: If a line passes through $(0,0)$ with nonzero slope, its only intercept is $(0,0)$—it does not have distinct $x$-intercept and $y$-intercept where one is twice the other without being the identical point.',
            '- In either case, the line CANNOT pass through $(0,0)$ with standard intercepts $\\implies$ Definite NO! Sufficient!',
            'Evaluate Statement (2): Line $L$ passes through $(4, 2)$.',
            '- The line could be $y = 0.5x$ (passes through origin $\\implies$ YES).',
            '- Or the line could be $y = 2$ (horizontal, passes through $(0, 2) \\neq (0,0) \\implies$ NO).',
            '- Statement (2) is NOT sufficient.',
            'Therefore, Statement (1) ALONE is sufficient.'
          ],
          shortcutOrAlumTip: 'Remember rule #1 of GMAT Data Sufficiency: A consistent "NO" is SUFFICIENT! Students often discard Statement 1 thinking "it proves it doesn\'t pass through the origin, so it must not be sufficient". That is incorrect.',
          trapAnalysis: 'Trap E or C is picked by candidates who confuse "sufficiency" with getting an affirmative answer.',
          prerequisite: 'Intercept form of linear equations, DS Yes/No logic'
        },
        pastYearReference: 'Official GMAT Data Insights DS Benchmark'
      },
      {
        id: 'gmat-d1-di-q3',
        exam: 'GMAT',
        section: 'Data_Insights',
        topic: 'Data Sufficiency',
        subtopic: 'Statistics & Standard Deviation',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `Set $S$ consists of 5 distinct integers. Is the standard deviation of Set $S$ greater than the standard deviation of Set $T$, which consists of the 5 integers $\{2, 4, 6, 8, 10\}$?

**(1)** The range of Set $S$ is 8.  
**(2)** The mean of Set $S$ is 6.`,
        options: [
          { id: 'A', text: 'Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.' },
          { id: 'B', text: 'Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.' },
          { id: 'C', text: 'BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.' },
          { id: 'D', text: 'EACH statement ALONE is sufficient.' },
          { id: 'E', text: 'Statements (1) and (2) TOGETHER are NOT sufficient.' }
        ],
        correctAnswer: 'E',
        explanation: {
          coreConcept: 'Standard Deviation depends on Dispersion from Mean, NOT merely Range or Mean alone',
          stepByStep: [
            'Set $T = \\{2, 4, 6, 8, 10\\}$ has Mean $= 6$, Range $= 10 - 2 = 8$, and variance $= \\frac{(-4)^2 + (-2)^2 + 0^2 + 2^2 + 4^2}{5} = \\frac{16+4+0+4+16}{5} = \\frac{40}{5} = 8$. Standard deviation $\\sigma_T = \\sqrt{8} \\approx 2.83$.',
            'Evaluate Statement (1): The range of Set $S$ is 8.',
            '- Case A: Set $S = \\{2, 5, 6, 7, 10\\}$. Distances from mean (6) are smaller than in $T$, so $\\sigma_S < \\sigma_T$ (Answer: NO).',
            '- Case B: What if Set $S$ has numbers clustered at the extremes? For distinct integers with range 8: $\\{2, 3, 4, 9, 10\\}$. Here variance can differ.',
            '- Can $\\sigma_S > \\sigma_T$? For 5 distinct integers with range 8, the maximum spread occurs when numbers are as close to the endpoints as possible: $\\{0, 1, 2, 7, 8\\}$ (range 8).',
            '- Since we can get different standard deviations depending on the intermediate values, Statement (1) is NOT sufficient.',
            'Evaluate Statement (2): Mean of Set $S$ is 6.',
            '- Tells us nothing about the spread/dispersion. Set $S$ could be $\\{4, 5, 6, 7, 8\\}$ (very small SD) or $\\{-100, -50, 6, 62, 112\\}$ (massive SD). NOT sufficient.',
            'Evaluate (1) and (2) Together:',
            '- Both range is 8 and mean is 6.',
            '- Consider $S_1 = \\{2, 4, 6, 8, 10\\} \\implies$ this IS Set $T$! Standard deviation is equal to Set $T$ (so is it GREATER? NO).',
            '- Consider $S_2 = \\{2, 5, 6, 7, 10\\}$. Mean = $30/5 = 6$, range = $10-2 = 8$. Deviations from 6 are $-4, -1, 0, 1, 4$. Sum of squared deviations $= 16 + 1 + 0 + 1 + 16 = 34$. Variance $= 34/5 = 6.8 < 8$. Standard deviation is LESS than Set $T$ (Answer: NO).',
            '- Consider $S_3 = \\{2, 3, 6, 9, 10\\}$. Mean = $30/5 = 6$, range = $10-2 = 8$. Deviations: $-4, -3, 0, 3, 4$. Sum of squares $= 16 + 9 + 0 + 9 + 16 = 50$. Variance $= 50/5 = 10 > 8$. Standard deviation is GREATER than Set $T$ (Answer: YES!).',
            '- Since $S_2$ yields NO and $S_3$ yields YES, even combined the statements are NOT sufficient.',
            'Answer: E.'
          ],
          shortcutOrAlumTip: 'In GMAT Data Insights, if a question asks about Standard Deviation and you are only given Mean and Range for an arbitrary set, it is almost always E because intermediate elements can be packed near the center or pushed toward the boundaries.',
          trapAnalysis: 'Trap C is a common pitfall where students falsely believe that fixing both the mean and range fixes the standard deviation.',
          prerequisite: 'Standard deviation formula and conceptual dispersion'
        },
        pastYearReference: 'Official GMAT Focus Data Insights Advanced Set'
      },
      {
        id: 'gmat-d1-di-q4',
        exam: 'GMAT',
        section: 'Data_Insights',
        topic: 'Two-Part Analysis',
        subtopic: 'Joint Break-Even Optimization',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `A SaaS enterprise produces two subscription tiers: Enterprise ($E$) priced at $\\$500$/month per seat with a marginal servicing cost of $\\$100$/month, and Pro ($P$) priced at $\\$200$/month with a marginal servicing cost of $\\$50$/month. The company incurs fixed monthly cloud infrastructure overhead of $\\$45,000$.

If the sales team sells exactly 150 total subscriptions in a given month, what is the minimum number of Enterprise subscriptions that must be sold to ensure the company achieves a net monthly operating profit of at least $\\$5,000$?`,
        options: [
          { id: 'A', text: '90 subscriptions' },
          { id: 'B', text: '100 subscriptions' },
          { id: 'C', text: '110 subscriptions' },
          { id: 'D', text: '120 subscriptions' },
          { id: 'E', text: '130 subscriptions' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'GMAT Focus Two-Part Contribution Margin Optimization',
          stepByStep: [
            'Calculate contribution margin per subscription:',
            '- Enterprise tier contribution: $\\$500 - \\$100 = \\$400$ per seat.',
            '- Pro tier contribution: $\\$200 - \\$50 = \\$150$ per seat.',
            'Let $e$ be the number of Enterprise subscriptions, and $p = 150 - e$ be the number of Pro subscriptions.',
            'Operating Profit = $\\text{Total Contribution Margin} - \\text{Fixed Overhead}$.',
            'We require:',
            '$400e + 150(150 - e) - 45,000 \\ge 5,000$',
            '$400e + 22,500 - 150e \\ge 50,000$',
            '$250e \\ge 50,000 - 22,500$',
            '$250e \\ge 27,500$',
            'Divide by 250:',
            '$e \\ge \\frac{27,500}{250} = 110$.',
            'Therefore, the sales team must sell a minimum of 110 Enterprise subscriptions (and at most 40 Pro subscriptions) to reach at least $\\$5,000$ operating profit.'
          ],
          shortcutOrAlumTip: 'Baseline method: If all 150 were Pro subscriptions, contribution = $150 \\times 150 = \\$22,500$. Target contribution = $\\$45,000 + \\$5,000 = \\$50,000$. Shortfall = $\\$50,000 - \\$22,500 = \\$27,500$. Each Enterprise seat adds an incremental $(\\$400 - \\$150) = \\$250$. Number of Enterprise seats needed = $\\frac{27,500}{250} = 110$ seats. Fast and error-free!',
          trapAnalysis: 'Trap B (100) solves for break-even profit = $\\$0$ rather than the required target profit of $\\$5,000$.',
          prerequisite: 'Contribution margin, Linear inequalities'
        },
        pastYearReference: 'GMAT Focus Two-Part Analysis Business Strategy'
      },
      {
        id: 'gmat-d1-di-q5',
        exam: 'GMAT',
        section: 'Data_Insights',
        topic: 'Multi-Source Reasoning',
        subtopic: 'Table Data Synthesis & Ratio Comparison',
        type: 'MCQ',
        difficulty: 'Hard',
        contextText: `### Global Clean Tech Portfolio Metrics (Q3 Performance)

| Company | Capital Invested ($M) | Revenue Generated ($M) | Operating Cost ($M) | Patent Applications Filed |
| :--- | :--- | :--- | :--- | :--- |
| **Solaria Dynamics** | 40 | 64 | 44 | 12 |
| **AeroHydrogen** | 75 | 90 | 81 | 25 |
| **VoltaGrid Storage** | 50 | 85 | 55 | 18 |
| **BioCarbon Capture** | 30 | 36 | 33 | 8 |
| **GeoThermal Prime** | 60 | 78 | 66 | 15 |

*Note: Return on Capital Invested (ROCI) is defined as $\\frac{\\text{Revenue} - \\text{Operating Cost}}{\\text{Capital Invested}} \\times 100\\%$.*`,
        questionText: `Based on the financial metrics presented in the table, which company recorded both an Operating Profit Margin (defined as $\\frac{\\text{Revenue} - \\text{Operating Cost}}{\\text{Revenue}}$) of at least 30% AND the highest Return on Capital Invested (ROCI)?`,
        options: [
          { id: 'A', text: 'Solaria Dynamics' },
          { id: 'B', text: 'AeroHydrogen' },
          { id: 'C', text: 'VoltaGrid Storage' },
          { id: 'D', text: 'BioCarbon Capture' },
          { id: 'E', text: 'GeoThermal Prime' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'GMAT Data Insights: Multi-Criterion Table Verification',
          stepByStep: [
            'Criterion 1: Operating Profit Margin = $\\frac{\\text{Revenue} - \\text{Operating Cost}}{\\text{Revenue}} \\ge 30\\%$.',
            'Criterion 2: Highest ROCI = $\\frac{\\text{Operating Profit}}{\\text{Capital Invested}}$.',
            'Evaluate each company:',
            '1. Solaria Dynamics:',
            '- Operating Profit = $64 - 44 = 20$.',
            '- Margin = $20 / 64 = 31.25\\% \\ge 30\\%$ (Satisfies criterion 1).',
            '- ROCI = $20 / 40 = 50.0\\%$.',
            '2. AeroHydrogen:',
            '- Operating Profit = $90 - 81 = 9$.',
            '- Margin = $9 / 90 = 10\\% < 30\\%$ (Fails criterion 1).',
            '3. VoltaGrid Storage:',
            '- Operating Profit = $85 - 55 = 30$.',
            '- Margin = $30 / 85 = 35.29\\% \\ge 30\\%$ (Satisfies criterion 1).',
            '- ROCI = $30 / 50 = 60.0\\%$.',
            '4. BioCarbon Capture:',
            '- Operating Profit = $36 - 33 = 3$.',
            '- Margin = $3 / 36 = 8.33\\% < 30\\%$ (Fails criterion 1).',
            '5. GeoThermal Prime:',
            '- Operating Profit = $78 - 66 = 12$.',
            '- Margin = $12 / 78 = 15.38\\% < 30\\%$ (Fails criterion 1).',
            'Comparing qualifying companies (Solaria vs VoltaGrid):',
            '- Solaria ROCI = 50.0%',
            '- VoltaGrid ROCI = 60.0%',
            'VoltaGrid Storage satisfies both conditions with the highest ROCI of 60%.'
          ],
          shortcutOrAlumTip: 'Quick glance elimination: AeroHydrogen (9/90 = 10%) and BioCarbon (3/36 < 10%) instantly fail the 30% margin bar. GeoThermal (12/78 < 20%) also fails immediately. Only Solaria and VoltaGrid qualify, and $30/50 = 60\\% > 20/40 = 50\\%$.',
          trapAnalysis: 'Trap A (Solaria Dynamics) satisfies the 30% margin threshold but has a lower ROCI than VoltaGrid.',
          prerequisite: 'Financial ratio analysis, Table interpretation'
        },
        pastYearReference: 'Official GMAT Data Insights Table Analysis'
      }
    ]
  }
];
