import React from 'react';
import { Sparkles, TrendingUp, Compass, ChevronRight, Layers, MapPin } from 'lucide-react';
import type { EventContext } from '../types/entityGraph.js';

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
  const contexts: Array<{ id: EventContext; label: string; emoji: string }> = [
    { id: 'Cafe sống ảo', label: 'Cafe Chill', emoji: '☕' },
    { id: 'Quẩy bar / Pub đêm', label: 'Nightclub / Pub', emoji: '⚡' },
    { id: 'Hẹn hò', label: 'Romantic Date', emoji: '💖' },
    { id: 'Đi học / Đi làm năng động', label: 'Campus / Work', emoji: '💼' },
    { id: 'Dạo phố cuối tuần', label: 'Street Chill', emoji: '🚶' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      {/* Top Welcome & Organic Floating Lumi Mascot (No enclosing card box) */}
      <div className="pt-2 flex items-center justify-between gap-4">
        {/* Left Editorial Greeting */}
        <div className="space-y-1.5 flex-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200/80 text-[11px] font-bold text-gray-700">
            <Sparkles className="w-3 h-3 text-[#FF2E93]" />
            <span>Hi, Alex 👋</span>
          </div>

          <h2 className="text-2xl font-black text-gray-950 tracking-tight leading-tight">
            Ready to slay your{' '}
            <span className="highlight-circle font-black text-black">vibe</span>{' '}
            today?
          </h2>

          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            AI Stylist &amp; Verified Local Experience Graph.
          </p>
        </div>

        {/* Right Free-Floating Lumi Mascot */}
        <div className="relative w-28 h-28 shrink-0 animate-lumi-float">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#D4FF00]/40 to-[#FF2E93]/40 rounded-full blur-xl pointer-events-none" />
          <div className="relative w-full h-full rounded-full p-1 bg-gradient-to-tr from-[#D4FF00] via-[#FF2E93] to-[#7C3AED] shadow-xl overflow-hidden">
            <img
              src="/lumi.jpg"
              alt="Lumi 3D Mascot"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Smart Style & Drip Analytics Mini-Dashboard (Clean Data Cards) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-gray-400">
            Style Intelligence &amp; Metrics
          </span>
          <span className="text-[10px] font-extrabold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3" /> Live Graph
          </span>
        </div>

        {/* 2x2 Grid of High-Utility Analytics Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Metric 1: Average Aura Index */}
          <div className="calm-card-elevated p-4 rounded-3xl space-y-1.5 relative overflow-hidden">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">Aura Index</span>
              <Sparkles className="w-3.5 h-3.5 text-[#FF2E93]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-950 tracking-tight">92.4</span>
              <span className="text-[10px] font-extrabold text-emerald-600">+6.8%</span>
            </div>
            {/* Sparkline Visual Curve */}
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-gradient-to-r from-[#D4FF00] to-[#00F5FF] w-[92%]" />
            </div>
          </div>

          {/* Metric 2: Top Aesthetic Match */}
          <div className="calm-card-elevated p-4 rounded-3xl space-y-1.5 relative overflow-hidden">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">Top Vibe</span>
              <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-ping" />
            </div>
            <div className="text-lg font-black text-gray-950 tracking-tight truncate pt-0.5">
              Cyber-Pop
            </div>
            <span className="text-[10px] font-semibold text-gray-500 block">
              98% Outfit Consistency
            </span>
          </div>

          {/* Metric 3: Verified Spots */}
          <div className="calm-card-elevated p-4 rounded-3xl space-y-1.5 relative overflow-hidden">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">Curated Spots</span>
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-gray-950 tracking-tight">15</span>
              <span className="text-[10px] font-semibold text-gray-400">Places</span>
            </div>
            <span className="text-[10px] font-semibold text-blue-600 block truncate">
              100% Zero AI Slop
            </span>
          </div>

          {/* Metric 4: Local Brand Synergy */}
          <div className="calm-card-elevated p-4 rounded-3xl space-y-1.5 relative overflow-hidden">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">Brand Synergy</span>
              <Layers className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-gray-950 tracking-tight">20</span>
              <span className="text-[10px] font-semibold text-gray-400">Items</span>
            </div>
            <span className="text-[10px] font-semibold text-purple-600 block truncate">
              VN Local Brands
            </span>
          </div>
        </div>
      </div>

      {/* Target Destination / Scenario Selector */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[11px] font-black uppercase tracking-wider text-gray-400">
            Target Destination
          </h3>
          <span className="text-[10px] font-bold text-gray-900">
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
                className={`snap-start shrink-0 px-3.5 py-2.5 rounded-2xl flex items-center gap-2 transition-all duration-300 ${
                  isSelected
                    ? 'bg-gray-950 text-white shadow-md scale-103'
                    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200/70 active:scale-95'
                }`}
              >
                <span className="text-sm">{ctx.emoji}</span>
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

      {/* Demo Scenario Pill Selector (Judge Fast Switch) */}
      <div className="p-3 bg-white/70 rounded-2xl border border-gray-200/60 flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Demo Preset:
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSelectMockScenario('low_score')}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all ${
              mockScenario === 'low_score'
                ? 'bg-[#FF2E93] text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Low (58)
          </button>
          <button
            onClick={() => onSelectMockScenario('high_score')}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all ${
              mockScenario === 'high_score'
                ? 'bg-gray-950 text-[#D4FF00] shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            High (94)
          </button>
          <button
            onClick={() => onSelectMockScenario('cyberpunk')}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all ${
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
        className="w-full py-4 px-4 rounded-full bg-[#0F172A] hover:bg-black text-white font-extrabold text-sm shadow-xl active:scale-98 transition-all flex items-center justify-between group"
      >
        <div className="w-9 h-9 rounded-full overflow-hidden bg-white p-0.5 shadow-sm">
          <img
            src="/lumi.jpg"
            alt="Lumi"
            className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform"
          />
        </div>

        <span className="text-sm font-extrabold tracking-wide text-white">
          Get Started &amp; Check Outfit
        </span>

        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
          <ChevronRight className="w-4 h-4 text-[#D4FF00]" />
        </div>
      </button>
    </div>
  );
};
