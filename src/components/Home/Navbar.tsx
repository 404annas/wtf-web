"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { navigateTo, type NavTarget } from '@/lib/navigation';

interface NavItemProps {
  label: string;
  color: string;
  rotation: number;
  textColor?: string;
  target?: NavTarget;
}

const navItems: NavItemProps[] = [
  { label: 'HOME', color: '#E47334', rotation: 15, target: 'home' },
  { label: 'ABOUT', color: '#008460', rotation: -15, target: 'about' },
  { label: 'SERVICES', color: '#C1392B', rotation: 15, target: 'services' },
  { label: 'PRODUCTS', color: '#0B3D6D', rotation: -15 },
  { label: 'WORKS', color: '#D4A017', rotation: 0, textColor: '#1a1a1a', target: 'works' },
  { label: 'CONTACT', color: '#5C52A3', rotation: -15, target: 'contact' },
];

const Navbar = () => {
  return (
    // Fixed container that stays on top during scroll
    <div className="fixed right-1 top-1/2 -translate-y-1/2 z-[999] flex flex-col items-end gap-3 pointer-events-none">
      {navItems.map((item, index) => (
        <NavItem key={index} item={item} />
      ))}
    </div>
  );
};

const NavItem = ({ item }: { item: NavItemProps }) => {
  const scope = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Set initial position: tucked 50px into the right edge
    gsap.set(boxRef.current, { x: 50 });
    if (tooltipRef.current) {
      gsap.set(tooltipRef.current, { opacity: 0, y: 5 });
    }
  }, { scope });

  // Smooth slide out on hover
  const onMouseEnter = () => {
    if (!boxRef.current) return;
    gsap.to(boxRef.current, {
      x: 15, // Leaves just enough inside to look attached
      duration: 0.4,
      ease: "power2.out",
    });

    if (item.label === 'PRODUCTS' && tooltipRef.current) {
      gsap.to(tooltipRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.out",
      });
    }
  };

  // Smooth slide back on leave
  const onMouseLeave = () => {
    if (!boxRef.current) return;
    gsap.to(boxRef.current, {
      x: 50,
      duration: 0.4,
      ease: "power2.inOut",
    });

    if (item.label === 'PRODUCTS' && tooltipRef.current) {
      gsap.to(tooltipRef.current, {
        opacity: 0,
        y: 5,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  };

  const onClick = () => {
    if (!item.target) return;
    navigateTo(item.target);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!item.target) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigateTo(item.target);
    }
  };

  return (
    <div ref={scope} className="pointer-events-auto relative">
      {item.label === 'PRODUCTS' && (
        <div 
          ref={tooltipRef}
          className="absolute -top-6 left-2 bg-white text-[#0B3D6D] text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap pointer-events-none z-10 border border-[#0B3D6D]"
        >
          Coming Soon...
        </div>
      )}
      <div
        ref={boxRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        onKeyDown={onKeyDown}
        role={item.target ? "button" : undefined}
        tabIndex={item.target ? 0 : -1}
        className={`transition-shadow flex items-center border-2 border-white justify-start pl-2 pr-10 py-0.5 min-w-[110px] ${item.target ? "cursor-pointer" : "cursor-default"}`}
        style={{
          backgroundColor: item.color,
          transform: `rotate(${item.rotation}deg)`,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          borderRadius: '0px 0 0 1px'
        }}
      >
        <span
          className="text-sm md:text-base tracking-wide font-hakobi tracking-tighter select-none"
          style={{ 
            color: item.textColor || 'white',
            textTransform: 'uppercase'
          }}
        >
          {item.label}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
