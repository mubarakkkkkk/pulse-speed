import React from 'react'
import Logo from "@/public/Image/pulse-speed.jpeg";
import Image from "next/image";
import { Server, Router } from "lucide-react";

const page = () => {
  return (
    <div>
        <header className="border-b border-[#234832]/50 flex justify-between items-center p-2">
        <div className="flex items-center gap-4 ">
          <Image src={Logo} alt="Pulse Speed Logo" width={50} height={50} />
          <p>Pulse Speed</p>
        </div>
        <div className="flex gap-8">
          <div className="flex items-center gap-2 border rounded-full px-3 py-1.5 border-[#234832] text-xs font-bold text-slate-300">
            <Server size={16} />
            <p>192.168.1.45</p>
          </div>
          <div className="flex items-center gap-2 border rounded-full p-2 border-[#1fa855] text-[#1fa855] bg-[]">
            <Router size={16} />
            <p>MTN 5G Router</p>
          </div>
        </div>
      </header>
    </div>
  )
}

export default page