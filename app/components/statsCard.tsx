import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  progress: number;
  color: 'primary' | 'purple';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  progress, 
  color 
}) => {
  const colorClasses = {
    primary: {
      text: 'text-primary',
      bg: 'bg-primary',
      border: 'border-primary/30',
      hover: 'hover:border-primary/50'
    },
    purple: {
      text: 'text-purple-400',
      bg: 'bg-purple-400',
      border: 'border-purple-400/30',
      hover: 'hover:border-purple-400/50'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className={`flex flex-col gap-3 p-5 rounded-xl bg-surface-dark border border-surface-highlight ${colors.hover} transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group`}>
      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
          {title}
        </p>
        <Icon className={`w-5 h-5 ${colors.text} transition-colors`} />
      </div>
      
      <div className="flex items-baseline gap-1">
        <p className="text-3xl font-bold">{value.toFixed(1)}</p>
        <span className="text-sm font-medium text-slate-400">{unit}</span>
      </div>

      <div className="w-full bg-surface-highlight h-1.5 rounded-full overflow-hidden mt-1">
        <div 
          className={`h-full ${colors.bg} transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-xs text-slate-500 mt-1">
        {progress}% of maximum
      </div>
    </div>
  );
};

export default StatsCard;