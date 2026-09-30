'use client';

import React from 'react';

interface CuteCatLogoProps {
  size?: number;
  className?: string;
}

export const CuteCatLogo: React.FC<CuteCatLogoProps> = ({ size = 32, className = '' }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform hover:scale-105 duration-200"
      >
        {/* Soft Background Pill / Aura */}
        <rect width="64" height="64" rx="18" fill="currentColor" className="text-amber-500/10 dark:text-amber-400/10" />

        {/* Left Ear */}
        <path
          d="M16 30L19 14C19 14 26 18 29 23L16 30Z"
          fill="currentColor"
          className="text-slate-800 dark:text-amber-300"
        />
        {/* Left Ear Inner */}
        <path
          d="M20 25L21 17C21 17 24 19 26 22L20 25Z"
          fill="#F59E0B"
        />

        {/* Right Ear */}
        <path
          d="M48 30L45 14C45 14 38 18 35 23L48 30Z"
          fill="currentColor"
          className="text-slate-800 dark:text-amber-300"
        />
        {/* Right Ear Inner */}
        <path
          d="M44 25L43 17C43 17 40 19 38 22L44 25Z"
          fill="#F59E0B"
        />

        {/* Cat Head Base */}
        <path
          d="M14 36C14 27.1634 22.0589 20 32 20C41.9411 20 50 27.1634 50 36C50 44.8366 41.9411 50 32 50C22.0589 50 14 44.8366 14 36Z"
          fill="currentColor"
          className="text-slate-900 dark:text-slate-100"
        />

        {/* Cute Eyes (Happy curved squint / wink) */}
        <path
          d="M23 35C24.5 33 27.5 33 29 35"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-amber-400 dark:text-slate-900"
        />
        <path
          d="M35 35C36.5 33 39.5 33 41 35"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-amber-400 dark:text-slate-900"
        />

        {/* Cute Little Pink/Amber Nose */}
        <path
          d="M32 40L30.5 38H33.5L32 40Z"
          fill="#F59E0B"
        />

        {/* Cute Cat Mouth */}
        <path
          d="M29.5 41C30.5 42.5 31.5 42.5 32 41.5C32.5 42.5 33.5 42.5 34.5 41"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="text-amber-400 dark:text-slate-900"
        />

        {/* Whiskers Left */}
        <path
          d="M11 36L19 37"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-slate-400 dark:text-slate-600"
        />
        <path
          d="M12 40L19 39"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-slate-400 dark:text-slate-600"
        />

        {/* Whiskers Right */}
        <path
          d="M53 36L45 37"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-slate-400 dark:text-slate-600"
        />
        <path
          d="M52 40L45 39"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-slate-400 dark:text-slate-600"
        />

        {/* Tiny Rosy Cheeks */}
        <circle cx="21" cy="38" r="2" fill="#F43F5E" fillOpacity="0.75" />
        <circle cx="43" cy="38" r="2" fill="#F43F5E" fillOpacity="0.75" />
      </svg>
    </div>
  );
};
