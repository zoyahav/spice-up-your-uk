import React, { useState } from 'react';

type GovTab = 'westminster' | 'devolved' | 'courts';

export const ParliamentCourtsDiagram: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [tab, setTab] = useState<GovTab>('westminster');

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-3.5 text-slate-100">
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-bold tracking-wider text-indigo-400 uppercase">
          🏛️ Visual Aid: UK Government, Devolution &amp; Courts
        </span>
        {!compact && (
          <div className="flex gap-1">
            {(
              [
                ['westminster', 'Parliament'],
                ['devolved', 'Devolved (3)'],
                ['courts', 'Courts & Jury'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  tab === id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {tab === 'westminster' && (
        <div className="space-y-2 text-xs">
          <div className="rounded-xl border border-amber-500/40 bg-amber-950/30 p-2.5 text-center">
            <p className="font-bold text-amber-300">👑 King Charles III: Head of State</p>
            <p className="text-[11px] text-slate-300">
              Ceremonial role • Opens Parliament (King’s Speech) • Weekly PM audience • Royal Assent
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-2.5">
              <p className="font-bold text-emerald-300">🟢 House of Commons</p>
              <p className="mt-0.5 text-[11px] text-slate-300">
                <strong>650 MPs</strong> elected via <strong>First Past the Post</strong> (max 5 yrs).
                More powerful chamber! Chaired by neutral <strong>Speaker</strong>.
              </p>
            </div>
            <div className="rounded-xl border border-rose-500/40 bg-rose-950/30 p-2.5">
              <p className="font-bold text-rose-300">🔴 House of Lords</p>
              <p className="mt-0.5 text-[11px] text-slate-300">
                Unelected: Life Peers, 26 C of E Bishops &amp; hereditary peers. Scrutinises &amp;
                suggests amendments.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-indigo-500/40 bg-indigo-950/30 p-2.5 text-center">
            <p className="font-bold text-indigo-300">💼 Prime Minister &amp; ~20 Cabinet Ministers</p>
            <p className="text-[11px] text-slate-300">
              PMQs every Wednesday • Chancellor (Economy) • Home Sec (Police/Borders) • Foreign Sec
            </p>
          </div>
        </div>
      )}

      {tab === 'devolved' && (
        <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-3">
          <div className="rounded-xl border border-sky-500/40 bg-sky-950/30 p-2.5">
            <p className="font-bold text-sky-300">🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland (1999)</p>
            <p className="text-[11px] text-slate-300">
              Edinburgh (Holyrood) • <strong>129 MSPs</strong> • Proportional Representation • Health,
              education, justice &amp; some tax.
            </p>
          </div>
          <div className="rounded-xl border border-rose-500/40 bg-rose-950/30 p-2.5">
            <p className="font-bold text-rose-300">🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales (1999)</p>
            <p className="text-[11px] text-slate-300">
              Cardiff (Senedd) • <strong>60 MSs</strong> • Proportional Representation • Health,
              education, transport, Welsh language.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-2.5">
            <p className="font-bold text-emerald-300">🇬🇧 N. Ireland (1998)</p>
            <p className="text-[11px] text-slate-300">
              Belfast (Stormont) • <strong>90 MLAs</strong> • Power-sharing from Good Friday Agreement.
            </p>
          </div>
        </div>
      )}

      {tab === 'courts' && (
        <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
          <div className="rounded-xl border border-pink-500/40 bg-pink-950/30 p-2.5">
            <p className="font-bold text-pink-300">⚖️ Criminal Law</p>
            <p className="mt-0.5 text-[11px] text-slate-300">
              • Minor: <strong>Magistrates’</strong> (E/W/NI) or <strong>JP Court</strong> (Scot).
              <br />• Serious: <strong>Crown Court (12 jury)</strong> vs Scotland{' '}
              <strong>Sheriff/High Court (15 jury + &quot;Not Proven&quot;!)</strong>.
              <br />• Youth: 10–17 (Children’s Hearings in Scotland).
            </p>
          </div>
          <div className="rounded-xl border border-cyan-500/40 bg-cyan-950/30 p-2.5">
            <p className="font-bold text-cyan-300">📜 Civil Law &amp; Supreme Court</p>
            <p className="mt-0.5 text-[11px] text-slate-300">
              • County Court / High Court (Sheriff Court in Scotland).
              <br />• <strong>Small Claims</strong>: up to <strong>£10,000</strong> (England &amp; Wales)
              vs <strong>£5,000</strong> (Scotland &amp; NI)!
              <br />• Top appeal court: <strong>UK Supreme Court</strong>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
