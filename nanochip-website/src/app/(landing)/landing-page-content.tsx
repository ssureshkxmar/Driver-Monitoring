'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { LandingFooter } from '@/components/footer';
import { HeroSection } from './components/hero-section';
import { StatsSection } from './components/stats-section';
import { FeaturesSection } from './components/features-section';
import { DeviceSection } from './components/device-section';
import { TeamSection } from './components/team-section';
import { TestimonialsSection } from './components/testimonials-section';
import { FaqSection } from './components/faq-section';
import { CTASection } from './components/cta-section';
import { ContactSection } from './components/contact-section';
import { AboutSection } from './components/about-section';
import Lenis from 'lenis';

export function LandingPageContent() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      lenis.destroy();
    };
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#02040a]" />;

  return (
    <div className="min-h-screen bg-[#02040a] text-white selection:bg-[#2dd4bf] selection:text-[#02040a] relative font-outfit">
      {/* Background Star Layer - The "Glittering" effect from Projexa */}
      {/* Higher z-index and varied sizes for more impact */}
      <div className="fixed inset-0 pointer-events-none z-[50]">
        {[...Array(120)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
              boxShadow: "0 0 15px rgba(45,212,191,0.9)",
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.8, 1],
              y: [0, -40, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative">
        <HeroSection mousePosition={mousePosition} />
        <StatsSection />
        <AboutSection />
        <FeaturesSection />
        <DeviceSection />
        <TeamSection />
        <TestimonialsSection />
        <FaqSection />
        <CTASection />
        <ContactSection />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
