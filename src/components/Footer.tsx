import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="font-display font-bold text-base text-white tracking-widest uppercase">
            {SITE_CONFIG.brandName}
          </div>
          <span className="hidden sm:inline text-neutral-600">/</span>
          <span className="text-neutral-400">{SITE_CONFIG.tagline}</span>
        </div>

        {/* Quick Nav & Back to Top */}
        <div className="flex items-center gap-6">
          <a href="#disassembly" className="hover:text-white transition-colors">
            Анатомия
          </a>
          <a href="#services" className="hover:text-white transition-colors">
            Услуги
          </a>
          <a href="#process" className="hover:text-white transition-colors">
            Процесс
          </a>
          <a href="#contacts" className="hover:text-white transition-colors">
            Контакты
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors border border-white/10"
            aria-label="Наверх страницы"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
        <div>
          © {new Date().getFullYear()} {SITE_CONFIG.brandName}. Все права защищены.
        </div>
        <div className="font-mono">
          ENGINEERED WITH THREE.JS &amp; GSAP SCROLLTRIGGER
        </div>
      </div>
    </footer>
  );
};
