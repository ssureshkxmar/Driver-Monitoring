'use client';

import { Layers, Server } from 'lucide-react';
import Link from 'next/link';
import HeroScene from '@/components/HeroScene';

interface HeroSectionProps {
  mousePosition: { x: number; y: number };
}

export function HeroSection({ mousePosition }: HeroSectionProps) {

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layers */}
      {/* Persistent Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover brightness-[0.4]"
          src="/nx_hero_video.mp4"
        />
      </div>

      {/* Hero Scene Overlay */}
      <div className="absolute inset-0 z-[1] opacity-60">
        <HeroScene mousePosition={mousePosition} />
      </div>

      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-[8rem] font-black leading-[0.8] tracking-tighter mb-10 text-white italic drop-shadow-2xl">
            NANOCHIP<br />
            <span className="text-[#2dd4bf] drop-shadow-[0_0_15px_rgba(45,212,191,0.8)]">
              DRIVER SAFETY
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-sm md:text-base mb-16 text-white/50 uppercase tracking-[0.6em] font-black italic max-w-2xl mx-auto leading-relaxed"
          >
            Real-time Driver Monitoring Systems
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link
              href="/download"
              className="group relative px-10 py-5 bg-white text-[#02040a] font-black rounded-full flex items-center space-x-4 uppercase text-[10px] tracking-[0.2em] shadow-[0_0_60px_rgba(255,255,255,0.1)] overflow-hidden"
            >
              <span className="relative z-10">Architecture Incept</span>
              <Layers size={16} className="relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2dd4bf]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </Link>
            <button className="group px-10 py-5 bg-white/5 border border-white/10 backdrop-blur-3xl text-white font-black rounded-full flex items-center space-x-4 uppercase text-[10px] tracking-[0.2em]">
              <span>Protocol Sync</span>
              <Server size={16} />
            </button>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
