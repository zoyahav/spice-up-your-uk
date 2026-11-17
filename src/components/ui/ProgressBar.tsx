import React from 'react';

interface ProgressBarProps {
  percent: number;
  colorClass?: string;
  heightClass?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  colorClass = 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400',
  heightClass = 'h-2.5',
}) => {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className={`w-full overflow-hidden rounded-full bg-slate-800/90 ${heightClass}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};
