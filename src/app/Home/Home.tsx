"use client";

import React, { useRef, useState } from 'react';
import Hero from '@/components/Home/Hero';
import TextAnimation from '@/components/Home/TextAnimation';
import TextCards from '@/components/Home/TextCards';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalWrapper = useRef<HTMLDivElement>(null);
  const [masterTimeline, setMasterTimeline] = useState<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!containerRef.current || !horizontalWrapper.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1100%",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    setMasterTimeline(tl);

    tl.to(horizontalWrapper.current, {
      x: "-100vw",
      ease: "none",
      duration: 1.2,
    });

    tl.addLabel("section2");
    tl.to({}, { duration: 4.5 });

    tl.to(horizontalWrapper.current, {
      x: "-200vw",
      ease: "none",
      duration: 1.2,
    });

    tl.addLabel("section3");
    tl.to({}, { duration: 4.5 });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full h-screen overflow-hidden">
      <div ref={horizontalWrapper} className="flex w-[300vw] h-full flex-row">
        <div className="w-[100vw] h-full flex-shrink-0">
          <Hero />
        </div>
        <div className="w-[100vw] h-full flex-shrink-0">
          <TextAnimation masterTimeline={masterTimeline} startLabel="section2" />
        </div>
        <div className="w-[100vw] h-full flex-shrink-0">
          <TextCards masterTimeline={masterTimeline} startLabel="section3" />
        </div>
      </div>
    </div>
  );
};

export default Home;
