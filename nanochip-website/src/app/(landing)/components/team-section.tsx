'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CardDecorator } from '@/components/ui/card-decorator';
import { Github, Linkedin, Globe } from 'lucide-react';

const team = [
  {
    id: 1,
    name: 'SURESHKUMAR S',
    regNo: '9923005226',
    role: 'Lead Project Engineer',
    description: 'Specializing in computer vision integration and system architecture for driver safety.',
    image: '/assets/team/sureshkumar.png',
    fallback: 'SK',
    social: {
      linkedin: '#',
      github: '#',
      website: '#',
    },
  },
  {
    id: 2,
    name: 'KAILASH RAVICHANDRAN',
    regNo: '9920305200',
    role: 'Hardware Specialist',
    description: 'Expert in embedded systems and sensor diagnostics for real-time monitoring devices.',
    image: '/assets/team/kailash.png',
    fallback: 'KR',
    social: {
      linkedin: '#',
      github: '#',
      website: '#',
    },
  },
  {
    id: 3,
    name: 'GURU ASHOKAN',
    regNo: '9923005197',
    role: 'Full Stack Developer',
    description: 'Crafting responsive user interfaces and robust backend protocols for the Elevium ecosystem.',
    image: '/assets/team/guru.png',
    fallback: 'GA',
    social: {
      linkedin: '#',
      github: '#',
      website: '#',
    },
  },
  {
    id: 4,
    name: 'JERSHO VINS',
    regNo: '9923005198',
    role: 'System Analyst',
    description: 'Optimizing data flow and ensuring high-fidelity signal processing for safety alerts.',
    image: '/assets/team/jersho.png',
    fallback: 'JV',
    social: {
      linkedin: '#',
      github: '#',
      website: '#',
    },
  },
];

export function TeamSection() {
  return (
    <section id="team" className="py-24 sm:py-32 bg-[#02040a]/50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <Badge variant="outline" className="mb-4 border-[#2dd4bf]/20 text-[#2dd4bf] bg-[#2dd4bf]/5">
            Elevium Intelligence
          </Badge>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl mb-6 italic text-white">
            THE <span className="text-[#2dd4bf]">ARCHITECTS</span>
          </h2>
          <p className="text-lg text-white/50 mb-8 uppercase tracking-[0.2em] font-medium italic">
            Engineering the future of autonomous road safety.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <Card key={member.id} className="bg-white/5 border-white/10 backdrop-blur-xl group hover:border-[#2dd4bf]/40 transition-all duration-500 overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center">
                  {/* Avatar with Projexa Aesthetic */}
                  <div className="flex justify-center mb-6">
                    <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#2dd4bf] to-transparent">
                      <Avatar className="h-32 w-32 border-2 border-[#02040a] shadow-2xl">
                        <AvatarImage
                          src={member.image}
                          alt={member.name}
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <AvatarFallback className="bg-[#02040a] text-[#2dd4bf] text-xl font-black">
                          {member.fallback}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  {/* Name and Reg No */}
                  <h3 className="text-lg font-black text-white italic tracking-tight mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2dd4bf] mb-3">
                    REG NO: {member.regNo}
                  </p>
                  
                  {/* Role */}
                  <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-4">
                    {member.role}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-white/40 mb-6 leading-relaxed italic">
                    "{member.description}"
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white/30 hover:text-[#2dd4bf] transition-colors"
                      asChild>
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white/30 hover:text-[#2dd4bf] transition-colors"
                      asChild>
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
