import React from 'react';
import { ArrowLeft, ShieldCheck, Trophy } from 'lucide-react';
import { CHAPTERS } from '../data/syllabus';
import { ProgressBar } from '../components/ui/ProgressBar';
import type {
  ChapterId,
  SubjectMasterySummary,
  TestSessionRecord,
  UserProfile,
} from '../types/domain';

interface ChapterProgressViewProps {
  activeProfile: UserProfile;
  partnerProfile: UserProfile;
  chapterMasteries: readonly SubjectMasterySummary[];
  overallMasteryPercent: number;
  recentSessions: readonly TestSessionRecord[];
  isLightMode: boolean;
  onBack: () => void;
  onStartChapterFlashcards: (chapterId: ChapterId) => void;
  onOpenExamsHistory: () => void;
}

export const ChapterProgressView: React.FC<ChapterProgressViewProps> = ({
  activeProfile,
  partnerProfile,
  chapterMasteries,
  overallMasteryPercent,
  recentSessions,
  isLightMode,
  onBack,
  onStartChapterFlashcards,
  onOpenExamsHistory,
}) => {
  const cardSurface = isLightMode
    ? 'border-[#E6D6C3] bg-[#FFFDF9] shadow-sm'
    : 'border-slate-800/90 bg-slate-900/85';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>
        <div className="flex items-center gap-1.5 rounded-xl bg-emerald-500/15 px-3 py-1 text-emerald-400">
          <ShieldCheck className="h-4 w-4" />
          <span className="text-xs font-black">Readiness: {overallMasteryPercent}%</span>
        </div>
      </div>

      <section className={`rounded-3xl border p-4 ${cardSurface}`}>
        <h1 className="text-base font-black">Chapter Progress &amp; Mastery</h1>
        <p className="mt-0.5 text-xs text-slate-400">
          Tap any chapter below to launch a focused SM-2 flashcard session.
        </p>

        <div className="mt-3.5 space-y-3">
          {CHAPTERS.map((ch) => {
            const m = chapterMasteries.find((cm) => cm.id === ch.id);
            const pct = m?.masteryPercent ?? 0;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => onStartChapterFlashcards(ch.id)}
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

      {recentSessions.length > 0 && (
        <section className={`rounded-3xl border p-4 ${cardSurface}`}>
          <div className="mb-2.5 flex items-center justify-between">
            <h2 className="flex items-center gap-1.5 text-sm font-extrabold">
              <Trophy className="h-4 w-4 text-amber-400" />
              <span>Recent Practice Sessions</span>
            </h2>
            <button
              type="button"
              onClick={onOpenExamsHistory}
              className="text-xs font-bold text-pink-400 hover:underline"
            >
              All history -&gt;
            </button>
          </div>
          <div className="space-y-2">
            {recentSessions.slice(0, 5).map((s) => {
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
