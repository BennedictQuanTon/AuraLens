import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Calendar,
  Camera,
  Search,
  SlidersHorizontal,
  MapPin,
  Flame,
  Download,
  Share2,
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle2,
  Image as ImageIcon,
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
  title: string;
  location: string;
  date: string;
  style: VibeStyle;
  score: number;
  mood: string;
  image: string;
  tags: string[];
  photoboothTheme?: string;
  stylistNote: string;
}

export const OOTDHistoryDrawer: React.FC<OOTDHistoryDrawerProps> = ({
  isOpen,
  onClose,
  onSelectSavedOutfit,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'ootd' | 'photobooth' | 'top'>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<VaultItem | null>(null);

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

  const mockVaultItems: VaultItem[] = [
    {
      id: 'vault-1',
      type: 'ootd',
      title: 'Weekend Cyber Rave Fit',
      location: 'Neo Saigon Cyber Bar, Q.1',
      date: 'Today, 20:30',
      style: 'Cyber-Pop',
      score: 96,
      mood: 'High Energy · Slaying',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
      tags: ['Metallic Jacket', 'Neon Accessories', 'Cyberpunk'],
      stylistNote: 'Áo khoác bạc bắt sáng đèn neon laser cực nét, tỷ lệ tương phản đạt 98% chuẩn vibe!',
    },
    {
      id: 'vault-2',
      type: 'photobooth',
      title: '4-Cut Y2K Flash Memory',
      location: 'Aura Studio Saigon, Q.3',
      date: 'Yesterday, 16:45',
      style: 'Y2K',
      score: 92,
      mood: 'Playful · Besties',
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80',
      photoboothTheme: 'Y2K Holographic Glitch Strip',
      tags: ['4-Cut Strip', 'Lumi Sticker', 'Flash Mode'],
      stylistNote: 'Frame ảnh 4 khung Y2K tông tím hồng pastel siêu cuốn, tương tác sticker Lumi cực nhí nhảnh!',
    },
    {
      id: 'vault-3',
      type: 'ootd',
      title: 'Minimalist Wabi-Sabi Coffee',
      location: 'Danshari Coffee, Pasteur Q.1',
      date: 'Aug 24, 14:15',
      style: 'Minimalist',
      score: 94,
      mood: 'Clean · Aesthetic',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
      tags: ['Oversized Shirt', 'Silver Chain', 'Natural Light'],
      stylistNote: 'Tone màu trung tính hòa quyện 100% với giếng trời bê tông và bàn inox của Danshari.',
    },
    {
      id: 'vault-4',
      type: 'photobooth',
      title: 'Cyberpunk Neon Glow Strip',
      location: 'Blank Lounge Landmark 81',
      date: 'Aug 22, 21:00',
      style: 'Cyber-Pop',
      score: 95,
      mood: 'Skyline · Futuristic',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
      photoboothTheme: 'Neon Cyber City Frame',
      tags: ['Landmark 81', 'Skyline View', 'Night Neon'],
      stylistNote: 'Khung ảnh Skyline viền tím Cyberpunk bắt trọn toàn cảnh Sài Gòn 350m từ trên cao!',
    },
    {
      id: 'vault-5',
      type: 'ootd',
      title: 'Streetwear Cargo & Heavy Tee',
      location: 'Thảo Điền TP. Thủ Đức',
      date: 'Aug 20, 17:30',
      style: 'Y2K',
      score: 91,
      mood: 'Chill · Outdoor',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&auto=format&fit=crop&q=80',
      tags: ['Parachute Pants', 'Graphic Tee', 'Sneakers'],
      stylistNote: 'Quần parachute ống rộng kết hợp áo thun boxy chuẩn streetwear Sài Gòn.',
    },
    {
      id: 'vault-6',
      type: 'photobooth',
      title: 'Retro Film Polaroid Double Shot',
      location: 'S’mores Saigon Caffè, Q.3',
      date: 'Aug 18, 15:30',
      style: 'Minimalist',
      score: 89,
      mood: 'Vintage · Nostalgic',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      photoboothTheme: 'Vintage 90s Film Grain',
      tags: ['Film Grain', 'Warm Sunlight', 'Brick Garden'],
      stylistNote: 'Hiệu ứng hạt grain phim 90s tôn màu gạch thô và bóng nắng rọi xiên qua tán lá.',
    },
    {
      id: 'vault-7',
      type: 'ootd',
      title: 'Sunset Cocktails & High Fashion',
      location: 'Rooftop Bar Đồng Khởi, Q.1',
      date: 'Aug 16, 18:45',
      style: 'Cyber-Pop',
      score: 97,
      mood: 'Golden Hour · Glam',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
      tags: ['Silver Blazer', 'Sunset Flare', 'Cocktails'],
      stylistNote: 'Khoảnh khắc hoàng hôn dát vàng lên outfit ánh kim, đạt điểm thẩm mỹ Top 1 tuần!',
    },
    {
      id: 'vault-8',
      type: 'ootd',
      title: 'Casual Weekend Drip',
      location: 'Hồ Con Rùa, Q.3',
      date: 'Aug 14, 16:00',
      style: 'Minimalist',
      score: 85,
      mood: 'Casual · Street Walk',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
      tags: ['Black Hoodie', 'Denim', 'Coffee Walk'],
      stylistNote: 'Set đồ basic gọn gàng cho buổi dạo phố cuối tuần cùng bạn bè.',
    },
  ];

  // Multi-Filter Logic
  const filteredItems = mockVaultItems.filter((item) => {
    // Tab Filter
    if (activeTab === 'ootd' && item.type !== 'ootd') return false;
    if (activeTab === 'photobooth' && item.type !== 'photobooth') return false;
    if (activeTab === 'top' && item.score < 93) return false;

    // Style Filter
    if (selectedStyle !== 'all' && item.style !== selectedStyle) return false;

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchLoc = item.location.toLowerCase().includes(q);
      const matchStyle = item.style.toLowerCase().includes(q);
      const matchTag = item.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchLoc && !matchStyle && !matchTag) return false;
    }

    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Spacious Full-Height Drawer (max-w-2xl on desktop) */}
      <div className="relative z-10 w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slideLeft border-l border-gray-100">
        
        {/* ========================================================================= */}
        {/* 1. DRAWER HEADER & SEARCH                                                */}
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
                  Lưu trữ outfit check, photobooth kỷ niệm &amp; chỉ số Aura của bạn
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-950 transition-all cursor-pointer shadow-xs"
              title="Close Vault"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar & Quick Count */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo quán, sự kiện, phong cách hoặc tag..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200/80 rounded-2xl text-xs sm:text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {[
              { id: 'all', label: 'Tất Cả (8)' },
              { id: 'ootd', label: 'Drip Check (5)' },
              { id: 'photobooth', label: 'Photobooth (3)' },
              { id: 'top', label: 'Top Aura >90 Pts (4)' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-1.5 px-3.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gray-950 text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Style Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold text-gray-600">
            <span className="text-gray-400 font-black shrink-0">Style:</span>
            {['all', 'Cyber-Pop', 'Y2K', 'Minimalist'].map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
                  selectedStyle === style
                    ? 'bg-purple-100 text-purple-900 font-black border border-purple-300'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-600'
                }`}
              >
                {style === 'all' ? 'Tất cả' : style}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. VAULT ITEMS GRID (Spacious, Fun Playful Candid OOTD Cards)            */}
        {/* ========================================================================= */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4">
          {filteredItems.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-gray-50 rounded-3xl border border-dashed border-gray-200 space-y-2">
              <Sparkles className="w-8 h-8 text-gray-300 animate-pulse" />
              <h4 className="text-sm font-black text-gray-700">
                Không tìm thấy kỷ niệm nào phù hợp
              </h4>
              <p className="text-xs text-gray-400">
                Hãy thử đổi từ khóa tìm kiếm hoặc bấm tab "Tất Cả".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const isPhotobooth = item.type === 'photobooth';
                const isTopScore = item.score >= 94;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="p-3.5 rounded-3xl bg-white border border-gray-100 hover:border-purple-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      {/* Image Container with Dynamic Badge */}
                      <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden bg-gray-100 mb-3 shadow-inner">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                        />

                        {/* Top Left: Type Pill */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          {isPhotobooth ? (
                            <span className="px-2.5 py-1 bg-gradient-to-r from-[#FF2E93] to-[#7C3AED] text-white text-[10px] font-black rounded-full shadow-md flex items-center gap-1">
                              <Camera className="w-3 h-3 text-[#D4FF00]" /> Photobooth
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 bg-black/80 backdrop-blur-xs text-white text-[10px] font-black rounded-full shadow-md">
                              {item.style}
                            </span>
                          )}
                        </div>

                        {/* Top Right: Aura Score Pill */}
                        <div className="absolute top-2.5 right-2.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black shadow-md flex items-center gap-1 ${
                              isTopScore
                                ? 'bg-[#D4FF00] text-gray-950'
                                : 'bg-white/95 text-gray-900'
                            }`}
                          >
                            <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                            {item.score} Pts
                          </span>
                        </div>
                      </div>

                      {/* Date & Location */}
                      <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-gray-400 mb-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
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

                    {/* Bottom Tag Pills & View Arrow */}
                    <div className="flex items-center justify-between pt-3 mt-2.5 border-t border-gray-100">
                      <span className="text-[10px] font-extrabold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md truncate max-w-[140px]">
                        {item.mood}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 3. DRAWER FOOTER: STORAGE METRICS & STATS                                */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 shrink-0 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-black text-gray-900">
              {mockVaultItems.length} Kỷ Niệm Đã Lưu
            </span>
          </div>

          <span className="text-gray-500 font-bold">
            Cloud Vault Synced · High Quality
          </span>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. DETAIL POPUP MODAL (When Clicking Any Memory in Vault)                 */}
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
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Score & Style Badges */}
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                <span className="px-3.5 py-1.5 bg-[#D4FF00] text-gray-950 font-black text-xs sm:text-sm rounded-full shadow-lg flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-600 fill-orange-600" />
                  {selectedItem.score} Pts Aura Index
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white font-black text-xs rounded-full">
                  {selectedItem.style}
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

              {/* Tag Chips */}
              <div className="space-y-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-gray-400 block">
                  Tags &amp; Chi Tiết Phối Đồ
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-bold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    onClose();
                  }}
                  className="flex-1 py-3.5 px-4 rounded-2xl bg-gray-950 hover:bg-black text-white font-black text-xs shadow-xl active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#D4FF00]" />
                  <span>Xem Chi Tiết Drip Score</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
