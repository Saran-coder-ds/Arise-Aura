import React, { useState } from 'react';
import { UploadCloud, Sparkles, ArrowRight, CheckCircle2, FileCode } from 'lucide-react';
import { ALL_SIZES } from '../../data/mockData';
import { GarmentSize } from '../../types';

interface CustomDesignSectionProps {
  onOpenStudio: (prefill?: any) => void;
}

export const CustomDesignSection: React.FC<CustomDesignSectionProps> = ({ onOpenStudio }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [productType, setProductType] = useState('t-shirt');
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<GarmentSize>('L');
  const [instructions, setInstructions] = useState('');

  const handleFile = (file: File) => {
    setUploadedFile(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleLaunchStudio = () => {
    onOpenStudio({
      productType,
      quantity,
      size,
      instructions,
      filePreview,
      fileName: uploadedFile?.name
    });
  };

  return (
    <section className="py-16 bg-[#0c0c0e] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Mockup Generation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Custom Design
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Upload your design, logo, artwork, or sketch and get it printed on your favorite T-shirt or sports jersey.
          </p>
        </div>

        {/* Upload & Options Card */}
        <div className="rounded-3xl bg-zinc-900/70 border border-zinc-800 p-6 sm:p-8 lg:p-10 shadow-2xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left: Drag & Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`relative rounded-2xl border-2 border-dashed p-8 text-center flex flex-col items-center justify-center transition-all cursor-pointer min-h-[260px] ${
                dragOver 
                  ? 'border-[#d4af37] bg-[#d4af37]/10' 
                  : uploadedFile 
                    ? 'border-emerald-500/60 bg-emerald-950/20' 
                    : 'border-zinc-700 bg-zinc-950/60 hover:border-zinc-500'
              }`}
            >
              <input
                type="file"
                id="design-file-input"
                accept=".png,.jpg,.jpeg,.svg,.pdf,.ai,.psd"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                className="hidden"
              />

              <label htmlFor="design-file-input" className="cursor-pointer flex flex-col items-center">
                {filePreview ? (
                  <div className="space-y-3">
                    <img
                      src={filePreview}
                      alt="Uploaded preview"
                      className="w-24 h-24 object-contain rounded-xl border border-zinc-700 bg-zinc-900 mx-auto"
                    />
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{uploadedFile?.name}</span>
                    </div>
                    <span className="text-[11px] text-zinc-400 block">Click to replace file</span>
                  </div>
                ) : uploadedFile ? (
                  <div className="space-y-2">
                    <FileCode className="w-12 h-12 text-[#d4af37] mx-auto" />
                    <p className="text-xs font-bold text-white">{uploadedFile.name}</p>
                    <span className="text-[11px] text-zinc-400">File attached successfully</span>
                  </div>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-2xl bg-zinc-800 text-[#d4af37] flex items-center justify-center mb-4 shadow-md">
                      <UploadCloud className="w-7 h-7" />
                    </div>
                    <h4 className="text-sm font-bold text-white">Drag &amp; Drop Your Design Here</h4>
                    <p className="text-xs text-zinc-500 mt-1">or</p>
                    <span className="mt-2 px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white border border-zinc-700">
                      Choose File
                    </span>
                    <p className="text-[10px] text-zinc-500 mt-4">
                      Supported formats: PNG, JPG, PDF, AI, PSD, SVG (Up to 25MB)
                    </p>
                  </>
                )}
              </label>
            </div>

            {/* Right: Customization Inputs */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Garment Style
                </label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="round-neck-tshirt">Round Neck Cotton T-Shirt (₹599)</option>
                  <option value="oversized-tshirt">Oversized Heavyweight Tee (₹749)</option>
                  <option value="football-jersey">Pro Football Jersey (₹1,299)</option>
                  <option value="cricket-jersey">Sublimation Cricket Jersey (₹1,499)</option>
                  <option value="polo-tshirt">Classic Pique Polo (₹999)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Design Instructions (Optional)
                </label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={2}
                  placeholder="e.g. Front chest print, 8-inch width, back name in gold color..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Size
                  </label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value as GarmentSize)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {ALL_SIZES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleLaunchStudio}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e6c148] to-[#c59c2b] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer mt-2"
              >
                <span>Get Instant Quote &amp; Preview Mockup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
