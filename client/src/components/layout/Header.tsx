import React from 'react';
import {
  History,
  RotateCw,
  Zap,
  Home,
  Camera,
  Sparkles,
  MapPin,
  Image as ImageIcon,
  Settings,
} from 'lucide-react';
import type { VibeStyle } from '../../types/entityGraph.js';
import type { UserProfileState } from '../../types/settings.js';

interface HeaderProps {
  currentVibe?: VibeStyle;
  userProfile: UserProfileState;
  onOpenHistory: () => void;
  onReviseDashboard?: () => void;
  isRevising?: boolean;
  activeView: number;
  onSelectView: (view: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHistory,
  onReviseDashboard,
  isRevising = false,
  activeView,
  onSelectView,
}) => {
  const desktopNavItems = [
    { id: 1, label: 'Home', icon: Home },
    { id: 2, label: 'Drip Check & Score', icon: Sparkles },
    { id: 3, label: 'Vibe Map', icon: MapPin },
    { id: 4, label: 'Photobooth Studio', icon: ImageIcon },
    { id: 5, label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-4 lg:px-8 py-3 bg-white/80 backdrop-blur-xl border-b border-gray-100/90 shadow-xs">
      <div className="relative max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Clean Brand Logo (No Cyber-Pop badge) */}
        <div
          onClick={() => onSelectView(1)}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gray-950 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-[#D4FF00] fill-[#D4FF00]" />
          </div>
          <span className="text-xl lg:text-2xl font-black tracking-tight text-gray-950">
            AuraLens
          </span>
        </div>

        {/* Center: Desktop Navigation Bar with Smooth Indicator */}
        <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-gray-100/80 backdrop-blur-md rounded-full border border-gray-200/50 shadow-inner">
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

        {/* Right: Revise Dashboard Button & History Vault Button (Icons only, no Vault text) */}
        <div className="flex items-center gap-2">
          {/* Revise Dashboard Data & Sync Button */}
          {onReviseDashboard && (
            <button
              onClick={onReviseDashboard}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-xs border border-gray-200/60 ${
                isRevising
                  ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-400/50 scale-105'
                  : 'bg-gray-100/90 hover:bg-purple-50 text-gray-700 hover:text-purple-700'
              }`}
              title="Revise & Sync AI Dashboard Metrics"
            >
              <RotateCw
                className={`w-4 h-4 transition-transform ${
                  isRevising ? 'animate-spin text-purple-600' : 'group-hover:rotate-45'
                }`}
              />
            </button>
          )}

          {/* History Vault Button (Clean Icon Only, No Text) */}
          <button
            onClick={onOpenHistory}
            className="w-10 h-10 rounded-full bg-gray-100/90 hover:bg-gray-200 text-gray-700 hover:text-gray-950 flex items-center justify-center transition-colors active:scale-95 cursor-pointer shadow-xs border border-gray-200/60"
            title="OOTD History Vault"
          >
            <History className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
