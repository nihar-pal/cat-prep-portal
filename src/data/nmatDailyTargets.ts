import { DailyTarget } from '@/types/exam';

export const NMAT_DAILY_TARGETS: DailyTarget[] = [
  {
    id: 'nmat-target-day-1',
    dayNumber: 1,
    dateStr: 'Day 1: NMIMS Adaptive Speed & Accuracy Benchmark',
    title: 'NMAT by GMAC Benchmark Daily Sprint #1',
    description: 'Authentic GMAC format: Language Skills (Prepositions, Analogies, Sentence Error), Quantitative Skills (Permutations, Probability, CI/SI & Data Sufficiency), and Logical Reasoning (Machine Input-Output, Syllogisms & Blood Relations).',
    estimatedMinutes: 35,
    exam: 'NMAT',
    sectionBreakdown: [
      {
        section: 'Language_Skills',
        label: 'Language Skills',
        count: 4,
        description: 'Contextual vocabulary, verbal analogies, phrasal prepositions, and grammatical error identification.'
      },
      {
        section: 'Quantitative_Skills',
        label: 'Quantitative Skills',
        count: 5,
        description: 'High-yield Modern Math (P&C, Probability), Commercial Arithmetic, and Data Sufficiency (No calculator).'
      },
      {
        section: 'Logical_Reasoning',
        label: 'Logical Reasoning',
        count: 4,
        description: 'Sequential Machine Input-Output deduction, Categorical Syllogisms, Coded Blood Relations, and Critical Assumptions.'
      }
    ],
    sections: {
      varcCount: 4,
      dilrCount: 4,
      qaCount: 5
    },
    questions: [
      // --- SECTION 1: LANGUAGE SKILLS ---
      {
        id: 'nmat-d1-lang-q1',
        exam: 'NMAT',
        section: 'Language_Skills',
        topic: 'Verbal Analogies',
        subtopic: 'Semantic Relationship Mapping',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `Choose the pair of words that exhibits the SAME relationship as the given capitalized pair:

**OBFUSCATE : CLARITY ::**`,
        options: [
          { id: 'A', text: 'ENERVATE : VIGOR' },
          { id: 'B', text: 'AMELIORATE : CONDITION' },
          { id: 'C', text: 'DISSEMINATE : INFORMATION' },
          { id: 'D', text: 'EXACERBATE : WRATH' }
        ],
        correctAnswer: 'A',
        explanation: {
          coreConcept: 'NMAT Analogies: Action of Deprivation / Opposite Effect',
          stepByStep: [
            'Define the bridge sentence: To OBFUSCATE something is to diminish or destroy its CLARITY (Verb : Quality that it removes).',
            'Option A: To ENERVATE someone is to drain or destroy their VIGOR (energy/vitality). This matches the exact operational relationship!',
            'Option B: To ameliorate means to improve a condition (not destroy it).',
            'Option C: To disseminate means to spread information (not remove it).',
            'Option D: To exacerbate means to worsen wrath/anger (amplifies rather than removes).'
          ],
          shortcutOrAlumTip: 'Always form a clear, directional bridging sentence: "X removes or deprives of Y". Test that sentence across all choices.',
          trapAnalysis: 'Option D is tempting because both words are negative, but exacerbating increases wrath rather than removing it.',
          prerequisite: 'GRE/NMAT Vocabulary & Analogy Bridge Construction'
        },
        pastYearReference: 'NMAT 2023 Language Skills (Direct Analogy)'
      },
      {
        id: 'nmat-d1-lang-q2',
        exam: 'NMAT',
        section: 'Language_Skills',
        topic: 'Grammar & Prepositions',
        subtopic: 'Appropriate Preposition Collocations',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `Select the option that correctly completes the sentence with appropriate prepositions:

The committee refused to accede __________ the demands of the union, asserting that capitulating to pressure would be contrary __________ the established fiduciary policy of the board.`,
        options: [
          { id: 'A', text: 'with ... of' },
          { id: 'B', text: 'to ... to' },
          { id: 'C', text: 'at ... for' },
          { id: 'D', text: 'for ... with' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Fixed Prepositional Phrases (Idiomatic Usage)',
          stepByStep: [
            'Rule 1: The verb "accede" takes the fixed preposition "to" (accede to a request/demand = to agree to).',
            'Rule 2: The adjective "contrary" takes the fixed preposition "to" (contrary to policy/law = in opposition to).',
            'Therefore, the correct pair is "to ... to" (Option B).'
          ],
          shortcutOrAlumTip: 'NMAT heavily tests fixed Latin-derived verbs + prepositions: accede to, acquiesce in, comply with, adhere to, contrary to.',
          trapAnalysis: 'People frequently say "accede with" due to colloquial confusion with "agree with", which is ungrammatical.',
          prerequisite: 'Fixed Preposition Rules'
        },
        pastYearReference: 'NMAT 2022 Language Skills (Prepositional Collocations)'
      },
      {
        id: 'nmat-d1-lang-q3',
        exam: 'NMAT',
        section: 'Language_Skills',
        topic: 'Error Identification',
        subtopic: 'Subject-Verb Inversion & Correlative Conjunctions',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `Identify which underlined segment of the sentence contains a grammatical error:

Neither the senior vice president (A) nor any of the regional sales directors (B) **was** aware (C) that the supply chain had collapsed (D).`,
        options: [
          { id: 'A', text: 'Neither the senior vice president' },
          { id: 'B', text: 'nor any of the regional sales directors' },
          { id: 'C', text: 'was aware' },
          { id: 'D', text: 'that the supply chain had collapsed' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'Proximity Rule for Correlative Conjunctions (Neither... Nor)',
          stepByStep: [
            'Rule of Subject-Verb Agreement: When subjects are connected by "Neither... nor" or "Either... or", the verb must agree in person and number with the subject CLOSER to it.',
            'Subject 1: "the senior vice president" (Singular).',
            'Subject 2: "any of the regional sales directors" (Plural).',
            'The verb "was" is adjacent to "directors" (Plural), so the verb must be plural: "were aware", NOT "was aware".',
            'Hence, error lies in segment (C).'
          ],
          shortcutOrAlumTip: 'Proximity Principle: Ignore the first subject completely; make the verb match whatever noun immediately precedes it when linked by "or / nor".',
          trapAnalysis: 'Candidates often think "Neither" always takes a singular verb. While "Neither of them was" is singular, "Neither X nor Y" follows the proximity rule.',
          prerequisite: 'Subject-Verb Concord & Correlative Conjunctions'
        },
        pastYearReference: 'NMAT 2024 Language Skills (Subject-Verb Agreement)'
      },
      {
        id: 'nmat-d1-lang-q4',
        exam: 'NMAT',
        section: 'Language_Skills',
        topic: 'Vocabulary in Context',
        subtopic: 'Synonyms & High-Frequency Words',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `Choose the word that is MOST NEARLY OPPOSITE in meaning to the capitalized word:

Despite the CEO’s **LACONIC** demeanor during the initial press conference, her private memos revealed an extraordinary attention to granular operational nuances.`,
        options: [
          { id: 'A', text: 'Verbose' },
          { id: 'B', text: 'Austere' },
          { id: 'C', text: 'Reticent' },
          { id: 'D', text: 'Pithy' }
        ],
        correctAnswer: 'A',
        explanation: {
          coreConcept: 'NMAT Antonyms: Vocabulary Precision',
          stepByStep: [
            '"Laconic" means using very few words; concise; terse.',
            'We need the OPPOSITE (Antonym).',
            'Option A: "Verbose" means using or expressed in more words than are needed; wordy. This is the direct antonym of laconic!',
            'Option B: "Austere" means severe or strict in manner.',
            'Option C: "Reticent" means not revealing one\'s thoughts readily; quiet (synonymous with laconic).',
            'Option D: "Pithy" means concise and forcefully expressive (synonymous with laconic).'
          ],
          shortcutOrAlumTip: 'Always double-check whether the question asks for SYNONYM or OPPOSITE! NMAT frequently traps students who spot a synonym and click in a rush.',
          trapAnalysis: 'Options C and D are synonyms of laconic and are designed to trap hurried readers.',
          prerequisite: 'Root Words & Concise Style Terms'
        },
        pastYearReference: 'NMAT 2021 Language Skills (Antonyms)'
      },

      // --- SECTION 2: QUANTITATIVE SKILLS ---
      {
        id: 'nmat-d1-quant-q1',
        exam: 'NMAT',
        section: 'Quantitative_Skills',
        topic: 'Permutations & Combinations',
        subtopic: 'Arrangement of Letters with Repeated Elements & Vowel Constraints',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `In how many different ways can the letters of the word **'TRIANGLE'** be arranged such that all the vowels always appear together?`,
        options: [
          { id: 'A', text: '$720$' },
          { id: 'B', text: '$2,160$' },
          { id: 'C', text: '$4,320$' },
          { id: 'D', text: '$5,040$' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'NMAT Modern Math: The String / Tie-Up Method in Permutations',
          stepByStep: [
            'In the word "TRIANGLE", the total number of letters is 8, all distinct:',
            'Vowels present: {I, A, E} = 3 vowels.',
            'Consonants present: {T, R, N, G, L} = 5 consonants.',
            'Since all 3 vowels must appear together, tie them into a single consolidated unit: (I, A, E).',
            'Now we arrange 6 units: the 5 individual consonants + the 1 vowel-block.',
            'Number of ways to arrange these 6 distinct units = $6! = 720$.',
            'Within the vowel block, the 3 vowels {I, A, E} can be permuted among themselves in $3! = 6$ ways.',
            'Total valid arrangements = $6! \\times 3! = 720 \\times 6 = 4,320$.'
          ],
          shortcutOrAlumTip: 'Formula: $(N - k + 1)! \\times k! = (8 - 3 + 1)! \\times 3! = 6! \\times 6 = 720 \\times 6 = 4320$. Memorize factorials up to $7!$ for NMAT speed.',
          trapAnalysis: 'Forgetting to multiply by $3!$ leads to 720 (Option A). Multiplying by $3$ instead of $3!$ leads to 2,160 (Option B).',
          prerequisite: 'String Method & Fundamental Principle of Counting'
        },
        pastYearReference: 'NMAT 2023 Quantitative Skills (P&C Letter Arrangements)'
      },
      {
        id: 'nmat-d1-quant-q2',
        exam: 'NMAT',
        section: 'Quantitative_Skills',
        topic: 'Probability',
        subtopic: 'Independent Events & At Least One Condition',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `Three candidates $A, B,$ and $C$ independently attempt to solve a specific quantitative aptitude problem in NMAT. Their individual probabilities of solving the problem are $\\frac{1}{2}$, $\\frac{1}{3}$, and $\\frac{1}{4}$ respectively. 

What is the probability that the problem is solved?`,
        options: [
          { id: 'A', text: '$\\frac{1}{4}$' },
          { id: 'B', text: '$\\frac{1}{2}$' },
          { id: 'C', text: '$\\frac{2}{3}$' },
          { id: 'D', text: '$\\frac{3}{4}$' }
        ],
        correctAnswer: 'D',
        explanation: {
          coreConcept: 'Complementary Probability: $P(\\text{At least one}) = 1 - P(\\text{None})$',
          stepByStep: [
            'The problem is solved if at least one candidate solves it.',
            'Find the probability that none of them solves it:',
            '$P(A\' ) = 1 - \\frac{1}{2} = \\frac{1}{2}$',
            '$P(B\' ) = 1 - \\frac{1}{3} = \\frac{2}{3}$',
            '$P(C\' ) = 1 - \\frac{1}{4} = \\frac{3}{4}$',
            'Since their attempts are mutually independent:',
            '$$P(\\text{None solves}) = P(A\' ) \\times P(B\' ) \\times P(C\' ) = \\frac{1}{2} \\times \\frac{2}{3} \\times \\frac{3}{4} = \\frac{1}{4}$$',
            'Therefore, $P(\\text{Problem is solved}) = 1 - P(\\text{None solves}) = 1 - \\frac{1}{4} = \\frac{3}{4}$.'
          ],
          shortcutOrAlumTip: 'Whenever you see "probability of at least one", NEVER compute the union directly! Always compute $1 - \\prod(1 - p_i)$. Solved in 10 seconds.',
          trapAnalysis: 'Adding probabilities $\\frac{1}{2} + \\frac{1}{3} + \\frac{1}{4} = \\frac{13}{12} > 1$ (illegal for non-mutually exclusive events).',
          prerequisite: 'Independent Events & Complementary Probability'
        },
        pastYearReference: 'NMAT 2022 Quantitative Skills (Independent Problem Solving)'
      },
      {
        id: 'nmat-d1-quant-q3',
        exam: 'NMAT',
        section: 'Quantitative_Skills',
        topic: 'Arithmetic',
        subtopic: 'Compound Interest vs Simple Interest Difference',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `The difference between the Compound Interest (compounded annually) and the Simple Interest on a certain sum of money for $2\\text{ years}$ at $8\\%\\text{ per annum}$ is ₹$64$. 

Find the principal sum.`,
        options: [
          { id: 'A', text: '₹$8,000$' },
          { id: 'B', text: '₹$10,000$' },
          { id: 'C', text: '₹$12,500$' },
          { id: 'D', text: '₹$15,000$' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Standard 2-Year CI - SI Difference Formula',
          stepByStep: [
            'For a period of 2 years, the difference between CI and SI is given by the formula:',
            '$$\\Delta = P \\cdot \\left(\\frac{R}{100}\\right)^2$$',
            'Given $\\Delta = 64$ and $R = 8$:',
            '$$64 = P \\cdot \\left(\\frac{8}{100}\\right)^2$$',
            '$$64 = P \\cdot \\frac{64}{10,000}$$',
            'Divide both sides by 64:',
            '$$1 = \\frac{P}{10,000} \\implies P = 10,000$$',
            'Thus, the principal sum is ₹10,000.'
          ],
          shortcutOrAlumTip: 'NMAT Speed Shortcut: 2-year difference formula $P = \\frac{\\Delta \\times 10^4}{R^2}$. Here $P = \\frac{64 \\times 10000}{64} = 10,000$. Pure calculation in 5 seconds!',
          trapAnalysis: 'Calculating CI using $(1.08)^2$ and SI separately takes 3 times longer and increases arithmetic error risk.',
          prerequisite: 'Commercial Arithmetic CI/SI Shortcuts'
        },
        pastYearReference: 'NMAT 2024 Quantitative Skills (CI vs SI Difference)'
      },
      {
        id: 'nmat-d1-quant-q4',
        exam: 'NMAT',
        section: 'Quantitative_Skills',
        topic: 'Data Sufficiency',
        subtopic: 'Arithmetic Progression & Mean',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `This question is followed by two statements, I and II. Choose the correct option.

**Question:** What is the average of five consecutive integers $a, b, c, d, e$ written in ascending order?

**Statement I:** $c = 14$
**Statement II:** $a + e = 28$`,
        options: [
          { id: 'A', text: 'Statement I ALONE is sufficient, but Statement II alone is not sufficient.' },
          { id: 'B', text: 'Statement II ALONE is sufficient, but Statement I alone is not sufficient.' },
          { id: 'C', text: 'EACH Statement ALONE is sufficient to answer the question.' },
          { id: 'D', text: 'BOTH Statements TOGETHER are needed.' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'NMAT Data Sufficiency: Arithmetic Progression Symmetry',
          stepByStep: [
            'For any five consecutive integers, the sequence forms an Arithmetic Progression with common difference $1$.',
            'The mean (average) of any symmetric AP of odd length is always the exact middle term $c$.',
            'Also, the average of an AP is $\\frac{\\text{First term} + \\text{Last term}}{2} = \\frac{a + e}{2}$.',
            'Statement I states $c = 14$. Since the average is $c$, the average is immediately $14$. Statement I is SUFFICIENT.',
            'Statement II states $a + e = 28$. The average is $\\frac{a + e}{2} = \\frac{28}{2} = 14$. Statement II is SUFFICIENT.',
            'Therefore, EACH statement alone is sufficient to answer the question (Option C).'
          ],
          shortcutOrAlumTip: 'Remember the core property of AP: $\\text{Mean} = \\text{Median} = \\frac{T_1 + T_n}{2}$.',
          trapAnalysis: 'Candidates who don\'t realize the median of 5 consecutive terms IS the mean waste time solving for $a, b, d, e$.',
          prerequisite: 'Data Sufficiency & AP Properties'
        },
        pastYearReference: 'NMAT 2023 Quantitative Skills (Data Sufficiency)'
      },
      {
        id: 'nmat-d1-quant-q5',
        exam: 'NMAT',
        section: 'Quantitative_Skills',
        topic: 'Arithmetic',
        subtopic: 'Work & Time with Efficiency Ratios',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `A is $50\\%$ more efficient than B. If B alone can complete a piece of work in $30\\text{ days}$, in how many days can A and B together complete the same work?`,
        options: [
          { id: 'A', text: '$10\\text{ days}$' },
          { id: 'B', text: '$12\\text{ days}$' },
          { id: 'C', text: '$15\\text{ days}$' },
          { id: 'D', text: '$18\\text{ days}$' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Work Efficiency Units Method',
          stepByStep: [
            'Let the daily efficiency of B be $2\\text{ units/day}$.',
            'Since A is $50\\%$ more efficient than B, A\'s daily efficiency is $2 + 50\\% \\text{ of } 2 = 3\\text{ units/day}$.',
            'B takes 30 days to finish the work alone:',
            '$$\\text{Total Work} = \\text{Efficiency of B} \\times 30 = 2 \\times 30 = 60\\text{ units}$$',
            'When A and B work together, their combined efficiency is:',
            '$$E_{A+B} = 3 + 2 = 5\\text{ units/day}$$',
            '$$\\text{Time taken together} = \\frac{\\text{Total Work}}{E_{A+B}} = \\frac{60}{5} = 12\\text{ days}$$'
          ],
          shortcutOrAlumTip: 'Units method eliminates all fractional addition ($\\\\frac{1}{30} + \\\\frac{1}{20}$). Always assume round integer unit rates.',
          trapAnalysis: 'Confusing 50% more efficient with taking 50% less time. If efficiency ratio is $3:2$, time ratio is $2:3$.',
          prerequisite: 'Unitary Method & Work-Rate Relationships'
        },
        pastYearReference: 'NMAT 2021 Quantitative Skills (Work & Time)'
      },

      // --- SECTION 3: LOGICAL REASONING ---
      {
        id: 'nmat-d1-lr-q1',
        exam: 'NMAT',
        section: 'Logical_Reasoning',
        topic: 'Machine Input-Output',
        subtopic: 'Alternating Word-Number Sorting Deduction',
        type: 'MCQ',
        difficulty: 'Hard',
        contextText: `A computer word-and-number processing machine, when given an input line of words and numbers, rearranges them following a specific rule step-by-step until the final arrangement is achieved:

**Input:** tree 45 apple 82 mango 19 banana 64
**Step I:** 82 tree 45 apple mango 19 banana 64
**Step II:** 82 apple tree 45 mango 19 banana 64
**Step III:** 82 apple 64 tree 45 mango 19 banana
**Step IV:** 82 apple 64 banana tree 45 mango 19
**Step V:** 82 apple 64 banana 45 tree mango 19
**Step VI:** 82 apple 64 banana 45 mango tree 19
**Step VII:** 82 apple 64 banana 45 mango 19 tree
Step VII is the final output step.`,
        questionText: 'Which rule governs the step-by-step transformation in this machine rearrangement?',
        options: [
          { id: 'A', text: 'Numbers are arranged in descending order at odd positions; words are arranged in alphabetical order at even positions, one element per step from left to right.' },
          { id: 'B', text: 'Words and numbers are swapped symmetrically from both outer ends inward.' },
          { id: 'C', text: 'Numbers are arranged in ascending order; words are arranged in reverse alphabetical order.' },
          { id: 'D', text: 'The element with the largest number of vowels is placed first, followed by prime numbers.' }
        ],
        correctAnswer: 'A',
        explanation: {
          coreConcept: 'NMAT Signature Question: Machine Input-Output Pattern Decoding',
          stepByStep: [
            'Examine Step I: "82" (the largest number) is moved to position 1.',
            'Examine Step II: "apple" (the alphabetically earliest word) is moved to position 2.',
            'Examine Step III: "64" (the second largest number) is moved to position 3.',
            'Examine Step IV: "banana" (the alphabetically second word) is moved to position 4.',
            'Step V: "45" (third largest number).',
            'Step VI: "mango" (third alphabetical word).',
            'Step VII: "19" (smallest number) followed by "tree" (last word).',
            'Pattern: Alternating largest number (descending) and alphabetically earliest word (ascending) placed one by one at the left.'
          ],
          shortcutOrAlumTip: 'In NMAT Machine I/O, immediately inspect the final step to decipher the target state: 82 (max num), apple (min word), 64 (2nd max), banana (2nd word)...',
          trapAnalysis: 'Attempting to read all intermediate steps before looking at the final step wastes precious time. Always inspect the final step first!',
          prerequisite: 'Sequential Sorting Logic & Shift Patterns'
        },
        pastYearReference: 'NMAT 2023 Logical Reasoning (Sequential Machine Arrangement)'
      },
      {
        id: 'nmat-d1-lr-q2',
        exam: 'NMAT',
        section: 'Logical_Reasoning',
        topic: 'Deductive Logic',
        subtopic: 'Categorical Syllogisms with Venn Deduction',
        type: 'MCQ',
        difficulty: 'Moderate',
        contextText: `**Statements:**
1. All laptops are electronic gadgets.
2. Some electronic gadgets are smartphones.
3. No smartphone is a desktop computer.

**Conclusions:**
I. Some laptops are definitely smartphones.
II. Some electronic gadgets are not desktop computers.`,
        questionText: 'Which of the conclusions logically follows from the given statements?',
        options: [
          { id: 'A', text: 'Only Conclusion I follows' },
          { id: 'B', text: 'Only Conclusion II follows' },
          { id: 'C', text: 'Both Conclusions I and II follow' },
          { id: 'D', text: 'Neither Conclusion I nor II follows' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Categorical Syllogisms & Venn Intersection Tests',
          stepByStep: [
            'Statement 1: All L are E ($L \\subseteq E$).',
            'Statement 2: Some E are S ($E \\cap S \\neq \\emptyset$).',
            'Statement 3: No S is D ($S \\cap D = \\emptyset$).',
            'Check Conclusion I ("Some laptops are definitely smartphones"): The circle for L can exist entirely outside the circle for S while both remain inside E. There is no mandatory overlap between L and S. Therefore, Conclusion I does NOT follow.',
            'Check Conclusion II ("Some electronic gadgets are not desktop computers"): The portion of electronic gadgets (E) that are smartphones (S) cannot be desktop computers (because no S is D). Since there are guaranteed to be electronic gadgets that are smartphones, those specific gadgets can NEVER be desktops. Therefore, Conclusion II definitely follows!',
            'Hence, Only Conclusion II follows (Option B).'
          ],
          shortcutOrAlumTip: 'Venn Rule: "Some A are B" + "No B is C" logically guarantees "Some A are not C" (the A\'s that are B cannot be C).',
          trapAnalysis: 'Assuming that because laptops and smartphones are both gadgets, they must overlap. Unless explicitly forced, keep circles disjoint in minimal Venn diagrams.',
          prerequisite: 'Euler Circles & Syllogistic Inference Rules'
        },
        pastYearReference: 'NMAT 2022 Logical Reasoning (Syllogisms)'
      },
      {
        id: 'nmat-d1-lr-q3',
        exam: 'NMAT',
        section: 'Logical_Reasoning',
        topic: 'Analytical Reasoning',
        subtopic: 'Coded Blood Relations',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `Read the following symbolic codes:
- $P + Q$ means '$P$ is the father of $Q$'
- $P - Q$ means '$P$ is the sister of $Q$'
- $P \\times Q$ means '$P$ is the brother of $Q$'
- $P \\div Q$ means '$P$ is the mother of $Q$'

Which of the following expressions indicates that **'M is the maternal uncle of N'**?`,
        options: [
          { id: 'A', text: '$M \\times K \\div N$' },
          { id: 'B', text: '$M + K - N$' },
          { id: 'C', text: '$M \\div K \\times N$' },
          { id: 'D', text: '$M - K + N$' }
        ],
        correctAnswer: 'A',
        explanation: {
          coreConcept: 'NMAT Coded Blood Relations: Gender & Generation Elimination',
          stepByStep: [
            'Target relationship: "M is the maternal uncle of N".',
            'Maternal uncle means: brother of N\'s mother.',
            'Gender check: $M$ must be MALE.',
            'Generation gap check: $M$ is $+1$ generation above $N$.',
            'Test Option A: $M \\times K \\div N$:',
            '- $K \\div N \\implies K$ is the mother of $N$ (Female, generation +1).',
            '- $M \\times K \\implies M$ is the brother of $K$ (Male, same generation as mother).',
            '- The brother of N\'s mother is N\'s maternal uncle! This exactly satisfies the condition.',
            'Therefore, Option A is the correct expression.'
          ],
          shortcutOrAlumTip: 'Gender Elimination Hack: M is maternal uncle $\\implies$ M must be male. In Option C, $M \\div K$ makes M a mother (female), immediately eliminate! In Option D, $M - K$ makes M a sister (female), immediately eliminate! Only A and B left.',
          trapAnalysis: 'Drawing full trees for all 4 options takes 2 minutes. Gender elimination filters out wrong choices in 10 seconds.',
          prerequisite: 'Coded Family Tree & Generation Gap Deduction'
        },
        pastYearReference: 'NMAT 2024 Logical Reasoning (Coded Blood Relations)'
      },
      {
        id: 'nmat-d1-lr-q4',
        exam: 'NMAT',
        section: 'Logical_Reasoning',
        topic: 'Critical Reasoning',
        subtopic: 'Statement & Implicit Assumptions',
        type: 'MCQ',
        difficulty: 'Moderate',
        contextText: `**Statement:**
"Please ensure your baggage is locked before checking it in at the airline counter. The airline management will not be liable for any missing unsecured valuables." — Notice on an airline boarding pass.

**Assumptions:**
I. Passengers have access to locks and keys to secure their baggage.
II. Valuables stored in locked baggage cannot be stolen by baggage handlers.`,
        questionText: 'Which of the assumptions is implicit in the statement?',
        options: [
          { id: 'A', text: 'Only Assumption I is implicit' },
          { id: 'B', text: 'Only Assumption II is implicit' },
          { id: 'C', text: 'Both Assumptions I and II are implicit' },
          { id: 'D', text: 'Neither Assumption I nor II is implicit' }
        ],
        correctAnswer: 'A',
        explanation: {
          coreConcept: 'NMAT Critical Reasoning: Implicit vs Extreme Assumptions',
          stepByStep: [
            'An assumption is something taken for granted or presupposed by the speaker.',
            'When an airline instructs passengers to lock their baggage, it naturally presupposes that passengers are practically capable of doing so (they have access to locking mechanisms). Otherwise, issuing the instruction would be nonsensical. Thus, Assumption I is implicit.',
            'Assumption II claims that valuables in locked baggage "cannot be stolen" (an extreme, absolute guarantee). The notice disclaims liability for UNSECURED baggage; it does NOT claim that a lock is a 100% impenetrable barrier against theft. Thus, Assumption II is NOT implicit.',
            'Therefore, Only Assumption I is implicit (Option A).'
          ],
          shortcutOrAlumTip: 'Beware of extreme words in assumptions: "cannot", "never", "only", "always". Legitimate policy notices assume feasibility (I), not absolute infallibility (II).',
          trapAnalysis: 'Choosing Option C because locking helps prevent theft. But "helping prevent" is not the same as assuming it "cannot" be stolen.',
          prerequisite: 'Statement & Assumption Fundamentals'
        },
        pastYearReference: 'NMAT 2021 Logical Reasoning (Implicit Assumptions)'
      }
    ]
  }
];
