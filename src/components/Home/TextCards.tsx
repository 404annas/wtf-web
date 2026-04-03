"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const cardData = [
  { title: "PODCASTS AND IP'S", borderColor: "#148158", buttonColor: "bg-[#148158]", rotationClass: "-rotate-[6deg]" },
  { title: "WTF COMMUNITY", borderColor: "#B8392F", buttonColor: "bg-[#B8392F]", rotationClass: "-rotate-[2deg]" },
  { title: "WTF OFFLINE", borderColor: "#0B468C", buttonColor: "bg-[#0B468C]", rotationClass: "rotate-[1deg]" },
  { title: "WTF FUND", borderColor: "#D19E30", buttonColor: "bg-[#D19E30]", rotationClass: "rotate-[5deg]" },
];

type TextCardsProps = {
  masterTimeline: gsap.core.Timeline | null;
  startLabel: string;
};

const TextCards = ({ masterTimeline, startLabel }: TextCardsProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textRef.current || !masterTimeline) return;

    const words = textRef.current.querySelectorAll('.word');
    const cards = sectionRef.current.querySelectorAll('.card-item');

    // INITIAL STATE
    // Words: Spread out to the right and hidden
    gsap.set(words, { 
        x: (i) => 900 + (i * 90),
        opacity: 0 
    });
    // Cards: Solid opacity (1) and positioned far below the viewport
    gsap.set(cards, { y: 1000, opacity: 1 });

    const segment = gsap.timeline();

    // 1. Paragraph words fly in from right
    segment.to(words, {
      x: 0,
      opacity: 1,
      stagger: 0.06,
      duration: 1.4,
      ease: "power2.out"
    });

    segment.to({}, { duration: 0.45 }); // Pause

    // 2. Cards enter from bottom (Solid - no fade)
    segment.to(cards, {
      y: 0,
      stagger: 0.18,
      duration: 1.25,
      ease: "power3.out"
    });

    segment.to({}, { duration: 0.6 }); // Pause

    // 3. Cards exit to top (Solid - no fade)
    // Changed yPercent to a large y value to ensure it clears the screen height
    segment.to(cards, {
      y: -1200, 
      stagger: 0.08,
      duration: 1.2,
      ease: "power2.in"
    });

    masterTimeline.add(segment, startLabel);

    return () => {
      masterTimeline.remove(segment);
    };
  }, { scope: sectionRef, dependencies: [masterTimeline, startLabel] });

  const paragraph = "What if the most important conversations in India weren’t being recorded? What if the next generation of builders needed momentum more than motivation? What if community was actually about knowing each other?";
  const wordsArray = paragraph.split(" ");

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen w-full overflow-hidden bg-[#121212] flex flex-col justify-center shrink-0"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-[0.15] pointer-events-none"
        style={{ backgroundImage: "url('/images/noise-bg.webp')" }}
      />
      
      <div className="relative z-10 mx-auto w-full max-w-[1300px] flex flex-col items-center">
        <div className="mb-10 text-center">
          <div className="mb-6 -translate-y-4 flex justify-center">
            <Image src="/images/logo.svg" alt="Logo" width={96} height={40} className="w-24 h-auto object-contain" />
          </div>
          <div ref={textRef} className="mx-auto max-w-[600px] px-4 text-center leading-[1.5] text-white/90">
            {wordsArray.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.3em] text-base md:text-xl font-light tracking-tight">
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-wrap items-end justify-center gap-4 md:gap-5">
          {cardData.map((card, index) => (
            <article
              key={index}
              className={`card-item relative flex h-[320px] w-[230px] shrink-0 flex-col justify-between rounded-[2px] border-[5px] bg-[#efe9dc] px-1 py-2 ${card.rotationClass}`}
              style={{ 
                borderColor: card.borderColor,
                borderStyle: 'solid',
                borderWidth: '5px',
                backgroundImage: "url('/images/noise-bg.webp')",
                backgroundBlendMode: "multiply"
              }}
            >
              <Image src="/images/logo.svg" alt="L" width={30} height={12} className="h-3 object-contain" />
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <h2 className="mb-8 font-serif text-2xl leading-none font-bold uppercase text-[#232323]">
                  {card.title}
                </h2>
                <div className={`rounded-full ${card.buttonColor} px-6 py-2 text-[10px] font-bold text-white uppercase`}>
                  Learn More
                </div>
              </div>
              <Image src="/images/logo.svg" alt="L" width={30} height={12} className="absolute bottom-2 right-2 h-3 w-auto object-contain" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TextCards;