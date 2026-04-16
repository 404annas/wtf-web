"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Loader2, SendHorizonal, CheckCircle2 } from "lucide-react";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const [status, setStatus] = useState("idle"); // idle, loading, success
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API Call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", service: "", message: "" });

      // Reset to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }, 2000);
  };

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Services", href: "#" },
    { name: "Success", href: "#" },
    { name: "Works", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <footer className="relative w-full bg-[#121212] lg:h-screen overflow-hidden flex items-center">
      {/* Background Texture - Kept as requested */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-[0.15] pointer-events-none"
        style={{ backgroundImage: "url('/images/noise-bg.webp')" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 -translate-y-8">
        {/* LEFT SECTION: Brand & Identity */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <Image
              src="/images/prLogo2.svg"
              alt="Logo"
              width={400}
              height={200}
              className="h-auto mb-8"
            />
            <p className="text-white/50 text-center text-sm leading-relaxed max-w-sm mb-8">
              Crafting digital experiences that push the boundaries of modern
              technology. We blend aesthetic precision with technical
              excellence.
            </p>
            <div className="flex justify-center gap-2 lg:mb-12">
              {[FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube].map(
                (Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="text-black transition-all duration-300 transform hover:-translate-y-1 bg-white p-3 rounded-full"
                  >
                    <Icon size={20} />
                  </a>
                ),
              )}
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Navigation */}
        <div className="lg:col-span-3 text-center lg:pt-4">
          <h4 className="text-white text-4xl tracking-wide font-bold uppercase font-hakobi mb-10">
            Navigation
          </h4>
          <ul className="space-y-5 translate-x-28">
            {navLinks.map((link) => (
              <li key={link.name} className="">
                <a
                  href={link.href}
                  className="text-white/50 hover:text-white text-sm transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-4 h-[1px] bg-white mr-0 group-hover:mr-3 transition-all duration-300"></span>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SECTION: Contact Form */}
        <div className="lg:col-span-5 bg-white/[0.03] border border-white/10 px-4 py-6 rounded-2xl backdrop-blur-sm">
          <h4 className="text-white text-4xl font-hakobi font-bold uppercase tracking-wide mb-8">
            Drop a Query
          </h4>

          {status === "success" ? (
            <div className="h-[300px] flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
              <CheckCircle2 size={48} className="text-green-500" />
              <h3 className="text-white text-xl font-medium">Message Sent!</h3>
              <p className="text-white/50 text-sm">
                Thank you for reaching out. Our team will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-xs md:text-sm"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-xs md:text-sm"
                />
              </div>

              <select
                required
                value={formData.service}
                onChange={(e) =>
                  setFormData({ ...formData, service: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 text-white/60 px-4 py-3 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-xs md:text-sm appearance-none"
              >
                <option value="" className="bg-[#121212]">
                  Select Service
                </option>
                <option value="Strategic PR & Digital Growth" className="bg-[#121212]">
                  Strategic PR & Digital Growth
                </option>
                <option value="AI-Powered Creative Production" className="bg-[#121212]">
                  AI-Powered Creative Production
                </option>
                <option value="Multi-Platform Promotion & Visibility" className="bg-[#121212]">
                  Multi-Platform Promotion & Visibility
                </option>
                <option value="Multi-Platform Promotion & Visibility" className="bg-[#121212]">
                  Artist & Brand Development Ecosystem
                </option>
              </select>

              <textarea
                required
                rows={4}
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-xs md:text-sm resize-none"
              />

              <button
                disabled={status === "loading"}
                className="w-full bg-white font-hakobi py-4 rounded-lg flex items-center justify-center gap-3 hover:bg-white/90 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span className="uppercase tracking-wide text-xl md:text-2xl">
                      Submitting
                    </span>
                  </>
                ) : (
                  <>
                    <span className="uppercase tracking-wide text-xl md:text-2xl">
                      Submit Query
                    </span>
                    <SendHorizonal size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Subtle Bottom Bar */}
      <div className="absolute bottom-2 lg:bottom-6 left-0 w-full px-6">
        <div className="max-w-7xl mx-auto w-full h-[1px] bg-white/5 mb-6" />
        <div className="max-w-7xl mx-auto flex justify-between items-center text-white text-[10px] tracking-widest uppercase ">
          <p className="lg:block hidden">
            Copyright © {new Date().getFullYear()} WTF - We&apos;re The Future |
            All Rights Reserved.
          </p>
          <div className="text-[10px] uppercase tracking-wide text-white/30">
            Developed by{" "}
            <a
              href="https://techxudo.com/"
              target="_blank"
              className="text-white font-semibold"
            >
              Techxudo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
