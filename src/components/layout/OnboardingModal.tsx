import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { AVATAR_EMOJIS } from '../ui/ProfileAvatar';
import type { ProfileId } from '../../types/domain';
import { updateAppSettings, updateUserProfile } from '../../db/repository';

interface OnboardingModalProps {
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [mySlot, setMySlot] = useState<ProfileId>('partner_a');
  const [myName, setMyName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [myAvatar, setMyAvatar] = useState('🐰');
  const [examDate, setExamDate] = useState('');
  const [saving, setSaving] = useState(false);

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const otherSlot: ProfileId = mySlot === 'partner_a' ? 'partner_b' : 'partner_a';
      await updateUserProfile(mySlot, {
        displayName: myName.trim() || (mySlot === 'partner_a' ? 'Posh Partner' : 'Sporty Partner'),
        avatarEmoji: myAvatar,
      });
      if (partnerName.trim()) {
        await updateUserProfile(otherSlot, {
          displayName: partnerName.trim(),
          avatarEmoji: myAvatar === '🐰' ? '😎' : '🐰',
        });
      }
      await updateAppSettings({
        onboarded: true,
        activeProfileId: mySlot,
        examDate: examDate || null,
      });
      onComplete();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl border border-pink-500/30 bg-slate-900 p-6 text-slate-100 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-600 via-rose-600 to-indigo-600 text-3xl shadow-lg">
            🌶️
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Spice Up Your UK!
          </h1>
          <p className="mt-1 text-xs text-slate-300">
            <em>&ldquo;Tell me what you want, what you really, really want...&rdquo;</em> — to
            ace the Life in the UK Test together, even offline on the Tube!
          </p>
        </div>

        <form onSubmit={handleStart} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300">
              Which profile is THIS device?
            </label>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {(
                [
                  ['partner_a', 'Partner 1 (Phone A)'],
                  ['partner_b', 'Partner 2 (Phone B)'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMySlot(id)}
                  className={`rounded-xl border px-3 py-2 text-xs font-bold transition ${
                    mySlot === id
                      ? 'border-pink-500 bg-pink-600/20 text-pink-200'
                      : 'border-slate-700 bg-slate-800/70 text-slate-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-bold text-slate-300">
                Your Nickname
              </label>
              <input
                type="text"
                value={myName}
                onChange={(e) => setMyName(e.target.value)}
                placeholder="e.g. Ginger"
                maxLength={24}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300">
                Partner’s Nickname
              </label>
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="e.g. Posh"
                maxLength={24}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300">Pick Your Badge</label>
            <div className="mt-1.5 grid grid-cols-8 gap-1.5">
              {AVATAR_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setMyAvatar(emoji)}
                  className={`flex h-10 items-center justify-center rounded-xl border text-xl transition ${
                    myAvatar === emoji
                      ? 'border-pink-500 bg-pink-500/25 scale-105'
                      : 'border-slate-700 bg-slate-800/70'
                  }`}
                >
                  {emoji}
                </button>
              ))}
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
            🔒 <strong>100% Private Local Storage:</strong> Nicknames and Google Sheet sync keys
            stay strictly on your phone (never in GitHub). You can link your shared Google Sheet
            anytime in the <strong>Us</strong> tab!
          </p>

          <Button type="submit" fullWidth size="lg" disabled={saving}>
            Let’s Spice Up Our UK! 🚀
          </Button>
        </form>
      </div>
    </div>
  );
};
