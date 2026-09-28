import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Ruler, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Share2,
  Sparkles
} from 'lucide-react';
import { Product, GarmentSize } from '../../types';
import { useCart } from '../../context/CartContext';
import { SizeGuideModal } from '../common/SizeGuideModal';

interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigateToCheckout: () => void;
  onBackToShop: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  relatedProducts,
  onSelectProduct,
  onNavigateToCheckout,
  onBackToShop
}) => {
  const { addToCart, isInWishlist, toggleWishlist } = useCart();

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<GarmentSize>(product.sizes[0] || 'L');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Black', hex: '#111' });
  const [quantity, setQuantity] = useState<number>(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // Accordion open states
  const [openAccordion, setOpenAccordion] = useState<string>('details');

  const allImages = [product.image, ...(product.additionalImages || [])];
  const inWish = isInWishlist(product.id);

  const handleBuyNow = () => {
    addToCart({
      productId: product.id,
      title: product.title,
      image: activeImage,
      price: product.price,
      originalPrice: product.originalPrice,
      size: selectedSize,
      color: selectedColor,
      quantity
    });
    onNavigateToCheckout();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="bg-[#0c0c0e] min-h-screen text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6 font-medium">
          <button onClick={onBackToShop} className="hover:text-white transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={onBackToShop} className="hover:text-white transition-colors">
            {product.category}
          </button>
          <span>/</span>
          <span className="text-[#d4af37] truncate">{product.title}</span>
        </nav>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Gallery (Thumbnail Strip + Main Image) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all p-0.5 bg-zinc-950 ${
                    activeImage === img ? 'border-[#d4af37]' : 'border-zinc-800 hover:border-zinc-600'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover rounded-lg" />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 relative aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 p-2 shadow-2xl">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover rounded-2xl"
              />

              {/* Discount Tag */}
              {product.discountPercent > 0 && (
                <div className="absolute top-5 left-5 bg-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider px-3 py-1 rounded-lg shadow-lg">
                  {product.discountPercent}% OFF
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg ${
                  inWish ? 'bg-rose-500 text-white' : 'bg-black/60 text-white hover:bg-black'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWish ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Right: Product Actions & Specs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Category */}
            <div>
              <span className="text-xs text-[#d4af37] font-bold tracking-widest uppercase">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-white mt-1">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400'
                          : 'text-zinc-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-white">{product.rating}</span>
                <span className="text-xs text-zinc-500">({product.reviewsCount} customer reviews)</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white font-['Outfit']">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-zinc-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Inclusive of all taxes &bull; Free express delivery over ₹799
                </p>
              </div>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors text-xs flex items-center gap-1.5"
                title="Share product"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">{copiedShare ? 'Copied!' : 'Share'}</span>
              </button>
            </div>

            {/* Color Swatches */}
            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-2">
                Color: <span className="text-white font-normal">{selectedColor.name}</span>
              </label>
              <div className="flex items-center gap-2.5">
                {product.colors.map(col => {
                  const isCol = selectedColor.hex === col.hex;
                  return (
                    <button
                      key={col.hex}
                      onClick={() => setSelectedColor(col)}
                      className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        isCol ? 'border-[#d4af37] ring-2 ring-[#d4af37]/30 scale-110' : 'border-zinc-700'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {isCol && (
                        <Check className={`w-3.5 h-3.5 ${col.hex === '#FFFFFF' || col.hex === '#F9FAFB' || col.hex === '#EBE5D8' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-zinc-300">
                  Size: <span className="text-[#d4af37]">{selectedSize}</span>
                </label>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-xs text-[#d4af37] hover:underline flex items-center gap-1 font-semibold"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => {
                  const isSel = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-11 h-11 px-3 rounded-xl text-xs font-bold transition-all border ${
                        isSel
                          ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-md shadow-[#d4af37]/20 font-black'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Stock status */}
            <div className="flex items-center gap-4 pt-1">
              <div>
                <label className="text-xs font-bold text-zinc-400 block mb-1.5">Quantity</label>
                <div className="flex items-center border border-zinc-700 rounded-xl bg-zinc-900 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex-1 pt-4">
                {product.stock <= 5 ? (
                  <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1.5 rounded-lg border border-amber-500/40 inline-block">
                    ⚡ Hurry! Only {product.stock} pieces left in stock
                  </span>
                ) : (
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30 inline-block">
                    ✓ In Stock (Ships in 24 hours)
                  </span>
                )}
              </div>
            </div>

            {/* CTAs: Add to Cart and Buy Now (Matching Reference Screenshot) */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => addToCart({
                  productId: product.id,
                  title: product.title,
                  image: activeImage,
                  price: product.price,
                  originalPrice: product.originalPrice,
                  size: selectedSize,
                  color: selectedColor,
                  quantity
                })}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c358] to-[#c59c2b] text-black font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-[#d4af37]/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider border border-zinc-700 hover:border-zinc-500 transition-colors cursor-pointer"
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-800 text-center">
              <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-[11px] font-bold text-white block">100% Cotton</span>
                <span className="text-[10px] text-zinc-400">Super Combed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-[11px] font-bold text-white block">Premium Print</span>
                <span className="text-[10px] text-zinc-400">Zero Fade DTF</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-[11px] font-bold text-white block">Fast Delivery</span>
                <span className="text-[10px] text-zinc-400">3-5 Days Across IN</span>
              </div>
            </div>

            {/* Accordion Tabs */}
            <div className="pt-2 border-t border-zinc-800 space-y-2">
              
              {/* Product Details */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'details' ? '' : 'details')}
                  className="w-full p-3.5 text-left text-xs font-bold text-white flex items-center justify-between"
                >
                  <span>Product Details</span>
                  {openAccordion === 'details' ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                </button>
                {openAccordion === 'details' && (
                  <div className="p-3.5 pt-0 text-xs text-zinc-400 space-y-2 border-t border-zinc-800/60">
                    <p>{product.description}</p>
                    <ul className="list-disc list-inside space-y-1 text-zinc-300">
                      <li>Fabric: {product.fabric || '100% Super-Combed Cotton'}</li>
                      <li>Weight: {product.gsm || '240 GSM Heavyweight'}</li>
                      <li>Fit: {product.fit || 'Regular Boxy Fit'}</li>
                      <li>Print Tech: High-Definition Direct-To-Film (DTF)</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? '' : 'shipping')}
                  className="w-full p-3.5 text-left text-xs font-bold text-white flex items-center justify-between"
                >
                  <span>Shipping &amp; Returns</span>
                  {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="p-3.5 pt-0 text-xs text-zinc-400 space-y-2 border-t border-zinc-800/60">
                    <p>We dispatch all orders via express air cargo within 24-48 hours. Estimated transit time: 3-5 business days.</p>
                    <p>Free exchanges on sizing defects within 7 days of delivery. Cash on Delivery is available across most pincodes in India.</p>
                  </div>
                )}
              </div>

              {/* Size Chart Shortcut */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="w-full p-3.5 text-left text-xs font-bold text-[#d4af37] flex items-center justify-between"
                >
                  <span>Size Chart &amp; Fit Recommendations</span>
                  <Ruler className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Related Products Carousel */}
        <div className="mt-20 pt-10 border-t border-zinc-800">
          <h3 className="text-xl font-bold font-['Outfit'] text-white mb-6">
            You May Also Like
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.slice(0, 4).map(item => (
              <div
                key={item.id}
                onClick={() => onSelectProduct(item)}
                className="group rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-[#d4af37]/60 overflow-hidden cursor-pointer transition-all"
              >
                <div className="aspect-[4/5] bg-zinc-950 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-3">
                  <span className="text-[10px] text-[#d4af37] font-semibold uppercase">{item.category}</span>
                  <h4 className="text-xs font-bold text-white truncate mt-0.5 group-hover:text-[#d4af37]">{item.title}</h4>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-xs font-extrabold text-white">₹{item.price}</span>
                    <span className="text-[10px] text-zinc-500 line-through">₹{item.originalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        categoryName={product.category}
        selectedSize={selectedSize}
        onSelectSize={(s) => setSelectedSize(s)}
      />
    </div>
  );
};
