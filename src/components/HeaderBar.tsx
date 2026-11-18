import React from 'react';
import { ArrowLeftRight, BookOpen, FlaskConical, Sliders, ClipboardCheck, UserCheck } from 'lucide-react';
import { USMAuthSession, USMModuleRoute, USMStudentTelemetry } from '../bridge/USMPlatformBridge';

export type AppMode = 'catedra' | 'simuladores' | 'sandbox' | 'evaluacion';

interface HeaderBarProps {
  activeMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  session: USMAuthSession;
  isPreviewFallback: boolean;
  onTogglePreviewRole: () => void;
  onNavigateHub: (target: USMModuleRoute) => void;
  telemetry: USMStudentTelemetry;
}

const NAV_ITEMS: { id: AppMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'catedra', label: 'Cátedra', icon: BookOpen },
  { id: 'simuladores', label: 'Simuladores', icon: FlaskConical },
  { id: 'sandbox', label: 'Sandbox', icon: Sliders },
  { id: 'evaluacion', label: 'Evaluación', icon: ClipboardCheck },
];

export const HeaderBar: React.FC<HeaderBarProps> = ({
  activeMode,
  onSelectMode,
  session,
  isPreviewFallback,
  onTogglePreviewRole,
  onNavigateHub,
  telemetry,
}) => {
  const studyMinutes = Math.floor(telemetry.studySeconds / 60);
  const studySecs = telemetry.studySeconds % 60;
  const formattedTime = `${String(studyMinutes).padStart(2, '0')}:${String(studySecs).padStart(2, '0')}`;

  return (
    <div className="sticky top-0 z-40 bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-800/90">
      {/* 3-Zone Top Bar Contract */}
      <header className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Title */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onSelectMode('catedra');
          }}
          className="font-display text-lg font-bold tracking-tight text-slate-100 whitespace-nowrap shrink-0 hover:text-sky-300 transition-colors"
        >
          FluidoTermo Lab
        </a>

        {/* Zone 2: 4 Clean Single-Line Navigation Links */}
        <nav aria-label="Navegación principal del módulo" className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = activeMode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectMode(item.id)}
                className={`relative py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-sky-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-[1px] h-0.5 bg-sky-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={() => onNavigateHub('hub')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs sm:text-sm font-medium text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowLeftRight className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="hidden lg:inline">Volver al Hub Principal (Cambiar a Termodinámica / Panel CEO)</span>
            <span className="lg:hidden">Volver al Hub Principal</span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Row */}
      <nav aria-label="Navegación móvil" className="md:hidden border-t border-slate-800/80 px-2 py-1.5 grid grid-cols-4 gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeMode === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectMode(item.id)}
              className={`inline-flex items-center justify-center gap-1 px-1.5 py-1.5 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Workspace Control & USMPlatformBridge Ribbon */}
      <div className="bg-[#0F1521] border-t border-slate-800/70">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-200 font-medium">Módulo 1: Mecánica de Fluidos (MEC120 · UTFSM)</span>
            <span aria-hidden="true">·</span>
            <span>{session.fullName}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-sky-400">
              {session.role === 'ceo_admin'
                ? 'Rol: CEO / Admin'
                : session.role === 'profesor'
                  ? 'Rol: Profesor'
                  : 'Rol: Estudiante'}
            </span>
            {isPreviewFallback && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400">Sesión local autónoma</span>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 font-mono tabular-nums text-slate-300">
              <span>Estudio: {formattedTime}</span>
              <span aria-hidden="true" className="text-slate-600">|</span>
              <span>Resueltos: {telemetry.exercisesSolved}</span>
              {telemetry.lastGradeChile !== null && (
                <>
                  <span aria-hidden="true" className="text-slate-600">|</span>
                  <span className="text-emerald-400">Última nota: {telemetry.lastGradeChile.toFixed(1)}</span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={onTogglePreviewRole}
              data-testid="toggle-preview-role"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>
                Modo Vista Previa ({session.role === 'ceo_admin' ? 'Admin' : 'Alumno'})
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
