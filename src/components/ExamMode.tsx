import React, { useMemo, useState } from 'react';
import { Award, CheckCircle2, HelpCircle, RefreshCw, XCircle } from 'lucide-react';
import { USMExamAttempt } from '../bridge/USMPlatformBridge';
import {
  CONCEPTUAL_QUESTIONS,
  computeChileanGrade,
  generateDynamicNumericalQuestions,
} from '../data/examQuestions';

interface ExamModeProps {
  examAttempts: USMExamAttempt[];
  onExamEvaluated: (attempt: Omit<USMExamAttempt, 'attemptId' | 'timestamp'>) => void;
}

export const ExamMode: React.FC<ExamModeProps> = ({ examAttempts, onExamEvaluated }) => {
  const [seed, setSeed] = useState<number>(0);
  const [conceptualAnswers, setConceptualAnswers] = useState<Record<string, number>>({});
  const [numericalAnswers, setNumericalAnswers] = useState<Record<string, string>>({});
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const numericalQuestions = useMemo(() => generateDynamicNumericalQuestions(seed), [seed]);

  const toggleHint = (id: string) => {
    setOpenHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const evaluateItemNumerical = (qId: string, expected: number, tolPct: number): boolean => {
    const raw = (numericalAnswers[qId] ?? '').trim().replace(',', '.');
    if (!raw) return false;
    const val = Number(raw);
    if (!Number.isFinite(val)) return false;
    const allowedErr = Math.max(1e-4, Math.abs(expected) * (tolPct / 100));
    return Math.abs(val - expected) <= allowedErr;
  };

  const handleEvaluate = () => {
    // Allow submitting even partial attempts, but warn if completely empty
    const hasAnyConceptual = Object.keys(conceptualAnswers).length > 0;
    const hasAnyNumerical = Object.values(numericalAnswers).some((v) => v.trim().length > 0);
    if (!hasAnyConceptual && !hasAnyNumerical) {
      setValidationError('Responde al menos una pregunta conceptual o numérica antes de evaluar.');
      return;
    }
    setValidationError(null);

    let correctCount = 0;
    for (const cq of CONCEPTUAL_QUESTIONS) {
      if (conceptualAnswers[cq.id] === cq.correctIndex) {
        correctCount += 1;
      }
    }
    for (const nq of numericalQuestions) {
      if (evaluateItemNumerical(nq.id, nq.expectedValue, nq.tolerancePercent)) {
        correctCount += 1;
      }
    }

    const totalCount = CONCEPTUAL_QUESTIONS.length + numericalQuestions.length;
    const { scorePercent, gradeChile } = computeChileanGrade(correctCount, totalCount);
    setSubmitted(true);

    onExamEvaluated({
      scorePercent,
      gradeChile,
      correctCount,
      totalCount,
      mode: 'mixto',
    });
  };

  const handleNewVariation = () => {
    setSeed((s) => s + 1);
    setConceptualAnswers({});
    setNumericalAnswers({});
    setOpenHints({});
    setSubmitted(false);
    setValidationError(null);
  };

  const summary = useMemo(() => {
    if (!submitted) return null;
    let correctCount = 0;
    for (const cq of CONCEPTUAL_QUESTIONS) {
      if (conceptualAnswers[cq.id] === cq.correctIndex) correctCount += 1;
    }
    for (const nq of numericalQuestions) {
      if (evaluateItemNumerical(nq.id, nq.expectedValue, nq.tolerancePercent)) correctCount += 1;
    }
    const totalCount = CONCEPTUAL_QUESTIONS.length + numericalQuestions.length;
    return {
      correctCount,
      totalCount,
      ...computeChileanGrade(correctCount, totalCount),
    };
  }, [submitted, conceptualAnswers, numericalAnswers, numericalQuestions]);

  return (
    <div className="space-y-6">
      {/* Top Assessment Header */}
      <section className="rounded-xl bg-[#111827] border border-slate-800 p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-lg sm:text-xl font-bold text-slate-100">
            Evaluación Interactiva y Entrenamiento de Certamen (MEC120)
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {CONCEPTUAL_QUESTIONS.length} preguntas conceptuales (Control 3 / Certamen 3) +{' '}
            {numericalQuestions.length} ejercicios numéricos paramétricos · Exigencia 60% (Nota 4.0).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleNewVariation}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs sm:text-sm font-medium text-slate-200 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-sky-400" />
            <span>Generar Nueva Variación Numérica</span>
          </button>

          <button
            type="button"
            onClick={handleEvaluate}
            data-testid="evaluate-exam-btn"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Evaluar Examen</span>
          </button>
        </div>
      </section>

      {validationError && (
        <div role="alert" className="rounded-xl bg-amber-950/50 border border-amber-500/60 px-4 py-3 text-sm text-amber-200">
          {validationError}
        </div>
      )}

      {/* Results Banner when submitted */}
      {submitted && summary && (
        <section
          data-testid="exam-results-banner"
          className={`rounded-xl border p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 ${
            summary.gradeChile >= 4.0
              ? 'bg-emerald-950/35 border-emerald-500/50'
              : 'bg-red-950/35 border-red-500/50'
          }`}
        >
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-300">
              Resultado Registrado en USM_STUDENT_TELEMETRY
            </p>
            <p className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
              Nota Chilena: {summary.gradeChile.toFixed(1)}{' '}
              <span className="text-base font-mono text-slate-300">
                ({summary.scorePercent}% · {summary.correctCount}/{summary.totalCount} correctas)
              </span>
            </p>
          </div>
          <div className="text-sm text-slate-200">
            {summary.gradeChile >= 4.0
              ? 'Aprobado sobre la exigencia USM del 60%. Revisa las soluciones detalladas abajo.'
              : 'Bajo nota 4.0. Revisa paso a paso cada solución y genera una nueva variación numérica.'}
          </div>
        </section>
      )}

      {/* Section A: Conceptual Questions */}
      <section className="space-y-4">
        <h3 className="font-display text-base font-semibold text-sky-300">
          Parte A · Preguntas Conceptuales de Cátedra y Control 3
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {CONCEPTUAL_QUESTIONS.map((cq, qIdx) => {
            const selected = conceptualAnswers[cq.id];
            const isCorrect = selected === cq.correctIndex;
            return (
              <article
                key={cq.id}
                className="rounded-xl bg-[#111827] border border-slate-800 p-5 space-y-3.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-xs text-sky-400">
                    Pregunta {qIdx + 1} · {cq.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleHint(cq.id)}
                    className="inline-flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{openHints[cq.id] ? 'Ocultar pista' : 'Pista'}</span>
                  </button>
                </div>

                <p className="text-sm font-medium text-slate-100 leading-relaxed">{cq.prompt}</p>

                {openHints[cq.id] && (
                  <p className="text-xs text-amber-200 bg-amber-950/30 border border-amber-500/30 rounded-lg px-3 py-2">
                    Pista del Profesor: {cq.hint}
                  </p>
                )}

                <div className="space-y-2">
                  {cq.options.map((opt, oIdx) => {
                    const checked = selected === oIdx;
                    let borderClass = 'border-slate-800 bg-[#0B0F17] text-slate-300 hover:border-slate-600';
                    if (submitted) {
                      if (oIdx === cq.correctIndex) {
                        borderClass = 'border-emerald-500/70 bg-emerald-950/40 text-emerald-200';
                      } else if (checked && oIdx !== cq.correctIndex) {
                        borderClass = 'border-red-500/70 bg-red-950/40 text-red-200';
                      }
                    } else if (checked) {
                      borderClass = 'border-sky-400 bg-sky-500/15 text-white';
                    }

                    return (
                      <label
                        key={oIdx}
                        className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs sm:text-sm cursor-pointer transition-colors ${borderClass}`}
                      >
                        <input
                          type="radio"
                          name={cq.id}
                          checked={checked}
                          onChange={() => setConceptualAnswers((prev) => ({ ...prev, [cq.id]: oIdx }))}
                          className="mt-1 accent-sky-400"
                        />
                        <span>{opt}</span>
                      </label>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="pt-2 border-t border-slate-800 text-xs flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <p className="text-slate-300 leading-relaxed">{cq.explanation}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Section B: Dynamic Numerical Exercises */}
      <section className="space-y-4">
        <h3 className="font-display text-base font-semibold text-amber-300">
          Parte B · Ejercicios Numéricos Paramétricos (Variación #{seed + 1})
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {numericalQuestions.map((nq) => {
            const isCorrect = submitted && evaluateItemNumerical(nq.id, nq.expectedValue, nq.tolerancePercent);
            return (
              <article
                key={nq.id}
                className="rounded-xl bg-[#111827] border border-slate-800 p-5 space-y-3.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-xs text-amber-400">{nq.category}</span>
                    <h4 className="font-display text-sm sm:text-base font-semibold text-slate-100 mt-0.5">
                      {nq.title}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleHint(nq.id)}
                    className="inline-flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{openHints[nq.id] ? 'Ocultar pista' : 'Pista'}</span>
                  </button>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{nq.prompt}</p>

                {openHints[nq.id] && (
                  <p className="text-xs text-amber-200 bg-amber-950/30 border border-amber-500/30 rounded-lg px-3 py-2">
                    Pista: {nq.hint}
                  </p>
                )}

                <label className="block space-y-1 text-xs">
                  <span className="text-slate-400">Tu respuesta ({nq.unit}):</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder={`Ingresa valor en ${nq.unit}`}
                      value={numericalAnswers[nq.id] ?? ''}
                      onChange={(e) =>
                        setNumericalAnswers((prev) => ({ ...prev, [nq.id]: e.target.value }))
                      }
                      className="flex-1 px-3 py-2 rounded-lg bg-[#0B0F17] border border-slate-700 font-mono text-sm text-slate-100 focus:outline-none focus:border-sky-400"
                    />
                    <span className="font-mono text-slate-400">{nq.unit}</span>
                  </div>
                </label>

                {submitted && (
                  <div className="rounded-lg bg-[#0B0F17] border border-slate-800 p-3 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isCorrect ? 'Correcto dentro de tolerancia' : 'Fuera de rango'}
                      </span>
                      <span className="font-mono text-sky-300">
                        Esperado: {nq.expectedValue} {nq.unit} (±{nq.tolerancePercent}%)
                      </span>
                    </div>
                    <ul className="space-y-1 font-mono text-slate-300 pt-1 border-t border-slate-800/80">
                      {nq.solutionSteps.map((st, idx) => (
                        <li key={idx}>{st}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Persisted Attempt History */}
      {examAttempts.length > 0 && (
        <section className="rounded-xl bg-[#111827] border border-slate-800 p-5 space-y-3">
          <h3 className="font-display text-sm font-semibold text-slate-200">
            Historial de Evaluaciones Guardadas (Sincronizado con Panel CEO / Alumno)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {examAttempts.slice(0, 4).map((att) => (
              <div
                key={att.attemptId}
                className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800 flex items-center justify-between font-mono text-xs"
              >
                <div>
                  <div className="text-slate-400">{new Date(att.timestamp).toLocaleTimeString('es-CL')}</div>
                  <div className="text-slate-300">
                    {att.correctCount}/{att.totalCount} ({att.scorePercent}%)
                  </div>
                </div>
                <div
                  className={`text-lg font-bold ${
                    att.gradeChile >= 4.0 ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {att.gradeChile.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
