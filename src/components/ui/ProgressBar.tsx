import React from 'react';

interface ProgressBarProps {
  percent: number;
  colorClass?: string;
  heightClass?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  colorClass = 'bg-gradient-to-r from-[#B55B34] via-[#C28E42] to-[#7CA376]',
  heightClass = 'h-2.5',
}) => {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className={`autumn-track w-full overflow-hidden rounded-full ${heightClass}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};
