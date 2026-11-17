import React, { useMemo } from 'react';
import {
  AlertCircle,
  BarChart3,
  BookOpen,
  CalendarClock,
  ChevronRight,
  ClipboardCheck,
  Gamepad2,
  HeartHandshake,
  Sparkles,
} from 'lucide-react';
import { getRankForXp } from '../constants/spiceTheme';
import type { NavTab } from '../components/layout/AppShell';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import type { StreakSummary } from '../services/streaks';
import type {
  ChapterId,
  TestSessionRecord,
  UserProfile,
} from '../types/domain';

interface HomeViewProps {
  activeProfile: UserProfile;
  partnerProfile: UserProfile;
  myStreak: StreakSummary;
  coupleStreak: {
    currentCoupleStreak: number;
    longestCoupleStreak: number;
    bothStudiedToday: boolean;
    partnerAStudiedToday: boolean;
    partnerBStudiedToday: boolean;
  };
  dailyGoalXp: number;
  myTotalXp: number;
  partnerTotalXp: number;
  examDate: string | null;
  dueFlashcardCount: number;
  missedQuestionCount: number;
  overallMasteryPercent: number;
  recentSessions: readonly TestSessionRecord[];
  isLightMode: boolean;
  onNavigate: (tab: NavTab) => void;
  onOpenChapterProgress: () => void;
  onQuickStartFlashcards: (chapterId?: ChapterId) => void;
  onQuickStartMockExam: (examNumber?: number) => void;
  onQuickStartMistakes: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  activeProfile,
  partnerProfile,
  myStreak,
  coupleStreak,
  dailyGoalXp,
  myTotalXp,
  partnerTotalXp,
  examDate,
  dueFlashcardCount,
  missedQuestionCount,
  overallMasteryPercent,
  recentSessions,
  isLightMode,
  onNavigate,
  onOpenChapterProgress,
  onQuickStartFlashcards,
  onQuickStartMockExam,
  onQuickStartMistakes,
}) => {
  const rank = useMemo(() => getRankForXp(myTotalXp), [myTotalXp]);

  const daysUntilExam = useMemo(() => {
    if (!examDate) return null;
    const target = new Date(`${examDate}T09:00:00`);
    const diff = Math.ceil((target.getTime() - Date.now()) / (24 * 60 * 60 * 1000));
    return diff >= 0 ? diff : null;
  }, [examDate]);

  const { nextSuggestedExam, passedExamsCount } = useMemo(() => {
    const passedSet = new Set(
      recentSessions
        .filter(
          (s) =>
            s.profileId === activeProfile.id &&
            s.mode === 'mock' &&
            s.passed &&
            s.examNumber &&
            s.examNumber <= 18,
        )
        .map((s) => s.examNumber!),
    );
    let next = 1;
    for (let i = 1; i <= 18; i++) {
      if (!passedSet.has(i)) {
        next = i;
        break;
      }
    }
    return { nextSuggestedExam: next, passedExamsCount: passedSet.size };
  }, [recentSessions, activeProfile.id]);

  const cardSurface = isLightMode
    ? 'border-slate-200 bg-white hover:border-pink-400/50 shadow-sm'
    : 'border-slate-800/90 bg-slate-900/85 hover:border-pink-500/40';

  const dailyPercent = Math.min(
    100,
    Math.round((myStreak.todayXp / Math.max(1, dailyGoalXp)) * 100),
  );

  return (
    <div className="space-y-4">
      {/* 1. Compact Greeting + Daily Goal Bar */}
      <section className="rounded-3xl border border-pink-500/30 bg-gradient-to-br from-slate-900 via-indigo-950 to-rose-950 p-4 text-white shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-bold text-pink-200">
              <Sparkles className="h-3 w-3 text-amber-300" />
              <span>{rank.current.title}</span>
            </div>
            <h1 className="mt-1 truncate text-lg font-black tracking-tight">
              Hey {activeProfile.displayName}! {rank.current.emoji}
            </h1>
          </div>

          {daysUntilExam !== null && (
            <div className="shrink-0 rounded-2xl border border-white/15 bg-black/30 px-2.5 py-1.5 text-center">
              <CalendarClock className="mx-auto h-3.5 w-3.5 text-amber-300" />
              <p className="mt-0.5 text-sm leading-none font-black">{daysUntilExam}d</p>
            </div>
          )}
        </div>

        <div className="mt-3 rounded-2xl bg-black/30 p-2.5">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-bold text-pink-200">
              Daily Goal: {myStreak.todayXp} / {dailyGoalXp} XP
            </span>
            <span className="font-extrabold text-amber-300">
              {myStreak.metGoalToday ? 'Goal Met! 🌟' : `${dailyPercent}%`}
            </span>
          </div>
          <ProgressBar percent={dailyPercent} heightClass="h-2" />
        </div>
      </section>

      {/* 2. Primary Action Buttons */}
      <section className="grid grid-cols-2 gap-2.5">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => onQuickStartFlashcards()}
          className="flex-col py-4 text-center"
        >
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>Flashcards</span>
          </div>
          <span className="text-[11px] font-semibold opacity-90">
            {dueFlashcardCount > 0
              ? `${dueFlashcardCount} due right now`
              : 'Smart SM-2 deck'}
          </span>
        </Button>

        <Button
          variant="emerald"
          size="lg"
          fullWidth
          onClick={() => onQuickStartMockExam(nextSuggestedExam)}
          className="flex-col py-4 text-center"
        >
          <div className="flex items-center gap-1.5">
            <ClipboardCheck className="h-4 w-4" />
            <span>Mock Exam #{nextSuggestedExam}</span>
          </div>
          <span className="text-[11px] font-semibold opacity-90">
            {passedExamsCount}/18 passed
          </span>
        </Button>
      </section>

      {/* 3. Clean Page Links to Dedicated Sub-Pages & Tabs */}
      <section className="space-y-2.5">
        <button
          type="button"
          onClick={onOpenChapterProgress}
          className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-3.5 text-left transition ${cardSurface}`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-extrabold">Chapter Progress</p>
              <p className="text-xs text-slate-400">
                {overallMasteryPercent}% overall readiness across 5 chapters
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
        </button>

        {missedQuestionCount > 0 && (
          <button
            type="button"
            onClick={onQuickStartMistakes}
            className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-3.5 text-left transition ${cardSurface}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold">Mistakes Rescue</p>
                <p className="text-xs text-slate-400">
                  Re-drill {missedQuestionCount} missed question{missedQuestionCount === 1 ? '' : 's'}
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
          </button>
        )}

        <button
          type="button"
          onClick={() => onNavigate('arcade')}
          className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-3.5 text-left transition ${cardSurface}`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
              <Gamepad2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-extrabold">Tube Arcade</p>
              <p className="text-xs text-slate-400">
                60s Blitz, Timeline Sort, Fact Match &amp; Duels
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate('us')}
          className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-3.5 text-left transition ${cardSurface}`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-500/15 text-pink-400">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-extrabold">Streaks, Team &amp; Sync</p>
              <p className="text-xs text-slate-400">
                🔥 {myStreak.currentStreak}d streak • 💞 {coupleStreak.currentCoupleStreak}d shared •{' '}
                {partnerProfile.displayName}: {partnerTotalXp} XP
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
        </button>
      </section>
    </div>
  );
};
