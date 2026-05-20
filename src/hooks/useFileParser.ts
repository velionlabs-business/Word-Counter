import { useState, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

// @ts-ignore
import mammoth from 'mammoth/mammoth.browser';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export interface FileParserConfig {
  maxSizeMb?: number;
}

export function useFileParser(config: FileParserConfig = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { maxSizeMb = 10 } = config;

  const processFile = useCallback(
    async (file: File, onComplete: (text: string) => void) => {
      setIsLoading(true);
      setError(null);

      // Verify file size limit
      const maxSize = maxSizeMb * 1024 * 1024;
      if (file.size > maxSize) {
        setError(`File size exceeds limit of ${maxSizeMb}MB.`);
        setIsLoading(false);
        return;
      }

      const fileName = file.name.toLowerCase();
      
      try {
        if (fileName.endsWith('.pdf')) {
          await parsePDF(file, onComplete);
        } else if (fileName.endsWith('.docx')) {
          await parseDOCX(file, onComplete);
        } else if (
          fileName.endsWith('.txt') ||
          fileName.endsWith('.md') ||
          fileName.endsWith('.csv') ||
          fileName.endsWith('.json') ||
          file.type.startsWith('text/')
        ) {
          parseText(file, onComplete);
        } else {
          setError('Unsupported file format. Supported: .txt, .md, .pdf, .docx, .csv, .json');
        }
      } catch (err: any) {
        console.error("File parsing error:", err);
        setError(err.message || 'An error occurred while parsing the file.');
      } finally {
        if (!fileName.endsWith('.pdf') && !fileName.endsWith('.docx')) {
           // Text parsing is sync (using onload), so finally block will run before onload. 
           // We manage setIsLoading inside parseText in that case.
           // For PDF and DOCX (async), we can manage it here.
        }
      }
    },
    [maxSizeMb]
  );

  const parseText = (file: File, onComplete: (text: string) => void) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        onComplete(content);
      } catch (err) {
        setError('Failed to extract content from text file.');
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      setError('Error reading file. The file might be corrupted.');
      setIsLoading(false);
    };
    reader.readAsText(file);
  };

  const parseDOCX = async (file: File, onComplete: (text: string) => void) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      onComplete(result.value);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to extract text from DOCX document.');
    } finally {
      setIsLoading(false);
    }
  };

  const parsePDF = async (file: File, onComplete: (text: string) => void) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument(new Uint8Array(arrayBuffer));
      const pdf = await loadingTask.promise;
      
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\\n\\n';
      }
      
      onComplete(fullText.trim());
    } catch (error) {
      console.error(error);
      throw new Error('Failed to extract text from PDF document.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = useCallback(() => setError(null), []);

  return {
    processFile,
    isLoading,
    error,
    clearError,
  };
}
