import React, { useState } from 'react';
import { SITE_CONFIG, ServiceItem } from '../config/siteConfig';
import { ServiceModal } from './ServiceModal';
import { ArrowUpRight, Wrench, ShieldCheck, Phone } from 'lucide-react';
import {
  DiagnosticsSchematic,
  EngineSchematic,
  ElectricSchematic,
  SuspensionSchematic,
  BrakesSchematic,
  MaintenanceSchematic,
} from '../three/svgDrawings';

export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const renderCardGraphic = (category: string) => {
    switch (category) {
      case 'diagnostics':
        return <DiagnosticsSchematic className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105" />;
      case 'engine':
        return <EngineSchematic className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105" />;
      case 'electric':
        return <ElectricSchematic className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105" />;
      case 'chassis':
        return <SuspensionSchematic className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105" />;
      case 'brakes':
        return <BrakesSchematic className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105" />;
      case 'maintenance':
        return <MaintenanceSchematic className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105" />;
      default:
        return null;
    }
  };

  return (
    <section id="services" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0b0c10] border-t border-white/5">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 tracking-widest uppercase mb-3">
              <span>02 // ТЕХНИЧЕСКАЯ ГАЛЕРЕЯ</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase leading-none max-w-2xl">
              ИНЖЕНЕРНЫЙ ПОДХОД К КАЖДОМУ УЗЛУ.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-400 max-w-md font-light leading-relaxed">
            Мы рассматриваем автомобиль как взаимосвязанный комплекс систем. Выберите узел для изучения карты диагностики и применяемого оборудования.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SITE_CONFIG.services.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedService(item)}
              className="group relative bg-[#111319] hover:bg-[#141720] border border-white/10 hover:border-orange-500/50 rounded-lg p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-950/20"
            >
              <div>
                {/* Card Top: Number & Details Icon */}
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4">
                  <span className="text-orange-400 font-bold tracking-wider">{item.number}</span>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-400 group-hover:text-orange-400 transition-colors">
                    <span>Спецификация</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Vector Schematic Visual Frame */}
                <div className="mb-5 overflow-hidden rounded bg-[#0b0c10] border border-white/5">
                  {renderCardGraphic(item.category)}
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold font-display uppercase text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {item.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                  {item.shortDesc}
                </p>
              </div>

              {/* Card Footer: Action button */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3 text-xs">
                <span className="font-mono text-neutral-500">
                  Время: <span className="text-neutral-300">{item.duration}</span>
                </span>
                <span className="text-orange-400 font-medium group-hover:underline">
                  Раскрыть карту ›
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Call Assistance Bar */}
        <div className="mt-16 bg-[#13151d] border border-white/10 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-orange-600/10 border border-orange-500/30 flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <div className="text-white font-semibold text-base mb-1">
                Нужна нестандартная диагностика или узкопрофильный ремонт?
              </div>
              <div className="text-xs text-neutral-400">
                Свяжитесь напрямую с шеф-механиком для технической консультации.
              </div>
            </div>
          </div>

          <a
            href={SITE_CONFIG.contacts.phoneHref}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded text-sm whitespace-nowrap shrink-0 transition-all shadow-lg shadow-orange-950/40 active:scale-95"
          >
            <Phone className="w-4 h-4" />
            <span>{SITE_CONFIG.contacts.phoneDisplay}</span>
          </a>
        </div>
      </div>

      {/* Interactive Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
};
