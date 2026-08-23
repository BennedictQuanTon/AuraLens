import React from 'react';
import { X, Sparkles, Calendar, ArrowRight, Camera } from 'lucide-react';
import type { VibeStyle } from '../../types/entityGraph.js';

interface OOTDHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSavedOutfit?: (outfitId: string) => void;
}

export const OOTDHistoryDrawer: React.FC<OOTDHistoryDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const mockHistory = [
    {
      id: 'ootd-01',
      date: 'Today, 19:30',
      vibe: 'Cyber-Pop' as VibeStyle,
      score: 94,
      context: 'Nightclub / Pub',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'ootd-02',
      date: 'Aug 22, 15:00',
      vibe: 'Y2K' as VibeStyle,
      score: 88,
      context: 'Cafe Chill',
      imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'ootd-03',
      date: 'Aug 20, 20:15',
      vibe: 'Minimalist' as VibeStyle,
      score: 62,
      context: 'Romantic Date',
      imageUrl: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=400&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto animate-slideLeft flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-2xl bg-[#D4FF00]/20 text-black">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-gray-900">
                  OOTD Digital Vault
                </h3>
                <p className="text-[11px] text-gray-400">
                  Evaluated fits &amp; Photobooth Story archives
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {mockHistory.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-3xl border border-gray-100 bg-gray-50/70 hover:bg-white hover:shadow-md transition-all flex items-center gap-3"
              >
                <div className="relative w-16 h-20 rounded-2xl overflow-hidden bg-gray-200 shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.context}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1 left-1 px-1.5 py-0.2 bg-black/70 text-white text-[8px] font-black rounded-full">
                    {item.vibe}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold mb-0.5">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                  <h4 className="font-extrabold text-xs text-gray-900 truncate">
                    {item.context}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        item.score >= 70
                          ? 'bg-[#D4FF00] text-black'
                          : 'bg-[#FF2E93]/15 text-[#FF2E93]'
                      }`}
                    >
                      {item.score} Pts
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {item.score >= 70 ? 'Ready to go' : 'Style fixed'}
                    </span>
                  </div>
                </div>

                <div className="p-2 rounded-full bg-gray-100 text-gray-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="p-4 rounded-3xl bg-gray-50 border border-gray-200/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Camera className="w-5 h-5 text-purple-600" />
              <div>
                <span className="text-xs font-black text-gray-900 block">
                  Aura Photobooth Vault
                </span>
                <span className="text-[10px] text-gray-400">
                  Synced with Google Cloud Storage
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-white text-xs font-black text-gray-900 rounded-full shadow-xs">
              3 Shots
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
