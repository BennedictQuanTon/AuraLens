import React from 'react';
import { History, Zap, Home, Camera, Sparkles, MapPin, Image as ImageIcon, Settings } from 'lucide-react';
import type { VibeStyle } from '../../types/entityGraph.js';
import type { UserProfileState } from '../../types/settings.js';

interface HeaderProps {
  currentVibe?: VibeStyle;
  userProfile: UserProfileState;
  onOpenHistory: () => void;
  activeView: number;
  onSelectView: (view: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentVibe = 'Cyber-Pop',
  userProfile,
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
    { id: 6, label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-4 lg:px-8 py-3 bg-white/80 backdrop-blur-xl border-b border-gray-100/90 shadow-xs">
      <div className="max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Logo & Current Vibe */}
        <div
          onClick={() => onSelectView(1)}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gray-950 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-[#D4FF00] fill-[#D4FF00]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl lg:text-2xl font-black tracking-tight text-gray-950">
              AuraLens
            </span>
            <span className="hidden sm:inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 border border-gray-200">
              {currentVibe}
            </span>
          </div>
        </div>

        {/* Center: Large Desktop Icon-Only Navbar with Animated Hover Tooltips */}
        <nav className="hidden md:flex items-center gap-2 bg-gray-100/90 p-1.5 rounded-full border border-gray-200/80 shadow-xs">
          {desktopNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`relative group p-3 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'bg-gray-950 text-[#D4FF00] shadow-md scale-105'
                    : 'text-gray-600 hover:text-gray-950 hover:bg-white active:scale-95'
                }`}
                title={item.label}
              >
                <Icon className="w-5 h-5" />

                {/* Animated Tooltip on Hover */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-gray-900 text-white text-[10px] font-extrabold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-50">
                  {item.label}
                </span>

                {/* Active Indicator Dot */}
                {isActive && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 bg-[#D4FF00] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: History Vault & User Profile Quick Trigger */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenHistory}
            className="w-10 h-10 rounded-full bg-gray-100/90 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors active:scale-95 cursor-pointer shadow-xs"
            title="OOTD History & Vault"
          >
            <History className="w-4.5 h-4.5" />
          </button>

          {/* User Profile Pill -> Opens Settings View */}
          <button
            onClick={() => onSelectView(6)}
            className="flex items-center gap-2 p-1 pr-3 rounded-full bg-gray-100 hover:bg-gray-200/90 border border-gray-200/60 transition-all cursor-pointer shadow-xs active:scale-95"
            title="Click to Open Settings"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white shadow-xs">
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-extrabold text-gray-900 hidden sm:inline truncate max-w-[90px]">
              {userProfile.name}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
