import React from 'react';


/**
 * Footer – A premium styled footer that fulfills Google AdSense policy
 * requirements (access to privacy, terms, and contact links). It uses the same
 * glass‑panel utility to blend seamlessly with the dark UI.
 */
const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 border-t border-slate-800 glass-panel backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-300 transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 transition-colors duration-200">Terms of Service</a>
          <a href="#" className="hover:text-slate-300 transition-colors duration-200">Contact</a>
        </div>
        <div>
          © {new Date().getFullYear()} Velion Labs – Premium Word Counter
        </div>
      </div>
    </footer>
  );
};

export default Footer;
