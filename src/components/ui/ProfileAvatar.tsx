import React from 'react';

/**
 * Pure Unicode emoji badge options: fun faces, glasses, women dancing, animals & Spice classics!
 */
export const AVATAR_EMOJIS: readonly string[] = [
  '🐰',
  '👯‍♀️',
  '💃',
  '👩‍🎤',
  '😎',
  '🤓',
  '🥳',
  '🤩',
  '😜',
  '🦊',
  '🦁',
  '🐆',
  '👑',
  '🌶️',
  '🎤',
  '🇬🇧',
];

export const ProfileAvatar: React.FC<{
  avatar: string;
  sizeClass?: string;
}> = ({ avatar, sizeClass = 'text-base' }) => {
  const safeEmoji = avatar === 'beanie' || !avatar ? '🐰' : avatar;
  return <span className={`leading-none ${sizeClass}`}>{safeEmoji}</span>;
};
