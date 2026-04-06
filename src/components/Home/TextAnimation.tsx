"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

export const TEXT_ANIMATION_DURATION = 7.8;

type TextAnimationProps = {
    masterTimeline: gsap.core.Timeline | null;
    startLabel: string;
};

const TextAnimation = ({ masterTimeline, startLabel }: TextAnimationProps) => {
    const main = useRef<HTMLDivElement | null>(null);
    const wordContainerRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLHeadingElement | null>(null);

    useGSAP(() => {
        if (!main.current || !wordContainerRef.current || !textRef.current || !masterTimeline) return;

        // 1. Split text into characters
        const split = new SplitText(textRef.current, { type: "chars" });
        const chars = split.chars;

        const getStartX = () => window.innerWidth;
        const getEndX = () => {
            const wordWidth = wordContainerRef.current!.offsetWidth;
            const visibleTail = window.innerWidth * 0.70;
            return -(wordWidth - visibleTail);
        };

        // 2. Initial Setup
        // Set the horizontal container position
        gsap.set(wordContainerRef.current, {
            x: getStartX(),
            autoAlpha: 1,
        });

        // Calculate a safe distance to ensure characters are OUTSIDE the screen
        // window.innerHeight is the full height of the section.
        const offScreenDistance = window.innerHeight;

        chars.forEach((char, i) => {
            gsap.set(char, {
                // Every even char comes from top-0 (above screen)
                // Every odd char comes from bottom-0 (below screen)
                y: i % 2 === 0 ? -offScreenDistance : offScreenDistance,
                opacity: 0,
            });
        });

        const segment = gsap.timeline();

        // 3. Horizontal Slide (Timeline Logic)
        segment.to(wordContainerRef.current, {
            x: getEndX(),
            ease: "none",
            duration: TEXT_ANIMATION_DURATION,
        }, 0);

        // 4. Character Assembly Animation (Flying from Screen Edges)
        segment.to(chars, {
            y: 0,
            opacity: 1,
            ease: "power2.inOut",
            duration: 1.8, // Duration of the "fly-in" for each letter
            stagger: {
                // This distributes the entry of letters across the whole horizontal scroll
                each: (TEXT_ANIMATION_DURATION - 2) / chars.length,
                from: "start"
            }
        }, 0.2); // Start fly-in shortly after the slide begins

        masterTimeline.add(segment, startLabel);

        return () => {
            masterTimeline.remove(segment);
            split.revert();
        };
    }, { scope: main, dependencies: [masterTimeline, startLabel] });

    return (
        <div ref={main} className="relative w-full h-screen overflow-hidden bg-black flex items-center">
            {/* Background Texture */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-20"
                style={{ backgroundImage: "url('/images/noise-bg.webp')" }}
            />
            
            {/* Top Logo */}
            <div className="absolute top-4 left-1/2 z-10 -translate-x-1/2">
                <Image
                    src="/images/logo.svg"
                    alt="WTF Logo"
                    width={90}
                    height={40}
                    className="h-auto w-20 sm:w-24 md:w-26"
                    priority
                />
            </div>

            <section className="relative w-full flex flex-col items-center justify-center">
                <div className="flex items-center w-full">
                    {/* 
                        NOTE: Removed overflow-hidden from wordContainerRef 
                        so the characters are visible as they fly from top/bottom 0
                    */}
                    <div
                        ref={wordContainerRef}
                        className="min-w-max whitespace-nowrap flex items-end will-change-transform"
                    >
                        <h1 
                            ref={textRef}
                            className="text-7xl sm:text-7xl md:text-8xl lg:text-[16vw] leading-none font-bold uppercase font-hakobi text-white tracking-wide relative"
                        >
                            India’s next chapter will be built by those who refused to wait.
                        </h1>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TextAnimation;