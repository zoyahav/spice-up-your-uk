import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  BarChart3,
  BookOpen,
  CalendarClock,
  ChevronRight,
  ClipboardCheck,
  Download,
  Gamepad2,
  HeartHandshake,
  Sparkles,
  X,
} from 'lucide-react';
import { getRankForXp } from '../constants/spiceTheme';
import type { NavTab } from '../components/layout/AppShell';
import { Button } from '../components/ui/Button';
import { usePwaInstall } from '../hooks/usePwaInstall';
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
  const { canInstall, isStandalone, isMobile, swReady, promptInstall } = usePwaInstall();
  const [bannerDismissed, setBannerDismissed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('spiceupuk_banner_dismissed') === '1';
    } catch {
      return false;
    }
  });

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

  const dailyPercent = Math.min(
    100,
    Math.round((myStreak.todayXp / Math.max(1, dailyGoalXp)) * 100),
  );

  return (
    <div className="space-y-4">
      {/* 1. Cozy Chestnut-to-Cinnamon-to-Terracotta Greeting + Daily Goal Bar */}
      <section
        className={`rounded-3xl border p-4 shadow-md ${
          isLightMode
            ? 'border-[#B67F5E]/55 bg-gradient-to-br from-[#6B3E2B] via-[#895036] to-[#A66443] text-[#FAF2E8]'
            : 'border-[#6D4732]/65 bg-gradient-to-br from-[#3A241B] via-[#5F3724] to-[#874C31] text-[#F5EBE0]'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1 rounded-full bg-[#24150E]/25 px-2.5 py-0.5 text-[11px] font-bold text-[#F5DEC7]">
              <Sparkles className="h-3 w-3 text-[#F1CF8A]" />
              <span>{rank.current.title}</span>
            </div>
            <h1 className="mt-1 truncate text-lg font-black tracking-tight">
              Hey {activeProfile.displayName}! {rank.current.emoji}
            </h1>
          </div>

          {daysUntilExam !== null && (
            <div className="shrink-0 rounded-2xl border border-[#F5DEC7]/20 bg-[#24150E]/28 px-2.5 py-1.5 text-center">
              <CalendarClock className="mx-auto h-3.5 w-3.5 text-[#F1CF8A]" />
              <p className="mt-0.5 text-sm leading-none font-black">{daysUntilExam}d</p>
            </div>
          )}
        </div>

        <div className="mt-3 rounded-2xl bg-[#22130D]/28 p-2.5">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-bold text-[#F5DEC7]">
              Daily Goal: {myStreak.todayXp} / {dailyGoalXp} XP
            </span>
            <span className="font-extrabold text-[#F3D493]">
              {myStreak.metGoalToday ? 'Goal Met! 🌟' : `${dailyPercent}%`}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#22130D]/45">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#E5B28E] via-[#E5C27E] to-[#A1C09B] transition-all duration-500 ease-out"
              style={{ width: `${dailyPercent}%` }}
            />
          </div>
        </div>
      </section>

      {isMobile && !isStandalone && !bannerDismissed && (
        <section className="callout-emerald rounded-2xl p-3 text-xs">
          <div className="flex items-start justify-between gap-2.5">
            <div className="min-w-0 flex-1">
              <p className="accent-emerald font-extrabold">Install SpiceUpUK App</p>
              {canInstall ? (
                <p className="mt-0.5 text-[11px] opacity-90">
                  {swReady ? 'Offline cache ready. ' : ''}Tap Install (not Create shortcut) and
                  wait ~10s.
                </p>
              ) : (
                <p className="mt-0.5 text-[11px] leading-relaxed opacity-90">
                  Tap Chrome <code>⋮</code> -&gt; <strong>Add to home screen</strong> -&gt;{' '}
                  <strong>Install</strong> (not Create shortcut), or Safari Share -&gt; Add to Home
                  Screen.
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              {canInstall && (
                <Button
                  variant="emerald"
                  size="sm"
                  onClick={() => void promptInstall()}
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Install</span>
                </Button>
              )}
              <button
                type="button"
                onClick={() => {
                  try {
                    sessionStorage.setItem('spiceupuk_banner_dismissed', '1');
                  } catch {
                    // Ignore storage errors
                  }
                  setBannerDismissed(true);
                }}
                className="accent-emerald rounded-lg p-1 opacity-80 hover:opacity-100"
                aria-label="Dismiss install banner for this session"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      )}

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
          className="autumn-card flex w-full items-center justify-between gap-3 rounded-2xl p-3.5 text-left transition hover:border-orange-500/50"
        >
          <div className="flex items-center gap-3">
            <div className="callout-emerald flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <BarChart3 className="accent-emerald h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-extrabold">Chapter Progress</p>
              <p className="autumn-muted text-xs">
                {overallMasteryPercent}% overall readiness across 5 chapters
              </p>
            </div>
          </div>
          <ChevronRight className="autumn-muted h-4 w-4 shrink-0" />
        </button>

        {missedQuestionCount > 0 && (
          <button
            type="button"
            onClick={onQuickStartMistakes}
            className="autumn-card flex w-full items-center justify-between gap-3 rounded-2xl p-3.5 text-left transition hover:border-orange-500/50"
          >
            <div className="flex items-center gap-3">
              <div className="callout-rose flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                <AlertCircle className="accent-rose h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold">Mistakes Rescue</p>
                <p className="autumn-muted text-xs">
                  Re-drill {missedQuestionCount} missed question{missedQuestionCount === 1 ? '' : 's'}
                </p>
              </div>
            </div>
            <ChevronRight className="autumn-muted h-4 w-4 shrink-0" />
          </button>
        )}

        <button
          type="button"
          onClick={() => onNavigate('arcade')}
          className="autumn-card flex w-full items-center justify-between gap-3 rounded-2xl p-3.5 text-left transition hover:border-orange-500/50"
        >
          <div className="flex items-center gap-3">
            <div className="callout-amber flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <Gamepad2 className="accent-amber h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-extrabold">Tube Arcade</p>
              <p className="autumn-muted text-xs">
                60s Blitz, Timeline Sort, Fact Match &amp; Duels
              </p>
            </div>
          </div>
          <ChevronRight className="autumn-muted h-4 w-4 shrink-0" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate('us')}
          className="autumn-card flex w-full items-center justify-between gap-3 rounded-2xl p-3.5 text-left transition hover:border-orange-500/50"
        >
          <div className="flex items-center gap-3">
            <div className="callout-spice flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <HeartHandshake className="accent-spice h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-extrabold">Streaks, Team &amp; Sync</p>
              <p className="autumn-muted text-xs">
                🔥 {myStreak.currentStreak}d streak • 💞 {coupleStreak.currentCoupleStreak}d shared •{' '}
                {partnerProfile.displayName}: {partnerTotalXp} XP
              </p>
            </div>
          </div>
          <ChevronRight className="autumn-muted h-4 w-4 shrink-0" />
        </button>
      </section>
    </div>
  );
};
