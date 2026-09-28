import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../firebase';
import { 
  Product, 
  Order, 
  BulkTeamQuote, 
  BulkTeamPosterOrder, 
  CustomDesignOrder,
  OrderStatus 
} from '../types';
import { INITIAL_PRODUCTS } from './mockData';

// INITIAL SEED ORDERS
export const INITIAL_ORDERS: Order[] = [
  {
    id: 'PL123456',
    userId: 'demo-customer-001',
    customerName: 'Saran Shalini',
    email: 'saranshalini2006@gmail.com',
    phone: '+91 98765 43210',
    shippingAddress: {
      fullName: 'Saran Shalini',
      email: 'saranshalini2006@gmail.com',
      phone: '+91 98765 43210',
      addressLine: 'No. 42, 4th Avenue, Shanthi Colony, Anna Nagar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600040'
    },
    items: [
      {
        id: 'item-1',
        productId: 'prod-001',
        title: 'Dream Big Printed T-Shirt',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
        price: 599,
        originalPrice: 999,
        size: 'L',
        color: { name: 'Onyx Black', hex: '#111111' },
        quantity: 1
      },
      {
        id: 'item-2',
        productId: 'prod-003',
        title: 'Pro Elite Football Jersey (Royal Blue)',
        image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=400&q=80',
        price: 1299,
        originalPrice: 1699,
        size: 'M',
        color: { name: 'Royal Blue', hex: '#1E3A8A' },
        quantity: 1
      }
    ],
    subtotal: 1898,
    discount: 50,
    shipping: 0,
    total: 1848,
    paymentMethod: 'UPI / QR',
    paymentStatus: 'Paid',
    status: 'Processing',
    trackingSteps: [
      {
        step: 'placed',
        label: 'Order Placed',
        description: 'Verified & entered production queue',
        timestamp: '20 Sep 2025, 10:30 AM',
        completed: true
      },
      {
        step: 'confirmed',
        label: 'Order Confirmed',
        description: 'Artwork & sizes verified by printing team',
        timestamp: '20 Sep 2025, 11:15 AM',
        completed: true
      },
      {
        step: 'processing',
        label: 'DTF Printing & Heat Pressing',
        description: 'Sublimation and custom finishing',
        timestamp: '20 Sep 2025, 02:40 PM',
        completed: true
      },
      {
        step: 'shipped',
        label: 'Dispatched with Courier',
        description: 'BlueDart Air Express tracking generated',
        timestamp: 'Pending dispatch',
        completed: false
      },
      {
        step: 'delivered',
        label: 'Delivered',
        description: 'Doorstep contactless delivery',
        timestamp: 'Estimated 24 Sep',
        completed: false
      }
    ],
    createdAt: '2025-09-20T10:30:00.000Z'
  },
  {
    id: 'PL123455',
    userId: 'demo-customer-002',
    customerName: 'Priya Sundar',
    email: 'priya.s@example.com',
    phone: '+91 94441 23456',
    shippingAddress: {
      fullName: 'Priya Sundar',
      email: 'priya.s@example.com',
      phone: '+91 94441 23456',
      addressLine: 'Flat 3B, Sunshine Apartments, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    items: [
      {
        id: 'item-3',
        productId: 'prod-003',
        title: 'Pro Elite Football Jersey',
        image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=400&q=80',
        price: 1299,
        originalPrice: 1699,
        size: 'XL',
        color: { name: 'Royal Navy', hex: '#1E3A8A' },
        quantity: 1
      }
    ],
    subtotal: 1299,
    discount: 0,
    shipping: 0,
    total: 1299,
    paymentMethod: 'Credit / Debit Card',
    paymentStatus: 'Paid',
    status: 'Shipped',
    trackingSteps: [
      { step: 'placed', label: 'Order Placed', description: 'Order logged', timestamp: '19 Sep 2025', completed: true },
      { step: 'confirmed', label: 'Confirmed', description: 'Order confirmed', timestamp: '19 Sep 2025', completed: true },
      { step: 'processing', label: 'Processing', description: 'Printed and packed', timestamp: '19 Sep 2025', completed: true },
      { step: 'shipped', label: 'Shipped', description: 'Handed over to BlueDart (AWB #849204)', timestamp: '20 Sep 2025', completed: true },
      { step: 'delivered', label: 'Delivered', description: 'Awaiting delivery', timestamp: 'Estimated 23 Sep', completed: false }
    ],
    createdAt: '2025-09-19T14:20:00.000Z'
  },
  {
    id: 'PL123454',
    userId: 'demo-customer-003',
    customerName: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    phone: '+91 98840 98765',
    shippingAddress: {
      fullName: 'Rahul Verma',
      email: 'rahul.verma@example.com',
      phone: '+91 98840 98765',
      addressLine: '78, Defense Colony, Flyover Road',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110024'
    },
    items: [
      {
        id: 'item-4',
        productId: 'prod-005',
        title: 'Squad Crest Sublimation Custom Kit',
        image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80',
        price: 1799,
        originalPrice: 2299,
        size: 'L',
        color: { name: 'Onyx Gold', hex: '#111111' },
        quantity: 1,
        isCustom: true,
        customDetails: {
          garmentType: 'football-jersey',
          notes: 'Custom team crest on left chest and gold back numbers'
        }
      },
      {
        id: 'item-5',
        productId: 'prod-002',
        title: 'Minimal Oversized T-Shirt (Sand)',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=400&q=80',
        price: 749,
        originalPrice: 1099,
        size: 'L',
        color: { name: 'Sand Cream', hex: '#EBE5D8' },
        quantity: 1
      }
    ],
    subtotal: 2548,
    discount: 49,
    shipping: 0,
    total: 2499,
    paymentMethod: 'UPI / QR',
    paymentStatus: 'Paid',
    status: 'Delivered',
    trackingSteps: [
      { step: 'placed', label: 'Order Placed', description: 'Order logged', timestamp: '18 Sep 2025', completed: true },
      { step: 'confirmed', label: 'Confirmed', description: 'Order confirmed', timestamp: '18 Sep 2025', completed: true },
      { step: 'processing', label: 'Processing', description: 'Custom sublimation completed', timestamp: '18 Sep 2025', completed: true },
      { step: 'shipped', label: 'Shipped', description: 'Dispatched via Express Air', timestamp: '19 Sep 2025', completed: true },
      { step: 'delivered', label: 'Delivered', description: 'Delivered to recipient', timestamp: '21 Sep 2025', completed: true }
    ],
    createdAt: '2025-09-18T09:15:00.000Z'
  }
];

// INITIAL BULK TEAM JERSEYS
export const INITIAL_BULK_JERSEYS: BulkTeamQuote[] = [
  {
    id: 'BULK-801234',
    userId: 'demo-customer-001',
    teamName: 'Royal Strikers FC',
    contactName: 'Saran Shalini',
    email: 'saranshalini2006@gmail.com',
    phone: '+91 98765 43210',
    sportType: 'Football',
    numberOfPlayers: 5,
    jerseyStyle: 'Full Sublimation Round Neck (Dry-Fit Pro)',
    deliveryDate: '2026-10-15',
    notes: 'Please print gold gradient sponsor logo across chest and individual player names on top back.',
    logoUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80',
    logoFileName: 'Royal_Strikers_Crest_2026.png',
    roster: [
      { id: 'p1', name: 'R. Sharma', number: '45', size: 'L' },
      { id: 'p2', name: 'V. Kohli', number: '18', size: 'M' },
      { id: 'p3', name: 'S. Iyer', number: '96', size: 'XL' },
      { id: 'p4', name: 'J. Bumrah', number: '93', size: 'L' },
      { id: 'p5', name: 'KL Rahul', number: '1', size: 'M' }
    ],
    status: 'In Production',
    createdAt: '2025-09-20T11:00:00.000Z'
  },
  {
    id: 'BULK-801235',
    userId: 'demo-customer-004',
    teamName: 'Chennai Super Smashers',
    contactName: 'Karthik Raja',
    email: 'karthik.raja@cricketclub.in',
    phone: '+91 98400 11223',
    sportType: 'Cricket',
    numberOfPlayers: 15,
    jerseyStyle: 'Sublimation Polo Collar Jersey with Moisture Management',
    deliveryDate: '2026-10-28',
    notes: 'Touring team tournament kits. Yellow body with metallic navy stripes on sleeves.',
    logoUrl: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=400&q=80',
    logoFileName: 'Super_Smashers_Emblem.svg',
    roster: [
      { id: 'p1', name: 'Karthik R.', number: '07', size: 'L' },
      { id: 'p2', name: 'Ashwin M.', number: '99', size: 'XL' },
      { id: 'p3', name: 'Dinesh K.', number: '19', size: 'M' },
      { id: 'p4', name: 'Muralitharan', number: '08', size: 'XXL' },
      { id: 'p5', name: 'Vijay S.', number: '14', size: 'L' }
    ],
    status: 'Reviewing',
    createdAt: '2025-09-21T15:45:00.000Z'
  }
];

// INITIAL BULK TEAM POSTERS
export const INITIAL_BULK_POSTERS: BulkTeamPosterOrder[] = [
  {
    id: 'PST-5001',
    userId: 'demo-customer-001',
    teamName: 'Titan Knights Esports',
    contactName: 'Saran Shalini',
    email: 'saranshalini2006@gmail.com',
    phone: '+91 98765 43210',
    posterSize: '18 x 24 in',
    paperFinish: 'Metallic Luster',
    quantity: 35,
    deliveryDate: '2026-10-18',
    notes: 'High-res commemorative roster championship posters for arena giveaway. 300 DPI.',
    artworkUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    artworkFileName: 'Titan_Knights_Championship_Artwork_300DPI.png',
    estimatedPrice: 6650,
    status: 'In Production',
    createdAt: '2025-09-20T16:30:00.000Z'
  },
  {
    id: 'PST-5002',
    userId: 'demo-customer-005',
    teamName: 'Metro Strikers High School Varsity',
    contactName: 'Coach Devendra',
    email: 'coach.dev@metroschool.edu',
    phone: '+91 97909 88776',
    posterSize: 'A2 (16.5 x 23.4 in)',
    paperFinish: 'Glossy Photographic',
    quantity: 50,
    deliveryDate: '2026-10-22',
    notes: 'Annual sports day squad celebration wall posters with team photo and roster signatures.',
    artworkUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80',
    artworkFileName: 'Metro_Varsity_Team_Photo_2026.jpg',
    estimatedPrice: 7500,
    status: 'Reviewing',
    createdAt: '2025-09-21T09:10:00.000Z'
  }
];

// INITIAL CUSTOM DESIGN ORDERS
export const INITIAL_CUSTOM_DESIGNS: CustomDesignOrder[] = [
  {
    id: 'CD-901',
    userId: 'demo-customer-001',
    customerName: 'Saran Shalini',
    email: 'saranshalini2006@gmail.com',
    phone: '+91 98765 43210',
    productType: 'oversized-tshirt',
    baseColor: '#111111',
    size: 'XL',
    quantity: 15,
    notes: 'Heavyweight boxy fit with oversized cyber skull graphic on center chest.',
    frontElements: [],
    backElements: [],
    uploadedArtworkUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
    frontMockupUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
    estimatedPrice: 11235,
    status: 'pending',
    createdAt: '2025-09-20T12:00:00.000Z'
  },
  {
    id: 'CD-902',
    userId: 'demo-customer-002',
    customerName: 'Priya Sundar',
    email: 'priya.s@example.com',
    phone: '+91 94441 23456',
    productType: 'football-jersey',
    baseColor: '#1E3A8A',
    size: 'L',
    quantity: 22,
    notes: 'Team Thunder FC chest crest and yellow arm trim.',
    frontElements: [],
    backElements: [],
    uploadedArtworkUrl: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=600&q=80',
    frontMockupUrl: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=600&q=80',
    estimatedPrice: 28500,
    status: 'approved',
    createdAt: '2025-09-19T10:15:00.000Z'
  }
];

// Helper to safely read from localStorage
function getLocalItem<T>(key: string, defaultValue: T): T {
  try {
    const val = localStorage.getItem(key);
    if (!val) return defaultValue;
    return JSON.parse(val);
  } catch {
    return defaultValue;
  }
}

// Helper to safely write to localStorage
function setLocalItem<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.warn(`Could not save ${key} to localStorage`, err);
  }
}

export const dbService = {
  // PRODUCTS
  async getProducts(): Promise<Product[]> {
    const cached = getLocalItem<Product[]>('arise_products', INITIAL_PRODUCTS);
    try {
      const snap = await getDocs(collection(db, 'products'));
      if (!snap.empty) {
        const fetched: Product[] = [];
        snap.forEach(docSnap => {
          fetched.push({ id: docSnap.id, ...(docSnap.data() as any) });
        });
        setLocalItem('arise_products', fetched);
        return fetched;
      } else {
        // Seed initial products to Firestore
        INITIAL_PRODUCTS.forEach(p => {
          setDoc(doc(db, 'products', p.id), p).catch(() => {});
        });
      }
    } catch (err) {
      console.warn('Firestore products fetch error; using local cache:', err);
    }
    return cached;
  },

  async saveProduct(prod: Product): Promise<void> {
    // 1. Update localStorage
    const current = getLocalItem<Product[]>('arise_products', INITIAL_PRODUCTS);
    const existingIndex = current.findIndex(p => p.id === prod.id);
    let updated: Product[];
    if (existingIndex >= 0) {
      updated = current.map(p => (p.id === prod.id ? prod : p));
    } else {
      updated = [prod, ...current];
    }
    setLocalItem('arise_products', updated);

    // 2. Persist to Firestore
    try {
      await setDoc(doc(db, 'products', prod.id), prod, { merge: true });
    } catch (err) {
      console.warn('Could not save product to Firestore:', err);
    }
  },

  async deleteProduct(prodId: string): Promise<void> {
    const current = getLocalItem<Product[]>('arise_products', INITIAL_PRODUCTS);
    const updated = current.filter(p => p.id !== prodId);
    setLocalItem('arise_products', updated);

    try {
      await deleteDoc(doc(db, 'products', prodId));
    } catch (err) {
      console.warn('Could not delete product in Firestore:', err);
    }
  },

  // ORDERS
  async getOrders(): Promise<Order[]> {
    const cached = getLocalItem<Order[]>('arise_orders', INITIAL_ORDERS);
    try {
      const snap = await getDocs(collection(db, 'orders'));
      if (!snap.empty) {
        const fetched: Order[] = [];
        snap.forEach(docSnap => {
          const data = docSnap.data() as any;
          fetched.push({
            id: data.id || docSnap.id,
            ...data,
            items: typeof data.items === 'string' ? JSON.parse(data.items) : data.items,
            shippingAddress: typeof data.shippingAddress === 'string' ? JSON.parse(data.shippingAddress) : data.shippingAddress,
            trackingSteps: typeof data.trackingSteps === 'string' ? JSON.parse(data.trackingSteps) : data.trackingSteps
          });
        });
        // Sort descending by date
        fetched.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setLocalItem('arise_orders', fetched);
        return fetched;
      } else {
        // Seed initial orders to Firestore
        INITIAL_ORDERS.forEach(o => {
          setDoc(doc(db, 'orders', o.id), o).catch(() => {});
        });
      }
    } catch (err) {
      console.warn('Firestore orders fetch error; using local cache:', err);
    }
    return cached;
  },

  async createOrder(order: Order): Promise<void> {
    // 1. Update localStorage
    const current = getLocalItem<Order[]>('arise_orders', INITIAL_ORDERS);
    const updated = [order, ...current.filter(o => o.id !== order.id)];
    setLocalItem('arise_orders', updated);

    // 2. Persist to Firestore
    try {
      await setDoc(doc(db, 'orders', order.id), {
        ...order,
        items: JSON.stringify(order.items),
        shippingAddress: JSON.stringify(order.shippingAddress),
        trackingSteps: JSON.stringify(order.trackingSteps)
      });
    } catch (err) {
      console.warn('Could not save order to Firestore:', err);
    }
  },

  async updateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<Order[]> {
    const current = getLocalItem<Order[]>('arise_orders', INITIAL_ORDERS);
    const updated = current.map(o => {
      if (o.id === orderId) {
        // Update tracking steps to match new status
        const steps = [...(o.trackingSteps || [])];
        const statusLower = newStatus.toLowerCase();

        // Mark steps as completed up to this status
        const sequence = ['placed', 'confirmed', 'processing', 'production', 'shipped', 'delivered'];
        const targetIdx = sequence.indexOf(statusLower);

        const updatedSteps = steps.map(s => {
          const stepIdx = sequence.indexOf(s.step.toLowerCase());
          return {
            ...s,
            completed: stepIdx <= targetIdx || s.completed
          };
        });

        return {
          ...o,
          status: newStatus,
          trackingSteps: updatedSteps
        };
      }
      return o;
    });

    setLocalItem('arise_orders', updated);

    // Persist to Firestore
    try {
      const targetOrder = updated.find(o => o.id === orderId);
      if (targetOrder) {
        await updateDoc(doc(db, 'orders', orderId), {
          status: newStatus,
          trackingSteps: JSON.stringify(targetOrder.trackingSteps)
        });
      }
    } catch (err) {
      console.warn('Could not update order status in Firestore:', err);
    }

    return updated;
  },

  // BULK TEAM JERSEYS
  async getBulkJerseys(): Promise<BulkTeamQuote[]> {
    const cached = getLocalItem<BulkTeamQuote[]>('arise_bulk_jerseys', INITIAL_BULK_JERSEYS);
    try {
      const snap = await getDocs(collection(db, 'bulkQuotes'));
      if (!snap.empty) {
        const fetched: BulkTeamQuote[] = [];
        snap.forEach(docSnap => {
          const data = docSnap.data() as any;
          fetched.push({
            id: data.id || docSnap.id,
            ...data,
            roster: typeof data.roster === 'string' ? JSON.parse(data.roster) : data.roster
          });
        });
        setLocalItem('arise_bulk_jerseys', fetched);
        return fetched;
      } else {
        INITIAL_BULK_JERSEYS.forEach(bj => {
          setDoc(doc(db, 'bulkQuotes', bj.id), bj).catch(() => {});
        });
      }
    } catch (err) {
      console.warn('Firestore bulk jerseys fetch error; using local cache:', err);
    }
    return cached;
  },

  async createBulkJersey(quote: BulkTeamQuote): Promise<void> {
    const current = getLocalItem<BulkTeamQuote[]>('arise_bulk_jerseys', INITIAL_BULK_JERSEYS);
    const updated = [quote, ...current.filter(q => q.id !== quote.id)];
    setLocalItem('arise_bulk_jerseys', updated);

    try {
      await setDoc(doc(db, 'bulkQuotes', quote.id), {
        ...quote,
        roster: JSON.stringify(quote.roster)
      });
    } catch (err) {
      console.warn('Could not save bulk jersey quote to Firestore:', err);
    }
  },

  async updateBulkJerseyStatus(quoteId: string, status: any): Promise<BulkTeamQuote[]> {
    const current = getLocalItem<BulkTeamQuote[]>('arise_bulk_jerseys', INITIAL_BULK_JERSEYS);
    const updated = current.map(q => (q.id === quoteId ? { ...q, status } : q));
    setLocalItem('arise_bulk_jerseys', updated);

    try {
      await updateDoc(doc(db, 'bulkQuotes', quoteId), { status });
    } catch (err) {
      console.warn('Could not update bulk jersey quote status in Firestore:', err);
    }
    return updated;
  },

  // BULK TEAM POSTERS
  async getBulkPosters(): Promise<BulkTeamPosterOrder[]> {
    const cached = getLocalItem<BulkTeamPosterOrder[]>('arise_bulk_posters', INITIAL_BULK_POSTERS);
    try {
      const snap = await getDocs(collection(db, 'bulkPosters'));
      if (!snap.empty) {
        const fetched: BulkTeamPosterOrder[] = [];
        snap.forEach(docSnap => {
          const data = docSnap.data() as any;
          fetched.push({
            id: data.id || docSnap.id,
            ...data
          });
        });
        setLocalItem('arise_bulk_posters', fetched);
        return fetched;
      } else {
        INITIAL_BULK_POSTERS.forEach(bp => {
          setDoc(doc(db, 'bulkPosters', bp.id), bp).catch(() => {});
        });
      }
    } catch (err) {
      console.warn('Firestore bulk posters fetch error; using local cache:', err);
    }
    return cached;
  },

  async createBulkPoster(posterOrder: BulkTeamPosterOrder): Promise<void> {
    const current = getLocalItem<BulkTeamPosterOrder[]>('arise_bulk_posters', INITIAL_BULK_POSTERS);
    const updated = [posterOrder, ...current.filter(p => p.id !== posterOrder.id)];
    setLocalItem('arise_bulk_posters', updated);

    try {
      await setDoc(doc(db, 'bulkPosters', posterOrder.id), posterOrder);
    } catch (err) {
      console.warn('Could not save bulk poster order to Firestore:', err);
    }
  },

  async updateBulkPosterStatus(posterId: string, status: any): Promise<BulkTeamPosterOrder[]> {
    const current = getLocalItem<BulkTeamPosterOrder[]>('arise_bulk_posters', INITIAL_BULK_POSTERS);
    const updated = current.map(p => (p.id === posterId ? { ...p, status } : p));
    setLocalItem('arise_bulk_posters', updated);

    try {
      await updateDoc(doc(db, 'bulkPosters', posterId), { status });
    } catch (err) {
      console.warn('Could not update bulk poster status in Firestore:', err);
    }
    return updated;
  },

  // CUSTOM DESIGNS
  async getCustomDesigns(): Promise<CustomDesignOrder[]> {
    const cached = getLocalItem<CustomDesignOrder[]>('arise_custom_designs', INITIAL_CUSTOM_DESIGNS);
    try {
      const snap = await getDocs(collection(db, 'customDesigns'));
      if (!snap.empty) {
        const fetched: CustomDesignOrder[] = [];
        snap.forEach(docSnap => {
          const data = docSnap.data() as any;
          fetched.push({
            id: data.id || docSnap.id,
            ...data
          });
        });
        setLocalItem('arise_custom_designs', fetched);
        return fetched;
      }
    } catch (err) {
      console.warn('Firestore custom designs fetch error; using local cache:', err);
    }
    return cached;
  },

  async createCustomDesign(design: CustomDesignOrder): Promise<void> {
    const current = getLocalItem<CustomDesignOrder[]>('arise_custom_designs', INITIAL_CUSTOM_DESIGNS);
    const updated = [design, ...current.filter(d => d.id !== design.id)];
    setLocalItem('arise_custom_designs', updated);

    try {
      await setDoc(doc(db, 'customDesigns', design.id), design);
    } catch (err) {
      console.warn('Could not save custom design to Firestore:', err);
    }
  },

  async updateCustomDesignStatus(designId: string, status: any): Promise<CustomDesignOrder[]> {
    const current = getLocalItem<CustomDesignOrder[]>('arise_custom_designs', INITIAL_CUSTOM_DESIGNS);
    const updated = current.map(d => (d.id === designId ? { ...d, status } : d));
    setLocalItem('arise_custom_designs', updated);

    try {
      await updateDoc(doc(db, 'customDesigns', designId), { status });
    } catch (err) {
      console.warn('Could not update custom design status in Firestore:', err);
    }
    return updated;
  }
};
