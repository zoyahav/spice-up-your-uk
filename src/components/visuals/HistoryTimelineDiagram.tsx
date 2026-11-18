import React, { useState } from 'react';
import type { SubtopicId } from '../../types/domain';

interface TimelineEra {
  readonly id: string;
  readonly year: string;
  readonly title: string;
  readonly note: string;
  readonly color: string;
  readonly subtopics: readonly SubtopicId[];
}

const ERAS: readonly TimelineEra[] = [
  {
    id: 'stone-age',
    year: '10,000-4,000 yrs ago',
    title: 'Stone Age Britain',
    note: 'Hunter-gatherers were first inhabitants; Channel cut Britain off ~10,000 yrs ago; first farmers ~6,000 yrs ago; Stonehenge & Skara Brae',
    color: 'bg-amber-600',
    subtopics: ['ch3-early-roman'],
  },
  {
    id: 'bronze-iron',
    year: '4,000 yrs ago-AD 43',
    title: 'Bronze & Iron Age',
    note: 'Bronze tools, gold ornaments & round barrows; Iron Age hill forts (Maiden Castle), Celtic language & first British coins',
    color: 'bg-yellow-600',
    subtopics: ['ch3-early-roman'],
  },
  {
    id: 'romans',
    year: '55 BC / AD 43-410',
    title: 'Roman Britain',
    note: 'Caesar failed (55 BC); Claudius conquered (AD 43); Boudicca (Iceni); Hadrian’s Wall (Housesteads & Vindolanda)',
    color: 'bg-orange-600',
    subtopics: ['ch3-early-roman'],
  },
  {
    id: 'anglo-viking',
    year: 'AD 410-1066',
    title: 'Anglo-Saxons & Vikings',
    note: 'Sutton Hoo burial; St Augustine (Canterbury) & St Columba (Iona); AD 789 Vikings & Danelaw; King Alfred the Great',
    color: 'bg-amber-700',
    subtopics: ['ch3-anglo-norman'],
  },
  {
    id: 'middle-ages',
    year: '1066-1485',
    title: '1066 & Middle Ages',
    note: '1066 William wins Hastings (Bayeux Tapestry, Domesday Book); 1215 Magna Carta; 1314 Bannockburn; 1348 Black Death; 1415 Agincourt; 1485 Bosworth',
    color: 'bg-orange-700',
    subtopics: ['ch3-anglo-norman', 'ch3-middle-ages'],
  },
  {
    id: 'tudors',
    year: '1485-1603',
    title: 'The Tudors',
    note: 'Henry VIII establishes Church of England & 6 wives; Elizabeth I defeats 1588 Spanish Armada; William Shakespeare',
    color: 'bg-rose-600',
    subtopics: ['ch3-tudors-stuarts'],
  },
  {
    id: 'stuarts',
    year: '1603-1689',
    title: 'Stuarts & Republic',
    note: '1603 James VI/I; 1605 Gunpowder Plot; 1649 Charles I executed & Cromwell; 1660 Restoration; 1666 Great Fire; 1688 Glorious Rev & Bill of Rights',
    color: 'bg-rose-700',
    subtopics: ['ch3-tudors-stuarts'],
  },
  {
    id: 'empire-industry',
    year: '1707-1901',
    title: 'Union, Industry & Victoria',
    note: '1707 GB Act of Union; Walpole (1st PM); Watt, Arkwright & Brunel; 1807/1833 Slavery abolished; Trafalgar (1805) & Waterloo (1815); Queen Victoria',
    color: 'bg-emerald-600',
    subtopics: ['ch3-empire-industry'],
  },
  {
    id: 'world-wars',
    year: '1914-1945',
    title: 'World Wars & Votes',
    note: 'WWI (1916 Somme, 11 Nov 1918); 1918 (30+) & 1928 (21+) Women’s Vote; 1922 Ireland partition; 1928 Penicillin; WWII (Churchill, Dunkirk, Battle of Britain, D-Day)',
    color: 'bg-amber-600',
    subtopics: ['ch3-world-wars'],
  },
  {
    id: 'modern-uk',
    year: '1945-Now',
    title: 'Modern UK',
    note: '1948 NHS (Bevan) & Windrush; 1979 Thatcher (1st female PM); 1998 Good Friday & 1999 Devolution; 2016/2020 Brexit; Elizabeth II & King Charles III',
    color: 'bg-orange-500',
    subtopics: ['ch3-modern-britain'],
  },
] as const;

export const HistoryTimelineDiagram: React.FC<{
  compact?: boolean;
  highlightSubtopicId?: SubtopicId;
}> = ({ compact = false, highlightSubtopicId }) => {
  const [showAllInCompact, setShowAllInCompact] = useState(false);

  const matchingEras = highlightSubtopicId
    ? ERAS.filter((e) => e.subtopics.includes(highlightSubtopicId))
    : [];

  const filterToMatching = compact && matchingEras.length > 0 && !showAllInCompact;
  const visibleEras = filterToMatching ? matchingEras : ERAS;

  return (
    <div className="autumn-card rounded-2xl p-3.5">
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
        <span className="accent-amber text-xs font-bold tracking-wider uppercase">
          ⏳ British History Timeline (Stone Age to Today)
        </span>
        {compact && matchingEras.length > 0 && (
          <button
            type="button"
            onClick={() => setShowAllInCompact((v) => !v)}
            className="autumn-pill rounded-lg px-2 py-0.5 text-[10px] font-bold transition"
          >
            {showAllInCompact ? 'Show this era only' : `Show all ${ERAS.length} eras`}
          </button>
        )}
      </div>
      <div
        className={`grid gap-2 ${
          visibleEras.length === 1
            ? 'grid-cols-1'
            : visibleEras.length <= 3
              ? 'grid-cols-1 sm:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2'
        }`}
      >
        {visibleEras.map((e) => {
          const isHighlighted = Boolean(
            highlightSubtopicId && e.subtopics.includes(highlightSubtopicId),
          );
          return (
            <div
              key={e.id}
              className={`rounded-xl p-2.5 transition ${
                isHighlighted
                  ? 'callout-spice ring-1 ring-orange-500/55'
                  : 'autumn-inset'
              }`}
            >
              <div className="flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5">
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${e.color}`} />
                  <span className="text-[11px] font-extrabold">{e.year}</span>
                </div>
                {isHighlighted && !filterToMatching && (
                  <span className="rounded bg-orange-600 px-1.5 py-0.5 text-[9px] font-bold text-[#FAF1E6]">
                    This topic
                  </span>
                )}
              </div>
              <p className="accent-spice mt-1 text-xs font-bold">{e.title}</p>
              <p className="autumn-soft mt-0.5 text-[11px] leading-snug">{e.note}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
