'use client';

import { ReactNode } from 'react';

interface FrameWrapperProps {
  children: ReactNode;
  variant?: 'default';
}

export function FrameWrapper({ children, variant = 'default' }: FrameWrapperProps) {
  return (
    <div className="min-h-screen w-full">
      <div className="relative">
        {/* Background DNA Helix Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="dna-helix absolute top-10 left-10 w-20 h-20 rounded-full"></div>
          <div className="dna-helix absolute top-32 right-16 w-12 h-12 rounded-full"></div>
          <div className="dna-helix absolute bottom-20 left-20 w-16 h-16 rounded-full"></div>
          <div className="dna-helix absolute bottom-40 right-10 w-8 h-8 rounded-full"></div>
        </div>
        
        {/* Floating DNA symbols */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 text-purple-300/20 text-6xl animate-pulse-slow">+</div>
          <div className="absolute top-40 right-1/3 text-purple-300/20 text-4xl animate-pulse-slow">✦</div>
          <div className="absolute bottom-32 left-1/3 text-purple-300/20 text-5xl animate-pulse-slow">◦</div>
        </div>
        
        <main className="relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
