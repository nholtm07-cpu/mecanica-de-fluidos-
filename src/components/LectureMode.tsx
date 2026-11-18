import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Atom,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Lightbulb,
} from 'lucide-react';
import { LECTURE_UNITS } from '../data/lectureData';
import { LectureDiagrams } from './lecture/LectureDiagrams';
import { FormulaDictionary } from './lecture/FormulaDictionary';
import { LectureExerciseCard } from './lecture/LectureExerciseCard';

interface LectureModeProps {
  onSlideViewed: (slideId: string) => void;
}

export const LectureMode: React.FC<LectureModeProps> = ({ onSlideViewed }) => {
  const [unitIdx, setUnitIdx] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);
  const [openPanels, setOpenPanels] = useState<{ step: boolean; why: boolean; tips: boolean }>({
    step: true,
    why: true,
    tips: true,
  });

  const currentUnit = LECTURE_UNITS[unitIdx] ?? LECTURE_UNITS[0];
  const currentSlide = currentUnit.slides[slideIdx] ?? currentUnit.slides[0];

  useEffect(() => {
    onSlideViewed(currentSlide.id);
  }, [currentSlide.id, onSlideViewed]);

  const handleSelectUnit = (idx: number) => {
    setUnitIdx(idx);
    setSlideIdx(0);
  };

  const handlePrevSlide = () => {
    if (slideIdx > 0) {
      setSlideIdx(slideIdx - 1);
    } else if (unitIdx > 0) {
      const prevUnit = LECTURE_UNITS[unitIdx - 1];
      setUnitIdx(unitIdx - 1);
      setSlideIdx(prevUnit.slides.length - 1);
    }
  };

  const handleNextSlide = () => {
    if (slideIdx < currentUnit.slides.length - 1) {
      setSlideIdx(slideIdx + 1);
    } else if (unitIdx < LECTURE_UNITS.length - 1) {
      setUnitIdx(unitIdx + 1);
      setSlideIdx(0);
    }
  };

  return (
    <div className="space-y-5">
      {/* Curriculum Header + 7-Unit Progressive Selector */}
      <div className="space-y-4 border-b border-slate-800 pb-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-100">
              Cátedra Interactiva (PPT Dinámico + Profesor al Lado)
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Curso progresivo desde Unidad 0 a Unidad 6 · Basado en cátedra UTFSM (MEC120), Çengel y Fox &amp; McDonald.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400 tabular-nums shrink-0">
            7 Unidades · {LECTURE_UNITS.reduce((acc, u) => acc + u.slides.length, 0)} Diapositivas Interactivas
          </div>
        </div>

        <nav aria-label="Unidades del curso" className="flex flex-wrap gap-1.5 bg-[#111827] p-1.5 rounded-xl border border-slate-800">
          {LECTURE_UNITS.map((unit, idx) => (
            <button
              key={unit.id}
              type="button"
              onClick={() => handleSelectUnit(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                idx === unitIdx
                  ? 'bg-sky-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              U{unit.unitNumber} · {unit.shortTitle}
            </button>
          ))}
        </nav>

        {/* Unit Summary & Clickable Topic Strip */}
        <div className="rounded-xl bg-[#111827]/70 border border-slate-800/90 px-4 py-3 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-slate-200">{currentUnit.title}</span>
            <span className="font-mono text-slate-400">{currentUnit.reference}</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{currentUnit.summary}</p>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {currentUnit.slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSlideIdx(idx)}
                className={`px-2.5 py-1 rounded-md text-xs text-left transition-colors cursor-pointer ${
                  idx === slideIdx
                    ? 'bg-sky-500/20 text-sky-200 border border-sky-400/50 font-semibold'
                    : 'bg-[#0B0F17] text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span className="font-mono mr-1">{s.slideNumber}.</span>
                <span>{s.title.split(':')[0].split(',')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split: Dynamic Slide Stage (Left 7 cols) + Professor Side Deck (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Presentation Slide */}
        <article className="lg:col-span-7 rounded-xl bg-[#111827] border border-slate-800 p-5 sm:p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <span className="font-medium text-sky-300">
              Unidad {currentUnit.unitNumber} · Tema {currentSlide.slideNumber} de {currentUnit.slides.length}
            </span>
            <span className="font-mono tabular-nums">{currentSlide.id.toUpperCase()}</span>
          </div>

          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-100 leading-snug">
              {currentSlide.title}
            </h2>
            <p className="text-sm text-sky-400 mt-1">{currentSlide.subtitle}</p>
          </div>

          {/* 1. Humanized Analogy Section: ¡Entendámoslo en simple! */}
          <section
            aria-label="Entendámoslo en simple"
            className="rounded-xl bg-sky-950/25 border border-sky-500/35 p-4 space-y-1.5"
          >
            <div className="flex items-center gap-2 text-sky-300">
              <Lightbulb className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">
                ¡Entendámoslo en simple! · {currentSlide.simpleExplanation.analogyTitle}
              </span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              {currentSlide.simpleExplanation.body}
            </p>
          </section>

          {/* 2. Pure SVG / Canvas Interactive PPT Figure */}
          <LectureDiagrams type={currentSlide.diagramType} caption={currentSlide.diagramCaption} />

          {/* 3. Progressive Logical Walkthrough */}
          <section aria-label="Desarrollo Conceptual" className="space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Desarrollo Lógico Paso a Paso
            </h3>
            <div className="space-y-2.5 text-sm text-slate-200 leading-relaxed">
              {currentSlide.logicalWalkthrough.map((para, i) => (
                <p key={i} className="flex gap-2.5">
                  <span className="font-mono text-sky-400 shrink-0 text-xs mt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{para}</span>
                </p>
              ))}
            </div>
          </section>

          {/* 4. Anatomical Formula Dictionary */}
          <FormulaDictionary formulas={currentSlide.formulas} slideId={currentSlide.id} />

          {/* 5. Engineering Reference Table (Optional) */}
          {currentSlide.tableData && (
            <section className="pt-1 space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {currentSlide.tableData.caption}
              </h3>
              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0B0F17] text-slate-300 border-b border-slate-800">
                    <tr>
                      {currentSlide.tableData.headers.map((h, i) => (
                        <th key={i} className="px-3 py-2 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {currentSlide.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/40">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-3 py-2 ${cIdx === 1 || cIdx === 2 ? 'font-mono tabular-nums' : ''}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* 6. In-Lecture Step-by-Step Worked Exercises */}
          <LectureExerciseCard exercises={currentSlide.workedExercises} slideId={currentSlide.id} />

          {/* Slide Navigation Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handlePrevSlide}
              disabled={unitIdx === 0 && slideIdx === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-medium text-slate-200 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <span className="font-mono text-xs text-slate-400 tabular-nums">
              U{currentUnit.unitNumber} · {slideIdx + 1} / {currentUnit.slides.length}
            </span>

            <button
              type="button"
              onClick={handleNextSlide}
              disabled={
                unitIdx === LECTURE_UNITS.length - 1 && slideIdx === currentUnit.slides.length - 1
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-xs font-semibold text-slate-950 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </article>

        {/* Right: Professor Side Panel */}
        <aside className="lg:col-span-5 space-y-4 lg:sticky lg:top-6">
          {/* Accordion 1: Explicación del Profesor Paso a Paso */}
          <div className="rounded-xl bg-[#111827] border border-slate-800 overflow-hidden">
            <button
              type="button"
              aria-expanded={openPanels.step}
              onClick={() => setOpenPanels((p) => ({ ...p, step: !p.step }))}
              className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left hover:bg-slate-800/40 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-5 h-5 text-sky-400 shrink-0" />
                <span className="font-display text-sm font-semibold text-slate-100">
                  Explicación del Profesor Paso a Paso
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  openPanels.step ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openPanels.step && (
              <div className="px-5 pb-5 pt-2 space-y-2.5 text-sm text-slate-300 leading-relaxed border-t border-slate-800/70">
                {currentSlide.professorStepByStep.map((step, i) => (
                  <p key={i}>{step}</p>
                ))}
              </div>
            )}
          </div>

          {/* Accordion 2: Por qué ocurre físicamente */}
          <div className="rounded-xl bg-[#111827] border border-slate-800 overflow-hidden">
            <button
              type="button"
              aria-expanded={openPanels.why}
              onClick={() => setOpenPanels((p) => ({ ...p, why: !p.why }))}
              className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left hover:bg-slate-800/40 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Atom className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-display text-sm font-semibold text-slate-100">
                  Por qué ocurre físicamente
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  openPanels.why ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openPanels.why && (
              <div className="px-5 pb-5 pt-2 text-sm text-slate-300 leading-relaxed border-t border-slate-800/70">
                <p>{currentSlide.physicalWhy}</p>
              </div>
            )}
          </div>

          {/* Accordion 3: Tips y Errores Típicos de Certamen */}
          <div className="rounded-xl bg-[#111827] border border-amber-500/30 overflow-hidden">
            <button
              type="button"
              aria-expanded={openPanels.tips}
              onClick={() => setOpenPanels((p) => ({ ...p, tips: !p.tips }))}
              className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left hover:bg-amber-500/5 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="font-display text-sm font-semibold text-amber-200">
                  Tips y Errores Típicos de Certamen
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-amber-400 transition-transform ${
                  openPanels.tips ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openPanels.tips && (
              <ul className="px-5 pb-5 pt-2 space-y-2 text-sm text-slate-200 leading-relaxed border-t border-amber-500/20">
                {currentSlide.certamenTips.map((tip, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-amber-400 font-bold shrink-0">!</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
