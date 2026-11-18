import React, { useEffect, useState } from 'react';
import { Calculator, CheckCircle2, ChevronRight, Eye, RotateCcw } from 'lucide-react';
import { WorkedExercise } from '../../data/lectureTypes';

interface LectureExerciseCardProps {
  exercises?: WorkedExercise[];
  slideId: string;
}

const STEP_LABELS = [
  '1) Datos y Conversión al SI',
  '2) Planteamiento Físico',
  '3) Desarrollo Matemático línea por línea',
  '4) Conclusión e Interpretación del Profesor',
];

export const LectureExerciseCard: React.FC<LectureExerciseCardProps> = ({ exercises, slideId }) => {
  const [selectedExIdx, setSelectedExIdx] = useState(0);
  const [revealedStage, setRevealedStage] = useState(1);

  useEffect(() => {
    setSelectedExIdx(0);
    setRevealedStage(1);
  }, [slideId]);

  if (!exercises || exercises.length === 0) return null;

  const activeEx = exercises[selectedExIdx] ?? exercises[0];

  const handleSelectExercise = (idx: number) => {
    setSelectedExIdx(idx);
    setRevealedStage(1);
  };

  return (
    <section
      aria-label="Ejercicio de Cátedra Paso a Paso"
      className="rounded-xl bg-[#0B0F17] border border-emerald-500/35 p-4 sm:p-5 space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-emerald-400 shrink-0" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
            Ejercicio de Cátedra Paso a Paso
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400">{activeEx.source}</span>
      </div>

      {/* Multiple exercises switcher if slide has > 1 */}
      {exercises.length > 1 && (
        <div className="flex flex-wrap gap-1.5">
          {exercises.map((ex, idx) => (
            <button
              key={ex.id}
              type="button"
              onClick={() => handleSelectExercise(idx)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                idx === selectedExIdx
                  ? 'bg-emerald-500 text-slate-950 font-semibold'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Problema {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Statement */}
      <div className="space-y-1.5">
        <h4 className="font-display text-sm sm:text-base font-bold text-slate-100">
          {activeEx.title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeEx.statement}</p>
      </div>

      {/* Progress / Reveal Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex flex-wrap gap-1.5">
          {STEP_LABELS.map((label, idx) => {
            const stageNum = idx + 1;
            const unlocked = revealedStage >= stageNum;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setRevealedStage(stageNum)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                  unlocked
                    ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40'
                    : 'bg-slate-900 text-slate-500 border border-slate-800 hover:text-slate-300'
                }`}
              >
                Paso {stageNum}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {revealedStage < 4 ? (
            <button
              type="button"
              onClick={() => setRevealedStage((s) => Math.min(4, s + 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Revelar Paso {revealedStage + 1}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setRevealedStage(1)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar pasos</span>
            </button>
          )}
          {revealedStage < 4 && (
            <button
              type="button"
              onClick={() => setRevealedStage(4)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver todo</span>
            </button>
          )}
        </div>
      </div>

      {/* Progressive Steps Content */}
      <div className="space-y-3">
        {revealedStage >= 1 && (
          <div className="rounded-lg bg-slate-900/70 border border-slate-800 p-3 space-y-1.5">
            <div className="text-xs font-semibold text-sky-300">{STEP_LABELS[0]}</div>
            <ul className="space-y-1 font-mono text-xs text-slate-200">
              {activeEx.step1DataSI.map((line, i) => (
                <li key={i}>• {line}</li>
              ))}
            </ul>
          </div>
        )}

        {revealedStage >= 2 && (
          <div className="rounded-lg bg-slate-900/70 border border-slate-800 p-3 space-y-1.5">
            <div className="text-xs font-semibold text-amber-300">{STEP_LABELS[1]}</div>
            <ul className="space-y-1 text-xs sm:text-sm text-slate-200 leading-relaxed">
              {activeEx.step2Physics.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        )}

        {revealedStage >= 3 && (
          <div className="rounded-lg bg-slate-900/90 border border-amber-500/30 p-3 space-y-1.5">
            <div className="text-xs font-semibold text-amber-200">{STEP_LABELS[2]}</div>
            <div className="space-y-1 font-mono text-xs text-amber-100 leading-relaxed">
              {activeEx.step3Math.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        )}

        {revealedStage >= 4 && (
          <div className="rounded-lg bg-emerald-950/35 border border-emerald-500/35 p-3 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs font-semibold text-emerald-300">{STEP_LABELS[3]}</div>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                {activeEx.step4Conclusion}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
