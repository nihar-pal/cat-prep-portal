export interface PacerQuestion {
  id: string;
  questionText: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

export interface PacerPassage {
  id: string;
  title: string;
  sourceGenre: 'Philosophy of Mind' | 'Behavioral Economics' | 'Evolutionary Biology' | 'Technological Ethics';
  wordCount: number;
  estimatedMinutesAt250Wpm: number;
  text: string;
  questions: PacerQuestion[];
}

export const PACER_PASSAGES: PacerPassage[] = [
  {
    id: 'pacer-aeon-consciousness',
    title: 'The Illusion of Explanatory Depth and Cognitive Panpsychism',
    sourceGenre: 'Philosophy of Mind',
    wordCount: 420,
    estimatedMinutesAt250Wpm: 1.7,
    text: `For centuries, Cartesian dualism posited that the physical body and conscious subjective experience belong to ontologically distinct substances. The physical world was mechanical, deterministic, and quantifiable, whereas the mind was private, intentional, and irreducible to spatial coordinates. In contemporary cognitive science, this distinction has been reframed as the notorious "Hard Problem" of consciousness: why should the physical execution of neural computational processes be accompanied by an inner qualitative life at all?

Physicalist reductions typically attempt to circumvent this explanatory impasse by proposing that consciousness is an emergent macro-property of complex information processing networks, analogous to how wetness emerges from the chemical bonding of hydrogen and oxygen molecules. However, critics demonstrate that this analogy rests on a category error. Wetness is an objective, third-person physical phenomenon that can be exhaustively modeled through molecular interactions and surface tension. Qualitative sensations—the redness of a sunset or the searing ache of grief—possess an intrinsic first-person perspective that leaves an unbridgeable conceptual chasm between objective neuronal firing patterns and felt experience.

Consequently, an increasing contingent of analytical philosophers has revived panpsychism: the hypothesis that phenomenal consciousness is not an anomalous late-stage byproduct of biological evolution, but rather a fundamental, ubiquitous feature of the physical cosmos, present in rudimentary form within fundamental physical entities. Under this framework, brain physiology does not fabricate consciousness ex nihilo; rather, it structures, integrates, and channels pre-existing phenomenal building blocks into coherent unified macro-experiences. While intuitive common sense recoils at attributing proto-conscious attributes to subatomic fields, panpsychists counter that physical science only informs us about what matter does—its relational dynamics and mathematical equations—leaving the intrinsic nature of matter completely unspecified. By positing that consciousness constitutes this intrinsic categorical ground, panpsychism offers an elegant ontological symmetry without resorting to supernatural dualism or eliminative materialist denial.`,
    questions: [
      {
        id: 'pacer-q1',
        questionText: 'According to the passage, the analogy between consciousness and the emergence of "wetness" is flawed primarily because:',
        options: [
          { id: 'A', text: 'Water molecules do not possess complex computational feedback loops.' },
          { id: 'B', text: 'Wetness is a third-person quantifiable phenomenon, whereas conscious sensations possess an intrinsic first-person qualitative dimension.' },
          { id: 'C', text: 'Physicalist reductions reject the laws of chemistry and thermodynamics.' },
          { id: 'D', text: 'Consciousness cannot be correlated with any measurable neurological firing.' }
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 2 explicitly states that wetness is an objective, third-person physical phenomenon, while qualitative sensations possess an intrinsic first-person perspective that leaves an unbridgeable conceptual chasm.'
      },
      {
        id: 'pacer-q2',
        questionText: 'Which of the following best characterizes the primary rhetorical thesis of the author regarding panpsychism?',
        options: [
          { id: 'A', text: 'It is an empirically verified laboratory model that disproves physicalism.' },
          { id: 'B', text: 'It represents an anti-scientific retreat into medieval mysticism.' },
          { id: 'C', text: 'It provides an ontologically symmetrical framework that accounts for the intrinsic nature of matter without invoking supernaturalism.' },
          { id: 'D', text: 'It asserts that subatomic particles possess complex cognitive emotions identical to humans.' }
        ],
        correctAnswer: 'C',
        explanation: 'Paragraph 3 concludes that panpsychism offers an elegant ontological symmetry without resorting to supernatural dualism or eliminative materialist denial.'
      },
      {
        id: 'pacer-q3',
        questionText: 'It can be inferred from the passage that modern physical science:',
        options: [
          { id: 'A', text: 'Describes the mathematical and relational behavior of matter rather than its intrinsic ontological essence.' },
          { id: 'B', text: 'Has successfully resolved the Hard Problem through fMRI neuroimaging.' },
          { id: 'C', text: 'Universally endorses Cartesian substance dualism.' },
          { id: 'D', text: 'Equates biological evolution with quantum mechanical indeterminacy.' }
        ],
        correctAnswer: 'A',
        explanation: 'The passage asserts that "physical science only informs us about what matter does—its relational dynamics and mathematical equations—leaving the intrinsic nature of matter completely unspecified."'
      }
    ]
  },
  {
    id: 'pacer-economist-monetary',
    title: 'The Asymmetric Friction of Quantitative Tightening',
    sourceGenre: 'Behavioral Economics',
    wordCount: 460,
    estimatedMinutesAt250Wpm: 1.8,
    text: `Central banking orthodoxy has historically assumed that monetary tightening functions as a reciprocal mirror image of monetary expansion. Under the frictionless baseline of standard New Keynesian dynamic stochastic general equilibrium models, raising policy rates by 100 basis points exerts a contractionary pull on aggregate demand equivalent in absolute magnitude to the expansionary stimulus of a 100-basis-point cut. However, structural empirical evidence collected across post-pandemic capital markets indicates that liquidity withdrawal is subject to profound behavioral hysteresis and institutional friction.

The primary impediment to symmetric transmission lies in the divergent mechanics of bank deposit flight and sovereign debt duration. When central banks implement quantitative easing through large-scale asset purchases, liquidity floods into commercial banking reserves instantaneously. Banks, awash with non-yielding excess deposits, eagerly extend syndicated credit lines and compress risk premia across corporate bond spreads. Conversely, when central banks orchestrate quantitative tightening by permitting balance-sheet assets to mature un-reinvested, the liquidity drain does not extract funds uniformly from banking reserves. Instead, institutional cash allocators rapidly shift non-operational corporate deposits into government money-market funds yielding benchmark overnight rates.

This dynamic generates a sharp bifurcation in corporate borrowing costs. Blue-chip multinational enterprises, having locked in historically depressed coupon rates on 10-year fixed corporate bonds during easing cycles, are effectively insulated from rising policy rates. In fact, many large corporations record positive net financial income as yields on their substantial liquid cash reserves escalate. In stark contrast, mid-market enterprises and leveraged buy-out vehicles reliant on floating-rate syndicated loans suffer an immediate surge in debt-service obligations, precipitating sharp cutbacks in capital expenditures and hiring freezes. Therefore, aggregate macroeconomic metrics such as headline inflation and unemployment often appear resilient for extended periods, masking severe underlying distress within credit-sensitive industrial subsectors until an abrupt systemic threshold is breached.`,
    questions: [
      {
        id: 'pacer-q4',
        questionText: 'The author implies that standard New Keynesian macroeconomic models are inadequate because they:',
        options: [
          { id: 'A', text: 'Assume that interest rate cuts and hikes transmit symmetrically without institutional friction.' },
          { id: 'B', text: 'Ignore the influence of commercial banks in the money creation process.' },
          { id: 'C', text: 'Overestimate the vulnerability of mid-market enterprises.' },
          { id: 'D', text: 'Fail to measure headline inflation and consumer price indices.' }
        ],
        correctAnswer: 'A',
        explanation: 'Paragraph 1 notes that standard New Keynesian models operate under the frictionless assumption that rate hikes exert an effect equivalent in absolute magnitude to rate cuts, which empirical evidence refutes.'
      },
      {
        id: 'pacer-q5',
        questionText: 'According to the passage, why do some multinational corporations experience higher net income during monetary tightening?',
        options: [
          { id: 'A', text: 'They borrow heavily at floating rates to refinance maturing debt.' },
          { id: 'B', text: 'Their debt-service obligations remain fixed at historically low rates while yields on their liquid cash holdings rise.' },
          { id: 'C', text: 'Central banks prioritize liquidity allocation to blue-chip conglomerates.' },
          { id: 'D', text: 'They divest completely from government money-market funds.' }
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 3 explains that multinationals having locked in 10-year fixed debt see debt service remain invariant while yield on liquid cash reserves surges.'
      }
    ]
  }
];
