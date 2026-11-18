import {
  GRAVITY_STD,
  GRAVITY_VENTURI_USM,
  calcSuddenContractionKc,
  calcSuddenExpansionKe,
  getWaterPropertiesAtTemp,
  solveFrictionFactor,
} from './fluidProperties';

export interface ProfessorBoardData {
  step1Title: string;
  step1Body: string[];
  step2Title: string;
  step2Equations: string[];
  step3Title: string;
  step3Substitutions: string[];
  step4ResultLabel: string;
  step4ResultValue: string;
  step4SecondaryResults?: { label: string; value: string }[];
  step4Interpretation: string;
}

// ============================================================================
// CASO 1A: MANÓMETRO MULTIFLUIDO (EJERCICIOS 3-17 Y P2.31)
// ============================================================================
export type ManometerPreset = 'ej_3_17' | 'ej_p2_31';

export interface Manometer317Params {
  preset: 'ej_3_17';
  h1M: number; // Agua (default 0.4 m)
  h2M: number; // Aceite (default 0.6 m)
  h3M: number; // Mercurio (default 0.8 m)
  rhoWater: number; // 1000 kg/m3
  rhoOil: number; // 850 kg/m3
  rhoHg: number; // 13600 kg/m3
  patmKpa: number; // 101.325 kPa
}

export interface ManometerP231Params {
  preset: 'ej_p2_31';
  hBenzeneM: number; // 0.20 m (gamma = 8640 N/m3)
  hHgM: number; // 0.08 m (gamma = 133100 N/m3)
  hKeroseneM: number; // 0.32 m (40 cm - 8 cm, gamma = 7885 N/m3)
  hWaterM: number; // 0.26 m (40 cm - 14 cm, gamma = 9790 N/m3)
  hAirM: number; // 0.09 m (14 cm - 5 cm -> 9 cm, gamma = 12 N/m3)
}

export type ManometerParams = Manometer317Params | ManometerP231Params;

export interface ManometerResult {
  deltaPKpa: number;
  deltaPPa: number;
  pAbsKpa?: number;
  board: ProfessorBoardData;
}

export function solveManometer(params: ManometerParams): ManometerResult {
  const g = GRAVITY_STD;
  if (params.preset === 'ej_3_17') {
    // P1 + rho_agua*g*h1 - rho_aceite*g*h2 - rho_Hg*g*h3 = Patm
    // => P1_man = P1 - Patm = rho_Hg*g*h3 + rho_aceite*g*h2 - rho_agua*g*h1
    const termWater = params.rhoWater * g * params.h1M;
    const termOil = params.rhoOil * g * params.h2M;
    const termHg = params.rhoHg * g * params.h3M;
    const pGaugePa = termHg + termOil - termWater;
    const pGaugeKpa = pGaugePa / 1000;
    const pAbsKpa = params.patmKpa + pGaugeKpa;

    return {
      deltaPPa: pGaugePa,
      deltaPKpa: pGaugeKpa,
      pAbsKpa,
      board: {
        step1Title: 'Planteamiento y supuestos físicos (Problema 3-17 Çengel)',
        step1Body: [
          'Fluidos incompresibles en reposo absoluto (sin esfuerzos de corte, variación hidrostática lineal p = p₀ + ρ·g·h).',
          'Se desprecia el peso de la columna de aire dentro del estanque debido a su baja densidad frente a líquidos y mercurio.',
          'Regla del recorrido manométrico: al descender en un mismo fluido continuo se suma +ρ·g·h; al ascender se resta −ρ·g·h.',
        ],
        step2Title: 'Ecuación simbólica del recorrido (desde 1 hasta atmósfera 2)',
        step2Equations: [
          'P₁ + ρ_agua·g·h₁ − ρ_aceite·g·h₂ − ρ_Hg·g·h₃ = P_atm',
          'P₁,man = P₁ − P_atm = g · (ρ_Hg·h₃ + ρ_aceite·h₂ − ρ_agua·h₁)',
        ],
        step3Title: 'Reemplazo numérico en Sistema Internacional (SI)',
        step3Substitutions: [
          `ρ_agua·g·h₁ = (${params.rhoWater})·(${g})·(${params.h1M.toFixed(2)}) = ${termWater.toFixed(1)} Pa`,
          `ρ_aceite·g·h₂ = (${params.rhoOil})·(${g})·(${params.h2M.toFixed(2)}) = ${termOil.toFixed(1)} Pa`,
          `ρ_Hg·g·h₃ = (${params.rhoHg})·(${g})·(${params.h3M.toFixed(2)}) = ${termHg.toFixed(1)} Pa`,
          `P₁,man = ${termHg.toFixed(1)} + ${termOil.toFixed(1)} − ${termWater.toFixed(1)} = ${pGaugePa.toFixed(1)} Pa`,
        ],
        step4ResultLabel: 'Presión manométrica del aire en el tanque',
        step4ResultValue: `${pGaugeKpa.toFixed(2)} kPa`,
        step4SecondaryResults: [
          { label: 'Presión absoluta (P_abs)', value: `${pAbsKpa.toFixed(2)} kPa` },
          { label: 'Presión en Pa', value: `${Math.round(pGaugePa).toLocaleString('es-CL')} Pa` },
        ],
        step4Interpretation:
          pGaugeKpa >= 0
            ? `El aire en el tanque está presurizado ${pGaugeKpa.toFixed(2)} kPa sobre la atmósfera. La columna de mercurio (SG = 13.6) domina el balance: cada 10 cm adicionales de h₃ aportan 13.34 kPa.`
            : `La presión manométrica es negativa (${pGaugeKpa.toFixed(2)} kPa): el tanque está en vacío relativo porque la columna de agua descendente supera a las columnas ascendentes.`,
      },
    };
  }

  // Preset P2.31 (Pauta Certamen 1): pA + gB*hB - gHg*hHg - gK*hK + gW*hW - gAir*hAir = pB
  const gBenz = 8640;
  const gHg = 133100;
  const gKer = 7885;
  const gWat = 9790;
  const gAir = 12;

  const tBenz = gBenz * params.hBenzeneM;
  const tHg = gHg * params.hHgM;
  const tKer = gKer * params.hKeroseneM;
  const tWat = gWat * params.hWaterM;
  const tAir = gAir * params.hAirM;

  // pA - pB = -tBenz + tHg + tKer - tWat + tAir
  const pAMinusPB = -tBenz + tHg + tKer - tWat + tAir;

  return {
    deltaPPa: pAMinusPB,
    deltaPKpa: pAMinusPB / 1000,
    board: {
      step1Title: 'Planteamiento y supuestos (Problema P2.31 — Pauta Certamen 1)',
      step1Body: [
        'Sistema multifluido en U doble con 5 fluidos a 20°C: Benceno, Mercurio, Queroseno, Agua y Aire.',
        'Pesos específicos γ = ρ·g tabulados a 20°C: Benceno 8640 N/m³, Mercurio 133100 N/m³, Queroseno 7885 N/m³, Agua 9790 N/m³, Aire 12 N/m³.',
        'Se avanza continuamente desde el centro de la tubería A hasta el centro de la tubería B sumando al bajar y restando al subir.',
      ],
      step2Title: 'Ecuación simbólica de A hacia B',
      step2Equations: [
        'p_A + γ_benc·h_benc − γ_Hg·h_Hg − γ_ker·h_ker + γ_agua·h_agua − γ_aire·h_aire = p_B',
        'p_A − p_B = −γ_benc·h_benc + γ_Hg·h_Hg + γ_ker·h_ker − γ_agua·h_agua + γ_aire·h_aire',
      ],
      step3Title: 'Reemplazo numérico exacto (SI)',
      step3Substitutions: [
        `+γ_benc·h_benc = (8640)·(${params.hBenzeneM.toFixed(2)}) = +${tBenz.toFixed(1)} Pa`,
        `−γ_Hg·h_Hg = −(133100)·(${params.hHgM.toFixed(2)}) = −${tHg.toFixed(1)} Pa`,
        `−γ_ker·h_ker = −(7885)·(${params.hKeroseneM.toFixed(2)}) = −${tKer.toFixed(1)} Pa`,
        `+γ_agua·h_agua = +(9790)·(${params.hWaterM.toFixed(2)}) = +${tWat.toFixed(1)} Pa`,
        `−γ_aire·h_aire = −(12)·(${params.hAirM.toFixed(2)}) = −${tAir.toFixed(2)} Pa`,
      ],
      step4ResultLabel: 'Diferencia de presión Δp = p_A − p_B',
      step4ResultValue: `${Math.round(pAMinusPB).toLocaleString('es-CL')} Pa (${(pAMinusPB / 1000).toFixed(2)} kPa)`,
      step4Interpretation: `Con los valores nominales de la pauta (0.20, 0.08, 0.32, 0.26 y 0.09 m) se obtiene Δp ≈ 8900 Pa. Nota cómo la columna de aire aporta apenas ${tAir.toFixed(1)} Pa (0.01%), confirmando por qué suele despreciarse en gases a baja presión.`,
    },
  };
}

// ============================================================================
// CASO 1B: CILINDRO-ÉMBOLO CON RESORTE Y CÁMARAS DE AIRE (3-24, 3-30, 3-54)
// ============================================================================
export interface PistonSpringParams {
  preset: 'ej_3_30' | 'ej_3_54';
  patmKpa: number; // 95 kPa (3-30) or 101.3 kPa (3-54)
  pistonMassKg: number; // 4 kg (3-30) or 2.548 kg = 25 N (3-54)
  areaCm2: number; // 35 cm2 (3-30)
  springForceN: number; // 60 N (3-30)
  // For 3-54 dual air chambers
  pistonDiameterM: number; // 0.30 m
  hCE_M: number; // 0.25 m
  hCD_M: number; // 0.25 m
}

export interface PistonSpringResult {
  pCylinderKpa: number;
  pAirAKpa: number;
  pAirBKpa: number;
  board: ProfessorBoardData;
}

export function solvePistonSpring(params: PistonSpringParams): PistonSpringResult {
  const g = GRAVITY_STD;
  if (params.preset === 'ej_3_30') {
    const areaM2 = params.areaCm2 / 10000;
    const weightN = params.pistonMassKg * g;
    const pGasPa = params.patmKpa * 1000 + (weightN + params.springForceN) / areaM2;
    const pGasKpa = pGasPa / 1000;

    return {
      pCylinderKpa: pGasKpa,
      pAirAKpa: 0,
      pAirBKpa: 0,
      board: {
        step1Title: 'Planteamiento y Diagrama de Cuerpo Libre (Problema 3-30 / 3-24)',
        step1Body: [
          'El émbolo se encuentra en equilibrio mecánico vertical (ΣF_y = 0) y sin fricción contra las paredes del cilindro.',
          'Fuerzas hacia abajo: presión atmosférica (P_atm·A), peso del pistón (m_p·g) y fuerza del resorte comprimido (F_res).',
          'Fuerza hacia arriba: presión absoluta del gas confinado multiplicada por el área transversal del émbolo (P_gas·A).',
        ],
        step2Title: 'Ecuación de equilibrio estático',
        step2Equations: [
          'P_gas · A = P_atm · A + m_p · g + F_res',
          'P_gas = P_atm + (m_p · g + F_res) / A',
        ],
        step3Title: 'Reemplazo numérico en SI (convertido a m² y Pa)',
        step3Substitutions: [
          `A = ${params.areaCm2.toFixed(1)} cm² × (1 m² / 10⁴ cm²) = ${areaM2.toFixed(5)} m²`,
          `W_p = m_p·g = (${params.pistonMassKg.toFixed(1)} kg)·(${g} m/s²) = ${weightN.toFixed(2)} N`,
          `ΔP_mec = (${weightN.toFixed(2)} + ${params.springForceN.toFixed(1)}) / ${areaM2.toFixed(5)} = ${((weightN + params.springForceN) / areaM2 / 1000).toFixed(2)} kPa`,
          `P_gas = ${params.patmKpa.toFixed(1)} kPa + ${((weightN + params.springForceN) / areaM2 / 1000).toFixed(2)} kPa = ${pGasKpa.toFixed(2)} kPa`,
        ],
        step4ResultLabel: 'Presión absoluta del gas dentro del cilindro',
        step4ResultValue: `${pGasKpa.toFixed(2)} kPa`,
        step4SecondaryResults: [
          { label: 'Presión manométrica (P_gas − P_atm)', value: `${(pGasKpa - params.patmKpa).toFixed(2)} kPa` },
        ],
        step4Interpretation:
          'Si transfieres calor al gas manteniendo el pistón libre (sin topes ni cambio en F_res, como en el Problema 3-24), al duplicarse el volumen la presión NO cambia si no hay resorte; pero con un resorte lineal (F_res = k·x), al subir el pistón se comprime más el resorte y la presión aumenta linealmente.',
      },
    };
  }

  // Preset 3-54: Two chambers A and B separated by a piston at C
  const rho = 1000;
  const area = (Math.PI * params.pistonDiameterM * params.pistonDiameterM) / 4;
  const wPiston = params.pistonMassKg * g;
  const pCGaugePa = wPiston / area;
  const pAirAGaugePa = pCGaugePa + rho * g * params.hCE_M;
  const pAirBGaugePa = pCGaugePa - rho * g * params.hCD_M;

  return {
    pCylinderKpa: pCGaugePa / 1000,
    pAirAKpa: pAirAGaugePa / 1000,
    pAirBKpa: pAirBGaugePa / 1000,
    board: {
      step1Title: 'Planteamiento: Cámaras de Aire A y B con Pistón C (Problema 3-54 Pauta)',
      step1Body: [
        'Agua incompresible (ρ = 1000 kg/m³) en la base comunica hidrostáticamente la cara inferior C del pistón con las interfaces E (cámara A) y D (cámara B).',
        'La variación de presión dentro de cada cámara de aire se desprecia por la baja densidad del aire.',
        'Equilibrio en el pistón C: sobre la cara superior actúa P_atm y el peso W_p; debajo actúa la presión del agua P_C.',
      ],
      step2Title: 'Ecuaciones simbólicas (presiones manométricas)',
      step2Equations: [
        'P_C,man = W_pistón / A_pistón',
        'P_aire A,man = P_C,man + ρ·g·CE',
        'P_aire B,man = P_C,man − ρ·g·CD',
      ],
      step3Title: 'Reemplazo numérico en SI',
      step3Substitutions: [
        `A_pistón = π·(${params.pistonDiameterM.toFixed(2)})² / 4 = ${area.toFixed(5)} m²`,
        `W_pistón = ${wPiston.toFixed(2)} N ⇒ P_C,man = ${pCGaugePa.toFixed(1)} Pa`,
        `P_aire A,man = ${pCGaugePa.toFixed(1)} + (1000)·(${g})·(${params.hCE_M.toFixed(2)}) = ${pAirAGaugePa.toFixed(1)} Pa`,
        `P_aire B,man = ${pCGaugePa.toFixed(1)} − (1000)·(${g})·(${params.hCD_M.toFixed(2)}) = ${pAirBGaugePa.toFixed(1)} Pa`,
      ],
      step4ResultLabel: 'Presión manométrica en cámara A / cámara B',
      step4ResultValue: `A: ${(pAirAGaugePa / 1000).toFixed(2)} kPa | B: ${(pAirBGaugePa / 1000).toFixed(2)} kPa`,
      step4Interpretation:
        pAirBGaugePa < 0
          ? 'Nota que en la cámara B existe un vacío relativo (~ −2.10 kPa en el caso nominal), lo que succiona la columna de agua hacia arriba por encima del nivel del pistón C.'
          : 'Ambas cámaras están sobrepresión porque el peso del pistón supera la carga hidrostática de la columna CD.',
    },
  };
}

// ============================================================================
// CASO 1C: PRENSA HIDRÁULICA DE PASCAL
// ============================================================================
export interface PascalPressParams {
  d1Mm: number;
  d2Mm: number;
  f1N: number;
  leverRatio: number; // Mechanical lever multiplier
  stroke1Mm: number;
}

export interface PascalPressResult {
  pSystemKpa: number;
  f2N: number;
  maxMassKg: number;
  stroke2Mm: number;
  totalMechanicalAdvantage: number;
  board: ProfessorBoardData;
}

export function solvePascalPress(params: PascalPressParams): PascalPressResult {
  const d1 = params.d1Mm / 1000;
  const d2 = params.d2Mm / 1000;
  const a1 = (Math.PI * d1 * d1) / 4;
  const a2 = (Math.PI * d2 * d2) / 4;
  const fPiston1 = params.f1N * params.leverRatio;
  const pPa = fPiston1 / a1;
  const f2N = pPa * a2;
  const areaRatio = Math.pow(d2 / d1, 2);
  const stroke2Mm = params.stroke1Mm / areaRatio;
  const totalMA = params.leverRatio * areaRatio;

  return {
    pSystemKpa: pPa / 1000,
    f2N,
    maxMassKg: f2N / GRAVITY_STD,
    stroke2Mm,
    totalMechanicalAdvantage: totalMA,
    board: {
      step1Title: 'Planteamiento: Principio de Pascal y Conservación de Volumen',
      step1Body: [
        'Un fluido hidráulico incompresible confinado transmite íntegramente el incremento de presión a ambos émbolos ubicados a la misma cota.',
        'La energía se conserva (trabajo entrada ≈ trabajo salida): multiplicar la fuerza por (D₂/D₁)² reduce el desplazamiento en la misma proporción.',
      ],
      step2Title: 'Ecuaciones simbólicas',
      step2Equations: [
        'p = (F_mano · R_palanca) / A₁ = F₂ / A₂',
        'F₂ = F_mano · R_palanca · (D₂ / D₁)²',
        'L₂ = L₁ · (D₁ / D₂)²',
      ],
      step3Title: 'Reemplazo numérico en SI',
      step3Substitutions: [
        `A₁ = π·(${d1.toFixed(3)})²/4 = ${a1.toExponential(3)} m² ; A₂ = ${a2.toExponential(3)} m²`,
        `F_émbolo1 = ${params.f1N.toFixed(1)} N × ${params.leverRatio.toFixed(1)} = ${fPiston1.toFixed(1)} N`,
        `p = ${fPiston1.toFixed(1)} / ${a1.toExponential(3)} = ${(pPa / 1000).toFixed(2)} kPa`,
        `F₂ = ${fPiston1.toFixed(1)} · (${params.d2Mm}/${params.d1Mm})² = ${f2N.toFixed(1)} N (${(f2N / GRAVITY_STD).toFixed(1)} kg)`,
      ],
      step4ResultLabel: 'Fuerza de salida F₂ (Capacidad de carga)',
      step4ResultValue: `${f2N.toFixed(1)} N (${(f2N / GRAVITY_STD).toFixed(1)} kgf)`,
      step4SecondaryResults: [
        { label: 'Ventaja mecánica total', value: `${totalMA.toFixed(1)}×` },
        { label: 'Carrera de salida L₂', value: `${stroke2Mm.toFixed(2)} mm` },
      ],
      step4Interpretation: `Con una ventaja mecánica total de ${totalMA.toFixed(1)}×, un desplazamiento de ${params.stroke1Mm} mm en el pistón menor eleva la carga solo ${stroke2Mm.toFixed(2)} mm. Por eso los gatos hidráulicos requieren múltiples bombeos.`,
    },
  };
}

// ============================================================================
// CASO 2: LABORATORIO TUBO VENTURI USM (11 PIEZÓMETROS)
// ============================================================================
export interface VenturiTapData {
  tap: number;
  xMm: number;
  diameterMm: number;
  hMeasuredMm: number;
  hTheoreticalMm: number;
}

export const VENTURI_AXIAL_POSITIONS_MM = [-12, 7, 18, 33, 48, 63, 78, 93, 108, 123, 143];
// Geometría exacta del Póster USM: entrada D1=26mm (toma 1), cono convergente (0..25mm), garganta D4=16mm (25..41mm), difusor (41..130mm), salida D11=26mm (130..143mm+)
export function getVenturiDiameterAtX(xMm: number): number {
  if (xMm <= 0) return 26;
  if (xMm <= 25) return 26 - ((26 - 16) * xMm) / 25;
  if (xMm <= 41) return 16;
  if (xMm <= 130) return 16 + ((26 - 16) * (xMm - 41)) / 89;
  return 26;
}

// Datos experimentales del Informe de Laboratorio Venturi USM (Tabla pág. 12)
const VENTURI_EXPERIMENTAL_RECORDS: {
  qLmin: number;
  h1: number;
  h4: number;
  h11: number;
  fullTaps?: number[];
}[] = [
  { qLmin: 7.5, h1: 266, h4: 250, h11: 260 },
  { qLmin: 10.0, h1: 270, h4: 240, h11: 263 },
  {
    qLmin: 12.5,
    h1: 275,
    h4: 225,
    h11: 266,
    fullTaps: [275, 270, 255, 225, 230, 240, 250, 255, 260, 265, 266],
  },
  { qLmin: 15.0, h1: 283, h4: 208, h11: 265 },
  { qLmin: 17.5, h1: 287, h4: 193, h11: 268 },
  {
    qLmin: 20.0,
    h1: 293,
    h4: 170,
    h11: 270,
    fullTaps: [293, 283, 245, 170, 180, 215, 240, 255, 260, 268, 270],
  },
];

export interface VenturiResult {
  qLmin: number;
  qMeasuredM3s: number;
  a1M2: number;
  a4M2: number;
  v1Ms: number;
  v4Ms: number;
  h1Mm: number;
  h4Mm: number;
  h11Mm: number;
  deltaPMedidoPa: number;
  deltaPTeoricoPa: number;
  qTeoricoM3s: number;
  cq: number;
  re4: number;
  deltaPPerdidaPa: number;
  kLoss: number;
  taps: VenturiTapData[];
  board: ProfessorBoardData;
}

export function solveVenturiUSM(qLminInput: number, tempC = 20): VenturiResult {
  const qLmin = Math.max(7.5, Math.min(20.0, qLminInput));
  const d1 = 0.026;
  const d4 = 0.016;
  const g = GRAVITY_VENTURI_USM;
  // Use exact report constants at 20°C (rho=1000, mu=1e-3), adjust smoothly if user varies T
  const water = Math.abs(tempC - 20) < 0.1 ? { rho: 1000, mu: 0.001 } : getWaterPropertiesAtTemp(tempC);
  const rho = water.rho;
  const mu = water.mu;

  const a1 = (Math.PI * d1 * d1) / 4;
  const a4 = (Math.PI * d4 * d4) / 4;
  const qMeasuredM3s = qLmin / 60000;
  const v1 = qMeasuredM3s / a1;
  const v4 = qMeasuredM3s / a4;

  // Check if matches exact experimental preset
  const exactRecord = VENTURI_EXPERIMENTAL_RECORDS.find((r) => Math.abs(r.qLmin - qLmin) < 0.05);

  let h1Mm: number;
  let h4Mm: number;
  let h11Mm: number;

  if (exactRecord) {
    h1Mm = exactRecord.h1;
    h4Mm = exactRecord.h4;
    h11Mm = exactRecord.h11;
  } else {
    // Interpolate linearly between bracketing experimental points
    let lower = VENTURI_EXPERIMENTAL_RECORDS[0];
    let upper = VENTURI_EXPERIMENTAL_RECORDS[VENTURI_EXPERIMENTAL_RECORDS.length - 1];
    for (let i = 0; i < VENTURI_EXPERIMENTAL_RECORDS.length - 1; i++) {
      if (qLmin >= VENTURI_EXPERIMENTAL_RECORDS[i].qLmin && qLmin <= VENTURI_EXPERIMENTAL_RECORDS[i + 1].qLmin) {
        lower = VENTURI_EXPERIMENTAL_RECORDS[i];
        upper = VENTURI_EXPERIMENTAL_RECORDS[i + 1];
        break;
      }
    }
    const ratio = (qLmin - lower.qLmin) / Math.max(1e-6, upper.qLmin - lower.qLmin);
    h1Mm = lower.h1 + ratio * (upper.h1 - lower.h1);
    h4Mm = lower.h4 + ratio * (upper.h4 - lower.h4);
    h11Mm = lower.h11 + ratio * (upper.h11 - lower.h11);
  }

  const h1M = h1Mm / 1000;
  const h4M = h4Mm / 1000;
  const h11M = h11Mm / 1000;

  const deltaPMedidoPa = rho * g * (h1M - h4M);
  const deltaPTeoricoPa = 0.5 * rho * (v4 * v4 - v1 * v1);

  const qTeoricoM3s = a4 * Math.sqrt((2 * g * Math.max(0, h1M - h4M)) / (1 - Math.pow(a4 / a1, 2)));
  const cq = qTeoricoM3s > 0 ? qMeasuredM3s / qTeoricoM3s : 1;
  const re4 = (rho * v4 * d4) / mu;

  const deltaPPerdidaPa = rho * g * (h1M - h11M);
  const kLoss = (2 * deltaPPerdidaPa) / (rho * v1 * v1);

  // Compute all 11 taps (exact from report for 12.5 and 20 L/min, physically interpolated otherwise)
  const taps: VenturiTapData[] = VENTURI_AXIAL_POSITIONS_MM.map((xMm, idx) => {
    const dMm = getVenturiDiameterAtX(xMm);
    const dM = dMm / 1000;
    const aI = (Math.PI * dM * dM) / 4;
    const vI = qMeasuredM3s / aI;
    const hTheoreticalMm = h1Mm - ((vI * vI - v1 * v1) / (2 * g)) * 1000;

    let hMeas = hTheoreticalMm;
    if (exactRecord?.fullTaps) {
      hMeas = exactRecord.fullTaps[idx];
    } else {
      // Shape profile interpolating between h1, h4, h11 using Venturi geometry
      if (idx <= 3) {
        // Converging section: matches Bernoulli very closely
        const frac = (h1Mm - hTheoreticalMm) / Math.max(1e-6, h1Mm - (h1Mm - ((v4 * v4 - v1 * v1) / (2 * g)) * 1000));
        hMeas = h1Mm - frac * (h1Mm - h4Mm);
      } else {
        // Diffuser section: irreversible recovery toward h11
        const frac = (idx - 3) / (10 - 3);
        const smoothFrac = Math.pow(frac, 0.72);
        hMeas = h4Mm + smoothFrac * (h11Mm - h4Mm);
      }
    }

    return {
      tap: idx + 1,
      xMm,
      diameterMm: Number(dMm.toFixed(1)),
      hMeasuredMm: Number(hMeas.toFixed(1)),
      hTheoreticalMm: Number(hTheoreticalMm.toFixed(1)),
    };
  });

  return {
    qLmin,
    qMeasuredM3s,
    a1M2: a1,
    a4M2: a4,
    v1Ms: v1,
    v4Ms: v4,
    h1Mm,
    h4Mm,
    h11Mm,
    deltaPMedidoPa,
    deltaPTeoricoPa,
    qTeoricoM3s,
    cq,
    re4,
    deltaPPerdidaPa,
    kLoss,
    taps,
    board: {
      step1Title: 'Planteamiento: Tubo Venturi USM (Continuidad + Bernoulli)',
      step1Body: [
        'Tubo horizontal (z₁ = z₄ = z₁₁) con D₁ = 26 mm, garganta D₄ = 16 mm, salida D₁₁ = 26 mm y gravedad local g = 9.79 m/s².',
        'En el cono convergente (tomas 1 → 4), el fluido acelera con gradiente favorable de presión; la capa límite se adelgaza y Bernoulli se cumple con error < 2.5%.',
        'En el cono difusor (tomas 5 → 11), el gradiente adverso de presión genera microturbulencia y separación parcial: h₁₁ < h₁ (pérdida permanente).',
      ],
      step2Title: 'Ecuaciones del ensayo de laboratorio',
      step2Equations: [
        'Vᵢ = Q_medido / Aᵢ  ;  Δp_medido = ρ·g·(h₁ − h₄)  ;  Δp_teórico = ½·ρ·(V₄² − V₁²)',
        'Q_teórico = A₄ · √[ 2·g·(h₁ − h₄) / (1 − (A₄/A₁)²) ]  ;  C_q = Q_medido / Q_teórico',
        'Re₄ = ρ·V₄·D₄ / μ  ;  K = 2·Δp_pérdida / (ρ·V₁²) = 2·g·(h₁ − h₁₁) / V₁²',
      ],
      step3Title: 'Reemplazo numérico en SI (para Q actual)',
      step3Substitutions: [
        `Q = ${qLmin.toFixed(1)} L/min ÷ 60000 = ${qMeasuredM3s.toFixed(7)} m³/s`,
        `A₁ = ${a1.toFixed(7)} m² ⇒ V₁ = ${v1.toFixed(4)} m/s | A₄ = ${a4.toFixed(7)} m² ⇒ V₄ = ${v4.toFixed(4)} m/s`,
        `Δp_medido = ${rho.toFixed(0)}·${g}·(${h1M.toFixed(3)} − ${h4M.toFixed(3)}) = ${deltaPMedidoPa.toFixed(2)} Pa (Teórico: ${deltaPTeoricoPa.toFixed(2)} Pa)`,
        `Q_teórico = ${qTeoricoM3s.toFixed(7)} m³/s ⇒ C_q = ${cq.toFixed(4)} | Re₄ = ${Math.round(re4)}`,
        `Δp_pérdida = ${deltaPPerdidaPa.toFixed(2)} Pa ⇒ K = ${kLoss.toFixed(2)}`,
      ],
      step4ResultLabel: 'Coeficiente de Caudal (C_q) y Pérdida (K)',
      step4ResultValue: `C_q = ${cq.toFixed(3)}  |  K = ${kLoss.toFixed(2)}`,
      step4SecondaryResults: [
        { label: 'Reynolds en garganta (Re₄)', value: `${Math.round(re4).toLocaleString('es-CL')}` },
        { label: 'Caída garganta (h₁ − h₄)', value: `${(h1Mm - h4Mm).toFixed(1)} mm H₂O` },
        { label: 'Pérdida permanente (h₁ − h₁₁)', value: `${(h1Mm - h11Mm).toFixed(1)} mm H₂O` },
      ],
      step4Interpretation:
        cq > 1.0
          ? `A caudales bajos (${qLmin.toFixed(1)} L/min), C_q = ${cq.toFixed(3)} > 1.00 evidencia el error relativo de lectura milimétrica (±1 mm en los piezómetros) reportado en el laboratorio USM.`
          : `En régimen turbulento desarrollado (Re₄ = ${Math.round(re4)}), el perfil en la garganta se aplana y C_q ≈ ${cq.toFixed(3)} se estabiliza cerca de la unidad, mientras K ≈ ${kLoss.toFixed(2)} se vuelve independiente de Re y depende solo de la geometría del difusor.`,
    },
  };
}

// ============================================================================
// CASO 3: CERTAMEN 3 — BOMBEO, RED DE TUBERÍAS Y CAVITACIÓN (NPSH)
// ============================================================================
export interface PumpSystemCertamen3Params {
  qLs: number; // Flow rate in L/s (default 1.0 L/s = 10^-3 m3/s)
  d1Cm: number; // Upstream diameter (default 2.5 cm)
  d2Cm: number; // Downstream diameter (default 1.9 cm)
  zbM: number; // Pump elevation above water surface (default 1.0 m in Certamen 3, 1.5 m in Ejercicio)
  z2M: number; // Discharge elevation above water surface (default 3.0 m in Certamen 3: 1 + 2 = 3 m)
  lsM: number; // Suction pipe length (default 1.0 m + 0.5 m)
  ld1M: number; // Discharge pipe 1 length (default 2.0 + 1.0 + 5.0 = 8.0 m)
  ld2M: number; // Discharge pipe 2 length (default 10.0 m)
  valveOpening: '100' | '75' | '50' | '25';
  elbowType: 'bridado_largo' | 'bridado_regular' | 'roscado_regular';
  elbowCount: number; // default 2
  roughnessMm: number; // default 0.046 mm (Acero comercial)
  waterTempC: number; // default 20°C (pv = 2340 Pa)
  patmPa: number; // default 100000 Pa (10^5 Pa from Certamen 3)
}

export interface PumpCurvePoint {
  qLs: number;
  hPump: number;
  hReq: number;
  eta: number;
  npshr: number;
  npsha: number;
}

export interface PumpSystemCertamen3Result {
  qM3s: number;
  v1: number;
  v2: number;
  re1: number;
  re2: number;
  f1: number;
  f2: number;
  hfSuction: number;
  hfDischarge1: number;
  hfDischarge2: number;
  hfTotal: number;
  kSuctionEntrance: number;
  kElbows: number;
  kValve: number;
  kTransition: number;
  hmSuction: number;
  hmDischarge: number;
  hmTotal: number;
  hRequiredM: number;
  hPumpM: number;
  etaPump: number;
  npshaM: number;
  npshrM: number;
  zbMaxM: number;
  isCavitating: boolean;
  operatingPointQLs: number;
  operatingPointHM: number;
  flowTrend: 'aumenta' | 'disminuye' | 'equilibrio';
  curves: PumpCurvePoint[];
  board: ProfessorBoardData;
}

export function evalCertamen3PumpCurves(qM3s: number): {
  hPump: number;
  eta: number;
  npshr: number;
} {
  const hPump = -0.5582e6 * qM3s * qM3s - 3.8441e3 * qM3s + 28.011;
  // Matches Figure 2 efficiency curve (peaking ~38.6% near 2.15 L/s)
  const eta = Math.max(0, -0.0802e6 * qM3s * qM3s + 0.3459e3 * qM3s + 0.0133);
  const npshr = 0.3e6 * qM3s * qM3s + 1.0;
  return { hPump, eta, npshr };
}

function getValveK(opening: PumpSystemCertamen3Params['valveOpening']): number {
  switch (opening) {
    case '100':
      return 0.2;
    case '75':
      return 1.1;
    case '50':
      return 3.6;
    case '25':
      return 28.8;
  }
}

function getElbowK(type: PumpSystemCertamen3Params['elbowType']): number {
  switch (type) {
    case 'bridado_largo':
      return 0.2;
    case 'bridado_regular':
      return 0.3;
    case 'roscado_regular':
      return 1.5;
  }
}

export function solveCertamen3System(params: PumpSystemCertamen3Params): PumpSystemCertamen3Result {
  const g = GRAVITY_STD;
  const water =
    Math.abs(params.waterTempC - 20) < 0.1
      ? { rho: 1000, mu: 1e-3, pv: 2340 }
      : getWaterPropertiesAtTemp(params.waterTempC);

  const rho = water.rho;
  const mu = water.mu;
  const pv = water.pv;

  const d1 = Math.max(0.005, params.d1Cm / 100);
  const d2 = Math.max(0.005, params.d2Cm / 100);
  const epsM = params.roughnessMm / 1000;

  const kSuctionEntrance = 0.5; // Square-edged entrance from well
  const kOneElbow = getElbowK(params.elbowType);
  const kElbows = params.elbowCount * kOneElbow;
  const kValve = getValveK(params.valveOpening);

  const computeForQ = (qM3s: number) => {
    const a1 = (Math.PI * d1 * d1) / 4;
    const a2 = (Math.PI * d2 * d2) / 4;
    const v1 = qM3s / a1;
    const v2 = qM3s / a2;

    const re1 = (rho * v1 * d1) / mu;
    const re2 = (rho * v2 * d2) / mu;

    const f1 = qM3s > 0 ? solveFrictionFactor(re1, epsM / d1).f : 0;
    const f2 = qM3s > 0 ? solveFrictionFactor(re2, epsM / d2).f : 0;

    const dynHead1 = (v1 * v1) / (2 * g);
    const dynHead2 = (v2 * v2) / (2 * g);

    const hfSuction = f1 * (params.lsM / d1) * dynHead1;
    const hfDischarge1 = f1 * (params.ld1M / d1) * dynHead1;
    const hfDischarge2 = f2 * (params.ld2M / d2) * dynHead2;
    const hfTotal = hfSuction + hfDischarge1 + hfDischarge2;

    let kTransition = 0;
    let hmTransition = 0;
    if (d2 < d1 - 1e-6) {
      kTransition = calcSuddenContractionKc(d1, d2);
      hmTransition = kTransition * dynHead2;
    } else if (d2 > d1 + 1e-6) {
      kTransition = calcSuddenExpansionKe(d1, d2);
      hmTransition = kTransition * dynHead1;
    }

    const hmSuction = kSuctionEntrance * dynHead1;
    const hmDischarge = (kElbows + kValve) * dynHead1 + hmTransition;
    const hmTotal = hmSuction + hmDischarge;

    // Discharge to atmosphere: (z2 - z1) + V2^2/(2g) + hL_total
    const hRequiredM = params.z2M + dynHead2 + hfTotal + hmTotal;
    const pump = evalCertamen3PumpCurves(qM3s);

    // NPSHA = (Patm - Pv)/(rho*g) - zb - hL_suction
    const hLSuction = hfSuction + hmSuction;
    const npshaM = (params.patmPa - pv) / (rho * g) - params.zbM - hLSuction;

    return {
      v1,
      v2,
      re1,
      re2,
      f1,
      f2,
      hfSuction,
      hfDischarge1,
      hfDischarge2,
      hfTotal,
      kTransition,
      hmSuction,
      hmDischarge,
      hmTotal,
      hRequiredM,
      hPumpM: pump.hPump,
      etaPump: pump.eta,
      npshrM: pump.npshr,
      npshaM,
      hLSuction,
    };
  };

  const qM3s = params.qLs / 1000;
  const current = computeForQ(qM3s);
  const zbMaxM = (params.patmPa - pv) / (rho * g) - current.npshrM - current.hLSuction;
  const isCavitating = current.npshaM <= current.npshrM;

  // Generate curves from 0 to 4.0 L/s and find intersection operating point
  const curves: PumpCurvePoint[] = [];
  for (let q = 0; q <= 4.05; q += 0.2) {
    const qVal = Number(q.toFixed(2));
    const res = computeForQ(qVal / 1000);
    curves.push({
      qLs: qVal,
      hPump: Number(Math.max(0, res.hPumpM).toFixed(2)),
      hReq: Number(res.hRequiredM.toFixed(2)),
      eta: Number((res.etaPump * 100).toFixed(1)),
      npshr: Number(res.npshrM.toFixed(2)),
      npsha: Number(res.npshaM.toFixed(2)),
    });
  }

  // Bisection to find exact Operating Point where H_pump(Q) = H_req(Q)
  let qLow = 0.00001;
  let qHigh = 0.006;
  for (let i = 0; i < 40; i++) {
    const qMid = 0.5 * (qLow + qHigh);
    const resMid = computeForQ(qMid);
    if (resMid.hPumpM > resMid.hRequiredM) {
      qLow = qMid;
    } else {
      qHigh = qMid;
    }
  }
  const opQ = 0.5 * (qLow + qHigh);
  const opRes = computeForQ(opQ);

  const diffH = current.hPumpM - current.hRequiredM;
  const flowTrend: 'aumenta' | 'disminuye' | 'equilibrio' =
    Math.abs(diffH) < 0.15 ? 'equilibrio' : diffH > 0 ? 'aumenta' : 'disminuye';

  return {
    qM3s,
    v1: current.v1,
    v2: current.v2,
    re1: current.re1,
    re2: current.re2,
    f1: current.f1,
    f2: current.f2,
    hfSuction: current.hfSuction,
    hfDischarge1: current.hfDischarge1,
    hfDischarge2: current.hfDischarge2,
    hfTotal: current.hfTotal,
    kSuctionEntrance,
    kElbows,
    kValve,
    kTransition: current.kTransition,
    hmSuction: current.hmSuction,
    hmDischarge: current.hmDischarge,
    hmTotal: current.hmTotal,
    hRequiredM: current.hRequiredM,
    hPumpM: current.hPumpM,
    etaPump: current.etaPump,
    npshaM: current.npshaM,
    npshrM: current.npshrM,
    zbMaxM,
    isCavitating,
    operatingPointQLs: opQ * 1000,
    operatingPointHM: opRes.hPumpM,
    flowTrend,
    curves,
    board: {
      step1Title: 'Planteamiento: Ecuación de Energía y Análisis de Succión (Certamen 3)',
      step1Body: [
        'Volumen de control entre la superficie libre del pozo (1: P₁ = P_atm, V₁ ≈ 0, z₁ = 0) y la descarga libre a la atmósfera (2: P₂ = P_atm, V₂ = Q/A₂, z₂).',
        'Por conservación de presión atmosférica en ambos extremos, P₁ y P₂ se cancelan en la ecuación de energía total.',
        'Para la cavitación (Parte B), se aplica Bernoulli modificado solo entre el pozo (1) y la entrada de la bomba (s), SIN incluir H_bomba.',
      ],
      step2Title: 'Ecuaciones simbólicas (Sistema + NPSH)',
      step2Equations: [
        'H_req = (z₂ − z₁) + V₂²/(2g) + Σ f·(L/D)·(V²/2g) + Σ K·(V²/2g)',
        'NPSHA = (P_atm − P_v)/(ρ·g) − z_b − h_L,succión  >  NPSHR',
        'z_b,máx = (P_atm − P_v)/(ρ·g) − NPSHR − h_L,succión',
      ],
      step3Title: 'Reemplazo numérico exacto en SI',
      step3Substitutions: [
        `V₁ = ${current.v1.toFixed(3)} m/s (Re₁ = ${Math.round(current.re1).toLocaleString('es-CL')}, f₁ = ${current.f1.toFixed(4)}) | V₂ = ${current.v2.toFixed(3)} m/s (Re₂ = ${Math.round(current.re2).toLocaleString('es-CL')}, f₂ = ${current.f2.toFixed(4)})`,
        `Pérdidas mayores h_f = ${current.hfSuction.toFixed(2)} (suc) + ${current.hfDischarge1.toFixed(2)} (D₁) + ${current.hfDischarge2.toFixed(2)} (D₂) = ${current.hfTotal.toFixed(2)} m`,
        `Pérdidas menores h_m = ${current.hmSuction.toFixed(2)} (entrada) + ${current.hmDischarge.toFixed(2)} (codos=${kElbows.toFixed(1)}, válv=${kValve.toFixed(1)}, trans=${current.kTransition.toFixed(2)}) = ${current.hmTotal.toFixed(2)} m`,
        `H_req = ${params.z2M.toFixed(2)} + ${((current.v2 * current.v2) / (2 * g)).toFixed(2)} + ${current.hfTotal.toFixed(2)} + ${current.hmTotal.toFixed(2)} = ${current.hRequiredM.toFixed(2)} m vs H_bomba = ${current.hPumpM.toFixed(2)} m`,
        `NPSHA = (${params.patmPa} − ${pv})/(${rho.toFixed(0)}·${g}) − ${params.zbM.toFixed(2)} − ${current.hLSuction.toFixed(2)} = ${current.npshaM.toFixed(2)} m vs NPSHR = ${current.npshrM.toFixed(2)} m`,
      ],
      step4ResultLabel: 'Balance energético y Diagnóstico de Cavitación',
      step4ResultValue: isCavitating
        ? `PELIGRO: CAVITACIÓN ACTIVA (NPSHA ${current.npshaM.toFixed(2)}m ≤ NPSHR ${current.npshrM.toFixed(2)}m)`
        : `H_bomba = ${current.hPumpM.toFixed(2)} m | H_req = ${current.hRequiredM.toFixed(2)} m | Sin cavitación`,
      step4SecondaryResults: [
        { label: 'Punto de operación real (Q_op)', value: `${(opQ * 1000).toFixed(2)} L/s @ ${opRes.hPumpM.toFixed(2)} m` },
        { label: 'Altura máxima succión (z_b,máx)', value: `${zbMaxM.toFixed(2)} m` },
        { label: 'Eficiencia bomba (η)', value: `${(current.etaPump * 100).toFixed(1)} %` },
      ],
      step4Interpretation: `${
        flowTrend === 'aumenta'
          ? `Para Q = ${params.qLs.toFixed(2)} L/s, la bomba entrega más carga (${current.hPumpM.toFixed(2)} m) que la requerida (${current.hRequiredM.toFixed(2)} m). Ese exceso acelera el fluido hasta alcanzar el punto de operación Q_op = ${(opQ * 1000).toFixed(2)} L/s.`
          : flowTrend === 'disminuye'
            ? `Para Q = ${params.qLs.toFixed(2)} L/s, falta carga (${current.hPumpM.toFixed(2)} m < ${current.hRequiredM.toFixed(2)} m). El sistema desacelerará el caudal hasta Q_op = ${(opQ * 1000).toFixed(2)} L/s.`
            : 'El caudal evaluado coincide con el punto de operación de equilibrio del sistema.'
      } ${
        isCavitating
          ? `Además hay CAVITACIÓN en el ojo del rodete: debes bajar z_b bajo ${zbMaxM.toFixed(2)} m o aumentar el diámetro de succión D₁.`
          : `En la succión, NPSHA (${current.npshaM.toFixed(2)} m) > NPSHR (${current.npshrM.toFixed(2)} m), operando de forma segura mientras z_b < ${zbMaxM.toFixed(2)} m.`
      }`,
    },
  };
}

// ============================================================================
// CASO 4: TURBOMÁQUINAS — RODETE CENTRÍFUGO Y ECUACIÓN DE EULER (CERTAMEN 3 P2)
// ============================================================================
export interface EulerImpellerParams {
  qM3s: number; // 0.01 m3/s
  d1Cm: number; // 3.2 cm
  d2Cm: number; // 10 cm (R2 = 5 cm)
  vr2Ms: number; // 0.3 m/s
  rpm: number; // 3450 rpm
  beta2Deg: number; // 60 deg
  rho: number; // 1000 kg/m3
}

export interface EulerImpellerResult {
  r1M: number;
  r2M: number;
  omegaRadS: number;
  b2M: number;
  b2Mm: number;
  v1AxialMs: number;
  u2Ms: number;
  wTheta2Ms: number;
  w2MagMs: number;
  vTheta2Ms: number;
  v2MagMs: number;
  alpha2Deg: number;
  torqueNm: number;
  shaftPowerW: number;
  eulerHeadM: number;
  board: ProfessorBoardData;
}

export function solveEulerImpeller(params: EulerImpellerParams): EulerImpellerResult {
  const r1M = params.d1Cm / 200;
  const r2M = params.d2Cm / 200;
  const omegaRadS = (2 * Math.PI * params.rpm) / 60;
  const a1 = Math.PI * r1M * r1M;
  const v1AxialMs = params.qM3s / a1;

  // Continuity at impeller outlet: Q = 2 * pi * R2 * b2 * Vr2
  const b2M = params.qM3s / (2 * Math.PI * r2M * params.vr2Ms);
  const b2Mm = b2M * 1000;

  // Velocity triangle at outlet:
  const u2Ms = r2M * omegaRadS;
  const beta2Rad = (params.beta2Deg * Math.PI) / 180;
  // Relative tangential component opposes U2 for backward-curved blades (beta2 < 90°)
  const wTheta2Ms = -params.vr2Ms / Math.tan(beta2Rad);
  const w2MagMs = Math.hypot(params.vr2Ms, wTheta2Ms);

  const vTheta2Ms = u2Ms + wTheta2Ms;
  const v2MagMs = Math.hypot(params.vr2Ms, vTheta2Ms);
  const alpha2Deg = (Math.atan2(params.vr2Ms, vTheta2Ms) * 180) / Math.PI;

  // Euler equation for turbomachines (axial entry => V_theta1 = 0)
  const torqueNm = params.rho * params.qM3s * (r2M * vTheta2Ms);
  const shaftPowerW = omegaRadS * torqueNm;
  const eulerHeadM = (u2Ms * vTheta2Ms) / GRAVITY_STD;

  return {
    r1M,
    r2M,
    omegaRadS,
    b2M,
    b2Mm,
    v1AxialMs,
    u2Ms,
    wTheta2Ms,
    w2MagMs,
    vTheta2Ms,
    v2MagMs,
    alpha2Deg,
    torqueNm,
    shaftPowerW,
    eulerHeadM,
    board: {
      step1Title: 'Planteamiento: Bomba Centrífuga Idealizada (Certamen 3 — Problema 2)',
      step1Body: [
        'Flujo estacionario e incompresible con entrada puramente axial (prerrotación nula ⇒ V_θ1 = 0).',
        'El área periférica de salida del rodete es cilíndrica: A₂ = 2·π·R₂·b₂.',
        'Álabe curvado hacia atrás con ángulo β₂: la componente tangencial relativa W_θ2 apunta en sentido opuesto a U₂ = R₂·ω.',
      ],
      step2Title: 'Ecuaciones simbólicas (Continuidad, Triángulo y Euler)',
      step2Equations: [
        'b₂ = Q / (2·π·R₂·V_r2)',
        'W₂ = V_r2 ê_r − V_r2·cot(β₂) ê_θ  ;  V₂ = U₂ + W₂ = V_r2 ê_r + (R₂·ω − V_r2·cot β₂) ê_θ',
        'T_eje = ρ·Q·(R₂·V_θ2 − R₁·V_θ1)  ;  Ẇ_eje = ω·T_eje  ;  H_Euler = U₂·V_θ2 / g',
      ],
      step3Title: 'Reemplazo numérico en SI',
      step3Substitutions: [
        `ω = 2π·(${params.rpm})/60 = ${omegaRadS.toFixed(2)} rad/s | R₂ = ${r2M.toFixed(3)} m ⇒ U₂ = ${u2Ms.toFixed(3)} m/s`,
        `b₂ = ${params.qM3s.toFixed(4)} / (2π · ${r2M.toFixed(3)} · ${params.vr2Ms.toFixed(2)}) = ${b2M.toFixed(4)} m (${b2Mm.toFixed(1)} mm)`,
        `W_θ2 = −${params.vr2Ms.toFixed(2)} · cot(${params.beta2Deg}°) = ${wTheta2Ms.toFixed(4)} m/s ⇒ W₂ = ${params.vr2Ms.toFixed(2)} ê_r ${wTheta2Ms.toFixed(3)} ê_θ [m/s]`,
        `V_θ2 = ${u2Ms.toFixed(3)} + (${wTheta2Ms.toFixed(3)}) = ${vTheta2Ms.toFixed(3)} m/s`,
        `T_eje = (${params.rho})·(${params.qM3s.toFixed(4)})·(${r2M.toFixed(3)})·(${vTheta2Ms.toFixed(3)}) = ${torqueNm.toFixed(3)} N·m`,
      ],
      step4ResultLabel: 'Ancho b₂, Velocidad W₂ y Torque de Eje (T_eje)',
      step4ResultValue: `b₂ = ${b2Mm.toFixed(1)} mm | T_eje = ${torqueNm.toFixed(2)} N·m`,
      step4SecondaryResults: [
        { label: 'Potencia ideal eje (Ẇ_eje)', value: `${(shaftPowerW / 1000).toFixed(2)} kW (${Math.round(shaftPowerW)} W)` },
        { label: 'Altura teórica Euler (H_Euler)', value: `${eulerHeadM.toFixed(2)} m` },
        { label: 'Velocidad absoluta salida |V₂|', value: `${v2MagMs.toFixed(2)} m/s` },
      ],
      step4Interpretation: `El rodete transfiere ${torqueNm.toFixed(2)} N·m de torque generando una altura teórica de Euler de ${eulerHeadM.toFixed(1)} m. Si aumentas el ángulo β₂ hacia 90°, W_θ2 se acerca a cero, V_θ2 sube hasta igualar U₂ y aumenta tanto la carga como el torque demandado al motor.`,
    },
  };
}
