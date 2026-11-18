import React, { useState } from 'react';
import { SlideDiagramType } from '../../data/lectureTypes';

export const LectureDiagramsPart1: React.FC<{ type: SlideDiagramType }> = ({ type }) => {
  // Local interactive states for diagram micro-interactions
  const [shearLoad, setShearLoad] = useState(50);
  const [reBoundary, setReBoundary] = useState(5000);
  const [idealToggle, setIdealToggle] = useState(false);
  const [continuumScale, setContinuumScale] = useState(55);
  const [flowSteady, setFlowSteady] = useState(true);
  const [nozzleRatio, setNozzleRatio] = useState(55);
  const [methodTab, setMethodTab] = useState<'integral' | 'diferencial' | 'dimensional'>('integral');
  const [waterTemp, setWaterTemp] = useState(4);
  const [gasAtm, setGasAtm] = useState(1.0);
  const [couetteMode, setCouetteMode] = useState<'placas' | 'cilindros'>('placas');
  const [couetteFluid, setCouetteFluid] = useState<'agua' | 'sae30' | 'miel'>('sae30');
  const [couetteU, setCouetteU] = useState(2.0);
  const [rheoView, setRheoView] = useState<'curvas' | 'termico'>('curvas');
  const [shearRate, setShearRate] = useState(60);
  const [pAbsKpa, setPAbsKpa] = useState(65);
  const [vaporTempC, setVaporTempC] = useState(20);
  const [compAtm, setCompAtm] = useState(100);
  const [machV, setMachV] = useState(100);
  const [capMode, setCapMode] = useState<'capilar' | 'gota'>('capilar');
  const [capDiaMm, setCapDiaMm] = useState(2.0);
  const [wedgeDeg, setWedgeDeg] = useState(35);
  const [paradoxH, setParadoxH] = useState(2.0);
  const [paradoxFluid, setParadoxFluid] = useState<'agua' | 'aceite' | 'hg'>('agua');
  const [altM, setAltM] = useState(2400);
  const [hydroMode, setHydroMode] = useState<'u' | 'inclinado' | 'prensa'>('u');
  const [inclineDeg, setInclineDeg] = useState(25);
  const [pascalRatio, setPascalRatio] = useState(5);
  const [gateDepth, setGateDepth] = useState(2.0);
  const [gateAngle, setGateAngle] = useState(55);
  const [archRho, setArchRho] = useState(917);
  const [archSea, setArchSea] = useState(true);
  const [deformMode, setDeformMode] = useState<'traslacion' | 'rotacion' | 'dilatacion' | 'cizalla'>('cizalla');
  const [deformAmp, setDeformAmp] = useState(60);
  const [contStretch, setContStretch] = useState(40);
  const [throatD, setThroatD] = useState(55);
  const [nsCase, setNsCase] = useState<'full' | 'euler' | 'hidro' | 'poiseuille'>('full');

  switch (type) {
    case 'fluid_vs_solid': {
      const solidAngle = Math.min(26, shearLoad * 0.25);
      const fluidSlip = shearLoad * 1.1;
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Esfuerzo cortante aplicado τ:</span>
              <input
                type="range"
                min={0}
                max={100}
                value={shearLoad}
                onChange={(e) => setShearLoad(Number(e.target.value))}
                className="w-28 sm:w-36"
              />
              <span className="font-mono text-sky-300 tabular-nums">{shearLoad} Pa</span>
            </label>
          </div>
          <svg viewBox="0 0 460 155" className="w-full h-40">
            {/* Solid block */}
            <rect x="20" y="122" width="175" height="12" fill="#1E293B" />
            <polygon
              points={`65,122 145,122 ${145 + solidAngle},${50} ${65 + solidAngle},${50}`}
              fill="#38BDF8"
              fillOpacity="0.28"
              stroke="#38BDF8"
              strokeWidth="2"
            />
            <line x1="95" y1="40" x2={135 + solidAngle} y2="40" stroke="#F59E0B" strokeWidth="2.5" />
            <polygon points={`${139 + solidAngle},40 ${130 + solidAngle},36 ${130 + solidAngle},44`} fill="#F59E0B" />
            <text x="108" y="24" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="bold">
              Sólido Elástico (τ = G·γ)
            </text>
            <text x="108" y="148" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">
              Se deforma γ = {(solidAngle * 0.8).toFixed(1)}° y FRENA
            </text>

            {/* Fluid element */}
            <rect x="245" y="122" width="195" height="12" fill="#1E293B" />
            <polygon
              points={`275,122 345,122 ${345 + fluidSlip * 0.72},${50} ${275 + fluidSlip * 0.72},${50}`}
              fill="#10B981"
              fillOpacity="0.25"
              stroke="#10B981"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            <line x1="295" y1="40" x2={345 + fluidSlip * 0.65} y2="40" stroke="#F59E0B" strokeWidth="2.5" />
            <polygon
              points={`${349 + fluidSlip * 0.65},40 ${340 + fluidSlip * 0.65},36 ${340 + fluidSlip * 0.65},44`}
              fill="#F59E0B"
            />
            <text x="342" y="24" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="bold">
              Fluido Viscoso (τ = μ·dγ/dt)
            </text>
            <text x="342" y="148" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="JetBrains Mono">
              Fluye sin parar: dγ/dt = {(shearLoad * 0.4).toFixed(1)} s⁻¹
            </text>
          </svg>
        </div>
      );
    }

    case 'no_slip_boundary': {
      const deltaScale = idealToggle ? 2 : Math.max(12, Math.min(52, 1600 / Math.sqrt(reBoundary)));
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIdealToggle(false)}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  !idealToggle ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Fluido Real (μ &gt; 0)
              </button>
              <button
                type="button"
                onClick={() => setIdealToggle(true)}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  idealToggle ? 'bg-amber-400 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Ideal Invíscido (μ = 0)
              </button>
            </div>
            {!idealToggle && (
              <label className="flex items-center gap-2 text-slate-300">
                <span>Re:</span>
                <input
                  type="range"
                  min={800}
                  max={40000}
                  step={400}
                  value={reBoundary}
                  onChange={(e) => setReBoundary(Number(e.target.value))}
                  className="w-28"
                />
                <span className="font-mono text-sky-300 tabular-nums">{reBoundary.toLocaleString('es-CL')}</span>
              </label>
            )}
          </div>
          <svg viewBox="0 0 460 155" className="w-full h-40">
            {/* Uniform incoming flow */}
            {[38, 62, 86, 110].map((y) => (
              <g key={y}>
                <line x1="25" y1={y} x2="78" y2={y} stroke="#38BDF8" strokeWidth="1.6" />
                <polygon points={`80,${y} 73,${y - 3} 73,${y + 3}`} fill="#38BDF8" />
              </g>
            ))}
            <text x="52" y="24" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">
              U_∞ uniforme
            </text>
            {/* Flat plate */}
            <rect x="110" y="118" width="320" height="12" fill="#334155" />
            <text x="270" y="146" textAnchor="middle" fill="#CBD5E1" fontSize="10" fontFamily="JetBrains Mono">
              {idealToggle
                ? 'Sin adherencia: u(y=0) = U_∞ (no hay capa límite)'
                : 'Condición de No Deslizamiento: u(y=0) = 0 sobre toda la placa'}
            </text>
            {/* Boundary layer curve */}
            {!idealToggle && (
              <>
                <path
                  d={`M 110 118 Q 220 ${118 - deltaScale * 0.72} 420 ${118 - deltaScale}`}
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />
                <path
                  d={`M 110 118 Q 220 ${118 - deltaScale * 0.72} 420 ${118 - deltaScale} L 420 118 Z`}
                  fill="#F59E0B"
                  fillOpacity="0.12"
                />
                <text x="355" y={110 - deltaScale} fill="#F59E0B" fontSize="10" fontFamily="JetBrains Mono">
                  Capa Límite δ(x)
                </text>
              </>
            )}
            {/* Velocity profile inside/after */}
            {[0.25, 0.5, 0.75, 1.0].map((f, i) => {
              const y = 118 - f * 72;
              const velFrac = idealToggle ? 1 : f * deltaScale < f * 72 ? Math.min(1, (f * 72) / deltaScale) : 1;
              const len = 58 * (idealToggle ? 1 : Math.pow(velFrac, 0.5));
              return (
                <g key={i}>
                  <line x1="290" y1={y} x2={290 + len} y2={y} stroke="#10B981" strokeWidth="2" />
                  <polygon points={`${290 + len + 4},${y} ${290 + len - 2},${y - 2.5} ${290 + len - 2},${y + 2.5}`} fill="#10B981" />
                </g>
              );
            })}
            <line x1="290" y1="36" x2="290" y2="118" stroke="#64748B" strokeWidth="1" />
          </svg>
        </div>
      );
    }

    case 'continuum_field': {
      const isContinuum = continuumScale >= 38 && continuumScale <= 82;
      const statusText =
        continuumScale < 38
          ? 'Escala Sub-Continuo (δV < δV*): Fluctuaciones moleculares'
          : continuumScale <= 82
            ? 'Hipótesis del Medio Continuo VÁLIDA (ρ suave ≈ 998 kg/m³)'
            : 'Escala Macro-Heterogénea: Gradientes espaciales dominan';
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Tamaño volumen muestreo δV:</span>
              <input
                type="range"
                min={8}
                max={96}
                value={continuumScale}
                onChange={(e) => setContinuumScale(Number(e.target.value))}
                className="w-32"
              />
            </label>
            <span className={`font-mono ${isContinuum ? 'text-emerald-400' : 'text-amber-300'}`}>
              {statusText}
            </span>
          </div>
          <svg viewBox="0 0 460 145" className="w-full h-36">
            <line x1="45" y1="118" x2="430" y2="118" stroke="#475569" strokeWidth="1.5" />
            <line x1="45" y1="18" x2="45" y2="118" stroke="#475569" strokeWidth="1.5" />
            <text x="38" y="24" textAnchor="end" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">ρ</text>
            <text x="425" y="135" textAnchor="end" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">log(δV)</text>
            {/* Continuum plateau band */}
            <rect x="180" y="22" width="160" height="95" fill="#10B981" fillOpacity="0.08" />
            <line x1="180" y1="22" x2="180" y2="118" stroke="#F59E0B" strokeDasharray="3 3" />
            <text x="180" y="15" textAnchor="middle" fill="#F59E0B" fontSize="9.5" fontFamily="JetBrains Mono">δV*</text>
            {/* Curve */}
            <path
              d="M 50 40 L 68 95 L 88 28 L 110 88 L 135 52 L 160 72 L 180 65 L 340 65 Q 385 64 420 44"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2.3"
            />
            <circle cx={45 + (continuumScale / 100) * 375} cy={continuumScale < 38 ? 65 + Math.sin(continuumScale) * 26 : continuumScale > 82 ? 52 : 65} r="5.5" fill="#F59E0B" />
          </svg>
        </div>
      );
    }

    case 'eulerian_lagrangian': {
      const throatHalf = 45 - (nozzleRatio / 100) * 24;
      const vRatio = (45 / throatHalf).toFixed(2);
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFlowSteady(true)}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  flowSteady ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Estacionario (∂V/∂t = 0)
              </button>
              <button
                type="button"
                onClick={() => setFlowSteady(false)}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  !flowSteady ? 'bg-amber-400 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Transiente (∂V/∂t ≠ 0)
              </button>
            </div>
            <label className="flex items-center gap-2 text-slate-300">
              <span>Contracción tobera:</span>
              <input
                type="range"
                min={10}
                max={85}
                value={nozzleRatio}
                onChange={(e) => setNozzleRatio(Number(e.target.value))}
                className="w-24"
              />
              <span className="font-mono text-emerald-400 tabular-nums">V₂/V₁ = {vRatio}×</span>
            </label>
          </div>
          <svg viewBox="0 0 460 155" className="w-full h-40">
            {/* Upper & lower nozzle walls */}
            <path d={`M 30 30 L 145 30 Q 210 30 250 ${75 - throatHalf} L 420 ${75 - throatHalf}`} fill="none" stroke="#64748B" strokeWidth="2.5" />
            <path d={`M 30 120 L 145 120 Q 210 120 250 ${75 + throatHalf} L 420 ${75 + throatHalf}`} fill="none" stroke="#64748B" strokeWidth="2.5" />
            {/* Eulerian CV box */}
            <rect x="165" y="24" width="110" height="102" fill="#0EA5E9" fillOpacity="0.09" stroke="#38BDF8" strokeDasharray="4 3" />
            <text x="220" y="17" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="JetBrains Mono">
              Volumen de Control Euleriano Fijo
            </text>
            {/* Streamlines */}
            {[-0.6, 0, 0.6].map((f, i) => (
              <path
                key={i}
                d={`M 40 ${75 + f * 34} L 145 ${75 + f * 34} Q 210 ${75 + f * 34} 250 ${75 + f * (throatHalf * 0.75)} L 410 ${75 + f * (throatHalf * 0.75) + (flowSteady ? 0 : Math.sin(i + 1) * 7)}`}
                fill="none"
                stroke="#10B981"
                strokeWidth="1.6"
              />
            ))}
            {/* Velocity arrows showing convective acceleration */}
            <line x1="70" y1="75" x2="108" y2="75" stroke="#F59E0B" strokeWidth="2.5" />
            <polygon points="113,75 105,71 105,79" fill="#F59E0B" />
            <line x1="305" y1="75" x2={305 + 32 * Number(vRatio)} y2="75" stroke="#F59E0B" strokeWidth="2.5" />
            <polygon points={`${309 + 32 * Number(vRatio)},75 ${301 + 32 * Number(vRatio)},71 ${301 + 32 * Number(vRatio)},79`} fill="#F59E0B" />
            <text x="230" y="144" textAnchor="middle" fill="#CBD5E1" fontSize="10" fontFamily="JetBrains Mono">
              {flowSteady
                ? 'Trayectoria = Traza = Línea de Corriente · Aceleración convectiva u·(∂u/∂x) > 0'
                : 'En flujo transiente las líneas de corriente cambian cada instante y difieren de la trayectoria'}
            </text>
          </svg>
        </div>
      );
    }

    case 'analysis_methods': {
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              { id: 'integral', label: '1. Método Integral (VC)' },
              { id: 'diferencial', label: '2. Método Diferencial (N-S)' },
              { id: 'dimensional', label: '3. Análisis Dimensional (Π)' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMethodTab(item.id as 'integral' | 'diferencial' | 'dimensional')}
                className={`px-3 py-1.5 rounded font-medium cursor-pointer ${
                  methodTab === item.id ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <svg viewBox="0 0 460 135" className="w-full h-36">
            {methodTab === 'integral' && (
              <>
                <path d="M 80 35 L 180 35 Q 230 35 230 85 L 230 118 M 80 85 L 155 85 Q 180 85 180 118" fill="none" stroke="#64748B" strokeWidth="2.5" />
                <rect x="135" y="25" width="110" height="82" fill="#38BDF8" fillOpacity="0.12" stroke="#38BDF8" strokeDasharray="4 3" />
                <text x="190" y="16" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="JetBrains Mono">Volumen de Control Finito (Codo)</text>
                <text x="350" y="55" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="bold">Calcula fuerzas globales F_R</text>
                <text x="350" y="75" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="JetBrains Mono">Solo usa entradas/salidas</text>
                <text x="350" y="95" textAnchor="middle" fill="#F59E0B" fontSize="10" fontFamily="JetBrains Mono">ΣF = ∂/∂t∫ρVdV + ∫ρV(V·n)dA</text>
              </>
            )}
            {methodTab === 'diferencial' && (
              <>
                <rect x="95" y="38" width="70" height="60" fill="#F59E0B" fillOpacity="0.14" stroke="#F59E0B" strokeWidth="2" />
                <text x="130" y="72" textAnchor="middle" fill="#F59E0B" fontSize="11" fontFamily="JetBrains Mono">dx·dy·dz</text>
                <text x="320" y="52" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="bold">Campo punto a punto u(x,y,z)</text>
                <text x="320" y="74" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="JetBrains Mono">ρ(DV/Dt) = -∇p + ρg + μ∇²V</text>
                <text x="320" y="96" textAnchor="middle" fill="#94A3B8" fontSize="10">Base de Poiseuille y CFD</text>
              </>
            )}
            {methodTab === 'dimensional' && (
              <>
                <rect x="45" y="34" width="105" height="65" rx="6" fill="#1E293B" stroke="#64748B" />
                <text x="97" y="64" textAnchor="middle" fill="#E2E8F0" fontSize="11">Modelo 1:λ</text>
                <text x="97" y="82" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="JetBrains Mono">Π₁ = φ(Π₂)</text>
                <line x1="160" y1="66" x2="275" y2="66" stroke="#10B981" strokeWidth="2" />
                <polygon points="280,66 270,61 270,71" fill="#10B981" />
                <rect x="290" y="34" width="125" height="65" rx="6" fill="#1E293B" stroke="#10B981" />
                <text x="352" y="64" textAnchor="middle" fill="#E2E8F0" fontSize="11">Prototipo Real</text>
                <text x="352" y="82" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="JetBrains Mono">Ensayos en Túnel/Canal</text>
              </>
            )}
          </svg>
        </div>
      );
    }

    case 'ideal_gas_anomaly': {
      // Water density peak around 3.98 °C
      const rhoWater = 1000 - 0.0082 * Math.pow(waterTemp - 4, 2);
      const rhoAir = (gasAtm * 101325) / (287.05 * (273.15 + waterTemp));
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Temperatura T:</span>
              <input
                type="range"
                min={0}
                max={25}
                step={0.5}
                value={waterTemp}
                onChange={(e) => setWaterTemp(Number(e.target.value))}
                className="w-24"
              />
              <span className="font-mono text-sky-300 tabular-nums">{waterTemp.toFixed(1)} °C</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300">
              <span>Presión Aire:</span>
              <input
                type="range"
                min={0.5}
                max={5}
                step={0.5}
                value={gasAtm}
                onChange={(e) => setGasAtm(Number(e.target.value))}
                className="w-24"
              />
              <span className="font-mono text-amber-300 tabular-nums">{gasAtm.toFixed(1)} atm</span>
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg bg-slate-900/70 border border-slate-800 p-3 space-y-1.5">
              <div className="text-sky-300 font-semibold">Anomalía del Agua (Máximo a 4 °C)</div>
              <div className="font-mono text-sm text-slate-100 tabular-nums">
                ρ_H₂O = {rhoWater.toFixed(2)} kg/m³
              </div>
              <div className="text-slate-400">
                {Math.abs(waterTemp - 4) <= 1
                  ? '¡Pico máximo de densidad (1000 kg/m³)!'
                  : waterTemp < 4
                    ? 'Bajo 4°C el agua se expande al acercarse al hielo.'
                    : 'Sobre 4°C la agitación térmica reduce levemente ρ.'}
              </div>
            </div>
            <div className="rounded-lg bg-slate-900/70 border border-slate-800 p-3 space-y-1.5">
              <div className="text-amber-300 font-semibold">Aire como Gas Ideal (ρ = p / RT)</div>
              <div className="font-mono text-sm text-slate-100 tabular-nums">
                ρ_aire = {rhoAir.toFixed(3)} kg/m³
              </div>
              <div className="text-slate-400 font-mono tabular-nums">
                T_abs = {(waterTemp + 273.15).toFixed(2)} K · p_abs = {(gasAtm * 101.325).toFixed(1)} kPa
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'viscosity_couette': {
      const muMap = { agua: 0.001, sae30: 0.29, miel: 2.5 };
      const mu = muMap[couetteFluid];
      const h = 0.002;
      const tau = mu * (couetteU / h);
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCouetteMode('placas')}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  couetteMode === 'placas' ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Flujo Couette
              </button>
              <button
                type="button"
                onClick={() => setCouetteMode('cilindros')}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  couetteMode === 'cilindros' ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Cilindros Concéntricos
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              {(['agua', 'sae30', 'miel'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setCouetteFluid(f)}
                  className={`px-2 py-1 rounded uppercase font-mono text-[11px] cursor-pointer ${
                    couetteFluid === f ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-slate-300">
              <span>U:</span>
              <input
                type="range"
                min={0.5}
                max={4}
                step={0.5}
                value={couetteU}
                onChange={(e) => setCouetteU(Number(e.target.value))}
                className="w-20"
              />
              <span className="font-mono text-sky-300 tabular-nums">{couetteU.toFixed(1)} m/s</span>
            </label>
          </div>
          <svg viewBox="0 0 460 155" className="w-full h-40">
            {couetteMode === 'placas' ? (
              <>
                <rect x="35" y="24" width="380" height="12" fill="#334155" />
                <text x="225" y="17" textAnchor="middle" fill="#38BDF8" fontSize="11" fontFamily="JetBrains Mono">
                  Placa móvil U = {couetteU.toFixed(1)} m/s · μ = {mu} Pa·s · τ = {tau.toFixed(1)} Pa
                </text>
                <rect x="35" y="122" width="380" height="12" fill="#1E293B" />
                <text x="225" y="148" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">
                  Placa fija (u = 0) · Espesor h = 2 mm · du/dy = {(couetteU / h).toFixed(0)} s⁻¹
                </text>
                {[0.2, 0.4, 0.6, 0.8, 1].map((frac, idx) => {
                  const y = 122 - frac * 86;
                  const len = frac * (45 + couetteU * 38);
                  return (
                    <g key={idx}>
                      <line x1="125" y1={y} x2={125 + len} y2={y} stroke="#0EA5E9" strokeWidth="2.2" />
                      <polygon points={`${129 + len},${y} ${121 + len},${y - 3} ${121 + len},${y + 3}`} fill="#0EA5E9" />
                    </g>
                  );
                })}
                <line x1="125" y1="122" x2={125 + 45 + couetteU * 38} y2="36" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 3" />
              </>
            ) : (
              <>
                <circle cx="150" cy="78" r="56" fill="#1E293B" stroke="#64748B" strokeWidth="2.5" />
                <circle cx="150" cy="78" r="44" fill="#0EA5E9" fillOpacity="0.18" stroke="#38BDF8" strokeDasharray="3 2" />
                <circle cx="150" cy="78" r="35" fill="#0B0F17" stroke="#F59E0B" strokeWidth="2" />
                <path d="M 135 66 A 20 20 0 0 1 168 68" fill="none" stroke="#10B981" strokeWidth="2.2" />
                <polygon points="171,71 164,68 169,63" fill="#10B981" />
                <text x="150" y="82" textAnchor="middle" fill="#F59E0B" fontSize="10" fontFamily="JetBrains Mono">ω, R</text>
                <text x="330" y="52" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="bold">Viscosímetro Rotacional</text>
                <text x="330" y="74" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="JetBrains Mono">
                  Holgura radial l ≪ R
                </text>
                <text x="330" y="96" textAnchor="middle" fill="#F59E0B" fontSize="10" fontFamily="JetBrains Mono">
                  T = (2π · μ · ω · R³ · L) / l
                </text>
              </>
            )}
          </svg>
        </div>
      );
    }

    case 'non_newtonian': {
      const xPos = 60 + (shearRate / 100) * 260;
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setRheoView('curvas')}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  rheoView === 'curvas' ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Reología τ vs du/dy
              </button>
              <button
                type="button"
                onClick={() => setRheoView('termico')}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  rheoView === 'termico' ? 'bg-amber-400 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Efecto Térmico μ(T)
              </button>
            </div>
            {rheoView === 'curvas' && (
              <label className="flex items-center gap-2 text-slate-300">
                <span>Tasa de corte du/dy:</span>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={shearRate}
                  onChange={(e) => setShearRate(Number(e.target.value))}
                  className="w-24"
                />
              </label>
            )}
          </div>
          <svg viewBox="0 0 460 155" className="w-full h-40">
            <line x1="60" y1="130" x2="420" y2="130" stroke="#475569" strokeWidth="1.5" />
            <line x1="60" y1="18" x2="60" y2="130" stroke="#475569" strokeWidth="1.5" />
            {rheoView === 'curvas' ? (
              <>
                <text x="415" y="146" textAnchor="end" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">du/dy [1/s]</text>
                <text x="52" y="24" textAnchor="end" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">τ</text>
                <line x1="60" y1="88" x2="265" y2="22" stroke="#A78BFA" strokeWidth="2.2" />
                <text x="270" y="26" fill="#A78BFA" fontSize="10">Plástico Bingham (τ₀ &gt; 0)</text>
                <path d="M 60 130 Q 140 58 340 44" fill="none" stroke="#38BDF8" strokeWidth="2.2" />
                <text x="345" y="48" fill="#38BDF8" fontSize="10">Pseudoplástico (n &lt; 1)</text>
                <line x1="60" y1="130" x2="340" y2="70" stroke="#10B981" strokeWidth="2.2" />
                <text x="345" y="74" fill="#10B981" fontSize="10">Newtoniano (n = 1)</text>
                <path d="M 60 130 Q 225 124 340 94" fill="none" stroke="#F59E0B" strokeWidth="2.2" />
                <text x="345" y="99" fill="#F59E0B" fontSize="10">Dilatante (n &gt; 1)</text>
                <line x1={xPos} y1="20" x2={xPos} y2="130" stroke="#64748B" strokeDasharray="3 3" />
              </>
            ) : (
              <>
                <text x="415" y="146" textAnchor="end" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">Temperatura T [°C]</text>
                <text x="52" y="24" textAnchor="end" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">μ</text>
                <path d="M 75 28 Q 140 98 380 118" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
                <text x="155" y="48" fill="#38BDF8" fontSize="10.5">LÍQUIDOS (Aceite/Agua): T ↑ ⇒ μ ↓ (baja cohesión)</text>
                <path d="M 75 112 Q 210 92 380 65" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
                <text x="200" y="108" fill="#F59E0B" fontSize="10.5">GASES (Aire): T ↑ ⇒ μ ↑ (más choques)</text>
              </>
            )}
          </svg>
        </div>
      );
    }

    case 'pressure_scales': {
      // Vapor pressure approximation in kPa
      const pvKpa = 0.6108 * Math.exp((17.27 * vaporTempC) / (vaporTempC + 237.3));
      const patm = 101.325;
      const pGauge = pAbsKpa - patm;
      const cavitating = pAbsKpa <= pvKpa;
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Presión Absoluta:</span>
              <input
                type="range"
                min={2}
                max={180}
                value={pAbsKpa}
                onChange={(e) => setPAbsKpa(Number(e.target.value))}
                className="w-28"
              />
              <span className="font-mono text-sky-300 tabular-nums">{pAbsKpa} kPa abs</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300">
              <span>T agua:</span>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={vaporTempC}
                onChange={(e) => setVaporTempC(Number(e.target.value))}
                className="w-24"
              />
              <span className="font-mono text-amber-300 tabular-nums">{vaporTempC} °C (p_v={pvKpa.toFixed(1)} kPa)</span>
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="rounded-lg bg-slate-900/75 border border-slate-800 p-2.5 font-mono tabular-nums">
              <div className="text-slate-400">p_atm local</div>
              <div className="text-slate-100 text-sm">101.3 kPa abs</div>
            </div>
            <div className="rounded-lg bg-slate-900/75 border border-slate-800 p-2.5 font-mono tabular-nums">
              <div className="text-slate-400">{pGauge >= 0 ? 'p_manométrica' : 'p_vacío'}</div>
              <div className={pGauge >= 0 ? 'text-sky-300 text-sm' : 'text-amber-300 text-sm'}>
                {pGauge >= 0 ? `+${pGauge.toFixed(1)} kPa` : `${Math.abs(pGauge).toFixed(1)} kPa vacío`}
              </div>
            </div>
            <div
              className={`rounded-lg border p-2.5 font-mono ${
                cavitating
                  ? 'bg-red-950/40 border-red-500/50 text-red-200'
                  : 'bg-emerald-950/35 border-emerald-500/40 text-emerald-200'
              }`}
            >
              <div className="text-[11px] uppercase">Estado de Fase</div>
              <div className="font-semibold">
                {cavitating ? 'EBULLICIÓN / CAVITA (p ≤ p_v)' : 'Líquido Subenfriado Seguro'}
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'compressibility_elasticity': {
      const drhoWaterPct = (((compAtm - 1) * 101325) / 2.2e9) * 100;
      const ma = machV / 343;
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Compresión hidráulica:</span>
              <input
                type="range"
                min={1}
                max={200}
                value={compAtm}
                onChange={(e) => setCompAtm(Number(e.target.value))}
                className="w-24"
              />
              <span className="font-mono text-sky-300 tabular-nums">{compAtm} atm</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300">
              <span>Velocidad aire V:</span>
              <input
                type="range"
                min={10}
                max={340}
                step={10}
                value={machV}
                onChange={(e) => setMachV(Number(e.target.value))}
                className="w-24"
              />
              <span className="font-mono text-amber-300 tabular-nums">{machV} m/s</span>
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg bg-slate-900/75 border border-slate-800 p-3 space-y-1">
              <div className="text-sky-300 font-semibold">Agua (K = 2.2 GPa)</div>
              <div className="font-mono text-slate-100 tabular-nums">Δρ/ρ = +{drhoWaterPct.toFixed(2)}%</div>
              <div className="text-slate-400">Incluso a 200 atm varía menos de 1%: ¡incompresible!</div>
            </div>
            <div className="rounded-lg bg-slate-900/75 border border-slate-800 p-3 space-y-1">
              <div className="text-amber-300 font-semibold">Criterio Mach en Aire (c = 343 m/s)</div>
              <div className="font-mono text-slate-100 tabular-nums">Ma = {ma.toFixed(2)}</div>
              <div className={ma < 0.3 ? 'text-emerald-400' : 'text-red-300'}>
                {ma < 0.3 ? 'Ma < 0.3 ⇒ Flujo incompresible válido' : 'Ma ≥ 0.3 ⇒ Compresibilidad significativa'}
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'vapor_capillarity': {
      const hWaterMm = ((4 * 0.0728 * Math.cos((20 * Math.PI) / 180)) / (998 * 9.81 * (capDiaMm / 1000))) * 1000;
      const hHgMm = ((4 * 0.48 * Math.cos((130 * Math.PI) / 180)) / (13600 * 9.81 * (capDiaMm / 1000))) * 1000;
      const pGota = (4 * 0.0728) / (capDiaMm / 1000);
      const pPompa = (8 * 0.03) / (capDiaMm / 1000);
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCapMode('capilar')}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  capMode === 'capilar' ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Capilaridad Agua vs Hg
              </button>
              <button
                type="button"
                onClick={() => setCapMode('gota')}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  capMode === 'gota' ? 'bg-amber-400 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Gota vs Pompa de Jabón
              </button>
            </div>
            <label className="flex items-center gap-2 text-slate-300">
              <span>Diámetro D:</span>
              <input
                type="range"
                min={0.5}
                max={8}
                step={0.5}
                value={capDiaMm}
                onChange={(e) => setCapDiaMm(Number(e.target.value))}
                className="w-24"
              />
              <span className="font-mono text-sky-300 tabular-nums">{capDiaMm.toFixed(1)} mm</span>
            </label>
          </div>
          <svg viewBox="0 0 460 155" className="w-full h-40">
            {capMode === 'capilar' ? (
              <>
                <rect x="40" y="105" width="140" height="40" fill="#0284C7" fillOpacity="0.25" stroke="#38BDF8" />
                <rect x="97" y="25" width="26" height="105" fill="#0B0F17" stroke="#94A3B8" strokeWidth="1.5" />
                <path
                  d={`M 97 ${Math.max(30, 105 - hWaterMm * 2.2)} Q 110 ${Math.max(38, 114 - hWaterMm * 2.2)} 123 ${Math.max(30, 105 - hWaterMm * 2.2)} L 123 130 L 97 130 Z`}
                  fill="#38BDF8"
                  fillOpacity="0.6"
                />
                <text x="110" y="17" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="JetBrains Mono">
                  Agua: +{hWaterMm.toFixed(1)} mm (Cóncavo)
                </text>
                <rect x="270" y="88" width="140" height="57" fill="#94A3B8" fillOpacity="0.25" stroke="#94A3B8" />
                <rect x="327" y="25" width="26" height="105" fill="#0B0F17" stroke="#94A3B8" strokeWidth="1.5" />
                <path
                  d={`M 327 ${Math.min(124, 88 - hHgMm * 3.0)} Q 340 ${Math.min(115, 79 - hHgMm * 3.0)} 353 ${Math.min(124, 88 - hHgMm * 3.0)} L 353 130 L 327 130 Z`}
                  fill="#CBD5E1"
                  fillOpacity="0.7"
                />
                <text x="340" y="17" textAnchor="middle" fill="#CBD5E1" fontSize="10" fontFamily="JetBrains Mono">
                  Hg: {hHgMm.toFixed(1)} mm (Convexo)
                </text>
              </>
            ) : (
              <>
                <circle cx="115" cy="75" r="42" fill="#38BDF8" fillOpacity="0.35" stroke="#38BDF8" strokeWidth="2.5" />
                <text x="115" y="138" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="JetBrains Mono">
                  Gota (1 interfaz): Δp = 2σ/R = {pGota.toFixed(0)} Pa
                </text>
                <circle cx="335" cy="75" r="42" fill="none" stroke="#F59E0B" strokeWidth="3" />
                <circle cx="335" cy="75" r="36" fill="none" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3 2" />
                <text x="335" y="138" textAnchor="middle" fill="#F59E0B" fontSize="10" fontFamily="JetBrains Mono">
                  Pompa (2 interfaces): Δp = 4σ/R = {pPompa.toFixed(0)} Pa
                </text>
              </>
            )}
          </svg>
        </div>
      );
    }

    case 'pressure_wedge': {
      const rad = (wedgeDeg * Math.PI) / 180;
      const dx = 90;
      const dz = Math.round(dx * Math.tan(rad));
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Ángulo de la cuña θ:</span>
              <input
                type="range"
                min={20}
                max={60}
                value={wedgeDeg}
                onChange={(e) => setWedgeDeg(Number(e.target.value))}
                className="w-32"
              />
              <span className="font-mono text-sky-300 tabular-nums">{wedgeDeg}°</span>
            </label>
            <span className="font-mono text-emerald-400">p_x = p_z = p_n (Isotropía Escalar)</span>
          </div>
          <svg viewBox="0 0 460 150" className="w-full h-36">
            <polygon
              points={`150,120 ${150 + dx},120 150,${120 - dz}`}
              fill="#0EA5E9"
              fillOpacity="0.25"
              stroke="#38BDF8"
              strokeWidth="2"
            />
            <line x1="100" y1={120 - dz / 2} x2="145" y2={120 - dz / 2} stroke="#F59E0B" strokeWidth="2.5" />
            <text x="95" y={124 - dz / 2} textAnchor="end" fill="#F59E0B" fontSize="11" fontFamily="JetBrains Mono">p_x</text>
            <line x1={150 + dx / 2} y1="145" x2={150 + dx / 2} y2="124" stroke="#10B981" strokeWidth="2.5" />
            <text x={150 + dx / 2 + 10} y="144" fill="#10B981" fontSize="11" fontFamily="JetBrains Mono">p_z</text>
            <line
              x1={150 + dx / 2 + 32 * Math.sin(rad)}
              y1={120 - dz / 2 - 32 * Math.cos(rad)}
              x2={150 + dx / 2}
              y2={120 - dz / 2}
              stroke="#EF4444"
              strokeWidth="2.5"
            />
            <text x={155 + dx / 2 + 34 * Math.sin(rad)} y={120 - dz / 2 - 28 * Math.cos(rad)} fill="#EF4444" fontSize="11" fontFamily="JetBrains Mono">
              p_n
            </text>
            <text x="345" y="70" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontFamily="JetBrains Mono">
              Al tender Δx, Δz → 0:
            </text>
            <text x="345" y="90" textAnchor="middle" fill="#38BDF8" fontSize="11" fontFamily="JetBrains Mono">
              p_x = p_z = p_n
            </text>
          </svg>
        </div>
      );
    }

    case 'hydrostatic_paradox': {
      const rhoMap = { agua: 1000, aceite: 850, hg: 13600 };
      const pKpa = (rhoMap[paradoxFluid] * 9.81 * paradoxH) / 1000;
      const levelY = 105 - (paradoxH / 4) * 65;
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              {(['agua', 'aceite', 'hg'] as const).map((fl) => (
                <button
                  key={fl}
                  type="button"
                  onClick={() => setParadoxFluid(fl)}
                  className={`px-2.5 py-1 rounded uppercase font-mono cursor-pointer ${
                    paradoxFluid === fl ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {fl}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-slate-300">
              <span>Altura h:</span>
              <input
                type="range"
                min={0.5}
                max={4}
                step={0.5}
                value={paradoxH}
                onChange={(e) => setParadoxH(Number(e.target.value))}
                className="w-24"
              />
              <span className="font-mono text-amber-300 tabular-nums">{paradoxH.toFixed(1)} m → P_fondo = {pKpa.toFixed(1)} kPa</span>
            </label>
          </div>
          <svg viewBox="0 0 460 145" className="w-full h-36">
            {/* Common base manifold */}
            <rect x="25" y="105" width="410" height="14" fill="#1E293B" stroke="#475569" />
            <line x1="25" y1={levelY} x2="435" y2={levelY} stroke="#38BDF8" strokeDasharray="3 3" strokeOpacity="0.45" />
            {/* 5 Pascal Vessels */}
            <rect x="45" y={levelY} width="42" height={105 - levelY} fill="#0EA5E9" fillOpacity="0.35" stroke="#94A3B8" strokeWidth="1.5" />
            <polygon points={`110,${levelY} 180,${levelY} 165,105 125,105`} fill="#0EA5E9" fillOpacity="0.35" stroke="#94A3B8" strokeWidth="1.5" />
            <polygon points={`215,${levelY} 235,${levelY} 260,105 190,105`} fill="#0EA5E9" fillOpacity="0.35" stroke="#94A3B8" strokeWidth="1.5" />
            <polygon points={`280,${levelY} 312,${levelY} 335,105 303,105`} fill="#0EA5E9" fillOpacity="0.35" stroke="#94A3B8" strokeWidth="1.5" />
            <polygon points={`365,${levelY} 420,${levelY} 400,65 405,105 380,105 385,65`} fill="#0EA5E9" fillOpacity="0.35" stroke="#94A3B8" strokeWidth="1.5" />
            <text x="230" y="136" textAnchor="middle" fill="#10B981" fontSize="10.5" fontFamily="JetBrains Mono">
              Los 5 recipientes tienen EXACTAMENTE la misma presión basal: P = ρ·g·h = {pKpa.toFixed(1)} kPa
            </text>
          </svg>
        </div>
      );
    }

    case 'atmosphere_polytropic': {
      const tK = 288.15 - 0.0065 * altM;
      const pKpa = 101.325 * Math.pow(1 - (0.0065 * altM) / 288.15, 5.2559);
      const rhoAir = (pKpa * 1000) / (287.05 * tK);
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {[
                { l: 'Valparaíso (0 m)', z: 0 },
                { l: 'Santiago (570 m)', z: 570 },
                { l: 'Farellones (2400 m)', z: 2400 },
                { l: 'Minería (4500 m)', z: 4500 },
                { l: 'Crucero (10000 m)', z: 10000 },
              ].map((p) => (
                <button
                  key={p.z}
                  type="button"
                  onClick={() => setAltM(p.z)}
                  className={`px-2 py-1 rounded cursor-pointer ${
                    altM === p.z ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {p.l}
                </button>
              ))}
            </div>
            <input
              type="range"
              min={0}
              max={11000}
              step={100}
              value={altM}
              onChange={(e) => setAltM(Number(e.target.value))}
              className="w-28"
            />
          </div>
          <div className="grid grid-cols-3 gap-2.5 font-mono tabular-nums">
            <div className="rounded bg-slate-900/75 border border-slate-800 p-2.5">
              <div className="text-slate-400">Temperatura T(z)</div>
              <div className="text-sky-300 text-sm">{(tK - 273.15).toFixed(1)} °C ({tK.toFixed(1)} K)</div>
            </div>
            <div className="rounded bg-slate-900/75 border border-slate-800 p-2.5">
              <div className="text-slate-400">Presión ISA p(z)</div>
              <div className="text-amber-300 text-sm">{pKpa.toFixed(2)} kPa</div>
            </div>
            <div className="rounded bg-slate-900/75 border border-slate-800 p-2.5">
              <div className="text-slate-400">Densidad ρ(z)</div>
              <div className="text-emerald-300 text-sm">{rhoAir.toFixed(3)} kg/m³</div>
            </div>
          </div>
        </div>
      );
    }

    case 'hydrostatics_manometer': {
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex gap-1.5">
              {[
                { id: 'u', label: 'U Multifluido' },
                { id: 'inclinado', label: 'Inclinado θ' },
                { id: 'prensa', label: 'Prensa Pascal' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setHydroMode(m.id as 'u' | 'inclinado' | 'prensa')}
                  className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                    hydroMode === m.id ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            {hydroMode === 'inclinado' && (
              <label className="flex items-center gap-2 text-slate-300">
                <span>Ángulo θ:</span>
                <input type="range" min={10} max={60} value={inclineDeg} onChange={(e) => setInclineDeg(Number(e.target.value))} className="w-24" />
                <span className="font-mono text-amber-300">{inclineDeg}° (Ganancia {(1 / Math.sin((inclineDeg * Math.PI) / 180)).toFixed(2)}×)</span>
              </label>
            )}
            {hydroMode === 'prensa' && (
              <label className="flex items-center gap-2 text-slate-300">
                <span>Razón d₂/d₁:</span>
                <input type="range" min={2} max={10} value={pascalRatio} onChange={(e) => setPascalRatio(Number(e.target.value))} className="w-24" />
                <span className="font-mono text-emerald-400">Ventaja F₂/F₁ = {pascalRatio * pascalRatio}×</span>
              </label>
            )}
          </div>
          <svg viewBox="0 0 460 155" className="w-full h-40">
            {hydroMode === 'u' && (
              <>
                <rect x="35" y="25" width="90" height="105" rx="6" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
                <rect x="37" y="65" width="86" height="63" fill="#0EA5E9" fillOpacity="0.35" />
                <text x="80" y="48" textAnchor="middle" fill="#E2E8F0" fontSize="11">Aire (P₁)</text>
                <path d="M 125 105 L 185 105 L 185 45 L 255 45 L 255 132 L 335 132 L 335 32" fill="none" stroke="#64748B" strokeWidth="14" strokeLinejoin="round" />
                <path d="M 125 105 L 185 105 L 185 75" fill="none" stroke="#38BDF8" strokeWidth="10" />
                <path d="M 185 75 L 185 45 L 255 45 L 255 100" fill="none" stroke="#F59E0B" strokeWidth="10" />
                <path d="M 255 100 L 255 132 L 335 132 L 335 50" fill="none" stroke="#CBD5E1" strokeWidth="10" />
                <text x="220" y="32" textAnchor="middle" fill="#F59E0B" fontSize="10" fontFamily="JetBrains Mono">Aceite (h₂)</text>
                <text x="372" y="84" fill="#CBD5E1" fontSize="10" fontFamily="JetBrains Mono">Hg (h₃)</text>
                <text x="335" y="22" textAnchor="middle" fill="#94A3B8" fontSize="10">P_atm</text>
              </>
            )}
            {hydroMode === 'inclinado' && (
              <>
                <rect x="55" y="60" width="60" height="65" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
                <rect x="57" y="92" width="56" height="31" fill="#F59E0B" fillOpacity="0.65" />
                <line
                  x1="115"
                  y1="115"
                  x2={115 + 220 * Math.cos((inclineDeg * Math.PI) / 180)}
                  y2={115 - 220 * Math.sin((inclineDeg * Math.PI) / 180)}
                  stroke="#64748B"
                  strokeWidth="12"
                />
                <line
                  x1="115"
                  y1="115"
                  x2={115 + 150 * Math.cos((inclineDeg * Math.PI) / 180)}
                  y2={115 - 150 * Math.sin((inclineDeg * Math.PI) / 180)}
                  stroke="#F59E0B"
                  strokeWidth="8"
                />
                <text x="340" y="135" textAnchor="middle" fill="#38BDF8" fontSize="10.5" fontFamily="JetBrains Mono">
                  Δp = γ_man · L · sen({inclineDeg}°)
                </text>
              </>
            )}
            {hydroMode === 'prensa' && (
              <>
                <path d="M 75 50 L 75 125 L 335 125 L 335 40" fill="none" stroke="#38BDF8" strokeWidth="22" strokeLinejoin="round" strokeOpacity="0.35" />
                <rect x="60" y="38" width="30" height="20" fill="#F59E0B" />
                <rect x="295" y="34" width="80" height="20" fill="#10B981" />
                <text x="75" y="24" textAnchor="middle" fill="#F59E0B" fontSize="10.5" fontFamily="JetBrains Mono">F₁ (d₁)</text>
                <text x="335" y="22" textAnchor="middle" fill="#10B981" fontSize="10.5" fontFamily="JetBrains Mono">
                  F₂ = {pascalRatio * pascalRatio}·F₁ (Carrera s₂ = s₁/{pascalRatio * pascalRatio})
                </text>
              </>
            )}
          </svg>
        </div>
      );
    }

    case 'submerged_gate': {
      // Gate height L=2m, width b=1m -> I_s/A = L^2/12 = 0.3333 m^2
      const sinT = Math.sin((gateAngle * Math.PI) / 180);
      const ws = gateDepth / sinT;
      const e = 0.3333 / ws;
      const fRkN = (9.81 * gateDepth * 2.0);
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Profundidad z_s:</span>
              <input type="range" min={1.2} max={6} step={0.2} value={gateDepth} onChange={(e) => setGateDepth(Number(e.target.value))} className="w-24" />
              <span className="font-mono text-sky-300 tabular-nums">{gateDepth.toFixed(1)} m</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300">
              <span>Ángulo θ:</span>
              <input type="range" min={30} max={90} step={5} value={gateAngle} onChange={(e) => setGateAngle(Number(e.target.value))} className="w-24" />
              <span className="font-mono text-amber-300 tabular-nums">{gateAngle}°</span>
            </label>
            <span className="font-mono text-emerald-400 tabular-nums">
              F_R = {fRkN.toFixed(1)} kN · e = {e.toFixed(3)} m
            </span>
          </div>
          <svg viewBox="0 0 460 150" className="w-full h-36">
            <rect x="20" y="25" width="420" height="115" fill="#0EA5E9" fillOpacity="0.16" />
            <line x1="20" y1="25" x2="440" y2="25" stroke="#38BDF8" strokeWidth="2" />
            <line x1="240" y1="50" x2={240 - 75 * Math.cos((gateAngle * Math.PI) / 180)} y2={50 + 75 * sinT} stroke="#94A3B8" strokeWidth="6" />
            <circle cx={240 - 37 * Math.cos((gateAngle * Math.PI) / 180)} cy={50 + 37 * sinT} r="4.5" fill="#38BDF8" />
            <text x="260" y="74" fill="#38BDF8" fontSize="10" fontFamily="JetBrains Mono">S (Centroide · z_s={gateDepth.toFixed(1)} m)</text>
            <circle cx={240 - (37 + e * 45) * Math.cos((gateAngle * Math.PI) / 180)} cy={50 + (37 + e * 45) * sinT} r="4.5" fill="#F59E0B" />
            <text x="260" y="96" fill="#F59E0B" fontSize="10" fontFamily="JetBrains Mono">D (Centro Presión · e = {e.toFixed(3)} m)</text>
          </svg>
        </div>
      );
    }

    case 'archimedes': {
      const rhoFluid = archSea ? 1025 : 1000;
      const fracSub = Math.min(1, archRho / rhoFluid);
      const floats = archRho <= rhoFluid;
      const blockTopY = floats ? 68 - (1 - fracSub) * 62 : 95;
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Densidad cuerpo ρ_c:</span>
              <input type="range" min={450} max={1300} step={25} value={archRho} onChange={(e) => setArchRho(Number(e.target.value))} className="w-28" />
              <span className="font-mono text-sky-300 tabular-nums">{archRho} kg/m³</span>
            </label>
            <button
              type="button"
              onClick={() => setArchSea((s) => !s)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium cursor-pointer"
            >
              Fluido: {archSea ? 'Agua de Mar (1025)' : 'Agua Dulce (1000)'}
            </button>
          </div>
          <svg viewBox="0 0 460 150" className="w-full h-36">
            <rect x="20" y="68" width="420" height="75" fill="#0EA5E9" fillOpacity="0.22" />
            <line x1="20" y1="68" x2="440" y2="68" stroke="#38BDF8" strokeWidth="2" />
            <rect x="175" y={blockTopY} width="90" height="62" rx="6" fill="#E2E8F0" fillOpacity="0.78" stroke="#94A3B8" strokeWidth="1.5" />
            <text x="345" y="50" fill="#CBD5E1" fontSize="10.5" fontFamily="JetBrains Mono">
              {floats ? `Expuesto: ${((1 - fracSub) * 100).toFixed(1)}%` : '¡Se hunde al fondo!'}
            </text>
            <text x="345" y="96" fill="#38BDF8" fontSize="10.5" fontFamily="JetBrains Mono">
              Sumergido: {(fracSub * 100).toFixed(1)}%
            </text>
          </svg>
        </div>
      );
    }

    case 'particle_deformations': {
      const f = deformAmp / 100;
      let poly = '175,115 245,115 245,45 175,45';
      let caption = 'Traslación pura: mantiene forma, tamaño y orientación';
      if (deformMode === 'traslacion') {
        const dx = f * 75;
        poly = `${145 + dx},115 ${215 + dx},115 ${215 + dx},45 ${145 + dx},45`;
      } else if (deformMode === 'rotacion') {
        const a = f * 0.45;
        const cx = 220;
        const cy = 80;
        const pts = [
          [-35, 35],
          [35, 35],
          [35, -35],
          [-35, -35],
        ].map(([x, y]) => `${(cx + x * Math.cos(a) - y * Math.sin(a)).toFixed(1)},${(cy + x * Math.sin(a) + y * Math.cos(a)).toFixed(1)}`);
        poly = pts.join(' ');
        caption = 'Rotación / Vorticidad ω = ∇×V = 2Ω (sin deformar ángulos)';
      } else if (deformMode === 'dilatacion') {
        const s = 35 * (1 + f * 0.6);
        poly = `${220 - s},${80 + s} ${220 + s},${80 + s} ${220 + s},${80 - s} ${220 - s},${80 - s}`;
        caption = 'Dilatación volumétrica ∇·V ≠ 0 (0 en flujo incompresible)';
      } else {
        const sh = f * 28;
        poly = `185,115 ${255 + sh},115 ${255 - sh},45 185,45`;
        caption = 'Deformación angular γ̇ = ∂u/∂y + ∂v/∂x (genera esfuerzos viscosos τ!)';
      }
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  { id: 'traslacion', label: '1. Traslación' },
                  { id: 'rotacion', label: '2. Rotación (ω)' },
                  { id: 'dilatacion', label: '3. Dilatación (∇·V)' },
                  { id: 'cizalla', label: '4. Cizalla (τ)' },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setDeformMode(m.id)}
                  className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                    deformMode === m.id ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <input type="range" min={0} max={100} value={deformAmp} onChange={(e) => setDeformAmp(Number(e.target.value))} className="w-24" />
          </div>
          <svg viewBox="0 0 460 150" className="w-full h-36">
            <rect x="185" y="45" width="70" height="70" fill="none" stroke="#475569" strokeDasharray="4 3" />
            <polygon points={poly} fill="#38BDF8" fillOpacity="0.28" stroke="#38BDF8" strokeWidth="2.2" />
            <text x="230" y="138" textAnchor="middle" fill="#F59E0B" fontSize="10.5" fontFamily="JetBrains Mono">
              {caption}
            </text>
          </svg>
        </div>
      );
    }

    case 'continuity_differential': {
      const stretch = contStretch / 100;
      const w = 65 + stretch * 40;
      const h = (65 * 65) / w;
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Estiramiento axial ∂u/∂x:</span>
              <input type="range" min={0} max={100} value={contStretch} onChange={(e) => setContStretch(Number(e.target.value))} className="w-28" />
            </label>
            <span className="font-mono text-emerald-400">∂u/∂x + ∂v/∂y = 0 (Volumen constante)</span>
          </div>
          <svg viewBox="0 0 460 140" className="w-full h-36">
            <rect x={230 - w / 2} y={68 - h / 2} width={w} height={h} fill="#10B981" fillOpacity="0.25" stroke="#10B981" strokeWidth="2" />
            <text x="230" y="72" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontFamily="JetBrains Mono">
              dx·dy = cte
            </text>
            <text x="230" y="130" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">
              Si se estira en x (∂u/∂x &gt; 0), se comprime en y (∂v/∂y &lt; 0)
            </text>
          </svg>
        </div>
      );
    }

    case 'euler_bernoulli': {
      const vThroat = 1.5 * Math.pow(80 / throatD, 2);
      const velHead = Math.min(82, vThroat * 3.8);
      const pressHead = Math.max(10, 92 - velHead);
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Diámetro garganta Venturi:</span>
              <input type="range" min={38} max={80} value={throatD} onChange={(e) => setThroatD(Number(e.target.value))} className="w-28" />
              <span className="font-mono text-sky-300 tabular-nums">{throatD} mm</span>
            </label>
            <span className="font-mono text-amber-300">p/γ + V²/2g + z = H constante</span>
          </div>
          <svg viewBox="0 0 460 145" className="w-full h-36">
            <line x1="40" y1="22" x2="420" y2="22" stroke="#10B981" strokeWidth="2" strokeDasharray="5 3" />
            <text x="415" y="16" textAnchor="end" fill="#10B981" fontSize="10" fontFamily="JetBrains Mono">Línea Energía Total H (Invíscida)</text>
            <rect x="90" y="38" width="55" height="82" fill="#38BDF8" fillOpacity="0.45" />
            <text x="117" y="134" textAnchor="middle" fill="#38BDF8" fontSize="10">Entrada: Alta p</text>
            <rect x="260" y={120 - pressHead} width="55" height={pressHead} fill="#38BDF8" fillOpacity="0.45" />
            <rect x="260" y={120 - pressHead - velHead} width="55" height={velHead} fill="#F59E0B" fillOpacity="0.55" />
            <text x="287" y="134" textAnchor="middle" fill="#F59E0B" fontSize="10">Garganta: V↑ p↓</text>
          </svg>
        </div>
      );
    }

    case 'navier_stokes_reduction': {
      const desc: Record<typeof nsCase, { eq: string; label: string }> = {
        full: { eq: 'ρ(∂V/∂t + (V·∇)V) = -∇p + ρg + μ∇²V', label: 'Navier-Stokes Incompresible Completo' },
        euler: { eq: 'ρ(∂V/∂t + (V·∇)V) = -∇p + ρg   (μ = 0)', label: 'Ecuación de Euler (Flujo Invíscido → Bernoulli)' },
        hidro: { eq: '0 = -∇p + ρg   ⇒   dp/dz = -ρg   (V = 0)', label: 'Ecuación Fundamental de la Hidrostática' },
        poiseuille: { eq: '0 = -dp/dx + μ·(1/r)·d/dr(r·du/dr)', label: 'Flujo Laminar en Tubería (Hagen-Poiseuille)' },
      };
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3 text-xs">
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                { id: 'full', label: 'Completo' },
                { id: 'euler', label: 'Apagar μ = 0 (Euler)' },
                { id: 'hidro', label: 'Apagar V = 0 (Hidrostática)' },
                { id: 'poiseuille', label: 'Tubo Laminar' },
              ] as const
            ).map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setNsCase(btn.id)}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  nsCase === btn.id ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
          <div className="rounded-lg bg-slate-900/80 border border-slate-800 p-4 text-center space-y-2">
            <div className="text-sky-300 font-semibold">{desc[nsCase].label}</div>
            <div className="font-mono text-sm sm:text-base text-amber-200">{desc[nsCase].eq}</div>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
};
