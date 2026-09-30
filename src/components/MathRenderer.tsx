'use client';

import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  content: string;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '' }) => {
  const renderedContent = useMemo(() => {
    if (!content) return '';

    // Replace display math $$...$$
    let text = content.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
      try {
        return `<div class="my-2 py-1 overflow-x-auto text-center">${katex.renderToString(math.trim(), {
          displayMode: true,
          throwOnError: false
        })}</div>`;
      } catch (err) {
        return `<span class="text-amber-500 font-mono text-xs">$$${math}$$</span>`;
      }
    });

    // Replace inline math $...$
    text = text.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
      try {
        return katex.renderToString(math.trim(), {
          displayMode: false,
          throwOnError: false
        });
      } catch (err) {
        return `<span class="text-amber-500 font-mono text-xs">$${math}$</span>`;
      }
    });

    // Replace basic markdown headings, bold, italics, line breaks
    text = text
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-slate-900 dark:text-white mt-5 mb-2">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-slate-100">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/\n\n/g, '<br/><br/>');

    return text;
  }, [content]);

  return (
    <div
      className={`prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
};
