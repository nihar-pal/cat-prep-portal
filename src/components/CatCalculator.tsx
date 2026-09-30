'use client';

import React, { useState } from 'react';
import { X, Minus, RefreshCw } from 'lucide-react';

interface CatCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CatCalculator: React.FC<CatCalculatorProps> = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [pendingOperator, setPendingOperator] = useState<string | null>(null);
  const [firstOperand, setFirstOperand] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setPendingOperator(null);
    setWaitingForOperand(false);
  };

  const handleClearEntry = () => {
    setDisplay('0');
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (pendingOperator) {
      const result = calculate(firstOperand, inputValue, pendingOperator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForOperand(true);
    setPendingOperator(nextOperator);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);
    if (pendingOperator && firstOperand !== null) {
      const result = calculate(firstOperand, inputValue, pendingOperator);
      setDisplay(String(result));
      setFirstOperand(null);
      setPendingOperator(null);
      setWaitingForOperand(true);
    }
  };

  const handleSqrt = () => {
    const val = parseFloat(display);
    if (val >= 0) {
      setDisplay(String(Math.sqrt(val)));
      setWaitingForOperand(true);
    }
  };

  const handleReciprocal = () => {
    const val = parseFloat(display);
    if (val !== 0) {
      setDisplay(String(1 / val));
      setWaitingForOperand(true);
    }
  };

  const handleToggleSign = () => {
    const val = parseFloat(display);
    setDisplay(String(-val));
  };

  // Memory functions
  const handleMemoryAdd = () => {
    setMemory(memory + parseFloat(display));
  };
  const handleMemorySub = () => {
    setMemory(memory - parseFloat(display));
  };
  const handleMemoryRecall = () => {
    setDisplay(String(memory));
    setWaitingForOperand(true);
  };
  const handleMemoryClear = () => {
    setMemory(0);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-72 bg-slate-900 border-2 border-slate-700 rounded-lg shadow-2xl overflow-hidden font-sans text-xs">
      {/* Title bar */}
      <div className="bg-slate-800 text-slate-200 px-3 py-2 flex items-center justify-between border-b border-slate-700 select-none cursor-move">
        <div className="flex items-center space-x-1.5 font-bold tracking-wide">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
          <span>CAT Virtual Calculator (TCS iON)</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-0.5 rounded transition"
          title="Close"
        >
          <X size={15} />
        </button>
      </div>

      {/* Screen */}
      <div className="p-3 bg-slate-950">
        <div className="text-[10px] text-slate-400 h-4 text-right overflow-hidden font-mono">
          {firstOperand !== null && `${firstOperand} ${pendingOperator || ''}`}
          {memory !== 0 && <span className="ml-2 px-1 rounded bg-amber-900/60 text-amber-300">M</span>}
        </div>
        <div className="text-xl font-bold font-mono text-emerald-400 text-right truncate py-1 border-b border-slate-800">
          {display}
        </div>
      </div>

      {/* Keypad */}
      <div className="p-2 grid grid-cols-5 gap-1 bg-slate-900">
        {/* Memory row */}
        <button onClick={handleMemoryClear} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold rounded">MC</button>
        <button onClick={handleMemoryRecall} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold rounded">MR</button>
        <button onClick={handleMemoryAdd} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold rounded">M+</button>
        <button onClick={handleMemorySub} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold rounded">M-</button>
        <button onClick={handleClear} className="p-1.5 bg-rose-900/60 hover:bg-rose-800 text-rose-300 font-bold rounded">C</button>

        {/* Function row */}
        <button onClick={handleSqrt} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded">√</button>
        <button onClick={handleReciprocal} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded">1/x</button>
        <button onClick={handleToggleSign} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded">±</button>
        <button onClick={handleClearEntry} className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded">CE</button>
        <button onClick={() => handleOperator('/')} className="p-1.5 bg-blue-900/50 hover:bg-blue-800 text-blue-200 font-bold rounded">÷</button>

        {/* Row 7 8 9 * */}
        <button onClick={() => handleDigit('7')} className="p-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded col-span-1">7</button>
        <button onClick={() => handleDigit('8')} className="p-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded col-span-1">8</button>
        <button onClick={() => handleDigit('9')} className="p-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded col-span-1">9</button>
        <button onClick={() => handleOperator('*')} className="p-2 bg-blue-900/50 hover:bg-blue-800 text-blue-200 font-bold rounded col-span-2">×</button>

        {/* Row 4 5 6 - */}
        <button onClick={() => handleDigit('4')} className="p-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded col-span-1">4</button>
        <button onClick={() => handleDigit('5')} className="p-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded col-span-1">5</button>
        <button onClick={() => handleDigit('6')} className="p-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded col-span-1">6</button>
        <button onClick={() => handleOperator('-')} className="p-2 bg-blue-900/50 hover:bg-blue-800 text-blue-200 font-bold rounded col-span-2">−</button>

        {/* Row 1 2 3 + */}
        <button onClick={() => handleDigit('1')} className="p-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded col-span-1">1</button>
        <button onClick={() => handleDigit('2')} className="p-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded col-span-1">2</button>
        <button onClick={() => handleDigit('3')} className="p-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded col-span-1">3</button>
        <button onClick={() => handleOperator('+')} className="p-2 bg-blue-900/50 hover:bg-blue-800 text-blue-200 font-bold rounded col-span-2">+</button>

        {/* Row 0 . = */}
        <button onClick={() => handleDigit('0')} className="p-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded col-span-2">0</button>
        <button onClick={handleDecimal} className="p-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded col-span-1">.</button>
        <button onClick={handleEquals} className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded col-span-2">=</button>
      </div>

      <div className="bg-slate-950 px-2 py-1 text-[10px] text-slate-400 text-center border-t border-slate-800">
        Simulated official CAT on-screen calculator
      </div>
    </div>
  );
};
