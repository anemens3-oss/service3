import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createCarScene, CarSceneController, HotspotScreenPos } from '../three/carScene';
import { SITE_CONFIG } from '../config/siteConfig';
import { Sliders, Maximize2, RotateCcw, ChevronDown, ChevronUp, Eye, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const DisassemblySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const sceneControllerRef = useRef<CarSceneController | null>(null);

  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(1);
  const [hotspots, setHotspots] = useState<HotspotScreenPos[]>([]);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [activePreset, setActivePreset] = useState<'hero' | 'exploded' | 'engine' | 'wheels'>('hero');
  const [manualSliderValue, setManualSliderValue] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Initialize Three.js Car Scene
  useEffect(() => {
    if (!canvasMountRef.current) return;

    const controller = createCarScene();
    sceneControllerRef.current = controller;
    controller.mount(canvasMountRef.current);

    controller.onHotspotsUpdate?.((updatedHotspots: HotspotScreenPos[]) => {
      setHotspots(updatedHotspots);
    });

    const handleResize = () => {
      controller.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      controller.unmount();
    };
  }, []);

  // Set up GSAP ScrollTrigger
  useEffect(() => {
    if (!containerRef.current || !sceneControllerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          setManualSliderValue(p);
          sceneControllerRef.current?.setProgress(p);

          // Update current stage
          if (p < 0.25) setCurrentStage(1);
          else if (p < 0.6) setCurrentStage(2);
          else if (p < 0.85) setCurrentStage(3);
          else setCurrentStage(4);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle manual dock controls
  const handlePresetChange = (preset: 'hero' | 'exploded' | 'engine' | 'wheels') => {
    setActivePreset(preset);
    sceneControllerRef.current?.setCameraPreset(preset);
    if (preset === 'hero') setManualSliderValue(0);
    if (preset === 'exploded') setManualSliderValue(0.45);
    if (preset === 'engine') setManualSliderValue(0.75);
    if (preset === 'wheels') setManualSliderValue(0.5);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setManualSliderValue(val);
    setProgress(val);
    sceneControllerRef.current?.setProgress(val);

    if (val < 0.25) setCurrentStage(1);
    else if (val < 0.6) setCurrentStage(2);
    else if (val < 0.85) setCurrentStage(3);
    else setCurrentStage(4);
  };

  return (
    <section
      id="disassembly"
      ref={containerRef}
      className="relative h-[450vh] bg-[#090a0d] text-white selection:bg-orange-500"
    >
      {/* Sticky Fullscreen 3D Viewport Window */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        {/* WebGL Canvas Mount Container */}
        <div
          ref={canvasMountRef}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
          title="Зажмите мышь и двигайте, чтобы повернуть автомобиль в 3D"
        />

        {/* Top Floating Stage & Telemetry HUD */}
        <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-none">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 tracking-widest uppercase mb-1">
              <span>{SITE_CONFIG.disassembly.sectionNumber} // АНАТОМИЯ РАЗБОРКИ</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display tracking-wide uppercase">
              {SITE_CONFIG.disassembly.heading}
            </h2>
          </div>

          {/* Current Stage Indicator */}
          <div className="flex items-center gap-2 bg-[#12141a]/85 backdrop-blur-md px-4 py-2 border border-white/10 rounded pointer-events-auto">
            <span className="text-xs font-mono text-neutral-400">СТАДИЯ {currentStage}/4:</span>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
              {currentStage === 1 && 'АВТОМОБИЛЬ В СБОРЕ'}
              {currentStage === 2 && 'РАЗДЕЛЕНИЕ УЗЛОВ'}
              {currentStage === 3 && 'ФОКУС: СИЛОВОЙ АГРЕГАТ'}
              {currentStage === 4 && 'ИНЖЕНЕРНАЯ ФИЛОСОФИЯ'}
            </span>
          </div>
        </div>

        {/* STAGE-SPECIFIC OVERLAYS */}

        {/* Stage 1 Text: Car Inspection */}
        <div
          className={`absolute left-6 sm:left-12 top-1/3 max-w-md z-10 transition-all duration-700 pointer-events-none ${
            currentStage === 1
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-6'
          }`}
        >
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">
            01. СИЛУЭТ И КУЗОВ
          </div>
          <div className="text-2xl sm:text-3xl font-display font-bold uppercase mb-3">
            Точная заводская геометрия
          </div>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Свет очерчивает линии кузова и силовые элементы. Прокручивайте страницу вниз, чтобы запустить процесс прецизионной разборки.
          </p>
        </div>

        {/* Stage 2 Text: Exploded View */}
        <div
          className={`absolute right-6 sm:right-12 top-1/4 max-w-md z-10 transition-all duration-700 pointer-events-none text-right ${
            currentStage === 2
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-6'
          }`}
        >
          <div className="text-xs font-mono text-orange-400 uppercase tracking-widest mb-2">
            02. КИНЕМАТИКА РАЗБОРКИ
          </div>
          <div className="text-2xl sm:text-3xl font-display font-bold uppercase mb-3">
            Синхронное разделение узлов
          </div>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Капот, колесные блоки, карбон-керамические тормоза и подрамник смещаются строго по инженерным осям, открывая доступ к двигателю.
          </p>
        </div>

        {/* Stage 3: Real-time 3D Projected Screen Hotspots */}
        {currentStage === 3 && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {hotspots
              .filter((hp) => hp.visible)
              .map((hp) => (
                <div
                  key={hp.id}
                  className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
                  style={{ left: `${hp.x}px`, top: `${hp.y}px` }}
                >
                  <div className="flex items-center gap-3 group">
                    {/* Pulsing Target Ring */}
                    <div className="relative flex items-center justify-center w-6 h-6">
                      <span className="absolute w-5 h-5 rounded-full border border-orange-500 animate-ping opacity-60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-lg shadow-orange-500/80" />
                    </div>

                    {/* Technical Label Tag */}
                    <div className="bg-[#10131a]/90 backdrop-blur-md border border-orange-500/40 px-3 py-1.5 rounded shadow-2xl">
                      <div className="text-xs font-bold text-orange-400 uppercase tracking-wider font-mono">
                        {hp.title}
                      </div>
                      <div className="text-[11px] text-neutral-300 font-sans max-w-[180px] leading-tight">
                        {hp.desc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Stage 4 Final Typography: КАЖДАЯ ДЕТАЛЬ ИМЕЕТ ЗНАЧЕНИЕ */}
        <div
          className={`absolute inset-0 flex items-center justify-center p-6 z-10 transition-all duration-700 pointer-events-none ${
            currentStage === 4
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="max-w-3xl text-center bg-[#0a0c10]/80 backdrop-blur-lg p-8 sm:p-12 rounded-lg border border-white/10 shadow-2xl">
            <div className="text-xs font-mono text-orange-400 tracking-widest uppercase mb-4">
              ИНЖЕНЕРНАЯ ТОЧНОСТЬ // APEX MOTORWORKS
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase mb-6 leading-tight">
              {SITE_CONFIG.disassembly.finalQuote}
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto mb-8 text-balance">
              {SITE_CONFIG.disassembly.finalDescription}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
              <a
                href={SITE_CONFIG.contacts.phoneHref}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded text-sm transition-all shadow-xl shadow-orange-950/40"
              >
                Обсудить ваш автомобиль
              </a>
              <a
                href="#services"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded text-sm transition-all border border-white/10"
              >
                Перейти к каталогу услуг
              </a>
            </div>
          </div>
        </div>

        {/* Collapsible Ergonomic Bottom Control Dock (Three.js Skill Compliant) */}
        <div
          className={`relative z-20 mx-auto transition-transform duration-300 pointer-events-auto mb-6 px-4 w-full max-w-2xl ${
            isDockCollapsed ? 'translate-y-24' : 'translate-y-0'
          }`}
        >
          {/* Collapse / Expand Tab Button */}
          <div className="flex justify-center -mb-px">
            <button
              onClick={() => setIsDockCollapsed(!isDockCollapsed)}
              className="flex items-center gap-1.5 px-4 py-1 text-[11px] font-mono uppercase tracking-wider text-neutral-400 hover:text-white bg-[#111319] border-t border-x border-white/10 rounded-t-md transition-colors"
              aria-label={isDockCollapsed ? 'Показать управление сценой' : 'Скрыть управление сценой'}
            >
              {isDockCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{isDockCollapsed ? 'Панель инспекции' : 'Скрыть инспекцию'}</span>
            </button>
          </div>

          {/* Main Control Dock Container */}
          <div className="bg-[#111319]/95 backdrop-blur-md border border-white/10 rounded-lg p-3 sm:p-4 shadow-2xl flex flex-col gap-3">
            {/* Top row: Camera Preset View Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                <Eye className="w-3.5 h-3.5 text-orange-400" />
                <span>РАКУРС:</span>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 text-xs">
                <button
                  onClick={() => handlePresetChange('hero')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activePreset === 'hero'
                      ? 'bg-orange-600 text-white font-semibold'
                      : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                  }`}
                >
                  В сборе
                </button>
                <button
                  onClick={() => handlePresetChange('exploded')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activePreset === 'exploded'
                      ? 'bg-orange-600 text-white font-semibold'
                      : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                  }`}
                >
                  Разборка
                </button>
                <button
                  onClick={() => handlePresetChange('engine')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activePreset === 'engine'
                      ? 'bg-orange-600 text-white font-semibold'
                      : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                  }`}
                >
                  Двигатель
                </button>
                <button
                  onClick={() => handlePresetChange('wheels')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activePreset === 'wheels'
                      ? 'bg-orange-600 text-white font-semibold'
                      : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                  }`}
                >
                  Тормоза
                </button>
              </div>
            </div>

            {/* Bottom row: Interactive Exploded View Scrub Slider */}
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-mono text-neutral-400 uppercase whitespace-nowrap shrink-0">
                Степень разборки:
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={manualSliderValue}
                onChange={handleSliderChange}
                className="w-full accent-orange-500 cursor-pointer h-1.5 bg-neutral-700 rounded-lg"
                aria-label="Степень механической разборки"
              />
              <span className="text-[11px] font-mono text-orange-400 font-bold whitespace-nowrap shrink-0">
                {Math.round(manualSliderValue * 100)}%
              </span>
            </div>

            {/* Instruction tooltip */}
            <div className="text-[10px] text-neutral-500 font-mono text-center flex items-center justify-center gap-2">
              <span>Зажмите и вращайте мышью/пальцем для осмотра на 360°</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
