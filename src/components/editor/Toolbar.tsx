import React, { useState } from 'react';
import { Copy, Check, Trash2 } from 'lucide-react';

interface ToolbarProps {
  onClear: () => void;
  onCopy: () => void;
  isTextEmpty: boolean;
  children?: React.ReactNode;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onClear,
  onCopy,
  isTextEmpty,
  children,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    onCopy();
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full bg-slate-900/40 p-4 border border-slate-800 rounded-2xl backdrop-blur-sm shadow-md">
      {/* File Upload Section */}
      <div className="flex-grow flex items-center justify-start">
        {children}
      </div>

      {/* Main Operations Section */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleCopyClick}
          disabled={isTextEmpty}
          className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
            isCopied
              ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
              : 'bg-violet-600 hover:bg-violet-500 border border-transparent text-white active:scale-[0.98]'
          }`}
        >
          {isCopied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Text</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onClear}
          disabled={isTextEmpty}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-950 border border-slate-800 hover:border-rose-900/60 text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 active:scale-[0.98] rounded-xl font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear All</span>
        </button>
      </div>
    </div>
  );
};
