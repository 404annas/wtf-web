"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const WORD_STAGGER = 0.06;
const WORD_ENTRY_DURATION = 1.4;
const WORDS_PAUSE_DURATION = 0.45;
// Increased stagger to make entrance one-by-one
const CARD_ENTRY_STAGGER = 0.5; 
const CARD_ENTRY_DURATION = 1.25;
const CARDS_PAUSE_DURATION = 1.0; // Increased pause to admire the cards
// Increased stagger to make exit one-by-one
const CARD_EXIT_STAGGER = 0.5; 
const CARD_EXIT_DURATION = 1.2;

const cardData = [
  { titleLines: ["PODCASTS", "AND IP'S"], borderColor: "#148158", buttonColor: "bg-[#148158]", rotationClass: "-rotate-[6deg]" },
  { titleLines: ["WTF", "COMMUNITY"], borderColor: "#B8392F", buttonColor: "bg-[#B8392F]", rotationClass: "-rotate-[2deg]" },
  { titleLines: ["WTF", "OFFLINE"], borderColor: "#0B468C", buttonColor: "bg-[#0B468C]", rotationClass: "rotate-[1deg]" },
  { titleLines: ["WTF", "FUND"], borderColor: "#D19E30", buttonColor: "bg-[#D19E30]", rotationClass: "rotate-[5deg]" },
];

const PARAGRAPH =
  "What if the most important conversations in India weren’t being recorded? What if the next generation of builders needed momentum more than motivation? What if community was actually about knowing each other?";
const WORD_COUNT = PARAGRAPH.split(" ").length;
const CARD_COUNT = cardData.length;

export const TEXT_CARDS_DURATION =
  WORD_ENTRY_DURATION +
  WORD_STAGGER * (WORD_COUNT - 1) +
  WORDS_PAUSE_DURATION +
  CARD_ENTRY_DURATION +
  CARD_ENTRY_STAGGER * (CARD_COUNT - 1) +
  CARDS_PAUSE_DURATION +
  CARD_EXIT_DURATION +
  CARD_EXIT_STAGGER * (CARD_COUNT - 1);

type TextCardsProps = {
  masterTimeline: gsap.core.Timeline | null;
  startLabel: string;
};

const TextCards = ({ masterTimeline, startLabel }: TextCardsProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0 });

  useGSAP(() => {
    if (
      !sectionRef.current ||
      !textRef.current ||
      !masterTimeline ||
      window.matchMedia('(max-width: 1023px)').matches
    ) {
      return;
    }

    const words = textRef.current.querySelectorAll('.word');
    const cards = sectionRef.current.querySelectorAll('.card-item');

    // INITIAL STATE
    gsap.set(words, { 
        x: (i) => 900 + (i * 90),
        opacity: 0 
    });
    gsap.set(cards, { y: 1000, opacity: 1 });

    const segment = gsap.timeline();

    // 1. Paragraph words fly in from right
    segment.to(words, {
      x: 0,
      opacity: 1,
      stagger: WORD_STAGGER,
      duration: WORD_ENTRY_DURATION,
      ease: "power2.out"
    });

    segment.to({}, { duration: WORDS_PAUSE_DURATION });

    // 2. Cards enter from bottom (Sequential)
    segment.to(cards, {
      y: 0,
      stagger: CARD_ENTRY_STAGGER,
      duration: CARD_ENTRY_DURATION,
      ease: "power3.out"
    });

    segment.to({}, { duration: CARDS_PAUSE_DURATION });

    // 3. Cards exit to top (Sequential)
    segment.to(cards, {
      y: -1200, 
      stagger: CARD_EXIT_STAGGER,
      duration: CARD_EXIT_DURATION,
      ease: "power2.in"
    });

    masterTimeline.add(segment, startLabel);

    return () => {
      masterTimeline.remove(segment);
    };
  }, { scope: sectionRef, dependencies: [masterTimeline, startLabel] });

  const wordsArray = PARAGRAPH.split(" ");

  const handleScrollerMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const scroller = mobileScrollerRef.current;
    if (!scroller) return;

    dragStateRef.current = {
      isDragging: true,
      startX: event.pageX,
      scrollLeft: scroller.scrollLeft,
    };
  };

  const handleScrollerMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const scroller = mobileScrollerRef.current;
    const dragState = dragStateRef.current;

    if (!scroller || !dragState.isDragging) return;

    event.preventDefault();
    const deltaX = event.pageX - dragState.startX;
    scroller.scrollLeft = dragState.scrollLeft - deltaX;
  };

  const stopScrollerDrag = () => {
    dragStateRef.current.isDragging = false;
  };

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
      
      <div className="relative z-10 mx-auto hidden w-full max-w-[1300px] flex-col items-center lg:flex">
        <div className="mb-10 text-center">
          <div className="mb-6 -translate-y-4 flex justify-center">
            <Image src="/images/logo.svg" alt="Logo" width={96} height={40} className="w-24 h-auto object-contain" />
          </div>
          <div ref={textRef} className="mx-auto max-w-[600px] px-4 text-center leading-[1.5] text-white/90">
            {wordsArray.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.3em] text-base md:text-lg font-light tracking-tight">
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
                <h2 className="mb-8 font-serif text-3xl leading-none font-thin uppercase text-[#232323]">
                  {card.titleLines.map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                      {line}
                      {lineIndex < card.titleLines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
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

      <div className="relative z-10 flex h-full w-full flex-col justify-center lg:hidden">
        <div className="mx-auto flex w-full max-w-[900px] flex-col items-center px-4 pb-8 pt-4 text-center sm:px-6 md:px-8">
          <div className="mb-5 flex justify-center sm:mb-6">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={96}
              height={40}
              className="h-auto w-20 object-contain sm:w-24 md:w-28"
            />
          </div>
          <div className="mx-auto max-w-[680px] text-sm leading-[1.55] text-white/90 sm:text-base md:text-lg">
            {PARAGRAPH}
          </div>
        </div>

        <div
          ref={mobileScrollerRef}
          className="cursor-grab overflow-x-auto px-4 pb-10 sm:px-6 md:px-8 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
          onMouseDown={handleScrollerMouseDown}
          onMouseMove={handleScrollerMouseMove}
          onMouseLeave={stopScrollerDrag}
          onMouseUp={stopScrollerDrag}
        >
          <div className="flex w-max items-end gap-3 sm:gap-4 md:gap-5 pt-4">
            {cardData.map((card, index) => (
              <article
                key={`mobile-${index}`}
                className={`relative flex h-[240px] w-[calc((100vw-2.75rem)/1.5)] shrink-0 flex-col justify-between rounded-[2px] border-[5px] bg-[#efe9dc] px-1 py-2 sm:h-[300px] sm:w-[calc((100vw-4rem)/1.5)] md:h-[320px] md:w-[calc((100vw-6rem-2.5rem)/2.5)] ${card.rotationClass}`}
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
                  <h2 className="mb-7 font-serif text-[1.2rem] leading-none font-thin uppercase text-[#232323] sm:text-[2.15rem] md:text-3xl">
                    {card.titleLines.map((line, lineIndex) => (
                      <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex < card.titleLines.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </h2>
                  <div className={`rounded-full ${card.buttonColor} px-6 py-2 text-[10px] font-bold uppercase text-white`}>
                    Learn More
                  </div>
                </div>
                <Image src="/images/logo.svg" alt="L" width={30} height={12} className="absolute bottom-2 right-2 h-3 w-auto object-contain" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextCards;
