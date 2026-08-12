import React, { useState } from 'react';
import { AppView } from './types/index.js';
import { Header } from './components/Header.js';
import { HeroSection } from './components/HeroSection.js';
import { ExecutiveBio } from './components/ExecutiveBio.js';
import { FeatureGrid } from './components/FeatureGrid.js';
import { StudioSuitesVisualShowcase } from './components/StudioSuitesVisualShowcase.js';
import { SuccessStories } from './components/SuccessStories.js';
import { ComparisonMatrix } from './components/ComparisonMatrix.js';
import { VSLModal } from './components/VSLModal.js';
import { StudioConsole } from './components/StudioConsole.js';
import { Newsletter } from './components/Newsletter.js';
import { Footer } from './components/Footer.js';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('funnel');
  const [isVSLOpen, setIsVSLOpen] = useState(false);

  const handleLaunchConsole = () => {
    setCurrentView('console');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-zinc-50 font-sans selection:bg-red-600 selection:text-white">
      {/* Top Header Navigation */}
      <Header
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenVSL={() => setIsVSLOpen(true)}
      />

      {/* Main View Router */}
      {currentView === 'funnel' ? (
        <main>
          {/* Hero Section */}
          <HeroSection
            onViewChange={setCurrentView}
            onOpenVSL={() => setIsVSLOpen(true)}
          />

          {/* Executive Bio & Authority Card */}
          <ExecutiveBio onViewChange={setCurrentView} />

          {/* Core Feature Grid / Pillars */}
          <FeatureGrid onViewChange={setCurrentView} />

          {/* 3D Claymation Visual Studio Showcase (Recording Studio, Film Studio, Tour Manager, Book Publishing, Virtual Office) */}
          <StudioSuitesVisualShowcase 
            onViewChange={setCurrentView}
            onOpenVSL={() => setIsVSLOpen(true)}
          />

          {/* Success Stories & Client ROI Testimonial Masonry */}
          <SuccessStories onViewChange={setCurrentView} />

          {/* Workflow Comparison Matrix */}
          <ComparisonMatrix onViewChange={setCurrentView} />
        </main>
      ) : (
        <main>
          {/* Interactive Studio Console */}
          <StudioConsole />
        </main>
      )}

      {/* High-Contrast Newsletter Form */}
      <Newsletter />

      {/* High-Contrast Footer */}
      <Footer onViewChange={setCurrentView} />

      {/* 60-Second VSL Video Demo Modal */}
      <VSLModal
        isOpen={isVSLOpen}
        onClose={() => setIsVSLOpen(false)}
        onLaunchConsole={handleLaunchConsole}
      />
    </div>
  );
}
