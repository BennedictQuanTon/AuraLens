import React from 'react';
import { Home, Camera, Sparkles, MapPin, Image as ImageIcon, Settings } from 'lucide-react';

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
    { id: 1, label: 'Home', icon: Home },
    { id: 2, label: 'Drip Check', icon: Sparkles, badge: hasScore },
    { id: 3, label: 'Places', icon: MapPin },
    { id: 4, label: 'Studio', icon: ImageIcon },
    { id: 5, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="md:hidden fixed bottom-4 left-0 right-0 z-40 px-4 max-w-sm mx-auto pointer-events-none">
      {/* Floating Dark Capsule Dock (Mobile Only) */}
      <nav className="pointer-events-auto bg-[#0F172A] text-white rounded-full px-3 py-2 shadow-2xl flex items-center justify-around border border-gray-800/80">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`relative p-2 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-white/20 text-[#D4FF00] scale-110'
                  : 'text-gray-400 hover:text-white active:scale-90'
              }`}
              title={item.label}
            >
              <Icon className="w-4.5 h-4.5" />

              {/* Active Dot indicator */}
              {isActive && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#D4FF00] rounded-full" />
              )}

              {/* Badge */}
              {item.badge && !isActive && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF2E93] rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
