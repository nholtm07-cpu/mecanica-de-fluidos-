export type USMRole = 'ceo_admin' | 'profesor' | 'estudiante';

export interface USMAuthSession {
  userId: string;
  email: string;
  fullName: string;
  role: USMRole;
  authorized: boolean;
  token: string;
}

export interface USMExamAttempt {
  attemptId: string;
  timestamp: string;
  scorePercent: number;
  gradeChile: number; // 1.0 - 7.0
  correctCount: number;
  totalCount: number;
  mode: 'conceptual' | 'numerico' | 'mixto';
}

export interface USMStudentTelemetry {
  userId: string;
  email: string;
  fullName: string;
  role: USMRole;
  moduleId: 'mec120_fluidos';
  studySeconds: number;
  slidesViewed: string[];
  simulatorsExplored: string[];
  sandboxRuns: number;
  exercisesSolved: number;
  examAttempts: USMExamAttempt[];
  lastScorePercent: number | null;
  lastGradeChile: number | null;
  lastUpdated: string;
}

export type USMModuleRoute = 'hub' | 'termica' | 'admin_ceo' | 'fluidos';

export interface FluidMechanicsModuleProps {
  session?: USMAuthSession | null;
  onNavigate?: (target: USMModuleRoute) => void;
}

export const USM_SESSION_KEY = 'USM_AUTH_SESSION';
export const USM_TELEMETRY_KEY = 'USM_STUDENT_TELEMETRY';

export const PREVIEW_ADMIN_SESSION: USMAuthSession = {
  userId: 'usr-ceo-001',
  email: 'admin.mec120@usm.cl',
  fullName: 'Prof. / Admin Vista Previa',
  role: 'ceo_admin',
  authorized: true,
  token: 'usm-preview-ceo-token-mec120',
};

export const PREVIEW_STUDENT_SESSION: USMAuthSession = {
  userId: 'usr-est-120',
  email: 'estudiante.mec120@sansano.usm.cl',
  fullName: 'Estudiante Sansano (MEC120)',
  role: 'estudiante',
  authorized: true,
  token: 'usm-preview-student-token-mec120',
};

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function readAuthSession(externalSession?: USMAuthSession | null): {
  session: USMAuthSession;
  isPreviewFallback: boolean;
} {
  if (externalSession && externalSession.userId) {
    return { session: externalSession, isPreviewFallback: false };
  }

  if (isBrowser()) {
    try {
      const raw = window.localStorage.getItem(USM_SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as USMAuthSession;
        if (parsed && parsed.userId && parsed.role) {
          return { session: parsed, isPreviewFallback: false };
        }
      }
    } catch {
      // Ignore malformed storage and fall back to preview session
    }
  }

  return { session: PREVIEW_ADMIN_SESSION, isPreviewFallback: true };
}

export function writePreviewSession(role: 'ceo_admin' | 'estudiante'): USMAuthSession {
  const nextSession = role === 'ceo_admin' ? PREVIEW_ADMIN_SESSION : PREVIEW_STUDENT_SESSION;
  if (isBrowser()) {
    try {
      window.localStorage.setItem(USM_SESSION_KEY, JSON.stringify(nextSession));
    } catch {
      // Storage quota or privacy mode fallback
    }
  }
  return nextSession;
}

export function createDefaultTelemetry(session: USMAuthSession): USMStudentTelemetry {
  return {
    userId: session.userId,
    email: session.email,
    fullName: session.fullName,
    role: session.role,
    moduleId: 'mec120_fluidos',
    studySeconds: 0,
    slidesViewed: [],
    simulatorsExplored: [],
    sandboxRuns: 0,
    exercisesSolved: 0,
    examAttempts: [],
    lastScorePercent: null,
    lastGradeChile: null,
    lastUpdated: new Date().toISOString(),
  };
}

export function readStudentTelemetry(session: USMAuthSession): USMStudentTelemetry {
  if (!isBrowser()) {
    return createDefaultTelemetry(session);
  }
  try {
    const raw = window.localStorage.getItem(USM_TELEMETRY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as USMStudentTelemetry;
      if (parsed && parsed.moduleId === 'mec120_fluidos') {
        return {
          ...createDefaultTelemetry(session),
          ...parsed,
          userId: session.userId,
          email: session.email,
          fullName: session.fullName,
          role: session.role,
        };
      }
    }
  } catch {
    // Fallback cleanly
  }
  return createDefaultTelemetry(session);
}

export function publishStudentTelemetry(telemetry: USMStudentTelemetry): USMStudentTelemetry {
  const payload: USMStudentTelemetry = {
    ...telemetry,
    lastUpdated: new Date().toISOString(),
  };

  if (isBrowser()) {
    try {
      window.localStorage.setItem(USM_TELEMETRY_KEY, JSON.stringify(payload));
      window.dispatchEvent(
        new CustomEvent<USMStudentTelemetry>('USM_TELEMETRY_UPDATE', {
          detail: payload,
        })
      );
    } catch {
      // Ignore storage errors
    }
  }
  return payload;
}

export function dispatchHubNavigation(
  target: USMModuleRoute,
  onNavigate?: (target: USMModuleRoute) => void
): boolean {
  if (onNavigate) {
    onNavigate(target);
    return true;
  }
  if (isBrowser()) {
    window.dispatchEvent(
      new CustomEvent<{ target: USMModuleRoute; source: string }>('USM_NAVIGATE_HUB', {
        detail: { target, source: 'mec120_fluidos' },
      })
    );
  }
  return false;
}
