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
  dueCardsBadge: number;
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
  dueCardsBadge,
  children,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: <Home className="h-5 w-5" /> },
    {
      id: 'study',
      label: 'Study',
      icon: <BookOpen className="h-5 w-5" />,
      badge: dueCardsBadge > 0 ? dueCardsBadge : undefined,
    },
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
        <div className="mx-auto flex max-w-lg items-center justify-between gap-2 px-3.5 py-2.5">
          {/* Brand Crest + Profile Chip */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSelectTab('home')}
              className="shrink-0 rounded-xl transition hover:scale-105"
              title="Spice Up Your UK Home"
            >
              <img
                src="./icons/brand-logo.png"
                alt="Spice Up Your UK"
                className="h-8 w-8 rounded-xl ring-1 ring-orange-500/45"
              />
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('us')}
              className="callout-spice flex items-center gap-1.5 rounded-full px-2.5 py-1 text-left transition hover:opacity-90"
              title="Team scoreboard & sync settings"
            >
              <ProfileAvatar avatar={activeProfile.avatarEmoji} sizeClass="text-base" />
              <span className="max-w-[76px] truncate text-xs font-extrabold">
                {activeProfile.displayName}
              </span>
            </button>
          </div>

          {/* Streaks & XP */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSelectTab('us')}
              className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-extrabold transition ${
                myStudiedToday ? 'callout-emerald' : 'callout-amber'
              }`}
              title={
                myStudiedToday
                  ? `Personal streak: ${streakCount}d (practiced today ✓)`
                  : `Personal streak: ${streakCount}d (not practiced today yet)`
              }
            >
              <Flame className="accent-amber h-3.5 w-3.5 fill-current" />
              <span>{streakCount}</span>
            </button>

            {(isPaired || sharedStreakCount > 0) && (
              <button
                type="button"
                onClick={() => onSelectTab('us')}
                className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-extrabold transition ${
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

            <div className="callout-amber rounded-full px-2 py-1 text-xs font-extrabold">
              {totalXp} XP
            </div>
          </div>

          {/* Sync Status + Theme Toggle */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                if (syncBadge === 'unpaired') {
                  onSelectTab('us');
                } else {
                  onManualSync();
                }
              }}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
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
              {syncBadge === 'offline' && <WifiOff className="h-3 w-3" />}
              {syncBadge === 'unpaired' && <CloudOff className="h-3 w-3" />}
              {syncBadge === 'synced' && <CheckCircle2 className="h-3 w-3" />}
              {(syncBadge === 'syncing' || syncBadge === 'pending' || syncBadge === 'error') && (
                <RefreshCw
                  className={`h-3 w-3 ${syncBadge === 'syncing' ? 'animate-spin' : ''}`}
                />
              )}
              <span>
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
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              className="autumn-back-btn rounded-full p-1.5 transition"
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
                <div className="relative">
                  {item.icon}
                  {item.badge !== undefined && (
                    <span className="absolute -top-1.5 -right-2.5 rounded-full bg-orange-600 px-1.5 text-[10px] leading-4 font-extrabold text-[#FAF1E6]">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
