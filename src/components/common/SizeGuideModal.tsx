import React, { useState } from 'react';
import { X, Ruler, Check, HelpCircle } from 'lucide-react';
import { GarmentSize } from '../../types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName?: string;
  selectedSize?: GarmentSize;
  onSelectSize?: (size: GarmentSize) => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  categoryName = 'Printed T-Shirts',
  selectedSize,
  onSelectSize
}) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [recommendedSize, setRecommendedSize] = useState<GarmentSize | null>(null);
  const [heightVal, setHeightVal] = useState(175); // cm
  const [weightVal, setWeightVal] = useState(70); // kg

  if (!isOpen) return null;

  // Measurement charts in inches
  const chartDataInches = [
    { size: 'XS', chest: '36', length: '26.5', shoulder: '16.5', sleeve: '7.5' },
    { size: 'S', chest: '38', length: '27.5', shoulder: '17.5', sleeve: '8.0' },
    { size: 'M', chest: '40', length: '28.5', shoulder: '18.5', sleeve: '8.5' },
    { size: 'L', chest: '42', length: '29.5', shoulder: '19.5', sleeve: '9.0' },
    { size: 'XL', chest: '44', length: '30.5', shoulder: '20.5', sleeve: '9.5' },
    { size: 'XXL', chest: '46', length: '31.5', shoulder: '21.5', sleeve: '10.0' },
    { size: '3XL', chest: '48', length: '32.5', shoulder: '22.5', sleeve: '10.5' }
  ];

  // Helper converter
  const toCm = (val: string) => (parseFloat(val) * 2.54).toFixed(1);

  const calculateFit = () => {
    // Basic standard fit algorithm
    if (weightVal < 55) setRecommendedSize('XS');
    else if (weightVal < 65) setRecommendedSize('S');
    else if (weightVal < 75) setRecommendedSize('M');
    else if (weightVal < 85) setRecommendedSize('L');
    else if (weightVal < 95) setRecommendedSize('XL');
    else if (weightVal < 105) setRecommendedSize('XXL');
    else setRecommendedSize('3XL');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#141418] border border-zinc-800 text-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#d4af37]" />
            <h3 className="text-base font-bold tracking-wide">
              Official Size Guide &amp; Fit Chart
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Unit Toggle and Category Notice */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs text-zinc-400">
                Fit profile for: <span className="font-semibold text-white">{categoryName}</span>
              </p>
              <p className="text-[11px] text-zinc-500">
                True to size. For an oversized baggy look, size up one step.
              </p>
            </div>

            <div className="inline-flex rounded-lg p-1 bg-zinc-900 border border-zinc-800">
              <button
                onClick={() => setUnit('in')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  unit === 'in' ? 'bg-[#d4af37] text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Inches (&quot;)
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  unit === 'cm' ? 'bg-[#d4af37] text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          {/* Size Chart Table */}
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60">
            <table className="w-full text-xs text-left">
              <thead className="bg-zinc-800/80 text-zinc-300 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4 font-bold">Size</th>
                  <th className="py-3 px-4 font-bold">Chest ({unit})</th>
                  <th className="py-3 px-4 font-bold">Length ({unit})</th>
                  <th className="py-3 px-4 font-bold">Shoulder ({unit})</th>
                  <th className="py-3 px-4 font-bold">Sleeve ({unit})</th>
                  <th className="py-3 px-4 text-right font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {chartDataInches.map(row => {
                  const isCurrent = selectedSize === row.size;
                  return (
                    <tr
                      key={row.size}
                      className={`hover:bg-zinc-800/40 transition-colors ${
                        isCurrent ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'text-zinc-300'
                      }`}
                    >
                      <td className="py-3 px-4 font-bold text-white flex items-center gap-1.5">
                        <span>{row.size}</span>
                        {isCurrent && (
                          <span className="text-[9px] bg-[#d4af37] text-black px-1.5 py-0.2 rounded font-extrabold">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {unit === 'in' ? `${row.chest}"` : `${toCm(row.chest)} cm`}
                      </td>
                      <td className="py-3 px-4">
                        {unit === 'in' ? `${row.length}"` : `${toCm(row.length)} cm`}
                      </td>
                      <td className="py-3 px-4">
                        {unit === 'in' ? `${row.shoulder}"` : `${toCm(row.shoulder)} cm`}
                      </td>
                      <td className="py-3 px-4">
                        {unit === 'in' ? `${row.sleeve}"` : `${toCm(row.sleeve)} cm`}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {onSelectSize && (
                          <button
                            onClick={() => {
                              onSelectSize(row.size as GarmentSize);
                              onClose();
                            }}
                            className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-[#d4af37] hover:text-black font-semibold text-[11px] transition-colors"
                          >
                            Select
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Smart Size Recommender Calculator */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#d4af37]" />
              Smart Size Recommender
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">
                  Your Height: <span className="text-white font-bold">{heightVal} cm</span>
                </label>
                <input
                  type="range"
                  min="150"
                  max="205"
                  value={heightVal}
                  onChange={e => setHeightVal(parseInt(e.target.value))}
                  className="w-full accent-[#d4af37]"
                />
              </div>
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">
                  Your Weight: <span className="text-white font-bold">{weightVal} kg</span>
                </label>
                <input
                  type="range"
                  min="45"
                  max="125"
                  value={weightVal}
                  onChange={e => setWeightVal(parseInt(e.target.value))}
                  className="w-full accent-[#d4af37]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={calculateFit}
                className="px-3 py-1.5 bg-[#d4af37] hover:bg-[#e6c148] text-black font-bold text-xs rounded-lg transition-colors"
              >
                Calculate My Size
              </button>
              {recommendedSize && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">Best fit for you:</span>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-extrabold text-xs rounded-md border border-emerald-500/40">
                    Size {recommendedSize}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* How to Measure visual guidance */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-zinc-400 pt-2 border-t border-zinc-800">
            <div className="p-3 bg-zinc-900/40 rounded-lg">
              <p className="font-bold text-white mb-1">1. Chest Measurement</p>
              <p>Measure across the fullest part of your chest, keeping the tape horizontal.</p>
            </div>
            <div className="p-3 bg-zinc-900/40 rounded-lg">
              <p className="font-bold text-white mb-1">2. Body Length</p>
              <p>Measure from highest shoulder point down to the bottom hem of the garment.</p>
            </div>
            <div className="p-3 bg-zinc-900/40 rounded-lg">
              <p className="font-bold text-white mb-1">3. Shoulder Width</p>
              <p>Measure straight across from one shoulder seam point to the opposite seam.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
