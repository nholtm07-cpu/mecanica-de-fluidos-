import React from 'react';
import { SlideDiagramType } from '../../data/lectureTypes';
import { LectureDiagramsPart1 } from './LectureDiagramsPart1';
import { LectureDiagramsPart2 } from './LectureDiagramsPart2';

interface LectureDiagramsProps {
  type: SlideDiagramType;
  caption: string;
}

export const LectureDiagrams: React.FC<LectureDiagramsProps> = ({ type, caption }) => {
  return (
    <div className="space-y-1.5">
      <LectureDiagramsPart1 type={type} />
      <LectureDiagramsPart2 type={type} />
      <p className="text-xs text-slate-400 italic">{caption}</p>
    </div>
  );
};
