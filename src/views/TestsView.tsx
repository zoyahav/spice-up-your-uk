import React, { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  AlertTriangle,
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Clock,
  Flag,
  History,
  Layers,
  PackageOpen,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { CHAPTERS } from '../data/syllabus';
import { TOTAL_MOCK_EXAMS } from '../data/questions';
import { SPICE_PASS_QUOTES, SPICE_RETRY_QUOTES } from '../constants/spiceTheme';
import {
  boostConceptCardInSrs,
  recordCompletedTestSession,
  saveImportedCustomRecords,
} from '../db/repository';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { VisualAidRenderer } from '../components/visuals/VisualAidRenderer';
import type {
  AnsweredQuestionRecord,
  ChapterId,
  Flashcard,
  PracticeQuestion,
  ProfileId,
  TestSessionMode,
  TestSessionRecord,
} from '../types/domain';

type TestsSubTab = 'mocks' | 'imported' | 'drills' | 'history';

interface TestsViewProps {
  activeProfileId: ProfileId;
  allQuestions: readonly PracticeQuestion[];
  allFlashcards: readonly Flashcard[];
  missedQuestionIds: readonly string[];
  testSessions: readonly TestSessionRecord[];
  autoStartExamNumber?: number | null;
  autoStartMistakes?: boolean;
  activeChallenge?: { challengeId: string; title: string; questionIds: readonly string[] } | null;
  onConsumeAutoStart?: () => void;
  onJumpToImporter?: () => void;
  isLightMode: boolean;
}

function arraysHaveSameNumbers(a: readonly number[], b: readonly number[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a].sort((x, y) => x - y);
  const sb = [...b].sort((x, y) => x - y);
  return sa.every((v, idx) => v === sb[idx]);
}

export const TestsView: React.FC<TestsViewProps> = ({
  activeProfileId,
  allQuestions,
  allFlashcards,
  missedQuestionIds,
  testSessions,
  autoStartExamNumber,
  autoStartMistakes,
  activeChallenge,
  onConsumeAutoStart,
  onJumpToImporter,
  isLightMode,
}) => {
  const [subTab, setSubTab] = useState<TestsSubTab>('mocks');

  // Active Exam / Drill Runner State
  const [runnerQuestions, setRunnerQuestions] = useState<PracticeQuestion[] | null>(null);
  const [runnerMode, setRunnerMode] = useState<TestSessionMode>('mock');
  const [runnerExamNumber, setRunnerExamNumber] = useState<number | undefined>(undefined);
  const [runnerChapterId, setRunnerChapterId] = useState<ChapterId | undefined>(undefined);
  const [runnerChallengeId, setRunnerChallengeId] = useState<string | undefined>(undefined);
  const [runnerTitle, setRunnerTitle] = useState('');
  const [instantFeedbackMode, setInstantFeedbackMode] = useState(false);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selections, setSelections] = useState<Record<string, number[]>>({});
  const [revealedInDrill, setRevealedInDrill] = useState<Record<string, boolean>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [startedAtMs, setStartedAtMs] = useState<number>(Date.now());
  const [remainingSec, setRemainingSec] = useState<number>(45 * 60);

  // Completed / Review State
  const [reviewSession, setReviewSession] = useState<{
    session: TestSessionRecord;
    questions: PracticeQuestion[];
  } | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'wrong' | 'all'>('wrong');
  const [boostedIds, setBoostedIds] = useState<Set<string>>(new Set());

  const builtInQuestions = useMemo(
    () => allQuestions.filter((q) => !q.isCustom),
    [allQuestions],
  );
  const importedQuestions = useMemo(
    () => allQuestions.filter((q) => q.isCustom),
    [allQuestions],
  );

  const importedExamNumbers = useMemo(() => {
    const nums = new Set<number>();
    for (const q of importedQuestions) {
      if (q.examNumber) nums.add(q.examNumber);
    }
    return Array.from(nums).sort((a, b) => a - b);
  }, [importedQuestions]);

  const startRunner = (params: {
    questions: PracticeQuestion[];
    mode: TestSessionMode;
    title: string;
    examNumber?: number;
    chapterId?: ChapterId;
    challengeId?: string;
    instantFeedback?: boolean;
  }) => {
    if (params.questions.length === 0) return;
    setReviewSession(null);
    setRunnerQuestions(params.questions);
    setRunnerMode(params.mode);
    setRunnerTitle(params.title);
    setRunnerExamNumber(params.examNumber);
    setRunnerChapterId(params.chapterId);
    setRunnerChallengeId(params.challengeId);
    setInstantFeedbackMode(Boolean(params.instantFeedback));
    setCurrentIdx(0);
    setSelections({});
    setRevealedInDrill({});
    setFlaggedIds(new Set());
    setStartedAtMs(Date.now());
    setRemainingSec(45 * 60);
  };

  useEffect(() => {
    if (autoStartExamNumber) {
      const qs = builtInQuestions.filter((q) => q.examNumber === autoStartExamNumber);
      startRunner({
        questions: qs,
        mode: 'mock',
        examNumber: autoStartExamNumber,
        title: `Official Mock Exam #${autoStartExamNumber}`,
        instantFeedback: false,
      });
      onConsumeAutoStart?.();
    } else if (autoStartMistakes) {
      const missedSet = new Set(missedQuestionIds);
      const qs = allQuestions.filter((q) => missedSet.has(q.id)).slice(0, 24);
      startRunner({
        questions: qs,
        mode: 'mistakes',
        title: 'Mistakes Rescue Drill',
        instantFeedback: true,
      });
      onConsumeAutoStart?.();
    } else if (activeChallenge) {
      const byId = new Map(allQuestions.map((q) => [q.id, q]));
      const qs = activeChallenge.questionIds
        .map((id) => byId.get(id))
        .filter((q): q is PracticeQuestion => Boolean(q));
      startRunner({
        questions: qs,
        mode: 'challenge',
        challengeId: activeChallenge.challengeId,
        title: activeChallenge.title,
        instantFeedback: false,
      });
      onConsumeAutoStart?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStartExamNumber, autoStartMistakes, activeChallenge]);

  // 45:00 Countdown Timer during active Mock Exam
  useEffect(() => {
    if (!runnerQuestions || runnerMode !== 'mock') return;
    const interval = window.setInterval(() => {
      setRemainingSec((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [runnerQuestions, runnerMode]);

  const handleSelectOption = (question: PracticeQuestion, optIndex: number) => {
    if (instantFeedbackMode && revealedInDrill[question.id]) return;

    setSelections((prev) => {
      const existing = prev[question.id] ?? [];
      if (question.type === 'multiple') {
        const requiredCount = question.correctIndices.length;
        if (existing.includes(optIndex)) {
          return { ...prev, [question.id]: existing.filter((i) => i !== optIndex) };
        }
        if (existing.length >= requiredCount) {
          return { ...prev, [question.id]: [...existing.slice(1), optIndex] };
        }
        return { ...prev, [question.id]: [...existing, optIndex] };
      }
      return { ...prev, [question.id]: [optIndex] };
    });
  };

  const handleSubmitExam = async () => {
    if (!runnerQuestions) return;
    const durationSec = Math.max(1, Math.round((Date.now() - startedAtMs) / 1000));
    const answers: AnsweredQuestionRecord[] = runnerQuestions.map((q) => {
      const chosen = selections[q.id] ?? [];
      const isCorrect = arraysHaveSameNumbers(chosen, q.correctIndices);
      return {
        questionId: q.id,
        selectedIndices: chosen,
        isCorrect,
      };
    });

    const saved = await recordCompletedTestSession({
      profileId: activeProfileId,
      mode: runnerMode,
      examNumber: runnerExamNumber,
      chapterId: runnerChapterId,
      challengeId: runnerChallengeId,
      questions: runnerQuestions,
      answers,
      durationSec,
    });

    if (saved.passed) {
      try {
        void confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
      } catch {
        // Ignore in headless/non-canvas environments
      }
    }

    const hadWrong = answers.some((a) => !a.isCorrect);
    setReviewFilter(hadWrong ? 'wrong' : 'all');
    setReviewSession({ session: saved, questions: runnerQuestions });
    setRunnerQuestions(null);
  };

  const handleBoostQuestionToFlashcards = async (q: PracticeQuestion) => {
    // Check if an existing flashcard covers the exact prompt, otherwise create/boost a tailored custom card!
    const existingCard = allFlashcards.find(
      (c) => c.subtopicId === q.subtopicId && c.front.toLowerCase() === q.prompt.toLowerCase(),
    );
    if (existingCard) {
      await boostConceptCardInSrs(activeProfileId, existingCard.id);
    } else {
      const cardId = `boost-fc-${q.id}`;
      const rightText = q.correctIndices.map((idx) => q.options[idx]).join(' • ');
      const card: Flashcard = {
        id: cardId,
        chapterId: q.chapterId,
        subtopicId: q.subtopicId,
        front: q.prompt,
        back: `${rightText} — ${q.explanation}`,
        memoryHook: q.memoryHook,
        visualId: q.visualId,
        isCustom: true,
      };
      await saveImportedCustomRecords([
        {
          itemId: cardId,
          kind: 'flashcard',
          chapterId: q.chapterId,
          subtopicId: q.subtopicId,
          payloadJson: JSON.stringify(card),
          active: true,
          updatedAt: new Date().toISOString(),
        },
      ]);
      await boostConceptCardInSrs(activeProfileId, cardId);
    }
    setBoostedIds((prev) => new Set(prev).add(q.id));
  };

  const cardSurface = isLightMode
    ? 'border-slate-200 bg-white shadow-sm'
    : 'border-slate-800/90 bg-slate-900/85';

  // 1. POST-EXAM RESULTS & RICH WRONG-ANSWER REVIEW SCREEN
  if (reviewSession) {
    const { session, questions } = reviewSession;
    const pct = session.total > 0 ? Math.round((session.score / session.total) * 100) : 0;
    const quoteList = session.passed ? SPICE_PASS_QUOTES : SPICE_RETRY_QUOTES;
    const spiceQuote = quoteList[session.score % quoteList.length]!;
    const ansMap = new Map(session.answers.map((a) => [a.questionId, a]));

    const visibleQuestions = questions.filter((q) => {
      if (reviewFilter === 'all') return true;
      return !ansMap.get(q.id)?.isCorrect;
    });

    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setReviewSession(null)}
          className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Exams</span>
        </button>

        <section
          className={`rounded-3xl border p-5 text-center ${
            session.passed
              ? 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/80 to-slate-900 text-white'
              : 'border-rose-500/40 bg-gradient-to-br from-rose-950/80 to-slate-900 text-white'
          }`}
        >
          <p className="text-4xl">{session.passed ? '🎉' : '🌶️'}</p>
          <h2 className="mt-1.5 text-2xl font-black">
            {session.score} / {session.total} ({pct}%) —{' '}
            {session.passed ? 'PASSED!' : 'NOT YET (75% NEEDED)'}
          </h2>
          <p className="mt-1 text-xs text-pink-200">{spiceQuote}</p>
          <p className="mt-2 text-[11px] text-slate-300">
            Completed in {Math.floor(session.durationSec / 60)}m {session.durationSec % 60}s
          </p>
        </section>

        {/* Filter toggle */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-extrabold">
            Answer Explanations &amp; Memory Hooks
          </h3>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setReviewFilter('wrong')}
              className={`rounded-xl px-3 py-1 text-xs font-bold ${
                reviewFilter === 'wrong'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              Missed ({session.total - session.score})
            </button>
            <button
              type="button"
              onClick={() => setReviewFilter('all')}
              className={`rounded-xl px-3 py-1 text-xs font-bold ${
                reviewFilter === 'all'
                  ? 'bg-pink-600 text-white'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              All ({session.total})
            </button>
          </div>
        </div>

        {visibleQuestions.length === 0 ? (
          <div className={`rounded-2xl border p-5 text-center ${cardSurface}`}>
            <p className="text-sm font-bold text-emerald-400">
              Zero missed questions — flawless 100% Posh score! 👑
            </p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {visibleQuestions.map((q) => {
              const ans = ansMap.get(q.id);
              const isCorrect = Boolean(ans?.isCorrect);
              const chosenLabels =
                ans && ans.selectedIndices.length > 0
                  ? ans.selectedIndices.map((idx) => q.options[idx]).join(' • ')
                  : 'Unanswered';
              const rightLabels = q.correctIndices.map((idx) => q.options[idx]).join(' • ');
              const isBoosted = boostedIds.has(q.id);

              return (
                <article key={q.id} className={`space-y-3 rounded-3xl border p-4 ${cardSurface}`}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300 uppercase">
                      {q.chapterId.toUpperCase()}
                    </span>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" /> Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400">
                        <XCircle className="h-4 w-4" /> Missed
                      </span>
                    )}
                  </div>

                  <p className="text-sm leading-snug font-extrabold">{q.prompt}</p>

                  {!isCorrect && (
                    <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
                      <strong>Your pick:</strong> {chosenLabels}
                    </div>
                  )}

                  <div className="rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">
                    <strong>Right answer:</strong> {rightLabels}
                  </div>

                  <div className="text-xs leading-relaxed text-slate-300">
                    <strong className="text-white">Why: </strong>
                    {q.explanation}
                  </div>

                  <div className="rounded-2xl border border-pink-500/35 bg-pink-500/10 p-3 text-xs leading-relaxed text-pink-100">
                    <p className="mb-0.5 font-extrabold text-pink-300">
                      <Sparkles className="mr-1 inline h-3.5 w-3.5" />
                      Fun Way to Remember It:
                    </p>
                    <p>{q.memoryHook}</p>
                  </div>

                  {q.visualId && <VisualAidRenderer visualId={q.visualId} compact />}

                  <div className="pt-1">
                    <Button
                      variant={isBoosted ? 'secondary' : 'amber'}
                      size="sm"
                      disabled={isBoosted}
                      onClick={() => void handleBoostQuestionToFlashcards(q)}
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                      <span>
                        {isBoosted ? 'Added to Priority Flashcards ✓' : 'Boost in Flashcards'}
                      </span>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // 2. ACTIVE QUESTION RUNNER
  if (runnerQuestions) {
    const q = runnerQuestions[currentIdx]!;
    const selectedForCurrent = selections[q.id] ?? [];
    const isRevealed = Boolean(instantFeedbackMode && revealedInDrill[q.id]);
    const isFlagged = flaggedIds.has(q.id);
    const answeredCount = Object.keys(selections).filter(
      (k) => (selections[k]?.length ?? 0) > 0,
    ).length;

    const mm = String(Math.floor(remainingSec / 60)).padStart(2, '0');
    const ss = String(remainingSec % 60).padStart(2, '0');

    return (
      <div className="space-y-3.5">
        {/* Runner Header */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setRunnerQuestions(null)}
            className="inline-flex items-center gap-1 rounded-xl px-2 py-1 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quit</span>
          </button>

          <span className="truncate text-xs font-extrabold text-slate-300">{runnerTitle}</span>

          {runnerMode === 'mock' && (
            <div
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-xs font-extrabold ${
                remainingSec < 300
                  ? 'bg-rose-500/20 text-rose-300'
                  : 'bg-slate-800 text-amber-300'
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>
                {mm}:{ss}
              </span>
            </div>
          )}
        </div>

        <ProgressBar
          percent={Math.round(((currentIdx + 1) / runnerQuestions.length) * 100)}
          heightClass="h-2"
        />

        {/* Question Card */}
        <div className={`space-y-4 rounded-3xl border p-4.5 ${cardSurface}`}>
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-pink-400">
              Question {currentIdx + 1} of {runnerQuestions.length}
            </span>
            <button
              type="button"
              onClick={() =>
                setFlaggedIds((prev) => {
                  const next = new Set(prev);
                  if (next.has(q.id)) next.delete(q.id);
                  else next.add(q.id);
                  return next;
                })
              }
              className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold ${
                isFlagged ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Flag className="h-3 w-3" />
              <span>{isFlagged ? 'Flagged' : 'Flag'}</span>
            </button>
          </div>

          <div>
            <p className="text-base leading-snug font-extrabold">{q.prompt}</p>
            {q.type === 'multiple' && (
              <p className="mt-1 text-xs font-bold text-amber-400">
                Select {q.correctIndices.length} answers ({selectedForCurrent.length}/
                {q.correctIndices.length} chosen)
              </p>
            )}
          </div>

          <div className="space-y-2">
            {q.options.map((opt, idx) => {
              const isChosen = selectedForCurrent.includes(idx);
              const isRightOpt = q.correctIndices.includes(idx);

              let optStyle =
                'border-slate-700/80 bg-slate-950/40 hover:border-slate-600 text-inherit';
              if (isRevealed) {
                if (isRightOpt) {
                  optStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-200 font-bold';
                } else if (isChosen) {
                  optStyle = 'border-rose-500 bg-rose-500/20 text-rose-200';
                }
              } else if (isChosen) {
                optStyle = 'border-pink-500 bg-pink-600/20 text-pink-200 font-bold';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(q, idx)}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left text-sm transition ${optStyle}`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-extrabold ${
                      isChosen
                        ? 'border-pink-400 bg-pink-500 text-white'
                        : 'border-slate-600 text-slate-400'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Instant Feedback Panel in Topic Drills / Mistakes Mode */}
          {instantFeedbackMode && selectedForCurrent.length >= q.correctIndices.length && !isRevealed && (
            <Button
              variant="amber"
              fullWidth
              onClick={() => setRevealedInDrill((r) => ({ ...r, [q.id]: true }))}
            >
              Check Answer &amp; Memory Hook ✨
            </Button>
          )}

          {isRevealed && (
            <div className="space-y-2.5 rounded-2xl border border-slate-700/80 bg-slate-950/70 p-3.5 text-xs">
              <p
                className={`font-extrabold ${
                  arraysHaveSameNumbers(selectedForCurrent, q.correctIndices)
                    ? 'text-emerald-400'
                    : 'text-rose-400'
                }`}
              >
                {arraysHaveSameNumbers(selectedForCurrent, q.correctIndices)
                  ? '✓ Spot on!'
                  : `✗ Right answer: ${q.correctIndices.map((i) => q.options[i]).join(' • ')}`}
              </p>
              <p className="leading-relaxed text-slate-300">{q.explanation}</p>
              <div className="rounded-xl border border-pink-500/30 bg-pink-500/10 p-2.5 text-pink-200">
                <strong>🌶️ Memory Hook:</strong> {q.memoryHook}
              </div>
              {q.visualId && <VisualAidRenderer visualId={q.visualId} compact />}
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between gap-2.5">
          <Button
            variant="secondary"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
          >
            ← Prev
          </Button>

          {currentIdx < runnerQuestions.length - 1 ? (
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => setCurrentIdx((i) => i + 1)}
            >
              Next Question →
            </Button>
          ) : (
            <Button
              variant="emerald"
              className="flex-1"
              onClick={() => void handleSubmitExam()}
            >
              Finish &amp; Grade ({answeredCount}/{runnerQuestions.length}) ✓
            </Button>
          )}
        </div>

        {/* Question Navigator Grid */}
        <div className={`rounded-2xl border p-3 ${cardSurface}`}>
          <p className="mb-2 text-[11px] font-bold text-slate-400">
            Jump to question ({answeredCount}/{runnerQuestions.length} answered):
          </p>
          <div className="grid grid-cols-8 gap-1.5">
            {runnerQuestions.map((rq, idx) => {
              const done = (selections[rq.id]?.length ?? 0) > 0;
              const flg = flaggedIds.has(rq.id);
              const cur = idx === currentIdx;
              return (
                <button
                  key={rq.id}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  className={`rounded-lg py-1 text-xs font-bold transition ${
                    cur
                      ? 'ring-2 ring-pink-500 bg-pink-600 text-white'
                      : flg
                        ? 'bg-amber-500/30 text-amber-200'
                        : done
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-800/80 text-slate-400'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3. EXAMS & DRILLS HUB
  const myMockBestByExam = new Map<number, TestSessionRecord>();
  for (const s of testSessions) {
    if (s.profileId === activeProfileId && s.mode === 'mock' && s.examNumber) {
      const prev = myMockBestByExam.get(s.examNumber);
      if (!prev || s.score > prev.score) {
        myMockBestByExam.set(s.examNumber, s);
      }
    }
  }

  return (
    <div className="space-y-4">
      {/* Sub-navigation */}
      <div className="grid grid-cols-4 gap-1 rounded-2xl border border-slate-800 bg-slate-900/80 p-1">
        {(
          [
            ['mocks', '17 Exams', <Layers key="m" className="h-3.5 w-3.5" />],
            [
              'imported',
              importedQuestions.length > 0 ? `Custom (${importedExamNumbers.length || 1})` : 'Custom',
              <PackageOpen key="i" className="h-3.5 w-3.5" />,
            ],
            ['drills', 'Drills', <AlertTriangle key="d" className="h-3.5 w-3.5" />],
            ['history', 'History', <History key="h" className="h-3.5 w-3.5" />],
          ] as const
        ).map(([id, label, icon]) => (
          <button
            key={id}
            type="button"
            onClick={() => setSubTab(id)}
            className={`flex items-center justify-center gap-1 rounded-xl py-2 text-xs font-extrabold transition ${
              subTab === id ? 'bg-pink-600 text-white shadow' : 'text-slate-400'
            }`}
          >
            {icon}
            <span className="truncate">{label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: Built-in 17 Mock Exams */}
      {subTab === 'mocks' && (
        <div className="space-y-3">
          <div className={`rounded-3xl border p-4 ${cardSurface}`}>
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-black">The 17 Full Mock Exams</h2>
                <p className="text-xs text-slate-400">
                  24 questions • 45 mins • 18/24 (75%) to pass • 100% offline
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const shuffled = [...builtInQuestions]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 24);
                  startRunner({
                    questions: shuffled,
                    mode: 'mock',
                    title: 'Random 24-Q Official Mock',
                  });
                }}
              >
                Random 24
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {Array.from({ length: TOTAL_MOCK_EXAMS }, (_, idx) => idx + 1).map((examNum) => {
              const qs = builtInQuestions.filter((q) => q.examNumber === examNum);
              const best = myMockBestByExam.get(examNum);
              return (
                <button
                  key={examNum}
                  type="button"
                  disabled={qs.length === 0}
                  onClick={() =>
                    startRunner({
                      questions: qs,
                      mode: 'mock',
                      examNumber: examNum,
                      title: `Official Mock Exam #${examNum}`,
                    })
                  }
                  className={`flex flex-col justify-between rounded-2xl border p-3.5 text-left transition hover:border-pink-500/50 ${cardSurface}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black">Exam #{examNum}</span>
                    {best && (
                      <span
                        className={`rounded-md px-1.5 py-0.5 text-[10px] font-black ${
                          best.passed
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {best.score}/{best.total}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">
                    {best
                      ? best.passed
                        ? '✓ Passed — tap to beat score'
                        : 'Retry to hit 18/24'
                      : `${qs.length} questions ready`}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Custom / Imported JSON Pack Mock Exams (kept off GitHub!) */}
      {subTab === 'imported' && (
        <div className="space-y-3">
          <div className={`rounded-3xl border p-4 ${cardSurface}`}>
            <h2 className="text-base font-black">Imported / External Question Bank</h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Practice any external online <code>exams.json</code> or custom Google Sheet pack
              privately — stored locally in IndexedDB &amp; synced between your devices
              with zero files committed to GitHub!
            </p>
            {importedQuestions.length === 0 ? (
              <div className="mt-4">
                <Button variant="primary" fullWidth onClick={onJumpToImporter}>
                  Import JSON URL or Paste Pack in &ldquo;Us&rdquo; Tab →
                </Button>
              </div>
            ) : (
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-emerald-400">
                  {importedQuestions.length} imported questions cached offline
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const shuffled = [...importedQuestions]
                      .sort(() => Math.random() - 0.5)
                      .slice(0, 24);
                    startRunner({
                      questions: shuffled,
                      mode: 'mock',
                      title: 'Imported Pack — Random 24',
                    });
                  }}
                >
                  Random 24
                </Button>
              </div>
            )}
          </div>

          {importedQuestions.length > 0 && (
            <div className="grid grid-cols-2 gap-2.5">
              {importedExamNumbers.map((exNum) => {
                const qs = importedQuestions.filter((q) => q.examNumber === exNum);
                return (
                  <button
                    key={exNum}
                    type="button"
                    onClick={() =>
                      startRunner({
                        questions: qs,
                        mode: 'mock',
                        title: `Imported Exam #${exNum}`,
                      })
                    }
                    className={`rounded-2xl border p-3.5 text-left transition hover:border-pink-500/50 ${cardSurface}`}
                  >
                    <p className="text-sm font-black">Imported Exam #{exNum}</p>
                    <p className="mt-1 text-[11px] text-slate-400">{qs.length} questions</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Chapter Drills & Mistakes Bank */}
      {subTab === 'drills' && (
        <div className="space-y-3">
          <div className={`rounded-3xl border p-4 ${cardSurface}`}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-rose-400">
                  Mistakes Rescue Bank ({missedQuestionIds.length})
                </h3>
                <p className="mt-0.5 text-xs text-slate-400">
                  Re-drill questions you missed with instant explanations &amp; memory hooks!
                </p>
              </div>
              <Button
                variant="danger"
                size="sm"
                disabled={missedQuestionIds.length === 0}
                onClick={() => {
                  const set = new Set(missedQuestionIds);
                  const qs = allQuestions.filter((q) => set.has(q.id)).slice(0, 20);
                  startRunner({
                    questions: qs,
                    mode: 'mistakes',
                    title: 'Mistakes Rescue Drill',
                    instantFeedback: true,
                  });
                }}
              >
                Drill Now
              </Button>
            </div>
          </div>

          <div className="space-y-2.5">
            {CHAPTERS.map((ch) => {
              const chQs = allQuestions.filter((q) => q.chapterId === ch.id);
              return (
                <div
                  key={ch.id}
                  className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 ${cardSurface}`}
                >
                  <div>
                    <p className="text-xs font-extrabold">
                      Ch {ch.number}: {ch.title}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      12-question instant-feedback drill ({chQs.length} in bank)
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const sample = [...chQs].sort(() => Math.random() - 0.5).slice(0, 12);
                      startRunner({
                        questions: sample,
                        mode: 'topic',
                        chapterId: ch.id,
                        title: `Ch ${ch.number}: ${ch.shortTitle} Drill`,
                        instantFeedback: true,
                      });
                    }}
                  >
                    Start 12 Qs
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: Full Test History */}
      {subTab === 'history' && (
        <div className="space-y-2.5">
          {testSessions.filter((s) => s.profileId === activeProfileId).length === 0 ? (
            <div className={`rounded-3xl border p-6 text-center text-xs text-slate-400 ${cardSurface}`}>
              No completed tests yet — start Exam #1 or a quick 12-question chapter drill!
            </div>
          ) : (
            testSessions
              .filter((s) => s.profileId === activeProfileId)
              .map((s) => {
                const qMap = new Map(allQuestions.map((q) => [q.id, q]));
                const sessionQs = s.answers
                  .map((a) => qMap.get(a.questionId))
                  .filter((q): q is PracticeQuestion => Boolean(q));
                return (
                  <button
                    key={s.sessionId}
                    type="button"
                    onClick={() => {
                      if (sessionQs.length > 0) {
                        setReviewFilter(s.score < s.total ? 'wrong' : 'all');
                        setReviewSession({ session: s, questions: sessionQs });
                      }
                    }}
                    className={`flex w-full items-center justify-between rounded-2xl border p-3.5 text-left transition hover:border-pink-500/40 ${cardSurface}`}
                  >
                    <div>
                      <p className="text-xs font-extrabold">
                        {s.mode === 'mock'
                          ? `Mock Exam ${s.examNumber ? `#${s.examNumber}` : ''}`
                          : s.mode === 'mistakes'
                            ? 'Mistakes Drill'
                            : s.mode === 'challenge'
                              ? 'Couple Challenge'
                              : `Chapter Drill (${s.chapterId?.toUpperCase() ?? ''})`}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {new Date(s.completedAt).toLocaleString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        • Tap to review answers
                      </p>
                    </div>
                    <span
                      className={`rounded-xl px-2.5 py-1 text-xs font-black ${
                        s.passed
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {s.score}/{s.total}
                    </span>
                  </button>
                );
              })
          )}
        </div>
      )}
    </div>
  );
};
