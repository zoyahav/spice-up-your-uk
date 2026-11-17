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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-md">
      <div className="autumn-card my-auto w-full max-w-md rounded-3xl p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="callout-spice flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl">
              <Smartphone className="accent-spice h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-black">
                Install as an Offline App
              </h2>
              <p className="autumn-muted text-xs">
                One-time tip for fullscreen offline commute mode
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            className="autumn-back-btn rounded-xl p-1.5"
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
            <p className="accent-emerald text-center text-[11px]">
              {swReady ? 'Offline cache ready.' : 'Preparing offline cache...'} Tap{' '}
              <strong>Install</strong> (not <em>Create shortcut</em>) and wait ~10s.
            </p>
          </div>
        )}

        <div className="mt-4 space-y-3 text-xs leading-relaxed">
          {/* Android Chrome */}
          <div className="autumn-inset rounded-2xl p-3.5">
            <p className="accent-spice font-extrabold">
              Android (Chrome)
            </p>
            <ol className="autumn-soft mt-1.5 space-y-1.5">
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
              <li className="accent-amber text-[11px]">
                Tip: Choose <strong>Install</strong> rather than <em>Create shortcut</em>, and wait
                ~10 seconds for Android to finish adding the app icon.
              </li>
            </ol>
          </div>

          {/* Safari */}
          <div className="autumn-inset rounded-2xl p-3.5">
            <p className="accent-amber font-extrabold">
              iPhone / iPad (Safari)
            </p>
            <p className="autumn-soft mt-1">
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
