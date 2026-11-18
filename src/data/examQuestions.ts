import { GRAVITY_STD, solveFrictionFactor, calcSuddenExpansionKe } from '../physics/fluidProperties';

export interface ConceptualQuestion {
  id: string;
  category: 'Control 3' | 'Certamen 3' | 'Hidrostática' | 'Venturi';
  prompt: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export interface NumericalQuestion {
  id: string;
  title: string;
  category: string;
  prompt: string;
  unit: string;
  expectedValue: number;
  tolerancePercent: number;
  hint: string;
  solutionSteps: string[];
}

export const CONCEPTUAL_QUESTIONS: ConceptualQuestion[] = [
  {
    id: 'c3-1',
    category: 'Control 3',
    prompt:
      'En una tubería horizontal por la que circula agua en régimen turbulento a caudal constante Q, se reduce el diámetro interno D a la mitad (D₂ = D₁/2). ¿Cómo varía aproximadamente la pérdida de carga por fricción h_f por unidad de longitud?',
    options: [
      'Aumenta 4 veces (proporcional a 1/D²)',
      'Aumenta 16 veces (proporcional a 1/D⁴)',
      'Aumenta ~32 veces (proporcional a 1/D⁵)',
      'Disminuye a la mitad porque el área es menor',
    ],
    correctIndex: 2,
    hint: 'Reemplaza V = 4Q/(πD²) dentro de la ecuación de Darcy-Weisbach h_f = f·(L/D)·(V²/2g).',
    explanation:
      'En Darcy-Weisbach, h_f = f·(8·L·Q²)/(π²·g·D⁵). Al reducir D a la mitad con Q constante, D⁵ se reduce por 2⁵ = 32, disparando las pérdidas de carga unas 32 veces.',
  },
  {
    id: 'c3-2',
    category: 'Control 3',
    prompt:
      '¿Cuál es la diferencia física y dimensional exacta entre la pérdida de energía específica e_L (o y_v) y la pérdida de carga h_L utilizadas en la ecuación de Bernoulli modificada?',
    options: [
      'Son idénticas en valor numérico, solo cambia el nombre según el autor',
      'e_L está en [J/kg = m²/s²] (energía por unidad de masa) y h_L está en [m] (energía por unidad de peso, h_L = e_L / g)',
      'e_L mide solo pérdidas mayores y h_L mide solo pérdidas menores',
      'h_L está en Pascales [Pa] y e_L está en Watts [W]',
    ],
    correctIndex: 1,
    hint: 'Divide la ecuación de energía por kg [m²/s²] entre la aceleración de gravedad g [m/s²].',
    explanation:
      'En el enfoque de M. Roth y Çengel, e_L = Δp_pérdida / ρ [J/kg] representa energía mecánica disipada por kilogramo de fluido, mientras que h_L = e_L / g [m] representa la altura de columna equivalente de fluido.',
  },
  {
    id: 'c3-3',
    category: 'Certamen 3',
    prompt:
      'Un sistema de bombeo presenta cavitación severa en la succión (NPSHA < NPSHR). ¿Cuál de las siguientes medidas de ingeniería corrige directamente el problema?',
    options: [
      'Aumentar el largo de la tubería de descarga después de la bomba',
      'Cerrar parcialmente la válvula de compuerta en la succión',
      'Bajar la cota de instalación de la bomba (reducir z_b) o aumentar el diámetro de la tubería de succión',
      'Calentar el agua de entrada para bajar su viscosidad',
    ],
    correctIndex: 2,
    hint: 'Recuerda la fórmula NPSHA = (P_atm − P_v)/(ρg) − z_b − h_L,succión.',
    explanation:
      'Para subir NPSHA debes reducir z_b (bajar la bomba respecto al estanque) y/o reducir h_L,succión aumentando el diámetro de succión D_s. Calentar el agua sube P_v y empeora la cavitación.',
  },
  {
    id: 'c3-4',
    category: 'Certamen 3',
    prompt:
      'Al evaluar un caudal de prueba Q₀ en un sistema bomba-tubería, encuentras que la altura entregada por la bomba es H_bomba(Q₀) = 23.6 m mientras que el sistema requiere H_req(Q₀) = 14.2 m. ¿Qué ocurrirá físicamente con el caudal real?',
    options: [
      'El caudal real será menor que Q₀ porque sobra presión',
      'El fluido se acelerará y el caudal real aumentará hasta alcanzar el punto de operación H_bomba = H_req',
      'La bomba entrará inmediatamente en cavitación',
      'El caudal se mantendrá clavado en Q₀',
    ],
    correctIndex: 1,
    hint: 'Si entregas más energía mecánica de la que consumen la gravedad y las pérdidas, el excedente acelera la masa de fluido.',
    explanation:
      'Un exceso de carga (H_bomba > H_req) implica fuerza motriz neta positiva que acelera el flujo: al crecer Q suben las pérdidas (∝ Q²) y cae H_bomba hasta igualarse en el Punto de Operación.',
  },
  {
    id: 'c3-5',
    category: 'Venturi',
    prompt:
      'En el Laboratorio de Tubo de Venturi (USM), ¿por qué la columna piezométrica de salida h₁₁ nunca recupera por completo la altura inicial h₁ aunque D₁₁ = D₁?',
    options: [
      'Porque el agua se comprime en la garganta cambiando su densidad',
      'Porque en el cono divergente (difusor) el gradiente adverso de presión provoca separación parcial de capa límite y microturbulencia irreversible',
      'Porque el diámetro D₁₁ es menor que D₄',
      'Por el principio de Arquímedes',
    ],
    correctIndex: 1,
    hint: 'Piensa en qué ocurre cuando un flujo desacelera contra un gradiente de presión creciente en el difusor.',
    explanation:
      'En la zona convergente Bernoulli se cumple casi idealmente (<2.5% desvío), pero en el difusor (tomas 5 a 11) el flujo desacelera contra presión creciente, generando torbellinos y disipación viscosa permanente medida por K.',
  },
  {
    id: 'c3-6',
    category: 'Hidrostática',
    prompt:
      'En flujo laminar totalmente desarrollado dentro de una tubería circular rugosa (Re = 1400), si reemplazamos el tubo por acero roblonado muy rugoso manteniendo D, L y Q, ¿qué sucede con el factor de fricción f?',
    options: [
      'Aumenta drásticamente por los picos de rugosidad',
      'Permanece exactamente igual a f = 64 / Re porque el régimen laminar es independiente de la rugosidad',
      'Cambia según la ecuación de Nikuradse',
      'Se reduce a la mitad',
    ],
    correctIndex: 1,
    hint: 'Revisa el lado izquierdo del Diagrama de Moody para Re < 2300.',
    explanation:
      'En flujo laminar no existe mezcla transversal ni turbulencia contra la pared: las capas concéntricas deslizan suavemente y f = 64 / Re depende exclusivamente de Re.',
  },
];

export function generateDynamicNumericalQuestions(seedIndex = 0): NumericalQuestion[] {
  // Deterministic yet varied numerical problems using seedIndex
  const qVenturi = [10, 12.5, 15, 17.5, 20][seedIndex % 5];
  const d1Vent = 0.026;
  const d4Vent = 0.016;
  const v4Vent = (qVenturi / 60000) / ((Math.PI * d4Vent * d4Vent) / 4);
  const re4Vent = (1000 * v4Vent * d4Vent) / 0.001;

  // Problem 2: Darcy-Weisbach Head Loss in commercial steel pipe
  const dPipeCm = [2.5, 3.5, 4.0, 5.0][seedIndex % 4];
  const lPipeM = [12, 15, 20, 25][seedIndex % 4];
  const qLsPipe = [1.0, 1.5, 2.0, 2.5][seedIndex % 4];
  const dPipeM = dPipeCm / 100;
  const vPipe = (qLsPipe / 1000) / ((Math.PI * dPipeM * dPipeM) / 4);
  const rePipe = (1000 * vPipe * dPipeM) / 0.001;
  const fPipe = solveFrictionFactor(rePipe, 0.000046 / dPipeM).f;
  const hfPipe = fPipe * (lPipeM / dPipeM) * ((vPipe * vPipe) / (2 * GRAVITY_STD));

  // Problem 3: Borda-Carnot sudden expansion loss
  const dExp1Cm = [2.5, 3.0, 4.0][seedIndex % 3];
  const dExp2Cm = [5.0, 6.0, 8.0][seedIndex % 3];
  const v1Exp = [2.0, 2.5, 3.0][seedIndex % 3];
  const keExp = calcSuddenExpansionKe(dExp1Cm / 100, dExp2Cm / 100);
  const hmExp = keExp * ((v1Exp * v1Exp) / (2 * GRAVITY_STD));

  // Problem 4: NPSHA calculation
  const zbNpsh = [1.2, 1.5, 2.0, 2.5][seedIndex % 4];
  const hLsucNpsh = [0.6, 0.8, 1.1, 1.4][seedIndex % 4];
  const patmNpsh = 100000;
  const pvNpsh = 2340;
  const npshaVal = (patmNpsh - pvNpsh) / (1000 * GRAVITY_STD) - zbNpsh - hLsucNpsh;

  return [
    {
      id: `num-venturi-${seedIndex}`,
      title: '1. Tubo Venturi USM — Velocidad y Reynolds en garganta',
      category: 'Venturi',
      prompt: `Por el Tubo de Venturi del laboratorio USM (D₁ = 26 mm, garganta D₄ = 16 mm) circula agua (ρ = 1000 kg/m³, μ = 10⁻³ Pa·s) a un caudal medido de Q = ${qVenturi} L/min. Calcule el número de Reynolds en la garganta (Re₄).`,
      unit: 'adimensional',
      expectedValue: Math.round(re4Vent),
      tolerancePercent: 3.5,
      hint: 'Convierte Q a m³/s dividiendo por 60000, calcula A₄ = π·(0.016)²/4, halla V₄ = Q/A₄ y evalúa Re₄ = ρ·V₄·D₄/μ.',
      solutionSteps: [
        `Q = ${qVenturi} / 60000 = ${(qVenturi / 60000).toExponential(4)} m³/s`,
        `A₄ = π·(0.016)²/4 = 2.0106×10⁻⁴ m² ⇒ V₄ = ${v4Vent.toFixed(3)} m/s`,
        `Re₄ = (1000 · ${v4Vent.toFixed(3)} · 0.016) / 0.001 = ${Math.round(re4Vent)}`,
      ],
    },
    {
      id: `num-darcy-${seedIndex}`,
      title: '2. Tuberías — Pérdida de Carga Primaria (Darcy-Weisbach)',
      category: 'Flujos Internos',
      prompt: `Circula agua a 20°C (ρ = 1000 kg/m³, μ = 10⁻³ Pa·s) con Q = ${qLsPipe} L/s por una tubería de acero comercial (ε = 0.046 mm) de diámetro interno D = ${dPipeCm} cm y longitud L = ${lPipeM} m. Calcule la pérdida de carga mayor h_f en metros (use g = 9.81 m/s²).`,
      unit: 'm',
      expectedValue: Number(hfPipe.toFixed(3)),
      tolerancePercent: 6.0,
      hint: 'Calcula V = Q/A, luego Re y rugosidad relativa ε/D para obtener f ≈ ' + fPipe.toFixed(4) + ' en Moody/Colebrook, y aplica h_f = f·(L/D)·(V²/2g).',
      solutionSteps: [
        `V = ${(qLsPipe / 1000).toFixed(4)} / (π·${dPipeM.toFixed(3)}²/4) = ${vPipe.toFixed(3)} m/s`,
        `Re = ${Math.round(rePipe)}, ε/D = ${(0.000046 / dPipeM).toFixed(5)} ⇒ f = ${fPipe.toFixed(4)}`,
        `h_f = ${fPipe.toFixed(4)} · (${lPipeM}/${dPipeM.toFixed(3)}) · (${vPipe.toFixed(3)}² / 19.62) = ${hfPipe.toFixed(3)} m`,
      ],
    },
    {
      id: `num-exp-${seedIndex}`,
      title: '3. Pérdidas Menores — Expansión Súbita (Borda-Carnot)',
      category: 'Accesorios',
      prompt: `Una tubería de diámetro D₁ = ${dExp1Cm} cm sufre una expansión súbita hacia D₂ = ${dExp2Cm} cm. Si la velocidad media aguas arriba es V₁ = ${v1Exp.toFixed(1)} m/s, calcule la pérdida de carga singular h_lm en metros (g = 9.81 m/s²).`,
      unit: 'm',
      expectedValue: Number(hmExp.toFixed(3)),
      tolerancePercent: 4.0,
      hint: 'Usa la fórmula analítica de Borda-Carnot: K_e = (1 − A₁/A₂)² = (1 − (D₁/D₂)²)² referida a V₁.',
      solutionSteps: [
        `Razón de áreas A₁/A₂ = (${dExp1Cm}/${dExp2Cm})² = ${Math.pow(dExp1Cm / dExp2Cm, 2).toFixed(3)}`,
        `K_e = (1 − ${Math.pow(dExp1Cm / dExp2Cm, 2).toFixed(3)})² = ${keExp.toFixed(4)}`,
        `h_lm = ${keExp.toFixed(4)} · (${v1Exp.toFixed(1)}² / 19.62) = ${hmExp.toFixed(3)} m`,
      ],
    },
    {
      id: `num-npsh-${seedIndex}`,
      title: '4. Bombeo y Cavitación — Cálculo de NPSHA',
      category: 'Turbomáquinas',
      prompt: `Una bomba succiona agua a 20°C (ρ = 1000 kg/m³, p_v = 2340 Pa) desde un pozo abierto a p_atm = 100 kPa. La bomba se ubica z_b = ${zbNpsh.toFixed(1)} m sobre la superficie del pozo y las pérdidas totales en la línea de succión son h_L,suc = ${hLsucNpsh.toFixed(1)} m. Determine el NPSHA disponible en metros.`,
      unit: 'm',
      expectedValue: Number(npshaVal.toFixed(2)),
      tolerancePercent: 3.5,
      hint: 'Aplica NPSHA = (p_atm − p_v)/(ρ·g) − z_b − h_L,succión usando presiones en Pascales.',
      solutionSteps: [
        `(p_atm − p_v)/(ρ·g) = (100000 − 2340) / (1000 · 9.81) = ${((patmNpsh - pvNpsh) / 9810).toFixed(2)} m`,
        `NPSHA = ${((patmNpsh - pvNpsh) / 9810).toFixed(2)} − ${zbNpsh.toFixed(1)} − ${hLsucNpsh.toFixed(1)} = ${npshaVal.toFixed(2)} m`,
      ],
    },
  ];
}

/**
 * Escala chilena universitaria (60% exigencia para nota 4.0):
 * 0% -> 1.0 | 60% -> 4.0 | 100% -> 7.0
 */
export function computeChileanGrade(correctCount: number, totalCount: number): {
  scorePercent: number;
  gradeChile: number;
} {
  if (totalCount <= 0) return { scorePercent: 0, gradeChile: 1.0 };
  const ratio = Math.max(0, Math.min(1, correctCount / totalCount));
  const scorePercent = Math.round(ratio * 100);
  let grade: number;
  if (ratio < 0.6) {
    grade = 1.0 + (ratio / 0.6) * 3.0;
  } else {
    grade = 4.0 + ((ratio - 0.6) / 0.4) * 3.0;
  }
  return {
    scorePercent,
    gradeChile: Number(grade.toFixed(1)),
  };
}
