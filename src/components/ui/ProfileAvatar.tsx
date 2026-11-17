import React from 'react';

export const AVATAR_CHOICES: readonly { id: string; label: string }[] = [
  { id: '🐰', label: 'Bunny' },
  { id: 'beanie', label: 'Beanie' },
  { id: '👑', label: 'Crown' },
  { id: '🎤', label: 'Mic' },
  { id: '⚡', label: 'Bolt' },
  { id: '🐆', label: 'Scary' },
  { id: '🇬🇧', label: 'UK' },
  { id: '🌶️', label: 'Spice' },
];

export const ProfileAvatar: React.FC<{
  avatar: string;
  sizeClass?: string;
}> = ({ avatar, sizeClass = 'text-base' }) => {
  if (avatar === 'beanie') {
    return (
      <span
        className="inline-flex items-center justify-center align-middle"
        title="Beanie"
        aria-label="Beanie"
      >
        <svg viewBox="0 0 36 36" className="h-[1.25em] w-[1.25em]" role="img">
          {/* Pom-pom */}
          <circle cx="18" cy="6.5" r="4.2" fill="#F472B6" />
          <circle cx="16.8" cy="5.5" r="1.4" fill="#FBCFE8" />
          {/* Knit dome */}
          <path
            d="M7 23 C7 13.5, 11.5 9.5, 18 9.5 C24.5 9.5, 29 13.5, 29 23 Z"
            fill="#EC4899"
          />
          {/* Knit vertical ribs */}
          <path
            d="M13 11 V23 M18 9.8 V23 M23 11 V23"
            stroke="#BE185D"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {/* Folded ribbed cuff */}
          <rect
            x="5"
            y="22"
            width="26"
            height="8.5"
            rx="4"
            fill="#F59E0B"
            stroke="#B45309"
            strokeWidth="1.2"
          />
          <path
            d="M10 23.5 V29 M14 23.5 V29 M18 23.5 V29 M22 23.5 V29 M26 23.5 V29"
            stroke="#B45309"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  }

  return <span className={`leading-none ${sizeClass}`}>{avatar}</span>;
};
