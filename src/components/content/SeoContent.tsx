import React from 'react';

/**
 * SeoContent – A small set of premium‑styled content blocks that provide
 * value‑rich text for search‑engine crawlers. The content is static, but it
 * contains FAQs and a brief description of the Word Counter tool. It uses the
 * same glass‑morphism utilities as the rest of the app to keep visual cohesion.
 */
const SeoContent: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto my-12 p-6 glass-panel">
      <h2 className="text-2xl font-semibold mb-4 text-glow-violet">About This Word Counter</h2>
      <p className="mb-4 text-slate-300">
        The Word Counter is a premium, fully client‑side tool that helps writers,
        students, and SEO professionals count words, characters, sentences, and
        paragraphs instantly. All data stays in your browser – no server, no
        telemetry, and complete privacy.
      </p>

      <details className="mb-3">
        <summary className="cursor-pointer font-medium text-glow-emerald">How is reading time calculated?</summary>
        <p className="mt-2 text-slate-400">
          Reading time is estimated using an average speed of 200 words per minute.
          The calculation is performed locally in the browser, so the result is
          instant and private.
        </p>
      </details>

      <details className="mb-3">
        <summary className="cursor-pointer font-medium text-glow-emerald">Does this save my data?</summary>
        <p className="mt-2 text-slate-400">
          No. The application never stores your text on a server. All analysis is
          performed in memory, and the content is cleared when you refresh or close
          the page.
        </p>
      </details>
    </section>
  );
};

export default SeoContent;
