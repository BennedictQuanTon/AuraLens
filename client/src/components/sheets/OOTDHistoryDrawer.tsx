import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Calendar,
  Camera,
  MapPin,
  Flame,
  Download,
  Trash2,
  CheckCircle2,
  Layers,
  ChevronRight,
} from 'lucide-react';
import type { VibeStyle } from '../../types/entityGraph.js';

interface OOTDHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSavedOutfit?: (outfitId: string) => void;
}

interface VaultItem {
  id: string;
  type: 'ootd' | 'photobooth';
  typeLabel: string;
  title: string;
  location: string;
  date: string;
  style: VibeStyle;
  score: number;
  image: string;
  photoboothTheme?: string;
  stylistNote: string;
}

export const OOTDHistoryDrawer: React.FC<OOTDHistoryDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'ootd' | 'photobooth'>('all');
  const [selectedItem, setSelectedItem] = useState<VaultItem | null>(null);
  const [deleteToast, setDeleteToast] = useState<string | null>(null);

  const initialVaultItems: VaultItem[] = [
    {
      id: 'vault-1',
      type: 'ootd',
      typeLabel: 'Drip Check OOTD',
      title: 'Weekend Cyber Rave Fit',
      location: 'Neo Saigon Cyber Bar, Q.1',
      date: 'Hôm nay, 20:30',
      style: 'Cyber-Pop',
      score: 96,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
      stylistNote: 'Áo khoác bạc bắt sáng đèn neon laser cực nét, tỷ lệ tương phản đạt 98% chuẩn vibe!',
    },
    {
      id: 'vault-2',
      type: 'photobooth',
      typeLabel: 'Photobooth 4-Cut',
      title: '4-Cut Y2K Flash Memory',
      location: 'Aura Studio Saigon, Q.3',
      date: 'Hôm qua, 16:45',
      style: 'Y2K',
      score: 92,
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80',
      photoboothTheme: 'Y2K Holographic Glitch Strip',
      stylistNote: 'Frame ảnh 4 khung Y2K tông tím hồng pastel siêu cuốn, tương tác sticker Lumi cực nhí nhảnh!',
    },
    {
      id: 'vault-3',
      type: 'ootd',
      typeLabel: 'Drip Check OOTD',
      title: 'Minimalist Wabi-Sabi Coffee',
      location: 'Danshari Coffee, Pasteur Q.1',
      date: '24 Tháng 8, 14:15',
      style: 'Minimalist',
      score: 94,
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
      stylistNote: 'Tone màu trung tính hòa quyện 100% với giếng trời bê tông và bàn inox của Danshari.',
    },
    {
      id: 'vault-4',
      type: 'photobooth',
      typeLabel: 'Photobooth 4-Cut',
      title: 'Cyberpunk Neon Glow Strip',
      location: 'Blank Lounge Landmark 81',
      date: '22 Tháng 8, 21:00',
      style: 'Cyber-Pop',
      score: 95,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
      photoboothTheme: 'Neon Cyber City Frame',
      stylistNote: 'Khung ảnh Skyline viền tím Cyberpunk bắt trọn toàn cảnh Sài Gòn 350m từ trên cao!',
    },
    {
      id: 'vault-5',
      type: 'ootd',
      typeLabel: 'Drip Check OOTD',
      title: 'Streetwear Cargo & Heavy Tee',
      location: 'Thảo Điền, TP. Thủ Đức',
      date: '20 Tháng 8, 17:30',
      style: 'Y2K',
      score: 91,
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&auto=format&fit=crop&q=80',
      stylistNote: 'Quần parachute ống rộng kết hợp áo thun boxy chuẩn streetwear Sài Gòn.',
    },
    {
      id: 'vault-6',
      type: 'photobooth',
      typeLabel: 'Photobooth Polaroid',
      title: 'Retro Film Polaroid Shot',
      location: 'S’mores Saigon Caffè, Q.3',
      date: '18 Tháng 8, 15:30',
      style: 'Minimalist',
      score: 89,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      photoboothTheme: 'Vintage 90s Film Grain',
      stylistNote: 'Hiệu ứng hạt grain phim 90s tôn màu gạch thô và bóng nắng rọi xiên qua tán lá.',
    },
    {
      id: 'vault-7',
      type: 'ootd',
      typeLabel: 'Drip Check OOTD',
      title: 'Sunset Cocktails & High Fashion',
      location: 'Rooftop Bar Đồng Khởi, Q.1',
      date: '16 Tháng 8, 18:45',
      style: 'Cyber-Pop',
      score: 97,
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
      stylistNote: 'Khoảnh khắc hoàng hôn dát vàng lên outfit ánh kim, đạt điểm thẩm mỹ Top 1 tuần!',
    },
  ];

  const [vaultItems, setVaultItems] = useState<VaultItem[]>(initialVaultItems);

  // Background Scroll Locking when Vault is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter Items by Tab
  const filteredItems = vaultItems.filter((item) => {
    if (activeTab === 'ootd') return item.type === 'ootd';
    if (activeTab === 'photobooth') return item.type === 'photobooth';
    return true;
  });

  // Action: Delete Item from History
  const handleDeleteItem = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setVaultItems((prev) => prev.filter((item) => item.id !== id));
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
    setDeleteToast('Đã xóa ảnh khỏi lịch sử Vault!');
    setTimeout(() => setDeleteToast(null), 2500);
  };

  // Action: Save / Download Image
  const handleDownloadImage = (item: VaultItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const link = document.createElement('a');
    link.href = item.image;
    link.target = '_blank';
    link.download = `AuraLens_${item.type}_${item.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Floating Toast Notification */}
      {deleteToast && (
        <div className="fixed top-6 right-6 z-70 flex items-center gap-2 px-4 py-2.5 bg-gray-950 text-white rounded-2xl shadow-2xl border border-red-500/40 text-xs font-black animate-bounce">
          <Trash2 className="w-3.5 h-3.5 text-red-400" />
          <span>{deleteToast}</span>
        </div>
      )}

      {/* Spacious Full-Height Drawer (max-w-2xl on desktop) */}
      <div className="relative z-10 w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slideLeft border-l border-gray-100">
        
        {/* ========================================================================= */}
        {/* 1. DRAWER HEADER & 3 CLEAN FILTER TABS (No Search, No Style Tags)         */}
        {/* ========================================================================= */}
        <div className="p-5 sm:p-6 pb-4 border-b border-gray-100 space-y-4 shrink-0 bg-white/90 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gray-950 flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-[#D4FF00]" />
              </div>
              <div>
                <h3 className="font-black text-xl sm:text-2xl text-gray-950 tracking-tight">
                  OOTD &amp; Photobooth Vault
                </h3>
                <p className="text-xs font-bold text-gray-500 mt-0.5">
                  Lưu trữ lịch sử outfit check &amp; photobooth kỷ niệm
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-950 transition-all cursor-pointer shadow-xs"
              title="Đóng Vault"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 3 Clean Filter Tabs Only */}
          <div className="flex items-center gap-2 pt-1">
            {[
              { id: 'all', label: `Tất Cả (${vaultItems.length})` },
              {
                id: 'ootd',
                label: `Drip Check (${vaultItems.filter((i) => i.type === 'ootd').length})`,
              },
              {
                id: 'photobooth',
                label: `Photobooth (${vaultItems.filter((i) => i.type === 'photobooth').length})`,
              },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-4 rounded-full text-xs font-black transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gray-950 text-white shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. VAULT ITEMS GRID (Clean Info: Loại ảnh, Thời gian, Nút Lưu & Xóa)      */}
        {/* ========================================================================= */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4">
          {filteredItems.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-gray-50 rounded-3xl border border-dashed border-gray-200 space-y-2">
              <Sparkles className="w-8 h-8 text-gray-300 animate-pulse" />
              <h4 className="text-sm font-black text-gray-700">
                Chưa có ảnh nào trong mục này
              </h4>
              <p className="text-xs text-gray-400">
                Hãy thử bấm vào tab "Tất Cả" để xem toàn bộ ảnh đã lưu.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const isPhotobooth = item.type === 'photobooth';

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="p-3.5 rounded-3xl bg-white border border-gray-100 hover:border-purple-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      {/* Image Container with Badges */}
                      <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden bg-gray-100 mb-3 shadow-inner">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                        />

                        {/* Top Left: Loại ảnh Tag */}
                        <div className="absolute top-2.5 left-2.5">
                          {isPhotobooth ? (
                            <span className="px-2.5 py-1 bg-gradient-to-r from-[#FF2E93] to-[#7C3AED] text-white text-[10px] font-black rounded-full shadow-md flex items-center gap-1">
                              <Camera className="w-3 h-3 text-[#D4FF00]" /> Photobooth
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 bg-black/80 backdrop-blur-xs text-white text-[10px] font-black rounded-full shadow-md">
                              Drip Check
                            </span>
                          )}
                        </div>

                        {/* Top Right: Aura Score Pill */}
                        <div className="absolute top-2.5 right-2.5">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-black shadow-md bg-[#D4FF00] text-gray-950 flex items-center gap-1">
                            <Flame className="w-3 h-3 text-orange-600 fill-orange-600" />
                            {item.score} Pts
                          </span>
                        </div>
                      </div>

                      {/* Loại Ảnh & Thời Gian Chụp */}
                      <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 mb-1">
                        <span className="text-purple-600 font-black">
                          {item.typeLabel}
                        </span>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>{item.date}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="font-black text-sm text-gray-950 line-clamp-1 leading-snug group-hover:text-purple-600 transition-colors">
                        {item.title}
                      </h4>

                      {/* Location Name */}
                      <p className="text-[11px] font-bold text-gray-500 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-purple-600 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </p>
                    </div>

                    {/* Bottom Row: Quick Action Buttons (Save Ảnh & Xóa khỏi lịch sử) */}
                    <div className="flex items-center justify-between pt-3 mt-2.5 border-t border-gray-100">
                      {/* Left: Save/Download Button */}
                      <button
                        onClick={(e) => handleDownloadImage(item, e)}
                        className="py-1.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-[11px] font-black flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Lưu ảnh về máy"
                      >
                        <Download className="w-3.5 h-3.5 text-purple-600" />
                        <span>Lưu Ảnh</span>
                      </button>

                      {/* Right: Delete Button */}
                      <button
                        onClick={(e) => handleDeleteItem(item.id, e)}
                        className="p-1.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Xóa khỏi lịch sử"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. DETAIL MODAL (With Large Photo, Save Image & Delete Actions)           */}
      {/* ========================================================================= */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-100 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HD Photo Header */}
            <div className="relative w-full h-64 sm:h-72 bg-gray-950">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-sm transition-all cursor-pointer"
                title="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Score & Type Badges */}
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                <span className="px-3.5 py-1.5 bg-[#D4FF00] text-gray-950 font-black text-xs sm:text-sm rounded-full shadow-lg flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-600 fill-orange-600" />
                  {selectedItem.score} Pts Aura Index
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white font-black text-xs rounded-full">
                  {selectedItem.typeLabel}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <h3 className="text-xl font-black text-gray-950">
                  {selectedItem.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mt-1">
                  <span className="text-purple-600 font-black">{selectedItem.typeLabel}</span>
                  <span>•</span>
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedItem.date}</span>
                  <span>•</span>
                  <MapPin className="w-3.5 h-3.5 text-purple-600" />
                  <span>{selectedItem.location}</span>
                </div>
              </div>

              {/* Stylist Notes Box */}
              <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-100 space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-purple-700 block flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  Lumi Stylist Review
                </span>
                <p className="text-xs font-bold text-purple-950 leading-relaxed">
                  {selectedItem.stylistNote}
                </p>
              </div>

              {/* Action Buttons: Save & Delete */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => handleDownloadImage(selectedItem)}
                  className="flex-1 py-3.5 px-4 rounded-2xl bg-gray-950 hover:bg-black text-white font-black text-xs shadow-xl active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#D4FF00]" />
                  <span>Lưu Ảnh Về Máy</span>
                </button>

                <button
                  onClick={() => handleDeleteItem(selectedItem.id)}
                  className="py-3.5 px-4 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 font-black text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Xóa Khỏi Vault</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
