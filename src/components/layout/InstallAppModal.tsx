import React from 'react';
import { Download, MoreVertical, Share, Smartphone, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { usePwaInstall } from '../../hooks/usePwaInstall';

interface InstallAppModalProps {
  onDismiss: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ onDismiss }) => {
  const { canInstall, swReady, promptInstall } = usePwaInstall();

  const handleNativeInstall = async () => {
    const outcome = await promptInstall();
    if (outcome === 'accepted') {
      onDismiss();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/85 p-4 backdrop-blur-md">
      <div className="my-auto w-full max-w-md rounded-3xl border border-pink-500/35 bg-slate-900 p-5 text-slate-100 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-pink-600/20 text-pink-400">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white">
                Install as an Offline App
              </h2>
              <p className="text-xs text-slate-400">
                One-time tip for fullscreen offline commute mode
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Close install guide"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {canInstall && (
          <div className="mt-4 space-y-1.5">
            <Button variant="emerald" fullWidth size="md" onClick={() => void handleNativeInstall()}>
              <Download className="h-4 w-4" />
              <span>Install SpiceUpUK App</span>
            </Button>
            <p className="text-center text-[11px] text-emerald-300/90">
              {swReady ? 'Offline cache ready.' : 'Preparing offline cache...'} Tap{' '}
              <strong>Install</strong> (not <em>Create shortcut</em>) and wait ~10s.
            </p>
          </div>
        )}

        <div className="mt-4 space-y-3 text-xs leading-relaxed">
          {/* Android Chrome */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3.5">
            <p className="font-extrabold text-pink-300">
              Android (Chrome)
            </p>
            <ol className="mt-1.5 space-y-1.5 text-slate-300">
              <li>
                <strong>1. Open in full Chrome:</strong> If you scanned a QR code or opened a link
                inside another app, tap <MoreVertical className="inline h-3.5 w-3.5" /> and choose{' '}
                <strong>Open in Chrome browser</strong> first.
              </li>
              <li>
                <strong>2. Install the app:</strong> Tap Chrome’s menu (
                <MoreVertical className="inline h-3.5 w-3.5" />) -&gt; <strong>Install app</strong>{' '}
                (or <strong>Add to Home screen -&gt; Install</strong>).
              </li>
              <li className="text-[11px] text-amber-300">
                Tip: Choose <strong>Install</strong> rather than <em>Create shortcut</em>, and wait
                ~10 seconds for Android to finish adding the app icon.
              </li>
            </ol>
          </div>

          {/* Safari */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3.5">
            <p className="font-extrabold text-sky-300">
              iPhone / iPad (Safari)
            </p>
            <p className="mt-1 text-slate-300">
              Open this page in <strong>Safari</strong>, tap the <strong>Share</strong> button (
              <Share className="inline h-3.5 w-3.5" />), then tap{' '}
              <strong>Add to Home Screen</strong>.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <Button variant="primary" fullWidth size="md" onClick={onDismiss}>
            Continue in browser for now
          </Button>
        </div>
      </div>
    </div>
  );
};
