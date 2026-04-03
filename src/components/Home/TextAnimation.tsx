"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type TextAnimationProps = {
    masterTimeline: gsap.core.Timeline | null;
    startLabel: string;
};

const TextAnimation = ({ masterTimeline, startLabel }: TextAnimationProps) => {
    const main = useRef<HTMLDivElement | null>(null);
    const wordContainerRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        if (!main.current || !wordContainerRef.current || !masterTimeline) return;

        const getStartX = () => window.innerWidth;
        const getEndX = () => -wordContainerRef.current!.offsetWidth;

        gsap.set(wordContainerRef.current, {
            x: getStartX(),
            autoAlpha: 1,
        });

        const segment = gsap.timeline();

        segment.to(wordContainerRef.current, {
            x: getEndX(),
            ease: "none",
            duration: 4.5,
        });

        masterTimeline.add(segment, startLabel);

        return () => {
            masterTimeline.remove(segment);
        };
    }, { scope: main, dependencies: [masterTimeline, startLabel] });

    return (
        <div ref={main} className="relative w-full h-screen overflow-hidden bg-black flex items-center">
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-20"
                style={{ backgroundImage: "url('/images/noise-bg.webp')" }}
            />
            <section data-navbar-theme="dark" className="relative w-full flex flex-col items-center justify-center">
                <div className="flex items-center w-full overflow-hidden">
                    <div
                        ref={wordContainerRef}
                        className="min-w-max whitespace-nowrap flex items-end will-change-transform"
                    >
                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[16vw] leading-none font-bold uppercase font-hakobi text-white tracking-wide relative">
                            India’s next chapter will be built by those who refused to wait.
                        </h1>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TextAnimation;
