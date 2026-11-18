import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Clock,
  Flame,
  GripVertical,
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
}) => {
  const [activeGame, setActiveGame] = useState<MiniGameId | null>(null);

  // --- GAME 1: TIMELINE SORT STATE & DRAG-AND-DROP ---
  const [tlItems, setTlItems] = useState<TimelineEventItem[]>([]);
  const [tlRevealed, setTlRevealed] = useState(false);
  const [tlRoundScore, setTlRoundScore] = useState(0);
  const [tlStreak, setTlStreak] = useState(0);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const draggedIdxRef = useRef<number | null>(null);

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

  // --- TIMELINE SORT HELPERS ---
  const startTimelineRound = () => {
    const sample = [...TIMELINE_EVENTS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setTlItems(sample);
    setTlRevealed(false);
    draggedIdxRef.current = null;
    setDraggedIdx(null);
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

  const handleTimelinePointerDown = (e: React.PointerEvent<HTMLDivElement>, idx: number) => {
    if (tlRevealed) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button')) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore pointer capture errors in synthetic test environments
    }
    draggedIdxRef.current = idx;
    setDraggedIdx(idx);
  };

  const handleTimelinePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const fromIdx = draggedIdxRef.current;
    if (fromIdx === null || tlRevealed) return;

    const elUnder = document.elementFromPoint(e.clientX, e.clientY);
    const slotEl = elUnder?.closest('[data-tl-slot]') as HTMLElement | null;
    if (!slotEl) return;

    const toIdx = Number(slotEl.getAttribute('data-tl-slot'));
    if (!Number.isInteger(toIdx) || toIdx < 0 || toIdx === fromIdx) return;

    // Require crossing the target slot's midpoint so variable-height cards never bounce
    const rect = slotEl.getBoundingClientRect();
    if (toIdx > fromIdx && e.clientY < rect.top + rect.height * 0.42) return;
    if (toIdx < fromIdx && e.clientY > rect.top + rect.height * 0.58) return;

    draggedIdxRef.current = toIdx;
    setDraggedIdx(toIdx);
    setTlItems((prev) => {
      if (fromIdx < 0 || fromIdx >= prev.length || toIdx < 0 || toIdx >= prev.length) {
        return prev;
      }
      const copy = [...prev];
      const [moved] = copy.splice(fromIdx, 1);
      if (!moved) return prev;
      copy.splice(toIdx, 0, moved);
      return copy;
    });
  };

  const handleTimelinePointerEnd = () => {
    if (draggedIdxRef.current !== null) {
      draggedIdxRef.current = null;
      setDraggedIdx(null);
    }
  };

  const checkTimelineOrder = async () => {
    draggedIdxRef.current = null;
    setDraggedIdx(null);
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
            className="autumn-back-btn inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Arcade</span>
          </button>
          <span className="accent-amber text-xs font-extrabold">
            Score: {tlRoundScore} • Perfect Streak: {tlStreak}
          </span>
        </div>

        <div className="autumn-card rounded-3xl p-4">
          <h2 className="text-base font-black">⏳ Timeline Sort</h2>
          <p className="autumn-muted text-xs">
            Drag cards up or down from <strong>EARLIEST (top)</strong> to{' '}
            <strong>LATEST (bottom)</strong>!
          </p>

          <div className="mt-3.5 space-y-2">
            {tlItems.map((item, idx) => {
              const expected = correctSorted[idx];
              const isSlotRight = tlRevealed && expected?.id === item.id;
              const isDraggingThis = draggedIdx === idx;
              return (
                <div
                  key={item.id}
                  data-tl-slot={idx}
                  onDragStart={(e) => e.preventDefault()}
                  onPointerDown={(e) => handleTimelinePointerDown(e, idx)}
                  onPointerMove={handleTimelinePointerMove}
                  onPointerUp={handleTimelinePointerEnd}
                  onPointerCancel={handleTimelinePointerEnd}
                  style={{ touchAction: tlRevealed ? 'auto' : 'none' }}
                  className={`flex items-center justify-between gap-2.5 rounded-2xl p-3 select-none transition ${
                    tlRevealed
                      ? isSlotRight
                        ? 'callout-emerald'
                        : 'callout-rose'
                      : isDraggingThis
                        ? 'callout-spice z-10 scale-[1.02] cursor-grabbing shadow-lg ring-2 ring-orange-500/65'
                        : 'autumn-inset cursor-grab hover:border-orange-500/45'
                  }`}
                >
                  {!tlRevealed && (
                    <span
                      className="autumn-muted flex items-center gap-1 text-[11px] font-extrabold"
                      aria-hidden="true"
                    >
                      <GripVertical className="h-4 w-4 shrink-0" />
                      <span>#{idx + 1}</span>
                    </span>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold">{item.title}</p>
                    {tlRevealed && (
                      <p className="accent-amber mt-0.5 text-[11px] font-extrabold">
                        Actual Year: {item.yearLabel} (Correct #{correctSorted.findIndex((c) => c.id === item.id) + 1})
                      </p>
                    )}
                  </div>

                  {!tlRevealed && (
                    <div className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => moveTimelineItem(idx, -1)}
                        className="autumn-pill rounded-lg p-1.5 disabled:opacity-30"
                        aria-label="Move earlier"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === tlItems.length - 1}
                        onClick={() => moveTimelineItem(idx, 1)}
                        className="autumn-pill rounded-lg p-1.5 disabled:opacity-30"
                        aria-label="Move later"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
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
            className="autumn-back-btn inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Arcade</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="callout-spice rounded-full px-2.5 py-1 text-xs font-black">
              <Flame className="mr-1 inline h-3.5 w-3.5" />
              {blitzCombo}x Combo
            </span>
            <span className="callout-amber rounded-full px-2.5 py-1 font-mono text-xs font-black">
              <Clock className="mr-1 inline h-3.5 w-3.5" />
              {blitzSeconds}s
            </span>
          </div>
        </div>

        {!blitzRunning ? (
          <div className="autumn-card rounded-3xl p-6 text-center">
            <p className="text-4xl">🚇</p>
            <h2 className="mt-2 text-2xl font-black">Mind the Gap! {blitzScore} pts!</h2>
            <p className="autumn-muted mt-1 text-xs">
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
            className={`space-y-4 rounded-3xl p-5 transition ${
              blitzFlash === 'right'
                ? 'callout-emerald'
                : blitzFlash === 'wrong'
                  ? 'callout-rose'
                  : 'autumn-card'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-black">
              <span className="accent-spice">60s TUBE BLITZ</span>
              <span className="accent-amber text-lg">{blitzScore} pts</span>
            </div>

            <p className="text-base leading-snug font-extrabold">{q.prompt}</p>

            <div className="space-y-2">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => answerBlitz(idx)}
                  className="autumn-inset w-full rounded-2xl p-3.5 text-left text-sm font-bold transition hover:border-orange-500/60 active:scale-[0.99]"
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
            className="autumn-back-btn inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Arcade</span>
          </button>
          <span className="accent-spice text-xs font-extrabold">
            Matched {fmMatchedIds.size}/6 • Mistakes: {fmMistakes}
          </span>
        </div>

        {fmDoneScore !== null ? (
          <div className="autumn-card rounded-3xl p-6 text-center">
            <p className="text-4xl">🎯</p>
            <h2 className="mt-2 text-2xl font-black">All 6 Pairs Matched: {fmDoneScore} pts!</h2>
            <p className="autumn-muted mt-1 text-xs">Mistakes: {fmMistakes}</p>
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
          <div className="autumn-card rounded-3xl p-4">
            <h2 className="text-sm font-black">🎯 UK Fact Match</h2>
            <p className="autumn-muted mb-3 text-xs">
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
                      className={`min-h-[54px] w-full rounded-xl p-2.5 text-left text-xs font-bold transition ${
                        matched
                          ? 'callout-emerald opacity-55'
                          : selected
                            ? 'callout-spice ring-2 ring-orange-500/60'
                            : 'autumn-inset'
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
                      className={`min-h-[54px] w-full rounded-xl p-2.5 text-left text-xs font-bold transition ${
                        matched
                          ? 'callout-emerald opacity-55'
                          : 'autumn-inset hover:border-amber-500/60'
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
    chipClass: string;
    onStart: () => void;
  }[] = [
    {
      id: 'tube-blitz',
      title: '60s Tube Blitz',
      desc: 'Rapid-fire sprint between Underground stops with up to 4x combo multipliers!',
      icon: <Zap className="accent-amber h-5 w-5" />,
      chipClass: 'callout-amber',
      onStart: startTubeBlitz,
    },
    {
      id: 'timeline-sort',
      title: 'History Timeline Sort',
      desc: 'Drag and sort 5 famous British events chronologically from Roman Britain to today.',
      icon: <Shuffle className="accent-spice h-5 w-5" />,
      chipClass: 'callout-spice',
      onStart: startTimelineRound,
    },
    {
      id: 'fact-match',
      title: 'UK Fact Match',
      desc: 'Pair Patron Saints, inventors, writers, parliament seats & landmarks against the clock!',
      icon: <Trophy className="accent-emerald h-5 w-5" />,
      chipClass: 'callout-emerald',
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
            <div key={g.id} className="autumn-card rounded-3xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`rounded-2xl p-2.5 ${g.chipClass}`}>{g.icon}</div>
                  <div>
                    <h3 className="text-base font-black">{g.title}</h3>
                    <p className="autumn-muted mt-0.5 text-xs leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2 border-t border-amber-900/20 pt-3">
                <div className="autumn-muted text-[11px]">
                  <span className="accent-amber font-bold">
                    You: {myBest}
                  </span>{' '}
                  •{' '}
                  <span className="accent-spice font-bold">
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

      {/* Head-to-Head Async Showdowns */}
      <section className="autumn-card rounded-3xl p-4">
        <div className="flex items-center gap-2">
          <Swords className="accent-spice h-5 w-5" />
          <h2 className="text-base font-black">Head-to-Head Showdowns</h2>
        </div>
        <p className="autumn-muted mt-1 text-xs">
          Generate an identical question seed synced through your Google Sheet so you both play on your
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
                  className="autumn-inset flex items-center justify-between gap-2 rounded-2xl p-3 text-xs"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-extrabold">{c.title}</p>
                    <p className="autumn-muted mt-0.5 text-[11px]">
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
