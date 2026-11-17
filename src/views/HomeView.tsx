import React, { useMemo } from 'react';
import {
  AlertCircle,
  BookOpen,
  CalendarClock,
  ClipboardCheck,
  Flame,
  Gamepad2,
  ShieldCheck,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { getRankForXp, SPICE_PEP_TALKS } from '../constants/spiceTheme';
import { CHAPTERS } from '../data/syllabus';
import type { NavTab } from '../components/layout/AppShell';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import type { StreakSummary } from '../services/streaks';
import type {
  ChapterId,
  SubjectMasterySummary,
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
  chapterMasteries: readonly SubjectMasterySummary[];
  overallMasteryPercent: number;
  recentSessions: readonly TestSessionRecord[];
  isLightMode: boolean;
  onNavigate: (tab: NavTab) => void;
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
  chapterMasteries,
  overallMasteryPercent,
  recentSessions,
  isLightMode,
  onNavigate,
  onQuickStartFlashcards,
  onQuickStartMockExam,
  onQuickStartMistakes,
}) => {
  const rank = useMemo(() => getRankForXp(myTotalXp), [myTotalXp]);

  const pepTalk = useMemo(() => {
    const daySeed = new Date().getDate();
    return SPICE_PEP_TALKS[daySeed % SPICE_PEP_TALKS.length]!;
  }, []);

  const daysUntilExam = useMemo(() => {
    if (!examDate) return null;
    const target = new Date(`${examDate}T09:00:00`);
    const diff = Math.ceil((target.getTime() - Date.now()) / (24 * 60 * 60 * 1000));
    return diff >= 0 ? diff : null;
  }, [examDate]);

  // Suggest next unpassed mock exam (1..17)
  const nextSuggestedExam = useMemo(() => {
    const passedExams = new Set(
      recentSessions
        .filter((s) => s.profileId === activeProfile.id && s.mode === 'mock' && s.passed && s.examNumber)
        .map((s) => s.examNumber!),
    );
    for (let i = 1; i <= 17; i++) {
      if (!passedExams.has(i)) return i;
    }
    return 1;
  }, [recentSessions, activeProfile.id]);

  const passedExamsCount = useMemo(() => {
    return new Set(
      recentSessions
        .filter((s) => s.profileId === activeProfile.id && s.mode === 'mock' && s.passed && s.examNumber)
        .map((s) => s.examNumber!),
    ).size;
  }, [recentSessions, activeProfile.id]);

  const cardSurface = isLightMode
    ? 'border-slate-200 bg-white shadow-sm'
    : 'border-slate-800/90 bg-slate-900/85';

  const dailyPercent = Math.min(100, Math.round((myStreak.todayXp / Math.max(1, dailyGoalXp)) * 100));

  return (
    <div className="space-y-4">
      {/* Hero Rank & Spice Pep Talk Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-pink-500/30 bg-gradient-to-br from-slate-900 via-indigo-950 to-rose-950 p-4 text-white shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-bold text-pink-200">
              <Sparkles className="h-3 w-3 text-amber-300" />
              <span>{rank.current.title}</span>
            </div>
            <h1 className="mt-1.5 text-xl font-black tracking-tight">
              Hey {activeProfile.displayName}! {rank.current.emoji}
            </h1>
            <p className="mt-1 text-xs leading-relaxed text-pink-100/90">{pepTalk}</p>
          </div>
          {daysUntilExam !== null && (
            <div className="shrink-0 rounded-2xl border border-white/15 bg-black/30 px-3 py-2 text-center">
              <CalendarClock className="mx-auto h-4 w-4 text-amber-300" />
              <p className="mt-0.5 text-lg leading-none font-black text-white">{daysUntilExam}</p>
              <p className="text-[10px] font-semibold text-slate-300">days left</p>
            </div>
          )}
        </div>

        {/* Daily XP Bar */}
        <div className="mt-4 rounded-2xl bg-black/30 p-3">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-bold text-pink-200">
              Daily Goal: {myStreak.todayXp} / {dailyGoalXp} XP
            </span>
            <span className="font-extrabold text-amber-300">
              {myStreak.metGoalToday ? 'Goal Smashed! 🌟' : `${dailyPercent}%`}
            </span>
          </div>
          <ProgressBar percent={dailyPercent} />
        </div>
      </section>

      {/* Streaks + 2 Become 1 Couple Card */}
      <section className="grid grid-cols-2 gap-3">
        <div className={`rounded-2xl border p-3.5 ${cardSurface}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Your Streak</span>
            <Flame className="h-4 w-4 text-amber-400" />
          </div>
          <p className="mt-1 text-2xl font-black text-amber-400">
            {myStreak.currentStreak} <span className="text-xs font-bold">days</span>
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            🧊 {myStreak.freezesAvailable} Streak Freeze{myStreak.freezesAvailable === 1 ? '' : 's'} ready
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('us')}
          className={`rounded-2xl border p-3.5 text-left transition hover:border-pink-500/50 ${cardSurface}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-pink-400">2 Become 1</span>
            <span className="text-sm">💞</span>
          </div>
          <p className="mt-1 text-2xl font-black text-pink-400">
            {coupleStreak.currentCoupleStreak} <span className="text-xs font-bold">shared</span>
          </p>
          <p className="mt-1 truncate text-[11px] text-slate-400">
            {partnerProfile.displayName}: {partnerTotalXp} XP
          </p>
        </button>
      </section>

      {/* Quick Launch Action Buttons */}
      <section className="space-y-2.5">
        <div className="grid grid-cols-2 gap-2.5">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => onQuickStartFlashcards()}
            className="flex-col py-3.5 text-center"
          >
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              <span>Flashcards</span>
            </div>
            <span className="text-[11px] font-semibold opacity-90">
              {dueFlashcardCount > 0
                ? `${dueFlashcardCount} due right now`
                : 'Start smart deck'}
            </span>
          </Button>

          <Button
            variant="emerald"
            size="lg"
            fullWidth
            onClick={() => onQuickStartMockExam(nextSuggestedExam)}
            className="flex-col py-3.5 text-center"
          >
            <div className="flex items-center gap-1.5">
              <ClipboardCheck className="h-4 w-4" />
              <span>Mock Exam #{nextSuggestedExam}</span>
            </div>
            <span className="text-[11px] font-semibold opacity-90">
              {passedExamsCount}/17 exams passed
            </span>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <Button
            variant="amber"
            size="md"
            fullWidth
            onClick={() => onNavigate('arcade')}
          >
            <Gamepad2 className="h-4 w-4" />
            <span>Tube Arcade</span>
          </Button>

          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={onQuickStartMistakes}
            disabled={missedQuestionCount === 0}
          >
            <AlertCircle className="h-4 w-4 text-rose-400" />
            <span>
              {missedQuestionCount > 0
                ? `Fix ${missedQuestionCount} Mistake${missedQuestionCount === 1 ? '' : 's'}`
                : '0 Mistakes!'}
            </span>
          </Button>
        </div>
      </section>

      {/* Overall Exam Readiness & 5-Chapter Mastery */}
      <section className={`rounded-3xl border p-4 ${cardSurface}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-extrabold">Subject Mastery &amp; Readiness</h2>
            <p className="text-xs text-slate-400">
              Combined SM-2 flashcard retention + exam accuracy
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-xl bg-emerald-500/15 px-3 py-1.5 text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-sm font-black">{overallMasteryPercent}%</span>
          </div>
        </div>

        <div className="mt-3.5 space-y-3">
          {CHAPTERS.map((ch) => {
            const m = chapterMasteries.find((cm) => cm.id === ch.id);
            const pct = m?.masteryPercent ?? 0;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => onQuickStartFlashcards(ch.id)}
                className="block w-full rounded-2xl border border-slate-800/60 bg-slate-950/35 p-3 text-left transition hover:border-pink-500/40"
              >
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold">
                    Ch {ch.number}: {ch.shortTitle}
                  </span>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="rounded-md bg-slate-800 px-1.5 py-0.5 font-bold text-amber-300">
                      {m?.tier ?? 'Uncharted'}
                    </span>
                    <span className="font-black text-pink-400">{pct}%</span>
                  </div>
                </div>
                <ProgressBar percent={pct} heightClass="h-2" />
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
                  <span>
                    🃏 {m?.cardsSeen ?? 0}/{m?.totalCards ?? 0} cards seen
                  </span>
                  <span>
                    📝 {m?.questionAccuracyPercent ?? 0}% quiz acc ({m?.questionsAttempted ?? 0} Qs)
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Recent Test Activity */}
      {recentSessions.length > 0 && (
        <section className={`rounded-3xl border p-4 ${cardSurface}`}>
          <div className="mb-2.5 flex items-center justify-between">
            <h2 className="flex items-center gap-1.5 text-sm font-extrabold">
              <Trophy className="h-4 w-4 text-amber-400" />
              <span>Recent Practice Sessions</span>
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('tests')}
              className="text-xs font-bold text-pink-400 hover:underline"
            >
              See all →
            </button>
          </div>
          <div className="space-y-2">
            {recentSessions.slice(0, 3).map((s) => {
              const isMe = s.profileId === activeProfile.id;
              const who = isMe ? activeProfile.displayName : partnerProfile.displayName;
              return (
                <div
                  key={s.sessionId}
                  className="flex items-center justify-between rounded-xl border border-slate-800/60 bg-slate-950/35 px-3 py-2 text-xs"
                >
                  <div>
                    <p className="font-bold">
                      {who} •{' '}
                      {s.mode === 'mock'
                        ? `Mock Exam #${s.examNumber ?? ''}`
                        : s.mode === 'mistakes'
                          ? 'Mistakes Drill'
                          : s.mode === 'challenge'
                            ? 'Couple Challenge'
                            : 'Topic Quiz'}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {new Date(s.completedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                  </div>
                  <span
                    className={`rounded-lg px-2.5 py-1 font-black ${
                      s.passed
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {s.score}/{s.total} {s.passed ? 'PASS' : 'RETRY'}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
