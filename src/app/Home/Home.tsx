"use client";

import React, { useRef, useState } from 'react';
import Hero from '@/components/Home/Hero';
import TextAnimation, { TEXT_ANIMATION_DURATION } from '@/components/Home/TextAnimation';
import TextCards, { TEXT_CARDS_DURATION } from '@/components/Home/TextCards';
import VerticalCards from '@/components/Home/VerticalCards';
import BrandWorks from '@/components/Home/BrandsWorks';
import Footer from '@/components/Home/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalWrapper = useRef<HTMLDivElement>(null);
  const [masterTimeline, setMasterTimeline] = useState<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!horizontalSectionRef.current || !horizontalWrapper.current) return;

    const isBelowLg = window.matchMedia('(max-width: 1023px)').matches;
    const textCardsDuration = isBelowLg ? 0.35 : TEXT_CARDS_DURATION;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: horizontalSectionRef.current,
        start: "top top",
        end: "+=2000%",
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

    tl.addLabel("section2", "-=0.8");
    tl.to({}, { duration: TEXT_ANIMATION_DURATION });

    tl.to(horizontalWrapper.current, {
      x: "-200vw",
      ease: "none",
      duration: 1.2,
    });

    tl.addLabel("section3");
    tl.to({}, { duration: textCardsDuration });

    tl.to(horizontalWrapper.current, {
      x: "-300vw",
      ease: "none",
      duration: 1.2,
    });

    tl.addLabel("section4");
    tl.to({}, { duration: 6 });

    tl.to(horizontalWrapper.current, {
      x: "-400vw",
      ease: "none",
      duration: 1.2,
    });

    tl.addLabel("section5");
    tl.to({}, { duration: textCardsDuration });

    return () => {
      setMasterTimeline(null);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, { scope: horizontalSectionRef });

  return (
    <div className="w-full">
      <div ref={horizontalSectionRef} className="h-screen w-full overflow-hidden">
        <div ref={horizontalWrapper} className="flex h-full w-[500vw] flex-row">
          <div className="h-full w-[100vw] flex-shrink-0">
            <Hero />
          </div>
          <div className="h-full w-[100vw] flex-shrink-0">
            <TextAnimation masterTimeline={masterTimeline} startLabel="section2" />
          </div>
          <div className="h-full w-[100vw] flex-shrink-0">
            <TextCards masterTimeline={masterTimeline} startLabel="section3" />
          </div>
          <div className="h-full w-[100vw] flex-shrink-0">
            <VerticalCards masterTimeline={masterTimeline} startLabel="section4" />
          </div>
          <div className="h-full w-[100vw] flex-shrink-0">
            <BrandWorks masterTimeline={masterTimeline} startLabel="section5" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
