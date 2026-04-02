"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TextAnimation = () => {
    const main = useRef<HTMLDivElement | null>(null);
    const wordContainerRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (!main.current || !wordContainerRef.current) return;

        const ctx = gsap.context(() => {
            const getStartX = () => window.innerWidth;
            const getEndX = () => -wordContainerRef.current!.offsetWidth;
            const getTravelDistance = () => getStartX() + wordContainerRef.current!.offsetWidth;
            const getScrollDistance = () => Math.max(getTravelDistance() * 1.8, window.innerHeight * 10);

            gsap.set(wordContainerRef.current, {
                x: getStartX(),
                autoAlpha: 1,
            });

            gsap.to(wordContainerRef.current, {
                x: getEndX,
                ease: "none",
                scrollTrigger: {
                    trigger: main.current,
                    start: "top top",
                    end: () => `+=${getScrollDistance()}`,
                    scrub: 2.5,
                    invalidateOnRefresh: true,
                },
            });
        }, main);

        return () => ctx.revert();
    }, []);

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
