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

const logoData = [
  { src: "/logos/abn.jpg", alt: "ABN logo", rotationClass: "-rotate-[6deg]" },
  { src: "/logos/ausaf.png", alt: "Ausaf logo", rotationClass: "-rotate-[3deg]" },
  { src: "/logos/bridge2.png", alt: "Bridge logo", rotationClass: "-rotate-[1deg]" },
  { src: "/logos/cock.png", alt: "Cock logo", rotationClass: "rotate-[2deg]" },
  { src: "/logos/hkc.png", alt: "HKC logo", rotationClass: "rotate-[5deg]" },
  { src: "/logos/maas.png", alt: "Maas logo", rotationClass: "-rotate-[4deg]" },
  { src: "/logos/nescafe.jpg", alt: "Nescafe logo", rotationClass: "rotate-[3deg]" },
  { src: "/logos/ok.jpeg", alt: "OK logo", rotationClass: "rotate-[6deg]" },
  { src: "/logos/pepsi.png", alt: "Pepsi logo", rotationClass: "-rotate-[5deg]" },
  { src: "/logos/sony.png", alt: "Sony logo", rotationClass: "rotate-[1deg]" },
  { src: "/logos/T.png", alt: "T logo", rotationClass: "-rotate-[2deg]" },
  { src: "/logos/uniliver.png", alt: "Uniliver logo", rotationClass: "rotate-[4deg]" },
  { src: "/logos/high.png", alt: "High Life Dubai logo", rotationClass: "rotate-[0deg]", isLarge: true },
];

const PARAGRAPH =
  "Proud To Worked With.";
const WORD_COUNT = PARAGRAPH.split(" ").length;
const CARD_COUNT = logoData.length;

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

const BrandWorks = ({ masterTimeline, startLabel }: TextCardsProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

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
        <div className="text-center">
          <div className="-translate-y-4 flex justify-center">
            <Image src="/images/prLogo2.svg" alt="Logo" width={200} height={100} className="w-70 h-auto object-contain" />
          </div>
          <div ref={textRef} className="mx-auto w-full px-4 text-center leading-[1.5] text-white/90">
            {wordsArray.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.3em] text-base md:text-7xl font-light tracking-tight font-hakobi uppercase">
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-x-8 gap-y-6 px-6 pt-6">
          {logoData.map((logo, index) => (
            <div
              key={index}
              className={`card-item flex shrink-0 items-center justify-center ${logo.isLarge ? "h-[140px] w-[280px]" : "h-[100px] w-[180px]"} ${logo.rotationClass}`}
            >
              <div className="relative h-full w-full">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes={logo.isLarge ? "280px" : "180px"}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-center lg:hidden">
        <div className="mx-auto flex w-full max-w-[900px] flex-col items-center px-4 pb-8 text-center sm:px-6 md:px-8">
          <div className="mb-5 flex justify-center sm:mb-6">
            <Image
              src="/images/prLogo2.svg"
              alt="Logo"
              width={200}
              height={100}
              className="h-auto w-40 object-contain sm:w-24 md:w-28"
            />
          </div>
          <div className="mx-auto max-w-[680px] text-3xl uppercase font-hakobi leading-[1.55] text-white/90 sm:text-base md:text-lg">
            {PARAGRAPH}
          </div>
        </div>

        <div className="px-4 pb-0 lg:pb-10 sm:px-6 md:px-8">
          <div className="mx-auto grid max-w-[420px] grid-cols-3 items-center justify-items-center gap-x-3 gap-y-3 pt-4 sm:max-w-[560px] sm:grid-cols-4 sm:gap-x-4 sm:gap-y-6">
            {logoData.map((logo, index) => (
              <div
                key={`mobile-${index}`}
                className={`relative w-full max-w-[120px] ${logo.isLarge ? "col-span-3 h-[72px] max-w-[220px] sm:col-span-2 sm:h-[88px] sm:max-w-[240px]" : "h-[54px] sm:h-[62px]"} ${logo.rotationClass}`}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes={logo.isLarge ? "(max-width: 640px) 220px, 240px" : "(max-width: 640px) 120px, 140px"}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandWorks;
