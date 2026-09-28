import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Send, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  MessageCircle, 
  ExternalLink,
  ShieldCheck,
  Building,
  HelpCircle
} from 'lucide-react';
import { AriseAuraLogo } from './AriseAuraLogo';

interface ContactPageProps {
  onNavigateToShop?: () => void;
  onNavigateToCustom?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ 
  onNavigateToShop,
  onNavigateToCustom 
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Bulk Team Jersey Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Business constants from brief
  const BUSINESS_PHONE = '7358641670';
  const FORMATTED_PHONE = '+91 73586 41670';
  const WHATSAPP_URL = 'https://wa.me/917358641670';
  const EMAIL_ADDRESS = 'ariseauradrip@gmail.com';
  const INSTAGRAM_URL = 'https://www.instagram.com/ariseaura.fitz';
  const LOCATION = 'Chennai, Tamil Nadu, India';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 600);
  };

  return (
    <div className="bg-[#0c0c0e] min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center justify-center mb-2">
            <AriseAuraLogo variant="stacked" iconSize={52} theme="gold" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] tracking-tight text-white">
            Get in Touch with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f7e7a9] to-[#c59c2b]">
              ARISE AURA
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Have questions about custom DTF printing, bulk sports team jerseys, sizing specifications, or want to visit our hub in Chennai? We are at your service.
          </p>
        </div>

        {/* 4 CORE DIRECT CONTACT BUTTONS (Call, WhatsApp, Email, Instagram) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* 1. CALL BUTTON */}
          <a
            href={`tel:${BUSINESS_PHONE}`}
            className="group relative p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-[#d4af37] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[#d4af37]/10 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#d4af37] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] block">
                  Direct Phone Call
                </span>
                <h3 className="text-base font-extrabold text-white mt-1 group-hover:text-[#d4af37] transition-colors">
                  {FORMATTED_PHONE}
                </h3>
              </div>
              <p className="text-xs text-zinc-400">
                Speak directly with our apparel production manager.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-bold text-[#d4af37]">
              <span>Call Now</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </a>

          {/* 2. WHATSAPP BUTTON */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/10 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                  WhatsApp Instant Chat
                </span>
                <h3 className="text-base font-extrabold text-white mt-1 group-hover:text-emerald-400 transition-colors">
                  {BUSINESS_PHONE}
                </h3>
              </div>
              <p className="text-xs text-zinc-400">
                Share design mockups, get quick roster pricing &amp; tracking.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-bold text-emerald-400">
              <span>Chat on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </a>

          {/* 3. EMAIL BUTTON */}
          <a
            href={`mailto:${EMAIL_ADDRESS}`}
            className="group relative p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/10 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block">
                  Official Email
                </span>
                <h3 className="text-sm font-extrabold text-white mt-1 truncate group-hover:text-blue-400 transition-colors">
                  {EMAIL_ADDRESS}
                </h3>
              </div>
              <p className="text-xs text-zinc-400">
                Send bulk corporate RFPs, vector logos, and tax invoices.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-bold text-blue-400">
              <span>Send Email</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </a>

          {/* 4. INSTAGRAM BUTTON */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-pink-500 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-pink-500/10 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-pink-500/30 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-pink-400 block">
                  Instagram Drip
                </span>
                <h3 className="text-base font-extrabold text-white mt-1 group-hover:text-pink-400 transition-colors">
                  @ariseaura.fitz
                </h3>
              </div>
              <p className="text-xs text-zinc-400">
                Explore drops, behind-the-scenes printing reels &amp; style tags.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-bold text-pink-400">
              <span>Follow on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </a>
        </div>

        {/* Form and Hub Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 rounded-3xl bg-zinc-900/70 border border-zinc-800 p-6 sm:p-8 space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold font-['Outfit'] text-white">
                Send Us a Message
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Fill in the details below and our team will respond within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Thank You for Reaching Out!</h3>
                <p className="text-xs text-zinc-300 max-w-md mx-auto">
                  Your inquiry has been received by Arise Aura Clothing. A production specialist will get in touch with you at <strong className="text-emerald-400">{EMAIL_ADDRESS}</strong> or via phone shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold uppercase transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Your Full Name <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Saran Kumar"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Email Address <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. saran@example.com"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Contact / WhatsApp Number <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="e.g. 7358641670"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Topic / Requirement
                    </label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Bulk Team Jersey Inquiry">Bulk Team Jerseys &amp; Kits</option>
                      <option value="Custom Single T-Shirt Print">Custom Single T-Shirt Print</option>
                      <option value="Wholesale & Reseller Order">Wholesale &amp; Reseller Order</option>
                      <option value="Order Tracking / Payment Issue">Order Tracking / Payment Issue</option>
                      <option value="General Brand Inquiry">General Brand Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Your Message / Requirements <span className="text-[#d4af37]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Describe your jersey requirements, player quantities, print placement, or any questions..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e6c148] to-[#c59c2b] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Studio Location & Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Headquarters Card */}
            <div className="rounded-3xl bg-zinc-900/70 border border-zinc-800 p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-['Outfit']">
                    Brand Headquarters
                  </h3>
                  <span className="text-xs text-zinc-400">{LOCATION}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Production &amp; Printing Hub:</strong>
                    <span>ARISE AURA CLOTHING</span>
                    <p className="text-zinc-400">Chennai, Tamil Nadu, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Operating Hours:</strong>
                    <span>Monday &ndash; Saturday: 9:00 AM &ndash; 9:00 PM</span>
                    <p className="text-zinc-400">Sunday: 10:00 AM &ndash; 6:00 PM (IST)</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Fast PAN-India Shipping:</strong>
                    <span>Direct dispatch via Bluedart Air &amp; Delhivery</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Quick Actions */}
              <div className="pt-4 border-t border-zinc-800">
                <a
                  href={`https://wa.me/917358641670?text=${encodeURIComponent(
                    'Hello Arise Aura! I am looking for custom apparel in Chennai.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Chat on WhatsApp: {BUSINESS_PHONE}</span>
                </a>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="rounded-3xl bg-zinc-900/70 border border-zinc-800 p-6 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                Looking For Something Specific?
              </h4>
              <div className="flex flex-col gap-2">
                <button
                  onClick={onNavigateToCustom}
                  className="w-full text-left p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs text-white flex items-center justify-between transition-colors"
                >
                  <span>Design Your Custom Team Jersey</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
                </button>
                <button
                  onClick={onNavigateToShop}
                  className="w-full text-left p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs text-white flex items-center justify-between transition-colors"
                >
                  <span>Explore Printed Streetwear Catalog</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
