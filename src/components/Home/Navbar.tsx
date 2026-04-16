"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface NavItemProps {
  label: string;
  color: string;
  rotation: number;
  textColor?: string;
}

const navItems: NavItemProps[] = [
  { label: 'HOME', color: '#E47334', rotation: 15 },
  { label: 'ABOUT', color: '#008460', rotation: -15 },
  { label: 'SERVICES', color: '#C1392B', rotation: 15 },
  { label: 'PRODUCTS', color: '#0B3D6D', rotation: -15 },
  { label: 'WORKS', color: '#D4A017', rotation: 0, textColor: '#1a1a1a' },
  { label: 'CONTACT', color: '#5C52A3', rotation: -15 },
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

  useGSAP(() => {
    // Set initial position: tucked 40px into the right edge
    gsap.set(boxRef.current, { x: 50 });
  }, { scope });

  // Smooth slide out on hover
  const onMouseEnter = () => {
    if (!boxRef.current) return;
    gsap.to(boxRef.current, {
      x: 15, // Leaves just enough inside to look attached
      duration: 0.4,
      ease: "power2.out",
    });
  };

  // Smooth slide back on leave
  const onMouseLeave = () => {
    if (!boxRef.current) return;
    gsap.to(boxRef.current, {
      x: 50,
      duration: 0.4,
      ease: "power2.inOut",
    });
  };

  return (
    <div ref={scope} className="pointer-events-auto">
      <div
        ref={boxRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="cursor-pointer transition-shadow flex items-center border-2 border-white justify-start pl-2 pr-10 py-0.5 min-w-[110px]"
        style={{
          backgroundColor: item.color,
          transform: `rotate(${item.rotation}deg)`,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          borderRadius: '0px 0 0 1px'
        }}
      >
        <Link href='/'
          className="text-sm md:text-base tracking-wide font-hakobi tracking-tighter"
          style={{ 
            color: item.textColor || 'white',
            textTransform: 'uppercase'
          }}
        >
          {item.label}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
