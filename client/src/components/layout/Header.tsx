import React from 'react';
import { Store, History } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full px-5 py-3.5 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-xs">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Left: User Avatar & Welcoming Greeting */}
        <div
          onClick={() => onSelectView(1)}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-900/10 p-0.5 bg-gradient-to-tr from-[#D4FF00] via-[#FF2E93] to-[#7C3AED]">
            <img
              src="/lumi.jpg"
              alt="Lumi Mascot"
              className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-gray-500 block leading-tight">
              Hi 👋 Gen Z Stylist
            </span>
            <h1 className="text-base font-extrabold text-gray-900 tracking-tight flex items-center gap-1.5">
              AuraLens
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-gray-900 text-[#D4FF00]">
                {currentVibe}
              </span>
            </h1>
          </div>
        </div>

        {/* Right: Calm Icons */}
        <div className="flex items-center gap-2">
          {/* History Icon */}
          <button
            onClick={onOpenHistory}
            className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200/60 flex items-center justify-center text-gray-700 transition-colors active:scale-95"
            title="Lịch sử OOTD"
          >
            <History className="w-4 h-4" />
          </button>

          {/* B2B Merchant */}
          <button
            onClick={onOpenMerchant}
            className="h-9 px-3 rounded-full bg-gray-900 hover:bg-black text-white text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
          >
            <Store className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>B2B</span>
          </button>
        </div>
      </div>
    </header>
  );
};
