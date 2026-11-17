import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { AppShell, type NavTab } from './components/layout/AppShell';
import { InstallAppModal } from './components/layout/InstallAppModal';
import { isMobileDevice, isRunningStandalone } from './hooks/usePwaInstall';
import { OnboardingModal } from './components/layout/OnboardingModal';
import { useAppData } from './hooks/useAppData';
import { updateAppSettings } from './db/repository';
import { HomeView } from './views/HomeView';
import { ChapterProgressView } from './views/ChapterProgressView';
import { StudyView } from './views/StudyView';
import { TestsView } from './views/TestsView';
import { ArcadeView } from './views/ArcadeView';
import { PartnerView } from './views/PartnerView';
import type { ChapterId } from './types/domain';

export const App: React.FC = () => {
  const data = useAppData();
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [showChapterProgressPage, setShowChapterProgressPage] = useState(false);
  const [installModalDismissedSession, setInstallModalDismissedSession] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('spiceupuk_install_dismissed') === '1';
    } catch {
      return false;
    }
  });

  // Cross-tab quick-launch triggers
  const [flashcardChapterFilter, setFlashcardChapterFilter] = useState<ChapterId | null>(null);
  const [autoLaunchDeck, setAutoLaunchDeck] = useState(false);
  const [autoStartExamNumber, setAutoStartExamNumber] = useState<number | null>(null);
  const [autoStartMistakes, setAutoStartMistakes] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState<{
    challengeId: string;
    title: string;
    questionIds: readonly string[];
  } | null>(null);

  if (!data.isLoaded) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#140E0B] text-slate-300">
        <p className="animate-pulse text-sm font-bold">Loading Spice Up Your UK...</p>
      </div>
    );
  }

  const isLightMode = data.settings.theme === 'light';

  const handleToggleTheme = () => {
    void updateAppSettings({
      theme: isLightMode ? 'dark' : 'light',
    });
  };

  const handleSelectTab = (tab: NavTab) => {
    setShowChapterProgressPage(false);
    setActiveTab(tab);
  };

  const shouldShowInstallPopup =
    data.settings.onboarded &&
    isMobileDevice() &&
    !installModalDismissedSession &&
    !isRunningStandalone();

  return (
    <>
      {!data.settings.onboarded && (
        <OnboardingModal onComplete={(targetTab) => handleSelectTab(targetTab)} />
      )}

      {shouldShowInstallPopup && (
        <InstallAppModal
          onDismiss={() => {
            try {
              sessionStorage.setItem('spiceupuk_install_dismissed', '1');
            } catch {
              // Ignore storage errors
            }
            setInstallModalDismissedSession(true);
          }}
        />
      )}

      <AppShell
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        activeProfile={data.activeProfile}
        streakCount={data.myStreak.currentStreak}
        coupleStreakCount={data.coupleStreak.currentCoupleStreak}
        totalXp={data.myTotalXp}
        outboxCount={data.outboxCount}
        syncBadge={data.syncBadge}
        onManualSync={() => void data.triggerSync()}
        isLightMode={isLightMode}
        onToggleTheme={handleToggleTheme}
        dueCardsBadge={data.dueFlashcardCount}
      >
        {data.pairingNotice && (
          <div className="mb-3 flex items-center justify-between rounded-2xl border border-emerald-500/40 bg-emerald-500/15 px-3.5 py-2.5 text-xs font-bold text-emerald-200">
            <span>✓ {data.pairingNotice}</span>
            <button
              type="button"
              onClick={data.clearPairingNotice}
              className="ml-2 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {data.syncError && (
          <div className="mb-3 rounded-2xl border border-rose-500/45 bg-rose-950/75 p-3 text-xs text-rose-100 shadow">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                <div>
                  <p className="font-extrabold text-rose-200">Google Sheet Sync Failed</p>
                  <p className="mt-0.5 leading-relaxed text-rose-100/90">{data.syncError}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => void data.triggerSync()}
                      className="rounded-lg bg-rose-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-rose-500"
                    >
                      Retry Sync
                    </button>
                    {activeTab !== 'us' && (
                      <button
                        type="button"
                        onClick={() => handleSelectTab('us')}
                        className="rounded-lg bg-slate-800 px-2.5 py-1 text-[11px] font-bold text-slate-200 hover:bg-slate-700"
                      >
                        Open Sync Settings (Us)
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={data.clearSyncError}
                className="rounded-lg p-1 text-rose-300 hover:bg-rose-900/60"
                aria-label="Dismiss sync error"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'home' && !showChapterProgressPage && (
          <HomeView
            activeProfile={data.activeProfile}
            partnerProfile={data.partnerProfile}
            myStreak={data.myStreak}
            coupleStreak={data.coupleStreak}
            dailyGoalXp={data.settings.dailyGoalXp}
            myTotalXp={data.myTotalXp}
            partnerTotalXp={data.partnerTotalXp}
            examDate={data.settings.examDate}
            dueFlashcardCount={data.dueFlashcardCount}
            missedQuestionCount={data.missedQuestionIds.length}
            overallMasteryPercent={data.myMastery.overallPercent}
            recentSessions={data.testSessions}
            isLightMode={isLightMode}
            onNavigate={handleSelectTab}
            onOpenChapterProgress={() => setShowChapterProgressPage(true)}
            onQuickStartFlashcards={(chapterId) => {
              setFlashcardChapterFilter(chapterId ?? null);
              setAutoLaunchDeck(true);
              handleSelectTab('study');
            }}
            onQuickStartMockExam={(examNumber) => {
              setAutoStartExamNumber(examNumber ?? 1);
              handleSelectTab('tests');
            }}
            onQuickStartMistakes={() => {
              setAutoStartMistakes(true);
              handleSelectTab('tests');
            }}
          />
        )}

        {activeTab === 'home' && showChapterProgressPage && (
          <ChapterProgressView
            activeProfile={data.activeProfile}
            partnerProfile={data.partnerProfile}
            chapterMasteries={data.myMastery.chapters}
            overallMasteryPercent={data.myMastery.overallPercent}
            recentSessions={data.testSessions}
            isLightMode={isLightMode}
            onBack={() => setShowChapterProgressPage(false)}
            onStartChapterFlashcards={(chapterId) => {
              setFlashcardChapterFilter(chapterId);
              setAutoLaunchDeck(true);
              handleSelectTab('study');
            }}
            onOpenExamsHistory={() => handleSelectTab('tests')}
          />
        )}

        {activeTab === 'study' && (
          <StudyView
            activeProfileId={data.activeProfileId}
            allFlashcards={data.allFlashcards}
            srsMap={data.srsMap}
            chapterMasteries={data.myMastery.chapters}
            initialChapterFilter={flashcardChapterFilter}
            autoLaunchDeck={autoLaunchDeck}
            onConsumeAutoLaunch={() => setAutoLaunchDeck(false)}
            isLightMode={isLightMode}
          />
        )}

        {activeTab === 'tests' && (
          <TestsView
            activeProfileId={data.activeProfileId}
            allQuestions={data.allQuestions}
            allFlashcards={data.allFlashcards}
            missedQuestionIds={data.missedQuestionIds}
            testSessions={data.testSessions}
            hydratingStandardPack={data.hydratingStandardPack}
            autoStartExamNumber={autoStartExamNumber}
            autoStartMistakes={autoStartMistakes}
            activeChallenge={activeChallenge}
            onConsumeAutoStart={() => {
              setAutoStartExamNumber(null);
              setAutoStartMistakes(false);
              setActiveChallenge(null);
            }}
            onJumpToImporter={() => handleSelectTab('us')}
            isLightMode={isLightMode}
          />
        )}

        {activeTab === 'arcade' && (
          <ArcadeView
            activeProfile={data.activeProfile}
            partnerProfile={data.partnerProfile}
            allQuestions={data.allQuestions}
            gameScores={data.gameScores}
            challenges={data.challenges}
            onPlayChallenge={(ch) => {
              setActiveChallenge(ch);
              handleSelectTab('tests');
            }}
            isLightMode={isLightMode}
          />
        )}

        {activeTab === 'us' && (
          <PartnerView
            settings={data.settings}
            activeProfile={data.activeProfile}
            partnerProfile={data.partnerProfile}
            myMastery={data.myMastery}
            partnerMastery={data.partnerMastery}
            myTotalXp={data.myTotalXp}
            partnerTotalXp={data.partnerTotalXp}
            coupleStreakCount={data.coupleStreak.currentCoupleStreak}
            unlockedBadgeIds={data.myUnlockedBadges}
            outboxCount={data.outboxCount}
            syncError={data.syncError}
            onManualSync={data.triggerSync}
            isLightMode={isLightMode}
          />
        )}
      </AppShell>
    </>
  );
};
export default App;
