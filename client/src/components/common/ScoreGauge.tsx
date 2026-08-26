import React, { useEffect, useState } from 'react';

interface ScoreGaugeProps {
  score: number; // 0 - 100
  size?: number;
  language?: 'en' | 'vi';
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, size = 180, language = 'en' }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const isEn = language === 'en';

  // Animated counter effect
  useEffect(() => {
    let start = 0;
    const end = Math.min(100, Math.max(0, score));
    const duration = 1200; // ms
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayScore(end);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [score]);

  const strokeWidth = 14;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const isPassing = score >= 70;
  const glowColor = isPassing ? '#D4FF00' : '#FF2E93';
  const progressGradient = isPassing
    ? 'url(#limeGradient)'
    : 'url(#pinkGradient)';

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="limeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F5FF" />
            <stop offset="60%" stopColor="#D4FF00" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF2E93" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
          <filter id="gaugeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={glowColor} floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(0, 0, 0, 0.08)"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Animated Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressGradient}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          filter="url(#gaugeShadow)"
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>

      {/* Central Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">
          FIT SCORE
        </span>
        <div className="flex items-baseline justify-center">
          <span
            className={`font-black text-5xl tracking-tighter ${
              isPassing ? 'text-gray-900' : 'text-[#FF2E93]'
            }`}
          >
            {displayScore}
          </span>
          <span className="text-xl font-bold text-gray-400 ml-0.5">/100</span>
        </div>
        <span
          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full mt-1 uppercase tracking-wider ${
            isPassing
              ? 'bg-[#D4FF00] text-black shadow-sm'
              : 'bg-[#FF2E93]/15 text-[#FF2E93]'
          }`}
        >
          {isPassing
            ? isEn
              ? '🔥 SLAYING'
              : '🔥 CHÁY PHỐ'
            : isEn
            ? '⚠️ NEEDS UPGRADE'
            : '⚠️ CẦN UPGRADE'}
        </span>
      </div>
    </div>
  );
};
