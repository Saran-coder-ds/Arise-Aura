import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  Palette, 
  MapPin, 
  FileText, 
  LogOut, 
  ShieldCheck, 
  ShoppingBag,
  Trash2,
  ExternalLink,
  Printer
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { INITIAL_PRODUCTS } from '../../data/mockData';
import { Product, Order } from '../../types';

interface AccountPageProps {
  initialTab?: 'orders' | 'designs' | 'wishlist' | 'addresses' | 'profile';
  orders?: Order[];
  onNavigateToShop: () => void;
  onNavigateToTrack: (orderId: string) => void;
  onOpenStudio: (design?: any) => void;
  onSelectProduct: (product: Product) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  initialTab = 'orders',
  orders = [],
  onNavigateToShop,
  onNavigateToTrack,
  onOpenStudio,
  onSelectProduct
}) => {
  const { user, isAdmin, signInWithGoogle, signOut, loginDemoCustomer, loginDemoAdmin } = useAuth();
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'orders' | 'designs' | 'wishlist' | 'addresses' | 'profile'>(initialTab);

  // User-specific or all real orders
  const displayOrders = orders.length > 0 ? orders : [
    {
      id: 'PL123456',
      createdAt: '2025-09-20T10:30:00.000Z',
      total: 1848,
      status: 'Processing' as any,
      items: [
        { id: '1', productId: 'p1', title: 'Dream Big Printed T-Shirt', size: 'L' as any, quantity: 1, price: 599, originalPrice: 999, color: { name: 'Black', hex: '#000' }, image: '' }
      ],
      customerName: 'Saran Shalini',
      email: '',
      phone: '',
      shippingAddress: { fullName: '', email: '', phone: '', addressLine: '', city: '', state: '', pincode: '' },
      subtotal: 1898,
      discount: 50,
      shipping: 0,
      paymentMethod: 'UPI / QR' as any,
      paymentStatus: 'Paid' as any,
      trackingSteps: []
    }
  ];

  // Saved Custom Designs
  const savedDesigns = [
    {
      id: 'des-01',
      title: 'Squad Champions 24 Gold Jersey',
      garmentType: 'football-jersey',
      color: '#111111',
      size: 'L',
      date: '18 Sep 2025',
      preview: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'des-02',
      title: 'Aura Minimalist Boxy Print',
      garmentType: 'oversized-tshirt',
      color: '#EBE5D8',
      size: 'XL',
      date: '14 Sep 2025',
      preview: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=400&q=80'
    }
  ];

  // Wishlist products
  const wishlistProducts = INITIAL_PRODUCTS.filter(p => wishlist.includes(p.id));

  // If user not signed in, show luxury login screen
  if (!user) {
    return (
      <div className="bg-[#0c0c0e] min-h-screen text-white py-16 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-zinc-900/80 border border-zinc-800 p-8 space-y-6 text-center shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#f7e7a9] to-[#997920] p-[1.5px] mx-auto shadow-lg shadow-[#d4af37]/20">
            <div className="w-full h-full bg-[#0d0d10] rounded-[14px] flex items-center justify-center font-black text-xl text-[#d4af37]">
              AA
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black font-['Outfit'] text-white">Sign In to Arise Aura</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Access your order tracking, custom mockup designs, and fast checkout.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={signInWithGoogle}
              className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-zinc-100 text-black font-bold text-xs flex items-center justify-center gap-3 transition-colors shadow-md"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800" /></div>
              <span className="relative bg-zinc-900 px-3 text-[10px] text-zinc-500 uppercase tracking-widest font-bold">or quick demo preview</span>
            </div>

            <button
              onClick={loginDemoCustomer}
              className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition-colors"
            >
              Sign in as Demo Customer
            </button>

            <button
              onClick={loginDemoAdmin}
              className="w-full py-3 px-4 rounded-xl bg-[#d4af37]/15 hover:bg-[#d4af37]/25 text-[#d4af37] border border-[#d4af37]/30 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              Sign in as Admin Manager
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0c0c0e] min-h-screen text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* User Profile Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || 'Avatar'} className="w-16 h-16 rounded-2xl object-cover border border-zinc-700 shadow-md" />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-[#d4af37] text-black font-black text-2xl flex items-center justify-center shadow-lg">
                {user.displayName?.charAt(0) || 'U'}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black font-['Outfit'] text-white">
                  {user.displayName}
                </h1>
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                  isAdmin ? 'bg-amber-500/20 text-[#d4af37] border border-amber-500/30' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">{user.email}</p>
              <p className="text-[11px] text-zinc-500">{user.phone || '+91 98765 43210'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={signOut}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-rose-500/20 text-xs font-semibold text-zinc-300 hover:text-rose-400 border border-zinc-700 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-zinc-800 overflow-x-auto no-scrollbar pb-1 text-xs">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'orders' ? 'bg-[#d4af37] text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({displayOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('designs')}
            className={`px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'designs' ? 'bg-[#d4af37] text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Saved Custom Mockups ({savedDesigns.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'wishlist' ? 'bg-[#d4af37] text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlistProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'addresses' ? 'bg-[#d4af37] text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-in fade-in">
            {displayOrders.map(order => (
              <div
                key={order.id}
                className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-2">
                  <div>
                    <span className="text-sm font-black font-mono text-white">#{order.id}</span>
                    <span className="text-xs text-zinc-400 ml-2">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                      order.status.toLowerCase() === 'delivered' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : order.status.toLowerCase() === 'shipped'
                        ? 'bg-blue-500/20 text-blue-400'
                        : order.status.toLowerCase() === 'production'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {order.status}
                    </span>
                    <span className="text-base font-black text-[#d4af37] font-['Outfit']">₹{order.total}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.items?.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-zinc-300">
                      <span>{it.quantity || 1}x {it.title} (Size: {it.size})</span>
                      <span className="font-semibold text-white">₹{it.price * (it.quantity || 1)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 text-xs">
                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center gap-1.5 font-semibold"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Download Invoice</span>
                  </button>

                  <button
                    onClick={() => onNavigateToTrack(order.id)}
                    className="px-4 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#e6c148] text-black font-bold uppercase tracking-wider"
                  >
                    Track Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: SAVED DESIGNS */}
        {activeTab === 'designs' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
            {savedDesigns.map(des => (
              <div
                key={des.id}
                className="rounded-2xl bg-zinc-900/60 border border-zinc-800 overflow-hidden p-4 space-y-3"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950">
                  <img src={des.preview} alt={des.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white truncate">{des.title}</h4>
                  <p className="text-[11px] text-zinc-400">Created: {des.date} &bull; Size: {des.size}</p>
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => onOpenStudio({ productType: des.garmentType, size: des.size })}
                    className="flex-1 py-2 rounded-lg bg-[#d4af37] hover:bg-[#e6c148] text-black font-bold text-xs uppercase"
                  >
                    Open in Studio
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="animate-in fade-in">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 text-zinc-500 space-y-3">
                <Heart className="w-10 h-10 mx-auto text-zinc-600" />
                <p className="text-sm font-semibold text-zinc-300">Your wishlist is empty</p>
                <button
                  onClick={onNavigateToShop}
                  className="px-4 py-2 rounded-xl bg-[#d4af37] text-black font-bold text-xs uppercase"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistProducts.map(p => (
                  <div
                    key={p.id}
                    className="rounded-2xl bg-zinc-900/60 border border-zinc-800 overflow-hidden flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/5] bg-zinc-950 cursor-pointer" onClick={() => onSelectProduct(p)}>
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(p.id);
                        }}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-rose-500 text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4 space-y-2">
                      <h4 className="text-xs font-bold text-white truncate">{p.title}</h4>
                      <span className="text-xs font-bold text-[#d4af37]">₹{p.price}</span>
                      <button
                        onClick={() => addToCart({
                          productId: p.id,
                          title: p.title,
                          image: p.image,
                          price: p.price,
                          originalPrice: p.originalPrice,
                          size: p.sizes[0] || 'L',
                          color: p.colors[0] || { name: 'Black', hex: '#111' },
                          quantity: 1
                        })}
                        className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-[#d4af37] text-white hover:text-black font-bold text-xs transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-[#d4af37]/40 space-y-2 relative">
              <span className="text-[10px] font-bold uppercase bg-[#d4af37] text-black px-2 py-0.5 rounded">
                Default Shipping
              </span>
              <h4 className="text-sm font-bold text-white pt-1">Saran Shalini (Home)</h4>
              <p className="text-xs text-zinc-400">
                No. 42, 4th Avenue, Shanthi Colony, Anna Nagar, Chennai, Tamil Nadu - 600040
              </p>
              <p className="text-xs text-zinc-500">Phone: +91 98765 43210</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
