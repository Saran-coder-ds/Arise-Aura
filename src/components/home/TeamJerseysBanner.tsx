import React from 'react';
import { ArrowRight, Users, Shield, Award, Sparkles } from 'lucide-react';

interface TeamJerseysBannerProps {
  onGetStarted: () => void;
}

export const TeamJerseysBanner: React.FC<TeamJerseysBannerProps> = ({ onGetStarted }) => {
  return (
    <section className="py-12 bg-[#0c0c0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#171511] via-[#211d16] to-[#121217] border border-[#d4af37]/30 p-8 sm:p-12 shadow-2xl">
          
          {/* Subtle gold grid pattern / glow */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold uppercase tracking-widest">
                <Users className="w-3.5 h-3.5" />
                Tournament Ready Sublimation
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Outfit'] tracking-tight uppercase">
                TEAM JERSEYS
              </h2>

              <p className="text-base sm:text-lg text-zinc-300 font-medium">
                Custom Jerseys for Football Clubs, Cricket Squads, College Teams &amp; Corporate Tournaments.
              </p>

              <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
                Full dry-fit sublimation, customized player names, individual numbers, sponsor logos, and crest embroidery with fast 4-day delivery.
              </p>

              <div className="pt-2">
                <button
                  onClick={onGetStarted}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#e6c148] text-black font-extrabold text-sm uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 mx-auto lg:mx-0 transition-transform active:scale-95"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Mockup Display Showing Team Kits with 10 Numbers (like in screenshot) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative flex items-center justify-center -space-x-8 sm:-space-x-12">
                {/* Jersey 1 (Gold/Yellow) */}
                <div className="w-24 sm:w-32 h-36 sm:h-48 rounded-xl bg-gradient-to-b from-amber-500 to-amber-700 shadow-2xl border border-amber-300/40 p-2 flex flex-col items-center justify-center text-center transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                  <span className="text-[9px] font-black text-black uppercase tracking-wider">YOUR TEAM</span>
                  <span className="text-3xl sm:text-4xl font-black text-black font-['Outfit']">10</span>
                </div>

                {/* Jersey 2 (Royal Blue) */}
                <div className="w-28 sm:w-36 h-40 sm:h-52 rounded-xl bg-gradient-to-b from-blue-600 to-blue-900 shadow-2xl border border-blue-400/50 p-2 flex flex-col items-center justify-center text-center transform -translate-y-2 z-10 hover:scale-105 transition-transform duration-300">
                  <span className="text-[10px] font-black text-white uppercase tracking-wider">YOUR TEAM</span>
                  <span className="text-4xl sm:text-5xl font-black text-white font-['Outfit']">10</span>
                </div>

                {/* Jersey 3 (Crimson Red) */}
                <div className="w-24 sm:w-32 h-36 sm:h-48 rounded-xl bg-gradient-to-b from-red-600 to-red-900 shadow-2xl border border-red-400/40 p-2 flex flex-col items-center justify-center text-center transform rotate-6 hover:rotate-0 transition-transform duration-300">
                  <span className="text-[9px] font-black text-white uppercase tracking-wider">YOUR TEAM</span>
                  <span className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">10</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
