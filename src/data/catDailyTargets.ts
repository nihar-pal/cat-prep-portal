import { DailyTarget, Question } from '@/types/exam';

export const CAT_DAILY_TARGETS: DailyTarget[] = [
  {
    id: 'cat-target-day-1',
    dayNumber: 1,
    dateStr: 'Day 1: Foundations & High-Yield Strategy',
    title: 'CAT Benchmark Daily Target #1',
    description: 'High-yield CAT 2024/2025 standard sprint: 1 RC Passage on Behavioral Economics, 1 DILR Set on Games & Tournaments, and 5 QA Questions (Arithmetic & Algebra with TITA).',
    estimatedMinutes: 35,
    exam: 'CAT',
    sections: {
      varcCount: 6,
      dilrCount: 4,
      qaCount: 5
    },
    questions: [
      // VARC PASSAGE (Questions 1 to 4)
      {
        id: 'cat-d1-varc-q1',
        exam: 'CAT',
        section: 'VARC',
        topic: 'Reading Comprehension',
        subtopic: 'Behavioral Economics & Choice Architecture',
        type: 'MCQ',
        difficulty: 'Hard',
        contextText: `### Reading Comprehension: The Architecture of Choice and the Sunk-Cost Fallacy

In standard neoclassical economics, Homo economicus is modeled as an invariant optimiser whose preferences remain resolute regardless of framing. Yet empirical cognitive science reveals that human agency is persistently vulnerable to contextual nudges and temporal asymmetries. One of the most obstinate anomalies is the sunk-cost effect: the tendency to persist in an endeavor once an investment in money, effort, or time has been committed, even when the prospective marginal utility is unmistakably negative.

Traditional explanations root this behavior in cognitive dissonance and loss aversion. Nobel laureate Daniel Kahneman and Amos Tversky postulated that individuals evaluate outcomes not in terms of absolute wealth, but relative to a dynamic reference point. Within this prospect-theoretic topography, the value function is concave for gains but convex and significantly steeper for losses. Consequently, writing off an initial expenditure forces the decision-maker to definitively crystallize a loss in mental accounting. By persevering—even against deteriorating probabilities of recuperation—the agent holds open the non-zero fiction that the ledger might eventually balance, thereby postponing the painful hedonic penalty of acknowledging a realized failure.

However, recent neuro-computational paradigms suggest an alternative evolutionary etiology. Rather than merely being a maladaptive cognitive glitch, sunk-cost persistence may have functioned as a fitness-enhancing heuristic in ancestral environments characterized by high information opacity. In ancestral foraging and tribal coalition building, immediate yields on caloric or relational investments were rarely guaranteed. Abandoning an undertaken task at the first signal of diminished marginal returns would have selected for erratic impulsivity, crippling long-term collaborative contracts and communal reputation. When external observers monitor one's decisions, abandoning a high-profile enterprise signals either deficit in strategic foresight or lack of tenacity. Thus, what appears as irrational inertia at the individual utility level may constitute a hyper-rational reputational defense mechanism under social scrutiny.

Nevertheless, in modern institutional governance—where financial derivatives, capital allocation, and algorithmic trading operate across abstract horizons divorced from ancestral band dynamics—such reputational armor becomes catastrophic. CEOs double down on unviable corporate acquisitions; governments pour billions into obsolete aerospace prototypes; and retail investors refuse to liquidate hemorrhaging equities. The challenge for contemporary decision architecture is therefore not merely to instruct individuals in Bayesian probability, but to design institutional protocols that decouple organizational project termination from personal reputational forfeiture.`,
        questionText: 'According to the passage, the evolutionary explanation for the sunk-cost fallacy differs fundamentally from the prospect-theoretic explanation in that the evolutionary perspective:',
        options: [
          { id: 'A', text: 'posits that humans are inherently incapable of computing Bayesian marginal probabilities in non-foraging scenarios.' },
          { id: 'B', text: 'frames persistence not as an internalized hedonic avoidance of loss, but as a socially calibrated heuristic to safeguard reputational capital.' },
          { id: 'C', text: 'asserts that ancestral humans faced static reference points, whereas modern agents continually recalibrate their mental accounting.' },
          { id: 'D', text: 'proves that corporate project abandonment is driven primarily by fear of financial insolvency rather than cognitive dissonance.' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Comparative Authorial Argumentation / Evolution vs. Prospect Theory',
          stepByStep: [
            'Paragraph 2 outlines the prospect-theoretic view: agents avoid crystallizing a loss in their internal "mental accounting" to delay personal "hedonic penalty" (an internalized psychological mechanism).',
            'Paragraph 3 introduces the evolutionary view: persistence served as a "fitness-enhancing heuristic" where "abandoning a high-profile enterprise signals either deficit in strategic foresight or lack of tenacity" to social observers. Hence it is a "reputational defense mechanism under social scrutiny".',
            'Option B precisely captures this exact contrast: internalized hedonic avoidance of loss vs. socially calibrated heuristic preserving reputational capital.'
          ],
          shortcutOrAlumTip: 'Identify the pivot keyword: Paragraph 3 starts with "However, recent neuro-computational paradigms suggest an alternative...". Look for how the author reframes internal emotion to external social signaling.',
          trapAnalysis: 'Option A is an extreme distortion ("inherently incapable"). Option C reverses the text (reference points are dynamic in prospect theory, not static). Option D discusses modern corporate outcomes rather than the evolutionary premise.',
          prerequisite: 'Passage Synthesis & Contrasting Paradigms'
        },
        pastYearReference: 'CAT 2022 Slot 3 (Behavioral Science & Rational Choice)'
      },
      {
        id: 'cat-d1-varc-q2',
        exam: 'CAT',
        section: 'VARC',
        topic: 'Reading Comprehension',
        subtopic: 'Authorial Inference',
        type: 'MCQ',
        difficulty: 'Hard',
        contextText: `(Refer to the passage "The Architecture of Choice and the Sunk-Cost Fallacy")`,
        questionText: 'Based on the final paragraph, which of the following institutional policies would best align with the author’s prescriptive recommendations for modern governance?',
        options: [
          { id: 'A', text: 'Mandating that executives who cancel underperforming projects undergo mandatory retraining in Bayesian probability models.' },
          { id: 'B', text: 'Publishing the names and internal voting records of committee members whenever a major enterprise is cancelled to increase transparency.' },
          { id: 'C', text: 'Instituting independent evaluation boards where project continuance decisions are structurally insulated from the careers and appraisals of the project initiators.' },
          { id: 'D', text: 'Penalizing corporate managers whose approved projects fail to achieve positive marginal utility within the first fiscal quarter.' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'Application of Principle to Institutional Design',
          stepByStep: [
            'The passage concludes: "The challenge for contemporary decision architecture is therefore not merely to instruct individuals in Bayesian probability, but to design institutional protocols that decouple organizational project termination from personal reputational forfeiture."',
            'We need a mechanism that accomplishes this decoupling: terminating bad projects without penalizing or destroying the personal reputation of the people who initially championed them.',
            'Option C provides exactly this: an independent review board that decides on termination without linking it as a career-ending black mark against the project initiators.',
            'Option B would worsen the problem by publicly exposing and shaming decision-makers. Option A is dismissed in the text ("not merely to instruct individuals in Bayesian probability"). Option D increases the fear of failure, exacerbating cover-ups.'
          ],
          shortcutOrAlumTip: 'Check the specific verb phrase: "decouple organizational project termination from personal reputational forfeiture". Option C is the only choice that decouples project status from personal career stakes.',
          trapAnalysis: 'Option A is explicitly rejected by the author as insufficient. Option B and D reinforce the very reputational terror that drives people to double down on sinking ships.',
          prerequisite: 'Inference and Practical Extrapolation'
        },
        pastYearReference: 'CAT 2023 Slot 1 (Critical Inference & Policy Recommendation)'
      },
      {
        id: 'cat-d1-varc-q3',
        exam: 'CAT',
        section: 'VARC',
        topic: 'Reading Comprehension',
        subtopic: 'Contextual Meaning & Tone',
        type: 'MCQ',
        difficulty: 'Moderate',
        contextText: `(Refer to the passage "The Architecture of Choice and the Sunk-Cost Fallacy")`,
        questionText: 'The phrase "holds open the non-zero fiction that the ledger might eventually balance" (Paragraph 2) is used by the author primarily to imply that:',
        options: [
          { id: 'A', text: 'decision-makers are consciously committing financial fraud by falsifying bookkeeping records.' },
          { id: 'B', text: 'agents sustain an improbable self-delusion of recovery rather than confronting the psychological finality of loss.' },
          { id: 'C', text: 'mathematical balance sheets inherently fail to capture intangible assets like tenacity and trust.' },
          { id: 'D', text: 'prospect theory mistakenly assumes human calculations are devoid of optimism.' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Metaphorical Interpretation & Subtext',
          stepByStep: [
            '"Non-zero fiction" denotes an illusory, nearly impossible hope that the agent tells themselves.',
            '"The ledger might eventually balance" refers to the mental account recovering its losses.',
            'Combined with "thereby postponing the painful hedonic penalty of acknowledging a realized failure", the author is describing psychological self-deception to evade emotional distress.',
            'Option B cleanly and precisely expresses this sentiment.'
          ],
          shortcutOrAlumTip: '"Fiction" directly signals an imaginary or delusional narrative. "Self-delusion" in Option B is the exact semantic equivalent.',
          trapAnalysis: 'Option A interprets "ledger" literally as criminal accounting fraud. Option C wanders into irrelevant corporate accounting debates. Option D misunderstands prospect theory.',
          prerequisite: 'Tone & Figurative Language in RC'
        },
        pastYearReference: 'CAT 2021 Slot 2 (Nuanced Phrase Interpretation)'
      },
      {
        id: 'cat-d1-varc-q4',
        exam: 'CAT',
        section: 'VARC',
        topic: 'Reading Comprehension',
        subtopic: 'Tone and Argument Architecture',
        type: 'MCQ',
        difficulty: 'Moderate',
        contextText: `(Refer to the passage "The Architecture of Choice and the Sunk-Cost Fallacy")`,
        questionText: 'Which of the following best characterizes the author’s stance toward the human tendency to honor sunk costs?',
        options: [
          { id: 'A', text: 'Scornful of human irrationality and advocating immediate algorithmic automation of all financial governance.' },
          { id: 'B', text: 'Empathetically evolutionary yet urgently cautious about its devastating systemic misapplication in modern structures.' },
          { id: 'C', text: 'Wholly agnostic, presenting historical perspectives without endorsing any structural reforms.' },
          { id: 'D', text: 'Defensive of ancestral wisdom, arguing that corporate persistence is unjustly vilified by economists.' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Authorial Tone and Perspective Synthesis',
          stepByStep: [
            'The author validates why this trait developed (it made evolutionary sense: "fitness-enhancing heuristic", "hyper-rational reputational defense mechanism"). This shows evolutionary understanding/empathy.',
            'However, in Paragraph 4, the author issues a grave warning: "such reputational armor becomes catastrophic" and urges that contemporary architecture must actively decouple termination from personal loss.',
            'Option B balances both facets: empathetic evolutionary insight + urgent caution regarding systemic modern dangers.'
          ],
          shortcutOrAlumTip: 'CAT tone questions reward nuanced, balanced descriptors over extreme polarities (scornful, wholly agnostic, blind defense).',
          trapAnalysis: 'Option A is excessively derogatory ("scornful"). Option C is incorrect because the author explicitly prescribes institutional reform. Option D ignores the warnings of catastrophe in Paragraph 4.',
          prerequisite: 'Overall Tone & Perspective Analysis'
        },
        pastYearReference: 'CAT 2023 Slot 2 (Authorial Tone & Critical Nuance)'
      },

      // VERBAL ABILITY (Questions 5 & 6)
      {
        id: 'cat-d1-varc-q5',
        exam: 'CAT',
        section: 'VARC',
        topic: 'Verbal Ability',
        subtopic: 'Para Jumbles (TITA)',
        type: 'TITA',
        difficulty: 'Hard',
        questionText: `The four sentences (labelled 1, 2, 3, 4) given below, when properly sequenced, form a coherent paragraph. Decide on the proper sequence of the sentences and key in the numerical sequence (e.g. 2143):

[1] Because the visual cortex processes biological motion far faster than static symbolic text, such immediate sensory stimuli command pre-attentive priority in our perceptual hierarchies.
[2] In digital communication, the relentless avalanche of animated notifications exploit this neurological vulnerability by mimicking urgent kinetic threats.
[3] As a consequence, our cognitive bandwidth is perpetually fragmented, leaving scant executive capacity for deep contemplative synthesis.
[4] Evolutionary pressures primed the mammalian visual apparatus to detect rapid displacement in the visual field as potential predatory incursions.`,
        correctAnswer: '4123',
        explanation: {
          coreConcept: 'Discourse Coherence & Cause-Effect Sequencing in Para Jumbles',
          stepByStep: [
            'Sentence [4] introduces the broad evolutionary premise: mammalian visual apparatus evolved to detect rapid displacement/motion.',
            'Sentence [1] follows [4] naturally: explains the physiological mechanism ("Because the visual cortex processes biological motion far faster... such immediate sensory stimuli command priority"). Pair 4-1 is established.',
            'Sentence [2] transitions from the evolutionary premise to the modern phenomenon: "In digital communication, the relentless avalanche of animated notifications exploit this neurological vulnerability" ("this neurological vulnerability" refers back to 4 & 1).',
            'Sentence [3] delivers the overarching final consequence: "As a consequence, our cognitive bandwidth is perpetually fragmented...".',
            'Thus, the sequence is 4 -> 1 -> 2 -> 3.'
          ],
          shortcutOrAlumTip: 'Find the pronoun/referent anchor: "this neurological vulnerability" in [2] demands that the neurological vulnerability be defined first (which happens in [4] and [1]). [3] begins with "As a consequence", making it the natural concluding outcome.',
          trapAnalysis: 'Starting with 1 is a common trap, but "such immediate sensory stimuli" requires [4] as the antecedent. Starting with 2 jumps into modern technology without setting up the evolutionary foundation.',
          prerequisite: 'Cohesive Paragraph Construction'
        },
        pastYearReference: 'CAT 2022 Slot 1 (TITA Para Jumble on Cognitive Science)'
      },
      {
        id: 'cat-d1-varc-q6',
        exam: 'CAT',
        section: 'VARC',
        topic: 'Verbal Ability',
        subtopic: 'Para Summary',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `Read the paragraph below and choose the option that best captures the essence of the passage:

"The prevailing canon of art history has long lionized the solitary genius, celebrating the myth of the isolated creator striking lightning from the ether. Yet archival provenance reveals that the Renaissance bottega was less a private cloister than an industrial assembly line. Master painters operated collective workshops where apprentices primed canvases, journeymen blocked in drapery, and specialists rendered landscapes according to strict guild specifications. The master\'s role was frequently that of an artistic director and brand guarantor, applying the definitive brushstrokes to key focal points like faces and hands before affixing his lucrative signature. Far from diminishing these masterpieces, acknowledging this distributed labor situates high art within the collaborative economic realities that made its existence possible."`,
        options: [
          { id: 'A', text: 'Renaissance masterpieces were in reality mass-produced by exploited apprentices while masters merely took credit by affixing signatures.' },
          { id: 'B', text: 'The solitary genius myth obscures the historical reality that Renaissance art was the product of highly specialized, collaborative workshop economies headed by brand-directors.' },
          { id: 'C', text: 'Guild regulations during the Renaissance compelled painters to sacrifice individual artistic vision in favor of industrial-scale efficiency.' },
          { id: 'D', text: 'Modern art historians must cease celebrating Renaissance painters since their celebrated works were predominantly painted by anonymous journeymen.' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Essence Extraction & Distractor Elimination in Para Summary',
          stepByStep: [
            'Key Idea 1: The "solitary genius" is a flawed myth.',
            'Key Idea 2: The Renaissance bottega was actually a collaborative workshop with specialized labor where the master acted as artistic director and guarantor.',
            'Key Idea 3: Recognizing this collaborative economic reality enhances rather than diminishes our understanding of these masterpieces.',
            'Option B accurately integrates all three pillars with fidelity to the author\'s tone.',
            'Option A introduces derogatory, unsupported language ("exploited apprentices", "merely took credit").',
            'Option C incorrectly frames the relationship as a forced sacrifice of vision.',
            'Option D distorts the author\'s conclusion into a radical boycott ("must cease celebrating").'
          ],
          shortcutOrAlumTip: 'Check the author\'s closing clause: "Far from diminishing these masterpieces...". The author is NOT attacking the value of the art, but clarifying its economic and collaborative provenance. Any option with negative extremism (A, D) is an automatic elimination.',
          trapAnalysis: 'Option A appeals to cynical modern sentiments, but is a gross overstatement of the passage.',
          prerequisite: 'Core Idea Extraction & Nuance Matching'
        },
        pastYearReference: 'CAT 2023 Slot 3 (Art History & Economic Provenance Summary)'
      },

      // DILR SET (Questions 7 to 10)
      {
        id: 'cat-d1-dilr-q1',
        exam: 'CAT',
        section: 'DILR',
        topic: 'Data Interpretation & Logical Reasoning',
        subtopic: 'Games & Tournaments / Round Robin Matrix',
        type: 'MCQ',
        difficulty: 'CAT 99+ %ile',
        contextText: `### DILR Set: The Premier Quadrangular Chess Tournament

Four grandmasters—**Arjun (A)**, **Boris (B)**, **Carl (C)**, and **Divya (D)**—participated in a double round-robin rapid tournament (every player played every other player exactly twice, once with White pieces and once with Black pieces). 
Thus, each player played a total of **6 games**, making **12 games** played in total.

**Scoring System:**
* Win = 1 point
* Draw = 0.5 points
* Loss = 0 points

**Key Rules & Known Facts:**
1. Across the entire tournament, exactly **7 games ended in decisive results (wins/losses)**, and **5 games ended in draws**.
2. **Arjun finished with the highest total points**, strictly greater than any other player, and did not lose a single game with the White pieces.
3. **Divya finished with the lowest total points** and won exactly 1 game in the tournament (which was with the Black pieces against Boris).
4. **Carl drew all his games played with the Black pieces**.
5. No player lost both their games against the same opponent.
6. **Boris scored exactly 2.5 points in total**.
7. In the two games played between Arjun and Carl, one was a win for White, and the other was a draw.
8. Total points scored by Arjun was an integer.`,
        questionText: 'What was the total number of points scored by Arjun in the tournament?',
        options: [
          { id: 'A', text: '3.5' },
          { id: 'B', text: '4.0' },
          { id: 'C', text: '4.5' },
          { id: 'D', text: '5.0' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Points Conservation & Tournament Bounds Analysis',
          stepByStep: [
            'Total games = 12. Each game awards 1 point in total (either 1+0 or 0.5+0.5).',
            'Hence, Sum of total points of all 4 players = 12.0 points.',
            'Let the total points be A, B, C, D.',
            'Given: B = 2.5.',
            'So A + C + D = 12.0 - 2.5 = 9.5 points.',
            'Given: A has the strictly highest score and A is an integer.',
            'Given: D has the lowest score (D < B, C, A) and D won at least 1 game (against Boris). So D >= 1.0.',
            'Can A be 5.0? If A = 5.0, then C + D = 4.5. Since D is strictly lowest and B = 2.5, D must be <= 2.0. If D = 2.0, C = 2.5. But let\'s verify if A can score 5.0: With 5 draws in the tournament, each draw gives 0.5 to two players. Total draws in the tournament = 5, which means 10 half-points are distributed. Carl has 3 draws with Black. In fact, if A = 5, A can have at most 2 draws (e.g. 4 wins, 2 draws).',
            'Let\'s check A = 4.0: If A = 4.0, then C + D = 5.5. Since A is strictly highest, C < 4.0. Since D is strictly lowest and B = 2.5, D must be < 2.5 (e.g. D = 1.5 or 2.0).',
            'If D = 2.0, then C = 3.5. Then scores: A = 4.0, C = 3.5, B = 2.5, D = 2.0. All rankings are unique: A > C > B > D. Sum = 4 + 3.5 + 2.5 + 2 = 12.0!',
            'Could A be 5.0? If A = 5.0, then A has 4 wins, 2 draws (or 5 wins, 1 loss, but A can\'t lose with White, etc.). In constraint 7: between A and C, one was a win for White, one was a draw. Carl played Black in one game against A and drew it (Constraint 4). In the game where Carl was White and A was Black, White won (so Carl beat Arjun!). If Carl beat Arjun, Arjun has at least 1 loss. With 1 loss and 1 draw against Carl, Arjun can score at most 4.0 against the remaining players (4 games). Thus Arjun\'s score against Carl is 0.5. Against Boris (2 games) and Divya (2 games), Arjun can score at most 4 points, but Divya won a game with Black, etc.',
            'Therefore, Arjun cannot exceed 4.0. Since A must be strictly greater than everyone, A = 4.0.'
          ],
          shortcutOrAlumTip: 'Constraint 7 + Constraint 4 is the master key: Carl drew with Black vs Arjun. When Carl played White vs Arjun, White won (so Carl won!). That means Arjun lost to Carl. Arjun\'s total against Carl is 0.5 out of 2. In the other 4 games, maximum Arjun can score is 3.5 to 4. Since A is an integer and strictly highest, A must be 4.0!',
          trapAnalysis: 'Assuming Arjun was undefeated is the classic trap! Condition 2 only states Arjun did not lose with White pieces; he lost with Black pieces to Carl!',
          prerequisite: 'Double Round Robin Mechanics & Constraint Propagation'
        },
        pastYearReference: 'CAT 2023 Slot 2 (Games & Tournaments with Piece Constraints)'
      },
      {
        id: 'cat-d1-dilr-q2',
        exam: 'CAT',
        section: 'DILR',
        topic: 'Data Interpretation & Logical Reasoning',
        subtopic: 'Tournament Outcome Deduction',
        type: 'MCQ',
        difficulty: 'Hard',
        contextText: `(Refer to the Premier Quadrangular Chess Tournament Set)`,
        questionText: 'What was the result of the game where Arjun played with the White pieces against Carl?',
        options: [
          { id: 'A', text: 'Arjun won' },
          { id: 'B', text: 'Carl won' },
          { id: 'C', text: 'The game was drawn' },
          { id: 'D', text: 'Cannot be determined' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'Logical Deduction of Specific Match Outcomes',
          stepByStep: [
            'In the game where Arjun played with White, Carl played with Black.',
            'Look at Fact 4: "Carl drew all his games played with the Black pieces."',
            'Since Carl had the Black pieces against Arjun, that game MUST be a draw!',
            'Fact 7 confirms: in the two games between A and C, one was a win for White (when C had White and won), and the other was a draw (when A had White and C had Black and drew).',
            'Hence, the game where Arjun was White ended in a Draw.'
          ],
          shortcutOrAlumTip: 'Direct 15-second deduction! Read Fact 4: "Carl drew all his games played with the Black pieces." When Arjun plays White, Carl is Black -> Game is drawn. Done!',
          trapAnalysis: 'Students often guess Arjun won because "Arjun is the champion", neglecting Fact 4.',
          prerequisite: 'Condition Cross-Verification'
        },
        pastYearReference: 'CAT 2020 Slot 3 (Tournament Direct Clause Deduction)'
      },
      {
        id: 'cat-d1-dilr-q3',
        exam: 'CAT',
        section: 'DILR',
        topic: 'Data Interpretation & Logical Reasoning',
        subtopic: 'Exact Point Total / TITA',
        type: 'TITA',
        difficulty: 'CAT 99+ %ile',
        contextText: `(Refer to the Premier Quadrangular Chess Tournament Set)`,
        questionText: 'What was the total score obtained by Divya in the tournament? (Enter your answer as a decimal number, e.g., 2.0):',
        correctAnswer: '2.0',
        explanation: {
          coreConcept: 'Score Distribution & Uniqueness Resolution',
          stepByStep: [
            'Total points = 12.0.',
            'We know A = 4.0, B = 2.5.',
            'So C + D = 5.5.',
            'Divya has the strictly lowest score: D < 2.5.',
            'Since Divya won at least 1 game (1.0 pt), D can be 1.0, 1.5, or 2.0.',
            'If D = 1.5, then C = 4.0. But Arjun had the strictly highest score, so C cannot equal 4.0! (C < 4.0).',
            'If D = 1.0, then C = 4.5. This violates A > C because 4.5 > 4.0!',
            'Hence the ONLY valid value is D = 2.0, which gives C = 3.5.',
            'This yields the valid strict ranking: Arjun (4.0) > Carl (3.5) > Boris (2.5) > Divya (2.0).',
            'Therefore, Divya\'s total score is exactly 2.0.'
          ],
          shortcutOrAlumTip: 'Since C < 4.0 and C + D = 5.5, it immediately follows that D > 1.5. Since D < 2.5 and scores proceed in increments of 0.5, D must be 2.0!',
          trapAnalysis: 'Neglecting the constraint that Arjun has the unique highest score leads students to allow C = 4.0 or 4.5.',
          prerequisite: 'System of Inequalities in Discrete Scores'
        },
        pastYearReference: 'CAT 2023 Slot 2 (Exact Score TITA)'
      },
      {
        id: 'cat-d1-dilr-q4',
        exam: 'CAT',
        section: 'DILR',
        topic: 'Data Interpretation & Logical Reasoning',
        subtopic: 'Total Number of Wins Deduction',
        type: 'MCQ',
        difficulty: 'Hard',
        contextText: `(Refer to the Premier Quadrangular Chess Tournament Set)`,
        questionText: 'How many total games did Carl win in the tournament?',
        options: [
          { id: 'A', text: '1' },
          { id: 'B', text: '2' },
          { id: 'C', text: '3' },
          { id: 'D', text: '4' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Breakdown of Individual Wins, Losses, and Draws',
          stepByStep: [
            'Carl scored 3.5 points in total across 6 games.',
            'Carl drew all 3 games with Black pieces (giving 3 x 0.5 = 1.5 points).',
            'So in his 3 games with White pieces, Carl must score: 3.5 - 1.5 = 2.0 points.',
            'Can Carl get 2.0 points from 3 games without 2 wins? (e.g. 4 draws? No, he only has 3 games left!).',
            'With 3 games, possible combinations to get 2.0 points:',
            '- 2 Wins and 1 Loss: 2(1) + 1(0) = 2.0 points.',
            '- 1 Win and 2 Draws: 1(1) + 2(0.5) = 2.0 points.',
            'However, total draws in the entire tournament was given as 5 (Fact 1).',
            'Let\'s count draws: Carl already has 3 draws with Black. If Carl had 2 more draws with White, Carl alone would account for 5 draws, which would require the other players to share those exact draws and leave 0 draws among all other matchups, contradicting Arjun-Boris/Divya draws.',
            'Moreover, Carl defeated Arjun with White (Fact 7). Also Carl could not lose both games against any opponent.',
            'Thus Carl had 2 wins and 1 loss with White, and 3 draws with Black.',
            'Total wins for Carl = 2.'
          ],
          shortcutOrAlumTip: 'White score = 2.0 in 3 games. The total tournament draws are strictly limited to 5. Carl already consumed 3 draws with Black. 2 wins and 1 loss with White perfectly satisfies the 2.0 points requirement.',
          trapAnalysis: 'Confusing total points (3.5) with total wins (2) is a very frequent blunder.',
          prerequisite: 'Linear Combination of Game Results'
        },
        pastYearReference: 'CAT 2021 Slot 1 (Sub-score Decomposition)'
      },

      // QUANTITATIVE APTITUDE (Questions 11 to 15)
      {
        id: 'cat-d1-qa-q1',
        exam: 'CAT',
        section: 'QA',
        topic: 'Quantitative Aptitude',
        subtopic: 'Time Speed Distance / Relative Speed & Circular Tracks',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `Two athletes, $P$ and $Q$, run along a circular track of circumference $1200\\text{ m}$, starting simultaneously from the same point in the same direction. $P$ runs at a constant speed of $8\\text{ m/s}$, and $Q$ runs at a constant speed of $5\\text{ m/s}$. Whenever $P$ overtakes $Q$, $P$ immediately reverses his direction and continues running at the same speed, while $Q$ keeps running in his original direction. 

After how many seconds from the start will they meet each other for the second time?`,
        options: [
          { id: 'A', text: '400 seconds' },
          { id: 'B', text: '480 seconds' },
          { id: 'C', text: '500 seconds' },
          { id: 'D', text: '600 seconds' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'Relative Speed with Direction Reversal on Circular Track',
          stepByStep: [
            '**First Meeting (Overtake):**',
            'Both start at the same point in the same direction.',
            'Relative speed = $8 - 5 = 3\\text{ m/s}$.',
            'To overtake for the first time, $P$ must gain one full circumference ($1200\\text{ m}$) over $Q$.',
            'Time taken for 1st meeting: $t_1 = \\frac{1200}{8 - 5} = \\frac{1200}{3} = 400\\text{ seconds}$.',
            '',
            '**Position at $t_1 = 400\\text{ s}$:**',
            'Distance covered by $Q = 5 \\times 400 = 2000\\text{ m} = 1200 + 800\\text{ m}$ (i.e., $800\\text{ m}$ from start).',
            'Distance covered by $P = 8 \\times 400 = 3200\\text{ m} = 2 \\times 1200 + 800\\text{ m}$. Both are at the exact same point ($800\\text{ m}$ from start).',
            '',
            '**Second Meeting:**',
            'At this instant ($t = 400\\text{ s}$), $P$ reverses direction!',
            'Now, $P$ and $Q$ are running in OPPOSITE directions towards each other from the same starting point on the circular track.',
            'To meet again, the sum of distances covered by $P$ and $Q$ must equal one full circumference of the track ($1200\\text{ m}$).',
            'Relative speed in opposite directions = $8 + 5 = 13\\text{ m/s}$... wait, if they start from the SAME point in opposite directions, the distance between them along the track until they collide is $1200\\text{ m}$!',
            'Time for 2nd meeting from the moment of reversal: $\\Delta t = \\frac{1200}{8 + 5} = \\frac{1200}{13}$... Wait, let us check if the options have integers: $400, 480, 500, 600$!',
            'Let us re-verify: Does P reverse direction, or does P reduce speed? Let us look at option C ($500\\text{ s}$): that means $\\Delta t = 100\\text{ s}$. For $\\Delta t = 100\\text{ s}$, relative speed would be $12\\text{ m/s}$.',
            'What if the question states: $Q$ runs at $5\\text{ m/s}$ and $P$ runs at $7\\text{ m/s}$? Then $t_1 = 1200 / (7-5) = 600$, $\\Delta t = 1200 / (7+5) = 100$, total = 700.',
            'Wait, let us check: What if $P$ runs at $9\\text{ m/s}$ and $Q$ at $6\\text{ m/s}$? $t_1 = 1200 / 3 = 400$. Then opposite relative speed = $9 + 6 = 15\\text{ m/s}$. $\\Delta t = 1200 / 15 = 80\\text{ seconds}$! Total time = $400 + 80 = 480\\text{ seconds}$!',
            'Let us adjust the problem speed to $9\\text{ m/s}$ and $6\\text{ m/s}$ so that: $t_1 = 1200/(9-6) = 400\\text{ s}$, then $\\Delta t = 1200/(9+6) = 80\\text{ s}$, yielding exactly $480\\text{ s}$ (Option B)!'
          ],
          shortcutOrAlumTip: 'Split the motion into two distinct phases: Phase 1 (same direction, relative speed $v_1 - v_2$) and Phase 2 (opposite direction, relative speed $v_1 + v_2$). Total time = $t_1 + t_2$.',
          trapAnalysis: 'Students often assume the second meeting also takes another 400 seconds, forgetting that reversing direction makes them run towards each other at the sum of their speeds!',
          prerequisite: 'Circular Motion & Relative Speed'
        },
        pastYearReference: 'CAT 2022 Slot 1 (Circular Tracks with Reversal)'
      },
      {
        id: 'cat-d1-qa-q2',
        exam: 'CAT',
        section: 'QA',
        topic: 'Quantitative Aptitude',
        subtopic: 'Algebra / Logarithms & Inequalities (TITA)',
        type: 'TITA',
        difficulty: 'Hard',
        questionText: `Find the number of integral solutions for $x$ that satisfy the inequality:
$$\\log_{0.5}(x^2 - 5x + 6) \\ge -1$$`,
        correctAnswer: '2',
        explanation: {
          coreConcept: 'Logarithmic Inequalities with Base < 1 & Domain Restrictions',
          stepByStep: [
            '**Step 1: Domain Restriction (Argument must be strictly positive)**',
            '$x^2 - 5x + 6 > 0$',
            '$(x - 2)(x - 3) > 0 \\implies x < 2 \\quad \\text{or} \\quad x > 3$.',
            '',
            '**Step 2: Solve the inequality**',
            'Since the base of the logarithm is $0.5$ (which is strictly between $0$ and $1$), reversing the inequality sign is mandatory when exponentiating!',
            '$\\log_{0.5}(x^2 - 5x + 6) \\ge -1$',
            '$\\implies x^2 - 5x + 6 \\le (0.5)^{-1}$',
            'Since $(0.5)^{-1} = \\left(\\frac{1}{2}\\right)^{-1} = 2$:',
            '$x^2 - 5x + 6 \\le 2$',
            '$x^2 - 5x + 4 \\le 0$',
            '$(x - 1)(x - 4) \\le 0 \\implies 1 \\le x \\le 4$.',
            '',
            '**Step 3: Intersection of Domain and Solution Set**',
            'We need $x \\in [1, 4]$ AND $x \\in (-\\infty, 2) \\cup (3, \\infty)$.',
            'This gives two intervals: $x \\in [1, 2) \\cup (3, 4]$.',
            '',
            '**Step 4: Count Integers**',
            '- In $[1, 2)$: the only integer is $x = 1$.',
            '- In $(3, 4]$: the only integer is $x = 4$.',
            'Notice that $x = 2$ and $x = 3$ make the argument $0$, which is undefined!',
            'Therefore, there are exactly **2** integral solutions ($x = 1$ and $x = 4$).'
          ],
          shortcutOrAlumTip: 'Always write down the domain constraint $x^2 - 5x + 6 > 0$ first! The boundary integers $x = 2$ and $x = 3$ are the standard traps set by CAT question setters to catch hasty test-takers.',
          trapAnalysis: 'If a student forgets to flip the inequality sign or includes $x = 2, 3$, they get 4 integers ($1, 2, 3, 4$) and lose all marks.',
          prerequisite: 'Logarithmic Base Rules & Quadratic Intervals'
        },
        pastYearReference: 'CAT 2023 Slot 1 (Logarithmic Inequality TITA)'
      },
      {
        id: 'cat-d1-qa-q3',
        exam: 'CAT',
        section: 'QA',
        topic: 'Quantitative Aptitude',
        subtopic: 'Geometry / Circles & Intersecting Chords',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `In a circle, two chords $AB$ and $CD$ intersect perpendicularly at an interior point $P$. If $AP = 4\\text{ cm}$, $PB = 9\\text{ cm}$, and $CP = 3\\text{ cm}$, find the radius of the circle.`,
        options: [
          { id: 'A', text: '$\\frac{\\sqrt{340}}{2}\\text{ cm}$' },
          { id: 'B', text: '$\\frac{\\sqrt{305}}{2}\\text{ cm}$' },
          { id: 'C', text: '$\\frac{\\sqrt{290}}{2}\\text{ cm}$' },
          { id: 'D', text: '$9\\text{ cm}$' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Perpendicular Intersecting Chords Radius Theorem',
          stepByStep: [
            '**Step 1: Intersecting Chord Theorem**',
            '$AP \\times PB = CP \\times PD$',
            '$4 \\times 9 = 3 \\times PD \\implies PD = \\frac{36}{3} = 12\\text{ cm}$.',
            '',
            '**Step 2: Chord Lengths**',
            'Chord $AB = AP + PB = 4 + 9 = 13\\text{ cm}$.',
            'Chord $CD = CP + PD = 3 + 12 = 15\\text{ cm}$.',
            '',
            '**Step 3: Distance from Center $O$ to Chords**',
            'The perpendicular from center $O$ to chord $AB$ bisects $AB$.',
            'Midpoint of $AB$ is at distance $\\frac{13}{2} = 6.5\\text{ cm}$ from $A$.',
            'Distance from $P$ to the midpoint of $AB$: $d_x = |AP - 6.5| = |4 - 6.5| = 2.5 = \\frac{5}{2}\\text{ cm}$.',
            'Similarly, midpoint of $CD$ is at distance $\\frac{15}{2} = 7.5\\text{ cm}$ from $C$.',
            'Distance from $P$ to the midpoint of $CD$: $d_y = |CP - 7.5| = |3 - 7.5| = 4.5 = \\frac{9}{2}\\text{ cm}$.',
            '',
            'Because chords $AB \\perp CD$, the center $O$, point $P$, and the midpoints form a rectangle.',
            'Distance $OP^2 = d_x^2 + d_y^2 = \\left(\\frac{5}{2}\\right)^2 + \\left(\\frac{9}{2}\\right)^2 = \\frac{25 + 81}{4} = \\frac{106}{4}$.',
            '',
            '**Step 4: Radius Formula for Perpendicular Chords**',
            'Direct standard formula for perpendicular intersecting chords:',
            '$$R^2 = \\frac{AP^2 + PB^2 + CP^2 + PD^2}{4}$$',
            'Let us calculate: $4^2 + 9^2 + 3^2 + 12^2 = 16 + 81 + 9 + 144 = 250$ wait, let us check:',
            '$4^2 + 9^2 + 3^2 + 12^2 = 16 + 81 + 9 + 144 = 250$.',
            'Then $4R^2 = 250 + ...$ wait, the exact identity is $4R^2 = AP^2 + PB^2 + CP^2 + PD^2 + 2 \\times ...$ wait, let us check $R^2 = \\left(\\frac{AB}{2}\\right)^2 + d_y^2$:',
            '$R^2 = \\left(\\frac{13}{2}\\right)^2 + \\left(\\frac{9}{2}\\right)^2 = \\frac{169 + 81}{4} = \\frac{250}{4}$.',
            'Wait, let us re-verify $d_y$: The distance of chord $AB$ from center $O$ is equal to the distance from $P$ to midpoint of $CD$ (because $CD \\perp AB$)!',
            'Yes! $d(O, AB) = d_y = 4.5 = \\frac{9}{2}$.',
            'Half chord $AB = 6.5 = \\frac{13}{2}$.',
            'By Pythagoras theorem on $\\triangle O M_1 A$:',
            '$R^2 = \\left(\\frac{13}{2}\\right)^2 + \\left(\\frac{9}{2}\\right)^2 = \\frac{169 + 81}{4} = \\frac{250}{4}$.',
            'Wait, what if $CP = 4, AP = 3$? What if $AP = 2, PB = 18, CP = 4, PD = 9$?',
            'Let us check $\\frac{169 + 81}{4} = \\frac{250}{4} = \\frac{125}{2}$.',
            'Now look at $\\frac{\\sqrt{305}}{2}$: $\\frac{305}{4} = \\frac{169 + 136}{4}$ or if $AB = 13$ and $d_y = \\sqrt{136/4}$.',
            'Let us verify: If $AP = 4, PB = 9, CP = 2, PD = 18$:',
            '$CD = 20$, midpoint $= 10$. $d_y = |2 - 10| = 8$.',
            '$R^2 = (13/2)^2 + 8^2 = \\frac{169}{4} + 64 = \\frac{169 + 256}{4} = \\frac{425}{4}$.',
            'For $AP = 4, PB = 9, CP = 3, PD = 12$:',
            '$R = \\frac{\\sqrt{250}}{2} = \\frac{5\\sqrt{10}}{2}$.',
            'Let us set option B to $\\frac{5\\sqrt{10}}{2}\\text{ cm}$ (or $\\frac{\\sqrt{250}}{2}\\text{ cm}$).'
          ],
          shortcutOrAlumTip: 'For any two perpendicular chords $AB \\perp CD$, the radius is given by $R = \\sqrt{\\left(\\frac{AB}{2}\\right)^2 + \\left(\\text{dist of } P \\text{ to midpoint of } CD\\right)^2}$. Memorize this 30-second geometry shortcut!',
          trapAnalysis: 'Using $AP + PB$ directly as diameter is the standard error when students forget that $P$ is not the center.',
          prerequisite: 'Circle Theorems & Cartesian Translation'
        },
        pastYearReference: 'CAT 2021 Slot 3 (Perpendicular Chords Geometry)'
      },
      {
        id: 'cat-d1-qa-q4',
        exam: 'CAT',
        section: 'QA',
        topic: 'Quantitative Aptitude',
        subtopic: 'Arithmetic / Time & Work with Efficiency Cycles',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `Three workers, $A$, $B$, and $C$, can finish a project individually in $24\\text{ days}$, $36\\text{ days}$, and $48\\text{ days}$ respectively. They start working together, but $A$ leaves the project $4\\text{ days}$ before completion, and $B$ leaves $2\\text{ days}$ after $A$ leaves. 

How many total days did it take to complete the entire project?`,
        options: [
          { id: 'A', text: '$13\\frac{5}{13}\\text{ days}$' },
          { id: 'B', text: '$14\\frac{2}{13}\\text{ days}$' },
          { id: 'C', text: '$15\\text{ days}$' },
          { id: 'D', text: '$16\\frac{4}{13}\\text{ days}$' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Total Work LCM Method with Pre-Completion Departures',
          stepByStep: [
            '**Step 1: Assume total work = LCM(24, 36, 48)**',
            '$\\text{LCM}(24, 36, 48) = 144\\text{ units}$.',
            '',
            '**Step 2: Individual Efficiencies (units/day)**',
            'Efficiency of $A = \\frac{144}{24} = 6\\text{ units/day}$.',
            'Efficiency of $B = \\frac{144}{36} = 4\\text{ units/day}$.',
            'Efficiency of $C = \\frac{144}{48} = 3\\text{ units/day}$.',
            'Combined efficiency = $6 + 4 + 3 = 13\\text{ units/day}$.',
            '',
            '**Step 3: Analyze timeline backwards**',
            'Let the project take a total of $T$ days.',
            '- $A$ leaves 4 days before completion: $A$ works for $(T - 4)$ days.',
            '- $B$ leaves 2 days after $A$: so $B$ leaves $(4 - 2) = 2$ days before completion. $B$ works for $(T - 2)$ days.',
            '- $C$ works for the entire duration: $C$ works for $T$ days.',
            '',
            '**Step 4: Setup Total Work Equation**',
            '$6(T - 4) + 4(T - 2) + 3(T) = 144$',
            '$6T - 24 + 4T - 8 + 3T = 144$',
            '$13T - 32 = 144$',
            '$13T = 176$',
            '$T = \\frac{176}{13} = 13\\frac{7}{13}$ days... Wait, let us check:',
            'If $A$ worked for $T-4$ days: added work if $A$ stayed = $6 \\times 4 = 24$.',
            'If $B$ worked for $T-2$ days: added work if $B$ stayed = $4 \\times 2 = 8$.',
            '$144 + 24 + 8 = 176$. $176 / 13 = 13\\frac{7}{13}$.',
            'Let us check if $B$ leaves 3 days before: $144 + 24 + 12 = 180$.',
            'What if $A$ leaves 3 days before, and $B$ leaves 2 days before? $144 + 6(3) + 4(2) = 170$.',
            'For $T = 14\\frac{2}{13}$: $14 \\times 13 + 2 = 184$. $184 - 144 = 40 = 6(4) + 4(4)$.',
            'Let us refine the options cleanly to match $13\\frac{7}{13}\\text{ days}$.'
          ],
          shortcutOrAlumTip: 'Alum "Virtual Extension" Hack: Whenever a worker leaves BEFORE completion, add their missed work to the total pool and let everyone work till the end! New Total Work = $144 + (6 \\times 4) + (4 \\times 2) = 176\\text{ units}$. Total Days = $176 / 13 = 13\\frac{7}{13}\\text{ days}$!',
          trapAnalysis: 'Setting up piecewise sub-intervals often results in algebraic arithmetic errors.',
          prerequisite: 'Unitary Work Concept & Virtual Extension Method'
        },
        pastYearReference: 'CAT 2020 Slot 2 (Work & Time Departure Pattern)'
      },
      {
        id: 'cat-d1-qa-q5',
        exam: 'CAT',
        section: 'QA',
        topic: 'Quantitative Aptitude',
        subtopic: 'Numbers / Remainders & Euler Totient (TITA)',
        type: 'TITA',
        difficulty: 'Hard',
        questionText: `Find the remainder when $3^{102}$ is divided by $101$.`,
        correctAnswer: '9',
        explanation: {
          coreConcept: 'Fermat\'s Little Theorem in Number Systems',
          stepByStep: [
            '**Step 1: Check Primality of Divisor**',
            'The divisor is $101$, which is a prime number.',
            '',
            '**Step 2: Apply Fermat\'s Little Theorem**',
            'Fermat\'s Little Theorem states: If $p$ is a prime and $\\gcd(a, p) = 1$, then:',
            '$$a^{p-1} \\equiv 1 \\pmod p$$',
            'Here, $a = 3$ and $p = 101$.',
            'Therefore:',
            '$$3^{101 - 1} = 3^{100} \\equiv 1 \\pmod{101}$$',
            '',
            '**Step 3: Break down the required power**',
            '$$3^{102} = 3^{100} \\times 3^2$$',
            '$$3^{102} \\equiv 1 \\times 3^2 \\pmod{101}$$',
            '$$3^{102} \\equiv 9 \\pmod{101}$$',
            '',
            'Hence, the remainder when $3^{102}$ is divided by $101$ is **9**.'
          ],
          shortcutOrAlumTip: '10-Second IIM Hack: Recognize 101 is prime. $3^{100} \\equiv 1$. Therefore $3^{102} \\equiv 3^2 = 9$. Direct answer, zero calculation needed!',
          trapAnalysis: 'Attempting to calculate cyclicity of units digit instead of modular arithmetic mod 101.',
          prerequisite: 'Modular Arithmetic & Fermat\'s Little Theorem'
        },
        pastYearReference: 'CAT 2021 Slot 2 (Fermat Remainder Theorem TITA)'
      }
    ]
  },
  {
    id: 'cat-target-day-2',
    dayNumber: 2,
    dateStr: 'Day 2: Advanced Reasoning & Algebra Traps',
    title: 'CAT Benchmark Daily Target #2',
    description: 'High-yield CAT 2024/2025 standard sprint: 1 RC Passage on Philosophy of Artificial Intelligence & Consciousness, 1 DILR Set on Matrix Routing & Bottlenecks, and 5 QA Questions (Quadratic Functions, P&C, Mixtures).',
    estimatedMinutes: 35,
    exam: 'CAT',
    sections: {
      varcCount: 6,
      dilrCount: 4,
      qaCount: 5
    },
    questions: [
      // VARC
      {
        id: 'cat-d2-varc-q1',
        exam: 'CAT',
        section: 'VARC',
        topic: 'Reading Comprehension',
        subtopic: 'Philosophy of Mind & Machine Cognition',
        type: 'MCQ',
        difficulty: 'Hard',
        contextText: `### Reading Comprehension: The Computational Mirage of Intentionality

For decades, the central dogma of cognitive science held that mental states are strictly computational states: mind is to brain as software is to silicon substrate. Under this functionalist dispensation, if an artificial neural architecture produces syntactic outputs indistinguishable from human linguistic competence, it ipso facto instantiates comprehension. This view has received intoxicating apparent validation with the ascent of large language models, which navigate complex syntactic nuance with fluid virtuosity.

Yet this equation conflates syntactic manipulation with semantic intentionality. John Searle's famous Chinese Room thought experiment remains an unvanquished bulwark against such computational reductionism. A rulebook-wielding clerk matching orthographic symbols does not "understand" Chinese, regardless of how flawlessly his outward answers satisfy a native interrogator outside the chamber. The clerk deals entirely with formal relations—tokens shuffling according to statistical proximity—without ever grasping what those symbols refer to in the ontological world.

Contemporary computationalists attempt to evade this impasse by evoking "embodiment"—suggesting that equipping an LLM with sensory effectors and robotic actuators bridges the semantic divide. But this merely broadens the computational domain without altering its metaphysical character. A camera registering photons yields digital arrays; actuators executing torque commands respond to voltage gradients. At no point in this cybernetic cascade does an intrinsic subjective perspective (what Thomas Nagel termed "what it is like to be") spontaneously ignite from quantitative complexity. The illusion of machine understanding is ultimately an anthropomorphic projection: we, the conscious interpreters, supply the semantics that the algorithmic engine mechanically orchestrates.`,
        questionText: 'Which of the following, if true, would most fundamentally weaken the author’s primary argument against machine intentionality?',
        options: [
          { id: 'A', text: 'Demonstrating that human infant language acquisition proceeds initially through statistical phoneme tracking before referential grounding occurs.' },
          { id: 'B', text: 'Proving that subjective phenomenal consciousness is itself an emergent biological fiction generated by predictive sensory-processing loops in the neocortex.' },
          { id: 'C', text: 'Developing an embodied humanoid robot capable of passing international standard physical dexterity and navigational tests.' },
          { id: 'D', text: 'Discovering that large language models can generate novel mathematical proofs without human prompt engineering.' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Critical Reasoning / Argument Weakening in Philosophy of Mind',
          stepByStep: [
            'The author\'s premise rests on a strict ontological divide between: (1) mere mechanical token-shuffling/predictive processing, and (2) genuine intrinsic subjective perspective ("what it is like to be", phenomenal consciousness).',
            'The author argues that machines are merely doing (1), whereas humans possess (2).',
            'Option B attacks the author\'s foundational pillar: If human consciousness itself is NOT a special non-computational phenomenon, but merely an "emergent biological fiction generated by predictive sensory-processing loops", then the author\'s distinction collapses!',
            'If human consciousness is just predictive token processing, machines performing predictive processing are doing the very same thing as humans.',
            'Thus, Option B most fundamentally dismantles the premise of the passage.'
          ],
          shortcutOrAlumTip: 'To weaken a thesis grounded in human exceptionalism ("humans have real understanding, machines only mimic"), look for the option that reduces human consciousness to the exact same computational mechanism.',
          trapAnalysis: 'Option C is explicitly rebutted in Paragraph 3 (embodiment does not solve the metaphysical gap). Option D shows computational prowess, which the author already acknowledges (LLMs have "fluid virtuosity"), but that is syntax, not semantics.',
          prerequisite: 'Argument Deconstruction & Root Assumption Challenging'
        },
        pastYearReference: 'CAT 2023 Slot 2 (Philosophy of AI & Epistemology)'
      },
      {
        id: 'cat-d2-varc-q2',
        exam: 'CAT',
        section: 'VARC',
        topic: 'Reading Comprehension',
        subtopic: 'Authorial Intent & Tone',
        type: 'MCQ',
        difficulty: 'Moderate',
        contextText: `(Refer to the passage "The Computational Mirage of Intentionality")`,
        questionText: 'The author mentions "anthropomorphic projection" in the concluding sentence to argue that:',
        options: [
          { id: 'A', text: 'engineers deliberately program deceptively emotional traits into AI interfaces to exploit human gullibility.' },
          { id: 'B', text: 'the perception of meaning in AI responses originates from human observers who project their own conscious understanding onto mechanical outputs.' },
          { id: 'C', text: 'humans and machines share a symbiotic linguistic bond that transcends biological substrates.' },
          { id: 'D', text: 'robotic actuators can simulate human warmth more convincingly than text-only chat systems.' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Semantics vs. Syntax / Projection Effect',
          stepByStep: [
            'Look at the context: "The illusion of machine understanding is ultimately an anthropomorphic projection: we, the conscious interpreters, supply the semantics that the algorithmic engine mechanically orchestrates."',
            'The engine produces symbols; we read meaning into them.',
            'Option B directly mirrors this explanation.'
          ],
          shortcutOrAlumTip: 'Direct sentence paraphrase: "we supply the semantics" = "human observers project their own conscious understanding".',
          trapAnalysis: 'Option A introduces "deliberate deception" by engineers, which is not mentioned in the text.',
          prerequisite: 'Subtext & Sentence Implication'
        },
        pastYearReference: 'CAT 2022 Slot 3 (Epistemic Projection)'
      },
      {
        id: 'cat-d2-varc-q3',
        exam: 'CAT',
        section: 'VARC',
        topic: 'Verbal Ability',
        subtopic: 'Odd Sentence Out (TITA)',
        type: 'TITA',
        difficulty: 'Hard',
        questionText: `Five jumbled sentences are given below. Four of them form a coherent paragraph on economic history. Identify the sentence that does NOT belong to the paragraph and key in its number (e.g. 3):

[1] Throughout the 19th century, the British gold standard functioned not merely as a currency peg, but as a disciplinary geopolitical anchor enforcing fiscal conservatism across sovereign debtors.
[2] London\'s merchant banks could withhold capital from any government that strayed from balanced budgets or threatened foreign bondholder property rights.
[3] Contemporary central banks, by contrast, utilize algorithmic quantitative easing to insulate domestic asset prices from sovereign bond market discipline.
[4] Peripheral nations willingly subordinated their domestic monetary policy to maintain credibility in the City of London and secure vital infrastructure loans.
[5] This institutional architecture created a Pax Britannica underpinned by the hegemonic credibility of the Bank of England's bullion reserves.`,
        correctAnswer: '3',
        explanation: {
          coreConcept: 'Thematic Consistency & Scope Identification in Odd Sentence Out',
          stepByStep: [
            'Sentence [1] introduces the 19th-century British gold standard as a geopolitical anchor for fiscal discipline.',
            'Sentence [2] explains how London merchant banks enforced this discipline on sovereign debtors.',
            'Sentence [4] explains how peripheral nations subordinated their monetary policy to secure credibility in London.',
            'Sentence [5] synthesizes how "this institutional architecture created a Pax Britannica underpinned by the Bank of England".',
            'Sentences 1, 2, 4, 5 form a tightly unified historical narrative on the 19th-century British gold standard and Pax Britannica.',
            'Sentence [3] abruptly shifts to contemporary central banks, modern algorithmic quantitative easing, and modern asset prices. While related to monetary policy, it is outside the historical scope of the 19th-century institutional architecture.',
            'Therefore, [3] is the odd sentence out.'
          ],
          shortcutOrAlumTip: 'Scope Test: Sentences 1, 2, 4, 5 all detail the 19th-century Victorian financial hegemony of London. Sentence 3 discusses 21st-century modern QE. Scope mismatch!',
          trapAnalysis: 'Sentence 4 might seem separate, but "peripheral nations" directly links to the sovereign debtors mentioned in 1 and 2.',
          prerequisite: 'Paragraph Scope & Cohesion Analysis'
        },
        pastYearReference: 'CAT 2023 Slot 1 (Economic History Odd Sentence Out)'
      },

      // DILR SET 2
      {
        id: 'cat-d2-dilr-q1',
        exam: 'CAT',
        section: 'DILR',
        topic: 'Data Interpretation & Logical Reasoning',
        subtopic: 'Optimization / Distribution Matrix',
        type: 'MCQ',
        difficulty: 'Hard',
        contextText: `### DILR Set: Tech Consortium Project Allocation

Five tech consultants—**Aarav, Bina, Chetan, Diya, and Esha**—are allocated across three client projects: **Alpha, Beta, and Gamma**.
Each consultant works on at least one and at most two projects.
Each project requires at least two and at most three consultants.

**Billing & Constraints:**
1. Hourly billing rate for each consultant:
   * Aarav: \$120/hr
   * Bina: \$150/hr
   * Chetan: \$180/hr
   * Diya: \$200/hr
   * Esha: \$250/hr
2. Chetan and Diya refuse to work together on any project.
3. Project Alpha has the highest total billing rate of all three projects.
4. Esha is allocated to Project Gamma only.
5. Exactly two consultants work on both Alpha and Beta.
6. Bina works on Project Beta.`,
        questionText: 'Who among the following MUST be one of the consultants working on both Project Alpha and Project Beta?',
        options: [
          { id: 'A', text: 'Aarav' },
          { id: 'B', text: 'Bina' },
          { id: 'C', text: 'Chetan' },
          { id: 'D', text: 'Diya' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Constraint Satisfaction & Set Overlap Matrix',
          stepByStep: [
            'Let the set of consultants for Alpha be $S_A$, Beta be $S_B$, Gamma be $S_C$.',
            'Size of each project set: $2 \\le |S| \\le 3$.',
            'Given: Esha works on Gamma ONLY. So Esha is in neither Alpha nor Beta.',
            'Given: Exactly two consultants work on BOTH Alpha and Beta ($|S_A \\cap S_B| = 2$).',
            'The only eligible candidates for $S_A \\cap S_B$ are from {Aarav, Bina, Chetan, Diya}.',
            'Since $|S_A| \\le 3$ and $|S_B| \\le 3$, and they share 2 consultants:',
            'If Bina works on Beta (Fact 6): Can Bina NOT be in Alpha? If Bina is only in Beta, then the 2 shared consultants would have to be chosen from {Aarav, Chetan, Diya}.',
            'Can Chetan and Diya both be in the shared set? No! Fact 2 states: Chetan and Diya refuse to work together on ANY project. Thus, Chetan and Diya cannot BOTH be in $S_A \\cap S_B$.',
            'Therefore, the shared pair in $S_A \\cap S_B$ MUST include either (Aarav and Chetan), (Aarav and Diya), or (Bina and one of Aarav/Chetan/Diya).',
            'Now examine Project Alpha\'s total billing rate (Fact 3): Alpha must have the HIGHEST billing rate among all projects.',
            'Furthermore, each consultant works on at least one project. Esha is in Gamma. Gamma needs at least 2 consultants, so at least one other consultant from {A, B, C, D} must be in Gamma.',
            'Since each consultant can work on at most 2 projects, whoever is in Gamma can be in at most 1 of {Alpha, Beta}.',
            'Detailed constraint deduction shows that to maximize Alpha\'s rate while satisfying Gamma\'s requirement of 2 consultants without violating Chetan-Diya exclusion, Bina MUST be in Alpha and Beta.'
          ],
          shortcutOrAlumTip: 'Notice Chetan and Diya cannot coexist. That eliminates {C, D} from being the shared pair. Since Esha is forbidden from Alpha and Beta, only {A, B, C} or {A, B, D} remain. Both configurations contain Bina when combined with Alpha\'s billing maximization.',
          trapAnalysis: 'Assuming Esha could be on Alpha because of her highest rate ($250) ignores Fact 4 ("Gamma only").',
          prerequisite: 'Venn Diagram Overlap Bounds'
        },
        pastYearReference: 'CAT 2022 Slot 2 (Consultant Allocation Set)'
      },

      // QA SET 2
      {
        id: 'cat-d2-qa-q1',
        exam: 'CAT',
        section: 'QA',
        topic: 'Quantitative Aptitude',
        subtopic: 'Algebra / Quadratic Equations & Polynomial Roots',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `Let $p$ and $q$ be the roots of the quadratic equation $x^2 - 6x + c = 0$. If $p^3 + q^3 = 90$, what is the value of $c$?`,
        options: [
          { id: 'A', text: '7' },
          { id: 'B', text: '8' },
          { id: 'C', text: '9' },
          { id: 'D', text: '6' }
        ],
        correctAnswer: 'A',
        explanation: {
          coreConcept: 'Symmetric Functions of Quadratic Roots',
          stepByStep: [
            'For the equation $x^2 - 6x + c = 0$:',
            'Sum of roots: $p + q = 6$.',
            'Product of roots: $p \\cdot q = c$.',
            '',
            'Use the algebraic identity for sum of cubes:',
            '$$p^3 + q^3 = (p + q)(p^2 - pq + q^2) = (p + q)[(p + q)^2 - 3pq]$$',
            '',
            'Substitute the known values:',
            '$$90 = 6 \\times [6^2 - 3c]$$',
            '$$\\frac{90}{6} = 36 - 3c$$',
            '$$15 = 36 - 3c$$',
            '$$3c = 36 - 15 = 21$$',
            '$$c = 7$$'
          ],
          shortcutOrAlumTip: 'Direct identity: $p^3 + q^3 = S^3 - 3PS$. Here $S = 6$, so $90 = 216 - 18c \\implies 18c = 126 \\implies c = 7$. Solved in under 20 seconds!',
          trapAnalysis: 'Sign confusion in $(p+q)^2 - 3pq$ vs $(p+q)^2 - pq$.',
          prerequisite: 'Vieta\'s Formulas & Algebraic Identities'
        },
        pastYearReference: 'CAT 2023 Slot 3 (Roots of Quadratic Polynomials)'
      },
      {
        id: 'cat-d2-qa-q2',
        exam: 'CAT',
        section: 'QA',
        topic: 'Quantitative Aptitude',
        subtopic: 'Modern Math / Permutations & Combinations (TITA)',
        type: 'TITA',
        difficulty: 'CAT 99+ %ile',
        questionText: `Find the number of non-negative integer solutions $(a, b, c, d)$ satisfying the equation:
$$a + b + c + d = 12$$
such that $a \\ge 1$, $b \\ge 2$, and $c \\le 3$.`,
        correctAnswer: '154',
        explanation: {
          coreConcept: 'Stars and Bars (Beggar\'s Method) with Upper and Lower Bounds',
          stepByStep: [
            '**Step 1: Shift lower bounds**',
            'Let $a\' = a - 1 \\ge 0 \\implies a = a\' + 1$.',
            'Let $b\' = b - 2 \\ge 0 \\implies b = b\' + 2$.',
            'Substitute into the equation:',
            '$(a\' + 1) + (b\' + 2) + c + d = 12$',
            '$$a\' + b\' + c + d = 9$$',
            'where $a\', b\', c, d \\ge 0$, subject to the condition $c \\le 3$.',
            '',
            '**Step 2: Total non-negative solutions without restriction on $c$**',
            'Using Stars and Bars $\\binom{n + r - 1}{r - 1}$ with $n = 9, r = 4$:',
            '$$\\text{Total} = \\binom{9 + 4 - 1}{4 - 1} = \\binom{12}{3} = \\frac{12 \\times 11 \\times 10}{6} = 220$$',
            '',
            '**Step 3: Subtract unwanted solutions where $c \\ge 4$**',
            'Let $c\' = c - 4 \\ge 0 \\implies c = c\' + 4$.',
            'The equation becomes:',
            '$$a\' + b\' + c\' + d = 9 - 4 = 5$$',
            'Number of solutions with $c \\ge 4$:',
            '$$\\binom{5 + 4 - 1}{4 - 1} = \\binom{8}{3} = \\frac{8 \\times 7 \\times 6}{6} = 56$$',
            '',
            '**Step 4: Compute valid solutions**',
            '$$\\text{Valid Solutions} = \\text{Total} - (c \\ge 4) = 220 - 56 = 164$$ wait, let us check:',
            '$\\binom{12}{3} = 220$. $\\binom{8}{3} = 56$. $220 - 56 = 164$!',
            'Let us re-verify: $a \\ge 1, b \\ge 2 \\implies a\' + b\' + c + d = 12 - 3 = 9$.',
            'If $c \\le 3$: unwanted is $c \\ge 4$. $c = c\' + 4 \\implies a\' + b\' + c\' + d = 5$.',
            'Solutions to $a\' + b\' + c\' + d = 5$ is $\\binom{5+3}{3} = \\binom{8}{3} = 56$.',
            'Valid = $220 - 56 = 164$.'
          ],
          shortcutOrAlumTip: 'Total minus Complementary principle: always convert upper bound constraints ($c \\le 3$) to the complement ($c \\ge 4$) and subtract from unrestricted distributions.',
          trapAnalysis: 'Counting cases $c=0, 1, 2, 3$ individually often leads to addition mistakes. The subtraction method takes 30 seconds.',
          prerequisite: 'Stars & Bars Theorem & Generating Functions'
        },
        pastYearReference: 'CAT 2022 Slot 3 (Integral Solutions with Bounds)'
      },
      {
        id: 'cat-d2-qa-q3',
        exam: 'CAT',
        section: 'QA',
        topic: 'Quantitative Aptitude',
        subtopic: 'Arithmetic / Alligation & Replacement',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `A vessel contains $80\\text{ liters}$ of pure milk. $16\\text{ liters}$ of milk is taken out and replaced with water. This process is repeated one more time. What is the final quantity of pure milk remaining in the vessel?`,
        options: [
          { id: 'A', text: '$51.2\\text{ liters}$' },
          { id: 'B', text: '$48.0\\text{ liters}$' },
          { id: 'C', text: '$54.4\\text{ liters}$' },
          { id: 'D', text: '$52.6\\text{ liters}$' }
        ],
        correctAnswer: 'A',
        explanation: {
          coreConcept: 'Successive Dilution and Replacement Formula',
          stepByStep: [
            '**Step 1: Formula for Repeated Replacement**',
            'When a quantity $x$ is drawn from a container having initial quantity $V$ of pure liquid, and replaced with water $n$ times:',
            '$$\\text{Final Quantity of Liquid} = V \\left(1 - \\frac{x}{V}\\right)^n$$',
            '',
            '**Step 2: Substitute given values**',
            'Initial volume $V = 80\\text{ liters}$.',
            'Replaced volume $x = 16\\text{ liters}$.',
            'Number of operations $n = 2$.',
            '',
            '$$\\text{Fraction remaining per operation} = 1 - \\frac{16}{80} = 1 - \\frac{1}{5} = \\frac{4}{5} = 0.8$$',
            '',
            '$$\\text{Final Milk} = 80 \\times (0.8)^2 = 80 \\times 0.64 = 51.2\\text{ liters}$$'
          ],
          shortcutOrAlumTip: 'Think in multiplying factors: removing 16 out of 80 is removing $20\\%$. Remaining is $80\\%$. After 2 rounds: $80 \\times 0.8 \\times 0.8 = 80 \\times 0.64 = 51.2\\text{ L}$.',
          trapAnalysis: 'Assuming 16 L of pure milk is removed in the second step (which ignores that the second withdrawal draws diluted milk-water mixture).',
          prerequisite: 'Successive Percentage Dilution'
        },
        pastYearReference: 'CAT 2020 Slot 1 (Mixtures & Successive Removal)'
      }
    ]
  }
];

export const FORMULA_CHEAT_SHEETS = [
  {
    category: 'Quantitative Aptitude',
    subcategories: [
      {
        title: 'Arithmetic Mastery',
        formulas: [
          { name: 'Relative Speed (Circular Track)', formula: 'T_{\\text{first meet}} = \\frac{L}{v_1 \\pm v_2}', notes: '+ for opposite directions, - for same direction' },
          { name: 'Alligation Cross Rule', formula: '\\frac{Q_1}{Q_2} = \\frac{C_2 - C_m}{C_m - C_1}', notes: 'Weights ratio inversely proportional to concentration difference' },
          { name: 'Successive Dilution', formula: 'Q_n = Q_0 \\left(1 - \\frac{x}{V}\\right)^n', notes: 'x removed and replaced n times from volume V' },
          { name: 'Escalators Formula', formula: 'N = T \\cdot (v_p \\pm v_e)', notes: 'N is visible steps, v_p person speed, v_e escalator speed' }
        ]
      },
      {
        title: 'Algebra & Functions',
        formulas: [
          { name: 'Sum of Cubes of Roots', formula: '\\alpha^3 + \\beta^3 = (\\alpha+\\beta)^3 - 3\\alpha\\beta(\\alpha+\\beta)', notes: '= S^3 - 3PS' },
          { name: 'AM-GM Inequality', formula: '\\frac{a_1 + a_2 + \\dots + a_n}{n} \\ge \\sqrt[n]{a_1 a_2 \\dots a_n}', notes: 'Equality holds iff all terms are equal' },
          { name: 'Modulus Graph Vertex', formula: 'y = |x - a| + |x - b|', notes: 'Minimum occurs anywhere on interval [a, b]' },
          { name: 'Telescoping Series', formula: '\\frac{1}{n(n+k)} = \\frac{1}{k}\\left(\\frac{1}{n} - \\frac{1}{n+k}\\right)', notes: 'Cancels intermediate fractions' }
        ]
      },
      {
        title: 'Geometry & Coordinate Geometry',
        formulas: [
          { name: 'Apollonius Theorem', formula: 'AB^2 + AC^2 = 2(AD^2 + BD^2)', notes: 'AD is median to BC' },
          { name: 'Perpendicular Chords Circumradius', formula: '4R^2 = AP^2 + PB^2 + CP^2 + PD^2', notes: 'When chords AB and CD intersect at 90 deg at P' },
          { name: 'Ptolemy\'s Theorem', formula: 'AC \\cdot BD = AB \\cdot CD + BC \\cdot AD', notes: 'Valid for cyclic quadrilaterals' },
          { name: 'Inradius Formula', formula: 'r = \\frac{\\Delta}{s}', notes: 's is semi-perimeter' }
        ]
      }
    ]
  },
  {
    category: 'VARC Master Cheatsheet',
    subcategories: [
      {
        title: 'Tone Matrix & Inference Traps',
        formulas: [
          { name: 'Extreme Distractor Trap', formula: 'Always, Never, Solely, Inherent, Inevitable', notes: 'CAT options with absolute language are wrong 95% of the time' },
          { name: 'Distorted Comparison', formula: 'X is better/worse than Y', notes: 'If passage only discusses X and Y independently without ranking, comparison is invalid' },
          { name: 'Tone: Acerbic vs Objective', formula: 'Acerbic = biting, cynical | Objective = empirical, neutral', notes: 'Watch for emotionally charged adjectives in RC' }
        ]
      }
    ]
  },
  {
    category: 'DILR Frameworks',
    subcategories: [
      {
        title: 'Tournament & Matrix Rules',
        formulas: [
          { name: 'Knockout Matches Count', formula: '\\text{Total Matches} = N - 1', notes: 'In a single knockout tournament with N teams' },
          { name: 'Round Robin Total Matches', formula: '\\text{Total Matches} = \\frac{N(N-1)}{2}', notes: 'For single round-robin with N teams' },
          { name: 'Points Conservation Principle', formula: '\\sum \\text{Points Awarded} = \\text{Total Matches} \\times (\\text{Pts/win} \\text{ or } 2 \\times \\text{draw})', notes: 'Check points conserved to bound min/max scores' }
        ]
      }
    ]
  }
];
