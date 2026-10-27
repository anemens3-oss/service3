import React from 'react';

/**
 * High-precision vector technical schematics for APEX MOTORWORKS services.
 * Pure procedural vector blueprints with glowing paths, dimension markers,
 * and high-contrast dark automotive aesthetic.
 */

export const DiagnosticsSchematic: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="diagGrad" x1="0" y1="0" x2="400" y2="280" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ff6b2c" stopOpacity="0.8" />
        <stop offset="1" stopColor="#3b82f6" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="gridGlow" x1="0" y1="0" x2="0" y2="280" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1e2330" />
        <stop offset="1" stopColor="#0d0f14" />
      </linearGradient>
    </defs>
    {/* Dark Blueprint Grid Background */}
    <rect width="400" height="280" fill="url(#gridGlow)" rx="8" />
    <path d="M40 0V280M80 0V280M120 0V280M160 0V280M200 0V280M240 0V280M280 0V280M320 0V280M360 0V280" stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1" />
    <path d="M0 40H400M0 80H400M0 120H400M0 160H400M0 200H400M0 240H400" stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1" />

    {/* ECU Microchip Architecture */}
    <rect x="50" y="55" width="130" height="170" rx="4" stroke="#ff6b2c" strokeWidth="1.5" strokeOpacity="0.7" fill="#131720" />
    <text x="65" y="82" fill="#ff6b2c" fontSize="10" fontFamily="Space Mono" letterSpacing="1">ECU // BOSCH MED17</text>
    <rect x="65" y="95" width="100" height="60" rx="2" fill="#1b202c" stroke="#4b5563" strokeWidth="1" />
    <text x="75" y="128" fill="#9ca3af" fontSize="9" fontFamily="Space Mono">CAN_HIGH: 2.5V</text>
    <text x="75" y="142" fill="#9ca3af" fontSize="9" fontFamily="Space Mono">CAN_LOW:  1.5V</text>

    {/* Oscilloscope Waveform Grid */}
    <rect x="200" y="55" width="160" height="170" rx="4" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.6" fill="#0b0e14" />
    <line x1="200" y1="140" x2="360" y2="140" stroke="#3b82f6" strokeOpacity="0.3" strokeDasharray="4 2" />
    <line x1="280" y1="55" x2="280" y2="225" stroke="#3b82f6" strokeOpacity="0.3" strokeDasharray="4 2" />
    
    {/* Oscilloscope Signal Pulse (Camshaft/Crankshaft Sync) */}
    <path d="M205 160 L220 160 L220 100 L235 100 L235 160 L250 160 L250 100 L270 100 L270 160 L285 160 L285 85 L295 85 L295 160 L320 160 L320 100 L340 100 L340 160 L355 160" stroke="#ff6b2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M205 180 Q230 185 245 155 T285 155 T325 185 T355 170" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="2 2" />

    {/* Leader Lines & Data Pointers */}
    <circle cx="180" cy="115" r="3" fill="#ff6b2c" />
    <line x1="180" y1="115" x2="200" y2="115" stroke="#ff6b2c" strokeWidth="1" />
    <text x="210" y="75" fill="#60a5fa" fontSize="9" fontFamily="Space Mono">CH1: CRANK_POS (HALL)</text>
    <text x="210" y="210" fill="#9ca3af" fontSize="8" fontFamily="Space Mono">SAMPLING: 250 MS/s</text>
  </svg>
);

export const EngineSchematic: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="280" gradientUnits="userSpaceOnUse">
        <stop stopColor="#141720" />
        <stop offset="1" stopColor="#090b0f" />
      </linearGradient>
    </defs>
    <rect width="400" height="280" fill="url(#engGrad)" rx="8" />
    {/* Cylinder Block Cross-section */}
    <rect x="130" y="80" width="140" height="150" stroke="#ff6b2c" strokeWidth="1.5" strokeOpacity="0.8" fill="#171b26" rx="4" />
    
    {/* Piston Head */}
    <rect x="145" y="115" width="110" height="45" rx="3" fill="#2d3345" stroke="#d1d5db" strokeWidth="1.5" />
    <line x1="150" y1="125" x2="250" y2="125" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 2" />
    <line x1="150" y1="135" x2="250" y2="135" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 2" />

    {/* Connecting Rod (Шатун) */}
    <path d="M192 160 L186 215 L214 215 L208 160 Z" fill="#374151" stroke="#9ca3af" strokeWidth="1.5" />
    <circle cx="200" cy="215" r="14" fill="#1f2430" stroke="#ff6b2c" strokeWidth="2" />
    <circle cx="200" cy="215" r="5" fill="#ff6b2c" />

    {/* Overhead Valves & Springs */}
    <path d="M165 45 L175 80 L160 80 L170 45" stroke="#ff6b2c" strokeWidth="1.5" fill="#232838" />
    <path d="M235 45 L225 80 L240 80 L230 45" stroke="#60a5fa" strokeWidth="1.5" fill="#232838" />
    
    {/* Camshaft Lobe Profile */}
    <ellipse cx="168" cy="40" rx="14" ry="10" stroke="#d1d5db" strokeWidth="1.5" fill="#1b202c" />
    <ellipse cx="232" cy="40" rx="14" ry="10" stroke="#d1d5db" strokeWidth="1.5" fill="#1b202c" />

    {/* Technical Dimension Callouts */}
    <line x1="115" y1="115" x2="115" y2="160" stroke="#ff6b2c" strokeWidth="1" />
    <text x="50" y="140" fill="#ff6b2c" fontSize="9" fontFamily="Space Mono">STROKE: 86.0mm</text>
    <text x="285" y="130" fill="#9ca3af" fontSize="9" fontFamily="Space Mono">BORE: 82.5mm</text>
    <text x="285" y="145" fill="#9ca3af" fontSize="8" fontFamily="Space Mono">TOL: ±0.005mm</text>
    <text x="145" y="260" fill="#e5e7eb" fontSize="10" fontFamily="Space Mono" letterSpacing="1">V8 TWIN-TURBO // ГРМ & ШПГ</text>
  </svg>
);

export const ElectricSchematic: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="400" height="280" fill="#0c0e13" rx="8" />
    {/* Microcontroller & Circuit Paths */}
    <rect x="70" y="60" width="100" height="100" rx="6" fill="#141923" stroke="#ff6b2c" strokeWidth="1.5" />
    <rect x="90" y="80" width="60" height="60" rx="3" fill="#1e2638" stroke="#3b82f6" strokeWidth="1" />
    <text x="96" y="115" fill="#60a5fa" fontSize="9" fontFamily="Space Mono">MCU // ARM</text>

    {/* Bus lines with vias */}
    <path d="M170 90 H280 V130 H340" stroke="#ff6b2c" strokeWidth="2" strokeLinecap="round" />
    <path d="M170 110 H250 V170 H340" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M170 130 H220 V210 H300" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3 3" />

    {/* Circuit Components & Relays */}
    <circle cx="280" cy="130" r="4" fill="#ff6b2c" />
    <circle cx="250" cy="170" r="4" fill="#60a5fa" />
    <rect x="290" y="115" width="50" height="30" rx="3" fill="#1e2433" stroke="#ff6b2c" strokeWidth="1" />
    <text x="296" y="134" fill="#ff6b2c" fontSize="8" fontFamily="Space Mono">RELAY 12V</text>

    <text x="60" y="200" fill="#9ca3af" fontSize="9" fontFamily="Space Mono">CURRENT LEAKAGE: 0.018A</text>
    <text x="60" y="218" fill="#ff6b2c" fontSize="9" fontFamily="Space Mono">PARASITIC DRAIN: NORMAL</text>
    <text x="60" y="255" fill="#e5e7eb" fontSize="10" fontFamily="Space Mono" letterSpacing="1">CAN 2.0B / LIN BUS ANALYZER</text>
  </svg>
);

export const SuspensionSchematic: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="400" height="280" fill="#0d0f15" rx="8" />
    
    {/* Damper Strut Body */}
    <rect x="188" y="50" width="24" height="150" rx="4" fill="#1b202d" stroke="#ff6b2c" strokeWidth="1.5" />
    
    {/* Coilover Spring Helix */}
    <path d="M180 80 Q220 86 180 94 Q220 100 180 108 Q220 114 180 122 Q220 128 180 136 Q220 142 180 150 Q220 156 180 164" stroke="#ff6b2c" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M220 80 Q180 86 220 94 Q180 100 220 108 Q180 114 220 122 Q180 128 220 136 Q180 142 220 150 Q180 156 220 164" stroke="#ff6b2c" strokeWidth="3" strokeLinecap="round" fill="none" />

    {/* Double Wishbone (A-Arm) */}
    <path d="M188 170 L110 210 M212 170 L290 210" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="110" cy="210" r="6" fill="#131722" stroke="#ff6b2c" strokeWidth="2" />
    <circle cx="290" cy="210" r="6" fill="#131722" stroke="#ff6b2c" strokeWidth="2" />

    {/* 3D Wheel Alignment Indicators */}
    <line x1="200" y1="20" x2="200" y2="240" stroke="#60a5fa" strokeOpacity="0.4" strokeDasharray="4 3" />
    <line x1="200" y1="20" x2="218" y2="240" stroke="#ff6b2c" strokeWidth="1.5" />
    
    <text x="60" y="80" fill="#9ca3af" fontSize="9" fontFamily="Space Mono">CAMBER: -1°24'</text>
    <text x="60" y="96" fill="#ff6b2c" fontSize="9" fontFamily="Space Mono">CASTER: +6°45'</text>
    <text x="270" y="80" fill="#9ca3af" fontSize="9" fontFamily="Space Mono">TOE: +0°06'</text>
    <text x="130" y="260" fill="#e5e7eb" fontSize="10" fontFamily="Space Mono" letterSpacing="1">HUNTER 3D HAWKEYE ELITE</text>
  </svg>
);

export const BrakesSchematic: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="400" height="280" fill="#0c0e14" rx="8" />
    
    {/* Brake Rotor Disc with Ventilation Slots */}
    <circle cx="180" cy="140" r="95" stroke="#d1d5db" strokeWidth="12" fill="#171b26" strokeDasharray="16 4" />
    <circle cx="180" cy="140" r="70" stroke="#374151" strokeWidth="2" fill="none" />
    <circle cx="180" cy="140" r="45" stroke="#ff6b2c" strokeWidth="1.5" fill="#1f2533" />
    
    {/* Center Hat & Lug Bolt Holes */}
    <circle cx="180" cy="140" r="16" fill="#0c0e14" stroke="#9ca3af" strokeWidth="1" />
    {[0, 72, 144, 216, 288].map(deg => {
      const rad = (deg * Math.PI) / 180;
      const x = 180 + 32 * Math.cos(rad);
      const y = 140 + 32 * Math.sin(rad);
      return <circle key={deg} cx={x} cy={y} r="4" fill="#ff6b2c" />;
    })}

    {/* High Performance 6-Piston Caliper (Monobloc) */}
    <path d="M235 65 C265 85 285 125 275 180 L235 160 Z" fill="#ff6b2c" stroke="#ff8547" strokeWidth="2" />
    <rect x="238" y="90" width="30" height="18" rx="2" fill="#111319" />
    <rect x="238" y="115" width="30" height="18" rx="2" fill="#111319" />
    <rect x="238" y="140" width="30" height="18" rx="2" fill="#111319" />
    
    <text x="242" y="103" fill="#ff6b2c" fontSize="8" fontFamily="Space Mono">P1</text>
    <text x="242" y="128" fill="#ff6b2c" fontSize="8" fontFamily="Space Mono">P2</text>
    <text x="242" y="153" fill="#ff6b2c" fontSize="8" fontFamily="Space Mono">P3</text>

    {/* Technical Runout Spec */}
    <text x="45" y="60" fill="#9ca3af" fontSize="9" fontFamily="Space Mono">DISC RUNOUT: &lt; 0.015mm</text>
    <text x="45" y="76" fill="#ff6b2c" fontSize="9" fontFamily="Space Mono">ROTOR THICKNESS: 34.0mm</text>
    <text x="120" y="260" fill="#e5e7eb" fontSize="10" fontFamily="Space Mono" letterSpacing="1">CARBON-CERAMIC 380MM 6-POT</text>
  </svg>
);

export const MaintenanceSchematic: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="400" height="280" fill="#0d0f14" rx="8" />

    {/* Engine Oil Filter Cross-section */}
    <rect x="150" y="60" width="100" height="140" rx="8" fill="#181d29" stroke="#ff6b2c" strokeWidth="2" />
    
    {/* Pleated Filter Paper Mesh */}
    <path d="M165 75 L175 175 L185 75 L195 175 L205 75 L215 175 L225 75 L235 175" stroke="#fbbf24" strokeWidth="2" strokeLinejoin="round" fill="none" />
    
    {/* Bypass Valve & Spring */}
    <circle cx="200" cy="188" r="8" fill="#374151" stroke="#d1d5db" strokeWidth="1.5" />
    <path d="M195 188 H205" stroke="#ff6b2c" strokeWidth="2" />

    {/* Torquing Gauge & Fluid Pressure */}
    <path d="M80 130 C80 90 120 70 120 70" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 2" />
    <text x="45" y="80" fill="#60a5fa" fontSize="9" fontFamily="Space Mono">TORQUE: 25 Nm</text>
    <text x="45" y="96" fill="#9ca3af" fontSize="9" fontFamily="Space Mono">SPEC: 0W-40 C3</text>
    <text x="270" y="80" fill="#fbbf24" fontSize="9" fontFamily="Space Mono">BOILING: &gt; 265°C</text>
    <text x="270" y="96" fill="#9ca3af" fontSize="9" fontFamily="Space Mono">WATER: &lt; 1.0%</text>

    <text x="130" y="255" fill="#e5e7eb" fontSize="10" fontFamily="Space Mono" letterSpacing="1">OEM REGULATION MAINTENANCE</text>
  </svg>
);
