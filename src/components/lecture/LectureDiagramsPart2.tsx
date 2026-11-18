import React, { useState } from 'react';
import { SlideDiagramType } from '../../data/lectureTypes';

export const LectureDiagramsPart2: React.FC<{ type: SlideDiagramType }> = ({ type }) => {
  const [collapseView, setCollapseView] = useState<'crudo' | 'colapsado'>('colapsado');
  const [piMethod, setPiMethod] = useState<'exponentes' | 'ipsen'>('exponentes');
  const [dimApp, setDimApp] = useState<'re' | 'fr' | 'ma' | 'we'>('re');
  const [scaleLambda, setScaleLambda] = useState(25);
  const [simCrit, setSimCrit] = useState<'froude' | 'reynolds'>('froude');
  const [rpmRatio, setRpmRatio] = useState(1.5);
  const [reEntrance, setReEntrance] = useState(1400);
  const [profileMode, setProfileMode] = useState<'laminar' | 'turbulento'>('laminar');
  const [sublayerRe, setSublayerRe] = useState(50000);
  const [moodyRe, setMoodyRe] = useState(80000);
  const [moodyEd, setMoodyEd] = useState(0.001);
  const [minorMode, setMinorMode] = useState<'borda' | 'vena' | 'dean'>('borda');
  const [bordaRatio, setBordaRatio] = useState(0.5);
  const [designCase, setDesignCase] = useState<'tipo3' | 'tipo4'>('tipo3');
  const [pipeDiaMm, setPipeDiaMm] = useState(50);
  const [valveK, setValveK] = useState(12);
  const [pumpZb, setPumpZb] = useState(1.0);
  const [pumpTempC, setPumpTempC] = useState(20);
  const [venturiQ, setVenturiQ] = useState(20);
  const [impRpm, setImpRpm] = useState(3450);
  const [impBeta2, setImpBeta2] = useState(60);

  switch (type) {
    case 'dimensional_collapse': {
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setCollapseView('crudo')}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  collapseView === 'crudo' ? 'bg-amber-400 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Datos Crudos (Δp vs Q)
              </button>
              <button
                type="button"
                onClick={() => setCollapseView('colapsado')}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  collapseView === 'colapsado' ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Curva Colapsada (C_d vs Re)
              </button>
            </div>
            <span className="font-mono text-slate-400">Placa Orificio · De 10,000 pruebas a 1 curva</span>
          </div>
          <svg viewBox="0 0 460 140" className="w-full h-36">
            <line x1="55" y1="115" x2="420" y2="115" stroke="#475569" strokeWidth="1.5" />
            <line x1="55" y1="18" x2="55" y2="115" stroke="#475569" strokeWidth="1.5" />
            {collapseView === 'crudo' ? (
              <>
                <path d="M 65 110 Q 170 95 360 32" fill="none" stroke="#38BDF8" strokeWidth="2" />
                <path d="M 65 112 Q 210 100 390 58" fill="none" stroke="#F59E0B" strokeWidth="2" />
                <path d="M 65 113 Q 240 108 405 84" fill="none" stroke="#10B981" strokeWidth="2" />
                <text x="395" y="28" textAnchor="end" fill="#38BDF8" fontSize="10">D₁ = 25 mm (Aceite)</text>
                <text x="395" y="52" textAnchor="end" fill="#F59E0B" fontSize="10">D₂ = 50 mm (Agua)</text>
                <text x="395" y="78" textAnchor="end" fill="#10B981" fontSize="10">D₃ = 100 mm (Aire)</text>
              </>
            ) : (
              <>
                <path d="M 70 30 Q 130 68 400 72" fill="none" stroke="#10B981" strokeWidth="2.8" />
                {[85, 130, 190, 260, 340, 390].map((x, idx) => (
                  <circle key={idx} cx={x} cy={idx < 2 ? 42 + idx * 14 : 69} r="4" fill="#38BDF8" />
                ))}
                <text x="240" y="96" textAnchor="middle" fill="#10B981" fontSize="11" fontFamily="JetBrains Mono">
                  Todos los fluidos y diámetros colapsan en C_d = f(Re, d/D)
                </text>
              </>
            )}
          </svg>
        </div>
      );
    }

    case 'buckingham_pi': {
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setPiMethod('exponentes')}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  piMethod === 'exponentes' ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Método de Exponentes {`{D, V, ρ}`}
              </button>
              <button
                type="button"
                onClick={() => setPiMethod('ipsen')}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  piMethod === 'ipsen' ? 'bg-amber-400 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Método Tabular de Ipsen
              </button>
            </div>
            <span className="font-mono text-emerald-400">n = 5, k = 3 ⇒ p = 2 grupos Π</span>
          </div>
          <div className="rounded-lg bg-slate-900/75 border border-slate-800 p-3 font-mono space-y-1.5 text-slate-200">
            {piMethod === 'exponentes' ? (
              <>
                <div className="text-sky-300">Π₁ = F_D · Dᵃ · Vᵇ · ρᶜ = M⁰L⁰T⁰  ⇒  a=-2, b=-2, c=-1  ⇒  F_D / (ρ·V²·D²)</div>
                <div className="text-amber-300">Π₂ = μ · Dᵈ · Vᵉ · ρᶠ = M⁰L⁰T⁰   ⇒  d=-1, e=-1, f=-1  ⇒  μ / (ρ·V·D) = 1/Re</div>
              </>
            ) : (
              <>
                <div>Paso 1 (÷ ρ elimina M): F_D/ρ [L⁴T⁻²], D [L], V [LT⁻¹], μ/ρ [L²T⁻¹]</div>
                <div>Paso 2 (÷ V elimina T): F_D/(ρV²) [L²], D [L], μ/(ρV) [L]</div>
                <div className="text-emerald-300">Paso 3 (÷ D elimina L): Π₁ = F_D/(ρV²D²) [1] ; Π₂ = ν/(VD) = 1/Re [1]</div>
              </>
            )}
          </div>
        </div>
      );
    }

    case 'dimensionless_numbers': {
      const info = {
        re: { title: 'Reynolds Re = ρVL/μ', force: 'Inercia / Viscosidad', ex: 'Tuberías y capa límite: Re < 2300 laminar, Re > 4000 turbulento' },
        fr: { title: 'Froude Fr = V/√(gL)', force: 'Inercia / Gravedad', ex: 'Canales, vertederos y buques: Fr < 1 subcrítico, Fr > 1 supercrítico' },
        ma: { title: 'Mach Ma = V/c', force: 'Inercia / Compresibilidad', ex: 'Aeronáutica y toberas: Ma < 0.3 incompresible, Ma > 1 supersónico' },
        we: { title: 'Weber We = ρV²L/σ', force: 'Inercia / Tensión Superficial', ex: 'Atomización de gotas, sprays, burbujas y películas delgadas' },
      }[dimApp];
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3 text-xs">
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                { id: 're', label: 'Tubería (Re)' },
                { id: 'fr', label: 'Canal / Barco (Fr)' },
                { id: 'ma', label: 'Avión (Ma)' },
                { id: 'we', label: 'Spray / Gota (We)' },
              ] as const
            ).map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setDimApp(b.id)}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  dimApp === b.id ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
          <div className="rounded-lg bg-slate-900/75 border border-slate-800 p-3 space-y-1">
            <div className="font-mono text-sm text-amber-300">{info.title}</div>
            <div className="text-sky-300 font-semibold">Fuerzas en competencia: {info.force}</div>
            <div className="text-slate-300">{info.ex}</div>
          </div>
        </div>
      );
    }

    case 'similarity_scaling': {
      const vRatio = simCrit === 'froude' ? Math.sqrt(scaleLambda) : 1 / scaleLambda;
      const qRatio = vRatio * scaleLambda * scaleLambda;
      const fRatio = simCrit === 'froude' ? Math.pow(scaleLambda, 3) : 1;
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setSimCrit('froude')}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  simCrit === 'froude' ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Escala Froude (Canales)
              </button>
              <button
                type="button"
                onClick={() => setSimCrit('reynolds')}
                className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                  simCrit === 'reynolds' ? 'bg-amber-400 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Escala Reynolds (Mismo fluido)
              </button>
            </div>
            <label className="flex items-center gap-2 text-slate-300">
              <span>Escala λ = L_p/L_m:</span>
              <input type="range" min={2} max={50} value={scaleLambda} onChange={(e) => setScaleLambda(Number(e.target.value))} className="w-24" />
              <span className="font-mono text-sky-300">1:{scaleLambda}</span>
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2 font-mono tabular-nums">
            <div className="rounded bg-slate-900/75 border border-slate-800 p-2.5">
              <div className="text-slate-400">Velocidad V_p / V_m</div>
              <div className="text-sky-300 text-sm">{vRatio.toFixed(2)}×</div>
            </div>
            <div className="rounded bg-slate-900/75 border border-slate-800 p-2.5">
              <div className="text-slate-400">Caudal Q_p / Q_m</div>
              <div className="text-amber-300 text-sm">{qRatio.toFixed(0)}×</div>
            </div>
            <div className="rounded bg-slate-900/75 border border-slate-800 p-2.5">
              <div className="text-slate-400">Fuerza F_p / F_m</div>
              <div className="text-emerald-300 text-sm">{fRatio.toFixed(0)}×</div>
            </div>
          </div>
        </div>
      );
    }

    case 'affinity_laws': {
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3 text-xs">
          <div className="flex items-center justify-between gap-2">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Razón de RPM (N₂ / N₁):</span>
              <input type="range" min={0.5} max={2.5} step={0.1} value={rpmRatio} onChange={(e) => setRpmRatio(Number(e.target.value))} className="w-32" />
              <span className="font-mono text-sky-300 tabular-nums">{rpmRatio.toFixed(1)}×</span>
            </label>
            <span className="text-slate-400">Mismo rodete D₁ = D₂</span>
          </div>
          <div className="grid grid-cols-3 gap-2 font-mono tabular-nums">
            <div className="rounded bg-slate-900/75 border border-slate-800 p-2.5">
              <div className="text-slate-400">Caudal Q₂ / Q₁ (∝ N¹)</div>
              <div className="text-sky-300 text-sm">{rpmRatio.toFixed(2)}×</div>
            </div>
            <div className="rounded bg-slate-900/75 border border-slate-800 p-2.5">
              <div className="text-slate-400">Altura H₂ / H₁ (∝ N²)</div>
              <div className="text-amber-300 text-sm">{Math.pow(rpmRatio, 2).toFixed(2)}×</div>
            </div>
            <div className="rounded bg-slate-900/75 border border-slate-800 p-2.5">
              <div className="text-slate-400">Potencia Ẇ₂ / Ẇ₁ (∝ N³)</div>
              <div className="text-emerald-300 text-sm">{Math.pow(rpmRatio, 3).toFixed(2)}×</div>
            </div>
          </div>
        </div>
      );
    }

    case 'entrance_length': {
      const isLam = reEntrance < 2300;
      const leOverD = isLam ? 0.06 * reEntrance : 4.4 * Math.pow(reEntrance, 1 / 6);
      const lePx = Math.min(265, Math.max(45, isLam ? (leOverD / 140) * 265 : 70));
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Reynolds Re:</span>
              <input type="range" min={500} max={50000} step={500} value={reEntrance} onChange={(e) => setReEntrance(Number(e.target.value))} className="w-32" />
              <span className="font-mono text-sky-300 tabular-nums">{reEntrance.toLocaleString('es-CL')}</span>
            </label>
            <span className="font-mono text-amber-300 tabular-nums">
              {isLam ? 'Laminar' : 'Turbulento'} · L_e / D ≈ {leOverD.toFixed(1)}
            </span>
          </div>
          <svg viewBox="0 0 460 135" className="w-full h-36">
            <rect x="40" y="28" width="380" height="72" fill="#1E293B" fillOpacity="0.4" stroke="#64748B" strokeWidth="2" />
            <path d={`M 40 28 Q ${40 + lePx * 0.55} 58 ${40 + lePx} 64`} fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 3" />
            <path d={`M 40 100 Q ${40 + lePx * 0.55} 70 ${40 + lePx} 64`} fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 3" />
            <line x1={40 + lePx} y1="22" x2={40 + lePx} y2="106" stroke="#10B981" strokeDasharray="3 3" />
            <text x={40 + lePx / 2} y="18" textAnchor="middle" fill="#F59E0B" fontSize="10" fontFamily="JetBrains Mono">
              Región Entrada L_e
            </text>
            <text x={40 + lePx + 70} y="18" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="JetBrains Mono">
              Flujo Desarrollado
            </text>
          </svg>
        </div>
      );
    }

    case 'laminar_turbulent': {
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setProfileMode('laminar')}
              className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                profileMode === 'laminar' ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Perfil Laminar (u_med = 0.5 u_máx)
            </button>
            <button
              type="button"
              onClick={() => setProfileMode('turbulento')}
              className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                profileMode === 'turbulento' ? 'bg-amber-400 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Perfil Turbulento (u_med ≈ 0.82 u_máx)
            </button>
          </div>
          <svg viewBox="0 0 460 140" className="w-full h-36">
            <rect x="45" y="25" width="370" height="75" fill="#1E293B" stroke="#475569" strokeWidth="2" />
            {profileMode === 'laminar' ? (
              <>
                <path d="M 140 25 Q 320 62.5 140 100" fill="#38BDF8" fillOpacity="0.22" stroke="#38BDF8" strokeWidth="2.5" />
                <line x1="140" y1="62.5" x2="230" y2="62.5" stroke="#10B981" strokeWidth="2" />
                <text x="230" y="124" textAnchor="middle" fill="#38BDF8" fontSize="10.5" fontFamily="JetBrains Mono">
                  Hagen-Poiseuille: u(r) = u_máx[1 - (r/R)²] · f = 64/Re · α = 2.0
                </text>
              </>
            ) : (
              <>
                <path d="M 140 25 C 245 27 245 98 140 100" fill="#F59E0B" fillOpacity="0.22" stroke="#F59E0B" strokeWidth="2.5" />
                <text x="230" y="124" textAnchor="middle" fill="#F59E0B" fontSize="10.5" fontFamily="JetBrains Mono">
                  Ley de Potencia (y/R)^(1/7): perfil chato · f = Colebrook(Re, ε/D) · α ≈ 1.05
                </text>
              </>
            )}
          </svg>
        </div>
      );
    }

    case 'turbulent_sublayer': {
      const subThicknessPx = Math.max(8, Math.min(48, 8500 / Math.sqrt(sublayerRe)));
      const isRough = subThicknessPx < 22;
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Reynolds Re:</span>
              <input type="range" min={5000} max={500000} step={5000} value={sublayerRe} onChange={(e) => setSublayerRe(Number(e.target.value))} className="w-32" />
              <span className="font-mono text-sky-300 tabular-nums">{sublayerRe.toLocaleString('es-CL')}</span>
            </label>
            <span className={`font-mono ${isRough ? 'text-amber-300' : 'text-emerald-400'}`}>
              {isRough ? 'ε > δ_v ⇒ Rugosa (granos expuestos)' : 'ε < δ_v ⇒ Hidráulicamente Lisa'}
            </span>
          </div>
          <svg viewBox="0 0 460 135" className="w-full h-36">
            <rect x="30" y="102" width="400" height="18" fill="#334155" />
            {/* Roughness peaks */}
            {[50, 90, 130, 170, 210, 250, 290, 330, 370, 410].map((x) => (
              <polygon key={x} points={`${x - 12},102 ${x},82 ${x + 12},102`} fill="#64748B" />
            ))}
            {/* Viscous sublayer */}
            <rect x="30" y={102 - subThicknessPx} width="400" height={subThicknessPx} fill="#38BDF8" fillOpacity="0.22" />
            <line x1="30" y1={102 - subThicknessPx} x2="430" y2={102 - subThicknessPx} stroke="#38BDF8" strokeDasharray="4 3" />
            <text x="230" y="34" textAnchor="middle" fill="#CBD5E1" fontSize="10.5" fontFamily="JetBrains Mono">
              Capa Logarítmica (y⁺ &gt; 30 · Dominan esfuerzos -ρ·u&apos;v&apos;)
            </text>
            <text x="422" y={98 - subThicknessPx} textAnchor="end" fill="#38BDF8" fontSize="10" fontFamily="JetBrains Mono">
              Subcapa Viscosa (y⁺ &lt; 5)
            </text>
          </svg>
        </div>
      );
    }

    case 'moody_chart': {
      const reEps = moodyRe * moodyEd;
      const zone =
        moodyRe < 2300
          ? 'Zona 1: Laminar (f = 64/Re)'
          : reEps < 65
            ? 'Zona 2: Hidráulicamente Lisa (Blasius / Prandtl-Kármán)'
            : reEps <= 1300
              ? 'Zona 3: Transición Turbulenta (Colebrook-White)'
              : 'Zona 4: Rugosa Plena (Nikuradse, independiente de Re)';
      const fVal =
        moodyRe < 2300
          ? 64 / moodyRe
          : Math.pow(-1.8 * Math.log10(Math.pow(moodyEd / 3.7, 1.11) + 6.9 / moodyRe), -2);
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Re:</span>
              <input type="range" min={1000} max={1000000} step={5000} value={moodyRe} onChange={(e) => setMoodyRe(Number(e.target.value))} className="w-28" />
              <span className="font-mono text-sky-300 tabular-nums">{moodyRe.toLocaleString('es-CL')}</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300">
              <span>ε/D:</span>
              <input type="range" min={0.0001} max={0.02} step={0.0005} value={moodyEd} onChange={(e) => setMoodyEd(Number(e.target.value))} className="w-28" />
              <span className="font-mono text-amber-300 tabular-nums">{moodyEd.toFixed(4)}</span>
            </label>
          </div>
          <div className="rounded-lg bg-slate-900/75 border border-slate-800 p-3 flex flex-wrap items-center justify-between gap-2 font-mono">
            <div>
              <div className="text-slate-400 text-[11px]">Número de rugosidad Re·(ε/D) = {reEps.toFixed(1)}</div>
              <div className="text-emerald-300 font-semibold">{zone}</div>
            </div>
            <div className="text-base text-amber-200 font-bold tabular-nums">f = {fVal.toFixed(4)}</div>
          </div>
        </div>
      );
    }

    case 'moody_losses': {
      const keBorda = Math.pow(1 - bordaRatio * bordaRatio, 2);
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'borda', label: 'Expansión Borda-Carnot' },
                { id: 'vena', label: 'Contracción (Vena Contracta)' },
                { id: 'dean', label: 'Codo 90° (Vórtices de Dean)' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMinorMode(m.id as 'borda' | 'vena' | 'dean')}
                  className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                    minorMode === m.id ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            {minorMode === 'borda' && (
              <label className="flex items-center gap-2 text-slate-300">
                <span>D₁/D₂:</span>
                <input type="range" min={0.2} max={0.9} step={0.05} value={bordaRatio} onChange={(e) => setBordaRatio(Number(e.target.value))} className="w-20" />
                <span className="font-mono text-amber-300">K = {keBorda.toFixed(2)}</span>
              </label>
            )}
          </div>
          <svg viewBox="0 0 460 145" className="w-full h-36">
            {minorMode === 'borda' && (
              <>
                <path d="M 40 54 L 155 54 L 155 24 L 410 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
                <path d="M 40 94 L 155 94 L 155 124 L 410 124" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
                <line x1="65" y1="74" x2="210" y2="74" stroke="#38BDF8" strokeWidth="2.5" />
                <circle cx="182" cy="39" r="10" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
                <circle cx="182" cy="109" r="10" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="305" y="68" textAnchor="middle" fill="#F59E0B" fontSize="11" fontFamily="JetBrains Mono">
                  Remolinos esquina a p₁
                </text>
                <text x="305" y="88" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontFamily="JetBrains Mono">
                  K_exp = (1 - A₁/A₂)² = {keBorda.toFixed(2)}
                </text>
              </>
            )}
            {minorMode === 'vena' && (
              <>
                <path d="M 40 24 L 180 24 L 180 50 L 410 50" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
                <path d="M 40 124 L 180 124 L 180 98 L 410 98" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
                <path d="M 70 42 Q 175 48 220 59 Q 255 54 360 54" fill="none" stroke="#38BDF8" strokeWidth="2" />
                <path d="M 70 106 Q 175 100 220 89 Q 255 94 360 94" fill="none" stroke="#38BDF8" strokeWidth="2" />
                <line x1="220" y1="45" x2="220" y2="105" stroke="#F59E0B" strokeDasharray="3 2" />
                <text x="232" y="132" fill="#F59E0B" fontSize="10.5" fontFamily="JetBrains Mono">
                  Vena Contracta (A_c &lt; A₂) → luego expansión disipa energía
                </text>
              </>
            )}
            {minorMode === 'dean' && (
              <>
                <circle cx="135" cy="72" r="46" fill="#1E293B" stroke="#64748B" strokeWidth="2.5" />
                <path d="M 135 34 C 165 34 165 68 135 68 C 110 68 110 38 128 36" fill="none" stroke="#38BDF8" strokeWidth="2" />
                <path d="M 135 110 C 165 110 165 76 135 76 C 110 76 110 106 128 108" fill="none" stroke="#F59E0B" strokeWidth="2" />
                <text x="310" y="55" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="bold">
                  Flujo Secundario de Dean
                </text>
                <text x="310" y="76" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="JetBrains Mono">
                  Par de vórtices contrarrotatorios
                </text>
                <text x="310" y="96" textAnchor="middle" fill="#F59E0B" fontSize="10" fontFamily="JetBrains Mono">
                  Fuerza centrífuga hacia pared exterior
                </text>
              </>
            )}
          </svg>
        </div>
      );
    }

    case 'pipe_design_cases': {
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3 text-xs">
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setDesignCase('tipo3')}
              className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                designCase === 'tipo3' ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Tipo 3: Incógnita Caudal Q
            </button>
            <button
              type="button"
              onClick={() => setDesignCase('tipo4')}
              className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                designCase === 'tipo4' ? 'bg-amber-400 text-slate-950 font-semibold' : 'bg-slate-800 text-slate-300'
              }`}
            >
              Tipo 4: Incógnita Diámetro D
            </button>
          </div>
          <div className="rounded-lg bg-slate-900/75 border border-slate-800 p-3 font-mono space-y-1 text-slate-200">
            {designCase === 'tipo3' ? (
              <>
                <div className="text-sky-300">Datos: H_disp, D, L, ε  →  Iteración para Q:</div>
                <div>1. Suponer f⁰ (zona rugosa Nikuradse) → Calcular V⁰ = √[2gH / (f⁰·L/D + ∑K)]</div>
                <div>2. Calcular Re⁰ = V⁰·D/ν → Actualizar f¹ = Colebrook(Re⁰, ε/D)</div>
                <div className="text-emerald-300">3. Repetir hasta |fⁿ - fⁿ⁻¹| &lt; 0.5% (converge en 2–3 pasos)</div>
              </>
            ) : (
              <>
                <div className="text-amber-300">Datos: Q, H_disp, L, ε  →  Iteración para D:</div>
                <div>1. Suponer f⁰ ≈ 0.020 → Despejar D⁰ ≈ [(8·f⁰·L·Q²)/(π²·g·H)]^(1/5)</div>
                <div>2. Calcular V⁰, Re⁰ y (ε/D⁰) → Actualizar f¹ con Moody/Haaland</div>
                <div className="text-emerald-300">3. Converger D y elegir diámetro comercial estándar inmediato superior</div>
              </>
            )}
          </div>
        </div>
      );
    }

    case 'pump_system_energy': {
      const relLoss = Math.pow(50 / pipeDiaMm, 5);
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Diámetro tubería D:</span>
              <input type="range" min={25} max={100} step={5} value={pipeDiaMm} onChange={(e) => setPipeDiaMm(Number(e.target.value))} className="w-28" />
              <span className="font-mono text-sky-300 tabular-nums">{pipeDiaMm} mm</span>
            </label>
            <span className="font-mono text-amber-300 tabular-nums">
              Pérdida relativa (h_f ∝ 1/D⁵): {relLoss.toFixed(2)}× respecto a 50 mm
            </span>
          </div>
          <svg viewBox="0 0 460 135" className="w-full h-36">
            <rect x="28" y="65" width="55" height="50" fill="#0EA5E9" fillOpacity="0.28" stroke="#38BDF8" />
            <rect x="375" y="25" width="55" height="55" fill="#0EA5E9" fillOpacity="0.28" stroke="#38BDF8" />
            <line x1="83" y1="95" x2="185" y2="95" stroke="#64748B" strokeWidth="5" />
            <circle cx="200" cy="95" r="16" fill="#1E293B" stroke="#10B981" strokeWidth="2.5" />
            <text x="200" y="99" textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="bold">B</text>
            <path d="M 216 95 L 330 95 L 330 55 L 375 55" fill="none" stroke="#64748B" strokeWidth="5" />
            {/* EGL line jump */}
            <path d="M 55 64 L 185 68 M 205 18 L 402 25" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 3" />
            <text x="205" y="13" fill="#F59E0B" fontSize="10" fontFamily="JetBrains Mono">+H_B (salto bomba)</text>
          </svg>
        </div>
      );
    }

    case 'pump_npsh': {
      // H_pump(Q) = 28 - 4 Q^2 ; H_req(Q) = 6 + valveK * Q^2 -> Q_op = sqrt(22 / (4 + valveK))
      const qOp = Math.sqrt(22 / (4 + valveK));
      const hOp = 28 - 4 * qOp * qOp;
      const xOp = 60 + (qOp / 2.5) * 310;
      const yOp = 135 - (hOp / 32) * 110;
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Estrangulamiento válvula (∑K):</span>
              <input type="range" min={4} max={40} step={2} value={valveK} onChange={(e) => setValveK(Number(e.target.value))} className="w-28" />
            </label>
            <span className="font-mono text-emerald-400 tabular-nums">
              Punto Operación: Q_op = {qOp.toFixed(2)} L/s · H_op = {hOp.toFixed(1)} m
            </span>
          </div>
          <svg viewBox="0 0 460 145" className="w-full h-36">
            <line x1="55" y1="130" x2="410" y2="130" stroke="#475569" strokeWidth="1.5" />
            <line x1="55" y1="18" x2="55" y2="130" stroke="#475569" strokeWidth="1.5" />
            <path d="M 60 35 Q 235 48 395 118" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
            <text x="118" y="32" fill="#38BDF8" fontSize="10" fontFamily="JetBrains Mono">H_bomba(Q)</text>
            <path d={`M 60 112 Q 210 ${108 - valveK * 0.6} 380 ${65 - valveK * 1.1}`} fill="none" stroke="#F59E0B" strokeWidth="2.5" />
            <text x="355" y="28" fill="#F59E0B" fontSize="10" fontFamily="JetBrains Mono">H_sistema(Q)</text>
            <circle cx={xOp} cy={yOp} r="5.5" fill="#10B981" />
            <text x={xOp + 10} y={yOp + 4} fill="#10B981" fontSize="10" fontFamily="JetBrains Mono">Q_op</text>
          </svg>
        </div>
      );
    }

    case 'cavitation_suction': {
      const pvKpa = 0.6108 * Math.exp((17.27 * pumpTempC) / (pumpTempC + 237.3));
      const npsha = (100 - pvKpa) / 9.81 - pumpZb - 0.44;
      const npshr = 3.2;
      const cav = npsha <= npshr;
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Altura bomba z_b:</span>
              <input type="range" min={-2} max={8} step={0.5} value={pumpZb} onChange={(e) => setPumpZb(Number(e.target.value))} className="w-24" />
              <span className="font-mono text-sky-300 tabular-nums">{pumpZb.toFixed(1)} m</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300">
              <span>T agua:</span>
              <input type="range" min={10} max={85} step={5} value={pumpTempC} onChange={(e) => setPumpTempC(Number(e.target.value))} className="w-24" />
              <span className="font-mono text-amber-300 tabular-nums">{pumpTempC} °C</span>
            </label>
          </div>
          <div
            className={`rounded-lg border p-3 flex flex-wrap items-center justify-between gap-2 font-mono tabular-nums ${
              cav ? 'bg-red-950/40 border-red-500/50 text-red-200' : 'bg-emerald-950/35 border-emerald-500/40 text-emerald-200'
            }`}
          >
            <div>
              NPSHA = {npsha.toFixed(2)} m vs NPSHR = {npshr.toFixed(2)} m
            </div>
            <div className="font-bold">{cav ? '¡CAVITACIÓN ACTIVA! Baja z_b' : 'Succión Segura sin Cavitación'}</div>
          </div>
        </div>
      );
    }

    case 'venturi_usm': {
      const qM3s = venturiQ / 60000;
      const a1 = (Math.PI * 0.026 * 0.026) / 4;
      const a4 = (Math.PI * 0.016 * 0.016) / 4;
      const v4 = qM3s / a4;
      const re4 = (998 * v4 * 0.016) / 0.001004;
      const cq = venturiQ < 7 ? 0.91 : 0.99 - 0.01 * Math.exp(-venturiQ / 12);
      const dhMm = ((Math.pow(qM3s / (cq * a4), 2) * (1 - Math.pow(a4 / a1, 2))) / (2 * 9.79)) * 1000;
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="flex items-center gap-2 text-slate-300">
              <span>Caudal Banco Venturi USM:</span>
              <input type="range" min={4} max={36} step={2} value={venturiQ} onChange={(e) => setVenturiQ(Number(e.target.value))} className="w-28" />
              <span className="font-mono text-sky-300 tabular-nums">{venturiQ} L/min</span>
            </label>
            <span className="font-mono text-amber-300 tabular-nums">
              Δh₁₋₄ = {dhMm.toFixed(1)} mm · Re₄ = {re4.toFixed(0)} · C_q ≈ {cq.toFixed(3)}
            </span>
          </div>
          <div className="text-slate-300">
            {venturiQ < 8
              ? 'Zona de bajo caudal: Δh₁₋₄ es milimétrico, alto riesgo de error de paralaje y menisco.'
              : 'Zona de calibración estable (Re₄ > 10,000): C_q converge hacia ~0.985–0.99.'}
          </div>
        </div>
      );
    }

    case 'euler_impeller': {
      const omega = (2 * Math.PI * impRpm) / 60;
      const r2 = 0.05;
      const u2 = omega * r2;
      const vr2 = 0.3;
      const wTheta2 = -vr2 / Math.tan((impBeta2 * Math.PI) / 180);
      const vTheta2 = u2 + wTheta2;
      const torque = 1000 * 0.01 * r2 * vTheta2;
      const hIdeal = (u2 * vTheta2) / 9.81;
      return (
        <div className="rounded-xl bg-[#0B0F17] border border-slate-800 p-3.5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <label className="flex items-center gap-2 text-slate-300">
              <span>RPM:</span>
              <input type="range" min={1450} max={3600} step={150} value={impRpm} onChange={(e) => setImpRpm(Number(e.target.value))} className="w-24" />
              <span className="font-mono text-sky-300 tabular-nums">{impRpm}</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300">
              <span>Ángulo β₂:</span>
              <input type="range" min={25} max={85} step={5} value={impBeta2} onChange={(e) => setImpBeta2(Number(e.target.value))} className="w-20" />
              <span className="font-mono text-amber-300 tabular-nums">{impBeta2}°</span>
            </label>
            <span className="font-mono text-emerald-400 tabular-nums">
              T = {torque.toFixed(2)} N·m · H_ideal = {hIdeal.toFixed(1)} m
            </span>
          </div>
          <svg viewBox="0 0 460 150" className="w-full h-36">
            <circle cx="110" cy="75" r="50" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
            <circle cx="110" cy="75" r="16" fill="#0B0F17" stroke="#38BDF8" strokeWidth="1.5" />
            <path d="M 126 75 Q 148 56 154 42" fill="none" stroke="#94A3B8" strokeWidth="2" />
            <path d="M 94 75 Q 72 94 66 108" fill="none" stroke="#94A3B8" strokeWidth="2" />
            <line x1="215" y1="118" x2="385" y2="118" stroke="#38BDF8" strokeWidth="2.5" />
            <text x="300" y="135" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="JetBrains Mono">
              U₂ = {u2.toFixed(1)} m/s
            </text>
            <line x1="385" y1="118" x2="340" y2="42" stroke="#F59E0B" strokeWidth="2.5" />
            <text x="385" y="78" fill="#F59E0B" fontSize="10" fontFamily="JetBrains Mono">W₂ (β₂={impBeta2}°)</text>
            <line x1="215" y1="118" x2="340" y2="42" stroke="#10B981" strokeWidth="2.5" />
            <text x="255" y="68" fill="#10B981" fontSize="10" fontFamily="JetBrains Mono">
              V₂ (V_θ2={vTheta2.toFixed(1)})
            </text>
          </svg>
        </div>
      );
    }

    default:
      return null;
  }
};
