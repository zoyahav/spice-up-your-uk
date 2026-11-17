import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import {
  Bell,
  CalendarPlus,
  CheckCircle2,
  Cloud,
  Copy,
  Download,
  Laptop,
  QrCode,
  RefreshCw,
  Upload,
  Users,
} from 'lucide-react';
import { SPICE_BADGES } from '../constants/spiceTheme';
import { CHAPTERS } from '../data/syllabus';
import {
  exportFullLocalBackupJson,
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
import { buildPairingUrl } from '../services/sync';
import { Button } from '../components/ui/Button';
import { AVATAR_EMOJIS, ProfileAvatar } from '../components/ui/ProfileAvatar';
import { ProgressBar } from '../components/ui/ProgressBar';
import type {
  AppSettings,
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
  myTotalXp: number;
  partnerTotalXp: number;
  coupleStreakCount: number;
  unlockedBadgeIds: ReadonlySet<string>;
  outboxCount: number;
  syncError: string | null;
  onManualSync: () => Promise<void>;
  isLightMode: boolean;
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export const PartnerView: React.FC<PartnerViewProps> = ({
  settings,
  activeProfile,
  partnerProfile,
  myMastery,
  partnerMastery,
  myTotalXp,
  partnerTotalXp,
  coupleStreakCount,
  unlockedBadgeIds,
  outboxCount,
  syncError,
  onManualSync,
  isLightMode,
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
  const [showSetupSteps, setShowSetupSteps] = useState(false);
  const [statusToast, setStatusToast] = useState<string | null>(null);

  // Importer state
  const [remoteJsonUrl, setRemoteJsonUrl] = useState('');
  const [rawImportText, setRawImportText] = useState('');
  const [importBusy, setImportBusy] = useState(false);

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

  const buildCurrentPairingUrl = (forProfile: ProfileId): string => {
    return buildPairingUrl(window.location.href, {
      v: 1,
      scriptUrl: scriptUrlInput.trim(),
      passcode: passcodeInput.trim(),
      partnerAName: partnerANameInput.trim() || settings.profiles.partner_a.displayName,
      partnerBName: partnerBNameInput.trim() || settings.profiles.partner_b.displayName,
      suggestedProfile: forProfile,
    });
  };

  const renderQrForTarget = async (target: ProfileId) => {
    if (!scriptUrlInput.trim() || !passcodeInput.trim()) {
      showToast('Enter your Apps Script URL & Passcode first!');
      return;
    }
    const pairUrl = buildCurrentPairingUrl(target);
    const url = await QRCode.toDataURL(pairUrl, {
      margin: 2,
      width: 240,
      color: { dark: '#0F172A', light: '#FFFFFF' },
    });
    setQrTargetProfile(target);
    setQrDataUrl(url);
    setShowQr(true);
  };

  const handleSaveSyncConfig = async (e: React.FormEvent) => {
    e.preventDefault();
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
    showToast('Saved private Google Sheet sync settings locally!');
    if (scriptUrlInput.trim() && passcodeInput.trim()) {
      await onManualSync();
    }
  };

  const handleCopyPairingLink = async () => {
    const pairUrl = buildCurrentPairingUrl(qrTargetProfile);
    await navigator.clipboard.writeText(pairUrl);
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

  const cardSurface = isLightMode
    ? 'border-slate-200 bg-white shadow-sm'
    : 'border-slate-800/90 bg-slate-900/85';

  return (
    <div className="space-y-4">
      {statusToast && (
        <div className="rounded-2xl border border-pink-500/40 bg-pink-600/20 px-4 py-3 text-xs font-bold text-pink-200">
          🌶️ {statusToast}
        </div>
      )}

      {/* 1. YOU VS PARTNER HEAD-TO-HEAD MASTERY */}
      <section className={`rounded-3xl border p-4 ${cardSurface}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black">💞 2 Become 1: Couple Scoreboard</h2>
            <p className="text-xs text-slate-400">
              Shared Streak: <strong>{coupleStreakCount} days</strong>
            </p>
          </div>
          <span className="rounded-full bg-pink-500/15 px-3 py-1 text-xs font-black text-pink-400">
            Team Mode
          </span>
        </div>

        <div className="mt-3.5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-pink-500/30 bg-pink-500/10 p-3 text-center">
            <p className="text-2xl">
              <ProfileAvatar avatar={activeProfile.avatarEmoji} sizeClass="text-2xl" />
            </p>
            <p className="mt-1 truncate text-xs font-black">{activeProfile.displayName} (You)</p>
            <p className="text-lg font-black text-pink-400">{myMastery.overallPercent}%</p>
            <p className="text-[11px] text-slate-400">{myTotalXp} XP</p>
          </div>

          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-3 text-center">
            <p className="text-2xl">
              <ProfileAvatar avatar={partnerProfile.avatarEmoji} sizeClass="text-2xl" />
            </p>
            <p className="mt-1 truncate text-xs font-black">{partnerProfile.displayName}</p>
            <p className="text-lg font-black text-indigo-400">{partnerMastery.overallPercent}%</p>
            <p className="text-[11px] text-slate-400">{partnerTotalXp} XP</p>
          </div>
        </div>

        <div className="mt-4 space-y-2.5">
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
                    <span className="text-pink-400">{mine}%</span> vs{' '}
                    <span className="text-indigo-400">{theirs}%</span>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <ProgressBar
                    percent={mine}
                    colorClass="bg-pink-500"
                    heightClass="h-1.5"
                  />
                  <ProgressBar
                    percent={theirs}
                    colorClass="bg-indigo-500"
                    heightClass="h-1.5"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. SPICE ACHIEVEMENT BADGES */}
      <section className={`rounded-3xl border p-4 ${cardSurface}`}>
        <h3 className="text-sm font-black">🏅 Spice Achievement Badges</h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {SPICE_BADGES.map((b) => {
            const unlocked = unlockedBadgeIds.has(b.id);
            return (
              <div
                key={b.id}
                className={`rounded-2xl border p-2.5 transition ${
                  unlocked
                    ? 'border-amber-500/40 bg-amber-500/10'
                    : 'border-slate-800 bg-slate-950/30 opacity-45 grayscale'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{b.emoji}</span>
                  <span className="text-xs font-extrabold">{b.title}</span>
                </div>
                <p className="mt-1 text-[10px] leading-snug text-slate-400">{b.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CONFIGURABLE PHONE REMINDERS */}
      <section className={`space-y-3 rounded-3xl border p-4 ${cardSurface}`}>
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-amber-400" />
          <h3 className="text-sm font-black">Configurable Practice Reminders</h3>
        </div>
        <p className="text-xs leading-relaxed text-slate-400">
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
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-sm font-bold text-white"
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
                  active ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
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
            className="inline-flex items-center justify-center gap-2 rounded-xl border-b-4 border-indigo-900 bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-500"
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
      <section className={`space-y-3 rounded-3xl border p-4 ${cardSurface}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="h-4 w-4 text-sky-400" />
            <h3 className="text-sm font-black">Shared Google Sheet Sync &amp; QR Pairing</h3>
          </div>
          <span className="text-[11px] text-slate-400">{outboxCount} queued</span>
        </div>

        <p className="text-xs leading-relaxed text-slate-400">
          Set this up once on your <strong>laptop</strong>, then scan the QR code for{' '}
          <strong>Player 1</strong> and <strong>Player 2</strong> with your phone cameras: zero
          long URLs to type on either device, and zero personal data in GitHub!
        </p>

        <button
          type="button"
          onClick={() => setShowSetupSteps((s) => !s)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:underline"
        >
          <Laptop className="h-3.5 w-3.5" />
          <span>{showSetupSteps ? 'Hide 5-Step Setup Checklist' : 'Show 5-Step Setup Checklist'}</span>
        </button>

        {showSetupSteps && (
          <ol className="space-y-1.5 rounded-2xl border border-slate-800 bg-slate-950/60 p-3 text-xs leading-relaxed text-slate-300">
            <li>
              <strong>1.</strong> Create one Google Sheet in Google Drive and{' '}
              <strong className="text-emerald-300">
                Share it with your partner with Editor access
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
          <p className="rounded-xl bg-rose-500/15 px-3 py-2 text-xs text-rose-300">
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
              className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500"
            />
            <input
              type="text"
              value={partnerBNameInput}
              onChange={(e) => setPartnerBNameInput(e.target.value)}
              placeholder="Player 2 nickname (e.g. Biscuit)"
              className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500"
            />
          </div>

          <input
            type="url"
            value={scriptUrlInput}
            onChange={(e) => setScriptUrlInput(e.target.value)}
            placeholder="https://script.google.com/macros/s/.../exec"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500"
          />
          <input
            type="password"
            value={passcodeInput}
            onChange={(e) => setPasscodeInput(e.target.value)}
            placeholder="Shared secret SYNC_PASSCODE"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500"
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
              onClick={() => void renderQrForTarget('partner_a')}
            >
              <QrCode className="h-3.5 w-3.5" />
              <span>QR Codes (Player 1 &amp; 2)</span>
            </Button>
          </div>
        </form>

        {showQr && qrDataUrl && (
          <div className="rounded-2xl border border-slate-700 bg-white p-4 text-center text-slate-900">
            {/* Player 1 / Player 2 Toggle */}
            <div className="mb-3 grid grid-cols-2 gap-1.5 rounded-xl bg-slate-100 p-1">
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
                      ? 'bg-pink-600 text-white shadow'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <p className="mb-2 flex items-center justify-center gap-1 text-xs font-extrabold text-slate-800">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
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
              className="mx-auto h-48 w-48 rounded-lg"
            />
            <div className="mt-3 flex justify-center gap-2">
              <Button variant="secondary" size="sm" onClick={() => void handleCopyPairingLink()}>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Setup Link</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowQr(false)}>
                Hide
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* 5. EXTERNAL JSON URL / CSV / ANKI DECK IMPORTER */}
      <section className={`space-y-3 rounded-3xl border p-4 ${cardSurface}`}>
        <div className="flex items-center gap-2">
          <Upload className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-black">Import External Pack (Off-GitHub!)</h3>
        </div>
        <p className="text-xs text-slate-400">
          Fetch an external <code>exams.json</code> URL once or paste JSON / Anki CSV/TSV. It
          caches offline &amp; syncs to both phones via your private Google Sheet!
        </p>

        <div className="flex gap-2">
          <input
            type="url"
            value={remoteJsonUrl}
            onChange={(e) => setRemoteJsonUrl(e.target.value)}
            placeholder="https://raw.githubusercontent.com/.../exams.json"
            className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500"
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
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white placeholder-slate-500"
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

      {/* 6. PROFILE SWITCHER & LOCAL BACKUP */}
      <section className={`space-y-3 rounded-3xl border p-4 ${cardSurface}`}>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-pink-400" />
          <h3 className="text-sm font-black">Profile, Exam Date &amp; Local Backup</h3>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {(['partner_a', 'partner_b'] as const).map((pid) => {
            const p = settings.profiles[pid];
            const isActive = settings.activeProfileId === pid;
            return (
              <button
                key={pid}
                type="button"
                onClick={() => void updateAppSettings({ activeProfileId: pid })}
                className={`rounded-2xl border p-2.5 text-left text-xs font-bold transition ${
                  isActive
                    ? 'border-pink-500 bg-pink-500/15 text-pink-200'
                    : 'border-slate-800 bg-slate-950/40 text-slate-400'
                }`}
              >
                <p className="flex items-center gap-1.5">
                  <ProfileAvatar avatar={p.avatarEmoji} sizeClass="text-base" />
                  <span className="truncate">{p.displayName}</span>
                </p>
                <p className="text-[10px] opacity-75">
                  {isActive ? 'Active on this phone' : 'Tap to switch'}
                </p>
              </button>
            );
          })}
        </div>

        <div>
          <p className="mb-1.5 text-[11px] font-bold text-slate-400">
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
                className={`flex h-9 items-center justify-center rounded-xl border text-lg transition ${
                  activeProfile.avatarEmoji === emoji
                    ? 'border-pink-500 bg-pink-500/20'
                    : 'border-slate-800 bg-slate-950/40'
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
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
          />
          <input
            type="date"
            value={settings.examDate ?? ''}
            onChange={(e) => void updateAppSettings({ examDate: e.target.value || null })}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
          />
        </div>

        <Button variant="ghost" size="sm" fullWidth onClick={() => void handleExportBackup()}>
          <Download className="h-3.5 w-3.5" />
          <span>Export Local JSON Backup</span>
        </Button>
      </section>
    </div>
  );
};
