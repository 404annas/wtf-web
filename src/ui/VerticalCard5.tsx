"use client";

import Image from "next/image";

const logo = "/images/logo.svg";

const VerticalCard5 = () => {
  return (
    <section className="relative h-screen w-full bg-[#efe9dc] overflow-hidden pt-4 flex flex-col items-center">
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
          className="w-20 md:w-24 h-auto object-contain"
        />
      </div>

      {/* 2. Main Title Section */}
      <div className="relative z-10 w-full flex flex-col items-center mb-10">
        <h1 className="font-hakobi text-[10vw] md:text-[13vw] leading-none text-black uppercase text-center">
          WTF IS THE POINT?
        </h1>
        {/* Exact same thick black underline as the image */}
        <div className="w-full max-w-[72%] h-[6px] md:h-[10px] bg-black -translate-y-4" />
      </div>

      {/* 3. Statistics Grid Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {/* Column 1: People */}
        <div className="flex flex-col items-center md:items-center text-center md:text-left">
          <h2 className="font-hakobi text-[4vw] md:text-[6vw] leading-none text-center text-[#2A2A2A] uppercase mb-6">
            6M+ PEOPLE
          </h2>
          <p className="text-black/80 text-xs md:text-sm font-regular text-center leading-normal max-w-[350px]">
            We’re building India’s leading space for entrepreneurs, creators,
            builders, and thinkers to go from 0 to 1. Because the best ideas
            don’t come from the usual suspects—they come from everywhere.
          </p>
        </div>

        {/* Column 2: Grants */}
        <div className="flex flex-col items-center md:items-center text-center md:text-left">
          <h2 className="font-hakobi text-[4vw] md:text-[6vw] leading-none text-center text-[#2A2A2A] uppercase mb-6">
            20+ GRANTS
          </h2>
          <p className="text-black/80 text-xs md:text-sm font-regular text-center leading-normal max-w-[340px]">
            To build a vetted ecosystem where growth is collective, norms are
            challenged, and original thinking is rewarded. We ran a 20L grant
            programme called WTFund to fund ideas such as these.
          </p>
        </div>

        {/* Column 3: Members */}
        <div className="flex flex-col items-center md:items-center text-center md:text-left">
          <h2 className="font-hakobi text-[4vw] md:text-[6vw] leading-none text-center text-[#2A2A2A] uppercase mb-6">
            1K+ MEMBERS
          </h2>
          <p className="text-black/80 text-xs md:text-sm font-regular text-center leading-normal max-w-[340px]">
            A home for multi-potentialities and outliers who refuse single-lane
            thinking. We exist at the intersection of business, science,
            creativity, and culture. All our ideas feed into the curiosity gene,
            globally & in India.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VerticalCard5;
