"use client";

import Image from "next/image";

const logo = "/images/prLogo2.svg";

const VerticalCard5 = () => {
  return (
    <section className="relative h-screen w-full bg-[#efe9dc] overflow-hidden px-4 pt-2 flex flex-col items-center">
      {/* Background Texture Overlay (The Paper Grain) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-[0.12] pointer-events-none"
        style={{ backgroundImage: "url('/images/noise-bg.webp')" }}
      />

      {/* 1. Centered Logo */}
      <div className="relative z-10 mb-12">
        <Image
          src={logo}
          alt="WTF Logo"
          width={90}
          height={40}
          className="w-40 lg:w-70 h-auto object-contain"
        />
      </div>

      {/* 2. Main Title Section */}
      <div className="relative z-10 w-full flex flex-col items-center mb-10">
        <h1 className="font-hakobi text-[10vw] md:text-[13vw] leading-none text-black uppercase text-center">
          “Proven at Scale”
        </h1>
        {/* Exact same thick black underline as the image */}
        <div className="w-full max-w-[75%] h-[6px] md:h-[10px] bg-black -translate-y-0 lg:-translate-y-8" />
      </div>

      {/* 3. Statistics Grid Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Column 1: People */}
        <div className="flex flex-col items-center md:items-center text-center md:text-left">
          <h2 className="font-hakobi text-3xl sm:text-[4vw] md:text-[5vw] leading-none text-center text-[#2A2A2A] uppercase mb-4 md:mb-6">
            1000+ Artists
          </h2>
          <p className="text-black/80 text-xs md:text-sm font-regular text-center leading-normal max-w-[350px]">
            We’ve supported over 1000 artists with tools, exposure, mentorship, and opportunities to grow their craft and careers. Because real impact truly happens when talent gets the support it deserves everywhere.
          </p>
        </div>

        {/* Column 2: Grants */}
        <div className="flex flex-col items-center md:items-center text-center md:text-left">
          <h2 className="font-hakobi text-3xl sm:text-[4vw] md:text-[5vw] leading-none text-center text-[#2A2A2A] uppercase mb-4 md:mb-6">
            10M+ Audience
          </h2>
          <p className="text-black/80 text-xs md:text-sm font-regular text-center leading-normal max-w-[340px]">
            We’ve generated over 10M audience reach through campaigns where visibility is strategic, stories travel further, and brands connect with people who truly matter globally every single day online.
          </p>
        </div>

        {/* Column 3: Members */}
        <div className="flex flex-col items-center md:items-center text-center md:text-left">
          <h2 className="font-hakobi text-3xl sm:text-[4vw] md:text-[5vw] leading-none text-center text-[#2A2A2A] uppercase mb-6">
            500+ Campaigns
          </h2>
          <p className="text-black/80 text-xs md:text-sm font-regular text-center leading-normal max-w-[340px]">
            We’ve executed 500+ successful campaigns delivering measurable impact across industries, blending strategy, creativity, and culture to drive meaningful results worldwide across platforms with consistent excellence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VerticalCard5;
