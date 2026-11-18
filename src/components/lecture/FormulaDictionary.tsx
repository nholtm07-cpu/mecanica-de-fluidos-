import React, { useState } from 'react';
import { BookOpen, ChevronDown, Info } from 'lucide-react';
import { FormulaEntry } from '../../data/lectureTypes';

interface FormulaDictionaryProps {
  formulas: FormulaEntry[];
  slideId: string;
}

export const FormulaDictionary: React.FC<FormulaDictionaryProps> = ({ formulas, slideId }) => {
  const [expandedIdx, setExpandedIdx] = useState<number>(0);
  const [activeSymbolIdx, setActiveSymbolIdx] = useState<number | null>(null);

  React.useEffect(() => {
    setExpandedIdx(0);
    setActiveSymbolIdx(null);
  }, [slideId]);

  if (!formulas.length) return null;

  return (
    <section aria-label="Diccionario de Fórmulas" className="space-y-2.5 pt-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Diccionario de Fórmulas (Anatomía Símbolo a Símbolo)
          </h3>
        </div>
        <span className="text-xs text-slate-500">
          Haz clic en una ecuación o símbolo para ver validez y unidades SI
        </span>
      </div>

      <div className="space-y-2">
        {formulas.map((eq, idx) => {
          const isOpen = expandedIdx === idx;
          return (
            <div
              key={`${slideId}-eq-${idx}`}
              className={`rounded-lg border transition-colors ${
                isOpen
                  ? 'bg-[#0B0F17] border-amber-500/40'
                  : 'bg-[#0B0F17]/75 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => {
                  setExpandedIdx(isOpen ? -1 : idx);
                  setActiveSymbolIdx(null);
                }}
                className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left cursor-pointer"
              >
                <div className="min-w-0 space-y-1">
                  <div className="text-xs font-medium text-slate-400">{eq.name}</div>
                  <div className="font-mono text-sm sm:text-base text-amber-200 break-words">
                    {eq.expr}
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                    isOpen ? 'rotate-180 text-amber-300' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-start gap-2 text-xs text-sky-200/90 bg-sky-950/25 border border-sky-500/20 rounded-md px-3 py-2">
                    <Info className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-sky-300">Cuándo es válida:</strong> {eq.whenValid}
                    </span>
                  </div>

                  {/* Interactive Symbol Selectors */}
                  <div className="flex flex-wrap gap-1.5">
                    {eq.symbols.map((sym, sIdx) => {
                      const selected = activeSymbolIdx === sIdx;
                      return (
                        <button
                          key={sIdx}
                          type="button"
                          onMouseEnter={() => setActiveSymbolIdx(sIdx)}
                          onClick={() => setActiveSymbolIdx(selected ? null : sIdx)}
                          className={`px-2.5 py-1 rounded border font-mono text-xs transition-colors cursor-pointer ${
                            selected
                              ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                              : 'bg-slate-900/90 border-slate-700 text-slate-200 hover:border-amber-500/50'
                          }`}
                        >
                          {sym.symbol}
                        </button>
                      );
                    })}
                  </div>

                  {/* Full Symbol Breakdown Table */}
                  <div className="overflow-x-auto rounded border border-slate-800/90">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="px-3 py-1.5 font-semibold">Símbolo</th>
                          <th className="px-3 py-1.5 font-semibold">Significado Físico</th>
                          <th className="px-3 py-1.5 font-semibold">Unidad SI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {eq.symbols.map((sym, sIdx) => {
                          const highlighted = activeSymbolIdx === sIdx;
                          return (
                            <tr
                              key={sIdx}
                              className={highlighted ? 'bg-amber-500/10 text-amber-100' : 'text-slate-300'}
                            >
                              <td className="px-3 py-1.5 font-mono text-amber-300 whitespace-nowrap">
                                {sym.symbol}
                              </td>
                              <td className="px-3 py-1.5">{sym.meaning}</td>
                              <td className="px-3 py-1.5 font-mono text-sky-300 whitespace-nowrap">
                                [{sym.unit}]
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
