/**
 * Spice Up Your UK — Playful Spice Girls references, ranks, badges, and celebratory copy.
 */

export interface RankTier {
  readonly id: string;
  readonly title: string;
  readonly minXp: number;
  readonly subtitle: string;
  readonly emoji: string;
  readonly gradient: string;
}

export const SPICE_RANKS: readonly RankTier[] = [
  {
    id: 'wannabe',
    title: 'Wannabe Brit',
    minXp: 0,
    subtitle: 'Tell me what you want, what you really, really want!',
    emoji: '🎤',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'zigazig',
    title: 'Zig-A-Zig Scholar',
    minXp: 250,
    subtitle: 'Getting down with 1066 and all that.',
    emoji: '⚡',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    id: 'sporty',
    title: 'Sporty Sprinter',
    minXp: 750,
    subtitle: 'Backflipping through Tube Blitz rounds.',
    emoji: '👟',
    gradient: 'from-sky-400 to-blue-600',
  },
  {
    id: 'scary',
    title: 'Scary Smart',
    minXp: 1600,
    subtitle: 'Tudors, Stuarts, and Supreme Courts fear you.',
    emoji: '🐆',
    gradient: 'from-purple-500 to-fuchsia-600',
  },
  {
    id: 'ginger',
    title: 'Ginger Historian',
    minXp: 3000,
    subtitle: 'Rocking the Union Jack dress of knowledge!',
    emoji: '🇬🇧',
    gradient: 'from-rose-500 to-red-600',
  },
  {
    id: 'posh',
    title: 'Posh Citizen Ready',
    minXp: 5000,
    subtitle: 'Viva Forever — ready to ace the £50 test in 4 minutes flat.',
    emoji: '👑',
    gradient: 'from-yellow-400 via-amber-500 to-pink-500',
  },
];

export interface AchievementBadge {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly emoji: string;
}

export const SPICE_BADGES: readonly AchievementBadge[] = [
  {
    id: 'first-spice',
    title: 'Spice Up Your Life!',
    description: 'Complete your very first study session or quiz.',
    emoji: '🌶️',
  },
  {
    id: 'say-youll-pass',
    title: "Say You'll Pass It",
    description: 'Pass a full 24-question Official Mock Exam (18/24+).',
    emoji: '🎟️',
  },
  {
    id: 'two-become-one',
    title: '2 Become 1 Streak',
    description: 'Build a 3-day shared Couple Streak together.',
    emoji: '💞',
  },
  {
    id: 'viva-forever',
    title: 'Viva Forever (7-Day)',
    description: 'Maintain a 7-day individual practice streak.',
    emoji: '🔥',
  },
  {
    id: 'union-power',
    title: 'Union Power!',
    description: 'Score 90%+ (22/24 or higher) on any full Mock Exam.',
    emoji: '🛡️',
  },
  {
    id: 'tube-blitz-ace',
    title: 'Mind the Gap Master',
    description: 'Score 120+ points in a 60s Tube Blitz round.',
    emoji: '🚇',
  },
  {
    id: 'deck-dynamo',
    title: 'Stop Right Now!',
    description: 'Review 50+ flashcards in your Spaced Repetition deck.',
    emoji: '🃏',
  },
];

export const SPICE_PEP_TALKS: readonly string[] = [
  "So tell me what you want, what you really, really want — 24 out of 24! 🎤",
  "Colours of the world, Spice Up Your UK! Ready for a quick Tube round? 🇬🇧",
  "2 Become 1... British citizenship study team! Check how your partner is doing. 💞",
  "Stop right now, thank you very much — time for 5 quick flashcards! ✨",
  "Say you'll be there... at the test centre with your eVisa share code ready! 📋",
  "Who do you think you are? Soon-to-be Life in the UK exam royalty! 👑",
  "Viva Forever: every flashcard you rate 'Good' locks dates into long-term memory. 🧠",
];

export const SPICE_PASS_QUOTES: readonly string[] = [
  "ZIG-A-ZIG-AH! You smashed the 75% pass mark! 🎉",
  "Posh perfection! Geri's Union Jack dress salutes you! 🇬🇧",
  "Say You'll Pass It — and you just DID! 👑",
  "Union Power! At this rate you'll finish the real exam in 4 minutes! ⚡",
];

export const SPICE_RETRY_QUOTES: readonly string[] = [
  "Never give up on the good times! Check the Memory Hooks below and go again! 💪",
  "Too Much tricky Tudor trivia? Boost missed questions to Flashcards! 🃏",
  "Step to the left, shake it to the right — every mistake now is one less on test day! 🌟",
];

export function getRankForXp(xp: number): {
  current: RankTier;
  next: RankTier | null;
  progressPercent: number;
} {
  let current: RankTier = SPICE_RANKS[0]!;
  let next: RankTier | null = null;

  for (let i = 0; i < SPICE_RANKS.length; i++) {
    const tier = SPICE_RANKS[i]!;
    if (xp >= tier.minXp) {
      current = tier;
      next = SPICE_RANKS[i + 1] ?? null;
    }
  }

  if (!next) {
    return { current, next: null, progressPercent: 100 };
  }

  const span = next.minXp - current.minXp;
  const gained = xp - current.minXp;
  const progressPercent = Math.min(100, Math.max(0, Math.round((gained / span) * 100)));
  return { current, next, progressPercent };
}
