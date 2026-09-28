import React from 'react';
import { ArrowRight, Sparkles, Shield, Clock, Award, Flame } from 'lucide-react';

interface HeroBannerProps {
  onShopNow: () => void;
  onUploadDesign: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow, onUploadDesign }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0c0c0e] via-[#121217] to-[#0c0c0e] text-white border-b border-zinc-800/80">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold tracking-wide uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
              <span>Next-Gen Custom Apparel &amp; Jersey Lab</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] tracking-tight leading-[1.1] text-white">
              Wear Your Design. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f7e7a9] to-[#c9972c]">
                Create Your Identity.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Premium custom printed T-shirts &amp; high-performance sports jerseys for individuals, teams, and elite creators. Upload artwork or preview live in our 3D mockup studio.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={onShopNow}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c358] to-[#c59c2b] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#d4af37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Shop Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onUploadDesign}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 hover:border-[#d4af37]/60 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Upload Design</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-800/80 max-w-md mx-auto lg:mx-0">
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black text-white font-['Outfit']">50,000+</span>
                <span className="text-[10px] text-zinc-400">Jerseys &amp; Tees Printed</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black text-white font-['Outfit']">240-280 GSM</span>
                <span className="text-[10px] text-zinc-400">Heavy Combed Cotton</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black text-white font-['Outfit']">3-5 Days</span>
                <span className="text-[10px] text-zinc-400">Express Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Image Feature Column (Minimized & Optimized) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Decorative Frame Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/20 to-amber-500/10 rounded-2xl blur-xl -z-10" />

              {/* Main Image Showcase Card */}
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/80 p-2 shadow-xl">
                <div className="relative h-[250px] sm:h-[280px] lg:h-[300px] w-full rounded-xl overflow-hidden bg-zinc-950">
                  <img
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
                    alt="Custom T-Shirt & Sports Jersey showcase"
                    className="w-full h-full max-h-[300px] object-cover object-center filter brightness-[0.92] contrast-[1.05]"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />

                  {/* Floating Graphic Tag "GOOD VIBES ONLY" */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-black tracking-widest uppercase flex items-center gap-1 shadow-md">
                    <Award className="w-3 h-3" />
                    <span>GOOD VIBES ONLY</span>
                  </div>

                  {/* Floating Jersey Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#d4af37] text-black text-[10px] font-black tracking-widest uppercase shadow-md flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-black" />
                    <span>CUSTOM 10</span>
                  </div>

                  {/* Bottom Feature Card */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2.5 rounded-lg bg-zinc-900/90 backdrop-blur-md border border-zinc-700/80 text-white flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[10px] text-[#d4af37] font-bold uppercase tracking-wider truncate">
                        High Density Sublimation
                      </p>
                      <h4 className="text-xs font-bold truncate">Custom Club Jersey &amp; Tee</h4>
                    </div>
                    <button
                      onClick={onUploadDesign}
                      className="px-2.5 py-1 rounded-md bg-[#d4af37] hover:bg-[#e6c148] text-black font-extrabold text-[10px] uppercase transition-colors shrink-0"
                    >
                      Customize
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
