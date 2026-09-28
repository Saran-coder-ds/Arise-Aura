import React from 'react';
import { CATEGORIES } from '../../data/mockData';
import { ArrowUpRight } from 'lucide-react';

interface CategorySliderProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategorySlider: React.FC<CategorySliderProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-16 bg-[#0c0c0e] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Find the perfect fabric, silhouette, and style for every occasion.
            </p>
          </div>
          <button 
            onClick={() => onSelectCategory('All')} 
            className="mt-3 sm:mt-0 text-xs font-bold text-[#d4af37] hover:underline flex items-center gap-1 uppercase tracking-wider"
          >
            <span>View All Categories</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.map(category => (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category.name)}
              className="group cursor-pointer flex flex-col items-center text-center transition-transform hover:-translate-y-1.5 duration-200"
            >
              {/* Image Circle Container */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 group-hover:border-[#d4af37]/60 shadow-lg transition-colors p-1">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Title & Item Count */}
              <div className="mt-3">
                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#d4af37] transition-colors leading-tight">
                  {category.name}
                </h3>
                <span className="text-[11px] text-zinc-500 font-medium">
                  {category.count}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
