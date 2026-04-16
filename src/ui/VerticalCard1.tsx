"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const logo = "/images/prLogo2.svg";

const cardImages = [
  "/images/card1-1.jpg",
  "/images/card1-2.png",
  "/images/card1-3.jpg",
  "/images/card1-4.png",
  "/images/card1-5.jpg",
];

const VerticalCard1 = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#148158] flex flex-col items-center pt-10 lg:pt-0">
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
      <div className="relative z-10 w-full flex flex-col items-center px-4 pt-20 lg:pt-6">
        <h1 className="font-hakobi text-[11vw] md:text-[12vw] leading-none md:leading-30 lg:eading-32 text-white uppercase text-center">
          Strategic PR & Digital Growth
        </h1>
        {/* The White Underline seen in the image */}
        <div className="w-full max-w-[85%] h-[6px] md:h-[10px] -translate-y-0 lg:-translate-y-2 bg-white mb-4" />

        {/* 3. Description Paragraph */}
        <p className="max-w-3xl text-center text-white text-sm sm:text-base md:text-lg font-light leading-normal mb-10 text-balance">
          Insight-led PR and digital strategies that elevate brands across platforms. Transform attention into engagement, momentum, and long-term credibility.
        </p>

        {/* 4. Action Buttons */}
        <div className="flex md:flex-row flex-col flex-wrap justify-center gap-2 sm:gap-4">
          <button className="bg-[#efe9dc] text-[#232323] font-serif px-6 py-2 rounded-full text-sm font-light hover:bg-white transition-colors duration-300">
            Watch Latest Episodes
          </button>
          <button className="bg-[#232323] text-white font-serif px-6 py-2 rounded-full text-sm font-light hover:opacity-90 transition-opacity duration-300">
            Learn More
          </button>
        </div>
      </div>

      {/* 5. Bottom Marquee Section */}
      {/* <div className="absolute bottom-0 w-full lg:translate-y-1/2">
        <div className="absolute top-[-35px] left-6 z-20">
           <span className="text-white text-xs font-light font-serif uppercase">
             Some Fav&apos;s
           </span>
        </div>

        <Marquee 
          speed={40} 
          gradient={false} 
          pauseOnHover={false}
          className="overflow-visible"
        >
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
      </div> */}
    </section>
  );
};

export default VerticalCard1;