import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { Camera, CheckCircle2, Cpu, Wrench, Shield, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#090a0d] border-t border-white/5">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 pb-8 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 tracking-widest uppercase mb-3">
              <span>05 // ТЕХЦЕНТР И СТАНДАРТЫ</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase leading-none max-w-2xl">
              ВАШ АВТОМОБИЛЬ. НАША РАБОТА.
            </h2>
          </div>
          <div className="text-xs font-mono text-neutral-400 border border-white/10 bg-[#111319] px-3 py-1.5 rounded self-start md:self-auto">
            ИНЖЕНЕРНЫЙ ЦЕНТР // ПРЕМИУМ СЕРВИС
          </div>
        </div>

        {/* 4 Pillars of Integrity (Real, non-hallucinated service standards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-[#111318] p-6 rounded border border-white/10">
            <Camera className="w-5 h-5 text-orange-400 mb-4" />
            <div className="text-base font-bold font-display uppercase text-white mb-2">
              Фото- и видеоотчеты
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Мастер фиксирует состояние узлов до и после демонтажа и отправляет в мессенджер с пояснениями.
            </p>
          </div>

          <div className="bg-[#111318] p-6 rounded border border-white/10">
            <Shield className="w-5 h-5 text-orange-400 mb-4" />
            <div className="text-base font-bold font-display uppercase text-white mb-2">
              Защита салона
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Перед заездом на пост руль, сиденье, селектор КПП и крылья закрываются одноразовыми защитными чехлами.
            </p>
          </div>

          <div className="bg-[#111318] p-6 rounded border border-white/10">
            <Wrench className="w-5 h-5 text-orange-400 mb-4" />
            <div className="text-base font-bold font-display uppercase text-white mb-2">
              Возврат деталей
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Все снятые старые детали упаковываются и отдаются владельцу авто для наглядности износа.
            </p>
          </div>

          <div className="bg-[#111318] p-6 rounded border border-white/10">
            <Cpu className="w-5 h-5 text-orange-400 mb-4" />
            <div className="text-base font-bold font-display uppercase text-white mb-2">
              Дилерские базы
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Работаем строго по сервисным инструкциям производителей с регламентированными моментами затяжки.
            </p>
          </div>
        </div>

        {/* Equipment & Workshop Specifications Showcase */}
        <div className="bg-[#11141c] border border-white/10 rounded-lg p-6 sm:p-10 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="text-xs font-mono text-orange-400 uppercase tracking-widest mb-2">
                ПРИБОРНАЯ БАЗА ТЕХЦЕНТРА
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display uppercase text-white">
                Профессиональное оборудование цеха
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              Поверка приборов: 2026 Q3 // Допуски ГОСТ / DIN
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="flex items-start gap-3 p-4 bg-[#151924] rounded border border-white/5">
              <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-1">Подъемное оборудование:</strong>
                <span className="text-neutral-400 text-xs">
                  {SITE_CONFIG.workshopSpecs.liftsCount}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#151924] rounded border border-white/5">
              <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-1">Стенд регулировки углов колес:</strong>
                <span className="text-neutral-400 text-xs">
                  {SITE_CONFIG.workshopSpecs.alignmentStand}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#151924] rounded border border-white/5">
              <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-1">Агрегатный чистый бокс:</strong>
                <span className="text-neutral-400 text-xs">
                  {SITE_CONFIG.workshopSpecs.cleanRoom}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#151924] rounded border border-white/5">
              <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-1">Специализированный инструмент:</strong>
                <span className="text-neutral-400 text-xs">
                  {SITE_CONFIG.workshopSpecs.tooling}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Customizable Workshop / Team Gallery Slots */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="group relative h-64 rounded-lg bg-[#141720] border border-white/10 flex flex-col justify-end p-6 overflow-hidden">
            <div className="absolute inset-0 bg-radial-vignette opacity-70" />
            <div className="relative z-10">
              <div className="text-xs font-mono text-orange-400 uppercase mb-1">Зона 01</div>
              <div className="text-lg font-bold text-white uppercase font-display">
                Диагностический пост
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                Пост первичной инструментальной дефектовки
              </div>
            </div>
          </div>

          <div className="group relative h-64 rounded-lg bg-[#141720] border border-white/10 flex flex-col justify-end p-6 overflow-hidden">
            <div className="absolute inset-0 bg-radial-vignette opacity-70" />
            <div className="relative z-10">
              <div className="text-xs font-mono text-orange-400 uppercase mb-1">Зона 02</div>
              <div className="text-lg font-bold text-white uppercase font-display">
                Агрегатный участок
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                Прецизионная сборка двигателей и коробок передач
              </div>
            </div>
          </div>

          <div className="group relative h-64 rounded-lg bg-[#141720] border border-white/10 flex flex-col justify-end p-6 overflow-hidden">
            <div className="absolute inset-0 bg-radial-vignette opacity-70" />
            <div className="relative z-10">
              <div className="text-xs font-mono text-orange-400 uppercase mb-1">Зона 03</div>
              <div className="text-lg font-bold text-white uppercase font-display">
                Слесарный цех
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                Ремонт подвески, тормозных систем и сход-развал
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
