import React from 'react';

const ERAS = [
  { year: 'AD 43–410', title: 'Roman Britain', note: 'Claudius invades, Boudicca, Hadrian’s Wall', color: 'bg-orange-500' },
  { year: '1066', title: 'Norman Conquest', note: 'William defeats Harold at Hastings; Domesday Book', color: 'bg-amber-500' },
  { year: '1215', title: 'Magna Carta', note: 'King John subject to law; 1314 Bannockburn; 1348 Plague', color: 'bg-yellow-500' },
  { year: '1485–1603', title: 'The Tudors', note: 'Henry VIII C of E & 6 wives; Elizabeth I & 1588 Armada', color: 'bg-rose-500' },
  { year: '1642–1689', title: 'Stuarts & Republic', note: '1649 Cromwell; 1660 Restoration; 1688 Glorious Rev.', color: 'bg-purple-500' },
  { year: '1707–1901', title: 'Union & Industry', note: '1707 GB Union; Walpole; 1807/1833 Abolition; Victoria', color: 'bg-sky-500' },
  { year: '1914–1945', title: 'World Wars & Vote', note: '1918/1928 Women’s Vote; Churchill; Battle of Britain', color: 'bg-indigo-500' },
  { year: '1948–Now', title: 'Modern UK', note: '1948 NHS (Bevan); 1998 Peace & Devolution; Charles III', color: 'bg-pink-500' },
] as const;

export const HistoryTimelineDiagram: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-3.5 text-slate-100">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-xs font-bold tracking-wider text-amber-400 uppercase">
          ⏳ High-Yield British History Spine (Scroll / Scan)
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {ERAS.map((e) => (
          <div
            key={e.year}
            className="rounded-xl border border-slate-700/80 bg-slate-950/70 p-2.5"
          >
            <div className="flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${e.color}`} />
              <span className="text-[11px] font-extrabold text-white">{e.year}</span>
            </div>
            <p className="mt-1 text-xs font-bold text-pink-300">{e.title}</p>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-300">{e.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
