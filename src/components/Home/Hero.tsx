"use client";
import React from "react";
import Image from "next/image";

const Hero = () => {
  const gifs = [
    { src: "/gifs/heroGif1.gif", color: "#C1392B" }, // Reddish
    { src: "/gifs/heroGif2.gif", color: "#5C52A3" }, // Purple
    { src: "/gifs/heroGif3.gif", color: "#C1392B" }, // Reddish
    { src: "/gifs/heroGif4.gif", color: "#EB7135" }, // Orange
  ];

  return (
    <section className="relative w-full h-screen bg-[#f2f0e4] overflow-hidden flex flex-col items-center justify-start pt-2">
      {/* 1. Background Layers */}
      <div className="absolute inset-0 bg-dots opacity-100 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-50 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: "url('/images/noise-bg.webp')" }}
      />

      {/* 2. Top Logo Section */}
      <div className="relative z-10">
        {/* Big Logo Image */}
        <div className="relative">
          <img
          loading="lazy"
            src="/images/logo.svg"
            alt="WTF Logo"
            className="w-[500px] md:w-[600px]]"
          />
        </div>
      </div>

      {/* 3. Middle Collage Section (Purple box + 4 GIFs) */}
      <div className="relative z-20 flex items-end gap-4 px-10 pt-6">
        {/* Purple Info Box */}
        {/* <div className="relative rotate-[-3deg] mb-6 hidden lg:block">
          <div className="w-[260px] bg-[#5C52A3] p-6 inner-shadow-purple border-2 border-black/20 rounded-lg transform">
            <p className="text-white font-hakobi text-lg leading-tight tracking-tight">
              WTF is a question that became a movement. Where conversations
              spark action and community means something beyond a group chat.
              Built for those who think differently.
            </p>
          </div>
        </div> */}

        {/* 4 GIFs Grid */}
        <div className="flex items-center justify-center gap-3">
          {gifs.map((gif, idx) => (
            <div
              key={idx}
              className={`relative w-[200px] h-[200px] md:w-[250px] md:h-[250px] overflow-hidden transition-transform hover:scale-105`}
              style={{
                backgroundColor: gif.color,
                transform: `rotate(${idx % 2 === 0 ? "-1deg" : "1deg"})`,
              }}
            >
              <img
                loading="lazy"
                src={gif.src}
                alt={`Hero Gif ${idx}`}
                className="w-full h-full object-cover mix-blend-normal"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom Giant Text (Half Visible) */}
      <div className="absolute bottom-[-60px] left-0 w-full whitespace-nowrap z-0 pointer-events-none">
        <h1 className="font-hakobi text-[8vw] leading-none text-black uppercase tracking-tight select-none text-center">
          Cultural Engine For Young India
        </h1>
      </div>
    </section>
  );
};

export default Hero;
