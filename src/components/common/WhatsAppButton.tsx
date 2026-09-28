import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, HelpCircle, CheckCheck } from 'lucide-react';
import { AriseAuraLogo } from './AriseAuraLogo';

interface WhatsAppButtonProps {
  onNavigate?: (page: string) => void;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '917358641670';
  const displayPhone = '+91 73586 41670';

  const openWhatsAppWith = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Expanded Quick Inquiry Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl bg-[#141418] border border-zinc-700/80 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 text-white">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-700 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center p-1">
                  <AriseAuraLogo variant="icon" theme="gold" iconSize={26} />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-300 border-2 border-[#141418] rounded-full animate-ping" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#141418] rounded-full" />
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5 font-['Outfit']">
                  ARISE AURA Support
                  <span className="text-[10px] bg-emerald-500/40 px-1.5 py-0.5 rounded font-medium">Online</span>
                </h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <CheckCheck className="w-3 h-3" /> Replies in ~5 mins &bull; {displayPhone}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 cursor-pointer"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Questions Body */}
          <div className="p-4 space-y-3 bg-[#111115]">
            <p className="text-xs text-zinc-300 font-medium">
              Hi! Welcome to <strong className="text-white">ARISE AURA CLOTHING</strong>. How can our production hub in Chennai assist you?
            </p>

            <div className="space-y-2">
              <button
                onClick={() => openWhatsAppWith('Hi Arise Aura! I need help with custom T-shirt printing and artwork upload.')}
                className="w-full text-left p-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/90 border border-zinc-700 text-xs text-zinc-200 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
              >
                <span>🎨 Custom Design &amp; Artwork Inquiry</span>
                <Send className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => openWhatsAppWith('Hello Arise Aura! I would like a quote for a bulk sports team jersey order (players & numbers).')}
                className="w-full text-left p-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/90 border border-zinc-700 text-xs text-zinc-200 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
              >
                <span>⚽ Bulk Team Jerseys &amp; Kits Quote</span>
                <Send className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => openWhatsAppWith('Hello Arise Aura team, I have a question about payment confirmation or UPI transfer.')}
                className="w-full text-left p-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/90 border border-zinc-700 text-xs text-zinc-200 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
              >
                <span>💳 Payment Verification &amp; UPI Help</span>
                <Send className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => openWhatsAppWith('Hi! I want to check my order shipment tracking status.')}
                className="w-full text-left p-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/90 border border-zinc-700 text-xs text-zinc-200 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
              >
                <span>📦 Order Status &amp; Tracking Help</span>
                <Send className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="pt-2 border-t border-zinc-800">
              <button
                onClick={() => openWhatsAppWith('Hello ARISE AURA! I would like to chat regarding custom clothing.')}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Start Direct Chat (+91 73586 41670)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center hover:scale-105 transition-all group focus:outline-none cursor-pointer"
        aria-label="Chat with ARISE AURA on WhatsApp"
        title="Chat on WhatsApp (+91 73586 41670)"
      >
        <MessageCircle className="w-7 h-7 fill-white group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#d4af37] text-black font-extrabold text-[10px] rounded-full flex items-center justify-center shadow-md animate-pulse">
          1
        </span>
      </button>
    </div>
  );
};
