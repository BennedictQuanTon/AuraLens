import React from 'react';
import { Sparkles, ArrowRight, Heart, PartyPopper, Coffee, BookOpen, Compass, ChevronRight } from 'lucide-react';
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
  const contexts: Array<{ id: EventContext; label: string; emoji: string; icon: React.ElementType; bg: string }> = [
    { id: 'Hẹn hò', label: 'Hẹn Hò', emoji: '💖', icon: Heart, bg: 'bg-rose-50 border-rose-200 text-rose-600' },
    { id: 'Quẩy bar / Pub đêm', label: 'Quẩy Bar', emoji: '⚡', icon: PartyPopper, bg: 'bg-purple-50 border-purple-200 text-purple-600' },
    { id: 'Cafe sống ảo', label: 'Cafe Chill', emoji: '☕', icon: Coffee, bg: 'bg-amber-50 border-amber-200 text-amber-600' },
    { id: 'Đi học / Đi làm năng động', label: 'Đi Học/Làm', emoji: '💼', icon: BookOpen, bg: 'bg-blue-50 border-blue-200 text-blue-600' },
    { id: 'Dạo phố cuối tuần', label: 'Dạo Phố', emoji: '🚶', icon: Compass, bg: 'bg-emerald-50 border-emerald-200 text-emerald-600' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-6">
      {/* Centered Mascot Hero Stage */}
      <div className="relative calm-card-elevated rounded-3xl p-6 overflow-hidden flex flex-col items-center text-center">
        {/* Soft Background Radial Blurs */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4FF00]/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#FF2E93]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Mascot Speech Bubble */}
        <div className="relative mb-2 px-4 py-1.5 rounded-full bg-white border border-gray-200/80 shadow-xs flex items-center gap-1.5 animate-bounce [animation-duration:3s]">
          <Sparkles className="w-3.5 h-3.5 text-[#FF2E93]" />
          <span className="text-xs font-bold text-gray-800">
            Start Your Aura Journey ✨
          </span>
        </div>

        {/* Large Animated Lumi Mascot */}
        <div className="relative w-44 h-44 my-1 animate-lumi-float">
          <div className="w-full h-full rounded-full p-1 bg-gradient-to-tr from-[#D4FF00] via-[#FF2E93] to-[#7C3AED] shadow-xl overflow-hidden">
            <img
              src="/lumi.jpg"
              alt="Lumi 3D Mascot"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Big Editorial Heading */}
        <div className="mt-4 space-y-1">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">
            Step Into Your{' '}
            <span className="highlight-circle font-black text-black">Aura</span>{' '}
            Vibe
          </h2>
          <p className="text-xs text-gray-500 font-medium max-w-xs mx-auto pt-1 leading-relaxed">
            AI Stylist &amp; Personalized Experience Map for Gen Z.
          </p>
        </div>
      </div>

      {/* Daily Vibe / Context Mood Picker */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-gray-500">
            Select Your Mood &amp; Context
          </h3>
          <span className="text-[10px] text-gray-400 font-semibold">
            {selectedContext}
          </span>
        </div>

        {/* Horizontal Smooth Mood Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
          {contexts.map((ctx) => {
            const isSelected = selectedContext === ctx.id;

            return (
              <button
                key={ctx.id}
                onClick={() => onSelectContext(ctx.id)}
                className={`snap-start shrink-0 px-3.5 py-2.5 rounded-2xl flex items-center gap-2 transition-all duration-300 ${
                  isSelected
                    ? 'bg-gray-900 text-white shadow-md scale-103'
                    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200/70 active:scale-95'
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

      {/* Demo Scenario Pill Selector (Calm & Clean) */}
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
            Low (58đ)
          </button>
          <button
            onClick={() => onSelectMockScenario('high_score')}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all ${
              mockScenario === 'high_score'
                ? 'bg-gray-900 text-[#D4FF00] shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            High (94đ)
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

      {/* Calm, Sleek Pill CTA Button (Inspired by reference) */}
      <button
        onClick={onStartScanner}
        className="w-full py-4 px-4 rounded-full bg-[#0F172A] hover:bg-black text-white font-extrabold text-sm shadow-xl active:scale-98 transition-all flex items-center justify-between group"
      >
        {/* Mascot Mini Orb Icon */}
        <div className="w-9 h-9 rounded-full overflow-hidden bg-white p-0.5 shadow-sm">
          <img
            src="/lumi.jpg"
            alt="Lumi"
            className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform"
          />
        </div>

        {/* Center Label */}
        <span className="text-sm font-extrabold tracking-wide flex items-center gap-1.5 text-white">
          Get Started &amp; Check Outfit
        </span>

        {/* Right Arrow */}
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
          <ChevronRight className="w-4 h-4 text-[#D4FF00]" />
        </div>
      </button>
    </div>
  );
};
