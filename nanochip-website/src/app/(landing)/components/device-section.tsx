'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Cpu, Zap, Activity, HardDrive } from 'lucide-react';

export function DeviceSection() {
  const specs = [
    { icon: <Cpu className="w-5 h-5" />, title: "STM32 NUCLEO-F446RE", detail: "High-performance ARM Cortex-M4 core at 180MHz." },
    { icon: <Zap className="w-5 h-5" />, title: "Low Latency Sync", detail: "Real-time communication between hardware and vision engine." },
    { icon: <Activity className="w-5 h-5" />, title: "Sensor Hub", detail: "Multi-parameter data acquisition for driver diagnostics." },
    { icon: <HardDrive className="w-5 h-5" />, title: "Edge Analytics", detail: "Optimized processing for immediate safety alerts." },
  ];

  return (
    <section id="device" className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Images */}
          <div className="relative group">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-[#2dd4bf]/20 rounded-[2rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative grid grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <Image 
                  src="/assets/device/device-1.png" 
                  alt="Elevium Hardware Setup" 
                  width={600} 
                  height={800} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                />
              </motion.div>
              <div className="flex flex-col gap-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-full"
                >
                  <Image 
                    src="/assets/device/device-2.png" 
                    alt="STM32 Integration" 
                    width={600} 
                    height={400} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  />
                </motion.div>
                <div className="bg-[#2dd4bf]/5 border border-[#2dd4bf]/20 rounded-2xl p-6 backdrop-blur-xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2dd4bf]">Hardware Status</p>
                    <p className="text-xl font-black text-white italic mt-2">OPTIMIZED</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="flex flex-col space-y-8">
            <div>
              <Badge variant="outline" className="mb-4 border-[#2dd4bf]/20 text-[#2dd4bf] bg-[#2dd4bf]/5">
                Core Hardware
              </Badge>
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white leading-tight">
                THE UNIT <br />
                <span className="text-[#2dd4bf] drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]">INTELLIGENCE</span>
              </h2>
              <p className="mt-6 text-white/50 text-base leading-relaxed max-w-lg italic">
                The Elevium hardware unit leverages the STM32 Nucleo ecosystem to provide a low-latency bridge between vehicle sensors and our AI vision model. It manages local alerts, LCD feedback, and power-efficient monitoring.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {specs.map((spec, i) => (
                <div key={i} className="flex flex-col space-y-2 p-4 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className="text-[#2dd4bf] group-hover:scale-110 transition-transform">{spec.icon}</div>
                  <h4 className="text-sm font-black text-white uppercase italic">{spec.title}</h4>
                  <p className="text-xs text-white/30 leading-relaxed">{spec.detail}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
