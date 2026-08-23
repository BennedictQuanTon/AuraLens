import React from 'react';
import { Home, Camera, Sparkles, MapPin, Image as ImageIcon } from 'lucide-react';

interface NavigationBarProps {
  activeView: number;
  onSelectView: (view: number) => void;
  hasScore: boolean;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  activeView,
  onSelectView,
  hasScore,
}) => {
  const navItems = [
    { id: 1, label: 'Lumi Gate', icon: Home },
    { id: 2, label: 'Camera Scan', icon: Camera },
    { id: 3, label: 'Drip Score', icon: Sparkles, badge: hasScore ? 'HOT' : undefined },
    { id: 4, label: 'Vibe Map', icon: MapPin },
    { id: 5, label: 'Photobooth', icon: ImageIcon },
  ];

  return (
    <div className="fixed bottom-3 left-0 right-0 z-40 px-4 max-w-md mx-auto pointer-events-none">
      <nav className="pointer-events-auto bg-white/90 backdrop-blur-2xl border border-white/80 rounded-3xl p-1.5 shadow-2xl flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-tr from-[#0A0A0F] to-[#1F1F2E] text-white shadow-lg scale-105'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/80 active:scale-95'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-300 ${
                  isActive ? 'text-[#D4FF00] scale-110' : ''
                }`}
              />
              <span
                className={`text-[10px] font-bold mt-1 tracking-tight ${
                  isActive ? 'text-[#D4FF00]' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>

              {item.badge && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-[#FF2E93] text-white text-[8px] font-black rounded-full shadow-sm animate-bounce">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
