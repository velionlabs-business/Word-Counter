import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 mb-8 border-b border-slate-900 bg-slate-950/20 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Logo and branding */}
        <div className="flex items-center gap-3 group">
          <div className="relative p-2.5 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl text-white shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform duration-300">
            <Terminal className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-sans m-0">
              <span className="bg-gradient-to-r from-violet-400 via-indigo-200 to-white bg-clip-text text-transparent">
                WordCounter
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono font-medium tracking-wide uppercase">
                v1.0
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide">
              Real-time Analysis Engine
            </p>
          </div>
        </div>

        {/* Real-time status indicator */}
        <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 rounded-full px-4 py-1.5 shadow-sm">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="text-xs text-slate-300 font-mono tracking-wider flex items-center gap-1.5 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            100% Client-Side & Secure
          </span>
        </div>

      </div>
    </header>
  );
};
