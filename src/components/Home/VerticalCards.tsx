"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import VerticalCard1 from '@/ui/VerticalCard1'
import VerticalCard2 from '@/ui/VerticalCard2'
import VerticalCard3 from '@/ui/VerticalCard3'
import VerticalCard4 from '@/ui/VerticalCard4'
import VerticalCard5 from '@/ui/VerticalCard5'

gsap.registerPlugin(useGSAP);

const RECEDING_ROTATIONS = [4, -4, 0, 4, 0];

type VerticalCardsProps = {
  masterTimeline: gsap.core.Timeline | null;
  startLabel: string;
};

const VerticalCards = ({ masterTimeline, startLabel }: VerticalCardsProps) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const cardWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardContentsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current || !masterTimeline) return;

    const wrappers = cardWrappersRef.current.filter((card) => card !== null);
    const contents = cardContentsRef.current.filter((card) => card !== null);
    if (wrappers.length === 0 || contents.length === 0) return;

    gsap.set(wrappers.slice(1), { yPercent: 100, force3D: true });
    gsap.set(contents, {
      scale: 1,
      rotate: 0,
      filter: "brightness(1)",
      transformOrigin: "center center",
      force3D: true,
      backfaceVisibility: "hidden",
    });

    const tl = gsap.timeline();

    wrappers.forEach((card, index) => {
      if (index > 0) {
        tl.to(card, {
            yPercent: 0, 
            ease: "none",
            duration: 1.15,
          }
        );

        tl.to(contents[index - 1], {
          scale: 0.9,
          rotate: RECEDING_ROTATIONS[index - 1],
          filter: "brightness(0.6)",
          ease: "none",
          duration: 1.15,
        }, "<");

        if (index < wrappers.length - 1) {
          tl.to({}, { duration: 0.35 });
        }
      }
    });

    masterTimeline.add(tl, startLabel);

    return () => {
      masterTimeline.remove(tl);
    };
  }, { scope: containerRef, dependencies: [masterTimeline, startLabel] });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black shrink-0">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-cover bg-center bg-no-repeat opacity-[0.15]"
          style={{ backgroundImage: "url('/images/noise-bg.webp')" }}
        />

        <div className="relative h-full w-full">
            <div 
              ref={(el) => { cardWrappersRef.current[0] = el }} 
              className="absolute inset-0 z-10 h-full w-full"
            >
              <div
                ref={(el) => { cardContentsRef.current[0] = el }}
                className="h-full w-full will-change-transform"
              >
                <VerticalCard1 />
              </div>
            </div>

            <div 
              ref={(el) => { cardWrappersRef.current[1] = el }} 
              className="absolute inset-0 z-20 h-full w-full"
            >
              <div
                ref={(el) => { cardContentsRef.current[1] = el }}
                className="h-full w-full will-change-transform"
              >
                <VerticalCard2 />
              </div>
            </div>

            <div 
              ref={(el) => { cardWrappersRef.current[2] = el }} 
              className="absolute inset-0 z-30 h-full w-full"
            >
              <div
                ref={(el) => { cardContentsRef.current[2] = el }}
                className="h-full w-full will-change-transform"
              >
                <VerticalCard3 />
              </div>
            </div>

            <div 
              ref={(el) => { cardWrappersRef.current[3] = el }} 
              className="absolute inset-0 z-40 h-full w-full"
            >
              <div
                ref={(el) => { cardContentsRef.current[3] = el }}
                className="h-full w-full will-change-transform"
              >
                <VerticalCard4 />
              </div>
            </div>

            <div 
              ref={(el) => { cardWrappersRef.current[4] = el }} 
              className="absolute inset-0 z-50 h-full w-full"
            >
              <div
                ref={(el) => { cardContentsRef.current[4] = el }}
                className="h-full w-full will-change-transform"
              >
                <VerticalCard5 />
              </div>
            </div>
        </div>
    </section>
  )
}

export default VerticalCards;
