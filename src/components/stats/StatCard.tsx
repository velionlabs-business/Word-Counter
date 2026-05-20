import React from 'react';

export type StatColorTheme = 'violet' | 'blue' | 'emerald' | 'amber' | 'rose' | 'fuchsia';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  theme?: StatColorTheme;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, theme = 'violet' }) => {
  // Map themes to dynamic style classes
  const themeClasses = {
    violet: {
      text: 'text-violet-400',
      bgGlow: 'from-violet-500/10 to-transparent',
      borderHover: 'hover:border-violet-500/40',
      iconBg: 'bg-violet-500/10 text-violet-400',
    },
    blue: {
      text: 'text-blue-400',
      bgGlow: 'from-blue-500/10 to-transparent',
      borderHover: 'hover:border-blue-500/40',
      iconBg: 'bg-blue-500/10 text-blue-400',
    },
    emerald: {
      text: 'text-emerald-400',
      bgGlow: 'from-emerald-500/10 to-transparent',
      borderHover: 'hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
    },
    amber: {
      text: 'text-amber-400',
      bgGlow: 'from-amber-500/10 to-transparent',
      borderHover: 'hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-400',
    },
    rose: {
      text: 'text-rose-400',
      bgGlow: 'from-rose-500/10 to-transparent',
      borderHover: 'hover:border-rose-500/40',
      iconBg: 'bg-rose-500/10 text-rose-400',
    },
    fuchsia: {
      text: 'text-fuchsia-400',
      bgGlow: 'from-fuchsia-500/10 to-transparent',
      borderHover: 'hover:border-fuchsia-500/40',
      iconBg: 'bg-fuchsia-500/10 text-fuchsia-400',
    },
  };

  const selectedTheme = themeClasses[theme];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl glass-card p-6 flex items-center justify-between group cursor-default ${selectedTheme.borderHover}`}
    >
      {/* Background radial soft light glow on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${selectedTheme.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="z-10 flex flex-col justify-between">
        <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
          {title}
        </span>
        <span
          className={`text-3xl font-bold tracking-tight font-sans transition-all duration-300 ${selectedTheme.text}`}
        >
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
      </div>

      <div
        className={`z-10 p-3.5 rounded-xl transition-all duration-300 group-hover:scale-110 shadow-inner ${selectedTheme.iconBg}`}
      >
        {icon}
      </div>

      {/* Elegant bottom glowing line on hover */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${selectedTheme.text}`}
      />
    </div>
  );
};
