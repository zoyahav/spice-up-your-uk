import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  CloudOff,
  Flame,
  Gamepad2,
  HeartHandshake,
  Home,
  RefreshCw,
  Sun,
  Moon,
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
  coupleStreakCount: number;
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
  coupleStreakCount,
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
    { id: 'us', label: 'Us', icon: <HeartHandshake className="h-5 w-5" /> },
  ];

  return (
    <div
      className={`min-h-dvh transition-colors ${
        isLightMode ? 'bg-[#FAF8F5] text-slate-900' : 'bg-[#0B1120] text-slate-100'
      }`}
    >
      {/* Sticky Top Status Bar */}
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur-md ${
          isLightMode
            ? 'border-slate-200/90 bg-white/90 text-slate-900'
            : 'border-slate-800/80 bg-slate-950/85 text-slate-100'
        }`}
        style={{ paddingTop: 'var(--safe-top)' }}
      >
        <div className="mx-auto flex max-w-lg items-center justify-between gap-2 px-3.5 py-2.5">
          {/* Profile Chip */}
          <button
            type="button"
            onClick={() => onSelectTab('us')}
            className="flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-2.5 py-1 text-left transition hover:bg-pink-500/20"
            title="Switch profile or sync settings"
          >
            <ProfileAvatar avatar={activeProfile.avatarEmoji} sizeClass="text-base" />
            <span className="max-w-[92px] truncate text-xs font-extrabold">
              {activeProfile.displayName}
            </span>
          </button>

          {/* Streaks & XP */}
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-extrabold text-amber-400"
              title="Your Daily Streak"
            >
              <Flame className="h-3.5 w-3.5 fill-amber-400" />
              <span>{streakCount}</span>
            </div>

            {coupleStreakCount > 0 && (
              <div
                className="flex items-center gap-1 rounded-full bg-pink-500/15 px-2 py-1 text-xs font-extrabold text-pink-400"
                title="2 Become 1 Couple Streak"
              >
                <span>💞</span>
                <span>{coupleStreakCount}</span>
              </div>
            )}

            <div className="rounded-full bg-indigo-500/15 px-2.5 py-1 text-xs font-extrabold text-indigo-400">
              {totalXp} XP
            </div>
          </div>

          {/* Sync Status + Theme Toggle */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onManualSync}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
                syncBadge === 'offline'
                  ? 'bg-amber-500/20 text-amber-300'
                  : syncBadge === 'synced'
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : syncBadge === 'syncing' || syncBadge === 'pending'
                      ? 'bg-sky-500/20 text-sky-300'
                      : syncBadge === 'error'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-slate-800 text-slate-400'
              }`}
              title={
                syncBadge === 'offline'
                  ? `Tube Mode (Offline) — ${outboxCount} local change(s) saved safely`
                  : syncBadge === 'unpaired'
                    ? 'Local-only mode — tap Us tab to pair Google Sheet'
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
              className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-800/50 hover:text-pink-400"
              aria-label="Toggle theme"
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
            ? 'border-slate-200 bg-white/95 text-slate-600'
            : 'border-slate-800/90 bg-slate-950/95 text-slate-400'
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
                    ? 'text-pink-500 font-extrabold'
                    : 'hover:text-slate-200 font-semibold'
                }`}
              >
                <div className="relative">
                  {item.icon}
                  {item.badge !== undefined && (
                    <span className="absolute -top-1.5 -right-2.5 rounded-full bg-pink-600 px-1.5 text-[10px] leading-4 font-extrabold text-white">
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
