import React from "react";
import Logo from "@/public/pulse-speed.jpeg";
import Image from "next/image";
import { Server, Router } from "lucide-react";

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
              <div className="absolute animate-ping rounded-full bg-[#2bee79] opacity-70 h-5 w-5"></div>

              {/* Static green dot container */}
              <div className="relative bg-[#2bee79] rounded-full h-4 w-4 flex items-center justify-center"></div>
            </div>

            {/* Text */}
            <span className="text-primary font-medium text-sm tracking-wide uppercase">
              Real-Time Download
            </span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PulseSpeed;
