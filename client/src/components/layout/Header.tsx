import React from 'react';
import { Store, History, Zap, Home, Camera, Sparkles, MapPin, Image as ImageIcon } from 'lucide-react';
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
  const desktopNavItems = [
    { id: 1, label: 'Lumi Home', icon: Home },
    { id: 2, label: 'Camera Scanner', icon: Camera },
    { id: 3, label: 'Drip Score', icon: Sparkles },
    { id: 4, label: 'Vibe Map', icon: MapPin },
    { id: 5, label: 'Photobooth Studio', icon: ImageIcon },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-4 lg:px-8 py-3.5 bg-white/80 backdrop-blur-xl border-b border-gray-100/90 shadow-xs">
      <div className="max-w-md lg:max-w-6xl xl:max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Logo & Current Vibe */}
        <div
          onClick={() => onSelectView(1)}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-2xl bg-gray-950 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Zap className="w-4.5 h-4.5 text-[#D4FF00] fill-[#D4FF00]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-gray-950">
              AuraLens
            </span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 border border-gray-200">
              {currentVibe}
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Bar (Visible on Tablet/Laptop/Desktop md: & lg:) */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-100/80 p-1 rounded-full border border-gray-200/60">
          {desktopNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                  isActive
                    ? 'bg-gray-950 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-950 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4FF00]' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenHistory}
            className="h-9 px-3 rounded-full bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 flex items-center gap-1.5 transition-colors active:scale-95 text-xs font-bold"
            title="OOTD History & Vault"
          >
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">Vault</span>
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
