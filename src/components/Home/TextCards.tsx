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

  useGSAP(() => {
    if (!sectionRef.current || !textRef.current || !masterTimeline) return;

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
    </section>
  );
};

export default TextCards;