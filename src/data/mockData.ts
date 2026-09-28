import { Product, CustomerReview, Coupon, GarmentSize } from '../types';

export const ALL_SIZES: GarmentSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    title: 'Dream Big Printed T-Shirt',
    category: 'Printed T-Shirts',
    price: 599,
    originalPrice: 999,
    discountPercent: 40,
    rating: 4.8,
    reviewsCount: 128,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Constructed from 240 GSM 100% super-combed organic cotton. Features high-definition Direct-to-Film (DTF) typography print that stays crisp wash after wash. Pre-shrunk with ribbed neck collar.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Pure White', hex: '#F9FAFB' },
      { name: 'Vintage Cream', hex: '#EBE5D8' }
    ],
    isBestSeller: true,
    isTrending: true,
    recentOrderCount: 124,
    fabric: '100% Combed Cotton',
    fit: 'Regular Boxy Fit',
    gsm: '240 GSM'
  },
  {
    id: 'prod-002',
    title: 'Minimal Oversized T-Shirt (Sand)',
    category: 'Oversized T-Shirts',
    price: 749,
    originalPrice: 1099,
    discountPercent: 32,
    rating: 4.9,
    reviewsCount: 96,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Heavyweight streetwear silhouette featuring dropped shoulders, wide sleeves, and raw earth tones. Perfect drape with no pilling after repeated washes.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Sand Cream', hex: '#EBE5D8' },
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Sage Green', hex: '#586A5E' }
    ],
    isBestSeller: true,
    isTrending: true,
    recentOrderCount: 89,
    fabric: 'French Terry Cotton',
    fit: 'Drop Shoulder Oversized',
    gsm: '280 GSM'
  },
  {
    id: 'prod-003',
    title: 'Pro Elite Football Jersey (Royal Blue)',
    category: 'Football Jerseys',
    price: 1299,
    originalPrice: 1699,
    discountPercent: 24,
    rating: 4.9,
    reviewsCount: 142,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered for pitch champions. Ultra-breathable micro-mesh honeycomb polyester with sweat-wicking AeroCool technology. Reinforced flatlock seams resist hard tackles.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: [
      { name: 'Royal Blue', hex: '#1E3A8A' },
      { name: 'Crimson Red', hex: '#B91C1C' },
      { name: 'Midnight Black', hex: '#0F172A' }
    ],
    isBestSeller: true,
    isTrending: true,
    recentOrderCount: 210,
    fabric: 'Honeycomb Polyester Dri-FIT',
    fit: 'Athletic Slim Fit',
    gsm: '160 GSM'
  },
  {
    id: 'prod-004',
    title: 'Cricket Supporter Jersey (Black & Gold)',
    category: 'Cricket Jerseys',
    price: 1499,
    originalPrice: 2199,
    discountPercent: 32,
    rating: 4.8,
    reviewsCount: 110,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Embossed chevron gold patterns with deep obsidian black body. Full digital sublimation printing with UV sun-shield coating for match play under open skies.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Obsidian Gold', hex: '#1C1917' },
      { name: 'India Navy', hex: '#1E3A5F' }
    ],
    isBestSeller: true,
    isTrending: false,
    recentOrderCount: 178,
    fabric: 'Jacquard Dri-FIT Poly',
    fit: 'Cricket Match Fit',
    gsm: '180 GSM'
  },
  {
    id: 'prod-005',
    title: 'Vintage Washed Graphic T-Shirt',
    category: 'Printed T-Shirts',
    price: 849,
    originalPrice: 1199,
    discountPercent: 29,
    rating: 4.7,
    reviewsCount: 64,
    stock: 19,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Custom mineral acid wash finish giving each piece a distinct, authentic vintage character. Soft hand-feel with retro typography and distressed artwork.',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Mineral Olive', hex: '#4A5568' },
      { name: 'Charcoal Black', hex: '#2D3748' }
    ],
    isBestSeller: false,
    isTrending: true,
    recentOrderCount: 52,
    fabric: 'Acid-Washed 100% Cotton',
    fit: 'Relaxed Retro Fit',
    gsm: '220 GSM'
  },
  {
    id: 'prod-006',
    title: 'Squad Crest Custom Team Jersey',
    category: 'Custom Team Jerseys',
    price: 1799,
    originalPrice: 2499,
    discountPercent: 28,
    rating: 4.9,
    reviewsCount: 88,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Fully customizable tournament jersey. Add team crest on chest, sponsor logo across center, and individual player names and numbers on back with zero fade guarantee.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: [
      { name: 'Crimson & Gold', hex: '#7F1D1D' },
      { name: 'Cobalt & White', hex: '#1D4ED8' },
      { name: 'Emerald & Gold', hex: '#065F46' }
    ],
    isBestSeller: true,
    isTrending: true,
    recentOrderCount: 41,
    fabric: 'Pro Sublimation Spandex-Poly Blend',
    fit: 'Pro Tournament Fit',
    gsm: '175 GSM'
  },
  {
    id: 'prod-007',
    title: 'Classic Pique Polo T-Shirt',
    category: 'Polo T-Shirts',
    price: 999,
    originalPrice: 1499,
    discountPercent: 33,
    rating: 4.8,
    reviewsCount: 73,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Tailored luxury honeycomb pique knit polo. Mother-of-pearl buttons, ribbed collar that retains shape, and subtle tonal embroidery options.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Midnight Navy', hex: '#0F172A' },
      { name: 'Snow White', hex: '#FFFFFF' },
      { name: 'Rich Burgundy', hex: '#831843' }
    ],
    isBestSeller: false,
    isTrending: false,
    recentOrderCount: 38,
    fabric: 'Mercerized Cotton Pique',
    fit: 'Smart Casual Fit',
    gsm: '230 GSM'
  },
  {
    id: 'prod-008',
    title: 'Speedway Streetwear Oversized Tee',
    category: 'Oversized T-Shirts',
    price: 799,
    originalPrice: 1199,
    discountPercent: 33,
    rating: 4.9,
    reviewsCount: 52,
    stock: 7,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    description: 'Motorsport-inspired back graphics with high-density puff print accents on the front chest. Made for urban aesthetics and comfortable all-day wear.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Jet Black', hex: '#0B0B0C' },
      { name: 'Ash Grey', hex: '#9CA3AF' }
    ],
    isBestSeller: false,
    isTrending: true,
    recentOrderCount: 63,
    fabric: '100% Combed Cotton',
    fit: 'Drop Shoulder Oversized',
    gsm: '260 GSM'
  }
];

export const CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Printed T-Shirts',
    slug: 'printed-tshirts',
    count: '34 Styles',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-2',
    name: 'Oversized T-Shirts',
    slug: 'oversized-tshirts',
    count: '28 Styles',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-3',
    name: 'Football Jerseys',
    slug: 'football-jerseys',
    count: '42 Styles',
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-4',
    name: 'Cricket Jerseys',
    slug: 'cricket-jerseys',
    count: '26 Styles',
    image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-5',
    name: 'Custom Team Jerseys',
    slug: 'team-jerseys',
    count: 'Bulk & Club',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cat-6',
    name: 'Polo T-Shirts',
    slug: 'polo-tshirts',
    count: '18 Styles',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80'
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Arun Kumar',
    city: 'Chennai',
    rating: 5,
    comment: 'Amazing quality and fast delivery! The print colors are super sharp and did not crack or fade after 10 machine washes. Will order for our entire college club!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    verified: true,
    productName: 'Dream Big Printed T-Shirt',
    date: '20 Sep 2025'
  },
  {
    id: 'rev-2',
    name: 'Priya S',
    city: 'Coimbatore',
    rating: 5,
    comment: 'I ordered a custom team jersey for my corporate futsal tournament. The fabric is top-notch, light, moisture-wicking and the names/numbers look ultra premium!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    verified: true,
    productName: 'Pro Elite Football Jersey',
    date: '18 Sep 2025'
  },
  {
    id: 'rev-3',
    name: 'Vikram Sundaram',
    city: 'Bengaluru',
    rating: 5,
    comment: 'Great experience! Easy to upload our crest design and the real-time apparel mockup was 100% true to what arrived at my doorstep.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    verified: true,
    productName: 'Squad Crest Custom Jersey',
    date: '15 Sep 2025'
  },
  {
    id: 'rev-4',
    name: 'Rahul Varma',
    city: 'Mumbai',
    rating: 5,
    comment: 'The oversized 280 GSM cotton drape is identical to international luxury fashion labels. Pure black color, solid collar, zero stretch out.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    verified: true,
    productName: 'Minimal Oversized T-Shirt',
    date: '10 Sep 2025'
  }
];

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'ARISE10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 999,
    description: 'Flat 10% OFF on orders above ₹999'
  },
  {
    code: 'TEAM20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 2999,
    description: 'Flat 20% OFF on team orders above ₹2,999'
  },
  {
    code: 'FREEFLY',
    discountType: 'free_shipping',
    discountValue: 50,
    minOrderValue: 799,
    description: 'Free Express Shipping on orders over ₹799'
  }
];

export const GARMENT_TEMPLATES = [
  {
    type: 'round-neck-tshirt',
    name: 'Regular Crewneck T-Shirt',
    basePrice: 599,
    frontSilhouette: 'M150 70 L210 110 L250 180 L210 200 L190 170 L190 350 L110 350 L110 170 L90 200 L50 180 L90 110 Z',
    backSilhouette: 'M150 70 L210 110 L250 180 L210 200 L190 170 L190 350 L110 350 L110 170 L90 200 L50 180 L90 110 Z'
  },
  {
    type: 'oversized-tshirt',
    name: 'Oversized Streetwear Tee',
    basePrice: 749
  },
  {
    type: 'football-jersey',
    name: 'Football Match Jersey',
    basePrice: 1299
  },
  {
    type: 'cricket-jersey',
    name: 'Cricket Sublimation Jersey',
    basePrice: 1499
  },
  {
    type: 'polo-tshirt',
    name: 'Classic Pique Polo',
    basePrice: 999
  },
  {
    type: 'hoodie',
    name: 'Heavy Fleece Hoodie',
    basePrice: 1599
  }
];
