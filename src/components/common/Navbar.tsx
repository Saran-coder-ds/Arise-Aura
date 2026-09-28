import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Sun, 
  Moon, 
  User as UserIcon, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Palette,
  Truck,
  Phone,
  LogOut,
  ChevronDown,
  Instagram,
  MessageCircle,
  ExternalLink,
  LogIn,
  UserPlus
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { AriseAuraLogo } from './AriseAuraLogo';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenSearch }) => {
  const { totalItemsCount, setIsCartOpen, wishlist } = useCart();
  const { user, isAdmin, signInWithGoogle, signOut, toggleAdminRole, loginDemoCustomer, loginDemoAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const INSTAGRAM_URL = 'https://www.instagram.com/ariseaura.fitz';
  const WHATSAPP_URL = 'https://wa.me/917358641670';
  const PHONE_NUMBER = '7358641670';
  const FORMATTED_PHONE = '+91 73586 41670';

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'custom', label: 'Custom Design', badge: 'Studio' },
    { id: 'team-jerseys', label: 'Team Jerseys' },
    { id: 'collections', label: 'Collections' },
    { id: 'offers', label: 'Offers' },
    { id: 'track', label: 'Track Order' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-200">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#171512] via-[#241e15] to-[#171512] border-b border-[#d4af37]/20 text-[#f5f5f5] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-[#d4af37]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span className="font-medium tracking-wide">ARISE AURA: FLAT 30% OFF ON CUSTOM PRINTED TEES | CODE: ARISE10</span>
          </div>
          <div className="flex items-center gap-4 mx-auto sm:mx-0 text-[11px] text-zinc-300">
            <span className="flex items-center gap-1">
              <Truck className="w-3 h-3 text-[#d4af37]" /> Free Shipping &gt; ₹799
            </span>
            <span className="hidden md:inline">|</span>
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden md:flex items-center gap-1 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" /> WhatsApp: {FORMATTED_PHONE}
            </a>
            <span>|</span>
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 hover:text-pink-400 transition-colors"
              title="Follow @ariseaura.fitz on Instagram"
            >
              <Instagram className="w-3 h-3 text-pink-400" />
              <span className="hidden sm:inline">@ariseaura.fitz</span>
            </a>
            <span>|</span>
            {/* Quick Admin Toggle Pill */}
            <button
              onClick={toggleAdminRole}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
                isAdmin 
                  ? 'bg-[#d4af37] text-black font-bold shadow-sm' 
                  : 'bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700'
              }`}
              title="Click to toggle between Customer & Admin view"
            >
              <ShieldCheck className="w-3 h-3" />
              {isAdmin ? 'Admin Mode: ON' : 'Switch To Admin'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-[#0e0e11]/95 dark:bg-[#0c0c0e]/95 backdrop-blur-md border-b border-zinc-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Official ARISE AURA Brand Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center cursor-pointer group"
          >
            <AriseAuraLogo variant="horizontal" theme="gold" iconSize={38} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-medium">
            {navLinks.map(link => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`relative py-1 transition-colors text-xs tracking-wider uppercase font-semibold cursor-pointer ${
                    isActive 
                      ? 'text-[#d4af37]' 
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40 uppercase animate-pulse">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d4af37] rounded-full shadow-[0_0_8px_#d4af37]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-zinc-300 hover:text-[#d4af37] hover:bg-zinc-800/60 rounded-full transition-colors cursor-pointer"
              title="Search catalog"
            >
              <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </button>

            {/* INSTAGRAM BUTTON IN NAVBAR */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-300 hover:text-pink-400 hover:bg-zinc-800/60 rounded-full transition-colors group cursor-pointer"
              title="Follow ARISE AURA on Instagram (@ariseaura.fitz)"
            >
              <Instagram className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-pink-400 group-hover:scale-110 transition-transform" />
            </a>

            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-zinc-300 hover:text-[#d4af37] hover:bg-zinc-800/60 rounded-full transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-amber-300" /> : <Moon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-zinc-400" />}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => onNavigate('account', { tab: 'wishlist' })}
              className="relative p-2 text-zinc-300 hover:text-[#d4af37] hover:bg-zinc-800/60 rounded-full transition-colors cursor-pointer"
              title="Wishlist"
            >
              <Heart className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#d4af37] text-black text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Slide-out trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-zinc-300 hover:text-[#d4af37] hover:bg-zinc-800/60 rounded-full transition-colors flex items-center gap-2 cursor-pointer"
              title="Cart"
            >
              <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#d4af37]" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[#d4af37] text-black text-[11px] font-extrabold rounded-full flex items-center justify-center shadow-lg animate-scale">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Admin Dashboard Quick Link (if Admin) */}
            {isAdmin && (
              <button
                onClick={() => onNavigate('admin')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-400 via-[#d4af37] to-amber-600 text-black shadow-md hover:brightness-110 transition-all uppercase tracking-wider cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Panel</span>
              </button>
            )}

            {/* User Account / Profile Dropdown */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2 bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700 rounded-full text-xs font-medium text-white transition-all cursor-pointer"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#d4af37] text-black font-bold flex items-center justify-center text-xs">
                      {user.displayName?.charAt(0) || 'U'}
                    </div>
                  )}
                  <span className="hidden md:inline max-w-[80px] truncate">{user.displayName}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400 mr-1" />
                </button>
              ) : (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors cursor-pointer"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Account</span>
                  <ChevronDown className="w-3 h-3 text-zinc-400" />
                </button>
              )}

              {/* User dropdown menu */}
              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#141418] border border-zinc-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  {user ? (
                    <div className="px-3 py-2 border-b border-zinc-800">
                      <p className="text-xs text-zinc-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{user.displayName}</p>
                      <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${isAdmin ? 'bg-amber-500/20 text-[#d4af37]' : 'bg-blue-500/20 text-blue-400'}`}>
                        Role: {user.role}
                      </span>
                    </div>
                  ) : (
                    <div className="px-3 py-2 border-b border-zinc-800">
                      <p className="text-xs text-zinc-300 font-bold">Welcome to ARISE AURA</p>
                      <p className="text-[11px] text-zinc-400">Sign in to track orders & save designs</p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => onNavigate('account', { tab: 'profile', mode: 'login' })}
                          className="flex-1 py-1.5 rounded-lg bg-[#d4af37] text-black font-bold text-xs uppercase flex items-center justify-center gap-1"
                        >
                          <LogIn className="w-3 h-3" /> Login
                        </button>
                        <button
                          onClick={() => onNavigate('account', { tab: 'profile', mode: 'register' })}
                          className="flex-1 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase flex items-center justify-center gap-1 border border-zinc-700"
                        >
                          <UserPlus className="w-3 h-3" /> Register
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="py-1">
                    {user && (
                      <>
                        <button
                          onClick={() => onNavigate('account', { tab: 'orders' })}
                          className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg flex items-center justify-between"
                        >
                          <span>My Orders &amp; Invoices</span>
                          <span className="text-[10px] text-[#d4af37] font-bold">View</span>
                        </button>
                        <button
                          onClick={() => onNavigate('account', { tab: 'designs' })}
                          className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg"
                        >
                          My Custom Designs
                        </button>
                        <button
                          onClick={() => onNavigate('account', { tab: 'wishlist' })}
                          className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg"
                        >
                          My Wishlist ({wishlist.length})
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => onNavigate('track')}
                      className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg"
                    >
                      Track Active Shipment
                    </button>

                    <button
                      onClick={() => onNavigate('contact')}
                      className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg"
                    >
                      Contact Support (Chennai)
                    </button>
                  </div>

                  <div className="pt-1 border-t border-zinc-800">
                    {!user ? (
                      <>
                        <button
                          onClick={signInWithGoogle}
                          className="w-full text-left px-3 py-2 text-xs text-white hover:bg-zinc-800/80 rounded-lg flex items-center gap-2 font-medium"
                        >
                          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
                          Sign in with Google
                        </button>
                        <button
                          onClick={loginDemoCustomer}
                          className="w-full text-left px-3 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg"
                        >
                          Demo Customer Login
                        </button>
                        <button
                          onClick={loginDemoAdmin}
                          className="w-full text-left px-3 py-1.5 text-xs text-[#d4af37] hover:bg-[#d4af37]/10 rounded-lg font-medium"
                        >
                          Demo Admin Login
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={signOut}
                        className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg flex items-center gap-1.5 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-800 bg-[#0e0e11] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-3 duration-200">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  currentPage === link.id
                    ? 'bg-[#d4af37]/10 text-[#d4af37]'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded font-bold uppercase">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}

            {/* Mobile Contact Quick Actions */}
            <div className="pt-2 border-t border-zinc-800 grid grid-cols-3 gap-2">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="py-2 px-2 rounded-xl bg-zinc-900 border border-zinc-800 text-center text-xs font-bold text-white flex flex-col items-center gap-1 hover:border-[#d4af37]"
              >
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span>Call</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-2 rounded-xl bg-zinc-900 border border-zinc-800 text-center text-xs font-bold text-emerald-400 flex flex-col items-center gap-1 hover:border-emerald-500"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-2 rounded-xl bg-zinc-900 border border-zinc-800 text-center text-xs font-bold text-pink-400 flex flex-col items-center gap-1 hover:border-pink-500"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>
            </div>

            {isAdmin && (
              <button
                onClick={() => {
                  onNavigate('admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-between mt-2 cursor-pointer shadow-md"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Admin Dashboard
                </span>
                <span className="text-[10px] bg-black/20 text-black px-2 py-0.5 rounded uppercase font-bold">HQ</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
