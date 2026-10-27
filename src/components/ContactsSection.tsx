import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { Phone, MapPin, Clock, Navigation, Send, MessageSquare, Copy, Check } from 'lucide-react';

export const ContactsSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(SITE_CONFIG.contacts.phoneDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contacts" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#07080a] border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 tracking-widest uppercase mb-4">
            <span className="w-6 h-px bg-orange-500" />
            <span>06 // СВЯЗЬ С МАСТЕРОМ</span>
            <span className="w-6 h-px bg-orange-500" />
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-white uppercase leading-none mb-6">
            ЕСТЬ ВОПРОС ПО АВТОМОБИЛЮ?
          </h2>

          <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed text-balance">
            Позвоните нам — обсудим проблему и подскажем, с чего начать.
          </p>
        </div>

        {/* Primary Contact Action Card */}
        <div className="max-w-4xl mx-auto bg-[#101218] border border-white/10 rounded-2xl p-8 sm:p-12 shadow-2xl mb-12">
          {/* Main Direct Call Banner */}
          <div className="flex flex-col items-center text-center pb-10 border-b border-white/10">
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-3">
              Прямая линия мастера-приемщика:
            </div>

            <a
              href={SITE_CONFIG.contacts.phoneHref}
              className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-wider text-orange-500 hover:text-orange-400 transition-colors uppercase my-2 inline-flex items-center gap-4 group"
              aria-label={`Позвонить по телефону ${SITE_CONFIG.contacts.phoneDisplay}`}
            >
              <span>{SITE_CONFIG.contacts.phoneDisplay}</span>
            </a>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <a
                href={SITE_CONFIG.contacts.phoneHref}
                className="inline-flex items-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg text-base sm:text-lg shadow-xl shadow-orange-950/60 transition-all border border-orange-400/30 active:scale-95"
              >
                <Phone className="w-5 h-5" />
                <span>Набрать номер сейчас</span>
              </a>

              <button
                onClick={handleCopyPhone}
                className="inline-flex items-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-medium rounded-lg text-sm sm:text-base border border-white/10 transition-colors"
                title="Скопировать телефон в буфер обмена"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Скопировано!' : 'Скопировать номер'}</span>
              </button>
            </div>
          </div>

          {/* Location & Navigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
            {/* Address & Navigation */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4" />
                <span>Адрес техцентра</span>
              </div>
              <div className="text-base sm:text-lg text-white font-medium mb-1">
                {SITE_CONFIG.contacts.address}
              </div>
              <div className="text-xs text-neutral-400 mb-6">
                {SITE_CONFIG.contacts.addressComment}
              </div>

              {SITE_CONFIG.contacts.address === 'Адреса пока что нет' ? (
                <a
                  href={SITE_CONFIG.contacts.phoneHref}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171a24] hover:bg-[#1e2230] text-neutral-200 hover:text-white font-medium text-xs sm:text-sm rounded border border-white/10 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-orange-400" />
                  <span>Уточнить локацию по телефону ›</span>
                </a>
              ) : (
                <a
                  href={SITE_CONFIG.contacts.navigationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171a24] hover:bg-[#1e2230] text-neutral-200 hover:text-white font-medium text-xs sm:text-sm rounded border border-white/10 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-orange-400" />
                  <span>Маршрут в Яндекс.Картах ›</span>
                </a>
              )}
            </div>

            {/* Hours & Direct Messengers */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-wider mb-2">
                <Clock className="w-4 h-4" />
                <span>Режим работы</span>
              </div>
              <div className="text-base sm:text-lg text-white font-medium mb-1">
                {SITE_CONFIG.contacts.workingHours}
              </div>
              <div className="text-xs text-neutral-400 mb-6">
                Прием автомобилей по предварительному звонку
              </div>

              {/* Direct Messengers */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={SITE_CONFIG.contacts.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#171a24] hover:bg-[#1e2230] text-neutral-300 hover:text-white text-xs rounded border border-white/10 transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-blue-400" />
                  <span>Telegram</span>
                </a>
                <a
                  href={SITE_CONFIG.contacts.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#171a24] hover:bg-[#1e2230] text-neutral-300 hover:text-white text-xs rounded border border-white/10 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Note on Transparency & No Form Policy */}
        <div className="text-center text-xs text-neutral-500 font-mono max-w-xl mx-auto">
          Мы не используем формы сбора контактов и навязчивые автодозвоны. Живой диалог с мастером экономит ваше время.
        </div>
      </div>
    </section>
  );
};
