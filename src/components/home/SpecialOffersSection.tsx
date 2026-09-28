import React from 'react';
import { Tag, Sparkles, ArrowRight, Gift, Percent, Users } from 'lucide-react';

interface SpecialOffersSectionProps {
  onShopCategory: (category: string) => void;
  onOpenTeamJerseys: () => void;
}

export const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({
  onShopCategory,
  onOpenTeamJerseys
}) => {
  return (
    <section className="py-16 bg-[#0c0c0e] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold uppercase tracking-wider mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Limited Time Promotions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
              Special Offers
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Don&apos;t miss out on these limited-edition print runs and combo discounts.
            </p>
          </div>
        </div>

        {/* 3 Offer Cards (Matching Reference Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Flat 30% Off */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1c1711] to-[#121217] border border-[#d4af37]/40 p-6 flex flex-col justify-between group shadow-xl">
            <div className="space-y-3">
              <span className="inline-block px-2.5 py-1 rounded bg-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider">
                CODE: ARISE30
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit'] leading-tight">
                FLAT 30% OFF
              </h3>
              <p className="text-xs text-zinc-300">
                On all graphic tees, drop-shoulder streetwear and vintage printed cotton shirts.
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onShopCategory('Printed T-Shirts')}
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 group-hover:bg-[#d4af37] group-hover:text-black text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-zinc-700"
              >
                <span>Shop Tees</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Buy 2 Get 1 Free */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#141d2b] to-[#10141d] border border-blue-500/40 p-6 flex flex-col justify-between group shadow-xl">
            <div className="space-y-3">
              <span className="inline-block px-2.5 py-1 rounded bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider">
                JERSEY BUNDLE
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit'] leading-tight">
                BUY 2 GET 1 FREE
              </h3>
              <p className="text-xs text-zinc-300">
                On selected football and cricket match kits. Mix and match your favourite designs.
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onShopCategory('Football Jerseys')}
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 group-hover:bg-blue-500 group-hover:text-white text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-zinc-700"
              >
                <span>Explore Jerseys</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Team Combo Pack */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1e1313] to-[#141010] border border-rose-500/40 p-6 flex flex-col justify-between group shadow-xl">
            <div className="space-y-3">
              <span className="inline-block px-2.5 py-1 rounded bg-rose-500 text-white font-extrabold text-xs uppercase tracking-wider">
                BULK SAVINGS
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit'] leading-tight">
                Team Combo Pack
              </h3>
              <p className="text-xs text-zinc-300">
                10+ Custom Jerseys at special wholesale pricing with free team logo digitization.
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={onOpenTeamJerseys}
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 group-hover:bg-rose-500 group-hover:text-white text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-zinc-700"
              >
                <span>Team Roster Builder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
