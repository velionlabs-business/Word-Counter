import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  className?: string;
}

/**
 * AdBanner - A reusable, lifecycle-safe Google AdSense banner component.
 *
 * Key Design Decisions:
 * - Uses a `useEffect` with a `hasInitialized` ref to push to `window.adsbygoogle`
 *   only ONCE per mount. This prevents crashes caused by React re-renders
 *   attempting to reinitialize an already-loaded ad unit.
 * - Wraps the push in a `try-catch` to gracefully degrade when ad-blockers
 *   (uBlock Origin, Brave Shield, etc.) intercept the script.
 * - The outer wrapper div provides a minimum height to prevent Cumulative
 *   Layout Shift (CLS) — a Core Web Vital metric that affects SEO ranking.
 */
const AdBanner: React.FC<AdBannerProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
}) => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Guard: only push once, even if the component re-renders
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      // Ad-blocker or script failure — fail silently so the app stays functional
      console.warn('[AdBanner] AdSense initialization was blocked or failed:', err);
    }
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-slate-800/40 bg-slate-900/20 backdrop-blur-sm flex justify-center items-center min-h-[90px] ${className}`}
      aria-label="Advertisement"
    >
      {/* Subtle label to inform users about the ad region */}
      <span className="absolute top-1 left-2 text-[10px] font-mono text-slate-600 uppercase tracking-widest select-none pointer-events-none">
        Ad
      </span>

      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={String(fullWidthResponsive)}
      />
    </div>
  );
};

export default AdBanner;
