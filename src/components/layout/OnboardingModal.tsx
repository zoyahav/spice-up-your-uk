import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { AVATAR_EMOJIS } from '../ui/ProfileAvatar';
import type { ProfileId } from '../../types/domain';
import { updateAppSettings, updateUserProfile } from '../../db/repository';
import type { NavTab } from './AppShell';

type DeviceRole = 'partner_a' | 'partner_b' | 'laptop';

interface OnboardingModalProps {
  onComplete: (targetTab: NavTab) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [deviceRole, setDeviceRole] = useState<DeviceRole>('laptop');
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Avatar, setPlayer1Avatar] = useState('🐰');
  const [player2Avatar, setPlayer2Avatar] = useState('😎');
  const [editingAvatarFor, setEditingAvatarFor] = useState<ProfileId>('partner_a');
  const [examDate, setExamDate] = useState('');
  const [saving, setSaving] = useState(false);

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUserProfile('partner_a', {
        displayName: player1Name.trim() || 'Player 1 (Cuppa)',
        avatarEmoji: player1Avatar,
      });
      await updateUserProfile('partner_b', {
        displayName: player2Name.trim() || 'Player 2 (Biscuit)',
        avatarEmoji: player2Avatar,
      });
      const activeProfileId: ProfileId =
        deviceRole === 'partner_b' ? 'partner_b' : 'partner_a';
      await updateAppSettings({
        onboarded: true,
        activeProfileId,
        examDate: examDate || null,
      });
      onComplete(deviceRole === 'laptop' ? 'us' : 'home');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/90 p-4 backdrop-blur-md">
      <div className="my-auto w-full max-w-md rounded-3xl border border-pink-500/30 bg-slate-900 p-5 text-slate-100 shadow-2xl">
        <div className="text-center">
          <img
            src="./icons/brand-logo.png"
            alt="Spice Up Your UK"
            className="mx-auto mb-2.5 h-16 w-16 rounded-2xl shadow-lg ring-2 ring-pink-500/40"
          />
          <h1 className="text-2xl font-black tracking-tight text-white">
            Spice Up Your UK!
          </h1>
          <p className="mt-1 text-xs text-slate-300">
            <em>&ldquo;Tell me what you want, what you really, really want...&rdquo;</em> To
            ace the Life in the UK Test together, even offline on the Tube!
          </p>
        </div>

        <form onSubmit={handleStart} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-300">
              Where are you opening this right now?
            </label>
            <div className="mt-1.5 grid grid-cols-3 gap-1.5">
              {(
                [
                  ['laptop', '💻 Laptop Setup', 'Generate phone QRs'],
                  ['partner_a', '📱 Player 1 Phone', 'Cuppa 🫖'],
                  ['partner_b', '📱 Player 2 Phone', 'Biscuit 🍪'],
                ] as const
              ).map(([role, title, sub]) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    setDeviceRole(role);
                    if (role === 'partner_a' || role === 'partner_b') {
                      setEditingAvatarFor(role);
                    }
                  }}
                  className={`rounded-xl border px-2 py-2 text-center transition ${
                    deviceRole === role
                      ? 'border-pink-500 bg-pink-600/20 text-pink-200'
                      : 'border-slate-700 bg-slate-800/70 text-slate-400'
                  }`}
                >
                  <p className="text-[11px] font-extrabold">{title}</p>
                  <p className="text-[10px] opacity-80">{sub}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-bold text-slate-300">
                Player 1 Name
              </label>
              <input
                type="text"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                placeholder="e.g. Ginger"
                maxLength={24}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300">
                Player 2 Name
              </label>
              <input
                type="text"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                placeholder="e.g. Posh"
                maxLength={24}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300">
              Player Avatars <span className="font-normal text-slate-400">(tap player, then pick emoji)</span>
            </label>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setEditingAvatarFor('partner_a')}
                className={`flex items-center justify-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-bold transition ${
                  editingAvatarFor === 'partner_a'
                    ? 'border-pink-500 bg-pink-600/20 text-pink-200'
                    : 'border-slate-700 bg-slate-800/60 text-slate-400'
                }`}
              >
                <span className="text-base">{player1Avatar}</span>
                <span className="truncate">{player1Name.trim() || 'Player 1'}</span>
              </button>
              <button
                type="button"
                onClick={() => setEditingAvatarFor('partner_b')}
                className={`flex items-center justify-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-bold transition ${
                  editingAvatarFor === 'partner_b'
                    ? 'border-indigo-500 bg-indigo-600/20 text-indigo-200'
                    : 'border-slate-700 bg-slate-800/60 text-slate-400'
                }`}
              >
                <span className="text-base">{player2Avatar}</span>
                <span className="truncate">{player2Name.trim() || 'Player 2'}</span>
              </button>
            </div>
            <div className="mt-2 grid grid-cols-8 gap-1.5">
              {AVATAR_EMOJIS.map((emoji) => {
                const activeEmoji =
                  editingAvatarFor === 'partner_a' ? player1Avatar : player2Avatar;
                return (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() =>
                      editingAvatarFor === 'partner_a'
                        ? setPlayer1Avatar(emoji)
                        : setPlayer2Avatar(emoji)
                    }
                    className={`flex h-9 items-center justify-center rounded-xl border text-xl transition ${
                      activeEmoji === emoji
                        ? 'border-pink-500 bg-pink-500/25 scale-105'
                        : 'border-slate-700 bg-slate-800/70'
                    }`}
                  >
                    {emoji}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300">
              Target Test Date <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-pink-500 focus:outline-none"
            />
          </div>

          <p className="rounded-xl border border-slate-800 bg-slate-950/70 p-2.5 text-[11px] leading-relaxed text-slate-400">
            🔒 <strong>Private Local Storage:</strong> Names, avatars, and Google Sheet sync keys
            are encoded directly into your QR codes and never stored in GitHub.
          </p>

          <Button type="submit" fullWidth size="lg" disabled={saving}>
            {deviceRole === 'laptop'
              ? 'Next: Connect Google Sheet & Get Phone QRs →'
              : 'Let’s Spice Up Our UK! 🚀'}
          </Button>
        </form>
      </div>
    </div>
  );
};
