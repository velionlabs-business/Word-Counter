import { useState, useEffect } from 'react';
import { TextAnalyzer } from '../core/TextAnalyzer';
import type { TextStats } from '../core/types';

export function useTextEngine() {
  const [text, setText] = useState<string>(() => {
    try {
      return localStorage.getItem('savedText') || '';
    } catch {
      return '';
    }
  });

  const [stats, setStats] = useState<TextStats>(() => {
    try {
      const saved = localStorage.getItem('savedText') || '';
      return TextAnalyzer.getStats(saved);
    } catch {
      return {
        wordCount: 0,
        charCount: 0,
        charCountNoSpaces: 0,
        sentenceCount: 0,
        paragraphCount: 0,
        readingTimeMin: 0,
      };
    }
  });

  // Keep stats and localStorage in sync with text changes
  const handleTextChange = (newText: string) => {
    setText(newText);
    setStats(TextAnalyzer.getStats(newText));
    try {
      localStorage.setItem('savedText', newText);
    } catch (e) {
      console.warn('Failed to save text to localStorage:', e);
    }
  };

  const clearText = () => {
    handleTextChange('');
  };

  // Sync state if localStorage changes from another tab (optional but good practice)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'savedText') {
        const val = e.newValue || '';
        setText(val);
        setStats(TextAnalyzer.getStats(val));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    text,
    stats,
    handleTextChange,
    clearText,
  };
}
