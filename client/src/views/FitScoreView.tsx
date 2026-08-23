import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, MapPin, ArrowRight, Check, AlertCircle, RefreshCw, ShoppingBag } from 'lucide-react';
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
    <div className="space-y-5 animate-fadeIn pb-12">
      {/* Top Calm Score Card */}
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
      <div className="calm-card p-4 rounded-2xl space-y-2">
        <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider block">
          Summary &amp; Feedback
        </span>

        <div className="space-y-1">
          {breakdown.pros.map((pro, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{pro}</span>
            </div>
          ))}
          {breakdown.cons.map((con, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{con}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Alternatives for Low Score */}
      {!isPassing && suggestedAlternatives.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-[#FF2E93]" />
              Local Brand Fix (+30đ)
            </span>
            <span className="text-[10px] text-gray-400">Tap to view</span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none snap-x">
            {suggestedAlternatives.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectBrandItem(item)}
                className="snap-start shrink-0 w-40 calm-card p-2.5 rounded-2xl hover:shadow-md active:scale-98 transition-all cursor-pointer"
              >
                <div className="relative w-full h-32 rounded-xl overflow-hidden bg-gray-100 mb-2">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[9px] font-bold text-purple-600 uppercase block truncate">
                  {item.brandName}
                </span>
                <h4 className="text-xs font-bold text-gray-900 truncate">
                  {item.name}
                </h4>
                <span className="text-xs font-black text-[#FF2E93]">
                  {item.price.toLocaleString('vi-VN')} ₫
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accessories for High Score */}
      {isPassing && suggestedAccessories.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
              Recommended Accessories
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none snap-x">
            {suggestedAccessories.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectBrandItem(item)}
                className="snap-start shrink-0 w-36 calm-card p-2.5 rounded-2xl hover:shadow-md active:scale-98 transition-all cursor-pointer"
              >
                <div className="relative w-full h-28 rounded-xl overflow-hidden bg-gray-100 mb-2">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[9px] font-bold text-purple-600 uppercase block truncate">
                  {item.brandName}
                </span>
                <h4 className="text-xs font-bold text-gray-900 truncate">
                  {item.name}
                </h4>
                <span className="text-xs font-black text-[#FF2E93]">
                  {item.price.toLocaleString('vi-VN')} ₫
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <button
          onClick={onExplorePlaces}
          className="w-full py-3.5 px-4 rounded-full bg-[#0F172A] hover:bg-black text-white font-extrabold text-sm shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <MapPin className="w-4 h-4 text-[#D4FF00]" />
          <span>Explore Vibe Places</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onRetake}
          className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-gray-50 text-gray-600 font-bold text-xs border border-gray-200 shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retake Photo</span>
        </button>
      </div>
    </div>
  );
};
