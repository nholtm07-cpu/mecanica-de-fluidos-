import React, { useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Info,
  Zap,
} from 'lucide-react';
import {
  IndustrialPipeParams,
  IndustrialPipeSolution,
} from '../../physics/pipeLossCFDMath';

interface PipeLossProfessorBoardProps {
  params: IndustrialPipeParams;
  solution: IndustrialPipeSolution;
  physicalNote: string;
  typicalErrors: string[];
}

const SYMBOL_DICTIONARY = [
  { symbol: 'Q', name: 'Caudal volumétrico', unit: 'm³/s (L/s ÷ 1000)', meaning: 'Volumen de agua que atraviesa la tubería por segundo.' },
  { symbol: 'D₁, D₂', name: 'Diámetros internos', unit: 'm (mm ÷ 1000)', meaning: 'Succión (D₁) y descarga (D₂). Reducir D dispara la velocidad como 1/D².' },
  { symbol: 'V', name: 'Velocidad media', unit: 'm/s', meaning: 'V = Q / A. Define la energía cinética V²/(2g) y el color CFD.' },
  { symbol: 'Re', name: 'Número de Reynolds', unit: 'Adimensional', meaning: 'Razón fuerzas inerciales / viscosas. Re < 2300 laminar; > 4000 turbulento.' },
  { symbol: 'ε / D', name: 'Rugosidad relativa', unit: 'Adimensional', meaning: 'Aspereza interna ε (1 in = 25.4 mm) dividida por el diámetro interno.' },
  { symbol: 'f', name: 'Factor de fricción de Darcy', unit: 'Adimensional', meaning: 'Calculado con Swamee-Jain (turbulento) o 64/Re (laminar).' },
  { symbol: 'hf', name: 'Pérdida primaria', unit: 'm (m.c.a.)', meaning: 'Energía disipada por fricción viscosa a lo largo de L: f·(L/D)·V²/(2g).' },
  { symbol: 'K, hm', name: 'Pérdida secundaria', unit: 'K: adim · hm: m', meaning: 'Disipación local en codos, válvulas V1/V2/V3, entrada y salida.' },
  { symbol: 'hL', name: 'Pérdida de carga total', unit: 'm (m.c.a.)', meaning: 'Suma total de pérdidas primarias y secundarias: hL = hf + hm.' },
  { symbol: 'H', name: 'Altura dinámica de bomba', unit: 'm (m.c.a.)', meaning: 'Energía neta que la bomba entrega por peso de fluido (Bernoulli extendido).' },
  { symbol: 'ηb, ηm', name: 'Eficiencias bomba y motor', unit: '% (0–1)', meaning: 'Fracción útil convertida en energía hidráulica y trabajo de eje.' },
  { symbol: 'Ph, Peje, Pelec', name: 'Potencias del sistema', unit: 'W / kW / HP', meaning: 'Hidráulica (ρgQH), al eje (Ph/ηb) y eléctrica de entrada (Peje/ηm).' },
];

export const PipeLossProfessorBoard: React.FC<PipeLossProfessorBoardProps> = ({
  params,
  solution,
  physicalNote,
  typicalErrors,
}) => {
  const [activeTab, setActiveTab] = useState<'steps' | 'dictionary' | 'physics'>('steps');
  const [expandedAll, setExpandedAll] = useState(true);

  return (
    <section
      aria-label="Pizarra del Profesor Paso a Paso"
      data-testid="pipe-loss-professor-board"
      className="rounded-xl bg-[#111827] border border-slate-800 p-5 space-y-5"
    >
      {/* Header + Summary Metrics */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-400 shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-slate-100">
              Pizarra del Profesor · Desarrollo Completo (Pasos 1 al 8)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Cálculo riguroso en Unidades SI en tiempo real con Swamee-Jain y Ecuación General de la Energía
            </p>
          </div>
        </div>

        {/* Sub-navigation inside board */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('steps')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'steps'
                ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                : 'bg-[#0B0F17] border-slate-800 text-slate-300 hover:border-slate-600'
            }`}
          >
            Desarrollo Pasos 1–8
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dictionary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'dictionary'
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-[#0B0F17] border-slate-800 text-slate-300 hover:border-slate-600'
            }`}
          >
            Diccionario de Variables
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('physics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'physics'
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                : 'bg-[#0B0F17] border-slate-800 text-slate-300 hover:border-slate-600'
            }`}
          >
            Física y Errores Típicos
          </button>
        </div>
      </div>

      {/* Live Engineering KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800">
          <div className="text-[11px] text-slate-400">
            {params.hasPump ? 'Altura de Bomba (H)' : 'Pérdida Total (hL)'}
          </div>
          <div
            data-testid="board-primary-head"
            className="font-mono text-lg font-bold text-amber-300 tabular-nums"
          >
            {params.hasPump ? `${solution.pumpHeadM.toFixed(2)} m` : `${solution.hLTotalM.toFixed(3)} m`}
          </div>
          <div className="text-[11px] font-mono text-slate-500 tabular-nums">
            hf={solution.hfTotalM.toFixed(2)} m · hm={solution.hmTotalM.toFixed(2)} m
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800">
          <div className="text-[11px] text-slate-400">
            {params.includeSuctionLine ? 'Velocidades (V₁ / V₂)' : 'Velocidad y Reynolds'}
          </div>
          <div className="font-mono text-base font-bold text-sky-300 tabular-nums">
            {params.includeSuctionLine
              ? `${solution.line1.velocityMs.toFixed(2)} / ${solution.line2.velocityMs.toFixed(2)} m/s`
              : `${solution.line2.velocityMs.toFixed(3)} m/s`}
          </div>
          <div className="text-[11px] font-mono text-slate-500 tabular-nums">
            Re₂ = {Math.round(solution.line2.reynolds).toLocaleString('es-CL')} ({solution.line2.regime})
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800">
          <div className="text-[11px] text-slate-400">
            {params.hasPump ? 'Potencia Hidráulica (Ph)' : 'Caída Presión (Δp_eq)'}
          </div>
          <div className="font-mono text-lg font-bold text-emerald-300 tabular-nums">
            {params.hasPump
              ? `${solution.hydraulicPowerKw.toFixed(2)} kW`
              : `${solution.deltaPEquivKpa.toFixed(2)} kPa`}
          </div>
          <div className="text-[11px] font-mono text-slate-500 tabular-nums">
            {params.hasPump
              ? `Peje = ${solution.shaftPowerKw.toFixed(2)} kW (${solution.shaftPowerHp.toFixed(1)} HP)`
              : `hL = ${solution.hLTotalM.toFixed(3)} m`}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>{params.hasPump ? 'Potencia Eléctrica Motor' : 'Potencia Disipada (Ph)'}</span>
          </div>
          <div className="font-mono text-lg font-bold text-slate-100 tabular-nums">
            {params.hasPump
              ? `${solution.electricPowerKw.toFixed(2)} kW`
              : `${solution.hydraulicPowerW.toFixed(1)} W`}
          </div>
          <div className="text-[11px] font-mono text-slate-400 tabular-nums">
            {params.hasPump
              ? `${solution.electricPowerHp.toFixed(2)} HP (ηb=${params.etaPumpPct}%, ηm=${params.etaMotorPct}%)`
              : `f = ${solution.line2.frictionFactor.toFixed(5)}`}
          </div>
        </div>
      </div>

      {/* TAB 1: Steps 1 to 8 */}
      {activeTab === 'steps' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">
              Secuencia Matemática Completa (actualizada al instante con los sliders)
            </span>
            <button
              type="button"
              onClick={() => setExpandedAll((prev) => !prev)}
              className="inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 cursor-pointer"
            >
              {expandedAll ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" /> Vista compacta
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" /> Expandir fórmulas
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {solution.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="rounded-xl bg-[#0B0F17] border border-slate-800 p-4 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-sky-500/20 border border-sky-500/40 text-sky-300 font-mono text-xs font-bold shrink-0">
                      {step.stepNumber}
                    </span>
                    <h4 className="text-xs font-bold text-slate-100 leading-snug">
                      {step.title}
                    </h4>
                  </div>
                </div>

                {expandedAll && (
                  <>
                    <div className="px-2.5 py-1.5 rounded bg-[#111827] border border-slate-800 font-mono text-[11px] text-amber-300 overflow-x-auto">
                      {step.formulaLatex}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono tabular-nums">
                      {step.calculationText}
                    </p>
                  </>
                )}

                <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Resultado:</span>
                  <span className="font-mono font-bold text-emerald-300 tabular-nums">
                    {step.resultLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Variable Dictionary */}
      {activeTab === 'dictionary' && (
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0B0F17]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-[#0f172a] text-slate-300">
                <th className="py-2.5 px-3 font-semibold">Símbolo</th>
                <th className="py-2.5 px-3 font-semibold">Variable</th>
                <th className="py-2.5 px-3 font-semibold">Unidades SI</th>
                <th className="py-2.5 px-3 font-semibold">Significado Físico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-300">
              {SYMBOL_DICTIONARY.map((item) => (
                <tr key={item.symbol} className="hover:bg-slate-900/40">
                  <td className="py-2 px-3 font-mono font-bold text-sky-300 whitespace-nowrap">
                    {item.symbol}
                  </td>
                  <td className="py-2 px-3 font-medium text-slate-100 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="py-2 px-3 font-mono text-amber-300 whitespace-nowrap">
                    {item.unit}
                  </td>
                  <td className="py-2 px-3 text-slate-300">{item.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: Physical Interpretation & Typical Errors */}
      {activeTab === 'physics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-[#0B0F17] border border-sky-500/30 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
              <Info className="w-4 h-4" />
              <span>Interpretación Física del Sistema</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">{physicalNote}</p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1 font-mono">
              <div>
                • Pérdidas primarias (fricción): {solution.hfTotalM.toFixed(3)} m (
                {solution.hLTotalM > 0
                  ? ((solution.hfTotalM / solution.hLTotalM) * 100).toFixed(1)
                  : '0'}
                % de hL)
              </div>
              <div>
                • Pérdidas secundarias (accesorios): {solution.hmTotalM.toFixed(3)} m (
                {solution.hLTotalM > 0
                  ? ((solution.hmTotalM / solution.hLTotalM) * 100).toFixed(1)
                  : '0'}
                % de hL)
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-[#0B0F17] border border-amber-500/30 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <AlertTriangle className="w-4 h-4" />
              <span>Errores Típicos en Certámenes UTFSM</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {typicalErrors.map((err, i) => (
                <li key={i} className="flex items-start gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{err}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};
