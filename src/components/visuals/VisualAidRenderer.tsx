import React from 'react';
import type { SubtopicId, VisualAidId } from '../../types/domain';
import { UnionJackDiagram } from './UnionJackDiagram';
import { UkNationsMap } from './UkNationsMap';
import { NationalEmblemsGrid } from './NationalEmblemsGrid';
import { ParliamentCourtsDiagram } from './ParliamentCourtsDiagram';
import { HistoryTimelineDiagram } from './HistoryTimelineDiagram';

export const VisualAidRenderer: React.FC<{
  visualId: VisualAidId;
  compact?: boolean;
  highlightSubtopicId?: SubtopicId;
}> = ({ visualId, compact = false, highlightSubtopicId }) => {
  switch (visualId) {
    case 'union-jack':
      return <UnionJackDiagram compact={compact} />;
    case 'uk-map':
      return <UkNationsMap compact={compact} />;
    case 'national-emblems':
      return <NationalEmblemsGrid />;
    case 'parliament-courts':
      return <ParliamentCourtsDiagram compact={compact} />;
    case 'history-timeline':
      return (
        <HistoryTimelineDiagram
          compact={compact}
          highlightSubtopicId={highlightSubtopicId}
        />
      );
  }
};
