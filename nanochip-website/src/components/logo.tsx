import * as React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 24, className }: LogoProps) {
  return (
    <div 
      style={{ width: size, height: size }} 
      className={`relative flex items-center justify-center overflow-hidden rounded-lg ${className}`}
    >
      <Image
        src="/logo.png"
        alt="Nanochip Logo"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
    </div>
  );
}
