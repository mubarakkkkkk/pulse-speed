import React from "react";
import Logo from "@/public/pulse-speed.jpeg";
import Image from "next/image";
import { Server, Router, Play } from "lucide-react";
import GraphVisualization from "./components/graphs/GraphVisualization";
import Link from "next/link";

const PulseSpeed = () => {
  return (
    <div>
      <header className="border-b border-[#234832]/50 flex justify-between items-center p-2">
        <div className="flex items-center gap-4 ">
          <Image src={Logo} alt="Pulse Speed Logo" width={50} height={50} />
          <p>Pulse Speed</p>
        </div>
        <div className="flex gap-8">
          <div className="flex items-center gap-2 border rounded-full p-2 border-[#234832] text-xs font-bold text-slate-300">
            <Server size={16} />
            <p>192.168.1.45</p>
          </div>
          <div className="flex items-center gap-2 border rounded-full p-2 border-[#1fa855] text-[#1fa855] bg-[]">
            <Router size={16} />
            <p>MTN 5G Router</p>
          </div>
        </div>
      </header>
      <main>
        <section className="p-5">
          <div className="flex items-center gap-2">
            {/* Pulsing dot */}
            <div className="relative flex items-center justify-center">
              {/* Green ping ring - ONLY this animates */}
              <div className="absolute animate-ping rounded-full bg-[#2bee79] opacity-70 h-3 w-3"></div>

              {/* Static green dot container */}
              <div className="relative bg-[#2bee79] rounded-full h-3 w-3 flex items-center justify-center"></div>
            </div>

            {/* Text */}
            <span className="text-[#2bee79] font-medium text-sm tracking-wide uppercase">
              Real-Time Download
            </span>
          </div>
          <div className="flex justify-between">
            <div>
              <h1 className="text-6xl font-semibold">
                850.5{" "}
                <span className="text-lg font-medium text-slate-400">Mbps</span>
              </h1>
            </div>

            <div>
              <p>Max Speed</p>
              <h1>
                940.2
                <span className="text-lg font-medium text-slate-400">Mbps</span>
              </h1>
            </div>
          </div>
        </section>
        <section>
          <GraphVisualization />
        </section>
        <div className="flex items-center justify-center m-8 flex-col gap-4">
          <button className="flex items-center gap-2 bg-[#2bee79] text-black p-4 rounded-xl font-medium">
            <Play className="w-5 h-5" />
            <h1>Check Pulse</h1>
          </button>
          <Link href="/statsPage" className="text-[#2bee79] rounded-full">Show More</Link>
        </div>
      </main>
    </div>
  );
};

export default PulseSpeed;
