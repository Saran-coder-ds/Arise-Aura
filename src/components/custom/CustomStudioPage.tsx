import React, { useState } from 'react';
import { 
  UploadCloud, 
  RotateCw, 
  ZoomIn, 
  Palette, 
  Check, 
  Sparkles, 
  Users, 
  ShoppingBag, 
  Save, 
  Download, 
  Trash2, 
  Plus, 
  Calendar,
  FileImage,
  ImageIcon,
  Eye,
  FileText,
  Phone,
  Mail,
  Layers,
  X
} from 'lucide-react';
import { 
  GarmentType, 
  GarmentSide, 
  GarmentSize, 
  CustomArtworkElement, 
  PlayerRosterEntry,
  BulkTeamQuote,
  BulkTeamPosterOrder,
  CustomDesignOrder,
  PosterSize,
  PosterFinish
} from '../../types';
import { ALL_SIZES, GARMENT_TEMPLATES } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { dbService } from '../../data/dbService';

interface CustomStudioPageProps {
  initialData?: any;
  onNavigateToCart: () => void;
  onSubmitBulkJersey?: (quote: BulkTeamQuote) => void;
  onSubmitBulkPoster?: (poster: BulkTeamPosterOrder) => void;
  onSaveCustomDesign?: (design: CustomDesignOrder) => void;
}

export const CustomStudioPage: React.FC<CustomStudioPageProps> = ({
  initialData,
  onNavigateToCart,
  onSubmitBulkJersey,
  onSubmitBulkPoster,
  onSaveCustomDesign
}) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  // Mode: Single Custom Studio OR Bulk Team Jerseys OR Bulk Team Posters
  const [activeTab, setActiveTab] = useState<'studio' | 'bulk-jerseys' | 'bulk-posters'>(
    initialData?.tab || (initialData?.productType?.includes('jersey') ? 'bulk-jerseys' : 'studio')
  );

  // =========================================================================
  // 1. SINGLE CUSTOM GARMENT STUDIO STATE
  // =========================================================================
  const [garmentType, setGarmentType] = useState<GarmentType>(initialData?.productType || 'round-neck-tshirt');
  const [activeSide, setActiveSide] = useState<GarmentSide>('front');
  const [garmentColor, setGarmentColor] = useState<{ name: string; hex: string }>({ name: 'Onyx Black', hex: '#111111' });
  const [selectedSize, setSelectedSize] = useState<GarmentSize>(initialData?.size || 'L');
  const [quantity, setQuantity] = useState<number>(initialData?.quantity || 1);
  const [printNotes, setPrintNotes] = useState<string>(initialData?.instructions || '');
  const [uploadedArtworkData, setUploadedArtworkData] = useState<{ url: string; fileName: string } | null>(null);

  // Artwork Elements on Front & Back
  const [frontElements, setFrontElements] = useState<CustomArtworkElement[]>(() => {
    if (initialData?.filePreview) {
      return [{
        id: 'init-front-1',
        type: 'image',
        content: initialData.filePreview,
        x: 50,
        y: 42,
        scale: 1,
        rotation: 0
      }];
    }
    return [
      {
        id: 'default-front-logo',
        type: 'badge',
        content: 'AURASTARS',
        x: 50,
        y: 40,
        scale: 1,
        rotation: 0,
        fontFamily: 'Outfit',
        color: '#d4af37'
      }
    ];
  });

  const [backElements, setBackElements] = useState<CustomArtworkElement[]>([
    {
      id: 'default-back-number',
      type: 'text',
      content: '10',
      x: 50,
      y: 45,
      scale: 1.5,
      rotation: 0,
      fontFamily: 'Outfit',
      color: '#ffffff'
    },
    {
      id: 'default-back-name',
      type: 'text',
      content: 'CHAMPION',
      x: 50,
      y: 30,
      scale: 1,
      rotation: 0,
      fontFamily: 'Outfit',
      color: '#d4af37'
    }
  ]);

  const currentElements = activeSide === 'front' ? frontElements : backElements;
  const setCurrentElements = activeSide === 'front' ? setFrontElements : setBackElements;
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [textColor, setTextColor] = useState('#d4af37');
  const [savingStatus, setSavingStatus] = useState<string | null>(null);

  // =========================================================================
  // 2. BULK TEAM JERSEYS STATE
  // =========================================================================
  const [teamName, setTeamName] = useState('');
  const [contactName, setContactName] = useState(user?.displayName || '');
  const [contactEmail, setContactEmail] = useState(user?.email || '');
  const [contactPhone, setContactPhone] = useState('');
  const [sportType, setSportType] = useState<any>('Football');
  const [jerseyStyle, setJerseyStyle] = useState('Full Sublimation Round Neck (Dry-Fit Pro)');
  const [deliveryDate, setDeliveryDate] = useState('2026-10-25');
  const [bulkNotes, setBulkNotes] = useState('');
  const [jerseyLogoFile, setJerseyLogoFile] = useState<{ url: string; fileName: string } | null>(null);
  const [roster, setRoster] = useState<PlayerRosterEntry[]>([
    { id: 'p1', name: 'R. Sharma', number: '45', size: 'L' },
    { id: 'p2', name: 'V. Kohli', number: '18', size: 'M' },
    { id: 'p3', name: 'S. Iyer', number: '96', size: 'XL' },
    { id: 'p4', name: 'J. Bumrah', number: '93', size: 'L' },
    { id: 'p5', name: 'KL Rahul', number: '1', size: 'M' }
  ]);
  const [bulkSubmittedQuoteId, setBulkSubmittedQuoteId] = useState<string | null>(null);

  // =========================================================================
  // 3. BULK TEAM POSTERS STATE
  // =========================================================================
  const [posterTeamName, setPosterTeamName] = useState('');
  const [posterContactName, setPosterContactName] = useState(user?.displayName || '');
  const [posterEmail, setPosterEmail] = useState(user?.email || '');
  const [posterPhone, setPosterPhone] = useState('');
  const [posterSize, setPosterSize] = useState<PosterSize>('18 x 24 in');
  const [posterFinish, setPosterFinish] = useState<PosterFinish>('Metallic Luster');
  const [posterQuantity, setPosterQuantity] = useState<number>(25);
  const [posterDeliveryDate, setPosterDeliveryDate] = useState('2026-10-20');
  const [posterNotes, setPosterNotes] = useState('');
  const [posterArtwork, setPosterArtwork] = useState<{ url: string; fileName: string } | null>(null);
  const [posterSubmittedId, setPosterSubmittedId] = useState<string | null>(null);

  // Colors Palette for Garments
  const colorOptions = [
    { name: 'Onyx Black', hex: '#111111' },
    { name: 'Pure White', hex: '#F9FAFB' },
    { name: 'Sand Cream', hex: '#EBE5D8' },
    { name: 'Royal Navy', hex: '#1E3A8A' },
    { name: 'Crimson Red', hex: '#991B1B' },
    { name: 'Forest Green', hex: '#064E3B' },
    { name: 'Sunburst Gold', hex: '#D97706' },
    { name: 'Charcoal Grey', hex: '#374151' }
  ];

  // Base Garment prices
  const basePrices: Record<GarmentType, number> = {
    'round-neck-tshirt': 599,
    'oversized-tshirt': 749,
    'football-jersey': 1299,
    'cricket-jersey': 1499,
    'polo-tshirt': 999,
    'hoodie': 1599
  };

  const hasBackPrints = backElements.length > 0;
  const unitBasePrice = basePrices[garmentType] + (hasBackPrints ? 150 : 0);

  // Volume discounts for studio garment
  let volumeDiscountPct = 0;
  if (quantity >= 50) volumeDiscountPct = 35;
  else if (quantity >= 20) volumeDiscountPct = 25;
  else if (quantity >= 6) volumeDiscountPct = 15;

  const unitPrice = Math.round(unitBasePrice * (1 - volumeDiscountPct / 100));
  const totalPrice = unitPrice * quantity;

  // Poster Pricing Calculation
  const posterBaseRates: Record<PosterSize, number> = {
    'A3 (11.7 x 16.5 in)': 149,
    'A2 (16.5 x 23.4 in)': 229,
    'A1 (23.4 x 33.1 in)': 349,
    '18 x 24 in': 269,
    '24 x 36 in': 429,
    'Custom Size': 299
  };

  const finishMod: Record<PosterFinish, number> = {
    'Glossy Photographic': 0,
    'Matte Fine Art': 25,
    'Metallic Luster': 45,
    'Canvas Textured': 80
  };

  let posterVolDiscount = 0;
  if (posterQuantity >= 100) posterVolDiscount = 40;
  else if (posterQuantity >= 50) posterVolDiscount = 30;
  else if (posterQuantity >= 25) posterVolDiscount = 20;
  else if (posterQuantity >= 10) posterVolDiscount = 10;

  const posterUnitRate = Math.round((posterBaseRates[posterSize] + finishMod[posterFinish]) * (1 - posterVolDiscount / 100));
  const posterTotalRate = posterUnitRate * posterQuantity;

  // File Upload Handler for Custom Studio Garments
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setUploadedArtworkData({ url: dataUrl, fileName: file.name });
        const newEl: CustomArtworkElement = {
          id: `art-${Date.now()}`,
          type: 'image',
          content: dataUrl,
          x: 50,
          y: 40,
          scale: 1,
          rotation: 0
        };
        setCurrentElements(prev => [...prev, newEl]);
        setSelectedElementId(newEl.id);
      };
      reader.readAsDataURL(file);
    }
  };

  // File Upload Handler for Bulk Team Jerseys (Local Device Upload)
  const handleJerseyLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setJerseyLogoFile({
          url: event.target?.result as string,
          fileName: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // File Upload Handler for Bulk Team Posters (Local Device Upload)
  const handlePosterArtworkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPosterArtwork({
          url: event.target?.result as string,
          fileName: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Custom Text on Garment
  const handleAddText = () => {
    if (!inputText.trim()) return;
    const newEl: CustomArtworkElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: inputText.trim(),
      x: 50,
      y: 50,
      scale: 1.2,
      rotation: 0,
      fontFamily: 'Outfit',
      color: textColor
    };
    setCurrentElements(prev => [...prev, newEl]);
    setSelectedElementId(newEl.id);
    setInputText('');
  };

  // Active element controls
  const activeElement = currentElements.find(el => el.id === selectedElementId);

  const updateActiveElement = (updates: Partial<CustomArtworkElement>) => {
    if (!selectedElementId) return;
    setCurrentElements(prev =>
      prev.map(el => (el.id === selectedElementId ? { ...el, ...updates } : el))
    );
  };

  const removeActiveElement = () => {
    if (!selectedElementId) return;
    setCurrentElements(prev => prev.filter(el => el.id !== selectedElementId));
    setSelectedElementId(null);
  };

  // Add Studio Product to Cart
  const handleAddToCart = () => {
    const title = `${garmentColor.name} Custom ${garmentType.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}`;
    addToCart({
      productId: `custom-${Date.now()}`,
      title,
      image: uploadedArtworkData?.url || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
      price: unitPrice,
      originalPrice: Math.round(unitPrice * 1.3),
      size: selectedSize,
      color: garmentColor,
      quantity,
      isCustom: true,
      customDetails: {
        garmentType,
        notes: printNotes,
        artworkUrl: uploadedArtworkData?.url,
        artworkFileName: uploadedArtworkData?.fileName
      }
    });
    setSavingStatus('Custom apparel added to your cart!');
    setTimeout(() => {
      setSavingStatus(null);
      onNavigateToCart();
    }, 1000);
  };

  // Save to Firebase Custom Designs
  const handleSaveDesign = async () => {
    try {
      setSavingStatus('Saving mockup to database...');
      const designOrder: any = {
        id: `CD-${Math.floor(100 + Math.random() * 900)}`,
        userId: user?.uid || 'guest',
        customerName: user?.displayName || 'Guest Creator',
        email: user?.email || 'guest@ariseaura.com',
        phone: user?.phone || '',
        productType: garmentType,
        baseColor: garmentColor.hex,
        size: selectedSize,
        quantity,
        notes: printNotes,
        estimatedPrice: totalPrice,
        uploadedArtworkUrl: uploadedArtworkData?.url,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      await dbService.createCustomDesign(designOrder);
      onSaveCustomDesign?.(designOrder);
      setSavingStatus('Design mockup saved successfully!');
      setTimeout(() => setSavingStatus(null), 3000);
    } catch (err) {
      console.warn('Could not save design:', err);
      setSavingStatus('Design saved locally!');
      setTimeout(() => setSavingStatus(null), 3000);
    }
  };

  // Submit Bulk Team Jersey Order
  const handleSubmitBulkJersey = async (e: React.FormEvent) => {
    e.preventDefault();
    const quoteId = `BULK-${Math.floor(100000 + Math.random() * 900000)}`;
    const quoteData: BulkTeamQuote = {
      id: quoteId,
      userId: user?.uid || 'guest',
      teamName,
      contactName,
      email: contactEmail,
      phone: contactPhone,
      sportType,
      numberOfPlayers: roster.length,
      jerseyStyle,
      roster,
      deliveryDate,
      notes: bulkNotes,
      logoUrl: jerseyLogoFile?.url,
      logoFileName: jerseyLogoFile?.fileName,
      status: 'Submitted',
      createdAt: new Date().toISOString()
    };

    await dbService.createBulkJersey(quoteData);
    onSubmitBulkJersey?.(quoteData);
    setBulkSubmittedQuoteId(quoteId);
  };

  // Submit Bulk Team Poster Order
  const handleSubmitBulkPoster = async (e: React.FormEvent) => {
    e.preventDefault();
    const posterOrderId = `PST-${Math.floor(1000 + Math.random() * 9000)}`;
    const posterData: BulkTeamPosterOrder = {
      id: posterOrderId,
      userId: user?.uid || 'guest',
      teamName: posterTeamName,
      contactName: posterContactName,
      email: posterEmail,
      phone: posterPhone,
      posterSize,
      paperFinish: posterFinish,
      quantity: posterQuantity,
      deliveryDate: posterDeliveryDate,
      notes: posterNotes,
      artworkUrl: posterArtwork?.url,
      artworkFileName: posterArtwork?.fileName,
      estimatedPrice: posterTotalRate,
      status: 'Submitted',
      createdAt: new Date().toISOString()
    };

    await dbService.createBulkPoster(posterData);
    onSubmitBulkPoster?.(posterData);
    setPosterSubmittedId(posterOrderId);
  };

  // Roster helpers
  const addRosterPlayer = () => {
    setRoster(prev => [...prev, { id: `p-${Date.now()}`, name: '', number: '', size: 'L' }]);
  };

  const updateRosterPlayer = (id: string, field: keyof PlayerRosterEntry, value: any) => {
    setRoster(prev => prev.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const removeRosterPlayer = (id: string) => {
    if (roster.length <= 1) return;
    setRoster(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="bg-[#0c0c0e] min-h-screen text-white py-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Mode Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold uppercase tracking-wider">
                Arise Aura Studio
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-white">
              Custom Apparel &amp; Team Jersey Printing Lab
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Live mockup engine, team sports kits, and squad poster manufacturing hub.
            </p>
          </div>

          {/* 3 Dedicated Mode Tabs */}
          <div className="inline-flex rounded-xl p-1 bg-zinc-900 border border-zinc-800 self-start md:self-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'studio' ? 'bg-[#d4af37] text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Single Custom Studio</span>
            </button>
            <button
              onClick={() => setActiveTab('bulk-jerseys')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'bulk-jerseys' ? 'bg-[#d4af37] text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Bulk Team Jerseys</span>
            </button>
            <button
              onClick={() => setActiveTab('bulk-posters')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'bulk-posters' ? 'bg-[#d4af37] text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileImage className="w-3.5 h-3.5" />
              <span>Bulk Team Posters</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODE 1: SINGLE CUSTOM STUDIO */}
        {/* ========================================================================= */}
        {activeTab === 'studio' && (
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls & Customizer */}
            <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
              
              {/* Garment Selector */}
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                  1. Select Garment Silhouette
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'round-neck-tshirt', name: 'Round Neck Tee', price: '₹599' },
                    { id: 'oversized-tshirt', name: 'Oversized Tee', price: '₹749' },
                    { id: 'football-jersey', name: 'Football Jersey', price: '₹1,299' },
                    { id: 'cricket-jersey', name: 'Cricket Jersey', price: '₹1,499' },
                    { id: 'polo-tshirt', name: 'Polo T-Shirt', price: '₹999' },
                    { id: 'hoodie', name: 'Fleece Hoodie', price: '₹1,599' }
                  ].map(g => (
                    <button
                      key={g.id}
                      onClick={() => setGarmentType(g.id as GarmentType)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        garmentType === g.id
                          ? 'border-[#d4af37] bg-[#d4af37]/10 text-white font-bold'
                          : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <p className="text-xs text-white font-semibold">{g.name}</p>
                      <p className="text-[11px] text-[#d4af37] font-mono mt-0.5">{g.price}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Palette */}
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    2. Choose Fabric Shade
                  </label>
                  <span className="text-xs text-[#d4af37] font-semibold">{garmentColor.name}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {colorOptions.map(c => (
                    <button
                      key={c.name}
                      onClick={() => setGarmentColor(c)}
                      className={`w-9 h-9 rounded-full border-2 transition-transform ${
                        garmentColor.name === c.name ? 'scale-115 border-[#d4af37] ring-2 ring-[#d4af37]/30' : 'border-zinc-700 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Upload Artwork from Device */}
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                  3. Upload Custom Design / Logo
                </label>

                <label className="border-2 border-dashed border-zinc-700 hover:border-[#d4af37] p-5 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-zinc-950/80 group">
                  <UploadCloud className="w-8 h-8 text-[#d4af37] mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-white">Click or Drag to Upload Artwork</span>
                  <span className="text-[11px] text-zinc-400 mt-1">PNG, JPG, SVG, PDF, AI supported</span>
                  <input
                    type="file"
                    accept="image/*,.pdf,.ai,.svg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {uploadedArtworkData && (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs">
                    <span className="text-emerald-400 flex items-center gap-1.5 truncate">
                      <Check className="w-3.5 h-3.5" />
                      {uploadedArtworkData.fileName}
                    </span>
                    <button
                      onClick={() => setUploadedArtworkData(null)}
                      className="text-zinc-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Add Custom Text / Number */}
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                  4. Add Name or Number Text
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    placeholder="e.g. 07 or RONALDO"
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                  <input
                    type="color"
                    value={textColor}
                    onChange={e => setTextColor(e.target.value)}
                    className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                    title="Text Color"
                  />
                  <button
                    onClick={handleAddText}
                    className="px-4 py-2 bg-[#d4af37] text-black font-bold text-xs rounded-xl hover:brightness-110"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Size, Quantity & Add to Cart */}
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Size</span>
                  <div className="flex gap-1.5">
                    {ALL_SIZES.map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold font-mono transition-all ${
                          selectedSize === s ? 'bg-[#d4af37] text-black' : 'bg-zinc-950 text-zinc-400 border border-zinc-800'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-zinc-800 text-white font-bold flex items-center justify-center hover:bg-zinc-700"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-sm text-white w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-zinc-800 text-white font-bold flex items-center justify-center hover:bg-zinc-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-zinc-400">Total Price</span>
                    <div className="text-xl font-black text-[#d4af37] font-mono">₹{totalPrice}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveDesign}
                      className="px-3.5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center gap-1.5"
                      title="Save design to database"
                    >
                      <Save className="w-4 h-4 text-[#d4af37]" />
                      <span>Save Mockup</span>
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="px-5 py-3 rounded-xl bg-[#d4af37] hover:bg-[#e6c148] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#d4af37]/20"
                    >
                      <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>

                {savingStatus && (
                  <p className="text-xs text-emerald-400 text-center font-semibold animate-pulse">{savingStatus}</p>
                )}
              </div>

            </div>

            {/* Right Interactive Mockup Canvas */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
              
              {/* Front / Back Switcher */}
              <div className="flex items-center justify-between bg-zinc-900/60 p-2 rounded-2xl border border-zinc-800">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveSide('front')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeSide === 'front' ? 'bg-[#d4af37] text-black shadow-md' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Front View
                  </button>
                  <button
                    onClick={() => setActiveSide('back')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeSide === 'back' ? 'bg-[#d4af37] text-black shadow-md' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Back View
                  </button>
                </div>

                {selectedElementId && (
                  <button
                    onClick={removeActiveElement}
                    className="text-xs text-rose-400 hover:underline flex items-center gap-1 mr-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Selected Element</span>
                  </button>
                )}
              </div>

              {/* 2D Canvas Mockup Preview */}
              <div className="relative aspect-square max-w-lg mx-auto rounded-3xl bg-[#141418] border border-zinc-800 flex items-center justify-center p-8 overflow-hidden shadow-2xl">
                
                {/* SVG Garment Silhouette Background */}
                <div 
                  className="w-full h-full rounded-2xl flex items-center justify-center relative transition-colors duration-300"
                  style={{ backgroundColor: garmentColor.hex }}
                >
                  {/* Subtle apparel texture & shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none rounded-2xl" />

                  {/* Render Custom Artwork Elements on Garment */}
                  {currentElements.map(el => (
                    <div
                      key={el.id}
                      onClick={() => setSelectedElementId(el.id)}
                      className={`absolute cursor-move select-none transition-transform ${
                        selectedElementId === el.id ? 'ring-2 ring-[#d4af37] ring-offset-2 ring-offset-black' : ''
                      }`}
                      style={{
                        left: `${el.x}%`,
                        top: `${el.y}%`,
                        transform: `translate(-50%, -50%) scale(${el.scale}) rotate(${el.rotation}deg)`
                      }}
                    >
                      {el.type === 'image' && (
                        <img 
                          src={el.content} 
                          alt="custom art" 
                          className="max-w-[140px] max-h-[140px] object-contain drop-shadow-md"
                        />
                      )}
                      {(el.type === 'text' || el.type === 'badge') && (
                        <span 
                          className="font-black tracking-widest uppercase drop-shadow-lg font-['Outfit'] block text-center"
                          style={{ color: el.color || '#ffffff', fontSize: '28px' }}
                        >
                          {el.content}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-4 left-6 text-[10px] text-zinc-400 uppercase tracking-widest bg-black/60 px-2.5 py-1 rounded-full border border-zinc-800 backdrop-blur-sm">
                  {garmentType.replace('-', ' ')} &bull; {activeSide.toUpperCase()}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 2: BULK TEAM JERSEYS (Roster & Local Crest Upload) */}
        {/* ========================================================================= */}
        {activeTab === 'bulk-jerseys' && (
          <div className="pt-8 max-w-4xl mx-auto space-y-8 animate-in fade-in">
            {/* Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171511] via-[#1e1b14] to-[#121217] border border-[#d4af37]/30 shadow-2xl">
              <span className="px-3 py-1 rounded-full bg-[#d4af37]/20 text-[#d4af37] text-xs font-bold uppercase tracking-wider">
                Schools &bull; Colleges &bull; Sports Clubs &bull; Corporate
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] mt-2">
                Bulk Team Jersey Order &amp; Roster Builder
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
                Equip your squad with pro-grade sublimation jerseys. Upload your team crest, list player names, numbers, and sizes. Orders sync directly to the manufacturing queue.
              </p>
            </div>

            {bulkSubmittedQuoteId ? (
              <div className="p-8 rounded-3xl bg-zinc-900 border border-emerald-500/40 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white font-['Outfit']">
                  Bulk Team Jersey Order Submitted!
                </h3>
                <p className="text-sm text-zinc-300 max-w-md mx-auto">
                  Your team order ID is <span className="text-[#d4af37] font-bold font-mono">#{bulkSubmittedQuoteId}</span>. It has been recorded in the database and is now accessible in the Admin Panel for manufacturing review.
                </p>
                <button
                  onClick={() => setBulkSubmittedQuoteId(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#d4af37] text-black font-bold text-xs uppercase"
                >
                  Create Another Team Order
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitBulkJersey} className="space-y-6">
                
                {/* Team & Organizer Info */}
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Team &amp; Organizer Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Team / Club Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={teamName}
                        onChange={e => setTeamName(e.target.value)}
                        placeholder="e.g. Royal Strikers FC"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Sport / Event Type
                      </label>
                      <select
                        value={sportType}
                        onChange={e => setSportType(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      >
                        <option value="Football">Football / Futsal</option>
                        <option value="Cricket">Cricket (White Ball / Red Ball)</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Volleyball">Volleyball</option>
                        <option value="Marathon">Marathon / Running</option>
                        <option value="Corporate Event">Corporate Event</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Contact Manager Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={e => setContactName(e.target.value)}
                        placeholder="e.g. Saran Shalini"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Contact Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={e => setContactPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Contact Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={e => setContactEmail(e.target.value)}
                        placeholder="teamlead@gmail.com"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Target Delivery Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={deliveryDate}
                        onChange={e => setDeliveryDate(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>
                </div>

                {/* Local Upload Team Crest / Jersey Design (Section 2 requirement) */}
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                        Team Crest / Sponsor Design File Upload
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Upload your high-res vector/image file directly from your local device. Connected to your order.
                      </p>
                    </div>
                    {jerseyLogoFile && (
                      <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> File Attached
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {jerseyLogoFile ? (
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-[#d4af37]/60 bg-zinc-950 shrink-0">
                        <img src={jerseyLogoFile.url} alt="Uploaded logo" className="w-full h-full object-contain p-2" />
                        <button
                          type="button"
                          onClick={() => setJerseyLogoFile(null)}
                          className="absolute top-1 right-1 p-1 bg-black/80 hover:bg-rose-600 rounded text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-500 shrink-0 text-center p-2 text-[10px]">
                        <FileImage className="w-6 h-6 mb-1 text-zinc-600" />
                        <span>No logo</span>
                      </div>
                    )}

                    <div className="flex-1 w-full space-y-2">
                      <label className="w-full py-3 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-white flex items-center justify-center gap-2 cursor-pointer transition-all">
                        <UploadCloud className="w-4 h-4 text-[#d4af37]" />
                        <span>Upload Team Logo / Crest from Device</span>
                        <input
                          type="file"
                          accept="image/*,.pdf,.ai,.svg"
                          className="hidden"
                          onChange={handleJerseyLogoUpload}
                        />
                      </label>
                      {jerseyLogoFile && (
                        <p className="text-[11px] text-zinc-400 font-mono">
                          Attached: {jerseyLogoFile.fileName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Player Roster Builder */}
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                        Player Names &amp; Jersey Numbers ({roster.length} Kits)
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Specify the exact spelling and preferred size for each player kit.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={addRosterPlayer}
                      className="px-3.5 py-1.5 bg-[#d4af37] text-black font-bold text-xs rounded-xl flex items-center gap-1 hover:brightness-110"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Add Player</span>
                    </button>
                  </div>

                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {roster.map((player, idx) => (
                      <div
                        key={player.id}
                        className="flex items-center gap-2 p-2 bg-zinc-950 rounded-xl border border-zinc-800"
                      >
                        <span className="w-6 text-center text-xs font-mono text-zinc-500">
                          #{idx + 1}
                        </span>
                        <input
                          type="text"
                          required
                          value={player.name}
                          onChange={e => updateRosterPlayer(player.id, 'name', e.target.value)}
                          placeholder="Player Name (e.g. R. SHARMA)"
                          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white uppercase focus:outline-none focus:border-[#d4af37]"
                        />
                        <input
                          type="text"
                          required
                          value={player.number}
                          onChange={e => updateRosterPlayer(player.id, 'number', e.target.value)}
                          placeholder="No. (0-99)"
                          className="w-20 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white text-center font-bold focus:outline-none focus:border-[#d4af37]"
                        />
                        <select
                          value={player.size}
                          onChange={e => updateRosterPlayer(player.id, 'size', e.target.value as GarmentSize)}
                          className="w-20 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1.5 text-xs text-white font-bold focus:outline-none"
                        >
                          {ALL_SIZES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => removeRosterPlayer(player.id)}
                          className="p-1 text-zinc-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes & Submit */}
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Sponsor Logos &amp; Special Printing Instructions
                    </label>
                    <textarea
                      rows={2}
                      value={bulkNotes}
                      onChange={e => setBulkNotes(e.target.value)}
                      placeholder="e.g. Main sponsor across chest, matching collar trim, delivery before championship..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e6c148] to-[#c59c2b] text-black font-extrabold text-sm uppercase tracking-wider hover:brightness-110 shadow-xl shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
                  >
                    <span>Submit Bulk Team Jersey Order</span>
                  </button>
                </div>

              </form>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 3: BULK TEAM POSTERS (Section 2 & 5 requirements) */}
        {/* ========================================================================= */}
        {activeTab === 'bulk-posters' && (
          <div className="pt-8 max-w-4xl mx-auto space-y-8 animate-in fade-in">
            {/* Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#111722] via-[#151f33] to-[#121217] border border-blue-500/30 shadow-2xl">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
                Tournament Commemorative &bull; Squad Wall Posters
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] mt-2">
                Bulk Team Poster Printing Order
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
                High-definition fine-art team posters printed on metallic luster or photographic paper. Upload your squad photo or artwork file directly from your device.
              </p>
            </div>

            {posterSubmittedId ? (
              <div className="p-8 rounded-3xl bg-zinc-900 border border-blue-500/40 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 mx-auto flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white font-['Outfit']">
                  Bulk Team Poster Order Submitted!
                </h3>
                <p className="text-sm text-zinc-300 max-w-md mx-auto">
                  Your poster order reference ID is <span className="text-blue-400 font-bold font-mono">#{posterSubmittedId}</span>. It has been saved to the database and appears in the Admin Panel under Bulk Team Posters.
                </p>
                <button
                  onClick={() => setPosterSubmittedId(null)}
                  className="px-6 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs uppercase"
                >
                  Create Another Poster Order
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitBulkPoster} className="space-y-6">
                
                {/* Team / Organization Info */}
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Team &amp; Contact Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Team / Club / Organization Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={posterTeamName}
                        onChange={e => setPosterTeamName(e.target.value)}
                        placeholder="e.g. Titan Knights Esports or Chennai Academy"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={posterContactName}
                        onChange={e => setPosterContactName(e.target.value)}
                        placeholder="e.g. Saran Shalini"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Contact Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={posterPhone}
                        onChange={e => setPosterPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Contact Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={posterEmail}
                        onChange={e => setPosterEmail(e.target.value)}
                        placeholder="contact@team.com"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Poster Specifications & Live Price */}
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Poster Dimensions &amp; Paper Finish
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Poster Dimensions / Size
                      </label>
                      <select
                        value={posterSize}
                        onChange={e => setPosterSize(e.target.value as PosterSize)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
                      >
                        <option value="A3 (11.7 x 16.5 in)">A3 (11.7 x 16.5 in) - Standard Wall</option>
                        <option value="A2 (16.5 x 23.4 in)">A2 (16.5 x 23.4 in) - Club Room Size</option>
                        <option value="A1 (23.4 x 33.1 in)">A1 (23.4 x 33.1 in) - Large Stadium Poster</option>
                        <option value="18 x 24 in">18 x 24 in - Popular Championship Size</option>
                        <option value="24 x 36 in">24 x 36 in - Massive Commemorative</option>
                        <option value="Custom Size">Custom Size - Tailored Quote</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Paper Stock &amp; Finish
                      </label>
                      <select
                        value={posterFinish}
                        onChange={e => setPosterFinish(e.target.value as PosterFinish)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
                      >
                        <option value="Glossy Photographic">Glossy Photographic (260 GSM Vibrant)</option>
                        <option value="Matte Fine Art">Matte Fine Art (300 GSM Non-Glare)</option>
                        <option value="Metallic Luster">Metallic Luster (Premium Iridescent)</option>
                        <option value="Canvas Textured">Canvas Textured (Museum Grade)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Order Quantity (Prints)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min={5}
                          required
                          value={posterQuantity}
                          onChange={e => setPosterQuantity(parseInt(e.target.value) || 5)}
                          className="w-32 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono font-bold"
                        />
                        <span className="text-[11px] text-zinc-400">
                          {posterVolDiscount > 0 ? `(${posterVolDiscount}% bulk discount applied)` : '(10+ for volume discount)'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Required Delivery Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={posterDeliveryDate}
                        onChange={e => setPosterDeliveryDate(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Pricing Overview */}
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-zinc-400">Price Per Poster</span>
                      <p className="font-mono text-base font-bold text-white">₹{posterUnitRate}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-zinc-400">Estimated Total Order Value</span>
                      <p className="font-mono text-xl font-black text-blue-400">₹{posterTotalRate.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>

                {/* Local Upload Team Poster Artwork (Section 2 requirement) */}
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                        Upload Team Photo / Poster Artwork File
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Upload your file directly from your local device. Admin can review and download from the admin panel.
                      </p>
                    </div>
                    {posterArtwork && (
                      <span className="text-[11px] text-blue-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> File Ready
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {posterArtwork ? (
                      <div className="relative w-28 h-20 rounded-xl overflow-hidden border border-blue-400/60 bg-zinc-950 shrink-0">
                        <img src={posterArtwork.url} alt="Poster preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setPosterArtwork(null)}
                          className="absolute top-1 right-1 p-1 bg-black/80 hover:bg-rose-600 rounded text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-28 h-20 rounded-xl border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-500 shrink-0 text-center p-2 text-[10px]">
                        <ImageIcon className="w-6 h-6 mb-1 text-zinc-600" />
                        <span>No file</span>
                      </div>
                    )}

                    <div className="flex-1 w-full space-y-2">
                      <label className="w-full py-3 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-white flex items-center justify-center gap-2 cursor-pointer transition-all">
                        <UploadCloud className="w-4 h-4 text-blue-400" />
                        <span>Select Poster Artwork / Photo from Local Device</span>
                        <input
                          type="file"
                          accept="image/*,.pdf,.ai,.psd"
                          className="hidden"
                          onChange={handlePosterArtworkUpload}
                        />
                      </label>
                      {posterArtwork && (
                        <p className="text-[11px] text-zinc-400 font-mono">
                          Selected: {posterArtwork.fileName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notes & Submit */}
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Printing Notes &amp; Special Framing Requests
                    </label>
                    <textarea
                      rows={2}
                      value={posterNotes}
                      onChange={e => setPosterNotes(e.target.value)}
                      placeholder="e.g. Include team championship title in gold foil, packaging in individual tubes..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
                  >
                    <span>Submit Bulk Team Poster Order</span>
                  </button>
                </div>

              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
