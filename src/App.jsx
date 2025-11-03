import React from 'react';
import Hero3D from './components/Hero3D';
import Gallery from './components/Gallery';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100 antialiased">
      <Hero3D />

      <main className="pb-24">
        <Gallery />

        <section className="mx-auto w-[92%] sm:w-[420px] mt-8">
          <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5 backdrop-blur">
            <h3 className="text-white text-lg font-medium mb-2">About</h3>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Gokula Krishnan is a model with a passion for technology-forward storytelling. This mobile-first portfolio delivers a premium, gesture-driven experience with swipe navigation, pinch-to-zoom, and smooth performance across devices.
            </p>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

export default App;
