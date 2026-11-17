import React, { useState } from 'react';

type FlagLayer = 'union' | 'england' | 'scotland' | 'ireland' | 'wales';

export const UnionJackDiagram: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [layer, setLayer] = useState<FlagLayer>('union');

  const tabs: { id: FlagLayer; label: string; badge: string }[] = [
    { id: 'union', label: 'Union Flag', badge: 'Combined' },
    { id: 'england', label: 'St George', badge: '23 Apr' },
    { id: 'scotland', label: 'St Andrew', badge: '30 Nov' },
    { id: 'ireland', label: 'St Patrick', badge: '17 Mar' },
    { id: 'wales', label: 'Welsh Dragon?', badge: '1 Mar' },
  ];

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-3.5 text-slate-100 shadow-inner">
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <span className="text-xs font-bold tracking-wider text-pink-400 uppercase">
          🇬🇧 Interactive Visual Aid: Anatomy of the Union Flag
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="mx-auto w-full max-w-[230px] shrink-0 overflow-hidden rounded-xl border border-slate-700 shadow-md">
          {layer === 'wales' ? (
            <svg viewBox="0 0 300 180" className="h-auto w-full" role="img" aria-label="Flag of Wales">
              <rect width="300" height="90" fill="#FFFFFF" />
              <rect y="90" width="300" height="90" fill="#16A34A" />
              {/* Stylized Red Dragon emblem */}
              <path
                d="M78 122 C88 86, 122 62, 165 66 C192 68, 212 52, 224 42 C218 68, 204 82, 188 88 C210 95, 228 112, 224 132 L198 124 L182 142 L162 118 L130 124 L108 144 L96 126 Z"
                fill="#DC2626"
              />
              <circle cx="105" cy="88" r="5" fill="#FEF08A" />
              <text
                x="150"
                y="168"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="#FFFFFF"
              >
                Red Dragon of Wales (Not on Union Flag)
              </text>
            </svg>
          ) : (
            <svg viewBox="0 0 300 180" className="h-auto w-full" role="img" aria-label="Union Flag layers">
              {/* Background */}
              <rect
                width="300"
                height="180"
                fill={layer === 'union' || layer === 'scotland' ? '#1E3A8A' : '#FFFFFF'}
              />

              {/* St Andrew's White Diagonal Cross */}
              {(layer === 'union' || layer === 'scotland') && (
                <g>
                  <path d="M0 0 L300 180 M300 0 L0 180" stroke="#FFFFFF" strokeWidth="34" />
                </g>
              )}

              {/* St Patrick's Red Diagonal Cross */}
              {(layer === 'union' || layer === 'ireland') && (
                <g>
                  <path d="M0 0 L300 180 M300 0 L0 180" stroke="#E11D48" strokeWidth="14" />
                </g>
              )}

              {/* St George's White Fimbriation + Red Upright Cross */}
              {(layer === 'union' || layer === 'england') && (
                <g>
                  {layer === 'union' && (
                    <path d="M150 0 V180 M0 90 H300" stroke="#FFFFFF" strokeWidth="50" />
                  )}
                  <path d="M150 0 V180 M0 90 H300" stroke="#E11D48" strokeWidth="30" />
                </g>
              )}
            </svg>
          )}
        </div>

        <div className="flex-1 space-y-2">
          {!compact && (
            <div className="flex flex-wrap gap-1.5">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setLayer(t.id)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    layer === t.id
                      ? 'bg-pink-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {t.label} <span className="opacity-75">({t.badge})</span>
                </button>
              ))}
            </div>
          )}

          <p className="text-xs leading-relaxed text-slate-300">
            {layer === 'union' &&
              'Combines 3 crosses: St George (England), St Andrew (Scotland), and St Patrick (Ireland). Tap a cross above to isolate it!'}
            {layer === 'england' &&
              'Cross of St George (Patron Saint of England, 23 April): upright red cross on a white ground.'}
            {layer === 'scotland' &&
              'Cross of St Andrew (Patron Saint of Scotland, 30 November, official bank holiday in Scotland!): diagonal white cross on a blue ground.'}
            {layer === 'ireland' &&
              'Cross of St Patrick (Patron Saint of Ireland, 17 March, bank holiday in Northern Ireland!): diagonal red cross on a white ground.'}
            {layer === 'wales' &&
              'Exam Trap! Why is the Welsh Dragon NOT on the Union Flag? Because Wales was already united with England when the first Union Flag was created in 1606!'}
          </p>
        </div>
      </div>
    </div>
  );
};
