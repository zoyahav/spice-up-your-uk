import React from 'react';

const NATIONS = [
  {
    nation: 'England',
    capital: 'London',
    saint: 'St George',
    date: '23 April',
    bankHoliday: false,
    flower: 'Tudor Rose',
    color: 'border-rose-500/50 bg-rose-950/30',
    badgeColor: 'bg-rose-600',
    svg: (
      <svg viewBox="0 0 48 48" className="h-10 w-10">
        <circle cx="24" cy="24" r="18" fill="#E11D48" />
        <circle cx="24" cy="24" r="10" fill="#FFF1F2" />
        <circle cx="24" cy="24" r="5" fill="#FACC15" />
      </svg>
    ),
  },
  {
    nation: 'Scotland',
    capital: 'Edinburgh',
    saint: 'St Andrew',
    date: '30 November',
    bankHoliday: true,
    flower: 'Thistle',
    color: 'border-sky-500/50 bg-sky-950/30',
    badgeColor: 'bg-sky-600',
    svg: (
      <svg viewBox="0 0 48 48" className="h-10 w-10">
        <path d="M16 22 L24 8 L32 22 Z" fill="#A855F7" />
        <ellipse cx="24" cy="28" rx="9" ry="8" fill="#15803D" />
        <path d="M24 36 V44" stroke="#16A34A" strokeWidth="3" />
      </svg>
    ),
  },
  {
    nation: 'Wales',
    capital: 'Cardiff',
    saint: 'St David',
    date: '1 March',
    bankHoliday: false,
    flower: 'Daffodil (& Leek)',
    color: 'border-amber-500/50 bg-amber-950/30',
    badgeColor: 'bg-amber-600',
    svg: (
      <svg viewBox="0 0 48 48" className="h-10 w-10">
        <circle cx="24" cy="20" r="13" fill="#FDE047" />
        <circle cx="24" cy="20" r="6" fill="#F97316" />
        <path d="M24 33 V44" stroke="#22C55E" strokeWidth="3" />
      </svg>
    ),
  },
  {
    nation: 'Northern Ireland',
    capital: 'Belfast',
    saint: 'St Patrick',
    date: '17 March',
    bankHoliday: true,
    flower: 'Shamrock',
    color: 'border-emerald-500/50 bg-emerald-950/30',
    badgeColor: 'bg-emerald-600',
    svg: (
      <svg viewBox="0 0 48 48" className="h-10 w-10">
        <circle cx="18" cy="20" r="8" fill="#10B981" />
        <circle cx="30" cy="20" r="8" fill="#10B981" />
        <circle cx="24" cy="12" r="8" fill="#10B981" />
        <path d="M24 24 Q24 36 20 42" stroke="#059669" strokeWidth="3" fill="none" />
      </svg>
    ),
  },
] as const;

export const NationalEmblemsGrid: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-3.5 text-slate-100">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-xs font-bold tracking-wider text-amber-400 uppercase">
          🌼 Patron Saints, Capitals &amp; National Flowers Cheat Matrix
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {NATIONS.map((n) => (
          <div
            key={n.nation}
            className={`flex items-center gap-3 rounded-xl border p-2.5 ${n.color}`}
          >
            <div className="shrink-0">{n.svg}</div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <p className="text-xs font-bold text-white">{n.nation}</p>
                {n.bankHoliday && (
                  <span className="shrink-0 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300">
                    Official Bank Holiday!
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-300">
                Capital: <strong>{n.capital}</strong> • Flower: <span className="text-amber-200">{n.flower}</span>
              </p>
              <p className="text-[11px] font-semibold text-pink-300">
                {n.saint} • {n.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
