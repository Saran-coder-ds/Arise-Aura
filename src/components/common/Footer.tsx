import React, { useState } from 'react';
import { 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  MessageCircle, 
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { AriseAuraLogo } from './AriseAuraLogo';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const INSTAGRAM_URL = 'https://www.instagram.com/ariseaura.fitz';
  const WHATSAPP_URL = 'https://wa.me/917358641670';
  const PHONE_NUMBER = '7358641670';
  const FORMATTED_PHONE = '+91 73586 41670';
  const EMAIL_ADDRESS = 'ariseauradrip@gmail.com';
  const LOCATION = 'Chennai, Tamil Nadu, India';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#09090b] text-zinc-400 border-t border-zinc-800/80 pt-16 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 mb-12">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Premium Fabric Quality</h4>
              <p className="text-[11px] text-zinc-400">240-280 GSM combed cotton &amp; dry-fit athletic mesh</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">High-Precision DTF Printing</h4>
              <p className="text-[11px] text-zinc-400">Wash-resistant 60+ washes sublimation &amp; heat-press</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct UPI &amp; Verified Checkout</h4>
              <p className="text-[11px] text-zinc-400">Zero gateway fees via UPI ID &amp; QR verification</p>
            </div>
          </div>
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')} 
              className="inline-block cursor-pointer"
            >
              <AriseAuraLogo variant="horizontal" theme="gold" iconSize={40} />
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Custom Prints. Your Style. Our Priority. We engineer premium custom apparel, heavyweight oversized streetwear tees, and professional sports jerseys for individuals, teams, and high-performance clubs across India.
            </p>

            {/* Direct Connect Buttons (Instagram, WhatsApp, Call, Email) */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href={INSTAGRAM_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-pink-500 hover:bg-pink-500/10 text-pink-400 flex items-center justify-center transition-all shadow-sm"
                title="Follow ARISE AURA on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-400 flex items-center justify-center transition-all shadow-sm"
                title="Chat on WhatsApp (+91 73586 41670)"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a 
                href={`tel:${PHONE_NUMBER}`} 
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#d4af37] hover:bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center transition-all shadow-sm"
                title="Call 7358641670"
              >
                <Phone className="w-4 h-4" />
              </a>

              <a 
                href={`mailto:${EMAIL_ADDRESS}`} 
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-blue-500 hover:bg-blue-500/10 text-blue-400 flex items-center justify-center transition-all shadow-sm"
                title="Email ariseauradrip@gmail.com"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Shop Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('custom')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Custom Design Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('team-jerseys')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Bulk Team Jerseys
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collections')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Featured Collections
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('offers')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Exclusive Offers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('track')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support & Timings */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase">Customer Service</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Help Center &amp; Inquiries
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('track')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Order Tracking
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('account')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  My Profile &amp; Addresses
                </button>
              </li>
              <li>
                <span className="text-zinc-500">Shipping &amp; Delivery PAN-India</span>
              </li>
              <li>
                <span className="text-zinc-500">Bulk Jersey Sizing &amp; Mockups</span>
              </li>
              <li>
                <a 
                  href={INSTAGRAM_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-pink-400 hover:underline flex items-center gap-1"
                >
                  <Instagram className="w-3 h-3" />
                  <span>Instagram: @ariseaura.fitz</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Official Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase">Contact Details</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a href={`tel:${PHONE_NUMBER}`} className="hover:text-white transition-colors font-mono">
                  {FORMATTED_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors">
                  WhatsApp: {PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={`mailto:${EMAIL_ADDRESS}`} className="hover:text-white transition-colors truncate">
                  {EMAIL_ADDRESS}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{LOCATION}</span>
              </li>
              <li className="pt-1">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-300 text-[11px] font-bold hover:bg-pink-500/20 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Follow @ariseaura.fitz</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>&copy; {new Date().getFullYear()} ARISE AURA CLOTHING. All rights reserved. Registered in Chennai, Tamil Nadu.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Chennai, Tamil Nadu, India</span>
            <span>&bull;</span>
            <a href={`tel:${PHONE_NUMBER}`} className="hover:text-zinc-300">Call: {PHONE_NUMBER}</a>
            <span>&bull;</span>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">Instagram</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
