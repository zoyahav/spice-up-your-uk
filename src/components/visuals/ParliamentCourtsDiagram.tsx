import React, { useState } from 'react';

type GovTab = 'westminster' | 'devolved' | 'courts';

export const ParliamentCourtsDiagram: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [tab, setTab] = useState<GovTab>('westminster');

  return (
    <div className="autumn-card rounded-2xl p-3.5">
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
        <span className="accent-amber text-xs font-bold tracking-wider uppercase">
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
                    ? 'bg-orange-600 text-white shadow'
                    : 'autumn-pill'
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
          <div className="callout-amber rounded-xl p-2.5 text-center">
            <p className="font-extrabold">👑 King Charles III: Head of State</p>
            <p className="mt-0.5 text-[11px] opacity-90">
              Ceremonial role • Opens Parliament (King’s Speech) • Weekly PM audience • Royal Assent
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="callout-emerald rounded-xl p-2.5">
              <p className="font-extrabold">🟢 House of Commons</p>
              <p className="mt-0.5 text-[11px] opacity-95">
                <strong>650 MPs</strong> elected via <strong>First Past the Post</strong> (max 5 yrs).
                More powerful chamber! Chaired by neutral <strong>Speaker</strong>.
              </p>
            </div>
            <div className="callout-rose rounded-xl p-2.5">
              <p className="font-extrabold">🔴 House of Lords</p>
              <p className="mt-0.5 text-[11px] opacity-95">
                Unelected: Life Peers, 26 C of E Bishops &amp; hereditary peers. Scrutinises &amp;
                suggests amendments.
              </p>
            </div>
          </div>
          <div className="callout-spice rounded-xl p-2.5 text-center">
            <p className="font-extrabold">💼 Prime Minister &amp; ~20 Cabinet Ministers</p>
            <p className="mt-0.5 text-[11px] opacity-95">
              PMQs every Wednesday • Chancellor (Economy) • Home Sec (Police/Borders) • Foreign Sec
            </p>
          </div>
        </div>
      )}

      {tab === 'devolved' && (
        <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-3">
          <div className="callout-amber rounded-xl p-2.5">
            <p className="font-extrabold">🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland (1999)</p>
            <p className="mt-0.5 text-[11px] opacity-95">
              Edinburgh (Holyrood) • <strong>129 MSPs</strong> • Proportional Representation • Health,
              education, justice &amp; some tax.
            </p>
          </div>
          <div className="callout-rose rounded-xl p-2.5">
            <p className="font-extrabold">🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales (1999)</p>
            <p className="mt-0.5 text-[11px] opacity-95">
              Cardiff (Senedd) • <strong>60 MSs</strong> • Proportional Representation • Health,
              education, transport, Welsh language.
            </p>
          </div>
          <div className="callout-emerald rounded-xl p-2.5">
            <p className="font-extrabold">🇬🇧 N. Ireland (1998)</p>
            <p className="mt-0.5 text-[11px] opacity-95">
              Belfast (Stormont) • <strong>90 MLAs</strong> • Power-sharing from Good Friday Agreement.
            </p>
          </div>
        </div>
      )}

      {tab === 'courts' && (
        <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
          <div className="callout-spice rounded-xl p-2.5">
            <p className="font-extrabold">⚖️ Criminal Law</p>
            <p className="mt-0.5 text-[11px] opacity-95">
              • Minor: <strong>Magistrates’</strong> (E/W/NI) or <strong>JP Court</strong> (Scot).
              <br />• Serious: <strong>Crown Court (12 jury)</strong> vs Scotland{' '}
              <strong>Sheriff/High Court (15 jury + &quot;Not Proven&quot;!)</strong>.
              <br />• Youth: 10 to 17 (Children’s Hearings in Scotland).
            </p>
          </div>
          <div className="callout-amber rounded-xl p-2.5">
            <p className="font-extrabold">📜 Civil Law &amp; Supreme Court</p>
            <p className="mt-0.5 text-[11px] opacity-95">
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
