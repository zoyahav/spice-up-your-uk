import React, { useState } from 'react';

interface MapHotspot {
  readonly id: string;
  readonly label: string;
  readonly x: number;
  readonly y: number;
  readonly color: string;
  readonly detail: string;
}

const HOTSPOTS: readonly MapHotspot[] = [
  {
    id: 'edinburgh',
    label: 'Edinburgh (Scotland)',
    x: 152,
    y: 112,
    color: '#F59E0B',
    detail: 'Capital of Scotland • Scottish Parliament (129 MSPs) • Edinburgh Castle & Fringe.',
  },
  {
    id: 'skara',
    label: 'Skara Brae (Orkney)',
    x: 162,
    y: 26,
    color: '#FBBF24',
    detail: 'Best-preserved prehistoric Stone Age village in northern Europe (off north Scotland).',
  },
  {
    id: 'hadrian',
    label: "Hadrian's Wall",
    x: 158,
    y: 146,
    color: '#F97316',
    detail: 'Built by Roman Emperor Hadrian (Housesteads & Vindolanda forts) to keep out the Picts.',
  },
  {
    id: 'belfast',
    label: 'Belfast & Giant’s Causeway',
    x: 92,
    y: 168,
    color: '#10B981',
    detail: 'Capital of Northern Ireland (Stormont, 90 MLAs) • Giant’s Causeway basalt columns on NE coast.',
  },
  {
    id: 'isle-of-man',
    label: 'Isle of Man',
    x: 118,
    y: 176,
    color: '#D97706',
    detail: 'Crown Dependency (NOT part of the UK!) • Tynwald is the world’s oldest continuous parliament.',
  },
  {
    id: 'snowdonia',
    label: 'Snowdonia (North Wales)',
    x: 128,
    y: 222,
    color: '#FB7185',
    detail: 'National Park in North Wales • Mount Snowdon is the highest peak in Wales.',
  },
  {
    id: 'cardiff',
    label: 'Cardiff (Wales)',
    x: 138,
    y: 268,
    color: '#E11D48',
    detail: 'Capital of Wales • Senedd Cymru / Welsh Parliament (60 MSs).',
  },
  {
    id: 'london',
    label: 'London (England)',
    x: 204,
    y: 272,
    color: '#EA580C',
    detail: 'Capital of England & the UK • Westminster (650 MPs), Big Ben (Elizabeth Tower), Tower of London.',
  },
  {
    id: 'stonehenge',
    label: 'Stonehenge & Eden Project',
    x: 156,
    y: 290,
    color: '#EAB308',
    detail: 'Stonehenge in Wiltshire (Neolithic) & Eden Project biomes further SW in Cornwall!',
  },
  {
    id: 'channel',
    label: 'Channel Islands',
    x: 162,
    y: 332,
    color: '#B45309',
    detail: 'Jersey & Guernsey: Crown Dependencies linked to the Monarch, NOT part of the UK!',
  },
];

export const UkNationsMap: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [selected, setSelected] = useState<MapHotspot>(HOTSPOTS[0]!);

  return (
    <div className="autumn-card rounded-2xl p-3.5">
      <div className="mb-2 flex items-center justify-between">
        <span className="accent-amber text-xs font-bold tracking-wider uppercase">
          🗺️ Interactive UK Nations, Capitals &amp; Landmarks Map
        </span>
        <span className="autumn-muted text-[11px]">Tap any pin</span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <svg
          viewBox="0 0 280 355"
          className="autumn-map-canvas mx-auto h-auto w-full max-w-[215px] shrink-0 rounded-xl p-2"
          role="img"
          aria-label="Stylized map of the UK and Crown Dependencies"
        >
          {/* Orkney */}
          <rect x="152" y="18" width="18" height="14" rx="4" fill="#B45309" opacity="0.85" />
          {/* Scotland */}
          <path
            d="M122 44 L172 42 L184 82 L166 112 L176 134 L144 146 L118 128 L112 86 Z"
            fill="#92400E"
            stroke="#F59E0B"
            strokeWidth="2"
          />
          {/* Northern Ireland */}
          <path
            d="M64 148 L102 144 L108 178 L78 188 L58 172 Z"
            fill="#065F46"
            stroke="#34D399"
            strokeWidth="2"
          />
          {/* Isle of Man */}
          <circle cx="118" cy="176" r="6" fill="#78350F" stroke="#FDE68A" strokeWidth="1.5" />
          {/* England */}
          <path
            d="M144 146 L178 136 L212 192 L232 246 L224 286 L168 298 L112 314 L104 302 L144 276 L150 210 L132 178 Z"
            fill="#9A3412"
            stroke="#FB923C"
            strokeWidth="2"
          />
          {/* Wales */}
          <path
            d="M122 212 L150 212 L152 272 L116 274 L108 250 L118 228 Z"
            fill="#9F1239"
            stroke="#FDA4AF"
            strokeWidth="2"
          />
          {/* Channel Islands */}
          <circle cx="156" cy="332" r="4.5" fill="#D97706" />
          <circle cx="170" cy="336" r="4.5" fill="#D97706" />

          {/* Interactive Pins */}
          {HOTSPOTS.map((h) => {
            const isSel = selected.id === h.id;
            return (
              <g
                key={h.id}
                onClick={() => setSelected(h)}
                className="cursor-pointer"
              >
                {isSel && (
                  <circle cx={h.x} cy={h.y} r="12" fill={h.color} opacity="0.3" />
                )}
                <circle
                  cx={h.x}
                  cy={h.y}
                  r={isSel ? 6.5 : 5}
                  fill={h.color}
                  stroke="#FFFDF9"
                  strokeWidth="2"
                />
              </g>
            );
          })}
        </svg>

        <div className="flex-1 space-y-2">
          <div className="autumn-inset rounded-xl p-3">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: selected.color }}
              />
              <h4 className="text-sm font-bold">{selected.label}</h4>
            </div>
            <p className="autumn-soft mt-1 text-xs leading-relaxed">{selected.detail}</p>
          </div>

          {!compact && (
            <div className="flex flex-wrap gap-1">
              {HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setSelected(h)}
                  className={`rounded-md px-2 py-0.5 text-[11px] font-semibold transition ${
                    selected.id === h.id
                      ? 'bg-orange-600 text-white'
                      : 'autumn-pill'
                  }`}
                >
                  {h.label.split(' ')[0]}
                </button>
              ))}
            </div>
          )}

          <p className="accent-amber text-[11px]">
            🌶️ Remember: <strong>Great Britain</strong> = England + Scotland + Wales (3).{' '}
            <strong>UK</strong> adds Northern Ireland (4). Isle of Man &amp; Channel Islands are{' '}
            <strong>Crown Dependencies</strong> (not in UK)!
          </p>
        </div>
      </div>
    </div>
  );
};
