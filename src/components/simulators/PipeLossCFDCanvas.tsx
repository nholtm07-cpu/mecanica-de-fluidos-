import React, { useEffect, useRef, useState } from 'react';
import { Eye, Layers, Sparkles } from 'lucide-react';
import {
  IndustrialPipeParams,
  IndustrialPipeSolution,
} from '../../physics/pipeLossCFDMath';

interface PipeLossCFDCanvasProps {
  params: IndustrialPipeParams;
  solution: IndustrialPipeSolution;
  layoutMode: 'industrial_cfd_3d' | 'didactic_single_pipe';
  caseTitle: string;
  allowOriginalInfographicToggle?: boolean;
}

interface Pt {
  x: number;
  y: number;
}

function colorStopForVelocity(vMs: number, boost = 0): string {
  const v = Math.max(0, vMs + boost);
  if (v < 0.9) return '#0066ff';
  if (v < 1.35) return '#00c8ff';
  if (v < 1.85) return '#00e676';
  if (v < 2.45) return '#ffd600';
  return '#ff3d00';
}

function samplePolyline(pts: Pt[], tRaw: number): { x: number; y: number; angle: number } {
  const t = Math.max(0, Math.min(1, tRaw));
  const segLens: number[] = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const dx = pts[i + 1].x - pts[i].x;
    const dy = pts[i + 1].y - pts[i].y;
    const len = Math.hypot(dx, dy);
    segLens.push(len);
    total += len;
  }
  if (total <= 0) return { x: pts[0].x, y: pts[0].y, angle: 0 };

  let target = t * total;
  for (let i = 0; i < segLens.length; i++) {
    if (target <= segLens[i] || i === segLens.length - 1) {
      const u = segLens[i] === 0 ? 0 : target / segLens[i];
      const dx = pts[i + 1].x - pts[i].x;
      const dy = pts[i + 1].y - pts[i].y;
      return {
        x: pts[i].x + dx * u,
        y: pts[i].y + dy * u,
        angle: Math.atan2(dy, dx),
      };
    }
    target -= segLens[i];
  }
  return { x: pts[pts.length - 1].x, y: pts[pts.length - 1].y, angle: 0 };
}

function drawCutawayTank(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  waterFrac: number,
  timeSec: number,
  isPressurized: boolean,
  pPsi: number
) {
  // Support legs
  ctx.fillStyle = '#475569';
  ctx.fillRect(x + 8, y + h, 10, 44);
  ctx.fillRect(x + w - 18, y + h, 10, 44);
  ctx.fillStyle = '#334155';
  ctx.fillRect(x + 4, y + h + 40, 18, 6);
  ctx.fillRect(x + w - 22, y + h + 40, 18, 6);

  // Yellow safety railings on top
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(x + 4, y);
  ctx.lineTo(x + 4, y - 16);
  ctx.lineTo(x + w - 4, y - 16);
  ctx.lineTo(x + w - 4, y);
  for (let rx = x + 28; rx < x + w - 12; rx += 26) {
    ctx.moveTo(rx, y);
    ctx.lineTo(rx, y - 16);
  }
  ctx.moveTo(x + 4, y - 8);
  ctx.lineTo(x + w - 4, y - 8);
  ctx.stroke();

  // Outer concrete cutaway wall
  ctx.fillStyle = '#3b4252';
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2;
  ctx.fillRect(x, y, w, h);
  ctx.strokeRect(x, y, w, h);

  // Inner dark cavity
  const pad = 6;
  ctx.fillStyle = '#0b1526';
  ctx.fillRect(x + pad, y + pad, w - pad * 2, h - pad * 2);

  // Water volume
  const innerH = h - pad * 2;
  const waterH = innerH * waterFrac;
  const waterTop = y + h - pad - waterH;

  const waterGrad = ctx.createLinearGradient(0, waterTop, 0, y + h - pad);
  waterGrad.addColorStop(0, 'rgba(14, 165, 233, 0.72)');
  waterGrad.addColorStop(0.4, 'rgba(2, 132, 199, 0.85)');
  waterGrad.addColorStop(1, 'rgba(7, 89, 133, 0.95)');
  ctx.fillStyle = waterGrad;

  ctx.beginPath();
  ctx.moveTo(x + pad, y + h - pad);
  ctx.lineTo(x + pad, waterTop);
  for (let wx = x + pad; wx <= x + w - pad; wx += 6) {
    const wave = Math.sin(wx * 0.09 + timeSec * 3.2) * 1.8;
    ctx.lineTo(wx, waterTop + wave);
  }
  ctx.lineTo(x + w - pad, y + h - pad);
  ctx.closePath();
  ctx.fill();

  // Bright water surface highlight
  ctx.strokeStyle = '#7dd3fc';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  for (let wx = x + pad; wx <= x + w - pad; wx += 6) {
    const wave = Math.sin(wx * 0.09 + timeSec * 3.2) * 1.8;
    if (wx === x + pad) ctx.moveTo(wx, waterTop + wave);
    else ctx.lineTo(wx, waterTop + wave);
  }
  ctx.stroke();

  // If pressurized, draw subtle pressurized dome cap & gauge pipe
  if (isPressurized) {
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - 1, y - 2, w + 2, 5);
    if (pPsi > 0) {
      ctx.fillStyle = 'rgba(251, 191, 36, 0.08)';
      ctx.fillRect(x + pad, y + pad, w - pad * 2, waterTop - (y + pad));
    }
  }
}

function drawFlange(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, pipeRadius: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  const fh = pipeRadius * 2 + 10;
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1;
  ctx.fillRect(-4, -fh / 2, 8, fh);
  ctx.strokeRect(-4, -fh / 2, 8, fh);
  // Bolts
  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.arc(0, -fh / 2 + 2.5, 1.3, 0, Math.PI * 2);
  ctx.arc(0, fh / 2 - 2.5, 1.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawGateValve(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  vertical: boolean,
  openingPct: string
) {
  ctx.save();
  ctx.translate(x, y);
  if (vertical) ctx.rotate(Math.PI / 2);

  // Metallic valve body
  ctx.fillStyle = '#64748b';
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.roundRect(-13, -10, 26, 20, 4);
  ctx.fill();
  ctx.stroke();

  // Valve stem
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, -10);
  ctx.lineTo(0, -24);
  ctx.stroke();

  // Red handwheel
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 3.2;
  ctx.beginPath();
  ctx.ellipse(0, -25, 11, 4.5, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Opening gate indicator inside valve
  const closedRatio =
    openingPct === '100%' ? 0.08 : openingPct === '75%' ? 0.25 : openingPct === '50%' ? 0.5 : 0.75;
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(-2, -9, 4, 18 * closedRatio);

  ctx.restore();
}

function drawCheckValve(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = '#1d4ed8';
  ctx.strokeStyle = '#93c5fd';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.roundRect(-16, -12, 32, 24, 5);
  ctx.fill();
  ctx.stroke();
  // Swing cap
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(-9, -18, 18, 7);
  ctx.strokeRect(-9, -18, 18, 7);
  // White directional arrow
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(-7, -2.5);
  ctx.lineTo(2, -2.5);
  ctx.lineTo(2, -5.5);
  ctx.lineTo(9, 0);
  ctx.lineTo(2, 5.5);
  ctx.lineTo(2, 2.5);
  ctx.lineTo(-7, 2.5);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawPumpAndMotor(ctx: CanvasRenderingContext2D, x: number, y: number, timeSec: number, flowLs: number) {
  // Concrete plinth
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.5;
  ctx.fillRect(x - 36, y + 18, 118, 20);
  ctx.strokeRect(x - 36, y + 18, 118, 20);

  // Volute pump casing (blue)
  ctx.fillStyle = '#0284c7';
  ctx.strokeStyle = '#7dd3fc';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Spinning impeller blades inside sight window
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(timeSec * (2.5 + flowLs * 0.25));
  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 2.2;
  for (let i = 0; i < 6; i++) {
    ctx.rotate(Math.PI / 3);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(6, -5, 13, -2);
    ctx.stroke();
  }
  ctx.restore();

  // Coupling shaft
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(x + 21, y - 5, 16, 10);

  // Blue finned electric motor
  ctx.fillStyle = '#1e40af';
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.roundRect(x + 37, y - 19, 54, 38, 6);
  ctx.fill();
  ctx.stroke();

  // Cooling fins
  ctx.strokeStyle = '#93c5fd';
  ctx.lineWidth = 1.2;
  for (let fy = y - 13; fy <= y + 13; fy += 5) {
    ctx.beginPath();
    ctx.moveTo(x + 41, fy);
    ctx.lineTo(x + 86, fy);
    ctx.stroke();
  }
  // Top junction box
  ctx.fillStyle = '#1d4ed8';
  ctx.fillRect(x + 48, y - 28, 16, 9);
  ctx.strokeRect(x + 48, y - 28, 16, 9);
}

function drawPressureGauge(ctx: CanvasRenderingContext2D, x: number, y: number, pPsi: number) {
  // Stem
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y + 18);
  ctx.lineTo(x, y + 58);
  ctx.stroke();

  // Dial
  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Scale ticks
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.2;
  for (let a = -Math.PI * 0.8; a <= Math.PI * 0.8; a += Math.PI * 0.32) {
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(a - Math.PI / 2) * 11, y + Math.sin(a - Math.PI / 2) * 11);
    ctx.lineTo(x + Math.cos(a - Math.PI / 2) * 15, y + Math.sin(a - Math.PI / 2) * 15);
    ctx.stroke();
  }

  // Needle
  const frac = Math.max(0, Math.min(1, pPsi / 80));
  const needleAngle = -Math.PI * 0.8 + frac * Math.PI * 1.6 - Math.PI / 2;
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + Math.cos(needleAngle) * 13, y + Math.sin(needleAngle) * 13);
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(x, y, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawCalloutBox(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  lines: string[],
  borderColor = '#eab308',
  targetPt?: Pt
) {
  ctx.font = 'bold 11.5px "JetBrains Mono", ui-monospace, monospace';
  const maxW = Math.max(...lines.map((l) => ctx.measureText(l).width));
  const boxW = maxW + 18;
  const boxH = lines.length * 16 + 10;

  if (targetPt) {
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + boxW / 2, y + boxH / 2);
    ctx.lineTo(targetPt.x, targetPt.y);
    ctx.stroke();

    ctx.fillStyle = borderColor;
    ctx.beginPath();
    ctx.arc(targetPt.x, targetPt.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = 'rgba(10, 17, 32, 0.92)';
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.roundRect(x, y, boxW, boxH, 7);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  lines.forEach((line, idx) => {
    ctx.fillText(line, x + 9, y + 17 + idx * 16);
  });
}

function drawDimensionLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  label: string,
  offsetLabel: Pt = { x: 0, y: 0 }
) {
  ctx.save();
  ctx.strokeStyle = '#facc15';
  ctx.fillStyle = '#facc15';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  const ang = Math.atan2(y2 - y1, x2 - x1);
  const drawHead = (px: number, py: number, a: number) => {
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px - Math.cos(a - 0.4) * 7, py - Math.sin(a - 0.4) * 7);
    ctx.lineTo(px - Math.cos(a + 0.4) * 7, py - Math.sin(a + 0.4) * 7);
    ctx.closePath();
    ctx.fill();
  };
  drawHead(x2, y2, ang);
  drawHead(x1, y1, ang + Math.PI);

  const mx = (x1 + x2) / 2 + offsetLabel.x;
  const my = (y1 + y2) / 2 + offsetLabel.y;
  ctx.font = 'bold 13px "JetBrains Mono", ui-monospace, monospace';
  const tw = ctx.measureText(label).width;
  ctx.fillStyle = 'rgba(8, 14, 28, 0.85)';
  ctx.fillRect(mx - tw / 2 - 4, my - 9, tw + 8, 17);
  ctx.fillStyle = '#fde047';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, mx, my);
  ctx.restore();
}

export const PipeLossCFDCanvas: React.FC<PipeLossCFDCanvasProps> = ({
  params,
  solution,
  layoutMode,
  caseTitle,
  allowOriginalInfographicToggle = false,
}) => {
  const [showOriginalInfographic, setShowOriginalInfographic] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ params, solution, layoutMode });
  stateRef.current = { params, solution, layoutMode };

  useEffect(() => {
    if (showOriginalInfographic) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles = Array.from({ length: 38 }, (_, idx) => ({
      t: idx / 38,
      offset: ((idx % 5) - 2) * 2.2,
    }));

    let rafId = 0;
    let lastNow = performance.now();
    let lastDraw = 0;
    const FRAME_INTERVAL_MS = 42; // ~24 fps: smooth CFD motion without starving main thread

    const render = (now: number) => {
      rafId = requestAnimationFrame(render);
      if (document.hidden || now - lastDraw < FRAME_INTERVAL_MS) return;
      lastDraw = now;

      const dt = Math.max(0.01, Math.min(0.08, (now - lastNow) / 1000));
      lastNow = now;
      const timeSec = now / 1000;

      const { params: p, solution: sol, layoutMode: mode } = stateRef.current;
      const W = canvas.width;
      const H = canvas.height;

      // Dark CFD background + 3D perspective floor grid
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#070d1a');
      bg.addColorStop(0.65, '#0b1426');
      bg.addColorStop(1, '#111c33');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Perspective floor grid
      const horizonY = 305;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.09)';
      ctx.lineWidth = 1;
      for (let i = -8; i <= 8; i++) {
        ctx.beginPath();
        ctx.moveTo(W / 2 + i * 44, horizonY);
        ctx.lineTo(W / 2 + i * 115, H);
        ctx.stroke();
      }
      for (let row = 0; row < 8; row++) {
        const yRow = horizonY + Math.pow(row / 7, 1.55) * (H - horizonY);
        ctx.beginPath();
        ctx.moveTo(0, yRow);
        ctx.lineTo(W, yRow);
        ctx.stroke();
      }

      if (mode === 'industrial_cfd_3d') {
        // Left supply tank (Tank 1)
        const t1 = { x: 26, y: 230, w: 158, h: 108 };
        drawCutawayTank(ctx, t1.x, t1.y, t1.w, t1.h, 0.72, timeSec, false, 0);

        // Right elevated tank (Tank 2)
        const t2 = { x: 642, y: 145, w: 174, h: 108 };
        drawCutawayTank(
          ctx,
          t2.x,
          t2.y,
          t2.w,
          t2.h,
          0.66,
          timeSec,
          p.isPressurizedTank2,
          p.p2Psi
        );

        // Suction polyline (D1): from intake A inside tank 1 down -> horizontal -> pump
        const suctionPts: Pt[] = [
          { x: 118, y: 274 },
          { x: 138, y: 274 },
          { x: 138, y: 394 },
          { x: 356, y: 394 },
        ];
        // Discharge polyline (D2): pump -> vertical up -> offset -> vertical up -> horizontal -> drop
        const dischargePts: Pt[] = [
          { x: 378, y: 372 },
          { x: 378, y: 205 },
          { x: 500, y: 205 },
          { x: 500, y: 80 },
          { x: 696, y: 80 },
          { x: 696, y: 196 },
        ];

        // Pipe outer diameters scaled visually to D1 & D2
        const r1 = Math.max(7, Math.min(13, p.d1Mm / 12.5));
        const r2 = Math.max(6, Math.min(12, p.d2Mm / 11.5));

        const drawCFDPipe = (
          pts: Pt[],
          radius: number,
          vMs: number,
          throttleBoost: number,
          isDischarge: boolean
        ) => {
          // Outer metallic wall
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = radius * 2 + 5;
          ctx.beginPath();
          pts.forEach((pt, idx) => (idx === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)));
          ctx.stroke();

          // CFD core gradient reflecting velocity scale + pump/elbow acceleration
          const grad = ctx.createLinearGradient(pts[0].x, pts[0].y, pts[pts.length - 1].x, pts[pts.length - 1].y);
          if (isDischarge) {
            grad.addColorStop(0, colorStopForVelocity(vMs, 0.85)); // high jet at pump discharge
            grad.addColorStop(0.28, colorStopForVelocity(vMs, -0.2));
            grad.addColorStop(0.55, colorStopForVelocity(vMs, throttleBoost * 0.4));
            grad.addColorStop(0.82, colorStopForVelocity(vMs, -0.15));
            grad.addColorStop(1, colorStopForVelocity(vMs, 0.55)); // drop jet into tank 2
          } else {
            grad.addColorStop(0, colorStopForVelocity(vMs, -0.25));
            grad.addColorStop(0.55, colorStopForVelocity(vMs, throttleBoost * 0.5));
            grad.addColorStop(1, colorStopForVelocity(vMs, 0.35)); // acceleration entering pump
          }
          ctx.strokeStyle = grad;
          ctx.lineWidth = radius * 2 - 1;
          ctx.beginPath();
          pts.forEach((pt, idx) => (idx === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)));
          ctx.stroke();

          // Specular pipe highlight
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.24)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          pts.forEach((pt, idx) => (idx === 0 ? ctx.moveTo(pt.x, pt.y - 2) : ctx.lineTo(pt.x, pt.y - 2)));
          ctx.stroke();
        };

        const v1Throttle = p.v1Opening === '25%' ? 1.4 : p.v1Opening === '50%' ? 0.7 : 0;
        const v2Throttle = p.v2Opening === '25%' ? 1.5 : p.v2Opening === '50%' ? 0.8 : 0.15;

        drawCFDPipe(suctionPts, r1, sol.line1.velocityMs, v1Throttle, false);
        drawCFDPipe(dischargePts, r2, sol.line2.velocityMs, v2Throttle, true);

        // Flanges
        drawFlange(ctx, 138, 344, Math.PI / 2, r1);
        drawFlange(ctx, 210, 394, 0, r1);
        drawFlange(ctx, 315, 394, 0, r1);
        drawFlange(ctx, 378, 332, Math.PI / 2, r2);
        drawFlange(ctx, 378, 240, Math.PI / 2, r2);
        drawFlange(ctx, 500, 128, Math.PI / 2, r2);
        drawFlange(ctx, 648, 80, 0, r2);

        // Animated CFD tracer particles (suction speed vs discharge speed)
        const v1Speed = Math.max(0.06, Math.min(0.45, sol.line1.velocityMs * 0.14));
        const v2Speed = Math.max(0.08, Math.min(0.65, sol.line2.velocityMs * 0.14));

        particles.forEach((pt, idx) => {
          const isSuction = idx < 14;
          const speed = isSuction ? v1Speed : v2Speed;
          pt.t = (pt.t + dt * speed) % 1;
          const pos = samplePolyline(isSuction ? suctionPts : dischargePts, pt.t);
          const nx = -Math.sin(pos.angle) * pt.offset;
          const ny = Math.cos(pos.angle) * pt.offset;
          ctx.fillStyle = isSuction ? '#e0f2fe' : '#fef08a';
          ctx.beginPath();
          ctx.arc(pos.x + nx, pos.y + ny, isSuction ? 2.1 : 2.3, 0, Math.PI * 2);
          ctx.fill();
        });

        // Valves & Pump
        drawGateValve(ctx, 265, 394, false, p.v1Opening);
        drawPumpAndMotor(ctx, 378, 390, timeSec, p.flowLs);
        drawGateValve(ctx, 378, 286, true, p.v2Opening);
        drawCheckValve(ctx, 594, 80);

        // Intake 'A' yellow badge
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(114, 274, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 12px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('A', 114, 274);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';

        // Elevation dashed line & Dimension callouts matching infographic (non-overlapping)
        ctx.setLineDash([5, 4]);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(156, 80);
        ctx.lineTo(500, 80);
        ctx.stroke();
        ctx.setLineDash([]);

        drawDimensionLine(ctx, 198, 260, 198, 80, `${p.zTopM} m`, { x: -26, y: 0 });
        drawDimensionLine(ctx, 108, 338, 108, 394, `3 m`, { x: -20, y: 0 });
        drawDimensionLine(ctx, 138, 418, 354, 418, `${p.l1M - 3 > 0 ? p.l1M - 3 : 10} m`, { x: 0, y: 12 });
        drawDimensionLine(ctx, 344, 348, 344, 205, `22 m`, { x: -24, y: 0 });
        drawDimensionLine(ctx, 472, 205, 472, 80, `12 m`, { x: -22, y: 0 });
        drawDimensionLine(ctx, 608, 46, 696, 46, `6 m`, { x: 0, y: -14 });
        drawDimensionLine(ctx, 672, 80, 672, 174, `${p.hDropM} m`, { x: -22, y: 0 });

        // Pressure Gauge on Tank 2
        drawPressureGauge(ctx, 766, 88, p.isPressurizedTank2 ? p.p2Psi : 0);

        // Floating Callout Boxes (yellow/cyan borders, clean spacing)
        drawCalloutBox(
          ctx,
          184,
          318,
          [`D₁ = ${p.d1Mm} mm`, `V₁ = ${sol.line1.velocityMs.toFixed(2)} m/s`],
          '#eab308',
          { x: 222, y: 386 }
        );
        drawCalloutBox(
          ctx,
          188,
          446,
          [`V1 — compuerta`, `${p.v1Opening} abierta (K=${sol.kV1.toFixed(1)})`],
          '#eab308',
          { x: 265, y: 404 }
        );
        drawCalloutBox(
          ctx,
          412,
          258,
          [`D₂ = ${p.d2Mm} mm`, `V₂ = ${sol.line2.velocityMs.toFixed(2)} m/s`],
          '#38bdf8',
          { x: 386, y: 222 }
        );
        drawCalloutBox(
          ctx,
          414,
          312,
          [`V2 — compuerta`, `${p.v2Opening} abierta (K=${sol.kV2.toFixed(1)})`],
          '#eab308',
          { x: 388, y: 286 }
        );
        drawCalloutBox(
          ctx,
          388,
          14,
          [`V3 — válvula check`, `K = ${sol.kV3.toFixed(1)}`],
          '#eab308',
          { x: 582, y: 74 }
        );
        drawCalloutBox(
          ctx,
          724,
          18,
          p.isPressurizedTank2
            ? [`p₂ = ${p.p2Psi.toFixed(1)} lb/plg²`, `(${sol.p2Kpa.toFixed(1)} kPa)`]
            : [`Estanque Abierto`, `p₂ = 0 kPa (atm)`],
          '#eab308',
          { x: 766, y: 70 }
        );
      } else {
        // DIDACTIC SINGLE PIPE MODE (Example 3 - Study Guide)
        const t1 = { x: 38, y: 165, w: 145, h: 120 };
        const t2 = { x: 642, y: 112, w: 148, h: 112 };
        drawCutawayTank(ctx, t1.x, t1.y, t1.w, t1.h, 0.78, timeSec, false, 0);
        drawCutawayTank(ctx, t2.x, t2.y, t2.w, t2.h, 0.56, timeSec, false, 0);

        const pipePts: Pt[] = [
          { x: 180, y: 245 },
          { x: 295, y: 245 },
          { x: 335, y: 282 },
          { x: 515, y: 282 },
          { x: 555, y: 192 },
          { x: 648, y: 192 },
        ];
        const rPipe = Math.max(8, Math.min(14, p.d2Mm / 9.5));

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = rPipe * 2 + 5;
        ctx.beginPath();
        pipePts.forEach((pt, idx) => (idx === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)));
        ctx.stroke();

        const vColor = colorStopForVelocity(sol.line2.velocityMs, 0);
        ctx.strokeStyle = vColor;
        ctx.lineWidth = rPipe * 2 - 1;
        ctx.beginPath();
        pipePts.forEach((pt, idx) => (idx === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)));
        ctx.stroke();

        drawFlange(ctx, 228, 245, 0, rPipe);
        drawFlange(ctx, 485, 282, 0, rPipe);
        drawFlange(ctx, 608, 192, 0, rPipe);
        drawGateValve(ctx, 425, 282, false, p.v2Opening);

        const speed = Math.max(0.08, Math.min(0.5, sol.line2.velocityMs * 0.16));
        particles.forEach((pt) => {
          pt.t = (pt.t + dt * speed) % 1;
          const pos = samplePolyline(pipePts, pt.t);
          const nx = -Math.sin(pos.angle) * pt.offset;
          const ny = Math.cos(pos.angle) * pt.offset;
          ctx.fillStyle = '#e0f2fe';
          ctx.beginPath();
          ctx.arc(pos.x + nx, pos.y + ny, 2.2, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(180, 178);
        ctx.lineTo(420, 194);
        ctx.lineTo(428, 206);
        ctx.lineTo(646, 214);
        ctx.stroke();
        ctx.setLineDash([]);

        drawDimensionLine(ctx, 180, 332, 648, 332, `L = ${p.l2M.toFixed(1)} m`, { x: 0, y: 14 });
        drawCalloutBox(
          ctx,
          204,
          104,
          [
            `D = ${p.d2Mm} mm · ε = ${p.roughnessMm} mm`,
            `V = ${sol.line2.velocityMs.toFixed(3)} m/s · Re = ${Math.round(sol.line2.reynolds).toLocaleString('es-CL')}`,
            `f = ${sol.line2.frictionFactor.toFixed(5)} (${sol.line2.regime})`,
          ],
          '#38bdf8',
          { x: 265, y: 238 }
        );
        drawCalloutBox(
          ctx,
          355,
          374,
          [`Accesorios ΣK = ${sol.line2.sumK.toFixed(2)}`, `hm = ${sol.hmTotalM.toFixed(3)} m | hf = ${sol.hfTotalM.toFixed(3)} m`],
          '#eab308',
          { x: 425, y: 292 }
        );
      }

      // Top-left Hero Badge: H = ? (resolved live!)
      ctx.fillStyle = 'rgba(9, 15, 29, 0.92)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(18, 16, 222, 70, 12);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 26px "JetBrains Mono", ui-monospace, monospace';
      ctx.fillText(
        p.hasPump ? `H = ${sol.pumpHeadM.toFixed(2)} m` : `hL = ${sol.hLTotalM.toFixed(3)} m`,
        32,
        52
      );
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px "Inter", sans-serif';
      ctx.fillText(
        p.hasPump
          ? `Pelec = ${sol.electricPowerKw.toFixed(2)} kW (${sol.electricPowerHp.toFixed(2)} HP)`
          : `Δp_equiv = ${sol.deltaPEquivKpa.toFixed(2)} kPa · Ph = ${sol.hydraulicPowerW.toFixed(1)} W`,
        32,
        74
      );

      // Right-side "Parámetros del sistema" card (matching infographic)
      const cardX = 696;
      const cardY = 266;
      ctx.fillStyle = 'rgba(9, 15, 29, 0.92)';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, 206, 134, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px "Inter", sans-serif';
      ctx.fillText('Parámetros del sistema', cardX + 14, cardY + 22);
      ctx.strokeStyle = '#334155';
      ctx.beginPath();
      ctx.moveTo(cardX + 12, cardY + 30);
      ctx.lineTo(cardX + 194, cardY + 30);
      ctx.stroke();

      ctx.font = '11.5px "JetBrains Mono", monospace';
      const paramRows = [
        p.hasPump ? `η motor = ${p.etaMotorPct}%` : `Q = ${p.flowLs.toFixed(1)} L/s`,
        p.hasPump ? `η bomba = ${p.etaPumpPct}%` : `T agua = ${p.waterTempC} °C`,
        `ε = ${sol.roughnessIn.toFixed(4)} in (${p.roughnessMm.toFixed(3)} mm)`,
        `Codos: K = ${p.kElbowsTotal.toFixed(1)}`,
      ];
      paramRows.forEach((row, idx) => {
        ctx.fillStyle = idx < 2 ? '#fde047' : '#e2e8f0';
        ctx.fillText(row, cardX + 14, cardY + 52 + idx * 22);
      });

      // Bottom-right CFD Velocity Colorbar Legend
      const legX = 636;
      const legY = 414;
      ctx.fillStyle = 'rgba(9, 15, 29, 0.92)';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(legX, legY, 266, 62, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 11.5px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Velocidad — escala ilustrativa', legX + 133, legY + 17);

      const barGrad = ctx.createLinearGradient(legX + 16, 0, legX + 250, 0);
      barGrad.addColorStop(0, '#0044ff');
      barGrad.addColorStop(0.28, '#00d4ff');
      barGrad.addColorStop(0.55, '#00e676');
      barGrad.addColorStop(0.8, '#ffd600');
      barGrad.addColorStop(1, '#ff2200');
      ctx.fillStyle = barGrad;
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(legX + 16, legY + 24, 234, 15, 7);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '10.5px "Inter", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Baja (<1 m/s)', legX + 16, legY + 53);
      ctx.textAlign = 'center';
      ctx.fillText('Media', legX + 133, legY + 53);
      ctx.textAlign = 'right';
      ctx.fillText('Alta (>2.5 m/s)', legX + 250, legY + 53);
      ctx.textAlign = 'left';

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [showOriginalInfographic]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="font-semibold text-slate-100">{caseTitle}</span>
          <span className="text-slate-500">·</span>
          <span className="font-mono text-sky-300 tabular-nums">
            Q = {params.flowLs.toFixed(1)} L/s
          </span>
        </div>

        {allowOriginalInfographicToggle && (
          <button
            type="button"
            onClick={() => setShowOriginalInfographic((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-amber-500/50 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {showOriginalInfographic ? (
              <>
                <Layers className="w-3.5 h-3.5" />
                Vista Interactiva CFD
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                Ver Infografía 3D Original
              </>
            )}
          </button>
        )}
      </div>

      {showOriginalInfographic ? (
        <div className="rounded-xl overflow-hidden border border-amber-500/40 bg-[#070d1a] p-2">
          <img
            src="/assets/aistudio/Infograf_a_t_cnica_de_sistema_hidr_ulico_15c7c463.png"
            alt="Infografía técnica 3D original del sistema hidráulico"
            className="w-full h-auto rounded-lg object-contain max-h-[520px] mx-auto"
          />
          <p className="text-[11px] text-slate-400 text-center pt-2">
            Infografía 3D de referencia del problema industrial. Cambia a{' '}
            <strong className="text-sky-300">Vista Interactiva CFD</strong> para simular cambios de caudal, diámetros y válvulas en vivo.
          </p>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#070d1a]">
          <canvas
            ref={canvasRef}
            width={920}
            height={492}
            data-testid="cfd-pipe-canvas"
            className="w-full h-auto block"
          />
          <div className="px-4 py-2.5 bg-[#091020] border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
            <div>
              <span className="font-semibold text-amber-300">Sistema: </span>
              {params.hasPump
                ? 'Tubería con bomba centrífuga y pérdidas de carga'
                : 'Tubería de diámetro uniforme con pérdidas por fricción y accesorios'}
            </div>
            <div className="font-mono text-slate-400 tabular-nums">
              {solution.cavitationMarginNote}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
