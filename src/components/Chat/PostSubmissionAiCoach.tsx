'use client';

import React, { useState } from 'react';
import { Send, Sparkles, Bot, User, CornerDownLeft, RefreshCw, MessageSquare } from 'lucide-react';
import { CuteCatLogo } from '@/components/CuteCatLogo';
import { MathRenderer } from '@/components/MathRenderer';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

interface PostSubmissionAiCoachProps {
  testContext: {
    title: string;
    totalScore: number;
    maxScore: number;
    percentile: number;
    accuracy: number;
    correctCount: number;
    wrongCount: number;
    unattemptedCount: number;
    totalTimeSeconds: number;
    questionsSummary: Array<{
      id: string;
      section: string;
      topic: string;
      isCorrect: boolean;
      isAttempted: boolean;
      userAnswer: string;
      correctAnswer: string;
      timeSeconds: number;
    }>;
  };
}

export const PostSubmissionAiCoach: React.FC<PostSubmissionAiCoachProps> = ({ testContext }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello! I'm your **Crepe AI Post-Submission Coach** 🐱.

I've reviewed your results for **${testContext.title}**:
- **Score**: ${testContext.totalScore} / ${testContext.maxScore} marks
- **Estimated Percentile**: **${testContext.percentile.toFixed(1)}%ile**
- **Accuracy**: ${testContext.accuracy}% (${testContext.correctCount} Correct, ${testContext.wrongCount} Wrong)

Let's debrief your performance so you don't repeat these mistakes in your actual exam. What would you like to explore?`,
      time: 'Just now'
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const promptSuggestions = [
    '🔍 Why did I fall for traps in my wrong answers?',
    '⏱️ How can I manage my time better on this set?',
    '🎓 Which IIMs/Colleges can I target with this score?',
    '⚡ Show me the fastest shortcut for the questions I missed'
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          testContext,
          chatHistory: messages.map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await res.json();
      if (data.reply) {
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden font-sans">
      {/* Header */}
      <div className="px-6 py-4 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center space-x-2.5">
          <CuteCatLogo size={28} />
          <div>
            <h3 className="font-bold text-sm text-zinc-100 flex items-center space-x-1.5">
              <span>Crepe AI Mentor &bull; Post-Test Debrief</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
            </h3>
            <p className="text-[11px] text-zinc-400">Context-aware performance & error diagnostics</p>
          </div>
        </div>

        <div className="text-xs font-mono text-amber-400 font-bold bg-zinc-800/80 px-2.5 py-1 rounded-full border border-zinc-700">
          {testContext.percentile.toFixed(1)}%ile Session
        </div>
      </div>

      {/* Chat Messages Stream */}
      <div className="p-6 max-h-[420px] overflow-y-auto space-y-4 text-xs bg-zinc-50/40 dark:bg-zinc-950/40">
        {messages.map(m => (
          <div
            key={m.id}
            className={`flex items-start space-x-3 ${m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
              m.sender === 'ai' ? 'bg-amber-500/10 text-amber-500' : 'bg-zinc-800 text-white'
            }`}>
              {m.sender === 'ai' ? <CuteCatLogo size={20} /> : <User size={14} />}
            </div>

            <div className={`max-w-[85%] rounded-2xl p-4 shadow-xs leading-relaxed ${
              m.sender === 'ai'
                ? 'bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200'
                : 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
            }`}>
              <MathRenderer content={m.text} className="text-xs" />
              <div className={`text-[10px] mt-2 font-mono ${m.sender === 'ai' ? 'text-zinc-400' : 'text-zinc-400 dark:text-zinc-500'}`}>
                {m.time}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-xs text-zinc-400 py-2">
            <RefreshCw size={13} className="animate-spin text-amber-500" />
            <span>Crepe AI Mentor is analyzing your test log...</span>
          </div>
        )}
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
        <div className="text-[11px] font-bold text-zinc-400 mb-2 uppercase tracking-wider">
          Suggested Analysis Questions:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {promptSuggestions.map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSend(prompt)}
              disabled={loading}
              className="px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium transition text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input box */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        className="p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 flex items-center space-x-2"
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Crepe AI about your mistakes, shortcuts, or time management..."
          className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 transition disabled:opacity-40"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
};
