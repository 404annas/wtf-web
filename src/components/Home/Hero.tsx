"use client";
import React, { useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const gifRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const gifs = [
    { src: "/gifs/heroGif1.gif", color: "#C1392B" }, // Reddish
    { src: "/gifs/heroGif2.gif", color: "#5C52A3" }, // Purple
    { src: "/gifs/heroGif3.gif", color: "#C1392B" }, // Reddish
    { src: "/gifs/heroGif4.gif", color: "#EB7135" }, // Orange
  ];

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const el = gifRefs.current[index];
    const container = containerRefs.current[index];
    if (!el || !container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const moveX = (e.clientX - centerX) * -1; 
    const moveY = (e.clientY - centerY) * -1;

    gsap.to(el, {
      x: moveX,
      y: moveY,
      duration: 0.2,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handleMouseLeave = (index: number) => {
    const el = gifRefs.current[index];
    if (el) {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  };

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-start overflow-hidden bg-[#f2f0e4]">
      {/* 1. Background Layers */}
      <div className="absolute inset-0 bg-dots opacity-100 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-50 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: "url('/images/noise-bg.webp')" }}
      />

      {/* 2. Desktop Hero */}
      <div className="relative z-10 hidden lg:block">
        <div className="relative">
          <img
            loading="lazy"
            src="/images/prLogo.svg"
            alt="WTF Logo"
            className="w-[500px] lg:w-[1600px]"
          />
        </div>
      </div>

      <div className="relative z-20 hidden items-end gap-4 px-10 pt-4 lg:flex">
        <div className="flex items-center justify-center gap-6">
          {gifs.map((gif, idx) => (
            <div 
              key={idx}
              ref={(el) => { containerRefs.current[idx] = el; }}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px]"
            >
              <div
                ref={(el) => { gifRefs.current[idx] = el; }}
                className={`relative w-full h-full overflow-hidden hover:scale-105 cursor-pointer z-10`}
                style={{
                  backgroundColor: gif.color,
                  transform: `rotate(${idx % 2 === 0 ? "-1deg" : "1deg"})`,
                }}
              >
                <img
                  loading="lazy"
                  src={gif.src}
                  alt={`Hero Gif ${idx}`}
                  className="w-full h-full object-cover mix-blend-normal pointer-events-none"
                />

                {/* --- BLACK INNER SHADOW OVERLAY --- */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_40px_rgba(0,0,0,0.8)] z-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Mobile/Tablet Hero */}
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4 pb-8 sm:px-6 md:px-8 lg:hidden">
        <div className="mb-6">
          <img
            loading="lazy"
            src="/images/prLogo.svg"
            alt="WTF Logo"
            className="w-[1000px] md:w-[1200px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          {gifs.map((gif, idx) => (
            <div
              key={`mobile-${idx}`}
              className="relative h-[128px] w-[128px] sm:h-[160px] sm:w-[160px] md:h-[170px] md:w-[170px]"
            >
              <div
                className="relative z-10 h-full w-full overflow-hidden"
                style={{
                  backgroundColor: gif.color,
                  transform: `rotate(${idx % 2 === 0 ? "-1deg" : "1deg"})`,
                }}
              >
                <img
                  loading="lazy"
                  src={gif.src}
                  alt={`Hero Gif ${idx}`}
                  className="h-full w-full object-cover pointer-events-none"
                />
                <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0px_0px_30px_rgba(0,0,0,0.7)]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom Giant Text (Half Visible) */}
      <div className="pointer-events-none absolute bottom-[-40px] lg:bottom-[-50px] left-0 z-0 hidden w-full whitespace-nowrap md:block">
        <h1 className="font-hakobi text-[8vw] leading-none text-black uppercase tracking-tight select-none text-center">
          Cultural Engine For Young India
        </h1>
      </div>
    </section>
  );
};

export default Hero;
