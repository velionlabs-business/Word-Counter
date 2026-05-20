import React, { useRef, useEffect } from 'react';
import { useFileParser } from '../../hooks/useFileParser';
import { Upload, AlertCircle, RefreshCw } from 'lucide-react';

interface FileUploaderProps {
  onTextExtracted: (text: string) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onTextExtracted }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { processFile, isLoading, error, clearError } = useFileParser();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      processFile(files[0], (extractedText) => {
        onTextExtracted(extractedText);
        // Clear input value so same file can be uploaded again
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      });
    }
  };

  // Auto-clear error after 5 seconds to not clutter the UI
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return (
    <div className="flex flex-col items-stretch sm:items-start gap-2 relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".txt,.md,.pdf,.docx,.csv,.json"
        className="hidden"
      />

      <button
        type="button"
        onClick={handleButtonClick}
        disabled={isLoading}
        className="flex items-center justify-center gap-2.5 px-5 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 hover:text-white rounded-xl hover:bg-slate-800/80 active:scale-[0.98] transition-all duration-200 font-medium text-sm group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? (
          <RefreshCw className="w-4 h-4 animate-spin text-violet-400" />
        ) : (
          <Upload className="w-4 h-4 text-violet-400 group-hover:translate-y-[-1px] transition-transform duration-200" />
        )}
        <span>{isLoading ? 'Processing...' : 'Upload Document'}</span>
      </button>

      {/* Modern floating error box */}
      {error && (
        <div className="absolute top-full mt-2 left-0 right-0 sm:right-auto sm:w-64 bg-rose-950/80 border border-rose-800/60 backdrop-blur-md rounded-xl p-3 flex gap-2.5 items-start text-rose-300 text-xs shadow-xl animate-scale-in z-30">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold block mb-0.5">Upload Failed</span>
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};
