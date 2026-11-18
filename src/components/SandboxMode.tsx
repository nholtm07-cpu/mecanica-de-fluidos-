import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Minus, Plus, RotateCcw, Sliders } from 'lucide-react';
import {
  FITTINGS_CATALOG,
  FLUID_CATALOG,
  FlowRegime,
  PIPE_MATERIALS,
  PipeSystemParams,
  solveSandboxPipeSystem,
} from '../physics/fluidProperties';

interface SandboxModeProps {
  onSandboxRun: () => void;
}

const DEFAULT_SANDBOX_PARAMS: PipeSystemParams = {
  fluidId: 'agua',
  tempC: 20,
  materialId: 'acero_comercial',
  diameter1Mm: 50,
  diameter2Mm: 90,
  length1M: 12,
  length2M: 10,
  z1M: 0,
  z2M: 3.5,
  flowRateLs: 2.2,
  pumpHeadM: 8.5,
  pumpEfficiency: 0.72,
  fittings: [
    { id: 'entrada_viva', count: 1 },
    { id: 'codo90_bridado_largo', count: 2 },
    { id: 'valv_compuerta_100', count: 1 },
  ],
};

// ============================================================================
// SANDBOX PIPE FLOW CANVAS: PARTICLES + VELOCITY PROFILE + RECIRCULATION EDDIES
// ============================================================================
const SandboxFlowCanvas: React.FC<{
  d1Mm: number;
  d2Mm: number;
  v1: number;
  v2: number;
  regime1: FlowRegime;
  regime2: FlowRegime;
  fluidColor: string;
}> = ({ d1Mm, d2Mm, v1, v2, regime1, regime2, fluidColor }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const simRef = useRef({ d1Mm, d2Mm, v1, v2, regime1, regime2, fluidColor });
  simRef.current = { d1Mm, d2Mm, v1, v2, regime1, regime2, fluidColor };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles = Array.from({ length: 56 }, (_, i) => ({
      x: 30 + (i / 56) * 620,
      rFrac: ((i % 9) - 4) / 4.4, // -0.9 .. +0.9
      size: 2.1 + (i % 2) * 0.6,
    }));

    let rafId = 0;
    let eddyPhase = 0;
    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.max(0, Math.min(0.05, (now - lastTime) / 1000));
      lastTime = now;
      eddyPhase += dt * 4.5;

      const s = simRef.current;
      const W = canvas.width;
      const H = canvas.height;
      const midY = H / 2;
      const transX = 330;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0B0F17';
      ctx.fillRect(0, 0, W, H);

      const maxD = Math.max(s.d1Mm, s.d2Mm, 40);
      const hh1 = Math.max(18, Math.min(58, (s.d1Mm / maxD) * 56));
      const hh2 = Math.max(18, Math.min(58, (s.d2Mm / maxD) * 56));

      // Pipe 1 body
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(30, midY - hh1, transX - 30, hh1 * 2);
      // Pipe 2 body
      ctx.fillRect(transX, midY - hh2, W - 30 - transX, hh2 * 2);

      // Fluid tint
      ctx.fillStyle = s.fluidColor;
      ctx.globalAlpha = 0.17;
      ctx.fillRect(30, midY - hh1, transX - 30, hh1 * 2);
      ctx.fillRect(transX, midY - hh2, W - 30 - transX, hh2 * 2);
      ctx.globalAlpha = 1;

      // Pipe outer walls
      ctx.strokeStyle = '#64748B';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(30, midY - hh1);
      ctx.lineTo(transX, midY - hh1);
      ctx.lineTo(transX, midY - hh2);
      ctx.lineTo(W - 30, midY - hh2);
      ctx.moveTo(30, midY + hh1);
      ctx.lineTo(transX, midY + hh1);
      ctx.lineTo(transX, midY + hh2);
      ctx.lineTo(W - 30, midY + hh2);
      ctx.stroke();

      // Centerline
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(30, midY);
      ctx.lineTo(W - 30, midY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Velocity Profile Overlay in Section 1 (x = 135)
      const profX = 135;
      const isLam1 = s.regime1 === 'Laminar';
      ctx.strokeStyle = isLam1 ? '#34D399' : '#F59E0B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let k = -16; k <= 16; k++) {
        const frac = k / 16; // -1..1
        const py = midY + frac * (hh1 - 2);
        const uRatio = isLam1
          ? Math.max(0, 1 - frac * frac) // Parabolic Hagen-Poiseuille
          : Math.pow(Math.max(0, 1 - Math.abs(frac)), 1 / 7); // Flat 1/7 power-law turbulent
        const px = profX + uRatio * 48;
        if (k === -16) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Baseline for profile
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(profX, midY - hh1 + 2);
      ctx.lineTo(profX, midY + hh1 - 2);
      ctx.stroke();

      // Animated recirculation eddies in sudden expansion or vena contracta in contraction
      if (s.d2Mm > s.d1Mm + 4) {
        // Sudden Expansion: corner eddies downstream of step
        const stepH = hh2 - hh1;
        if (stepH > 6) {
          const eddyCx = transX + 26;
          const eddyR = Math.min(13, stepH * 0.55);
          [midY - hh1 - stepH * 0.5, midY + hh1 + stepH * 0.5].forEach((ey, idx) => {
            const dir = idx === 0 ? -1 : 1;
            ctx.strokeStyle = '#F87171';
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.arc(eddyCx, ey, eddyR, eddyPhase * dir, eddyPhase * dir + Math.PI * 1.45);
            ctx.stroke();
          });
          ctx.fillStyle = '#FCA5A5';
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillText('Torbellinos (Borda-Carnot)', transX + 8, midY - hh2 - 8);
        }
      } else if (s.d2Mm < s.d1Mm - 4) {
        // Sudden Contraction: Vena contracta neck + wall eddies
        ctx.strokeStyle = '#FBBF24';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(transX, midY - hh1 * 0.85);
        ctx.quadraticCurveTo(transX + 22, midY - hh2 * 0.65, transX + 54, midY - hh2 * 0.94);
        ctx.moveTo(transX, midY + hh1 * 0.85);
        ctx.quadraticCurveTo(transX + 22, midY + hh2 * 0.65, transX + 54, midY + hh2 * 0.94);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#FBBF24';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillText('Vena contracta', transX + 8, midY - hh2 - 12);
      }

      // Move & draw flow tracer particles
      for (const p of particles) {
        const inPipe1 = p.x < transX;
        const speedBase = inPipe1 ? s.v1 : s.v2;
        const isLam = inPipe1 ? s.regime1 === 'Laminar' : s.regime2 === 'Laminar';
        const radialMultiplier = isLam
          ? Math.max(0.25, 1.35 * (1 - p.rFrac * p.rFrac))
          : Math.max(0.65, Math.pow(1 - Math.abs(p.rFrac), 1 / 7) * 1.08);

        const pxSpeed = Math.min(340, 35 + speedBase * 55 * radialMultiplier);
        p.x += pxSpeed * dt;
        if (p.x > W - 32) p.x = 32;

        const hh = p.x < transX ? hh1 : hh2;
        const jitter = !isLam ? Math.sin(eddyPhase * 2.5 + p.x * 0.08) * 1.3 : 0;
        const py = midY + p.rFrac * (hh - 5) + jitter;

        ctx.fillStyle = s.fluidColor;
        ctx.beginPath();
        ctx.arc(p.x, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Annotations
      ctx.fillStyle = '#E2E8F0';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText(`Tramo 1: ${s.regime1} (V₁=${s.v1.toFixed(2)} m/s)`, 34, 18);
      ctx.fillText(`Tramo 2: ${s.regime2} (V₂=${s.v2.toFixed(2)} m/s)`, transX + 12, 18);
      ctx.fillStyle = isLam1 ? '#34D399' : '#F59E0B';
      ctx.fillText(isLam1 ? 'Perfil parabólico' : 'Perfil turbulento 1/7', 40, H - 10);

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={680}
      height={190}
      data-testid="sandbox-flow-canvas"
      className="w-full h-auto rounded-lg border border-slate-800 bg-[#0B0F17]"
    />
  );
};

// ============================================================================
// MAIN SANDBOX MODE COMPONENT
// ============================================================================
export const SandboxMode: React.FC<SandboxModeProps> = ({ onSandboxRun }) => {
  const [params, setParams] = useState<PipeSystemParams>(DEFAULT_SANDBOX_PARAMS);

  const selectedFluid = useMemo(
    () => FLUID_CATALOG.find((f) => f.id === params.fluidId) ?? FLUID_CATALOG[0],
    [params.fluidId]
  );

  const result = useMemo(() => solveSandboxPipeSystem(params), [params]);

  const updateParams = (updater: (prev: PipeSystemParams) => PipeSystemParams) => {
    setParams(updater);
    onSandboxRun();
  };

  const adjustFitting = (fittingId: string, delta: number) => {
    updateParams((prev) => {
      const existing = prev.fittings.find((f) => f.id === fittingId);
      if (!existing && delta > 0) {
        return { ...prev, fittings: [...prev.fittings, { id: fittingId, count: delta }] };
      }
      if (!existing) return prev;
      const nextCount = Math.max(0, existing.count + delta);
      const nextList =
        nextCount === 0
          ? prev.fittings.filter((f) => f.id !== fittingId)
          : prev.fittings.map((f) => (f.id === fittingId ? { ...f, count: nextCount } : f));
      return { ...prev, fittings: nextList };
    });
  };

  // Compute SVG Energy Line & Hydraulic Grade Line coordinates
  const elMin = Math.min(...result.elProfile.map((p) => p.hgl), 0) - 1;
  const elMax = Math.max(...result.elProfile.map((p) => p.el), 5) + 1.5;
  const xTotal = Math.max(1, result.elProfile[result.elProfile.length - 1].x);

  const mapX = (x: number) => 52 + (x / xTotal) * 560;
  const mapY = (h: number) => 175 - ((h - elMin) / Math.max(1, elMax - elMin)) * 140;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Parameter Deck */}
      <aside className="lg:col-span-4 rounded-xl bg-[#111827] border border-slate-800 p-5 space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" />
            <h2 className="font-display text-base font-semibold text-slate-100">
              Laboratorio Sandbox
            </h2>
          </div>
          <button
            type="button"
            onClick={() => updateParams(() => DEFAULT_SANDBOX_PARAMS)}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-sky-300 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Resetear</span>
          </button>
        </div>

        {/* Fluid & Material */}
        <div className="space-y-3">
          <label className="block space-y-1">
            <span className="text-slate-300 font-medium">Fluido de Trabajo</span>
            <select
              value={params.fluidId}
              onChange={(e) => updateParams((p) => ({ ...p, fluidId: e.target.value }))}
              className="w-full px-2.5 py-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-slate-100"
            >
              {FLUID_CATALOG.map((fl) => (
                <option key={fl.id} value={fl.id}>
                  {fl.name} (ρ={fl.rho} kg/m³)
                </option>
              ))}
            </select>
          </label>

          {selectedFluid.supportsTemp && (
            <label className="block space-y-1">
              <span className="flex justify-between text-slate-300">
                <span>Temperatura del Agua</span>
                <span className="font-mono text-sky-300">{params.tempC}°C (μ={result.mu.toExponential(2)} Pa·s)</span>
              </span>
              <input
                type="range"
                min={5}
                max={90}
                step={5}
                value={params.tempC}
                onChange={(e) => updateParams((p) => ({ ...p, tempC: Number(e.target.value) }))}
                className="w-full"
              />
            </label>
          )}

          <label className="block space-y-1">
            <span className="text-slate-300 font-medium">Material y Rugosidad (ε)</span>
            <select
              value={params.materialId}
              onChange={(e) => updateParams((p) => ({ ...p, materialId: e.target.value }))}
              className="w-full px-2.5 py-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-slate-100"
            >
              {PIPE_MATERIALS.map((mat) => (
                <option key={mat.id} value={mat.id}>
                  {mat.name} (ε = {mat.roughnessMm} mm)
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Geometry & Flow */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <label className="block space-y-1">
            <span className="flex justify-between text-slate-300">
              <span>Caudal Q</span>
              <span className="font-mono text-sky-300">{params.flowRateLs.toFixed(2)} L/s</span>
            </span>
            <input
              type="range"
              min={0.1}
              max={12}
              step={0.1}
              value={params.flowRateLs}
              onChange={(e) => updateParams((p) => ({ ...p, flowRateLs: Number(e.target.value) }))}
              className="w-full"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1">
              <span className="flex justify-between text-slate-300">
                <span>D₁</span>
                <span className="font-mono text-amber-300">{params.diameter1Mm} mm</span>
              </span>
              <input
                type="range"
                min={15}
                max={150}
                step={5}
                value={params.diameter1Mm}
                onChange={(e) => updateParams((p) => ({ ...p, diameter1Mm: Number(e.target.value) }))}
                className="w-full"
              />
            </label>
            <label className="block space-y-1">
              <span className="flex justify-between text-slate-300">
                <span>D₂</span>
                <span className="font-mono text-emerald-300">{params.diameter2Mm} mm</span>
              </span>
              <input
                type="range"
                min={15}
                max={150}
                step={5}
                value={params.diameter2Mm}
                onChange={(e) => updateParams((p) => ({ ...p, diameter2Mm: Number(e.target.value) }))}
                className="w-full"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1">
              <span className="flex justify-between text-slate-300">
                <span>L₁ / L₂</span>
                <span className="font-mono text-slate-200">{params.length1M}m / {params.length2M}m</span>
              </span>
              <input
                type="range"
                min={2}
                max={50}
                step={1}
                value={params.length1M}
                onChange={(e) => updateParams((p) => ({ ...p, length1M: Number(e.target.value) }))}
                className="w-full"
              />
            </label>
            <label className="block space-y-1">
              <span className="flex justify-between text-slate-300">
                <span>Desnivel Δz</span>
                <span className="font-mono text-slate-200">{(params.z2M - params.z1M).toFixed(1)} m</span>
              </span>
              <input
                type="range"
                min={-5}
                max={15}
                step={0.5}
                value={params.z2M}
                onChange={(e) => updateParams((p) => ({ ...p, z2M: Number(e.target.value) }))}
                className="w-full"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1">
              <span className="flex justify-between text-slate-300">
                <span>Altura Bomba H_B</span>
                <span className="font-mono text-sky-300">{params.pumpHeadM.toFixed(1)} m</span>
              </span>
              <input
                type="range"
                min={0}
                max={30}
                step={0.5}
                value={params.pumpHeadM}
                onChange={(e) => updateParams((p) => ({ ...p, pumpHeadM: Number(e.target.value) }))}
                className="w-full"
              />
            </label>
            <label className="block space-y-1">
              <span className="flex justify-between text-slate-300">
                <span>Eficiencia η</span>
                <span className="font-mono text-emerald-300">{Math.round(params.pumpEfficiency * 100)}%</span>
              </span>
              <input
                type="range"
                min={0.35}
                max={0.95}
                step={0.01}
                value={params.pumpEfficiency}
                onChange={(e) => updateParams((p) => ({ ...p, pumpEfficiency: Number(e.target.value) }))}
                className="w-full"
              />
            </label>
          </div>
        </div>

        {/* Minor Losses / Fittings */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex justify-between items-center">
            <span className="text-slate-300 font-medium">Accesorios (ΣK = {result.kSumMinor1.toFixed(2)})</span>
            <span className="text-[11px] font-mono text-slate-400">
              K_trans = {result.kTransition.toFixed(2)}
            </span>
          </div>
          <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
            {FITTINGS_CATALOG.slice(0, 14).map((fit) => {
              const count = params.fittings.find((f) => f.id === fit.id)?.count ?? 0;
              return (
                <div
                  key={fit.id}
                  className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-[#0B0F17] border border-slate-800/90"
                >
                  <div className="truncate">
                    <span className="text-slate-200">{fit.name}</span>
                    <span className="ml-1.5 font-mono text-[11px] text-amber-300">K={fit.k}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      aria-label={`Quitar ${fit.name}`}
                      onClick={() => adjustFitting(fit.id, -1)}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-4 text-center font-mono text-slate-100">{count}</span>
                    <button
                      type="button"
                      aria-label={`Agregar ${fit.name}`}
                      onClick={() => adjustFitting(fit.id, 1)}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Right Interactive Stage */}
      <div className="lg:col-span-8 space-y-5">
        {/* Flow Canvas */}
        <div className="rounded-xl bg-[#111827] border border-slate-800 p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-sm sm:text-base font-semibold text-slate-100">
              Visualización de Flujo, Perfil de Velocidad y Zona de Transición (D₁ → D₂)
            </h3>
            <span className="font-mono text-xs text-slate-400">
              L_entrada,1 ≈ {result.entranceLength1M.toFixed(2)} m
            </span>
          </div>

          <SandboxFlowCanvas
            d1Mm={params.diameter1Mm}
            d2Mm={params.diameter2Mm}
            v1={result.v1}
            v2={result.v2}
            regime1={result.regime1}
            regime2={result.regime2}
            fluidColor={selectedFluid.color}
          />
        </div>

        {/* Energy Line & Hydraulic Grade Line Chart */}
        <div className="rounded-xl bg-[#111827] border border-slate-800 p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-slate-100">
              Línea de Energía (LE) y Línea Piezométrica (HGL) a lo largo de la red
            </span>
            <div className="flex gap-4 font-mono">
              <span className="text-amber-400">─ LE (z + p/γ + V²/2g)</span>
              <span className="text-sky-400">--- HGL (z + p/γ)</span>
            </div>
          </div>

          <svg viewBox="0 0 640 205" className="w-full h-52 bg-[#0B0F17] rounded-lg border border-slate-800">
            <line x1="52" y1="175" x2="615" y2="175" stroke="#475569" strokeWidth="1.5" />
            <line x1="52" y1="22" x2="52" y2="175" stroke="#475569" strokeWidth="1.5" />

            {[0, 0.33, 0.66, 1].map((frac, idx) => {
              const val = elMin + frac * (elMax - elMin);
              const y = mapY(val);
              return (
                <g key={idx}>
                  <line x1="52" y1={y} x2="615" y2={y} stroke="#1E293B" strokeDasharray="3 3" />
                  <text x="46" y={y + 3} textAnchor="end" fill="#64748B" fontSize="9" fontFamily="JetBrains Mono">
                    {val.toFixed(1)}m
                  </text>
                </g>
              );
            })}

            {/* Energy Line */}
            <polyline
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2.5"
              points={result.elProfile.map((p) => `${mapX(p.x)},${mapY(p.el)}`).join(' ')}
            />

            {/* Hydraulic Grade Line */}
            <polyline
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeDasharray="5 3"
              points={result.elProfile.map((p) => `${mapX(p.x)},${mapY(p.hgl)}`).join(' ')}
            />

            {result.elProfile.map((pt, i) => {
              // Skip duplicate x label for suction/discharge or before/after transition at identical x
              const prevX = i > 0 ? result.elProfile[i - 1].x : null;
              const showXLabel = prevX === null || Math.abs(pt.x - prevX) > 0.05;
              return (
                <g key={i}>
                  <circle cx={mapX(pt.x)} cy={mapY(pt.el)} r={3.5} fill="#F59E0B" />
                  {showXLabel && (
                    <text
                      x={mapX(pt.x)}
                      y={192}
                      textAnchor="middle"
                      fill="#94A3B8"
                      fontSize="9"
                      fontFamily="JetBrains Mono"
                    >
                      {pt.x}m
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Hydraulic Metrics Table */}
        <div className="rounded-xl bg-[#111827] border border-slate-800 p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <h3 className="font-display text-sm font-semibold text-slate-100">
              Balance Hidráulico Completo (Colebrook-White + Pérdidas Menores)
            </h3>
            <span
              className={`font-mono text-xs font-semibold ${
                result.netHeadBalanceM >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {result.netHeadBalanceM >= 0
                ? `Bomba suficiente (+${result.netHeadBalanceM.toFixed(2)} m margen)`
                : `Déficit de carga (${result.netHeadBalanceM.toFixed(2)} m)`}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800">
              <div className="text-[11px] font-sans text-slate-400">Reynolds Tramo 1</div>
              <div className="text-sm font-semibold text-slate-100 mt-0.5">
                {Math.round(result.re1).toLocaleString('es-CL')}
              </div>
              <div className="text-[11px] text-sky-400">{result.regime1} · f₁={result.f1.toFixed(4)}</div>
            </div>

            <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800">
              <div className="text-[11px] font-sans text-slate-400">Reynolds Tramo 2</div>
              <div className="text-sm font-semibold text-slate-100 mt-0.5">
                {Math.round(result.re2).toLocaleString('es-CL')}
              </div>
              <div className="text-[11px] text-emerald-400">{result.regime2} · f₂={result.f2.toFixed(4)}</div>
            </div>

            <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800">
              <div className="text-[11px] font-sans text-slate-400">Pérdidas Totales (h_L)</div>
              <div className="text-sm font-semibold text-amber-300 mt-0.5">
                {result.totalHeadLossM.toFixed(2)} m
              </div>
              <div className="text-[11px] text-slate-400">
                h_f={(result.hf1 + result.hf2).toFixed(2)} | h_m={result.hlMinor.toFixed(2)}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#0B0F17] border border-slate-800">
              <div className="text-[11px] font-sans text-slate-400">Potencia al Freno (Ẇ_eje)</div>
              <div className="text-sm font-semibold text-sky-300 mt-0.5">
                {(result.shaftPowerW / 1000).toFixed(2)} kW
              </div>
              <div className="text-[11px] text-slate-400">
                Hidráulica: {Math.round(result.hydraulicPowerW)} W
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
