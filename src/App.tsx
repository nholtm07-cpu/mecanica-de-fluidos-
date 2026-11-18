import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FluidMechanicsModuleProps,
  USMAuthSession,
  USMExamAttempt,
  USMModuleRoute,
  USMStudentTelemetry,
  dispatchHubNavigation,
  publishStudentTelemetry,
  readAuthSession,
  readStudentTelemetry,
  writePreviewSession,
} from './bridge/USMPlatformBridge';
import { AppMode, HeaderBar } from './components/HeaderBar';
import { LectureMode } from './components/LectureMode';
import { SimulatorCaseId, SimulatorMode } from './components/SimulatorMode';
import { SandboxMode } from './components/SandboxMode';
import { ExamMode } from './components/ExamMode';
import { X } from 'lucide-react';

export const FluidMechanicsModule: React.FC<FluidMechanicsModuleProps> = ({
  session: externalSession,
  onNavigate,
}) => {
  const initialAuth = readAuthSession(externalSession);
  const [session, setSession] = useState<USMAuthSession>(initialAuth.session);
  const [isPreviewFallback, setIsPreviewFallback] = useState<boolean>(initialAuth.isPreviewFallback);

  const [activeMode, setActiveMode] = useState<AppMode>(() => {
    if (typeof window !== 'undefined') {
      const m = new URLSearchParams(window.location.search).get('mode');
      if (m === 'simuladores' || m === 'sandbox' || m === 'evaluacion' || m === 'catedra') {
        return m;
      }
    }
    return 'catedra';
  });

  const [telemetry, setTelemetry] = useState<USMStudentTelemetry>(() =>
    readStudentTelemetry(initialAuth.session)
  );
  const telemetryRef = useRef<USMStudentTelemetry>(telemetry);
  telemetryRef.current = telemetry;

  const [hubNotice, setHubNotice] = useState<string | null>(null);

  // Sync if parent passes an updated external session prop
  useEffect(() => {
    if (externalSession && externalSession.userId) {
      setSession(externalSession);
      setIsPreviewFallback(false);
      setTelemetry(readStudentTelemetry(externalSession));
    }
  }, [externalSession]);

  // 1-second study timer; persists & dispatches USM_TELEMETRY_UPDATE every 5 seconds
  useEffect(() => {
    const interval = window.setInterval(() => {
      setTelemetry((prev) => {
        const next: USMStudentTelemetry = {
          ...prev,
          studySeconds: prev.studySeconds + 1,
        };
        if (next.studySeconds % 5 === 0) {
          publishStudentTelemetry(next);
        }
        return next;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
      publishStudentTelemetry(telemetryRef.current);
    };
  }, []);

  const commitTelemetry = useCallback((updater: (prev: USMStudentTelemetry) => USMStudentTelemetry) => {
    setTelemetry((prev) => {
      const next = updater(prev);
      return publishStudentTelemetry(next);
    });
  }, []);

  const handleTogglePreviewRole = () => {
    const nextRole = session.role === 'ceo_admin' ? 'estudiante' : 'ceo_admin';
    const nextSession = writePreviewSession(nextRole);
    setSession(nextSession);
    setIsPreviewFallback(false);
    commitTelemetry((prev) => ({
      ...prev,
      userId: nextSession.userId,
      email: nextSession.email,
      fullName: nextSession.fullName,
      role: nextSession.role,
    }));
  };

  const handleNavigateHub = (target: USMModuleRoute) => {
    publishStudentTelemetry(telemetryRef.current);
    const handledByHost = dispatchHubNavigation(target, onNavigate);
    if (!handledByHost) {
      setHubNotice(
        'Evento USM_NAVIGATE_HUB emitido y telemetría sincronizada en USM_STUDENT_TELEMETRY. Al conectar la Parte 2 (Termodinámica) y Parte 3 (Panel CEO) en VS Code, este botón navegará al Hub Principal.'
      );
    }
  };

  const handleSlideViewed = useCallback(
    (slideId: string) => {
      commitTelemetry((prev) => {
        if (prev.slidesViewed.includes(slideId)) return prev;
        return {
          ...prev,
          slidesViewed: [...prev.slidesViewed, slideId],
        };
      });
    },
    [commitTelemetry]
  );

  const handleSimulatorExplored = useCallback(
    (caseId: SimulatorCaseId) => {
      commitTelemetry((prev) => {
        if (prev.simulatorsExplored.includes(caseId)) return prev;
        return {
          ...prev,
          simulatorsExplored: [...prev.simulatorsExplored, caseId],
          exercisesSolved: prev.exercisesSolved + 1,
        };
      });
    },
    [commitTelemetry]
  );

  const sandboxThrottleRef = useRef<number>(0);
  const handleSandboxRun = useCallback(() => {
    const now = Date.now();
    if (now - sandboxThrottleRef.current < 1500) return;
    sandboxThrottleRef.current = now;
    commitTelemetry((prev) => ({
      ...prev,
      sandboxRuns: prev.sandboxRuns + 1,
    }));
  }, [commitTelemetry]);

  const handleExamEvaluated = useCallback(
    (attemptData: Omit<USMExamAttempt, 'attemptId' | 'timestamp'>) => {
      const newAttempt: USMExamAttempt = {
        ...attemptData,
        attemptId: `att-${Date.now()}`,
        timestamp: new Date().toISOString(),
      };
      commitTelemetry((prev) => ({
        ...prev,
        exercisesSolved: prev.exercisesSolved + attemptData.correctCount,
        examAttempts: [newAttempt, ...prev.examAttempts].slice(0, 20),
        lastScorePercent: attemptData.scorePercent,
        lastGradeChile: attemptData.gradeChile,
      }));
    },
    [commitTelemetry]
  );

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col">
      <HeaderBar
        activeMode={activeMode}
        onSelectMode={setActiveMode}
        session={session}
        isPreviewFallback={isPreviewFallback}
        onTogglePreviewRole={handleTogglePreviewRole}
        onNavigateHub={handleNavigateHub}
        telemetry={telemetry}
      />

      {hubNotice && (
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 pt-4">
          <div
            role="status"
            className="rounded-xl bg-sky-950/50 border border-sky-500/50 px-4 py-3 flex items-center justify-between gap-4 text-xs sm:text-sm text-sky-100"
          >
            <span>{hubNotice}</span>
            <button
              type="button"
              aria-label="Cerrar aviso de navegación"
              onClick={() => setHubNotice(null)}
              className="p-1 rounded hover:bg-sky-900/60 text-sky-300 cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6">
        {activeMode === 'catedra' && <LectureMode onSlideViewed={handleSlideViewed} />}
        {activeMode === 'simuladores' && (
          <SimulatorMode onSimulatorExplored={handleSimulatorExplored} />
        )}
        {activeMode === 'sandbox' && <SandboxMode onSandboxRun={handleSandboxRun} />}
        {activeMode === 'evaluacion' && (
          <ExamMode
            examAttempts={telemetry.examAttempts}
            onExamEvaluated={handleExamEvaluated}
          />
        )}
      </main>
    </div>
  );
};

export default function App() {
  return <FluidMechanicsModule />;
}
