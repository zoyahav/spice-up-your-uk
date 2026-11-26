import React, { createContext, useContext, useMemo } from 'react';
import { tokenizeBionicText } from '../../services/bionicReading';
import type { BionicFixationStyle } from '../../types/domain';

interface BionicReadingContextValue {
  readonly enabled: boolean;
  readonly style: BionicFixationStyle;
  readonly toggle: () => void;
}

const BionicReadingContext = createContext<BionicReadingContextValue>({
  enabled: false,
  style: 'adaptive',
  toggle: () => {},
});

interface BionicReadingProviderProps {
  enabled: boolean;
  style?: BionicFixationStyle;
  onToggle: () => void;
  children: React.ReactNode;
}

export const BionicReadingProvider: React.FC<BionicReadingProviderProps> = ({
  enabled,
  style = 'adaptive',
  onToggle,
  children,
}) => {
  const value = useMemo(
    () => ({ enabled, style, toggle: onToggle }),
    [enabled, style, onToggle],
  );
  return (
    <BionicReadingContext.Provider value={value}>
      {children}
    </BionicReadingContext.Provider>
  );
};

export function useBionicReading(): BionicReadingContextValue {
  return useContext(BionicReadingContext);
}

interface BionicTextProps {
  text: string;
  enabledOverride?: boolean;
  styleOverride?: BionicFixationStyle;
}

export const BionicText: React.FC<BionicTextProps> = ({
  text,
  enabledOverride,
  styleOverride,
}) => {
  const { enabled: contextEnabled, style: contextStyle } = useBionicReading();
  const isEnabled = enabledOverride ?? contextEnabled;
  const activeStyle = styleOverride ?? contextStyle;

  const segments = useMemo(
    () => (isEnabled ? tokenizeBionicText(text, activeStyle) : null),
    [isEnabled, text, activeStyle],
  );

  if (!isEnabled || !segments) {
    return <>{text}</>;
  }

  return (
    <>
      {segments.map((seg, idx) =>
        seg.bold ? (
          <React.Fragment key={idx}>
            <strong className="font-extrabold">{seg.bold}</strong>
            {seg.rest ? <span className="font-normal opacity-85">{seg.rest}</span> : null}
          </React.Fragment>
        ) : (
          <span key={idx} className="font-normal opacity-90">
            {seg.rest}
          </span>
        ),
      )}
    </>
  );
};

export const BionicReadingIcon: React.FC<{ className?: string }> = ({
  className = 'h-4 w-4',
}) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
    <rect x="2.5" y="4.75" width="9" height="3" rx="1.5" fill="currentColor" />
    <rect x="13" y="5.5" width="8.5" height="1.5" rx="0.75" fill="currentColor" opacity="0.4" />
    <rect x="2.5" y="10.5" width="11" height="3" rx="1.5" fill="currentColor" />
    <rect x="15" y="11.25" width="6.5" height="1.5" rx="0.75" fill="currentColor" opacity="0.4" />
    <rect x="2.5" y="16.25" width="7.5" height="3" rx="1.5" fill="currentColor" />
    <rect x="11.5" y="17" width="4.5" height="1.5" rx="0.75" fill="currentColor" opacity="0.4" />
    <path
      d="M19.5 14.5L20.35 16.65L22.5 17.5L20.35 18.35L19.5 20.5L18.65 18.35L16.5 17.5L18.65 16.65L19.5 14.5Z"
      fill="currentColor"
    />
  </svg>
);

interface BionicTogglePillProps {
  compact?: boolean;
}

export const BionicTogglePill: React.FC<BionicTogglePillProps> = ({ compact = false }) => {
  const { enabled, toggle } = useBionicReading();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      title={
        enabled
          ? 'Bionic Reading is ON (tap to turn off)'
          : 'Turn on Bionic Reading for faster scanning'
      }
      className={`inline-flex shrink-0 items-center gap-1 rounded-xl px-2 py-1 text-[11px] leading-none whitespace-nowrap transition ${
        enabled ? 'callout-spice ring-1 ring-orange-500/55' : 'autumn-pill'
      }`}
    >
      <BionicReadingIcon className="h-3.5 w-3.5" />
      {!compact && (
        <span className="text-[10px] font-extrabold opacity-85">
          {enabled ? 'On' : 'Off'}
        </span>
      )}
    </button>
  );
};
