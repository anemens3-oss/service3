import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { CheckCircle2, ChevronRight, Activity, FileText, Wrench, Shield } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const stepIcons = [Activity, Activity, FileText, Wrench, Shield];

  return (
    <section id="process" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#090a0d] border-t border-white/5">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 pb-8 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-orange-400 tracking-widest uppercase mb-3">
            <span>03 // ВНУТРИ ПРОЦЕССА</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase leading-none max-w-3xl mb-4">
            ПОСЛЕДОВАТЕЛЬНОСТЬ ИНЖЕНЕРНОГО РЕМОНТА
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl font-light leading-relaxed">
            Качественное обслуживание исключает случайности. Каждый автомобиль проходит через 5 фиксированных технологических контрольных пунктов.
          </p>
        </div>

        {/* Interactive Step Navigator Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
          {SITE_CONFIG.processSteps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded border text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#151821] border-orange-500 shadow-xl shadow-orange-950/20'
                    : 'bg-[#101217] border-white/10 hover:border-white/20 text-neutral-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-orange-400' : 'text-neutral-500'}`}>
                    {step.number}
                  </span>
                  {isActive && <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />}
                </div>
                <div className={`text-xs sm:text-sm font-semibold truncate ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown Panel */}
        <div className="relative bg-[#111319] border border-white/10 rounded-lg p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Number & Main Description */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 text-xs font-mono text-orange-400 uppercase tracking-widest mb-4">
                <span>ЭТАП {SITE_CONFIG.processSteps[activeStepIndex].number} ИЗ 05</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black font-display uppercase text-white mb-6">
                {SITE_CONFIG.processSteps[activeStepIndex].title}
              </h3>

              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-8">
                {SITE_CONFIG.processSteps[activeStepIndex].description}
              </p>

              {/* Progress Stepper Line */}
              <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-orange-500 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${((activeStepIndex + 1) / SITE_CONFIG.processSteps.length) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>Входной контроль</span>
                <span>Выдача клиенту</span>
              </div>
            </div>

            {/* Right Column: Execution Checklist */}
            <div className="lg:col-span-5 bg-[#161922] p-6 rounded border border-white/10">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
                Обязательный протокол этапа:
              </div>

              <ul className="space-y-4">
                {SITE_CONFIG.processSteps[activeStepIndex].details.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-200">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Step Navigation Buttons */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="text-xs text-neutral-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  ← Предыдущий шаг
                </button>
                <button
                  disabled={activeStepIndex === SITE_CONFIG.processSteps.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(SITE_CONFIG.processSteps.length - 1, prev + 1))}
                  className="text-xs text-orange-400 hover:text-orange-300 disabled:opacity-30 disabled:pointer-events-none transition-colors font-semibold flex items-center gap-1"
                >
                  <span>Следующий шаг</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
