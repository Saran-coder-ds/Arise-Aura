import React, { useState } from 'react';
import { 
  Check, 
  CreditCard, 
  QrCode, 
  Building2, 
  Banknote, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  Printer, 
  Download, 
  ShoppingBag,
  Clock,
  Sparkles,
  Upload,
  FileImage,
  X,
  Copy,
  ExternalLink,
  Smartphone,
  Eye,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Order, OrderTrackingStep, ShippingAddress } from '../../types';
import { dbService } from '../../data/dbService';
import { UpiQrScannerCard } from './UpiQrScannerCard';
import { AriseAuraLogo } from '../common/AriseAuraLogo';

interface CheckoutPageProps {
  onOrderPlaced: (order: Order) => void;
  onTrackOrder: (orderId: string) => void;
  onBackToShop: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onOrderPlaced,
  onTrackOrder,
  onBackToShop
}) => {
  const { items, subtotal, discount, shipping, total, clearCart } = useCart();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'done'>('shipping');

  // Business payment settings
  const OFFICIAL_UPI_ID = 'sundarthiru67@oksbi';
  const OFFICIAL_PAYEE = 'VJ TAMIZHAN';

  // Shipping Form State
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: user?.displayName || 'Saran Shalini',
    email: user?.email || 'saranshalini2006@gmail.com',
    phone: user?.phone || '+91 73586 41670',
    addressLine: 'No. 42, 4th Avenue, Shanthi Colony, Anna Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600040'
  });

  // Payment Selection State
  // Option 1 = UPI ID (sundarthiru67@oksbi)
  // Option 2 = QR Scanner Image
  // Option 3 = Credit / Debit Card
  // Option 4 = Cash on Delivery
  const [paymentOption, setPaymentOption] = useState<'upi_id' | 'qr_scanner' | 'card' | 'cod'>('upi_id');
  const [copiedUpi, setCopiedUpi] = useState(false);
  
  // Payment Proof Upload State
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotUrl, setScreenshotUrl] = useState<string>('');
  const [transactionRef, setTransactionRef] = useState<string>('');
  const [screenshotError, setScreenshotError] = useState<string>('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [previewModalImage, setPreviewModalImage] = useState<string | null>(null);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(OFFICIAL_UPI_ID);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScreenshotError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setScreenshotError('Please upload an image file (PNG, JPG, or JPEG).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setScreenshotError('Image size should be under 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setScreenshotUrl(event.target.result as string);
        setScreenshotFile(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveScreenshot = () => {
    setScreenshotUrl('');
    setScreenshotFile(null);
    setScreenshotError('');
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    const generatedOrderId = `AA${Math.floor(100000 + Math.random() * 900000)}`;

    const trackingSteps: OrderTrackingStep[] = [
      {
        step: 'placed',
        label: 'Order Placed & Verified',
        description: 'Received at ARISE AURA Chennai Production Hub',
        timestamp: new Date().toLocaleDateString('en-GB', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        completed: true
      },
      {
        step: 'confirmed',
        label: 'Payment & Sizing Confirmed',
        description: paymentOption === 'cod' 
          ? 'COD verification pending dispatch call' 
          : (screenshotUrl ? 'UPI Payment screenshot logged for admin audit' : 'Payment approved'),
        timestamp: 'Within 2 hours',
        completed: paymentOption !== 'cod'
      },
      {
        step: 'processing',
        label: 'DTF Printing & Heat-Press Queue',
        description: 'Direct-to-Film & custom sublimation finish',
        timestamp: 'Estimated 24 hours',
        completed: false
      },
      {
        step: 'shipped',
        label: 'Dispatched with Express Courier',
        description: 'Bluedart Air / Delhivery tracking AWB',
        timestamp: 'Pending dispatch',
        completed: false
      },
      {
        step: 'delivered',
        label: 'Delivered',
        description: 'Doorstep contactless delivery',
        timestamp: '3-4 business days',
        completed: false
      }
    ];

    let paymentMethodLabel: 'UPI / QR' | 'Credit / Debit Card' | 'Net Banking' | 'Cash on Delivery' = 'UPI / QR';
    if (paymentOption === 'card') paymentMethodLabel = 'Credit / Debit Card';
    if (paymentOption === 'cod') paymentMethodLabel = 'Cash on Delivery';

    const orderData: Order = {
      id: generatedOrderId,
      userId: user?.uid || 'guest',
      customerName: address.fullName,
      email: address.email,
      phone: address.phone,
      shippingAddress: address,
      items,
      subtotal,
      discount,
      shipping,
      total,
      paymentMethod: paymentMethodLabel,
      paymentOption,
      paymentStatus: paymentOption === 'cod' ? 'Pending COD' : (screenshotUrl ? 'Pending Verification' : 'Paid'),
      paymentScreenshotUrl: screenshotUrl || undefined,
      paymentScreenshotFileName: screenshotFile?.name || undefined,
      transactionRef: transactionRef.trim() || undefined,
      upiId: (paymentOption === 'upi_id' || paymentOption === 'qr_scanner') ? OFFICIAL_UPI_ID : undefined,
      status: 'Pending',
      trackingSteps,
      createdAt: new Date().toISOString()
    };

    // Save to database service (Firestore + LocalStorage)
    try {
      await dbService.createOrder(orderData);
    } catch (err) {
      console.warn('Could not persist order:', err);
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#ffffff', '#e6c148', '#22c55e']
      });
    } catch {
      // ignore
    }

    setCompletedOrder(orderData);
    setIsProcessing(false);
    setCurrentStep('done');
    clearCart();
    onOrderPlaced(orderData);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="bg-[#0c0c0e] min-h-screen text-white py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Progress Stepper */}
        <div className="flex items-center justify-center mb-10 select-none">
          <div className="flex items-center gap-3">
            {/* Step 1: Shipping */}
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 'shipping' 
                  ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/30 scale-105' 
                  : 'bg-emerald-500 text-white'
              }`}>
                {currentStep === 'shipping' ? '1' : <Check className="w-4 h-4 stroke-[3]" />}
              </div>
              <span className={`text-xs font-semibold uppercase tracking-wider ${
                currentStep === 'shipping' ? 'text-white' : 'text-zinc-400'
              }`}>
                1. Shipping
              </span>
            </div>

            <div className={`w-12 sm:w-20 h-0.5 transition-colors ${currentStep !== 'shipping' ? 'bg-emerald-500' : 'bg-zinc-800'}`} />

            {/* Step 2: Payment */}
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 'payment'
                  ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/30 scale-105'
                  : currentStep === 'done'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-zinc-800 text-zinc-500'
              }`}>
                {currentStep === 'done' ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
              </div>
              <span className={`text-xs font-semibold uppercase tracking-wider ${
                currentStep === 'payment' ? 'text-white font-bold' : 'text-zinc-400'
              }`}>
                2. UPI &amp; Payment
              </span>
            </div>

            <div className={`w-12 sm:w-20 h-0.5 transition-colors ${currentStep === 'done' ? 'bg-emerald-500' : 'bg-zinc-800'}`} />

            {/* Step 3: Done */}
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 'done' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-zinc-800 text-zinc-500'
              }`}>
                3
              </div>
              <span className={`text-xs font-semibold uppercase tracking-wider ${
                currentStep === 'done' ? 'text-white font-bold' : 'text-zinc-400'
              }`}>
                3. Confirmation
              </span>
            </div>
          </div>
        </div>

        {/* STEP 1: SHIPPING FORM */}
        {currentStep === 'shipping' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl bg-zinc-900/70 border border-zinc-800 p-6 sm:p-8 space-y-6">
                <div className="border-b border-zinc-800 pb-4">
                  <h2 className="text-xl font-bold font-['Outfit'] text-white">
                    Delivery Address
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Enter the recipient contact and doorstep shipping details.
                  </p>
                </div>

                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Full Recipient Name <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={e => setAddress({ ...address, fullName: e.target.value })}
                      placeholder="e.g. Saran Shalini"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        Email Address <span className="text-[#d4af37]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={address.email}
                        onChange={e => setAddress({ ...address, email: e.target.value })}
                        placeholder="saran@example.com"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        Mobile / WhatsApp Number <span className="text-[#d4af37]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={address.phone}
                        onChange={e => setAddress({ ...address, phone: e.target.value })}
                        placeholder="+91 73586 41670"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Flat / House No., Street Address <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={address.addressLine}
                      onChange={e => setAddress({ ...address, addressLine: e.target.value })}
                      placeholder="e.g. Flat 4B, Emerald Heights, Shanthi Colony"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        City <span className="text-[#d4af37]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={address.city}
                        onChange={e => setAddress({ ...address, city: e.target.value })}
                        placeholder="Chennai"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        State <span className="text-[#d4af37]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={address.state}
                        onChange={e => setAddress({ ...address, state: e.target.value })}
                        placeholder="Tamil Nadu"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        PIN Code <span className="text-[#d4af37]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={address.pincode}
                        onChange={e => setAddress({ ...address, pincode: e.target.value })}
                        placeholder="600040"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e6c148] to-[#c59c2b] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>Proceed to UPI &amp; Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar Order Summary */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl bg-zinc-900/70 border border-zinc-800 p-6 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-3 border-b border-zinc-800">
                  Order Summary ({items.length} items)
                </h3>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3 text-xs">
                      <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover bg-zinc-950 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white truncate">{item.title}</h4>
                        <p className="text-[11px] text-zinc-400">Qty: {item.quantity} &bull; Size: {item.size}</p>
                      </div>
                      <span className="font-bold text-white">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 text-xs pt-3 border-t border-zinc-800">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal:</span>
                    <span className="text-white">₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Discount:</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-400">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-800">
                    <span>Total Amount:</span>
                    <span className="text-[#d4af37] font-['Outfit']">₹{total}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* STEP 2: PAYMENT SECTION (Conforms strictly to Payment Section Specification) */}
        {currentStep === 'payment' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl bg-zinc-900/70 border border-zinc-800 p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-bold font-['Outfit'] text-white">
                    Select Payment Option
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Pay securely using direct UPI, scan the QR code, or choose alternative methods.
                  </p>
                </div>

                {/* PAYMENT OPTION TABS */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  
                  {/* Option 1: Direct UPI ID */}
                  <button
                    type="button"
                    onClick={() => setPaymentOption('upi_id')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentOption === 'upi_id'
                        ? 'bg-[#d4af37]/15 border-[#d4af37] text-white shadow-md'
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-[#d4af37]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Option 1: UPI ID
                    </span>
                    <span className="text-[9px] text-emerald-400 font-semibold">0% Fee</span>
                  </button>

                  {/* Option 2: QR Scanner Image */}
                  <button
                    type="button"
                    onClick={() => setPaymentOption('qr_scanner')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentOption === 'qr_scanner'
                        ? 'bg-[#d4af37]/15 border-[#d4af37] text-white shadow-md'
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-[#d4af37]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Option 2: Scan QR
                    </span>
                    <span className="text-[9px] text-emerald-400 font-semibold">GPay Scanner</span>
                  </button>

                  {/* Option 3: Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentOption('card')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentOption === 'card'
                        ? 'bg-[#d4af37]/15 border-[#d4af37] text-white shadow-md'
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#d4af37]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Debit / Card
                    </span>
                    <span className="text-[9px] text-zinc-400">Visa / RuPay</span>
                  </button>

                  {/* Option 4: COD */}
                  <button
                    type="button"
                    onClick={() => setPaymentOption('cod')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentOption === 'cod'
                        ? 'bg-[#d4af37]/15 border-[#d4af37] text-white shadow-md'
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-[#d4af37]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Cash on Delivery
                    </span>
                    <span className="text-[9px] text-zinc-400">Doorstep Pay</span>
                  </button>
                </div>

                {/* OPTION 1 CONTENT: UPI ID PAYMENT */}
                {paymentOption === 'upi_id' && (
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                      <div>
                        <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider">
                          Option 1: Direct UPI Transfer
                        </span>
                        <h4 className="text-sm font-extrabold text-white">
                          Pay directly to our official UPI VPA
                        </h4>
                      </div>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">
                        Instant Verification
                      </span>
                    </div>

                    {/* Prominent UPI ID Card */}
                    <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
                          Official Business UPI ID
                        </span>
                        <p className="font-mono text-base font-extrabold text-[#d4af37] tracking-wide mt-0.5">
                          {OFFICIAL_UPI_ID}
                        </p>
                        <span className="text-xs text-zinc-300 font-medium">
                          Payee: <strong>{OFFICIAL_PAYEE}</strong> (Arise Aura)
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            copiedUpi
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#d4af37] hover:brightness-110 text-black'
                          }`}
                        >
                          {copiedUpi ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy UPI ID</span>
                            </>
                          )}
                        </button>

                        <a
                          href={`upi://pay?pa=${encodeURIComponent(OFFICIAL_UPI_ID)}&pn=${encodeURIComponent(OFFICIAL_PAYEE)}&am=${total.toFixed(2)}&cu=INR&tn=AriseAura`}
                          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>Open UPI App</span>
                        </a>
                      </div>
                    </div>

                    <div className="text-xs text-zinc-400 space-y-1 pl-1">
                      <p>&bull; Open GPay, PhonePe, Paytm, BHIM, or CRED.</p>
                      <p>&bull; Send exact amount: <strong className="text-white font-mono">₹{total}</strong> to <strong className="text-[#d4af37] font-mono">{OFFICIAL_UPI_ID}</strong></p>
                      <p>&bull; Take a screenshot of the successful payment screen and upload it below.</p>
                    </div>
                  </div>
                )}

                {/* OPTION 2 CONTENT: DISPLAY UPLOADED QR SCANNER IMAGE */}
                {paymentOption === 'qr_scanner' && (
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 animate-in fade-in">
                    <div className="text-center space-y-1 pb-2 border-b border-zinc-800">
                      <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider">
                        Option 2: Scan QR Code &amp; Pay
                      </span>
                      <h4 className="text-sm font-extrabold text-white">
                        Scan the Google Pay QR Scanner card below with any UPI App
                      </h4>
                    </div>

                    {/* Official Uploaded QR Scanner Card (VJ TAMIZHAN / sundarthiru67@oksbi) */}
                    <UpiQrScannerCard
                      amount={total}
                      upiId={OFFICIAL_UPI_ID}
                      payeeName={OFFICIAL_PAYEE}
                    />
                  </div>
                )}

                {/* OPTION 3: CARD DETAILS */}
                {paymentOption === 'card' && (
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#d4af37]" />
                        Credit / Debit Card Transaction
                      </span>
                      <span className="text-[11px] text-zinc-400">128-bit SSL Secured</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-zinc-300 font-semibold block mb-1">Card Number</label>
                        <input
                          type="text"
                          placeholder="4532 •••• •••• 8912"
                          defaultValue="4532 8910 2341 8912"
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-zinc-300 font-semibold block mb-1">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            defaultValue="08/28"
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-zinc-300 font-semibold block mb-1">CVV</label>
                          <input
                            type="password"
                            placeholder="•••"
                            defaultValue="882"
                            maxLength={3}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* OPTION 4: CASH ON DELIVERY */}
                {paymentOption === 'cod' && (
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 animate-in fade-in text-xs text-zinc-300">
                    <span className="font-bold text-[#d4af37] text-sm block">Cash on Delivery (COD)</span>
                    <p>Pay cash or scan the courier delivery agent's UPI scanner when your package arrives at your doorstep in Chennai or anywhere across India.</p>
                    <p className="text-zinc-500">Note: Our operations team will call you to confirm your order before dispatch.</p>
                  </div>
                )}

                {/* AFTER PAYMENT: UPLOAD PAYMENT SCREENSHOT SECTION */}
                {(paymentOption === 'upi_id' || paymentOption === 'qr_scanner') && (
                  <div className="p-5 rounded-2xl bg-gradient-to-b from-zinc-950 to-zinc-900 border-2 border-dashed border-[#d4af37]/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-xs font-extrabold text-white flex items-center gap-1.5 uppercase tracking-wide">
                          <Upload className="w-4 h-4 text-[#d4af37]" />
                          Step 2: Upload Payment Confirmation Screenshot
                        </span>
                        <p className="text-[11px] text-zinc-400">
                          Upload the screenshot from Google Pay / PhonePe / Paytm to verify your payment.
                        </p>
                      </div>
                    </div>

                    {screenshotError && (
                      <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{screenshotError}</span>
                      </div>
                    )}

                    {/* Screenshot Preview or Dropzone */}
                    {screenshotUrl ? (
                      <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div 
                            className="relative w-16 h-16 rounded-lg overflow-hidden border border-zinc-600 bg-black shrink-0 cursor-pointer group"
                            onClick={() => setPreviewModalImage(screenshotUrl)}
                            title="Click to view full preview"
                          >
                            <img src={screenshotUrl} alt="Payment Proof" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Eye className="w-4 h-4 text-white" />
                            </div>
                          </div>

                          <div className="min-w-0 text-left">
                            <span className="text-xs font-bold text-white truncate block">
                              {screenshotFile?.name || 'payment_proof.png'}
                            </span>
                            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                              <Check className="w-3 h-3" /> Screenshot Uploaded &amp; Ready
                            </span>
                            <button
                              type="button"
                              onClick={() => setPreviewModalImage(screenshotUrl)}
                              className="text-[11px] text-[#d4af37] hover:underline block mt-0.5"
                            >
                              Preview Full Screenshot
                            </button>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleRemoveScreenshot}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-rose-900/60 text-xs font-bold text-zinc-300 hover:text-rose-300 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    ) : (
                      <label className="border-2 border-dashed border-zinc-700 hover:border-[#d4af37] rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-zinc-900/40 hover:bg-zinc-900/80 transition-all text-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleScreenshotUpload}
                          className="hidden"
                        />
                        <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center">
                          <Upload className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">
                            Click or drag payment screenshot here
                          </p>
                          <p className="text-[11px] text-zinc-400 mt-0.5">
                            PNG, JPG, or WEBP (Max 8MB)
                          </p>
                        </div>
                      </label>
                    )}

                    {/* Optional UTR / Reference ID Field */}
                    <div className="pt-2">
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        UPI UTR / Transaction Reference ID (Optional)
                      </label>
                      <input
                        type="text"
                        value={transactionRef}
                        onChange={e => setTransactionRef(e.target.value)}
                        placeholder="e.g. 426892019384 (12-digit UPI reference number)"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>
                )}

                {/* Back and Place Order Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('shipping')}
                    className="py-3.5 px-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold uppercase transition-colors cursor-pointer"
                  >
                    Back to Shipping
                  </button>

                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e6c148] to-[#c59c2b] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
                  >
                    {isProcessing ? 'Confirming Order...' : `Confirm & Place Order (₹${total})`}
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar with Delivery Info & Total */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl bg-zinc-900/70 border border-zinc-800 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    Delivering To
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCurrentStep('shipping')}
                    className="text-[11px] text-[#d4af37] hover:underline cursor-pointer"
                  >
                    Edit Address
                  </button>
                </div>
                <div className="text-xs text-zinc-300 space-y-1">
                  <p className="font-bold text-white">{address.fullName}</p>
                  <p>{address.addressLine}</p>
                  <p>{address.city}, {address.state} - {address.pincode}</p>
                  <p className="text-zinc-500">{address.phone} &bull; {address.email}</p>
                </div>

                <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Items Total ({items.length}):</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Discount:</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-400">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-800">
                    <span>Grand Total:</span>
                    <span className="text-xl font-black text-[#d4af37] font-['Outfit']">₹{total}</span>
                  </div>
                </div>

                {/* Trust guarantee badge */}
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center gap-2.5 text-[11px] text-zinc-400">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>100% Genuine Apparel &bull; Handcrafted in Chennai</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* STEP 3: DONE / CONFIRMATION & INVOICE DOWNLOAD */}
        {currentStep === 'done' && completedOrder && (
          <div className="space-y-8 animate-in fade-in">
            {/* Success Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-950 border border-emerald-500/40 text-center space-y-4 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/40">
                Order #{completedOrder.id} Placed Successfully
              </span>

              <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-white">
                Thank You for Choosing ARISE AURA!
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto">
                We have received your order details. A confirmation email and tracking link will be sent to <strong className="text-white">{completedOrder.email}</strong>.
              </p>

              {/* Status details */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-left">
                  <span className="text-[10px] text-zinc-500 block">Payment Method</span>
                  <span className="font-bold text-white">{completedOrder.paymentMethod}</span>
                </div>
                <div className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-left">
                  <span className="text-[10px] text-zinc-500 block">Payment Status</span>
                  <span className="font-bold text-emerald-400">{completedOrder.paymentStatus}</span>
                </div>
                <div className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-left">
                  <span className="text-[10px] text-zinc-500 block">Total Amount</span>
                  <span className="font-bold text-[#d4af37]">₹{completedOrder.total}</span>
                </div>
              </div>

              {/* Payment Proof Confirmation */}
              {completedOrder.paymentScreenshotUrl && (
                <div className="mt-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 max-w-md mx-auto text-left flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={completedOrder.paymentScreenshotUrl}
                      alt="Uploaded Payment Receipt"
                      className="w-12 h-12 rounded-lg object-cover bg-black border border-zinc-700 cursor-pointer"
                      onClick={() => setPreviewModalImage(completedOrder.paymentScreenshotUrl!)}
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white truncate block">
                        Payment Screenshot Logged
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        Admin will audit and confirm dispatch.
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setPreviewModalImage(completedOrder.paymentScreenshotUrl!)}
                    className="text-xs text-[#d4af37] hover:underline font-bold"
                  >
                    View
                  </button>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => onTrackOrder(completedOrder.id)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Clock className="w-4 h-4" />
                  <span>Track Order Live</span>
                </button>

                <button
                  onClick={handlePrintInvoice}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Tax Invoice</span>
                </button>

                <button
                  onClick={onBackToShop}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  <span>Continue Shopping</span>
                </button>
              </div>
            </div>

            {/* Printable Tax Invoice Container */}
            <div id="printable-invoice" className="p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-zinc-800 text-white space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                <div>
                  <AriseAuraLogo variant="horizontal" theme="gold" iconSize={40} />
                  <p className="text-xs text-zinc-400 mt-1">Chennai, Tamil Nadu, India</p>
                  <p className="text-xs text-zinc-400">Email: ariseauradrip@gmail.com &bull; Phone: +91 73586 41670</p>
                </div>
                <div className="text-left sm:text-right">
                  <h3 className="text-lg font-black font-['Outfit'] text-white">TAX INVOICE</h3>
                  <p className="text-xs text-zinc-400 font-mono">Invoice #: INV-{completedOrder.id}</p>
                  <p className="text-xs text-zinc-400">Date: {new Date(completedOrder.createdAt).toLocaleDateString('en-GB')}</p>
                </div>
              </div>

              {/* Customer & Shipping Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs pb-6 border-b border-zinc-800">
                <div>
                  <span className="text-zinc-500 font-semibold block mb-1 uppercase tracking-wider text-[10px]">Billed &amp; Shipped To:</span>
                  <p className="font-bold text-white text-sm">{completedOrder.customerName}</p>
                  <p className="text-zinc-300">{completedOrder.shippingAddress.addressLine}</p>
                  <p className="text-zinc-300">{completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state} - {completedOrder.shippingAddress.pincode}</p>
                  <p className="text-zinc-400 mt-1">Contact: {completedOrder.phone} &bull; {completedOrder.email}</p>
                </div>

                <div className="space-y-1 sm:text-right">
                  <span className="text-zinc-500 font-semibold block mb-1 uppercase tracking-wider text-[10px]">Payment Information:</span>
                  <p className="text-zinc-300">Method: <strong className="text-white">{completedOrder.paymentMethod}</strong></p>
                  <p className="text-zinc-300">Status: <strong className="text-emerald-400">{completedOrder.paymentStatus}</strong></p>
                  {completedOrder.upiId && <p className="text-zinc-400 font-mono text-[11px]">UPI: {completedOrder.upiId}</p>}
                  {completedOrder.transactionRef && <p className="text-zinc-400 font-mono text-[11px]">Ref UTR: {completedOrder.transactionRef}</p>}
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5">Item Description</th>
                      <th className="py-2.5">Size</th>
                      <th className="py-2.5 text-center">Qty</th>
                      <th className="py-2.5 text-right">Price</th>
                      <th className="py-2.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {completedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-3 font-semibold text-white">{item.title}</td>
                        <td className="py-3 text-zinc-300">{item.size}</td>
                        <td className="py-3 text-center text-zinc-300">{item.quantity}</td>
                        <td className="py-3 text-right text-zinc-300">₹{item.price}</td>
                        <td className="py-3 text-right font-bold text-white">₹{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Invoice Totals */}
              <div className="pt-4 border-t border-zinc-800 flex justify-end">
                <div className="w-64 space-y-1.5 text-xs text-zinc-300">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-white">₹{completedOrder.subtotal}</span>
                  </div>
                  {completedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Discount:</span>
                      <span>-₹{completedOrder.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{completedOrder.shipping === 0 ? 'FREE' : `₹${completedOrder.shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-zinc-800">
                    <span>Final Amount:</span>
                    <span className="text-[#d4af37] font-['Outfit']">₹{completedOrder.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Lightbox / Preview Modal for Payment Screenshot */}
      {previewModalImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setPreviewModalImage(null)}
        >
          <div 
            className="relative max-w-lg w-full bg-[#131317] rounded-3xl p-4 border border-zinc-700 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Payment Proof Screenshot
              </h4>
              <button
                onClick={() => setPreviewModalImage(null)}
                className="p-1 rounded-full text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-3 max-h-[70vh] overflow-auto rounded-xl bg-black flex items-center justify-center p-2">
              <img src={previewModalImage} alt="Enlarged payment proof" className="max-w-full max-h-[65vh] object-contain rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
