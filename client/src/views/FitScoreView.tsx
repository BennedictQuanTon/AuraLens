import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, MapPin, Tag, ArrowRight, CheckCircle, AlertTriangle, RefreshCw, ShoppingBag } from 'lucide-react';
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

  // Trigger confetti burst if passing
  useEffect(() => {
    if (isPassing) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4FF00', '#FF2E93', '#00F5FF', '#7C3AED'],
      });
    }
  }, [isPassing]);

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Top Score Card */}
      <div className="glass-card p-6 rounded-3xl border border-white/90 shadow-xl flex flex-col items-center relative overflow-hidden">
        {/* Glow backdrop */}
        <div
          className={`absolute top-0 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
            isPassing ? 'bg-[#D4FF00]/20' : 'bg-[#FF2E93]/20'
          }`}
        />

        <ScoreGauge score={score} size={180} />

        {/* Style Tag & Color Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
          <span className="px-3 py-1 rounded-full bg-black text-[#D4FF00] font-black text-xs shadow-sm">
            ✨ {breakdown.detectedStyle}
          </span>
          {breakdown.dominantColors.map((color, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-[11px] font-bold border border-gray-200"
            >
              ● {color}
            </span>
          ))}
        </div>
      </div>

      {/* Lumi Persona Commentary */}
      <LumiAvatar comment={lumiComment} isSpeaking={true} size="md" />

      {/* Breakdown Pros & Cons */}
      <div className="glass-card p-4 rounded-2xl border border-white/80 space-y-3">
        <span className="text-xs font-black uppercase text-gray-500 tracking-wider block">
          Đánh Giá Chi Tiết Từ AI Stylist
        </span>

        {/* Pros */}
        <div className="space-y-1.5">
          {breakdown.pros.map((pro, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-gray-700 font-medium">
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <span>{pro}</span>
            </div>
          ))}
        </div>

        {/* Cons */}
        <div className="space-y-1.5 pt-2 border-t border-gray-100">
          {breakdown.cons.map((con, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-gray-700 font-medium">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>{con}</span>
            </div>
          ))}
        </div>
      </div>

      {/* IF SCORE < 70: SHOW ALTERNATIVES CAROUSEL */}
      {!isPassing && suggestedAlternatives.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#FF2E93] flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" />
              Đồ Local Brand Gợi Ý Nâng Điểm (+30đ)
            </span>
            <span className="text-[10px] text-gray-500 font-bold">Chạm để xem chi tiết</span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
            {suggestedAlternatives.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectBrandItem(item)}
                className="snap-start shrink-0 w-44 glass-card p-3 rounded-2xl border border-white/90 hover:shadow-lg active:scale-98 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative w-full h-32 rounded-xl overflow-hidden bg-gray-100 mb-2">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-black/70 text-[#D4FF00] text-[9px] font-black rounded-full">
                    {item.aestheticTag}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-black text-[#7C3AED] uppercase block truncate">
                    {item.brandName}
                  </span>
                  <h4 className="text-xs font-bold text-gray-900 line-clamp-2 leading-tight mb-1">
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

      {/* IF SCORE >= 70: SHOW SUGGESTED ACCESSORIES */}
      {isPassing && suggestedAccessories.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#7C3AED] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4FF00]" />
              Phụ Kiện Điểm Nhấn Cho Vibe Cháy Hơn
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
            {suggestedAccessories.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectBrandItem(item)}
                className="snap-start shrink-0 w-40 glass-card p-3 rounded-2xl border border-white/90 hover:shadow-lg active:scale-98 transition-all cursor-pointer"
              >
                <div className="relative w-full h-28 rounded-xl overflow-hidden bg-gray-100 mb-2">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] font-black text-[#7C3AED] uppercase block truncate">
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

      {/* Bottom Actions */}
      <div className="space-y-2 pt-2">
        {/* Next View Button */}
        <button
          onClick={onExplorePlaces}
          className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-[#D4FF00] via-[#00F5FF] to-[#FF2E93] text-black font-black text-sm shadow-xl hover:shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <MapPin className="w-4 h-4 fill-black" />
          <span>Tìm Địa Điểm Ăn Chơi (Vibe Map) 📍</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Retake Button */}
        <button
          onClick={onRetake}
          className="w-full py-3 px-4 rounded-2xl bg-white/80 hover:bg-white text-gray-700 font-extrabold text-xs border border-gray-200 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Chụp Lại Outfit Khác</span>
        </button>
      </div>
    </div>
  );
};
