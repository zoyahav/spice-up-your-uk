/**
 * Daily Streaks, Streak Freezes, "2 Become 1" Couple Streaks, and Badge Unlocks.
 * Pure, deterministic date math using YYYY-MM-DD local calendar strings.
 */

import type {
  DailyActivityRecord,
  GameScoreRecord,
  ProfileId,
  SrsCardState,
  TestSessionRecord,
} from '../types/domain';

export function formatLocalDateYYYYMMDD(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function shiftDateDays(yyyyMmDd: string, deltaDays: number): string {
  const parts = yyyyMmDd.split('-').map(Number);
  const dt = new Date(Date.UTC(parts[0] ?? 2026, (parts[1] ?? 1) - 1, parts[2] ?? 1));
  dt.setUTCDate(dt.getUTCDate() + deltaDays);
  const y = dt.getUTCFullYear();
  const m = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const d = String(dt.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export interface StreakSummary {
  readonly currentStreak: number;
  readonly longestStreak: number;
  readonly freezesAvailable: number;
  readonly freezesUsedCount: number;
  readonly studiedToday: boolean;
  readonly metGoalToday: boolean;
  readonly todayXp: number;
}

/**
 * Computes individual streak with automatic Streak Freeze protection:
 * - A day counts as active if `xp > 0` (studying anything keeps the flame alive!).
 * - Every 5 active days earns 1 Streak Freeze (max 2 stored at a time).
 * - Missing 1 day automatically consumes 1 available freeze to bridge the streak.
 */
export function computeIndividualStreak(
  records: readonly DailyActivityRecord[],
  profileId: ProfileId,
  dailyGoalXp: number,
  todayStr: string = formatLocalDateYYYYMMDD(),
): StreakSummary {
  const byDate = new Map<string, DailyActivityRecord>();
  for (const r of records) {
    if (r.profileId === profileId && r.xp > 0) {
      byDate.set(r.date, r);
    }
  }

  const todayRecord = records.find((r) => r.profileId === profileId && r.date === todayStr);
  const todayXp = todayRecord?.xp ?? 0;
  const studiedToday = todayXp > 0;
  const metGoalToday = todayXp >= dailyGoalXp;

  if (byDate.size === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      freezesAvailable: 0,
      freezesUsedCount: 0,
      studiedToday: false,
      metGoalToday: false,
      todayXp: 0,
    };
  }

  const sortedDates = Array.from(byDate.keys()).sort();
  const earliest = sortedDates[0]!;

  // Walk forward chronologically from earliest date through yesterday (or today if studiedToday)
  const endWalk = studiedToday ? todayStr : shiftDateDays(todayStr, -1);

  let streak = 0;
  let longest = 0;
  let freezes = 0;
  let freezesUsed = 0;
  let activeDaysInRun = 0;

  let cursor = earliest;
  while (cursor <= endWalk) {
    if (byDate.has(cursor)) {
      streak += 1;
      activeDaysInRun += 1;
      if (activeDaysInRun % 5 === 0) {
        freezes = Math.min(2, freezes + 1);
      }
      if (streak > longest) longest = streak;
    } else if (freezes > 0 && streak > 0) {
      // Bridge single missed day with a streak freeze!
      freezes -= 1;
      freezesUsed += 1;
    } else {
      streak = 0;
      activeDaysInRun = 0;
    }
    cursor = shiftDateDays(cursor, 1);
  }

  return {
    currentStreak: streak,
    longestStreak: longest,
    freezesAvailable: freezes,
    freezesUsedCount: freezesUsed,
    studiedToday,
    metGoalToday,
    todayXp,
  };
}

/**
 * Computes the "2 Become 1" Couple Streak: consecutive days where BOTH Partner A and Partner B practiced.
 */
export function computeCoupleStreak(
  records: readonly DailyActivityRecord[],
  todayStr: string = formatLocalDateYYYYMMDD(),
): {
  currentCoupleStreak: number;
  longestCoupleStreak: number;
  bothStudiedToday: boolean;
  partnerAStudiedToday: boolean;
  partnerBStudiedToday: boolean;
} {
  const aDates = new Set<string>();
  const bDates = new Set<string>();

  for (const r of records) {
    if (r.xp > 0) {
      if (r.profileId === 'partner_a') aDates.add(r.date);
      if (r.profileId === 'partner_b') bDates.add(r.date);
    }
  }

  const partnerAStudiedToday = aDates.has(todayStr);
  const partnerBStudiedToday = bDates.has(todayStr);
  const bothStudiedToday = partnerAStudiedToday && partnerBStudiedToday;

  const sharedDates = Array.from(aDates)
    .filter((d) => bDates.has(d))
    .sort();

  if (sharedDates.length === 0) {
    return {
      currentCoupleStreak: 0,
      longestCoupleStreak: 0,
      bothStudiedToday,
      partnerAStudiedToday,
      partnerBStudiedToday,
    };
  }

  let longest = 1;
  let run = 1;
  for (let i = 1; i < sharedDates.length; i++) {
    if (shiftDateDays(sharedDates[i - 1]!, 1) === sharedDates[i]) {
      run += 1;
      if (run > longest) longest = run;
    } else {
      run = 1;
    }
  }

  // Current couple streak ends today (if both studied today) or yesterday (still alive until midnight!)
  const anchor = bothStudiedToday ? todayStr : shiftDateDays(todayStr, -1);
  let current = 0;
  let check = anchor;
  while (aDates.has(check) && bDates.has(check)) {
    current += 1;
    check = shiftDateDays(check, -1);
  }

  return {
    currentCoupleStreak: current,
    longestCoupleStreak: longest,
    bothStudiedToday,
    partnerAStudiedToday,
    partnerBStudiedToday,
  };
}

export function computeTotalXp(
  records: readonly DailyActivityRecord[],
  profileId: ProfileId,
): number {
  return records
    .filter((r) => r.profileId === profileId)
    .reduce((sum, r) => sum + r.xp, 0);
}

export function computeUnlockedBadgeIds(params: {
  profileId: ProfileId;
  individualStreak: StreakSummary;
  coupleStreak: { currentCoupleStreak: number; longestCoupleStreak: number };
  testSessions: readonly TestSessionRecord[];
  srsStates: readonly SrsCardState[];
  gameScores: readonly GameScoreRecord[];
  totalXp: number;
}): Set<string> {
  const {
    profileId,
    individualStreak,
    coupleStreak,
    testSessions,
    srsStates,
    gameScores,
    totalXp,
  } = params;
  const unlocked = new Set<string>();

  if (totalXp > 0) unlocked.add('first-spice');

  const myMocks = testSessions.filter(
    (s) => s.profileId === profileId && s.mode === 'mock',
  );
  if (myMocks.some((m) => m.passed)) {
    unlocked.add('say-youll-pass');
  }
  if (myMocks.some((m) => m.total >= 24 && m.score >= 22)) {
    unlocked.add('union-power');
  }

  if (coupleStreak.longestCoupleStreak >= 3 || coupleStreak.currentCoupleStreak >= 3) {
    unlocked.add('two-become-one');
  }

  if (individualStreak.longestStreak >= 7 || individualStreak.currentStreak >= 7) {
    unlocked.add('viva-forever');
  }

  const blitz = gameScores.find(
    (g) => g.profileId === profileId && g.gameId === 'tube-blitz',
  );
  if (blitz && blitz.bestScore >= 120) {
    unlocked.add('tube-blitz-ace');
  }

  const myCardsCount = srsStates.filter((c) => c.profileId === profileId).length;
  if (myCardsCount >= 50) {
    unlocked.add('deck-dynamo');
  }

  return unlocked;
}
