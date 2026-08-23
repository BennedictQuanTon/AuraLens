import React from 'react';
import { X, ExternalLink, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import type { FashionItem } from '../../types/entityGraph.js';

interface BrandDetailSheetProps {
  item: FashionItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BrandDetailSheet: React.FC<BrandDetailSheetProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-white rounded-t-3xl p-5 shadow-2xl border-t border-gray-100 max-h-[85vh] overflow-y-auto animate-slideUp">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-100 mb-4 shadow-inner">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md text-[#D4FF00] text-xs font-extrabold rounded-full border border-white/20">
            {item.aestheticTag}
          </span>
          {item.sustainabilityTag && (
            <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-green-600/90 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-sm">
              <CheckCircle2 className="w-3 h-3" />
              {item.sustainabilityTag}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-black tracking-wider uppercase text-purple-600 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2E93]" />
            {item.brandName}
          </span>
          <span className="text-xs font-bold text-gray-500 px-2 py-0.5 bg-gray-100 rounded-md">
            {item.category}
          </span>
        </div>

        <h3 className="text-lg font-extrabold text-gray-900 leading-snug mb-2">
          {item.name}
        </h3>

        <div className="flex items-center justify-between py-3 border-y border-gray-100 mb-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">
              Price
            </span>
            <span className="text-xl font-black text-[#FF2E93]">
              {item.price.toLocaleString('vi-VN')} ₫
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">
              Colors
            </span>
            <span className="text-xs font-bold text-gray-800">
              {item.colors.join(', ')}
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed mb-5">
          {item.description}
        </p>

        <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 flex items-start gap-2 mb-5">
          <Shield className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-purple-900 font-medium leading-relaxed">
            <span className="font-bold">Lumi Stylist Insight:</span> This piece bridges the silhouette balance and boosts your overall outfit score by +20-30 points!
          </p>
        </div>

        <a
          href={item.buyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-gray-950 hover:bg-black text-white font-extrabold text-sm shadow-xl active:scale-98 transition-all"
        >
          <span>Shop at {item.brandName}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
