"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const logo = "/images/prLogo2.svg";

const cardImages = [
  "/images/card3-1.jpg",
  "/images/card3-2.jpg",
  "/images/card3-3.jpg",
  "/images/card3-4.jpg",
  "/images/card3-5.jpg",
];

const VerticalCard3 = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#09407E] flex flex-col items-center pt-10 lg:pt-4">
      {/* Background Texture Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-[0] pointer-events-none"
        style={{ backgroundImage: "url('/images/noise-bg.webp')" }}
      />
      {/* 1. Small Top Logo */}
      <div className="relative z-10 mb-4">
        <Image 
          src={logo} 
          alt="WTF Logo" 
          width={96} 
          height={40} 
          className="w-40 lg:w-70 h-auto object-contain"
        />
      </div>

      {/* 2. Main Heading Section */}
      <div className="relative z-10 w-full flex flex-col items-center px-4">
        <h1 className="font-hakobi text-[7vw] leading-none text-white uppercase text-center">
          Multi-Platform Promotion & Visibility
        </h1>
        {/* The White Underline seen in the image */}
        <div className="w-full max-w-[90%] h-[6px] md:h-[10px] -translate-y-0 lg:-translate-y-3 bg-white mb-4" />

        {/* 3. Description Paragraph */}
        <p className="max-w-xl text-center text-white text-sm sm:text-base md:text-lg font-light leading-normal mb-10 text-balance">
          Online is where we launch. Everywhere is where we grow. Campaigns that travel across channels to reach audiences that matter most.
        </p>

        {/* 4. Action Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <button className="bg-[#232323] text-white font-serif px-6 py-2 rounded-full text-xs font-light hover:opacity-90 transition-opacity duration-300">
            Learn More
          </button>
        </div>
      </div>

      {/* 5. Bottom Marquee Section */}
      <div className="absolute bottom-0 w-full lg:translate-y-1/2">
        {/* Label on the left */}
        <div className="absolute top-[-35px] left-6 z-20">
           <span className="text-white text-xs font-light font-serif uppercase">
             Some Memories
           </span>
        </div>

        <Marquee 
          speed={40} 
          gradient={false} 
          pauseOnHover={false}
          className="overflow-visible"
        >
          {/* We repeat the array once to ensure no gaps on large screens */}
          {[...cardImages, ...cardImages].map((src, index) => (
            <div 
              key={index} 
              className="w-[280px] md:w-[550px] aspect-[16/9] relative group cursor-grab active:cursor-grabbing"
            >
              <div className="w-full h-full overflow-hidden">
                 <Image
                    src={src}
                    alt={`Card ${index}`}
                    fill
                    className="object-cover"
                 />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default VerticalCard3;