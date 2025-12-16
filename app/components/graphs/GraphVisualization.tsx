'use client';

import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

const GraphVisualization: React.FC = () => {
  const chartRef = useRef<any>(null);

  // Data that matches your SVG path shape
  const generateWaveData = () => {
    const data = [];
    const points = [
      250, 250, 180, 170, 160, 200, 190, 180, 100, 80, 60, 120, 110, 100, 40, 
      30, 20, 60, 50, 40, 90, 80, 70, 120, 110, 100, 20, 30, 40, 100, 90
    ];
    
    // Normalize to 0-1000 range (convert from 0-300 SVG scale to 0-1000 Mbps)
    for (let i = 0; i < points.length; i++) {
      // Convert from SVG Y coordinate (0 at top, 300 at bottom) to chart Y (0 at bottom, 1000 at top)
      const svgY = points[i];
      const chartY = ((300 - svgY) / 300) * 1000;
      data.push(chartY);
    }
    
    return data;
  };

  const chartData: ChartData<'line'> = {
    labels: Array.from({ length: 31 }, (_, i) => `${i}s`),
    datasets: [
      {
        label: 'Download Speed',
        data: generateWaveData(),
        borderColor: '#2bee79',
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          
          if (!chartArea) return 'transparent';
          
          // Create gradient fill
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(43, 238, 121, 0)');
          gradient.addColorStop(0.3, 'rgba(43, 238, 121, 0.3)');
          gradient.addColorStop(1, 'rgba(43, 238, 121, 0.1)');
          
          return gradient;
        },
        borderWidth: 3,
        fill: true,
        tension: 0.4, // Creates smooth bezier curves
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: '#2bee79',
        pointBorderColor: '#102217',
        pointBorderWidth: 2,
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(24, 50, 35, 0.95)',
        titleColor: '#94a3b8',
        bodyColor: '#e2e8f0',
        borderColor: '#2bee79',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y.toFixed(1)} Mbps`,
          title: (items) => `Time: ${items[0].label}`
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'rgba(43, 238, 121, 0.1)',
          drawBorder: false,
          drawTicks: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            family: 'monospace',
            size: 10,
          },
          maxTicksLimit: 7,
          callback: function(value, index) {
            const labels = ['0s', '5s', '10s', '15s', '20s', '25s', '30s'];
            return labels[index] || '';
          }
        },
        border: {
          color: 'rgba(43, 238, 121, 0.2)',
        }
      },
      y: {
        display: true,
        beginAtZero: true,
        max: 1000,
        grid: {
          color: 'rgba(43, 238, 121, 0.1)',
          drawBorder: false,
          drawTicks: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            family: 'monospace',
            size: 10,
          },
          callback: function(value) {
            return `${value} Mbps`;
          },
          stepSize: 200,
        },
        border: {
          color: 'rgba(43, 238, 121, 0.2)',
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutCubic',
    },
    elements: {
      line: {
        cubicInterpolationMode: 'monotone',
      }
    }
  };

  // Add glowing effect to the line
  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;
      
      // Store original draw function
      const originalDraw = chart.draw;
      
      // Override draw function to add glow effect
      chart.draw = function() {
        // Draw glow effect
        ctx.save();
        ctx.shadowColor = 'rgba(43, 238, 121, 0.5)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        originalDraw.apply(this, arguments);
        ctx.restore();
        
        // Draw the line again without shadow for crispness
        ctx.save();
        originalDraw.apply(this, arguments);
        ctx.restore();
      };
    }
  }, []);

  return (
    <div className="relative w-full h-80 md:h-[400px] bg-surface-dark rounded-2xl border border-[#2bee79] shadow-lg overflow-hidden">
      {/* Grid Background - Similar to your SVG grid */}
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
      
      {/* Chart.js Canvas */}
      <div className="absolute inset-0 p-4">
        <Line
          ref={chartRef}
          data={chartData}
          options={options}
        />
      </div>

      {/* Time Axis Labels */}
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

      {/* Decorative Elements */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#2bee79] animate-pulse"></div>
          <span className="text-xs text-slate-300 font-medium">Live Speed</span>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualization;