import React from 'react';
import { BookOpenCheck, Lightbulb } from 'lucide-react';
import { ProfessorBoardData } from '../physics/simulatorsMath';

interface ProfessorBoardProps {
  board: ProfessorBoardData;
}

export const ProfessorBoard: React.FC<ProfessorBoardProps> = ({ board }) => {
  return (
    <section
      aria-label="Pizarra del Profesor: Desarrollo Paso a Paso"
      className="rounded-xl bg-[#111827] border border-slate-800 p-5 sm:p-6 space-y-5"
    >
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <BookOpenCheck className="w-5 h-5 text-sky-400 shrink-0" />
          <h3 className="font-display text-base sm:text-lg font-semibold text-slate-100">
            Pizarra del Profesor: Desarrollo Paso a Paso
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400 whitespace-nowrap">Cálculo en tiempo real (SI)</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Paso 1 */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-400">
            Paso 1 · {board.step1Title}
          </p>
          <ul className="space-y-1.5 text-sm text-slate-300 leading-relaxed">
            {board.step1Body.map((line, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-slate-500 font-mono select-none">•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Paso 2 */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-400">
            Paso 2 · {board.step2Title}
          </p>
          <div className="space-y-2">
            {board.step2Equations.map((eq, i) => (
              <div
                key={i}
                className="px-3.5 py-2.5 rounded-lg bg-[#0B0F17] border border-slate-800 font-mono text-xs sm:text-sm text-amber-200 overflow-x-auto"
              >
                {eq}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Paso 3 */}
      <div className="space-y-2 border-t border-slate-800/80 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-sky-400">
          Paso 3 · {board.step3Title}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {board.step3Substitutions.map((sub, i) => (
            <div
              key={i}
              className="px-3 py-2 rounded-lg bg-[#0B0F17] border border-slate-800/90 font-mono text-xs text-slate-200 overflow-x-auto"
            >
              {sub}
            </div>
          ))}
        </div>
      </div>

      {/* Paso 4 */}
      <div className="rounded-lg bg-[#0B0F17] border border-sky-500/30 p-4 space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="text-xs text-slate-400">{board.step4ResultLabel}</p>
            <p className="font-mono text-xl sm:text-2xl font-bold text-sky-300 mt-0.5">
              {board.step4ResultValue}
            </p>
          </div>
          {board.step4SecondaryResults && board.step4SecondaryResults.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {board.step4SecondaryResults.map((sec, idx) => (
                <div key={idx} className="text-right sm:text-left">
                  <p className="text-[11px] text-slate-400">{sec.label}</p>
                  <p className="font-mono text-sm font-semibold text-slate-200">{sec.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-start gap-2.5 pt-2 border-t border-slate-800/80 text-sm text-slate-300 leading-relaxed">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <span className="font-semibold text-amber-300">Interpretación del Profesor: </span>
            {board.step4Interpretation}
          </p>
        </div>
      </div>
    </section>
  );
};
