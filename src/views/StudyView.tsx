import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  CheckSquare,
  ExternalLink,
  Eye,
  Layers,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import { CHAPTERS } from '../data/syllabus';
import { STUDY_SECTIONS } from '../data/studyGuides';
import { COMMUNITY_RESOURCES, TEST_DAY_CHECKLIST } from '../data/communityLinks';
import {
  recordSmartQuestionReview,
  toggleStudyGuideSectionRead,
} from '../db/repository';
import { previewIntervalLabel, selectStudyQueue } from '../services/srs';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { VisualAidRenderer } from '../components/visuals/VisualAidRenderer';
import type {
  ChapterId,
  PracticeQuestion,
  ProfileId,
  SrsCardState,
  SrsRating,
  SubjectMasterySummary,
  SubtopicId,
  VisualAidId,
} from '../types/domain';

export type StudySubTab = 'guides' | 'quiz' | 'visuals' | 'vault';

interface StudyViewProps {
  activeProfileId: ProfileId;
  allQuestions: readonly PracticeQuestion[];
  readGuideIds: readonly string[];
  srsMap: ReadonlyMap<string, SrsCardState>;
  chapterMasteries: readonly SubjectMasterySummary[];
  initialChapterFilter?: ChapterId | null;
  initialSubTab?: StudySubTab | null;
  autoLaunchDeck?: boolean;
  onConsumeAutoLaunch?: () => void;
}

function sameNumberSet(a: readonly number[], b: readonly number[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a].sort((x, y) => x - y);
  const sb = [...b].sort((x, y) => x - y);
  return sa.every((v, idx) => v === sb[idx]);
}

function renderFormattedFact(fact: string): React.ReactNode {
  const colonIdx = fact.indexOf(':');
  if (colonIdx > 0 && colonIdx < 58) {
    return (
      <>
        <strong className="font-extrabold">{fact.slice(0, colonIdx + 1)}</strong>
        {fact.slice(colonIdx + 1)}
      </>
    );
  }
  return fact;
}

export const StudyView: React.FC<StudyViewProps> = ({
  activeProfileId,
  allQuestions,
  readGuideIds,
  srsMap,
  chapterMasteries,
  initialChapterFilter,
  initialSubTab,
  autoLaunchDeck,
  onConsumeAutoLaunch,
}) => {
  const [subTab, setSubTab] = useState<StudySubTab>(initialSubTab ?? 'guides');
  const [selectedChapter, setSelectedChapter] = useState<ChapterId | 'all'>(
    initialChapterFilter ?? 'all',
  );
  const [deckMode, setDeckMode] = useState<'smart' | 'due-only' | 'cram'>('smart');

  // 4-Way Choice Spaced-Repetition Runner State
  const [sessionQuestions, setSessionQuestions] = useState<PracticeQuestion[] | null>(null);
  const [sessionLabel, setSessionLabel] = useState<string>('4-Choice Smart Practice');
  const [cardIndex, setCardIndex] = useState(0);
  const [pickedIndices, setPickedIndices] = useState<number[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [sessionCompletedCount, setSessionCompletedCount] = useState(0);
  const [sessionCorrectFirstTry, setSessionCorrectFirstTry] = useState(0);
  const [requeuedIds, setRequeuedIds] = useState<Set<string>>(new Set());

  const readSet = useMemo(() => new Set(readGuideIds), [readGuideIds]);

  const startSmartQuizSession = (params?: {
    chapterId?: ChapterId | 'all';
    subtopicId?: SubtopicId;
    mode?: 'smart' | 'due-only' | 'cram';
    title?: string;
    markSectionReadId?: string;
  }) => {
    if (params?.markSectionReadId) {
      void toggleStudyGuideSectionRead(activeProfileId, params.markSectionReadId, true);
    }
    const ch = params?.chapterId ?? selectedChapter;
    const mode = params?.mode ?? deckMode;
    let queue = selectStudyQueue(allQuestions, srsMap, activeProfileId, {
      chapterId: ch === 'all' ? undefined : ch,
      subtopicId: params?.subtopicId,
      mode,
      maxNewCards: params?.subtopicId ? 16 : 18,
      limit: params?.subtopicId ? 16 : 24,
    });
    // If all questions in a specific subtopic were already scheduled in the future, fall back to cramming that subtopic so lesson practice always has questions ready!
    if (queue.length === 0 && params?.subtopicId) {
      queue = selectStudyQueue(allQuestions, srsMap, activeProfileId, {
        subtopicId: params.subtopicId,
        mode: 'cram',
        limit: 14,
      });
    }
    setSessionLabel(params?.title ?? '4-Choice Smart Practice');
    setSessionQuestions(queue);
    setCardIndex(0);
    setPickedIndices([]);
    setIsRevealed(false);
    setShowHint(false);
    setSessionCompletedCount(0);
    setSessionCorrectFirstTry(0);
    setRequeuedIds(new Set());
  };

  useEffect(() => {
    if (initialSubTab) {
      setSubTab(initialSubTab);
    }
    if (initialChapterFilter) {
      setSelectedChapter(initialChapterFilter);
    }
    if (autoLaunchDeck) {
      const ch = initialChapterFilter ?? 'all';
      setSelectedChapter(ch);
      setSubTab('quiz');
      startSmartQuizSession({
        chapterId: ch,
        mode: 'smart',
        title:
          ch === 'all'
            ? '4-Choice Smart Practice'
            : `Ch ${ch.replace('ch', '')}: 4-Choice Practice`,
      });
      onConsumeAutoLaunch?.();
    } else if (initialSubTab) {
      onConsumeAutoLaunch?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLaunchDeck, initialChapterFilter, initialSubTab]);

  const currentQuestion = sessionQuestions ? sessionQuestions[cardIndex] : undefined;
  const currentSrs = useMemo(() => {
    if (!currentQuestion) return undefined;
    return srsMap.get(`${activeProfileId}:${currentQuestion.id}`);
  }, [currentQuestion, srsMap, activeProfileId]);

  const handleSelectChoice = (q: PracticeQuestion, optIdx: number) => {
    if (isRevealed) return;
    if (q.type === 'multiple') {
      const needed = q.correctIndices.length;
      setPickedIndices((prev) => {
        if (prev.includes(optIdx)) return prev.filter((i) => i !== optIdx);
        if (prev.length >= needed) return [...prev.slice(1), optIdx];
        return [...prev, optIdx];
      });
      return;
    }
    setPickedIndices([optIdx]);
    setIsRevealed(true);
  };

  const handleAdvanceQuestion = async (ratingOverride?: SrsRating) => {
    if (!currentQuestion || !sessionQuestions) return;
    const isCorrect = sameNumberSet(pickedIndices, currentQuestion.correctIndices);
    const rating: SrsRating = isCorrect ? (ratingOverride ?? 'good') : 'again';

    await recordSmartQuestionReview(activeProfileId, currentQuestion, rating, isCorrect);
    setSessionCompletedCount((c) => c + 1);
    if (isCorrect && !requeuedIds.has(currentQuestion.id)) {
      setSessionCorrectFirstTry((c) => c + 1);
    }

    if (!isCorrect) {
      setRequeuedIds((prev) => new Set(prev).add(currentQuestion.id));
      setSessionQuestions((prev) => (prev ? [...prev, currentQuestion] : null));
    }

    setPickedIndices([]);
    setIsRevealed(false);
    setShowHint(false);
    setCardIndex((idx) => idx + 1);
  };

  // --- ACTIVE 4-WAY CHOICE SPACED-REPETITION SESSION ---
  if (sessionQuestions !== null) {
    if (sessionQuestions.length === 0) {
      return (
        <div className="autumn-card rounded-3xl p-6 text-center">
          <p className="text-3xl">🎉</p>
          <h2 className="mt-2 text-lg font-black">All caught up on scheduled reviews!</h2>
          <p className="autumn-muted mt-1 text-xs">
            Switch to <strong>Smart Mix</strong> or <strong>Practice Any 24</strong> to keep
            practising 4-way choice questions right now.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Button variant="secondary" onClick={() => setSessionQuestions(null)}>
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                startSmartQuizSession({ chapterId: selectedChapter, mode: 'cram' })
              }
            >
              Practice 24 Questions Now
            </Button>
          </div>
        </div>
      );
    }

    if (!currentQuestion) {
      return (
        <div className="autumn-card rounded-3xl p-6 text-center">
          <p className="text-4xl">👑</p>
          <h2 className="mt-2 text-xl font-black">Session Complete!</h2>
          <p className="autumn-muted mt-1 text-xs">
            You answered <strong>{sessionCompletedCount}</strong> 4-way choice prompts (
            <strong>{sessionCorrectFirstTry}</strong> right on the first try) and updated your
            spaced-repetition schedule.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            <Button
              variant="secondary"
              onClick={() => {
                setSessionQuestions(null);
                setSubTab('guides');
              }}
            >
              Back to Study Guide
            </Button>
            <Button variant="primary" onClick={() => startSmartQuizSession()}>
              Practice Next Batch
            </Button>
          </div>
        </div>
      );
    }

    const progressPct = Math.round(((cardIndex + 1) / sessionQuestions.length) * 100);
    const isCorrectNow = sameNumberSet(pickedIndices, currentQuestion.correctIndices);

    return (
      <div className="space-y-3.5">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setSessionQuestions(null)}
            className="autumn-back-btn inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-bold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Exit</span>
          </button>
          <span className="autumn-soft truncate text-xs font-extrabold">{sessionLabel}</span>
          <span className="accent-spice shrink-0 text-xs font-extrabold">
            {cardIndex + 1} / {sessionQuestions.length}
          </span>
        </div>

        <ProgressBar percent={progressPct} heightClass="h-2" />

        <div className="autumn-card space-y-4 rounded-3xl p-4.5">
          <div className="flex items-center justify-between gap-2 text-[11px] font-bold">
            <span className="callout-spice rounded-lg px-2 py-0.5 uppercase">
              {currentQuestion.chapterId.toUpperCase()} • 4-Choice Practice
            </span>
            {requeuedIds.has(currentQuestion.id) && (
              <span className="callout-amber rounded-lg px-2 py-0.5">Second-chance retry</span>
            )}
          </div>

          <div>
            <p className="text-base leading-snug font-extrabold">{currentQuestion.prompt}</p>
            {currentQuestion.type === 'multiple' && (
              <p className="accent-amber mt-1 text-xs font-bold">
                Select {currentQuestion.correctIndices.length} answers ({pickedIndices.length}/
                {currentQuestion.correctIndices.length} chosen)
              </p>
            )}
          </div>

          {!isRevealed && currentQuestion.memoryHook && (
            <div>
              {showHint ? (
                <div className="callout-amber rounded-2xl p-3 text-xs">
                  <span className="font-extrabold">Memory Tip: </span>
                  {currentQuestion.memoryHook}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowHint(true)}
                  className="callout-amber inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition hover:opacity-90"
                >
                  <Lightbulb className="h-3.5 w-3.5" />
                  <span>Need a hint? Peek Memory Tip</span>
                </button>
              )}
            </div>
          )}

          <div className="space-y-2">
            {currentQuestion.options.map((opt, idx) => {
              const isChosen = pickedIndices.includes(idx);
              const isRightOpt = currentQuestion.correctIndices.includes(idx);

              let optClass = 'autumn-inset hover:border-orange-500/50';
              if (isRevealed) {
                if (isRightOpt) {
                  optClass = 'callout-emerald font-bold ring-1 ring-emerald-500/55';
                } else if (isChosen) {
                  optClass = 'callout-rose ring-1 ring-rose-500/55';
                }
              } else if (isChosen) {
                optClass = 'callout-spice font-bold ring-1 ring-orange-500/60';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectChoice(currentQuestion, idx)}
                  className={`flex w-full items-center gap-3 rounded-2xl p-3.5 text-left text-sm transition ${optClass}`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-extrabold ${
                      isRevealed && isRightOpt
                        ? 'border-emerald-600 bg-emerald-700 text-[#FAF1E6]'
                        : isChosen
                          ? 'border-orange-500 bg-orange-600 text-[#FAF1E6]'
                          : 'border-amber-900/35 opacity-75'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          {!isRevealed &&
            currentQuestion.type === 'multiple' &&
            pickedIndices.length >= currentQuestion.correctIndices.length && (
              <Button variant="amber" fullWidth onClick={() => setIsRevealed(true)}>
                Check Answer ✨
              </Button>
            )}

          {isRevealed && (
            <div className="autumn-inset space-y-3 rounded-2xl p-3.5 text-xs">
              <p className={`text-sm font-extrabold ${isCorrectNow ? 'accent-emerald' : 'accent-rose'}`}>
                {isCorrectNow
                  ? '✓ Correct!'
                  : `✗ Right answer: ${currentQuestion.correctIndices
                      .map((i) => currentQuestion.options[i])
                      .join(' • ')}`}
              </p>

              <p className="autumn-soft leading-relaxed">{currentQuestion.explanation}</p>

              {currentQuestion.memoryHook && (
                <div className="callout-spice rounded-xl p-2.5 leading-relaxed">
                  <p className="accent-spice mb-0.5 font-extrabold">
                    <Sparkles className="mr-1 inline h-3.5 w-3.5" />
                    Memory Tip:
                  </p>
                  <p>{currentQuestion.memoryHook}</p>
                </div>
              )}

              {currentQuestion.visualId && (
                <VisualAidRenderer
                  visualId={currentQuestion.visualId}
                  compact
                  highlightSubtopicId={currentQuestion.subtopicId}
                />
              )}
            </div>
          )}
        </div>

        {isRevealed && (
          <div className="flex flex-wrap gap-2">
            {isCorrectNow ? (
              <>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => void handleAdvanceQuestion('hard')}
                >
                  Lucky Guess ({previewIntervalLabel(currentSrs, activeProfileId, currentQuestion.id, 'hard')})
                </Button>
                <Button
                  variant="emerald"
                  size="md"
                  className="flex-1"
                  onClick={() => void handleAdvanceQuestion('good')}
                >
                  Next Question ✓ ({previewIntervalLabel(currentSrs, activeProfileId, currentQuestion.id, 'good')})
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => void handleAdvanceQuestion('again')}
              >
                Got It, Ask Me Again Before Finishing →
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }

  const visibleSections = STUDY_SECTIONS.filter(
    (sec) => selectedChapter === 'all' || sec.chapterId === selectedChapter,
  );
  const readCountTotal = STUDY_SECTIONS.filter((s) => readSet.has(s.id)).length;
  const readPct = Math.round((readCountTotal / STUDY_SECTIONS.length) * 100);

  return (
    <div className="space-y-4">
      {/* Sub-navigation Pills: Study Guide FIRST, 4-Choice Practice SECOND */}
      <div className="autumn-tabs grid grid-cols-4 gap-1.5 rounded-2xl p-1">
        {(
          [
            ['guides', 'Guide', <BookOpen key="g" className="h-3.5 w-3.5" />],
            ['quiz', '4-Choice', <Layers key="c" className="h-3.5 w-3.5" />],
            ['visuals', 'Visuals', <Eye key="v" className="h-3.5 w-3.5" />],
            ['vault', 'Checklist', <ExternalLink key="l" className="h-3.5 w-3.5" />],
          ] as const
        ).map(([id, label, icon]) => (
          <button
            key={id}
            type="button"
            onClick={() => setSubTab(id)}
            className={`flex items-center justify-center gap-1 rounded-xl py-2 text-xs font-extrabold transition ${
              subTab === id
                ? 'bg-orange-600 text-[#FAF1E6] shadow-sm'
                : 'autumn-tab-inactive'
            }`}
          >
            {icon}
            <span className="truncate">{label}</span>
          </button>
        ))}
      </div>

      {/* Chapter Filter Strip (for Study Guide & 4-Choice Practice) */}
      {(subTab === 'guides' || subTab === 'quiz') && (
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedChapter('all')}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition ${
              selectedChapter === 'all'
                ? 'bg-orange-600 text-[#FAF1E6]'
                : 'autumn-pill'
            }`}
          >
            All Chapters
          </button>
          {CHAPTERS.map((ch) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => setSelectedChapter(ch.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                selectedChapter === ch.id
                  ? 'bg-orange-600 text-[#FAF1E6]'
                  : 'autumn-pill'
              }`}
            >
              Ch {ch.number}: {ch.shortTitle}
            </button>
          ))}
        </div>
      )}

      {/* TAB 1 (DEFAULT): BEGINNER-FRIENDLY CHAPTER STUDY GUIDE + INLINE 4-CHOICE QUIZZES */}
      {subTab === 'guides' && (
        <div className="space-y-4">
          <div className="autumn-card space-y-2.5 rounded-3xl p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-black">Step 1: Read the Chapter Study Guide</h2>
                <p className="autumn-muted text-xs">
                  New to the material? Read any short lesson below, then tap{' '}
                  <strong>Practice This Lesson (4-Choice)</strong> to test recognition right away.
                </p>
              </div>
              <span className="callout-emerald shrink-0 rounded-xl px-2.5 py-1 text-xs font-black">
                {readCountTotal}/{STUDY_SECTIONS.length} read
              </span>
            </div>
            <ProgressBar percent={readPct} heightClass="h-2" />
          </div>

          {visibleSections.map((sec) => {
            const globalLessonNum = STUDY_SECTIONS.findIndex((s) => s.id === sec.id) + 1;
            const isRead = readSet.has(sec.id);
            const topicQuestionCount = allQuestions.filter(
              (q) => q.subtopicId === sec.subtopicId,
            ).length;

            return (
              <article key={sec.id} className="autumn-card space-y-3.5 rounded-3xl p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="callout-spice rounded-md px-2 py-0.5 text-[10px] font-bold uppercase">
                    Lesson {globalLessonNum} of {STUDY_SECTIONS.length} • {sec.chapterId.toUpperCase()}
                  </span>
                  <button
                    type="button"
                    onClick={() => void toggleStudyGuideSectionRead(activeProfileId, sec.id)}
                    className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-[11px] font-bold transition ${
                      isRead ? 'callout-emerald' : 'autumn-pill'
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{isRead ? 'Read ✓' : 'Mark Read'}</span>
                  </button>
                </div>

                <div>
                  <h3 className="text-base font-black">{sec.title}</h3>
                  {sec.summary && (
                    <p className="autumn-inset autumn-soft mt-2 rounded-2xl p-3 text-xs leading-relaxed">
                      {sec.summary}
                    </p>
                  )}
                </div>

                <ul className="autumn-soft space-y-2.5 text-xs leading-relaxed">
                  {sec.keyFacts.map((fact, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="accent-spice mt-0.5 shrink-0 font-bold">•</span>
                      <span>{renderFormattedFact(fact)}</span>
                    </li>
                  ))}
                </ul>

                {sec.visualId && (
                  <VisualAidRenderer
                    visualId={sec.visualId}
                    highlightSubtopicId={sec.subtopicId}
                  />
                )}

                {sec.memoryHook && (
                  <div className="callout-amber rounded-2xl p-3 text-xs leading-relaxed">
                    <span className="font-extrabold">Exam Trap &amp; Memory Tip: </span>
                    {sec.memoryHook}
                  </div>
                )}

                <div className="pt-1">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() =>
                      startSmartQuizSession({
                        chapterId: sec.chapterId,
                        subtopicId: sec.subtopicId,
                        mode: 'smart',
                        title: sec.title,
                        markSectionReadId: sec.id,
                      })
                    }
                  >
                    <span>
                      Practice This Lesson: 4-Way Choice ({topicQuestionCount} Qs in bank) →
                    </span>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* TAB 2: 4-WAY CHOICE SPACED-REPETITION PRACTICE (ZERO OPEN-ENDED RECALL) */}
      {subTab === 'quiz' && (
        <div className="space-y-3.5">
          <div className="autumn-card rounded-3xl p-4">
            <h2 className="text-base font-black">4-Way Choice Smart Practice (SM-2)</h2>
            <p className="autumn-muted mt-1 text-xs">
              Every prompt uses real 4-option exam format (never open-ended recall from memory),
              scheduled automatically with spaced repetition so tricky facts resurface right before
              you forget them.
            </p>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {(
                [
                  ['smart', 'Smart Mix', 'Due + New'],
                  ['due-only', 'Due Only', 'Scheduled'],
                  ['cram', 'Any 24', 'Extra practice'],
                ] as const
              ).map(([m, title, sub]) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setDeckMode(m)}
                  className={`rounded-2xl p-2.5 text-left transition ${
                    deckMode === m
                      ? 'callout-spice ring-1 ring-orange-500/60'
                      : 'autumn-inset'
                  }`}
                >
                  <p className="text-xs font-extrabold">{title}</p>
                  <p className="autumn-muted text-[10px]">{sub}</p>
                </button>
              ))}
            </div>

            <div className="mt-4">
              <Button variant="primary" size="lg" fullWidth onClick={() => startSmartQuizSession()}>
                Start 4-Choice Session 🎯
              </Button>
            </div>
          </div>

          <div className="space-y-2.5">
            {CHAPTERS.map((ch) => {
              const chQs = allQuestions.filter((q) => q.chapterId === ch.id);
              const m = chapterMasteries.find((cm) => cm.id === ch.id);
              return (
                <div
                  key={ch.id}
                  className="autumn-card flex items-center justify-between gap-3 rounded-2xl p-3.5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-extrabold">
                      Ch {ch.number}: {ch.title}
                    </p>
                    <p className="autumn-muted mt-0.5 text-[11px]">
                      {m?.questionsAttempted ?? 0} / {chQs.length} questions practised •{' '}
                      {ch.examWeightHint}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      startSmartQuizSession({
                        chapterId: ch.id,
                        mode: 'smart',
                        title: `Ch ${ch.number}: ${ch.shortTitle}`,
                      })
                    }
                  >
                    4-Choice
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Interactive Visual Aids Gallery */}
      {subTab === 'visuals' && (
        <div className="space-y-4">
          {(
            [
              'union-jack',
              'uk-map',
              'national-emblems',
              'parliament-courts',
              'history-timeline',
            ] as VisualAidId[]
          ).map((vid) => (
            <VisualAidRenderer key={vid} visualId={vid} />
          ))}
        </div>
      )}

      {/* TAB 4: Official Test-Day Checklist & Links */}
      {subTab === 'vault' && (
        <div className="space-y-4">
          <div className="autumn-card rounded-3xl p-4">
            <h3 className="flex items-center gap-1.5 text-sm font-black">
              <CheckSquare className="accent-emerald h-4 w-4" />
              <span>Official Test-Day &amp; eVisa Checklist</span>
            </h3>
            <ul className="autumn-soft mt-2.5 space-y-2 text-xs leading-relaxed">
              {TEST_DAY_CHECKLIST.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="accent-emerald font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5">
            {COMMUNITY_RESOURCES.map((res) => (
              <div key={res.id} className="autumn-card rounded-2xl p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="callout-amber rounded-md px-2 py-0.5 text-[10px] font-bold">
                      {res.badge}
                    </span>
                    <h4 className="mt-1 text-sm font-extrabold">{res.title}</h4>
                  </div>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="autumn-pill shrink-0 rounded-xl p-2"
                    title="Open online link"
                  >
                    <ExternalLink className="accent-spice h-4 w-4" />
                  </a>
                </div>
                <p className="autumn-muted mt-1.5 text-xs leading-relaxed">{res.summary}</p>
                <p className="callout-spice mt-2 rounded-xl px-2.5 py-1.5 text-[11px]">
                  🌶️ <strong>Tip:</strong> {res.spiceTip}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
