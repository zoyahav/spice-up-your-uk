import React from 'react';
import { ArrowLeft, BookOpen, ShieldCheck, Trophy } from 'lucide-react';
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
  onStartChapterPractice: (chapterId: ChapterId) => void;
  onOpenChapterGuide: (chapterId: ChapterId) => void;
  onOpenExamsHistory: () => void;
}

export const ChapterProgressView: React.FC<ChapterProgressViewProps> = ({
  activeProfile,
  partnerProfile,
  chapterMasteries,
  overallMasteryPercent,
  recentSessions,
  onBack,
  onStartChapterPractice,
  onOpenChapterGuide,
  onOpenExamsHistory,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className="autumn-back-btn inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>
        <div className="callout-emerald flex items-center gap-1.5 rounded-xl px-3 py-1">
          <ShieldCheck className="accent-emerald h-4 w-4" />
          <span className="text-xs font-black">Readiness: {overallMasteryPercent}%</span>
        </div>
      </div>

      <section className="autumn-card rounded-3xl p-4">
        <h1 className="text-base font-black">Chapter Progress &amp; Mastery</h1>
        <p className="autumn-muted mt-0.5 text-xs">
          Read each chapter’s study guide first, or jump straight into 4-way choice practice.
        </p>

        <div className="mt-3.5 space-y-3">
          {CHAPTERS.map((ch) => {
            const m = chapterMasteries.find((cm) => cm.id === ch.id);
            const pct = m?.masteryPercent ?? 0;
            return (
              <div
                key={ch.id}
                className="autumn-inset space-y-2 rounded-2xl p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold">
                    Ch {ch.number}: {ch.shortTitle}
                  </span>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="callout-amber rounded-md px-1.5 py-0.5 font-bold">
                      {m?.tier ?? 'Uncharted'}
                    </span>
                    <span className="accent-spice font-black">{pct}%</span>
                  </div>
                </div>
                <ProgressBar percent={pct} heightClass="h-2" />
                <div className="autumn-muted flex items-center justify-between text-[11px]">
                  <span>
                    📝 {m?.questionsAttempted ?? 0}/{m?.totalQuestions ?? 0} questions practised
                  </span>
                  <span>{m?.questionAccuracyPercent ?? 0}% accuracy</span>
                </div>
                <div className="flex gap-2 pt-0.5">
                  <button
                    type="button"
                    onClick={() => onOpenChapterGuide(ch.id)}
                    className="autumn-pill inline-flex flex-1 items-center justify-center gap-1 rounded-xl py-1.5 text-xs font-bold transition"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Read Guide</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onStartChapterPractice(ch.id)}
                    className="autumn-btn-primary flex-1 rounded-xl py-1.5 text-xs font-bold transition"
                  >
                    4-Choice Practice →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {recentSessions.length > 0 && (
        <section className="autumn-card rounded-3xl p-4">
          <div className="mb-2.5 flex items-center justify-between">
            <h2 className="flex items-center gap-1.5 text-sm font-extrabold">
              <Trophy className="accent-amber h-4 w-4" />
              <span>Recent Practice Sessions</span>
            </h2>
            <button
              type="button"
              onClick={onOpenExamsHistory}
              className="accent-spice text-xs font-bold hover:underline"
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
                  className="autumn-inset flex items-center justify-between rounded-xl px-3 py-2 text-xs"
                >
                  <div>
                    <p className="font-bold">
                      {who} •{' '}
                      {s.mode === 'mock'
                        ? `Mock Exam #${s.examNumber ?? ''}`
                        : s.mode === 'mistakes'
                          ? 'Mistakes Drill'
                          : s.mode === 'challenge'
                            ? 'Head-to-Head Duel'
                            : 'Topic Quiz'}
                    </p>
                    <p className="autumn-muted text-[11px]">
                      {new Date(s.completedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                  </div>
                  <span
                    className={`rounded-lg px-2.5 py-1 font-black ${
                      s.passed ? 'callout-emerald' : 'callout-rose'
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
