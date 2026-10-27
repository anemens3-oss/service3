import React, { useEffect } from 'react';
import { ServiceItem, SITE_CONFIG } from '../config/siteConfig';
import { X, Phone, Clock, Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react';
import {
  DiagnosticsSchematic,
  EngineSchematic,
  ElectricSchematic,
  SuspensionSchematic,
  BrakesSchematic,
  MaintenanceSchematic,
} from '../three/svgDrawings';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  const renderSchematic = () => {
    switch (service.category) {
      case 'diagnostics':
        return <DiagnosticsSchematic className="w-full h-auto rounded border border-white/10" />;
      case 'engine':
        return <EngineSchematic className="w-full h-auto rounded border border-white/10" />;
      case 'electric':
        return <ElectricSchematic className="w-full h-auto rounded border border-white/10" />;
      case 'chassis':
        return <SuspensionSchematic className="w-full h-auto rounded border border-white/10" />;
      case 'brakes':
        return <BrakesSchematic className="w-full h-auto rounded border border-white/10" />;
      case 'maintenance':
        return <MaintenanceSchematic className="w-full h-auto rounded border border-white/10" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#101217] border border-white/15 rounded-lg shadow-2xl p-6 sm:p-8 my-8 text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded border border-white/10 hover:bg-white/5 transition-colors"
          aria-label="Закрыть окно услуги"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Technical Index */}
        <div className="flex items-center gap-3 text-xs font-mono text-orange-400 uppercase tracking-widest mb-3">
          <span>СЕКЦИЯ {service.number} // ТЕХНИЧЕСКАЯ СПЕЦИФИКАЦИЯ</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold font-display uppercase text-white mb-4">
          {service.title}
        </h3>

        {/* Vector Schematic Visual */}
        <div className="mb-6">{renderSchematic()}</div>

        {/* Full Engineering Description */}
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
          {service.fullDesc}
        </p>

        {/* Symptoms & Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Symptoms to watch for */}
          <div className="bg-[#141720] p-4 rounded border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-wider mb-3">
              <AlertTriangle className="w-4 h-4" />
              <span>Симптомы для обращения</span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-300">
              {service.symptoms.map((sym, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">›</span>
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Equipment used */}
          <div className="bg-[#141720] p-4 rounded border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-wider mb-3">
              <Wrench className="w-4 h-4" />
              <span>Применяемое оборудование</span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-300">
              {service.equipment.map((eq, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" />
                  <span>{eq}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer with Duration & Direct Phone Trigger */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
            <Clock className="w-4 h-4 text-orange-400" />
            <span>Время выполнения: <strong className="text-white">{service.duration}</strong></span>
          </div>

          <a
            href={SITE_CONFIG.contacts.phoneHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded text-sm transition-all shadow-lg shadow-orange-950/40 active:scale-95"
          >
            <Phone className="w-4 h-4" />
            <span>Позвонить мастеру</span>
          </a>
        </div>
      </div>
    </div>
  );
};
