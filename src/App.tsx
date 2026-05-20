import { Header } from './components/layout/Header';
import { StatPanel } from './components/stats/StatPanel';
import { Toolbar } from './components/editor/Toolbar';
import { EditorArea } from './components/editor/EditorArea';
import { FileUploader } from './components/shared/FileUploader';
import { useTextEngine } from './hooks/useTextEngine';
import AdBanner from './components/ads/AdBanner';
import SeoContent from './components/content/SeoContent';
import Footer from './components/layout/Footer';

const App: React.FC = () => {
  const { text, stats, handleTextChange, clearText } = useTextEngine();

  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
  };

  const isTextEmpty = text.length === 0;

  return (
    <div className="relative min-h-screen bg-slate-950 flex flex-col overflow-hidden selection:bg-violet-500/30 selection:text-violet-200">

      {/* Background Ambient Glowing Blobs */}
      <div className="absolute top-[10%] left-[5%] w-[35rem] h-[35rem] bg-violet-600/10 glow-blob" />
      <div className="absolute top-[40%] right-[10%] w-[40rem] h-[40rem] bg-blue-600/10 glow-blob" />
      <div className="absolute bottom-[5%] left-[20%] w-[30rem] h-[30rem] bg-indigo-600/10 glow-blob" />

      {/* Header */}
      <Header />

      {/* Top Leaderboard Ad */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 mt-4">
        <AdBanner adSlot="1234567890" className="w-full min-h-[90px]" />
      </div>

      {/* Main Content Area: Editor + Vertical Sidebar Ad */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col lg:flex-row gap-6 py-6">

        {/* Primary Workspace */}
        <main className="flex-1 flex flex-col gap-6 min-w-0">

          {/* Stats Metrics */}
          <section aria-label="Text Statistics">
            <StatPanel stats={stats} />
          </section>

          {/* Toolbar */}
          <section aria-label="Editor Controls">
            <Toolbar onClear={clearText} onCopy={handleCopyText} isTextEmpty={isTextEmpty}>
              <FileUploader onTextExtracted={handleTextChange} />
            </Toolbar>
          </section>

          {/* Text Editor */}
          <section aria-label="Text Editor" className="flex-1 flex">
            <EditorArea text={text} onChange={handleTextChange} />
          </section>

        </main>

        {/* Right Sidebar — Vertical Ad (hidden on mobile/tablet) */}
        <aside className="hidden lg:flex flex-col gap-6 w-[200px] flex-shrink-0 sticky top-24 self-start">
          <AdBanner
            adSlot="vertical-slot"
            adFormat="vertical"
            className="w-full min-h-[600px]"
          />
        </aside>

      </div>

      {/* SEO Content — last section before footer */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SeoContent />
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default App;
