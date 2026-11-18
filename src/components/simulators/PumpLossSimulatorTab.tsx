import React, { useMemo, useState } from 'react';
import {
  BookMarked,
  Layers,
  Plus,
  RotateCcw,
  Sliders,
  X,
} from 'lucide-react';
import {
  IndustrialPipeParams,
  PIPE_SYSTEM_EXAMPLES,
  PipeSystemCase,
  solveIndustrialPipeSystem,
  TEXTBOOK_IMPORT_PRESETS,
  ValveOpening,
} from '../../physics/pipeLossCFDMath';
import { PipeLossCFDCanvas } from './PipeLossCFDCanvas';
import { PipeLossProfessorBoard } from './PipeLossProfessorBoard';

interface PumpLossSimulatorTabProps {
  certamen3View: React.ReactNode;
}

const EXAMPLE_1_META = {
  id: 'ejemplo-1-certamen3',
  badge: 'Ejemplo 1',
  title: 'Certamen 3 USM · Pozo y Cavitación',
  subtitle: 'D₁=2.5 cm → D₂=1.9 cm, curva de bomba y NPSHA vs NPSHR',
};

export const PumpLossSimulatorTab: React.FC<PumpLossSimulatorTabProps> = ({
  certamen3View,
}) => {
  const [customCases, setCustomCases] = useState<PipeSystemCase[]>([]);
  const allCFDCases = useMemo(
    () => [...PIPE_SYSTEM_EXAMPLES, ...customCases],
    [customCases]
  );

  // Por defecto inicia en Ejemplo 2 (Infografía CFD 3D) o permite alternar libremente con Ejemplo 1 y 3
  const [selectedCaseId, setSelectedCaseId] = useState<string>(EXAMPLE_1_META.id);
  const [paramsByCaseId, setParamsByCaseId] = useState<Record<string, IndustrialPipeParams>>(() => {
    const map: Record<string, IndustrialPipeParams> = {};
    for (const ex of PIPE_SYSTEM_EXAMPLES) {
      map[ex.id] = { ...ex.params };
    }
    return map;
  });

  const [showImporter, setShowImporter] = useState(false);
  const [customTitle, setCustomTitle] = useState('Sistema Personalizado (Çengel)');
  const [customQ, setCustomQ] = useState(12);
  const [customD1, setCustomD1] = useState(125);
  const [customD2, setCustomD2] = useState(100);
  const [customL2, setCustomL2] = useState(45);
  const [customDz, setCustomDz] = useState(20);
  const [customP2Psi, setCustomP2Psi] = useState(15);

  const activeCFDCase = useMemo(
    () => allCFDCases.find((c) => c.id === selectedCaseId) ?? allCFDCases[0],
    [allCFDCases, selectedCaseId]
  );

  const activeParams = useMemo(() => {
    return paramsByCaseId[activeCFDCase.id] ?? activeCFDCase.params;
  }, [activeCFDCase, paramsByCaseId]);

  const solution = useMemo(
    () => solveIndustrialPipeSystem(activeParams),
    [activeParams]
  );

  const updateActiveParams = (patch: Partial<IndustrialPipeParams>) => {
    setParamsByCaseId((prev) => ({
      ...prev,
      [activeCFDCase.id]: {
        ...(prev[activeCFDCase.id] ?? activeCFDCase.params),
        ...patch,
      },
    }));
  };

  const restoreDefaults = () => {
    setParamsByCaseId((prev) => ({
      ...prev,
      [activeCFDCase.id]: { ...activeCFDCase.params },
    }));
  };

  const handleImportPreset = (presetIdx: number) => {
    const preset = TEXTBOOK_IMPORT_PRESETS[presetIdx];
    if (!preset) return;
    const nextNum = 4 + customCases.length;
    const newId = `ejemplo-${nextNum}-${Date.now()}`;
    const newCase: PipeSystemCase = {
      id: newId,
      badge: `Ejemplo ${nextNum}`,
      ...preset.caseData,
    };
    setCustomCases((prev) => [...prev, newCase]);
    setParamsByCaseId((prev) => ({ ...prev, [newId]: { ...newCase.params } }));
    setSelectedCaseId(newId);
    setShowImporter(false);
  };

  const handleCreateCustomCase = (e: React.FormEvent) => {
    e.preventDefault();
    const nextNum = 4 + customCases.length;
    const newId = `ejemplo-${nextNum}-custom-${Date.now()}`;
    const newCase: PipeSystemCase = {
      id: newId,
      badge: `Ejemplo ${nextNum}`,
      title: customTitle.trim() || `Sistema Importado #${nextNum}`,
      subtitle: `Q=${customQ} L/s, D₁=${customD1}→D₂=${customD2} mm, Δz=${customDz} m, p₂=${customP2Psi} psi`,
      sourceLabel: 'Ejemplo Personalizado · Importador Çengel / Mott',
      description:
        'Sistema hidráulico importado por el usuario para análisis completo CFD, Darcy-Weisbach y potencia eléctrica.',
      layoutMode: 'industrial_cfd_3d',
      params: {
        flowLs: customQ,
        d1Mm: customD1,
        d2Mm: customD2,
        l1M: 10,
        l2M: customL2,
        zTopM: customDz,
        hDropM: 0,
        p1Kpa: 0,
        p2Psi: customP2Psi,
        roughnessMm: 0.04572,
        v1Opening: '100%',
        v2Opening: '100%',
        kV3Check: 4.0,
        kElbowsTotal: 4.0,
        suctionElbowFraction: 0.35,
        kEntrance: 0.5,
        kExit: 1.0,
        etaPumpPct: 82,
        etaMotorPct: 93,
        waterTempC: 20,
        hasPump: true,
        includeSuctionLine: true,
        isPressurizedTank2: customP2Psi > 0,
      },
      physicalNote:
        'Sistema configurado mediante el Importador Rápido. Ajusta los diámetros o válvulas para evaluar cómo impactan Re, f y la potencia eléctrica.',
      typicalErrors: [
        'Verificar que las unidades de entrada estén convertidas al Sistema Internacional antes de usar Swamee-Jain.',
      ],
    };
    setCustomCases((prev) => [...prev, newCase]);
    setParamsByCaseId((prev) => ({ ...prev, [newId]: { ...newCase.params } }));
    setSelectedCaseId(newId);
    setShowImporter(false);
  };

  return (
    <div className="space-y-5">
      {/* Multi-Example Library Bar */}
      <div className="rounded-xl bg-[#111827] border border-slate-800 p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-400 shrink-0" />
            <div>
              <h2 className="font-display text-sm font-bold text-slate-100">
                Biblioteca Interactiva de Ejemplos · Bombeo y Pérdidas de Carga
              </h2>
              <p className="text-[11px] text-slate-400">
                Alterna entre el Certamen 3 USM, el Sistema Industrial CFD 3D, la Guía de Estudio o importa casos de Çengel / Mott
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowImporter((prev) => !prev)}
            data-testid="toggle-importer-btn"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-sky-500/50 bg-sky-500/15 text-sky-300 hover:bg-sky-500/25 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {showImporter ? (
              <>
                <X className="w-3.5 h-3.5" />
                Cerrar Importador
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                Importar Ejemplo (Çengel / Mott)
              </>
            )}
          </button>
        </div>

        {/* Example Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {/* Ejemplo 1: Certamen 3 USM (Preserved 100%) */}
          <button
            type="button"
            onClick={() => setSelectedCaseId(EXAMPLE_1_META.id)}
            data-testid="select-ejemplo-1"
            className={`text-left p-3 rounded-lg border transition-colors cursor-pointer ${
              selectedCaseId === EXAMPLE_1_META.id
                ? 'bg-sky-500/15 border-sky-400 text-slate-100'
                : 'bg-[#0B0F17] border-slate-800 text-slate-300 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-mono text-[11px] font-bold text-sky-300">
                {EXAMPLE_1_META.badge}
              </span>
              <span className="text-[10px] text-slate-400">Curva Bomba + NPSH</span>
            </div>
            <div className="text-xs font-bold text-slate-100">{EXAMPLE_1_META.title}</div>
            <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
              {EXAMPLE_1_META.subtitle}
            </div>
          </button>

          {/* Ejemplo 2, Ejemplo 3, and imported examples */}
          {allCFDCases.map((ex) => {
            const isSelected = selectedCaseId === ex.id;
            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => setSelectedCaseId(ex.id)}
                data-testid={`select-${ex.id}`}
                className={`text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 text-slate-100'
                    : 'bg-[#0B0F17] border-slate-800 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[11px] font-bold text-amber-300">
                    {ex.badge}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {ex.layoutMode === 'industrial_cfd_3d' ? 'CFD 3D · 2 Estanques' : 'Guía · Tramo Recto'}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-100">{ex.title}</div>
                <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  {ex.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Collapsible Quick Importer */}
        {showImporter && (
          <div className="rounded-xl bg-[#0B0F17] border border-sky-500/40 p-4 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
              <BookMarked className="w-4 h-4" />
              <span>Importador Rápido de Problemas de Libros (Çengel / Mott)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {TEXTBOOK_IMPORT_PRESETS.map((preset, idx) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleImportPreset(idx)}
                  className="text-left p-3 rounded-lg bg-[#111827] border border-slate-700 hover:border-sky-400 transition-colors cursor-pointer"
                >
                  <div className="text-xs font-bold text-slate-100">{preset.label}</div>
                  <div className="text-[11px] text-sky-300 mt-0.5">{preset.bookRef}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{preset.caseData.subtitle}</div>
                </button>
              ))}
            </div>

            <form onSubmit={handleCreateCustomCase} className="pt-3 border-t border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-200">
                O crea un Ejemplo {4 + customCases.length} a medida:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs">
                <label className="col-span-2 sm:col-span-2 space-y-1">
                  <span className="text-slate-400 block">Nombre del caso</span>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded bg-[#111827] border border-slate-700 text-slate-100"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-slate-400 block">Q (L/s)</span>
                  <input
                    type="number"
                    min={1}
                    max={80}
                    step={0.5}
                    value={customQ}
                    onChange={(e) => setCustomQ(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded bg-[#111827] border border-slate-700 text-slate-100 font-mono"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-slate-400 block">D₁ (mm)</span>
                  <input
                    type="number"
                    min={25}
                    max={400}
                    value={customD1}
                    onChange={(e) => setCustomD1(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded bg-[#111827] border border-slate-700 text-slate-100 font-mono"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-slate-400 block">D₂ (mm)</span>
                  <input
                    type="number"
                    min={25}
                    max={400}
                    value={customD2}
                    onChange={(e) => setCustomD2(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded bg-[#111827] border border-slate-700 text-slate-100 font-mono"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-slate-400 block">L₂ (m)</span>
                  <input
                    type="number"
                    min={5}
                    max={300}
                    value={customL2}
                    onChange={(e) => setCustomL2(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded bg-[#111827] border border-slate-700 text-slate-100 font-mono"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-slate-400 block">Δz (m) / p₂(psi)</span>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      min={0}
                      max={80}
                      value={customDz}
                      onChange={(e) => setCustomDz(Number(e.target.value))}
                      aria-label="Diferencia de altura en metros"
                      className="w-1/2 px-1.5 py-1.5 rounded bg-[#111827] border border-slate-700 text-slate-100 font-mono"
                    />
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={customP2Psi}
                      onChange={(e) => setCustomP2Psi(Number(e.target.value))}
                      aria-label="Presión en estanque 2 en psi"
                      className="w-1/2 px-1.5 py-1.5 rounded bg-[#111827] border border-slate-700 text-slate-100 font-mono"
                    />
                  </div>
                </label>
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-500 text-slate-950 font-semibold text-xs hover:bg-sky-400 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar y Simular Caso
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Render either Preserved Ejemplo 1 OR CFD Multi-Example Studio */}
      {selectedCaseId === EXAMPLE_1_META.id ? (
        certamen3View
      ) : (
        <div className="space-y-6">
          {/* Case Context Description */}
          <div className="rounded-xl bg-[#111827] border border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5 max-w-3xl">
              <div className="text-[11px] font-mono text-amber-300">
                {activeCFDCase.badge} · {activeCFDCase.sourceLabel}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{activeCFDCase.description}</p>
            </div>
            <button
              type="button"
              onClick={restoreDefaults}
              data-testid="restore-cfd-defaults"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-[#0B0F17] text-xs font-semibold text-sky-300 hover:border-sky-400 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restaurar Valores
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Sliders Panel */}
            <div className="lg:col-span-4 rounded-xl bg-[#111827] border border-slate-800 p-4 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2 font-display text-sm font-bold text-slate-100">
                  <Sliders className="w-4 h-4 text-sky-400" />
                  <span>Variables del Sistema</span>
                </div>
                <span className="font-mono text-[11px] text-slate-400">
                  T = {activeParams.waterTempC}°C
                </span>
              </div>

              {/* Group 1: Flow & Diameters */}
              <div className="space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                  1. Caudal y Tuberías
                </div>

                <label className="block space-y-1">
                  <span className="flex justify-between text-slate-300">
                    <span>Caudal volumétrico (Q)</span>
                    <span className="font-mono text-sky-300 tabular-nums">
                      {activeParams.flowLs.toFixed(1)} L/s
                    </span>
                  </span>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    step={0.5}
                    value={activeParams.flowLs}
                    onChange={(e) => updateActiveParams({ flowLs: Number(e.target.value) })}
                    data-testid="cfd-flow-slider"
                    className="w-full"
                  />
                </label>

                {activeParams.includeSuctionLine && (
                  <label className="block space-y-1">
                    <span className="flex justify-between text-slate-300">
                      <span>Diámetro succión (D₁)</span>
                      <span className="font-mono text-amber-300 tabular-nums">
                        {activeParams.d1Mm} mm
                      </span>
                    </span>
                    <input
                      type="range"
                      min={50}
                      max={300}
                      step={5}
                      value={activeParams.d1Mm}
                      onChange={(e) => updateActiveParams({ d1Mm: Number(e.target.value) })}
                      className="w-full"
                    />
                  </label>
                )}

                <label className="block space-y-1">
                  <span className="flex justify-between text-slate-300">
                    <span>
                      {activeParams.includeSuctionLine ? 'Diámetro descarga (D₂)' : 'Diámetro tubería (D)'}
                    </span>
                    <span className="font-mono text-sky-300 tabular-nums">
                      {activeParams.d2Mm} mm
                    </span>
                  </span>
                  <input
                    type="range"
                    min={40}
                    max={250}
                    step={5}
                    value={activeParams.d2Mm}
                    onChange={(e) =>
                      updateActiveParams({
                        d2Mm: Number(e.target.value),
                        ...(activeParams.includeSuctionLine ? {} : { d1Mm: Number(e.target.value) }),
                      })
                    }
                    data-testid="cfd-d2-slider"
                    className="w-full"
                  />
                </label>

                {activeParams.includeSuctionLine && (
                  <label className="block space-y-1">
                    <span className="flex justify-between text-slate-300">
                      <span>Longitud succión (L₁)</span>
                      <span className="font-mono text-slate-200 tabular-nums">
                        {activeParams.l1M} m
                      </span>
                    </span>
                    <input
                      type="range"
                      min={2}
                      max={100}
                      step={1}
                      value={activeParams.l1M}
                      onChange={(e) => updateActiveParams({ l1M: Number(e.target.value) })}
                      className="w-full"
                    />
                  </label>
                )}

                <label className="block space-y-1">
                  <span className="flex justify-between text-slate-300">
                    <span>
                      {activeParams.includeSuctionLine ? 'Longitud descarga (L₂)' : 'Longitud total (L)'}
                    </span>
                    <span className="font-mono text-slate-200 tabular-nums">
                      {activeParams.l2M} m
                    </span>
                  </span>
                  <input
                    type="range"
                    min={10}
                    max={200}
                    step={2}
                    value={activeParams.l2M}
                    onChange={(e) => updateActiveParams({ l2M: Number(e.target.value) })}
                    className="w-full"
                  />
                </label>
              </div>

              {/* Group 2: Elevation & Pressures */}
              {activeParams.hasPump && (
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    2. Cotas y Presión Estanque 2
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <label className="block space-y-1">
                      <span className="flex justify-between text-slate-300">
                        <span>Cota sup.</span>
                        <span className="font-mono text-amber-300">{activeParams.zTopM} m</span>
                      </span>
                      <input
                        type="range"
                        min={5}
                        max={60}
                        step={1}
                        value={activeParams.zTopM}
                        onChange={(e) => updateActiveParams({ zTopM: Number(e.target.value) })}
                        className="w-full"
                      />
                    </label>
                    <label className="block space-y-1">
                      <span className="flex justify-between text-slate-300">
                        <span>Bajada</span>
                        <span className="font-mono text-amber-300">{activeParams.hDropM} m</span>
                      </span>
                      <input
                        type="range"
                        min={0}
                        max={15}
                        step={1}
                        value={activeParams.hDropM}
                        onChange={(e) => updateActiveParams({ hDropM: Number(e.target.value) })}
                        className="w-full"
                      />
                    </label>
                  </div>

                  <label className="block space-y-1">
                    <span className="flex justify-between text-slate-300">
                      <span>Presión estanque 2 (p₂)</span>
                      <span className="font-mono text-emerald-300 tabular-nums">
                        {activeParams.p2Psi.toFixed(1)} psi ({solution.p2Kpa.toFixed(1)} kPa)
                      </span>
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={0.5}
                      value={activeParams.p2Psi}
                      onChange={(e) =>
                        updateActiveParams({
                          p2Psi: Number(e.target.value),
                          isPressurizedTank2: Number(e.target.value) > 0,
                        })
                      }
                      data-testid="cfd-p2-slider"
                      className="w-full"
                    />
                  </label>
                </div>
              )}

              {/* Group 3: Roughness, Water Temp & Minor Losses */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  {activeParams.hasPump ? '3. Rugosidad, Válvulas y Accesorios' : '2. Rugosidad, Fluido y Accesorios'}
                </div>

                <label className="block space-y-1">
                  <span className="flex justify-between text-slate-300">
                    <span>Material / Rugosidad (ε)</span>
                    <span className="font-mono text-slate-200 tabular-nums">
                      {activeParams.roughnessMm.toFixed(4)} mm
                    </span>
                  </span>
                  <input
                    type="range"
                    min={0.0015}
                    max={3.0}
                    step={0.005}
                    value={activeParams.roughnessMm}
                    onChange={(e) => updateActiveParams({ roughnessMm: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex flex-wrap gap-1 pt-1">
                    {[
                      { label: 'PVC', mm: 0.0015 },
                      { label: 'Acero com.', mm: 0.04572 },
                      { label: 'Galvanizado', mm: 0.15 },
                      { label: 'Hierro fund.', mm: 0.26 },
                    ].map((mat) => (
                      <button
                        key={mat.label}
                        type="button"
                        onClick={() => updateActiveParams({ roughnessMm: mat.mm })}
                        className="px-2 py-0.5 rounded bg-[#0B0F17] border border-slate-700 hover:border-sky-400 text-[10px] text-slate-300 cursor-pointer"
                      >
                        {mat.label}
                      </button>
                    ))}
                  </div>
                </label>

                <label className="block space-y-1">
                  <span className="flex justify-between text-slate-300">
                    <span>Temperatura del agua (T)</span>
                    <span className="font-mono text-amber-300">{activeParams.waterTempC}°C</span>
                  </span>
                  <input
                    type="range"
                    min={5}
                    max={80}
                    step={5}
                    value={activeParams.waterTempC}
                    onChange={(e) => updateActiveParams({ waterTempC: Number(e.target.value) })}
                    className="w-full"
                  />
                </label>

                {activeParams.includeSuctionLine && (
                  <div className="grid grid-cols-2 gap-2.5">
                    <label className="block space-y-1">
                      <span className="text-slate-300">V1 (Succión)</span>
                      <select
                        value={activeParams.v1Opening}
                        onChange={(e) =>
                          updateActiveParams({ v1Opening: e.target.value as ValveOpening })
                        }
                        className="w-full px-2 py-1.5 rounded bg-[#0B0F17] border border-slate-700 text-slate-100"
                      >
                        <option value="100%">100% (K=0.2)</option>
                        <option value="75%">75% (K=0.9)</option>
                        <option value="50%">50% (K=4.5)</option>
                        <option value="25%">25% (K=24)</option>
                      </select>
                    </label>
                    <label className="block space-y-1">
                      <span className="text-slate-300">V2 (Descarga)</span>
                      <select
                        value={activeParams.v2Opening}
                        onChange={(e) =>
                          updateActiveParams({ v2Opening: e.target.value as ValveOpening })
                        }
                        className="w-full px-2 py-1.5 rounded bg-[#0B0F17] border border-slate-700 text-slate-100"
                      >
                        <option value="100%">100% (K=0.2)</option>
                        <option value="75%">75% (K=0.9)</option>
                        <option value="50%">50% (K=4.5)</option>
                        <option value="25%">25% (K=24)</option>
                      </select>
                    </label>
                  </div>
                )}

                {activeParams.hasPump && (
                  <label className="block space-y-1">
                    <span className="flex justify-between text-slate-300">
                      <span>Válvula check V3 (K_V3)</span>
                      <span className="font-mono text-amber-300">{activeParams.kV3Check.toFixed(1)}</span>
                    </span>
                    <input
                      type="range"
                      min={0.5}
                      max={15}
                      step={0.5}
                      value={activeParams.kV3Check}
                      onChange={(e) => updateActiveParams({ kV3Check: Number(e.target.value) })}
                      className="w-full"
                    />
                  </label>
                )}

                <label className="block space-y-1">
                  <span className="flex justify-between text-slate-300">
                    <span>Codos totales (K_codos)</span>
                    <span className="font-mono text-slate-200">{activeParams.kElbowsTotal.toFixed(1)}</span>
                  </span>
                  <input
                    type="range"
                    min={0.2}
                    max={10}
                    step={0.2}
                    value={activeParams.kElbowsTotal}
                    onChange={(e) => updateActiveParams({ kElbowsTotal: Number(e.target.value) })}
                    className="w-full"
                  />
                </label>

                <div className="grid grid-cols-2 gap-2.5">
                  <label className="block space-y-1">
                    <span className="flex justify-between text-slate-300">
                      <span>K_ent</span>
                      <span className="font-mono text-slate-200">{activeParams.kEntrance.toFixed(2)}</span>
                    </span>
                    <input
                      type="range"
                      min={0.04}
                      max={1.0}
                      step={0.02}
                      value={activeParams.kEntrance}
                      onChange={(e) => updateActiveParams({ kEntrance: Number(e.target.value) })}
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="flex justify-between text-slate-300">
                      <span>K_sal</span>
                      <span className="font-mono text-slate-200">{activeParams.kExit.toFixed(2)}</span>
                    </span>
                    <input
                      type="range"
                      min={0.2}
                      max={1.0}
                      step={0.05}
                      value={activeParams.kExit}
                      onChange={(e) => updateActiveParams({ kExit: Number(e.target.value) })}
                      className="w-full"
                    />
                  </label>
                </div>
              </div>

              {/* Group 4: Pump & Motor Efficiencies */}
              {activeParams.hasPump && (
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                    4. Eficiencias Turbomáquina
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <label className="block space-y-1">
                      <span className="flex justify-between text-slate-300">
                        <span>η bomba</span>
                        <span className="font-mono text-emerald-300">{activeParams.etaPumpPct}%</span>
                      </span>
                      <input
                        type="range"
                        min={30}
                        max={95}
                        step={1}
                        value={activeParams.etaPumpPct}
                        onChange={(e) => updateActiveParams({ etaPumpPct: Number(e.target.value) })}
                        data-testid="cfd-etapump-slider"
                        className="w-full"
                      />
                    </label>
                    <label className="block space-y-1">
                      <span className="flex justify-between text-slate-300">
                        <span>η motor</span>
                        <span className="font-mono text-emerald-300">{activeParams.etaMotorPct}%</span>
                      </span>
                      <input
                        type="range"
                        min={50}
                        max={99}
                        step={1}
                        value={activeParams.etaMotorPct}
                        onChange={(e) => updateActiveParams({ etaMotorPct: Number(e.target.value) })}
                        className="w-full"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Right Stage: 3D Cutaway CFD Canvas + Live Energy Breakdown */}
            <div className="lg:col-span-8 space-y-4">
              <div className="rounded-xl bg-[#111827] border border-slate-800 p-4">
                <PipeLossCFDCanvas
                  params={activeParams}
                  solution={solution}
                  layoutMode={activeCFDCase.layoutMode}
                  caseTitle={activeCFDCase.title}
                  allowOriginalInfographicToggle={activeCFDCase.id === 'ejemplo-2-infografia-cfd'}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl bg-[#111827] border border-slate-800 p-3">
                  <div className="text-[11px] text-slate-400">Pérdida Primaria (hf)</div>
                  <div className="font-mono text-base font-bold text-sky-300 tabular-nums">
                    {solution.hfTotalM.toFixed(3)} m
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 tabular-nums">
                    f₂ = {solution.line2.frictionFactor.toFixed(5)}
                  </div>
                </div>
                <div className="rounded-xl bg-[#111827] border border-slate-800 p-3">
                  <div className="text-[11px] text-slate-400">Pérdida Secundaria (hm)</div>
                  <div className="font-mono text-base font-bold text-amber-300 tabular-nums">
                    {solution.hmTotalM.toFixed(3)} m
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 tabular-nums">
                    ΣK = {(solution.line1.sumK + solution.line2.sumK).toFixed(2)}
                  </div>
                </div>
                <div className="rounded-xl bg-[#111827] border border-slate-800 p-3">
                  <div className="text-[11px] text-slate-400">Pérdida Total (hL)</div>
                  <div className="font-mono text-base font-bold text-emerald-300 tabular-nums">
                    {solution.hLTotalM.toFixed(3)} m
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 tabular-nums">
                    Δp_eq = {solution.deltaPEquivKpa.toFixed(2)} kPa
                  </div>
                </div>
                <div className="rounded-xl bg-[#111827] border border-slate-800 p-3">
                  <div className="text-[11px] text-slate-400">
                    {activeParams.hasPump ? 'Potencia Eléctrica' : 'Potencia Hidráulica'}
                  </div>
                  <div className="font-mono text-base font-bold text-slate-100 tabular-nums">
                    {activeParams.hasPump
                      ? `${solution.electricPowerKw.toFixed(2)} kW`
                      : `${solution.hydraulicPowerW.toFixed(1)} W`}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 tabular-nums">
                    {activeParams.hasPump
                      ? `${solution.electricPowerHp.toFixed(2)} HP · H=${solution.pumpHeadM.toFixed(1)} m`
                      : `Re = ${Math.round(solution.line2.reynolds).toLocaleString('es-CL')}`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full Step-by-Step Professor Board (Steps 1 - 8 + Dictionary + Physics) */}
          <PipeLossProfessorBoard
            params={activeParams}
            solution={solution}
            physicalNote={activeCFDCase.physicalNote}
            typicalErrors={activeCFDCase.typicalErrors}
          />
        </div>
      )}
    </div>
  );
};
