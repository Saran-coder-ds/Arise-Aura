import React, { useState, useMemo } from 'react';
import { Search, X, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { INITIAL_PRODUCTS } from '../../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Printed T-Shirts', 'Oversized T-Shirts', 'Football Jerseys', 'Cricket Jerseys', 'Polo T-Shirts'];

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesQuery = 
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#141418] border border-zinc-800 text-white shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-800 bg-[#17171d]">
          <Search className="w-5 h-5 text-[#d4af37] mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search custom jerseys, oversized tees, anime prints..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-white mr-1 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Category Chips */}
        <div className="px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/60 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full whitespace-nowrap text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#d4af37] text-black font-bold'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 space-y-2">
              <p className="text-sm">No products found matching &quot;{query}&quot;</p>
              <p className="text-xs">Try searching for &quot;Jersey&quot;, &quot;Oversized&quot;, or &quot;Cotton&quot;</p>
            </div>
          ) : (
            filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-800/60 border border-transparent hover:border-zinc-700/80 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-14 h-14 rounded-lg object-cover bg-zinc-800 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] text-[#d4af37] font-semibold uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#d4af37] transition-colors">
                      {product.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-bold text-white">₹{product.price}</span>
                      <span className="text-[11px] text-zinc-500 line-through">₹{product.originalPrice}</span>
                      <span className="text-[10px] text-emerald-400 font-bold">{product.discountPercent}% OFF</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 hidden sm:flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" />
                    {product.rating}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-zinc-800 group-hover:bg-[#d4af37] group-hover:text-black text-zinc-400 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
