import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      message, 
      testContext, 
      chatHistory = [] 
    } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    // Construct the mentor system prompt
    const systemPrompt = `You are "Crepe AI Mentor" — a warm, razor-sharp CAT & IIM coach. You are analyzing a student's recent test submission.

TEST SESSION CONTEXT:
- Test Title: ${testContext?.title || 'CAT Sprint'}
- Score: ${testContext?.totalScore} / ${testContext?.maxScore}
- Estimated Percentile: ${testContext?.percentile?.toFixed(1)}%ile
- Accuracy: ${testContext?.accuracy}%
- Correct Questions: ${testContext?.correctCount}, Wrong Questions: ${testContext?.wrongCount}, Unattempted: ${testContext?.unattemptedCount}
- Questions & User Responses Breakdown:
${(testContext?.questionsSummary || []).slice(0, 8).map((q: any) => `  * [${q.section}] ${q.topic} - Result: ${q.isCorrect ? 'CORRECT' : q.isAttempted ? 'WRONG' : 'UNATTEMPTED'}, User Ans: "${q.userAnswer}", Correct: "${q.correctAnswer}", Time: ${q.timeSeconds}s`).join('\n')}

GUIDELINES FOR YOUR RESPONSE:
1. Be concise, empathetic, and strategic (like a top IIM Ahmedabad mentor).
2. Directly answer the student's question based on their actual errors and performance data.
3. If they ask about traps, explain the cognitive deception in that question's options.
4. If they ask about time management, point out which question consumed too much time without yielding marks.
5. Provide actionable, high-yield advice rather than generic platitudes.
6. Use clean markdown and concise bullet points.`;

    if (apiKey) {
      try {
        const contents = [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nStudent: ${message}` }] }
        ];

        // Append recent chat history if available
        chatHistory.slice(-4).forEach((item: any) => {
          contents.push({
            role: item.sender === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }]
          });
        });

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents })
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ reply });
          }
        }
      } catch (geminiError) {
        console.warn('Gemini chat failed, using fallback coach:', geminiError);
      }
    }

    // Dynamic Context-Aware IIM Mentor Fallback Engine
    const lower = message.toLowerCase();
    let reply = '';

    if (lower.includes('trap') || lower.includes('mistake') || lower.includes('wrong')) {
      reply = `### 🔍 Post-Submission Error & Trap Diagnostics

Looking at your results (${testContext?.wrongCount || 0} incorrect questions):

1. **Option Traps in RC / Verbal**:
   - In CAT VARC, wrong options typically use **extreme absolutes** (*solely, entirely, inevitable*) or **reverse the author's causal link**.
   - Review your incorrect RC questions: did you pick the option that sounded familiar rather than the one strictly bounded by the passage?

2. **Algebra / Quant Boundaries**:
   - In QA inequalities and roots, check if you verified the **domain restrictions** (e.g. log argument $> 0$, base $\\neq 1$). The boundary values ($x=2, 3$) are deliberate traps.

3. **Recommended Immediate Action**:
   - Click the **"Log to Mistake Book"** button for each wrong question.
   - Re-attempt them in 48 hours without looking at the step-by-step solution!`;
    } else if (lower.includes('time') || lower.includes('speed') || lower.includes('slow')) {
      reply = `### ⏱️ Time Allocation & Pacing Strategy

Your total test duration was **${Math.floor((testContext?.totalTimeSeconds || 0) / 60)} minutes**:

- **The 2-Minute Rule**: In CAT QA, if you have not found a concrete algebraic equation or geometric path within **90 to 120 seconds**, mark it and MOVE ON immediately.
- **DILR Caselet Selection**: Spending 3 minutes up-front scanning all 4 caselets before choosing the first one will save you 15 minutes of stuck deadlock.
- **Accuracy Multiplier**: In CAT, 12 accurate attempts per section with 90% accuracy beats 18 rushed attempts with 60% accuracy every single time.`;
    } else if (lower.includes('college') || lower.includes('call') || lower.includes('iim') || lower.includes('fms')) {
      reply = `### 🎓 Projected College Shortlists at ${testContext?.percentile?.toFixed(1) || 95}%ile

Based on your current performance:

- **Target Range (Solid Contenders)**:
  - **MDI Gurgaon** (CAT 94-96%ile) — Strong calls in Consulting & Marketing.
  - **SPJIMR Mumbai** (CAT 85-95%ile) — High probability if you apply for the early profile-based shortlist.
  - **New IIMs (Trichy, Udaipur, Ranchi)** — Very safe shortlist threshold.

- **For Tier-1 ABC & FMS**:
  - To secure **FMS Delhi**, target pushing your VARC sectional accuracy to 85%+.
  - To secure **IIM Calcutta**, focus on Quant & DILR where high raw marks yield immediate 99.6+%ile scaling.
  - Check the **Crepe Profile Evaluator** to see how your 10th/12th marks alter these cutoffs!`;
    } else {
      reply = `### 🐱 Crepe AI Mentor Assessment

You scored **${testContext?.totalScore || 0} marks** (${testContext?.percentile?.toFixed(1) || 0}%ile) with **${testContext?.accuracy || 0}% accuracy**.

Here is your customized strategy from here:
- **What worked**: You secured **${testContext?.correctCount || 0} correct questions**, proving your foundational concepts in those topics are intact.
- **The next leap**: Focus on eliminating negative marks ($-1$ per wrong MCQ). Skiping 2 doubtful questions would have directly elevated your net scaled score by **+2 marks** (often a 3-4 percentile difference in CAT!).
- Would you like me to walk you through the shortcut solution for any specific question from this set?`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in chat-coach:', error);
    return NextResponse.json({ error: 'Failed to process coach query' }, { status: 500 });
  }
}
