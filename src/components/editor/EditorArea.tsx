import React, { useRef, useEffect } from 'react';

interface EditorAreaProps {
  text: string;
  onChange: (text: string) => void;
}

export const EditorArea: React.FC<EditorAreaProps> = ({ text, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus the editor on initial load for maximum convenience
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  // Safe estimation of word/character goals
  const maxCharGoal = 10000;
  const progressPercent = Math.min((text.length / maxCharGoal) * 100, 100);

  return (
    <div className="flex flex-col w-full glass-panel rounded-2xl overflow-hidden shadow-2xl animate-fade-in transition-all duration-300">
      {/* Editor Header Decorator */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/60 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider ml-2 font-mono">
            workspace.txt
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium font-mono">
            Goal progress: {text.length} / {maxCharGoal.toLocaleString()} chars
          </span>
        </div>
      </div>

      {/* Main Textarea Area */}
      <div className="relative w-full min-h-[50vh] bg-slate-950/30">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          placeholder="Start typing or copy-paste your text here, or upload a .txt file..."
          className="w-full min-h-[50vh] lg:min-h-[60vh] p-6 lg:p-8 bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none resize-y leading-relaxed font-sans text-base lg:text-lg focus:ring-0 border-0"
        />
        
        {text.length === 0 && (
          <div className="absolute top-28 left-6 lg:left-8 right-6 pointer-events-none select-none text-xs text-slate-700 font-mono hidden md:block">
            <span>💡 Tip: The text is automatically saved in your browser storage so you won't lose it if you reload!</span>
          </div>
        )}
      </div>

      {/* Editor Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-950/80 border-t border-slate-800 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-4">
          <span>LENGTH: {text.length.toLocaleString()}</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">LINES: {text.split('\n').length}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-24 bg-slate-800 rounded-full overflow-hidden">
            <div 
              style={{ width: `${progressPercent}%` }} 
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-300"
            />
          </div>
          <span className="text-[10px] text-slate-500 uppercase">UTF-8</span>
        </div>
      </div>
    </div>
  );
};
