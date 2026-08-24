import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, MapPin, ArrowRight, Check, AlertCircle, RefreshCw, ShoppingBag, ExternalLink } from 'lucide-react';
import type { DripCheckResponse, FashionItem } from '../types/entityGraph.js';
import { ScoreGauge } from '../components/common/ScoreGauge.js';
import { LumiAvatar } from '../components/common/LumiAvatar.js';

interface FitScoreViewProps {
  result: DripCheckResponse;
  onRetake: () => void;
  onExplorePlaces: () => void;
  onSelectBrandItem: (item: FashionItem) => void;
}

export const FitScoreView: React.FC<FitScoreViewProps> = ({
  result,
  onRetake,
  onExplorePlaces,
  onSelectBrandItem,
}) => {
  const { score, isPassing, breakdown, lumiComment, suggestedAlternatives, suggestedAccessories } = result;

  useEffect(() => {
    if (isPassing) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4FF00', '#FF2E93', '#00F5FF', '#7C3AED'],
      });
    }
  }, [isPassing]);

  return (
    <div className="animate-fadeIn pb-12">
      {/* Desktop 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        
        {/* LEFT COLUMN: SCORE & FEEDBACK (cols 1-5 on lg) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Top Score Card */}
          <div className="calm-card-elevated p-6 rounded-3xl flex flex-col items-center relative overflow-hidden text-center">
            <ScoreGauge score={score} size={170} />

            {/* Clean Vibe & Color Badges */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
              <span className="px-3 py-1 rounded-full bg-gray-900 text-[#D4FF00] font-extrabold text-xs">
                {breakdown.detectedStyle}
              </span>
              {breakdown.dominantColors.map((color, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-[11px] font-semibold"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>

          {/* Lumi Mascot Speech */}
          <LumiAvatar comment={lumiComment} isSpeaking={true} size="md" />

          {/* Concise Breakdown */}
          <div className="calm-card p-4 rounded-3xl space-y-2">
            <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider block">
              Stylist Breakdown &amp; Rationale
            </span>

            <div className="space-y-1.5">
              {breakdown.pros.map((pro, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-gray-700 font-medium">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </div>
              ))}
              {breakdown.cons.map((con, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-gray-600 font-medium">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{con}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={onExplorePlaces}
              className="w-full py-3.5 px-4 rounded-full bg-[#0F172A] hover:bg-black text-white font-extrabold text-sm shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#D4FF00]" />
              <span>Explore Vibe Places</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onRetake}
              className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-gray-50 text-gray-600 font-bold text-xs border border-gray-200 shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake Photo</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: LOCAL BRAND UPGRADE / ACCESSORIES GRID (cols 6-12 on lg) */}
        <div className="lg:col-span-7 space-y-4">
          {!isPassing && suggestedAlternatives.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-[#FF2E93]" />
                    Local Brand Outfit Upgrade (+30 Pts)
                  </span>
                  <p className="text-[11px] text-gray-500">
                    Hand-picked pieces to fix silhouette gaps and match your target vibe.
                  </p>
                </div>
              </div>

              {/* Desktop Multi-column Grid (2 cols on lg, horizontal on mobile) */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {suggestedAlternatives.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectBrandItem(item)}
                    className="calm-card-elevated p-3 rounded-3xl hover:shadow-lg active:scale-98 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gray-100 mb-2">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 bg-black/70 text-[#D4FF00] text-[9px] font-black rounded-full backdrop-blur-xs">
                        {item.aestheticTag}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-extrabold text-purple-600 uppercase block truncate">
                        {item.brandName}
                      </span>
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                        {item.name}
                      </h4>
                      <div className="flex items-center justify-between mt-1 pt-1 border-t border-gray-100">
                        <span className="text-xs font-black text-[#FF2E93]">
                          {item.price.toLocaleString('vi-VN')} ₫
                        </span>
                        <span className="text-[10px] font-bold text-gray-500 flex items-center gap-0.5">
                          View details <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isPassing && suggestedAccessories.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    Recommended Statement Accessories
                  </span>
                  <p className="text-[11px] text-gray-500">
                    Elevate your 90+ score with matching eyewear and jewelry.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {suggestedAccessories.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectBrandItem(item)}
                    className="calm-card-elevated p-3 rounded-3xl hover:shadow-lg active:scale-98 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-gray-100 mb-2">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-purple-600 uppercase block truncate">
                        {item.brandName}
                      </span>
                      <h4 className="text-xs font-bold text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <span className="text-xs font-black text-[#FF2E93]">
                        {item.price.toLocaleString('vi-VN')} ₫
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
