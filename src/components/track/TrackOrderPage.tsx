import React, { useState } from 'react';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck,
  ChevronRight,
  Printer
} from 'lucide-react';
import { Order } from '../../types';

interface TrackOrderPageProps {
  initialOrderId?: string;
  orders?: Order[];
  onBackToShop: () => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({
  initialOrderId = '',
  orders = [],
  onBackToShop
}) => {
  const [orderQuery, setOrderQuery] = useState(initialOrderId || (orders.length > 0 ? orders[0].id : 'PL123456'));
  const [searched, setSearched] = useState(true);

  // Look up matched order in real orders list
  const cleanQuery = orderQuery.trim().replace(/^#/, '').toLowerCase();
  const matchedOrder = orders.find(o => 
    o.id.toLowerCase() === cleanQuery ||
    o.phone.replace(/[^0-9]/g, '').includes(cleanQuery)
  );

  // Build live tracking data from real matched order or fallback
  const trackingData = matchedOrder ? {
    id: matchedOrder.id,
    placedDate: new Date(matchedOrder.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    customerName: matchedOrder.customerName,
    courier: 'BlueDart Express Air Cargo',
    awbNumber: `BLU${matchedOrder.id.replace(/\D/g, '') || '849204'}IN`,
    status: matchedOrder.status,
    address: `${matchedOrder.shippingAddress?.addressLine}, ${matchedOrder.shippingAddress?.city}, ${matchedOrder.shippingAddress?.state} - ${matchedOrder.shippingAddress?.pincode}`,
    steps: [
      {
        title: 'Order Placed',
        time: new Date(matchedOrder.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
        desc: 'Order received and registered into Arise Aura production hub',
        done: true,
        current: matchedOrder.status.toLowerCase() === 'pending'
      },
      {
        title: 'Order Confirmed',
        time: 'Verified',
        desc: 'Artwork, dimensions, and fabric inventory checked',
        done: ['confirmed', 'processing', 'production', 'shipped', 'delivered'].includes(matchedOrder.status.toLowerCase()),
        current: matchedOrder.status.toLowerCase() === 'confirmed'
      },
      {
        title: 'Printing & Production',
        time: 'Manufacturing Queue',
        desc: 'Direct-to-Film (DTF) & sublimation heat press printing',
        done: ['processing', 'production', 'shipped', 'delivered'].includes(matchedOrder.status.toLowerCase()),
        current: ['processing', 'production'].includes(matchedOrder.status.toLowerCase())
      },
      {
        title: 'Dispatched with Courier',
        time: matchedOrder.status.toLowerCase() === 'shipped' || matchedOrder.status.toLowerCase() === 'delivered' ? 'Dispatched' : 'Pending dispatch',
        desc: 'Handed over to BlueDart Express with tamper-proof packaging',
        done: ['shipped', 'delivered'].includes(matchedOrder.status.toLowerCase()),
        current: matchedOrder.status.toLowerCase() === 'shipped'
      },
      {
        title: 'Delivered',
        time: matchedOrder.status.toLowerCase() === 'delivered' ? 'Completed' : 'Estimated 3-4 days',
        desc: 'Contactless doorstep delivery with signature verification',
        done: matchedOrder.status.toLowerCase() === 'delivered',
        current: matchedOrder.status.toLowerCase() === 'delivered'
      }
    ],
    items: matchedOrder.items?.map(it => ({
      title: it.title,
      size: it.size,
      color: it.color?.name || 'Standard',
      quantity: it.quantity,
      price: it.price,
      image: it.image
    })) || []
  } : {
    id: orderQuery || 'PL123456',
    placedDate: '20 Sep 2025 - 10:30 AM',
    customerName: 'Saran Shalini',
    courier: 'BlueDart Express Air Cargo',
    awbNumber: 'BLU849204128IN',
    status: 'Shipped',
    address: 'No. 42, 4th Avenue, Shanthi Colony, Anna Nagar, Chennai, Tamil Nadu - 600040',
    steps: [
      { title: 'Order Placed', time: '20 Sep 2025 - 10:30 AM', desc: 'Order verified and sent to queue', done: true },
      { title: 'Processing & Custom Printing', time: '20 Sep 2025 - 02:15 PM', desc: 'DTF printing completed', done: true },
      { title: 'Shipped', time: '21 Sep 2025 - 11:20 AM', desc: 'Handed over to BlueDart Express', done: true, current: true },
      { title: 'Out for Delivery', time: 'Estimated 24 Sep', desc: 'Courier agent assigned', done: false },
      { title: 'Delivered', time: 'Pending', desc: 'Delivered to recipient', done: false }
    ],
    items: [
      {
        title: 'Dream Big Printed T-Shirt',
        size: 'L',
        color: 'Onyx Black',
        quantity: 1,
        price: 599,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80'
      }
    ]
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="bg-[#0c0c0e] min-h-screen text-white py-10 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5" />
            <span>Live Consignment Tracking</span>
          </div>
          <h1 className="text-3xl font-black font-['Outfit'] text-white">
            Track Your Order
          </h1>
          <p className="text-xs text-zinc-400">
            Enter your Order ID (e.g. PL123456) or phone number to see live printing and courier status.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={orderQuery}
              onChange={e => setOrderQuery(e.target.value.toUpperCase())}
              placeholder="e.g. PL123456 or Phone"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-10 pr-3 py-3 text-xs text-white uppercase focus:outline-none focus:border-[#d4af37]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#d4af37] hover:bg-[#e6c148] text-black font-extrabold text-xs uppercase tracking-wider transition-colors shrink-0"
          >
            Track
          </button>
        </form>

        {searched && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* Status Overview Card */}
            <div className="rounded-3xl bg-zinc-900/70 border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold font-['Outfit'] text-white">
                      Order #{trackingData.id}
                    </h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      trackingData.status.toLowerCase() === 'delivered'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : trackingData.status.toLowerCase() === 'shipped'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : trackingData.status.toLowerCase() === 'production'
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {trackingData.status}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Placed on: {trackingData.placedDate} &bull; Customer: <strong className="text-white">{trackingData.customerName}</strong>
                  </p>
                </div>

                <div className="sm:text-right">
                  <span className="text-xs text-zinc-400 block">AWB Tracking No.</span>
                  <span className="text-sm font-mono font-bold text-[#d4af37]">{trackingData.awbNumber}</span>
                </div>
              </div>

              {/* Visual Vertical Timeline Stepper */}
              <div className="space-y-6 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Fulfillment &amp; Delivery Progress
                </h3>

                <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
                  {trackingData.steps.map((st, i) => (
                    <div key={i} className="relative flex items-start gap-4">
                      {/* Node Dot / Check */}
                      <div className={`absolute -left-6 sm:-left-8 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        st.done 
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                          : st.current
                          ? 'bg-[#d4af37] text-black ring-4 ring-[#d4af37]/20 animate-pulse'
                          : 'bg-zinc-800 text-zinc-500'
                      }`}>
                        {st.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className={`text-sm font-bold ${st.done ? 'text-white' : 'text-zinc-400'}`}>
                            {st.title}
                          </h4>
                          <span className="text-[11px] font-mono text-zinc-500">{st.time}</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items in Consignment */}
              <div className="pt-6 border-t border-zinc-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Items In This Consignment
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {trackingData.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-zinc-950 rounded-2xl border border-zinc-800">
                      <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover bg-zinc-900" />
                      <div className="min-w-0 flex-1 text-xs">
                        <h5 className="font-bold text-white truncate">{item.title}</h5>
                        <p className="text-[11px] text-zinc-400">Size: {item.size} &bull; Color: {item.color} &bull; Qty: {item.quantity}</p>
                        <span className="font-bold text-[#d4af37]">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Destination Address */}
              <div className="pt-4 border-t border-zinc-800 flex items-start gap-2.5 text-xs text-zinc-400">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white">Delivery Address:</span>
                  <p>{trackingData.address}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs">
              <button
                onClick={onBackToShop}
                className="text-zinc-400 hover:text-white"
              >
                &larr; Back to Shop
              </button>

              <button
                onClick={() => window.print()}
                className="text-[#d4af37] hover:underline flex items-center gap-1 font-bold"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Consignment Receipt
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
