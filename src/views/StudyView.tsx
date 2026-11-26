import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
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
  markGuideReadAndAdvance,
  recordSmartQuestionReview,
  setLastStudyGuideSection,
  toggleStudyGuideSectionRead,
} from '../db/repository';
import { previewIntervalLabel, selectStudyQueue } from '../services/srs';
import { buildLessonPages } from '../services/studyGuidePages';
import { Button } from '../components/ui/Button';
import { BionicText, useBionicReading } from '../components/ui/BionicText';
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
  lastGuideSectionId?: string | null;
  lastGuidePageIndex?: number;
  dueQuestionCount?: number;
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

function renderFormattedFact(fact: string, bionicEnabled: boolean): React.ReactNode {
  const colonIdx = fact.indexOf(':');
  if (colonIdx > 0 && colonIdx < 58) {
    const prefix = fact.slice(0, colonIdx + 1);
    const rest = fact.slice(colonIdx + 1);
    if (bionicEnabled) {
      return (
        <>
          <span className="accent-spice">
            <BionicText text={prefix} />
          </span>
          <BionicText text={rest} />
        </>
      );
    }
    return (
      <>
        <strong className="font-extrabold">{prefix}</strong>
        {rest}
      </>
    );
  }
  return <BionicText text={fact} />;
}

export const StudyView: React.FC<StudyViewProps> = ({
  activeProfileId,
  allQuestions,
  readGuideIds,
  lastGuideSectionId,
  lastGuidePageIndex = 0,
  dueQuestionCount = 0,
  srsMap,
  chapterMasteries,
  initialChapterFilter,
  initialSubTab,
  autoLaunchDeck,
  onConsumeAutoLaunch,
}) => {
  const { enabled: bionicReading } = useBionicReading();
  const [subTab, setSubTab] = useState<StudySubTab>(initialSubTab ?? 'guides');
  const [selectedChapter, setSelectedChapter] = useState<ChapterId | 'all'>(
    initialChapterFilter ?? 'all',
  );
  const [currentGuideId, setCurrentGuideId] = useState<string>(() => {
    if (lastGuideSectionId && STUDY_SECTIONS.some((s) => s.id === lastGuideSectionId)) {
      return lastGuideSectionId;
    }
    const firstUnread = STUDY_SECTIONS.find((s) => !readGuideIds.includes(s.id));
    return (firstUnread ?? STUDY_SECTIONS[0])!.id;
  });
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(() =>
    lastGuideSectionId ? Math.max(0, lastGuidePageIndex) : 0,
  );
  const [showLessonIndex, setShowLessonIndex] = useState(false);
  const [showLessonVisual, setShowLessonVisual] = useState(false);
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

  const navigateToGuidePosition = (
    sectionId: string,
    pageIndex: number = 0,
    persist: boolean = true,
  ) => {
    const safeIdx = Math.max(0, pageIndex);
    setCurrentGuideId(sectionId);
    setCurrentPageIdx(safeIdx);
    setShowLessonVisual(false);
    setShowLessonIndex(false);
    if (persist) {
      void setLastStudyGuideSection(activeProfileId, sectionId, safeIdx);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (lastGuideSectionId && STUDY_SECTIONS.some((s) => s.id === lastGuideSectionId)) {
      setCurrentGuideId(lastGuideSectionId);
      setCurrentPageIdx(Math.max(0, lastGuidePageIndex));
    }
  }, [lastGuideSectionId, lastGuidePageIndex]);

  const handleSelectChapterFilter = (ch: ChapterId | 'all') => {
    setSelectedChapter(ch);
    const nextVisible = STUDY_SECTIONS.filter((s) => ch === 'all' || s.chapterId === ch);
    if (nextVisible.length > 0 && !nextVisible.some((s) => s.id === currentGuideId)) {
      const nextUnread = nextVisible.find((s) => !readSet.has(s.id));
      navigateToGuidePosition((nextUnread ?? nextVisible[0])!.id, 0);
    }
  };

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
      const chSections = STUDY_SECTIONS.filter((s) => s.chapterId === initialChapterFilter);
      if (chSections.length > 0 && !chSections.some((s) => s.id === currentGuideId)) {
        const chUnread = chSections.find((s) => !readSet.has(s.id));
        setCurrentGuideId((chUnread ?? chSections[0])!.id);
        setCurrentPageIdx(0);
        setShowLessonVisual(false);
      }
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
            <p className="text-base leading-snug font-extrabold">
              <BionicText text={currentQuestion.prompt} />
            </p>
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
                  <BionicText text={currentQuestion.memoryHook} />
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
                  <span className="flex-1 leading-snug">
                    <BionicText text={opt} />
                  </span>
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

              <p className="autumn-soft leading-relaxed">
                <BionicText text={currentQuestion.explanation} />
              </p>

              {currentQuestion.memoryHook && (
                <div className="callout-spice rounded-xl p-2.5 leading-relaxed">
                  <p className="accent-spice mb-0.5 font-extrabold">
                    <Sparkles className="mr-1 inline h-3.5 w-3.5" />
                    Memory Tip:
                  </p>
                  <p>
                    <BionicText text={currentQuestion.memoryHook} />
                  </p>
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
  const currentVisibleIdx = Math.max(
    0,
    visibleSections.findIndex((sec) => sec.id === currentGuideId),
  );
  const activeSection = visibleSections[currentVisibleIdx] ?? visibleSections[0];
  const readCountTotal = STUDY_SECTIONS.filter((s) => readSet.has(s.id)).length;
  const readPct = Math.round((readCountTotal / STUDY_SECTIONS.length) * 100);

  return (
    <div className="space-y-3.5">
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
        <div className="flex gap-1.5 overflow-x-auto pb-0.5">
          <button
            type="button"
            onClick={() => handleSelectChapterFilter('all')}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold transition ${
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
              onClick={() => handleSelectChapterFilter(ch.id)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold transition ${
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

      {/* TAB 1 (DEFAULT): STATEFUL BITE-SIZED PAGINATED STUDY GUIDE */}
      {subTab === 'guides' && activeSection && (() => {
        const sec = activeSection;
        const globalLessonNum = STUDY_SECTIONS.findIndex((s) => s.id === sec.id) + 1;
        const lessonPages = buildLessonPages(sec);
        const safePageIdx = Math.min(Math.max(0, currentPageIdx), lessonPages.length - 1);
        const activePage = lessonPages[safePageIdx]!;
        const isRead = readSet.has(sec.id);
        const prevSection = currentVisibleIdx > 0 ? visibleSections[currentVisibleIdx - 1] : undefined;
        const nextSection =
          currentVisibleIdx < visibleSections.length - 1
            ? visibleSections[currentVisibleIdx + 1]
            : undefined;
        const canGoBack = safePageIdx > 0 || Boolean(prevSection);
        const topicQuestionCount = allQuestions.filter(
          (q) => q.subtopicId === sec.subtopicId,
        ).length;

        const handlePrevClick = () => {
          if (safePageIdx > 0) {
            navigateToGuidePosition(sec.id, safePageIdx - 1);
          } else if (prevSection) {
            const prevPages = buildLessonPages(prevSection);
            navigateToGuidePosition(prevSection.id, prevPages.length - 1);
          }
        };

        const handleNextClick = () => {
          if (!activePage.isFinal) {
            navigateToGuidePosition(sec.id, safePageIdx + 1);
            return;
          }
          if (!isRead) {
            void markGuideReadAndAdvance(activeProfileId, sec.id, nextSection?.id);
            if (nextSection) {
              navigateToGuidePosition(nextSection.id, 0, false);
            }
          } else if (nextSection) {
            navigateToGuidePosition(nextSection.id, 0);
          }
        };

        return (
          <div className="space-y-3">
            {/* Compact Stateful Progress + Lesson Stepper */}
            <div className="autumn-card space-y-2 rounded-2xl p-2.5">
              <div className="flex items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setShowLessonIndex((v) => !v)}
                  className="autumn-pill inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1 font-extrabold transition"
                >
                  <span>
                    Lesson {currentVisibleIdx + 1} / {visibleSections.length}
                  </span>
                  <span className="text-[10px] opacity-75">
                    {showLessonIndex ? '▲' : '▼'}
                  </span>
                </button>

                <span className="callout-emerald rounded-xl px-2.5 py-1 text-[11px] font-black">
                  {readCountTotal}/{STUDY_SECTIONS.length} read
                </span>
              </div>

              <ProgressBar percent={readPct} heightClass="h-1.5" />

              {showLessonIndex && (
                <div className="autumn-inset grid grid-cols-5 gap-1.5 rounded-xl p-2">
                  {visibleSections.map((item) => {
                    const itemRead = readSet.has(item.id);
                    const isCurrent = item.id === sec.id;
                    const itemGlobalNum = STUDY_SECTIONS.findIndex((s) => s.id === item.id) + 1;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => navigateToGuidePosition(item.id, 0)}
                        title={item.title}
                        className={`rounded-lg py-1 text-[11px] font-extrabold transition ${
                          isCurrent
                            ? 'bg-orange-600 text-[#FAF1E6] ring-1 ring-orange-400/60'
                            : itemRead
                              ? 'callout-emerald'
                              : 'autumn-pill'
                        }`}
                      >
                        {itemGlobalNum}
                        {itemRead ? '✓' : ''}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bite-Sized Paginated Lesson Card */}
            <article className="autumn-card space-y-3 rounded-3xl p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="callout-spice rounded-md px-2 py-0.5 text-[10px] font-bold uppercase">
                  Lesson {globalLessonNum} • {sec.chapterId.toUpperCase()} • Card {safePageIdx + 1}/{lessonPages.length}
                </span>
                <button
                  type="button"
                  onClick={() => void toggleStudyGuideSectionRead(activeProfileId, sec.id)}
                  className={`inline-flex items-center gap-1 rounded-xl px-2 py-0.5 text-[11px] font-bold transition ${
                    isRead ? 'callout-emerald' : 'autumn-pill'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{isRead ? 'Read ✓' : 'Mark Read'}</span>
                </button>
              </div>

              {/* Tappable Intra-Lesson Page Bars */}
              <div className="flex items-center gap-1.5" aria-label="Lesson page progress">
                {lessonPages.map((pg, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => navigateToGuidePosition(sec.id, idx)}
                    aria-label={`Card ${idx + 1} of ${lessonPages.length}: ${pg.label}`}
                    className={`h-1.5 flex-1 rounded-full transition ${
                      idx <= safePageIdx ? 'bg-orange-600' : 'bg-orange-500/20'
                    }`}
                  />
                ))}
              </div>

              <div>
                <p className="accent-spice text-[11px] font-extrabold tracking-wide uppercase">
                  {activePage.label}
                </p>
                <h2 className="mt-0.5 text-base leading-snug font-black">{sec.title}</h2>
              </div>

              {activePage.summary && (
                <p className="autumn-inset autumn-soft rounded-2xl p-3 text-[13px] leading-relaxed">
                  <BionicText text={activePage.summary} />
                </p>
              )}

              {activePage.facts.length > 0 && (
                <ul className="autumn-soft space-y-2.5 text-[13px] leading-relaxed">
                  {activePage.facts.map((fact, idx) => (
                    <li key={idx} className="autumn-inset flex gap-2 rounded-2xl p-3">
                      <span className="accent-spice mt-0.5 shrink-0 font-bold">•</span>
                      <span>{renderFormattedFact(fact, bionicReading)}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activePage.memoryHook && (
                <div className="callout-amber rounded-2xl p-3 text-[13px] leading-relaxed">
                  <span className="font-extrabold">Exam Trap &amp; Memory Tip: </span>
                  <BionicText text={activePage.memoryHook} />
                </div>
              )}

              {sec.visualId && (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setShowLessonVisual((v) => !v)}
                    className="autumn-pill inline-flex w-full items-center justify-center gap-1.5 rounded-xl py-1.5 text-xs font-bold transition"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>{showLessonVisual ? 'Hide Visual Diagram' : 'View Visual Diagram'}</span>
                  </button>
                  {showLessonVisual && (
                    <VisualAidRenderer
                      visualId={sec.visualId}
                      compact
                      highlightSubtopicId={sec.subtopicId}
                    />
                  )}
                </div>
              )}

              <div className="space-y-2 pt-1">
                {activePage.isFinal && (
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
                      Practice This Lesson: 4-Way Choice ({topicQuestionCount} Qs) →
                    </span>
                  </Button>
                )}

                <div className="flex items-center justify-between gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={!canGoBack}
                    onClick={handlePrevClick}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Prev</span>
                  </Button>

                  <Button
                    type="button"
                    variant={
                      !activePage.isFinal
                        ? 'primary'
                        : isRead
                          ? 'secondary'
                          : 'emerald'
                    }
                    size="sm"
                    className="flex-1"
                    disabled={activePage.isFinal && !nextSection && isRead}
                    onClick={handleNextClick}
                  >
                    <span>
                      {!activePage.isFinal
                        ? `Next Card (${safePageIdx + 2}/${lessonPages.length})`
                        : nextSection
                          ? isRead
                            ? 'Next Lesson'
                            : 'Mark Read & Next Lesson'
                          : isRead
                            ? 'All Lessons Complete ✓'
                            : 'Mark Final Lesson Read ✓'}
                    </span>
                    {(!activePage.isFinal || nextSection) && <ChevronRight className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </article>
          </div>
        );
      })()}

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

            {dueQuestionCount > 0 && (
              <div className="callout-amber mt-3 rounded-2xl p-3 text-xs leading-relaxed">
                <p className="font-extrabold">
                  {dueQuestionCount} earlier question{dueQuestionCount === 1 ? '' : 's'} ready for
                  spaced review
                </p>
                <p className="mt-0.5 opacity-90">
                  These are 4-choice questions you already practiced (or boosted from exam mistakes)
                  whose review timer is ready for a quick refresh. Each session gives you a short
                  batch, so you do not need to clear all of them at once.
                </p>
              </div>
            )}

            <div className="mt-3 grid grid-cols-3 gap-2">
              {(
                [
                  ['smart', 'Smart Mix', 'Due + New'],
                  [
                    'due-only',
                    'Due Only',
                    dueQuestionCount > 0 ? `${dueQuestionCount} ready` : 'All caught up',
                  ],
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
                  <span>
                    <BionicText text={item} />
                  </span>
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
                <p className="autumn-muted mt-1.5 text-xs leading-relaxed">
                  <BionicText text={res.summary} />
                </p>
                <p className="callout-spice mt-2 rounded-xl px-2.5 py-1.5 text-[11px]">
                  🌶️ <strong>Tip:</strong> <BionicText text={res.spiceTip} />
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
