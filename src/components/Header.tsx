import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { Phone, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#090a0d]/90 backdrop-blur-md border-white/10 py-3 shadow-2xl'
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single Text Element) */}
          <a
            href="#"
            className="flex items-center gap-2 text-xl sm:text-2xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
          >
            <span className="w-2.5 h-2.5 bg-orange-500 rounded-none group-hover:scale-125 transition-transform" />
            <span className="font-display tracking-widest">{SITE_CONFIG.brandName}</span>
          </a>

          {/* Zone 2: Navigation Links (Single-line, 4-5 items) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a
              href="#disassembly"
              className="hover:text-orange-400 transition-colors whitespace-nowrap shrink-0"
            >
              Анатомия 3D
            </a>
            <a
              href="#services"
              className="hover:text-orange-400 transition-colors whitespace-nowrap shrink-0"
            >
              Услуги
            </a>
            <a
              href="#process"
              className="hover:text-orange-400 transition-colors whitespace-nowrap shrink-0"
            >
              Процесс
            </a>
            <a
              href="#why-details"
              className="hover:text-orange-400 transition-colors whitespace-nowrap shrink-0"
            >
              Инженерия
            </a>
            <a
              href="#about"
              className="hover:text-orange-400 transition-colors whitespace-nowrap shrink-0"
            >
              О сервисе
            </a>
            <a
              href="#contacts"
              className="hover:text-orange-400 transition-colors whitespace-nowrap shrink-0"
            >
              Контакты
            </a>
          </nav>

          {/* Zone 3: Primary Action (Real Direct Phone Call) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={SITE_CONFIG.contacts.phoneHref}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 transition-all rounded shadow-lg shadow-orange-900/30 whitespace-nowrap shrink-0 border border-orange-400/30 active:scale-95"
              aria-label={`Позвонить в ${SITE_CONFIG.brandName}`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.contacts.phoneDisplay}</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white rounded border border-white/10"
              aria-label="Открыть мобильное меню"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-lg flex flex-col justify-center px-8 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex flex-col gap-6 text-xl font-display uppercase tracking-wider text-neutral-200">
            <a
              href="#disassembly"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-orange-400 transition-colors py-2 border-b border-white/10"
            >
              01 // Анатомия 3D
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-orange-400 transition-colors py-2 border-b border-white/10"
            >
              02 // Услуги
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-orange-400 transition-colors py-2 border-b border-white/10"
            >
              03 // Процесс
            </a>
            <a
              href="#why-details"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-orange-400 transition-colors py-2 border-b border-white/10"
            >
              04 // Инженерия
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-orange-400 transition-colors py-2 border-b border-white/10"
            >
              05 // О сервисе
            </a>
            <a
              href="#contacts"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-orange-400 transition-colors py-2 border-b border-white/10"
            >
              06 // Контакты
            </a>

            <div className="pt-6">
              <a
                href={SITE_CONFIG.contacts.phoneHref}
                className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded text-base text-center"
              >
                <Phone className="w-5 h-5" />
                <span>Позвонить: {SITE_CONFIG.contacts.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
