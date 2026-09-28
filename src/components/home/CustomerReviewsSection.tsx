import React from 'react';
import { Star, CheckCircle, Quote, ThumbsUp } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../../data/mockData';

export const CustomerReviewsSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#0c0c0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold uppercase tracking-wider mb-2">
            <Star className="w-3.5 h-3.5 fill-[#d4af37]" />
            <span>4.9 / 5 Rating from 1,200+ Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Real feedback from creators, sports clubs, and streetwear enthusiasts across India.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUSTOMER_REVIEWS.map(review => (
            <div
              key={review.id}
              className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-colors shadow-lg"
            >
              <div className="space-y-3">
                {/* Stars */}
                <div className="flex items-center gap-1 text-[#d4af37]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs text-zinc-300 leading-relaxed italic">
                  &quot;{review.comment}&quot;
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-zinc-700 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold text-white truncate">{review.name}</h4>
                    {review.verified && (
                      <span title="Verified Buyer">
                        <CheckCircle className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-500">{review.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
