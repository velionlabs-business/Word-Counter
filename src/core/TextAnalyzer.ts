import type { TextStats } from './types';

export class TextAnalyzer {
  /**
   * Calculates all statistics for the given text.
   */
  public static getStats(text: string): TextStats {
    if (!text) {
      return {
        wordCount: 0,
        charCount: 0,
        charCountNoSpaces: 0,
        sentenceCount: 0,
        paragraphCount: 0,
        readingTimeMin: 0,
      };
    }

    const wordCount = this.calculateWordCount(text);
    const charCount = text.length;
    const charCountNoSpaces = this.calculateCharCountNoSpaces(text);
    const sentenceCount = this.calculateSentenceCount(text);
    const paragraphCount = this.calculateParagraphCount(text);
    const readingTimeMin = this.calculateReadingTime(wordCount);

    return {
      wordCount,
      charCount,
      charCountNoSpaces,
      sentenceCount,
      paragraphCount,
      readingTimeMin,
    };
  }

  /**
   * Words: Trim text, split by whitespace /\s+/, filter out empty strings.
   */
  private static calculateWordCount(text: string): number {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).filter(Boolean).length;
  }

  /**
   * Characters (no spaces): length after stripping all whitespace.
   */
  private static calculateCharCountNoSpaces(text: string): number {
    return text.replace(/\s/g, '').length;
  }

  /**
   * Sentences: Split by /[\.\!\?]+/ followed by whitespace, filter empty.
   */
  private static calculateSentenceCount(text: string): number {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    
    // Split on punctuation followed by whitespace (or end of text)
    // Matches sentences like "Hello! Yes, standard. Ok."
    const sentences = trimmed.split(/[.!?]+(?:\s+|$)/).filter(Boolean);
    return sentences.length;
  }

  /**
   * Paragraphs: Split by double line breaks /\n\n+/ or /\r\n\r\n+/
   */
  private static calculateParagraphCount(text: string): number {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    
    // Normalize line endings to LF, then split by double newlines
    const normalized = trimmed.replace(/\r\n/g, '\n');
    return normalized.split(/\n\n+/).filter(Boolean).length;
  }

  /**
   * Reading Time: total words / 225 (words per min), ceiling.
   */
  private static calculateReadingTime(wordCount: number): number {
    return Math.ceil(wordCount / 225);
  }
}
