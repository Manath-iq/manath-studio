import React, { useRef, useEffect } from 'react';
import { Scene } from './components/Scene';
import { CustomCursor } from './components/CustomCursor';
import { TextReveal, StaggerText } from './components/TextReveal';
import { ArrowDown } from 'lucide-react';
import ReactLenis from 'lenis/react';

const App: React.FC = () => {
  // Ref to store normalized scroll progress (0 to 1) to pass to 3D scene without re-renders
  const scrollRef = useRef(0);

  // Update scroll ref on scroll event
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      // Calculate normalized value (0 to 1)
      scrollRef.current = Math.min(Math.max(currentScroll / totalHeight, 0), 1);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ReactLenis root>
      <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black cursor-none">

        <CustomCursor />

        {/* 3D Background - Fixed */}
        <Scene scrollRef={scrollRef} />

        {/* Content Overlay - mix-blend-difference ensures text inverts when over the white 3D model */}
        {/* We apply mix-blend-difference to the ENTIRE main container so all text blends against the scene */}
        <main className="relative z-10 w-full pointer-events-none mix-blend-difference">

          {/* SECTION 1: HERO */}
          <section className="h-screen w-full flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto relative">
            {/* mix-blend-difference container */}
            <div className="flex flex-col items-start space-y-2 pointer-events-auto">
              <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif italic text-white tracking-wide">
                <StaggerText text="creativity studio" />
              </h1>
              <h2 className="text-4xl md:text-7xl lg:text-8xl font-sans font-black tracking-tighter text-white">
                <TextReveal delay={0.4}>by manath</TextReveal>
              </h2>
            </div>

            <div className="absolute bottom-12 left-6 md:left-20 flex items-center gap-4 animate-bounce">
              <span className="font-serif italic text-sm text-gray-300">scroll to explore</span>
              <ArrowDown className="w-4 h-4 text-white" />
            </div>
          </section>

          {/* SECTION 2: THE JOKE */}
          <section className="h-[150vh] w-full flex items-center justify-center px-6 relative">
            {/* Removed background card, using pure text with difference blend mode */}
            <div className="max-w-3xl text-center pointer-events-auto">
              <div className="text-3xl md:text-6xl font-serif italic text-white leading-tight">
                <StaggerText text='"Тут на самом деле больше ничего нет, можешь дальше не листать..."' />
              </div>
              <div className="mt-8 text-sm font-sans text-white/80 uppercase tracking-[0.2em] inline-block">
                <TextReveal delay={0.2}>(это серьезно)</TextReveal>
              </div>
            </div>
          </section>

          {/* SECTION 3: FOOTER / CONTACT */}
          <section className="h-[80vh] w-full flex flex-col items-center justify-center relative pb-20">
            <div className="text-center space-y-8 z-20 pointer-events-auto">
              <p className="font-serif italic text-2xl md:text-3xl text-white">
                <TextReveal>ну ладно, вот мой контакт</TextReveal>
              </p>
              <a
                href="https://t.me/manath"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block block"
              >
                <span className="text-7xl md:text-[10rem] leading-none font-sans font-black tracking-tighter text-white transition-all duration-300">
                  <StaggerText text="@manath" />
                </span>
                <div className="h-2 w-0 bg-white group-hover:w-full transition-all duration-300 ease-out mt-4"></div>
              </a>
            </div>

            <div className="absolute bottom-10 w-full text-center">
              <p className="text-xs font-sans text-gray-400 uppercase tracking-widest">
                © {new Date().getFullYear()} Manath. All rights reserved.
              </p>
            </div>
          </section>

        </main>
      </div>
    </ReactLenis>
  );
};

export default App;