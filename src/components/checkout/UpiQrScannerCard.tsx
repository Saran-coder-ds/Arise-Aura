import React, { useState } from 'react';
import { Copy, Check, ExternalLink, QrCode, ShieldCheck, Sparkles, Smartphone } from 'lucide-react';

interface UpiQrScannerCardProps {
  amount?: number;
  orderId?: string;
  upiId?: string;
  payeeName?: string;
  onCopySuccess?: () => void;
  className?: string;
}

export const UpiQrScannerCard: React.FC<UpiQrScannerCardProps> = ({
  amount,
  orderId,
  upiId = 'sundarthiru67@oksbi',
  payeeName = 'VJ TAMIZHAN',
  onCopySuccess,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  // Construct official UPI payment URI
  const upiPayload = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}${
    amount ? `&am=${amount.toFixed(2)}` : ''
  }&cu=INR${orderId ? `&tn=AriseAuraOrder_${orderId}` : '&tn=AriseAuraClothing'}`;

  // High contrast clean QR API endpoint
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=10&data=${encodeURIComponent(
    upiPayload
  )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    if (onCopySuccess) onCopySuccess();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`relative max-w-sm mx-auto select-none ${className}`}>
      {/* Outer Glow */}
      <div className="absolute -inset-1 bg-gradient-to-b from-[#d4af37]/30 to-blue-600/20 rounded-3xl blur-md -z-10" />

      {/* Card container styled to match Google Pay / UPI sheet */}
      <div className="rounded-3xl bg-[#f0f4f9] text-[#1f1f1f] p-6 shadow-2xl border border-white/60 flex flex-col items-center">
        
        {/* Header: Avatar + Payee Name */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-500 to-amber-400 p-[2px] shadow-sm">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
              {/* Silhouette Avatar matching uploaded image */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="sunsetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="60%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect width="100" height="100" fill="url(#sunsetGrad)" />
                <circle cx="50" cy="38" r="14" fill="#ffffff" />
                <path d="M26 80 C26 62, 38 56, 50 56 C62 56, 74 62, 74 80 Z" fill="#ffffff" />
              </svg>
            </div>
          </div>

          <div className="text-left">
            <h3 className="font-extrabold text-base tracking-tight text-[#1f2937] font-['Outfit']">
              {payeeName}
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded flex items-center gap-1 w-max">
              <ShieldCheck className="w-2.5 h-2.5" /> Verified Business UPI
            </span>
          </div>
        </div>

        {/* QR Code Container */}
        <div className="relative w-64 h-64 bg-white p-3.5 rounded-3xl shadow-md border border-slate-200/80 flex items-center justify-center">
          <img
            src={qrCodeUrl}
            alt="Scan UPI QR Code to Pay"
            className="w-full h-full object-contain rounded-xl"
          />

          {/* Center Google Pay Ribbon Badge matching authentic GPay QR */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 bg-white rounded-full p-1.5 shadow-lg border border-slate-100 flex items-center justify-center">
              <svg viewBox="0 0 48 48" className="w-full h-full">
                {/* Google Pay 4-color loop */}
                <path fill="#4285F4" d="M24 10c4.2 0 7.8 1.5 10.6 4.1l-3.2 3.2C29.6 15.6 27 14.5 24 14.5c-5.2 0-9.6 3.5-11.2 8.3L8.2 19.2C11.3 13.8 17.2 10 24 10z" />
                <path fill="#34A853" d="M24 38c-4.3 0-8.1-1.6-11-4.2l3.4-3.3c2.1 1.8 4.8 2.9 7.6 2.9 5.3 0 9.7-3.6 11.2-8.5l4.7 3.6C36.8 34.2 30.9 38 24 38z" />
                <path fill="#FBBC05" d="M12.8 22.8c-.4 1.2-.6 2.4-.6 3.7s.2 2.5.6 3.7l-4.6 3.6C7.3 31.4 6.8 28.8 6.8 26s.5-5.4 1.4-7.8l4.6 4.6z" />
                <path fill="#EA4335" d="M35.2 22.8c.4 1.2.6 2.4.6 3.7s-.2 2.5-.6 3.7l4.6 3.6c.9-2.4 1.4-5 1.4-7.8s-.5-5.4-1.4-7.8l-4.6 4.6z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Amount Badge if present */}
        {amount !== undefined && (
          <div className="mt-4 px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-black font-['Outfit'] tracking-wide flex items-center gap-1.5 shadow-sm">
            <span>Pay Exactly:</span>
            <span className="text-[#d4af37] text-base">₹{amount}</span>
          </div>
        )}

        {/* UPI ID Pill with Copy Action */}
        <div className="mt-4 w-full flex items-center justify-between bg-white px-3.5 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="min-w-0 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              UPI ID
            </span>
            <span className="font-mono text-xs sm:text-sm font-extrabold text-slate-800 truncate block">
              {upiId}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-[#d4af37] text-white hover:text-black'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy ID</span>
              </>
            )}
          </button>
        </div>

        {/* Subtext matching uploaded image */}
        <p className="text-xs text-slate-600 font-medium mt-3">
          Scan to pay with any UPI app
        </p>

        {/* Supported Apps Row */}
        <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-slate-200/80 w-full text-[11px] font-semibold text-slate-500">
          <span className="px-2 py-0.5 rounded bg-white text-slate-700 shadow-xs">GPay</span>
          <span className="px-2 py-0.5 rounded bg-white text-slate-700 shadow-xs">PhonePe</span>
          <span className="px-2 py-0.5 rounded bg-white text-slate-700 shadow-xs">Paytm</span>
          <span className="px-2 py-0.5 rounded bg-white text-slate-700 shadow-xs">BHIM</span>
          <span className="px-2 py-0.5 rounded bg-white text-slate-700 shadow-xs">CRED</span>
        </div>

        {/* Mobile Deep Link */}
        <div className="w-full mt-4">
          <a
            href={upiPayload}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <Smartphone className="w-4 h-4" />
            <span>Open in Any UPI App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
