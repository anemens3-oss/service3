import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { AlertCircle, CheckCircle, Crosshair, HelpCircle } from 'lucide-react';

export const WhyDetailsMatter: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState(SITE_CONFIG.rootCauseAnalysis[0].id);

  const activeCase =
    SITE_CONFIG.rootCauseAnalysis.find((c) => c.id === selectedCaseId) ||
    SITE_CONFIG.rootCauseAnalysis[0];

  return (
    <section id="why-details" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0b0d12] border-t border-white/5">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 pb-8 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-orange-400 tracking-widest uppercase mb-3">
            <span>04 // ПРЕЦИЗИОННАЯ ИНЖЕНЕРИЯ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase leading-none max-w-4xl mb-6">
            НЕ ПРОСТО УСТРАНИТЬ СИМПТОМ.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">
              НАЙТИ ПРИЧИНУ.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl font-light leading-relaxed">
            Большинство повторных поломок происходит потому, что заменяется деталь, которая пострадала последней, а не первичный источник неисправности. Мы устраняем причину.
          </p>
        </div>

        {/* Case Study Switcher Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {SITE_CONFIG.rootCauseAnalysis.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              className={`px-5 py-3 rounded text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
                selectedCaseId === c.id
                  ? 'bg-orange-600 text-white border-orange-500 shadow-xl shadow-orange-950/30'
                  : 'bg-[#12151e] text-neutral-300 border-white/10 hover:border-white/20'
              }`}
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>Кейс 0{idx + 1}: {c.symptom.slice(0, 32)}...</span>
            </button>
          ))}
        </div>

        {/* Comparison Showcase Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#10131a] border border-white/10 rounded-lg p-6 sm:p-10 shadow-2xl">
          {/* Left: Symptom Callout */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Зафиксированная жалоба владельца:
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display uppercase text-white mb-6">
                «{activeCase.symptom}»
              </h3>

              {/* Surface Fix Warning Card */}
              <div className="bg-red-950/20 border border-red-500/30 rounded p-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase font-semibold mb-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Поверхностное решение (как делают обычно)</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {activeCase.quickFix}
                </p>
              </div>
            </div>

            {/* Micro Tolerance Badge */}
            <div className="p-4 bg-[#161a24] rounded border border-white/10">
              <div className="text-[11px] font-mono text-neutral-400 uppercase mb-1">
                Инструментальный допуск APEX:
              </div>
              <div className="text-base sm:text-lg font-mono font-bold text-orange-400">
                {activeCase.tolerance}
              </div>
            </div>
          </div>

          {/* Right: Root Cause Elimination */}
          <div className="lg:col-span-7 bg-[#151922] p-6 sm:p-8 rounded border border-orange-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-wider mb-3">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Инженерная локализация первопричины</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold font-display uppercase text-white mb-4">
                Устранение корня проблемы
              </h4>

              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-light mb-6">
                {activeCase.rootCause}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-neutral-400 font-mono">
                Используется: цифровой стрелочный индикатор часового типа и эндоскоп
              </div>
              <a
                href={SITE_CONFIG.contacts.phoneHref}
                className="text-xs font-semibold text-orange-400 hover:text-orange-300 underline underline-offset-4"
              >
                Проконсультироваться по похожей проблеме ›
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
