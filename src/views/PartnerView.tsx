import React, { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import {
  AlertTriangle,
  Bell,
  CalendarPlus,
  CheckCircle2,
  Circle,
  ClipboardPaste,
  Cloud,
  Copy,
  Download,
  Laptop,
  QrCode,
  RefreshCw,
  RotateCcw,
  Smartphone,
  Upload,
  Users,
} from 'lucide-react';
import { usePwaInstall } from '../hooks/usePwaInstall';
import { SPICE_BADGES } from '../constants/spiceTheme';
import { CHAPTERS } from '../data/syllabus';
import {
  applyPairingPayload,
  exportFullLocalBackupJson,
  resetLocalDeviceData,
  saveImportedCustomRecords,
  updateAppSettings,
  updateUserProfile,
} from '../db/repository';
import {
  fetchAndParseRemotePack,
  parseImportedContent,
} from '../services/contentImporter';
import {
  buildGoogleCalendarReminderUrl,
  downloadReminderIcsFile,
  requestAndTestBrowserNotification,
} from '../services/reminders';
import {
  formatLocalDateYYYYMMDD,
  shiftDateDays,
  type StreakSummary,
} from '../services/streaks';
import { buildPairingUrl, extractPairingPayloadFromHash } from '../services/sync';
import { Button } from '../components/ui/Button';
import { BionicReadingIcon, BionicText } from '../components/ui/BionicText';
import { AVATAR_EMOJIS, ProfileAvatar } from '../components/ui/ProfileAvatar';
import { ProgressBar } from '../components/ui/ProgressBar';
import type {
  AppSettings,
  DailyActivityRecord,
  ProfileId,
  SubjectMasterySummary,
  UserProfile,
} from '../types/domain';

interface PartnerViewProps {
  settings: AppSettings;
  activeProfile: UserProfile;
  partnerProfile: UserProfile;
  myMastery: { chapters: SubjectMasterySummary[]; overallPercent: number };
  partnerMastery: { chapters: SubjectMasterySummary[]; overallPercent: number };
  myStreak: StreakSummary;
  partnerStreak: StreakSummary;
  sharedStreak: {
    currentCoupleStreak: number;
    longestCoupleStreak: number;
    bothStudiedToday: boolean;
  };
  dailyActivity: readonly DailyActivityRecord[];
  myTotalXp: number;
  partnerTotalXp: number;
  unlockedBadgeIds: ReadonlySet<string>;
  outboxCount: number;
  syncError: string | null;
  onManualSync: () => Promise<void>;
  onDeviceReset?: () => void;
  isLightMode: boolean;
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

function formatLastSynced(iso: string | null): string {
  if (!iso) return 'Not synced yet';
  const diffSec = Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 1000));
  if (diffSec < 45) return 'Just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export const PartnerView: React.FC<PartnerViewProps> = ({
  settings,
  activeProfile,
  partnerProfile,
  myMastery,
  partnerMastery,
  myStreak,
  partnerStreak,
  sharedStreak,
  dailyActivity,
  myTotalXp,
  partnerTotalXp,
  unlockedBadgeIds,
  outboxCount,
  syncError,
  onManualSync,
  onDeviceReset,
}) => {
  const [scriptUrlInput, setScriptUrlInput] = useState(settings.scriptUrl);
  const [passcodeInput, setPasscodeInput] = useState(settings.passcode);
  const [partnerANameInput, setPartnerANameInput] = useState(
    settings.profiles.partner_a.displayName,
  );
  const [partnerBNameInput, setPartnerBNameInput] = useState(
    settings.profiles.partner_b.displayName,
  );
  const [qrTargetProfile, setQrTargetProfile] = useState<ProfileId>('partner_a');
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(false);
  const [pastePairLinkInput, setPastePairLinkInput] = useState('');
  const [showSetupSteps, setShowSetupSteps] = useState(false);
  const [statusToast, setStatusToast] = useState<string | null>(null);

  // Importer state
  const [remoteJsonUrl, setRemoteJsonUrl] = useState('');
  const [rawImportText, setRawImportText] = useState('');
  const [importBusy, setImportBusy] = useState(false);

  // Deliberate non-accidental Reset / Wipe Device state
  const [showResetDrawer, setShowResetDrawer] = useState(false);
  const [resetConfirmText, setResetConfirmText] = useState('');
  const [resetBusy, setResetBusy] = useState(false);

  const { canInstall, isStandalone, isMobile, swReady, promptInstall } = usePwaInstall();
  const isPaired = Boolean(settings.scriptUrl && settings.passcode);

  const last7Days = useMemo(() => {
    const todayStr = formatLocalDateYYYYMMDD();
    const xpMap = new Map<string, number>();
    for (const r of dailyActivity) {
      if (r.xp > 0) {
        xpMap.set(`${r.profileId}:${r.date}`, r.xp);
      }
    }
    return Array.from({ length: 7 }, (_, i) => {
      const dateStr = shiftDateDays(todayStr, -(6 - i));
      const parts = dateStr.split('-').map(Number);
      const dt = new Date(parts[0] ?? 2026, (parts[1] ?? 1) - 1, parts[2] ?? 1);
      const shortDay = dateStr === todayStr ? 'Today' : DAY_LABELS[dt.getDay()]!;
      const myXp = xpMap.get(`${activeProfile.id}:${dateStr}`) ?? 0;
      const theirXp = xpMap.get(`${partnerProfile.id}:${dateStr}`) ?? 0;
      return {
        dateStr,
        shortDay,
        isToday: dateStr === todayStr,
        myDone: myXp > 0,
        theirDone: theirXp > 0,
        bothDone: myXp > 0 && theirXp > 0,
      };
    });
  }, [dailyActivity, activeProfile.id, partnerProfile.id]);

  useEffect(() => {
    setScriptUrlInput(settings.scriptUrl);
    setPasscodeInput(settings.passcode);
  }, [settings.scriptUrl, settings.passcode]);

  useEffect(() => {
    setPartnerANameInput(settings.profiles.partner_a.displayName);
    setPartnerBNameInput(settings.profiles.partner_b.displayName);
  }, [
    settings.profiles.partner_a.displayName,
    settings.profiles.partner_b.displayName,
  ]);

  const showToast = (msg: string) => {
    setStatusToast(msg);
    window.setTimeout(() => setStatusToast(null), 4500);
  };

  const persistSyncInputsLocally = async () => {
    if (partnerANameInput.trim()) {
      await updateUserProfile('partner_a', { displayName: partnerANameInput.trim() });
    }
    if (partnerBNameInput.trim()) {
      await updateUserProfile('partner_b', { displayName: partnerBNameInput.trim() });
    }
    await updateAppSettings({
      scriptUrl: scriptUrlInput.trim(),
      passcode: passcodeInput.trim(),
    });
  };

  const buildCurrentPairingUrl = (
    forProfile: ProfileId,
    overrideCreds?: { scriptUrl: string; passcode: string },
  ): string => {
    return buildPairingUrl(window.location.href, {
      v: 1,
      scriptUrl: (overrideCreds?.scriptUrl ?? scriptUrlInput).trim(),
      passcode: (overrideCreds?.passcode ?? passcodeInput).trim(),
      partnerAName: partnerANameInput.trim() || settings.profiles.partner_a.displayName,
      partnerBName: partnerBNameInput.trim() || settings.profiles.partner_b.displayName,
      partnerAAvatar: settings.profiles.partner_a.avatarEmoji,
      partnerBAvatar: settings.profiles.partner_b.avatarEmoji,
      examDate: settings.examDate,
      suggestedProfile: forProfile,
    });
  };

  const renderQrForTarget = async (
    target: ProfileId,
    overrideCreds?: { scriptUrl: string; passcode: string },
  ) => {
    const effectiveUrl = (overrideCreds?.scriptUrl ?? scriptUrlInput).trim();
    const effectivePass = (overrideCreds?.passcode ?? passcodeInput).trim();
    setQrTargetProfile(target);
    setShowQr(true);

    if (!effectiveUrl || !effectivePass) {
      setQrDataUrl(null);
      return;
    }

    if (!overrideCreds) {
      await persistSyncInputsLocally();
    }
    const pairUrl = buildCurrentPairingUrl(target, {
      scriptUrl: effectiveUrl,
      passcode: effectivePass,
    });
    try {
      const url = await QRCode.toDataURL(pairUrl, {
        margin: 2,
        width: 240,
        color: { dark: '#332319', light: '#FBF4EA' },
      });
      setQrDataUrl(url);
    } catch (err) {
      setQrDataUrl(null);
      showToast(`Could not render QR code: ${(err as Error).message}`);
    }
  };

  const handleToggleQrPanel = async () => {
    if (showQr) {
      setShowQr(false);
      return;
    }
    await renderQrForTarget(settings.activeProfileId ?? 'partner_a');
  };

  const handleImportSetupLink = async (rawLink: string) => {
    const payload = extractPairingPayloadFromHash(rawLink);
    if (!payload) {
      showToast('Invalid setup link. Copy the full Setup Link from your browser or laptop first.');
      return;
    }
    await applyPairingPayload(payload);
    setScriptUrlInput(payload.scriptUrl);
    setPasscodeInput(payload.passcode);
    if (payload.partnerAName) setPartnerANameInput(payload.partnerAName);
    if (payload.partnerBName) setPartnerBNameInput(payload.partnerBName);
    setPastePairLinkInput('');
    const target = payload.suggestedProfile ?? 'partner_b';
    await renderQrForTarget(target, {
      scriptUrl: payload.scriptUrl,
      passcode: payload.passcode,
    });
    showToast('Paired this installed app! Syncing with your Google Sheet...');
    await onManualSync();
  };

  const handlePasteFromClipboardAndPair = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      if (!clip.trim()) {
        showToast('Clipboard is empty. Copy the Setup Link from your browser or laptop first.');
        return;
      }
      await handleImportSetupLink(clip);
    } catch {
      showToast('Paste the Setup Link into the box below and tap Pair App.');
    }
  };

  const handleSaveSyncConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    await persistSyncInputsLocally();
    showToast('Saved private Google Sheet sync settings locally!');
    if (scriptUrlInput.trim() && passcodeInput.trim()) {
      if (showQr) {
        await renderQrForTarget(qrTargetProfile);
      }
      await onManualSync();
    }
  };

  const handleCopyPairingLink = async () => {
    const pairUrl = buildCurrentPairingUrl(qrTargetProfile);
    try {
      await navigator.clipboard.writeText(pairUrl);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = pairUrl;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    const label =
      qrTargetProfile === 'partner_a'
        ? partnerANameInput || 'Player 1'
        : partnerBNameInput || 'Player 2';
    showToast(`Copied private setup link for ${label}!`);
  };

  const handleFetchRemotePack = async () => {
    if (!remoteJsonUrl.trim()) return;
    setImportBusy(true);
    try {
      const res = await fetchAndParseRemotePack(remoteJsonUrl.trim());
      await saveImportedCustomRecords(res.records);
      showToast(
        `Imported ${res.questionsAdded} questions & ${res.flashcardsAdded} flashcards! Syncing to Google Sheet...`,
      );
      setRemoteJsonUrl('');
      await onManualSync();
    } catch (err) {
      showToast(`Import error: ${(err as Error).message}`);
    } finally {
      setImportBusy(false);
    }
  };

  const handlePasteImport = async () => {
    if (!rawImportText.trim()) return;
    setImportBusy(true);
    try {
      const res = parseImportedContent(rawImportText);
      await saveImportedCustomRecords(res.records);
      showToast(
        `Imported ${res.questionsAdded} questions & ${res.flashcardsAdded} flashcards!`,
      );
      setRawImportText('');
      await onManualSync();
    } finally {
      setImportBusy(false);
    }
  };

  const handleExportBackup = async () => {
    const json = await exportFullLocalBackupJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spice-up-your-uk-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleConfirmedDeviceReset = async () => {
    if (resetConfirmText.trim().toUpperCase() !== 'RESET' || resetBusy) return;
    setResetBusy(true);
    try {
      await resetLocalDeviceData();
      setResetConfirmText('');
      setShowResetDrawer(false);
      setShowQr(false);
      setQrDataUrl(null);
      onDeviceReset?.();
    } finally {
      setResetBusy(false);
    }
  };

  const toggleReminderDay = async (dayNum: number) => {
    const current = new Set(settings.reminders.daysOfWeek);
    if (current.has(dayNum)) current.delete(dayNum);
    else current.add(dayNum);
    await updateAppSettings({
      reminders: {
        ...settings.reminders,
        daysOfWeek: Array.from(current).sort((a, b) => a - b),
      },
    });
  };

  const canConfirmReset = resetConfirmText.trim().toUpperCase() === 'RESET' && !resetBusy;

  return (
    <div className="space-y-4">
      {statusToast && (
        <div
          role="status"
          className="callout-spice fixed inset-x-3.5 top-16 z-40 mx-auto max-w-md rounded-2xl px-4 py-3 text-xs font-bold shadow-xl backdrop-blur-md"
        >
          🌶️ {statusToast}
        </div>
      )}

      {/* 1. STUDY TEAM SCOREBOARD + LIVE DAILY PRACTICE & SHARED STREAK TRACKER */}
      <section className="autumn-card space-y-3.5 rounded-3xl p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-base font-black">🤝 Study Team Scoreboard</h2>
            <p className="autumn-muted text-[11px]">
              {isPaired
                ? `Last synced: ${formatLastSynced(settings.lastSyncAt)}`
                : 'Local mode: pair Google Sheet below to track both phones'}
            </p>
          </div>
          {isPaired ? (
            <button
              type="button"
              onClick={() => void onManualSync()}
              className="autumn-pill inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-[11px] font-bold"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Refresh</span>
            </button>
          ) : (
            <span className="callout-amber rounded-full px-2.5 py-0.5 text-[10px] font-bold">
              Unpaired
            </span>
          )}
        </div>

        {/* Today's Practice Cards for Both Players */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="callout-spice rounded-2xl p-3">
            <div className="flex items-center justify-between gap-1">
              <ProfileAvatar avatar={activeProfile.avatarEmoji} sizeClass="text-xl" />
              <span className="text-[11px] font-extrabold">🔥 {myStreak.currentStreak}d</span>
            </div>
            <p className="mt-1 truncate text-xs font-black">{activeProfile.displayName} (You)</p>
            <p className="accent-spice text-base font-black">
              {myMastery.overallPercent}% <span className="autumn-muted text-[11px] font-semibold">• {myTotalXp} XP</span>
            </p>
            <div className="mt-1.5 flex items-center gap-1 text-[11px] font-bold">
              {myStreak.studiedToday ? (
                <>
                  <CheckCircle2 className="accent-emerald h-3.5 w-3.5 shrink-0" />
                  <span className="accent-emerald">Today: +{myStreak.todayXp} XP</span>
                </>
              ) : (
                <>
                  <Circle className="autumn-muted h-3.5 w-3.5 shrink-0" />
                  <span className="autumn-muted">Not practiced today</span>
                </>
              )}
            </div>
          </div>

          <div className="callout-amber rounded-2xl p-3">
            <div className="flex items-center justify-between gap-1">
              <ProfileAvatar avatar={partnerProfile.avatarEmoji} sizeClass="text-xl" />
              {isPaired && (
                <span className="text-[11px] font-extrabold">
                  🔥 {partnerStreak.currentStreak}d
                </span>
              )}
            </div>
            <p className="mt-1 truncate text-xs font-black">{partnerProfile.displayName}</p>
            <p className="accent-amber text-base font-black">
              {partnerMastery.overallPercent}%{' '}
              <span className="autumn-muted text-[11px] font-semibold">• {partnerTotalXp} XP</span>
            </p>
            <div className="mt-1.5 flex items-center gap-1 text-[11px] font-bold">
              {!isPaired ? (
                <span className="autumn-muted">Pair below to track</span>
              ) : partnerStreak.studiedToday ? (
                <>
                  <CheckCircle2 className="accent-emerald h-3.5 w-3.5 shrink-0" />
                  <span className="accent-emerald">Today: +{partnerStreak.todayXp} XP</span>
                </>
              ) : (
                <>
                  <Circle className="autumn-muted h-3.5 w-3.5 shrink-0" />
                  <span className="autumn-muted">Not practiced today</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Last 7 Days Practice & Shared Streak Matrix */}
        <div className="autumn-inset space-y-2.5 rounded-2xl p-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <span className="font-extrabold">
              🤝 Shared Streak: {sharedStreak.currentCoupleStreak} day
              {sharedStreak.currentCoupleStreak === 1 ? '' : 's'}
            </span>
            <span className="autumn-muted text-[11px]">
              Best: {sharedStreak.longestCoupleStreak}d • Both players must practice
            </span>
          </div>

          <div className="grid grid-cols-[minmax(68px,auto)_repeat(7,1fr)] items-center gap-1 text-center text-[10px]">
            <span />
            {last7Days.map((d) => (
              <span
                key={d.dateStr}
                className={`font-bold ${d.isToday ? 'accent-spice' : 'autumn-muted'}`}
              >
                {d.shortDay}
              </span>
            ))}

            <span className="truncate pr-1 text-left text-[11px] font-bold">
              {activeProfile.displayName}
            </span>
            {last7Days.map((d) => (
              <span
                key={`me-${d.dateStr}`}
                className={`mx-auto flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black ${
                  d.myDone ? 'callout-emerald' : 'autumn-pill opacity-45'
                }`}
                title={`${activeProfile.displayName} on ${d.dateStr}: ${d.myDone ? 'Practiced' : 'No activity'}`}
              >
                {d.myDone ? '✓' : '·'}
              </span>
            ))}

            <span className="truncate pr-1 text-left text-[11px] font-bold">
              {partnerProfile.displayName}
            </span>
            {last7Days.map((d) => (
              <span
                key={`them-${d.dateStr}`}
                className={`mx-auto flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black ${
                  d.theirDone ? 'callout-emerald' : 'autumn-pill opacity-45'
                }`}
                title={`${partnerProfile.displayName} on ${d.dateStr}: ${d.theirDone ? 'Practiced' : 'No activity'}`}
              >
                {d.theirDone ? '✓' : '·'}
              </span>
            ))}
          </div>
        </div>

        {/* Chapter-by-Chapter Head-to-Head Bars */}
        <div className="space-y-2.5 pt-1">
          {CHAPTERS.map((ch) => {
            const mine = myMastery.chapters.find((c) => c.id === ch.id)?.masteryPercent ?? 0;
            const theirs =
              partnerMastery.chapters.find((c) => c.id === ch.id)?.masteryPercent ?? 0;
            return (
              <div key={ch.id} className="space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span>
                    Ch {ch.number}: {ch.shortTitle}
                  </span>
                  <span>
                    <span className="accent-spice">{mine}%</span> vs{' '}
                    <span className="accent-amber">{theirs}%</span>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <ProgressBar
                    percent={mine}
                    colorClass="bg-[#C0673E]"
                    heightClass="h-1.5"
                  />
                  <ProgressBar
                    percent={theirs}
                    colorClass="bg-[#BA8738]"
                    heightClass="h-1.5"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. SPICE ACHIEVEMENT BADGES */}
      <section className="autumn-card rounded-3xl p-4">
        <h3 className="text-sm font-black">🏅 Spice Achievement Badges</h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {SPICE_BADGES.map((b) => {
            const unlocked = unlockedBadgeIds.has(b.id);
            return (
              <div
                key={b.id}
                className={`rounded-2xl p-2.5 transition ${
                  unlocked
                    ? 'callout-amber'
                    : 'autumn-inset opacity-50 grayscale'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{b.emoji}</span>
                  <span className="text-xs font-extrabold">{b.title}</span>
                </div>
                <p className="autumn-muted mt-1 text-[10px] leading-snug">{b.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CONFIGURABLE PHONE REMINDERS */}
      <section className="autumn-card space-y-3 rounded-3xl p-4">
        <div className="flex items-center gap-2">
          <Bell className="accent-amber h-4 w-4" />
          <h3 className="text-sm font-black">Configurable Practice Reminders</h3>
        </div>
        <p className="autumn-muted text-xs leading-relaxed">
          Pick your commute or evening time below, then tap{' '}
          <strong>Add to Google Calendar</strong> or <strong>Download .ics Alarm</strong> so your
          phone rings reliably every day, even underground on the Tube!
        </p>

        <div className="flex items-center gap-3">
          <label className="text-xs font-bold">Time:</label>
          <input
            type="time"
            value={settings.reminders.timeHHMM}
            onChange={(e) =>
              void updateAppSettings({
                reminders: { ...settings.reminders, enabled: true, timeHHMM: e.target.value },
              })
            }
            className="autumn-input rounded-xl px-3 py-1.5 text-sm font-bold"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {DAY_LABELS.map((label, idx) => {
            const active = settings.reminders.daysOfWeek.includes(idx);
            return (
              <button
                key={label}
                type="button"
                onClick={() => void toggleReminderDay(idx)}
                className={`rounded-xl px-2.5 py-1 text-xs font-bold transition ${
                  active ? 'autumn-btn-ochre' : 'autumn-pill'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button
            variant="amber"
            size="sm"
            onClick={() =>
              downloadReminderIcsFile(settings.reminders, window.location.href.split('#')[0]!)
            }
          >
            <CalendarPlus className="h-4 w-4" />
            <span>Download .ics Alarm</span>
          </Button>

          <a
            href={buildGoogleCalendarReminderUrl(
              settings.reminders,
              window.location.href.split('#')[0]!,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="autumn-btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition"
          >
            <CalendarPlus className="h-4 w-4" />
            <span>Add to Google Calendar</span>
          </a>
        </div>

        <Button
          variant="secondary"
          size="sm"
          fullWidth
          onClick={async () => {
            const res = await requestAndTestBrowserNotification();
            if (res === 'granted') {
              await updateAppSettings({
                reminders: { ...settings.reminders, browserNotificationsEnabled: true },
              });
              showToast('Browser notification sent!');
            } else {
              showToast(`Browser notifications: ${res}`);
            }
          }}
        >
          🔔 Enable &amp; Test Browser Notification
        </Button>
      </section>

      {/* 4. PRIVATE GOOGLE WORKSPACE / SHEET SYNC + LAPTOP-FIRST DUAL QR PAIRING */}
      <section className="autumn-card space-y-3 rounded-3xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="accent-spice h-4 w-4" />
            <h3 className="text-sm font-black">Shared Google Sheet Sync &amp; QR Pairing</h3>
          </div>
          <span className="autumn-muted text-[11px]">{outboxCount} queued</span>
        </div>

        <p className="autumn-muted text-xs leading-relaxed">
          Set this up once on your <strong>laptop</strong>, then scan the QR code for{' '}
          <strong>Player 1</strong> and <strong>Player 2</strong> with your phone cameras: zero
          long URLs to type on either device, and zero personal data in GitHub!
        </p>

        <button
          type="button"
          onClick={() => setShowSetupSteps((s) => !s)}
          className="accent-spice inline-flex items-center gap-1.5 text-xs font-bold hover:underline"
        >
          <Laptop className="h-3.5 w-3.5" />
          <span>{showSetupSteps ? 'Hide 5-Step Setup Checklist' : 'Show 5-Step Setup Checklist'}</span>
        </button>

        {showSetupSteps && (
          <ol className="autumn-inset autumn-soft space-y-1.5 rounded-2xl p-3 text-xs leading-relaxed">
            <li>
              <strong>1.</strong> Create one Google Sheet in Google Drive and{' '}
              <strong className="accent-emerald">
                Share it with Player 2 with Editor access
              </strong>
              .
            </li>
            <li>
              <strong>2.</strong> Open <strong>Extensions → Apps Script</strong> and paste{' '}
              <code>apps-script/Code.gs</code> from the repo.
            </li>
            <li>
              <strong>3.</strong> In Apps Script <strong>Project Settings (⚙️) → Script Properties</strong>, add{' '}
              <code>SYNC_PASSCODE</code> = your secret passphrase.
            </li>
            <li>
              <strong>4.</strong> Click <strong>Deploy → New deployment → Web app</strong> (Execute
              as: <em>Me</em>, Who has access: <em>Anyone</em>) and paste the <code>/exec</code>{' '}
              URL + passcode below on your laptop.
            </li>
            <li>
              <strong>5.</strong> Click <strong>QR Codes (Player 1 &amp; 2)</strong> below, then scan{' '}
              <strong>Player 1 QR</strong> on the first phone and <strong>Player 2 QR</strong> on the second!
            </li>
          </ol>
        )}

        {syncError && (
          <p className="callout-rose rounded-xl px-3 py-2 text-xs">
            Sync error: {syncError}
          </p>
        )}

        <form onSubmit={(e) => void handleSaveSyncConfig(e)} className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={partnerANameInput}
              onChange={(e) => setPartnerANameInput(e.target.value)}
              placeholder="Player 1 nickname (e.g. Cuppa)"
              className="autumn-input rounded-xl px-3 py-2 text-xs"
            />
            <input
              type="text"
              value={partnerBNameInput}
              onChange={(e) => setPartnerBNameInput(e.target.value)}
              placeholder="Player 2 nickname (e.g. Biscuit)"
              className="autumn-input rounded-xl px-3 py-2 text-xs"
            />
          </div>

          <input
            type="url"
            value={scriptUrlInput}
            onChange={(e) => setScriptUrlInput(e.target.value)}
            placeholder="https://script.google.com/macros/s/.../exec"
            className="autumn-input w-full rounded-xl px-3 py-2 text-xs"
          />
          <input
            type="password"
            value={passcodeInput}
            onChange={(e) => setPasscodeInput(e.target.value)}
            placeholder="Shared secret SYNC_PASSCODE"
            className="autumn-input w-full rounded-xl px-3 py-2 text-xs"
          />
          <div className="flex flex-wrap gap-2">
            <Button type="submit" variant="primary" size="sm" className="flex-1">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Save &amp; Sync</span>
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => void handleToggleQrPanel()}
            >
              <QrCode className="h-3.5 w-3.5" />
              <span>{showQr ? 'Hide QR Panel' : 'QR Codes (Player 1 & 2)'}</span>
            </Button>
          </div>
        </form>

        {showQr && (
          <div className="space-y-3 rounded-2xl border border-[#D4BEA6] bg-[#FBF4EA] p-4 text-center text-[#332319] shadow-sm">
            {qrDataUrl ? (
              <>
                {/* Player 1 / Player 2 Toggle */}
                <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-[#EADACA] p-1">
                  {(
                    [
                      ['partner_a', `Player 1 (${partnerANameInput || 'Cuppa'})`],
                      ['partner_b', `Player 2 (${partnerBNameInput || 'Biscuit'})`],
                    ] as const
                  ).map(([pid, label]) => (
                    <button
                      key={pid}
                      type="button"
                      onClick={() => void renderQrForTarget(pid)}
                      className={`rounded-lg py-1.5 text-xs font-extrabold transition ${
                        qrTargetProfile === pid
                          ? 'bg-[#A8522E] text-[#FAF1E6] shadow-sm'
                          : 'text-[#5C4332] hover:bg-[#DFCCB6]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <p className="flex items-center justify-center gap-1 text-xs font-extrabold text-[#332319]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#3E5D3A]" />
                  <span>
                    Scan with{' '}
                    {qrTargetProfile === 'partner_a'
                      ? partnerANameInput || 'Player 1'
                      : partnerBNameInput || 'Player 2'}
                    ’s Phone Camera!
                  </span>
                </p>
                <img
                  src={qrDataUrl}
                  alt="Private Google Sheet Pairing QR Code"
                  className="mx-auto h-48 w-48 rounded-lg border border-[#DECBB5]"
                />
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => void handleCopyPairingLink()}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#C8B198] bg-[#EADACA] px-3 py-1.5 text-xs font-bold text-[#332319] hover:bg-[#DFCCB6]"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Setup Link</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowQr(false)}
                    className="rounded-xl border border-[#D5BFA8] px-3 py-1.5 text-xs font-bold text-[#5C4332] hover:bg-[#EADACA]"
                  >
                    Hide
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-2.5 text-left text-xs">
                <p className="font-extrabold text-[#632D16]">
                  No Google Sheet sync link is saved in this app yet
                </p>
                <p className="leading-relaxed text-[#4B3627]">
                  Installed Home Screen apps and browser tabs can keep separate local storage if
                  a QR code opened in an in-app browser first. Copy the <strong>Setup Link</strong>{' '}
                  from your browser tab or laptop, then paste it here to pair this app right away
                  (or fill in the URL &amp; passcode above and tap <strong>Save &amp; Sync</strong>
                  ):
                </p>

                <button
                  type="button"
                  onClick={() => void handlePasteFromClipboardAndPair()}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#A8522E] px-3 py-2 text-xs font-extrabold text-[#FAF1E6] shadow-sm hover:bg-[#934525]"
                >
                  <ClipboardPaste className="h-3.5 w-3.5" />
                  <span>Paste Setup Link from Clipboard &amp; Pair</span>
                </button>

                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={pastePairLinkInput}
                    onChange={(e) => setPastePairLinkInput(e.target.value)}
                    placeholder="Or paste https://.../#pair=... here"
                    className="min-w-0 flex-1 rounded-xl border border-[#CFB89E] bg-[#F7EDE0] px-3 py-1.5 text-xs text-[#332319] placeholder-[#8E7663]"
                  />
                  <button
                    type="button"
                    disabled={!pastePairLinkInput.trim()}
                    onClick={() => void handleImportSetupLink(pastePairLinkInput)}
                    className="rounded-xl bg-[#4D6F48] px-3 py-1.5 text-xs font-extrabold text-[#FAF1E6] disabled:opacity-45"
                  >
                    Pair App
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 5. EXTERNAL JSON URL / CSV / ANKI DECK IMPORTER */}
      <section className="autumn-card space-y-3 rounded-3xl p-4">
        <div className="flex items-center gap-2">
          <Upload className="accent-emerald h-4 w-4" />
          <h3 className="text-sm font-black">Import External Pack (Off-GitHub!)</h3>
        </div>
        <p className="autumn-muted text-xs">
          Fetch an external <code>exams.json</code> URL once or paste JSON / Anki CSV/TSV. It
          caches offline &amp; syncs to both phones via your private Google Sheet!
        </p>

        <div className="flex gap-2">
          <input
            type="url"
            value={remoteJsonUrl}
            onChange={(e) => setRemoteJsonUrl(e.target.value)}
            placeholder="https://raw.githubusercontent.com/.../exams.json"
            className="autumn-input min-w-0 flex-1 rounded-xl px-3 py-2 text-xs"
          />
          <Button
            variant="emerald"
            size="sm"
            disabled={importBusy || !remoteJsonUrl.trim()}
            onClick={() => void handleFetchRemotePack()}
          >
            Fetch URL
          </Button>
        </div>

        <textarea
          rows={3}
          value={rawImportText}
          onChange={(e) => setRawImportText(e.target.value)}
          placeholder='Or paste JSON [{"question":"...","options":[...],"answer":0}] or CSV: Front,Back,MemoryHook'
          className="autumn-input w-full rounded-xl p-3 text-xs"
        />
        <Button
          variant="secondary"
          size="sm"
          fullWidth
          disabled={importBusy || !rawImportText.trim()}
          onClick={() => void handlePasteImport()}
        >
          Import Pasted Questions / Flashcards
        </Button>
      </section>

      {/* 6. LOCKED DEVICE PROFILE, LOCAL BACKUP & SAFE DEVICE RESET */}
      <section className="autumn-card space-y-3 rounded-3xl p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Users className="accent-spice h-4 w-4" />
            <h3 className="text-sm font-black">Your Profile &amp; Local Backup</h3>
          </div>
          <span className="callout-emerald rounded-full px-2.5 py-0.5 text-[10px] font-bold">
            {isMobile ? 'Locked to this phone' : 'Active profile'}
          </span>
        </div>

        <div className="callout-spice flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-xs">
          <div className="flex items-center gap-2 font-extrabold">
            <ProfileAvatar avatar={activeProfile.avatarEmoji} sizeClass="text-lg" />
            <span>{activeProfile.displayName}</span>
          </div>
          <span className="autumn-muted text-[11px]">
            Teammate: {partnerProfile.displayName} (view-only)
          </span>
        </div>

        {/* App Installation Status Check (mobile only) */}
        {isMobile && (
          <div className="autumn-inset rounded-2xl p-3 text-xs">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Smartphone className="accent-spice h-4 w-4" />
                <span className="font-bold">App Status</span>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                  isStandalone ? 'callout-emerald' : 'callout-amber'
                }`}
              >
                {isStandalone ? 'Installed App (Offline Ready)' : 'Running in Browser Tab'}
              </span>
            </div>

            {!isStandalone && (
              <div className="mt-2.5 space-y-2">
                {canInstall ? (
                  <>
                    <Button
                      variant="emerald"
                      size="sm"
                      fullWidth
                      onClick={() => void promptInstall()}
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Install SpiceUpUK App</span>
                    </Button>
                    <p className="autumn-muted text-[11px]">
                      {swReady ? 'Offline cache ready. ' : ''}Tap <strong>Install</strong> (not{' '}
                      <em>Create shortcut</em>) and wait ~10 seconds.
                    </p>
                  </>
                ) : (
                  <p className="autumn-muted text-[11px] leading-relaxed">
                    To install offline: tap Chrome <code>⋮</code> -&gt;{' '}
                    <strong>Add to home screen</strong> -&gt; <strong>Install</strong> (or Safari{' '}
                    <strong>Share</strong> -&gt; <strong>Add to Home Screen</strong>).
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        <div>
          <p className="autumn-muted mb-1.5 text-[11px] font-bold">
            Avatar for {activeProfile.displayName} (1 per player):
          </p>
          <div className="grid grid-cols-8 gap-1.5">
            {AVATAR_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() =>
                  void updateUserProfile(activeProfile.id, { avatarEmoji: emoji })
                }
                className={`flex h-9 items-center justify-center rounded-xl text-lg transition ${
                  activeProfile.avatarEmoji === emoji
                    ? 'callout-spice ring-1 ring-orange-500/65'
                    : 'autumn-inset'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={activeProfile.displayName}
            onChange={(e) =>
              void updateUserProfile(activeProfile.id, { displayName: e.target.value })
            }
            placeholder="Your nickname"
            className="autumn-input rounded-xl px-3 py-2 text-xs"
          />
          <input
            type="date"
            value={settings.examDate ?? ''}
            onChange={(e) => void updateAppSettings({ examDate: e.target.value || null })}
            className="autumn-input rounded-xl px-3 py-2 text-xs"
          />
        </div>

        <div className="autumn-inset flex items-center justify-between gap-3 rounded-2xl p-3 text-xs">
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 font-extrabold">
              <BionicReadingIcon className="accent-spice h-4 w-4 shrink-0" />
              <span>Bionic Reading Mode</span>
            </p>
            <p className="autumn-muted mt-0.5 text-[11px] leading-relaxed">
              <BionicText text="Highlights the start of each word so your eyes glide faster through study guides, questions, and explanations." />
            </p>
          </div>
          <button
            type="button"
            onClick={() => void updateAppSettings({ bionicReading: !settings.bionicReading })}
            aria-pressed={Boolean(settings.bionicReading)}
            className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-extrabold transition ${
              settings.bionicReading
                ? 'callout-spice ring-1 ring-orange-500/60'
                : 'autumn-pill'
            }`}
          >
            {settings.bionicReading ? 'On' : 'Off'}
          </button>
        </div>

        <Button variant="ghost" size="sm" fullWidth onClick={() => void handleExportBackup()}>
          <Download className="h-3.5 w-3.5" />
          <span>Export Local JSON Backup</span>
        </Button>

        {/* Deliberate, Two-Step Protected Device Reset */}
        <div className="border-t border-amber-900/20 pt-2.5">
          <button
            type="button"
            onClick={() => {
              setShowResetDrawer((v) => !v);
              setResetConfirmText('');
            }}
            className="autumn-muted hover:accent-rose inline-flex items-center gap-1.5 text-[11px] font-bold transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>
              {showResetDrawer
                ? 'Cancel device reset'
                : 'Need to start setup over? Wipe & reset this device...'}
            </span>
          </button>

          {showResetDrawer && (
            <div className="callout-rose mt-2.5 space-y-2.5 rounded-2xl p-3.5 text-xs">
              <div className="flex items-start gap-2">
                <AlertTriangle className="accent-rose mt-0.5 h-4 w-4 shrink-0" />
                <div className="space-y-1 leading-relaxed">
                  <p className="font-extrabold">Wipe This Device &amp; Start Setup Again</p>
                  <p className="text-[11px] opacity-90">
                    Clears your locked profile, Google Sheet sync link, spaced-repetition schedule,
                    XP, and test history on this device, then re-opens initial setup. (Data already
                    in your shared Google Sheet is not deleted unless you clear the sheet tabs.)
                  </p>
                  <p className="text-[11px] opacity-85">
                    <em>Tip:</em> If you only want to switch to a newly generated QR code, scanning
                    the new QR link automatically updates this device without needing a full wipe.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold">
                  Type <code className="font-mono font-black">RESET</code> below to unlock the wipe
                  button:
                </label>
                <input
                  type="text"
                  value={resetConfirmText}
                  onChange={(e) => setResetConfirmText(e.target.value)}
                  placeholder="Type RESET to confirm"
                  autoComplete="off"
                  className="autumn-input mt-1.5 w-full rounded-xl px-3 py-2 text-xs font-bold"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  className="flex-1"
                  disabled={!canConfirmReset}
                  onClick={() => void handleConfirmedDeviceReset()}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>{resetBusy ? 'Wiping...' : 'Wipe Device & Restart Setup'}</span>
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setShowResetDrawer(false);
                    setResetConfirmText('');
                  }}
                >
                  Keep Data
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
