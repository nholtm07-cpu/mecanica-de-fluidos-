// Motor matemático CFD 3D y de pérdidas de carga para sistemas de tuberías industriales
// Soporta múltiples ejemplos (Infografía 3D, Guía de Estudio, y presets/importador Çengel & Mott)

export type ValveOpening = '100%' | '75%' | '50%' | '25%';

export const VALVE_K_BY_OPENING: Record<ValveOpening, number> = {
  '100%': 0.2,
  '75%': 0.9,
  '50%': 4.5,
  '25%': 24.0,
};

export interface IndustrialPipeParams {
  flowLs: number; // L/s (1 - 50)
  d1Mm: number; // mm (50 - 300)
  d2Mm: number; // mm (40 - 250)
  l1M: number; // m (0 - 100)
  l2M: number; // m (5 - 200)
  zTopM: number; // m (0 - 60)
  hDropM: number; // m (0 - 15)
  p1Kpa: number; // kPa (estanque 1)
  p2Psi: number; // psi (estanque 2 / manómetro)
  roughnessMm: number; // mm (0.0015 - 3.0)
  v1Opening: ValveOpening;
  v2Opening: ValveOpening;
  kV1Override?: number;
  kV2Override?: number;
  kV3Check: number; // válvula check (0 - 15)
  kElbowsTotal: number; // K total de codos (0 - 12)
  suctionElbowFraction: number; // fracción de K_codos asignada a D1 (0 - 1)
  kEntrance: number; // K entrada A (0 - 1.0)
  kExit: number; // K salida estanque 2 (0 - 1.0)
  etaPumpPct: number; // % (30 - 95)
  etaMotorPct: number; // % (50 - 99)
  waterTempC: number; // °C (5 - 80)
  hasPump: boolean;
  includeSuctionLine: boolean;
  isPressurizedTank2: boolean;
}

export interface PipeSystemCase {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  sourceLabel: string;
  description: string;
  layoutMode: 'industrial_cfd_3d' | 'didactic_single_pipe';
  params: IndustrialPipeParams;
  physicalNote: string;
  typicalErrors: string[];
}

export interface FluidPropertiesAtTemp {
  tempC: number;
  rho: number; // kg/m^3
  nu: number; // m^2/s
  mu: number; // Pa·s
  vaporPressureKpa: number; // kPa
  gamma: number; // N/m^3
}

const WATER_TABLE: Array<{ t: number; rho: number; nu: number; pvKpa: number }> = [
  { t: 5, rho: 999.9, nu: 1.519e-6, pvKpa: 0.872 },
  { t: 10, rho: 999.7, nu: 1.307e-6, pvKpa: 1.228 },
  { t: 15, rho: 999.1, nu: 1.139e-6, pvKpa: 1.705 },
  { t: 20, rho: 998.2, nu: 1.004e-6, pvKpa: 2.339 },
  { t: 25, rho: 997.0, nu: 0.893e-6, pvKpa: 3.169 },
  { t: 30, rho: 995.6, nu: 0.801e-6, pvKpa: 4.246 },
  { t: 40, rho: 992.2, nu: 0.658e-6, pvKpa: 7.384 },
  { t: 50, rho: 988.0, nu: 0.553e-6, pvKpa: 12.35 },
  { t: 60, rho: 983.2, nu: 0.475e-6, pvKpa: 19.94 },
  { t: 70, rho: 977.8, nu: 0.413e-6, pvKpa: 31.19 },
  { t: 80, rho: 971.8, nu: 0.365e-6, pvKpa: 47.39 },
];

export const GRAVITY = 9.81;
export const PSI_TO_PA = 6894.757293168361;
export const IN_TO_MM = 25.4;

export function getWaterProperties(tempC: number): FluidPropertiesAtTemp {
  const clamped = Math.max(5, Math.min(80, tempC));
  let lower = WATER_TABLE[0];
  let upper = WATER_TABLE[WATER_TABLE.length - 1];

  for (let i = 0; i < WATER_TABLE.length - 1; i++) {
    if (clamped >= WATER_TABLE[i].t && clamped <= WATER_TABLE[i + 1].t) {
      lower = WATER_TABLE[i];
      upper = WATER_TABLE[i + 1];
      break;
    }
  }

  const ratio = upper.t === lower.t ? 0 : (clamped - lower.t) / (upper.t - lower.t);
  const rho = lower.rho + (upper.rho - lower.rho) * ratio;
  const nu = lower.nu + (upper.nu - lower.nu) * ratio;
  const vaporPressureKpa = lower.pvKpa + (upper.pvKpa - lower.pvKpa) * ratio;

  return {
    tempC: clamped,
    rho,
    nu,
    mu: rho * nu,
    vaporPressureKpa,
    gamma: rho * GRAVITY,
  };
}

export interface LineHydraulics {
  label: string;
  diameterM: number;
  diameterMm: number;
  lengthM: number;
  areaM2: number;
  velocityMs: number;
  velocityHeadM: number;
  reynolds: number;
  regime: 'Laminar' | 'Transición' | 'Turbulento';
  relativeRoughness: number;
  frictionFactor: number;
  frictionFormula: string;
  hfM: number;
  sumK: number;
  hmM: number;
  hTotalLineM: number;
  kBreakdown: Array<{ name: string; k: number }>;
}

export interface CFDColorInfo {
  hex: string;
  label: 'Baja' | 'Media' | 'Alta';
  normalized: number;
}

export interface IndustrialPipeSolution {
  fluid: FluidPropertiesAtTemp;
  qM3s: number;
  qLs: number;
  p1Pa: number;
  p2Pa: number;
  p2Kpa: number;
  p2Psi: number;
  p2HeadM: number;
  p1HeadM: number;
  deltaPHeadM: number;
  deltaZM: number;
  roughnessM: number;
  roughnessIn: number;
  kV1: number;
  kV2: number;
  kV3: number;
  kCodos1: number;
  kCodos2: number;
  line1: LineHydraulics;
  line2: LineHydraulics;
  hfTotalM: number;
  hmTotalM: number;
  hLTotalM: number;
  deltaPEquivKpa: number;
  pumpHeadM: number;
  hydraulicPowerW: number;
  hydraulicPowerKw: number;
  shaftPowerW: number;
  shaftPowerKw: number;
  shaftPowerHp: number;
  electricPowerW: number;
  electricPowerKw: number;
  electricPowerHp: number;
  cavitationMarginNote: string;
  cfdColor1: CFDColorInfo;
  cfdColor2: CFDColorInfo;
  steps: Array<{
    stepNumber: number;
    title: string;
    formulaLatex: string;
    calculationText: string;
    resultLabel: string;
  }>;
}

export function computeDarcyFriction(reynolds: number, relRoughness: number): {
  f: number;
  regime: 'Laminar' | 'Transición' | 'Turbulento';
  formulaName: string;
} {
  if (reynolds <= 0) {
    return { f: 0, regime: 'Laminar', formulaName: 'Flujo nulo' };
  }
  if (reynolds < 2300) {
    return {
      f: 64 / Math.max(reynolds, 1),
      regime: 'Laminar',
      formulaName: 'Hagen-Poiseuille (f = 64 / Re)',
    };
  }
  const term = relRoughness / 3.7 + 5.74 / Math.pow(reynolds, 0.9);
  const f = 0.25 / Math.pow(Math.log10(term), 2);
  return {
    f,
    regime: reynolds <= 4000 ? 'Transición' : 'Turbulento',
    formulaName: 'Swamee-Jain (explícita Colebrook)',
  };
}

export function velocityToCFDColor(vMs: number): CFDColorInfo {
  const t = Math.max(0, Math.min(1, vMs / 3.5));
  let hex = '#0077ff';
  let label: 'Baja' | 'Media' | 'Alta' = 'Baja';

  if (vMs < 1.0) {
    const u = vMs / 1.0;
    const r = 0;
    const g = Math.round(72 + u * 130);
    const b = 255;
    hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    label = 'Baja';
  } else if (vMs <= 2.5) {
    const u = (vMs - 1.0) / 1.5;
    if (u < 0.5) {
      const s = u * 2;
      const r = 0;
      const g = Math.round(202 + s * 53);
      const b = Math.round(255 - s * 155);
      hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    } else {
      const s = (u - 0.5) * 2;
      const r = Math.round(s * 245);
      const g = Math.round(255 - s * 35);
      const b = Math.round(100 - s * 100);
      hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    label = 'Media';
  } else {
    const u = Math.min(1, (vMs - 2.5) / 1.5);
    const r = 255;
    const g = Math.round(204 - u * 165);
    const b = Math.round(10 - u * 10);
    hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    label = 'Alta';
  }

  return { hex, label, normalized: t };
}

function solveLine(
  label: string,
  diameterMm: number,
  lengthM: number,
  qM3s: number,
  roughnessM: number,
  nu: number,
  kBreakdown: Array<{ name: string; k: number }>,
  active: boolean
): LineHydraulics {
  const diameterM = diameterMm / 1000;
  const areaM2 = Math.PI * Math.pow(diameterM, 2) / 4;
  if (!active || areaM2 <= 0) {
    return {
      label,
      diameterM,
      diameterMm,
      lengthM: 0,
      areaM2,
      velocityMs: 0,
      velocityHeadM: 0,
      reynolds: 0,
      regime: 'Laminar',
      relativeRoughness: 0,
      frictionFactor: 0,
      frictionFormula: 'Tramo inactivo',
      hfM: 0,
      sumK: 0,
      hmM: 0,
      hTotalLineM: 0,
      kBreakdown: [],
    };
  }

  const velocityMs = qM3s / areaM2;
  const velocityHeadM = Math.pow(velocityMs, 2) / (2 * GRAVITY);
  const reynolds = (velocityMs * diameterM) / nu;
  const relativeRoughness = roughnessM / diameterM;
  const { f, regime, formulaName } = computeDarcyFriction(reynolds, relativeRoughness);
  const hfM = f * (lengthM / diameterM) * velocityHeadM;
  const sumK = kBreakdown.reduce((acc, item) => acc + item.k, 0);
  const hmM = sumK * velocityHeadM;

  return {
    label,
    diameterM,
    diameterMm,
    lengthM,
    areaM2,
    velocityMs,
    velocityHeadM,
    reynolds,
    regime,
    relativeRoughness,
    frictionFactor: f,
    frictionFormula: formulaName,
    hfM,
    sumK,
    hmM,
    hTotalLineM: hfM + hmM,
    kBreakdown,
  };
}

export function solveIndustrialPipeSystem(params: IndustrialPipeParams): IndustrialPipeSolution {
  const fluid = getWaterProperties(params.waterTempC);
  const qM3s = params.flowLs / 1000;
  const roughnessM = params.roughnessMm / 1000;
  const roughnessIn = params.roughnessMm / IN_TO_MM;

  const p1Pa = params.p1Kpa * 1000;
  const p2Pa = params.isPressurizedTank2 ? params.p2Psi * PSI_TO_PA : 0;
  const p2Kpa = p2Pa / 1000;
  const p1HeadM = p1Pa / fluid.gamma;
  const p2HeadM = p2Pa / fluid.gamma;
  const deltaPHeadM = p2HeadM - p1HeadM;
  const deltaZM = params.zTopM - params.hDropM;

  const kV1 = params.kV1Override !== undefined ? params.kV1Override : VALVE_K_BY_OPENING[params.v1Opening];
  const kV2 = params.kV2Override !== undefined ? params.kV2Override : VALVE_K_BY_OPENING[params.v2Opening];
  const kV3 = params.kV3Check;

  const frac1 = params.includeSuctionLine ? Math.max(0, Math.min(1, params.suctionElbowFraction)) : 0;
  const kCodos1 = params.kElbowsTotal * frac1;
  const kCodos2 = params.kElbowsTotal * (1 - frac1);

  const line1Breakdown: Array<{ name: string; k: number }> = params.includeSuctionLine
    ? [
        { name: 'Entrada estanque (A)', k: params.kEntrance },
        { name: `Válvula V1 (${params.v1Opening})`, k: kV1 },
        { name: 'Codos en succión (D₁)', k: kCodos1 },
      ]
    : [];

  const line2Breakdown: Array<{ name: string; k: number }> = [
    ...(!params.includeSuctionLine && params.kEntrance > 0
      ? [{ name: 'Entrada estanque (A)', k: params.kEntrance }]
      : []),
    { name: params.hasPump ? `Válvula V2 (${params.v2Opening})` : 'Válvula de paso', k: kV2 },
    ...(kV3 > 0 ? [{ name: 'Válvula check V3', k: kV3 }] : []),
    { name: params.includeSuctionLine ? 'Codos en descarga (D₂)' : 'Codos 90° estándar', k: kCodos2 },
    { name: 'Descarga a estanque', k: params.kExit },
  ];

  const line1 = solveLine(
    'Línea de Succión (D₁)',
    params.d1Mm,
    params.l1M,
    qM3s,
    roughnessM,
    fluid.nu,
    line1Breakdown,
    params.includeSuctionLine
  );

  const line2 = solveLine(
    params.includeSuctionLine ? 'Línea de Descarga (D₂)' : 'Tubería Principal (D)',
    params.d2Mm,
    params.l2M,
    qM3s,
    roughnessM,
    fluid.nu,
    line2Breakdown,
    true
  );

  const hfTotalM = line1.hfM + line2.hfM;
  const hmTotalM = line1.hmM + line2.hmM;
  const hLTotalM = hfTotalM + hmTotalM;
  const deltaPEquivKpa = (fluid.gamma * hLTotalM) / 1000;

  const pumpHeadM = params.hasPump
    ? Math.max(0, deltaPHeadM + deltaZM + hLTotalM)
    : hLTotalM;

  const hydraulicPowerW = fluid.gamma * qM3s * pumpHeadM;
  const hydraulicPowerKw = hydraulicPowerW / 1000;

  const etaP = Math.max(0.05, params.etaPumpPct / 100);
  const etaM = Math.max(0.05, params.etaMotorPct / 100);

  const shaftPowerW = params.hasPump ? hydraulicPowerW / etaP : hydraulicPowerW;
  const shaftPowerKw = shaftPowerW / 1000;
  const shaftPowerHp = shaftPowerW / 745.69987;

  const electricPowerW = params.hasPump ? shaftPowerW / etaM : hydraulicPowerW;
  const electricPowerKw = electricPowerW / 1000;
  const electricPowerHp = electricPowerW / 745.69987;

  const pAtmHeadM = 101325 / fluid.gamma;
  const pVapHeadM = (fluid.vaporPressureKpa * 1000) / fluid.gamma;
  const suctionDropM = params.includeSuctionLine ? 3.0 + line1.hTotalLineM + line1.velocityHeadM : 0;
  const approxNpsha = pAtmHeadM + p1HeadM - pVapHeadM - suctionDropM;
  const cavitationMarginNote = params.hasPump
    ? approxNpsha > 5
      ? `NPSHa estimado ≈ ${approxNpsha.toFixed(2)} m (succión segura frente a Pv = ${fluid.vaporPressureKpa.toFixed(2)} kPa)`
      : `Alerta de cavitación: NPSHa estimado ≈ ${approxNpsha.toFixed(2)} m (reducir pérdidas o aumentar D₁)`
    : `Caída de presión equivalente por fricción y accesorios: Δp = ${deltaPEquivKpa.toFixed(2)} kPa`;

  const cfdColor1 = velocityToCFDColor(params.includeSuctionLine ? line1.velocityMs : line2.velocityMs);
  const cfdColor2 = velocityToCFDColor(line2.velocityMs);

  const steps: IndustrialPipeSolution['steps'] = [
    {
      stepNumber: 1,
      title: 'Conversión de unidades al Sistema Internacional (SI)',
      formulaLatex: 'Q [m³/s] = Q [L/s] / 1000  |  D [m] = D [mm] / 1000  |  p [Pa] = p [psi] × 6894.76',
      calculationText: `Q = ${params.flowLs.toFixed(1)} L/s = ${qM3s.toFixed(5)} m³/s · ε = ${params.roughnessMm.toFixed(4)} mm (${roughnessIn.toFixed(4)} in) · ${
        params.isPressurizedTank2
          ? `p₂ = ${params.p2Psi.toFixed(1)} psi = ${p2Kpa.toFixed(2)} kPa (${p2HeadM.toFixed(2)} m.c.a.)`
          : 'Estanque 2 abierto (p₂ = 0 kPa man)'
      } · Agua a ${fluid.tempC.toFixed(0)} °C (ρ = ${fluid.rho.toFixed(1)} kg/m³, ν = ${(fluid.nu * 1e6).toFixed(3)}×10⁻⁶ m²/s)`,
      resultLabel: `Q = ${qM3s.toFixed(4)} m³/s · Δz = ${deltaZM.toFixed(2)} m`,
    },
    {
      stepNumber: 2,
      title: 'Áreas transversales, velocidades (Continuidad) y cabezas cinéticas',
      formulaLatex: 'A = π·D² / 4   |   V = Q / A   |   hv = V² / (2g)',
      calculationText: params.includeSuctionLine
        ? `Succión (D₁ = ${params.d1Mm} mm): A₁ = ${line1.areaM2.toFixed(5)} m², V₁ = ${line1.velocityMs.toFixed(3)} m/s, V₁²/(2g) = ${line1.velocityHeadM.toFixed(4)} m | Descarga (D₂ = ${params.d2Mm} mm): A₂ = ${line2.areaM2.toFixed(5)} m², V₂ = ${line2.velocityMs.toFixed(3)} m/s, V₂²/(2g) = ${line2.velocityHeadM.toFixed(4)} m`
        : `Tubería (D = ${params.d2Mm} mm): A = ${line2.areaM2.toFixed(6)} m² → V = ${line2.velocityMs.toFixed(5)} m/s → V²/(2g) = ${line2.velocityHeadM.toFixed(5)} m`,
      resultLabel: params.includeSuctionLine
        ? `V₁ = ${line1.velocityMs.toFixed(2)} m/s · V₂ = ${line2.velocityMs.toFixed(2)} m/s`
        : `V = ${line2.velocityMs.toFixed(3)} m/s`,
    },
    {
      stepNumber: 3,
      title: 'Número de Reynolds y régimen de flujo',
      formulaLatex: 'Re = (V · D) / ν',
      calculationText: params.includeSuctionLine
        ? `Re₁ = (${line1.velocityMs.toFixed(3)} × ${line1.diameterM.toFixed(3)}) / ${fluid.nu.toExponential(3)} = ${Math.round(line1.reynolds).toLocaleString('es-CL')} (${line1.regime}) | Re₂ = ${Math.round(line2.reynolds).toLocaleString('es-CL')} (${line2.regime})`
        : `Re = (${line2.velocityMs.toFixed(4)} × ${line2.diameterM.toFixed(3)}) / ${fluid.nu.toExponential(3)} = ${Math.round(line2.reynolds).toLocaleString('es-CL')} (${line2.regime})`,
      resultLabel: params.includeSuctionLine
        ? `Re₁ = ${Math.round(line1.reynolds).toLocaleString('es-CL')} · Re₂ = ${Math.round(line2.reynolds).toLocaleString('es-CL')}`
        : `Re = ${Math.round(line2.reynolds).toLocaleString('es-CL')} (${line2.regime})`,
    },
    {
      stepNumber: 4,
      title: 'Rugosidad relativa (ε/D) y factor de fricción de Darcy (f)',
      formulaLatex: 'f = 0.25 / [log₁₀( (ε/D)/3.7 + 5.74 / Re⁰·⁹ )]²  (Swamee-Jain)',
      calculationText: params.includeSuctionLine
        ? `Succión: ε/D₁ = ${line1.relativeRoughness.toExponential(3)} → f₁ = ${line1.frictionFactor.toFixed(5)} | Descarga: ε/D₂ = ${line2.relativeRoughness.toExponential(3)} → f₂ = ${line2.frictionFactor.toFixed(5)}`
        : `ε/D = ${line2.relativeRoughness.toFixed(5)} → f = ${line2.frictionFactor.toFixed(5)} (${line2.frictionFormula})`,
      resultLabel: params.includeSuctionLine
        ? `f₁ = ${line1.frictionFactor.toFixed(4)} · f₂ = ${line2.frictionFactor.toFixed(4)}`
        : `f = ${line2.frictionFactor.toFixed(5)}`,
    },
    {
      stepNumber: 5,
      title: 'Pérdidas primarias por fricción (Ecuación de Darcy-Weisbach)',
      formulaLatex: 'hf = f · (L / D) · [V² / (2g)]',
      calculationText: params.includeSuctionLine
        ? `hf₁ = ${line1.frictionFactor.toFixed(4)} × (${line1.lengthM.toFixed(1)}/${line1.diameterM.toFixed(3)}) × ${line1.velocityHeadM.toFixed(4)} = ${line1.hfM.toFixed(3)} m | hf₂ = ${line2.frictionFactor.toFixed(4)} × (${line2.lengthM.toFixed(1)}/${line2.diameterM.toFixed(3)}) × ${line2.velocityHeadM.toFixed(4)} = ${line2.hfM.toFixed(3)} m`
        : `hf = ${line2.frictionFactor.toFixed(5)} × (${line2.lengthM.toFixed(1)} / ${line2.diameterM.toFixed(3)}) × ${line2.velocityHeadM.toFixed(5)} = ${line2.hfM.toFixed(5)} m`,
      resultLabel: `hf,total = ${hfTotalM.toFixed(3)} m`,
    },
    {
      stepNumber: 6,
      title: 'Pérdidas secundarias en accesorios y pérdida de carga total (hL)',
      formulaLatex: 'hm = ΣK · [V² / (2g)]   |   hL = hf + hm',
      calculationText: params.includeSuctionLine
        ? `Tramo D₁ (ΣK₁ = ${line1.sumK.toFixed(2)}): hm₁ = ${line1.hmM.toFixed(3)} m | Tramo D₂ (ΣK₂ = ${line2.sumK.toFixed(2)}): hm₂ = ${line2.hmM.toFixed(3)} m → hm,total = ${hmTotalM.toFixed(3)} m`
        : `ΣK = ${line2.sumK.toFixed(2)} (${line2.kBreakdown.map((b) => `${b.name}: ${b.k.toFixed(2)}`).join(' + ')}) → hm = ${line2.hmM.toFixed(5)} m`,
      resultLabel: `hL = ${hLTotalM.toFixed(3)} m`,
    },
    {
      stepNumber: 7,
      title: params.hasPump
        ? 'Ecuación General de la Energía: Altura Dinámica Total (H)'
        : 'Pérdida de presión equivalente (Δp) por carga hidráulica',
      formulaLatex: params.hasPump
        ? 'H = (p₂ − p₁)/(ρg) + (z₂ − z₁) + hL'
        : 'Δp_equiv = ρ · g · hL',
      calculationText: params.hasPump
        ? `H = (${p2HeadM.toFixed(2)} − ${p1HeadM.toFixed(2)}) m + (${params.zTopM.toFixed(1)} − ${params.hDropM.toFixed(1)}) m + ${hLTotalM.toFixed(2)} m = ${pumpHeadM.toFixed(2)} m`
        : `Δp_equiv = ${fluid.rho.toFixed(1)} × ${GRAVITY} × ${hLTotalM.toFixed(5)} = ${(deltaPEquivKpa * 1000).toFixed(1)} Pa = ${deltaPEquivKpa.toFixed(2)} kPa`,
      resultLabel: params.hasPump ? `H = ${pumpHeadM.toFixed(2)} m` : `Δp = ${deltaPEquivKpa.toFixed(2)} kPa`,
    },
    {
      stepNumber: 8,
      title: params.hasPump
        ? 'Potencia Hidráulica, al Eje (Bomba) y Eléctrica (Motor)'
        : 'Potencia hidráulica disipada por pérdidas',
      formulaLatex: params.hasPump
        ? 'Ph = ρ·g·Q·H   |   Peje = Ph / ηbomba   |   Pelec = Peje / ηmotor'
        : 'Ph = ρ · g · Q · hL',
      calculationText: params.hasPump
        ? `Ph = ${hydraulicPowerKw.toFixed(2)} kW | Peje = ${hydraulicPowerKw.toFixed(2)} / ${etaP.toFixed(2)} = ${shaftPowerKw.toFixed(2)} kW (${shaftPowerHp.toFixed(2)} HP) | Pelec = ${shaftPowerKw.toFixed(2)} / ${etaM.toFixed(2)} = ${electricPowerKw.toFixed(2)} kW (${electricPowerHp.toFixed(2)} HP)`
        : `Ph = ${fluid.rho.toFixed(1)} × ${GRAVITY} × ${qM3s.toFixed(4)} × ${hLTotalM.toFixed(5)} = ${hydraulicPowerW.toFixed(1)} W`,
      resultLabel: params.hasPump
        ? `Pelec = ${electricPowerKw.toFixed(2)} kW (${electricPowerHp.toFixed(2)} HP)`
        : `Ph = ${hydraulicPowerW.toFixed(1)} W`,
    },
  ];

  return {
    fluid,
    qM3s,
    qLs: params.flowLs,
    p1Pa,
    p2Pa,
    p2Kpa,
    p2Psi: params.p2Psi,
    p2HeadM,
    p1HeadM,
    deltaPHeadM,
    deltaZM,
    roughnessM,
    roughnessIn,
    kV1,
    kV2,
    kV3,
    kCodos1,
    kCodos2,
    line1,
    line2,
    hfTotalM,
    hmTotalM,
    hLTotalM,
    deltaPEquivKpa,
    pumpHeadM,
    hydraulicPowerW,
    hydraulicPowerKw,
    shaftPowerW,
    shaftPowerKw,
    shaftPowerHp,
    electricPowerW,
    electricPowerKw,
    electricPowerHp,
    cavitationMarginNote,
    cfdColor1,
    cfdColor2,
    steps,
  };
}

export const PIPE_SYSTEM_EXAMPLES: PipeSystemCase[] = [
  {
    id: 'ejemplo-2-infografia-cfd',
    badge: 'Ejemplo 2',
    title: 'Sistema Industrial 3D (Infografía CFD)',
    subtitle: '2 estanques, bomba centrífuga + motor, V1/V2/V3 y cambio D₁=125 → D₂=100 mm',
    sourceLabel: 'Infografía Técnica Industrial · Energía + Darcy-Weisbach',
    description:
      'Red industrial con estanque de suministro abierto, línea de succión D₁ = 125 mm (3 m + 10 m, válvula V1), bomba centrífuga (ηb = 85%) con motor eléctrico (ηm = 94%), y descarga D₂ = 100 mm hacia estanque elevado presurizado a p₂ = 28.4 psi con válvulas V2 (compuerta) y V3 (check K = 7).',
    layoutMode: 'industrial_cfd_3d',
    params: {
      flowLs: 15,
      d1Mm: 125,
      d2Mm: 100,
      l1M: 13,
      l2M: 50,
      zTopM: 24,
      hDropM: 5,
      p1Kpa: 0,
      p2Psi: 28.4,
      roughnessMm: 0.04572,
      v1Opening: '100%',
      v2Opening: '100%',
      kV3Check: 7.0,
      kElbowsTotal: 5.0,
      suctionElbowFraction: 0.4,
      kEntrance: 0.5,
      kExit: 1.0,
      etaPumpPct: 85,
      etaMotorPct: 94,
      waterTempC: 20,
      hasPump: true,
      includeSuctionLine: true,
      isPressurizedTank2: true,
    },
    physicalNote:
      'Al reducirse el diámetro de D₁ = 125 mm a D₂ = 100 mm en la descarga, el caudal constante obliga a que la velocidad aumente en razón (125/100)² = 1.56× y la cabeza de velocidad V²/(2g) crezca 2.44×. Por ello la línea de descarga domina la pérdida de carga y aparece en tonos verdes/amarillos en el mapa CFD.',
    typicalErrors: [
      'Sumar los coeficientes K de succión (D₁) y descarga (D₂) multiplicándolos por una sola velocidad V.',
      'Olvidar convertir p₂ = 28.4 lb/plg² (psi) a Pascales (× 6894.76) antes de dividir por ρ·g.',
      'Usar 24 m como Δz sin restar la caída final de 5 m hacia la superficie del estanque superior (Δz = 19 m).',
      'Multiplicar por ηbomba y ηmotor en lugar de dividir cuando se calcula la potencia eléctrica de entrada.',
    ],
  },
  {
    id: 'ejemplo-3-guia-estudio',
    badge: 'Ejemplo 3',
    title: 'Sistema Didáctico (Guía de Estudio)',
    subtitle: 'Tramo recto D = 100 mm, L = 50 m, Q = 10 L/s, ΣK = 3.5 (hL = 1.099 m)',
    sourceLabel: 'Guía de Estudio · Sección 7 (Resuelto Paso a Paso)',
    description:
      'Caso de validación exacta de la Guía de Estudio: agua a 20 °C circula a Q = 0.010 m³/s por una tubería de acero comercial (ε = 0.045 mm) de D = 100 mm y L = 50 m con entrada de bordes agudos (0.5), 2 codos 90° (1.8), válvula compuerta abierta (0.2) y descarga a tanque (1.0).',
    layoutMode: 'didactic_single_pipe',
    params: {
      flowLs: 10,
      d1Mm: 100,
      d2Mm: 100,
      l1M: 0,
      l2M: 50,
      zTopM: 0,
      hDropM: 0,
      p1Kpa: 0,
      p2Psi: 0,
      roughnessMm: 0.045,
      v1Opening: '100%',
      v2Opening: '100%',
      kV2Override: 0.2,
      kV3Check: 0,
      kElbowsTotal: 1.8,
      suctionElbowFraction: 0,
      kEntrance: 0.5,
      kExit: 1.0,
      etaPumpPct: 100,
      etaMotorPct: 100,
      waterTempC: 20,
      hasPump: false,
      includeSuctionLine: false,
      isPressurizedTank2: false,
    },
    physicalNote:
      'Aunque la tubería mide 50 m, las pérdidas secundarias (hm = 0.289 m) representan el 26.3% de la pérdida total (hL = 1.099 m). En tuberías cortas o con muchos accesorios, ignorar hm subestima severamente la caída de presión.',
    typicalErrors: [
      'Calcular Re con la viscosidad dinámica μ en vez de la cinemática ν (o no convertir mm a metros).',
      'Confundir rugosidad absoluta ε = 0.045 mm con rugosidad relativa ε/D = 0.00045.',
      'Omitir K_salida = 1.0 cuando el fluido descarga sumergido en un estanque grande.',
    ],
  },
];

export const TEXTBOOK_IMPORT_PRESETS: Array<{
  label: string;
  bookRef: string;
  caseData: Omit<PipeSystemCase, 'id' | 'badge'>;
}> = [
  {
    label: 'Çengel Cap. 8 · Bombeo Residencial Larga Distancia',
    bookRef: 'Yunus Çengel · Mecánica de Fluidos',
    caseData: {
      title: 'Bombeo Acero Galvanizado (Çengel)',
      subtitle: 'Q = 20 L/s, D₁ = 150 mm → D₂ = 100 mm, Δz = 32 m, estanque abierto',
      sourceLabel: 'Importado · Estilo Çengel Cap. 8',
      description:
        'Sistema de elevación de agua a 15 °C hacia un estanque abierto elevado a Δz = 32 m mediante tubería de acero galvanizado (ε = 0.15 mm) con 80 m de descarga.',
      layoutMode: 'industrial_cfd_3d',
      params: {
        flowLs: 20,
        d1Mm: 150,
        d2Mm: 100,
        l1M: 8,
        l2M: 80,
        zTopM: 32,
        hDropM: 0,
        p1Kpa: 0,
        p2Psi: 0,
        roughnessMm: 0.15,
        v1Opening: '100%',
        v2Opening: '100%',
        kV3Check: 2.5,
        kElbowsTotal: 4.5,
        suctionElbowFraction: 0.3,
        kEntrance: 0.5,
        kExit: 1.0,
        etaPumpPct: 78,
        etaMotorPct: 92,
        waterTempC: 15,
        hasPump: true,
        includeSuctionLine: true,
        isPressurizedTank2: false,
      },
      physicalNote:
        'Al descargar en un estanque abierto (p₂ = 0), la bomba solo vence la diferencia de cotas (32 m) más las pérdidas de fricción y accesorios.',
      typicalErrors: [
        'Usar ε = 0.045 mm (acero comercial) cuando el enunciado especifica acero galvanizado (0.15 mm).',
      ],
    },
  },
  {
    label: 'Mott Cap. 11 · Bombeo de Alta Presión a Caldera',
    bookRef: 'Robert Mott · Mecánica de Fluidos Aplicada',
    caseData: {
      title: 'Alimentación de Caldera Presurizada (Mott)',
      subtitle: 'Q = 8 L/s, D₁ = 100 mm → D₂ = 75 mm, p₂ = 45 psi, T = 60 °C',
      sourceLabel: 'Importado · Estilo Mott Cap. 11',
      description:
        'Bombeo de agua caliente a 60 °C hacia un recipiente presurizado a 45 psi. La menor viscosidad a 60 °C eleva el Reynolds, mientras la mayor presión de vapor exige vigilar la succión.',
      layoutMode: 'industrial_cfd_3d',
      params: {
        flowLs: 8,
        d1Mm: 100,
        d2Mm: 75,
        l1M: 6,
        l2M: 35,
        zTopM: 14,
        hDropM: 2,
        p1Kpa: 0,
        p2Psi: 45,
        roughnessMm: 0.046,
        v1Opening: '100%',
        v2Opening: '75%',
        kV3Check: 4.0,
        kElbowsTotal: 3.6,
        suctionElbowFraction: 0.25,
        kEntrance: 0.5,
        kExit: 1.0,
        etaPumpPct: 80,
        etaMotorPct: 91,
        waterTempC: 60,
        hasPump: true,
        includeSuctionLine: true,
        isPressurizedTank2: true,
      },
      physicalNote:
        'A 60 °C la presión de vapor del agua sube a 19.94 kPa, reduciendo drásticamente el NPSHa disponible en la entrada de la bomba.',
      typicalErrors: [
        'Evaluar ρ y ν a 20 °C cuando el agua caliente está a 60 °C.',
      ],
    },
  },
];
