export type GarmentType = 
  | 'round-neck-tshirt' 
  | 'oversized-tshirt' 
  | 'polo-tshirt' 
  | 'football-jersey' 
  | 'cricket-jersey' 
  | 'hoodie';

export type GarmentSide = 'front' | 'back';

export type GarmentSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL';

export interface Product {
  id: string;
  title: string;
  category: 
    | 'Printed T-Shirts' 
    | 'Oversized T-Shirts' 
    | 'Polo T-Shirts' 
    | 'Football Jerseys' 
    | 'Cricket Jerseys' 
    | 'Team Jerseys' 
    | 'Custom Team Jerseys'
    | 'Custom Jerseys';
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  image: string;
  additionalImages?: string[];
  description: string;
  sizes: GarmentSize[];
  colors: { name: string; hex: string }[];
  isBestSeller?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  recentOrderCount?: number;
  tags?: string[];
  fabric?: string;
  fit?: string;
  gsm?: string;
}

export interface CustomArtworkElement {
  id: string;
  type: 'image' | 'text' | 'badge';
  content: string; // URL for image/badge, or text string
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  scale: number;
  rotation: number;
  fontFamily?: string;
  color?: string;
  fontWeight?: string;
}

export interface CustomDesignOrder {
  id: string;
  userId?: string;
  customerName: string;
  email: string;
  phone: string;
  productType: GarmentType;
  baseColor: string;
  size: GarmentSize;
  quantity: number;
  notes: string;
  frontElements: CustomArtworkElement[];
  backElements: CustomArtworkElement[];
  frontMockupUrl?: string;
  backMockupUrl?: string;
  uploadedArtworkUrl?: string;
  estimatedPrice: number;
  status: 'pending' | 'approved' | 'in-printing' | 'rejected' | 'completed';
  createdAt: string;
}

export interface PlayerRosterEntry {
  id: string;
  name: string;
  number: string;
  size: GarmentSize;
}

export interface BulkTeamQuote {
  id: string;
  userId?: string;
  teamName: string;
  contactName: string;
  email: string;
  phone: string;
  sportType: 'Football' | 'Cricket' | 'Basketball' | 'Volleyball' | 'Marathon' | 'Corporate Event' | 'Other';
  numberOfPlayers: number;
  jerseyStyle: string;
  roster: PlayerRosterEntry[];
  deliveryDate: string;
  notes: string;
  logoUrl?: string;
  logoFileName?: string;
  status: 'Submitted' | 'Reviewing' | 'In Production' | 'Shipped' | 'Completed' | 'submitted' | 'reviewing' | 'quoted' | 'confirmed';
  createdAt: string;
}

export type PosterSize = 'A3 (11.7 x 16.5 in)' | 'A2 (16.5 x 23.4 in)' | 'A1 (23.4 x 33.1 in)' | '18 x 24 in' | '24 x 36 in' | 'Custom Size';
export type PosterFinish = 'Glossy Photographic' | 'Matte Fine Art' | 'Metallic Luster' | 'Canvas Textured';

export interface BulkTeamPosterOrder {
  id: string;
  userId?: string;
  teamName: string;
  contactName: string;
  email: string;
  phone: string;
  posterSize: PosterSize;
  paperFinish: PosterFinish;
  quantity: number;
  deliveryDate: string;
  notes?: string;
  artworkUrl?: string;
  artworkFileName?: string;
  estimatedPrice: number;
  status: 'Submitted' | 'Reviewing' | 'In Production' | 'Shipped' | 'Completed';
  createdAt: string;
}

export interface CartItem {
  id: string; // generated unique cart id
  productId: string;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  size: GarmentSize;
  color: { name: string; hex: string };
  quantity: number;
  isCustom?: boolean;
  customDetails?: {
    garmentType: GarmentType;
    frontMockup?: string;
    backMockup?: string;
    artworkUrl?: string;
    artworkFileName?: string;
    notes?: string;
  };
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderTrackingStep {
  step: 'placed' | 'confirmed' | 'processing' | 'production' | 'shipped' | 'out_for_delivery' | 'delivered';
  label: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export type OrderStatus = 
  | 'Pending' 
  | 'Confirmed' 
  | 'Processing' 
  | 'Production' 
  | 'Shipped' 
  | 'Delivered' 
  | 'Cancelled'
  | 'placed' 
  | 'processing' 
  | 'shipped' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled';

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'UPI / QR' | 'Credit / Debit Card' | 'Net Banking' | 'Cash on Delivery';
  paymentOption?: 'upi_id' | 'qr_scanner' | 'card' | 'netbanking' | 'cod';
  paymentStatus: 'Paid' | 'Pending COD' | 'Pending Verification' | 'Verified';
  paymentScreenshotUrl?: string;
  paymentScreenshotFileName?: string;
  transactionRef?: string;
  upiId?: string;
  status: OrderStatus;
  trackingSteps: OrderTrackingStep[];
  trackingNotes?: string;
  createdAt: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  avatar: string;
  verified: boolean;
  productName: string;
  date: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping';
  discountValue: number;
  minOrderValue: number;
  description: string;
}
