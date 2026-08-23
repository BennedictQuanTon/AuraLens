import React from 'react';
import { Store, History, Zap } from 'lucide-react';
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
  onSelectView,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full px-5 py-3 bg-white/80 backdrop-blur-xl border-b border-gray-100/80 shadow-xs">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand Logo & Current Vibe */}
        <div
          onClick={() => onSelectView(1)}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-xl bg-gray-950 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 text-[#D4FF00] fill-[#D4FF00]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-gray-950">
              AuraLens
            </span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 border border-gray-200">
              {currentVibe}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenHistory}
            className="w-9 h-9 rounded-full bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 flex items-center justify-center transition-colors active:scale-95"
            title="OOTD History & Vault"
          >
            <History className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenMerchant}
            className="h-9 px-3.5 rounded-full bg-gray-950 hover:bg-black text-white text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
          >
            <Store className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>B2B Portal</span>
          </button>
        </div>
      </div>
    </header>
  );
};
