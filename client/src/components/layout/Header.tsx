import React from 'react';
import { Sparkles, Store, History, Zap } from 'lucide-react';
import type { VibeStyle } from '../../types/entityGraph.js';

interface HeaderProps {
  currentVibe?: VibeStyle;
  onOpenMerchant: () => void;
  onOpenHistory: () => void;
  activeView: number;
  onSelectView: (view: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentVibe = 'Cyber-Pop',
  onOpenMerchant,
  onOpenHistory,
  activeView,
  onSelectView,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full px-4 py-3 glass-card border-b border-white/60 shadow-sm backdrop-blur-xl">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand Logo & Vibe Chip */}
        <div 
          onClick={() => onSelectView(1)}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF2E93] via-[#7C3AED] to-[#D4FF00] p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#0A0A0F] rounded-[14px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#D4FF00] fill-[#D4FF00] animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-[#111827] via-[#7C3AED] to-[#FF2E93] bg-clip-text text-transparent">
                AuraLens
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#D4FF00] text-black tracking-wider uppercase">
                AI
              </span>
            </div>
            <p className="text-[10px] font-semibold text-gray-500 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#FF2E93]" />
              Vibe: <span className="text-[#7C3AED] font-bold">{currentVibe}</span>
            </p>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          {/* History Drawer Trigger */}
          <button
            onClick={onOpenHistory}
            className="p-2 rounded-xl bg-white/80 hover:bg-white border border-gray-200/80 shadow-sm hover:shadow active:scale-95 transition-all text-gray-700 hover:text-[#7C3AED]"
            title="Tủ đồ số & Lịch sử check"
          >
            <History className="w-4 h-4" />
          </button>

          {/* B2B Merchant Trigger */}
          <button
            onClick={onOpenMerchant}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#FF2E93] text-white text-xs font-bold shadow-md hover:shadow-lg active:scale-95 transition-all"
            title="Kênh Local Brand & F&B"
          >
            <Store className="w-3.5 h-3.5" />
            <span>B2B</span>
          </button>
        </div>
      </div>
    </header>
  );
};
