import test from 'node:test';
import assert from 'node:assert/strict';
import {
  solveFrictionFactor,
  calcSuddenExpansionKe,
  calcSuddenContractionKc,
  solveSandboxPipeSystem,
} from './fluidProperties';
import {
  solveManometer,
  solvePistonSpring,
  solvePascalPress,
  solveVenturiUSM,
  solveCertamen3System,
  solveEulerImpeller,
} from './simulatorsMath';

test('Moody / Colebrook-White solver handles laminar and turbulent regimes accurately', () => {
  const lam = solveFrictionFactor(1200, 0.001);
  assert.equal(lam.regime, 'Laminar');
  assert.ok(Math.abs(lam.f - 64 / 1200) < 1e-6);

  // Smooth pipe at Re = 1e5 => Blasius ~ 0.0178, Colebrook ~ 0.0180
  const turbSmooth = solveFrictionFactor(1e5, 0);
  assert.equal(turbSmooth.regime, 'Turbulento');
  assert.ok(turbSmooth.f > 0.0175 && turbSmooth.f < 0.0185);

  // Rough pipe Re = 50930, D=0.025m, e=0.046mm => e/D=0.00184 => f ~ 0.026
  const c3 = solveFrictionFactor(50930, 0.000046 / 0.025);
  assert.ok(c3.f > 0.024 && c3.f < 0.028);
});

test('Sudden expansion Borda-Carnot & contraction formulas', () => {
  const ke = calcSuddenExpansionKe(0.025, 0.035);
  const expectedKe = Math.pow(1 - Math.pow(0.025 / 0.035, 2), 2);
  assert.ok(Math.abs(ke - expectedKe) < 1e-6);

  const kc = calcSuddenContractionKc(0.025, 0.019);
  assert.ok(kc > 0.2 && kc < 0.3);
});

test('Hydrostatics Case 1 matches USM / Cengel Pauta answers', () => {
  // P2.31: deltaP ~ 8900 Pa
  const p231 = solveManometer({
    preset: 'ej_p2_31',
    hBenzeneM: 0.20,
    hHgM: 0.08,
    hKeroseneM: 0.32,
    hWaterM: 0.26,
    hAirM: 0.09,
  });
  assert.ok(Math.abs(p231.deltaPPa - 8900) < 120);

  // 3-30: P = 95 + (4*9.81 + 60)/0.0035 = 123.35 kPa
  const p330 = solvePistonSpring({
    preset: 'ej_3_30',
    patmKpa: 95,
    pistonMassKg: 4,
    areaCm2: 35,
    springForceN: 60,
    pistonDiameterM: 0.3,
    hCE_M: 0.25,
    hCD_M: 0.25,
  });
  assert.ok(Math.abs(p330.pCylinderKpa - 123.35) < 0.2);

  // 3-54: Pair A = 2.81 kPa, Pair B = -2.10 kPa
  const p354 = solvePistonSpring({
    preset: 'ej_3_54',
    patmKpa: 101.3,
    pistonMassKg: 25 / 9.81,
    areaCm2: 35,
    springForceN: 0,
    pistonDiameterM: 0.30,
    hCE_M: 0.25,
    hCD_M: 0.25,
  });
  assert.ok(Math.abs(p354.pAirAKpa - 2.81) < 0.05);
  assert.ok(Math.abs(p354.pAirBKpa - -2.10) < 0.05);

  // Pascal press
  const pascal = solvePascalPress({ d1Mm: 20, d2Mm: 100, f1N: 100, leverRatio: 1, stroke1Mm: 50 });
  assert.ok(Math.abs(pascal.f2N - 2500) < 1e-6);
  assert.ok(Math.abs(pascal.stroke2Mm - 2) < 1e-6);
});

test('Venturi USM 20 L/min matches Informe de Laboratorio numbers', () => {
  const venturi = solveVenturiUSM(20, 20);
  assert.ok(Math.abs(venturi.v1Ms - 0.6278) < 0.002);
  assert.ok(Math.abs(venturi.v4Ms - 1.657) < 0.005);
  assert.ok(Math.abs(venturi.deltaPMedidoPa - 1204.17) < 1.0);
  assert.ok(Math.abs(venturi.cq - 0.99) < 0.015);
  assert.ok(Math.abs(venturi.re4 - 26525) < 60);
  assert.ok(Math.abs(venturi.kLoss - 1.14) < 0.02);
  assert.equal(venturi.taps.length, 11);
});

test('Certamen 3 pump system evaluates operating point and cavitation threshold', () => {
  const nominal = solveCertamen3System({
    qLs: 1.0,
    d1Cm: 2.5,
    d2Cm: 1.9,
    zbM: 1.0,
    z2M: 3.0,
    lsM: 1.5,
    ld1M: 8.0,
    ld2M: 10.0,
    valveOpening: '50',
    elbowType: 'bridado_largo',
    elbowCount: 2,
    roughnessMm: 0.046,
    waterTempC: 20,
    patmPa: 100000,
  });

  // At Q=1 L/s, H_pump = -0.5582 - 3.8441 + 28.011 = 23.6087 m
  assert.ok(Math.abs(nominal.hPumpM - 23.61) < 0.05);
  assert.equal(nominal.isCavitating, false);
  assert.equal(nominal.flowTrend, 'aumenta');

  // If pump is raised to zb = 9.0 m, NPSHA < NPSHR => cavitation triggers!
  const cavitating = solveCertamen3System({
    qLs: 1.0,
    d1Cm: 2.5,
    d2Cm: 1.9,
    zbM: 9.0,
    z2M: 11.0,
    lsM: 9.0,
    ld1M: 8.0,
    ld2M: 10.0,
    valveOpening: '50',
    elbowType: 'bridado_largo',
    elbowCount: 2,
    roughnessMm: 0.046,
    waterTempC: 20,
    patmPa: 100000,
  });
  assert.equal(cavitating.isCavitating, true);
});

test('Euler impeller Certamen 3 Problem 2 matches exact analytical solution', () => {
  const euler = solveEulerImpeller({
    qM3s: 0.01,
    d1Cm: 3.2,
    d2Cm: 10,
    vr2Ms: 0.3,
    rpm: 3450,
    beta2Deg: 60,
    rho: 1000,
  });
  // b2 = 0.01 / (2*pi*0.05*0.3) = 0.1061 m = 106.1 mm
  assert.ok(Math.abs(euler.b2Mm - 106.1) < 0.2);
  // omega = 361.28 rad/s, U2 = 18.064 m/s, W_theta2 = -0.1732 m/s, V_theta2 = 17.891 m/s
  assert.ok(Math.abs(euler.u2Ms - 18.064) < 0.02);
  assert.ok(Math.abs(euler.wTheta2Ms - -0.1732) < 0.002);
  // T = 1000 * 0.01 * 0.05 * 17.891 = 8.945 N*m
  assert.ok(Math.abs(euler.torqueNm - 8.945) < 0.05);
});

test('Sandbox pipe solver computes EL/HGL profile and head losses', () => {
  const sb = solveSandboxPipeSystem({
    fluidId: 'agua',
    tempC: 20,
    materialId: 'acero_comercial',
    diameter1Mm: 50,
    diameter2Mm: 75,
    length1M: 20,
    length2M: 30,
    z1M: 0,
    z2M: 10,
    flowRateLs: 5,
    pumpHeadM: 22,
    pumpEfficiency: 0.75,
    fittings: [
      { id: 'entrada_viva', count: 1 },
      { id: 'codo90_bridado_reg', count: 2 },
    ],
  });
  assert.equal(sb.regime1, 'Turbulento');
  assert.ok(sb.totalHeadLossM > 0);
  assert.equal(sb.elProfile.length, 6);
  assert.ok(sb.shaftPowerW > sb.hydraulicPowerW);
});

import { LECTURE_UNITS } from '../data/lectureData';

test('Cátedra Interactiva covers Units 0 through 6 with 5+ slides each and full pedagogical anatomy', () => {
  assert.equal(LECTURE_UNITS.length, 7);
  assert.deepEqual(
    LECTURE_UNITS.map((u) => u.unitNumber),
    [0, 1, 2, 3, 4, 5, 6]
  );

  let totalWorkedExercises = 0;
  for (const unit of LECTURE_UNITS) {
    assert.ok(unit.slides.length >= 5, `Unit ${unit.unitNumber} should have >= 5 slides`);
    for (const slide of unit.slides) {
      assert.ok(slide.simpleExplanation.analogyTitle.length > 5);
      assert.ok(slide.simpleExplanation.body.length > 30);
      assert.ok(slide.logicalWalkthrough.length >= 2);
      assert.ok(slide.formulas.length >= 1);
      for (const f of slide.formulas) {
        assert.ok(f.symbols.length >= 1);
        assert.ok(f.whenValid.length > 5);
      }
      if (slide.workedExercises) {
        totalWorkedExercises += slide.workedExercises.length;
      }
    }
  }
  assert.ok(totalWorkedExercises >= 16, `Expected >= 16 worked exercises, got ${totalWorkedExercises}`);
});

import { PIPE_SYSTEM_EXAMPLES, solveIndustrialPipeSystem } from './pipeLossCFDMath';

test('Ejemplo 3 (Guía de Estudio Sección 7) matches exact theoretical values', () => {
  const ex3 = PIPE_SYSTEM_EXAMPLES.find((e) => e.id === 'ejemplo-3-guia-estudio');
  assert.ok(ex3, 'Ejemplo 3 should exist in PIPE_SYSTEM_EXAMPLES');
  const sol = solveIndustrialPipeSystem(ex3.params);

  assert.ok(Math.abs(sol.line2.velocityMs - 1.27324) < 0.001);
  assert.ok(Math.abs(sol.line2.reynolds - 126817) < 20);
  assert.ok(Math.abs(sol.line2.frictionFactor - 0.01960) < 0.0001);
  assert.ok(Math.abs(sol.line2.velocityHeadM - 0.08263) < 0.0002);
  assert.ok(Math.abs(sol.hfTotalM - 0.80969) < 0.003);
  assert.ok(Math.abs(sol.hmTotalM - 0.28919) < 0.002);
  assert.ok(Math.abs(sol.hLTotalM - 1.09888) < 0.004);
  assert.ok(Math.abs(sol.deltaPEquivKpa - 10.76) < 0.05);
  assert.ok(Math.abs(sol.hydraulicPowerW - 107.6) < 0.5);
});

test('Ejemplo 2 (Sistema Industrial 3D) converts units and computes pump head & powers consistently', () => {
  const ex2 = PIPE_SYSTEM_EXAMPLES.find((e) => e.id === 'ejemplo-2-infografia-cfd');
  assert.ok(ex2, 'Ejemplo 2 should exist in PIPE_SYSTEM_EXAMPLES');
  const sol = solveIndustrialPipeSystem(ex2.params);

  // Q = 15 L/s = 0.015 m3/s; p2 = 28.4 psi = 195.81 kPa; Delta z = 24 - 5 = 19 m
  assert.ok(Math.abs(sol.qM3s - 0.015) < 1e-6);
  assert.ok(Math.abs(sol.p2Kpa - 195.81) < 0.1);
  assert.equal(sol.deltaZM, 19);
  assert.ok(Math.abs(sol.line1.velocityMs - 1.2223) < 0.005);
  assert.ok(Math.abs(sol.line2.velocityMs - 1.9099) < 0.005);
  assert.ok(sol.pumpHeadM > 40 && sol.pumpHeadM < 50);
  assert.ok(sol.shaftPowerKw > sol.hydraulicPowerKw);
  assert.ok(sol.electricPowerKw > sol.shaftPowerKw);
  assert.equal(sol.steps.length, 8);
});

