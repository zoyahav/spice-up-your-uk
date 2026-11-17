import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Clock,
  Flame,
  Shuffle,
  Swords,
  Trophy,
  Zap,
} from 'lucide-react';
import { FACT_MATCH_PAIRS, TIMELINE_EVENTS, type TimelineEventItem } from '../data/miniGameData';
import { createCoupleChallenge, recordMiniGameScore } from '../db/repository';
import { Button } from '../components/ui/Button';
import type {
  CoupleChallengeRecord,
  GameScoreRecord,
  MiniGameId,
  PracticeQuestion,
  ProfileId,
  UserProfile,
} from '../types/domain';

interface ArcadeViewProps {
  activeProfile: UserProfile;
  partnerProfile: UserProfile;
  allQuestions: readonly PracticeQuestion[];
  gameScores: readonly GameScoreRecord[];
  challenges: readonly CoupleChallengeRecord[];
  onPlayChallenge: (challenge: {
    challengeId: string;
    title: string;
    questionIds: readonly string[];
  }) => void;
  isLightMode: boolean;
}

export const ArcadeView: React.FC<ArcadeViewProps> = ({
  activeProfile,
  partnerProfile,
  allQuestions,
  gameScores,
  challenges,
  onPlayChallenge,
  isLightMode,
}) => {
  const [activeGame, setActiveGame] = useState<MiniGameId | null>(null);

  // --- GAME 1: TIMELINE SORT STATE ---
  const [tlItems, setTlItems] = useState<TimelineEventItem[]>([]);
  const [tlRevealed, setTlRevealed] = useState(false);
  const [tlRoundScore, setTlRoundScore] = useState(0);
  const [tlStreak, setTlStreak] = useState(0);

  // --- GAME 2: 60s TUBE BLITZ STATE ---
  const [blitzSeconds, setBlitzSeconds] = useState(60);
  const [blitzRunning, setBlitzRunning] = useState(false);
  const [blitzQueue, setBlitzQueue] = useState<PracticeQuestion[]>([]);
  const [blitzIdx, setBlitzIdx] = useState(0);
  const [blitzScore, setBlitzScore] = useState(0);
  const [blitzCombo, setBlitzCombo] = useState(0);
  const [blitzBestCombo, setBlitzBestCombo] = useState(0);
  const [blitzFlash, setBlitzFlash] = useState<'right' | 'wrong' | null>(null);

  // --- GAME 3: FACT MATCH STATE ---
  const [fmPairs, setFmPairs] = useState<typeof FACT_MATCH_PAIRS>([]);
  const [fmRightShuffled, setFmRightShuffled] = useState<{ id: string; text: string }[]>([]);
  const [fmSelectedLeft, setFmSelectedLeft] = useState<string | null>(null);
  const [fmMatchedIds, setFmMatchedIds] = useState<Set<string>>(new Set());
  const [fmMistakes, setFmMistakes] = useState(0);
  const [fmStartMs, setFmStartMs] = useState<number>(0);
  const [fmDoneScore, setFmDoneScore] = useState<number | null>(null);

  const cardSurface = isLightMode
    ? 'border-slate-200 bg-white shadow-sm'
    : 'border-slate-800/90 bg-slate-900/85';

  // --- TIMELINE SORT HELPERS ---
  const startTimelineRound = () => {
    const sample = [...TIMELINE_EVENTS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setTlItems(sample);
    setTlRevealed(false);
    setActiveGame('timeline-sort');
  };

  const moveTimelineItem = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= tlItems.length) return;
    setTlItems((prev) => {
      const copy = [...prev];
      const temp = copy[idx]!;
      copy[idx] = copy[target]!;
      copy[target] = temp;
      return copy;
    });
  };

  const checkTimelineOrder = async () => {
    const sorted = [...tlItems].sort((a, b) => a.year - b.year);
    let exactMatches = 0;
    tlItems.forEach((item, idx) => {
      if (sorted[idx]?.id === item.id) exactMatches += 1;
    });
    const perfect = exactMatches === tlItems.length;
    const nextStreak = perfect ? tlStreak + 1 : 0;
    const points = exactMatches * 20 + (perfect ? 40 : 0);
    setTlRevealed(true);
    setTlStreak(nextStreak);
    setTlRoundScore((s) => s + points);
    await recordMiniGameScore({
      profileId: activeProfile.id,
      gameId: 'timeline-sort',
      score: tlRoundScore + points,
      combo: nextStreak,
      xpEarned: perfect ? 20 : 8,
    });
  };

  // --- TUBE BLITZ HELPERS ---
  const startTubeBlitz = () => {
    const singles = allQuestions.filter((q) => q.type !== 'multiple');
    const shuffled = [...singles].sort(() => Math.random() - 0.5);
    setBlitzQueue(shuffled);
    setBlitzIdx(0);
    setBlitzScore(0);
    setBlitzCombo(0);
    setBlitzBestCombo(0);
    setBlitzSeconds(60);
    setBlitzRunning(true);
    setActiveGame('tube-blitz');
  };

  useEffect(() => {
    if (activeGame !== 'tube-blitz' || !blitzRunning) return;
    if (blitzSeconds <= 0) {
      setBlitzRunning(false);
      void recordMiniGameScore({
        profileId: activeProfile.id,
        gameId: 'tube-blitz',
        score: blitzScore,
        combo: blitzBestCombo,
        xpEarned: Math.max(10, Math.min(45, Math.round(blitzScore / 4))),
      });
      return;
    }
    const t = window.setTimeout(() => setBlitzSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [activeGame, blitzRunning, blitzSeconds, activeProfile.id, blitzScore, blitzBestCombo]);

  const answerBlitz = (optIdx: number) => {
    if (!blitzRunning) return;
    const q = blitzQueue[blitzIdx];
    if (!q) return;
    const right = q.correctIndices.includes(optIdx);
    if (right) {
      const nextCombo = blitzCombo + 1;
      const mult = Math.min(4, 1 + Math.floor(nextCombo / 3));
      setBlitzCombo(nextCombo);
      setBlitzBestCombo((b) => Math.max(b, nextCombo));
      setBlitzScore((s) => s + 10 * mult);
      setBlitzFlash('right');
    } else {
      setBlitzCombo(0);
      setBlitzFlash('wrong');
    }
    window.setTimeout(() => setBlitzFlash(null), 220);
    setBlitzIdx((i) => (i + 1) % blitzQueue.length);
  };

  // --- FACT MATCH HELPERS ---
  const startFactMatch = () => {
    const chosen = [...FACT_MATCH_PAIRS].sort(() => Math.random() - 0.5).slice(0, 6);
    const rights = chosen
      .map((p) => ({ id: p.id, text: p.right }))
      .sort(() => Math.random() - 0.5);
    setFmPairs(chosen);
    setFmRightShuffled(rights);
    setFmSelectedLeft(null);
    setFmMatchedIds(new Set());
    setFmMistakes(0);
    setFmStartMs(Date.now());
    setFmDoneScore(null);
    setActiveGame('fact-match');
  };

  const handleTapRightMatch = async (rightId: string) => {
    if (!fmSelectedLeft || fmMatchedIds.has(rightId)) return;
    if (fmSelectedLeft === rightId) {
      const nextMatched = new Set(fmMatchedIds).add(rightId);
      setFmMatchedIds(nextMatched);
      setFmSelectedLeft(null);
      if (nextMatched.size === fmPairs.length) {
        const elapsedSec = Math.max(3, Math.round((Date.now() - fmStartMs) / 1000));
        const score = Math.max(20, 200 - elapsedSec * 2 - fmMistakes * 15);
        setFmDoneScore(score);
        await recordMiniGameScore({
          profileId: activeProfile.id,
          gameId: 'fact-match',
          score,
          combo: fmPairs.length - fmMistakes,
          xpEarned: 18,
        });
      }
    } else {
      setFmMistakes((m) => m + 1);
      setFmSelectedLeft(null);
    }
  };

  const handleCreateCoupleChallenge = async (count: 10 | 24) => {
    const sample = [...allQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .map((q) => q.id);
    const created = await createCoupleChallenge({
      createdBy: activeProfile.id,
      title: `${activeProfile.displayName}'s ${count}-Q Spice Showdown`,
      questionIds: sample,
    });
    onPlayChallenge({
      challengeId: created.challengeId,
      title: created.title,
      questionIds: created.questionIds,
    });
  };

  const getBestFor = (pid: ProfileId, gid: MiniGameId) =>
    gameScores.find((g) => g.profileId === pid && g.gameId === gid)?.bestScore ?? 0;

  // --- RENDER ACTIVE MINI-GAME ---
  if (activeGame === 'timeline-sort') {
    const correctSorted = [...tlItems].sort((a, b) => a.year - b.year);
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setActiveGame(null)}
            className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Arcade</span>
          </button>
          <span className="text-xs font-extrabold text-amber-400">
            Score: {tlRoundScore} • Perfect Streak: {tlStreak}
          </span>
        </div>

        <div className={`rounded-3xl border p-4 ${cardSurface}`}>
          <h2 className="text-base font-black">⏳ Timeline Sort</h2>
          <p className="text-xs text-slate-400">
            Order from <strong>EARLIEST (top)</strong> to <strong>LATEST (bottom)</strong>!
          </p>

          <div className="mt-3.5 space-y-2">
            {tlItems.map((item, idx) => {
              const expected = correctSorted[idx];
              const isSlotRight = tlRevealed && expected?.id === item.id;
              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between gap-2 rounded-2xl border p-3 ${
                    tlRevealed
                      ? isSlotRight
                        ? 'border-emerald-500/50 bg-emerald-500/15'
                        : 'border-rose-500/50 bg-rose-500/15'
                      : 'border-slate-700/80 bg-slate-950/50'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold">{item.title}</p>
                    {tlRevealed && (
                      <p className="mt-0.5 text-[11px] font-extrabold text-amber-300">
                        Actual Year: {item.yearLabel} (Correct #{correctSorted.findIndex((c) => c.id === item.id) + 1})
                      </p>
                    )}
                  </div>
                  {!tlRevealed && (
                    <div className="flex gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => moveTimelineItem(idx, -1)}
                        className="rounded-lg bg-slate-800 p-1.5 text-slate-200 disabled:opacity-30"
                        aria-label="Move earlier"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === tlItems.length - 1}
                        onClick={() => moveTimelineItem(idx, 1)}
                        className="rounded-lg bg-slate-800 p-1.5 text-slate-200 disabled:opacity-30"
                        aria-label="Move later"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4">
            {!tlRevealed ? (
              <Button variant="primary" fullWidth size="lg" onClick={() => void checkTimelineOrder()}>
                Lock In Chronological Order! 🔒
              </Button>
            ) : (
              <Button variant="emerald" fullWidth size="lg" onClick={startTimelineRound}>
                Next 5 Historical Events →
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (activeGame === 'tube-blitz') {
    const q = blitzQueue[blitzIdx];
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setBlitzRunning(false);
              setActiveGame(null);
            }}
            className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Arcade</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-pink-500/20 px-2.5 py-1 text-xs font-black text-pink-300">
              <Flame className="mr-1 inline h-3.5 w-3.5" />
              {blitzCombo}x Combo
            </span>
            <span className="rounded-full bg-amber-500/20 px-2.5 py-1 font-mono text-xs font-black text-amber-300">
              <Clock className="mr-1 inline h-3.5 w-3.5" />
              {blitzSeconds}s
            </span>
          </div>
        </div>

        {!blitzRunning ? (
          <div className={`rounded-3xl border p-6 text-center ${cardSurface}`}>
            <p className="text-4xl">🚇</p>
            <h2 className="mt-2 text-2xl font-black">Mind the Gap! {blitzScore} pts!</h2>
            <p className="mt-1 text-xs text-slate-400">
              Best Combo: <strong>{blitzBestCombo}x</strong> • Sporty Spice speed!
            </p>
            <div className="mt-5 flex justify-center gap-2.5">
              <Button variant="secondary" onClick={() => setActiveGame(null)}>
                Back
              </Button>
              <Button variant="primary" onClick={startTubeBlitz}>
                Play Again ⚡
              </Button>
            </div>
          </div>
        ) : q ? (
          <div
            className={`space-y-4 rounded-3xl border p-5 transition ${
              blitzFlash === 'right'
                ? 'border-emerald-400 bg-emerald-950/50'
                : blitzFlash === 'wrong'
                  ? 'border-rose-500 bg-rose-950/50'
                  : cardSurface
            }`}
          >
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-indigo-400">60s TUBE BLITZ</span>
              <span className="text-lg text-amber-400">{blitzScore} pts</span>
            </div>

            <p className="text-base leading-snug font-extrabold">{q.prompt}</p>

            <div className="space-y-2">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => answerBlitz(idx)}
                  className="w-full rounded-2xl border border-slate-700/80 bg-slate-950/60 p-3.5 text-left text-sm font-bold transition hover:border-pink-500 active:scale-[0.99]"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  if (activeGame === 'fact-match') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setActiveGame(null)}
            className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Arcade</span>
          </button>
          <span className="text-xs font-extrabold text-pink-400">
            Matched {fmMatchedIds.size}/6 • Mistakes: {fmMistakes}
          </span>
        </div>

        {fmDoneScore !== null ? (
          <div className={`rounded-3xl border p-6 text-center ${cardSurface}`}>
            <p className="text-4xl">🎯</p>
            <h2 className="mt-2 text-2xl font-black">All 6 Pairs Matched — {fmDoneScore} pts!</h2>
            <p className="mt-1 text-xs text-slate-400">Mistakes: {fmMistakes}</p>
            <div className="mt-5 flex justify-center gap-2.5">
              <Button variant="secondary" onClick={() => setActiveGame(null)}>
                Back
              </Button>
              <Button variant="primary" onClick={startFactMatch}>
                New Board 🔄
              </Button>
            </div>
          </div>
        ) : (
          <div className={`rounded-3xl border p-4 ${cardSurface}`}>
            <h2 className="text-sm font-black">🎯 UK Fact Match</h2>
            <p className="mb-3 text-xs text-slate-400">
              Tap a clue on the left, then tap its matching fact on the right!
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-2">
                {fmPairs.map((p) => {
                  const matched = fmMatchedIds.has(p.id);
                  const selected = fmSelectedLeft === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      disabled={matched}
                      onClick={() => setFmSelectedLeft(p.id)}
                      className={`min-h-[54px] w-full rounded-xl border p-2.5 text-left text-xs font-bold transition ${
                        matched
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 opacity-50'
                          : selected
                            ? 'border-pink-500 bg-pink-600/25 text-pink-200 ring-2 ring-pink-500/40'
                            : 'border-slate-700/80 bg-slate-950/50'
                      }`}
                    >
                      {p.left}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2">
                {fmRightShuffled.map((r) => {
                  const matched = fmMatchedIds.has(r.id);
                  return (
                    <button
                      key={r.id}
                      type="button"
                      disabled={matched}
                      onClick={() => void handleTapRightMatch(r.id)}
                      className={`min-h-[54px] w-full rounded-xl border p-2.5 text-left text-xs font-bold transition ${
                        matched
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 opacity-50'
                          : 'border-slate-700/80 bg-slate-950/50 hover:border-amber-400'
                      }`}
                    >
                      {r.text}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- ARCADE HUB ---
  const gamesList: {
    id: MiniGameId;
    title: string;
    desc: string;
    icon: React.ReactNode;
    onStart: () => void;
  }[] = [
    {
      id: 'tube-blitz',
      title: '60s Tube Blitz',
      desc: 'Rapid-fire sprint between Underground stops with up to 4x combo multipliers!',
      icon: <Zap className="h-5 w-5 text-amber-400" />,
      onStart: startTubeBlitz,
    },
    {
      id: 'timeline-sort',
      title: 'History Timeline Sort',
      desc: 'Order 5 famous British events chronologically from Roman Britain to Brexit.',
      icon: <Shuffle className="h-5 w-5 text-pink-400" />,
      onStart: startTimelineRound,
    },
    {
      id: 'fact-match',
      title: 'UK Fact Match',
      desc: 'Pair Patron Saints, inventors, writers, parliament seats & landmarks against the clock!',
      icon: <Trophy className="h-5 w-5 text-emerald-400" />,
      onStart: startFactMatch,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Mini-Games Cards */}
      <section className="space-y-3">
        {gamesList.map((g) => {
          const myBest = getBestFor(activeProfile.id, g.id);
          const partnerBest = getBestFor(partnerProfile.id, g.id);
          return (
            <div key={g.id} className={`rounded-3xl border p-4 ${cardSurface}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-slate-800 p-2.5">{g.icon}</div>
                  <div>
                    <h3 className="text-base font-black">{g.title}</h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{g.desc}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-800/70 pt-3">
                <div className="text-[11px] text-slate-400">
                  <span className="font-bold text-amber-300">
                    You: {myBest}
                  </span>{' '}
                  •{' '}
                  <span className="font-bold text-pink-300">
                    {partnerProfile.displayName}: {partnerBest}
                  </span>
                </div>
                <Button variant="primary" size="sm" onClick={g.onStart}>
                  Play Now
                </Button>
              </div>
            </div>
          );
        })}
      </section>

      {/* Head-to-Head Async Couple Challenges */}
      <section className={`rounded-3xl border p-4 ${cardSurface}`}>
        <div className="flex items-center gap-2">
          <Swords className="h-5 w-5 text-pink-400" />
          <h2 className="text-base font-black">2 Become 1 — Partner Showdowns</h2>
        </div>
        <p className="mt-1 text-xs text-slate-400">
          Generate an identical question seed synced through your Google Sheet — both play on your
          own phones and compare scores!
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => void handleCreateCoupleChallenge(10)}
          >
            ⚔️ 10-Q Quick Duel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => void handleCreateCoupleChallenge(24)}
          >
            👑 24-Q Full Duel
          </Button>
        </div>

        {challenges.length > 0 && (
          <div className="mt-4 space-y-2">
            {challenges.slice(0, 5).map((c) => {
              const myPlayed =
                activeProfile.id === 'partner_a'
                  ? c.partnerAScore !== undefined
                  : c.partnerBScore !== undefined;
              return (
                <div
                  key={c.challengeId}
                  className="flex items-center justify-between gap-2 rounded-2xl border border-slate-800 bg-slate-950/45 p-3 text-xs"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-extrabold">{c.title}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      A: {c.partnerAScore !== undefined ? `${c.partnerAScore}/${c.questionIds.length}` : 'Pending'}{' '}
                      • B:{' '}
                      {c.partnerBScore !== undefined ? `${c.partnerBScore}/${c.questionIds.length}` : 'Pending'}
                    </p>
                  </div>
                  {!myPlayed && (
                    <Button
                      variant="emerald"
                      size="sm"
                      onClick={() =>
                        onPlayChallenge({
                          challengeId: c.challengeId,
                          title: c.title,
                          questionIds: c.questionIds,
                        })
                      }
                    >
                      Accept!
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
