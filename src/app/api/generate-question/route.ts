import { NextResponse } from 'next/server';
import { Question, ExamType, SectionType, QuestionDifficulty, QuestionType } from '@/types/exam';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      exam = 'CAT', 
      section = 'QA', 
      topic = 'Time Speed Distance', 
      difficulty = 'Hard', 
      type = 'MCQ' 
    } = body;

    // Check if user has GEMINI_API_KEY set
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const prompt = `You are a legendary CAT (Common Admission Test) question creator and IIM Ahmedabad alumnus.
Create 1 very high-quality, authentic ${exam} question for section "${section}" on topic "${topic}".
Difficulty: ${difficulty}.
Question Type: ${type} (${type === 'MCQ' ? 'Multiple Choice Question with 4 options A, B, C, D' : 'Type In The Answer / Numerical response without options'}).

CRITICAL CAT QUALITY RULES:
1. CAT questions never test trivial formula plugging. They test conceptual depth, boundary conditions, and subtle logical traps.
2. For QA: use realistic numbers with elegant algebraic or geometric simplifications. Use KaTeX notation (e.g. $x^2 - 4x + 3 = 0$, $\\frac{a}{b}$, $\\sqrt{n}$).
3. For VARC: write dense, thought-provoking philosophical, economic, or anthropological texts with nuanced options where wrong choices suffer from extreme wording, scope shifts, or distortion.
4. For DILR: create crisp logic constraints, tournament rules, or matrix puzzles with deductive elegance.
5. Provide a detailed step-by-step mathematical or verbal proof.
6. Provide an "IIM Alum Shortcut / 60-Second Hack" showing how a 99.9 percentile student solves it without brute force.
7. Provide a "Trap Analysis" explaining which distractor students pick and why it is wrong.

Return ONLY a valid JSON object matching this exact schema:
{
  "id": "gen-${Date.now()}",
  "exam": "${exam}",
  "section": "${section}",
  "topic": "${topic}",
  "type": "${type}",
  "difficulty": "${difficulty}",
  "contextText": "Optional reading passage or DILR caselet if applicable, otherwise omit or empty",
  "questionText": "The question statement with LaTeX math formatted inside $...$",
  "options": [
    {"id": "A", "text": "Option A with math if needed"},
    {"id": "B", "text": "Option B with math if needed"},
    {"id": "C", "text": "Option C with math if needed"},
    {"id": "D", "text": "Option D with math if needed"}
  ], // empty array or omit if TITA
  "correctAnswer": "A", // Or number if TITA
  "explanation": {
    "coreConcept": "Core theorem or logical principle",
    "stepByStep": ["Step 1...", "Step 2...", "Step 3..."],
    "shortcutOrAlumTip": "IIM Alum Speed Hack...",
    "trapAnalysis": "Why distractor C is tempting...",
    "prerequisite": "Foundational formula"
  },
  "pastYearReference": "CAT 2023 Slot 2 Equivalent"
}`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json'
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            const parsed = JSON.parse(generatedText);
            return NextResponse.json({ question: parsed });
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to curated bank:', geminiError);
      }
    }

    // High-quality Curated Dynamic Question Generator fallback
    const dynamicBank: Record<string, Question> = {
      'QA-Arithmetic': {
        id: `gen-qa-ts-${Date.now()}`,
        exam: exam as ExamType,
        section: 'QA',
        topic: 'Time Speed Distance / Escalators & Relative Velocity',
        type: type as QuestionType,
        difficulty: difficulty as QuestionDifficulty,
        questionText: `A moving escalator takes $30\\text{ seconds}$ to carry a stationary passenger from the ground floor to the first floor. If the escalator is turned off, the passenger takes $90\\text{ seconds}$ to walk up the stationary escalator. 

If the passenger walks up the *moving* escalator at his normal walking speed, how many seconds will he take to reach the first floor?`,
        options: type === 'MCQ' ? [
          { id: 'A', text: '$20.0\\text{ seconds}$' },
          { id: 'B', text: '$22.5\\text{ seconds}$' },
          { id: 'C', text: '$25.0\\text{ seconds}$' },
          { id: 'D', text: '$27.5\\text{ seconds}$' }
        ] : undefined,
        correctAnswer: type === 'MCQ' ? 'B' : '22.5',
        explanation: {
          coreConcept: 'Harmonic Mean and Parallel Rates in Escalator Systems',
          stepByStep: [
            'Let the total number of steps in the escalator be $N$ units.',
            'Speed of the moving escalator: $v_e = \\frac{N}{30}\\text{ steps/second}$.',
            'Walking speed of the person: $v_p = \\frac{N}{90}\\text{ steps/second}$.',
            'When the person walks up the MOVING escalator, both velocities add in the same direction:',
            '$$v_{\\text{net}} = v_e + v_p = \\frac{N}{30} + \\frac{N}{90} = \\frac{3N + N}{90} = \\frac{4N}{90} = \\frac{2N}{45}\\text{ steps/second}$$',
            'Time taken to cover all $N$ steps:',
            '$$T = \\frac{N}{v_{\\text{net}}} = \\frac{N}{\\frac{2N}{45}} = \\frac{45}{2} = 22.5\\text{ seconds}$$'
          ],
          shortcutOrAlumTip: '15-Second IIM Formula: When two independent rates act together in the same direction, time taken is given by the standard product-over-sum formula: $T = \\frac{t_1 \\times t_2}{t_1 + t_2} = \\frac{30 \\times 90}{30 + 90} = \\frac{2700}{120} = 22.5\\text{ seconds}$!',
          trapAnalysis: 'Common blunder: calculating the arithmetic average $(30 + 90)/2 = 60$, which makes zero physical sense because walking on a moving escalator must be faster than riding it stationary (under 30s)!',
          prerequisite: 'Rate-Time Inverses & Harmonic Aggregation'
        },
        pastYearReference: 'CAT 2021 Slot 1 Equivalent'
      },
      'QA-Algebra': {
        id: `gen-qa-alg-${Date.now()}`,
        exam: exam as ExamType,
        section: 'QA',
        topic: 'Algebra / Modulus & Minimum Value Graphing',
        type: type as QuestionType,
        difficulty: difficulty as QuestionDifficulty,
        questionText: `Find the minimum possible value of the function:
$$f(x) = |x - 3| + |x - 7| + |x - 12|$$
where $x$ is a real number.`,
        options: type === 'MCQ' ? [
          { id: 'A', text: '$7$' },
          { id: 'B', text: '$8$' },
          { id: 'C', text: '$9$' },
          { id: 'D', text: '$12$' }
        ] : undefined,
        correctAnswer: type === 'MCQ' ? 'C' : '9',
        explanation: {
          coreConcept: 'Median Point Minimization for Sum of Absolute Deviations',
          stepByStep: [
            'For any function of the form $f(x) = \\sum_{i=1}^n |x - a_i|$ with ordered points $a_1 < a_2 < \\dots < a_n$:',
            'The sum is minimized at the **median** of the points!',
            'Here the critical points are $a_1 = 3$, $a_2 = 7$, and $a_3 = 12$.',
            'Since $n = 3$ is odd, the median is the middle point: $x = 7$.',
            'Substitute $x = 7$ into $f(x)$:',
            '$$f(7) = |7 - 3| + |7 - 7| + |7 - 12| = 4 + 0 + |-5| = 4 + 5 = 9$$',
            'For any $x > 7$, moving right increases the distance to 3 and 7 faster than it reduces distance to 12. For $x < 7$, distance increases similarly.',
            'Thus, the minimum value is strictly **9**.'
          ],
          shortcutOrAlumTip: '10-Second Median Rule: For odd number of modulus terms, the minimum ALWAYS occurs at the median coordinate. For $|x-3| + |x-7| + |x-12|$, median is 7. Distance from 3 to 12 is $12 - 3 = 9$. Distance to 7 is 0. Total = 9!',
          trapAnalysis: 'Attempting to differentiate using calculus or splitting into 4 piecewise algebraic zones wastes 3 minutes on a problem that takes 10 seconds via the median theorem.',
          prerequisite: 'Absolute Value Graphs & Geometric Distance'
        },
        pastYearReference: 'CAT 2022 Slot 3 (Modulus Minimization)'
      },
      'VARC': {
        id: `gen-varc-${Date.now()}`,
        exam: exam as ExamType,
        section: 'VARC',
        topic: 'Verbal Ability / Para Summary',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `Choose the option that best captures the summary of the paragraph below:

"Modern antitrust jurisprudence was reshaped in the late 1970s by the Chicago School of economics, which enshrined 'consumer welfare'—measured almost exclusively by short-term output and retail prices—as the sole legitimate lodestar of monopoly regulation. Under this dogma, massive corporate consolidations were routinely blessed so long as companies could plausibly claim that scale efficiencies would prevent immediate price hikes. However, in the era of zero-price digital platform monopolies, where search engines and social networks monetize user attention and surveillance rather than charging subscription fees, this price-centric metric is blind. Platforms stifle nascent rivals, degrade privacy standards, and monopolize data moats while technically keeping consumer prices at zero. Reclaiming regulatory efficacy requires dismantling the Chicago doctrine and returning to the structural dispersion of private economic power."`,
        options: [
          { id: 'A', text: 'The Chicago School\'s consumer welfare standard, while effective for industrial manufacturing, is thoroughly obsolete in zero-price digital economies that require a return to antitrust structuralism.' },
          { id: 'B', text: 'Zero-price digital platforms have engaged in unlawful surveillance because antitrust regulators failed to enforce price floors in digital markets.' },
          { id: 'C', text: 'Antitrust laws should be abolished because modern consumers benefit immensely from zero-price digital platforms and algorithmic efficiencies.' },
          { id: 'D', text: 'Only by strictly regulating advertising revenue can governments prevent social networks from crushing innovative technology startups.' }
        ],
        correctAnswer: 'A',
        explanation: {
          coreConcept: 'Thesis and Prescriptive Synthesis in Legal-Economic Para Summary',
          stepByStep: [
            'The paragraph has three structural movements:',
            '1. History: Chicago School defined antitrust strictly through consumer price/welfare.',
            '2. Failure: Modern platforms are zero-price, so price-centric regulation cannot see the monopolistic harm (privacy degradation, data moats, stifling rivals).',
            '3. Prescriptive Conclusion: We must abandon this doctrine and return to structural dispersion of economic power.',
            'Option A covers the historical framework, the zero-price breakdown, and the structuralist remedy with immaculate tonal accuracy.'
          ],
          shortcutOrAlumTip: 'Match the concluding directive: The author explicitly urges "returning to the structural dispersion of private economic power". Option A is the only choice that incorporates "return to antitrust structuralism".',
          trapAnalysis: 'Option B misdiagnoses the issue ("failed to enforce price floors" makes no sense). Option C inverts the author\'s thesis into corporate apologism.',
          prerequisite: 'Summary Extraction & Core Intent Matching'
        },
        pastYearReference: 'CAT 2023 Slot 1 (Antitrust & Digital Economy Summary)'
      },
      'DILR': {
        id: `gen-dilr-${Date.now()}`,
        exam: exam as ExamType,
        section: 'DILR',
        topic: 'Logical Reasoning / Round Robin Deduction',
        type: 'MCQ',
        difficulty: 'Hard',
        contextText: `Five football clubs—**Arsenal, Bayern, Chelsea, Dortmund, and Everton**—played in a single round-robin group where every team played each other team exactly once. (Total 10 matches).
* A win awards 3 points, a draw awards 1 point to each team, and a loss awards 0 points.
* At the conclusion of the group:
  1. No two teams finished with the same total points.
  2. The champion team had exactly 10 points.
  3. The last-placed team had 2 points and did not win any match.
  4. Exactly 3 matches in the tournament ended in a draw.`,
        questionText: 'What is the maximum possible number of points scored by the team finishing in the 2nd position?',
        options: [
          { id: 'A', text: '7 points' },
          { id: 'B', text: '8 points' },
          { id: 'C', text: '9 points' },
          { id: 'D', text: '10 points' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Football League Points Conservation with Draw Penalties',
          stepByStep: [
            'Total matches = $\\frac{5 \\times 4}{2} = 10$ matches.',
            'Each team plays 4 matches.',
            'A decisive win gives 3 points total to the tournament. A draw gives 2 points total (1+1).',
            'Given: exactly 3 matches were draws. Decisive matches = $10 - 3 = 7$ matches.',
            'Sum of points of all 5 teams = $(7 \\times 3) + (3 \\times 2) = 21 + 6 = 27$ points.',
            'Team 1 (1st place) = 10 points (3 wins, 1 draw).',
            'Team 5 (5th place) = 2 points (0 wins, 2 draws, 2 losses).',
            'Sum of points of Teams 2, 3, 4 = $27 - (10 + 2) = 15$ points.',
            'We are given: all 5 teams have distinct scores ($10 > P_2 > P_3 > P_4 > 2$).',
            'Could $P_2 = 9$? If $P_2 = 9$, then $P_3 + P_4 = 15 - 9 = 6$. Distinct integers strictly between 9 and 2: could be $4 + 2$ (violates distinct since $P_5 = 2$) or $3 + 3$ (violates distinct). Thus $P_3 + P_4 = 6$ with $P_3 > P_4 > 2$ is IMPOSSIBLE!',
            'Could $P_2 = 8$? If $P_2 = 8$, then $P_3 + P_4 = 15 - 8 = 7$.',
            'Possible integer split: $P_3 = 4$ and $P_4 = 3$.',
            'Check ranking: $10 > 8 > 4 > 3 > 2$. All 5 scores are strictly distinct!',
            'Therefore, the maximum possible points for the 2nd place team is strictly **8 points**.'
          ],
          shortcutOrAlumTip: 'Points Conservation Fast-Check: Sum of 2nd, 3rd, 4th teams = 15. If 2nd is 9, remainder is 6 (which requires $4, 2$ but 2 is already taken by 5th place). Thus 2nd cannot be 9. Try 8: remainder is 7, which cleanly decomposes into 4 and 3. Answer is 8 in 30 seconds!',
          trapAnalysis: 'Blindly assuming 2nd team could score 9 (3 wins, 1 loss) without verifying that the remaining teams cannot fulfill the distinctness constraint.',
          prerequisite: 'Points Conservation & Distinct Partitioning'
        },
        pastYearReference: 'CAT 2022 Slot 1 (Football Points Table Deduction)'
      }
    };

    const key = section.startsWith('VARC') ? 'VARC' : section.startsWith('DILR') ? 'DILR' : topic.toLowerCase().includes('algebra') ? 'QA-Algebra' : 'QA-Arithmetic';
    const fallbackQuestion = dynamicBank[key] || dynamicBank['QA-Arithmetic'];

    return NextResponse.json({ question: fallbackQuestion });
  } catch (error) {
    console.error('Error generating question:', error);
    return NextResponse.json({ error: 'Failed to generate question' }, { status: 500 });
  }
}
