import React from 'react';
import { Flame, CheckCircle, TrendingUp, Users } from 'lucide-react';
import { Product } from '../../types';

interface RecentlyOrderedSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const RecentlyOrderedSection: React.FC<RecentlyOrderedSectionProps> = ({
  products,
  onSelectProduct
}) => {
  const trendingItems = products.filter(p => p.recentOrderCount && p.recentOrderCount > 50).slice(0, 3);

  return (
    <section className="py-12 bg-[#0c0c0e]/90 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card */}
        <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#d4af37] border border-[#d4af37]/30 flex items-center justify-center">
                <Flame className="w-5 h-5 fill-[#d4af37]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-['Outfit']">
                  Recently Ordered by Customers
                </h3>
                <p className="text-xs text-zinc-400">
                  Real-time production and dispatched orders across India
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-500/30 self-start md:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Live Social Proof &bull; 1,420 Items Dispatched This Week</span>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trendingItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => onSelectProduct(item)}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-[#d4af37]/50 cursor-pointer transition-all group"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg object-cover bg-zinc-900 shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[10px] text-[#d4af37] font-bold uppercase tracking-wider">
                    <Users className="w-3 h-3" />
                    <span>{item.recentOrderCount} people ordered this week</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#d4af37] transition-colors truncate mt-0.5">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-white">₹{item.price}</span>
                    <span className="text-[10px] text-zinc-500 line-through">₹{item.originalPrice}</span>
                    <span className="text-[9px] text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded">
                      In Demand
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
