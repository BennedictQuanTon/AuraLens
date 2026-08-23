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
      date: 'Hôm nay, 19:30',
      vibe: 'Cyber-Pop' as VibeStyle,
      score: 94,
      context: 'Quẩy bar / Pub đêm',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'ootd-02',
      date: '22 Tháng 8, 15:00',
      vibe: 'Y2K' as VibeStyle,
      score: 88,
      context: 'Cafe sống ảo',
      imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 'ootd-03',
      date: '20 Tháng 8, 20:15',
      vibe: 'Minimalist' as VibeStyle,
      score: 62,
      context: 'Hẹn hò',
      imageUrl: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=400&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Click outside */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer */}
      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto animate-slideLeft flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#D4FF00]/20 text-black">
                <Sparkles className="w-5 h-5 text-[#7C3AED]" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-gray-900">
                  Tủ Đồ Số &amp; Nhật Ký OOTD
                </h3>
                <p className="text-[11px] text-gray-500">
                  Lịch sử chấm điểm outfit và các bộ ảnh Photobooth
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

          {/* History List */}
          <div className="space-y-3.5">
            {mockHistory.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl border border-gray-100 bg-gray-50/70 hover:bg-white hover:shadow-md transition-all flex items-center gap-3"
              >
                {/* Thumbnail */}
                <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.context}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1 left-1 px-1.5 py-0.2 bg-black/70 text-white text-[8px] font-black rounded-full">
                    {item.vibe}
                  </span>
                </div>

                {/* Info */}
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
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                        item.score >= 70
                          ? 'bg-[#D4FF00] text-black'
                          : 'bg-[#FF2E93]/15 text-[#FF2E93]'
                      }`}
                    >
                      {item.score} Điểm
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium">
                      {item.score >= 70 ? 'Đã duyệt đi chơi' : 'Cần thay đồ'}
                    </span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-gray-100 text-gray-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photobooth Vault Button */}
        <div className="pt-4 border-t border-gray-100">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-lime-500/10 border border-purple-200/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#7C3AED]" />
              <div>
                <span className="text-xs font-black text-gray-900 block">
                  Aura Photobooth Vault
                </span>
                <span className="text-[10px] text-gray-500">
                  Đã đồng bộ Google Cloud Storage
                </span>
              </div>
            </div>
            <span className="px-2 py-1 bg-white text-xs font-black text-[#7C3AED] rounded-xl shadow-xs">
              3 Ảnh
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
