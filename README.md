# CATPrep Matrix 🎯

> **Elite All-Round Web Application for CAT Exam Preparation & OMETs (XAT, NMAT, SNAP)**  
> Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, KaTeX, and ready for instant **Vercel** deployment.

---

## 🌟 Key Highlights & Features

### 1. 🎯 Authentic CAT Exam Format & High-Yield Daily Targets
- **Sectional Structure**:
  - **VARC (24 Qs)**: 16 RC questions (4 passages $\times$ 4 Qs) spanning behavioral economics, cognitive philosophy, sociology, plus 8 Verbal Ability questions (TITA Para Jumbles, Para Summary, Odd Sentence Out).
  - **DILR (20 Qs)**: 4 high-yield caselets (Games & Tournaments, Matrix Arrangements, Routes & Networks, Missing Data Tables) with both MCQ and TITA exact value deductions.
  - **QA (22 Qs)**: Arithmetic, Algebra, Geometry, Modern Math, and Number Systems with rigorous conceptual traps.
- **Strict Scoring Engine**:
  - **MCQ**: $+3$ for Correct, $-1$ for Incorrect.
  - **TITA (Type In The Answer)**: $+3$ for Correct, **$0$ penalty** for Incorrect.
- **Daily Target Sprints**:
  - Daily curated sprints (Day 1, Day 2, Day 3...) structured like a real exam subsection.
  - Choose between **Timed Sprint Mode** (with countdown alerts) or **Practice & Learn Mode** (untimed with instant explanation reveals).

---

### 2. 🏛️ Authentic TCS iON Exam Engine Simulation
- **Full-Screen Exam UI**:
  - Split-pane reading layout for RC passages and DILR caselets with custom scroll synchronization.
  - Question Palette matching the iconic 5 TCS iON color states:
    1. ⚪ **Not Visited** (Grey)
    2. 🔴 **Not Answered** (Red)
    3. 🟢 **Answered** (Green)
    4. 🟣 **Marked for Review** (Purple)
    5. 🟣🟢 **Answered & Marked for Review** (Purple with Green Dot — evaluated in CAT!)
  - **CAT Virtual On-Screen Calculator**: Faithful replica of the official basic/scientific calculator with memory functions (`MC`, `MR`, `MS`, `M+`, `M-`), reciprocal (`1/x`), square root ($\sqrt{x}$), and sign change.
  - **Virtual TITA Numpad**: On-screen numerical keypad plus physical keyboard support.
  - **Full Question Paper Modal** and **Instructions Modal**.

---

### 3. 🌐 Seamless Multi-Exam Extensibility (CAT, XAT, NMAT, SNAP)
Easily toggle between target management entrance tests:
- **CAT (IIMs)**: 66 Qs, 120m, 40m sectional locks, $+3/-1$, on-screen calculator.
- **XAT (XLRI)**: Decision Making (DM), VALR, QADI, unattempted question penalty beyond 8 blanks ($-0.10$), no calculator.
- **NMAT (GMAC)**: 108 Qs, 120m, adaptive pacing, **no negative marking** ($+3/0$), candidate section order selection.
- **SNAP (SIBM)**: 60 Qs, 60m speed sprint, $+1/-0.25$, no sectional locks.

---

### 4. 📊 Performance Analytics & Scaled Percentile Estimator
- Instant scorecard upon submission with:
  - **Raw Score & Maximum Score**
  - **Estimated CAT Percentile** (calibrated against 99.8%ile, 99.2%ile, 95%ile, 90%ile benchmark score curves)
  - **Sectional Performance Diagnostics** (Accuracy %, Attempt Rate, Net Marks, Time Spent)
  - **Celebration Confetti** for top-tier percentiles.

---

### 5. 💡 Deep Solution Breakdown & Trap Analysis
Each question includes:
- **Step-by-Step Proof / Derivation** with KaTeX rendered mathematical equations.
- **⚡ IIM Alum Shortcut (60-90s Hack)**: Fast heuristics to eliminate options without brute force.
- **⚠️ Trap Alert**: Highlights exactly which distractor option students typically pick and why it fails.
- **Reference**: Mapping to actual CAT past year patterns (e.g. CAT 2023 Slot 2).

---

### 6. 📓 Personal Mistake Notebook (Error Log)
- One-click **"Log to Mistake Book"** from any test review screen.
- Categorize mistakes by root cause:
  - *Conceptual Error*
  - *Calculation Mistake*
  - *Misread Question*
  - *Time Pressure*
  - *Trap Option Picked*
- **Interactive Re-attempt Mode**: Re-test yourself on past mistakes and mark them as "Mastered".

---

### 7. 🤖 AI Question Lab (Infinite Generator)
- Generate customized, high-yield CAT and OMET questions on any topic.
- Powered by `/api/generate-question` with support for Google Gemini AI (`GEMINI_API_KEY`) and an elite built-in fallback question bank.

---

### 8. 🗄️ Formula & Trap Cheat Sheet Vault
- Instant access to high-frequency formulas:
  - **Arithmetic**: Relative Speed (Circular Tracks), Alligation Cross Rule, Successive Dilution, Escalators.
  - **Algebra**: Sum of Cubes of Roots, AM-GM Inequality, Modulus Graphs, Telescoping Series.
  - **Geometry**: Apollonius Theorem, Perpendicular Chords Circumradius, Ptolemy\'s Theorem.
  - **VARC**: Tone & Distractor Traps Matrix (Extreme words, scope shifts, false comparisons).
  - **DILR**: Knockout tournament formulas, round-robin points conservation.

---

## 🚀 Getting Started

### Local Development

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd "CAT Prep tool"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **(Optional) Configure Gemini API**:
   Create a `.env.local` file:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

---

## ☁️ Deploying to Vercel

This application is built natively for zero-configuration deployment on **Vercel**:

### Method 1: Via Vercel Dashboard (GitHub / GitLab)
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete CAT & multi-exam prep app"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import this repository.
4. (Optional) In the **Environment Variables** section, add `GEMINI_API_KEY`.
5. Click **"Deploy"**!

### Method 2: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Math Rendering**: KaTeX 0.16
- **Effects**: Canvas Confetti
