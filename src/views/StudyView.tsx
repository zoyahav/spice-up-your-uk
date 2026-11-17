import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckSquare,
  ExternalLink,
  Eye,
  Layers,
  Lightbulb,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { CHAPTERS } from '../data/syllabus';
import { STUDY_SECTIONS } from '../data/studyGuides';
import { COMMUNITY_RESOURCES, TEST_DAY_CHECKLIST } from '../data/communityLinks';
import { recordFlashcardReview } from '../db/repository';
import { previewIntervalLabel, selectStudyQueue } from '../services/srs';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { VisualAidRenderer } from '../components/visuals/VisualAidRenderer';
import type {
  ChapterId,
  Flashcard,
  ProfileId,
  SrsCardState,
  SrsRating,
  SubjectMasterySummary,
  VisualAidId,
} from '../types/domain';

type StudySubTab = 'flashcards' | 'guides' | 'visuals' | 'vault';

interface StudyViewProps {
  activeProfileId: ProfileId;
  allFlashcards: readonly Flashcard[];
  srsMap: ReadonlyMap<string, SrsCardState>;
  chapterMasteries: readonly SubjectMasterySummary[];
  initialChapterFilter?: ChapterId | null;
  autoLaunchDeck?: boolean;
  onConsumeAutoLaunch?: () => void;
  isLightMode: boolean;
}

export const StudyView: React.FC<StudyViewProps> = ({
  activeProfileId,
  allFlashcards,
  srsMap,
  chapterMasteries,
  initialChapterFilter,
  autoLaunchDeck,
  onConsumeAutoLaunch,
  isLightMode,
}) => {
  const [subTab, setSubTab] = useState<StudySubTab>('flashcards');
  const [selectedChapter, setSelectedChapter] = useState<ChapterId | 'all'>(
    initialChapterFilter ?? 'all',
  );
  const [deckMode, setDeckMode] = useState<'smart' | 'due-only' | 'cram'>('smart');
  const [sessionCards, setSessionCards] = useState<Flashcard[] | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFrontHint, setShowFrontHint] = useState(false);
  const [sessionCompletedCount, setSessionCompletedCount] = useState(0);

  const startDeckSession = (chapterOverride?: ChapterId | 'all', modeOverride?: 'smart' | 'due-only' | 'cram') => {
    const ch = chapterOverride ?? selectedChapter;
    const mode = modeOverride ?? deckMode;
    const queue = selectStudyQueue(allFlashcards, srsMap, activeProfileId, {
      chapterId: ch === 'all' ? undefined : ch,
      mode,
      maxNewCards: 18,
      limit: 30,
    });
    setSessionCards(queue);
    setCardIndex(0);
    setIsFlipped(false);
    setShowFrontHint(false);
    setSessionCompletedCount(0);
  };

  useEffect(() => {
    if (autoLaunchDeck) {
      const ch = initialChapterFilter ?? 'all';
      setSelectedChapter(ch);
      setSubTab('flashcards');
      startDeckSession(ch, 'smart');
      onConsumeAutoLaunch?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLaunchDeck, initialChapterFilter]);

  const currentCard = sessionCards ? sessionCards[cardIndex] : undefined;
  const currentCardSrs = useMemo(() => {
    if (!currentCard) return undefined;
    return srsMap.get(`${activeProfileId}:${currentCard.id}`);
  }, [currentCard, srsMap, activeProfileId]);

  const handleRateCard = async (rating: SrsRating) => {
    if (!currentCard || !sessionCards) return;
    await recordFlashcardReview(activeProfileId, currentCard.id, rating);
    setSessionCompletedCount((c) => c + 1);
    setIsFlipped(false);
    setShowFrontHint(false);

    if (rating === 'again') {
      // Re-append missed card to the end of the active session so you master it before finishing!
      setSessionCards((prev) => (prev ? [...prev, currentCard] : null));
    }

    setCardIndex((idx) => idx + 1);
  };

  const cardSurface = isLightMode
    ? 'border-slate-200 bg-white shadow-sm'
    : 'border-slate-800/90 bg-slate-900/85';

  // Active Flashcard Review Screen
  if (sessionCards !== null) {
    if (sessionCards.length === 0) {
      return (
        <div className={`rounded-3xl border p-6 text-center ${cardSurface}`}>
          <p className="text-3xl">🎉</p>
          <h2 className="mt-2 text-lg font-black">All caught up on due reviews!</h2>
          <p className="mt-1 text-xs text-slate-400">
            Switch mode to <strong>Smart Mix</strong> or <strong>Cram All</strong> to study extra
            cards right now.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Button variant="secondary" onClick={() => setSessionCards(null)}>
              Back
            </Button>
            <Button variant="primary" onClick={() => startDeckSession(selectedChapter, 'cram')}>
              Cram 30 Cards Now
            </Button>
          </div>
        </div>
      );
    }

    if (!currentCard) {
      return (
        <div className={`rounded-3xl border p-6 text-center ${cardSurface}`}>
          <p className="text-4xl">👑</p>
          <h2 className="mt-2 text-xl font-black">Zig-A-Zig-Ah! Deck Session Complete!</h2>
          <p className="mt-1 text-xs text-slate-400">
            You reviewed <strong>{sessionCompletedCount}</strong> flashcards and locked them into
            your SM-2 schedule.
          </p>
          <div className="mt-5 flex justify-center gap-2.5">
            <Button variant="secondary" onClick={() => setSessionCards(null)}>
              Back to Study Hub
            </Button>
            <Button variant="primary" onClick={() => startDeckSession()}>
              Keep Going (+More)
            </Button>
          </div>
        </div>
      );
    }

    const progressPct = Math.round((cardIndex / sessionCards.length) * 100);

    return (
      <div className="space-y-3.5">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setSessionCards(null)}
            className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Exit Deck</span>
          </button>
          <span className="text-xs font-extrabold text-pink-400">
            Card {cardIndex + 1} of {sessionCards.length}
          </span>
        </div>

        <ProgressBar percent={progressPct} heightClass="h-2" />

        {/* 3D Flip Card */}
        <div className="perspective-1000">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsFlipped((f) => !f)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsFlipped((f) => !f);
              }
            }}
            className={`relative min-h-[270px] w-full cursor-pointer rounded-3xl border p-5 transition-all duration-300 ${
              isFlipped
                ? 'border-pink-500/60 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white'
                : `${cardSurface}`
            }`}
          >
            <div className="mb-3 flex items-center justify-between text-[11px] font-bold">
              <span className="rounded-lg bg-pink-500/15 px-2 py-0.5 text-pink-400 uppercase">
                {currentCard.chapterId.toUpperCase()} • {isFlipped ? 'ANSWER' : 'QUESTION'}
              </span>
              <span className="inline-flex items-center gap-1 text-slate-400">
                <RotateCcw className="h-3 w-3" /> Tap card to flip
              </span>
            </div>

            {!isFlipped ? (
              <div className="flex min-h-[185px] flex-col justify-between">
                <p className="my-auto py-4 text-center text-lg leading-snug font-extrabold">
                  {currentCard.front}
                </p>

                <div className="mt-2">
                  {showFrontHint ? (
                    <div className="rounded-2xl border border-amber-500/35 bg-amber-500/10 p-3 text-xs text-amber-200">
                      <span className="font-extrabold">🌶️ Spice Memory Peek: </span>
                      {currentCard.memoryHook}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowFrontHint(true);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20"
                    >
                      <Lightbulb className="h-3.5 w-3.5" />
                      <span>Peek Memory Hook</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3.5">
                <p className="text-base leading-relaxed font-extrabold text-emerald-300">
                  {currentCard.back}
                </p>

                <div className="rounded-2xl border border-pink-500/35 bg-pink-500/10 p-3 text-xs leading-relaxed text-pink-100">
                  <p className="mb-0.5 font-extrabold text-pink-300">
                    <Sparkles className="mr-1 inline h-3.5 w-3.5" />
                    Fun Way to Remember It:
                  </p>
                  <p>{currentCard.memoryHook}</p>
                </div>

                {currentCard.visualId && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <VisualAidRenderer visualId={currentCard.visualId} compact />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* SM-2 Rating Controls */}
        {!isFlipped ? (
          <Button variant="primary" size="lg" fullWidth onClick={() => setIsFlipped(true)}>
            Show Answer &amp; Memory Hook 👀
          </Button>
        ) : (
          <div className="space-y-1.5">
            <p className="text-center text-[11px] font-semibold text-slate-400">
              How well did you know this?
            </p>
            <div className="grid grid-cols-4 gap-2">
              {(
                [
                  { rating: 'again', label: 'Again', variant: 'danger' },
                  { rating: 'hard', label: 'Hard', variant: 'amber' },
                  { rating: 'good', label: 'Good', variant: 'emerald' },
                  { rating: 'easy', label: 'Easy', variant: 'primary' },
                ] as const
              ).map(({ rating, label, variant }) => (
                <Button
                  key={rating}
                  variant={variant}
                  size="sm"
                  onClick={() => void handleRateCard(rating)}
                  className="flex-col py-2.5"
                >
                  <span>{label}</span>
                  <span className="text-[10px] opacity-85">
                    {previewIntervalLabel(
                      currentCardSrs,
                      activeProfileId,
                      currentCard.id,
                      rating,
                    )}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Sub-navigation Pills */}
      <div className="grid grid-cols-4 gap-1.5 rounded-2xl border border-slate-800 bg-slate-900/80 p-1">
        {(
          [
            ['flashcards', 'Cards', <Layers key="c" className="h-3.5 w-3.5" />],
            ['guides', 'Guides', <BookOpen key="g" className="h-3.5 w-3.5" />],
            ['visuals', 'Visuals', <Eye key="v" className="h-3.5 w-3.5" />],
            ['vault', 'Links', <ExternalLink key="l" className="h-3.5 w-3.5" />],
          ] as const
        ).map(([id, label, icon]) => (
          <button
            key={id}
            type="button"
            onClick={() => setSubTab(id)}
            className={`flex items-center justify-center gap-1 rounded-xl py-2 text-xs font-extrabold transition ${
              subTab === id
                ? 'bg-pink-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Chapter Filter Strip (for Flashcards & Guides) */}
      {(subTab === 'flashcards' || subTab === 'guides') && (
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedChapter('all')}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition ${
              selectedChapter === 'all'
                ? 'bg-pink-600 text-white'
                : 'bg-slate-800/80 text-slate-300'
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
                  ? 'bg-pink-600 text-white'
                  : 'bg-slate-800/80 text-slate-300'
              }`}
            >
              Ch {ch.number}: {ch.shortTitle}
            </button>
          ))}
        </div>
      )}

      {/* TAB 1: SM-2 Flashcard Launcher */}
      {subTab === 'flashcards' && (
        <div className="space-y-3.5">
          <div className={`rounded-3xl border p-4 ${cardSurface}`}>
            <h2 className="text-base font-black">Spaced Repetition (SM-2) Flashcards</h2>
            <p className="mt-1 text-xs text-slate-400">
              {allFlashcards.length} cards bundled offline — every card includes a{' '}
              <strong className="text-pink-400">Spice Memory Hook</strong>!
            </p>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {(
                [
                  ['smart', 'Smart Mix', 'Due + New'],
                  ['due-only', 'Due Only', 'Scheduled'],
                  ['cram', 'Cram Mode', 'Any 30'],
                ] as const
              ).map(([m, title, sub]) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setDeckMode(m)}
                  className={`rounded-2xl border p-2.5 text-left transition ${
                    deckMode === m
                      ? 'border-pink-500 bg-pink-500/15'
                      : 'border-slate-800 bg-slate-950/40'
                  }`}
                >
                  <p className="text-xs font-extrabold">{title}</p>
                  <p className="text-[10px] text-slate-400">{sub}</p>
                </button>
              ))}
            </div>

            <div className="mt-4">
              <Button variant="primary" size="lg" fullWidth onClick={() => startDeckSession()}>
                Launch Flashcard Session 🃏
              </Button>
            </div>
          </div>

          <div className="space-y-2.5">
            {CHAPTERS.map((ch) => {
              const chCards = allFlashcards.filter((c) => c.chapterId === ch.id);
              const m = chapterMasteries.find((cm) => cm.id === ch.id);
              return (
                <div
                  key={ch.id}
                  className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 ${cardSurface}`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-extrabold">
                      Ch {ch.number}: {ch.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {m?.cardsSeen ?? 0} / {chCards.length} cards studied • {ch.examWeightHint}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => startDeckSession(ch.id, 'smart')}
                  >
                    Study
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Chapter Study Guides + Memory Hooks */}
      {subTab === 'guides' && (
        <div className="space-y-4">
          {STUDY_SECTIONS.filter(
            (sec) => selectedChapter === 'all' || sec.chapterId === selectedChapter,
          ).map((sec) => (
            <article key={sec.id} className={`space-y-3 rounded-3xl border p-4 ${cardSurface}`}>
              <div>
                <span className="rounded-md bg-pink-500/15 px-2 py-0.5 text-[10px] font-bold text-pink-400 uppercase">
                  {sec.chapterId.toUpperCase()}
                </span>
                <h3 className="mt-1.5 text-base font-black">{sec.title}</h3>
              </div>

              <ul className="space-y-2 text-xs leading-relaxed">
                {sec.keyFacts.map((fact, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="mt-0.5 shrink-0 text-pink-400">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl border border-amber-500/35 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-200">
                {sec.memoryHook}
              </div>

              {sec.visualId && <VisualAidRenderer visualId={sec.visualId} />}
            </article>
          ))}
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

      {/* TAB 4: Reddit & Official Community Links Vault + Test Day Checklist */}
      {subTab === 'vault' && (
        <div className="space-y-4">
          <div className={`rounded-3xl border p-4 ${cardSurface}`}>
            <h3 className="flex items-center gap-1.5 text-sm font-black">
              <CheckSquare className="h-4 w-4 text-emerald-400" />
              <span>Official Test-Day &amp; eVisa Checklist</span>
            </h3>
            <ul className="mt-2.5 space-y-2 text-xs leading-relaxed">
              {TEST_DAY_CHECKLIST.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-bold text-emerald-400">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5">
            {COMMUNITY_RESOURCES.map((res) => (
              <div key={res.id} className={`rounded-2xl border p-3.5 ${cardSurface}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="rounded-md bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300">
                      {res.badge}
                    </span>
                    <h4 className="mt-1 text-sm font-extrabold">{res.title}</h4>
                  </div>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-xl bg-slate-800 p-2 text-pink-400 hover:bg-slate-700"
                    title="Open online link"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{res.summary}</p>
                <p className="mt-2 rounded-xl bg-pink-500/10 px-2.5 py-1.5 text-[11px] text-pink-300">
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
