import React from 'react';
import { Server, Wifi, Shield } from 'lucide-react';

const NetworkInfo: React.FC = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-highlight/30 border border-surface-highlight text-xs font-medium text-slate-300">
        <Server className="w-4 h-4" />
        <span>192.168.1.45</span>
      </div>
      
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-highlight border border-primary/20 text-sm font-bold text-primary shadow-primary">
        <Wifi className="w-4 h-4" />
        <span className="truncate max-w-[120px]">Comcast Cable</span>
      </div>

      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-highlight/30 border border-surface-highlight text-xs font-medium text-slate-300">
        <Shield className="w-4 h-4" />
        <span>Encrypted</span>
      </div>
    </div>
  );
};

export default NetworkInfo;