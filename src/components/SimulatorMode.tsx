import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Gauge, RotateCcw, Waves } from 'lucide-react';
import {
  EulerImpellerParams,
  Manometer317Params,
  ManometerP231Params,
  PascalPressParams,
  PistonSpringParams,
  PumpSystemCertamen3Params,
  solveCertamen3System,
  solveEulerImpeller,
  solveManometer,
  solvePascalPress,
  solvePistonSpring,
  solveVenturiUSM,
} from '../physics/simulatorsMath';
import { ProfessorBoard } from './ProfessorBoard';
import { PumpLossSimulatorTab } from './simulators/PumpLossSimulatorTab';

export type SimulatorCaseId = 'hidrostatica' | 'venturi' | 'bombeo' | 'euler';
type HydroSubCase = 'manometro_317' | 'manometro_p231' | 'pistons_330' | 'camaras_354' | 'prensa_pascal';

interface SimulatorModeProps {
  onSimulatorExplored: (caseId: SimulatorCaseId) => void;
}

const CASE_TABS: { id: SimulatorCaseId; label: string; subtitle: string }[] = [
  { id: 'hidrostatica', label: 'Caso 1 · Hidrostática', subtitle: 'Manometría, Pistón-Resorte y Pascal' },
  { id: 'venturi', label: 'Caso 2 · Tubo Venturi USM', subtitle: '11 Piezómetros · Cq, Re y K' },
  { id: 'bombeo', label: 'Caso 3 · Bombeo y Pérdidas de Carga', subtitle: 'Certamen 3, Sistema CFD 3D y Guía de Estudio' },
  { id: 'euler', label: 'Caso 4 · Rodete Euler', subtitle: 'Certamen 3 P2 · Triángulos de Velocidad' },
];

// ============================================================================
// VENTURI CANVAS COMPONENT (ANIMATED PARTICLES + THROAT ACCELERATION)
// ============================================================================
const VenturiCanvas: React.FC<{ qLmin: number; v1Ms: number; v4Ms: number }> = ({
  qLmin,
  v1Ms,
  v4Ms,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const flowRef = useRef({ qLmin, v1Ms, v4Ms });
  flowRef.current = { qLmin, v1Ms, v4Ms };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles = Array.from({ length: 48 }, (_, i) => ({
      x: (i / 48) * 680,
      lane: ((i % 7) - 3) / 3.4, // -0.88 .. +0.88
      radius: 2.2 + (i % 2) * 0.7,
    }));

    let rafId = 0;
    let lastTime = performance.now();

    const getHalfHeightAtPixel = (px: number): number => {
      // Map px in [40..640] to xMm in [-30..165]
      const xMm = -30 + ((px - 40) / 600) * 195;
      let dMm = 26;
      if (xMm > 0 && xMm <= 25) {
        dMm = 26 - ((26 - 16) * xMm) / 25;
      } else if (xMm > 25 && xMm <= 41) {
        dMm = 16;
      } else if (xMm > 41 && xMm <= 130) {
        dMm = 16 + ((26 - 16) * (xMm - 41)) / 89;
      }
      return (dMm / 26) * 44;
    };

    const render = (now: number) => {
      const dt = Math.max(0, Math.min(0.05, (now - lastTime) / 1000));
      lastTime = now;

      const W = canvas.width;
      const H = canvas.height;
      const midY = H / 2;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0B0F17';
      ctx.fillRect(0, 0, W, H);

      // Draw Venturi duct body
      ctx.beginPath();
      for (let px = 40; px <= 640; px += 4) {
        const hh = getHalfHeightAtPixel(px);
        if (px === 40) ctx.moveTo(px, midY - hh);
        else ctx.lineTo(px, midY - hh);
      }
      for (let px = 640; px >= 40; px -= 4) {
        const hh = getHalfHeightAtPixel(px);
        ctx.lineTo(px, midY + hh);
      }
      ctx.closePath();

      const grad = ctx.createLinearGradient(40, 0, 640, 0);
      grad.addColorStop(0, 'rgba(14, 165, 233, 0.16)');
      grad.addColorStop(0.35, 'rgba(56, 189, 248, 0.28)');
      grad.addColorStop(1, 'rgba(14, 165, 233, 0.14)');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = '#64748B';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Centerline
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(40, midY);
      ctx.lineTo(640, midY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Highlight critical taps 1, 4, 11
      const tapXMm = [-12, 33, 143];
      const tapLabels = ['1 (D₁=26)', '4 (Garganta D₄=16)', '11 (D₁₁=26)'];
      tapXMm.forEach((xm, idx) => {
        const px = 40 + ((xm + 30) / 195) * 600;
        const hh = getHalfHeightAtPixel(px);
        ctx.strokeStyle = idx === 1 ? '#F59E0B' : '#38BDF8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(px, midY - hh - 10);
        ctx.lineTo(px, midY - hh);
        ctx.stroke();

        ctx.fillStyle = idx === 1 ? '#FBBF24' : '#94A3B8';
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(tapLabels[idx], px, midY - hh - 15);
      });

      // Update & draw fluid tracer particles accelerating in throat
      const { v1Ms: curV1 } = flowRef.current;
      const basePxSpeed = 75 + curV1 * 185;

      for (const p of particles) {
        const hh = getHalfHeightAtPixel(p.x);
        const areaRatio = Math.pow(44 / hh, 2);
        const localSpeed = basePxSpeed * areaRatio;
        p.x += localSpeed * dt;
        if (p.x > 640) p.x = 40;

        const py = midY + p.lane * (hh - 4);
        ctx.fillStyle = areaRatio > 1.8 ? '#FBBF24' : '#38BDF8';
        ctx.beginPath();
        ctx.arc(p.x, py, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Velocity annotation inside canvas
      ctx.fillStyle = '#E2E8F0';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`V₁ = ${flowRef.current.v1Ms.toFixed(3)} m/s`, 48, H - 12);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FBBF24';
      ctx.fillText(`V₄ = ${flowRef.current.v4Ms.toFixed(3)} m/s`, 235, H - 12);

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={680}
      height={160}
      data-testid="venturi-canvas"
      className="w-full h-auto rounded-lg border border-slate-800 bg-[#0B0F17]"
    />
  );
};

// ============================================================================
// PUMPING + CAVITATION CANVAS COMPONENT (ANIMATED BUBBLES WHEN CAVITATING)
// ============================================================================
const PumpSystemCanvas: React.FC<{
  zbM: number;
  z2M: number;
  v1: number;
  v2: number;
  isCavitating: boolean;
  valveOpening: '100' | '75' | '50' | '25';
  flowTrend: 'aumenta' | 'disminuye' | 'equilibrio';
}> = ({ zbM, z2M, v1, v2, isCavitating, valveOpening, flowTrend }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ zbM, z2M, v1, v2, isCavitating, valveOpening, flowTrend });
  stateRef.current = { zbM, z2M, v1, v2, isCavitating, valveOpening, flowTrend };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bubbles = Array.from({ length: 24 }, (_, i) => ({
      angle: (i / 24) * Math.PI * 2,
      r: 4 + (i % 5) * 4,
      size: 2 + (i % 3) * 1.4,
      speed: 1.8 + (i % 4) * 0.6,
    }));

    const tracers = Array.from({ length: 26 }, (_, i) => ({
      t: i / 26,
    }));

    let rafId = 0;
    let angle = 0;
    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.max(0, Math.min(0.05, (now - lastTime) / 1000));
      lastTime = now;
      angle += dt * 7.5;

      const s = stateRef.current;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0B0F17';
      ctx.fillRect(0, 0, W, H);

      // Well surface baseline yWell = 205
      const yWell = 205;
      const pxPerM = 18;
      const pumpX = 215;
      const pumpY = Math.max(70, Math.min(185, yWell - s.zbM * pxPerM));
      const discY = Math.max(36, Math.min(185, yWell - s.z2M * pxPerM));

      // Draw well water tank
      ctx.fillStyle = 'rgba(14, 165, 233, 0.2)';
      ctx.fillRect(28, yWell, 115, 55);
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(28, yWell);
      ctx.lineTo(143, yWell);
      ctx.stroke();

      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.strokeRect(28, 175, 115, 85);
      ctx.fillStyle = '#94A3B8';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText('Pozo (z₁ = 0 m)', 34, 252);

      // Pipe centerline path: suction well -> pump -> discharge -> contraction -> outlet
      const pathPts: [number, number][] = [
        [92, 230],
        [92, pumpY],
        [pumpX, pumpY],
        [pumpX, discY],
        [430, discY],
        [595, discY],
      ];

      // Draw suction + D1 pipe
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 14;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(pathPts[0][0], pathPts[0][1]);
      for (let i = 1; i < 5; i++) {
        ctx.lineTo(pathPts[i][0], pathPts[i][1]);
      }
      ctx.stroke();

      // Inner water D1
      ctx.strokeStyle = '#0284C7';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(pathPts[0][0], pathPts[0][1]);
      for (let i = 1; i < 5; i++) {
        ctx.lineTo(pathPts[i][0], pathPts[i][1]);
      }
      ctx.stroke();

      // Draw D2 narrower discharge pipe
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(430, discY);
      ctx.lineTo(595, discY);
      ctx.stroke();

      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(430, discY);
      ctx.lineTo(595, discY);
      ctx.stroke();

      // Valve symbol on discharge pipe
      const valveX = 325;
      ctx.fillStyle = s.valveOpening === '25' ? '#EF4444' : s.valveOpening === '50' ? '#F59E0B' : '#10B981';
      ctx.fillRect(valveX - 8, discY - 13, 16, 26);
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(valveX - 8, discY - 13, 16, 26);
      ctx.fillStyle = '#CBD5E1';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText(`Válvula ${s.valveOpening}%`, valveX - 28, discY - 19);

      // Contraction label
      ctx.fillStyle = '#94A3B8';
      ctx.fillText('Contracción D₁→D₂', 430, discY + 24);

      // Animated tracers along pipe
      const speedFactor = 0.14 + Math.min(0.4, s.v1 * 0.1);
      for (const tr of tracers) {
        tr.t = (((tr.t + speedFactor * dt) % 1) + 1) % 1;
        // Interpolate along pathPts
        const segIdx = Math.max(0, Math.min(4, Math.floor(tr.t * 5)));
        const localT = tr.t * 5 - segIdx;
        const p0 = pathPts[segIdx];
        const p1 = pathPts[segIdx + 1];
        if (!p0 || !p1) continue;
        const px = p0[0] + (p1[0] - p0[0]) * localT;
        const py = p0[1] + (p1[1] - p0[1]) * localT;
        ctx.fillStyle = '#E0F2FE';
        ctx.beginPath();
        ctx.arc(px, py, 2.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Pump casing
      ctx.beginPath();
      ctx.arc(pumpX, pumpY, 26, 0, Math.PI * 2);
      ctx.fillStyle = s.isCavitating ? '#450A0A' : '#1E293B';
      ctx.fill();
      ctx.strokeStyle = s.isCavitating ? '#EF4444' : '#38BDF8';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Rotating impeller blades
      ctx.save();
      ctx.translate(pumpX, pumpY);
      ctx.rotate(angle);
      ctx.strokeStyle = s.isCavitating ? '#FCA5A5' : '#93C5FD';
      ctx.lineWidth = 2.2;
      for (let b = 0; b < 6; b++) {
        const a = (b * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(Math.cos(a + 0.35) * 11, Math.sin(a + 0.35) * 11, Math.cos(a) * 19, Math.sin(a) * 19);
        ctx.stroke();
      }
      ctx.restore();

      // Cavitation vapor bubbles bursting at impeller eye
      if (s.isCavitating) {
        for (const b of bubbles) {
          b.r += b.speed * 14 * dt;
          if (b.r > 23) b.r = 3;
          const bx = pumpX + Math.cos(b.angle + angle * 0.4) * b.r;
          const by = pumpY + Math.sin(b.angle + angle * 0.4) * b.r;
          ctx.beginPath();
          ctx.arc(bx, by, b.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(254, 202, 202, 0.85)';
          ctx.fill();
          ctx.strokeStyle = '#EF4444';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Elevation markers zb and z2
      ctx.strokeStyle = '#F59E0B';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(155, yWell);
      ctx.lineTo(155, pumpY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#FBBF24';
      ctx.fillText(`z_b=${s.zbM.toFixed(1)}m`, 159, (yWell + pumpY) / 2);

      ctx.fillStyle = '#E2E8F0';
      ctx.fillText(`Descarga z₂=${s.z2M.toFixed(1)}m (P_atm)`, 495, discY - 16);

      // Discharge jet
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath();
      ctx.arc(602, discY + 6, 3.5, 0, Math.PI * 2);
      ctx.fill();

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={660}
      height={270}
      data-testid="pump-system-canvas"
      className="w-full h-auto rounded-lg border border-slate-800 bg-[#0B0F17]"
    />
  );
};

// ============================================================================
// EULER CENTRIFUGAL IMPELLER CANVAS
// ============================================================================
const EulerImpellerCanvas: React.FC<{ rpm: number; beta2Deg: number; d1Cm: number; d2Cm: number }> = ({
  rpm,
  beta2Deg,
  d1Cm,
  d2Cm,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const paramRef = useRef({ rpm, beta2Deg, d1Cm, d2Cm });
  paramRef.current = { rpm, beta2Deg, d1Cm, d2Cm };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let theta = 0;
    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.max(0, Math.min(0.05, (now - lastTime) / 1000));
      lastTime = now;
      const p = paramRef.current;
      // Visually scaled angular velocity so high rpm stays smooth and readable
      const visualOmega = Math.min(6, (p.rpm / 3450) * 3.2);
      theta -= visualOmega * dt;

      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0B0F17';
      ctx.fillRect(0, 0, W, H);

      const r2Px = 92;
      const r1Px = Math.max(22, Math.min(55, (p.d1Cm / Math.max(6, p.d2Cm)) * r2Px));

      // Outer volute reference ring
      ctx.beginPath();
      ctx.arc(cx, cy, r2Px + 14, 0, Math.PI * 2);
      ctx.strokeStyle = '#1E293B';
      ctx.lineWidth = 10;
      ctx.stroke();

      // Rotating disc
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(theta);

      ctx.beginPath();
      ctx.arc(0, 0, r2Px, 0, Math.PI * 2);
      ctx.fillStyle = '#111827';
      ctx.fill();
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 8 backward-curved blades shaped according to beta2Deg
      const sweepOffset = ((90 - p.beta2Deg) / 60) * 0.75;
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 3;
      for (let i = 0; i < 8; i++) {
        const a0 = (i * Math.PI) / 4;
        const x1 = Math.cos(a0) * r1Px;
        const y1 = Math.sin(a0) * r1Px;
        const xm = Math.cos(a0 + sweepOffset * 0.5) * ((r1Px + r2Px) * 0.5);
        const ym = Math.sin(a0 + sweepOffset * 0.5) * ((r1Px + r2Px) * 0.5);
        const x2 = Math.cos(a0 + sweepOffset) * r2Px;
        const y2 = Math.sin(a0 + sweepOffset) * r2Px;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(xm, ym, x2, y2);
        ctx.stroke();
      }

      // Suction eye
      ctx.beginPath();
      ctx.arc(0, 0, r1Px, 0, Math.PI * 2);
      ctx.fillStyle = '#0F172A';
      ctx.fill();
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();

      // Rotation direction indicator
      ctx.fillStyle = '#94A3B8';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`ω = ${p.rpm} rpm · β₂ = ${p.beta2Deg}°`, cx, H - 10);

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={290}
      height={250}
      data-testid="euler-impeller-canvas"
      className="w-full h-auto rounded-lg border border-slate-800 bg-[#0B0F17]"
    />
  );
};

// ============================================================================
// MAIN SIMULATOR MODE COMPONENT
// ============================================================================
export const SimulatorMode: React.FC<SimulatorModeProps> = ({ onSimulatorExplored }) => {
  const [activeCase, setActiveCase] = useState<SimulatorCaseId>('venturi');
  const [hydroSub, setHydroSub] = useState<HydroSubCase>('manometro_317');

  // Case 1 states
  const [man317, setMan317] = useState<Manometer317Params>({
    preset: 'ej_3_17',
    h1M: 0.4,
    h2M: 0.6,
    h3M: 0.8,
    rhoWater: 1000,
    rhoOil: 850,
    rhoHg: 13600,
    patmKpa: 101.325,
  });

  const [manP231, setManP231] = useState<ManometerP231Params>({
    preset: 'ej_p2_31',
    hBenzeneM: 0.2,
    hHgM: 0.08,
    hKeroseneM: 0.32,
    hWaterM: 0.26,
    hAirM: 0.09,
  });

  const [piston330, setPiston330] = useState<PistonSpringParams>({
    preset: 'ej_3_30',
    patmKpa: 95,
    pistonMassKg: 4,
    areaCm2: 35,
    springForceN: 60,
    pistonDiameterM: 0.3,
    hCE_M: 0.25,
    hCD_M: 0.25,
  });

  const [pascal, setPascal] = useState<PascalPressParams>({
    d1Mm: 20,
    d2Mm: 140,
    f1N: 80,
    leverRatio: 4,
    stroke1Mm: 50,
  });

  // Case 2 Venturi state
  const [venturiQ, setVenturiQ] = useState<number>(20.0);
  const [venturiTemp, setVenturiTemp] = useState<number>(20);

  // Case 3 Certamen 3 Pumping state
  const [pumpParams, setPumpParams] = useState<PumpSystemCertamen3Params>({
    qLs: 1.0,
    d1Cm: 2.5,
    d2Cm: 1.9,
    zbM: 1.0,
    z2M: 3.0,
    lsM: 1.5,
    ld1M: 8.0,
    ld2M: 10.0,
    valveOpening: '100',
    elbowType: 'bridado_largo',
    elbowCount: 2,
    roughnessMm: 0.046,
    waterTempC: 20,
    patmPa: 100000,
  });

  // Case 4 Euler Impeller state
  const [eulerParams, setEulerParams] = useState<EulerImpellerParams>({
    qM3s: 0.01,
    d1Cm: 3.2,
    d2Cm: 10,
    vr2Ms: 0.3,
    rpm: 3450,
    beta2Deg: 60,
    rho: 1000,
  });

  useEffect(() => {
    onSimulatorExplored(activeCase);
  }, [activeCase, onSimulatorExplored]);

  // Memoized physics solutions
  const hydroSolution = useMemo(() => {
    if (hydroSub === 'manometro_317') return solveManometer(man317);
    if (hydroSub === 'manometro_p231') return solveManometer(manP231);
    if (hydroSub === 'pistons_330') return solvePistonSpring({ ...piston330, preset: 'ej_3_30' });
    if (hydroSub === 'camaras_354')
      return solvePistonSpring({ ...piston330, preset: 'ej_3_54', pistonMassKg: 2.548 });
    return solvePascalPress(pascal);
  }, [hydroSub, man317, manP231, piston330, pascal]);

  const venturiRes = useMemo(() => solveVenturiUSM(venturiQ, venturiTemp), [venturiQ, venturiTemp]);
  const pumpRes = useMemo(() => solveCertamen3System(pumpParams), [pumpParams]);
  const eulerRes = useMemo(() => solveEulerImpeller(eulerParams), [eulerParams]);

  return (
    <div className="space-y-6">
      {/* Top Case Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" role="tablist" aria-label="Casos reales de simulación">
        {CASE_TABS.map((tab) => {
          const isActive = activeCase === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCase(tab.id)}
              className={`text-left px-4 py-3 rounded-xl border transition-colors cursor-pointer ${
                isActive
                  ? 'bg-sky-500/15 border-sky-400/60 text-white'
                  : 'bg-[#111827] border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="text-sm font-semibold">{tab.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{tab.subtitle}</div>
            </button>
          );
        })}
      </div>

      {/* =================================================================== */}
      {/* CASE 1: HIDROSTÁTICA                                                 */}
      {/* =================================================================== */}
      {activeCase === 'hidrostatica' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: 'manometro_317', label: 'Manómetro 3-17 (Çengel)' },
                { id: 'manometro_p231', label: 'Manómetro P2.31 (Certamen 1)' },
                { id: 'pistons_330', label: 'Cilindro-Émbolo con Resorte (3-30)' },
                { id: 'camaras_354', label: 'Cámaras de Aire A/B (3-54)' },
                { id: 'prensa_pascal', label: 'Prensa Hidráulica de Pascal' },
              ] as { id: HydroSubCase; label: string }[]
            ).map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => setHydroSub(sub.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  hydroSub === sub.id
                    ? 'bg-amber-500/15 border-amber-400/50 text-amber-300'
                    : 'bg-[#111827] border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Controls */}
            <div className="lg:col-span-5 rounded-xl bg-[#111827] border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base font-semibold text-slate-100">
                  Parámetros del Sistema Hidrostático
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setMan317({
                      preset: 'ej_3_17',
                      h1M: 0.4,
                      h2M: 0.6,
                      h3M: 0.8,
                      rhoWater: 1000,
                      rhoOil: 850,
                      rhoHg: 13600,
                      patmKpa: 101.325,
                    });
                    setManP231({
                      preset: 'ej_p2_31',
                      hBenzeneM: 0.2,
                      hHgM: 0.08,
                      hKeroseneM: 0.32,
                      hWaterM: 0.26,
                      hAirM: 0.09,
                    });
                  }}
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-sky-300 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar pauta</span>
                </button>
              </div>

              {hydroSub === 'manometro_317' && (
                <div className="space-y-3.5 text-xs">
                  <label className="block space-y-1">
                    <span className="flex justify-between text-slate-300">
                      <span>Columna Agua h₁</span>
                      <span className="font-mono text-sky-300">{man317.h1M.toFixed(2)} m</span>
                    </span>
                    <input
                      type="range"
                      min={0.05}
                      max={1.5}
                      step={0.05}
                      value={man317.h1M}
                      onChange={(e) => setMan317({ ...man317, h1M: Number(e.target.value) })}
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="flex justify-between text-slate-300">
                      <span>Columna Aceite h₂ (ρ={man317.rhoOil} kg/m³)</span>
                      <span className="font-mono text-amber-300">{man317.h2M.toFixed(2)} m</span>
                    </span>
                    <input
                      type="range"
                      min={0.05}
                      max={1.5}
                      step={0.05}
                      value={man317.h2M}
                      onChange={(e) => setMan317({ ...man317, h2M: Number(e.target.value) })}
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="flex justify-between text-slate-300">
                      <span>Columna Mercurio h₃ (SG=13.6)</span>
                      <span className="font-mono text-slate-200">{man317.h3M.toFixed(2)} m</span>
                    </span>
                    <input
                      type="range"
                      min={0.05}
                      max={1.2}
                      step={0.05}
                      value={man317.h3M}
                      onChange={(e) => setMan317({ ...man317, h3M: Number(e.target.value) })}
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="flex justify-between text-slate-300">
                      <span>Densidad del aceite (ρ_aceite)</span>
                      <span className="font-mono text-amber-300">{man317.rhoOil} kg/m³</span>
                    </span>
                    <input
                      type="range"
                      min={700}
                      max={950}
                      step={10}
                      value={man317.rhoOil}
                      onChange={(e) => setMan317({ ...man317, rhoOil: Number(e.target.value) })}
                      className="w-full"
                    />
                  </label>
                </div>
              )}

              {hydroSub === 'manometro_p231' && (
                <div className="space-y-3.5 text-xs">
                  <label className="block space-y-1">
                    <span className="flex justify-between text-slate-300">
                      <span>Altura Benceno (h_benc)</span>
                      <span className="font-mono text-pink-300">{manP231.hBenzeneM.toFixed(2)} m</span>
                    </span>
                    <input
                      type="range"
                      min={0.05}
                      max={0.5}
                      step={0.01}
                      value={manP231.hBenzeneM}
                      onChange={(e) => setManP231({ ...manP231, hBenzeneM: Number(e.target.value) })}
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="flex justify-between text-slate-300">
                      <span>Altura Mercurio (h_Hg)</span>
                      <span className="font-mono text-slate-200">{manP231.hHgM.toFixed(2)} m</span>
                    </span>
                    <input
                      type="range"
                      min={0.02}
                      max={0.3}
                      step={0.01}
                      value={manP231.hHgM}
                      onChange={(e) => setManP231({ ...manP231, hHgM: Number(e.target.value) })}
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="flex justify-between text-slate-300">
                      <span>Altura Queroseno (h_ker)</span>
                      <span className="font-mono text-emerald-300">{manP231.hKeroseneM.toFixed(2)} m</span>
                    </span>
                    <input
                      type="range"
                      min={0.05}
                      max={0.6}
                      step={0.01}
                      value={manP231.hKeroseneM}
                      onChange={(e) => setManP231({ ...manP231, hKeroseneM: Number(e.target.value) })}
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="flex justify-between text-slate-300">
                      <span>Altura Agua (h_agua)</span>
                      <span className="font-mono text-sky-300">{manP231.hWaterM.toFixed(2)} m</span>
                    </span>
                    <input
                      type="range"
                      min={0.05}
                      max={0.6}
                      step={0.01}
                      value={manP231.hWaterM}
                      onChange={(e) => setManP231({ ...manP231, hWaterM: Number(e.target.value) })}
                      className="w-full"
                    />
                  </label>
                </div>
              )}

              {(hydroSub === 'pistons_330' || hydroSub === 'camaras_354') && (
                <div className="space-y-3.5 text-xs">
                  {hydroSub === 'pistons_330' ? (
                    <>
                      <label className="block space-y-1">
                        <span className="flex justify-between text-slate-300">
                          <span>Presión Atmosférica (P_atm)</span>
                          <span className="font-mono text-sky-300">{piston330.patmKpa.toFixed(1)} kPa</span>
                        </span>
                        <input
                          type="range"
                          min={70}
                          max={105}
                          step={0.5}
                          value={piston330.patmKpa}
                          onChange={(e) => setPiston330({ ...piston330, patmKpa: Number(e.target.value) })}
                          className="w-full"
                        />
                      </label>
                      <label className="block space-y-1">
                        <span className="flex justify-between text-slate-300">
                          <span>Masa del Pistón (m_p)</span>
                          <span className="font-mono text-slate-200">{piston330.pistonMassKg.toFixed(1)} kg</span>
                        </span>
                        <input
                          type="range"
                          min={0.5}
                          max={20}
                          step={0.5}
                          value={piston330.pistonMassKg}
                          onChange={(e) => setPiston330({ ...piston330, pistonMassKg: Number(e.target.value) })}
                          className="w-full"
                        />
                      </label>
                      <label className="block space-y-1">
                        <span className="flex justify-between text-slate-300">
                          <span>Área transversal (A)</span>
                          <span className="font-mono text-amber-300">{piston330.areaCm2} cm²</span>
                        </span>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          step={1}
                          value={piston330.areaCm2}
                          onChange={(e) => setPiston330({ ...piston330, areaCm2: Number(e.target.value) })}
                          className="w-full"
                        />
                      </label>
                      <label className="block space-y-1">
                        <span className="flex justify-between text-slate-300">
                          <span>Fuerza del Resorte (F_res)</span>
                          <span className="font-mono text-emerald-300">{piston330.springForceN} N</span>
                        </span>
                        <input
                          type="range"
                          min={0}
                          max={250}
                          step={5}
                          value={piston330.springForceN}
                          onChange={(e) => setPiston330({ ...piston330, springForceN: Number(e.target.value) })}
                          className="w-full"
                        />
                      </label>
                    </>
                  ) : (
                    <>
                      <label className="block space-y-1">
                        <span className="flex justify-between text-slate-300">
                          <span>Diámetro del Pistón C</span>
                          <span className="font-mono text-sky-300">{piston330.pistonDiameterM.toFixed(2)} m</span>
                        </span>
                        <input
                          type="range"
                          min={0.15}
                          max={0.6}
                          step={0.01}
                          value={piston330.pistonDiameterM}
                          onChange={(e) => setPiston330({ ...piston330, pistonDiameterM: Number(e.target.value) })}
                          className="w-full"
                        />
                      </label>
                      <label className="block space-y-1">
                        <span className="flex justify-between text-slate-300">
                          <span>Columna CE (Cámara A)</span>
                          <span className="font-mono text-amber-300">{piston330.hCE_M.toFixed(2)} m</span>
                        </span>
                        <input
                          type="range"
                          min={0.05}
                          max={0.8}
                          step={0.01}
                          value={piston330.hCE_M}
                          onChange={(e) => setPiston330({ ...piston330, hCE_M: Number(e.target.value) })}
                          className="w-full"
                        />
                      </label>
                      <label className="block space-y-1">
                        <span className="flex justify-between text-slate-300">
                          <span>Columna CD (Cámara B)</span>
                          <span className="font-mono text-emerald-300">{piston330.hCD_M.toFixed(2)} m</span>
                        </span>
                        <input
                          type="range"
                          min={0.05}
                          max={0.8}
                          step={0.01}
                          value={piston330.hCD_M}
                          onChange={(e) => setPiston330({ ...piston330, hCD_M: Number(e.target.value) })}
                          className="w-full"
                        />
                      </label>
                    </>
                  )}
                </div>
              )}

              {hydroSub === 'prensa_pascal' && (
                <div className="space-y-3.5 text-xs">
                  <label className="block space-y-1">
                    <span className="flex justify-between text-slate-300">
                      <span>Diámetro pistón entrada D₁</span>
                      <span className="font-mono text-sky-300">{pascal.d1Mm} mm</span>
                    </span>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      step={2}
                      value={pascal.d1Mm}
                      onChange={(e) => setPascal({ ...pascal, d1Mm: Number(e.target.value) })}
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="flex justify-between text-slate-300">
                      <span>Diámetro pistón salida D₂</span>
                      <span className="font-mono text-amber-300">{pascal.d2Mm} mm</span>
                    </span>
                    <input
                      type="range"
                      min={60}
                      max={300}
                      step={5}
                      value={pascal.d2Mm}
                      onChange={(e) => setPascal({ ...pascal, d2Mm: Number(e.target.value) })}
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="flex justify-between text-slate-300">
                      <span>Fuerza manual aplicada F_mano</span>
                      <span className="font-mono text-emerald-300">{pascal.f1N} N</span>
                    </span>
                    <input
                      type="range"
                      min={20}
                      max={300}
                      step={10}
                      value={pascal.f1N}
                      onChange={(e) => setPascal({ ...pascal, f1N: Number(e.target.value) })}
                      className="w-full"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="flex justify-between text-slate-300">
                      <span>Relación de palanca mecánica</span>
                      <span className="font-mono text-slate-200">{pascal.leverRatio}×</span>
                    </span>
                    <input
                      type="range"
                      min={1}
                      max={8}
                      step={0.5}
                      value={pascal.leverRatio}
                      onChange={(e) => setPascal({ ...pascal, leverRatio: Number(e.target.value) })}
                      className="w-full"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Live Dynamic SVG Visualization */}
            <div className="lg:col-span-7 rounded-xl bg-[#111827] border border-slate-800 p-5 flex flex-col justify-between">
              <h3 className="font-display text-sm font-semibold text-slate-200 mb-3">
                Esquema Físico Dinámico en Tiempo Real
              </h3>

              {hydroSub === 'manometro_317' && (
                <svg viewBox="0 0 540 260" className="w-full h-64 bg-[#0B0F17] rounded-lg border border-slate-800">
                  {/* Tank */}
                  <rect x="40" y="30" width="120" height="180" rx="8" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
                  <rect x="42" y={105 - man317.h1M * 22} width="116" height={103 + man317.h1M * 22} fill="#0EA5E9" fillOpacity="0.35" />
                  <text x="100" y="64" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontFamily="JetBrains Mono">
                    Aire P₁
                  </text>
                  <text x="100" y="82" textAnchor="middle" fill="#38BDF8" fontSize="11" fontFamily="JetBrains Mono">
                    {hydroSolution.board.step4ResultValue}
                  </text>

                  {/* U-Tube Multifluido */}
                  <path
                    d="M 160 180 L 230 180 L 230 50 L 315 50 L 315 215 L 430 215 L 430 35"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="22"
                    strokeLinejoin="round"
                  />
                  {/* Water leg */}
                  <path
                    d={`M 160 180 L 230 180 L 230 ${Math.max(60, 175 - man317.h1M * 55)}`}
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="16"
                    strokeLinejoin="round"
                  />
                  {/* Oil leg */}
                  <path
                    d={`M 230 ${Math.max(60, 175 - man317.h1M * 55)} L 230 50 L 315 50 L 315 ${Math.min(205, 65 + man317.h2M * 70)}`}
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="16"
                    strokeLinejoin="round"
                  />
                  {/* Mercury leg */}
                  <path
                    d={`M 315 ${Math.min(205, 65 + man317.h2M * 70)} L 315 215 L 430 215 L 430 ${Math.max(45, 200 - man317.h3M * 120)}`}
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="16"
                    strokeLinejoin="round"
                  />
                  <text x="272" y="34" textAnchor="middle" fill="#FBBF24" fontSize="11" fontFamily="JetBrains Mono">
                    Aceite h₂={man317.h2M.toFixed(2)}m
                  </text>
                  <text x="480" y="130" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontFamily="JetBrains Mono">
                    Hg h₃={man317.h3M.toFixed(2)}m
                  </text>
                  <text x="430" y="22" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="JetBrains Mono">
                    Abierto (P_atm)
                  </text>
                </svg>
              )}

              {hydroSub === 'manometro_p231' && (
                <svg viewBox="0 0 540 260" className="w-full h-64 bg-[#0B0F17] rounded-lg border border-slate-800">
                  <circle cx="65" cy="110" r="24" fill="#1E293B" stroke="#F472B6" strokeWidth="2.5" />
                  <text x="65" y="114" textAnchor="middle" fill="#F472B6" fontSize="13" fontFamily="JetBrains Mono">A</text>
                  <path d="M 89 110 L 145 110 L 145 215 L 225 215 L 225 55 L 320 55 L 320 205 L 415 205 L 415 95 L 455 95" fill="none" stroke="#475569" strokeWidth="20" strokeLinejoin="round" />
                  {/* Benzene */}
                  <path d="M 89 110 L 145 110 L 145 190" fill="none" stroke="#F472B6" strokeWidth="14" />
                  {/* Mercury */}
                  <path d="M 145 190 L 145 215 L 225 215 L 225 145" fill="none" stroke="#CBD5E1" strokeWidth="14" />
                  {/* Kerosene */}
                  <path d="M 225 145 L 225 55 L 320 55 L 320 135" fill="none" stroke="#34D399" strokeWidth="14" />
                  {/* Water */}
                  <path d="M 320 135 L 320 205 L 415 205 L 415 145" fill="none" stroke="#38BDF8" strokeWidth="14" />
                  <circle cx="475" cy="95" r="24" fill="#1E293B" stroke="#38BDF8" strokeWidth="2.5" />
                  <text x="475" y="99" textAnchor="middle" fill="#38BDF8" fontSize="13" fontFamily="JetBrains Mono">B</text>
                  <text x="270" y="34" textAnchor="middle" fill="#34D399" fontSize="11" fontFamily="JetBrains Mono">
                    Queroseno (h={manP231.hKeroseneM.toFixed(2)}m) | Hg (h={manP231.hHgM.toFixed(2)}m)
                  </text>
                  <text x="270" y="246" textAnchor="middle" fill="#FBBF24" fontSize="12" fontFamily="JetBrains Mono">
                    Δp = p_A − p_B = {Math.round((hydroSolution as { deltaPPa: number }).deltaPPa).toLocaleString('es-CL')} Pa
                  </text>
                </svg>
              )}

              {(hydroSub === 'pistons_330' || hydroSub === 'camaras_354') && (
                <svg viewBox="0 0 540 260" className="w-full h-64 bg-[#0B0F17] rounded-lg border border-slate-800">
                  {hydroSub === 'pistons_330' ? (
                    <>
                      {/* Cylinder walls */}
                      <path d="M 170 40 L 170 230 L 370 230 L 370 40" fill="none" stroke="#64748B" strokeWidth="4" />
                      {/* Gas chamber */}
                      <rect x="172" y="135" width="196" height="93" fill="#0EA5E9" fillOpacity="0.25" />
                      {/* Piston */}
                      <rect x="172" y="112" width="196" height="23" fill="#94A3B8" stroke="#E2E8F0" strokeWidth="1.5" />
                      {/* Spring zigzag */}
                      <path
                        d={`M 270 35 L 270 50 L 250 60 L 290 72 L 250 84 L 290 96 L 270 105 L 270 112`}
                        fill="none"
                        stroke="#10B981"
                        strokeWidth={Math.max(2, Math.min(6, 2 + piston330.springForceN / 60))}
                      />
                      <line x1="210" y1="35" x2="330" y2="35" stroke="#475569" strokeWidth="5" />
                      {/* Downward force arrows */}
                      <text x="405" y="75" fill="#10B981" fontSize="11" fontFamily="JetBrains Mono">
                        F_res = {piston330.springForceN} N
                      </text>
                      <text x="405" y="100" fill="#94A3B8" fontSize="11" fontFamily="JetBrains Mono">
                        W_p = {(piston330.pistonMassKg * 9.81).toFixed(1)} N
                      </text>
                      <text x="405" y="125" fill="#38BDF8" fontSize="11" fontFamily="JetBrains Mono">
                        P_atm = {piston330.patmKpa.toFixed(1)} kPa
                      </text>
                      <text x="270" y="185" textAnchor="middle" fill="#FBBF24" fontSize="14" fontFamily="JetBrains Mono">
                        P_gas = {hydroSolution.board.step4ResultValue}
                      </text>
                    </>
                  ) : (
                    <>
                      {/* Dual Air Chambers 3-54 */}
                      <path d="M 60 40 L 60 220 L 480 220 L 480 40" fill="none" stroke="#64748B" strokeWidth="3" />
                      <rect x="62" y="145" width="416" height="73" fill="#0EA5E9" fillOpacity="0.3" />
                      {/* Chamber A */}
                      <rect x="75" y="40" width="90" height={120 + piston330.hCE_M * 40} fill="none" stroke="#94A3B8" strokeWidth="2" />
                      <text x="120" y="78" textAnchor="middle" fill="#FBBF24" fontSize="12" fontFamily="JetBrains Mono">Aire A</text>
                      {/* Center Piston C */}
                      <rect x="210" y="110" width="120" height="22" fill="#94A3B8" stroke="#E2E8F0" />
                      <text x="270" y="96" textAnchor="middle" fill="#CBD5E1" fontSize="11" fontFamily="JetBrains Mono">Pistón C</text>
                      {/* Chamber B */}
                      <rect x="375" y="40" width="90" height={135 - piston330.hCD_M * 45} fill="none" stroke="#94A3B8" strokeWidth="2" />
                      <text x="420" y="72" textAnchor="middle" fill="#34D399" fontSize="12" fontFamily="JetBrains Mono">Aire B</text>
                      <text x="270" y="246" textAnchor="middle" fill="#38BDF8" fontSize="12" fontFamily="JetBrains Mono">
                        {hydroSolution.board.step4ResultValue}
                      </text>
                    </>
                  )}
                </svg>
              )}

              {hydroSub === 'prensa_pascal' && (
                <svg viewBox="0 0 540 260" className="w-full h-64 bg-[#0B0F17] rounded-lg border border-slate-800">
                  {/* Hydraulic reservoir U */}
                  <path d="M 90 120 L 90 215 L 430 215 L 430 110" fill="none" stroke="#475569" strokeWidth="6" />
                  <rect x="93" y="150" width="54" height="65" fill="#F59E0B" fillOpacity="0.35" />
                  <rect x="93" y="200" width="334" height="15" fill="#F59E0B" fillOpacity="0.45" />
                  <rect x="330" y="135" width="97" height="80" fill="#F59E0B" fillOpacity="0.35" />
                  {/* Small piston */}
                  <rect x="95" y="125" width="50" height="25" fill="#94A3B8" stroke="#E2E8F0" />
                  <line x1="120" y1="65" x2="120" y2="122" stroke="#38BDF8" strokeWidth="3" />
                  <polygon points="120,124 115,113 125,113" fill="#38BDF8" />
                  <text x="120" y="54" textAnchor="middle" fill="#38BDF8" fontSize="11" fontFamily="JetBrains Mono">
                    F_mano={pascal.f1N}N (×{pascal.leverRatio})
                  </text>
                  {/* Large piston */}
                  <rect x="332" y="110" width="93" height="25" fill="#94A3B8" stroke="#E2E8F0" />
                  <line x1="378" y1="108" x2="378" y2="55" stroke="#10B981" strokeWidth="4" />
                  <polygon points="378,52 372,64 384,64" fill="#10B981" />
                  <text x="378" y="42" textAnchor="middle" fill="#10B981" fontSize="12" fontFamily="JetBrains Mono">
                    F₂ = {hydroSolution.board.step4ResultValue}
                  </text>
                  <text x="245" y="192" textAnchor="middle" fill="#FBBF24" fontSize="11" fontFamily="JetBrains Mono">
                    p = cte en el fluido
                  </text>
                </svg>
              )}
            </div>
          </div>

          <ProfessorBoard board={hydroSolution.board} />
        </div>
      )}

      {/* =================================================================== */}
      {/* CASE 2: LABORATORIO TUBO VENTURI USM                                 */}
      {/* =================================================================== */}
      {activeCase === 'venturi' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left controls */}
            <div className="lg:col-span-4 rounded-xl bg-[#111827] border border-slate-800 p-5 space-y-5">
              <div>
                <h2 className="font-display text-base font-semibold text-slate-100">
                  Banco Venturi USM (11 Piezómetros)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  D₁ = 26 mm · Garganta D₄ = 16 mm · Salida D₁₁ = 26 mm · g = 9.79 m/s²
                </p>
              </div>

              <label className="block space-y-1.5 text-xs">
                <span className="flex justify-between text-slate-200 font-medium">
                  <span>Caudal Volumétrico (Q)</span>
                  <span className="font-mono text-sky-300 text-sm">{venturiQ.toFixed(1)} L/min</span>
                </span>
                <input
                  type="range"
                  min={7.5}
                  max={20.0}
                  step={0.5}
                  value={venturiQ}
                  onChange={(e) => setVenturiQ(Number(e.target.value))}
                  data-testid="venturi-q-slider"
                  className="w-full"
                />
              </label>

              <div>
                <p className="text-xs text-slate-400 mb-2">Puntos experimentales exactos (Tabla USM):</p>
                <div className="grid grid-cols-3 gap-2">
                  {[7.5, 10, 12.5, 15, 17.5, 20].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setVenturiQ(val)}
                      className={`px-2 py-1.5 rounded-lg font-mono text-xs border transition-colors cursor-pointer ${
                        Math.abs(venturiQ - val) < 0.05
                          ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-semibold'
                          : 'bg-[#0B0F17] border-slate-800 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {val} L/min
                    </button>
                  ))}
                </div>
              </div>

              <label className="block space-y-1.5 text-xs">
                <span className="flex justify-between text-slate-200 font-medium">
                  <span>Temperatura del Agua</span>
                  <span className="font-mono text-amber-300">{venturiTemp}°C</span>
                </span>
                <input
                  type="range"
                  min={5}
                  max={60}
                  step={1}
                  value={venturiTemp}
                  onChange={(e) => setVenturiTemp(Number(e.target.value))}
                  className="w-full"
                />
              </label>

              {/* Key experimental metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div className="p-2.5 rounded-lg bg-[#0B0F17] border border-slate-800">
                  <div className="text-[11px] text-slate-400">Caudal Teórico</div>
                  <div className="font-mono text-sm font-semibold text-slate-100">
                    {(venturiRes.qTeoricoM3s * 60000).toFixed(2)} L/min
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0B0F17] border border-slate-800">
                  <div className="text-[11px] text-slate-400">Coeficiente C_q</div>
                  <div className="font-mono text-sm font-semibold text-sky-300">
                    {venturiRes.cq.toFixed(3)}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0B0F17] border border-slate-800">
                  <div className="text-[11px] text-slate-400">Reynolds Garganta</div>
                  <div className="font-mono text-sm font-semibold text-emerald-300">
                    {Math.round(venturiRes.re4).toLocaleString('es-CL')}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0B0F17] border border-slate-800">
                  <div className="text-[11px] text-slate-400">Coef. Pérdida K</div>
                  <div className="font-mono text-sm font-semibold text-amber-300">
                    {venturiRes.kLoss.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Right stage: Animated Venturi + 11 Piezometer Columns + Theoretical vs Measured Curve */}
            <div className="lg:col-span-8 rounded-xl bg-[#111827] border border-slate-800 p-5 space-y-5">
              <VenturiCanvas qLmin={venturiRes.qLmin} v1Ms={venturiRes.v1Ms} v4Ms={venturiRes.v4Ms} />

              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-slate-200">
                    Panel de 11 Piezómetros (mm H₂O) vs Curva Ideal de Bernoulli
                  </span>
                  <div className="flex items-center gap-4 font-mono">
                    <span className="text-sky-300">■ h_medido (experimental)</span>
                    <span className="text-amber-300">--- h_teórico (Bernoulli ideal)</span>
                  </div>
                </div>

                {/* Live SVG 11-column Piezometer Rack + Curve */}
                <svg
                  viewBox="0 0 660 220"
                  data-testid="venturi-piezometers-svg"
                  className="w-full h-56 bg-[#0B0F17] rounded-lg border border-slate-800"
                >
                  {/* Grid lines for 100, 200, 300 mm */}
                  {[100, 200, 300].map((mm) => {
                    const y = 190 - (mm / 320) * 160;
                    return (
                      <g key={mm}>
                        <line x1="42" y1={y} x2="640" y2={y} stroke="#1E293B" strokeDasharray="3 3" />
                        <text x="36" y={y + 4} textAnchor="end" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono">
                          {mm}
                        </text>
                      </g>
                    );
                  })}

                  {/* 11 Water columns */}
                  {venturiRes.taps.map((t, idx) => {
                    const xCenter = 66 + idx * 53;
                    const barH = Math.max(4, (t.hMeasuredMm / 320) * 160);
                    const yTop = 190 - barH;
                    const isThroat = t.tap === 4;
                    return (
                      <g key={t.tap}>
                        <rect
                          x={xCenter - 11}
                          y={26}
                          width={22}
                          height={164}
                          rx={3}
                          fill="#111827"
                          stroke="#334155"
                          strokeWidth={1}
                        />
                        <rect
                          x={xCenter - 9}
                          y={yTop}
                          width={18}
                          height={barH}
                          rx={2}
                          fill={isThroat ? '#F59E0B' : '#0EA5E9'}
                          fillOpacity={0.72}
                        />
                        <text
                          x={xCenter}
                          y={16}
                          textAnchor="middle"
                          fill={isThroat ? '#FBBF24' : '#7DD3FC'}
                          fontSize="9"
                          fontFamily="JetBrains Mono"
                        >
                          {Math.round(t.hMeasuredMm)}
                        </text>
                        <text x={xCenter} y={208} textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">
                          T{t.tap}
                        </text>
                      </g>
                    );
                  })}

                  {/* Theoretical Bernoulli polyline */}
                  <polyline
                    fill="none"
                    stroke="#FBBF24"
                    strokeWidth="2"
                    strokeDasharray="5 4"
                    points={venturiRes.taps
                      .map((t, idx) => {
                        const xCenter = 66 + idx * 53;
                        const yTheo = 190 - Math.max(0, (t.hTheoreticalMm / 320) * 160);
                        return `${xCenter},${yTheo}`;
                      })
                      .join(' ')}
                  />
                </svg>
              </div>
            </div>
          </div>

          <ProfessorBoard board={venturiRes.board} />
        </div>
      )}

      {/* =================================================================== */}
      {/* CASE 3: BOMBEO Y PÉRDIDAS DE CARGA (MULTI-EJEMPLO + CFD 3D)          */}
      {/* =================================================================== */}
      {activeCase === 'bombeo' && (
        <PumpLossSimulatorTab
          certamen3View={
            <div className="space-y-6">
              {pumpRes.isCavitating ? (
            <div
              role="alert"
              data-testid="cavitation-alert"
              className="rounded-xl bg-red-950/60 border border-red-500/70 px-4 py-3 flex items-center gap-3 text-red-100"
            >
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <div className="text-sm">
                <span className="font-bold text-red-300">ALERTA DE CAVITACIÓN ACTIVA: </span>
                NPSHA ({pumpRes.npshaM.toFixed(2)} m) ≤ NPSHR ({pumpRes.npshrM.toFixed(2)} m). Se forman burbujas de vapor en el ojo del rodete. Reduce z_b por debajo de {pumpRes.zbMaxM.toFixed(2)} m o amplía D₁.
              </div>
            </div>
          ) : (
            <div
              data-testid="cavitation-safe"
              className="rounded-xl bg-emerald-950/30 border border-emerald-500/40 px-4 py-3 flex items-center gap-3 text-emerald-100"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-sm">
                Succión libre de cavitación: NPSHA ({pumpRes.npshaM.toFixed(2)} m) &gt; NPSHR ({pumpRes.npshrM.toFixed(2)} m). Margen vertical máximo permitido: z_b,máx = {pumpRes.zbMaxM.toFixed(2)} m.
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Controls */}
            <div className="lg:col-span-4 rounded-xl bg-[#111827] border border-slate-800 p-5 space-y-3.5 text-xs">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base font-semibold text-slate-100">
                  Parámetros Certamen 3
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    setPumpParams({
                      qLs: 1.0,
                      d1Cm: 2.5,
                      d2Cm: 1.9,
                      zbM: 1.0,
                      z2M: 3.0,
                      lsM: 1.5,
                      ld1M: 8.0,
                      ld2M: 10.0,
                      valveOpening: '100',
                      elbowType: 'bridado_largo',
                      elbowCount: 2,
                      roughnessMm: 0.046,
                      waterTempC: 20,
                      patmPa: 100000,
                    })
                  }
                  className="text-sky-400 hover:text-sky-300 cursor-pointer"
                >
                  Valores Certamen 3
                </button>
              </div>

              <label className="block space-y-1">
                <span className="flex justify-between text-slate-300">
                  <span>Caudal evaluado Q</span>
                  <span className="font-mono text-sky-300">{pumpParams.qLs.toFixed(2)} L/s</span>
                </span>
                <input
                  type="range"
                  min={0.2}
                  max={3.8}
                  step={0.1}
                  value={pumpParams.qLs}
                  onChange={(e) => setPumpParams({ ...pumpParams, qLs: Number(e.target.value) })}
                  className="w-full"
                />
              </label>

              <label className="block space-y-1">
                <span className="flex justify-between text-slate-300">
                  <span>Altura bomba sobre pozo (z_b)</span>
                  <span className={`font-mono ${pumpRes.isCavitating ? 'text-red-400 font-bold' : 'text-amber-300'}`}>
                    {pumpParams.zbM.toFixed(1)} m
                  </span>
                </span>
                <input
                  type="range"
                  min={0.2}
                  max={10.0}
                  step={0.2}
                  value={pumpParams.zbM}
                  onChange={(e) => setPumpParams({ ...pumpParams, zbM: Number(e.target.value) })}
                  data-testid="pump-zb-slider"
                  className="w-full"
                />
              </label>

              <label className="block space-y-1">
                <span className="flex justify-between text-slate-300">
                  <span>Cota descarga final (z₂)</span>
                  <span className="font-mono text-slate-200">{pumpParams.z2M.toFixed(1)} m</span>
                </span>
                <input
                  type="range"
                  min={1.0}
                  max={12.0}
                  step={0.5}
                  value={pumpParams.z2M}
                  onChange={(e) => setPumpParams({ ...pumpParams, z2M: Number(e.target.value) })}
                  className="w-full"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block space-y-1">
                  <span className="flex justify-between text-slate-300">
                    <span>Diámetro D₁</span>
                    <span className="font-mono text-sky-300">{pumpParams.d1Cm} cm</span>
                  </span>
                  <input
                    type="range"
                    min={1.5}
                    max={5.0}
                    step={0.1}
                    value={pumpParams.d1Cm}
                    onChange={(e) => setPumpParams({ ...pumpParams, d1Cm: Number(e.target.value) })}
                    className="w-full"
                  />
                </label>

                <label className="block space-y-1">
                  <span className="flex justify-between text-slate-300">
                    <span>Diámetro D₂</span>
                    <span className="font-mono text-sky-300">{pumpParams.d2Cm} cm</span>
                  </span>
                  <input
                    type="range"
                    min={1.2}
                    max={4.5}
                    step={0.1}
                    value={pumpParams.d2Cm}
                    onChange={(e) => setPumpParams({ ...pumpParams, d2Cm: Number(e.target.value) })}
                    className="w-full"
                  />
                </label>
              </div>

              <label className="block space-y-1">
                <span className="text-slate-300">Apertura Válvula Compuerta</span>
                <select
                  value={pumpParams.valveOpening}
                  onChange={(e) =>
                    setPumpParams({
                      ...pumpParams,
                      valveOpening: e.target.value as PumpSystemCertamen3Params['valveOpening'],
                    })
                  }
                  className="w-full mt-1 px-2.5 py-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-slate-100"
                >
                  <option value="100">100% Abierta (K = 0.2)</option>
                  <option value="75">75% Abierta (K = 1.1)</option>
                  <option value="50">50% Abierta (K = 3.6)</option>
                  <option value="25">25% Abierta (K = 28.8)</option>
                </select>
              </label>

              <label className="block space-y-1">
                <span className="text-slate-300">Tipo de Codos 90° ({pumpParams.elbowCount} unid.)</span>
                <select
                  value={pumpParams.elbowType}
                  onChange={(e) =>
                    setPumpParams({
                      ...pumpParams,
                      elbowType: e.target.value as PumpSystemCertamen3Params['elbowType'],
                    })
                  }
                  className="w-full mt-1 px-2.5 py-2 rounded-lg bg-[#0B0F17] border border-slate-700 text-slate-100"
                >
                  <option value="bridado_largo">Bridado radio largo (K = 0.2)</option>
                  <option value="bridado_regular">Bridado regular (K = 0.3)</option>
                  <option value="roscado_regular">Roscado regular (K = 1.5)</option>
                </select>
              </label>

              <label className="block space-y-1">
                <span className="flex justify-between text-slate-300">
                  <span>Temperatura del Agua (P_v)</span>
                  <span className="font-mono text-amber-300">{pumpParams.waterTempC}°C</span>
                </span>
                <input
                  type="range"
                  min={10}
                  max={85}
                  step={5}
                  value={pumpParams.waterTempC}
                  onChange={(e) => setPumpParams({ ...pumpParams, waterTempC: Number(e.target.value) })}
                  className="w-full"
                />
              </label>
            </div>

            {/* Right stage: Animated System + Pump vs System Curve */}
            <div className="lg:col-span-8 space-y-5">
              <div className="rounded-xl bg-[#111827] border border-slate-800 p-5 space-y-4">
                <PumpSystemCanvas
                  zbM={pumpParams.zbM}
                  z2M={pumpParams.z2M}
                  v1={pumpRes.v1}
                  v2={pumpRes.v2}
                  isCavitating={pumpRes.isCavitating}
                  valveOpening={pumpParams.valveOpening}
                  flowTrend={pumpRes.flowTrend}
                />

                {/* Pump vs System SVG Curve */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-slate-200">
                      Curva Bomba H_B(Q) vs Curva del Sistema H_req(Q) — Punto de Operación
                    </span>
                    <div className="flex flex-wrap gap-3 font-mono">
                      <span className="text-sky-400">─ H_bomba</span>
                      <span className="text-amber-400">─ H_req (Sistema)</span>
                      <span className="text-emerald-400">● Q_op = {pumpRes.operatingPointQLs.toFixed(2)} L/s</span>
                    </div>
                  </div>

                  <svg viewBox="0 0 640 210" className="w-full h-52 bg-[#0B0F17] rounded-lg border border-slate-800">
                    {/* Axes */}
                    <line x1="50" y1="175" x2="610" y2="175" stroke="#475569" strokeWidth="1.5" />
                    <line x1="50" y1="20" x2="50" y2="175" stroke="#475569" strokeWidth="1.5" />
                    {[0, 10, 20, 30].map((hVal) => {
                      const y = 175 - (hVal / 35) * 145;
                      return (
                        <g key={hVal}>
                          <line x1="50" y1={y} x2="610" y2={y} stroke="#1E293B" strokeDasharray="3 3" />
                          <text x="44" y={y + 4} textAnchor="end" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono">
                            {hVal}m
                          </text>
                        </g>
                      );
                    })}
                    {[0, 1, 2, 3, 4].map((qVal) => {
                      const x = 50 + (qVal / 4) * 550;
                      return (
                        <text key={qVal} x={x} y="192" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono">
                          {qVal} L/s
                        </text>
                      );
                    })}

                    {/* Pump Curve */}
                    <polyline
                      fill="none"
                      stroke="#38BDF8"
                      strokeWidth="2.5"
                      points={pumpRes.curves
                        .map((pt) => {
                          const x = 50 + (pt.qLs / 4) * 550;
                          const y = 175 - Math.min(35, pt.hPump) * (145 / 35);
                          return `${x},${y}`;
                        })
                        .join(' ')}
                    />

                    {/* System Curve */}
                    <polyline
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="2.5"
                      points={pumpRes.curves
                        .map((pt) => {
                          const x = 50 + (pt.qLs / 4) * 550;
                          const y = 175 - Math.min(35, pt.hReq) * (145 / 35);
                          return `${x},${y}`;
                        })
                        .join(' ')}
                    />

                    {/* Operating Point Intersection */}
                    <circle
                      cx={50 + (Math.min(4, pumpRes.operatingPointQLs) / 4) * 550}
                      cy={175 - Math.min(35, pumpRes.operatingPointHM) * (145 / 35)}
                      r={5.5}
                      fill="#10B981"
                      stroke="#0B0F17"
                      strokeWidth="2"
                    />

                    {/* Current evaluated Q marker */}
                    <line
                      x1={50 + (Math.min(4, pumpParams.qLs) / 4) * 550}
                      y1="20"
                      x2={50 + (Math.min(4, pumpParams.qLs) / 4) * 550}
                      y2="175"
                      stroke="#94A3B8"
                      strokeDasharray="4 3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

              <ProfessorBoard board={pumpRes.board} />
            </div>
          }
        />
      )}

      {/* =================================================================== */}
      {/* CASE 4: TURBOMÁQUINAS — RODETE CENTRÍFUGO Y EULER                   */}
      {/* =================================================================== */}
      {activeCase === 'euler' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Controls */}
            <div className="lg:col-span-4 rounded-xl bg-[#111827] border border-slate-800 p-5 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base font-semibold text-slate-100">
                  Rodete Centrífugo (Euler)
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    setEulerParams({
                      qM3s: 0.01,
                      d1Cm: 3.2,
                      d2Cm: 10,
                      vr2Ms: 0.3,
                      rpm: 3450,
                      beta2Deg: 60,
                      rho: 1000,
                    })
                  }
                  className="text-sky-400 hover:text-sky-300 cursor-pointer"
                >
                  Pauta Certamen 3 P2
                </button>
              </div>

              <label className="block space-y-1">
                <span className="flex justify-between text-slate-300">
                  <span>Velocidad de giro (N)</span>
                  <span className="font-mono text-sky-300">{eulerParams.rpm} rpm</span>
                </span>
                <input
                  type="range"
                  min={600}
                  max={4500}
                  step={50}
                  value={eulerParams.rpm}
                  onChange={(e) => setEulerParams({ ...eulerParams, rpm: Number(e.target.value) })}
                  className="w-full"
                />
              </label>

              <label className="block space-y-1">
                <span className="flex justify-between text-slate-300">
                  <span>Ángulo de álabe a la salida (β₂)</span>
                  <span className="font-mono text-amber-300">{eulerParams.beta2Deg}°</span>
                </span>
                <input
                  type="range"
                  min={20}
                  max={90}
                  step={2}
                  value={eulerParams.beta2Deg}
                  onChange={(e) => setEulerParams({ ...eulerParams, beta2Deg: Number(e.target.value) })}
                  className="w-full"
                />
              </label>

              <label className="block space-y-1">
                <span className="flex justify-between text-slate-300">
                  <span>Caudal Q (L/s)</span>
                  <span className="font-mono text-emerald-300">{(eulerParams.qM3s * 1000).toFixed(1)} L/s</span>
                </span>
                <input
                  type="range"
                  min={0.002}
                  max={0.025}
                  step={0.001}
                  value={eulerParams.qM3s}
                  onChange={(e) => setEulerParams({ ...eulerParams, qM3s: Number(e.target.value) })}
                  className="w-full"
                />
              </label>

              <label className="block space-y-1">
                <span className="flex justify-between text-slate-300">
                  <span>Diámetro exterior rodete D₂</span>
                  <span className="font-mono text-slate-200">{eulerParams.d2Cm.toFixed(1)} cm</span>
                </span>
                <input
                  type="range"
                  min={6}
                  max={22}
                  step={0.5}
                  value={eulerParams.d2Cm}
                  onChange={(e) => setEulerParams({ ...eulerParams, d2Cm: Number(e.target.value) })}
                  className="w-full"
                />
              </label>

              <label className="block space-y-1">
                <span className="flex justify-between text-slate-300">
                  <span>Componente radial salida (V_r2)</span>
                  <span className="font-mono text-sky-300">{eulerParams.vr2Ms.toFixed(2)} m/s</span>
                </span>
                <input
                  type="range"
                  min={0.1}
                  max={2.0}
                  step={0.05}
                  value={eulerParams.vr2Ms}
                  onChange={(e) => setEulerParams({ ...eulerParams, vr2Ms: Number(e.target.value) })}
                  className="w-full"
                />
              </label>
            </div>

            {/* Right stage: Spinning Impeller Canvas + Velocity Triangle SVG */}
            <div className="lg:col-span-8 rounded-xl bg-[#111827] border border-slate-800 p-5 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <Waves className="w-4 h-4 text-sky-400" />
                  <span>Geometría Rotatoria del Rodete (b₂ = {eulerRes.b2Mm.toFixed(1)} mm)</span>
                </div>
                <EulerImpellerCanvas
                  rpm={eulerParams.rpm}
                  beta2Deg={eulerParams.beta2Deg}
                  d1Cm={eulerParams.d1Cm}
                  d2Cm={eulerParams.d2Cm}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <Gauge className="w-4 h-4 text-amber-400" />
                  <span>Triángulo de Velocidades a la Salida (V₂ = U₂ + W₂)</span>
                </div>

                {/* SVG Outlet Velocity Triangle */}
                <svg viewBox="0 0 320 250" className="w-full h-[250px] bg-[#0B0F17] rounded-lg border border-slate-800">
                  {/* Reference baseline */}
                  <line x1="25" y1="200" x2="295" y2="200" stroke="#334155" strokeWidth="1.5" />
                  {/* Scale vectors into SVG space */}
                  {(() => {
                    const maxU = Math.max(1, eulerRes.u2Ms);
                    const scaleX = 240 / maxU;
                    const uPx = eulerRes.u2Ms * scaleX;
                    const vThetaPx = Math.max(20, eulerRes.vTheta2Ms * scaleX);
                    const vrPx = Math.min(130, Math.max(24, eulerParams.vr2Ms * 65));

                    const x0 = 35;
                    const y0 = 200;
                    const xU = x0 + uPx;
                    const xV = x0 + vThetaPx;
                    const yV = y0 - vrPx;

                    return (
                      <>
                        {/* U2 vector (horizontal right) */}
                        <line x1={x0} y1={y0} x2={xU} y2={y0} stroke="#38BDF8" strokeWidth="3" />
                        <polygon points={`${xU},${y0} ${xU - 8},${y0 - 4} ${xU - 8},${y0 + 4}`} fill="#38BDF8" />
                        <text x={(x0 + xU) / 2} y={y0 + 18} textAnchor="middle" fill="#38BDF8" fontSize="11" fontFamily="JetBrains Mono">
                          U₂ = {eulerRes.u2Ms.toFixed(2)} m/s
                        </text>

                        {/* V2 vector (absolute) */}
                        <line x1={x0} y1={y0} x2={xV} y2={yV} stroke="#10B981" strokeWidth="3" />
                        <polygon points={`${xV},${yV} ${xV - 8},${yV + 1} ${xV - 3},${yV + 8}`} fill="#10B981" />
                        <text x={(x0 + xV) / 2 - 14} y={(y0 + yV) / 2 - 8} textAnchor="middle" fill="#10B981" fontSize="11" fontFamily="JetBrains Mono">
                          V₂ = {eulerRes.v2MagMs.toFixed(2)} m/s
                        </text>

                        {/* W2 vector (relative, from tip of U2 to tip of V2) */}
                        <line x1={xU} y1={y0} x2={xV} y2={yV} stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="5 3" />
                        <text x={(xU + xV) / 2 + 12} y={(y0 + yV) / 2 - 6} textAnchor="start" fill="#FBBF24" fontSize="11" fontFamily="JetBrains Mono">
                          W₂ (β₂={eulerParams.beta2Deg}°)
                        </text>

                        {/* Radial component Vr2 */}
                        <line x1={xV} y1={y0} x2={xV} y2={yV} stroke="#64748B" strokeWidth="1" strokeDasharray="3 3" />
                        <text x={xV + 6} y={(y0 + yV) / 2 + 14} fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">
                          V_r2={eulerParams.vr2Ms.toFixed(2)}
                        </text>
                      </>
                    );
                  })()}
                </svg>
              </div>
            </div>
          </div>

          <ProfessorBoard board={eulerRes.board} />
        </div>
      )}
    </div>
  );
};
