import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { Phone, ArrowDown, MapPin, Clock, Compass } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-radial-vignette bg-tech-grid overflow-hidden">
      {/* Decorative Technical Crosshairs & Coordinates */}
      <div className="absolute top-28 left-8 text-[11px] font-mono text-neutral-500 tracking-wider hidden md:block">
        SYS_ID: APX-MOTORWORKS // LAT 55.7058 // LON 37.6432
      </div>
      <div className="absolute top-28 right-8 text-[11px] font-mono text-neutral-500 tracking-wider hidden md:block">
        PRECISION LEVEL: &lt; 0.005 MM // ISO 9001 SPEC
      </div>

      {/* Hero Ambient Glow & Light Sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange-600/10 blur-[140px] rounded-full" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12 flex flex-col justify-center items-start">
        {/* Subtle Category Kicker */}
        <div className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-widest text-orange-400 uppercase mb-6">
          <span className="w-8 h-px bg-orange-500" />
          <span>{SITE_CONFIG.brandName} // ИНЖЕНЕРНЫЙ ЦЕНТР</span>
        </div>

        {/* Hero Title (Large, Authoritative Typography) */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight text-white uppercase leading-[0.95] max-w-4xl mb-8">
          {SITE_CONFIG.hero.titleLine1}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
            {SITE_CONFIG.hero.titleLine2}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl text-neutral-300 max-w-2xl font-light leading-relaxed mb-10 text-balance">
          {SITE_CONFIG.hero.subtitle}
        </p>

        {/* Call to Actions (Pure Direct Phone Call + Scroll Down) */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-16">
          <a
            href={SITE_CONFIG.contacts.phoneHref}
            className="inline-flex items-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded text-base sm:text-lg shadow-2xl shadow-orange-950/60 transition-all border border-orange-400/40 active:scale-95 group"
          >
            <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Позвонить мастеру</span>
          </a>

          <a
            href="#disassembly"
            className="inline-flex items-center gap-2 px-7 py-4 bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white font-medium rounded text-base sm:text-lg border border-white/10 transition-all backdrop-blur-sm"
          >
            <Compass className="w-5 h-5 text-orange-400" />
            <span>Исследовать сервис</span>
          </a>
        </div>

        {/* Key Trust Signals (No Fictional Stats, Just Workshop Guarantees) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10 w-full max-w-4xl text-sm">
          <div>
            <div className="text-white font-semibold mb-1">Дилерская точность</div>
            <div className="text-neutral-400 text-xs">
              Специнструмент и калиброванные моментные ключи с фиксацией в протоколе
            </div>
          </div>
          <div>
            <div className="text-white font-semibold mb-1">Прозрачная смета</div>
            <div className="text-neutral-400 text-xs">
              Никаких скрытых доплат: согласование каждого узла до начала работ
            </div>
          </div>
          <div>
            <div className="text-white font-semibold mb-1">Возврат старых деталей</div>
            <div className="text-neutral-400 text-xs">
              Все демонтированные узлы и расходники передаются владельцу авто
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Hours, Address & Animated Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-neutral-400">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-400 shrink-0" />
            <span>{SITE_CONFIG.contacts.workingHours}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
            <span>{SITE_CONFIG.contacts.address}</span>
          </div>
        </div>

        {/* Animated Scroll Down Indicator */}
        <a
          href="#disassembly"
          className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group"
        >
          <span className="font-mono uppercase tracking-wider text-[11px]">Прокрутите к анатомии</span>
          <div className="w-7 h-11 rounded-full border border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2.5 bg-orange-500 rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};
