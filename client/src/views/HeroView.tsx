import React from 'react';
import { Sparkles, Camera, Heart, PartyPopper, Coffee, BookOpen, Compass, Zap, Flame, ShieldAlert } from 'lucide-react';
import type { EventContext } from '../types/entityGraph.js';
import { LumiAvatar } from '../components/common/LumiAvatar.js';

interface HeroViewProps {
  selectedContext: EventContext;
  onSelectContext: (ctx: EventContext) => void;
  mockScenario: 'low_score' | 'high_score' | 'cyberpunk';
  onSelectMockScenario: (scenario: 'low_score' | 'high_score' | 'cyberpunk') => void;
  onStartScanner: () => void;
}

export const HeroView: React.FC<HeroViewProps> = ({
  selectedContext,
  onSelectContext,
  mockScenario,
  onSelectMockScenario,
  onStartScanner,
}) => {
  const contexts: Array<{ id: EventContext; label: string; icon: React.ElementType; color: string }> = [
    { id: 'Hẹn hò', label: 'Hẹn Hò Lãng Mạn', icon: Heart, color: 'text-[#FF2E93]' },
    { id: 'Quẩy bar / Pub đêm', label: 'Quẩy Bar / Pub Đêm', icon: PartyPopper, color: 'text-[#7C3AED]' },
    { id: 'Cafe sống ảo', label: 'Cafe Sống Ảo', icon: Coffee, color: 'text-amber-600' },
    { id: 'Đi học / Đi làm năng động', label: 'Đi Học / Đi Làm', icon: BookOpen, color: 'text-blue-600' },
    { id: 'Dạo phố cuối tuần', label: 'Dạo Phố Cuối Tuần', icon: Compass, color: 'text-emerald-600' },
  ];

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Hero Banner with Radiant Gradient */}
      <div className="relative rounded-3xl p-5 overflow-hidden bg-gradient-to-br from-[#0A0A0F] via-[#1E1E2E] to-[#2E1065] text-white shadow-2xl border border-white/20">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#FF2E93]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-[#D4FF00]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span className="text-[10px] font-black uppercase tracking-wider text-[#D4FF00]">
              #BuildWithGoogleAI · AI Riser 2026
            </span>
          </div>

          <h1 className="text-2xl font-black tracking-tight leading-tight">
            Thấu Kính Khí Chất <br />
            <span className="bg-gradient-to-r from-[#D4FF00] via-[#00F5FF] to-[#FF2E93] bg-clip-text text-transparent">
              Bắt Trọn Vibe Của Riêng Bạn
            </span>
          </h1>

          <p className="text-xs text-gray-300 font-medium leading-relaxed">
            Chấm điểm outfit tức thì với <span className="text-[#D4FF00] font-bold">Gemini Multimodal</span> &amp; tự động thiết kế lộ trình ăn chơi F&amp;B chuẩn xác chống AI Slop 100%.
          </p>
        </div>
      </div>

      {/* Lumi AI Persona Welcome */}
      <LumiAvatar
        comment="Hế nhô bà iu! Hôm nay lên đồ chuẩn bị đi đâu chơi thế? Chọn ngay mục tiêu bên dưới để Lumi bắt đúng sóng và chấm điểm chuẩn bài nha!"
        isSpeaking={true}
        size="md"
      />

      {/* Event Context Selector Chips */}
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1.5 px-1">
          <Zap className="w-3.5 h-3.5 text-[#FF2E93]" />
          1. Hôm Nay Bạn Đi Đâu? (Chọn Ngữ Cảnh)
        </label>

        <div className="grid grid-cols-1 gap-2">
          {contexts.map((ctx) => {
            const Icon = ctx.icon;
            const isSelected = selectedContext === ctx.id;

            return (
              <button
                key={ctx.id}
                onClick={() => onSelectContext(ctx.id)}
                className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-r from-white to-purple-50/80 border-2 border-[#7C3AED] shadow-md scale-101'
                    : 'glass-card hover:bg-white/90 border border-white/80 active:scale-98'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#7C3AED] text-white shadow-sm'
                        : 'bg-gray-100 ' + ctx.color
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-xs font-extrabold ${
                      isSelected ? 'text-gray-950 font-black' : 'text-gray-700'
                    }`}
                  >
                    {ctx.label}
                  </span>
                </div>

                {isSelected && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#D4FF00] text-black">
                    ĐÃ CHỌN
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Scenario Preset Switcher (Judge / Demo Fast Switch) */}
      <div className="p-3.5 rounded-2xl bg-gray-100/80 border border-gray-200/80 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-[#7C3AED]" />
            Demo Scenario (Ban Giám Khảo Test Nhanh):
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          <button
            onClick={() => onSelectMockScenario('low_score')}
            className={`py-1.5 px-2 rounded-xl text-[10px] font-extrabold transition-all ${
              mockScenario === 'low_score'
                ? 'bg-[#FF2E93] text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            ⚠️ Điểm Thấp (58đ)
          </button>

          <button
            onClick={() => onSelectMockScenario('high_score')}
            className={`py-1.5 px-2 rounded-xl text-[10px] font-extrabold transition-all ${
              mockScenario === 'high_score'
                ? 'bg-[#D4FF00] text-black shadow-sm font-black'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            🔥 Điểm Cao (94đ)
          </button>

          <button
            onClick={() => onSelectMockScenario('cyberpunk')}
            className={`py-1.5 px-2 rounded-xl text-[10px] font-extrabold transition-all ${
              mockScenario === 'cyberpunk'
                ? 'bg-[#00F5FF] text-black shadow-sm font-black'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            ⚡ Cyberpunk
          </button>
        </div>
      </div>

      {/* Big Master Action Button */}
      <button
        onClick={onStartScanner}
        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#D4FF00] via-[#00F5FF] to-[#FF2E93] text-black font-black text-base shadow-xl hover:shadow-2xl hover:scale-101 active:scale-98 transition-all flex items-center justify-center gap-2.5"
      >
        <Camera className="w-5 h-5 fill-black" />
        <span>Bật Thấu Kính (Drip Check) ⚡</span>
      </button>
    </div>
  );
};
