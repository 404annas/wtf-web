"use client";

import React, { useEffect, useRef, useState } from 'react';
import Hero from '@/components/Home/Hero';
import TextAnimation, { TEXT_ANIMATION_DURATION } from '@/components/Home/TextAnimation';
import TextCards, { TEXT_CARDS_DURATION } from '@/components/Home/TextCards';
import VerticalCards from '@/components/Home/VerticalCards';
import BrandWorks from '@/components/Home/BrandsWorks';
import Footer from '@/components/Home/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { setNavigationHandler, smoothScrollTo, type NavTarget } from '@/lib/navigation';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalWrapper = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const scrollTrigger = masterTimeline?.scrollTrigger;
    if (!scrollTrigger) return;

    const scrollToTarget = (target: NavTarget) => {
      if (target === 'products') {
        return;
      }

      if (target === 'home') {
        smoothScrollTo(0);
        return;
      }

      if (target === 'contact') {
        const footerTop = footerRef.current
          ? footerRef.current.getBoundingClientRect().top + window.scrollY
          : document.documentElement.scrollHeight;

        smoothScrollTo(footerTop);
        return;
      }

      let label = '';

      switch (target) {
        case 'about':
          label = 'section3';
          break;
        case 'services':
          label = 'section4';
          break;
        case 'works':
          label = 'section5';
          break;
      }

      if (label) {
        smoothScrollTo(scrollTrigger.labelToScroll(label));
      }
    };

    setNavigationHandler(scrollToTarget);

    return () => {
      setNavigationHandler(null);
    };
  }, [masterTimeline]);

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
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
