"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip
);

export default function LiveSpeedGraph({ speed }: { speed: number }) {
  const [dataPoints, setDataPoints] = useState<number[]>([]);

  useEffect(() => {
    setDataPoints((prev) => [...prev.slice(-30), speed]);
  }, [speed]);

  return (
    <div className="h-80 w-full">
      <Line
        data={{
          labels: dataPoints.map((_, i) => `${i}s`),
          datasets: [
            {
              data: dataPoints,
              borderColor: "#2bee79",
              fill: true,
              tension: 0.4,
              backgroundColor: "rgba(43,238,121,0.15)",
              pointRadius: 0,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          scales: {
            x: { display: false },
            y: {
              beginAtZero: true,
              ticks: { color: "#64748b" },
            },
          },
          plugins: {
            legend: { display: false },
          },
        }}
      />
    </div>
  );
}
