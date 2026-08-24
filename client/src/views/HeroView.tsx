import React from 'react';
import { Sparkles, TrendingUp, ChevronRight, Layers, MapPin, Compass, Flame, ShieldCheck, Heart, Coffee, BookOpen, PartyPopper } from 'lucide-react';
import type { EventContext } from '../types/entityGraph.js';
import type { AppLanguage, UserProfileState } from '../types/settings.js';

interface HeroViewProps {
  userProfile: UserProfileState;
  language: AppLanguage;
  selectedContext: EventContext;
  onSelectContext: (ctx: EventContext) => void;
  mockScenario: 'low_score' | 'high_score' | 'cyberpunk';
  onSelectMockScenario: (scenario: 'low_score' | 'high_score' | 'cyberpunk') => void;
  onStartScanner: () => void;
}

export const HeroView: React.FC<HeroViewProps> = ({
  userProfile,
  language,
  selectedContext,
  onSelectContext,
  mockScenario,
  onSelectMockScenario,
  onStartScanner,
}) => {
  const isEn = language === 'en';

  const contexts: Array<{ id: EventContext; label: string; emoji: string }> = [
    { id: 'Cafe sống ảo', label: isEn ? 'Cafe Chill' : 'Cafe Sống Ảo', emoji: '☕' },
    { id: 'Quẩy bar / Pub đêm', label: isEn ? 'Nightclub / Pub' : 'Quẩy Bar / Pub', emoji: '⚡' },
    { id: 'Hẹn hò', label: isEn ? 'Romantic Date' : 'Hẹn Hò', emoji: '💖' },
    { id: 'Đi học / Đi làm năng động', label: isEn ? 'Campus / Work' : 'Đi Học / Làm', emoji: '💼' },
    { id: 'Dạo phố cuối tuần', label: isEn ? 'Street Chill' : 'Dạo Phố', emoji: '🚶' },
  ];

  return (
    <div className="animate-fadeIn pb-16">
      {/* Desktop 2-Column Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* LEFT COLUMN: HERO GREETING & INTERACTIVE CONTROLS (cols 1-6 on lg) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Top Greeting & Free-Floating Lumi Mascot */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="space-y-3 flex-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 text-xs font-extrabold text-gray-800 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#FF2E93]" />
                <span>{isEn ? `Hi, ${userProfile.name} 👋` : `Chào ${userProfile.name} 👋`}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight leading-[1.15]">
                {isEn ? 'Ready to slay your ' : 'Sẵn sàng bắt trọn '}
                <span className="highlight-circle font-black text-black">
                  {isEn ? 'vibe' : 'khí chất'}
                </span>{' '}
                {isEn ? 'today?' : 'hôm nay?'}
              </h1>

              <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-md">
                {isEn
                  ? 'Multimodal AI Stylist & Deterministic Weather-Grounded Experience Map.'
                  : 'Trợ lý Stylist Đa phương thức & Bản đồ trải nghiệm cá nhân hóa cho Gen Z.'}
              </p>
            </div>

            {/* Free-Floating 3D Lumi Mascot */}
            <div className="relative w-32 h-32 lg:w-40 lg:h-40 shrink-0 animate-lumi-float">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D4FF00]/40 to-[#FF2E93]/40 rounded-full blur-xl pointer-events-none" />
              <div className="relative w-full h-full rounded-full p-1.5 bg-gradient-to-tr from-[#D4FF00] via-[#FF2E93] to-[#7C3AED] shadow-2xl overflow-hidden">
                <img
                  src="/lumi.jpg"
                  alt="Lumi 3D Mascot"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Target Destination / Scenario Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">
                {isEn ? 'Target Destination' : 'Chọn Điểm Đến'}
              </h3>
              <span className="text-xs font-extrabold text-gray-900">
                {selectedContext}
              </span>
            </div>

            {/* Clean Horizontal Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
              {contexts.map((ctx) => {
                const isSelected = selectedContext === ctx.id;

                return (
                  <button
                    key={ctx.id}
                    onClick={() => onSelectContext(ctx.id)}
                    className={`snap-start shrink-0 px-4 py-3 rounded-2xl flex items-center gap-2 transition-all duration-300 ${
                      isSelected
                        ? 'bg-gray-950 text-white shadow-md scale-102'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200/80 active:scale-95'
                    }`}
                  >
                    <span className="text-base">{ctx.emoji}</span>
                    <span
                      className={`text-xs font-bold ${
                        isSelected ? 'text-[#D4FF00]' : 'text-gray-700'
                      }`}
                    >
                      {ctx.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Demo Scenario Preset (Judge Fast Switch) */}
          <div className="p-4 bg-white rounded-3xl border border-gray-200/80 shadow-xs flex items-center justify-between gap-2">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider">
              {isEn ? 'Demo Preset:' : 'Chế Độ Test:'}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectMockScenario('low_score')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  mockScenario === 'low_score'
                    ? 'bg-[#FF2E93] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Low (58)
              </button>
              <button
                onClick={() => onSelectMockScenario('high_score')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  mockScenario === 'high_score'
                    ? 'bg-gray-950 text-[#D4FF00] shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                High (94)
              </button>
              <button
                onClick={() => onSelectMockScenario('cyberpunk')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  mockScenario === 'cyberpunk'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Cyber-Pop
              </button>
            </div>
          </div>

          {/* Sleek Dark Capsule CTA Button */}
          <button
            onClick={onStartScanner}
            className="w-full py-4.5 px-6 rounded-full bg-[#0F172A] hover:bg-black text-white font-extrabold text-base shadow-xl active:scale-98 transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 shadow-sm">
              <img
                src="/lumi.jpg"
                alt="Lumi"
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform"
              />
            </div>

            <span className="font-extrabold tracking-wide text-white text-base">
              {isEn ? 'Get Started & Check Outfit' : 'Bắt Đầu Drip Check Ngay'}
            </span>

            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-5 h-5 text-[#D4FF00]" />
            </div>
          </button>
        </div>

        {/* RIGHT COLUMN: STYLE INTELLIGENCE & LIVE GRAPH METRICS (cols 7-12 on lg) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black uppercase tracking-wider text-gray-400">
              {isEn ? 'Style Intelligence & Live Metrics' : 'Chỉ Số Thời Trang & Đồ Thị Thực Tế'}
            </span>
            <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <TrendingUp className="w-3.5 h-3.5" /> {isEn ? 'Live Graph Engine' : 'Live Graph Active'}
            </span>
          </div>

          {/* 2x2 Grid of High-Utility Analytics Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Metric 1: Aura Index */}
            <div className="calm-card-elevated p-5 lg:p-6 rounded-3xl space-y-2 relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-xs font-bold uppercase tracking-wider">Aura Index</span>
                <Sparkles className="w-4 h-4 text-[#FF2E93]" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl lg:text-4xl font-black text-gray-950 tracking-tight">92.4</span>
                  <span className="text-xs font-extrabold text-emerald-600">+6.8%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-gradient-to-r from-[#D4FF00] via-[#00F5FF] to-[#7C3AED] w-[92%]" />
                </div>
              </div>
            </div>

            {/* Metric 2: Top Aesthetic Vibe */}
            <div className="calm-card-elevated p-5 lg:p-6 rounded-3xl space-y-2 relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-xs font-bold uppercase tracking-wider">Top Vibe</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] animate-ping" />
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-black text-gray-950 tracking-tight truncate">
                  Cyber-Pop
                </div>
                <span className="text-xs font-semibold text-gray-500 block mt-1">
                  98% Match Consistency
                </span>
              </div>
            </div>

            {/* Metric 3: Curated Spots */}
            <div className="calm-card-elevated p-5 lg:p-6 rounded-3xl space-y-2 relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-xs font-bold uppercase tracking-wider">Curated Spots</span>
                <MapPin className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl lg:text-4xl font-black text-gray-950 tracking-tight">15</span>
                  <span className="text-xs font-semibold text-gray-400">Venues</span>
                </div>
                <span className="text-xs font-semibold text-blue-600 block mt-1">
                  100% Zero AI Slop
                </span>
              </div>
            </div>

            {/* Metric 4: Brand Synergy */}
            <div className="calm-card-elevated p-5 lg:p-6 rounded-3xl space-y-2 relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-xs font-bold uppercase tracking-wider">Brand Synergy</span>
                <Layers className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl lg:text-4xl font-black text-gray-950 tracking-tight">20</span>
                  <span className="text-xs font-semibold text-gray-400">Local Items</span>
                </div>
                <span className="text-xs font-semibold text-purple-600 block mt-1">
                  VN Local Brands
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Feature Card: Real-time Grounding Highlight */}
          <div className="p-5 lg:p-6 rounded-3xl bg-gradient-to-r from-gray-900 via-purple-950 to-black text-white shadow-xl flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-black uppercase text-[#D4FF00] tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Deterministic AI Grounding
              </span>
              <h4 className="text-sm lg:text-base font-extrabold text-white">
                {isEn
                  ? 'Never get sent to a closed cafe or open rooftop in rain.'
                  : 'Chống AI Slop 100% — Tự động lọc quán mở cửa & không lo mưa ướt.'}
              </h4>
              <p className="text-xs text-gray-400">
                {isEn
                  ? 'Gemini Multimodal reasoning strictly tied with real-world weather and verified venue hours.'
                  : 'Kết hợp mô hình thị giác Gemini với dữ liệu thời tiết và tọa độ HCMC thực tế.'}
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <Flame className="w-7 h-7 text-[#FF2E93]" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
