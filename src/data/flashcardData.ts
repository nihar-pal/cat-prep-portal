import { ExamType } from '@/types/exam';

export interface FlashcardItem {
  id: string;
  exam: ExamType;
  category: 'QA Formula' | 'Vocab & Rhetoric' | 'CR Logic' | 'DILR Framework';
  title: string;
  front: string;
  back: string;
  keyTakeaway: string;
  examReference: string;
}

export const FLASHCARD_DECK: FlashcardItem[] = [
  // ================= QA & QUANT FORMULAS =================
  {
    id: 'fc-qa-apollonius',
    exam: 'CAT',
    category: 'QA Formula',
    title: 'Apollonius\' Theorem (Median Length)',
    front: `In $\\triangle ABC$, $AD$ is a median drawn from vertex $A$ to the opposite side $BC$.
    
What is the algebraic relationship between the sides $AB, AC, BC$ and the median $AD$?`,
    back: `### Apollonius' Theorem:
$$AB^2 + AC^2 = 2\\left(AD^2 + BD^2\\right) = 2\\left(AD^2 + \\left(\\frac{BC}{2}\\right)^2\\right)$$

**When to Apply:**
Whenever two side lengths and a median length are given in a triangle, or when finding the length of the diagonal in a parallelogram ($d_1^2 + d_2^2 = 2(a^2 + b^2)$).`,
    keyTakeaway: 'Sum of squares of two sides = 2 × (Square of median + Square of half the third side)',
    examReference: 'CAT QA Geometry Signature'
  },
  {
    id: 'fc-qa-ptolemy',
    exam: 'CAT',
    category: 'QA Formula',
    title: 'Ptolemy\'s Theorem (Cyclic Quadrilaterals)',
    front: `For any convex cyclic quadrilateral $ABCD$ inscribed inside a circle with diagonals $AC$ and $BD$:

What is the relationship between the product of the diagonals and the products of opposite sides?`,
    back: `### Ptolemy's Theorem:
$$AC \\times BD = (AB \\times CD) + (BC \\times AD)$$

**Core Meaning:**
In a cyclic quadrilateral, the product of the lengths of the two diagonals equals the sum of the products of the lengths of opposite pairs of sides.`,
    keyTakeaway: 'Diagonal Product = Sum of Opposite Side Products: $d_1 d_2 = ac + bd$',
    examReference: 'CAT & XAT Advanced Geometry'
  },
  {
    id: 'fc-qa-fermat-totient',
    exam: 'CAT',
    category: 'QA Formula',
    title: 'Euler\'s Totient Theorem & Fermat\'s Little Theorem',
    front: `If $a$ and $n$ are coprime positive integers ($\\gcd(a, n) = 1$), what is the remainder when $a^{\\phi(n)}$ is divided by $n$?

What does this simplify to when $n = p$ (a prime number)?`,
    back: `### Euler's Totient Theorem:
$$a^{\\phi(n)} \\equiv 1 \\pmod n$$
Where $\\phi(n) = n \\prod_{p|n} \\left(1 - \\frac{1}{p}\\right)$ is Euler's totient function.

### Fermat's Little Theorem (when $p$ is prime):
$$\\phi(p) = p - 1 \\implies a^{p - 1} \\equiv 1 \\pmod p$$

**Example:**
Find remainder of $3^{100} \\div 13$:
Since 13 is prime, $\\phi(13) = 12$.
$100 = 12 \\times 8 + 4 \\implies 3^{100} \\equiv (3^{12})^8 \\times 3^4 \\equiv 1^8 \\times 81 \\equiv 81 \\pmod{13} \\equiv 3$.`,
    keyTakeaway: 'Divide the massive exponent by $\\phi(\\text{modulus})$ to reduce remainder problems in 10 seconds.',
    examReference: 'CAT & NMAT Number Systems'
  },
  {
    id: 'fc-gmat-trailing-zeroes',
    exam: 'GMAT',
    category: 'QA Formula',
    title: 'Trailing Zeroes in $n!$ (Legendre\'s Formula)',
    front: `What is the exact formula for determining the number of trailing zeroes in $n!$ (or the highest power of prime $p$ that divides $n!$)?`,
    back: `### Legendre's Formula for Prime $p$:
$$E_p(n!) = \\left\\lfloor \\frac{n}{p} \\right\\rfloor + \\left\\lfloor \\frac{n}{p^2} \\right\\rfloor + \\left\\lfloor \\frac{n}{p^3} \\right\\rfloor + \\dots$$

For trailing zeroes, base 10 is formed by $2 \\times 5$. Since powers of 2 always exceed powers of 5 in $n!$, the number of trailing zeroes is strictly governed by $E_5(n!)$:
$$\\text{Trailing Zeroes} = \\left\\lfloor \\frac{n}{5} \\right\\rfloor + \\left\\lfloor \\frac{n}{25} \\right\\rfloor + \\left\\lfloor \\frac{n}{125} \\right\\rfloor + \\dots$$`,
    keyTakeaway: 'For $100!$: $\\lfloor 100/5 \\rfloor + \\lfloor 100/25 \\rfloor = 20 + 4 = 24$ zeroes.',
    examReference: 'GMAT Focus Number Properties & CAT QA'
  },
  {
    id: 'fc-snap-clocks-angle',
    exam: 'SNAP',
    category: 'QA Formula',
    title: 'Clock Hands Angle Master Formula',
    front: `At time $H$ hours and $M$ minutes, what is the exact formula for the acute angle $\\theta$ between the hour hand and minute hand of an analog clock?`,
    back: `### Clock Angle Formula:
$$\\theta = \\left| 30H - \\frac{11}{2} M \\right| = |30H - 5.5M|$$
*(If the calculated angle exceeds $180^\\circ$, take the reflex conjugate: $360^\\circ - \\theta$.)*

**Example (At 4:40):**
$$\\theta = |30(4) - 5.5(40)| = |120 - 220| = |-100| = 100^\\circ$$`,
    keyTakeaway: 'Always apply $|30H - 5.5M|$. Solves clock angle questions in 15 seconds.',
    examReference: 'SNAP Analytical Reasoning Benchmark'
  },

  // ================= VOCAB & RHETORIC =================
  {
    id: 'fc-snap-oxymoron-synecdoche',
    exam: 'SNAP',
    category: 'Vocab & Rhetoric',
    title: 'Oxymoron vs Paradox vs Synecdoche',
    front: `What is the key structural difference between an **Oxymoron**, a **Paradox**, and a **Synecdoche** in rhetorical figures of speech?`,
    back: `### 1. Oxymoron:
Two contradictory words placed **immediately adjacent** to each other.
*Examples:* "Deafening silence", "Cruel kindness", "Original copy", "Passive aggressive".

### 2. Paradox:
A full **statement or situation** that appears self-contradictory on the surface, but reveals a deeper philosophical truth upon analysis.
*Example:* "The only constant in life is change", "War is peace, freedom is slavery".

### 3. Synecdoche:
A figure of speech in which a **part represents the whole**, or the whole represents a part.
*Examples:* "All hands on deck" (hands = sailors), "Lend me your ears" (ears = attention), "She bought new wheels" (wheels = car).`,
    keyTakeaway: 'Oxymoron = 2 adjacent opposite words. Paradox = full statement. Synecdoche = part for the whole.',
    examReference: 'SNAP General English #1 Asked Topic'
  },
  {
    id: 'fc-nmat-vocab-roots',
    exam: 'NMAT',
    category: 'Vocab & Rhetoric',
    title: 'High-Frequency Latin/Greek Roots: LOQ / LOC & GREG',
    front: `Deconstruct the root **LOQ / LOC** (meaning: to speak) and **GREG** (meaning: flock/herd) across top exam words.`,
    back: `### LOQ / LOC (To Speak):
- **Loquacious:** Extremely talkative, garrulous.
- **Eloquent:** Fluent, persuasive, articulate speech.
- **Grandiloquent / Magniloquent:** Pompous, bombastic speech meant to impress.
- **Soliloquy:** An act of speaking one's thoughts aloud when by oneself in drama.
- **Colloquial:** Informal, ordinary conversational speech.

### GREG (Flock, Herd, Gathering):
- **Gregarious:** Fond of company, sociable (likes being in a flock).
- **Egregious:** Outstandingly bad, shocking (literally "standing out of the flock").
- **Congregate:** Gather into a crowd or mass.
- **Segregate:** Set apart from the rest of the flock.`,
    keyTakeaway: 'Mastering 1 root word unlocks 8-10 high-frequency exam options effortlessly.',
    examReference: 'NMAT Language Skills & SNAP English'
  },

  // ================= CRITICAL REASONING LOGIC =================
  {
    id: 'fc-gmat-cr-boldface',
    exam: 'GMAT',
    category: 'CR Logic',
    title: 'Bold-Face Role Mapping Strategy',
    front: `How do you systematically categorize the two bold-faced portions in a GMAT/XAT Critical Reasoning argument in under 60 seconds?`,
    back: `### 3-Step Structural Decision Framework:
1. **Identify the Main Conclusion:**
   Look for prescriptive indicators (*"Therefore", "Hence", "Thus", "Consequently"*). Determine whether the author is proposing a theory, refuting someone, or advocating a course of action.
2. **Determine the Stance (Polarity):**
   Does Boldface 1 help the conclusion ($+$) or oppose it ($-$) or serve as neutral background?
   Does Boldface 2 state the conclusion itself, provide supporting evidence, or state an intermediate conclusion?
3. **Eliminate Mismatches:**
   - If Boldface 2 is the main claim, eliminate any option that calls it "evidence", "factual premise", or "consideration".
   - If Boldface 1 is preceded by "However", it is a counter-premise challenging an opposing theory.`,
    keyTakeaway: 'Check polarity (+/-) and whether it is a Fact (evidence) or an Opinion (claim/conclusion).',
    examReference: 'GMAT Focus Verbal Reasoning & XAT VALR'
  },
  {
    id: 'fc-cr-fallacies',
    exam: 'GMAT',
    category: 'CR Logic',
    title: 'Top 3 Causal Fallacies in Critical Reasoning',
    front: `Explain the 3 most common logical flaws that undermine causal arguments in CAT & GMAT CR:
1. Confounding Variable (Alternative Cause)
2. Reverse Causation
3. Correlation $\\neq$ Causation (Coincidence)`,
    back: `### 1. Confounding Variable (Third Factor):
Argument claims $A \\to B$. In reality, an unmentioned third factor $C$ causes both $A$ and $B$.
*Example:* Ice cream sales ($A$) and drowning deaths ($B$) both spike. Cause is Summer heat ($C$), not ice cream!

### 2. Reverse Causation:
Argument claims $A \\to B$, but in reality $B$ actually caused $A$.
*Example:* Exercising people have higher water intake. Did the water intake cause them to exercise, or did exercise make them thirsty?

### 3. Negation Technique for Assumptions:
If the argument hinges on $A \\to B$, the mandatory assumption is: *No other external factor caused $B$*, and *The relationship is not reverse*.`,
    keyTakeaway: 'To weaken a causal claim, always look for the option introducing an alternative common cause.',
    examReference: 'GMAT & CAT Critical Reasoning Core'
  },

  // ================= DILR & DECISION MAKING =================
  {
    id: 'fc-dilr-round-robin',
    exam: 'CAT',
    category: 'DILR Framework',
    title: 'Round-Robin Tournament Invariant Equations',
    front: `In a round-robin tournament with $N$ teams where every team plays every other team exactly once:
1. What is the total number of matches played?
2. If Win = 2 pts, Tie = 1 pt, Loss = 0 pts, what is the total sum of points distributed across all teams?`,
    back: `### Round-Robin Mathematical Invariants:
1. **Total Matches Played:**
   $$\\text{Total Matches} = \\binom{N}{2} = \\frac{N(N - 1)}{2}$$

2. **Total Sum of Points Distributed:**
   - In any match:
     - Win/Loss result: Winner gets 2 pts, Loser gets 0 pts $\\implies$ Sum = 2 pts.
     - Tie result: Each team gets 1 pt $\\implies$ Sum = $1 + 1 = 2$ pts.
   - **Invariant:** Every single match yields exactly 2 points regardless of outcome!
   $$\\text{Total Points Distributed} = 2 \\times \\frac{N(N - 1)}{2} = N(N - 1)$$

**Strategic Deduction:**
The average points per team is always exactly $N - 1$. If 6 teams play, total points = $6 \\times 5 = 30$ points.`,
    keyTakeaway: 'Total matches = $N(N-1)/2$. Total points distributed is invariant and equals $N(N-1)$.',
    examReference: 'CAT DILR Games & Tournaments Benchmark'
  },
  {
    id: 'fc-xat-dm-ethics',
    exam: 'XAT',
    category: 'DILR Framework',
    title: 'XAT Decision Making: Ethical & Managerial Rules',
    front: `What are the 4 non-negotiable rules for selecting the correct answer in XAT Decision Making business caselets?`,
    back: `### The 4 XLRI Decision Making Golden Rules:
1. **Never Choose Illegal or Retaliatory Measures:**
   Any option that bribes, conceals evidence, fires an employee without due process, or retaliates against a whistleblower is 100% WRONG.
2. **Follow Institutional Due Process:**
   The correct managerial option always sets up an independent committee, fact-finding inquiry, or transparent multi-stakeholder dialogue before taking punitive action.
3. **Balance Short-Term Survival vs Long-Term Brand Equity:**
   Short-term revenue cuts or temporary product recalls are preferred over risking long-term consumer trust and safety.
4. **Choose Inclusive Solutions over Binary Extremes:**
   Options that say "Fire employee immediately" or "Ignore the complaint" are traps. Look for options that reform process and provide training.`,
    keyTakeaway: 'Due process, ethical transparency, and stakeholder balancing are the hallmarks of correct XAT DM options.',
    examReference: 'XAT Decision Making Core Directive'
  }
];
