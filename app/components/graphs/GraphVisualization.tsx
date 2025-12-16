import React from 'react';

const GraphVisualization: React.FC = () => {
  return (
    <div className="relative w-full h-[320px] md:h-[400px] bg-surface-dark rounded-2xl border border-surface-highlight shadow-lg overflow-hidden">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(#2bee79 1px, transparent 1px),
            linear-gradient(90deg, #2bee79 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* SVG Graph */}
      <div className="absolute inset-0 flex flex-col justify-end pb-8 px-0 md:px-4">
        <svg 
          className="w-full h-[85%] overflow-visible"
          preserveAspectRatio="none" 
          viewBox="0 0 1000 300"
        >
          <defs>
            <linearGradient id="gradientFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#2bee79" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2bee79" stopOpacity="0" />
            </linearGradient>
            <filter id="glow" width="140%" height="140%" x="-20%" y="-20%">
              <feGaussianBlur result="blur" stdDeviation="4" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Animated Path */}
          <path
            className="animate-path"
            d="M0 250 C 50 250, 50 180, 100 170 C 150 160, 150 200, 200 190 C 250 180, 250 100, 300 80 C 350 60, 350 120, 400 110 C 450 100, 450 40, 500 30 C 550 20, 550 60, 600 50 C 650 40, 650 90, 700 80 C 750 70, 750 120, 800 110 C 850 100, 850 20, 900 30 C 950 40, 950 100, 1000 90"
            fill="none"
            filter="url(#glow)"
            stroke="#2bee79"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />

          {/* Gradient Fill */}
          <path
            d="M0 250 C 50 250, 50 180, 100 170 C 150 160, 150 200, 200 190 C 250 180, 250 100, 300 80 C 350 60, 350 120, 400 110 C 450 100, 450 40, 500 30 C 550 20, 550 60, 600 50 C 650 40, 650 90, 700 80 C 750 70, 750 120, 800 110 C 850 100, 850 20, 900 30 C 950 40, 950 100, 1000 90 V 300 H 0 Z"
            fill="url(#gradientFill)"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Time Axis */}
      <div className="absolute bottom-2 left-0 w-full flex justify-between px-6">
        {[0, 5, 10, 15, 20, 25, 30].map((second) => (
          <span 
            key={second}
            className="text-[10px] md:text-xs font-mono text-slate-500 uppercase tracking-widest"
          >
            {second}s
          </span>
        ))}
      </div>
    </div>
  );
};

export default GraphVisualization;