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
  RefreshCw,
  Sparkles,
  Star,
  XCircle,
} from 'lucide-react';
import { CHAPTERS } from '../data/syllabus';
import { TOTAL_MOCK_EXAMS } from '../data/questions';
import { SPICE_PASS_QUOTES, SPICE_RETRY_QUOTES } from '../constants/spiceTheme';
import {
  boostConceptCardInSrs,
  recordCompletedTestSession,
} from '../db/repository';
import { buildMockExamStatsByNumber, summarizeExamSet } from '../services/examStats';
import { Button } from '../components/ui/Button';
import { BionicText } from '../components/ui/BionicText';
import { ProgressBar } from '../components/ui/ProgressBar';
import { VisualAidRenderer } from '../components/visuals/VisualAidRenderer';
import type {
  AnsweredQuestionRecord,
  ChapterId,
  PracticeQuestion,
  ProfileId,
  TestSessionMode,
  TestSessionRecord,
} from '../types/domain';

type TestsSubTab = 'official18' | 'spice17' | 'drills' | 'history';

interface TestsViewProps {
  activeProfileId: ProfileId;
  allQuestions: readonly PracticeQuestion[];
  missedQuestionIds: readonly string[];
  testSessions: readonly TestSessionRecord[];
  hydratingStandardPack?: boolean;
  onRetryStandardPack?: () => Promise<void>;
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

function formatExamLabel(examNumber?: number): string {
  if (!examNumber) return 'Mock Exam';
  if (examNumber > 100) return `Spice Exam #${examNumber - 100}`;
  return `Exam #${examNumber}`;
}

export const TestsView: React.FC<TestsViewProps> = ({
  activeProfileId,
  allQuestions,
  missedQuestionIds,
  testSessions,
  hydratingStandardPack = false,
  onRetryStandardPack,
  autoStartExamNumber,
  autoStartMistakes,
  activeChallenge,
  onConsumeAutoStart,
  onJumpToImporter,
  isLightMode,
}) => {
  const [subTab, setSubTab] = useState<TestsSubTab>('official18');

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

  const standard18Questions = useMemo(
    () => allQuestions.filter((q) => q.id.startsWith('std18-')),
    [allQuestions],
  );
  const spice17Questions = useMemo(
    () => allQuestions.filter((q) => !q.isCustom),
    [allQuestions],
  );
  const userImportedQuestions = useMemo(
    () => allQuestions.filter((q) => q.isCustom && !q.id.startsWith('std18-')),
    [allQuestions],
  );

  const standardExamNumbers = useMemo(() => {
    const nums = new Set<number>();
    for (const q of standard18Questions) {
      if (q.examNumber) nums.add(q.examNumber);
    }
    return Array.from(nums).sort((a, b) => a - b);
  }, [standard18Questions]);

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
      const stdQs = standard18Questions.filter((q) => q.examNumber === autoStartExamNumber);
      if (stdQs.length > 0) {
        startRunner({
          questions: stdQs,
          mode: 'mock',
          examNumber: autoStartExamNumber,
          title: `Exam #${autoStartExamNumber}`,
          instantFeedback: false,
        });
      } else {
        const fallbackSpice = spice17Questions.filter(
          (q) => q.examNumber === ((autoStartExamNumber - 1) % TOTAL_MOCK_EXAMS) + 1,
        );
        startRunner({
          questions: fallbackSpice,
          mode: 'mock',
          examNumber: 100 + (((autoStartExamNumber - 1) % TOTAL_MOCK_EXAMS) + 1),
          title: `Spice Exam #${((autoStartExamNumber - 1) % TOTAL_MOCK_EXAMS) + 1}`,
          instantFeedback: false,
        });
      }
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
        void confetti({ particleCount: 65, spread: 65, origin: { y: 0.6 } });
      } catch {
        // Ignore in headless environments
      }
    }

    const hadWrong = answers.some((a) => !a.isCorrect);
    setReviewFilter(hadWrong ? 'wrong' : 'all');
    setReviewSession({ session: saved, questions: runnerQuestions });
    setRunnerQuestions(null);
  };

  const handleBoostQuestionToFlashcards = async (q: PracticeQuestion) => {
    await boostConceptCardInSrs(activeProfileId, q.id);
    setBoostedIds((prev) => new Set(prev).add(q.id));
  };

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
          className="autumn-back-btn inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-bold"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Exams</span>
        </button>

        <section
          className={`rounded-3xl border p-5 text-center shadow-md ${
            session.passed
              ? isLightMode
                ? 'border-[#5E8858]/50 bg-gradient-to-br from-[#435F3F] to-[#567451] text-[#FAF2E8]'
                : 'border-[#5E8858]/50 bg-gradient-to-br from-[#2B3D29] to-[#372920] text-[#F3EAE0]'
              : isLightMode
                ? 'border-[#A0545C]/50 bg-gradient-to-br from-[#6D363D] to-[#86474F] text-[#FAF2E8]'
                : 'border-[#A0545C]/50 bg-gradient-to-br from-[#462328] to-[#36261E] text-[#F3EAE0]'
          }`}
        >
          <p className="text-4xl">{session.passed ? '🎉' : '🌶️'}</p>
          <h2 className="mt-1.5 text-2xl font-black">
            {session.score} / {session.total} ({pct}%):{' '}
            {session.passed ? 'PASSED!' : 'NOT YET (75% NEEDED)'}
          </h2>
          <p className="mt-1 text-xs text-[#F4D9BD]">{spiceQuote}</p>
          <p className="mt-2 text-[11px] opacity-85">
            Completed in {Math.floor(session.durationSec / 60)}m {session.durationSec % 60}s
          </p>
        </section>

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
                  ? 'autumn-btn-cranberry'
                  : 'autumn-pill'
              }`}
            >
              Missed ({session.total - session.score})
            </button>
            <button
              type="button"
              onClick={() => setReviewFilter('all')}
              className={`rounded-xl px-3 py-1 text-xs font-bold ${
                reviewFilter === 'all'
                  ? 'bg-orange-600 text-[#FAF1E6]'
                  : 'autumn-pill'
              }`}
            >
              All ({session.total})
            </button>
          </div>
        </div>

        {visibleQuestions.length === 0 ? (
          <div className="autumn-card rounded-2xl p-5 text-center">
            <p className="accent-emerald text-sm font-bold">
              Zero missed questions: flawless 100% Posh score! 👑
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
                <article key={q.id} className="autumn-card space-y-3 rounded-3xl p-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="autumn-pill rounded-md px-2 py-0.5 text-[10px] font-bold uppercase">
                      {q.chapterId.toUpperCase()}
                    </span>
                    {isCorrect ? (
                      <span className="accent-emerald inline-flex items-center gap-1 text-xs font-bold">
                        <CheckCircle2 className="h-4 w-4" /> Correct
                      </span>
                    ) : (
                      <span className="accent-rose inline-flex items-center gap-1 text-xs font-bold">
                        <XCircle className="h-4 w-4" /> Missed
                      </span>
                    )}
                  </div>

                  <p className="text-sm leading-snug font-extrabold">
                    <BionicText text={q.prompt} />
                  </p>

                  {!isCorrect && (
                    <div className="callout-rose rounded-xl px-3 py-2 text-xs">
                      <strong>Your pick:</strong> <BionicText text={chosenLabels} />
                    </div>
                  )}

                  <div className="callout-emerald rounded-xl px-3 py-2 text-xs">
                    <strong>Right answer:</strong> <BionicText text={rightLabels} />
                  </div>

                  <div className="autumn-soft text-xs leading-relaxed">
                    <strong>Why: </strong>
                    <BionicText text={q.explanation} />
                  </div>

                  {q.memoryHook && (
                    <div className="callout-spice rounded-2xl p-3 text-xs leading-relaxed">
                      <p className="accent-spice mb-0.5 font-extrabold">
                        <Sparkles className="mr-1 inline h-3.5 w-3.5" />
                        Memory Tip:
                      </p>
                      <p>
                        <BionicText text={q.memoryHook} />
                      </p>
                    </div>
                  )}

                  {q.visualId && <VisualAidRenderer visualId={q.visualId} compact highlightSubtopicId={q.subtopicId} />}

                  <div className="pt-1">
                    <Button
                      variant={isBoosted ? 'secondary' : 'amber'}
                      size="sm"
                      disabled={isBoosted}
                      onClick={() => void handleBoostQuestionToFlashcards(q)}
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                      <span>
                        {isBoosted ? 'Added to Priority 4-Choice Review ✓' : 'Boost in 4-Choice Review'}
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
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setRunnerQuestions(null)}
            className="autumn-back-btn inline-flex items-center gap-1 rounded-xl px-2 py-1 text-xs font-bold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quit</span>
          </button>

          <span className="autumn-soft truncate text-xs font-extrabold">{runnerTitle}</span>

          {runnerMode === 'mock' && (
            <div
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-xs font-extrabold ${
                remainingSec < 300 ? 'callout-rose' : 'callout-amber'
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

        <div className="autumn-card space-y-4 rounded-3xl p-4.5">
          <div className="flex items-center justify-between text-xs">
            <span className="accent-spice font-extrabold">
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
                isFlagged ? 'callout-amber' : 'autumn-back-btn'
              }`}
            >
              <Flag className="h-3 w-3" />
              <span>{isFlagged ? 'Flagged' : 'Flag'}</span>
            </button>
          </div>

          <div>
            <p className="text-base leading-snug font-extrabold">
              <BionicText text={q.prompt} />
            </p>
            {q.type === 'multiple' && (
              <p className="accent-amber mt-1 text-xs font-bold">
                Select {q.correctIndices.length} answers ({selectedForCurrent.length}/
                {q.correctIndices.length} chosen)
              </p>
            )}
          </div>

          <div className="space-y-2">
            {q.options.map((opt, idx) => {
              const isChosen = selectedForCurrent.includes(idx);
              const isRightOpt = q.correctIndices.includes(idx);

              let optStyle = 'autumn-inset hover:border-orange-500/45';
              if (isRevealed) {
                if (isRightOpt) {
                  optStyle = 'callout-emerald font-bold ring-1 ring-emerald-500/50';
                } else if (isChosen) {
                  optStyle = 'callout-rose ring-1 ring-rose-500/50';
                }
              } else if (isChosen) {
                optStyle = 'callout-spice font-bold ring-1 ring-orange-500/60';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(q, idx)}
                  className={`flex w-full items-center gap-3 rounded-2xl p-3.5 text-left text-sm transition ${optStyle}`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-extrabold ${
                      isChosen
                        ? 'border-orange-500 bg-orange-600 text-[#FAF1E6]'
                        : 'border-amber-900/35 opacity-75'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-snug">
                    <BionicText text={opt} />
                  </span>
                </button>
              );
            })}
          </div>

          {instantFeedbackMode && selectedForCurrent.length >= q.correctIndices.length && !isRevealed && (
            <Button
              variant="amber"
              fullWidth
              onClick={() => setRevealedInDrill((r) => ({ ...r, [q.id]: true }))}
            >
              Check Answer ✨
            </Button>
          )}

          {isRevealed && (
            <div className="autumn-inset space-y-2.5 rounded-2xl p-3.5 text-xs">
              <p
                className={`font-extrabold ${
                  arraysHaveSameNumbers(selectedForCurrent, q.correctIndices)
                    ? 'accent-emerald'
                    : 'accent-rose'
                }`}
              >
                {arraysHaveSameNumbers(selectedForCurrent, q.correctIndices)
                  ? '✓ Spot on!'
                  : `✗ Right answer: ${q.correctIndices.map((i) => q.options[i]).join(' • ')}`}
              </p>
              <p className="autumn-soft leading-relaxed">
                <BionicText text={q.explanation} />
              </p>
              {q.memoryHook && (
                <div className="callout-spice rounded-xl p-2.5">
                  <strong>Memory Tip:</strong> <BionicText text={q.memoryHook} />
                </div>
              )}
              {q.visualId && <VisualAidRenderer visualId={q.visualId} compact highlightSubtopicId={q.subtopicId} />}
            </div>
          )}
        </div>

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

        <div className="autumn-card rounded-2xl p-3">
          <p className="autumn-muted mb-2 text-[11px] font-bold">
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
                      ? 'bg-orange-600 text-[#FAF1E6] ring-2 ring-orange-400/60'
                      : flg
                        ? 'callout-amber'
                        : done
                          ? 'callout-emerald'
                          : 'autumn-pill opacity-85'
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
  const myMockStatsByExam = buildMockExamStatsByNumber(testSessions, activeProfileId);
  const standardSummary = summarizeExamSet(standardExamNumbers, myMockStatsByExam);
  const spiceExamIds = Array.from({ length: TOTAL_MOCK_EXAMS }, (_, idx) => 101 + idx);
  const spiceSummary = summarizeExamSet(spiceExamIds, myMockStatsByExam);

  const openSessionReview = (session: TestSessionRecord) => {
    const qMap = new Map(allQuestions.map((q) => [q.id, q]));
    const sessionQs = session.answers
      .map((a) => qMap.get(a.questionId))
      .filter((q): q is PracticeQuestion => Boolean(q));
    if (sessionQs.length > 0) {
      setReviewFilter(session.score < session.total ? 'wrong' : 'all');
      setReviewSession({ session, questions: sessionQs });
    }
  };

  return (
    <div className="space-y-4">
      {/* Sub-navigation */}
      <div className="autumn-tabs grid grid-cols-4 gap-1 rounded-2xl p-1">
        {(
          [
            ['official18', 'Exams 1-18', <Star key="o" className="h-3.5 w-3.5" />],
            ['spice17', 'Spice 17', <Layers key="m" className="h-3.5 w-3.5" />],
            ['drills', 'Drills', <AlertTriangle key="d" className="h-3.5 w-3.5" />],
            ['history', 'History', <History key="h" className="h-3.5 w-3.5" />],
          ] as const
        ).map(([id, label, icon]) => (
          <button
            key={id}
            type="button"
            onClick={() => setSubTab(id)}
            className={`flex items-center justify-center gap-1 rounded-xl py-2 text-xs font-extrabold transition ${
              subTab === id ? 'bg-orange-600 text-[#FAF1E6] shadow-sm' : 'autumn-tab-inactive'
            }`}
          >
            {icon}
            <span className="truncate">{label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: Auto-Loaded Standard 18 Practice Exams (435 Qs, cached offline automatically on install) */}
      {subTab === 'official18' && (
        <div className="space-y-3">
          <div className="autumn-card rounded-3xl p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-black">Standard Practice Exams (1-18)</h2>
                <p className="autumn-muted text-xs">
                  {standardSummary.attemptedCount > 0
                    ? `${standardSummary.attemptedCount}/${standardExamNumbers.length || 18} completed • ${standardSummary.passedLatestCount} passed (latest score shown)`
                    : 'Auto-cached offline on install • 45 mins • 75% to pass'}
                </p>
              </div>
              {standard18Questions.length > 0 && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const shuffled = [...standard18Questions]
                      .sort(() => Math.random() - 0.5)
                      .slice(0, 24);
                    startRunner({
                      questions: shuffled,
                      mode: 'mock',
                      title: 'Random 24-Q Exam',
                    });
                  }}
                >
                  Random 24
                </Button>
              )}
            </div>
          </div>

          {standard18Questions.length === 0 ? (
            <div className="autumn-card space-y-3 rounded-3xl p-5 text-center text-xs">
              <p className="autumn-soft font-bold">
                {hydratingStandardPack
                  ? 'Caching all 18 exams offline right now...'
                  : 'Connect to the internet once to cache Exams 1-18 offline (or practice Spice 17 right away!).'}
              </p>
              {!hydratingStandardPack && onRetryStandardPack && (
                <div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => void onRetryStandardPack()}
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Load Exams 1-18 Now</span>
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {standardExamNumbers.map((examNum) => {
                const qs = standard18Questions.filter((q) => q.examNumber === examNum);
                const stat = myMockStatsByExam.get(examNum);
                if (!stat) {
                  return (
                    <button
                      key={examNum}
                      type="button"
                      onClick={() =>
                        startRunner({
                          questions: qs,
                          mode: 'mock',
                          examNumber: examNum,
                          title: `Exam #${examNum}`,
                        })
                      }
                      className="autumn-card flex flex-col justify-between rounded-2xl p-3.5 text-left transition hover:border-orange-500/50"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-sm font-black">Exam #{examNum}</span>
                      </div>
                      <p className="autumn-muted mt-2 text-[11px]">
                        {qs.length} questions ready
                      </p>
                    </button>
                  );
                }

                const latest = stat.latest;
                const latestPct = Math.round(
                  (latest.score / Math.max(1, latest.total)) * 100,
                );
                const shortDate = new Date(latest.completedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                });

                return (
                  <div
                    key={examNum}
                    className={`autumn-card flex flex-col justify-between gap-2 rounded-2xl p-3 text-left ring-1 ${
                      latest.passed ? 'ring-emerald-600/35' : 'ring-rose-500/35'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-sm font-black">Exam #{examNum}</span>
                        <span
                          className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-black tabular-nums ${
                            latest.passed ? 'callout-emerald' : 'callout-rose'
                          }`}
                        >
                          {latest.score}/{latest.total}
                        </span>
                      </div>
                      <p
                        className={`mt-1 text-[11px] font-bold ${
                          latest.passed ? 'accent-emerald' : 'accent-rose'
                        }`}
                      >
                        Latest: {latest.passed ? '✓ Passed' : 'Retry'} ({latestPct}%)
                      </p>
                      <p className="autumn-muted text-[10px]">
                        {stat.attempts > 1 && stat.best.score !== latest.score
                          ? `${stat.attempts} tries • Best ${stat.best.score}/${stat.best.total}`
                          : stat.attempts > 1
                            ? `${stat.attempts} tries • ${shortDate}`
                            : `Done ${shortDate}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          startRunner({
                            questions: qs,
                            mode: 'mock',
                            examNumber: examNum,
                            title: `Exam #${examNum}`,
                          })
                        }
                        className="autumn-pill flex-1 rounded-lg py-1 text-center text-[11px] font-extrabold transition hover:border-orange-500/50"
                      >
                        Retake
                      </button>
                      <button
                        type="button"
                        onClick={() => openSessionReview(latest)}
                        className="autumn-inset rounded-lg px-2 py-1 text-[11px] font-bold transition hover:border-orange-500/50"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {userImportedQuestions.length > 0 && (
            <div className="autumn-card rounded-2xl p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold">
                  Extra Custom Pack ({userImportedQuestions.length} Qs)
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    const sample = [...userImportedQuestions]
                      .sort(() => Math.random() - 0.5)
                      .slice(0, 24);
                    startRunner({
                      questions: sample,
                      mode: 'mock',
                      title: 'Custom Pack: Random 24',
                    });
                  }}
                >
                  Practice 24
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Built-in 17 Original Spice Mock Exams */}
      {subTab === 'spice17' && (
        <div className="space-y-3">
          <div className="autumn-card rounded-3xl p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-black">Spice Bonus Mock Exams (1-17)</h2>
                <p className="autumn-muted text-xs">
                  {spiceSummary.attemptedCount > 0
                    ? `${spiceSummary.attemptedCount}/${TOTAL_MOCK_EXAMS} completed • ${spiceSummary.passedLatestCount} passed (latest score shown)`
                    : '408 extra original questions with Spice Girls mnemonics'}
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const shuffled = [...spice17Questions]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 24);
                  startRunner({
                    questions: shuffled,
                    mode: 'mock',
                    title: 'Spice Bonus: Random 24',
                  });
                }}
              >
                Random 24
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {Array.from({ length: TOTAL_MOCK_EXAMS }, (_, idx) => idx + 1).map((examNum) => {
              const qs = spice17Questions.filter((q) => q.examNumber === examNum);
              const sessionExamId = 100 + examNum;
              const stat = myMockStatsByExam.get(sessionExamId);
              if (!stat) {
                return (
                  <button
                    key={examNum}
                    type="button"
                    disabled={qs.length === 0}
                    onClick={() =>
                      startRunner({
                        questions: qs,
                        mode: 'mock',
                        examNumber: sessionExamId,
                        title: `Spice Exam #${examNum}`,
                      })
                    }
                    className="autumn-card flex flex-col justify-between rounded-2xl p-3.5 text-left transition hover:border-orange-500/50"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm font-black">Spice #{examNum}</span>
                    </div>
                    <p className="autumn-muted mt-2 text-[11px]">
                      {qs.length} questions ready
                    </p>
                  </button>
                );
              }

              const latest = stat.latest;
              const latestPct = Math.round(
                (latest.score / Math.max(1, latest.total)) * 100,
              );
              const shortDate = new Date(latest.completedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
              });

              return (
                <div
                  key={examNum}
                  className={`autumn-card flex flex-col justify-between gap-2 rounded-2xl p-3 text-left ring-1 ${
                    latest.passed ? 'ring-emerald-600/35' : 'ring-rose-500/35'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm font-black">Spice #{examNum}</span>
                      <span
                        className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-black tabular-nums ${
                          latest.passed ? 'callout-emerald' : 'callout-rose'
                        }`}
                      >
                        {latest.score}/{latest.total}
                      </span>
                    </div>
                    <p
                      className={`mt-1 text-[11px] font-bold ${
                        latest.passed ? 'accent-emerald' : 'accent-rose'
                      }`}
                    >
                      Latest: {latest.passed ? '✓ Passed' : 'Retry'} ({latestPct}%)
                    </p>
                    <p className="autumn-muted text-[10px]">
                      {stat.attempts > 1 && stat.best.score !== latest.score
                        ? `${stat.attempts} tries • Best ${stat.best.score}/${stat.best.total}`
                        : stat.attempts > 1
                          ? `${stat.attempts} tries • ${shortDate}`
                          : `Done ${shortDate}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={qs.length === 0}
                      onClick={() =>
                        startRunner({
                          questions: qs,
                          mode: 'mock',
                          examNumber: sessionExamId,
                          title: `Spice Exam #${examNum}`,
                        })
                      }
                      className="autumn-pill flex-1 rounded-lg py-1 text-center text-[11px] font-extrabold transition hover:border-orange-500/50"
                    >
                      Retake
                    </button>
                    <button
                      type="button"
                      onClick={() => openSessionReview(latest)}
                      className="autumn-inset rounded-lg px-2 py-1 text-[11px] font-bold transition hover:border-orange-500/50"
                    >
                      Review
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {onJumpToImporter && (
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={onJumpToImporter}
                className="autumn-muted hover:accent-spice text-xs font-bold transition"
              >
                Want to import another custom JSON/CSV deck? Open Us tab -&gt;
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Chapter Drills & Mistakes Bank */}
      {subTab === 'drills' && (
        <div className="space-y-3">
          <div className="autumn-card rounded-3xl p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="accent-rose text-sm font-black">
                  Mistakes Rescue Bank ({missedQuestionIds.length})
                </h3>
                <p className="autumn-muted mt-0.5 text-xs">
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
                  className="autumn-card flex items-center justify-between gap-3 rounded-2xl p-3.5"
                >
                  <div>
                    <p className="text-xs font-extrabold">
                      Ch {ch.number}: {ch.title}
                    </p>
                    <p className="autumn-muted text-[11px]">
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
            <div className="autumn-card autumn-muted rounded-3xl p-6 text-center text-xs">
              No completed tests yet. Start Exam #1 or a quick 12-question chapter drill!
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
                    className="autumn-card flex w-full items-center justify-between rounded-2xl p-3.5 text-left transition hover:border-orange-500/45"
                  >
                    <div>
                      <p className="text-xs font-extrabold">
                        {s.mode === 'mock'
                          ? formatExamLabel(s.examNumber)
                          : s.mode === 'mistakes'
                            ? 'Mistakes Drill'
                            : s.mode === 'challenge'
                              ? 'Head-to-Head Duel'
                              : `Chapter Drill (${s.chapterId?.toUpperCase() ?? ''})`}
                      </p>
                      <p className="autumn-muted text-[11px]">
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
                        s.passed ? 'callout-emerald' : 'callout-rose'
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
