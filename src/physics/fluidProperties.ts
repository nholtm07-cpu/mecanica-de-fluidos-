export interface FluidSpec {
  id: string;
  name: string;
  formula?: string;
  rho: number; // kg/m^3 at reference temp
  mu: number; // Pa*s at reference temp
  pv: number; // Pa (vapor pressure)
  sigma: number; // N/m (surface tension with air)
  color: string;
  supportsTemp?: boolean;
}

export interface PipeMaterialSpec {
  id: string;
  name: string;
  roughnessMm: number; // epsilon in mm (from S08 & Certamen 3 tables)
  rangeLabel: string;
  notes: string;
}

export interface FittingSpec {
  id: string;
  name: string;
  category: 'entrada' | 'codo' | 'valvula' | 'te' | 'otro';
  k: number;
  leOverD?: number;
}

export const GRAVITY_STD = 9.81;
export const GRAVITY_VENTURI_USM = 9.79;

// Water properties vs Temperature (5°C - 90°C) from Çengel / USM tables
export function getWaterPropertiesAtTemp(tempC: number): {
  rho: number;
  mu: number;
  nu: number;
  pv: number;
  sigma: number;
} {
  const T = Math.max(0, Math.min(95, tempC));
  // Smooth polynomial/empirical fits matching standard water tables
  // Density peaks near 4°C (1000 kg/m3), drops to ~965 at 90°C
  const rho =
    1000.0 * (1 - ((T - 4) * (T - 4)) / 220000 - (T > 20 ? (T - 20) * 0.00018 : 0));
  // Vogel equation for dynamic viscosity of liquid water (Pa*s)
  const mu = 2.414e-5 * Math.pow(10, 247.8 / (T + 273.15 - 140));
  // Antoine equation for water vapor pressure (Pa)
  const pvMmHg = Math.pow(10, 8.07131 - 1730.63 / (233.426 + T));
  const pv = pvMmHg * 133.322;
  // Surface tension (N/m)
  const sigma = 0.0756 - 0.000145 * T;
  return {
    rho: Number(rho.toFixed(2)),
    mu: Number(mu.toExponential(4)),
    nu: Number((mu / rho).toExponential(4)),
    pv: Math.round(pv),
    sigma: Number(sigma.toFixed(4)),
  };
}

export const FLUID_CATALOG: FluidSpec[] = [
  {
    id: 'agua',
    name: 'Agua',
    formula: 'H₂O',
    rho: 1000,
    mu: 0.001,
    pv: 2340,
    sigma: 0.073,
    color: '#38BDF8',
    supportsTemp: true,
  },
  {
    id: 'aceite_sae30',
    name: 'Aceite SAE 30 (20°C)',
    rho: 891,
    mu: 0.29,
    pv: 10,
    sigma: 0.032,
    color: '#F59E0B',
  },
  {
    id: 'aceite_ligero',
    name: 'Aceite Hidráulico (SG=0.85)',
    rho: 850,
    mu: 0.035,
    pv: 50,
    sigma: 0.03,
    color: '#FBBF24',
  },
  {
    id: 'glicerina',
    name: 'Glicerina (20°C)',
    rho: 1260,
    mu: 1.49,
    pv: 0.01,
    sigma: 0.063,
    color: '#A78BFA',
  },
  {
    id: 'gasolina',
    name: 'Gasolina (SG=0.70)',
    rho: 700,
    mu: 0.00031,
    pv: 55000,
    sigma: 0.022,
    color: '#FB923C',
  },
  {
    id: 'benceno',
    name: 'Benceno (20°C)',
    rho: 881,
    mu: 0.000608,
    pv: 10000,
    sigma: 0.029,
    color: '#F472B6',
  },
  {
    id: 'queroseno',
    name: 'Queroseno (20°C)',
    rho: 804,
    mu: 0.00192,
    pv: 2000,
    sigma: 0.028,
    color: '#34D399',
  },
  {
    id: 'mercurio',
    name: 'Mercurio (Hg)',
    formula: 'Hg',
    rho: 13600,
    mu: 0.00153,
    pv: 0.17,
    sigma: 0.514,
    color: '#94A3B8',
  },
];

// Pipe roughness table matching Certamen 3 Fig. 5 & Sesión 08 Slide 30
export const PIPE_MATERIALS: PipeMaterialSpec[] = [
  {
    id: 'pvc_cobre',
    name: 'Cobre, Latón o PVC (Liso comercial)',
    roughnessMm: 0.0015,
    rangeLabel: '0.0015 mm',
    notes: 'Tuberías hidráulicamente lisas',
  },
  {
    id: 'acero_estirado',
    name: 'Tubos estirados de acero',
    roughnessMm: 0.0024,
    rangeLabel: '0.0024 mm',
    notes: 'Tubería de instrumentación o precisión',
  },
  {
    id: 'acero_comercial',
    name: 'Acero comercial o Hierro forjado',
    roughnessMm: 0.046,
    rangeLabel: '0.03 - 0.09 mm (nom. 0.046 mm)',
    notes: 'Estándar Certamen 3 / Tabla Crane',
  },
  {
    id: 'fundicion_asfaltada',
    name: 'Hierro fundido asfaltado',
    roughnessMm: 0.12,
    rangeLabel: '0.06 - 0.18 mm (nom. 0.12 mm)',
    notes: 'Recubrimiento bituminoso interno',
  },
  {
    id: 'hierro_galvanizado',
    name: 'Hierro o Acero galvanizado',
    roughnessMm: 0.15,
    rangeLabel: '0.06 - 0.24 mm (nom. 0.15 mm)',
    notes: 'Redes sanitarias e industriales',
  },
  {
    id: 'hierro_fundido',
    name: 'Hierro fundido (Cast iron)',
    roughnessMm: 0.26,
    rangeLabel: '0.12 - 0.60 mm (nom. 0.26 mm)',
    notes: 'Redes de distribución antiguas',
  },
  {
    id: 'hormigon',
    name: 'Hormigón (Concreto)',
    roughnessMm: 1.0,
    rangeLabel: '0.3 - 3.0 mm (nom. 1.0 mm)',
    notes: 'Colectores y conducciones civiles',
  },
  {
    id: 'acero_roblonado',
    name: 'Acero roblonado (Riveted steel)',
    roughnessMm: 3.0,
    rangeLabel: '0.9 - 9.0 mm (nom. 3.0 mm)',
    notes: 'Alta rugosidad relativa',
  },
];

// Minor loss coefficients K from Certamen 3 Fig. 6, 7, 8 & Sesión 08 Slides 42-46
export const FITTINGS_CATALOG: FittingSpec[] = [
  { id: 'entrada_viva', name: 'Entrada borde vivo (Square-edged)', category: 'entrada', k: 0.5 },
  { id: 'entrada_reentrante', name: 'Entrada reentrante (Reentrant)', category: 'entrada', k: 0.8 },
  { id: 'entrada_redondeada', name: 'Entrada bien redondeada (r/D ≥ 0.15)', category: 'entrada', k: 0.04 },
  { id: 'codo90_bridado_reg', name: 'Codo 90° bridado regular', category: 'codo', k: 0.3, leOverD: 30 },
  { id: 'codo90_bridado_largo', name: 'Codo 90° bridado radio largo', category: 'codo', k: 0.2 },
  { id: 'codo90_roscado_reg', name: 'Codo 90° roscado regular', category: 'codo', k: 1.5, leOverD: 30 },
  { id: 'codo90_roscado_largo', name: 'Codo 90° roscado radio largo', category: 'codo', k: 0.7 },
  { id: 'codo90_inglete', name: 'Codo 90° en inglete (Miter)', category: 'codo', k: 1.3 },
  { id: 'codo45_roscado', name: 'Codo 45° roscado regular', category: 'codo', k: 0.4, leOverD: 16 },
  { id: 'codo45_bridado', name: 'Codo 45° bridado radio largo', category: 'codo', k: 0.2 },
  { id: 'valv_compuerta_100', name: 'Válvula compuerta (100% abierta)', category: 'valvula', k: 0.2, leOverD: 8 },
  { id: 'valv_compuerta_75', name: 'Válvula compuerta (75% abierta)', category: 'valvula', k: 1.1 },
  { id: 'valv_compuerta_50', name: 'Válvula compuerta (50% abierta)', category: 'valvula', k: 3.6 },
  { id: 'valv_compuerta_25', name: 'Válvula compuerta (25% abierta)', category: 'valvula', k: 28.8 },
  { id: 'valv_globo_100', name: 'Válvula de globo (100% abierta)', category: 'valvula', k: 10.0, leOverD: 340 },
  { id: 'valv_angulo_100', name: 'Válvula de ángulo (100% abierta)', category: 'valvula', k: 5.0, leOverD: 150 },
  { id: 'valv_bola_100', name: 'Válvula de bola (100% abierta)', category: 'valvula', k: 0.5, leOverD: 3 },
  { id: 'valv_bola_67', name: 'Válvula de bola (1/3 cerrada)', category: 'valvula', k: 5.5 },
  { id: 'valv_bola_33', name: 'Válvula de bola (2/3 cerrada)', category: 'valvula', k: 200.0 },
  { id: 'te_directa_roscada', name: 'Te flujo directo (roscada)', category: 'te', k: 0.9, leOverD: 20 },
  { id: 'te_directa_bridada', name: 'Te flujo directo (bridada)', category: 'te', k: 0.2 },
  { id: 'te_ramal_roscada', name: 'Te ramificación (roscada)', category: 'te', k: 2.0, leOverD: 60 },
  { id: 'te_ramal_bridada', name: 'Te ramificación (bridada)', category: 'te', k: 1.0 },
  { id: 'medidor_agua', name: 'Medidor de caudal (Water meter)', category: 'otro', k: 7.0 },
  { id: 'salida_tanque', name: 'Salida sumergida a estanque', category: 'otro', k: 1.0 },
];

export type FlowRegime = 'Laminar' | 'Transición' | 'Turbulento';

export function classifyReynolds(Re: number): FlowRegime {
  if (Re < 2300) return 'Laminar';
  if (Re <= 4000) return 'Transición';
  return 'Turbulento';
}

/**
 * Computes Darcy friction factor f via:
 * - Laminar: f = 64 / Re
 * - Turbulent: Colebrook-White solved via Haaland seed + 6 Newton/fixed-point iterations
 *   (matches Moody diagram within < 0.05%)
 */
export function solveFrictionFactor(Re: number, relRoughness: number): {
  f: number;
  regime: FlowRegime;
  correlation: string;
} {
  if (Re <= 0) {
    return { f: 0, regime: 'Laminar', correlation: 'Flujo nulo' };
  }
  if (Re < 2300) {
    return {
      f: 64 / Re,
      regime: 'Laminar',
      correlation: 'Hagen-Poiseuille (f = 64 / Re)',
    };
  }

  const epsD = Math.max(0, relRoughness);
  // Haaland explicit initial guess
  const term = Math.pow(epsD / 3.7, 1.11) + 6.9 / Re;
  let invSqrtF = -1.8 * Math.log10(term);
  let f = 1 / (invSqrtF * invSqrtF);

  // Fixed-point refinement on Colebrook-White: 1/sqrt(f) = -2 log10( (e/D)/3.7 + 2.51/(Re*sqrt(f)) )
  for (let i = 0; i < 8; i++) {
    const inside = epsD / 3.7 + 2.51 / (Re * Math.sqrt(f));
    invSqrtF = -2 * Math.log10(inside);
    f = 1 / (invSqrtF * invSqrtF);
  }

  const reRough = Re * epsD;
  let correlation = 'Colebrook-White (Transición Moody)';
  if (reRough < 65) {
    correlation = 'Colebrook-White / Tubería Lisa';
  } else if (reRough > 1300) {
    correlation = 'Colebrook-White / Zona Completamente Rugosa';
  }

  return {
    f,
    regime: classifyReynolds(Re),
    correlation,
  };
}

/**
 * Sudden expansion minor loss coefficient (Borda-Carnot) referred to upstream velocity V1
 * K_e = (1 - A1/A2)^2 = (1 - (D1/D2)^2)^2
 */
export function calcSuddenExpansionKe(d1: number, d2: number): number {
  if (d2 <= d1 || d2 <= 0) return 0;
  const ar = (d1 * d1) / (d2 * d2);
  return Math.pow(1 - ar, 2);
}

/**
 * Sudden contraction minor loss coefficient referred to downstream velocity V2
 * Matches Fig. 7 in Certamen 3 & Sesión 08 Slide 42:
 * K_c ≈ 0.5 * (1 - A2/A1) curve (at AR=0 -> 0.5, at AR=1 -> 0) / 0.42*(1 - (D2/D1)^2)
 */
export function calcSuddenContractionKc(d1: number, d2: number): number {
  if (d2 >= d1 || d1 <= 0) return 0;
  const ar = (d2 * d2) / (d1 * d1); // A2 / A1
  // Smooth fit to Moody/Crane contraction curve (Fig. 7 Certamen 3: AR=0 -> 0.5, AR=0.58 -> ~0.27)
  return 0.5 * (1 - ar);
}

export interface PipeSystemParams {
  fluidId: string;
  tempC: number;
  materialId: string;
  diameter1Mm: number;
  diameter2Mm: number;
  length1M: number;
  length2M: number;
  z1M: number;
  z2M: number;
  flowRateLs: number;
  pumpHeadM: number;
  pumpEfficiency: number;
  fittings: { id: string; count: number }[];
}

export interface PipeSystemResult {
  rho: number;
  mu: number;
  nu: number;
  roughnessMm: number;
  qM3s: number;
  v1: number;
  v2: number;
  re1: number;
  re2: number;
  regime1: FlowRegime;
  regime2: FlowRegime;
  f1: number;
  f2: number;
  hf1: number;
  hf2: number;
  kSumMinor1: number;
  kTransition: number;
  hlMinor: number;
  totalHeadLossM: number;
  requiredPumpHeadM: number;
  netHeadBalanceM: number;
  hydraulicPowerW: number;
  shaftPowerW: number;
  entranceLength1M: number;
  elProfile: { x: number; el: number; hgl: number; label: string }[];
}

export function solveSandboxPipeSystem(params: PipeSystemParams): PipeSystemResult {
  const fluidBase = FLUID_CATALOG.find((f) => f.id === params.fluidId) ?? FLUID_CATALOG[0];
  const material = PIPE_MATERIALS.find((m) => m.id === params.materialId) ?? PIPE_MATERIALS[2];

  const waterProps = fluidBase.supportsTemp ? getWaterPropertiesAtTemp(params.tempC) : null;
  const rho = waterProps ? waterProps.rho : fluidBase.rho;
  const mu = waterProps ? waterProps.mu : fluidBase.mu;
  const nu = mu / rho;

  const d1 = Math.max(0.005, params.diameter1Mm / 1000);
  const d2 = Math.max(0.005, params.diameter2Mm / 1000);
  const qM3s = Math.max(0.00001, params.flowRateLs / 1000);

  const a1 = (Math.PI * d1 * d1) / 4;
  const a2 = (Math.PI * d2 * d2) / 4;
  const v1 = qM3s / a1;
  const v2 = qM3s / a2;

  const re1 = (rho * v1 * d1) / mu;
  const re2 = (rho * v2 * d2) / mu;

  const epsM = material.roughnessMm / 1000;
  const sol1 = solveFrictionFactor(re1, epsM / d1);
  const sol2 = solveFrictionFactor(re2, epsM / d2);

  const g = GRAVITY_STD;
  const hf1 = sol1.f * (params.length1M / d1) * ((v1 * v1) / (2 * g));
  const hf2 = sol2.f * (params.length2M / d2) * ((v2 * v2) / (2 * g));

  let kSumMinor1 = 0;
  for (const item of params.fittings) {
    const spec = FITTINGS_CATALOG.find((f) => f.id === item.id);
    if (spec && item.count > 0) {
      kSumMinor1 += spec.k * item.count;
    }
  }

  let kTransition = 0;
  let hlTransition = 0;
  if (d2 > d1 + 1e-6) {
    kTransition = calcSuddenExpansionKe(d1, d2);
    hlTransition = kTransition * ((v1 * v1) / (2 * g));
  } else if (d2 < d1 - 1e-6) {
    kTransition = calcSuddenContractionKc(d1, d2);
    hlTransition = kTransition * ((v2 * v2) / (2 * g));
  }

  const hlMinor = kSumMinor1 * ((v1 * v1) / (2 * g)) + hlTransition;
  const totalHeadLossM = hf1 + hf2 + hlMinor;

  const v2Head = (v2 * v2) / (2 * g);
  const requiredPumpHeadM = params.z2M - params.z1M + v2Head + totalHeadLossM;
  const netHeadBalanceM = params.pumpHeadM - requiredPumpHeadM;

  const hydraulicPowerW = rho * g * qM3s * params.pumpHeadM;
  const eta = Math.max(0.05, Math.min(0.99, params.pumpEfficiency));
  const shaftPowerW = hydraulicPowerW / eta;

  const entranceLength1M =
    re1 < 2300 ? 0.06 * re1 * d1 : 0.6 * Math.pow(re1, 0.25) * d1;

  // Build Energy Line (EL) and Hydraulic Grade Line (HGL) profile along x
  const totalL = Math.max(1, params.length1M + params.length2M);
  const pPumpX = params.length1M * 0.25;
  const pTransX = params.length1M;
  const pEndX = totalL;

  const v1Head = (v1 * v1) / (2 * g);
  const elStart = params.z1M; // Reservoir surface
  const hlSuction = hf1 * 0.25 + kSumMinor1 * 0.35 * ((v1 * v1) / (2 * g));
  const elBeforePump = elStart - hlSuction;
  const elAfterPump = elBeforePump + params.pumpHeadM;
  const hlMid = hf1 * 0.75 + kSumMinor1 * 0.65 * ((v1 * v1) / (2 * g));
  const elBeforeTrans = elAfterPump - hlMid;
  const elAfterTrans = elBeforeTrans - hlTransition;
  const elEnd = elAfterTrans - hf2;

  const elProfile = [
    { x: 0, el: elStart, hgl: elStart, label: 'Estanque 1' },
    { x: Number(pPumpX.toFixed(2)), el: elBeforePump, hgl: elBeforePump - v1Head, label: 'Succión Bomba' },
    { x: Number(pPumpX.toFixed(2)), el: elAfterPump, hgl: elAfterPump - v1Head, label: 'Descarga Bomba' },
    { x: Number(pTransX.toFixed(2)), el: elBeforeTrans, hgl: elBeforeTrans - v1Head, label: 'Antes Transición' },
    { x: Number(pTransX.toFixed(2)), el: elAfterTrans, hgl: elAfterTrans - v2Head, label: 'Después Transición' },
    { x: Number(pEndX.toFixed(2)), el: elEnd, hgl: elEnd - v2Head, label: 'Descarga Final' },
  ];

  return {
    rho,
    mu,
    nu,
    roughnessMm: material.roughnessMm,
    qM3s,
    v1,
    v2,
    re1,
    re2,
    regime1: sol1.regime,
    regime2: sol2.regime,
    f1: sol1.f,
    f2: sol2.f,
    hf1,
    hf2,
    kSumMinor1,
    kTransition,
    hlMinor,
    totalHeadLossM,
    requiredPumpHeadM,
    netHeadBalanceM,
    hydraulicPowerW,
    shaftPowerW,
    entranceLength1M,
    elProfile,
  };
}
