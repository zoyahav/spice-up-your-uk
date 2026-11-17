import { describe, expect, it } from 'vitest';
import { computeCoupleStreak, computeIndividualStreak, shiftDateDays } from '../streaks';
import type { DailyActivityRecord } from '../../types/domain';

function makeDay(profileId: 'partner_a' | 'partner_b', date: string, xp: number): DailyActivityRecord {
  return {
    key: `${profileId}:${date}`,
    profileId,
    date,
    xp,
    cardsReviewed: 5,
    questionsAnswered: 5,
    gamesPlayed: 0,
    freezeUsed: false,
    updatedAt: `${date}T12:00:00.000Z`,
  };
}

describe('Streaks, Streak Freezes & 2 Become 1 Couple Streak', () => {
  it('earns 1 Streak Freeze after 5 active days and bridges a single missed day', () => {
    const start = '2026-11-01';
    const days: DailyActivityRecord[] = [];
    // Days 1..5 active -> earns 1 freeze!
    for (let i = 0; i < 5; i++) {
      days.push(makeDay('partner_a', shiftDateDays(start, i), 60));
    }
    // Day 6 (2026-11-06) MISSED!
    // Day 7 (2026-11-07) active!
    days.push(makeDay('partner_a', '2026-11-07', 55));

    const summary = computeIndividualStreak(days, 'partner_a', 50, '2026-11-07');
    expect(summary.currentStreak).toBe(6);
    expect(summary.freezesUsedCount).toBe(1);
    expect(summary.freezesAvailable).toBe(0);
    expect(summary.metGoalToday).toBe(true);
  });

  it('computes 2 Become 1 Couple Streak only on days where BOTH partners practiced', () => {
    const records: DailyActivityRecord[] = [
      makeDay('partner_a', '2026-11-14', 40),
      makeDay('partner_b', '2026-11-14', 30),
      makeDay('partner_a', '2026-11-15', 50),
      makeDay('partner_b', '2026-11-15', 50),
      makeDay('partner_a', '2026-11-16', 50),
      makeDay('partner_b', '2026-11-16', 25),
      // On 2026-11-17 (today), only partner_a has practiced so far, so yesterday's 3-day run stays alive!
      makeDay('partner_a', '2026-11-17', 60),
    ];

    const couple = computeCoupleStreak(records, '2026-11-17');
    expect(couple.currentCoupleStreak).toBe(3);
    expect(couple.bothStudiedToday).toBe(false);
    expect(couple.partnerAStudiedToday).toBe(true);
    expect(couple.partnerBStudiedToday).toBe(false);
  });
});
