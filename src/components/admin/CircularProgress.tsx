'use client';

import { useEffect, useState } from 'react';

interface CircularProgressProps {
  percentage: number;
}

export default function CircularProgress({ percentage }: CircularProgressProps) {
  const [currentPct, setCurrentPct] = useState(0);

  const clamped = Math.min(Math.max(percentage, 0), 100);
  const strokeWidth = 4.5;
  const radius = 21;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentPct / 100) * circumference;

  useEffect(() => {
    // Trigger smooth stroke-dashoffset animation after mount
    const timer = setTimeout(() => {
      setCurrentPct(clamped);
    }, 120);
    return () => clearTimeout(timer);
  }, [clamped]);

  // Dynamic colors based on percentage
  const getColorConfig = (pct: number) => {
    if (pct >= 100) {
      return {
        stroke: '#22c55e', // Emerald Green (100% Target Tercapai)
        track: 'rgba(34, 197, 94, 0.15)',
        text: '#16a34a',
        glow: 'rgba(34, 197, 94, 0.4)',
      };
    }
    if (pct >= 75) {
      return {
        stroke: '#0ea5e9', // Bright Sky Blue (75% - 99%)
        track: 'rgba(14, 165, 233, 0.15)',
        text: '#0284c7',
        glow: 'rgba(14, 165, 233, 0.4)',
      };
    }
    if (pct >= 25) {
      return {
        stroke: '#0284c7', // Primary Sky-Blue (25% - 74%)
        track: 'rgba(2, 132, 199, 0.15)',
        text: '#0369a1',
        glow: 'rgba(2, 132, 199, 0.35)',
      };
    }
    if (pct > 0) {
      return {
        stroke: '#f59e0b', // Amber (1% - 24%)
        track: 'rgba(245, 158, 11, 0.15)',
        text: '#d97706',
        glow: 'rgba(245, 158, 11, 0.35)',
      };
    }
    return {
      stroke: '#cbd5e1', // Slate Gray (0%)
      track: '#f1f5f9',
      text: '#94a3b8',
      glow: 'none',
    };
  };

  const config = getColorConfig(clamped);

  return (
    <div className="circular-progress-wrap" title={`Ketercapaian: ${clamped}%`}>
      <div className="progress-ring">
        <svg viewBox="0 0 52 52">
          {/* Background circle track */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            stroke={config.track}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated progress circle */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            stroke={config.stroke}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              filter: clamped > 0 ? `drop-shadow(0 0 4px ${config.glow})` : 'none',
            }}
          />
        </svg>
        <span
          className="percentage-text"
          style={{ color: config.text }}
        >
          {clamped}%
        </span>
      </div>
    </div>
  );
}
