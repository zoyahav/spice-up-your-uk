import React, { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { AppShell, type NavTab } from './components/layout/AppShell';
import { InstallAppModal } from './components/layout/InstallAppModal';
import { isMobileDevice, isRunningStandalone } from './hooks/usePwaInstall';
import { OnboardingModal } from './components/layout/OnboardingModal';
import { useAppData } from './hooks/useAppData';
import { updateAppSettings } from './db/repository';
import { HomeView } from './views/HomeView';
import { ChapterProgressView } from './views/ChapterProgressView';
import { StudyView, type StudySubTab } from './views/StudyView';
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
  const [studyChapterFilter, setStudyChapterFilter] = useState<ChapterId | null>(null);
  const [studyInitialSubTab, setStudyInitialSubTab] = useState<StudySubTab | null>(null);
  const [autoLaunchDeck, setAutoLaunchDeck] = useState(false);
  const [autoStartExamNumber, setAutoStartExamNumber] = useState<number | null>(null);
  const [autoStartMistakes, setAutoStartMistakes] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState<{
    challengeId: string;
    title: string;
    questionIds: readonly string[];
  } | null>(null);

  const isLightMode = data.settings.theme === 'light';
  const isPaired = Boolean(data.settings.scriptUrl && data.settings.passcode);
  const myReadGuideIds = data.settings.readGuideIds?.[data.activeProfileId] ?? [];
  const myLastGuideSectionId = data.settings.lastGuideSectionId?.[data.activeProfileId] ?? null;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('theme-light', isLightMode);
    document.body.style.backgroundColor = isLightMode ? '#F3E7D7' : '#1E1612';
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', isLightMode ? '#F3E7D7' : '#251B16');
    }
  }, [isLightMode]);

  if (!data.isLoaded) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#1E1612] text-[#D2BDA8]">
        <p className="animate-pulse text-sm font-bold">Loading Spice Up Your UK...</p>
      </div>
    );
  }

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
        myStudiedToday={data.myStreak.studiedToday}
        sharedStreakCount={data.coupleStreak.currentCoupleStreak}
        bothStudiedToday={data.coupleStreak.bothStudiedToday}
        isPaired={isPaired}
        totalXp={data.myTotalXp}
        outboxCount={data.outboxCount}
        syncBadge={data.syncBadge}
        onManualSync={() => void data.triggerSync()}
        isLightMode={isLightMode}
        onToggleTheme={handleToggleTheme}
        dueCardsBadge={data.dueFlashcardCount}
      >
        {data.pairingNotice && (
          <div className="callout-emerald mb-3 flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-xs font-bold">
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
          <div className="callout-rose mb-3 rounded-2xl p-3 text-xs shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="accent-rose mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="accent-rose font-extrabold">Google Sheet Sync Failed</p>
                  <p className="mt-0.5 leading-relaxed opacity-95">{data.syncError}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => void data.triggerSync()}
                      className="autumn-btn-cranberry rounded-lg px-2.5 py-1 text-[11px] font-bold"
                    >
                      Retry Sync
                    </button>
                    {activeTab !== 'us' && (
                      <button
                        type="button"
                        onClick={() => handleSelectTab('us')}
                        className="autumn-pill rounded-lg px-2.5 py-1 text-[11px] font-bold"
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
                className="accent-rose rounded-lg p-1 opacity-80 hover:opacity-100"
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
            partnerStreak={data.partnerStreak}
            coupleStreak={data.coupleStreak}
            isPaired={isPaired}
            dailyGoalXp={data.settings.dailyGoalXp}
            myTotalXp={data.myTotalXp}
            examDate={data.settings.examDate}
            readGuideCount={myReadGuideIds.length}
            lastGuideSectionId={myLastGuideSectionId}
            dueQuestionCount={data.dueFlashcardCount}
            missedQuestionCount={data.missedQuestionIds.length}
            overallMasteryPercent={data.myMastery.overallPercent}
            recentSessions={data.testSessions}
            isLightMode={isLightMode}
            onNavigate={handleSelectTab}
            onOpenStudyGuide={() => {
              setStudyChapterFilter(null);
              setStudyInitialSubTab('guides');
              setAutoLaunchDeck(false);
              handleSelectTab('study');
            }}
            onOpenChapterProgress={() => setShowChapterProgressPage(true)}
            onQuickStartSmartQuiz={(chapterId) => {
              setStudyChapterFilter(chapterId ?? null);
              setStudyInitialSubTab('quiz');
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
            onStartChapterPractice={(chapterId) => {
              setStudyChapterFilter(chapterId);
              setStudyInitialSubTab('quiz');
              setAutoLaunchDeck(true);
              handleSelectTab('study');
            }}
            onOpenChapterGuide={(chapterId) => {
              setStudyChapterFilter(chapterId);
              setStudyInitialSubTab('guides');
              setAutoLaunchDeck(false);
              handleSelectTab('study');
            }}
            onOpenExamsHistory={() => handleSelectTab('tests')}
          />
        )}

        {activeTab === 'study' && (
          <StudyView
            activeProfileId={data.activeProfileId}
            allQuestions={data.allQuestions}
            readGuideIds={myReadGuideIds}
            lastGuideSectionId={myLastGuideSectionId}
            srsMap={data.srsMap}
            chapterMasteries={data.myMastery.chapters}
            initialChapterFilter={studyChapterFilter}
            initialSubTab={studyInitialSubTab}
            autoLaunchDeck={autoLaunchDeck}
            onConsumeAutoLaunch={() => {
              setAutoLaunchDeck(false);
              setStudyInitialSubTab(null);
            }}
          />
        )}

        {activeTab === 'tests' && (
          <TestsView
            activeProfileId={data.activeProfileId}
            allQuestions={data.allQuestions}
            missedQuestionIds={data.missedQuestionIds}
            testSessions={data.testSessions}
            hydratingStandardPack={data.hydratingStandardPack}
            onRetryStandardPack={data.retryStandardPack}
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
            myStreak={data.myStreak}
            partnerStreak={data.partnerStreak}
            sharedStreak={data.coupleStreak}
            dailyActivity={data.dailyActivity}
            myTotalXp={data.myTotalXp}
            partnerTotalXp={data.partnerTotalXp}
            unlockedBadgeIds={data.myUnlockedBadges}
            outboxCount={data.outboxCount}
            syncError={data.syncError}
            onManualSync={data.triggerSync}
            onDeviceReset={() => {
              data.clearSyncError();
              data.clearPairingNotice();
              setStudyChapterFilter(null);
              setStudyInitialSubTab(null);
              setAutoLaunchDeck(false);
              setAutoStartExamNumber(null);
              setAutoStartMistakes(false);
              setActiveChallenge(null);
              setInstallModalDismissedSession(false);
              setShowChapterProgressPage(false);
              setActiveTab('home');
            }}
            isLightMode={isLightMode}
          />
        )}
      </AppShell>
    </>
  );
};
export default App;
