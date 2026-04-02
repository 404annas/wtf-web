"use client";

import { useRef } from 'react';
import Hero from '@/components/Home/Hero';
import TextAnimation from '@/components/Home/TextAnimation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TextCards from '@/components/Home/TextCards';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalWrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1500%",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    tl.to(horizontalWrapper.current, {
      x: "-100vw",
      ease: "none",
      duration: 1.2,
    });

    // Keep the text section centered for the rest of the pinned scroll
    tl.to({}, {
      duration: 6.8,
    });

  }, { scope: containerRef });

  return (
    // This container is pinned and stays fixed on screen during scroll
    <div ref={containerRef} className="w-full h-screen overflow-hidden">
      
      {/* This wrapper holds both sections side by side */}
      <div ref={horizontalWrapper} className="flex w-[200vw] h-full flex-row">
        
        {/* Section 1: Hero (Fixed 100vw) */}
        <div className="w-[100vw] h-full flex-shrink-0">
          <Hero />
        </div>

        {/* Section 2: Text Animation (Fixed 100vw) */}
        <div className="w-[100vw] h-full flex-shrink-0">
          <TextAnimation />
        </div>
        
      {/* Section 3: Text Cards (Fixed 100vw) */}
        <div className="w-[100vw] h-full flex-shrink-0">
          <TextCards />
        </div>

      </div>
    </div>
  );
};

export default Home;
