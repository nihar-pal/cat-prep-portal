import { DailyTarget } from '@/types/exam';

export const XAT_DAILY_TARGETS: DailyTarget[] = [
  {
    id: 'xat-target-day-1',
    dayNumber: 1,
    dateStr: 'Day 1: XLRI Decision Making & Critical Reasoning Benchmark',
    title: 'XAT XLRI Benchmark Daily Sprint #1',
    description: 'Authentic XLRI format: 1 Decision Making Caselet with 5 options (Business Ethics & Human Resources), 1 Critical Reasoning & VALR set, and 4 QADI problems (Data Sufficiency & Advanced Geometry).',
    estimatedMinutes: 40,
    exam: 'XAT',
    sectionBreakdown: [
      {
        section: 'DM',
        label: 'Decision Making (DM)',
        count: 4,
        description: 'Multi-stakeholder ethical dilemma, corporate governance, and employee performance trade-offs with 5 distinct options.'
      },
      {
        section: 'VALR',
        label: 'Verbal & Logical Ability (VALR)',
        count: 4,
        description: 'Philosophical passage inference, bold-faced argument analysis, and contextual critical reasoning.'
      },
      {
        section: 'QADI',
        label: 'Quantitative Ability & DI (QADI)',
        count: 5,
        description: 'Advanced Coordinate Geometry, Data Sufficiency (Statement I & II), and algebraic function inequalities. No calculator permitted.'
      }
    ],
    sections: {
      varcCount: 4,
      dilrCount: 4,
      qaCount: 5
    },
    questions: [
      // --- SECTION 1: DECISION MAKING (DM) ---
      {
        id: 'xat-d1-dm-q1',
        exam: 'XAT',
        section: 'DM',
        topic: 'Decision Making',
        subtopic: 'Ethical Dilemma & Pharmaceutical Supply Chain',
        type: 'MCQ',
        difficulty: 'Hard',
        contextText: `### Caselet: Apex Lifesciences and the Pediatric Formulation Dilemma

Apex Lifesciences is a leading Indian pharmaceutical company manufacturing a life-saving pediatric antibiotic syrup, *Pediacin*. Pediacin is the sole affordable drug available in tier-3 cities and rural government primary health centers (PHCs) for treating resistant neonatal bacterial infections.

During a routine internal audit, Dr. Shalini Verma, the Chief Quality Assurance Officer, discovers that an uncalibrated distillation column in Batch #B-409 (comprising 120,000 units ready for pan-India dispatch) produced active pharmaceutical ingredient (API) concentrations varying between 89% and 93% of the label claim. The Indian Pharmacopoeia mandates a therapeutic efficacy window of 95% to 105%.

Medical toxicologists advise that while an 89–93% concentration poses virtually zero toxic risk or adverse side effects, it may prolong recovery time by 24 to 36 hours in severely malnourished neonates. A public batch recall and re-manufacture will take at least 28 days and cost ₹4.8 crore, an expenditure that will plunge Apex into a net quarterly loss and lead to lender covenant breaches. More critically, an immediate supply stoppage will create an absolute nationwide stock-out of pediatric antibiotics in rural clinics for over three weeks, directly threatening the survival of hundreds of infected infants who cannot afford multinational alternatives priced six times higher.

Rakesh Singhal, the Managing Director, convenes an emergency executive committee meeting.`,
        questionText: 'Which of the following actions, if undertaken by Rakesh Singhal, represents the MOST ethically sound and operationally pragmatic managerial decision?',
        options: [
          { id: 'A', text: 'Quietly release Batch #B-409 immediately to avert the life-threatening antibiotic stock-out, while quietly recalibrating the column for subsequent production runs.' },
          { id: 'B', text: 'Immediately notify the Drug Controller General of India (DCGI) of the sub-potent batch, issue an immediate public halt on Batch #B-409, and bear the financial losses and rural shortage as an unavoidable regulatory compliance requirement.' },
          { id: 'C', text: 'Withhold Batch #B-409 from retail distribution, urgently consult DCGI for an emergency compassionate-use waiver while providing supplemental dosage guidance to government pediatricians, and fast-track an overtime production run of compliant batches at another facility.' },
          { id: 'D', text: 'Sell Batch #B-409 at a 50% discount to private charitable hospitals with a disclaimer, using the revenue to fund expedited manufacturing of fresh batches for rural clinics.' },
          { id: 'E', text: 'Suspend Dr. Shalini Verma for delaying the audit until dispatch day and seek an independent re-test from an external commercial testing laboratory to confirm if the batch might test within the 95% threshold.' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'XAT Decision Making: Deontological Ethics vs. Utilitarian Harm Minimization',
          stepByStep: [
            'In XAT Decision Making, decisions must harmonize regulatory transparency (deontology), human life preservation (utilitarianism), and pragmatic feasibility.',
            'Option A is a grave ethical failure: concealing known sub-potency from regulatory bodies and doctors exposes vulnerable patients to prolonged disease and violates legal mandates.',
            'Option B demonstrates rigid rule-following without mitigating the foreseeable death of infants caused by a complete 3-week nationwide stock-out.',
            'Option D creates an unjust two-tier health system, dumping sub-standard medicines onto charitable clinics without regulatory sanction.',
            'Option E is scapegoating and bad governance—punishing the whistleblowing QA head to delay hard decisions.',
            'Option C demonstrates transparent regulatory engagement (seeking DCGI emergency waiver), medical safety (supplemental dosage guidance for lower concentration), and immediate corrective manufacturing.'
          ],
          shortcutOrAlumTip: 'XLRI Rule of Thumb: Look for the option that balances transparent truth-telling with active mitigation of real-world human casualties. Avoid extremes (pure bureaucratic paralysis vs secretive cover-up).',
          trapAnalysis: 'Option B is tempting because it looks legally compliant, but in XLRI DM, creating an avoidable fatal shortage without proactive emergency engagement is considered a managerial failure.',
          prerequisite: 'Stakeholder Analysis & Regulatory Ethics'
        },
        pastYearReference: 'XAT 2023 DM (Managerial Ethics & Medical Protocols)'
      },
      {
        id: 'xat-d1-dm-q2',
        exam: 'XAT',
        section: 'DM',
        topic: 'Decision Making',
        subtopic: 'Personnel & Whistleblower Protection',
        type: 'MCQ',
        difficulty: 'Hard',
        contextText: `### Caselet: Apex Lifesciences (Continued)

Following the committee meeting, it is discovered that the uncalibrated column was repeatedly flagged three months prior in an internal maintenance ticket filed by a junior technician, Ankit. Ankit’s reporting manager, Vice President of Operations Arvind Swamy, deleted the ticket to ensure his quarterly plant efficiency bonus of ₹25 lakh was not jeopardized.

Dr. Verma insists that Arvind Swamy must be summarily terminated for gross professional negligence. However, Arvind is the company’s chief chemical engineer, and his immediate departure will stall the emergency setup of the compliant production line by at least two weeks, prolonging the medicine shortage.`,
        questionText: 'What should Rakesh Singhal do regarding Arvind Swamy?',
        options: [
          { id: 'A', text: 'Pardon Arvind with an informal verbal reprimand in private, recognizing that his technical competence is indispensable to the company’s survival.' },
          { id: 'B', text: 'Immediately strip Arvind of all operational authority and bonuses, initiate a formal independent disciplinary inquiry, but retain him strictly in an advisory technical consulting capacity until the replacement line is fully operational.' },
          { id: 'C', text: 'Immediately terminate Arvind publicly with criminal charges to set an uncompromising precedent for organizational integrity, regardless of line delays.' },
          { id: 'D', text: 'Promote junior technician Ankit to Arvind\'s VP post immediately and let Arvind work under Ankit’s supervision.' },
          { id: 'E', text: 'Withhold Arvind\'s bonus quietly, keep the incident strictly within executive knowledge, and warn Arvind that any future lapses will result in termination.' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Organizational Justice: Accountability vs Continuity of Critical Operations',
          stepByStep: [
            'Arvind committed an act of deliberate sabotage and moral turpitude (deleting safety tickets for personal monetary gain). He cannot escape formal punishment.',
            'Options A and E are moral failures that signal to the entire organization that safety and integrity can be compromised for profit or bonuses.',
            'Option C satisfies retributive anger but directly delays life-saving medicine production by 2 weeks, leading to infant mortality.',
            'Option D is absurd and unrealistic (a junior technician cannot suddenly manage an enterprise plant as VP).',
            'Option B isolates the bad actor from decision-making power, strips unearned financial incentives, triggers formal inquiry for eventual dismissal, while extracting crucial technical guidance to prevent patient deaths.'
          ],
          shortcutOrAlumTip: 'Decouple immediate crisis management from long-term punitive action. Never allow an indispensable employee to hold an ethical breach hostage, but do not let pride destroy operations during an active emergency.',
          trapAnalysis: 'Option C is chosen by emotionally driven candidates who confuse institutional retribution with effective leadership during an active public health emergency.',
          prerequisite: 'Organizational Behavior & Crisis Management'
        },
        pastYearReference: 'XAT 2022 DM (Corporate Whistleblowing & Executive Accountability)'
      },
      {
        id: 'xat-d1-dm-q3',
        exam: 'XAT',
        section: 'DM',
        topic: 'Decision Making',
        subtopic: 'Product Strategy & Market Survival',
        type: 'MCQ',
        difficulty: 'Hard',
        contextText: `### Caselet: Gramin Solar Solutions

Gramin Solar Solutions sells low-cost solar-powered water irrigation pumps to marginal farmers in Vidarbha, Maharashtra. Gramin provides a 3-year unconditional warranty. In the first year, Gramin achieved 12,000 installations with a customer satisfaction rating of 94%.

In Year 2, a sudden change in groundwater salinity in the Vidarbha basin caused premature corrosion of the pump impellers after 14 months of use, leading to water delivery dropping by 40%. The warranty terms explicitly cover "manufacturing defects" but exclude "environmental anomalies beyond control".

Farmers are distraught because harvest season begins in 45 days. Gramin’s legal counsel affirms that Gramin has zero legal liability under the sales contract. Replacing all 12,000 impellers with corrosion-resistant ceramic alloy impellers will cost Gramin ₹6 crore, which represents 80% of Gramin\'s total liquid reserves. Gramin\'s CEO, Sunita Murthy, must protect both the company\'s survival and the livelihoods of their farmer clientele.`,
        questionText: 'Which of the following strategies best balances Gramin’s fiduciary survival with its long-term brand equity and customer commitment?',
        options: [
          { id: 'A', text: 'Stand strictly on the legal contract, disclaim all liability, and offer to sell the new ceramic impellers to farmers at full retail price plus installation costs.' },
          { id: 'B', text: 'Exhaust the entire ₹6 crore liquid reserve to replace all 12,000 impellers completely free of charge, trusting that farmer goodwill will attract future venture capital funding.' },
          { id: 'C', text: 'Offer a subsidized replacement scheme where Gramin absorbs 50% of the cost, partner with rural agricultural cooperative banks to provide zero-interest micro-loans for the remainder, and extend the warranty on the ceramic part by 2 years.' },
          { id: 'D', text: 'File a lawsuit against the local groundwater authority for failing to notify businesses of changing salinity tables, passing the blame to the state government.' },
          { id: 'E', text: 'Advise farmers to switch to diesel generators during this harvest season while Gramin spends the next 12 months redesigning the pump.' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'Stakeholder Partnership & Shared Cost Solutions in Rural Markets',
          stepByStep: [
            'Standing on legal fine print (Option A) in a trust-based rural market permanently destroys brand equity, leading to complete commercial collapse.',
            'Spending 80% of total liquid reserves (Option B) leaves the startup with near-zero working capital, risking company bankruptcy before harvest ends.',
            'Passing the blame through lawsuits (Option D) or telling farmers to burn diesel (Option E) ignores the immediate harvest emergency.',
            'Option C splits the financial burden equitably: Gramin absorbs the manufacturing margin, arranges micro-credit for farmers, solves the immediate 45-day harvest crisis, and preserves business solvency.'
          ],
          shortcutOrAlumTip: 'In XAT rural/social enterprise cases, shared-cost co-investment models are almost always superior to pure charity (which bankrupts the firm) or cold legalism (which destroys customer trust).',
          trapAnalysis: 'Option B appeals to candidates who think social enterprises should sacrifice their own balance sheet completely. Solvency is prerequisite to mission.',
          prerequisite: 'Social Enterprise Strategy & Contractual Ethics'
        },
        pastYearReference: 'XAT 2021 DM (Rural Social Enterprise & Customer Warranty)'
      },
      {
        id: 'xat-d1-dm-q4',
        exam: 'XAT',
        section: 'DM',
        topic: 'Decision Making',
        subtopic: 'Academic Integrity & Institutional Governance',
        type: 'MCQ',
        difficulty: 'Hard',
        contextText: `### Caselet: St. Xavier\'s Institute of Management (SZIM)

SZIM has an uncompromising honor code: any student caught indulging in academic dishonesty faces automatic suspension for one academic term. During the final trimester end-term examination, Professor Raman notices that Rohit, the son of the institute\'s largest donor and industrialist Vikram Singhania, has a smartphone concealed beneath his exam desk with a PDF of formula notes open.

Vikram Singhania recently pledged a ₹30 crore grant to build the institute\'s new AI and Analytics Research Center. The director of the institute privately tells Professor Raman: "Rohit is an average student who made a foolish lapse of judgment. A suspension will embarrass his family and jeopardize the ₹30 crore grant, which will fund scholarships for 150 underprivileged students over the next decade. Can we not issue a strict internal warning and award him zero in this single paper instead?"`,
        questionText: 'What should Professor Raman do?',
        options: [
          { id: 'A', text: 'Accede to the Director’s request because the utilitarian benefit of funding 150 underprivileged students vastly outweighs the punishment of one privileged student.' },
          { id: 'B', text: 'Report the violation formally to the Academic Disciplinary Board in accordance with the mandatory Honor Code, refusing to compromise institutional integrity for philanthropic capital.' },
          { id: 'C', text: 'Leak the story anonymously to student newspapers and social media to force the Director’s hand through public outrage.' },
          { id: 'D', text: 'Demand that Vikram Singhania double his endowment to ₹60 crore as a restitution penalty in exchange for keeping Rohit’s record clean.' },
          { id: 'E', text: 'Allow Rohit to re-write the exam in a private room under his direct supervision with no penalty recorded.' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Institutional Deontology vs. Corrupt Utilitarian Compromise',
          stepByStep: [
            'Academic institutions derive their moral and brand authority from the sanctity of their evaluation mechanisms.',
            'If an honor code can be bought for ₹30 crore, the degree loses its credibility for all alumni and current students.',
            'Option A introduces the corrupt concept that wealth grants exemption from ethical codes.',
            'Option C is unprofessional and cowardly (subverting institutional due process via media leaks).',
            'Option D is extortion and blatant corruption.',
            'Option B upholds the faculty member\'s core duty: impartial enforcement of the stated institutional honor code regardless of donor influence.'
          ],
          shortcutOrAlumTip: 'In XLRI academic and institutional ethics questions, integrity of the evaluation system is NEVER negotiable for monetary donations. The institution must protect fairness above patronage.',
          trapAnalysis: 'Option A is the classic utilitarian trap ("150 poor kids benefit"). In XAT, core ethical boundaries (cheating, bribery, justice) cannot be traded off for money.',
          prerequisite: 'Educational Governance & Moral Philosophy'
        },
        pastYearReference: 'XAT 2020 DM (Academic Honor Codes & Institutional Donors)'
      },

      // --- SECTION 2: VERBAL & LOGICAL ABILITY (VALR) ---
      {
        id: 'xat-d1-valr-q1',
        exam: 'XAT',
        section: 'VALR',
        topic: 'Critical Reasoning',
        subtopic: 'Argument Structure & Bold-Face Role',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `Consider the following argument:

Many educational theorists advocate for gamified learning platforms, pointing out that students spend up to four times longer engaged with gamified modules compared to traditional textbooks. **However, prolonged engagement cannot be conflated with cognitive depth.** When software designers incentivize streaks, digital tokens, and leaderboard dominance, the neural reward circuitry prioritizes transactional task-completion rather than reflective problem-solving. **Consequently, the pedagogical efficacy of educational technology should be measured by long-term conceptual retention rather than immediate metrics of screen time.**

In the argument above, the two bold-faced portions play which of the following roles?`,
        options: [
          { id: 'A', text: 'The first is a premise introduced to support a widely held view; the second is the author’s primary conclusion.' },
          { id: 'B', text: 'The first is an intermediate objection that counters the argument’s main thrust; the second is a consideration offered to soften that objection.' },
          { id: 'C', text: 'The first is an assertion that challenges an inference drawn by proponents of gamification; the second is the main conclusion of the argument.' },
          { id: 'D', text: 'The first is evidence disproving the correlation between time and gamification; the second is an auxiliary hypothesis that remains unproven.' },
          { id: 'E', text: 'The first provides context for an empirical experiment; the second summarizes the methodology used by educational theorists.' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'XAT Critical Reasoning: Structural Analysis of Arguments',
          stepByStep: [
            'Proponents infer: Long time spent on gamified modules = superior learning.',
            'Boldface 1: "**However, prolonged engagement cannot be conflated with cognitive depth.**" -> The author directly attacks and disputes the assumption/inference of the theorists.',
            'The middle text explains the psychological reason (reward circuitry prioritizes transaction over reflection).',
            'Boldface 2: "**Consequently, the pedagogical efficacy... should be measured by long-term conceptual retention...**" -> Introduced by "Consequently", this is the ultimate recommendation and primary conclusion of the author.',
            'Hence, First is an assertion challenging an inference drawn by theorists; second is the main conclusion.'
          ],
          shortcutOrAlumTip: 'Look at the discourse markers: "However" signals an objection to the preceding claim; "Consequently" signals the logical deduction / final conclusion.',
          trapAnalysis: 'Option A claims the first is a premise supporting a widely held view, when it actually attacks that widely held view. Option B misidentifies the second as softening the objection.',
          prerequisite: 'Critical Reasoning Argument Architecture'
        },
        pastYearReference: 'XAT 2023 VALR (Bold-Faced Critical Reasoning)'
      },
      {
        id: 'xat-d1-valr-q2',
        exam: 'XAT',
        section: 'VALR',
        topic: 'Verbal Ability',
        subtopic: 'Vocabulary in Context & Nuance',
        type: 'MCQ',
        difficulty: 'Moderate',
        questionText: `Choose the option with the pair of words that best fills the blanks in the sentence below according to XAT stylistic and semantic standards:

The minister’s speech was marked by deliberate __________; while it appeared to project an air of conciliation to the striking labor unions, it was in fact __________ with covert stipulations that severely restricted collective bargaining rights.`,
        options: [
          { id: 'A', text: 'equivocation ... fraught' },
          { id: 'B', text: 'candor ... devoid' },
          { id: 'C', text: 'reticence ... replete' },
          { id: 'D', text: 'veracity ... laden' },
          { id: 'E', text: 'probity ... infused' }
        ],
        correctAnswer: 'A',
        explanation: {
          coreConcept: 'Contextual Semantic Contrast & Collocation',
          stepByStep: [
            'First blank: The context says "while it appeared to project conciliation... it was in fact with covert stipulations". This points to double-speak, ambiguity, or speaking with hidden meaning. "Equivocation" means the use of ambiguous language to conceal the truth.',
            'Second blank: "...it was in fact [filled with negative connotations/covert stipulations]". "Fraught with" specifically collocates with danger, hidden obstacles, or undesirable restrictions.',
            'Option B: "candor" means honesty/openness (opposite of covert stipulations).',
            'Option C: "reticence" means silence/reserve, but a public speech is being delivered.',
            'Option D: "veracity" means truthfulness.',
            'Option E: "probity" means moral integrity.'
          ],
          shortcutOrAlumTip: 'XAT vocabulary favors GRE-standard analytical words with exact tone registers. Look for tone flips indicated by "while... appeared to... in fact".',
          trapAnalysis: 'Option C is tempting because "replete" fits the second blank, but "reticence" fails the first blank.',
          prerequisite: 'Tone and Contextual Collocations'
        },
        pastYearReference: 'XAT 2022 VALR (Sentence Completion & Dual Blanks)'
      },
      {
        id: 'xat-d1-valr-q3',
        exam: 'XAT',
        section: 'VALR',
        topic: 'Critical Reasoning',
        subtopic: 'Flaw in the Argument',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `Archaeologist: "Excavations at the Mohenjo-daro perimeter have unearthed bronze mirrors in nearly 85% of residential complexes inhabited by the merchant class, whereas identical mirrors were discovered in fewer than 4% of agricultural quarter residences. This demonstrates that the ancient Indus agrarian population took significantly less pride in their personal hygiene and physical grooming than did the mercantile community."

Which of the following identifies the most serious logical flaw in the archaeologist’s reasoning?`,
        options: [
          { id: 'A', text: 'It presumes without justification that ancient mirrors were manufactured solely through lost-wax bronze casting.' },
          { id: 'B', text: 'It confuses the inability to afford a high-cost luxury artifact with a psychological indifference toward personal grooming.' },
          { id: 'C', text: 'It ignores the possibility that agricultural workers migrated seasonally to other Harappan settlements.' },
          { id: 'D', text: 'It fails to establish whether merchants and farmers belonged to distinct genetic lineages.' },
          { id: 'E', text: 'It relies upon the unverified assumption that personal grooming was considered an auspicious religious ritual in Mohenjo-daro.' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'XAT Critical Reasoning: Confounding Variable & Correlation vs Motivation',
          stepByStep: [
            'The premise: Merchants had bronze mirrors (85%); farmers did not (4%).',
            'The archaeologist\'s conclusion: Agrarian population cared less about their grooming/hygiene.',
            'The flaw: Bronze in antiquity was a precious, highly labor-intensive metallic alloy. Agrarians might care deeply about grooming using water reflections, polished stones, or community facilities, but simply lacked the economic surplus to purchase bronze mirrors.',
            'Option B precisely exposes this fatal leap from purchasing power to psychological disposition.'
          ],
          shortcutOrAlumTip: 'Ask yourself: What alternative explanation accounts for the difference in physical artifacts between rich merchants and subsistence farmers? Wealth disparity, not grooming philosophy!',
          trapAnalysis: 'Options A, C, and D introduce irrelevant tangents (casting techniques, seasonal migration, genetics) that have no bearing on the link between mirror ownership and grooming pride.',
          prerequisite: 'Argument Evaluation & Confounding Variables'
        },
        pastYearReference: 'XAT 2021 VALR (Critical Reasoning Flaw Identification)'
      },
      {
        id: 'xat-d1-valr-q4',
        exam: 'XAT',
        section: 'VALR',
        topic: 'Reading Comprehension',
        subtopic: 'Philosophy of Science & Popperian Falsification',
        type: 'MCQ',
        difficulty: 'Hard',
        contextText: `### Philosophical Passage: The Epistemic Mirage of Inductive Confirmation

In the epistemology of science, Karl Popper sought to sever the link between scientific validity and empirical verification. The inductivist tradition, tracing back to Francis Bacon and revitalized by the logical positivists of the Vienna Circle, presumed that the accumulation of positive instantiations imbues a universal proposition with progressive verisimilitude. To observe ten thousand white swans is, in inductivist calculus, to elevate the probability of the hypothesis "all swans are white" toward asymptotic certainty.

Popper demolished this epistemic complacence with an asymmetrical logical reality: no finite quantity of positive observations can formally entail a universal affirmative proposition, yet a solitary, rigorously documented counter-instance suffices to achieve its deductive annihilation. Scientific theories are not verified monuments carved in granite; they are audacious, provisional conjectures held aloft only until they are felled by a refuting observation. 

This asymmetry demands a profound psychological reversal in the investigator. The dogmatic scientist scours the empirical landscape for self-soothing confirmations, constructing ad-hoc immunizing stratagems whenever anomalies threaten to puncture the theoretical edifice. By contrast, authentic scientific progress requires a posture of methodological ruthlessness: formulating bold conjectures whose empirical content is directly proportional to their vulnerability to falsification, and actively contriving severe experimental trials designed to break them.`,
        questionText: 'Based on the passage, which of the following practices would Karl Popper consider the LEAST scientific?',
        options: [
          { id: 'A', text: 'A cosmologist publishing a mathematical model predicting an exact 0.003% gravitational lensing deflection, actively urging astronomers to abandon the model if telescopic observations contradict it.' },
          { id: 'B', text: 'An evolutionary biologist formulating an overarching behavioral theory that selectively absorbs every newly discovered animal anomaly by redefining the theory’s core terminology post-facto.' },
          { id: 'C', text: 'A chemist conducting thirty consecutive experiments specifically designed to trigger an anticipated explosion that would disprove her own patent-pending synthesis method.' },
          { id: 'D', text: 'A medical researcher rejecting a multi-million-dollar clinical drug hypothesis immediately after a single verified patient trial exhibits a fatal contraindication.' },
          { id: 'E', text: 'A particle physicist advancing a speculative subatomic particle whose existence can only be corroborated or refuted by a particle collider with four times current energy capabilities.' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Popperian Falsification & Ad-Hoc Immunizing Stratagems',
          stepByStep: [
            'Popper argues that authentic science involves bold conjectures that are vulnerable to refutation, whereas unscientific dogma engages in "ad-hoc immunizing stratagems" to absorb anomalies without risking falsification.',
            'Option B describes an evolutionary biologist who constantly redefines core definitions post-facto to protect the theory from being refuted. This is the exact definition of an immunizing stratagem, making the theory unfalsifiable and therefore pseudo-scientific.',
            'Options A, C, and D all embody authentic Popperian science: specifying testable conditions, actively contriving trials to break one\'s own hypothesis, and accepting single counter-instances as definitive falsification.'
          ],
          shortcutOrAlumTip: 'Identify the passage keyword: look for "ad-hoc immunizing stratagems". Any practice that makes a theory immune to disproof is the antithesis of Popperian science.',
          trapAnalysis: 'Option E is speculative, but Popper allowed bold theoretical conjectures so long as they are theoretically falsifiable once technology catches up; Option B actively evades falsification forever.',
          prerequisite: 'Philosophical Text Synthesis & Scientific Epistemology'
        },
        pastYearReference: 'XAT 2024 VALR (Philosophy of Epistemology & Scientific Method)'
      },

      // --- SECTION 3: QUANTITATIVE ABILITY & DATA INTERPRETATION (QADI) ---
      {
        id: 'xat-d1-qadi-q1',
        exam: 'XAT',
        section: 'QADI',
        topic: 'Quantitative Ability',
        subtopic: 'Functions & Functional Equations',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `Let $f(x)$ be a function defined for all positive real numbers such that for all $x, y > 0$:
$$f(xy) = f(x) + f(y) + 2$$
If $f(2) = 3$, find the value of $f(64) - f(8)$.`,
        options: [
          { id: 'A', text: '$15$' },
          { id: 'B', text: '$18$' },
          { id: 'C', text: '$21$' },
          { id: 'D', text: '$24$' },
          { id: 'E', text: '$27$' }
        ],
        correctAnswer: 'A',
        explanation: {
          coreConcept: 'Transformation to Standard Cauchy Functional Equations',
          stepByStep: [
            'Given $f(xy) = f(x) + f(y) + 2$.',
            'Add 2 to both sides: $f(xy) + 2 = (f(x) + 2) + (f(y) + 2)$.',
            'Define a new function $g(x) = f(x) + 2$.',
            'Then the equation transforms into: $g(xy) = g(x) + g(y)$, which is the classical Cauchy logarithmic functional equation!',
            'Therefore, $g(x) = k \\ln x$, or equivalently $g(2^n) = n \\cdot g(2)$.',
            'We are given $f(2) = 3 \\implies g(2) = f(2) + 2 = 3 + 2 = 5$.',
            'Now calculate $g(64)$ and $g(8)$:',
            '$g(64) = g(2^6) = 6 \\cdot g(2) = 6 \\times 5 = 30$. Hence $f(64) = g(64) - 2 = 30 - 2 = 28$.',
            '$g(8) = g(2^3) = 3 \\cdot g(2) = 3 \\times 5 = 15$. Hence $f(8) = g(8) - 2 = 15 - 2 = 13$.',
            'Therefore: $f(64) - f(8) = 28 - 13 = 15$.'
          ],
          shortcutOrAlumTip: 'Notice that $f(64) - f(8) = [g(64) - 2] - [g(8) - 2] = g(64) - g(8) = (6 - 3) \\cdot g(2) = 3 \\times 5 = 15$. Solved in 40 seconds!',
          trapAnalysis: 'Common blunder: forgetting the $+2$ constant in the substitution and writing $f(64) = 6 f(2) = 18$, leading to option B.',
          prerequisite: 'Cauchy Functional Equations & Substitution'
        },
        pastYearReference: 'XAT 2023 QADI (Functional Equations & Logarithmic Isomorphisms)'
      },
      {
        id: 'xat-d1-qadi-q2',
        exam: 'XAT',
        section: 'QADI',
        topic: 'Data Sufficiency',
        subtopic: 'Number Properties & Absolute Value Inequalities',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `This question consists of a problem followed by two statements, I and II. You must decide whether the data provided in the statements are sufficient to answer the question.

**Question:** Is the real number $x$ strictly positive?

**Statement I:** $|x - 3| < 2$
**Statement II:** $x^2 - 7x + 10 \\le 0$`,
        options: [
          { id: 'A', text: 'Statement I ALONE is sufficient to answer the question, but Statement II alone is NOT sufficient.' },
          { id: 'B', text: 'Statement II ALONE is sufficient to answer the question, but Statement I alone is NOT sufficient.' },
          { id: 'C', text: 'EACH Statement ALONE is sufficient to answer the question.' },
          { id: 'D', text: 'BOTH Statements I and II TOGETHER are sufficient to answer the question, but NEITHER statement alone is sufficient.' },
          { id: 'E', text: 'Statements I and II together are NOT sufficient to answer the question.' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'XAT Data Sufficiency: Inequality Domain Bounds',
          stepByStep: [
            'Test Statement I: $|x - 3| < 2$.',
            '$-2 < x - 3 < 2 \\implies 1 < x < 5$.',
            'Since every value in the open interval $(1, 5)$ is strictly positive ($x > 0$), Statement I ALONE unequivocally answers "YES, $x$ is strictly positive". Hence Statement I is sufficient.',
            'Test Statement II: $x^2 - 7x + 10 \\le 0$.',
            '$(x - 2)(x - 5) \\le 0 \\implies 2 \\le x \\le 5$.',
            'Every value in the closed interval $[2, 5]$ is strictly positive ($x > 0$), so Statement II ALONE also unequivocally answers "YES, $x$ is strictly positive". Hence Statement II is sufficient.',
            'Since both statements independently answer the question decisively, the answer is Option C.'
          ],
          shortcutOrAlumTip: 'In XAT Data Sufficiency, a statement is sufficient whether the answer is a definitive "YES" or a definitive "NO". Here both deliver a clear affirmative interval.',
          trapAnalysis: 'Candidates mistakenly think they need both statements together because the intervals overlap ($[2, 5] \\subset (1, 5)$). But in DS, each statement is analyzed independently first!',
          prerequisite: 'Data Sufficiency Framework & Absolute Value Ranges'
        },
        pastYearReference: 'XAT 2022 QADI (Data Sufficiency on Modulus Inequalities)'
      },
      {
        id: 'xat-d1-qadi-q3',
        exam: 'XAT',
        section: 'QADI',
        topic: 'Quantitative Ability',
        subtopic: 'Geometry & Incircle Tangency Properties',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `In a right-angled triangle $\\triangle ABC$ with $\\angle B = 90^\\circ$, the hypotenuse $AC$ has length $25\\text{ cm}$. An incircle is inscribed inside $\\triangle ABC$. If the radius of the incircle is $r = 3\\text{ cm}$, find the perimeter of $\\triangle ABC$.`,
        options: [
          { id: 'A', text: '$50\\text{ cm}$' },
          { id: 'B', text: '$56\\text{ cm}$' },
          { id: 'C', text: '$60\\text{ cm}$' },
          { id: 'D', text: '$62\\text{ cm}$' },
          { id: 'E', text: '$64\\text{ cm}$' }
        ],
        correctAnswer: 'B',
        explanation: {
          coreConcept: 'Right-Angled Triangle Inradius & Hypotenuse Identity',
          stepByStep: [
            'Let the perpendicular sides be $a$ and $b$, and hypotenuse $c = 25$.',
            'For any right-angled triangle, the inradius formula is:',
            '$$r = \\frac{a + b - c}{2}$$',
            'Substitute the given values $r = 3$ and $c = 25$:',
            '$$3 = \\frac{a + b - 25}{2} \\implies a + b - 25 = 6 \\implies a + b = 31$$',
            'The perimeter of $\\triangle ABC$ is $P = a + b + c$.',
            '$$P = 31 + 25 = 56\\text{ cm}$$'
          ],
          shortcutOrAlumTip: 'Instant XAT Inradius Formula: Perimeter $P = 2(c + r)$. Here $P = 2(25 + 3) = 2 \\times 28 = 56\\text{ cm}$. Solvable in under 15 seconds without finding individual sides!',
          trapAnalysis: 'Trying to compute individual sides $a$ and $b$ using $a^2 + b^2 = 625$ and $a + b = 31$ wastes valuable exam time.',
          prerequisite: 'Incircle Geometry & Inradius Identity'
        },
        pastYearReference: 'XAT 2021 QADI (Incircle Geometry in Right Triangles)'
      },
      {
        id: 'xat-d1-qadi-q4',
        exam: 'XAT',
        section: 'QADI',
        topic: 'Quantitative Ability',
        subtopic: 'Coordinate Geometry & Locus',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `The vertices of a triangle are located at $O(0,0)$, $A(6,0)$, and $B(0,8)$ on the Cartesian plane. What is the distance between the circumcenter and the orthocenter of $\\triangle OAB$?`,
        options: [
          { id: 'A', text: '$3.5\\text{ units}$' },
          { id: 'B', text: '$4.0\\text{ units}$' },
          { id: 'C', text: '$5.0\\text{ units}$' },
          { id: 'D', text: '$6.0\\text{ units}$' },
          { id: 'E', text: '$7.5\\text{ units}$' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'Properties of Centers in Right-Angled Triangles',
          stepByStep: [
            'Notice that $\\triangle OAB$ is a right-angled triangle with the right angle at vertex $O(0,0)$ because $OA$ lies along the x-axis and $OB$ lies along the y-axis.',
            'Theorem 1: In any right-angled triangle, the **orthocenter** is located precisely at the vertex containing the $90^\\circ$ angle. Thus, the orthocenter $H = (0, 0)$.',
            'Theorem 2: In any right-angled triangle, the **circumcenter** is located precisely at the midpoint of the hypotenuse $AB$.',
            'Hypotenuse $AB$ connects $A(6,0)$ and $B(0,8)$. Midpoint $M = \\left(\\frac{6 + 0}{2}, \\frac{0 + 8}{2}\\right) = (3, 4)$.',
            'The distance between orthocenter $(0,0)$ and circumcenter $(3,4)$ is simply:',
            '$$d = \\sqrt{(3 - 0)^2 + (4 - 0)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5.0\\text{ units}$$'
          ],
          shortcutOrAlumTip: 'In any right triangle, distance between orthocenter and circumcenter is always equal to the circumradius $R = \\frac{\\text{Hypotenuse}}{2} = \\frac{10}{2} = 5$. Immediate answer!',
          trapAnalysis: 'Don\'t calculate altitude equations or perpendicular bisector equations. Pure geometric theorems trivialize this coordinate geometry problem.',
          prerequisite: 'Triangle Centers (Orthocenter, Circumcenter, Centroid)'
        },
        pastYearReference: 'XAT 2024 QADI (Cartesian Triangle Centers)'
      },
      {
        id: 'xat-d1-qadi-q5',
        exam: 'XAT',
        section: 'QADI',
        topic: 'Quantitative Ability',
        subtopic: 'Progressions & Infinite Series Sums',
        type: 'MCQ',
        difficulty: 'Hard',
        questionText: `Find the sum of the infinite series:
$$S = \\frac{1}{2} + \\frac{2}{4} + \\frac{3}{8} + \\frac{4}{16} + \\frac{5}{32} + \\dots$$`,
        options: [
          { id: 'A', text: '$1$' },
          { id: 'B', text: '$\\frac{3}{2}$' },
          { id: 'C', text: '$2$' },
          { id: 'D', text: '$\\frac{5}{2}$' },
          { id: 'E', text: '$3$' }
        ],
        correctAnswer: 'C',
        explanation: {
          coreConcept: 'Arithmetico-Geometric Progression (AGP)',
          stepByStep: [
            'The given series is an AGP with common ratio $r = \\frac{1}{2}$ and arithmetic term differences $d = 1$:',
            '$$S = \\frac{1}{2} + \\frac{2}{4} + \\frac{3}{8} + \\frac{4}{16} + \\dots$$',
            'Multiply both sides by the common ratio $r = \\frac{1}{2}$:',
            '$$\\frac{1}{2}S = \\frac{1}{4} + \\frac{2}{8} + \\frac{3}{16} + \\dots$$',
            'Subtract the second equation from the first:',
            '$$S - \\frac{1}{2}S = \\frac{1}{2} + \\left(\\frac{2}{4} - \\frac{1}{4}\\right) + \\left(\\frac{3}{8} - \\frac{2}{8}\\right) + \\left(\\frac{4}{16} - \\frac{3}{16}\\right) + \\dots$$',
            '$$\\frac{1}{2}S = \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\frac{1}{16} + \\dots$$',
            'The right-hand side is a classic infinite geometric series with first term $a = \\frac{1}{2}$ and ratio $r = \\frac{1}{2}$:',
            '$$\\text{Sum of GP} = \\frac{a}{1 - r} = \\frac{1/2}{1 - 1/2} = 1$$',
            'Therefore, $\\frac{1}{2}S = 1 \\implies S = 2$.'
          ],
          shortcutOrAlumTip: 'General Formula for Infinite AGP starting with $a=1, d=1$: $S = \\frac{a r}{1 - r} + \\frac{d r^2}{(1 - r)^2} = \\frac{1/2}{1/2} + \\frac{1/4}{(1/2)^2} = 1 + 1 = 2$.',
          trapAnalysis: 'Forgetting to divide by $\\frac{1}{2}$ in the final step gives 1 (Option A), which is the sum of $\\frac{1}{2}S$.',
          prerequisite: 'Arithmetico-Geometric Series Manipulation'
        },
        pastYearReference: 'XAT 2020 QADI (Infinite Series & AGP Deductions)'
      }
    ]
  }
];
