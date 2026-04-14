"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Team", href: "/#team" },
    { name: "Device", href: "/#device" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? "py-4 bg-[#02040a]/80 backdrop-blur-xl border-b border-white/5" : "py-8 bg-transparent"}`}>
        <div className="container mx-auto px-6 grid grid-cols-3 items-center">
          
          {/* Logo - Top Left */}
          <div className="flex justify-start">
            <Link href="/" className="text-2xl font-black text-white tracking-tighter uppercase italic">
              Elevium<span className="text-[#2dd4bf]">.</span>
            </Link>
          </div>
          
          {/* Center Links - Top Center */}
          <div className="hidden md:flex justify-center items-center space-x-12">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-[10px] font-black uppercase tracking-[0.3em] text-[#94a3b8] hover:text-[#2dd4bf] transition-colors whitespace-nowrap">
                {item.name}
              </Link>
            ))}
          </div>

          {/* Download App - Top Right */}
          <div className="flex justify-end items-center gap-4">
            <button 
              className="hidden md:flex items-center gap-2 px-8 py-2.5 bg-[#2dd4bf] text-[#02040a] rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)]"
            >
              <span>Download App</span>
              <Download size={14} />
            </button>
            
            {/* Mobile Menu Toggle Button */}
            <button 
              className="md:hidden w-10 h-10 ml-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-[#02040a]/95 backdrop-blur-3xl pt-24 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col space-y-8">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  onClick={() => setShowMobileMenu(false)}
                  className="text-2xl font-black uppercase tracking-[0.2em] text-[#94a3b8] hover:text-[#2dd4bf] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <button 
              onClick={() => setShowMobileMenu(false)}
              className="mt-12 flex items-center justify-center gap-4 py-4 bg-[#2dd4bf] text-[#02040a] rounded-2xl text-[14px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)]"
            >
              <span>Download App</span>
              <Download size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
