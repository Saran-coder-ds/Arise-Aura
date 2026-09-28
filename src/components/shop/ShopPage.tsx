import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  ChevronDown, 
  Star, 
  Heart, 
  ShoppingBag, 
  SlidersHorizontal,
  X,
  Check
} from 'lucide-react';
import { Product, GarmentSize } from '../../types';
import { ALL_SIZES } from '../../data/mockData';
import { useCart } from '../../context/CartContext';

interface ShopPageProps {
  products: Product[];
  selectedCategoryInitial?: string;
  onSelectProduct: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  selectedCategoryInitial = 'All',
  onSelectProduct
}) => {
  const { addToCart, isInWishlist, toggleWishlist } = useCart();

  const [category, setCategory] = useState<string>(selectedCategoryInitial);
  const [selectedSizes, setSelectedSizes] = useState<GarmentSize[]>([]);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = [
    'All',
    'Printed T-Shirts',
    'Oversized T-Shirts',
    'Football Jerseys',
    'Cricket Jerseys',
    'Custom Team Jerseys',
    'Polo T-Shirts'
  ];

  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-500', label: 'Under ₹500', min: 0, max: 499 },
    { id: '500-999', label: '₹500 - ₹999', min: 500, max: 999 },
    { id: '1000-1499', label: '₹1,000 - ₹1,499', min: 1000, max: 1499 },
    { id: '1500-2499', label: '₹1,500 - ₹2,499', min: 1500, max: 2499 },
    { id: '2500-plus', label: '₹2,500+', min: 2500, max: 99999 }
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    // Sizes
    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    }

    // In Stock
    if (inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    // Price Range
    if (priceRange !== 'all') {
      const match = priceRanges.find(r => r.id === priceRange);
      if (match && match.min !== undefined && match.max !== undefined) {
        result = result.filter(p => p.price >= match.min! && p.price <= match.max!);
      }
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'discount') {
      result.sort((a, b) => b.discountPercent - a.discountPercent);
    } else {
      // Popular (rating & reviews)
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [products, category, selectedSizes, priceRange, inStockOnly, sortBy]);

  const toggleSizeFilter = (s: GarmentSize) => {
    setSelectedSizes(prev => 
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const clearAllFilters = () => {
    setCategory('All');
    setSelectedSizes([]);
    setPriceRange('all');
    setInStockOnly(false);
  };

  return (
    <div className="bg-[#0c0c0e] min-h-screen text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
          <div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-1">
              <span>Home</span>
              <span>/</span>
              <span className="text-[#d4af37]">Shop Apparel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-white">
              {category === 'All' ? 'All Products' : category}
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {/* Sort Dropdown & Mobile Filter Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-semibold text-zinc-200"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Filters ({selectedSizes.length + (priceRange !== 'all' ? 1 : 0) + (category !== 'All' ? 1 : 0)})</span>
            </button>

            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5">
              <span className="text-xs text-zinc-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value="popular" className="bg-zinc-900">Popular</option>
                <option value="price-low" className="bg-zinc-900">Price: Low to High</option>
                <option value="price-high" className="bg-zinc-900">Price: High to Low</option>
                <option value="rating" className="bg-zinc-900">Highest Rated</option>
                <option value="discount" className="bg-zinc-900">Biggest Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          
          {/* Desktop Filter Sidebar (Matching Reference Screenshot) */}
          <aside className="hidden lg:block space-y-6">
            
            {/* Active Filters Clear Button */}
            {(category !== 'All' || selectedSizes.length > 0 || priceRange !== 'all' || inStockOnly) && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
                <span className="text-zinc-400">Active Filters</span>
                <button
                  onClick={clearAllFilters}
                  className="text-[#d4af37] hover:underline font-bold"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Categories */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      category === cat
                        ? 'bg-[#d4af37]/15 text-[#d4af37] font-bold'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                    }`}
                  >
                    <span>{cat}</span>
                    {category === cat && <Check className="w-3.5 h-3.5 text-[#d4af37]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                Price Range
              </h3>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <label
                    key={range.id}
                    className="flex items-center gap-2.5 text-xs text-zinc-300 cursor-pointer hover:text-white"
                  >
                    <input
                      type="radio"
                      name="price-range"
                      checked={priceRange === range.id}
                      onChange={() => setPriceRange(range.id)}
                      className="accent-[#d4af37]"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Checklist */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {ALL_SIZES.map(s => {
                  const isSelected = selectedSizes.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => toggleSizeFilter(s)}
                      className={`w-9 h-9 rounded-lg text-xs font-bold transition-all border ${
                        isSelected
                          ? 'bg-[#d4af37] text-black border-[#d4af37]'
                          : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <label className="flex items-center gap-2.5 text-xs text-zinc-300 cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={e => setInStockOnly(e.target.checked)}
                  className="rounded accent-[#d4af37]"
                />
                <span>In Stock Items Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800 space-y-4">
                <p className="text-base text-zinc-300 font-semibold">No apparel matches your filter selections.</p>
                <p className="text-xs text-zinc-500">Try loosening your price range or selecting &quot;All Products&quot;.</p>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => {
                  const inWish = isInWishlist(product.id);
                  return (
                    <div
                      key={product.id}
                      className="group rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-[#d4af37]/60 overflow-hidden shadow-lg transition-all duration-200 flex flex-col"
                    >
                      {/* Image container */}
                      <div
                        onClick={() => onSelectProduct(product)}
                        className="relative aspect-[4/5] bg-zinc-950 overflow-hidden cursor-pointer"
                      >
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

                        {/* Wishlist button */}
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
                          title="Wishlist"
                        >
                          <Heart className={`w-4 h-4 ${inWish ? 'fill-white' : ''}`} />
                        </button>

                        {/* Stock Warning */}
                        {product.stock <= 5 && product.stock > 0 && (
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
                            Only {product.stock} left
                          </div>
                        )}

                        {product.stock === 0 && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center text-rose-400 font-black text-xs uppercase tracking-widest">
                            Out of Stock
                          </div>
                        )}
                      </div>

                      {/* Info */}
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

                          {/* Rating & count */}
                          <div className="flex items-center gap-2 mt-1.5">
                            <div className="flex items-center text-xs text-amber-400">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              <span className="ml-1 font-bold text-white">{product.rating}</span>
                            </div>
                            <span className="text-[11px] text-zinc-500">
                              ({product.reviewsCount})
                            </span>
                          </div>
                        </div>

                        {/* Pricing & Cart Button */}
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
                            disabled={product.stock === 0}
                            className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-[#d4af37] text-white hover:text-black flex items-center justify-center transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            title="Add to Cart"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-lg bg-[#141418] border border-zinc-800 rounded-t-3xl sm:rounded-2xl max-h-[85vh] overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <h3 className="text-base font-bold text-white">Filter Products</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-zinc-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase mb-2">Category</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      category === cat ? 'bg-[#d4af37] text-black' : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Sizes */}
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase mb-2">Sizes</h4>
              <div className="flex flex-wrap gap-2">
                {ALL_SIZES.map(s => (
                  <button
                    key={s}
                    onClick={() => toggleSizeFilter(s)}
                    className={`w-9 h-9 rounded-lg text-xs font-bold ${
                      selectedSizes.includes(s) ? 'bg-[#d4af37] text-black' : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 rounded-xl bg-[#d4af37] text-black font-bold text-xs uppercase"
            >
              Apply Filters ({filteredProducts.length} Results)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
