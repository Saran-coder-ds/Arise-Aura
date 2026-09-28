import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Palette, 
  BarChart3, 
  LogOut, 
  Plus, 
  Search, 
  Check, 
  X, 
  AlertTriangle, 
  Download, 
  TrendingUp, 
  Clock, 
  Trash2, 
  Edit3, 
  Eye, 
  UploadCloud,
  FileImage,
  Image as ImageIcon,
  CheckCircle2,
  ExternalLink,
  Filter,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Sparkles,
  Layers,
  Printer,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';
import { 
  Product, 
  GarmentSize, 
  Order, 
  OrderStatus, 
  BulkTeamQuote, 
  BulkTeamPosterOrder, 
  CustomDesignOrder 
} from '../../types';
import { ALL_SIZES } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { AriseAuraLogo } from '../common/AriseAuraLogo';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  bulkJerseys: BulkTeamQuote[];
  bulkPosters: BulkTeamPosterOrder[];
  customDesigns: CustomDesignOrder[];
  onAddProduct: (newProd: Product) => void;
  onUpdateProduct: (prod: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onUpdateBulkJerseyStatus: (id: string, status: any) => void;
  onUpdateBulkPosterStatus: (id: string, status: any) => void;
  onUpdateCustomDesignStatus: (id: string, status: any) => void;
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  bulkJerseys,
  bulkPosters,
  customDesigns,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onUpdateBulkJerseyStatus,
  onUpdateBulkPosterStatus,
  onUpdateCustomDesignStatus,
  onExitAdmin
}) => {
  const { user } = useAuth();
  
  // Clean Navigation tabs conforming to Section 3:
  // Dashboard, Products, Orders / Order Fulfillment, Custom Designs, Bulk Team Jerseys, Bulk Team Posters, Reports & Sales
  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'inventory' | 'orders' | 'customers' | 'custom-designs' | 'bulk-jerseys' | 'bulk-posters' | 'reports'
  >('overview');

  // Search & Filter States
  const [searchProductQuery, setSearchProductQuery] = useState('');
  const [searchOrderQuery, setSearchOrderQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  // PRODUCT MODAL STATES (For Add and Edit)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  
  // Product Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<Product['category']>('Printed T-Shirts');
  const [formPrice, setFormPrice] = useState<number>(599);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(999);
  const [formStock, setFormStock] = useState<number>(20);
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formAdditionalImages, setFormAdditionalImages] = useState<string[]>([]);
  const [formSizes, setFormSizes] = useState<GarmentSize[]>(['S', 'M', 'L', 'XL', 'XXL']);
  const [formColors, setFormColors] = useState<{ name: string; hex: string }[]>([
    { name: 'Onyx Black', hex: '#111111' },
    { name: 'Pure White', hex: '#FFFFFF' }
  ]);
  const [formFabric, setFormFabric] = useState('100% Combed Cotton');
  const [formFit, setFormFit] = useState('Regular Boxy Fit');
  const [formGsm, setFormGsm] = useState('240 GSM');
  const [formIsBestSeller, setFormIsBestSeller] = useState(false);
  const [formIsTrending, setFormIsTrending] = useState(false);
  const [formIsNewArrival, setFormIsNewArrival] = useState(false);

  // Temporary color input
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#d4af37');

  // Open modal for Adding new product
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setFormTitle('');
    setFormCategory('Printed T-Shirts');
    setFormPrice(699);
    setFormOriginalPrice(999);
    setFormStock(25);
    setFormDescription('Constructed from 240 GSM organic cotton with reinforced stitching and vibrant wash-fast printing.');
    setFormImage('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80');
    setFormAdditionalImages([]);
    setFormSizes(['S', 'M', 'L', 'XL', 'XXL']);
    setFormColors([
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ]);
    setFormFabric('100% Combed Cotton');
    setFormFit('Regular Boxy Fit');
    setFormGsm('240 GSM');
    setFormIsBestSeller(false);
    setFormIsTrending(true);
    setFormIsNewArrival(true);
    setIsProductModalOpen(true);
  };

  // Open modal for Editing an existing product
  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setFormTitle(prod.title);
    setFormCategory(prod.category);
    setFormPrice(prod.price);
    setFormOriginalPrice(prod.originalPrice);
    setFormStock(prod.stock);
    setFormDescription(prod.description || '');
    setFormImage(prod.image);
    setFormAdditionalImages(prod.additionalImages ? [...prod.additionalImages] : []);
    setFormSizes(prod.sizes ? [...prod.sizes] : ['S', 'M', 'L', 'XL']);
    setFormColors(prod.colors ? [...prod.colors] : [{ name: 'Black', hex: '#000000' }]);
    setFormFabric(prod.fabric || '100% Combed Cotton');
    setFormFit(prod.fit || 'Regular Fit');
    setFormGsm(prod.gsm || '240 GSM');
    setFormIsBestSeller(!!prod.isBestSeller);
    setFormIsTrending(!!prod.isTrending);
    setFormIsNewArrival(!!prod.isNewArrival);
    setIsProductModalOpen(true);
  };

  // Local Device Image Upload Handler (FileReader to DataURL)
  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isMain: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP, SVG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        if (isMain) {
          setFormImage(result);
        } else {
          setFormAdditionalImages(prev => [...prev, result]);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Toggle size in product form
  const handleToggleSize = (size: GarmentSize) => {
    setFormSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  // Add new color to product form
  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    setFormColors(prev => [...prev, { name: newColorName.trim(), hex: newColorHex }]);
    setNewColorName('');
  };

  // Remove color from product form
  const handleRemoveColor = (hex: string) => {
    setFormColors(prev => prev.filter(c => c.hex !== hex));
  };

  // Handle Save (Add or Update)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Please enter a product title.');
      return;
    }
    if (!formImage.trim()) {
      alert('Please upload an image or provide an image URL.');
      return;
    }

    const discountPercent = formOriginalPrice > formPrice 
      ? Math.round(((formOriginalPrice - formPrice) / formOriginalPrice) * 100) 
      : 0;

    if (editingProductId) {
      // Find original to preserve reviewsCount and rating
      const existing = products.find(p => p.id === editingProductId);
      const updatedProd: Product = {
        id: editingProductId,
        title: formTitle,
        category: formCategory,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        discountPercent,
        stock: Number(formStock),
        rating: existing?.rating || 4.8,
        reviewsCount: existing?.reviewsCount || 1,
        image: formImage,
        additionalImages: formAdditionalImages,
        description: formDescription,
        sizes: formSizes.length > 0 ? formSizes : ['M', 'L'],
        colors: formColors.length > 0 ? formColors : [{ name: 'Standard', hex: '#111111' }],
        fabric: formFabric,
        fit: formFit,
        gsm: formGsm,
        isBestSeller: formIsBestSeller,
        isTrending: formIsTrending,
        isNewArrival: formIsNewArrival,
        recentOrderCount: existing?.recentOrderCount || 12
      };
      onUpdateProduct(updatedProd);
    } else {
      // Add new product
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        title: formTitle,
        category: formCategory,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        discountPercent,
        stock: Number(formStock),
        rating: 5.0,
        reviewsCount: 1,
        image: formImage,
        additionalImages: formAdditionalImages,
        description: formDescription,
        sizes: formSizes.length > 0 ? formSizes : ['S', 'M', 'L', 'XL'],
        colors: formColors.length > 0 ? formColors : [{ name: 'Onyx Black', hex: '#111111' }],
        fabric: formFabric,
        fit: formFit,
        gsm: formGsm,
        isBestSeller: formIsBestSeller,
        isTrending: formIsTrending,
        isNewArrival: formIsNewArrival,
        recentOrderCount: 1
      };
      onAddProduct(newProd);
    }

    setIsProductModalOpen(false);
  };

  // Helper to download uploaded artwork
  const handleDownloadFile = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'arise_aura_artwork.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Products
  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchProductQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchProductQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchProductQuery.toLowerCase())
  );

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.id.toLowerCase().includes(searchOrderQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchOrderQuery.toLowerCase()) ||
      o.phone.toLowerCase().includes(searchOrderQuery.toLowerCase()) ||
      o.email.toLowerCase().includes(searchOrderQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (orderStatusFilter === 'All') return true;
    return o.status.toLowerCase() === orderStatusFilter.toLowerCase();
  });

  // Calculate live financial metrics
  const totalSalesAmount = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter(o => {
    const s = o.status.toLowerCase();
    return s === 'pending' || s === 'placed' || s === 'confirmed' || s === 'processing';
  }).length;

  // Inventory Quick Stock Adjustment
  const handleAdjustStock = (prodId: string, delta: number) => {
    const prod = products.find(p => p.id === prodId);
    if (!prod) return;
    const newStock = Math.max(0, prod.stock + delta);
    onUpdateProduct({ ...prod, stock: newStock });
  };

  // Aggregated Customers List from Orders
  const aggregatedCustomers = React.useMemo(() => {
    const map = new Map<string, {
      name: string;
      email: string;
      phone: string;
      city: string;
      ordersCount: number;
      totalSpent: number;
      lastOrderDate: string;
    }>();

    orders.forEach(o => {
      const key = (o.email || o.phone || o.customerName).toLowerCase();
      const existing = map.get(key);
      if (existing) {
        existing.ordersCount += 1;
        existing.totalSpent += (o.total || 0);
        if (new Date(o.createdAt).getTime() > new Date(existing.lastOrderDate).getTime()) {
          existing.lastOrderDate = o.createdAt;
        }
      } else {
        map.set(key, {
          name: o.customerName || 'Customer',
          email: o.email || 'N/A',
          phone: o.phone || '7358641670',
          city: o.shippingAddress?.city || 'Chennai',
          ordersCount: 1,
          totalSpent: o.total || 0,
          lastOrderDate: o.createdAt
        });
      }
    });

    return Array.from(map.values());
  }, [orders]);

  return (
    <div className="bg-[#0b0b0e] min-h-screen text-white flex flex-col lg:flex-row font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-68 bg-[#121216] border-r border-zinc-800 p-5 flex flex-col justify-between shrink-0 shadow-2xl">
        <div className="space-y-6">
          
          {/* Brand Logo & Header */}
          <div className="pb-4 border-b border-zinc-800/80">
            <AriseAuraLogo variant="horizontal" theme="gold" iconSize={36} />
            <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ADMIN HQ
              </span>
              <span>Chennai, TN</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {/* 1. Dashboard */}
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
            </button>

            {/* 2. Products */}
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Product Catalog</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                activeTab === 'products' ? 'bg-black/20 text-black font-bold' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {products.length}
              </span>
            </button>

            {/* 3. Inventory Management */}
            <button
              onClick={() => setActiveTab('inventory')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'inventory'
                  ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4" />
                <span>Inventory &amp; Stock</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                activeTab === 'inventory' ? 'bg-black/20 text-black font-bold' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {products.filter(p => p.stock < 10).length > 0 && (
                  <span className="text-amber-400 font-bold">{products.filter(p => p.stock < 10).length} Low</span>
                )}
              </span>
            </button>

            {/* 4. Orders / Order Fulfillment */}
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders &amp; Receipts</span>
              </div>
              {orders.length > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                  activeTab === 'orders' ? 'bg-black/20 text-black font-bold' : 'bg-[#d4af37]/20 text-[#d4af37] font-bold'
                }`}>
                  {orders.length}
                </span>
              )}
            </button>

            {/* 5. Customer Management */}
            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'customers'
                  ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Customers</span>
              </div>
            </button>

            {/* 6. Custom Designs */}
            <button
              onClick={() => setActiveTab('custom-designs')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'custom-designs'
                  ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Palette className="w-4 h-4" />
                <span>Custom Designs</span>
              </div>
              {customDesigns.length > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                  activeTab === 'custom-designs' ? 'bg-black/20 text-black font-bold' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {customDesigns.length}
                </span>
              )}
            </button>

            {/* 7. Bulk Team Jerseys */}
            <button
              onClick={() => setActiveTab('bulk-jerseys')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'bulk-jerseys'
                  ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Bulk Team Jerseys</span>
              </div>
              {bulkJerseys.length > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                  activeTab === 'bulk-jerseys' ? 'bg-black/20 text-black font-bold' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {bulkJerseys.length}
                </span>
              )}
            </button>

            {/* 8. Bulk Team Posters */}
            <button
              onClick={() => setActiveTab('bulk-posters')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'bulk-posters'
                  ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileImage className="w-4 h-4" />
                <span>Bulk Team Posters</span>
              </div>
              {bulkPosters.length > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                  activeTab === 'bulk-posters' ? 'bg-black/20 text-black font-bold' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {bulkPosters.length}
                </span>
              )}
            </button>

            {/* 9. Reports & Sales */}
            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'reports'
                  ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="w-4 h-4" />
                <span>Reports &amp; Sales</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-zinc-800 space-y-3">
          <div className="flex items-center gap-2.5 px-2 py-1 text-xs text-zinc-400">
            <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-xs text-white">
              {user?.displayName?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold truncate text-[11px]">{user?.displayName || 'HQ Master'}</p>
              <p className="text-zinc-500 text-[10px] truncate">{user?.email || 'admin@ariseaura.com'}</p>
            </div>
          </div>

          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-xs font-bold text-white uppercase tracking-wider transition-all border border-zinc-700/60"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Return to Store</span>
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto max-h-screen">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
          <div>
            <h1 className="text-2xl font-black font-['Outfit'] text-white">
              {activeTab === 'overview' && 'Executive Dashboard'}
              {activeTab === 'products' && 'Product Inventory & Catalog Management'}
              {activeTab === 'orders' && 'Order Fulfillment Pipeline'}
              {activeTab === 'custom-designs' && 'Custom Artwork & Printing Orders'}
              {activeTab === 'bulk-jerseys' && 'Bulk Team Jersey Orders & Rosters'}
              {activeTab === 'bulk-posters' && 'Bulk Team Poster Orders'}
              {activeTab === 'reports' && 'Financial Analytics & Sales Reports'}
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Live manufacturing database synced with Firebase and instant customer storefront updates
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAddProduct}
              className="px-4 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e6c148] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-[#d4af37]/20 active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW DASHBOARD */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 pt-6 animate-in fade-in">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#131317] border border-zinc-800 space-y-2">
                <span className="text-xs text-zinc-400 font-medium">Total Revenue</span>
                <div className="text-2xl font-black text-[#d4af37] font-['Outfit']">
                  ₹ {totalSalesAmount.toLocaleString('en-IN')}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Calculated from live orders</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#131317] border border-zinc-800 space-y-2">
                <span className="text-xs text-zinc-400 font-medium">Total Orders</span>
                <div className="text-2xl font-black text-white font-['Outfit']">{totalOrdersCount}</div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Online &amp; studio purchases</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#131317] border border-zinc-800 space-y-2">
                <span className="text-xs text-zinc-400 font-medium">Pending Fulfillment</span>
                <div className="text-2xl font-black text-amber-400 font-['Outfit']">{pendingOrdersCount}</div>
                <div className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Action required</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#131317] border border-zinc-800 space-y-2">
                <span className="text-xs text-zinc-400 font-medium">Bulk Inquiries</span>
                <div className="text-2xl font-black text-blue-400 font-['Outfit']">
                  {bulkJerseys.length + bulkPosters.length}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-semibold">
                  <span>{bulkJerseys.length} Jerseys &bull; {bulkPosters.length} Posters</span>
                </div>
              </div>
            </div>

            {/* Visual Sales Chart & Quick Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 p-6 rounded-2xl bg-[#131317] border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Sales &amp; Fulfillment Volume</h3>
                  <span className="text-xs text-zinc-400">Weekly Performance</span>
                </div>

                <div className="h-44 w-full pt-4">
                  <svg viewBox="0 0 500 140" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="salesGradOverview" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#d4af37" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="30" x2="500" y2="30" stroke="#27272a" strokeDasharray="3 3" />
                    <line x1="0" y1="75" x2="500" y2="75" stroke="#27272a" strokeDasharray="3 3" />
                    <line x1="0" y1="120" x2="500" y2="120" stroke="#27272a" strokeDasharray="3 3" />
                    <polygon
                      points="10,120 80,75 160,95 240,40 320,60 400,30 490,35 490,135 10,135"
                      fill="url(#salesGradOverview)"
                    />
                    <polyline
                      points="10,120 80,75 160,95 240,40 320,60 400,30 490,35"
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth="3.5"
                    />
                    {[[10,120],[80,75],[160,95],[240,40],[320,60],[400,30],[490,35]].map(([x,y], idx) => (
                      <circle key={idx} cx={x} cy={y} r="4.5" fill="#d4af37" stroke="#000" strokeWidth="2" />
                    ))}
                  </svg>
                  <div className="flex justify-between text-[11px] text-zinc-500 font-mono mt-2">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>
              </div>

              {/* Top Selling Products */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-[#131317] border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <h3 className="text-sm font-bold text-white">Top Active Catalog Items</h3>
                  <span className="text-[11px] text-zinc-400">Stock</span>
                </div>
                <div className="space-y-3">
                  {products.slice(0, 5).map(p => (
                    <div key={p.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img src={p.image} alt={p.title} className="w-8 h-8 rounded-lg object-cover bg-zinc-900 shrink-0" />
                        <span className="font-semibold text-white truncate max-w-[130px]">{p.title}</span>
                      </div>
                      <span className="font-mono text-zinc-300 font-bold">{p.stock} pcs</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Orders Snapshot */}
            <div className="p-6 rounded-2xl bg-[#131317] border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Recent Customer Orders</h3>
                  <p className="text-xs text-zinc-400">Manage real orders placed through the customer storefront</p>
                </div>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-[#d4af37] hover:underline font-bold"
                >
                  View All ({orders.length}) &rarr;
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-zinc-800">
                <table className="w-full text-xs text-left">
                  <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Current Status</th>
                      <th className="p-3 text-right">Update Pipeline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {orders.slice(0, 5).map(order => (
                      <tr key={order.id} className="hover:bg-zinc-800/30">
                        <td className="p-3 font-mono font-bold text-[#d4af37]">{order.id}</td>
                        <td className="p-3 text-white font-medium">{order.customerName}</td>
                        <td className="p-3 text-zinc-400">{order.items?.length || 0} product(s)</td>
                        <td className="p-3 font-bold text-white">₹{order.total}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            order.status.toLowerCase() === 'delivered'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : order.status.toLowerCase() === 'shipped'
                              ? 'bg-blue-500/20 text-blue-400'
                              : order.status.toLowerCase() === 'production'
                              ? 'bg-purple-500/20 text-purple-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <select
                            value={order.status}
                            onChange={e => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-white cursor-pointer focus:outline-none focus:border-[#d4af37]"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Production">Production</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PRODUCTS MANAGEMENT (Fix Edit + Add Local Image Upload) */}
        {/* ========================================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6 pt-6 animate-in fade-in">
            {/* Search and Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#131317] p-4 rounded-2xl border border-zinc-800">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchProductQuery}
                  onChange={e => setSearchProductQuery(e.target.value)}
                  placeholder="Search products by title, category, SKU..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <span className="text-xs text-zinc-400 font-medium">
                  Showing {filteredProducts.length} of {products.length} products
                </span>
                <button
                  onClick={handleOpenAddProduct}
                  className="px-3.5 py-2 rounded-xl bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#131317]">
              <table className="w-full text-xs text-left">
                <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Product &amp; Image</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Price (Selling / Orig)</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Available Sizes</th>
                    <th className="p-3.5">Colors</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredProducts.map(prod => (
                    <tr key={prod.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <img 
                          src={prod.image} 
                          alt={prod.title} 
                          className="w-12 h-12 rounded-xl object-cover bg-zinc-900 border border-zinc-800 shrink-0 cursor-pointer hover:opacity-80"
                          onClick={() => setEnlargedImage(prod.image)}
                          title="Click to view enlarged image"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-white line-clamp-1 text-xs">{prod.title}</p>
                          <span className="text-[10px] text-zinc-500 font-mono">ID: {prod.id}</span>
                          <div className="flex gap-1 mt-0.5">
                            {prod.isBestSeller && (
                              <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded font-bold">Best Seller</span>
                            )}
                            {prod.isTrending && (
                              <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1 rounded font-bold">Trending</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 text-zinc-300 font-medium">{prod.category}</td>
                      <td className="p-3.5 font-bold text-white">
                        <span className="text-[#d4af37]">₹{prod.price}</span>
                        <span className="text-zinc-500 line-through text-[11px] ml-1.5 font-normal">₹{prod.originalPrice}</span>
                      </td>
                      <td className="p-3.5">
                        <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                          prod.stock <= 5 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {prod.stock} in stock
                        </span>
                      </td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1 max-w-[140px]">
                          {prod.sizes?.map(s => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 font-mono">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          {prod.colors?.slice(0, 4).map((c, i) => (
                            <span
                              key={i}
                              className="w-4 h-4 rounded-full border border-zinc-700 shadow-sm"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                          {(prod.colors?.length || 0) > 4 && (
                            <span className="text-[10px] text-zinc-500">+{prod.colors!.length - 4}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        {/* EDIT PRODUCT BUTTON (Section 1 requirement) */}
                        <button
                          onClick={() => handleOpenEditProduct(prod)}
                          className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-[#d4af37] text-zinc-300 hover:text-black font-semibold text-xs transition-all inline-flex items-center gap-1 border border-zinc-700"
                          title="Edit this product"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        {/* DELETE PRODUCT BUTTON */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${prod.title}" from the store catalog?`)) {
                              onDeleteProduct(prod.id);
                            }
                          }}
                          className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-all"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: INVENTORY MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 pt-6 animate-in fade-in">
            {/* Inventory KPI Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[#131317] border border-zinc-800">
                <span className="text-[11px] text-zinc-400 uppercase font-semibold">Total Stock Units</span>
                <p className="text-2xl font-black text-white mt-1 font-mono">
                  {products.reduce((acc, p) => acc + (p.stock || 0), 0)} pcs
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#131317] border border-zinc-800">
                <span className="text-[11px] text-zinc-400 uppercase font-semibold">Active Catalog SKUs</span>
                <p className="text-2xl font-black text-[#d4af37] mt-1 font-mono">
                  {products.length} Items
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#131317] border border-zinc-800">
                <span className="text-[11px] text-zinc-400 uppercase font-semibold">Low Stock Alert (&lt; 10)</span>
                <p className="text-2xl font-black text-amber-400 mt-1 font-mono">
                  {products.filter(p => p.stock < 10 && p.stock > 0).length} Items
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#131317] border border-zinc-800">
                <span className="text-[11px] text-zinc-400 uppercase font-semibold">Out of Stock</span>
                <p className="text-2xl font-black text-rose-400 mt-1 font-mono">
                  {products.filter(p => p.stock === 0).length} Items
                </p>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#131317]">
              <table className="w-full text-xs text-left">
                <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
                  <tr>
                    <th className="p-4">SKU / Item</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Selling Price</th>
                    <th className="p-4">Current Stock</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Quick Stock Adjustment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80">
                  {products.map(prod => {
                    const isLow = prod.stock < 10 && prod.stock > 0;
                    const isOut = prod.stock === 0;
                    return (
                      <tr key={prod.id} className="hover:bg-zinc-800/30">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={prod.image} alt={prod.title} className="w-10 h-10 rounded-lg object-cover bg-zinc-900 shrink-0" />
                            <div>
                              <p className="font-bold text-white truncate max-w-xs">{prod.title}</p>
                              <span className="font-mono text-[10px] text-zinc-500">{prod.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-zinc-300 font-medium">{prod.category}</td>
                        <td className="p-4 font-mono font-bold text-white">₹{prod.price}</td>
                        <td className="p-4">
                          <span className="font-mono text-base font-black text-white">{prod.stock}</span>
                          <span className="text-zinc-500 text-[11px] ml-1">units</span>
                        </td>
                        <td className="p-4">
                          {isOut ? (
                            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/20 text-rose-400">
                              Out of Stock
                            </span>
                          ) : isLow ? (
                            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400">
                              Low Stock
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400">
                              In Stock
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="inline-flex items-center gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                            <button
                              onClick={() => handleAdjustStock(prod.id, -5)}
                              className="px-2 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[10px] font-bold text-zinc-300 hover:text-white cursor-pointer"
                              title="Decrease 5"
                            >
                              -5
                            </button>
                            <button
                              onClick={() => handleAdjustStock(prod.id, -1)}
                              className="px-2 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-zinc-300 hover:text-white cursor-pointer"
                              title="Decrease 1"
                            >
                              -1
                            </button>
                            <button
                              onClick={() => handleAdjustStock(prod.id, 1)}
                              className="px-2 py-1 rounded-lg bg-zinc-900 hover:bg-[#d4af37] text-xs font-bold text-zinc-300 hover:text-black cursor-pointer"
                              title="Increase 1"
                            >
                              +1
                            </button>
                            <button
                              onClick={() => handleAdjustStock(prod.id, 5)}
                              className="px-2 py-1 rounded-lg bg-zinc-900 hover:bg-[#d4af37] text-[10px] font-bold text-zinc-300 hover:text-black cursor-pointer"
                              title="Increase 5"
                            >
                              +5
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: ORDER FULFILLMENT & PAYMENT RECEIPTS */}
        {/* ========================================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6 pt-6 animate-in fade-in">
            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#131317] p-4 rounded-2xl border border-zinc-800">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchOrderQuery}
                  onChange={e => setSearchOrderQuery(e.target.value)}
                  placeholder="Search by Order ID (#PL...), customer, phone..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                {['All', 'Pending', 'Confirmed', 'Processing', 'Production', 'Shipped', 'Delivered'].map(status => (
                  <button
                    key={status}
                    onClick={() => setOrderStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                      orderStatusFilter === status
                        ? 'bg-[#d4af37] text-black font-bold'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders List / Table */}
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-[#131317] border border-zinc-800 text-zinc-400">
                  <ShoppingBag className="w-10 h-10 mx-auto text-zinc-600 mb-2" />
                  <p className="font-bold text-white">No orders matching this criteria.</p>
                  <p className="text-xs text-zinc-500 mt-1">When customers place orders, they will appear here automatically.</p>
                </div>
              ) : (
                filteredOrders.map(order => (
                  <div 
                    key={order.id} 
                    className="p-5 rounded-2xl bg-[#131317] border border-zinc-800 space-y-4 hover:border-zinc-700 transition-all"
                  >
                    {/* Order Top Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-800 gap-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-black text-sm text-[#d4af37]">{order.id}</span>
                        <span className="text-xs text-zinc-400">
                          {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          order.status.toLowerCase() === 'delivered'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : order.status.toLowerCase() === 'shipped'
                            ? 'bg-blue-500/20 text-blue-400'
                            : order.status.toLowerCase() === 'production'
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      {/* Status Update Pipeline Selector (Pending → Confirmed → Processing → Production → Shipped → Delivered) */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-400 font-semibold">Change Status:</span>
                        <select
                          value={order.status}
                          onChange={e => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="bg-zinc-950 border border-[#d4af37]/60 rounded-xl px-3 py-1.5 text-xs text-white font-bold cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Production">Production</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer & Shipping Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800/80">
                      <div>
                        <span className="text-zinc-500 font-semibold block mb-0.5">CUSTOMER DETAILS</span>
                        <p className="font-bold text-white text-sm">{order.customerName}</p>
                        <p className="text-zinc-400 flex items-center gap-1 mt-0.5"><Mail className="w-3 h-3 text-[#d4af37]" /> {order.email}</p>
                        <p className="text-zinc-400 flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3 text-[#d4af37]" /> {order.phone}</p>
                      </div>

                      <div>
                        <span className="text-zinc-500 font-semibold block mb-0.5">SHIPPING ADDRESS</span>
                        <p className="text-zinc-300 font-medium">{order.shippingAddress?.addressLine}</p>
                        <p className="text-zinc-400">{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
                      </div>

                      <div>
                        <span className="text-zinc-500 font-semibold block mb-0.5">PAYMENT &amp; TOTAL</span>
                        <p className="text-zinc-300 font-medium">Method: <strong className="text-white">{order.paymentMethod}</strong></p>
                        <p className="text-zinc-300">
                          Status: <span className={`font-bold ${order.paymentStatus === 'Paid' || order.paymentStatus === 'Verified' ? 'text-emerald-400' : 'text-amber-400'}`}>{order.paymentStatus}</span>
                        </p>
                        {order.upiId && (
                          <p className="text-zinc-400 font-mono text-[10px]">UPI: {order.upiId}</p>
                        )}
                        {order.transactionRef && (
                          <p className="text-zinc-400 font-mono text-[10px]">Ref: <strong className="text-white">{order.transactionRef}</strong></p>
                        )}
                        <p className="text-base font-black text-[#d4af37] mt-1 font-mono">Total: ₹{order.total}</p>
                      </div>
                    </div>

                    {/* Customer-Uploaded Payment Confirmation Screenshot */}
                    {order.paymentScreenshotUrl && (
                      <div className="p-4 rounded-xl bg-zinc-950 border border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <img
                            src={order.paymentScreenshotUrl}
                            alt="Payment Confirmation Screenshot"
                            className="w-16 h-16 rounded-xl object-cover bg-black border border-zinc-700 cursor-pointer hover:border-[#d4af37] transition-colors shrink-0 shadow-md"
                            onClick={() => setEnlargedImage(order.paymentScreenshotUrl!)}
                            title="Click to zoom in"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                                Customer Payment Screenshot
                              </span>
                              {order.transactionRef && (
                                <span className="text-[10px] text-zinc-400 font-mono">
                                  UTR: <strong className="text-white">{order.transactionRef}</strong>
                                </span>
                              )}
                            </div>
                            <p className="font-bold text-white text-xs mt-1 truncate">
                              {order.paymentScreenshotFileName || 'Payment_Confirmation_Proof.png'}
                            </p>
                            <p className="text-[11px] text-zinc-400">
                              Uploaded by customer from UPI payment screen.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                          <button
                            onClick={() => setEnlargedImage(order.paymentScreenshotUrl!)}
                            className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-[#d4af37] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Full Screenshot</span>
                          </button>
                          <button
                            onClick={() => handleDownloadFile(order.paymentScreenshotUrl!, order.paymentScreenshotFileName || `payment_${order.id}.png`)}
                            className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Ordered Items List */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                        Ordered Products &amp; Customization ({order.items?.length || 0}):
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex gap-3 text-xs">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-14 h-14 rounded-lg object-cover bg-zinc-950 shrink-0 border border-zinc-700 cursor-pointer"
                              onClick={() => setEnlargedImage(item.image)}
                              title="View enlarged"
                            />
                            <div className="min-w-0 flex-1 space-y-1">
                              <p className="font-bold text-white truncate">{item.title}</p>
                              <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
                                <span>Size: <strong className="text-white">{item.size}</strong></span>
                                <span>&bull;</span>
                                <span className="flex items-center gap-1">
                                  Color: <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: item.color?.hex }} />
                                </span>
                                <span>&bull;</span>
                                <span>Qty: <strong className="text-white">{item.quantity}</strong></span>
                              </div>
                              <p className="font-mono text-[#d4af37] font-bold text-xs">₹{item.price * item.quantity}</p>

                              {/* Customization Details & Uploaded Files */}
                              {item.customDetails && (
                                <div className="mt-2 pt-2 border-t border-zinc-800 text-[11px] text-zinc-300 space-y-1">
                                  <span className="font-bold text-[#d4af37] block">Custom Design:</span>
                                  {item.customDetails.notes && (
                                    <p className="italic text-zinc-400">"{item.customDetails.notes}"</p>
                                  )}
                                  {item.customDetails.artworkUrl && (
                                    <div className="flex items-center gap-2 pt-1">
                                      <button
                                        onClick={() => handleDownloadFile(item.customDetails!.artworkUrl!, item.customDetails!.artworkFileName || `artwork_${order.id}.png`)}
                                        className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[#d4af37] text-[10px] font-bold flex items-center gap-1"
                                      >
                                        <Download className="w-3 h-3" />
                                        Download Artwork
                                      </button>
                                      <button
                                        onClick={() => setEnlargedImage(item.customDetails!.artworkUrl!)}
                                        className="text-[10px] text-zinc-400 hover:underline"
                                      >
                                        Preview
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-xs">
                      <span className="text-zinc-500 font-mono">
                        Pipeline Stage: {order.status}
                      </span>
                      <button
                        onClick={() => setSelectedOrderDetails(order)}
                        className="text-[#d4af37] hover:underline font-bold text-xs flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Full Invoice &amp; Order Slip</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: CUSTOMER MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'customers' && (
          <div className="space-y-6 pt-6 animate-in fade-in">
            {/* Customer Directory Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#131317] p-4 rounded-2xl border border-zinc-800">
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit']">Registered &amp; Ordering Customers</h3>
                <p className="text-xs text-zinc-400">Total customer profiles: {aggregatedCustomers.length} &bull; Production Hub: Chennai, Tamil Nadu</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-[#d4af37]/20 text-[#d4af37] font-bold px-3 py-1 rounded-xl border border-[#d4af37]/40">
                  {orders.length} Total Orders Placed
                </span>
              </div>
            </div>

            {/* Customers Table */}
            <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#131317]">
              <table className="w-full text-xs text-left">
                <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
                  <tr>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Contact Phone &amp; Email</th>
                    <th className="p-4">Delivery City</th>
                    <th className="p-4 text-center">Orders Count</th>
                    <th className="p-4 text-right">Total Spent (LTV)</th>
                    <th className="p-4 text-right">Direct Outreach</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80">
                  {aggregatedCustomers.map((cust, idx) => (
                    <tr key={idx} className="hover:bg-zinc-800/30">
                      <td className="p-4 font-bold text-white">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 text-[#d4af37] font-bold flex items-center justify-center text-xs shrink-0">
                            {cust.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="block">{cust.name}</span>
                            <span className="text-[10px] text-zinc-500 font-normal">Customer #{idx + 101}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <p className="text-zinc-300 font-mono flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#d4af37]" /> {cust.phone}
                          </p>
                          <p className="text-zinc-400 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-zinc-500" /> {cust.email}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 text-zinc-300 font-medium">{cust.city}</td>
                      <td className="p-4 text-center">
                        <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-white font-mono font-bold text-xs">
                          {cust.ordersCount}
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono font-bold text-[#d4af37] text-sm">
                        ₹{cust.totalSpent.toLocaleString('en-IN')}
                      </td>
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <a
                            href={`tel:${cust.phone.replace(/[^0-9]/g, '')}`}
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-[#d4af37] text-zinc-300 hover:text-black transition-colors"
                            title={`Call ${cust.phone}`}
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`https://wa.me/${cust.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${cust.name}, this is Arise Aura Clothing Chennai regarding your order.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: CUSTOM DESIGNS ORDERS */}
        {/* ========================================================================= */}
        {activeTab === 'custom-designs' && (
          <div className="space-y-6 pt-6 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customDesigns.length === 0 ? (
                <div className="col-span-full p-12 text-center rounded-2xl bg-[#131317] border border-zinc-800 text-zinc-400">
                  <Palette className="w-10 h-10 mx-auto text-zinc-600 mb-2" />
                  <p className="font-bold text-white">No custom design orders yet.</p>
                </div>
              ) : (
                customDesigns.map(order => (
                  <div
                    key={order.id}
                    className="rounded-2xl bg-[#131317] border border-zinc-800 p-5 space-y-4 hover:border-zinc-700 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                        <span className="font-mono font-bold text-xs text-[#d4af37]">#{order.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          order.status === 'approved' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : order.status === 'in-printing'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      {order.uploadedArtworkUrl ? (
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 relative group">
                          <img 
                            src={order.uploadedArtworkUrl} 
                            alt="Uploaded custom artwork" 
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => setEnlargedImage(order.uploadedArtworkUrl!)}
                          />
                          <button
                            onClick={() => handleDownloadFile(order.uploadedArtworkUrl!, `custom_artwork_${order.id}.png`)}
                            className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/80 hover:bg-black text-[#d4af37] text-xs font-bold flex items-center gap-1 backdrop-blur-sm border border-zinc-700"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </button>
                        </div>
                      ) : (
                        <div className="aspect-[4/3] rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-600">
                          <ImageIcon className="w-8 h-8" />
                        </div>
                      )}

                      <div className="text-xs space-y-1.5">
                        <p className="font-bold text-white text-sm">{order.customerName}</p>
                        <p className="text-zinc-400">Email: <span className="text-zinc-300">{order.email}</span></p>
                        <p className="text-zinc-400">Garment: <strong className="text-white uppercase">{order.productType}</strong></p>
                        <p className="text-zinc-400">Qty: {order.quantity} pcs &bull; Size: {order.size}</p>
                        {order.notes && (
                          <p className="text-zinc-400 italic bg-zinc-950 p-2 rounded-lg border border-zinc-800 text-[11px]">
                            "{order.notes}"
                          </p>
                        )}
                        <p className="text-sm font-black text-[#d4af37] pt-1 font-mono">
                          Estimated: ₹{order.estimatedPrice?.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-zinc-800">
                      <button
                        onClick={() => onUpdateCustomDesignStatus(order.id, 'approved')}
                        className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onUpdateCustomDesignStatus(order.id, 'in-printing')}
                        className="flex-1 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase"
                      >
                        In Printing
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: BULK TEAM JERSEYS (Section 2 & 3 requirements) */}
        {/* ========================================================================= */}
        {activeTab === 'bulk-jerseys' && (
          <div className="space-y-6 pt-6 animate-in fade-in">
            <div className="space-y-4">
              {bulkJerseys.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-[#131317] border border-zinc-800 text-zinc-400">
                  <Users className="w-10 h-10 mx-auto text-zinc-600 mb-2" />
                  <p className="font-bold text-white">No bulk team jersey orders received yet.</p>
                </div>
              ) : (
                bulkJerseys.map(quote => (
                  <div 
                    key={quote.id} 
                    className="p-6 rounded-2xl bg-[#131317] border border-zinc-800 space-y-5 hover:border-zinc-700 transition-all"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-800 gap-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-base font-bold text-white">{quote.teamName}</h3>
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40 uppercase">
                            {quote.sportType}
                          </span>
                        </div>
                        <span className="text-xs text-zinc-500 font-mono mt-0.5 block">
                          Order ID: {quote.id} &bull; Placed: {new Date(quote.createdAt).toLocaleDateString('en-GB')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-400 font-semibold">Status:</span>
                        <select
                          value={quote.status}
                          onChange={e => onUpdateBulkJerseyStatus(quote.id, e.target.value)}
                          className="bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white font-bold cursor-pointer focus:outline-none focus:border-[#d4af37]"
                        >
                          <option value="Submitted">Submitted</option>
                          <option value="Reviewing">Reviewing</option>
                          <option value="In Production">In Production</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
                      <div>
                        <span className="text-zinc-500 font-semibold block mb-0.5">TEAM MANAGER</span>
                        <p className="font-bold text-white">{quote.contactName}</p>
                        <p className="text-zinc-400 flex items-center gap-1 mt-0.5"><Mail className="w-3 h-3 text-[#d4af37]" /> {quote.email}</p>
                        <p className="text-zinc-400 flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3 text-[#d4af37]" /> {quote.phone}</p>
                      </div>

                      <div>
                        <span className="text-zinc-500 font-semibold block mb-0.5">JERSEY SPECIFICATIONS</span>
                        <p className="text-zinc-300 font-medium">Style: <strong className="text-white">{quote.jerseyStyle}</strong></p>
                        <p className="text-zinc-300">Total Kits: <strong className="text-[#d4af37] font-mono">{quote.numberOfPlayers} players</strong></p>
                        <p className="text-zinc-300 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3 text-[#d4af37]" /> Required by: <strong className="text-white">{quote.deliveryDate}</strong>
                        </p>
                      </div>

                      <div>
                        <span className="text-zinc-500 font-semibold block mb-0.5">SPECIAL PRINTING NOTES</span>
                        <p className="text-zinc-400 italic bg-zinc-900 p-2 rounded-lg border border-zinc-800 text-[11px]">
                          {quote.notes || 'No specific notes provided.'}
                        </p>
                      </div>
                    </div>

                    {/* Uploaded Customer Design / Team Crest Section */}
                    {quote.logoUrl && (
                      <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white flex items-center gap-2">
                            <FileImage className="w-4 h-4 text-[#d4af37]" />
                            Customer Uploaded Team Crest / Jersey Artwork:
                          </span>
                          <button
                            onClick={() => handleDownloadFile(quote.logoUrl!, quote.logoFileName || `team_crest_${quote.id}.png`)}
                            className="px-3 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#e6c148] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
                          >
                            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                            Download Artwork File
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <img
                            src={quote.logoUrl}
                            alt="Uploaded logo"
                            className="w-20 h-20 rounded-xl object-contain bg-zinc-950 p-1 border border-zinc-700 cursor-pointer hover:opacity-80 transition-all"
                            onClick={() => setEnlargedImage(quote.logoUrl!)}
                            title="Click to zoom artwork"
                          />
                          <div className="text-xs space-y-1">
                            <p className="font-bold text-white">{quote.logoFileName || 'Customer_Team_Crest.png'}</p>
                            <p className="text-zinc-500 text-[11px]">Original resolution vector/raster artwork ready for dye-sublimation</p>
                            <button
                              onClick={() => setEnlargedImage(quote.logoUrl!)}
                              className="text-[#d4af37] hover:underline font-semibold text-[11px] flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              View High-Res Preview
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Player Roster Breakdown */}
                    {quote.roster && quote.roster.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-white uppercase tracking-wider block">
                          Player Roster &amp; Sizes ({quote.roster.length} Players):
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs">
                          {quote.roster.map((player, idx) => (
                            <div key={idx} className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-mono font-bold text-[#d4af37]">#{player.number || '-'}</span>
                                <span className="px-1.5 py-0.2 rounded bg-zinc-800 text-[10px] font-mono text-zinc-300">
                                  {player.size}
                                </span>
                              </div>
                              <p className="font-bold text-white truncate text-[11px]">{player.name || 'Unnamed'}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: BULK TEAM POSTERS (Section 2 & 3 requirements) */}
        {/* ========================================================================= */}
        {activeTab === 'bulk-posters' && (
          <div className="space-y-6 pt-6 animate-in fade-in">
            <div className="space-y-4">
              {bulkPosters.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-[#131317] border border-zinc-800 text-zinc-400">
                  <FileImage className="w-10 h-10 mx-auto text-zinc-600 mb-2" />
                  <p className="font-bold text-white">No bulk team poster orders placed yet.</p>
                </div>
              ) : (
                bulkPosters.map(order => (
                  <div 
                    key={order.id} 
                    className="p-6 rounded-2xl bg-[#131317] border border-zinc-800 space-y-5 hover:border-zinc-700 transition-all"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-800 gap-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-base font-bold text-white">{order.teamName}</h3>
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 uppercase">
                            Team Poster
                          </span>
                        </div>
                        <span className="text-xs text-zinc-500 font-mono mt-0.5 block">
                          Order ID: {order.id} &bull; Placed: {new Date(order.createdAt).toLocaleDateString('en-GB')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-400 font-semibold">Status:</span>
                        <select
                          value={order.status}
                          onChange={e => onUpdateBulkPosterStatus(order.id, e.target.value)}
                          className="bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white font-bold cursor-pointer focus:outline-none focus:border-[#d4af37]"
                        >
                          <option value="Submitted">Submitted</option>
                          <option value="Reviewing">Reviewing</option>
                          <option value="In Production">In Production</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
                      <div>
                        <span className="text-zinc-500 font-semibold block mb-0.5">CONTACT DETAILS</span>
                        <p className="font-bold text-white">{order.contactName}</p>
                        <p className="text-zinc-400 flex items-center gap-1 mt-0.5"><Mail className="w-3 h-3 text-[#d4af37]" /> {order.email}</p>
                        <p className="text-zinc-400 flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3 text-[#d4af37]" /> {order.phone}</p>
                      </div>

                      <div>
                        <span className="text-zinc-500 font-semibold block mb-0.5">POSTER SPECIFICATIONS</span>
                        <p className="text-zinc-300">Dimensions: <strong className="text-white">{order.posterSize}</strong></p>
                        <p className="text-zinc-300">Paper Finish: <strong className="text-white">{order.paperFinish}</strong></p>
                        <p className="text-zinc-300">Quantity: <strong className="text-[#d4af37] font-mono">{order.quantity} posters</strong></p>
                        <p className="text-base font-black text-[#d4af37] mt-1 font-mono">Est. Total: ₹{order.estimatedPrice?.toLocaleString('en-IN')}</p>
                      </div>

                      <div>
                        <span className="text-zinc-500 font-semibold block mb-0.5">DELIVERY &amp; PRINT NOTES</span>
                        <p className="text-zinc-300 mb-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#d4af37]" /> Delivery Deadline: <strong className="text-white">{order.deliveryDate}</strong>
                        </p>
                        <p className="text-zinc-400 italic bg-zinc-900 p-2 rounded-lg border border-zinc-800 text-[11px]">
                          {order.notes || 'No special instructions.'}
                        </p>
                      </div>
                    </div>

                    {/* Customer-Uploaded Poster Artwork Card */}
                    {order.artworkUrl && (
                      <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white flex items-center gap-2">
                            <FileImage className="w-4 h-4 text-[#d4af37]" />
                            Uploaded High-Resolution Poster Artwork:
                          </span>
                          <button
                            onClick={() => handleDownloadFile(order.artworkUrl!, order.artworkFileName || `team_poster_${order.id}.png`)}
                            className="px-3.5 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#e6c148] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
                          >
                            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                            Download Poster File
                          </button>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <img
                            src={order.artworkUrl}
                            alt="Uploaded poster artwork"
                            className="w-28 h-20 rounded-xl object-cover bg-zinc-950 border border-zinc-700 cursor-pointer hover:opacity-80 transition-all shrink-0"
                            onClick={() => setEnlargedImage(order.artworkUrl!)}
                            title="Click to view full poster image"
                          />
                          <div className="text-xs space-y-1">
                            <p className="font-bold text-white text-sm">{order.artworkFileName || 'Team_Championship_Poster.jpg'}</p>
                            <p className="text-zinc-400 text-[11px]">Direct file received from customer device. Ready for large-format offset &amp; fine-art printing.</p>
                            <button
                              onClick={() => setEnlargedImage(order.artworkUrl!)}
                              className="text-[#d4af37] hover:underline font-semibold text-xs flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              View High-Res Poster
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: REPORTS & SALES */}
        {/* ========================================================================= */}
        {activeTab === 'reports' && (
          <div className="space-y-6 pt-6 animate-in fade-in">
            <div className="p-6 rounded-2xl bg-[#131317] border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <h3 className="text-sm font-bold text-white">Financial &amp; Manufacturing Report</h3>
                  <p className="text-xs text-zinc-400">Live aggregated metrics calculated from registered store orders</p>
                </div>
                <button
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8," + 
                      ["Order ID,Customer,Total,Status,Date", ...orders.map(o => `${o.id},${o.customerName},${o.total},${o.status},${o.createdAt}`)].join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", "Arise_Aura_Sales_Report.csv");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold flex items-center gap-1.5 text-white border border-zinc-700"
                >
                  <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Download Report (CSV)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-500 font-semibold">Gross Sales</span>
                  <p className="text-xl font-bold text-white mt-1">₹ {totalSalesAmount.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-500 font-semibold">Estimated COGS (Fabric &amp; Ink)</span>
                  <p className="text-xl font-bold text-white mt-1">₹ {Math.round(totalSalesAmount * 0.38).toLocaleString('en-IN')}</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-500 font-semibold">Net Operating Margin</span>
                  <p className="text-xl font-bold text-emerald-400 mt-1">
                    ₹ {Math.round(totalSalesAmount * 0.62).toLocaleString('en-IN')} (62.0%)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT PRODUCT (With Local Image Upload) */}
      {/* ========================================================================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl rounded-3xl bg-[#141418] border border-zinc-800 p-6 sm:p-8 space-y-5 text-white max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-black font-['Outfit'] text-white">
                  {editingProductId ? 'Edit Product Details' : 'Add New Catalog Product'}
                </h3>
                <p className="text-xs text-zinc-400">
                  {editingProductId ? `Updating SKU: ${editingProductId}` : 'Creates a new product item visible on the customer storefront'}
                </p>
              </div>
              <button 
                onClick={() => setIsProductModalOpen(false)} 
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              {/* Product Title */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  placeholder="e.g. Vintage Wash Champions Football Jersey"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Category & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Printed T-Shirts">Printed T-Shirts</option>
                    <option value="Oversized T-Shirts">Oversized T-Shirts</option>
                    <option value="Polo T-Shirts">Polo T-Shirts</option>
                    <option value="Football Jerseys">Football Jerseys</option>
                    <option value="Cricket Jerseys">Cricket Jerseys</option>
                    <option value="Team Jerseys">Team Jerseys</option>
                    <option value="Custom Team Jerseys">Custom Team Jerseys</option>
                    <option value="Custom Jerseys">Custom Jerseys</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formStock}
                    onChange={e => setFormStock(parseInt(e.target.value) || 0)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Offer / Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formPrice}
                    onChange={e => setFormPrice(parseInt(e.target.value) || 0)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Original Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formOriginalPrice}
                    onChange={e => setFormOriginalPrice(parseInt(e.target.value) || 0)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* LOCAL IMAGE UPLOAD SECTION (Section 1 requirement) */}
              <div className="space-y-2 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <label className="text-xs font-bold text-white flex items-center justify-between">
                  <span>Product Main Image *</span>
                  <span className="text-[11px] text-[#d4af37] font-normal">Direct from Local Device or URL</span>
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Image Preview */}
                  {formImage ? (
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900 shrink-0">
                      <img src={formImage} alt="Main preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormImage('')}
                        className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-rose-600 rounded text-white"
                        title="Remove"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-xl border border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-500 shrink-0 text-[10px]">
                      <ImageIcon className="w-6 h-6 mb-1" />
                      <span>No image</span>
                    </div>
                  )}

                  {/* Upload Controls */}
                  <div className="flex-1 space-y-2 w-full">
                    {/* Device Upload Input */}
                    <div className="relative">
                      <label className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-white flex items-center justify-center gap-2 cursor-pointer transition-all">
                        <UploadCloud className="w-4 h-4 text-[#d4af37]" />
                        <span>Select Image From Local Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => handleLocalImageUpload(e, true)}
                        />
                      </label>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-500 uppercase">OR URL:</span>
                      <input
                        type="url"
                        value={formImage}
                        onChange={e => setFormImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Images Upload */}
                <div className="pt-2 border-t border-zinc-800/80">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold text-zinc-400">Additional Gallery Images:</span>
                    <label className="text-[10px] text-[#d4af37] hover:underline font-bold cursor-pointer flex items-center gap-1">
                      <Plus className="w-3 h-3" />
                      Add More From Device
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => handleLocalImageUpload(e, false)}
                      />
                    </label>
                  </div>
                  {formAdditionalImages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formAdditionalImages.map((img, idx) => (
                        <div key={idx} className="relative w-12 h-12 rounded-lg overflow-hidden border border-zinc-700">
                          <img src={img} alt="Additional" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setFormAdditionalImages(prev => prev.filter((_, i) => i !== idx))}
                            className="absolute top-0.5 right-0.5 p-0.5 bg-black/80 hover:bg-rose-600 rounded text-white"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sizes Selection */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Available Garment Sizes</label>
                <div className="flex flex-wrap gap-2">
                  {ALL_SIZES.map(s => {
                    const isSelected = formSizes.includes(s);
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() => handleToggleSize(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                          isSelected
                            ? 'bg-[#d4af37] text-black border border-[#d4af37]'
                            : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colors Management */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Available Colors</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formColors.map((c, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs"
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-zinc-700" style={{ backgroundColor: c.hex }} />
                      <span className="text-zinc-300">{c.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(c.hex)}
                        className="p-0.5 text-zinc-500 hover:text-rose-400 ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={newColorHex}
                    onChange={e => setNewColorHex(e.target.value)}
                    className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={newColorName}
                    onChange={e => setNewColorName(e.target.value)}
                    placeholder="Color Name (e.g. Royal Gold)"
                    className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white"
                  >
                    Add Color
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Technical Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Fabric</label>
                  <input
                    type="text"
                    value={formFabric}
                    onChange={e => setFormFabric(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Fit</label>
                  <input
                    type="text"
                    value={formFit}
                    onChange={e => setFormFit(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">GSM</label>
                  <input
                    type="text"
                    value={formGsm}
                    onChange={e => setFormGsm(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* Badges Toggle */}
              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsBestSeller}
                    onChange={e => setFormIsBestSeller(e.target.checked)}
                    className="accent-[#d4af37] w-4 h-4 rounded"
                  />
                  <span>Best Seller Badge</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsTrending}
                    onChange={e => setFormIsTrending(e.target.checked)}
                    className="accent-[#d4af37] w-4 h-4 rounded"
                  />
                  <span>Trending Badge</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsNewArrival}
                    onChange={e => setFormIsNewArrival(e.target.checked)}
                    className="accent-[#d4af37] w-4 h-4 rounded"
                  />
                  <span>New Arrival Badge</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#d4af37] hover:bg-[#e6c148] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#d4af37]/20 transition-all"
                >
                  {editingProductId ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: FULL ORDER DETAILS & INVOICE SLIP */}
      {/* ========================================================================= */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-xl rounded-3xl bg-[#141418] border border-zinc-800 p-6 space-y-5 text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-[#d4af37]" />
                <h3 className="text-base font-bold">Order Details &amp; Packaging Slip</h3>
              </div>
              <button onClick={() => setSelectedOrderDetails(null)} className="p-1 text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800 font-mono">
                <div>
                  <span className="text-zinc-500 block">ORDER ID</span>
                  <span className="text-base font-bold text-[#d4af37]">{selectedOrderDetails.id}</span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-500 block">ORDER DATE</span>
                  <span className="text-white">{new Date(selectedOrderDetails.createdAt).toLocaleDateString('en-GB')}</span>
                </div>
              </div>

              <div>
                <span className="text-zinc-400 font-semibold block mb-1 uppercase">Customer &amp; Shipping</span>
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
                  <p className="font-bold text-white text-sm">{selectedOrderDetails.customerName}</p>
                  <p className="text-zinc-400">{selectedOrderDetails.email} &bull; {selectedOrderDetails.phone}</p>
                  <p className="text-zinc-300 pt-1">
                    {selectedOrderDetails.shippingAddress?.addressLine}, {selectedOrderDetails.shippingAddress?.city}, {selectedOrderDetails.shippingAddress?.state} - {selectedOrderDetails.shippingAddress?.pincode}
                  </p>
                </div>
              </div>

              {/* Payment Information & Screenshot */}
              <div>
                <span className="text-zinc-400 font-semibold block mb-1 uppercase">Payment &amp; Proof</span>
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-300">Method: <strong className="text-white">{selectedOrderDetails.paymentMethod}</strong></p>
                      <p className="text-zinc-300">Status: <strong className="text-emerald-400">{selectedOrderDetails.paymentStatus}</strong></p>
                      {selectedOrderDetails.upiId && <p className="text-zinc-400 font-mono text-[11px]">UPI: {selectedOrderDetails.upiId}</p>}
                      {selectedOrderDetails.transactionRef && <p className="text-zinc-400 font-mono text-[11px]">UTR / Ref: <strong className="text-white">{selectedOrderDetails.transactionRef}</strong></p>}
                    </div>
                  </div>

                  {selectedOrderDetails.paymentScreenshotUrl && (
                    <div className="pt-2 border-t border-zinc-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={selectedOrderDetails.paymentScreenshotUrl}
                          alt="Payment Screenshot"
                          className="w-12 h-12 rounded-lg object-cover bg-black border border-zinc-700 cursor-pointer"
                          onClick={() => setEnlargedImage(selectedOrderDetails.paymentScreenshotUrl!)}
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] text-emerald-400 font-bold uppercase block">Payment Screenshot Attached</span>
                          <span className="text-[11px] text-zinc-300 truncate block">{selectedOrderDetails.paymentScreenshotFileName || 'Proof.png'}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setEnlargedImage(selectedOrderDetails.paymentScreenshotUrl!)}
                        className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-[#d4af37] text-zinc-200 hover:text-black font-bold text-xs"
                      >
                        Inspect
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <span className="text-zinc-400 font-semibold block mb-1 uppercase">Products in Package</span>
                <div className="space-y-2">
                  {selectedOrderDetails.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                      <div className="flex items-center gap-2.5">
                        <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-white">{item.title}</p>
                          <p className="text-zinc-400 text-[11px]">Size: {item.size} &bull; Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-white">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-sm font-bold">
                <span>Total Order Value:</span>
                <span className="text-[#d4af37] font-mono text-base">₹{selectedOrderDetails.total}</span>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Packaging Slip</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ENLARGED ARTWORK VIEW */}
      {/* ========================================================================= */}
      {enlargedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setEnlargedImage(null)}
        >
          <div className="relative max-w-3xl max-h-[85vh] p-2 bg-[#141418] rounded-2xl border border-zinc-800">
            <button
              onClick={() => setEnlargedImage(null)}
              className="absolute -top-3 -right-3 p-1.5 bg-zinc-900 border border-zinc-700 rounded-full text-white hover:bg-rose-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={enlargedImage} alt="Enlarged high-res view" className="max-w-full max-h-[80vh] rounded-xl object-contain mx-auto" />
            <div className="p-3 text-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadFile(enlargedImage, 'artwork_download.png');
                }}
                className="px-4 py-1.5 rounded-xl bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download Original File
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
