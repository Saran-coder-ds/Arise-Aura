import React from 'react';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface BestSellersSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({
  products,
  onSelectProduct,
  onViewAll
}) => {
  const { addToCart, isInWishlist, toggleWishlist } = useCart();

  // Filter best sellers or first 4 products
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-16 bg-[#0c0c0e] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
              Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Our most loved products, crafted with luxury fabrics just for you.
            </p>
          </div>
          <button
            onClick={onViewAll}
            className="text-xs font-bold text-[#d4af37] hover:underline uppercase tracking-wider"
          >
            View All
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(product => {
            const inWish = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-[#d4af37]/50 overflow-hidden shadow-lg transition-all duration-200 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-zinc-950 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Discount Tag */}
                  {product.discountPercent > 0 && (
                    <div className="absolute top-3 left-3 bg-[#d4af37] text-black font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shadow-md">
                      {product.discountPercent}% OFF
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      inWish 
                        ? 'bg-rose-500 text-white' 
                        : 'bg-black/60 text-white hover:bg-black'
                    }`}
                    title="Add to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${inWish ? 'fill-white' : ''}`} />
                  </button>

                  {/* Stock Notice Overlay if low */}
                  {product.stock <= 5 && (
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                      Only {product.stock} left in stock
                    </div>
                  )}
                </div>

                {/* Info Container */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] text-[#d4af37] font-semibold uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 
                      onClick={() => onSelectProduct(product)}
                      className="text-sm font-bold text-white hover:text-[#d4af37] transition-colors cursor-pointer line-clamp-1 mt-0.5"
                    >
                      {product.title}
                    </h3>

                    {/* Rating & Orders count */}
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center text-xs text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="ml-1 font-bold text-white">{product.rating}</span>
                      </div>
                      <span className="text-[11px] text-zinc-500">
                        ({product.reviewsCount} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Pricing and Add to Cart */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-extrabold text-white">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-zinc-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart({
                        productId: product.id,
                        title: product.title,
                        image: product.image,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        size: product.sizes[0] || 'L',
                        color: product.colors[0] || { name: 'Black', hex: '#111' },
                        quantity: 1
                      })}
                      className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-[#d4af37] text-white hover:text-black flex items-center justify-center transition-colors shadow-md cursor-pointer"
                      title="Quick Add To Cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
