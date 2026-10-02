import { DailyTarget } from '@/types/exam';

export const SNAP_DAILY_TARGETS: DailyTarget[] = [
  {
    id: 'snap-target-day-1',
    dayNumber: 1,
    dateStr: 'Day 1: SIBM Pune High-Velocity Speed & Accuracy Sprint',
    title: 'SNAP SIBM Pune Benchmark Daily Sprint #1',
    description: 'Authentic 60-question/60-minute SIU format: General English (Figures of Speech, Idioms & Antonyms), Analytical Reasoning (Clocks, Calendars, Number Series & Direction Sense), and Speed Quant (Time-Speed-Distance, Coordinate Geometry & Quick DI).',
    estimatedMinutes: 30,
    exam: 'SNAP',
    sectionBreakdown: [
      {
        section: 'General_English',
        label: 'General English',
        count: 4,
        description: 'Figures of Speech (Oxymoron, Metaphor, Synecdoche), Idiomatic expressions, Foreign legal terms, and spelling precision.'
      },
      {
        section: 'Analytical_Reasoning',
        label: 'Analytical & Logical Reasoning',
        count: 5,
        description: 'Clock hands angle formulas, Gregorian calendar day calculation, number/letter series, and vector direction sense.'
      },
      {
        section: 'Quant_DI_DS',
        label: 'Quantitative, DI & DS',
        count: 5,
        description: 'High-speed commercial arithmetic, train speed relative velocity, coordinate line perpendiculars, and rapid table ratio DI.'
      }
    ],
    sections: {
      varcCount: 4,
      dilrCount: 5,
      qaCount: 5
    },
    questions: [
      // --- SECTION 1: GENERAL ENGLISH ---
      {
        id: 'snap-d1-eng-q1',
        exam: 'SNAP',
        section: 'General_English',
        topic: 'Figures of Speech',
        subtopic: 'Rhetorical Devices Identification',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `Identify the figure of speech used in the following sentence:

*"The deafening silence inside the courtroom spoke volumes about the gravity of the verdict."*`,
        options: [
          { id: 'A', text: 'Hyperbole' },
          { id: 'B', text: 'Oxymoron' },
          { id: 'C', text: 'Synecdoche' },
          { id: 'D', text: 'Metonymy' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'SNAP Signature Question: Figures of Speech',
          stepByStep: [
            'An **Oxymoron** is a rhetorical figure of speech in which two contradictory or sharply contrasting terms appear in immediate conjunction.',
            'In the sentence, "deafening" (extremely loud) and "silence" (complete absence of sound) are direct contradictory concepts conjoined to produce a dramatic rhetorical effect.',
            'Therefore, the predominant figure of speech is an **Oxymoron**.',
            'Note: "Spoke volumes" is also an idiomatic personification, but "deafening silence" is the classic textbook oxymoron.'
          ],
          shortcutOrAlumTip: 'SNAP tests 10 core figures of speech every year: Oxymoron (opposing words side-by-side), Synecdoche (part for whole), Metonymy (associated name for thing), Hyperbole (extreme exaggeration), Personification.',
          trapAnalysis: 'Hyperbole (Option A) is tempting because deafening silence seems exaggerated, but combining mutually contradictory words specifically defines an oxymoron.',
          prerequisite: 'Poetic & Rhetorical Devices (Figures of Speech)'
        },
        pastYearReference: 'SNAP 2023 General English (Figures of Speech)'
      },
      {
        id: 'snap-d1-eng-q2',
        exam: 'SNAP',
        section: 'General_English',
        topic: 'Idioms & Phrases',
        subtopic: 'Idiomatic Meaning & Connotation',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `What is the meaning of the idiom **"to throw down the gauntlet"**?`,
        options: [
          { id: 'A', text: 'To surrender unconditionally in battle' },
          { id: 'B', text: 'To issue an open challenge or invitation to fight' },
          { id: 'C', text: 'To lose one\'s temper in public' },
          { id: 'D', text: 'To suffer an irreversible financial catastrophe' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Medieval Origin Idioms in SNAP',
          stepByStep: [
            'Historical Context: In medieval chivalry, a knight would throw his heavy armored glove (gauntlet) to the ground when challenging an opponent to combat. If the opponent picked up the gauntlet, the challenge was accepted.',
            'Hence, "to throw down the gauntlet" idiomatically means to issue an open challenge, defiance, or invitation to contest/compete.',
            'Therefore, Option B is correct.'
          ],
          shortcutOrAlumTip: '"Throw down the gauntlet" = issue a challenge. "Take up the gauntlet" = accept the challenge.',
          trapAnalysis: 'People confuse throwing down the gauntlet with throwing down the towel / sponge (which means surrendering, Option A).',
          prerequisite: 'Classical Idioms & Expressions'
        },
        pastYearReference: 'SNAP 2022 General English (Idioms)'
      },
      {
        id: 'snap-d1-eng-q3',
        exam: 'SNAP',
        section: 'General_English',
        topic: 'Foreign Expressions',
        subtopic: 'Latin Legal & Business Phrases',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `The international trade delegation insisted that the contract include a **"quid pro quo"** clause. What does this Latin expression mean?`,
        options: [
          { id: 'A', text: 'In good faith without deception' },
          { id: 'B', text: 'Something given in exchange for something else' },
          { id: 'C', text: 'Existing state of affairs' },
          { id: 'D', text: 'Beyond the legal powers of the corporation' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Latin Phrases in Business English',
          stepByStep: [
            '"Quid pro quo" literally translates from Latin as "what for what" or "something for something". In commerce and law, it refers to a reciprocal exchange where an item or service is traded in return for something of equivalent value.',
            'Option A refers to *Bona fide*.',
            'Option C refers to *Status quo*.',
            'Option D refers to *Ultra vires*.'
          ],
          shortcutOrAlumTip: 'SNAP loves Latin terms: Quid pro quo (mutual exchange), Bona fide (in good faith), Status quo (current state), Modus operandi (method of working), De facto (in reality).',
          trapAnalysis: 'Do not confuse *Quid pro quo* with *Sine qua non* (an indispensable condition) or *Pro bono* (for the public good).',
          prerequisite: 'Latin Loan Phrases in English'
        },
        pastYearReference: 'SNAP 2024 General English (Foreign Phrases)'
      },
      {
        id: 'snap-d1-eng-q4',
        exam: 'SNAP',
        section: 'General_English',
        topic: 'Spelling & Vocabulary',
        subtopic: 'Commonly Misspelled Words',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `Identify the word which is SPELLED CORRECTLY:`,
        options: [
          { id: 'A', text: 'Accomodation' },
          { id: 'B', text: 'Millennium' },
          { id: 'C', text: 'Embarass' },
          { id: 'D', text: 'Priviledge' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'SNAP Double-Letter Orthographic Rules',
          stepByStep: [
            'Let\'s inspect each spelling:',
            'Option A: "Accomodation" is incorrect. Correct spelling has double \'c\' and double \'m\': **Accommodation**.',
            'Option B: "Millennium" is **CORRECT**. It has double \'l\' and double \'n\': **Millennium**.',
            'Option C: "Embarass" is incorrect. Correct spelling has double \'r\' and double \'s\': **Embarrass**.',
            'Option D: "Priviledge" is incorrect. There is no \'d\': **Privilege**.'
          ],
          shortcutOrAlumTip: 'Mnemonic for Millennium: Two \'l\'s, two \'n\'s (like two millennia in 2000 years). Mnemonic for Accommodation: Two Cots, Two Mattresses (CC and MM).',
          trapAnalysis: 'People frequently drop the second \'n\' in millennium writing "millenium", making Option B a high-yield SNAP trap.',
          prerequisite: 'Orthography & Common Spelling Pitfalls'
        },
        pastYearReference: 'SNAP 2021 General English (Spelling Test)'
      },

      // --- SECTION 2: ANALYTICAL & LOGICAL REASONING ---
      {
        id: 'snap-d1-lr-q1',
        exam: 'SNAP',
        section: 'Analytical_Reasoning',
        topic: 'Clocks',
        subtopic: 'Angle Between Hands of a Clock',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `What is the acute angle between the minute hand and the hour hand of a standard analogue clock at **$4:36\\text{ PM}$**?`,
        options: [
          { id: 'A', text: '$78^\\circ$' },
          { id: 'B', text: '$84^\\circ$' },
          { id: 'C', text: '$92^\\circ$' },
          { id: 'D', text: '$96^\\circ$' }
        ],
        correctAnswer: 'A',
        explanation: {
          coreConcept: 'SNAP Signature Clock Angle Formula',
          stepByStep: [
            'The standard angle $\\theta$ between the hour hand and minute hand at time $H$ hours and $M$ minutes is:',
            '$$\\theta = \\left|30H - \\frac{11}{2}M\\right|$$',
            'Substitute $H = 4$ and $M = 36$:',
            '$$\\theta = \\left|30(4) - \\frac{11}{2}(36)\\right|$$',
            '$$\\theta = |120 - 11 \\times 18|$$',
            '$$\\theta = |120 - 198| = |-78| = 78^\\circ$$',
            'Since $78^\\circ \\le 180^\\circ$, the acute angle between the hands is $78^\\circ$.'
          ],
          shortcutOrAlumTip: 'Master the 5-second formula: $\\theta = |30H - 5.5M|$. At 4:36, $120 - 198 = 78^\\circ$. Guaranteed 1-mark question in SNAP every year!',
          trapAnalysis: 'If the formula yields an angle greater than $180^\\circ$, subtract from $360^\\circ$ for the acute angle. Here $78^\\circ$ is already acute.',
          prerequisite: 'Clock Hand Angular Velocity Mechanics'
        },
        pastYearReference: 'SNAP 2023 Analytical Reasoning (Clock Hand Angles)'
      },
      {
        id: 'snap-d1-lr-q2',
        exam: 'SNAP',
        section: 'Analytical_Reasoning',
        topic: 'Calendars',
        subtopic: 'Odd Days & Day of the Week Calculation',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `If **$15^{\\text{th}}\\text{ January } 2024$** was a **Monday**, on which day of the week did **$15^{\\text{th}}\\text{ January } 2025$** fall?`,
        options: [
          { id: 'A', text: 'Tuesday' },
          { id: 'B', text: 'Wednesday' },
          { id: 'C', text: 'Thursday' },
          { id: 'D', text: 'Friday' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Gregorian Calendar Leap Year Odd Days',
          stepByStep: [
            'Identify if the intervening period includes a leap day ($29^{\\text{th}}\\text{ February}$):',
            'The year $2024$ is divisible by 4 ($2024 / 4 = 506$), so $2024$ is a **leap year** with $366\\text{ days}$.',
            'The time interval spans from $15^{\\text{th}}\\text{ Jan } 2024$ to $15^{\\text{th}}\\text{ Jan } 2025$. This interval includes $29^{\\text{th}}\\text{ February } 2024$.',
            'Number of days in a leap year = $366\\text{ days} = 52\\text{ weeks} + 2\\text{ odd days}$.',
            'To find the new day of the week, add $2\\text{ days}$ to the starting day:',
            '$$\\text{Monday} + 2\\text{ days} = \\text{Wednesday}$$',
            'Thus, $15^{\\text{th}}\\text{ January } 2025$ was a **Wednesday**.'
          ],
          shortcutOrAlumTip: 'Rule: Ordinary year advances day by $+1$. Leap year advances day by $+2$ IF February 29th is crossed. Monday $+ 2 =$ Wednesday.',
          trapAnalysis: 'Assuming that 2024 is ordinary and only adding 1 day to get Tuesday (Option A). Remember 2024 was a leap year!',
          prerequisite: 'Odd Days Calculation & Leap Year Criteria'
        },
        pastYearReference: 'SNAP 2022 Analytical Reasoning (Calendar Odd Days)'
      },
      {
        id: 'snap-d1-lr-q3',
        exam: 'SNAP',
        section: 'Analytical_Reasoning',
        topic: 'Number Series',
        subtopic: 'Alternating Difference & Cube Logic',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `Find the next number in the given series:

$$3,\\; 10,\\; 29,\\; 66,\\; 127,\\; ?$$`,
        options: [
          { id: 'A', text: '$198$' },
          { id: 'B', text: '$218$' },
          { id: 'C', text: '$224$' },
          { id: 'D', text: '$243$' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'SNAP Series: $n^3 + k$ Pattern Recognition',
          stepByStep: [
            'Examine the terms relative to perfect cubes ($n^3$):',
            '$1^3 + 2 = 1 + 2 = 3$',
            '$2^3 + 2 = 8 + 2 = 10$',
            '$3^3 + 2 = 27 + 2 = 29$',
            '$4^3 + 2 = 64 + 2 = 66$',
            '$5^3 + 2 = 125 + 2 = 127$',
            'The sequence strictly follows the formula $T_n = n^3 + 2$.',
            'The next term for $n = 6$ is:',
            '$$T_6 = 6^3 + 2 = 216 + 2 = 218$$'
          ],
          shortcutOrAlumTip: 'Always check terms against standard $n^2 \\pm c$ and $n^3 \\pm c$ tables up to $15^2$ and $10^3$. 29 and 66 are immediate indicators of cubes!',
          trapAnalysis: 'Computing successive differences takes 3 levels of arithmetic subtraction instead of spotting $n^3 + 2$ in 3 seconds.',
          prerequisite: 'Cubes & Squares Benchmarks'
        },
        pastYearReference: 'SNAP 2024 Analytical Reasoning (Number Series)'
      },
      {
        id: 'snap-d1-lr-q4',
        exam: 'SNAP',
        section: 'Analytical_Reasoning',
        topic: 'Direction Sense',
        subtopic: 'Displacement with Right-Angle Turns',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `A delivery executive starts from point $P$ and rides $12\\text{ km}$ towards the North. He then takes a $90^\\circ$ right turn and rides $5\\text{ km}$. Next, he takes a $90^\\circ$ right turn and rides $12\\text{ km}$. Finally, he turns left and rides $7\\text{ km}$ to reach point $Q$.

How far and in which direction is point $Q$ with respect to point $P$?`,
        options: [
          { id: 'A', text: '$12\\text{ km, East}$' },
          { id: 'B', text: '$14\\text{ km, East}$' },
          { id: 'C', text: '$12\\text{ km, North-East}$' },
          { id: 'D', text: '$15\\text{ km, East}$' }
        ],
        correctAnswer: 'A',
        explanation: {
          coreConcept: 'Cartesian Coordinate Displacement Analysis',
          stepByStep: [
            'Let starting point $P = (0, 0)$.',
            '1. Rides $12\\text{ km}$ North $\\implies (0, 12)$.',
            '2. Turns right (East) and rides $5\\text{ km} \\implies (5, 12)$.',
            '3. Turns right (South) and rides $12\\text{ km} \\implies (5, 12 - 12) = (5, 0)$. Notice he is back on the original East-West baseline!',
            '4. Turns left (facing South, turning left means heading East) and rides $7\\text{ km} \\implies (5 + 7, 0) = (12, 0)$.',
            'Point $Q$ is at coordinates $(12, 0)$.',
            'Distance from $P(0,0)$ to $Q(12,0) = 12\\text{ km}$ directly to the **East**.'
          ],
          shortcutOrAlumTip: 'Vertical displacement: $+12 - 12 = 0$. Horizontal displacement: $+5 + 7 = 12\\text{ km East}$. Mental calculation in 10 seconds!',
          trapAnalysis: 'Turning left when facing South: left points East, not West. Turning right points West.',
          prerequisite: 'Cardinal Directions & Coordinate Vectors'
        },
        pastYearReference: 'SNAP 2021 Analytical Reasoning (Direction & Distance)'
      },
      {
        id: 'snap-d1-lr-q5',
        exam: 'SNAP',
        section: 'Analytical_Reasoning',
        topic: 'Coding-Decoding',
        subtopic: 'Letter Shift & Reverse Cipher',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `In a certain code language, if **'PUNE'** is coded as **'SXQH'**, how will **'SIBM'** be coded in the same language?`,
        options: [
          { id: 'A', text: 'VLEP' },
          { id: 'B', text: 'VLDP' },
          { id: 'C', text: 'VKDO' },
          { id: 'D', text: 'UKFP' }
        ],
        correctAnswer: 'A',
        explanation: {
          coreConcept: 'Alphabet Numerical Position Constant Shift (+3)',
          stepByStep: [
            'Examine the positional shift from "PUNE" to "SXQH":',
            '$P (16) + 3 = S (19)$',
            '$U (21) + 3 = X (24)$',
            '$N (14) + 3 = Q (17)$',
            '$E (5) + 3 = H (8)$',
            'The coding rule is a uniform $+3$ alphabetical shift for every letter.',
            'Apply the $+3$ shift to "SIBM":',
            '$S (19) + 3 = V (22)$',
            '$I (9) + 3 = L (12)$',
            '$B (2) + 3 = E (5)$',
            '$M (13) + 3 = P (16)$',
            'Therefore, "SIBM" is coded as **"VLEP"**.'
          ],
          shortcutOrAlumTip: 'EJOTY Rule: Memorize 5, 10, 15, 20, 25 for instant alphabet-number conversion.',
          trapAnalysis: 'Watch the third letter: $B(2) + 3 = E(5)$, not $D(4)$. Eliminates Option B.',
          prerequisite: 'Letter Position Codes'
        },
        pastYearReference: 'SNAP 2023 Analytical Reasoning (Letter Ciphers)'
      },

      // --- SECTION 3: QUANT, DI & DS ---
      {
        id: 'snap-d1-quant-q1',
        exam: 'SNAP',
        section: 'Quant_DI_DS',
        topic: 'Arithmetic',
        subtopic: 'Relative Speed & Trains Passing Stationary Platforms',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `A train running at a uniform speed of $72\\text{ km/h}$ crosses a stationary platform of length $250\\text{ m}$ in $20\\text{ seconds}$. 

What is the length of the train?`,
        options: [
          { id: 'A', text: '$120\\text{ m}$' },
          { id: 'B', text: '$150\\text{ m}$' },
          { id: 'C', text: '$180\\text{ m}$' },
          { id: 'D', text: '$200\\text{ m}$' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'SNAP Speed Math: $\\text{km/h}$ to $\\text{m/s}$ Conversion',
          stepByStep: [
            'Step 1: Convert speed from $\\text{km/h}$ to $\\text{m/s}$ by multiplying by $\\frac{5}{18}$:',
            '$$\\text{Speed} = 72 \\times \\frac{5}{18} = 4 \\times 5 = 20\\text{ m/s}$$',
            'Step 2: When a train crosses a platform, total distance covered = $\\text{Length of train } (L) + \\text{Length of platform } (P)$:',
            '$$\\text{Distance} = \\text{Speed} \\times \\text{Time} = 20\\text{ m/s} \\times 20\\text{ s} = 400\\text{ m}$$',
            'Step 3: Solve for $L$:',
            '$$L + 250 = 400 \\implies L = 400 - 250 = 150\\text{ m}$$',
            'The length of the train is $150\\text{ m}$.'
          ],
          shortcutOrAlumTip: 'Table of 18: $72\\text{ km/h} = 18 \\times 4 \\implies 5 \\times 4 = 20\\text{ m/s}$. Total distance $= 20 \\times 20 = 400\\text{ m}$. $400 - 250 = 150\\text{ m}$. Solved in 8 seconds.',
          trapAnalysis: 'Forgetting to convert $\\text{km/h}$ to $\\text{m/s}$ and doing $72 \\times 20 = 1440$ yields nonsensical numbers.',
          prerequisite: 'Time, Speed and Distance Fundamentals'
        },
        pastYearReference: 'SNAP 2022 Quant_DI_DS (Trains & Platforms)'
      },
      {
        id: 'snap-d1-quant-q2',
        exam: 'SNAP',
        section: 'Quant_DI_DS',
        topic: 'Coordinate Geometry',
        subtopic: 'Perpendicular Lines & Slope Product',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `What is the equation of the straight line passing through the point $(2, -3)$ and perpendicular to the line $3x - 4y + 7 = 0$?`,
        options: [
          { id: 'A', text: '$4x + 3y + 1 = 0$' },
          { id: 'B', text: '$4x - 3y - 17 = 0$' },
          { id: 'C', text: '$3x + 4y + 6 = 0$' },
          { id: 'D', text: '$4x + 3y - 1 = 0$' }
        ],
        correctAnswer: 'A',
        explanation: {
          coreConcept: 'Perpendicular Lines Slope Condition ($m_1 \\cdot m_2 = -1$)',
          stepByStep: [
            'For any line of the form $Ax + By + C = 0$, any line perpendicular to it is given by:',
            '$$Bx - Ay + k = 0$$',
            'Here the original line is $3x - 4y + 7 = 0$, where $A = 3$ and $B = -4$.',
            'The perpendicular line is therefore of the form:',
            '$$4x + 3y + k = 0$$',
            'Since this line passes through the point $(2, -3)$, substitute $x = 2$ and $y = -3$:',
            '$$4(2) + 3(-3) + k = 0$$',
            '$$8 - 9 + k = 0 \\implies -1 + k = 0 \\implies k = 1$$',
            'Thus, the equation of the perpendicular line is $4x + 3y + 1 = 0$.'
          ],
          shortcutOrAlumTip: 'Instant SNAP Option Substitution: Simply plug $(2, -3)$ into the options! In Option A: $4(2) + 3(-3) + 1 = 8 - 9 + 1 = 0$. Check slope: $-4/3 \\times 3/4 = -1$. Instant match in 5 seconds!',
          trapAnalysis: 'Messing up the signs and choosing $4x + 3y - 1 = 0$ (Option D). Plug coordinates to verify.',
          prerequisite: 'Straight Lines & Slopes in Coordinate Geometry'
        },
        pastYearReference: 'SNAP 2023 Quant_DI_DS (Straight Line Slopes)'
      },
      {
        id: 'snap-d1-quant-q3',
        exam: 'SNAP',
        section: 'Quant_DI_DS',
        topic: 'Arithmetic',
        subtopic: 'Successive Percentage Discounts',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `A retailer offers two successive discounts of $20\\%$ and $10\\%$ on an article. If the final selling price is ₹$1,440$, what was the marked price of the article?`,
        options: [
          { id: 'A', text: '₹$1,800$' },
          { id: 'B', text: '₹$1,920$' },
          { id: 'C', text: '₹$2,000$' },
          { id: 'D', text: '₹$2,200$' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'Equivalent Successive Discount Multipliers',
          stepByStep: [
            'The single equivalent discount of two successive discounts $d_1$ and $d_2$ is:',
            '$$D_{\\text{eff}} = d_1 + d_2 - \\frac{d_1 \\cdot d_2}{100} = 20 + 10 - \\frac{200}{100} = 30 - 2 = 28\\%$$',
            'If the total discount is $28\\%$, the customer pays $100 - 28 = 72\\%$ of the Marked Price (MP):',
            '$$0.72 \\times \\text{MP} = 1,440$$',
            '$$\\text{MP} = \\frac{1,440}{0.72} = \\frac{144,000}{72} = 2,000$$',
            'The marked price was ₹2,000.'
          ],
          shortcutOrAlumTip: 'Multiplier method: $\\text{MP} \\times 0.8 \\times 0.9 = 1440 \\implies \\text{MP} \\times 0.72 = 1440 \\implies \\text{MP} = \\frac{1440}{0.72} = 2000$. Done in 5 seconds!',
          trapAnalysis: 'Adding discounts directly ($20 + 10 = 30\\%$) gives an erroneous discount of 30%, yielding $\\frac{1440}{0.70} \\approx 2057$. Discounts are multiplicative!',
          prerequisite: 'Percentages & Commercial Multipliers'
        },
        pastYearReference: 'SNAP 2024 Quant_DI_DS (Successive Discounts)'
      },
      {
        id: 'snap-d1-quant-q4',
        exam: 'SNAP',
        section: 'Quant_DI_DS',
        topic: 'Mensuration',
        subtopic: 'Sphere Melting & Recasting into Small Spheres',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `A solid metallic sphere of radius $6\\text{ cm}$ is melted and recast into small spherical lead shots of radius $1.5\\text{ cm}$ each. How many such small spherical lead shots can be formed?`,
        options: [
          { id: 'A', text: '$16$' },
          { id: 'B', text: '$32$' },
          { id: 'C', text: '$64$' },
          { id: 'D', text: '$128$' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'Volume Conservation & Dimensional Ratio Scaling',
          stepByStep: [
            'Let the original radius be $R = 6\\text{ cm}$ and small shot radius be $r = 1.5\\text{ cm}$.',
            'Volume of a sphere of radius $x$ is $V = \\frac{4}{3}\\pi x^3$.',
            'Number of small shots $N = \\frac{\\text{Volume of large sphere}}{\\text{Volume of one small shot}} = \\frac{\\frac{4}{3}\\pi R^3}{\\frac{4}{3}\\pi r^3} = \\left(\\frac{R}{r}\\right)^3$.',
            'Calculate the linear radius ratio:',
            '$$\\frac{R}{r} = \\frac{6}{1.5} = 4$$',
            'Therefore, $N = 4^3 = 64$.'
          ],
          shortcutOrAlumTip: 'Scaling Law: When 3D solid shapes are recast, number of pieces is simply $(\\text{linear scale factor})^3 = (6 / 1.5)^3 = 4^3 = 64$. Immediate 3-second answer!',
          trapAnalysis: 'Squaring the ratio ($4^2 = 16$) instead of cubing for 3D volumes.',
          prerequisite: '3D Mensuration & Volume Scaling Laws'
        },
        pastYearReference: 'SNAP 2021 Quant_DI_DS (Sphere Recasting)'
      },
      {
        id: 'snap-d1-quant-q5',
        exam: 'SNAP',
        section: 'Quant_DI_DS',
        topic: 'Data Interpretation',
        subtopic: 'Rapid Percentage Growth in Sales Table',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `The table below shows the quarterly revenue (in ₹ Crores) of a software firm in 2025:

| Quarter | Revenue (₹ Cr) |
| :--- | :--- |
| **Q1** | $40$ |
| **Q2** | $50$ |
| **Q3** | $65$ |
| **Q4** | $78$ |

Which quarter recorded the **highest percentage growth** in revenue compared to its immediate preceding quarter?`,
        options: [
          { id: 'A', text: 'Q2' },
          { id: 'B', text: 'Q3' },
          { id: 'C', text: 'Q4' },
          { id: 'D', text: 'Both Q2 and Q3 had equal growth' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'SNAP Speed Data Interpretation: Percentage Change Comparison',
          stepByStep: [
            'Calculate percentage growth for each quarter over its preceding quarter:',
            '1. **Q2 vs Q1**: $\\frac{50 - 40}{40} = \\frac{10}{40} = 25.0\\%$',
            '2. **Q3 vs Q2**: $\\frac{65 - 50}{50} = \\frac{15}{50} = 30.0\\%$',
            '3. **Q4 vs Q3**: $\\frac{78 - 65}{65} = \\frac{13}{65} = \\frac{1}{5} = 20.0\\%$',
            'Comparing $25.0\\%$, $30.0\\%$, and $20.0\\%$, the highest percentage growth occurred in **Q3** ($30.0\\%$).'
          ],
          shortcutOrAlumTip: 'Quick fraction visual inspection: $10/40 = 0.25$, $15/50 = 0.30$, $13/65 = 0.20$. $15/50$ is clearly highest without doing long division.',
          trapAnalysis: 'Looking at absolute growth instead of percentage growth: Q2 grew by 10, Q3 grew by 15, Q4 grew by 13. While Q3 happens to have both, always divide by previous base.',
          prerequisite: 'Percentage Change Formula in DI'
        },
        pastYearReference: 'SNAP 2023 Quant_DI_DS (Quarterly Financial DI)'
      }
    ]
  }
];
