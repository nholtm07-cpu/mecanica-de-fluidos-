export type SlideDiagramType =
  | 'fluid_vs_solid'
  | 'no_slip_boundary'
  | 'continuum_field'
  | 'eulerian_lagrangian'
  | 'analysis_methods'
  | 'ideal_gas_anomaly'
  | 'viscosity_couette'
  | 'non_newtonian'
  | 'pressure_scales'
  | 'compressibility_elasticity'
  | 'vapor_capillarity'
  | 'pressure_wedge'
  | 'hydrostatic_paradox'
  | 'atmosphere_polytropic'
  | 'hydrostatics_manometer'
  | 'submerged_gate'
  | 'archimedes'
  | 'particle_deformations'
  | 'continuity_differential'
  | 'euler_bernoulli'
  | 'navier_stokes_reduction'
  | 'dimensional_collapse'
  | 'buckingham_pi'
  | 'dimensionless_numbers'
  | 'similarity_scaling'
  | 'affinity_laws'
  | 'entrance_length'
  | 'laminar_turbulent'
  | 'turbulent_sublayer'
  | 'moody_chart'
  | 'moody_losses'
  | 'pipe_design_cases'
  | 'pump_system_energy'
  | 'pump_npsh'
  | 'cavitation_suction'
  | 'venturi_usm'
  | 'euler_impeller';

export interface FormulaSymbol {
  symbol: string;
  meaning: string;
  unit: string;
}

export interface FormulaEntry {
  name: string;
  expr: string;
  whenValid: string;
  symbols: FormulaSymbol[];
}

export interface WorkedExercise {
  id: string;
  title: string;
  source: string;
  statement: string;
  step1DataSI: string[];
  step2Physics: string[];
  step3Math: string[];
  step4Conclusion: string;
}

export interface LectureSlide {
  id: string;
  slideNumber: number;
  title: string;
  subtitle: string;
  simpleExplanation: {
    analogyTitle: string;
    body: string;
  };
  logicalWalkthrough: string[];
  formulas: FormulaEntry[];
  diagramType: SlideDiagramType;
  diagramCaption: string;
  workedExercises?: WorkedExercise[];
  tableData?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
  professorStepByStep: string[];
  physicalWhy: string;
  certamenTips: string[];
}

export interface LectureUnit {
  id: string;
  unitNumber: number;
  title: string;
  shortTitle: string;
  reference: string;
  summary: string;
  slides: LectureSlide[];
}
