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
  ChartData,
  Chart as ChartJSInstance
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

const GraphVisualization: React.FC = () => {
  const chartRef = useRef<ChartJSInstance<'line'> | null>(null);

  const generateWaveData = () => {
    const points = [
      250, 250, 180, 170, 160, 200, 190, 180, 100, 80, 60, 120, 110, 100, 40,
      30, 20, 60, 50, 40, 90, 80, 70, 120, 110, 100, 20, 30, 40, 100, 90
    ];

    return points.map(svgY => ((300 - svgY) / 300) * 1000);
  };

  const chartData: ChartData<'line'> = {
    labels: Array.from({ length: 31 }, (_, i) => `${i}s`),
    datasets: [
      {
        data: generateWaveData(),
        borderColor: '#2bee79',
        backgroundColor: (context) => {
          const { chart } = context;
          const { ctx, chartArea } = chart;
          if (!chartArea) return 'transparent';

          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(43, 238, 121, 0)');
          gradient.addColorStop(0.3, 'rgba(43, 238, 121, 0.3)');
          gradient.addColorStop(1, 'rgba(43, 238, 121, 0.1)');
          return gradient;
        },
        borderWidth: 3,
        fill: true,
        tension: 0.4,
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
    interaction: { intersect: false, mode: 'index' },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(24, 50, 35, 0.95)',
        titleColor: '#94a3b8',
        bodyColor: '#e2e8f0',
        borderColor: '#2bee79',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            return value !== null ? `${value.toFixed(1)} Mbps` : '—';
          },
          title: (items) => `Time: ${items[0].label}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(43, 238, 121, 0.1)',
          drawTicks: false,
        },
        ticks: {
          color: '#64748b',
          font: { family: 'monospace', size: 10 },
          maxTicksLimit: 7,
        },
        border: { color: 'rgba(43, 238, 121, 0.2)' }
      },
      y: {
        beginAtZero: true,
        max: 1000,
        grid: {
          color: 'rgba(43, 238, 121, 0.1)',
          drawTicks: false,
        },
        ticks: {
          color: '#64748b',
          font: { family: 'monospace', size: 10 },
          stepSize: 200,
          callback: (value) => `${value} Mbps`,
        },
        border: { color: 'rgba(43, 238, 121, 0.2)' }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutCubic',
    },
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = chartRef.current as any;
    const ctx = chart.ctx;
    const originalDraw = chart.draw;

    chart.draw = function () {
      ctx.save();
      ctx.shadowColor = 'rgba(43, 238, 121, 0.5)';
      ctx.shadowBlur = 15;
      originalDraw.apply(this, arguments);
      ctx.restore();

      originalDraw.apply(this, arguments);
    };
  }, []);

  return (
    <div className="relative w-full h-80 md:h-[400px] rounded-2xl border border-[#2bee79] overflow-hidden">
      <div className="absolute inset-0 p-4">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default GraphVisualization;
