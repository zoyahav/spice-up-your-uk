import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  CloudOff,
  Flame,
  Gamepad2,
  Home,
  RefreshCw,
  Sun,
  Moon,
  Users,
  WifiOff,
} from 'lucide-react';
import type { SyncBadgeState } from '../../hooks/useAppData';
import type { UserProfile } from '../../types/domain';
import { BionicReadingIcon } from '../ui/BionicText';
import { ProfileAvatar } from '../ui/ProfileAvatar';

export type NavTab = 'home' | 'study' | 'tests' | 'arcade' | 'us';

interface AppShellProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  activeProfile: UserProfile;
  streakCount: number;
  myStudiedToday: boolean;
  sharedStreakCount: number;
  bothStudiedToday: boolean;
  isPaired: boolean;
  totalXp: number;
  outboxCount: number;
  syncBadge: SyncBadgeState;
  onManualSync: () => void;
  isLightMode: boolean;
  onToggleTheme: () => void;
  bionicReading: boolean;
  onToggleBionicReading: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  activeTab,
  onSelectTab,
  activeProfile,
  streakCount,
  myStudiedToday,
  sharedStreakCount,
  bothStudiedToday,
  isPaired,
  totalXp,
  outboxCount,
  syncBadge,
  onManualSync,
  isLightMode,
  onToggleTheme,
  bionicReading,
  onToggleBionicReading,
  children,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { id: 'study', label: 'Study', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'tests', label: 'Exams', icon: <ClipboardCheck className="h-5 w-5" /> },
    { id: 'arcade', label: 'Arcade', icon: <Gamepad2 className="h-5 w-5" /> },
    { id: 'us', label: 'Us', icon: <Users className="h-5 w-5" /> },
  ];

  return (
    <div
      className={`min-h-dvh transition-colors ${
        isLightMode
          ? 'theme-light bg-[#F3E7D7] text-[#332319]'
          : 'bg-[#1E1612] text-[#F2E6D8]'
      }`}
    >
      {/* Sticky Top Status Bar */}
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur-md ${
          isLightMode
            ? 'border-[#DECBB5] bg-[#F8EFE2]/94 text-[#332319]'
            : 'border-[#48362B] bg-[#251B16]/94 text-[#F2E6D8]'
        }`}
        style={{ paddingTop: 'var(--safe-top)' }}
      >
        <div className="mx-auto flex max-w-lg items-center justify-between gap-1 px-2.5 py-2 sm:gap-2 sm:px-3.5 sm:py-2.5">
          {/* Brand Crest + Profile Chip */}
          <div className="flex min-w-0 items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={() => onSelectTab('home')}
              className="shrink-0 rounded-xl transition hover:scale-105"
              title="Spice Up Your UK Home"
            >
              <img
                src="./icons/brand-logo.png"
                alt="Spice Up Your UK"
                className="h-7 w-7 rounded-xl ring-1 ring-orange-500/45 sm:h-8 sm:w-8"
              />
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('us')}
              className="callout-spice flex min-w-0 items-center gap-1 rounded-full px-2 py-1 text-left transition hover:opacity-90 sm:gap-1.5 sm:px-2.5"
              title="Team scoreboard & sync settings"
            >
              <ProfileAvatar avatar={activeProfile.avatarEmoji} sizeClass="text-sm sm:text-base" />
              <span className="max-w-[60px] truncate text-[11px] font-extrabold sm:max-w-[92px] sm:text-xs">
                {activeProfile.displayName}
              </span>
            </button>
          </div>

          {/* Streaks & XP (never wraps to two lines) */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={() => onSelectTab('us')}
              className={`flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-1 text-[11px] leading-none font-extrabold whitespace-nowrap tabular-nums transition sm:gap-1 sm:px-2 sm:text-xs ${
                myStudiedToday ? 'callout-emerald' : 'callout-amber'
              }`}
              title={
                myStudiedToday
                  ? `Personal streak: ${streakCount}d (practiced today ✓)`
                  : `Personal streak: ${streakCount}d (not practiced today yet)`
              }
            >
              <Flame className="accent-amber h-3.5 w-3.5 shrink-0 fill-current" />
              <span>{streakCount}</span>
            </button>

            {(isPaired || sharedStreakCount > 0) && (
              <button
                type="button"
                onClick={() => onSelectTab('us')}
                className={`flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-1 text-[11px] leading-none font-extrabold whitespace-nowrap tabular-nums transition sm:gap-1 sm:px-2 sm:text-xs ${
                  bothStudiedToday ? 'callout-emerald' : 'callout-spice'
                }`}
                title={
                  bothStudiedToday
                    ? `Shared streak: ${sharedStreakCount}d (both practiced today ✓)`
                    : `Shared streak: ${sharedStreakCount}d (tap Us to see today's status)`
                }
              >
                <span>🤝</span>
                <span>{sharedStreakCount}</span>
              </button>
            )}

            <div className="callout-amber shrink-0 rounded-full px-2 py-1 text-[11px] leading-none font-extrabold whitespace-nowrap tabular-nums sm:text-xs">
              {totalXp} XP
            </div>
          </div>

          {/* Sync Status + Bionic Reading + Theme Toggle */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={() => {
                if (syncBadge === 'unpaired') {
                  onSelectTab('us');
                } else {
                  onManualSync();
                }
              }}
              className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] leading-none font-bold whitespace-nowrap transition sm:px-2.5 ${
                syncBadge === 'offline'
                  ? 'callout-amber'
                  : syncBadge === 'synced'
                    ? 'callout-emerald'
                    : syncBadge === 'syncing' || syncBadge === 'pending'
                      ? 'callout-spice'
                      : syncBadge === 'error'
                        ? 'callout-rose'
                        : 'autumn-pill'
              }`}
              title={
                syncBadge === 'offline'
                  ? `Tube Mode (Offline): ${outboxCount} local change(s) saved safely`
                  : syncBadge === 'unpaired'
                    ? 'Local-only mode: tap Us tab to pair Google Sheet'
                    : 'Tap to sync with Shared Google Sheet'
              }
            >
              {syncBadge === 'offline' && <WifiOff className="h-3 w-3 shrink-0" />}
              {syncBadge === 'unpaired' && <CloudOff className="h-3 w-3 shrink-0" />}
              {syncBadge === 'synced' && <CheckCircle2 className="h-3 w-3 shrink-0" />}
              {(syncBadge === 'syncing' || syncBadge === 'pending' || syncBadge === 'error') && (
                <RefreshCw
                  className={`h-3 w-3 shrink-0 ${syncBadge === 'syncing' ? 'animate-spin' : ''}`}
                />
              )}
              <span className="hidden min-[395px]:inline">
                {syncBadge === 'offline'
                  ? outboxCount > 0
                    ? `Tube (${outboxCount})`
                    : 'Tube'
                  : syncBadge === 'pending'
                    ? `Queue (${outboxCount})`
                    : syncBadge === 'syncing'
                      ? 'Sync'
                      : syncBadge === 'synced'
                        ? 'Synced'
                        : syncBadge === 'error'
                          ? 'Retry'
                          : 'Local'}
              </span>
              {outboxCount > 0 && (syncBadge === 'offline' || syncBadge === 'pending') && (
                <span className="min-[395px]:hidden">{outboxCount}</span>
              )}
            </button>

            <button
              type="button"
              onClick={onToggleBionicReading}
              aria-pressed={bionicReading}
              aria-label={bionicReading ? 'Turn off Bionic Reading' : 'Turn on Bionic Reading'}
              title={
                bionicReading
                  ? 'Bionic Reading: ON (tap to turn off)'
                  : 'Bionic Reading: OFF (tap to highlight word starts for faster reading)'
              }
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${
                bionicReading
                  ? 'callout-spice ring-1 ring-orange-500/65'
                  : 'autumn-back-btn'
              }`}
            >
              <BionicReadingIcon className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              className="autumn-back-btn flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition"
              aria-label="Toggle theme"
              title={isLightMode ? 'Switch to Cozy Dark Mode' : 'Switch to Cozy Light Mode'}
            >
              {isLightMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-lg px-3.5 pt-4 pb-28">{children}</main>

      {/* Bottom 5-Tab Navigation Bar (mobile thumb-friendly) */}
      <nav
        className={`fixed inset-x-0 bottom-0 z-30 border-t backdrop-blur-lg ${
          isLightMode
            ? 'border-[#DECBB5] bg-[#F8EFE2]/95 text-[#705846]'
            : 'border-[#48362B] bg-[#251B16]/95 text-[#B39C88]'
        }`}
        style={{ paddingBottom: 'var(--safe-bottom)' }}
      >
        <div className="mx-auto grid max-w-lg grid-cols-5 px-2 py-1.5">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`relative flex flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 transition ${
                  active
                    ? 'accent-spice font-extrabold'
                    : 'autumn-tab-inactive font-semibold'
                }`}
              >
                <div className="relative">{item.icon}</div>
                <span className="text-[11px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
