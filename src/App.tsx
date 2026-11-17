import React, { useState } from 'react';
import { AppShell, type NavTab } from './components/layout/AppShell';
import { OnboardingModal } from './components/layout/OnboardingModal';
import { useAppData } from './hooks/useAppData';
import { updateAppSettings } from './db/repository';
import { HomeView } from './views/HomeView';
import { StudyView } from './views/StudyView';
import { TestsView } from './views/TestsView';
import { ArcadeView } from './views/ArcadeView';
import { PartnerView } from './views/PartnerView';
import type { ChapterId } from './types/domain';

export const App: React.FC = () => {
  const data = useAppData();
  const [activeTab, setActiveTab] = useState<NavTab>('home');

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
      <div className="flex min-h-dvh items-center justify-center bg-[#0B1120] text-slate-300">
        <p className="animate-pulse text-sm font-bold">🌶️ Loading Spice Up Your UK...</p>
      </div>
    );
  }

  const isLightMode = data.settings.theme === 'light';

  const handleToggleTheme = () => {
    void updateAppSettings({
      theme: isLightMode ? 'dark' : 'light',
    });
  };

  return (
    <>
      {!data.settings.onboarded && (
        <OnboardingModal onComplete={(targetTab) => setActiveTab(targetTab)} />
      )}

      <AppShell
        activeTab={activeTab}
        onSelectTab={setActiveTab}
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

        {activeTab === 'home' && (
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
            chapterMasteries={data.myMastery.chapters}
            overallMasteryPercent={data.myMastery.overallPercent}
            recentSessions={data.testSessions}
            isLightMode={isLightMode}
            onNavigate={setActiveTab}
            onQuickStartFlashcards={(chapterId) => {
              setFlashcardChapterFilter(chapterId ?? null);
              setAutoLaunchDeck(true);
              setActiveTab('study');
            }}
            onQuickStartMockExam={(examNumber) => {
              setAutoStartExamNumber(examNumber ?? 1);
              setActiveTab('tests');
            }}
            onQuickStartMistakes={() => {
              setAutoStartMistakes(true);
              setActiveTab('tests');
            }}
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
            autoStartExamNumber={autoStartExamNumber}
            autoStartMistakes={autoStartMistakes}
            activeChallenge={activeChallenge}
            onConsumeAutoStart={() => {
              setAutoStartExamNumber(null);
              setAutoStartMistakes(false);
              setActiveChallenge(null);
            }}
            onJumpToImporter={() => setActiveTab('us')}
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
              setActiveTab('tests');
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
